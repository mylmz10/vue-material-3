import MdAssistChip from '../../../src/components/chips/MdAssistChip.vue';
import MdChip from '../../../src/components/chips/MdChip.vue';
import MdFilterChip from '../../../src/components/chips/MdFilterChip.vue';
import MdInputChip from '../../../src/components/chips/MdInputChip.vue';
import MdSuggestionChip from '../../../src/components/chips/MdSuggestionChip.vue';

export default {
  title: 'Components/Chip',
  component: MdChip,
  argTypes: {},
};

const CoreTemplate = (args) => ({
  components: { MdChip },
  setup() {
    return { args };
  },
  template: `<MdChip v-bind="args"></MdChip>`,
});

export const Chip = CoreTemplate.bind({});
Chip.args = {
  label: 'Filter',
  variant: 'filter',
  selected: false,
};

const WrapperTemplate = (args) => ({
  components: { MdAssistChip, MdFilterChip, MdInputChip, MdSuggestionChip },
  setup() {
    return { args };
  },
  template: `
    <div style="display: flex; flex-wrap: wrap; gap: 8px;">
      <MdAssistChip label="Assist" leading-icon="add" />
      <MdSuggestionChip label="Suggestion" leading-icon="lightbulb" />
      <MdFilterChip v-bind="args" />
      <MdInputChip label="Input" removable leading-icon="person" />
    </div>
  `,
});

export const Wrappers = WrapperTemplate.bind({});
Wrappers.args = {
  label: 'Filter',
  selected: true,
  leadingIcon: 'done',
  removable: false,
};

export const FilterChip = WrapperTemplate.bind({});
FilterChip.args = {
  label: 'Item 1',
  selected: false,
  leadingIcon: '',
};
