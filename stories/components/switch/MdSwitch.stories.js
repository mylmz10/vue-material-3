import MdSwitch from '../../../src/components/switch/MdSwitch.vue';

export default {
  title: 'Components/Switch',
  component: MdSwitch,
  argTypes: {},
};

const Template = (args) => ({
  components: { MdSwitch },
  setup() {
    return { args };
  },
  template: `<MdSwitch v-bind="args" />`,
});

export const Switch = Template.bind({});
Switch.args = {};
