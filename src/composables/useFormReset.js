import { nextTick, onBeforeUnmount, onMounted } from 'vue';

// Capture reset at the control root so changing a control's form owner needs no rebinding.
export function useFormReset(getControl, reset) {
  let resetRoot;
  let active = false;
  const onReset = (event) => {
    if (getControl()?.form !== event.target) return;
    nextTick(() => {
      if (active && !event.defaultPrevented) reset(event);
    });
  };
  onMounted(() => {
    active = true;
    resetRoot = getControl()?.getRootNode();
    resetRoot?.addEventListener('reset', onReset, true);
  });
  onBeforeUnmount(() => {
    active = false;
    resetRoot?.removeEventListener('reset', onReset, true);
  });
}
