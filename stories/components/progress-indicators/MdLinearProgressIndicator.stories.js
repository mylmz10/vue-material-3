import MdCircularProgressIndicator from '../../../src/components/progress-indicator/MdCircularProgressIndicator.vue';

export default {
  title: 'Components/Progress Indicators',
  component: MdCircularProgressIndicator,
  argTypes: {},
};

const Template = (args) => ({
  components: { MdCircularProgressIndicator },
  setup() {
    return { args };
  },
  template: `<MdCircularProgressIndicator v-bind="args" />`,
});

export const CircularProgressIndicator = Template.bind({});
CircularProgressIndicator.args = {
  value: 40,
  indeterminate: true,
};
