import{p as g,c as f,a as m,T as y,b as l,e as d,n as S,h as a,k as c,t as x,l as u,d as v,r as k}from"./iframe-BZY2mGdK.js";import{M}from"./MdIcon-BgVvRcVs.js";import{_ as T}from"./MdFilledButton-BkjlfHw4.js";import"./preload-helper-PPVm8Dsz.js";import"./_plugin-vue_export-helper-DlAUqK2U.js";import"./buttonSharedProps-CQjuewrW.js";import"./MdRipple-qtXqqLlf.js";const B={key:0,class:"md-snackbar__action-text"},p={__name:"MdSnackbar",props:{timeout:{type:Number,default:2e4},multiLine:{type:Boolean,default:!1},modelValue:{type:Boolean,default:!1},actionText:{type:String},longerAction:{type:Boolean}},emits:["update:modelValue","action"],setup(e,{emit:o}){const t=o,r=()=>{t("update:modelValue",!1)},b=i=>{t("action",i)};return g(()=>{setTimeout(()=>{r()},e.timeout)}),(i,n)=>(l(),f(y,null,{default:m(()=>[e.modelValue?(l(),d("div",{key:0,class:S(["md-snackbar",{"md-snackbar--multiline":e.multiLine,"md-snackbar--longer-action":e.longerAction}])},[n[3]||(n[3]=a("div",{class:"md-snackbar__supporting-text"},[c(" Two-line snackbar with "),a("br"),c(" longer action and close affordance ")],-1)),e.actionText?(l(),d("div",B,[n[0]||(n[0]=a("div",{class:"md-snackbar__state-layer"},null,-1)),a("span",{onClick:b},x(e.actionText),1)])):u("",!0),a("div",{class:"md-snackbar__actions",onClick:r},[v(M,{class:"md-snackbar__icon"},{default:m(()=>[...n[1]||(n[1]=[c("close",-1)])]),_:1}),n[2]||(n[2]=a("div",{class:"md-snackbar__state-layer"},null,-1))])],2)):u("",!0)]),_:1}))}},w={title:"Components/Snackbar",component:p,args:{timeout:6e3,actionText:"Undo",multiLine:!1,longerAction:!1},argTypes:{modelValue:{control:!1}}},_=e=>({components:{MdSnackbar:p,MdFilledButton:T},setup(){const o=k(!1),t=k(0);return{args:e,open:o,snackbarKey:t,openSnackbar:()=>{t.value+=1,o.value=!0}}},template:`<div style="min-height: 200px;">
    <MdFilledButton label="Open Snackbar" @click="openSnackbar" />
    <MdSnackbar
      :key="snackbarKey"
      v-model="open"
      :timeout="args.timeout"
      :action-text="args.actionText"
      :multi-line="args.multiLine"
      :longer-action="args.longerAction"
    />
  </div>`}),s=_.bind({});s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`args => ({
  components: {
    MdSnackbar,
    MdFilledButton
  },
  setup() {
    const open = ref(false);
    const snackbarKey = ref(0);
    const openSnackbar = () => {
      snackbarKey.value += 1;
      open.value = true;
    };
    return {
      args,
      open,
      snackbarKey,
      openSnackbar
    };
  },
  template: \`<div style="min-height: 200px;">
    <MdFilledButton label="Open Snackbar" @click="openSnackbar" />
    <MdSnackbar
      :key="snackbarKey"
      v-model="open"
      :timeout="args.timeout"
      :action-text="args.actionText"
      :multi-line="args.multiLine"
      :longer-action="args.longerAction"
    />
  </div>\`
})`,...s.parameters?.docs?.source}}};const O=["Snackbar"];export{s as Snackbar,O as __namedExportsOrder,w as default};
