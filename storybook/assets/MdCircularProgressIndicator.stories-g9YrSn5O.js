import{g as o,p as i,n as d,b as l,k as m,e as c}from"./iframe-Bo7-BOp5.js";import"./preload-helper-PPVm8Dsz.js";const u=["aria-label","aria-valuemin","aria-valuemax","aria-valuenow"],r={__name:"MdLinearProgressIndicator",props:{ariaLabel:{type:String,default:"Progress"},value:{type:[String,Number],default:0},indeterminate:{type:Boolean}},setup(e){const n=e,s=m(()=>({width:n.indeterminate?"":`${n.value}%`}));return(p,t)=>(c(),o("div",{class:l(["md-linear-progress-indicator",{"md-linear-progress-indicator--indeterminate":e.indeterminate}]),role:"progressbar","aria-label":e.ariaLabel,"aria-valuemin":e.indeterminate?void 0:0,"aria-valuemax":e.indeterminate?void 0:100,"aria-valuenow":e.indeterminate?void 0:e.value},[t[0]||(t[0]=i("div",{class:"md-linear-progress-indicator__track"},null,-1)),i("div",{class:"md-linear-progress-indicator__indicator",style:d(s.value)},null,4)],10,u))}};r.__docgenInfo=Object.assign({displayName:r.name??r.__name},{exportName:"default",displayName:"MdLinearProgressIndicator",description:"",tags:{},props:[{name:"ariaLabel",type:{name:"string"},defaultValue:{func:!1,value:"'Progress'"}},{name:"value",type:{name:"string|number"},defaultValue:{func:!1,value:"0"}},{name:"indeterminate",type:{name:"boolean"}}],sourceFiles:["/home/runner/work/vue-material-3/vue-material-3/src/components/progress-indicator/MdLinearProgressIndicator.vue"]});const b={title:"Components/Progress Indicators",component:r,argTypes:{}},g=e=>({components:{MdLinearProgressIndicator:r},setup(){return{args:e}},template:'<MdLinearProgressIndicator v-bind="args" />'}),a=g.bind({});a.args={value:40,indeterminate:!0};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`args => ({
  components: {
    MdLinearProgressIndicator
  },
  setup() {
    return {
      args
    };
  },
  template: \`<MdLinearProgressIndicator v-bind="args" />\`
})`,...a.parameters?.docs?.source}}};const P=["LinearProgressIndicator"];export{a as LinearProgressIndicator,P as __namedExportsOrder,b as default};
