import MdLinearProgressIndicator from '../../../src/components/progress-indicator/MdLinearProgressIndicator.vue';

export default {
  title: 'Components/Progress Indicators',
  component: MdLinearProgressIndicator,
  argTypes: {},
};

const Template = (args) => ({
  components: { MdLinearProgressIndicator },
  setup() {
    return { args };
  },
  template: `<MdLinearProgressIndicator v-bind="args" />`,
});

export const LinearProgressIndicator = Template.bind({});
LinearProgressIndicator.args = {
  value: 40,
  indeterminate: true,
};
