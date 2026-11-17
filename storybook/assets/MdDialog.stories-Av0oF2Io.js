import{M as o}from"./MdDialog-V0_gnQhc.js";import{_ as r}from"./MdFilledButton-5KcmpLF8.js";import{_ as n}from"./MdTextButton-8AgsqCrM.js";import{_ as p}from"./MdOutlinedTextField-D92k8mBM.js";import{r as l}from"./iframe-CyhFqfr4.js";import"./MdElevationOverlay-Dgfe4iz2.js";import"./_plugin-vue_export-helper-DlAUqK2U.js";import"./buttonSharedProps-BdE0bVRI.js";import"./MdRipple-C4lkPtii.js";import"./MdIcon-BEMmYXmO.js";import"./MdTextField-BdX5Nitg.js";import"./useFormReset-tYqQrCfg.js";import"./fieldAttrs-BX5V2KeY.js";import"./MdOutlinedField-DWcHFzwH.js";import"./preload-helper-PPVm8Dsz.js";const B={title:"Components/Dialog",component:o,args:{closeOnEscape:!0,closeOnBackdropClick:!0,trapFocus:!0,restoreFocus:!0,initialFocus:"#dialog-primary-action"},argTypes:{modelValue:{control:!1}}},d=e=>({components:{MdDialog:o},setup(){return{args:e}},template:`<MdDialog :model-value="true" v-bind="args">
    <template #header>Header</template>
    <div>Lorem ipsum</div>
    <template #footer>Footer</template>
  </MdDialog>`}),m=e=>({components:{MdDialog:o,MdFilledButton:r,MdTextButton:n,MdOutlinedTextField:p},setup(){const t=l(!1),i=l({projectName:"Navigation + Overlay parity",owner:"Design Systems",notes:"Ship MdMenuItem, MdSubMenu, MdTabs, and dialog parity in one release."}),s=()=>{t.value=!0},a=()=>{t.value=!1};return{args:e,form:i,open:t,openDialog:s,closeDialog:a,saveChanges:()=>{a()}}},template:`<div style="padding: 24px; min-height: 420px;">
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
  </div>`}),C=d.bind({}),S=m.bind({}),w=["Dialog","DetailedDialog"];export{S as DetailedDialog,C as Dialog,w as __namedExportsOrder,B as default};
