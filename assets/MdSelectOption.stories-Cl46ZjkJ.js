import{_ as t}from"./MdSelectOption-sss32IvD.js";import"./iframe-BZY2mGdK.js";import"./preload-helper-PPVm8Dsz.js";const i={title:"Components/Select",component:t,argTypes:{}},d=n=>({components:{MdSelectOption:t},setup(){return{args:n}},template:`<ul style="list-style: none; margin: 0; max-width: 320px; padding: 0; border-radius: 12px; overflow: hidden; border: 1px solid #ddd;">
    <MdSelectOption value="">Select one</MdSelectOption>
    <MdSelectOption v-bind="args" display-text="Istanbul (TR)">Istanbul</MdSelectOption>
    <MdSelectOption value="ankara">Ankara</MdSelectOption>
    <MdSelectOption value="izmir" disabled>Izmir (disabled)</MdSelectOption>
  </ul>`}),e=d.bind({});e.args={value:"istanbul",selected:!0};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`args => ({
  components: {
    MdSelectOption
  },
  setup() {
    return {
      args
    };
  },
  template: \`<ul style="list-style: none; margin: 0; max-width: 320px; padding: 0; border-radius: 12px; overflow: hidden; border: 1px solid #ddd;">
    <MdSelectOption value="">Select one</MdSelectOption>
    <MdSelectOption v-bind="args" display-text="Istanbul (TR)">Istanbul</MdSelectOption>
    <MdSelectOption value="ankara">Ankara</MdSelectOption>
    <MdSelectOption value="izmir" disabled>Izmir (disabled)</MdSelectOption>
  </ul>\`
})`,...e.parameters?.docs?.source}}};const r=["SelectOption"];export{e as SelectOption,r as __namedExportsOrder,i as default};
