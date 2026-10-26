import{M as t}from"./MdDialog-CSi7GlCP.js";import{_ as d}from"./MdFilledButton-BZ6CpELC.js";import{_ as p}from"./MdTextButton-Du_MED8e.js";import{_ as c}from"./MdOutlinedTextField-6UOzQf03.js";import{r as s}from"./iframe-Bo7-BOp5.js";import"./MdElevationOverlay-CBKC7xja.js";import"./_plugin-vue_export-helper-DlAUqK2U.js";import"./buttonSharedProps-CMd8JqkZ.js";import"./MdRipple-DHfXgmxP.js";import"./MdIcon-DuMzCwGM.js";import"./MdTextFieldBase-DhuxwzHJ.js";import"./MdOutlinedField-DQs34f0V.js";import"./MdField-BCcSWpMB.js";import"./preload-helper-PPVm8Dsz.js";const S={title:"Components/Dialog",component:t,args:{closeOnEscape:!0,closeOnBackdropClick:!0,trapFocus:!0,restoreFocus:!0,initialFocus:"#dialog-primary-action"},argTypes:{modelValue:{control:!1}}},m=a=>({components:{MdDialog:t},setup(){return{args:a}},template:`<MdDialog :model-value="true" v-bind="args">
    <template #header>Header</template>
    <div>Lorem ipsum</div>
    <template #footer>Footer</template>
  </MdDialog>`}),g=a=>({components:{MdDialog:t,MdFilledButton:d,MdTextButton:p,MdOutlinedTextField:c},setup(){const o=s(!1),i=s({projectName:"Navigation + Overlay parity",owner:"Design Systems",notes:"Ship MdMenuItem, MdSubMenu, MdTabs, and dialog parity in one release."}),r=()=>{o.value=!0},l=()=>{o.value=!1};return{args:a,form:i,open:o,openDialog:r,closeDialog:l,saveChanges:()=>{l()}}},template:`<div style="padding: 24px; min-height: 420px;">
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
  </div>`}),e=m.bind({}),n=g.bind({});e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`args => ({
  components: {
    MdDialog
  },
  setup() {
    return {
      args
    };
  },
  template: \`<MdDialog :model-value="true" v-bind="args">
    <template #header>Header</template>
    <div>Lorem ipsum</div>
    <template #footer>Footer</template>
  </MdDialog>\`
})`,...e.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`args => ({
  components: {
    MdDialog,
    MdFilledButton,
    MdTextButton,
    MdOutlinedTextField
  },
  setup() {
    const open = ref(false);
    const form = ref({
      projectName: 'Navigation + Overlay parity',
      owner: 'Design Systems',
      notes: 'Ship MdMenuItem, MdSubMenu, MdTabs, and dialog parity in one release.'
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
      saveChanges
    };
  },
  template: \`<div style="padding: 24px; min-height: 420px;">
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
  </div>\`
})`,...n.parameters?.docs?.source}}};const _=["Dialog","DetailedDialog"];export{n as DetailedDialog,e as Dialog,_ as __namedExportsOrder,S as default};
