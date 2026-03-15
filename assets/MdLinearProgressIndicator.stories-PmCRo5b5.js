import{e as n,n as t,E as s,b as o}from"./iframe-9ulbaOut.js";import"./preload-helper-PPVm8Dsz.js";const i=["value"],a={__name:"MdCircularProgressIndicator",props:{value:{type:[String,Number],default:0},indeterminate:{type:Boolean}},setup(r){return(d,l)=>(o(),n("progress",{value:r.indeterminate?void 0:r.value,style:s({"--p":r.value}),max:"100",class:t(["md-circular-progress-indicator",{"md-circular-progress-indicator--indeterminate":r.indeterminate}])},null,14,i))}},p={title:"Components/Progress Indicators",component:a,argTypes:{}},c=r=>({components:{MdCircularProgressIndicator:a},setup(){return{args:r}},template:'<MdCircularProgressIndicator v-bind="args" />'}),e=c.bind({});e.args={value:40,indeterminate:!0};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`args => ({
  components: {
    MdCircularProgressIndicator
  },
  setup() {
    return {
      args
    };
  },
  template: \`<MdCircularProgressIndicator v-bind="args" />\`
})`,...e.parameters?.docs?.source}}};const g=["CircularProgressIndicator"];export{e as CircularProgressIndicator,g as __namedExportsOrder,p as default};
