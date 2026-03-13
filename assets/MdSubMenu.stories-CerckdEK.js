import{r as l}from"./iframe-BZY2mGdK.js";import{_ as a}from"./MdMenu-D8AnMNqO.js";import{_ as n}from"./MdSubMenu-BIV23O1O.js";import{_ as r}from"./MdMenuItem-CtxHinB-.js";import{_ as M}from"./MdFilledButton-BkjlfHw4.js";import"./preload-helper-PPVm8Dsz.js";import"./MdIcon-BgVvRcVs.js";import"./_plugin-vue_export-helper-DlAUqK2U.js";import"./MdRipple-qtXqqLlf.js";import"./buttonSharedProps-CQjuewrW.js";const k={title:"Components/Menu",component:n,args:{label:"Share",icon:"share"}},i=o=>({components:{MdMenu:a,MdSubMenu:n,MdMenuItem:r,MdFilledButton:M},setup(){const t=l(!1);return{args:o,open:t}},template:`<MdMenu v-model="open">
    <template #activator="{ onClick, onKeydown }">
      <MdFilledButton label="Open Menu" @click="onClick" @keydown="onKeydown" />
    </template>

    <MdMenuItem label="Profile" icon="person" />

    <MdSubMenu :label="args.label" :icon="args.icon">
      <MdMenuItem label="Copy link" icon="link" />
      <MdMenuItem label="Send email" icon="mail" />
      <MdMenuItem label="Share to workspace" icon="groups" />
    </MdSubMenu>
  </MdMenu>`}),e=i.bind({});e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`args => ({
  components: {
    MdMenu,
    MdSubMenu,
    MdMenuItem,
    MdFilledButton
  },
  setup() {
    const open = ref(false);
    return {
      args,
      open
    };
  },
  template: \`<MdMenu v-model="open">
    <template #activator="{ onClick, onKeydown }">
      <MdFilledButton label="Open Menu" @click="onClick" @keydown="onKeydown" />
    </template>

    <MdMenuItem label="Profile" icon="person" />

    <MdSubMenu :label="args.label" :icon="args.icon">
      <MdMenuItem label="Copy link" icon="link" />
      <MdMenuItem label="Send email" icon="mail" />
      <MdMenuItem label="Share to workspace" icon="groups" />
    </MdSubMenu>
  </MdMenu>\`
})`,...e.parameters?.docs?.source}}};const g=["SubMenu"];export{e as SubMenu,g as __namedExportsOrder,k as default};
