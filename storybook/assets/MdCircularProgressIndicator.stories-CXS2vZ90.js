import{e as l,h as t,I as i,n as m,g as o,b as p}from"./iframe-BkwO8pQ8.js";import"./preload-helper-PPVm8Dsz.js";const r={__name:"MdLinearProgressIndicator",props:{value:{type:[String,Number],default:0},indeterminate:{type:Boolean}},setup(n){const a=n,d=o(()=>({width:a.indeterminate?"":`${a.value}%`})),c=o(()=>({width:`${a.value}%`}));return(g,s)=>(p(),l("div",{class:m(["md-linear-progress-indicator",{"md-linear-progress-indicator--indeterminate":n.indeterminate}])},[s[0]||(s[0]=t("div",{class:"md-linear-progress-indicator__track"},null,-1)),t("div",{class:"md-linear-progress-indicator__indicator",style:i(d.value)},null,4),t("div",{class:"md-linear-progress-indicator__indeterminate-indicator",style:i(c.value)},null,4)],2))}};r.__docgenInfo=Object.assign({displayName:r.name??r.__name},{exportName:"default",displayName:"MdLinearProgressIndicator",description:"",tags:{},props:[{name:"value",type:{name:"string|number"},defaultValue:{func:!1,value:"0"}},{name:"indeterminate",type:{name:"boolean"}}],sourceFiles:["/home/runner/work/vue-material-3/vue-material-3/src/components/progress-indicator/MdLinearProgressIndicator.vue"]});const I={title:"Components/Progress Indicators",component:r,argTypes:{}},u=n=>({components:{MdLinearProgressIndicator:r},setup(){return{args:n}},template:'<MdLinearProgressIndicator v-bind="args" />'}),e=u.bind({});e.args={value:40,indeterminate:!0};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`args => ({
  components: {
    MdLinearProgressIndicator
  },
  setup() {
    return {
      args
    };
  },
  template: \`<MdLinearProgressIndicator v-bind="args" />\`
})`,...e.parameters?.docs?.source}}};const y=["LinearProgressIndicator"];export{e as LinearProgressIndicator,y as __namedExportsOrder,I as default};
