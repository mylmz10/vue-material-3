// jsdom has no dialog top layer. Browser checks verify modality and focus isolation.
if (typeof HTMLDialogElement !== 'undefined')
  Object.defineProperties(HTMLDialogElement.prototype, {
    showModal: {
      configurable: true,
      value() {
        this.setAttribute('open', '');
      },
    },
    close: {
      configurable: true,
      value() {
        if (!this.open) return;
        this.removeAttribute('open');
        this.dispatchEvent(new Event('close'));
      },
    },
  });
