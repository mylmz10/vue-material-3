import MdCard from '../../../src/components/card/MdCard.vue';

export default {
  title: 'Components/Card',
  component: MdCard,
  argTypes: {},
};

const Template = (args) => ({
  components: { MdCard },
  setup() {
    return { args };
  },
  template: `<MdCard v-bind="args" style="min-height: 300px; width: 300px;">Elevated Card Content</MdCard>`,
});

export const Card = Template.bind({});
Card.args = {
  actionButtonText: 'Action',
  cancelButtonText: 'Cancel',
  avatar: 'https://dummyimage.com/96x96/ebebeb/000000&text=+MY+',
  image: 'https://dummyimage.com/720x376/ebebeb/000000',
  type: 'elevated',
  headerTitle: 'Header',
  headerSubTitle: 'Subhead',
};
