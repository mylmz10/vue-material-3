import{o as k,w as x,c as V,a as g,i as C,u as _,r as n,b as d,d as F,e as w,F as I,f as L,g as B}from"./iframe-BkwO8pQ8.js";import{_ as N}from"./MdFilledTextField-CgpoBKHI.js";import{_ as T}from"./MdMenu-CCJ4F2Yw.js";import{M as E}from"./MdList-97n-f0b_.js";import{_ as y}from"./MdListItem-DRpRPN8Q.js";import"./preload-helper-PPVm8Dsz.js";import"./MdTextFieldBase-DpylowWF.js";import"./MdFilledField-DSS8FNJA.js";import"./MdField-PF8l9Kv1.js";import"./_plugin-vue_export-helper-DlAUqK2U.js";import"./MdIcon-CAX4uc9J.js";import"./MdRipple-DzJht9xn.js";const m={__name:"MdFilledAutoComplete",props:{modelValue:{type:String,default:null},label:{type:String,default:null},items:{type:Array,default:null}},emits:["update:modelValue","update:search"],setup(o,{emit:c}){const u=o,f=c;let a=n(!1),e=n(null),s=n(!1),v=n(!0);const r=B(()=>!s.value&&e.value?u.items.filter(t=>t.toLocaleLowerCase().includes(e.value.toLocaleLowerCase())):u.items);k(()=>{e.value=u.modelValue});const b=()=>{a.value=!0},A=()=>{s.value=!1,v.value=!1,f("update:search",e.value)},M=t=>{e.value=r.value[t],a.value=!1,v.value=!0,f("update:modelValue",r.value[t])};return x(()=>a.value,t=>{t?e.value===u.modelValue?s.value=!0:s.value=!1:(v.value||(e.value=null,f("update:modelValue",null)),s.value=!1)}),(t,i)=>(d(),V(T,{class:"md-autocomplete",modelValue:_(a),"onUpdate:modelValue":i[1]||(i[1]=l=>C(a)?a.value=l:a=l)},{activator:g(()=>[F(N,{modelValue:_(e),"onUpdate:modelValue":i[0]||(i[0]=l=>C(e)?e.value=l:e=l),label:u.label,onFocus:b,onInput:A},null,8,["modelValue","label"])]),default:g(()=>[F(E,null,{default:g(()=>[r.value.length?(d(!0),w(I,{key:0},L(r.value,(l,h)=>(d(),V(y,{selected:o.modelValue===l,headline:l,onClick:S=>M(h)},null,8,["selected","headline","onClick"]))),256)):(d(),V(y,{key:1,headline:"No data available"}))]),_:1})]),_:1},8,["modelValue"]))}};m.__docgenInfo=Object.assign({displayName:m.name??m.__name},{exportName:"default",displayName:"MdFilledAutoComplete",description:"",tags:{},props:[{name:"modelValue",type:{name:"string"},defaultValue:{func:!1,value:"null"}},{name:"label",type:{name:"string"},defaultValue:{func:!1,value:"null"}},{name:"items",type:{name:"array"},defaultValue:{func:!1,value:"null"}}],events:[{name:"update:modelValue"},{name:"update:search"}],sourceFiles:["/home/runner/work/vue-material-3/vue-material-3/src/components/autocomplete/MdFilledAutoComplete.vue"]});const Q={title:"Components/Autocomplete",component:m,args:{modelValue:"",label:"City",items:["Istanbul","Ankara","Izmir","Antalya","Bursa","Eskisehir"]}},O=o=>({components:{MdFilledAutoComplete:m},setup(){const c=n(o.modelValue);return{args:o,value:c}},template:`<div style="max-width: 320px;">
    <MdFilledAutoComplete v-model="value" :label="args.label" :items="args.items" />
  </div>`}),p=O.bind({});p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`args => ({
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
})`,...p.parameters?.docs?.source}}};const W=["FilledAutoComplete"];export{p as FilledAutoComplete,W as __namedExportsOrder,Q as default};
