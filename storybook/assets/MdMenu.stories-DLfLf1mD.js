import{_ as o}from"./MdMenu-C0DyJriZ.js";import{_ as t}from"./MdMenuItem-BInuxs4j.js";import{_ as a}from"./MdSubMenu-B6jeorhY.js";import{_ as i}from"./MdFilledButton-DHuTB-q1.js";import{r as c}from"./iframe-ptqJW3i7.js";import"./MdIcon-Cp_j9SSS.js";import"./_plugin-vue_export-helper-DlAUqK2U.js";import"./MdRipple-C_zwpsz8.js";import"./buttonSharedProps-Do6KixBD.js";import"./preload-helper-PPVm8Dsz.js";const I={title:"Components/Menu",component:o,args:{modelValue:!1}},r=n=>({components:{MdMenu:o,MdMenuItem:t,MdSubMenu:a,MdFilledButton:i},setup(){const l=c(n.modelValue);return{args:n,open:l}},template:`<MdMenu v-model="open" :close-on-outside-click="args.closeOnOutsideClick" :close-on-select="args.closeOnSelect">
    <template #activator="{ onClick, onKeydown }">
      <MdFilledButton label="Open Menu" @click="onClick" @keydown="onKeydown" />
    </template>
    <MdMenuItem label="Profile" icon="person" />
    <MdSubMenu label="Share" icon="share">
      <MdMenuItem label="Copy Link" icon="link" />
      <MdMenuItem label="Email" icon="mail" />
    </MdSubMenu>
    <MdMenuItem label="Archive" icon="archive" />
    <MdMenuItem label="Delete" icon="delete" :disabled="true" />
  </MdMenu>`}),e=r.bind({});e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`args => ({
  components: {
    MdMenu,
    MdMenuItem,
    MdSubMenu,
    MdFilledButton
  },
  setup() {
    const open = ref(args.modelValue);
    return {
      args,
      open
    };
  },
  template: \`<MdMenu v-model="open" :close-on-outside-click="args.closeOnOutsideClick" :close-on-select="args.closeOnSelect">
    <template #activator="{ onClick, onKeydown }">
      <MdFilledButton label="Open Menu" @click="onClick" @keydown="onKeydown" />
    </template>
    <MdMenuItem label="Profile" icon="person" />
    <MdSubMenu label="Share" icon="share">
      <MdMenuItem label="Copy Link" icon="link" />
      <MdMenuItem label="Email" icon="mail" />
    </MdSubMenu>
    <MdMenuItem label="Archive" icon="archive" />
    <MdMenuItem label="Delete" icon="delete" :disabled="true" />
  </MdMenu>\`
})`,...e.parameters?.docs?.source}}};const S=["Menu"];export{e as Menu,S as __namedExportsOrder,I as default};
