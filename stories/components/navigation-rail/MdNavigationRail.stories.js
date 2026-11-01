import { ref } from 'vue';
import MdNavigationRail from '../../../src/components/navigation-rail/MdNavigationRail.vue';
export default { title: 'Components/NavigationRail', component: MdNavigationRail };
export const Standard = {
  render: () => ({
    components: { MdNavigationRail },
    setup: () => ({
      selected: ref(0),
      items: [
        { label: 'Home', icon: 'home' },
        { label: 'Inbox', icon: 'mail', badge: 3, badgeLabel: '3 unread messages' },
        { label: 'Settings', icon: 'settings' },
      ],
    }),
    template: '<MdNavigationRail v-model="selected" :items="items" />',
  }),
};
