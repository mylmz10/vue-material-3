import{e as o,d as i,h as l,j as p,t as m,l as u,n as g,b as c}from"./iframe-BkwO8pQ8.js";import{M as B}from"./MdElevationOverlay-DZjsR60H.js";import{_ as F}from"./MdRipple-DzJht9xn.js";import"./preload-helper-PPVm8Dsz.js";import"./_plugin-vue_export-helper-DlAUqK2U.js";const M=["disabled"],_={class:"md-branded-fab__icon"},f={class:"material-icons"},y={key:0,class:"md-branded-fab__label"},s={__name:"MdBrandedFab",props:{icon:{type:String},label:{type:String},disabled:{type:Boolean},size:{type:String,default:"medium",validator:e=>["medium","large"].includes(e)}},setup(e){return(b,v)=>(c(),o("button",{class:g(["md-branded-fab",{"md-branded-fab--large":e.size==="large"&&!e.label,"md-branded-fab--extended":!!e.label}]),disabled:e.disabled},[i(F),l("span",_,[p(b.$slots,"icon",{},()=>[l("i",f,m(e.icon),1)])]),e.label?(c(),o("span",y,m(e.label),1)):u("",!0),i(B)],10,M))}};s.__docgenInfo=Object.assign({displayName:s.name??s.__name},{exportName:"default",displayName:"MdBrandedFab",description:"",tags:{},props:[{name:"icon",type:{name:"string"}},{name:"label",type:{name:"string"}},{name:"disabled",type:{name:"boolean"}},{name:"size",type:{name:"string"},defaultValue:{func:!1,value:"'medium'"},values:["medium","large"]}],slots:[{name:"icon"}],sourceFiles:["/home/runner/work/vue-material-3/vue-material-3/src/components/fab/MdBrandedFab.vue"]});const k={title:"Components/Fab",component:s,argTypes:{}},t=e=>({components:{MdBrandedFab:s},setup(){return{args:e}},template:'<MdBrandedFab v-bind="args"></MdBrandedFab>'}),a=t.bind({});a.args={icon:"local_taxi",size:"medium"};const n=t.bind({});n.args={icon:"local_taxi",size:"large"};const d=t.bind({});d.args={icon:"local_taxi",size:"medium",disabled:!0};const r=t.bind({});r.args={icon:"local_taxi",label:"Add"};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`args => ({
  components: {
    MdBrandedFab
  },
  setup() {
    return {
      args
    };
  },
  template: \`<MdBrandedFab v-bind="args"></MdBrandedFab>\`
})`,...a.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`args => ({
  components: {
    MdBrandedFab
  },
  setup() {
    return {
      args
    };
  },
  template: \`<MdBrandedFab v-bind="args"></MdBrandedFab>\`
})`,...n.parameters?.docs?.source}}};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`args => ({
  components: {
    MdBrandedFab
  },
  setup() {
    return {
      args
    };
  },
  template: \`<MdBrandedFab v-bind="args"></MdBrandedFab>\`
})`,...d.parameters?.docs?.source}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`args => ({
  components: {
    MdBrandedFab
  },
  setup() {
    return {
      args
    };
  },
  template: \`<MdBrandedFab v-bind="args"></MdBrandedFab>\`
})`,...r.parameters?.docs?.source}}};const L=["BrandedFab","BrandedFabLarge","BrandedFabDisabled","BrandedFabLabeled"];export{a as BrandedFab,d as BrandedFabDisabled,r as BrandedFabLabeled,n as BrandedFabLarge,L as __namedExportsOrder,k as default};
