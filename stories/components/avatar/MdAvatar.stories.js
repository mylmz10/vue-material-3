import MdAvatar from '../../../src/components/avatar/MdAvatar.vue';

export default {
  title: 'Components/Avatar',
  component: MdAvatar,
  argTypes: {},
};

const Template = (args) => ({
  components: { MdAvatar },
  setup() {
    return { args };
  },
  template: `<MdAvatar v-bind="args"></MdAvatar>`,
});

export const Avatar = Template.bind({});
Avatar.args = {
  initials: 'MY',
};
