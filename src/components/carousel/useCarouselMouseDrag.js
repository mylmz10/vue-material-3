import { ref } from 'vue';

const DRAG_THRESHOLD = 5;
const VELOCITY_WINDOW = 100;
const SPRING_RATE = 20;

export function useCarouselMouseDrag({ viewportEl, showAll, cancelNavigation, updateMasks, snapTarget, onSettled, reducedMotion }) {
  const dragging = ref(false);
  const moving = ref(false);
  let press;
  let frame;
  let suppressClick = false;

  const writeOffset = (left) => {
    viewportEl.value.scrollLeft = left;
    updateMasks();
  };
  const startMotion = () => {
    moving.value = true;
    viewportEl.value.style.scrollSnapType = 'none';
  };
  const stopMotion = () => {
    if (frame !== undefined) cancelAnimationFrame(frame);
    frame = undefined;
    if (moving.value && viewportEl.value) viewportEl.value.style.removeProperty('scroll-snap-type');
    moving.value = false;
  };
  const releasePointer = () => {
    if (!press) return;
    press = undefined;
    dragging.value = false;
    window.removeEventListener('pointermove', onPointerMove, true);
    window.removeEventListener('pointerup', finishDrag, true);
    window.removeEventListener('pointercancel', finishDrag, true);
    window.removeEventListener('blur', endDrag);
  };
  const endDrag = () => {
    releasePointer();
    stopMotion();
  };

  const onPointerDown = (event) => {
    suppressClick = false;
    cancelNavigation();
    const viewport = viewportEl.value;
    if (event.pointerType !== 'mouse' || event.button !== 0 || showAll.value || viewport.scrollWidth <= viewport.clientWidth) return;
    if (event.target.closest('input, textarea, select, [contenteditable]')) return;
    if (event.clientY >= viewport.getBoundingClientRect().top + viewport.clientTop + viewport.clientHeight) return;
    const interrupted = moving.value;
    if (frame !== undefined) cancelAnimationFrame(frame);
    frame = undefined;
    press = { id: event.pointerId, x: event.clientX, y: event.clientY, interrupted, samples: [] };
    window.addEventListener('pointermove', onPointerMove, true);
    window.addEventListener('pointerup', finishDrag, true);
    window.addEventListener('pointercancel', finishDrag, true);
    window.addEventListener('blur', endDrag);
  };

  const onPointerMove = (event) => {
    if (event.pointerId !== press?.id) return;
    const dx = event.clientX - press.x;
    if (!dragging.value) {
      const dy = event.clientY - press.y;
      if (Math.abs(dy) > DRAG_THRESHOLD && Math.abs(dy) > Math.abs(dx)) {
        finishDrag(event);
        return;
      }
      if (Math.abs(dx) <= DRAG_THRESHOLD) return;
      cancelNavigation();
      startMotion();
      dragging.value = true;
      suppressClick = true;
      press.anchorX = press.x + Math.sign(dx) * DRAG_THRESHOLD;
      const viewport = viewportEl.value;
      press.anchorLeft = viewport.scrollLeft;
      const max = viewport.scrollWidth - viewport.clientWidth;
      const rtl = getComputedStyle(viewport).direction === 'rtl';
      press.min = rtl ? -max : 0;
      press.max = rtl ? 0 : max;
    }
    event.preventDefault();
    press.left = Math.max(press.min, Math.min(press.max, press.anchorLeft - (event.clientX - press.anchorX)));
    const time = performance.now();
    press.samples.push({ time, left: press.left });
    while (press.samples.length > 1 && time - press.samples[0].time > VELOCITY_WINDOW) press.samples.shift();
    if (frame !== undefined) return;
    frame = requestAnimationFrame(() => {
      frame = undefined;
      writeOffset(press.left);
    });
  };

  const settle = (velocity) => {
    const start = viewportEl.value.scrollLeft;
    const { index, left } = snapTarget(start + velocity * 0.18);
    const finish = () => {
      writeOffset(left);
      stopMotion();
      onSettled(index);
    };
    if (reducedMotion() || (Math.abs(start - left) < 1 && Math.abs(velocity) < 20)) {
      finish();
      return;
    }
    const startedAt = performance.now();
    const distance = start - left;
    const step = (now) => {
      const elapsed = (now - startedAt) / 1000;
      // A critically damped spring carries release velocity into the snap.
      const decay = Math.exp(-SPRING_RATE * elapsed);
      const impulse = velocity + SPRING_RATE * distance;
      const offset = (distance + impulse * elapsed) * decay;
      const speed = (velocity - SPRING_RATE * impulse * elapsed) * decay;
      if (elapsed >= 0.65 || (Math.abs(offset) < 0.5 && Math.abs(speed) < 10)) {
        finish();
        return;
      }
      writeOffset(left + offset);
      frame = requestAnimationFrame(step);
    };
    frame = requestAnimationFrame(step);
  };

  const finishDrag = (event) => {
    if (event.pointerId !== press?.id) return;
    const { left, interrupted, samples, onTap } = press;
    const wasDragging = dragging.value;
    releasePointer();
    if (!wasDragging && event.type === 'pointerup' && onTap) {
      onTap();
      return;
    }
    if (!wasDragging && !interrupted) return;
    if (frame !== undefined) cancelAnimationFrame(frame);
    frame = undefined;
    if (wasDragging) writeOffset(left);
    const first = samples[0];
    const last = samples.at(-1);
    let velocity = 0;
    if (event.type === 'pointerup' && first && last.time - first.time > 1 && performance.now() - last.time < 80) {
      velocity = Math.max(-2400, Math.min(2400, ((last.left - first.left) * 1000) / (last.time - first.time)));
    }
    settle(velocity);
  };
  const focusAfterPress = (activate) => {
    if (press) press.onTap = activate;
    else activate();
  };
  const onNativeDrag = (event) => {
    if (press) event.preventDefault();
  };
  const onDragClick = (event) => {
    if (!suppressClick || event.detail === 0) return;
    suppressClick = false;
    event.preventDefault();
    event.stopPropagation();
  };

  return { dragging, moving, onPointerDown, endDrag, focusAfterPress, onNativeDrag, onDragClick };
}
