import MdDialog from '../../../src/components/dialog/MdDialog.vue';

export default {
  title: 'Components/Dialog',
  component: MdDialog,
  argTypes: {},
};

const Template = (args) => ({
  components: { MdDialog },
  setup() {
    return { args };
  },
  template: `<MdDialog v-bind="args">\n <template #header>Header</template> <div>Lorem ipsum</div> <template #footer>Footer</template> </MdDialog>`,
});

export const Dialog = Template.bind({});
Dialog.args = {
  modelValue: true
};
