import MdBadge from '../../../src/components/badge/MdBadge.vue';

export default {
  title: 'Components/Badge',
  component: MdBadge,
  argTypes: {
    value: {
      type: 'text',
      control: {
        type: 'text',
      },
    }
  },
};

const Template = (args) => ({
  components: { MdBadge },
  setup() {
    return { args };
  },
  template: `<div style="position: relative"><MdBadge v-bind="args"></MdBadge></div>`,
});

export const Badge = Template.bind({});
Badge.args = {
  value: '10',
  absolute: true
};
