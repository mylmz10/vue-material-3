import{r as t}from"./iframe-Lp-48d2J.js";import{_ as a}from"./MdMenu-BkkmfB1z.js";import{_ as e}from"./MdSubMenu-Ci_BPoIJ.js";import{_ as l}from"./MdMenuItem-zSFZk7On.js";import{_ as i}from"./MdFilledButton-BGD6zijk.js";import"./preload-helper-PPVm8Dsz.js";import"./MdIcon-LZTi8h9T.js";import"./_plugin-vue_export-helper-DlAUqK2U.js";import"./MdRipple-CmO0qzPD.js";import"./buttonSharedProps-BYuBugs9.js";const S={title:"Components/Menu",component:e,args:{label:"Share",icon:"share"}},m=n=>({components:{MdMenu:a,MdSubMenu:e,MdMenuItem:l,MdFilledButton:i},setup(){const o=t(!1);return{args:n,open:o}},template:`<MdMenu v-model="open">
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
