import{r as t}from"./iframe-_YuDW-c9.js";import{_ as a}from"./MdMenu-DBirIR54.js";import{_ as e}from"./MdSubMenu-BZGE73fP.js";import{_ as l}from"./MdMenuItem-DeV51BJo.js";import{_ as i}from"./MdFilledButton-CK3uqrVM.js";import"./preload-helper-PPVm8Dsz.js";import"./MdIcon-C8bhHnHI.js";import"./_plugin-vue_export-helper-DlAUqK2U.js";import"./MdRipple-DLmY9qaS.js";import"./buttonSharedProps-CAg6d_KT.js";const S={title:"Components/Menu",component:e,args:{label:"Share",icon:"share"}},m=n=>({components:{MdMenu:a,MdSubMenu:e,MdMenuItem:l,MdFilledButton:i},setup(){const o=t(!1);return{args:n,open:o}},template:`<MdMenu v-model="open">
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
