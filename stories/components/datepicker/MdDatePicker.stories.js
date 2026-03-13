import { ref } from 'vue';
import MdDatePicker from '../../../src/components/datepicker/MdDatePicker.vue';

export default {
  title: 'Components/DatePicker',
  component: MdDatePicker,
  args: {
    modelValue: '2026-03-14',
    locale: 'en',
    format: 'YYYY-MM-DD',
  },
};

const Template = (args) => ({
  components: { MdDatePicker },
  setup() {
    const value = ref(args.modelValue);
    return { args, value };
  },
  template: `<MdDatePicker v-model="value" :locale="args.locale" :format="args.format" />`,
});

export const DatePicker = Template.bind({});
