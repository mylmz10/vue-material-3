import{_ as n}from"./MdMenu-DBirIR54.js";import{_ as t}from"./MdMenuItem-DeV51BJo.js";import{_ as l}from"./MdSubMenu-BZGE73fP.js";import{_ as i}from"./MdFilledButton-CK3uqrVM.js";import{r as m}from"./iframe-_YuDW-c9.js";import"./MdIcon-C8bhHnHI.js";import"./_plugin-vue_export-helper-DlAUqK2U.js";import"./MdRipple-DLmY9qaS.js";import"./buttonSharedProps-CAg6d_KT.js";import"./preload-helper-PPVm8Dsz.js";const k={title:"Components/Menu",component:n,args:{modelValue:!1}},a=e=>({components:{MdMenu:n,MdMenuItem:t,MdSubMenu:l,MdFilledButton:i},setup(){const o=m(e.modelValue);return{args:e,open:o}},template:`<MdMenu v-model="open" :close-on-outside-click="args.closeOnOutsideClick" :close-on-select="args.closeOnSelect">
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
