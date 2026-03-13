import{_ as $}from"./MdMenu-Cy6fV0Ev.js";import{o as i,c as v,a as O,b as h,w as b,e as M,t as I,f as S,r as p,d as B,n as E,k as g,v as K,p as x,h as N,i as q,j,s as L,x as P}from"./iframe-4Lc6ThV1.js";import{M as w}from"./MdIcon-Cqy-6spS.js";import{_ as R}from"./MdRipple-BFgpYy2F.js";import{_ as z}from"./MdFilledButton-Bk8WzyK1.js";import"./preload-helper-PPVm8Dsz.js";import"./_plugin-vue_export-helper-DlAUqK2U.js";import"./buttonSharedProps-Cr6A6QuV.js";const G=["data-md-submenu-trigger","aria-disabled","disabled"],H={key:0,class:"md-menu-item__start"},J={class:"md-menu-item__label"},Q={key:1,class:"md-menu-item__end"},W="mdMenuContext",V={__name:"MdMenuItem",props:{label:{type:[String,Number],default:""},value:{type:[String,Number,Boolean,Object],default:void 0},icon:{type:String,default:""},trailingIcon:{type:String,default:""},selected:{type:Boolean,default:!1},disabled:{type:Boolean,default:!1},submenu:{type:Boolean,default:!1},keepOpen:{type:Boolean,default:!1}},emits:["click","select","keydown","submenu-open-request"],setup(e,{expose:c,emit:m}){const l=e,u=m,f=g(null),o=K(W,null),s=x(()=>({label:l.label,value:l.value!==void 0?l.value:l.label})),d=t=>{if(l.disabled){t.preventDefault();return}u("click",t),u("select",s.value),l.keepOpen||o?.onItemSelect?.(s.value)},a=t=>{if(u("keydown",t),!l.disabled){if(t.key==="Enter"||t.key===" "){t.preventDefault(),d(t);return}l.submenu&&t.key==="ArrowRight"&&(t.preventDefault(),u("submenu-open-request",t))}};return c({focus:()=>{f.value?.focus?.()}}),(t,r)=>(i(),v("button",{ref_key:"itemEl",ref:f,class:E(["md-menu-item",{"md-menu-item--selected":e.selected,"md-menu-item--disabled":e.disabled,"md-menu-item--submenu":e.submenu}]),type:"button",role:"menuitem","data-md-menu-item":"true","data-md-submenu-trigger":e.submenu?"true":"false","aria-disabled":`${e.disabled}`,disabled:e.disabled,tabindex:"-1",onClick:d,onKeydown:a},[r[1]||(r[1]=O("span",{class:"md-menu-item__state-layer"},null,-1)),e.icon||t.$slots.start?(i(),v("span",H,[e.icon?(i(),h(w,{key:0},{default:b(()=>[M(I(e.icon),1)]),_:1})):S("",!0),p(t.$slots,"start")])):S("",!0),O("span",J,[p(t.$slots,"default",{},()=>[M(I(e.label),1)])]),e.selected||e.trailingIcon||t.$slots.end?(i(),v("span",Q,[p(t.$slots,"end",{},()=>[e.trailingIcon?(i(),h(w,{key:0},{default:b(()=>[M(I(e.trailingIcon),1)]),_:1})):e.selected?(i(),h(w,{key:1},{default:b(()=>[...r[0]||(r[0]=[M("check",-1)])]),_:1})):S("",!0)])])):S("",!0),B(R)],42,G))}},X="mdMenuContext",Y="mdSubMenuContext",Z={__name:"MdSubMenu",props:{label:{type:[String,Number],default:""},icon:{type:String,default:""},disabled:{type:Boolean,default:!1},modelValue:{type:Boolean,default:void 0},closeOnSelect:{type:Boolean,default:!0}},emits:["update:modelValue","open","close"],setup(e,{emit:c}){const m=e,l=c,u=g(null),f=g(null),o=g(!!m.modelValue),s=K(X,null),d=`md-sub-menu-${Math.random().toString(36).slice(2,10)}-${Date.now().toString(36)}`;N(()=>m.modelValue,n=>{n!==void 0&&n!==o.value&&a(!!n,{emitModelUpdate:!1})},{immediate:!0});const a=(n,k={})=>{const{emitModelUpdate:F=!0,focusTrigger:T=!1}=k;if(!(m.disabled&&n)&&n!==o.value){if(o.value=n,F&&l("update:modelValue",n),n){s?.requestOpenSubMenu?.(d),l("open");return}s?.notifySubMenuClosed?.(d),l("close"),T&&f.value?.focus?.()}},y=()=>{a(!0,{emitModelUpdate:!0}),L(()=>{u.value?.focusFirstItem?.()})},t=()=>{a(!1,{emitModelUpdate:!0,focusTrigger:!0})},r=()=>{if(o.value){a(!1,{emitModelUpdate:!0});return}y()},U=n=>{if(n.key==="ArrowRight"){n.preventDefault(),y();return}(n.key==="Escape"||n.key==="ArrowLeft")&&o.value&&(n.preventDefault(),t())},D=n=>{a(n,{emitModelUpdate:!0})},A=()=>{a(!1,{emitModelUpdate:!0})};return P(Y,{closeAndFocusTrigger:t}),q(()=>{s?.registerSubMenu?.(d,{close:({emitModelUpdate:n=!0,focusTrigger:k=!1}={})=>{a(!1,{emitModelUpdate:n,focusTrigger:k})}})}),j(()=>{s?.unregisterSubMenu?.(d)}),(n,k)=>(i(),v("div",{class:E(["md-sub-menu",{"md-sub-menu--open":o.value,"md-sub-menu--disabled":e.disabled}])},[B(V,{ref_key:"triggerItemEl",ref:f,class:"md-sub-menu__trigger",label:e.label,icon:e.icon,disabled:e.disabled,submenu:!0,"keep-open":!0,"trailing-icon":"chevron_right",onClick:r,onKeydown:U,onSubmenuOpenRequest:y},{default:b(()=>[p(n.$slots,"trigger",{},()=>[M(I(e.label),1)])]),_:3},8,["label","icon","disabled"]),B($,{ref_key:"subMenuEl",ref:u,class:"md-sub-menu__menu","model-value":o.value,nested:!0,"close-on-select":e.closeOnSelect,"focus-first-item-on-open":!1,"restore-focus-on-close":!1,"onUpdate:modelValue":D,onClose:A},{default:b(()=>[p(n.$slots,"default")]),_:3},8,["model-value","close-on-select"])],2))}},de={title:"Components/Menu",component:$,args:{modelValue:!1}},_=e=>({components:{MdMenu:$,MdMenuItem:V,MdSubMenu:Z,MdFilledButton:z},setup(){const c=g(e.modelValue);return{args:e,open:c}},template:`<MdMenu v-model="open" :close-on-outside-click="args.closeOnOutsideClick" :close-on-select="args.closeOnSelect">
    <template #activator="{ onClick, onKeydown }">
      <MdFilledButton label="Open Menu" @click="onClick" @keydown="onKeydown" />
    </template>
    <MdMenuItem label="Profile" icon="person" />
    <MdSubMenu label="Share" icon="share">
      <MdMenuItem label="Copy Link" icon="link" />
      <MdMenuItem label="Email" icon="mail" />
    </MdSubMenu>
    <MdMenuItem label="Archive" icon="archive" />
    <MdMenuItem label="Delete" icon="delete" :disabled="true" />
  </MdMenu>`}),C=_.bind({});C.parameters={...C.parameters,docs:{...C.parameters?.docs,source:{originalSource:`args => ({
  components: {
    MdMenu,
    MdMenuItem,
    MdSubMenu,
    MdFilledButton
  },
  setup() {
    const open = ref(args.modelValue);
    return {
      args,
      open
    };
  },
  template: \`<MdMenu v-model="open" :close-on-outside-click="args.closeOnOutsideClick" :close-on-select="args.closeOnSelect">
    <template #activator="{ onClick, onKeydown }">
      <MdFilledButton label="Open Menu" @click="onClick" @keydown="onKeydown" />
    </template>
    <MdMenuItem label="Profile" icon="person" />
    <MdSubMenu label="Share" icon="share">
      <MdMenuItem label="Copy Link" icon="link" />
      <MdMenuItem label="Email" icon="mail" />
    </MdSubMenu>
    <MdMenuItem label="Archive" icon="archive" />
    <MdMenuItem label="Delete" icon="delete" :disabled="true" />
  </MdMenu>\`
})`,...C.parameters?.docs?.source}}};const ie=["Menu"];export{C as Menu,ie as __namedExportsOrder,de as default};
