import{c as m,a as s,b as o,d as r,e as l,t as i,j as d,k as c,l as u}from"./iframe-BkwO8pQ8.js";import{b as p,_ as b}from"./buttonSharedProps-BmV0GGB_.js";import{_ as g}from"./MdRipple-DzJht9xn.js";import{M as f}from"./MdIcon-CAX4uc9J.js";import"./preload-helper-PPVm8Dsz.js";import"./_plugin-vue_export-helper-DlAUqK2U.js";const _={key:0,class:"md-button__label"},y={key:1,class:"md-button__label"},B={key:2,class:"md-button__trailing-icon"},a={__name:"MdFilledTonalButton",props:{...p,label:{type:String},trailingIcon:{type:String}},setup(t){return(e,h)=>(o(),m(b,{class:"md-filled-tonal-button",disabled:e.disabled,"soft-disabled":e.softDisabled,href:e.href,target:e.target,download:e.download,type:e.type},{default:s(()=>[r(g),t.label?(o(),l("span",_,i(t.label),1)):(o(),l("span",y,[d(e.$slots,"default")])),t.trailingIcon||e.$slots["trailing-icon"]?(o(),l("span",B,[d(e.$slots,"trailing-icon",{},()=>[r(f,null,{default:s(()=>[c(i(t.trailingIcon),1)]),_:1})])])):u("",!0)]),_:3},8,["disabled","soft-disabled","href","target","download","type"]))}};a.__docgenInfo=Object.assign({displayName:a.name??a.__name},{exportName:"default",displayName:"MdFilledTonalButton",description:"",tags:{},props:[{name:"label",type:{name:"string"}},{name:"trailingIcon",type:{name:"string"}}],slots:[{name:"default"},{name:"trailing-icon"}],sourceFiles:["/home/runner/work/vue-material-3/vue-material-3/src/components/button/MdFilledTonalButton.vue"]});const v={title:"Components/Buttons",component:a,argTypes:{}},T=t=>({components:{MdFilledTonalButton:a},setup(){return{args:t}},template:'<md-filled-tonal-button v-bind="args" />'}),n=T.bind({});n.args={label:"Button"};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`args => ({
  components: {
    MdFilledTonalButton
  },
  setup() {
    return {
      args
    };
  },
  template: '<md-filled-tonal-button v-bind="args" />'
})`,...n.parameters?.docs?.source}}};const w=["FilledTonalButton"];export{n as FilledTonalButton,w as __namedExportsOrder,v as default};
