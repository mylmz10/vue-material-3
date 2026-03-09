import{c as m,w as s,o as a,a as r,b as n,t as l,r as d,d as c,e as u}from"./iframe-C_bcjK8c.js";import{b as p,_ as b}from"./buttonSharedProps-BOZcYx2C.js";import{_ as g}from"./MdRipple-BcHFM7kG.js";import{M as f}from"./MdIcon-ByZyJWIN.js";import"./preload-helper-PPVm8Dsz.js";import"./_plugin-vue_export-helper-DlAUqK2U.js";const _={key:0,class:"md-button__label"},B={key:1,class:"md-button__label"},y={key:2,class:"md-button__trailing-icon"},i={__name:"MdTextButton",props:{...p,label:{type:String},trailingIcon:{type:String}},setup(e){return(t,T)=>(a(),m(b,{class:"md-text-button",disabled:t.disabled,"soft-disabled":t.softDisabled,href:t.href,target:t.target,download:t.download,type:t.type},{default:s(()=>[r(g),e.label?(a(),n("span",_,l(e.label),1)):(a(),n("span",B,[d(t.$slots,"default")])),e.trailingIcon||t.$slots["trailing-icon"]?(a(),n("span",y,[d(t.$slots,"trailing-icon",{},()=>[r(f,null,{default:s(()=>[c(l(e.trailingIcon),1)]),_:1})])])):u("",!0)]),_:3},8,["disabled","soft-disabled","href","target","download","type"]))}},I={title:"Components/Buttons",component:i,argTypes:{}},h=e=>({components:{MdTextButton:i},setup(){return{args:e}},template:'<md-text-button v-bind="args" />'}),o=h.bind({});o.args={label:"Button"};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`args => ({
  components: {
    MdTextButton
  },
  setup() {
    return {
      args
    };
  },
  template: '<md-text-button v-bind="args" />'
})`,...o.parameters?.docs?.source}}};const C=["TextButton"];export{o as TextButton,C as __namedExportsOrder,I as default};
