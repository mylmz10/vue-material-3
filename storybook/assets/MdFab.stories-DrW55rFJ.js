import{g as n,f as t,p as o,t as r,b as i,e as m}from"./iframe-Bo7-BOp5.js";import{M as d}from"./MdElevationOverlay-CBKC7xja.js";import{_ as c}from"./MdRipple-DHfXgmxP.js";import"./preload-helper-PPVm8Dsz.js";import"./_plugin-vue_export-helper-DlAUqK2U.js";const l=["disabled"],p={class:"material-icons md-fab__icon"},s={__name:"MdFab",props:{icon:{type:String},disabled:{type:Boolean},size:{type:String}},setup(e){return(u,g)=>(m(),n("button",{type:"button",class:i(["md-fab",{"md-fab--small":e.size==="small","md-fab--large":e.size==="large"}]),disabled:e.disabled},[t(c),o("i",p,r(e.icon),1),t(d)],10,l))}};s.__docgenInfo=Object.assign({displayName:s.name??s.__name},{exportName:"default",displayName:"MdFab",description:"",tags:{},props:[{name:"icon",type:{name:"string"}},{name:"disabled",type:{name:"boolean"}},{name:"size",type:{name:"string"}}],sourceFiles:["/home/runner/work/vue-material-3/vue-material-3/src/components/fab/MdFab.vue"]});const v={title:"Components/Fab",component:s,argTypes:{}},b=e=>({components:{MdFab:s},setup(){return{args:e}},template:'<MdFab v-bind="args"></MdFab>'}),a=b.bind({});a.args={icon:"local_taxi",size:"medium"};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`args => ({
  components: {
    MdFab
  },
  setup() {
    return {
      args
    };
  },
  template: \`<MdFab v-bind="args"></MdFab>\`
})`,...a.parameters?.docs?.source}}};const z=["Fab"];export{a as Fab,z as __namedExportsOrder,v as default};
