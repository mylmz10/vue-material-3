import { ref } from 'vue';

const DRAG_THRESHOLD = 5;
const VELOCITY_WINDOW = 100;
const SPRING_RATE = 20;

export function useCarouselMouseDrag({ viewportEl, vertical, scrollAxis, scrollRange, cancelNavigation, updateMasks, snapTarget, onSettled, reducedMotion }) {
  const dragging = ref(false);
  const moving = ref(false);
  let press;
  let frame;
  let suppressClick = false;

  const writeOffset = (offset) => {
    viewportEl.value[scrollAxis.value] = offset;
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
    if (event.pointerType !== 'mouse' || event.button !== 0 || scrollRange() <= 0) return;
    if (event.target.closest('input, textarea, select, [contenteditable]')) return;
    const bounds = viewport.getBoundingClientRect();
    if (
      event.clientY >= bounds.top + viewport.clientTop + viewport.clientHeight ||
      event.clientX < bounds.left + viewport.clientLeft ||
      event.clientX >= bounds.left + viewport.clientLeft + viewport.clientWidth
    )
      return;
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
    const main = vertical.value ? event.clientY : event.clientX;
    const delta = main - (vertical.value ? press.y : press.x);
    if (!dragging.value) {
      const crossDelta = vertical.value ? event.clientX - press.x : event.clientY - press.y;
      if (Math.abs(crossDelta) > DRAG_THRESHOLD && Math.abs(crossDelta) > Math.abs(delta)) {
        finishDrag(event);
        return;
      }
      if (Math.abs(delta) <= DRAG_THRESHOLD) return;
      cancelNavigation();
      startMotion();
      dragging.value = true;
      suppressClick = true;
      press.anchor = main - delta + Math.sign(delta) * DRAG_THRESHOLD;
      const viewport = viewportEl.value;
      press.anchorOffset = viewport[scrollAxis.value];
      const max = scrollRange();
      const rtl = !vertical.value && getComputedStyle(viewport).direction === 'rtl';
      press.min = rtl ? -max : 0;
      press.max = rtl ? 0 : max;
    }
    event.preventDefault();
    press.offset = Math.max(press.min, Math.min(press.max, press.anchorOffset - (main - press.anchor)));
    const time = performance.now();
    press.samples.push({ time, offset: press.offset });
    while (press.samples.length > 1 && time - press.samples[0].time > VELOCITY_WINDOW) press.samples.shift();
    if (frame !== undefined) return;
    frame = requestAnimationFrame(() => {
      frame = undefined;
      writeOffset(press.offset);
    });
  };

  const settle = (velocity) => {
    const start = viewportEl.value[scrollAxis.value];
    const { index, offset: target } = snapTarget(start + velocity * 0.18);
    const finish = () => {
      writeOffset(target);
      stopMotion();
      onSettled(index);
    };
    if (reducedMotion() || (Math.abs(start - target) < 1 && Math.abs(velocity) < 20)) {
      finish();
      return;
    }
    const startedAt = performance.now();
    const distance = start - target;
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
      writeOffset(target + offset);
      frame = requestAnimationFrame(step);
    };
    frame = requestAnimationFrame(step);
  };

  const finishDrag = (event) => {
    if (event.pointerId !== press?.id) return;
    const { offset, interrupted, samples, onTap } = press;
    const wasDragging = dragging.value;
    releasePointer();
    if (!wasDragging && event.type === 'pointerup' && onTap) {
      onTap();
      return;
    }
    if (!wasDragging && !interrupted) return;
    if (frame !== undefined) cancelAnimationFrame(frame);
    frame = undefined;
    if (wasDragging) writeOffset(offset);
    const first = samples[0];
    const last = samples.at(-1);
    let velocity = 0;
    if (event.type === 'pointerup' && first && last.time - first.time > 1 && performance.now() - last.time < 80) {
      velocity = Math.max(-2400, Math.min(2400, ((last.offset - first.offset) * 1000) / (last.time - first.time)));
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
