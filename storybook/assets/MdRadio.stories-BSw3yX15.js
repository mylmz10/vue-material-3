import{w as V,x as R,y as C,g as M,f as B,p as r,b as E,r as m,k as x,e as N}from"./iframe-Bo7-BOp5.js";import{_ as I}from"./MdRipple-DHfXgmxP.js";import"./preload-helper-PPVm8Dsz.js";const q=["checked","disabled","name","value","form","required"],o={__name:"MdRadio",props:{checked:{type:Boolean,default:void 0},disabled:{type:Boolean,default:!1},form:{type:String,default:""},modelValue:{type:[String,Number,Boolean],default:void 0},name:{type:String,default:""},required:{type:Boolean,default:!1},value:{type:[String,Number,Boolean],default:""}},emits:["update:modelValue","input","change","focus","blur"],setup(a,{expose:s,emit:c}){const i=c,e=a,d=m(null),l=m(!1),b=m(!1);let f=null;const v=()=>e.modelValue!==void 0?e.modelValue===e.value:!!e.checked;V(()=>e.modelValue,()=>{l.value=v()},{immediate:!0}),V(()=>e.checked,()=>{e.modelValue===void 0&&(l.value=v())},{immediate:!0});const k=n=>{e.disabled||i("input",n.target.checked?e.value:null)},h=n=>{if(e.disabled){n.target.checked=l.value;return}l.value=n.target.checked,l.value&&(i("update:modelValue",e.value),i("change",e.value))},g=()=>{l.value=b.value,l.value&&i("update:modelValue",e.value)},y=x(()=>l.value);return s({focus:()=>d.value?.focus(),blur:()=>d.value?.blur(),checkValidity:()=>d.value?.checkValidity(),reportValidity:()=>d.value?.reportValidity(),setCustomValidity:n=>d.value?.setCustomValidity(n||""),getInputEl:()=>d.value}),R(()=>{l.value=v(),b.value=l.value,f=d.value?.form||null,f?.addEventListener("reset",g)}),C(()=>{f?.removeEventListener("reset",g)}),(n,t)=>(N(),M("div",{class:E(["md-radio",{"md-radio--disabled":a.disabled,"md-radio--checked":y.value}])},[B(I),r("input",{ref_key:"inputEl",ref:d,checked:y.value,disabled:a.disabled,name:a.name||void 0,type:"radio",value:a.value,form:a.form||void 0,required:a.required,onInput:k,onChange:h,onFocus:t[0]||(t[0]=p=>n.$emit("focus",p)),onBlur:t[1]||(t[1]=p=>n.$emit("blur",p))},null,40,q),t[2]||(t[2]=r("div",{class:"md-radio__background"},[r("div",{class:"md-radio__outer-circle"}),r("div",{class:"md-radio__inner-circle"})],-1))],2))}};o.__docgenInfo=Object.assign({displayName:o.name??o.__name},{exportName:"default",displayName:"MdRadio",description:"",tags:{},expose:[{name:"focus"},{name:"blur"},{name:"checkValidity"},{name:"reportValidity"},{name:"setCustomValidity"},{name:"getInputEl"}],props:[{name:"checked",type:{name:"boolean"},defaultValue:{func:!1,value:"undefined"}},{name:"disabled",type:{name:"boolean"},defaultValue:{func:!1,value:"false"}},{name:"form",type:{name:"string"},defaultValue:{func:!1,value:"''"}},{name:"modelValue",type:{name:"string|number|boolean"},defaultValue:{func:!1,value:"undefined"}},{name:"name",type:{name:"string"},defaultValue:{func:!1,value:"''"}},{name:"required",type:{name:"boolean"},defaultValue:{func:!1,value:"false"}},{name:"value",type:{name:"string|number|boolean"},defaultValue:{func:!1,value:"''"}}],events:[{name:"focus"},{name:"blur"},{name:"update:modelValue"},{name:"input"},{name:"change"}],sourceFiles:["/home/runner/work/vue-material-3/vue-material-3/src/components/radio/MdRadio.vue"]});const U={title:"Components/Radio",component:o,argTypes:{}},S=a=>({components:{MdRadio:o},setup(){const s=m(a.modelValue);return V(()=>a.modelValue,c=>{s.value=c}),{args:a,selectedValue:s}},template:`
    <div style="display: flex; align-items: center; gap: 12px;">
      <MdRadio v-model="selectedValue" :disabled="args.disabled" value="1" name="radio" />
      <MdRadio v-model="selectedValue" :disabled="args.disabled" value="2" name="radio" />
    </div>
  `}),u=S.bind({});u.args={modelValue:"2"};u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`args => ({
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
})`,...u.parameters?.docs?.source}}};const A=["Radio"];export{u as Radio,A as __namedExportsOrder,U as default};
