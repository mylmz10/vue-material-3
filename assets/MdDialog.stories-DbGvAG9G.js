import{h as N,j as V,b as $,w as I,T as P,k as r,o as x,c as R,g as U,n as q,a as p,r as v,d as A,f as K,s as _}from"./iframe-4Lc6ThV1.js";import{M as L}from"./MdElevationOverlay-CY8xSza6.js";import{_ as H}from"./_plugin-vue_export-helper-DlAUqK2U.js";import{_ as z}from"./MdFilledButton-Bk8WzyK1.js";import{_ as G}from"./MdTextButton-CwFgZjsp.js";import{_ as J}from"./MdOutlinedTextField-CRrI4HA8.js";import"./preload-helper-PPVm8Dsz.js";import"./buttonSharedProps-Cr6A6QuV.js";import"./MdRipple-BFgpYy2F.js";import"./MdIcon-Cqy-6spS.js";import"./MdTextFieldBase-Dynrx9lv.js";import"./MdOutlinedField-CpjnI20c.js";import"./MdField-B4fkCVPc.js";const Q={class:"md-modal__header"},W={class:"md-modal__content"},X={class:"md-modal__footer"},Y='a[href],button:not([disabled]),textarea:not([disabled]),input:not([disabled]),select:not([disabled]),[tabindex]:not([tabindex="-1"]),[contenteditable="true"]',Z={__name:"MdDialog",props:{modelValue:{type:Boolean,default:!1},closeOnEscape:{type:Boolean,default:!0},closeOnBackdropClick:{type:Boolean,default:!0},trapFocus:{type:Boolean,default:!0},restoreFocus:{type:Boolean,default:!0},initialFocus:{type:[String,Function],default:null}},emits:["update:modelValue","open","opened","close","closed","cancel"],setup(d,{emit:c}){let l=0;const a=r(!1),i=r(null),o=r(null),b=r(null),n=d,s=c,B=()=>{typeof document>"u"||(l+=1,l===1&&(document.body.style.overflow="hidden"))},h=()=>{typeof document>"u"||(l=Math.max(0,l-1),l===0&&(document.body.style.overflow=""))},M=()=>o.value?Array.from(o.value.querySelectorAll(Y)).filter(e=>!e.hasAttribute("disabled")):[],O=()=>{if(!o.value)return null;if(typeof n.initialFocus=="string"&&n.initialFocus){const t=o.value.querySelector(n.initialFocus);if(t)return t}if(typeof n.initialFocus=="function"){const t=n.initialFocus(o.value);if(t)return t}const e=M();return e.length?e[0]:o.value},T=()=>{O()?.focus?.()},C=({source:e="programmatic",emitModelUpdate:t=!1}={})=>{a.value||(b.value=typeof document<"u"?document.activeElement:null,a.value=!0,B(),s("open",{source:e}),t&&s("update:modelValue",!0),_(()=>{T(),s("opened",{source:e})}))},D=({source:e="programmatic",emitModelUpdate:t=!1}={})=>{a.value&&(s("close",{source:e}),a.value=!1,h(),t&&s("update:modelValue",!1),_(()=>{n.restoreFocus&&b.value?.focus?.(),s("closed",{source:e})}))},g=e=>{e==="escape"&&!n.closeOnEscape||e==="backdrop"&&!n.closeOnBackdropClick||(s("cancel",{source:e}),D({source:e,emitModelUpdate:!0}))},S=()=>{g("escape")},E=e=>{e.target===i.value&&g("backdrop")},w=e=>{const t=M();if(!t.length){e.preventDefault(),o.value?.focus?.();return}const F=t[0],k=t[t.length-1],u=typeof document<"u"?document.activeElement:null;if(e.shiftKey){(u===F||u===o.value)&&(e.preventDefault(),k.focus());return}(u===k||u===i.value)&&(e.preventDefault(),F.focus())},j=e=>{if(e.key==="Escape"){e.preventDefault(),g("escape");return}e.key==="Tab"&&n.trapFocus&&w(e)};return N(()=>n.modelValue,e=>{e?C({source:"model"}):D({source:"model"})},{immediate:!0}),V(()=>{a.value&&h()}),(e,t)=>(x(),$(P,null,{default:I(()=>[a.value?(x(),R("dialog",{key:0,ref_key:"dialogEl",ref:i,class:q(["md-modal",{"md-modal--open":a.value}]),open:"",onCancel:U(S,["prevent"]),onClick:E,onKeydown:j},[p("div",{ref_key:"containerEl",ref:o,class:"md-modal__container",tabindex:"-1"},[p("div",Q,[v(e.$slots,"header",{},void 0,!0)]),p("div",W,[v(e.$slots,"default",{},void 0,!0)]),p("div",X,[v(e.$slots,"footer",{},void 0,!0)]),A(L)],512)],34)):K("",!0)]),_:3}))}},y=H(Z,[["__scopeId","data-v-6908bdc5"]]),ge={title:"Components/Dialog",component:y,args:{closeOnEscape:!0,closeOnBackdropClick:!0,trapFocus:!0,restoreFocus:!0,initialFocus:"#dialog-primary-action"},argTypes:{modelValue:{control:!1}}},ee=d=>({components:{MdDialog:y},setup(){return{args:d}},template:`<MdDialog :model-value="true" v-bind="args">
    <template #header>Header</template>
    <div>Lorem ipsum</div>
    <template #footer>Footer</template>
  </MdDialog>`}),te=d=>({components:{MdDialog:y,MdFilledButton:z,MdTextButton:G,MdOutlinedTextField:J},setup(){const c=r(!1),l=r({projectName:"Navigation + Overlay parity",owner:"Design Systems",notes:"Ship MdMenuItem, MdSubMenu, MdTabs, and dialog parity in one release."}),a=()=>{c.value=!0},i=()=>{c.value=!1};return{args:d,form:l,open:c,openDialog:a,closeDialog:i,saveChanges:()=>{i()}}},template:`<div style="padding: 24px; min-height: 420px;">
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
  </div>`}),m=ee.bind({}),f=te.bind({});m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`args => ({
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
})`,...m.parameters?.docs?.source}}};f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`args => ({
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
})`,...f.parameters?.docs?.source}}};const ve=["Dialog","DetailedDialog"];export{f as DetailedDialog,m as Dialog,ve as __namedExportsOrder,ge as default};
