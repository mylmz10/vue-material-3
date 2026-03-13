import { ref } from 'vue';
import MdNavigationBar from '../../../src/components/navigation-bar/MdNavigationBar.vue';

export default {
  title: 'Components/NavigationBar',
  component: MdNavigationBar,
  args: {
    modelValue: 0,
    items: [
      { label: 'Flights', activeIcon: 'flight' },
      { label: 'Trips', activeIcon: 'luggage' },
      { label: 'Explore', activeIcon: 'explore' },
    ],
  },
};

const Template = (args) => ({
  components: { MdNavigationBar },
  setup() {
    const activeIndex = ref(args.modelValue);
    return { args, activeIndex };
  },
  template: `<div style="max-width: 420px;">
    <MdNavigationBar v-model="activeIndex" :items="args.items" />
  </div>`,
});

export const NavigationBar = Template.bind({});
