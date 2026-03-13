import MdMenuItem from '../../../src/components/menu/MdMenuItem.vue';

export default {
  title: 'Components/Menu',
  component: MdMenuItem,
  args: {
    label: 'Menu Item',
    icon: 'person',
    selected: false,
    disabled: false,
  },
};

const Template = (args) => ({
  components: { MdMenuItem },
  setup() {
    return { args };
  },
  template: `<div style="max-width: 320px; border-radius: 12px; border: 1px solid #ddd; overflow: hidden;">
    <MdMenuItem v-bind="args" />
  </div>`,
});

export const MenuItem = Template.bind({});
