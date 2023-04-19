<script>
import { h } from 'vue';
import MdFilterChip from './MdFilterChip.vue';

export default {
  props: {
    modelValue: {
      type: [Number, Array],
    },
  },
  setup(props, context) {
    const { slots, emit } = context;

    const selectChip = (index) => {
      emit('update:modelValue', index);
    };

    const slotItems = slots.default() || [];
    return () =>
      h(
        'div',
        {
          class: 'md-chip-set',
        },
        slotItems.map((item, index) => {
          return h(MdFilterChip, {
            ...item.props,
            selected: index === props.modelValue,
            onClick: () => selectChip(index),
          });
        })
      );
  },
};
</script>

<style lang="scss">
.md-chip-set {
  display: flex;
}
</style>
