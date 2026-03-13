import{c as l,a as t,y as s,n as m,p as i,o as p}from"./iframe-4Lc6ThV1.js";import"./preload-helper-PPVm8Dsz.js";const o={__name:"MdLinearProgressIndicator",props:{value:{type:[String,Number],default:0},indeterminate:{type:Boolean}},setup(e){const n=e,d=i(()=>({width:n.indeterminate?"":`${n.value}%`})),c=i(()=>({width:`${n.value}%`}));return(g,a)=>(p(),l("div",{class:m(["md-linear-progress-indicator",{"md-linear-progress-indicator--indeterminate":e.indeterminate}])},[a[0]||(a[0]=t("div",{class:"md-linear-progress-indicator__track"},null,-1)),t("div",{class:"md-linear-progress-indicator__indicator",style:s(d.value)},null,4),t("div",{class:"md-linear-progress-indicator__indeterminate-indicator",style:s(c.value)},null,4)],2))}},I={title:"Components/Progress Indicators",component:o,argTypes:{}},u=e=>({components:{MdLinearProgressIndicator:o},setup(){return{args:e}},template:'<MdLinearProgressIndicator v-bind="args" />'}),r=u.bind({});r.args={value:40,indeterminate:!0};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`args => ({
  components: {
    MdLinearProgressIndicator
  },
  setup() {
    return {
      args
    };
  },
  template: \`<MdLinearProgressIndicator v-bind="args" />\`
})`,...r.parameters?.docs?.source}}};const y=["LinearProgressIndicator"];export{r as LinearProgressIndicator,y as __namedExportsOrder,I as default};
