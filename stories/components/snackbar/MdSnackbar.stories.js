import { ref } from 'vue';
import MdSnackbar from '../../../src/components/snackbar/MdSnackbar.vue';
import MdFilledButton from '../../../src/components/button/MdFilledButton.vue';

export default {
  title: 'Components/Snackbar',
  component: MdSnackbar,
  args: {
    timeout: 6000,
    actionText: 'Undo',
    multiLine: false,
    longerAction: false,
  },
  argTypes: {
    modelValue: { control: false },
  },
};

const Template = (args) => ({
  components: { MdSnackbar, MdFilledButton },
  setup() {
    const open = ref(false);
    const snackbarKey = ref(0);

    const openSnackbar = () => {
      snackbarKey.value += 1;
      open.value = true;
    };

    return { args, open, snackbarKey, openSnackbar };
  },
  template: `<div style="min-height: 200px;">
    <MdFilledButton label="Open Snackbar" @click="openSnackbar" />
    <MdSnackbar
      :key="snackbarKey"
      v-model="open"
      :timeout="args.timeout"
      :action-text="args.actionText"
      :multi-line="args.multiLine"
      :longer-action="args.longerAction"
    />
  </div>`,
});

export const Snackbar = Template.bind({});
