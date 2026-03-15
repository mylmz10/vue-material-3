import{_ as o}from"./MdMenu-Dj1fQJpZ.js";import{_ as t}from"./MdMenuItem-BylX6xj4.js";import{_ as a}from"./MdSubMenu-D5Sq7lXB.js";import{_ as i}from"./MdFilledButton-QULIkT9M.js";import{r as c}from"./iframe-9ulbaOut.js";import"./MdIcon-roTV-g4b.js";import"./_plugin-vue_export-helper-DlAUqK2U.js";import"./MdRipple-Bs_--NBl.js";import"./buttonSharedProps-BLfmBJlP.js";import"./preload-helper-PPVm8Dsz.js";const I={title:"Components/Menu",component:o,args:{modelValue:!1}},r=n=>({components:{MdMenu:o,MdMenuItem:t,MdSubMenu:a,MdFilledButton:i},setup(){const l=c(n.modelValue);return{args:n,open:l}},template:`<MdMenu v-model="open" :close-on-outside-click="args.closeOnOutsideClick" :close-on-select="args.closeOnSelect">
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
