import { ref } from 'vue';
import MdNavigationDrawer from '../../../src/components/navigation-drawer/MdNavigationDrawer.vue';
import MdFilledButton from '../../../src/components/button/MdFilledButton.vue';
import MdList from '../../../src/components/list/MdList.vue';
import MdListItem from '../../../src/components/list/MdListItem.vue';

export default {
  title: 'Components/NavigationDrawer',
  component: MdNavigationDrawer,
  args: {
    opened: true,
    modal: false,
  },
};

const Template = (args) => ({
  components: { MdNavigationDrawer, MdFilledButton, MdList, MdListItem },
  setup() {
    const opened = ref(args.opened);

    const toggle = () => {
      opened.value = !opened.value;
    };

    return { args, opened, toggle };
  },
  template: `<div style="position: relative; min-height: 320px; padding: 16px;">
    <MdFilledButton :label="opened ? 'Close Drawer' : 'Open Drawer'" @click="toggle" />
    <div style="margin-top: 12px; max-width: 360px;">
      <MdNavigationDrawer :opened="opened" :modal="args.modal" @change="opened = $event">
        <MdList>
          <MdListItem headline="Inbox" icon="inbox" :selected="true" />
          <MdListItem headline="Starred" icon="star" />
          <MdListItem headline="Sent" icon="send" />
        </MdList>
      </MdNavigationDrawer>
    </div>
  </div>`,
});

export const NavigationDrawer = Template.bind({});
