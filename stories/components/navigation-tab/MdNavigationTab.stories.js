import MdNavigationTab from '../../../src/components/navigation-tab/MdNavigationTab.vue';

export default {
  title: 'Components/NavigationTab',
  component: MdNavigationTab,
  args: {
    label: 'Flights',
    activeIcon: 'flight',
    selected: false,
  },
};

const Template = (args) => ({
  components: { MdNavigationTab },
  setup() {
    return { args };
  },
  template: `<div style="display: flex; max-width: 168px; background: #f3edf7; border-radius: 16px;">
    <MdNavigationTab v-bind="args" />
  </div>`,
});

export const NavigationTab = Template.bind({});
export const SelectedNavigationTab = Template.bind({});
SelectedNavigationTab.args = {
  selected: true,
};
