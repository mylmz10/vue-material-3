import MdRadio from '../../../src/components/radio/MdRadio.vue';
import { ref, watch } from 'vue';

export default {
  title: 'Components/Radio',
  component: MdRadio,
  argTypes: {},
};

const Template = (args) => ({
  components: { MdRadio },
  setup() {
    const selectedValue = ref(args.modelValue);

    watch(
      () => args.modelValue,
      (value) => {
        selectedValue.value = value;
      }
    );

    return { args, selectedValue };
  },
  template: `
    <div style="display: flex; align-items: center; gap: 12px;">
      <MdRadio v-model="selectedValue" :disabled="args.disabled" value="1" name="radio" />
      <MdRadio v-model="selectedValue" :disabled="args.disabled" value="2" name="radio" />
    </div>
  `,
});

export const Radio = Template.bind({});
Radio.args = {
  modelValue: '2',
};
