import { ref } from 'vue';
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
    return { args, value };
  },
  template: `<div style="max-width: 320px;">
    <MdOutlinedAutoComplete v-model="value" :label="args.label" :items="args.items" />
  </div>`,
});

export const OutlinedAutoComplete = Template.bind({});
