import{e as n,d as s,h as o,t as r,n as i,b as d}from"./iframe-9ulbaOut.js";import{M as c}from"./MdElevationOverlay-8pRmAEcL.js";import{_ as m}from"./MdRipple-Bs_--NBl.js";import"./preload-helper-PPVm8Dsz.js";import"./_plugin-vue_export-helper-DlAUqK2U.js";const l=["disabled"],b={class:"material-icons md-fab__icon"},t={__name:"MdFab",props:{icon:{type:String},disabled:{type:Boolean},size:{type:String}},setup(a){return(u,_)=>(d(),n("button",{class:i(["md-fab",{"md-fab--small":a.size==="small","md-fab--large":a.size==="large"}]),disabled:a.disabled},[s(m),o("i",b,r(a.icon),1),s(c)],10,l))}},z={title:"Components/Fab",component:t,argTypes:{}},p=a=>({components:{MdFab:t},setup(){return{args:a}},template:'<MdFab v-bind="args"></MdFab>'}),e=p.bind({});e.args={icon:"local_taxi",size:"medium"};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`args => ({
  components: {
    MdFab
  },
  setup() {
    return {
      args
    };
  },
  template: \`<MdFab v-bind="args"></MdFab>\`
})`,...e.parameters?.docs?.source}}};const h=["Fab"];export{e as Fab,h as __namedExportsOrder,z as default};
