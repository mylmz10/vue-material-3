import{r as l}from"./iframe-BkwO8pQ8.js";import{_ as a}from"./MdMenu-CCJ4F2Yw.js";import{_ as n}from"./MdSubMenu-C9QdBtYr.js";import{_ as r}from"./MdMenuItem-HVsbmStf.js";import{_ as M}from"./MdFilledButton-V4ssLdhD.js";import"./preload-helper-PPVm8Dsz.js";import"./MdIcon-CAX4uc9J.js";import"./_plugin-vue_export-helper-DlAUqK2U.js";import"./MdRipple-DzJht9xn.js";import"./buttonSharedProps-BmV0GGB_.js";const k={title:"Components/Menu",component:n,args:{label:"Share",icon:"share"}},i=o=>({components:{MdMenu:a,MdSubMenu:n,MdMenuItem:r,MdFilledButton:M},setup(){const t=l(!1);return{args:o,open:t}},template:`<MdMenu v-model="open">
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
