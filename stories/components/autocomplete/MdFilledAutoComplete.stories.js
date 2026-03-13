import { ref } from 'vue';
import MdFilledAutoComplete from '../../../src/components/autocomplete/MdFilledAutoComplete.vue';

export default {
  title: 'Components/Autocomplete',
  component: MdFilledAutoComplete,
  args: {
    modelValue: '',
    label: 'City',
    items: ['Istanbul', 'Ankara', 'Izmir', 'Antalya', 'Bursa', 'Eskisehir'],
  },
};

const Template = (args) => ({
  components: { MdFilledAutoComplete },
  setup() {
    const value = ref(args.modelValue);
    return { args, value };
  },
  template: `<div style="max-width: 320px;">
    <MdFilledAutoComplete v-model="value" :label="args.label" :items="args.items" />
  </div>`,
});

export const FilledAutoComplete = Template.bind({});
