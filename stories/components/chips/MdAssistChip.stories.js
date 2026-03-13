import MdAssistChip from '../../../src/components/chips/MdAssistChip.vue';

export default {
  title: 'Components/Chips',
  component: MdAssistChip,
  args: {
    label: 'Assist chip',
    leadingIcon: 'schedule',
    elevated: false,
    disabled: false,
  },
};

const Template = (args) => ({
  components: { MdAssistChip },
  setup() {
    return { args };
  },
  template: `<MdAssistChip v-bind="args" />`,
});

export const AssistChip = Template.bind({});
