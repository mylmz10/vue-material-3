import MdList from '../../../src/components/list/MdList.vue';
import MdListItem from '../../../src/components/list/MdListItem.vue';
import MdListDivider from '../../../src/components/list/MdListDivider.vue';

export default {
  title: 'Components/List',
  component: MdList,
};

const Template = (args) => ({
  components: { MdList, MdListItem, MdListDivider },
  setup() {
    return { args };
  },
  template: `<MdList>
    <MdListItem headline="Wi-Fi" icon="wifi" trailing-text="On" />
    <MdListItem headline="Bluetooth" icon="bluetooth" trailing-text="Off" />
    <MdListDivider />
    <MdListItem
      headline="Notifications"
      supporting-text="Manage app notifications"
      :supporting-text-multiline="2"
      icon="notifications"
    />
  </MdList>`,
});

export const List = Template.bind({});
