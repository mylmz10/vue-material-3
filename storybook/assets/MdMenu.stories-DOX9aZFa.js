import{_ as n}from"./MdMenu-BkkmfB1z.js";import{_ as t}from"./MdMenuItem-zSFZk7On.js";import{_ as l}from"./MdSubMenu-Ci_BPoIJ.js";import{_ as i}from"./MdFilledButton-BGD6zijk.js";import{r as m}from"./iframe-Lp-48d2J.js";import"./MdIcon-LZTi8h9T.js";import"./_plugin-vue_export-helper-DlAUqK2U.js";import"./MdRipple-CmO0qzPD.js";import"./buttonSharedProps-BYuBugs9.js";import"./preload-helper-PPVm8Dsz.js";const k={title:"Components/Menu",component:n,args:{modelValue:!1}},a=e=>({components:{MdMenu:n,MdMenuItem:t,MdSubMenu:l,MdFilledButton:i},setup(){const o=m(e.modelValue);return{args:e,open:o}},template:`<MdMenu v-model="open" :close-on-outside-click="args.closeOnOutsideClick" :close-on-select="args.closeOnSelect">
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
  </MdMenu>`}),I=a.bind({}),C=["Menu"];export{I as Menu,C as __namedExportsOrder,k as default};
