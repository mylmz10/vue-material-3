import{M as o}from"./MdDialog-BCMgsUuo.js";import{_ as r}from"./MdFilledButton-BGD6zijk.js";import{_ as n}from"./MdTextButton-CZJc4F_u.js";import{_ as p}from"./MdOutlinedTextField-DYUBCux7.js";import{r as i}from"./iframe-Lp-48d2J.js";import"./MdElevationOverlay-QZQOqc0r.js";import"./_plugin-vue_export-helper-DlAUqK2U.js";import"./buttonSharedProps-BYuBugs9.js";import"./MdRipple-CmO0qzPD.js";import"./MdIcon-LZTi8h9T.js";import"./useFormReset-DRi5-P0g.js";import"./MdTextFieldBase-Dxyqn14z.js";import"./fieldAttrs-BX5V2KeY.js";import"./MdOutlinedField-e9d_48z8.js";import"./MdField-gWage71D.js";import"./preload-helper-PPVm8Dsz.js";const C={title:"Components/Dialog",component:o,args:{closeOnEscape:!0,closeOnBackdropClick:!0,trapFocus:!0,restoreFocus:!0,initialFocus:"#dialog-primary-action"},argTypes:{modelValue:{control:!1}}},d=e=>({components:{MdDialog:o},setup(){return{args:e}},template:`<MdDialog :model-value="true" v-bind="args">
    <template #header>Header</template>
    <div>Lorem ipsum</div>
    <template #footer>Footer</template>
  </MdDialog>`}),m=e=>({components:{MdDialog:o,MdFilledButton:r,MdTextButton:n,MdOutlinedTextField:p},setup(){const t=i(!1),l=i({projectName:"Navigation + Overlay parity",owner:"Design Systems",notes:"Ship MdMenuItem, MdSubMenu, MdTabs, and dialog parity in one release."}),s=()=>{t.value=!0},a=()=>{t.value=!1};return{args:e,form:l,open:t,openDialog:s,closeDialog:a,saveChanges:()=>{a()}}},template:`<div style="padding: 24px; min-height: 420px;">
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
  </div>`}),S=d.bind({}),w=m.bind({}),j=["Dialog","DetailedDialog"];export{w as DetailedDialog,S as Dialog,j as __namedExportsOrder,C as default};
