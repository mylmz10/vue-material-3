import{c as m,w as s,o as a,a as l,b as n,t as r,r as d,d as c,e as u}from"./iframe-C_bcjK8c.js";import{b as p,_ as b}from"./buttonSharedProps-BOZcYx2C.js";import{_ as f}from"./MdRipple-BcHFM7kG.js";import{M as g}from"./MdIcon-ByZyJWIN.js";import"./preload-helper-PPVm8Dsz.js";import"./_plugin-vue_export-helper-DlAUqK2U.js";const _={key:0,class:"md-button__label"},B={key:1,class:"md-button__label"},y={key:2,class:"md-button__trailing-icon"},i={__name:"MdFilledTonalButton",props:{...p,label:{type:String},trailingIcon:{type:String}},setup(e){return(t,T)=>(a(),m(b,{class:"md-filled-tonal-button",disabled:t.disabled,"soft-disabled":t.softDisabled,href:t.href,target:t.target,download:t.download,type:t.type},{default:s(()=>[l(f),e.label?(a(),n("span",_,r(e.label),1)):(a(),n("span",B,[d(t.$slots,"default")])),e.trailingIcon||t.$slots["trailing-icon"]?(a(),n("span",y,[d(t.$slots,"trailing-icon",{},()=>[l(g,null,{default:s(()=>[c(r(e.trailingIcon),1)]),_:1})])])):u("",!0)]),_:3},8,["disabled","soft-disabled","href","target","download","type"]))}},I={title:"Components/Buttons",component:i,argTypes:{}},h=e=>({components:{MdFilledTonalButton:i},setup(){return{args:e}},template:'<md-filled-tonal-button v-bind="args" />'}),o=h.bind({});o.args={label:"Button"};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`args => ({
  components: {
    MdFilledTonalButton
  },
  setup() {
    return {
      args
    };
  },
  template: '<md-filled-tonal-button v-bind="args" />'
})`,...o.parameters?.docs?.source}}};const C=["FilledTonalButton"];export{o as FilledTonalButton,C as __namedExportsOrder,I as default};
