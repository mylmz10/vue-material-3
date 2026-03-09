import{c as m,w as s,o,a as r,b as n,t as l,r as d,d as c,e as u}from"./iframe-C_bcjK8c.js";import{b as p,_ as b}from"./buttonSharedProps-BOZcYx2C.js";import{_ as g}from"./MdRipple-BcHFM7kG.js";import{M as f}from"./MdIcon-ByZyJWIN.js";import"./preload-helper-PPVm8Dsz.js";import"./_plugin-vue_export-helper-DlAUqK2U.js";const _={key:0,class:"md-button__label"},v={key:1,class:"md-button__label"},B={key:2,class:"md-button__trailing-icon"},i={__name:"MdElevatedButton",props:{...p,label:{type:String},trailingIcon:{type:String}},setup(e){return(t,h)=>(o(),m(b,{class:"md-elevated-button",disabled:t.disabled,"soft-disabled":t.softDisabled,href:t.href,target:t.target,download:t.download,type:t.type},{default:s(()=>[r(g),e.label?(o(),n("span",_,l(e.label),1)):(o(),n("span",v,[d(t.$slots,"default")])),e.trailingIcon||t.$slots["trailing-icon"]?(o(),n("span",B,[d(t.$slots,"trailing-icon",{},()=>[r(f,null,{default:s(()=>[c(l(e.trailingIcon),1)]),_:1})])])):u("",!0)]),_:3},8,["disabled","soft-disabled","href","target","download","type"]))}},I={title:"Components/Buttons",component:i,argTypes:{}},y=e=>({components:{MdElevatedButton:i},setup(){return{args:e}},template:'<md-elevated-button v-bind="args" />'}),a=y.bind({});a.args={label:"Button"};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`args => ({
  components: {
    MdElevatedButton
  },
  setup() {
    return {
      args
    };
  },
  template: '<md-elevated-button v-bind="args" />'
})`,...a.parameters?.docs?.source}}};const C=["ElevatedButton"];export{a as ElevatedButton,C as __namedExportsOrder,I as default};
