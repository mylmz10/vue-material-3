import { ref, watch } from 'vue';
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
    watch(
      () => args.modelValue,
      (next) => {
        value.value = next;
      }
    );
    return { args, value };
  },
  template: `<div style="max-width: 320px;">
    <MdFilledAutoComplete v-bind="args" v-model="value" />
    <output aria-live="polite">{{ value }}</output>
  </div>`,
});

export const FilledAutoComplete = Template.bind({});
