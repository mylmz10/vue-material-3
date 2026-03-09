import{_ as c}from"./MdSegmentedButton-4zKdR9Gh.js";import{i as _,b as i,F as f,v as V,o,c as b,l as A}from"./iframe-C_bcjK8c.js";import"./MdRipple-BcHFM7kG.js";import"./MdIcon-ByZyJWIN.js";import"./_plugin-vue_export-helper-DlAUqK2U.js";import"./preload-helper-PPVm8Dsz.js";const B={class:"md-segmented-button-set"},p={__name:"MdSegmentedButtonSet",props:{multiselect:{type:Boolean},items:{type:Array,default:()=>[]},modelValue:{type:[Number,Array]}},emits:["update:modelValue"],setup(l,{emit:m}){const t=l,e=A(null),u=(a,n)=>{t.items[n].disabled||(t.multiselect?e.value.includes(n)?e.value=e.value.filter(r=>r!==n):e.value.push(n):e.value===n?e.value=null:e.value=n)},g=a=>t.multiselect?e.value.includes(a):e.value===a;return _(()=>t.multiselect,a=>{a?e.value=t.modelValue!==void 0?t.modelValue:[]:e.value=t.modelValue!==void 0?t.modelValue:null},{immediate:!0}),(a,n)=>(o(),i("span",B,[(o(!0),i(f,null,V(l.items,(r,d)=>(o(),b(c,{label:r.label,disabled:r.disabled,selected:g(d),onClick:S=>u(S,d)},null,8,["label","disabled","selected","onClick"]))),256))]))}},{useArgs:y}=__STORYBOOK_MODULE_PREVIEW_API__,D={title:"Components/Segmented Button",component:p,argTypes:{}},v=l=>{const[m,t]=y(),{multiselect:e,modelValue:u}=m;return e?Array.isArray(u)||(t({...l,modelValue:[1,2]}),l.modelValue=[1,2]):Array.isArray(u)&&(t({...l,modelValue:1}),l.modelValue=1),{components:{MdSegmentedButton:c,MdSegmentedButtonSet:p},setup(){return{args:l}},template:`<MdSegmentedButtonSet v-bind="args" :items="[{ label: 'Day' }, { label: 'Week' }, { label: 'Month' }]"></MdSegmentedButtonSet>`}},s=v.bind({});s.args={multiselect:!1,modelValue:1};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`args => {
  const [_, updateArgs] = useArgs();
  const {
    multiselect,
    modelValue
  } = _;
  if (multiselect) {
    if (!Array.isArray(modelValue)) {
      updateArgs({
        ...args,
        modelValue: [1, 2]
      });
      args.modelValue = [1, 2];
    }
  } else {
    if (Array.isArray(modelValue)) {
      updateArgs({
        ...args,
        modelValue: 1
      });
      args.modelValue = 1;
    }
  }
  return {
    components: {
      MdSegmentedButton,
      MdSegmentedButtonSet
    },
    setup() {
      return {
        args
      };
    },
    template: \`<MdSegmentedButtonSet v-bind="args" :items="[{ label: 'Day' }, { label: 'Week' }, { label: 'Month' }]"></MdSegmentedButtonSet>\`
  };
}`,...s.parameters?.docs?.source}}};const I=["SegmentedButtonSet"];export{s as SegmentedButtonSet,I as __namedExportsOrder,D as default};
