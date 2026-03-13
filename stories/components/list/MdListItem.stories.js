import MdList from '../../../src/components/list/MdList.vue';
import MdListItem from '../../../src/components/list/MdListItem.vue';

export default {
  title: 'Components/List',
  component: MdListItem,
  args: {
    headline: 'Account',
    supportingText: 'Personal profile and security',
    icon: 'person',
    trailingText: 'Edit',
    selected: false,
  },
};

const Template = (args) => ({
  components: { MdList, MdListItem },
  setup() {
    return { args };
  },
  template: `<MdList>
    <MdListItem v-bind="args" />
  </MdList>`,
});

export const ListItem = Template.bind({});
