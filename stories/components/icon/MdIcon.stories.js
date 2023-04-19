import MdIcon from '../../../src/components/icon/MdIcon.vue';

export default {
  title: 'Components/Icon',
  component: MdIcon,
  argTypes: {},
};

const Template = (args) => ({
  components: { MdIcon },
  setup() {
    return { args };
  },
  template: '<md-icon>star</md-icon>',
});

export const Icon = Template.bind({});
Icon.args = {};
