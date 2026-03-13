import{e as l,h as t,B as s,n as m,g as i,b as p}from"./iframe-BZY2mGdK.js";import"./preload-helper-PPVm8Dsz.js";const o={__name:"MdLinearProgressIndicator",props:{value:{type:[String,Number],default:0},indeterminate:{type:Boolean}},setup(r){const n=r,d=i(()=>({width:n.indeterminate?"":`${n.value}%`})),c=i(()=>({width:`${n.value}%`}));return(g,a)=>(p(),l("div",{class:m(["md-linear-progress-indicator",{"md-linear-progress-indicator--indeterminate":r.indeterminate}])},[a[0]||(a[0]=t("div",{class:"md-linear-progress-indicator__track"},null,-1)),t("div",{class:"md-linear-progress-indicator__indicator",style:s(d.value)},null,4),t("div",{class:"md-linear-progress-indicator__indeterminate-indicator",style:s(c.value)},null,4)],2))}},I={title:"Components/Progress Indicators",component:o,argTypes:{}},u=r=>({components:{MdLinearProgressIndicator:o},setup(){return{args:r}},template:'<MdLinearProgressIndicator v-bind="args" />'}),e=u.bind({});e.args={value:40,indeterminate:!0};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`args => ({
  components: {
    MdLinearProgressIndicator
  },
  setup() {
    return {
      args
    };
  },
  template: \`<MdLinearProgressIndicator v-bind="args" />\`
})`,...e.parameters?.docs?.source}}};const P=["LinearProgressIndicator"];export{e as LinearProgressIndicator,P as __namedExportsOrder,I as default};
