import{g as s,p as n,t as o,b as r,e as d}from"./iframe-Bo7-BOp5.js";import"./preload-helper-PPVm8Dsz.js";const l={class:"md-badge__value"},t={__name:"MdBadge",props:{value:{type:[String,Number]},absolute:{type:Boolean,default:!0}},setup(e){return(m,i)=>(d(),s("div",{class:r(["md-badge",{"md-badge--large":e.value===0||!!e.value,"md-badge--absolute":!!e.absolute}])},[n("div",l,o(e.value),1)],2))}};t.__docgenInfo=Object.assign({displayName:t.name??t.__name},{exportName:"default",displayName:"MdBadge",description:"",tags:{},props:[{name:"value",type:{name:"string|number"}},{name:"absolute",type:{name:"boolean"},defaultValue:{func:!1,value:"true"}}],sourceFiles:["/home/runner/work/vue-material-3/vue-material-3/src/components/badge/MdBadge.vue"]});const p={title:"Components/Badge",component:t,argTypes:{value:{type:"text",control:{type:"text"}}}},u=e=>({components:{MdBadge:t},setup(){return{args:e}},template:'<div style="position: relative"><MdBadge v-bind="args"></MdBadge></div>'}),a=u.bind({});a.args={value:"10",absolute:!0};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`args => ({
  components: {
    MdBadge
  },
  setup() {
    return {
      args
    };
  },
  template: \`<div style="position: relative"><MdBadge v-bind="args"></MdBadge></div>\`
})`,...a.parameters?.docs?.source}}};const v=["Badge"];export{a as Badge,v as __namedExportsOrder,p as default};
