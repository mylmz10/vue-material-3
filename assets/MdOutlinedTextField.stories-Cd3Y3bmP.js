import{_ as n}from"./MdOutlinedTextField-ZAAHV9ek.js";import"./iframe-BZY2mGdK.js";import"./preload-helper-PPVm8Dsz.js";import"./MdTextFieldBase-DPgajM4b.js";import"./MdOutlinedField-B-DIdXHZ.js";import"./MdField-Uc3M5w1E.js";const m={title:"Components/TextFields",component:n,argTypes:{}},r=o=>({components:{MdOutlinedTextField:n},setup(){return{args:o}},template:'<md-outlined-text-field v-bind="args" />'}),e=r.bind({});e.args={label:"Outlined Label",modelValue:"",name:"outlined-text-field",supportingText:"Supporting text",prefix:"@",suffix:".com"};const t=r.bind({});t.args={label:"Outlined Label",modelValue:"",error:!0,errorText:"Please enter a valid value"};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`args => ({
  // Components used in your story \`template\` are defined in the \`components\` object
  components: {
    MdOutlinedTextField
  },
  // The story's \`args\` need to be mapped into the template through the \`setup()\` method
  setup() {
    return {
      args
    };
  },
  // And then the \`args\` are bound to your component with \`v-bind="args"\`
  template: '<md-outlined-text-field v-bind="args" />'
})`,...e.parameters?.docs?.source}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`args => ({
  // Components used in your story \`template\` are defined in the \`components\` object
  components: {
    MdOutlinedTextField
  },
  // The story's \`args\` need to be mapped into the template through the \`setup()\` method
  setup() {
    return {
      args
    };
  },
  // And then the \`args\` are bound to your component with \`v-bind="args"\`
  template: '<md-outlined-text-field v-bind="args" />'
})`,...t.parameters?.docs?.source}}};const u=["OutlinedTextField","OutlinedTextFieldError"];export{e as OutlinedTextField,t as OutlinedTextFieldError,u as __namedExportsOrder,m as default};
