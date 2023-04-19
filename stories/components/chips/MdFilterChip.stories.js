import MdFilterChip from '../../../src/components/chips/MdFilterChip.vue';

export default {
  title: 'Components/Chips',
  component: MdFilterChip,
  argTypes: {},
};

const Template = (args) => ({
  components: { MdFilterChip },
  data() {
    return {
      selectedChips: [],
    };
  },
  setup() {
    return { args };
  },
  template: `<MdFilterChip v-bind="args"></MdFilterChip>`,
});

export const FilterChip = Template.bind({});
FilterChip.args = {
  label: 'Item 1',
};
