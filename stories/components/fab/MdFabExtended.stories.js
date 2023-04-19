import MdFabExtended from '../../../src/components/fab/MdFabExtended.vue';

export default {
  title: 'Components/Fab',
  component: MdFabExtended,
  argTypes: {},
};

const Template = (args) => ({
  components: { MdFabExtended },
  setup() {
    return { args };
  },
  template: `<MdFabExtended v-bind="args"></MdFabExtended>`,
});

export const FabExtended = Template.bind({});
FabExtended.args = {
  icon: 'local_taxi',
  size: 'medium',
  label: 'Extended'
};
