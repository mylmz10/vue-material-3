import MdChipSet from '../../../src/components/chips/MdChipSet.vue';
import MdFilterChip from '../../../src/components/chips/MdFilterChip.vue';

export default {
  title: 'Components/Chips',
  component: MdChipSet,
  args: {
    selectionMode: 'single',
  },
};

const Template = (args) => ({
  components: { MdChipSet, MdFilterChip },
  data() {
    return {
      selectedChip: 1,
      selectedChips: [1],
    };
  },
  setup() {
    return { args };
  },
  template: `
    <div>
      <MdChipSet
        v-model="args.selectionMode === 'single' ? selectedChip : selectedChips"
        :selection-mode="args.selectionMode"
      >
        <MdFilterChip label="Item 1" :value="1" />
        <MdFilterChip label="Item 2" :value="2" />
        <MdFilterChip label="Item 3" :value="3" />
      </MdChipSet>
      <p style="font-family: sans-serif; margin-top: 12px;">
        Selected:
        {{ args.selectionMode === 'single' ? selectedChip : selectedChips.join(', ') }}
      </p>
    </div>
  `,
});

export const ChipSet = Template.bind({});
