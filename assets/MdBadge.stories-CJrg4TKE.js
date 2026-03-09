import{_ as t}from"./MdBadge-DE_vbMft.js";import"./iframe-C_bcjK8c.js";import"./preload-helper-PPVm8Dsz.js";const d={title:"Components/Badge",component:t,argTypes:{value:{type:"text",control:{type:"text"}}}},r=a=>({components:{MdBadge:t},setup(){return{args:a}},template:'<div style="position: relative"><MdBadge v-bind="args"></MdBadge></div>'}),e=r.bind({});e.args={value:"10",absolute:!0};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`args => ({
  components: {
    MdBadge
  },
  setup() {
    return {
      args
    };
  },
  template: \`<div style="position: relative"><MdBadge v-bind="args"></MdBadge></div>\`
})`,...e.parameters?.docs?.source}}};const p=["Badge"];export{e as Badge,p as __namedExportsOrder,d as default};
