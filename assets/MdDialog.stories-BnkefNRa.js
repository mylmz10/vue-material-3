import{j as _,i as f,c as g,w as v,T as h,o as r,b as D,n as M,f as t,r as l,a as y,e as C,l as V}from"./iframe-C_bcjK8c.js";import{M as b}from"./MdElevationOverlay-BHp_TcX3.js";import{_ as k}from"./_plugin-vue_export-helper-DlAUqK2U.js";import"./preload-helper-PPVm8Dsz.js";const B={class:"md-modal__container"},w={class:"md-modal__header"},T={class:"md-modal__content"},E={class:"md-modal__footer"},N={__name:"MdDialog",props:{modelValue:{type:Boolean}},emits:["update:modelValue"],setup(s,{emit:m}){const a=V(!1),d=s,c=m,p=()=>{a.value=!1,c("update:modelValue",!1)},n=()=>{console.log("handleDialogDismiss")},u=e=>{e.composedPath().includes(document.querySelector(".md-modal__container"))||p()};return _(()=>{d.modelValue&&(document.body.style.overflow="hidden")}),f(()=>d.modelValue,e=>{a.value=e,document.body.style.overflow=e?"hidden":""},{immediate:!0}),(e,$)=>(r(),g(h,null,{default:v(()=>[a.value?(r(),D("dialog",{key:0,class:M(["md-modal",{"md-modal--open":a.value}]),onClose:n,onCancel:n,onClick:u},[t("div",B,[t("div",w,[l(e.$slots,"header",{},void 0,!0)]),t("div",T,[l(e.$slots,"default",{},void 0,!0)]),t("div",E,[l(e.$slots,"footer",{},void 0,!0)]),y(b)])],34)):C("",!0)]),_:3}))}},i=k(N,[["__scopeId","data-v-931f2235"]]),O={title:"Components/Dialog",component:i,argTypes:{}},S=s=>({components:{MdDialog:i},setup(){return{args:s}},template:`<MdDialog v-bind="args">
 <template #header>Header</template> <div>Lorem ipsum</div> <template #footer>Footer</template> </MdDialog>`}),o=S.bind({});o.args={modelValue:!0};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`args => ({
  components: {
    MdDialog
  },
  setup() {
    return {
      args
    };
  },
  template: \`<MdDialog v-bind="args">\\n <template #header>Header</template> <div>Lorem ipsum</div> <template #footer>Footer</template> </MdDialog>\`
})`,...o.parameters?.docs?.source}}};const j=["Dialog"];export{o as Dialog,j as __namedExportsOrder,O as default};
