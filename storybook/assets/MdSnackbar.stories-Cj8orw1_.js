import{w as S,y as v,c as V,a as b,T,e as m,g as k,b as M,p as s,q as _,s as u,t as f,v as g,f as B,r as y}from"./iframe-Bo7-BOp5.js";import{M as C}from"./MdIcon-DuMzCwGM.js";import{_ as N}from"./MdFilledButton-BZ6CpELC.js";import"./preload-helper-PPVm8Dsz.js";import"./_plugin-vue_export-helper-DlAUqK2U.js";import"./buttonSharedProps-CMd8JqkZ.js";import"./MdRipple-DHfXgmxP.js";const A={class:"md-snackbar__supporting-text"},o={__name:"MdSnackbar",props:{timeout:{type:Number,default:2e4},multiLine:{type:Boolean,default:!1},modelValue:{type:Boolean,default:!1},actionText:{type:String},text:{type:String,default:""},longerAction:{type:Boolean}},emits:["update:modelValue","action"],setup(e,{emit:l}){const a=e,c=l,d=()=>{c("update:modelValue",!1)},x=i=>{c("action",i)};let n;const p=()=>{n&&(clearTimeout(n),n=void 0)};return S(()=>[a.modelValue,a.timeout],()=>{p(),!(!a.modelValue||a.timeout<=0)&&(n=setTimeout(()=>{n=void 0,d()},a.timeout))},{immediate:!0}),v(()=>{p()}),(i,t)=>(m(),V(T,null,{default:b(()=>[e.modelValue?(m(),k("div",{key:0,class:M(["md-snackbar",{"md-snackbar--multiline":e.multiLine,"md-snackbar--longer-action":e.longerAction}])},[s("div",A,[_(i.$slots,"default",{},()=>[u(f(e.text),1)])]),e.actionText?(m(),k("button",{key:0,type:"button",class:"md-snackbar__action-text",onClick:x},[t[0]||(t[0]=s("div",{class:"md-snackbar__state-layer"},null,-1)),u(" "+f(e.actionText),1)])):g("",!0),s("button",{type:"button",class:"md-snackbar__actions","aria-label":"Close snackbar",onClick:d},[B(C,{class:"md-snackbar__icon"},{default:b(()=>[...t[1]||(t[1]=[u("close",-1)])]),_:1}),t[2]||(t[2]=s("div",{class:"md-snackbar__state-layer"},null,-1))])],2)):g("",!0)]),_:3}))}};o.__docgenInfo=Object.assign({displayName:o.name??o.__name},{exportName:"default",displayName:"MdSnackbar",description:"",tags:{},props:[{name:"timeout",type:{name:"number"},defaultValue:{func:!1,value:"20000"}},{name:"multiLine",type:{name:"boolean"},defaultValue:{func:!1,value:"false"}},{name:"modelValue",type:{name:"boolean"},defaultValue:{func:!1,value:"false"}},{name:"actionText",type:{name:"string"}},{name:"text",type:{name:"string"},defaultValue:{func:!1,value:"''"}},{name:"longerAction",type:{name:"boolean"}}],events:[{name:"update:modelValue"},{name:"action"}],slots:[{name:"default"}],sourceFiles:["/home/runner/work/vue-material-3/vue-material-3/src/components/snackbar/MdSnackbar.vue"]});const $={title:"Components/Snackbar",component:o,args:{timeout:6e3,text:"Message sent",actionText:"Undo",multiLine:!1,longerAction:!1},argTypes:{modelValue:{control:!1}}},K=e=>({components:{MdSnackbar:o,MdFilledButton:N},setup(){const l=y(!1),a=y(0);return{args:e,open:l,snackbarKey:a,openSnackbar:()=>{a.value+=1,l.value=!0}}},template:`<div style="min-height: 200px;">
    <MdFilledButton label="Open Snackbar" @click="openSnackbar" />
    <MdSnackbar
      :key="snackbarKey"
      v-model="open"
      :timeout="args.timeout"
      :text="args.text"
      :action-text="args.actionText"
      :multi-line="args.multiLine"
      :longer-action="args.longerAction"
    />
  </div>`}),r=K.bind({});r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`args => ({
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
      :text="args.text"
      :action-text="args.actionText"
      :multi-line="args.multiLine"
      :longer-action="args.longerAction"
    />
  </div>\`
})`,...r.parameters?.docs?.source}}};const j=["Snackbar"];export{r as Snackbar,j as __namedExportsOrder,$ as default};
