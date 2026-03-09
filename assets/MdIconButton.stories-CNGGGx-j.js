import{l as k,i as j,c as f,w as m,n as q,h as G,p as t,o as s,a as J,f as K,b as Q,F as R,d as v,t as y,r as S}from"./iframe-C_bcjK8c.js";import{_ as U}from"./MdRipple-BcHFM7kG.js";import{M as h}from"./MdIcon-ByZyJWIN.js";import"./preload-helper-PPVm8Dsz.js";import"./_plugin-vue_export-helper-DlAUqK2U.js";const W={class:"md-icon-button__icon"},I={__name:"MdIconButton",props:{icon:{type:String},selectedIcon:{type:String},disabled:{type:Boolean,default:!1},softDisabled:{type:Boolean,default:!1},filled:{type:Boolean,default:!1},tonal:{type:Boolean,default:!1},outlined:{type:Boolean,default:!1},toggle:{type:Boolean,default:!1},selected:{type:Boolean,default:!1},href:{type:String,default:""},download:{type:String,default:""},target:{type:String,default:""},type:{type:String,default:"submit"},name:{type:String},value:{type:[String,Number]},form:{type:String},formAction:{type:String},formEnctype:{type:String},formMethod:{type:String},formNoValidate:{type:Boolean,default:!1},formTarget:{type:String},tabIndex:{type:[Number,String],default:void 0}},emits:["update:selected","input","change"],setup(o,{emit:p}){const e=o,b=p,u=k(e.selected);j(()=>e.selected,a=>{u.value=a});const n=t(()=>!!e.href),g=t(()=>u.value),D=t(()=>({"md-icon-button--filled":e.filled,"md-icon-button--tonal":e.tonal,"md-icon-button--outlined":e.outlined,"md-icon-button--toggle":e.toggle,"md-icon-button--selected":g.value,"md-icon-button--disabled":e.disabled,"md-icon-button--soft-disabled":e.softDisabled})),x=t(()=>n.value?void 0:e.disabled),M=t(()=>n.value?void 0:e.type),T=t(()=>n.value?e.href:void 0),w=t(()=>n.value&&e.target?e.target:void 0),N=t(()=>n.value&&e.download?e.download:void 0),_=t(()=>{if(e.softDisabled||e.disabled&&n.value)return"true"}),F=t(()=>e.toggle?String(g.value):void 0),C=t(()=>{if(e.tabIndex!==void 0)return e.tabIndex;if(n.value&&e.disabled&&!e.softDisabled)return-1}),V=t(()=>n.value?void 0:e.name),E=t(()=>n.value?void 0:e.value),$=t(()=>n.value?void 0:e.form),A=t(()=>n.value?void 0:e.formAction),L=t(()=>n.value?void 0:e.formEnctype),P=t(()=>n.value?void 0:e.formMethod),z=t(()=>!n.value&&e.formNoValidate?!0:void 0),H=t(()=>n.value?void 0:e.formTarget),O=a=>{if(e.softDisabled||e.disabled&&n.value){a.preventDefault(),a.stopImmediatePropagation();return}if(!e.toggle||a.defaultPrevented)return;const l=!u.value;u.value=l,b("update:selected",l),b("input",l),b("change",l)};return(a,l)=>(s(),f(G(n.value?"a":"button"),{class:q(["md-icon-button",D.value]),disabled:x.value,type:M.value,href:T.value,target:w.value,download:N.value,tabindex:C.value,"aria-disabled":_.value,"aria-pressed":F.value,name:V.value,value:E.value,form:$.value,formaction:A.value,formenctype:L.value,formmethod:P.value,formnovalidate:z.value,formtarget:H.value,onClick:O},{default:m(()=>[J(U),K("span",W,[g.value?S(a.$slots,"selected",{key:1},()=>[o.selectedIcon?(s(),f(h,{key:0},{default:m(()=>[v(y(o.selectedIcon),1)]),_:1})):o.icon?(s(),f(h,{key:1},{default:m(()=>[v(y(o.icon),1)]),_:1})):S(a.$slots,"default",{key:2})]):(s(),Q(R,{key:0},[o.icon?(s(),f(h,{key:0},{default:m(()=>[v(y(o.icon),1)]),_:1})):S(a.$slots,"default",{key:1})],64))])]),_:3},8,["class","disabled","type","href","target","download","tabindex","aria-disabled","aria-pressed","name","value","form","formaction","formenctype","formmethod","formnovalidate","formtarget"]))}},oe={title:"Components/Icon Button",component:I,argTypes:{icon:{control:"text"},selectedIcon:{control:"text"},disabled:{control:"boolean"},softDisabled:{control:"boolean"},filled:{control:"boolean"},tonal:{control:"boolean"},outlined:{control:"boolean"},toggle:{control:"boolean"},selected:{control:"boolean"},href:{control:"text"},target:{control:"text"},download:{control:"text"}}},B=o=>({components:{MdIconButton:I},setup(){return{args:o}},template:'<md-icon-button v-bind="args" />'}),d=B.bind({});d.args={icon:"star"};const X=o=>({components:{MdIconButton:I},setup(){const p=k(o.selected??!1);return{args:o,selected:p}},template:'<md-icon-button v-bind="args" v-model:selected="selected" :selected-icon="args.selectedIcon" />'}),r=X.bind({});r.args={icon:"visibility",selectedIcon:"visibility_off",toggle:!0,selected:!1};const c=B.bind({});c.args={icon:"open_in_new",href:"https://google.com",target:"_blank"};const i=B.bind({});i.args={icon:"favorite",softDisabled:!0};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`args => ({
  components: {
    MdIconButton
  },
  setup() {
    return {
      args
    };
  },
  template: '<md-icon-button v-bind="args" />'
})`,...d.parameters?.docs?.source}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`args => ({
  components: {
    MdIconButton
  },
  setup() {
    const selected = ref(args.selected ?? false);
    return {
      args,
      selected
    };
  },
  template: '<md-icon-button v-bind="args" v-model:selected="selected" :selected-icon="args.selectedIcon" />'
})`,...r.parameters?.docs?.source}}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`args => ({
  components: {
    MdIconButton
  },
  setup() {
    return {
      args
    };
  },
  template: '<md-icon-button v-bind="args" />'
})`,...c.parameters?.docs?.source}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`args => ({
  components: {
    MdIconButton
  },
  setup() {
    return {
      args
    };
  },
  template: '<md-icon-button v-bind="args" />'
})`,...i.parameters?.docs?.source}}};const ae=["IconButton","Toggle","Link","SoftDisabled"];export{d as IconButton,c as Link,i as SoftDisabled,r as Toggle,ae as __namedExportsOrder,oe as default};
