import{_ as p}from"./MdSegmentedButton-vw1CoZuF.js";import{w as f,e as c,F as _,f as b,b as m,c as y,r as V}from"./iframe-BkwO8pQ8.js";import"./MdRipple-DzJht9xn.js";import"./MdIcon-CAX4uc9J.js";import"./_plugin-vue_export-helper-DlAUqK2U.js";import"./preload-helper-PPVm8Dsz.js";const v={class:"md-segmented-button-set"},u={__name:"MdSegmentedButtonSet",props:{multiselect:{type:Boolean},items:{type:Array,default:()=>[]},modelValue:{type:[Number,Array]}},emits:["update:modelValue"],setup(n,{emit:d}){const t=n,e=V(null),r=(a,l)=>{t.items[l].disabled||(t.multiselect?e.value.includes(l)?e.value=e.value.filter(o=>o!==l):e.value.push(l):e.value===l?e.value=null:e.value=l)},g=a=>t.multiselect?e.value.includes(a):e.value===a;return f(()=>t.multiselect,a=>{a?e.value=t.modelValue!==void 0?t.modelValue:[]:e.value=t.modelValue!==void 0?t.modelValue:null},{immediate:!0}),(a,l)=>(m(),c("span",v,[(m(!0),c(_,null,b(n.items,(o,i)=>(m(),y(p,{label:o.label,disabled:o.disabled,selected:g(i),onClick:S=>r(S,i)},null,8,["label","disabled","selected","onClick"]))),256))]))}};u.__docgenInfo=Object.assign({displayName:u.name??u.__name},{exportName:"default",displayName:"MdSegmentedButtonSet",description:"",tags:{},props:[{name:"multiselect",type:{name:"boolean"}},{name:"items",type:{name:"array"},defaultValue:{func:!1,value:"[]"}},{name:"modelValue",type:{name:"number|array"}}],events:[{name:"update:modelValue"}],sourceFiles:["/home/runner/work/vue-material-3/vue-material-3/src/components/segmented-button/MdSegmentedButtonSet.vue"]});const{useArgs:B}=__STORYBOOK_MODULE_PREVIEW_API__,I={title:"Components/Segmented Button",component:u,argTypes:{}},A=n=>{const[d,t]=B(),{multiselect:e,modelValue:r}=d;return e?Array.isArray(r)||(t({...n,modelValue:[1,2]}),n.modelValue=[1,2]):Array.isArray(r)&&(t({...n,modelValue:1}),n.modelValue=1),{components:{MdSegmentedButton:p,MdSegmentedButtonSet:u},setup(){return{args:n}},template:`<MdSegmentedButtonSet v-bind="args" :items="[{ label: 'Day' }, { label: 'Week' }, { label: 'Month' }]"></MdSegmentedButtonSet>`}},s=A.bind({});s.args={multiselect:!1,modelValue:1};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`args => {
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
}`,...s.parameters?.docs?.source}}};const N=["SegmentedButtonSet"];export{s as SegmentedButtonSet,N as __namedExportsOrder,I as default};
