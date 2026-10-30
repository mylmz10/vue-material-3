import { nextTick, onBeforeUnmount, onMounted } from 'vue';

// Capture reset at the document so changing a control's form owner needs no rebinding.
export function useFormReset(getControl, reset) {
  let ownerDocument;
  let active = false;
  const onReset = (event) => {
    if (getControl()?.form !== event.target) return;
    nextTick(() => {
      if (active && !event.defaultPrevented) reset(event);
    });
  };
  onMounted(() => {
    active = true;
    ownerDocument = getControl()?.ownerDocument;
    ownerDocument?.addEventListener('reset', onReset, true);
  });
  onBeforeUnmount(() => {
    active = false;
    ownerDocument?.removeEventListener('reset', onReset, true);
  });
}
