import{c as m,a as r,b as o,d as l,e as s,t as d,j as i,k as c,l as u}from"./iframe-BkwO8pQ8.js";import{b as p,_ as b}from"./buttonSharedProps-BmV0GGB_.js";import{_ as g}from"./MdRipple-DzJht9xn.js";import{M as f}from"./MdIcon-CAX4uc9J.js";import"./preload-helper-PPVm8Dsz.js";import"./_plugin-vue_export-helper-DlAUqK2U.js";const _={key:0,class:"md-button__label"},v={key:1,class:"md-button__label"},y={key:2,class:"md-button__trailing-icon"},n={__name:"MdElevatedButton",props:{...p,label:{type:String},trailingIcon:{type:String}},setup(t){return(e,h)=>(o(),m(b,{class:"md-elevated-button",disabled:e.disabled,"soft-disabled":e.softDisabled,href:e.href,target:e.target,download:e.download,type:e.type},{default:r(()=>[l(g),t.label?(o(),s("span",_,d(t.label),1)):(o(),s("span",v,[i(e.$slots,"default")])),t.trailingIcon||e.$slots["trailing-icon"]?(o(),s("span",y,[i(e.$slots,"trailing-icon",{},()=>[l(f,null,{default:r(()=>[c(d(t.trailingIcon),1)]),_:1})])])):u("",!0)]),_:3},8,["disabled","soft-disabled","href","target","download","type"]))}};n.__docgenInfo=Object.assign({displayName:n.name??n.__name},{exportName:"default",displayName:"MdElevatedButton",description:"",tags:{},props:[{name:"label",type:{name:"string"}},{name:"trailingIcon",type:{name:"string"}}],slots:[{name:"default"},{name:"trailing-icon"}],sourceFiles:["/home/runner/work/vue-material-3/vue-material-3/src/components/button/MdElevatedButton.vue"]});const w={title:"Components/Buttons",component:n,argTypes:{}},B=t=>({components:{MdElevatedButton:n},setup(){return{args:t}},template:'<md-elevated-button v-bind="args" />'}),a=B.bind({});a.args={label:"Button"};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`args => ({
  components: {
    MdElevatedButton
  },
  setup() {
    return {
      args
    };
  },
  template: '<md-elevated-button v-bind="args" />'
})`,...a.parameters?.docs?.source}}};const $=["ElevatedButton"];export{a as ElevatedButton,$ as __namedExportsOrder,w as default};
