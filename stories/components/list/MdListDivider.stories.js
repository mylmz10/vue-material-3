import MdList from '../../../src/components/list/MdList.vue';
import MdListItem from '../../../src/components/list/MdListItem.vue';
import MdListDivider from '../../../src/components/list/MdListDivider.vue';

export default {
  title: 'Components/List',
  component: MdListDivider,
};

const Template = () => ({
  components: { MdList, MdListItem, MdListDivider },
  template: `<MdList>
    <MdListItem headline="General" icon="settings" />
    <MdListDivider />
    <MdListItem headline="Advanced" icon="tune" />
  </MdList>`,
});

export const ListDivider = Template.bind({});
