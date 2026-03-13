import{o as O,w as h,c as f,a as V,i as C,u as g,r as n,b as i,d as _,e as w,F as L,f as F,g as I}from"./iframe-BZY2mGdK.js";import{_ as B}from"./MdOutlinedTextField-ZAAHV9ek.js";import{_ as T}from"./MdMenu-D8AnMNqO.js";import{M as E}from"./MdList-DAh2WUEY.js";import{_ as b}from"./MdListItem-CMefjZUf.js";import"./preload-helper-PPVm8Dsz.js";import"./MdTextFieldBase-DPgajM4b.js";import"./MdOutlinedField-B-DIdXHZ.js";import"./MdField-Uc3M5w1E.js";import"./_plugin-vue_export-helper-DlAUqK2U.js";import"./MdIcon-BgVvRcVs.js";import"./MdRipple-qtXqqLlf.js";const A={__name:"MdOutlinedAutoComplete",props:{modelValue:{type:String,default:null},label:{type:String,default:null},items:{type:Array,default:null}},emits:["update:modelValue","update:search"],setup(o,{emit:p}){const u=o,c=p;let t=n(!1),e=n(null),s=n(!1),v=n(!0);const r=I(()=>!s.value&&e.value?u.items.filter(a=>a.toLocaleLowerCase().includes(e.value.toLocaleLowerCase())):u.items);O(()=>{e.value=u.modelValue});const k=()=>{t.value=!0},x=()=>{s.value=!1,v.value=!1,c("update:search",e.value)},y=a=>{e.value=r.value[a],t.value=!1,v.value=!0,c("update:modelValue",r.value[a])};return h(()=>t.value,a=>{a?e.value===u.modelValue?s.value=!0:s.value=!1:(v.value||(e.value=null,c("update:modelValue",null)),s.value=!1)}),(a,m)=>(i(),f(T,{class:"md-autocomplete",modelValue:g(t),"onUpdate:modelValue":m[1]||(m[1]=l=>C(t)?t.value=l:t=l)},{activator:V(()=>[_(B,{modelValue:g(e),"onUpdate:modelValue":m[0]||(m[0]=l=>C(e)?e.value=l:e=l),label:u.label,onFocus:k,onInput:x},null,8,["modelValue","label"])]),default:V(()=>[_(E,null,{default:V(()=>[r.value.length?(i(!0),w(L,{key:0},F(r.value,(l,M)=>(i(),f(b,{selected:o.modelValue===l,headline:l,onClick:N=>y(M)},null,8,["selected","headline","onClick"]))),256)):(i(),f(b,{key:1,headline:"No data available"}))]),_:1})]),_:1},8,["modelValue"]))}},Q={title:"Components/Autocomplete",component:A,args:{modelValue:"",label:"City",items:["Istanbul","Ankara","Izmir","Antalya","Bursa","Eskisehir"]}},S=o=>({components:{MdOutlinedAutoComplete:A},setup(){const p=n(o.modelValue);return{args:o,value:p}},template:`<div style="max-width: 320px;">
    <MdOutlinedAutoComplete v-model="value" :label="args.label" :items="args.items" />
  </div>`}),d=S.bind({});d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`args => ({
  components: {
    MdOutlinedAutoComplete
  },
  setup() {
    const value = ref(args.modelValue);
    return {
      args,
      value
    };
  },
  template: \`<div style="max-width: 320px;">
    <MdOutlinedAutoComplete v-model="value" :label="args.label" :items="args.items" />
  </div>\`
})`,...d.parameters?.docs?.source}}};const W=["OutlinedAutoComplete"];export{d as OutlinedAutoComplete,W as __namedExportsOrder,Q as default};
