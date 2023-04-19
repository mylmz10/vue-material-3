import MdChipSet from '../../../src/components/chips/MdChipSet.vue';
import MdFilterChip from '../../../src/components/chips/MdFilterChip.vue';

export default {
  title: 'Components/Chips',
  component: MdChipSet,
  argTypes: {},
};

const Template = (args) => ({
  components: { MdChipSet, MdFilterChip },
  data() {
    return {
      selectedChips: [],
    };
  },
  setup() {
    return { args };
  },
  template: `<MdChipSet v-model="selectedChips">
    <MdFilterChip style="margin: 0 4px" label="Item 1"></MdFilterChip>
    <MdFilterChip style="margin: 0 4px" label="Item 2"></MdFilterChip>
  </MdChipSet>`,
});

export const ChipSet = Template.bind({});
ChipSet.args = {};
