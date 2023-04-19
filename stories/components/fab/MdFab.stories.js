import MdFab from '../../../src/components/fab/MdFab.vue';

export default {
  title: 'Components/Fab',
  component: MdFab,
  argTypes: {},
};

const Template = (args) => ({
  components: { MdFab },
  setup() {
    return { args };
  },
  template: `<MdFab v-bind="args"></MdFab>`,
});

export const Fab = Template.bind({});
Fab.args = {
  icon: 'local_taxi',
  size: 'medium'
};
