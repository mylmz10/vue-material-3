<script>
import { h } from 'vue';

export default {
  name: 'MdChipSet',
  props: {
    modelValue: {
      type: [String, Number, Boolean, Object, Array],
      default: undefined,
    },
    selectionMode: {
      type: String,
      default: 'single',
      validator: (value) => ['single', 'multi'].includes(value),
    },
  },
  emits: ['update:modelValue', 'change'],
  data() {
    return {
      activeIndex: 0,
    };
  },
  computed: {
    isMulti() {
      if (this.selectionMode === 'multi') {
        return true;
      }

      if (this.selectionMode === 'single') {
        return false;
      }

      return Array.isArray(this.modelValue);
    },
    normalizedModelArray() {
      if (Array.isArray(this.modelValue)) {
        return this.modelValue;
      }

      if (this.modelValue === undefined || this.modelValue === null) {
        return [];
      }

      return [this.modelValue];
    },
  },
  mounted() {
    this.$nextTick(this.syncActiveIndex);
  },
  watch: {
    modelValue() {
      this.$nextTick(this.syncActiveIndex);
    },
    selectionMode() {
      this.$nextTick(this.syncActiveIndex);
    },
  },
  methods: {
    getSlotItems() {
      const items = this.$slots.default ? this.$slots.default() : [];
      return items.filter((item) => item && typeof item.type !== 'symbol');
    },
    getItemValue(item, index) {
      if (item?.props?.value !== undefined) {
        return item.props.value;
      }

      return index;
    },
    isItemSelected(item, index) {
      if (this.modelValue === undefined) {
        return !!item?.props?.selected;
      }

      const value = this.getItemValue(item, index);
      if (!this.isMulti) {
        return this.modelValue === value;
      }

      return this.normalizedModelArray.includes(value);
    },
    emitSelection(nextValue) {
      this.$emit('update:modelValue', nextValue);
      this.$emit('change', nextValue);
    },
    applySingleSelection(value) {
      this.emitSelection(value);
    },
    applyMultiSelection(value, selected) {
      const currentValues = [...this.normalizedModelArray];
      const valueIndex = currentValues.findIndex((item) => item === value);

      if (selected && valueIndex === -1) {
        currentValues.push(value);
      }

      if (!selected && valueIndex !== -1) {
        currentValues.splice(valueIndex, 1);
      }

      this.emitSelection(currentValues);
    },
    handleChipSelection(item, index, selected) {
      if (this.modelValue === undefined) {
        return;
      }

      const value = this.getItemValue(item, index);

      if (!this.isMulti) {
        if (selected) {
          this.applySingleSelection(value);
        }
        return;
      }

      this.applyMultiSelection(value, selected);
    },
    handleChipClick(index, event) {
      if (event?.defaultPrevented) {
        return;
      }

      this.activeIndex = index;
    },
    getChipElements() {
      if (!this.$el) {
        return [];
      }

      return Array.from(this.$el.querySelectorAll('[data-md-chip="true"]'));
    },
    resolveCurrentIndex(chipElements) {
      if (!chipElements.length) {
        return 0;
      }

      const focusedIndex =
        typeof document !== 'undefined' ? chipElements.findIndex((chipElement) => chipElement === document.activeElement) : -1;

      if (focusedIndex !== -1) {
        return focusedIndex;
      }

      return Math.max(0, Math.min(this.activeIndex, chipElements.length - 1));
    },
    focusChip(index) {
      const chipElements = this.getChipElements();
      if (!chipElements.length) {
        return;
      }

      const boundedIndex = Math.max(0, Math.min(index, chipElements.length - 1));
      this.activeIndex = boundedIndex;
      chipElements[boundedIndex]?.focus();
    },
    syncActiveIndex() {
      const slotItems = this.getSlotItems();
      if (!slotItems.length) {
        this.activeIndex = 0;
        return;
      }

      const firstSelectedIndex = slotItems.findIndex((item, index) => this.isItemSelected(item, index));

      if (firstSelectedIndex !== -1) {
        this.activeIndex = firstSelectedIndex;
        return;
      }

      this.activeIndex = Math.max(0, Math.min(this.activeIndex, slotItems.length - 1));
    },
    handleKeydown(event) {
      const chipElements = this.getChipElements();
      if (!chipElements.length) {
        return;
      }

      const isChipEventTarget = !!event.target?.closest?.('[data-md-chip="true"]');
      const currentIndex = this.resolveCurrentIndex(chipElements);

      if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
        event.preventDefault();
        this.focusChip((currentIndex + 1) % chipElements.length);
        return;
      }

      if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
        event.preventDefault();
        this.focusChip((currentIndex - 1 + chipElements.length) % chipElements.length);
        return;
      }

      if (event.key === 'Home') {
        event.preventDefault();
        this.focusChip(0);
        return;
      }

      if (event.key === 'End') {
        event.preventDefault();
        this.focusChip(chipElements.length - 1);
        return;
      }

      if (event.key === 'Enter' || event.key === ' ') {
        if (isChipEventTarget) {
          return;
        }

        event.preventDefault();
        chipElements[currentIndex]?.click();
      }
    },
  },
  render() {
    const slotItems = this.getSlotItems();

    return h(
      'div',
      {
        class: 'md-chip-set',
        role: 'listbox',
        'aria-multiselectable': this.isMulti ? 'true' : undefined,
        onKeydown: this.handleKeydown,
      },
      slotItems.map((item, index) => {
        const selected = this.isItemSelected(item, index);
        const originalClick = item?.props?.onClick;
        const originalUpdateSelected = item?.props?.['onUpdate:selected'];
        const originalFocus = item?.props?.onFocus;

        return h(
          item.type,
          {
            ...item.props,
            key: item?.key ?? index,
            selected,
            tabIndex: index === this.activeIndex ? 0 : -1,
            onClick: (event) => {
              originalClick?.(event);
              this.handleChipClick(index, event);
            },
            'onUpdate:selected': (nextSelected) => {
              originalUpdateSelected?.(nextSelected);
              this.handleChipSelection(item, index, !!nextSelected);
            },
            onFocus: (event) => {
              this.activeIndex = index;
              originalFocus?.(event);
            },
          },
          item.children,
        );
      }),
    );
  },
};
</script>

<style lang="scss">
.md-chip-set {
  align-items: center;
  box-sizing: border-box;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}
</style>
