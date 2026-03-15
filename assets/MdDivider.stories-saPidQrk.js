import{_ as i}from"./MdDivider-agIluTJZ.js";import"./iframe-1pZw89sQ.js";import"./preload-helper-PPVm8Dsz.js";const l={title:"Components/Divider",component:i,args:{tag:"div",vertical:!1},argTypes:{tag:{control:"text"},vertical:{control:"boolean"}}},a=t=>({components:{MdDivider:i},setup(){return{args:t}},template:'<div style="max-width: 360px;"><MdDivider v-bind="args" /></div>'}),n=t=>({components:{MdDivider:i},setup(){return{args:t}},template:'<div style="height: 72px; display: inline-flex;"><MdDivider v-bind="args" vertical /></div>'}),e=a.bind({});e.args={tag:"div",vertical:!1};const r=n.bind({});r.args={tag:"div",vertical:!0};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`args => ({
  components: {
    MdDivider
  },
  setup() {
    return {
      args
    };
  },
  template: \`<div style="max-width: 360px;"><MdDivider v-bind="args" /></div>\`
})`,...e.parameters?.docs?.source}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`args => ({
  components: {
    MdDivider
  },
  setup() {
    return {
      args
    };
  },
  template: \`<div style="height: 72px; display: inline-flex;"><MdDivider v-bind="args" vertical /></div>\`
})`,...r.parameters?.docs?.source}}};const p=["Horizontal","Vertical"];export{e as Horizontal,r as Vertical,p as __namedExportsOrder,l as default};
