import MdBrandedFab from '../../../src/components/fab/MdBrandedFab.vue';

export default {
  title: 'Components/Fab',
  component: MdBrandedFab,
  argTypes: {},
};

const Template = (args) => ({
  components: { MdBrandedFab },
  setup() {
    return { args };
  },
  template: `<MdBrandedFab v-bind="args"></MdBrandedFab>`,
});

export const BrandedFab = Template.bind({});
BrandedFab.args = {
  icon: 'local_taxi',
  size: 'medium',
};

export const BrandedFabLarge = Template.bind({});
BrandedFabLarge.args = {
  icon: 'local_taxi',
  size: 'large',
};

export const BrandedFabDisabled = Template.bind({});
BrandedFabDisabled.args = {
  icon: 'local_taxi',
  size: 'medium',
  disabled: true,
};

export const BrandedFabLabeled = Template.bind({});
BrandedFabLabeled.args = {
  icon: 'local_taxi',
  label: 'Add',
};
