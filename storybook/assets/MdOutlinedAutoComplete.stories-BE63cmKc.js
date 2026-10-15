import{o as k,w as x,c as V,a as g,i as C,u as _,r as s,b as d,d as y,e as w,F,f as I,g as L}from"./iframe-BkwO8pQ8.js";import{_ as B}from"./MdOutlinedTextField-D4y3aHa4.js";import{_ as N}from"./MdMenu-CCJ4F2Yw.js";import{M as T}from"./MdList-97n-f0b_.js";import{_ as b}from"./MdListItem-DRpRPN8Q.js";import"./preload-helper-PPVm8Dsz.js";import"./MdTextFieldBase-DpylowWF.js";import"./MdOutlinedField-BSeul4k2.js";import"./MdField-PF8l9Kv1.js";import"./_plugin-vue_export-helper-DlAUqK2U.js";import"./MdIcon-CAX4uc9J.js";import"./MdRipple-DzJht9xn.js";const m={__name:"MdOutlinedAutoComplete",props:{modelValue:{type:String,default:null},label:{type:String,default:null},items:{type:Array,default:null}},emits:["update:modelValue","update:search"],setup(u,{emit:c}){const o=u,f=c;let a=s(!1),e=s(null),n=s(!1),v=s(!0);const r=L(()=>!n.value&&e.value?o.items.filter(t=>t.toLocaleLowerCase().includes(e.value.toLocaleLowerCase())):o.items);k(()=>{e.value=o.modelValue});const A=()=>{a.value=!0},O=()=>{n.value=!1,v.value=!1,f("update:search",e.value)},M=t=>{e.value=r.value[t],a.value=!1,v.value=!0,f("update:modelValue",r.value[t])};return x(()=>a.value,t=>{t?e.value===o.modelValue?n.value=!0:n.value=!1:(v.value||(e.value=null,f("update:modelValue",null)),n.value=!1)}),(t,i)=>(d(),V(N,{class:"md-autocomplete",modelValue:_(a),"onUpdate:modelValue":i[1]||(i[1]=l=>C(a)?a.value=l:a=l)},{activator:g(()=>[y(B,{modelValue:_(e),"onUpdate:modelValue":i[0]||(i[0]=l=>C(e)?e.value=l:e=l),label:o.label,onFocus:A,onInput:O},null,8,["modelValue","label"])]),default:g(()=>[y(T,null,{default:g(()=>[r.value.length?(d(!0),w(F,{key:0},I(r.value,(l,h)=>(d(),V(b,{selected:u.modelValue===l,headline:l,onClick:S=>M(h)},null,8,["selected","headline","onClick"]))),256)):(d(),V(b,{key:1,headline:"No data available"}))]),_:1})]),_:1},8,["modelValue"]))}};m.__docgenInfo=Object.assign({displayName:m.name??m.__name},{exportName:"default",displayName:"MdOutlinedAutoComplete",description:"",tags:{},props:[{name:"modelValue",type:{name:"string"},defaultValue:{func:!1,value:"null"}},{name:"label",type:{name:"string"},defaultValue:{func:!1,value:"null"}},{name:"items",type:{name:"array"},defaultValue:{func:!1,value:"null"}}],events:[{name:"update:modelValue"},{name:"update:search"}],sourceFiles:["/home/runner/work/vue-material-3/vue-material-3/src/components/autocomplete/MdOutlinedAutoComplete.vue"]});const Q={title:"Components/Autocomplete",component:m,args:{modelValue:"",label:"City",items:["Istanbul","Ankara","Izmir","Antalya","Bursa","Eskisehir"]}},E=u=>({components:{MdOutlinedAutoComplete:m},setup(){const c=s(u.modelValue);return{args:u,value:c}},template:`<div style="max-width: 320px;">
    <MdOutlinedAutoComplete v-model="value" :label="args.label" :items="args.items" />
  </div>`}),p=E.bind({});p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`args => ({
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
})`,...p.parameters?.docs?.source}}};const W=["OutlinedAutoComplete"];export{p as OutlinedAutoComplete,W as __namedExportsOrder,Q as default};
