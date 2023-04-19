import { useArgs } from '@storybook/client-api';
import MdSegmentedButton from '../../../src/components/segmented-button/MdSegmentedButton.vue';
import MdSegmentedButtonSet from '../../../src/components/segmented-button/MdSegmentedButtonSet.vue';

export default {
  title: 'Components/Segmented Button',
  component: MdSegmentedButtonSet,
  argTypes: {},
};
const Template = (args) => {
  const [_, updateArgs] = useArgs();
  const { multiselect, modelValue } = _;

  if (multiselect) {
    if (!Array.isArray(modelValue)) {
      updateArgs({ ...args, modelValue: [1, 2] });
      args.modelValue = [1, 2];
    }
  } else {
    if (Array.isArray(modelValue)) {
      updateArgs({ ...args, modelValue: 1 });
      args.modelValue = 1;
    }
  }

  return {
    components: { MdSegmentedButton, MdSegmentedButtonSet },
    setup() {
      return { args };
    },
    template: `<MdSegmentedButtonSet v-bind="args" :items="[{ label: 'Day' }, { label: 'Week' }, { label: 'Month' }]"></MdSegmentedButtonSet>`,
  };
};

export const SegmentedButtonSet = Template.bind({});
SegmentedButtonSet.args = {
  multiselect: false,
  modelValue: 1,
};
