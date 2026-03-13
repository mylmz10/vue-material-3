import{c as s,a as o,t as d,n,o as r}from"./iframe-4Lc6ThV1.js";import"./preload-helper-PPVm8Dsz.js";const l={class:"md-badge__value"},t={__name:"MdBadge",props:{value:{type:[String,Number]},absolute:{type:Boolean,default:!0}},setup(e){return(i,g)=>(r(),s("div",{class:n(["md-badge",{"md-badge--large":!!e.value,"md-badge--absolute":!!e.absolute}])},[o("div",l,d(e.value),1)],2))}},m={title:"Components/Badge",component:t,argTypes:{value:{type:"text",control:{type:"text"}}}},c=e=>({components:{MdBadge:t},setup(){return{args:e}},template:'<div style="position: relative"><MdBadge v-bind="args"></MdBadge></div>'}),a=c.bind({});a.args={value:"10",absolute:!0};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`args => ({
  components: {
    MdBadge
  },
  setup() {
    return {
      args
    };
  },
  template: \`<div style="position: relative"><MdBadge v-bind="args"></MdBadge></div>\`
})`,...a.parameters?.docs?.source}}};const v=["Badge"];export{a as Badge,v as __namedExportsOrder,m as default};
