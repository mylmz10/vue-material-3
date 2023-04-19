import MdRadio from '../../../src/components/radio/MdRadio.vue';

export default {
  title: 'Components/Radio',
  component: MdRadio,
  argTypes: {},
};

const Template = (args) => ({
  components: { MdRadio },
  setup() {
    return { args };
  },
  template: `<MdRadio v-bind="args" value="1" name="radio_1" /><MdRadio v-bind="args" value="2" name="radio_2" />`,
});

export const Radio = Template.bind({});
Radio.args = {
  modelValue: '2',
};
