import MdDialog from '../../../src/components/dialog/MdDialog.vue';
import MdFilledButton from '../../../src/components/button/MdFilledButton.vue';
import MdTextButton from '../../../src/components/button/MdTextButton.vue';
import MdOutlinedTextField from '../../../src/components/text-field/MdOutlinedTextField.vue';
import { ref } from 'vue';

export default {
  title: 'Components/Dialog',
  component: MdDialog,
  args: {
    closeOnEscape: true,
    closeOnBackdropClick: true,
    trapFocus: true,
    restoreFocus: true,
    initialFocus: '#dialog-primary-action',
  },
  argTypes: {
    modelValue: { control: false },
  },
};

const BasicTemplate = (args) => ({
  components: { MdDialog },
  setup() {
    return { args };
  },
  template: `<MdDialog :model-value="true" v-bind="args">
    <template #header>Header</template>
    <div>Lorem ipsum</div>
    <template #footer>Footer</template>
  </MdDialog>`,
});

const DetailedTemplate = (args) => ({
  components: { MdDialog, MdFilledButton, MdTextButton, MdOutlinedTextField },
  setup() {
    const open = ref(false);
    const form = ref({
      projectName: 'Navigation + Overlay parity',
      owner: 'Design Systems',
      notes: 'Ship MdMenuItem, MdSubMenu, MdTabs, and dialog parity in one release.',
    });

    const openDialog = () => {
      open.value = true;
    };

    const closeDialog = () => {
      open.value = false;
    };

    const saveChanges = () => {
      closeDialog();
    };

    return {
      args,
      form,
      open,
      openDialog,
      closeDialog,
      saveChanges,
    };
  },
  template: `<div style="padding: 24px; min-height: 420px;">
    <MdFilledButton label="Open Detailed Dialog" @click="openDialog" />

    <MdDialog
      v-model="open"
      :close-on-escape="args.closeOnEscape"
      :close-on-backdrop-click="args.closeOnBackdropClick"
      :trap-focus="args.trapFocus"
      :restore-focus="args.restoreFocus"
      :initial-focus="args.initialFocus"
    >
      <template #header>
        <div style="display: flex; flex-direction: column; gap: 4px;">
          <span>Project Settings</span>
          <small style="opacity: 0.72;">Review and update the release metadata before publishing.</small>
        </div>
      </template>

      <div style="display: grid; gap: 12px;">
        <MdOutlinedTextField
          v-model="form.projectName"
          label="Project name"
          supporting-text="Used in release notes and changelog."
        />

        <MdOutlinedTextField
          v-model="form.owner"
          label="Owner"
          supporting-text="Team or individual responsible for this release."
        />

        <MdOutlinedTextField
          v-model="form.notes"
          label="Release notes"
          supporting-text="Short summary for this wave."
        />
      </div>

      <template #footer>
        <MdTextButton label="Cancel" @click="closeDialog" />
        <MdFilledButton id="dialog-primary-action" label="Save Changes" @click="saveChanges" />
      </template>
    </MdDialog>
  </div>`,
});

export const Dialog = BasicTemplate.bind({});
export const DetailedDialog = DetailedTemplate.bind({});
