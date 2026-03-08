import { ref } from 'vue';
import MdIconButton from '../../../src/components/icon-button/MdIconButton.vue';

export default {
  title: 'Components/Icon Button',
  component: MdIconButton,
  argTypes: {
    icon: { control: 'text' },
    selectedIcon: { control: 'text' },
    disabled: { control: 'boolean' },
    softDisabled: { control: 'boolean' },
    filled: { control: 'boolean' },
    tonal: { control: 'boolean' },
    outlined: { control: 'boolean' },
    toggle: { control: 'boolean' },
    selected: { control: 'boolean' },
    href: { control: 'text' },
    target: { control: 'text' },
    download: { control: 'text' },
  },
};

const Template = (args) => ({
  components: { MdIconButton },
  setup() {
    return { args };
  },
  template: '<md-icon-button v-bind="args" />',
});

export const IconButton = Template.bind({});
IconButton.args = {
  icon: 'star',
};

const ToggleTemplate = (args) => ({
  components: { MdIconButton },
  setup() {
    const selected = ref(args.selected ?? false);
    return { args, selected };
  },
  template: '<md-icon-button v-bind="args" v-model:selected="selected" :selected-icon="args.selectedIcon" />',
});

export const Toggle = ToggleTemplate.bind({});
Toggle.args = {
  icon: 'visibility',
  selectedIcon: 'visibility_off',
  toggle: true,
  selected: false,
};

export const Link = Template.bind({});
Link.args = {
  icon: 'open_in_new',
  href: 'https://google.com',
  target: '_blank',
};

export const SoftDisabled = Template.bind({});
SoftDisabled.args = {
  icon: 'favorite',
  softDisabled: true,
};
