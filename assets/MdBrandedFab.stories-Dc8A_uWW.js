import{b as t,a as o,f as c,r as p,t as i,e as u,n as g,o as l}from"./iframe-C_bcjK8c.js";import{M as B}from"./MdElevationOverlay-BHp_TcX3.js";import{_ as F}from"./MdRipple-BcHFM7kG.js";import"./preload-helper-PPVm8Dsz.js";import"./_plugin-vue_export-helper-DlAUqK2U.js";const M=["disabled"],_={class:"md-branded-fab__icon"},f={class:"material-icons"},S={key:0,class:"md-branded-fab__label"},b={__name:"MdBrandedFab",props:{icon:{type:String},label:{type:String},disabled:{type:Boolean},size:{type:String,default:"medium",validator:a=>["medium","large"].includes(a)}},setup(a){return(m,v)=>(l(),t("button",{class:g(["md-branded-fab",{"md-branded-fab--large":a.size==="large"&&!a.label,"md-branded-fab--extended":!!a.label}]),disabled:a.disabled},[o(F),c("span",_,[p(m.$slots,"icon",{},()=>[c("i",f,i(a.icon),1)])]),a.label?(l(),t("span",S,i(a.label),1)):u("",!0),o(B)],10,M))}},k={title:"Components/Fab",component:b,argTypes:{}},s=a=>({components:{MdBrandedFab:b},setup(){return{args:a}},template:'<MdBrandedFab v-bind="args"></MdBrandedFab>'}),e=s.bind({});e.args={icon:"local_taxi",size:"medium"};const n=s.bind({});n.args={icon:"local_taxi",size:"large"};const r=s.bind({});r.args={icon:"local_taxi",size:"medium",disabled:!0};const d=s.bind({});d.args={icon:"local_taxi",label:"Add"};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`args => ({
  components: {
    MdBrandedFab
  },
  setup() {
    return {
      args
    };
  },
  template: \`<MdBrandedFab v-bind="args"></MdBrandedFab>\`
})`,...e.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`args => ({
  components: {
    MdBrandedFab
  },
  setup() {
    return {
      args
    };
  },
  template: \`<MdBrandedFab v-bind="args"></MdBrandedFab>\`
})`,...n.parameters?.docs?.source}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`args => ({
  components: {
    MdBrandedFab
  },
  setup() {
    return {
      args
    };
  },
  template: \`<MdBrandedFab v-bind="args"></MdBrandedFab>\`
})`,...r.parameters?.docs?.source}}};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`args => ({
  components: {
    MdBrandedFab
  },
  setup() {
    return {
      args
    };
  },
  template: \`<MdBrandedFab v-bind="args"></MdBrandedFab>\`
})`,...d.parameters?.docs?.source}}};const C=["BrandedFab","BrandedFabLarge","BrandedFabDisabled","BrandedFabLabeled"];export{e as BrandedFab,r as BrandedFabDisabled,d as BrandedFabLabeled,n as BrandedFabLarge,C as __namedExportsOrder,k as default};
