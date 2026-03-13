import MdFilterChip from '../../../src/components/chips/MdFilterChip.vue';

export default {
  title: 'Components/Chips',
  component: MdFilterChip,
  args: {
    label: 'Filter chip',
    selected: false,
    leadingIcon: '',
    disabled: false,
  },
};

const Template = (args) => ({
  components: { MdFilterChip },
  setup() {
    return { args };
  },
  template: `<MdFilterChip v-bind="args" />`,
});

export const FilterChip = Template.bind({});
