import MdDivider from '../../../src/components/divider/MdDivider.vue';

export default {
  title: 'Components/Divider',
  component: MdDivider,
  args: {
    tag: 'div',
    vertical: false,
  },
  argTypes: {
    tag: { control: 'text' },
    vertical: { control: 'boolean' },
  },
};

const HorizontalTemplate = (args) => ({
  components: { MdDivider },
  setup() {
    return { args };
  },
  template: `<div style="max-width: 360px;"><MdDivider v-bind="args" /></div>`,
});

const VerticalTemplate = (args) => ({
  components: { MdDivider },
  setup() {
    return { args };
  },
  template: `<div style="height: 72px; display: inline-flex;"><MdDivider v-bind="args" vertical /></div>`,
});

export const Horizontal = HorizontalTemplate.bind({});
Horizontal.args = {
  tag: 'div',
  vertical: false,
};

export const Vertical = VerticalTemplate.bind({});
Vertical.args = {
  tag: 'div',
  vertical: true,
};
