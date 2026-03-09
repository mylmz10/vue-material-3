import MdChipSet from '../../../src/components/chips/MdChipSet.vue';
import MdFilterChip from '../../../src/components/chips/MdFilterChip.vue';

export default {
  title: 'Components/ChipSet',
  component: MdChipSet,
  argTypes: {},
};

const SingleTemplate = (args) => ({
  components: { MdChipSet, MdFilterChip },
  data() {
    return {
      selectedChip: 1,
    };
  },
  setup() {
    return { args };
  },
  template: `
    <div>
      <MdChipSet v-model="selectedChip" selection-mode="single">
        <MdFilterChip label="Item 1" :value="0" />
        <MdFilterChip label="Item 2" :value="1" />
        <MdFilterChip label="Item 3" :value="2" />
      </MdChipSet>
      <p style="font-family: sans-serif; margin-top: 12px;">Selected: {{ selectedChip }}</p>
    </div>
  `,
});

const MultiTemplate = (args) => ({
  components: { MdChipSet, MdFilterChip },
  data() {
    return {
      selectedChips: ['alpha'],
    };
  },
  setup() {
    return { args };
  },
  template: `
    <div>
      <MdChipSet v-model="selectedChips" selection-mode="multi">
        <MdFilterChip label="Alpha" value="alpha" />
        <MdFilterChip label="Beta" value="beta" />
        <MdFilterChip label="Gamma" value="gamma" />
      </MdChipSet>
      <p style="font-family: sans-serif; margin-top: 12px;">Selected: {{ selectedChips }}</p>
    </div>
  `,
});

export const SingleSelection = SingleTemplate.bind({});
SingleSelection.args = {};

export const MultiSelection = MultiTemplate.bind({});
MultiSelection.args = {};
