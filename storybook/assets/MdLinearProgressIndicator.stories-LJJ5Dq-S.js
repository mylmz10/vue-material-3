import{e as n,n as s,I as t,b as o}from"./iframe-BkwO8pQ8.js";import"./preload-helper-PPVm8Dsz.js";const i=["value"],a={__name:"MdCircularProgressIndicator",props:{value:{type:[String,Number],default:0},indeterminate:{type:Boolean}},setup(e){return(d,l)=>(o(),n("progress",{value:e.indeterminate?void 0:e.value,style:t({"--p":e.value}),max:"100",class:s(["md-circular-progress-indicator",{"md-circular-progress-indicator--indeterminate":e.indeterminate}])},null,14,i))}};a.__docgenInfo=Object.assign({displayName:a.name??a.__name},{exportName:"default",displayName:"MdCircularProgressIndicator",description:"",tags:{},props:[{name:"value",type:{name:"string|number"},defaultValue:{func:!1,value:"0"}},{name:"indeterminate",type:{name:"boolean"}}],sourceFiles:["/home/runner/work/vue-material-3/vue-material-3/src/components/progress-indicator/MdCircularProgressIndicator.vue"]});const p={title:"Components/Progress Indicators",component:a,argTypes:{}},c=e=>({components:{MdCircularProgressIndicator:a},setup(){return{args:e}},template:'<MdCircularProgressIndicator v-bind="args" />'}),r=c.bind({});r.args={value:40,indeterminate:!0};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`args => ({
  components: {
    MdCircularProgressIndicator
  },
  setup() {
    return {
      args
    };
  },
  template: \`<MdCircularProgressIndicator v-bind="args" />\`
})`,...r.parameters?.docs?.source}}};const g=["CircularProgressIndicator"];export{r as CircularProgressIndicator,g as __namedExportsOrder,p as default};
