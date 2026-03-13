import{_ as t}from"./MdFilledTextField-DieW2Uz-.js";import"./iframe-BZY2mGdK.js";import"./preload-helper-PPVm8Dsz.js";import"./MdTextFieldBase-DPgajM4b.js";import"./MdFilledField-BIqXMto8.js";import"./MdField-Uc3M5w1E.js";const m={title:"Components/TextFields",component:t,argTypes:{}},l=d=>({components:{MdFilledTextField:t},setup(){return{args:d}},template:'<md-filled-text-field v-bind="args" />'}),e=l.bind({});e.args={label:"Filled Label",modelValue:"",name:"filled-text-field",supportingText:"Supporting text",prefix:"$",suffix:"USD"};const r=l.bind({});r.args={label:"Filled Label",modelValue:"",error:!0,errorText:"Please enter a valid value"};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`args => ({
  components: {
    MdFilledTextField
  },
  setup() {
    return {
      args
    };
  },
  template: '<md-filled-text-field v-bind="args" />'
})`,...e.parameters?.docs?.source}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`args => ({
  components: {
    MdFilledTextField
  },
  setup() {
    return {
      args
    };
  },
  template: '<md-filled-text-field v-bind="args" />'
})`,...r.parameters?.docs?.source}}};const c=["FilledTextField","FilledTextFieldError"];export{e as FilledTextField,r as FilledTextFieldError,c as __namedExportsOrder,m as default};
