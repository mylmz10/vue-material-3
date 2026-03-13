import { ref } from 'vue';
import MdMenu from '../../../src/components/menu/MdMenu.vue';
import MdSubMenu from '../../../src/components/menu/MdSubMenu.vue';
import MdMenuItem from '../../../src/components/menu/MdMenuItem.vue';
import MdFilledButton from '../../../src/components/button/MdFilledButton.vue';

export default {
  title: 'Components/Menu',
  component: MdSubMenu,
  args: {
    label: 'Share',
    icon: 'share',
  },
};

const Template = (args) => ({
  components: { MdMenu, MdSubMenu, MdMenuItem, MdFilledButton },
  setup() {
    const open = ref(false);
    return { args, open };
  },
  template: `<MdMenu v-model="open">
    <template #activator="{ onClick, onKeydown }">
      <MdFilledButton label="Open Menu" @click="onClick" @keydown="onKeydown" />
    </template>

    <MdMenuItem label="Profile" icon="person" />

    <MdSubMenu :label="args.label" :icon="args.icon">
      <MdMenuItem label="Copy link" icon="link" />
      <MdMenuItem label="Send email" icon="mail" />
      <MdMenuItem label="Share to workspace" icon="groups" />
    </MdSubMenu>
  </MdMenu>`,
});

export const SubMenu = Template.bind({});
