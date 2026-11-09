import { ref, watch } from 'vue';
import MdOutlinedAutoComplete from '../../../src/components/autocomplete/MdOutlinedAutoComplete.vue';

export default {
  title: 'Components/Autocomplete',
  component: MdOutlinedAutoComplete,
  args: {
    modelValue: '',
    label: 'City',
    items: ['Istanbul', 'Ankara', 'Izmir', 'Antalya', 'Bursa', 'Eskisehir'],
  },
};

const Template = (args) => ({
  components: { MdOutlinedAutoComplete },
  setup() {
    const value = ref(args.modelValue);
    watch(
      () => args.modelValue,
      (next) => {
        value.value = next;
      }
    );
    return { args, value };
  },
  template: `<div style="max-width: 320px;">
    <MdOutlinedAutoComplete v-bind="args" v-model="value" />
    <output aria-live="polite">{{ value }}</output>
  </div>`,
});

export const OutlinedAutoComplete = Template.bind({});

export const OutlinedObjectOptions = Template.bind({});
OutlinedObjectOptions.args = {
  label: 'User',
  modelValue: 2,
  clearable: true,
  items: [
    { value: 1, label: 'Alex' },
    { value: 2, label: 'Alex' },
    { value: 3, label: 'Unavailable', disabled: true },
  ],
};

export const OutlinedModal = Template.bind({});
OutlinedModal.args = { ...OutlinedObjectOptions.args, mode: 'modal', debounce: 150, noResultsText: 'No users found' };
