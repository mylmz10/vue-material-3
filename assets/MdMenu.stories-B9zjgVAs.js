import{_ as x,M as y}from"./MdList-BsAJNYgK.js";import{u as I,o as i,b as n,f as c,c as g,e as s,w as B,d as M,t as a,r,n as v,l as b,p}from"./iframe-C_bcjK8c.js";import{M as S}from"./MdIcon-ByZyJWIN.js";import{_ as k}from"./MdRipple-BcHFM7kG.js";import{_ as $}from"./MdBadge-DE_vbMft.js";import"./_plugin-vue_export-helper-DlAUqK2U.js";import"./preload-helper-PPVm8Dsz.js";const h={key:1,class:"md-list-item__start"},_={class:"md-list-item__body"},C={key:0,class:"md-list-item__label-text"},D={key:2,class:"md-list-item__end"},N={key:0,class:"md-list-item__trailing-text"},F={__name:"MdListItem",props:{headline:{type:String},supportingText:{type:String},supportingTextMultiline:{type:Number},trailingText:{type:[String,Number]},icon:{type:String},selected:{type:Boolean}},emits:["click"],setup(e,{emit:V}){const o=I(),m=b(!1),L=p(()=>o.start||e.icon),T=p(()=>o.end||e.trailingText),f=p(()=>o["supporting-text"]||e.supportingText);return(l,t)=>(i(),n("li",{class:v(["md-list-item",{"md-list-item--selected":e.selected,"md-list-item--multiline":!!e.supportingTextMultiline,"md-list-item--two-line":e.supportingTextMultiline===2,"md-list-item--three-line":e.supportingTextMultiline===3}]),onMouseover:t[0]||(t[0]=u=>m.value=!0),onMouseleave:t[1]||(t[1]=u=>m.value=!1),onClick:t[2]||(t[2]=u=>l.$emit("click",u))},[t[3]||(t[3]=c("div",{class:"md-list-item__state-layer"},null,-1)),m.value?(i(),g(k,{key:0,style:{"z-index":"0"}})):s("",!0),L.value?(i(),n("div",h,[e.icon?(i(),g(S,{key:0},{default:B(()=>[M(a(e.icon),1)]),_:1})):s("",!0),r(l.$slots,"start")])):s("",!0),c("div",_,[e.headline?(i(),n("span",C,[M(a(e.headline)+" ",1),r(l.$slots,"default")])):s("",!0),f.value?(i(),n("span",{key:1,class:v(["md-list-item__supporting-text",{"md-list-item__supporting-text--multiline":!!e.supportingTextMultiline}])},[M(a(e.supportingText)+" ",1),r(l.$slots,"supporting-text")],2)):s("",!0)]),T.value?(i(),n("div",D,[e.trailingText?(i(),n("span",N,a(e.trailingText),1)):s("",!0),r(l.$slots,"end")])):s("",!0)],34))}},G={title:"Components/Menu",component:x,argTypes:{}},H=e=>({components:{MdMenu:x,MdList:y,MdListItem:F,MdBadge:$},setup(){return{args:e}},template:`<MdMenu v-bind="args"> 
    <template v-slot:activator="props"> 
      <MdFilledButton label="Open Menu" v-bind="props"></MdFilledButton>
    </template>
    <MdList>
      <MdListItem headline="Headline" supportingText="Supporting Text"></MdListItem>
      <MdListDivider></MdListDivider>
      <MdListItem headline="Headline">
        <template #end=""><MdBadge value="33" :absolute="false"></MdBadge></template>
      </MdListItem>
      <MdListItem trailingText="18">Trash</MdListItem>
    </MdList>
    </MdMenu>`}),d=H.bind({});d.args={modelValue:!0};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`args => ({
  components: {
    MdMenu,
    MdList,
    MdListItem,
    MdBadge
  },
  setup() {
    return {
      args
    };
  },
  template: \`<MdMenu v-bind="args"> 
    <template v-slot:activator="props"> 
      <MdFilledButton label="Open Menu" v-bind="props"></MdFilledButton>
    </template>
    <MdList>
      <MdListItem headline="Headline" supportingText="Supporting Text"></MdListItem>
      <MdListDivider></MdListDivider>
      <MdListItem headline="Headline">
        <template #end=""><MdBadge value="33" :absolute="false"></MdBadge></template>
      </MdListItem>
      <MdListItem trailingText="18">Trash</MdListItem>
    </MdList>
    </MdMenu>\`
})`,...d.parameters?.docs?.source}}};const J=["Menu"];export{d as Menu,J as __namedExportsOrder,G as default};
