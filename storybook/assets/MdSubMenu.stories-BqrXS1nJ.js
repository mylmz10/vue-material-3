import{r as t}from"./iframe-CyhFqfr4.js";import{_ as a}from"./MdMenu-Dbv2yJ7l.js";import{_ as e}from"./MdSubMenu-CPzTxiUT.js";import{_ as l}from"./MdMenuItem-BNFllDPy.js";import{_ as i}from"./MdFilledButton-5KcmpLF8.js";import"./preload-helper-PPVm8Dsz.js";import"./MdIcon-BEMmYXmO.js";import"./_plugin-vue_export-helper-DlAUqK2U.js";import"./MdRipple-C4lkPtii.js";import"./buttonSharedProps-BdE0bVRI.js";const S={title:"Components/Menu",component:e,args:{label:"Share",icon:"share"}},m=n=>({components:{MdMenu:a,MdSubMenu:e,MdMenuItem:l,MdFilledButton:i},setup(){const o=t(!1);return{args:n,open:o}},template:`<MdMenu v-model="open">
    <template #activator="{ onClick, onKeydown }">
      <MdFilledButton label="Open Menu" @click="onClick" @keydown="onKeydown" />
    </template>

    <MdMenuItem label="Profile" icon="person" />

    <MdSubMenu :label="args.label" :icon="args.icon">
      <MdMenuItem label="Copy link" icon="link" />
      <MdMenuItem label="Send email" icon="mail" />
      <MdMenuItem label="Share to workspace" icon="groups" />
    </MdSubMenu>
  </MdMenu>`}),k=m.bind({}),I=["SubMenu"];export{k as SubMenu,I as __namedExportsOrder,S as default};
