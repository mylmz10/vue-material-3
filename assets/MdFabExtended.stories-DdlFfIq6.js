import{e as o,d as a,h as n,t as d,b as r}from"./iframe-9ulbaOut.js";import{M as c}from"./MdElevationOverlay-8pRmAEcL.js";import{_ as i}from"./MdRipple-Bs_--NBl.js";import"./preload-helper-PPVm8Dsz.js";import"./_plugin-vue_export-helper-DlAUqK2U.js";const l=["disabled"],m={class:"material-icons md-fab__icon"},b={class:"md-fab__label"},s={__name:"MdFabExtended",props:{icon:{type:String},disabled:{type:Boolean},label:{type:String}},setup(e){return(_,x)=>(r(),o("button",{class:"md-fab--extended",disabled:e.disabled},[a(i),n("i",m,d(e.icon),1),n("span",b,d(e.label),1),a(c)],8,l))}},f={title:"Components/Fab",component:s,argTypes:{}},p=e=>({components:{MdFabExtended:s},setup(){return{args:e}},template:'<MdFabExtended v-bind="args"></MdFabExtended>'}),t=p.bind({});t.args={icon:"local_taxi",size:"medium",label:"Extended"};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`args => ({
  components: {
    MdFabExtended
  },
  setup() {
    return {
      args
    };
  },
  template: \`<MdFabExtended v-bind="args"></MdFabExtended>\`
})`,...t.parameters?.docs?.source}}};const y=["FabExtended"];export{t as FabExtended,y as __namedExportsOrder,f as default};
