import{_ as p}from"./MdSegmentedButton-grgW7Cas.js";import{w as f,g as i,F as _,h as b,e as c,c as v,r as A}from"./iframe-Bo7-BOp5.js";import"./MdRipple-DHfXgmxP.js";import"./MdIcon-DuMzCwGM.js";import"./_plugin-vue_export-helper-DlAUqK2U.js";import"./preload-helper-PPVm8Dsz.js";const V={class:"md-segmented-button-set"},m={__name:"MdSegmentedButtonSet",props:{multiselect:{type:Boolean},items:{type:Array,default:()=>[]},modelValue:{type:[Number,Array]}},emits:["update:modelValue"],setup(l,{emit:d}){const r=d,a=l,e=A(null),g=(s,t)=>{if(!a.items[t].disabled)if(a.multiselect){let n;e.value.includes(t)?n=e.value.filter(u=>u!==t):n=[...e.value,t],e.value=n,r("update:modelValue",n)}else{const n=e.value===t?null:t;e.value=n,r("update:modelValue",n)}},S=s=>a.multiselect?e.value.includes(s):e.value===s;return f(()=>[a.multiselect,a.modelValue],([s,t])=>{if(s){e.value=Array.isArray(t)?[...t]:[];return}e.value=typeof t=="number"?t:null},{immediate:!0}),(s,t)=>(c(),i("span",V,[(c(!0),i(_,null,b(l.items,(n,u)=>(c(),v(p,{key:n.value??n.label??u,label:n.label,disabled:n.disabled,selected:S(u),onClick:y=>g(y,u)},null,8,["label","disabled","selected","onClick"]))),128))]))}};m.__docgenInfo=Object.assign({displayName:m.name??m.__name},{exportName:"default",displayName:"MdSegmentedButtonSet",description:"",tags:{},props:[{name:"multiselect",type:{name:"boolean"}},{name:"items",type:{name:"array"},defaultValue:{func:!1,value:"[]"}},{name:"modelValue",type:{name:"number|array"}}],events:[{name:"update:modelValue"}],sourceFiles:["/home/runner/work/vue-material-3/vue-material-3/src/components/segmented-button/MdSegmentedButtonSet.vue"]});const{useArgs:B}=__STORYBOOK_MODULE_PREVIEW_API__,N={title:"Components/Segmented Button",component:m,argTypes:{}},M=l=>{const[d,r]=B(),{multiselect:a,modelValue:e}=d;return a?Array.isArray(e)||(r({...l,modelValue:[1,2]}),l.modelValue=[1,2]):Array.isArray(e)&&(r({...l,modelValue:1}),l.modelValue=1),{components:{MdSegmentedButton:p,MdSegmentedButtonSet:m},setup(){return{args:l}},template:`<MdSegmentedButtonSet v-bind="args" :items="[{ label: 'Day' }, { label: 'Week' }, { label: 'Month' }]"></MdSegmentedButtonSet>`}},o=M.bind({});o.args={multiselect:!1,modelValue:1};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`args => {
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
}`,...o.parameters?.docs?.source}}};const w=["SegmentedButtonSet"];export{o as SegmentedButtonSet,w as __namedExportsOrder,N as default};
