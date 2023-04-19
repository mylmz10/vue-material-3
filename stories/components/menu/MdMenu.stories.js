import MdMenu from '../../../src/components/menu/MdMenu.vue';
import MdList from '../../../src/components/list/MdList.vue';
import MdListItem from '../../../src/components/list/MdListItem.vue';
import MdBadge from '../../../src/components/badge/MdBadge.vue';

export default {
  title: 'Components/Menu',
  component: MdMenu,
  argTypes: {},
};

const Template = (args) => ({
  components: { MdMenu, MdList, MdListItem, MdBadge },
  setup() {
    return { args };
  },
  template: `<MdMenu v-bind="args"> 
    <template v-slot:activator="props"> 
      <MdFilledButton label="Open Menu" v-bind="props"></MdFilledButton>
    </template>
    <MdList>
      <MdListItem headline="Headline" supportingText="Supporting Text"></MdListItem>
      <MdListDivider></MdListDivider>
      <MdListItem headline="Headline">
        <template #end=""><MdBadge value="33" :absolute="false"></MdBadge></template>
      </MdListItem>
      <MdListItem trailingText="18">Trash</MdListItem>
    </MdList>
    </MdMenu>`,
});

export const Menu = Template.bind({});
Menu.args = {
  modelValue: true,
};
