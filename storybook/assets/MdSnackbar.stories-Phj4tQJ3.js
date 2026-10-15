import{p as f,c as g,a as u,T as y,b as c,e as d,n as v,h as n,k as i,t as S,l as p,d as x,r as k}from"./iframe-BkwO8pQ8.js";import{M}from"./MdIcon-CAX4uc9J.js";import{_ as T}from"./MdFilledButton-V4ssLdhD.js";import"./preload-helper-PPVm8Dsz.js";import"./_plugin-vue_export-helper-DlAUqK2U.js";import"./buttonSharedProps-BmV0GGB_.js";import"./MdRipple-DzJht9xn.js";const V={key:0,class:"md-snackbar__action-text"},o={__name:"MdSnackbar",props:{timeout:{type:Number,default:2e4},multiLine:{type:Boolean,default:!1},modelValue:{type:Boolean,default:!1},actionText:{type:String},longerAction:{type:Boolean}},emits:["update:modelValue","action"],setup(e,{emit:l}){const t=l,r=()=>{t("update:modelValue",!1)},b=m=>{t("action",m)};return f(()=>{setTimeout(()=>{r()},e.timeout)}),(m,a)=>(c(),g(y,null,{default:u(()=>[e.modelValue?(c(),d("div",{key:0,class:v(["md-snackbar",{"md-snackbar--multiline":e.multiLine,"md-snackbar--longer-action":e.longerAction}])},[a[3]||(a[3]=n("div",{class:"md-snackbar__supporting-text"},[i(" Two-line snackbar with "),n("br"),i(" longer action and close affordance ")],-1)),e.actionText?(c(),d("div",V,[a[0]||(a[0]=n("div",{class:"md-snackbar__state-layer"},null,-1)),n("span",{onClick:b},S(e.actionText),1)])):p("",!0),n("div",{class:"md-snackbar__actions",onClick:r},[x(M,{class:"md-snackbar__icon"},{default:u(()=>[...a[1]||(a[1]=[i("close",-1)])]),_:1}),a[2]||(a[2]=n("div",{class:"md-snackbar__state-layer"},null,-1))])],2)):p("",!0)]),_:1}))}};o.__docgenInfo=Object.assign({displayName:o.name??o.__name},{exportName:"default",displayName:"MdSnackbar",description:"",tags:{},props:[{name:"timeout",type:{name:"number"},defaultValue:{func:!1,value:"20000"}},{name:"multiLine",type:{name:"boolean"},defaultValue:{func:!1,value:"false"}},{name:"modelValue",type:{name:"boolean"},defaultValue:{func:!1,value:"false"}},{name:"actionText",type:{name:"string"}},{name:"longerAction",type:{name:"boolean"}}],events:[{name:"update:modelValue"},{name:"action"}],sourceFiles:["/home/runner/work/vue-material-3/vue-material-3/src/components/snackbar/MdSnackbar.vue"]});const w={title:"Components/Snackbar",component:o,args:{timeout:6e3,actionText:"Undo",multiLine:!1,longerAction:!1},argTypes:{modelValue:{control:!1}}},_=e=>({components:{MdSnackbar:o,MdFilledButton:T},setup(){const l=k(!1),t=k(0);return{args:e,open:l,snackbarKey:t,openSnackbar:()=>{t.value+=1,l.value=!0}}},template:`<div style="min-height: 200px;">
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
