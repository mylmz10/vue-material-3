import MdMenu from '../../../src/components/menu/MdMenu.vue';
import MdMenuItem from '../../../src/components/menu/MdMenuItem.vue';
import MdSubMenu from '../../../src/components/menu/MdSubMenu.vue';
import MdFilledButton from '../../../src/components/button/MdFilledButton.vue';
import { ref } from 'vue';

export default {
  title: 'Components/Menu',
  component: MdMenu,
  args: {
    modelValue: false,
  },
};

const Template = (args) => ({
  components: { MdMenu, MdMenuItem, MdSubMenu, MdFilledButton },
  setup() {
    const open = ref(args.modelValue);
    return { args, open };
  },
  template: `<MdMenu v-model="open" :close-on-outside-click="args.closeOnOutsideClick" :close-on-select="args.closeOnSelect">
    <template #activator="{ onClick, onKeydown }">
      <MdFilledButton label="Open Menu" @click="onClick" @keydown="onKeydown" />
    </template>
    <MdMenuItem label="Profile" icon="person" />
    <MdSubMenu label="Share" icon="share">
      <MdMenuItem label="Copy Link" icon="link" />
      <MdMenuItem label="Email" icon="mail" />
    </MdSubMenu>
    <MdMenuItem label="Archive" icon="archive" />
    <MdMenuItem label="Delete" icon="delete" :disabled="true" />
  </MdMenu>`,
});

export const Menu = Template.bind({});
