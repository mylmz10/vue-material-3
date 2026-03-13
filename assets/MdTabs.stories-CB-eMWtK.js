import{h as F,c as w,r as $,k as I,s as ae,o as S,p as g,x as te,i as L,j as A,d as V,a as M,w as U,e as P,t as N,f as z,C,n as K,v as j,b as ne}from"./iframe-4Lc6ThV1.js";import{M as G}from"./MdIcon-Cqy-6spS.js";import{_ as R}from"./MdRipple-BFgpYy2F.js";import"./preload-helper-PPVm8Dsz.js";import"./_plugin-vue_export-helper-DlAUqK2U.js";const D="mdTabsContext",ie=["aria-label","aria-orientation"],B={__name:"MdTabs",props:{modelValue:{type:Number,default:void 0},activationMode:{type:String,default:"auto",validator:i=>["auto","manual"].includes(i)},loop:{type:Boolean,default:!0},orientation:{type:String,default:"horizontal",validator:i=>["horizontal","vertical"].includes(i)},ariaLabel:{type:String,default:""}},emits:["update:modelValue","change"],setup(i,{expose:p,emit:r}){const o=i,l=r,n=I([]),d=I(0),s=I(0),m=g(()=>o.modelValue!==void 0),y=e=>{const a=[...e];return a.sort((t,b)=>{if(!t.el||!b.el||typeof t.el.compareDocumentPosition!="function")return 0;const O=t.el.compareDocumentPosition(b.el);return typeof Node<"u"&&O&Node.DOCUMENT_POSITION_FOLLOWING?-1:typeof Node<"u"&&O&Node.DOCUMENT_POSITION_PRECEDING?1:0}),a},T=()=>n.value.reduce((e,a,t)=>(a.disabled||e.push(t),e),[]),f=e=>{const a=T();if(!a.length)return-1;if(!Number.isInteger(e))return a[0];if(a.includes(e))return e;const t=a.find(b=>b>e);return t!==void 0?t:a[a.length-1]},v=()=>{if(n.value=y(n.value),!n.value.length){d.value=0,s.value=0;return}const e=m.value?o.modelValue:d.value,a=f(e),t=f(s.value);d.value=a===-1?0:a,s.value=t===-1?d.value:t,m.value&&a!==-1&&o.modelValue!==a&&l("update:modelValue",a)},u=(e,a)=>{e<0||e>=n.value.length||n.value[e]?.disabled||(d.value=e,s.value=e,l("change",{index:e,reason:a}),l("update:modelValue",e))},c=e=>n.value.findIndex(a=>a.id===e),x=(e,a)=>{if(!n.value.length)return-1;let t=0,b=e;for(;t<n.value.length;){if(b+=a,o.loop&&(b=(b+n.value.length)%n.value.length),!o.loop&&(b<0||b>=n.value.length))return-1;if(!n.value[b]?.disabled)return b;t+=1}return-1},h=e=>{const a=n.value[e];a&&(s.value=e,ae(()=>{a.el?.focus?.()}))},H=e=>{const a=c(e.id);a===-1?n.value.push(e):n.value[a]={...n.value[a],...e},v()},W=(e,a)=>{const t=c(e);t!==-1&&(n.value[t]={...n.value[t],...a},v())},q=e=>{n.value=n.value.filter(a=>a.id!==e),v()},E=(e,a="programmatic")=>{const t=c(e);t===-1||n.value[t]?.disabled||(s.value=t,!(a==="focus"&&o.activationMode==="manual")&&u(t,a))},J=e=>{E(e,"focus")},Q=e=>c(e)===d.value,X=e=>{const a=c(e);return a===-1?-1:a===s.value?0:-1},Y=e=>{const a=c(e);if(a!==-1)return n.value[a]?.panelId},Z=e=>{if(!e)return s.value;const a=e.getAttribute?.("data-md-tab-id");if(!a)return s.value;const t=c(a);return t===-1?s.value:t},ee=e=>{if(!n.value.length)return;const a=Z(e.target);if(e.key==="ArrowRight"||e.key==="ArrowDown"){e.preventDefault();const t=x(a,1);t!==-1&&(h(t),o.activationMode==="auto"&&u(t,"keyboard"));return}if(e.key==="ArrowLeft"||e.key==="ArrowUp"){e.preventDefault();const t=x(a,-1);t!==-1&&(h(t),o.activationMode==="auto"&&u(t,"keyboard"));return}if(e.key==="Home"){e.preventDefault();const t=f(0);t!==-1&&(h(t),o.activationMode==="auto"&&u(t,"keyboard"));return}if(e.key==="End"){e.preventDefault();const t=f(n.value.length-1);t!==-1&&(h(t),o.activationMode==="auto"&&u(t,"keyboard"));return}(e.key==="Enter"||e.key===" ")&&(e.preventDefault(),s.value>=0&&u(s.value,"keyboard"))};return F(()=>o.modelValue,()=>{v()},{immediate:!0}),te(D,{registerTab:H,updateTab:W,unregisterTab:q,activateTab:E,onTabFocused:J,isSelected:Q,getTabIndex:X,getPanelId:Y}),p({focusTabByIndex:h,activateTab:E,getSelectedIndex:()=>d.value}),(e,a)=>(S(),w("div",{class:"md-tabs",role:"tablist","aria-label":i.ariaLabel||void 0,"aria-orientation":i.orientation,onKeydown:ee},[$(e.$slots,"default")],40,ie))}},de=["data-md-tab-id","id","aria-selected","aria-controls","disabled","tabindex"],re={class:"md-primary-tab__content"},le={key:0,class:"md-primary-tab__icon-wrap"},oe={class:"md-primary-tab__label"},se={__name:"MdPrimaryTab",props:{label:{type:[String,Number],default:""},icon:{type:String,default:""},disabled:{type:Boolean,default:!1},panelId:{type:String,default:void 0},selected:{type:Boolean,default:!1},id:{type:String,default:""}},emits:["click","focus"],setup(i,{emit:p}){const r=i,o=p,l=j(D,null),n=I(null),d=r.id||`md-primary-tab-${Math.random().toString(36).slice(2,10)}-${Date.now().toString(36)}`,s=()=>{l?.registerTab?.({id:d,disabled:r.disabled,panelId:r.panelId,el:n.value})},m=()=>{l?.unregisterTab?.(d)};F(()=>[r.disabled,r.panelId],()=>{l?.updateTab?.(d,{disabled:r.disabled,panelId:r.panelId,el:n.value})}),L(()=>{s()}),A(()=>{m()});const y=g(()=>l?l.isSelected(d):r.selected),T=g(()=>l?l.getTabIndex(d):y.value?0:-1),f=g(()=>l&&l.getPanelId(d)||r.panelId),v=c=>{o("click",c),!r.disabled&&l?.activateTab?.(d,"click")},u=c=>{o("focus",c),!r.disabled&&l?.onTabFocused?.(d)};return(c,x)=>(S(),w("button",{ref_key:"tabEl",ref:n,class:K(["md-primary-tab",{"md-primary-tab--selected":y.value,"md-primary-tab--disabled":i.disabled,"md-primary-tab--with-icon":!!i.icon}]),type:"button",role:"tab","data-md-tab":"true","data-md-tab-id":C(d),id:C(d),"aria-selected":`${y.value}`,"aria-controls":f.value,disabled:i.disabled,tabindex:T.value,onClick:v,onFocus:u},[V(R),M("span",re,[i.icon?(S(),w("span",le,[V(G,{class:"md-primary-tab__icon"},{default:U(()=>[P(N(i.icon),1)]),_:1})])):z("",!0),M("span",oe,[$(c.$slots,"default",{},()=>[P(N(i.label),1)])])]),x[0]||(x[0]=M("span",{class:"md-primary-tab__indicator"},null,-1))],42,de))}},ce=["data-md-tab-id","id","aria-selected","aria-controls","disabled","tabindex"],ue={class:"md-secondary-tab__label"},be={__name:"MdSecondaryTab",props:{label:{type:[String,Number],default:""},icon:{type:String,default:""},disabled:{type:Boolean,default:!1},panelId:{type:String,default:void 0},selected:{type:Boolean,default:!1},id:{type:String,default:""}},emits:["click","focus"],setup(i,{emit:p}){const r=i,o=p,l=j(D,null),n=I(null),d=r.id||`md-secondary-tab-${Math.random().toString(36).slice(2,10)}-${Date.now().toString(36)}`,s=()=>{l?.registerTab?.({id:d,disabled:r.disabled,panelId:r.panelId,el:n.value})};F(()=>[r.disabled,r.panelId],()=>{l?.updateTab?.(d,{disabled:r.disabled,panelId:r.panelId,el:n.value})}),L(()=>{s()}),A(()=>{l?.unregisterTab?.(d)});const m=g(()=>l?l.isSelected(d):r.selected),y=g(()=>l?l.getTabIndex(d):m.value?0:-1),T=g(()=>l&&l.getPanelId(d)||r.panelId),f=u=>{o("click",u),!r.disabled&&l?.activateTab?.(d,"click")},v=u=>{o("focus",u),!r.disabled&&l?.onTabFocused?.(d)};return(u,c)=>(S(),w("button",{ref_key:"tabEl",ref:n,class:K(["md-secondary-tab",{"md-secondary-tab--selected":m.value,"md-secondary-tab--disabled":i.disabled,"md-secondary-tab--with-icon":!!i.icon}]),type:"button",role:"tab","data-md-tab":"true","data-md-tab-id":C(d),id:C(d),"aria-selected":`${m.value}`,"aria-controls":T.value,disabled:i.disabled,tabindex:y.value,onClick:f,onFocus:v},[V(R),i.icon?(S(),ne(G,{key:0,class:"md-secondary-tab__icon"},{default:U(()=>[P(N(i.icon),1)]),_:1})):z("",!0),M("span",ue,[$(u.$slots,"default",{},()=>[P(N(i.label),1)])]),c[0]||(c[0]=M("span",{class:"md-secondary-tab__indicator"},null,-1))],42,ce))}},Te={title:"Components/Tabs",component:B,args:{modelValue:0,activationMode:"auto"}},pe=i=>({components:{MdTabs:B,MdPrimaryTab:se},setup(){const p=I(i.modelValue);return{args:i,activeIndex:p}},template:`<div>
    <MdTabs v-model="activeIndex" :activation-mode="args.activationMode" aria-label="Primary tabs">
      <MdPrimaryTab label="Flights" panel-id="primary-panel-flights" icon="flight" />
      <MdPrimaryTab label="Trips" panel-id="primary-panel-trips" icon="trip" />
      <MdPrimaryTab label="Explore" panel-id="primary-panel-explore" icon="explore" />
    </MdTabs>
    <section id="primary-panel-flights" role="tabpanel" :hidden="activeIndex !== 0">Flights panel</section>
    <section id="primary-panel-trips" role="tabpanel" :hidden="activeIndex !== 1">Trips panel</section>
    <section id="primary-panel-explore" role="tabpanel" :hidden="activeIndex !== 2">Explore panel</section>
  </div>`}),me=i=>({components:{MdTabs:B,MdSecondaryTab:be},setup(){const p=I(i.modelValue);return{args:i,activeIndex:p}},template:`<div>
    <MdTabs v-model="activeIndex" :activation-mode="args.activationMode" aria-label="Secondary tabs">
      <MdSecondaryTab label="Overview" panel-id="secondary-panel-overview" />
      <MdSecondaryTab label="Specifications" panel-id="secondary-panel-specifications" />
    </MdTabs>
    <section id="secondary-panel-overview" role="tabpanel" :hidden="activeIndex !== 0">Overview panel</section>
    <section id="secondary-panel-specifications" role="tabpanel" :hidden="activeIndex !== 1">Specifications panel</section>
  </div>`}),k=pe.bind({}),_=me.bind({});k.parameters={...k.parameters,docs:{...k.parameters?.docs,source:{originalSource:`args => ({
  components: {
    MdTabs,
    MdPrimaryTab
  },
  setup() {
    const activeIndex = ref(args.modelValue);
    return {
      args,
      activeIndex
    };
  },
  template: \`<div>
    <MdTabs v-model="activeIndex" :activation-mode="args.activationMode" aria-label="Primary tabs">
      <MdPrimaryTab label="Flights" panel-id="primary-panel-flights" icon="flight" />
      <MdPrimaryTab label="Trips" panel-id="primary-panel-trips" icon="trip" />
      <MdPrimaryTab label="Explore" panel-id="primary-panel-explore" icon="explore" />
    </MdTabs>
    <section id="primary-panel-flights" role="tabpanel" :hidden="activeIndex !== 0">Flights panel</section>
    <section id="primary-panel-trips" role="tabpanel" :hidden="activeIndex !== 1">Trips panel</section>
    <section id="primary-panel-explore" role="tabpanel" :hidden="activeIndex !== 2">Explore panel</section>
  </div>\`
})`,...k.parameters?.docs?.source}}};_.parameters={..._.parameters,docs:{..._.parameters?.docs,source:{originalSource:`args => ({
  components: {
    MdTabs,
    MdSecondaryTab
  },
  setup() {
    const activeIndex = ref(args.modelValue);
    return {
      args,
      activeIndex
    };
  },
  template: \`<div>
    <MdTabs v-model="activeIndex" :activation-mode="args.activationMode" aria-label="Secondary tabs">
      <MdSecondaryTab label="Overview" panel-id="secondary-panel-overview" />
      <MdSecondaryTab label="Specifications" panel-id="secondary-panel-specifications" />
    </MdTabs>
    <section id="secondary-panel-overview" role="tabpanel" :hidden="activeIndex !== 0">Overview panel</section>
    <section id="secondary-panel-specifications" role="tabpanel" :hidden="activeIndex !== 1">Specifications panel</section>
  </div>\`
})`,..._.parameters?.docs?.source}}};const xe=["PrimaryTabs","SecondaryTabs"];export{k as PrimaryTabs,_ as SecondaryTabs,xe as __namedExportsOrder,Te as default};
