import{o as M,w as h,c as f,a as V,i as C,u as g,r as n,b as i,d as F,e as w,F as L,f as I,g as B}from"./iframe-BZY2mGdK.js";import{_ as T}from"./MdFilledTextField-DieW2Uz-.js";import{_ as E}from"./MdMenu-D8AnMNqO.js";import{M as S}from"./MdList-DAh2WUEY.js";import{_}from"./MdListItem-CMefjZUf.js";import"./preload-helper-PPVm8Dsz.js";import"./MdTextFieldBase-DPgajM4b.js";import"./MdFilledField-BIqXMto8.js";import"./MdField-Uc3M5w1E.js";import"./_plugin-vue_export-helper-DlAUqK2U.js";import"./MdIcon-BgVvRcVs.js";import"./MdRipple-qtXqqLlf.js";const b={__name:"MdFilledAutoComplete",props:{modelValue:{type:String,default:null},label:{type:String,default:null},items:{type:Array,default:null}},emits:["update:modelValue","update:search"],setup(o,{emit:p}){const u=o,c=p;let t=n(!1),e=n(null),s=n(!1),v=n(!0);const r=B(()=>!s.value&&e.value?u.items.filter(a=>a.toLocaleLowerCase().includes(e.value.toLocaleLowerCase())):u.items);M(()=>{e.value=u.modelValue});const A=()=>{t.value=!0},k=()=>{s.value=!1,v.value=!1,c("update:search",e.value)},x=a=>{e.value=r.value[a],t.value=!1,v.value=!0,c("update:modelValue",r.value[a])};return h(()=>t.value,a=>{a?e.value===u.modelValue?s.value=!0:s.value=!1:(v.value||(e.value=null,c("update:modelValue",null)),s.value=!1)}),(a,m)=>(i(),f(E,{class:"md-autocomplete",modelValue:g(t),"onUpdate:modelValue":m[1]||(m[1]=l=>C(t)?t.value=l:t=l)},{activator:V(()=>[F(T,{modelValue:g(e),"onUpdate:modelValue":m[0]||(m[0]=l=>C(e)?e.value=l:e=l),label:u.label,onFocus:A,onInput:k},null,8,["modelValue","label"])]),default:V(()=>[F(S,null,{default:V(()=>[r.value.length?(i(!0),w(L,{key:0},I(r.value,(l,y)=>(i(),f(_,{selected:o.modelValue===l,headline:l,onClick:O=>x(y)},null,8,["selected","headline","onClick"]))),256)):(i(),f(_,{key:1,headline:"No data available"}))]),_:1})]),_:1},8,["modelValue"]))}},Q={title:"Components/Autocomplete",component:b,args:{modelValue:"",label:"City",items:["Istanbul","Ankara","Izmir","Antalya","Bursa","Eskisehir"]}},N=o=>({components:{MdFilledAutoComplete:b},setup(){const p=n(o.modelValue);return{args:o,value:p}},template:`<div style="max-width: 320px;">
    <MdFilledAutoComplete v-model="value" :label="args.label" :items="args.items" />
  </div>`}),d=N.bind({});d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`args => ({
  components: {
    MdFilledAutoComplete
  },
  setup() {
    const value = ref(args.modelValue);
    return {
      args,
      value
    };
  },
  template: \`<div style="max-width: 320px;">
    <MdFilledAutoComplete v-model="value" :label="args.label" :items="args.items" />
  </div>\`
})`,...d.parameters?.docs?.source}}};const W=["FilledAutoComplete"];export{d as FilledAutoComplete,W as __namedExportsOrder,Q as default};
