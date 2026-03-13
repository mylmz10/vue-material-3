import { ref } from 'vue';
import MdInputChip from '../../../src/components/chips/MdInputChip.vue';

export default {
  title: 'Components/Chips',
  component: MdInputChip,
  args: {
    label: 'Input chip',
    removable: true,
    selected: false,
    disabled: false,
  },
};

const Template = (args) => ({
  components: { MdInputChip },
  setup() {
    const removed = ref(false);

    const onRemove = () => {
      removed.value = true;
    };

    return { args, removed, onRemove };
  },
  template: `<div>
    <MdInputChip v-if="!removed" v-bind="args" @remove="onRemove" />
    <span v-else>Chip removed</span>
  </div>`,
});

export const InputChip = Template.bind({});
