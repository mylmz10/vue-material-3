import MdSegmentedButton from '../../../src/components/segmented-button/MdSegmentedButton.vue';

export default {
  title: 'Components/Segmented Button',
  component: MdSegmentedButton,
  argTypes: {},
};

const Template = (args) => ({
  components: { MdSegmentedButton },
  data() {
    return {
      selectedChips: [],
    };
  },
  setup() {
    return { args };
  },
  template: `<MdSegmentedButton v-bind="args"></MdSegmentedButton>`,
});

export const SegmentedButton = Template.bind({});
SegmentedButton.args = {
  label: 'Item 1',
};
