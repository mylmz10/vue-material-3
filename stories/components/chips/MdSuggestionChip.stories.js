import MdSuggestionChip from '../../../src/components/chips/MdSuggestionChip.vue';

export default {
  title: 'Components/Chips',
  component: MdSuggestionChip,
  args: {
    label: 'Suggestion chip',
    leadingIcon: 'lightbulb',
    elevated: false,
    disabled: false,
  },
};

const Template = (args) => ({
  components: { MdSuggestionChip },
  setup() {
    return { args };
  },
  template: `<MdSuggestionChip v-bind="args" />`,
});

export const SuggestionChip = Template.bind({});
