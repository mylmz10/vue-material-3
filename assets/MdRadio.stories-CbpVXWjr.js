import{i as p,j as R,k as B,b as C,a as E,f as s,n as M,l as r,p as x,o as S}from"./iframe-C_bcjK8c.js";import{_ as q}from"./MdRipple-BcHFM7kG.js";import"./preload-helper-PPVm8Dsz.js";const I=["checked","disabled","name","value","form","required"],y={__name:"MdRadio",props:{checked:{type:Boolean,default:void 0},disabled:{type:Boolean,default:!1},form:{type:String,default:""},modelValue:{type:[String,Number,Boolean],default:void 0},name:{type:String,default:""},required:{type:Boolean,default:!1},value:{type:[String,Number,Boolean],default:""}},emits:["update:modelValue","input","change","focus","blur"],setup(a,{expose:u,emit:c}){const i=c,e=a,t=r(null),l=r(!1),V=r(!1);let m=null;const v=()=>e.modelValue!==void 0?e.modelValue===e.value:!!e.checked;p(()=>e.modelValue,()=>{l.value=v()},{immediate:!0}),p(()=>e.checked,()=>{e.modelValue===void 0&&(l.value=v())},{immediate:!0});const k=d=>{e.disabled||i("input",d.target.checked?e.value:null)},h=d=>{if(e.disabled){d.target.checked=l.value;return}l.value=d.target.checked,l.value&&(i("update:modelValue",e.value),i("change",e.value))},g=()=>{l.value=V.value,l.value&&i("update:modelValue",e.value)},b=x(()=>l.value);return u({focus:()=>t.value?.focus(),blur:()=>t.value?.blur(),checkValidity:()=>t.value?.checkValidity(),reportValidity:()=>t.value?.reportValidity(),setCustomValidity:d=>t.value?.setCustomValidity(d||""),getInputEl:()=>t.value}),R(()=>{l.value=v(),V.value=l.value,m=t.value?.form||null,m?.addEventListener("reset",g)}),B(()=>{m?.removeEventListener("reset",g)}),(d,n)=>(S(),C("div",{class:M(["md-radio",{"md-radio--disabled":a.disabled,"md-radio--checked":b.value}])},[E(q),s("input",{ref_key:"inputEl",ref:t,checked:b.value,disabled:a.disabled,name:a.name||void 0,type:"radio",value:a.value,form:a.form||void 0,required:a.required,onInput:k,onChange:h,onFocus:n[0]||(n[0]=f=>d.$emit("focus",f)),onBlur:n[1]||(n[1]=f=>d.$emit("blur",f))},null,40,I),n[2]||(n[2]=s("div",{class:"md-radio__background"},[s("div",{class:"md-radio__outer-circle"}),s("div",{class:"md-radio__inner-circle"})],-1))],2))}},_={title:"Components/Radio",component:y,argTypes:{}},N=a=>({components:{MdRadio:y},setup(){const u=r(a.modelValue);return p(()=>a.modelValue,c=>{u.value=c}),{args:a,selectedValue:u}},template:`
    <div style="display: flex; align-items: center; gap: 12px;">
      <MdRadio v-model="selectedValue" :disabled="args.disabled" value="1" name="radio" />
      <MdRadio v-model="selectedValue" :disabled="args.disabled" value="2" name="radio" />
    </div>
  `}),o=N.bind({});o.args={modelValue:"2"};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`args => ({
  components: {
    MdRadio
  },
  setup() {
    const selectedValue = ref(args.modelValue);
    watch(() => args.modelValue, value => {
      selectedValue.value = value;
    });
    return {
      args,
      selectedValue
    };
  },
  template: \`
    <div style="display: flex; align-items: center; gap: 12px;">
      <MdRadio v-model="selectedValue" :disabled="args.disabled" value="1" name="radio" />
      <MdRadio v-model="selectedValue" :disabled="args.disabled" value="2" name="radio" />
    </div>
  \`
})`,...o.parameters?.docs?.source}}};const A=["Radio"];export{o as Radio,A as __namedExportsOrder,_ as default};
