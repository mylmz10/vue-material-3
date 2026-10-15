import{e as o,d as n,h as d,t as s,b as r}from"./iframe-BkwO8pQ8.js";import{M as i}from"./MdElevationOverlay-DZjsR60H.js";import{_ as m}from"./MdRipple-DzJht9xn.js";import"./preload-helper-PPVm8Dsz.js";import"./_plugin-vue_export-helper-DlAUqK2U.js";const c=["disabled"],l={class:"material-icons md-fab__icon"},p={class:"md-fab__label"},t={__name:"MdFabExtended",props:{icon:{type:String},disabled:{type:Boolean},label:{type:String}},setup(e){return(_,u)=>(r(),o("button",{class:"md-fab--extended",disabled:e.disabled},[n(m),d("i",l,s(e.icon),1),d("span",p,s(e.label),1),n(i)],8,c))}};t.__docgenInfo=Object.assign({displayName:t.name??t.__name},{exportName:"default",displayName:"MdFabExtended",description:"",tags:{},props:[{name:"icon",type:{name:"string"}},{name:"disabled",type:{name:"boolean"}},{name:"label",type:{name:"string"}}],sourceFiles:["/home/runner/work/vue-material-3/vue-material-3/src/components/fab/MdFabExtended.vue"]});const M={title:"Components/Fab",component:t,argTypes:{}},b=e=>({components:{MdFabExtended:t},setup(){return{args:e}},template:'<MdFabExtended v-bind="args"></MdFabExtended>'}),a=b.bind({});a.args={icon:"local_taxi",size:"medium",label:"Extended"};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`args => ({
  components: {
    MdFabExtended
  },
  setup() {
    return {
      args
    };
  },
  template: \`<MdFabExtended v-bind="args"></MdFabExtended>\`
})`,...a.parameters?.docs?.source}}};const y=["FabExtended"];export{a as FabExtended,y as __namedExportsOrder,M as default};
