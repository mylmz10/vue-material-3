import{_ as e}from"./MdSelectOption-wzG9iHUn.js";import"./iframe-Lp-48d2J.js";import"./preload-helper-PPVm8Dsz.js";const a={title:"Components/Select",component:e,argTypes:{}},n=t=>({components:{MdSelectOption:e},setup(){return{args:t}},template:`<ul style="list-style: none; margin: 0; max-width: 320px; padding: 0; border-radius: 12px; overflow: hidden; border: 1px solid #ddd;">
    <MdSelectOption value="">Select one</MdSelectOption>
    <MdSelectOption v-bind="args" display-text="Istanbul (TR)">Istanbul</MdSelectOption>
    <MdSelectOption value="ankara">Ankara</MdSelectOption>
    <MdSelectOption value="izmir" disabled>Izmir (disabled)</MdSelectOption>
  </ul>`}),l=n.bind({});l.args={value:"istanbul",selected:!0};const p=["SelectOption"];export{l as SelectOption,p as __namedExportsOrder,a as default};
