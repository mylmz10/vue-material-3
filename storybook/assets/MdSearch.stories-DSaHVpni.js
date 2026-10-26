import{r as S,w as C,g as u,p as s,f as h,a as v,K as T,P as M,t as g,v as f,q as V,k as b,e as d,s as x}from"./iframe-Bo7-BOp5.js";import{M as y}from"./MdIcon-DuMzCwGM.js";import{_ as N}from"./_plugin-vue_export-helper-DlAUqK2U.js";import"./preload-helper-PPVm8Dsz.js";const A={class:"search-wrapper"},I={class:"search-container"},B=["placeholder"],$={key:0,class:"supporting-text"},D={key:1,class:"avatar"},r={__name:"MdSearch",props:{modelValue:{type:String,default:""},placeholder:{type:String,default:"Search..."},supportingText:{type:String,default:""},showAvatar:{type:Boolean,default:!1}},emits:["update:modelValue","searchClick","trailingClick"],setup(e,{emit:o}){const p=e,i=o,t=S(p.modelValue);C(()=>p.modelValue,a=>{t.value=a});const c=b(()=>t.value?"close":"mic"),k=()=>{i("update:modelValue",t.value)},_=()=>{const a=c.value;a==="close"&&(t.value="",i("update:modelValue","")),i("trailingClick",a)};return(a,n)=>(d(),u("div",A,[s("div",I,[s("button",{class:"search-action search-action--leading",type:"button",onClick:n[0]||(n[0]=m=>a.$emit("searchClick"))},[h(y,null,{default:v(()=>[...n[2]||(n[2]=[x("search",-1)])]),_:1})]),T(s("input",{"onUpdate:modelValue":n[1]||(n[1]=m=>t.value=m),type:"text",placeholder:e.placeholder,class:"search-input",onInput:k},null,40,B),[[M,t.value]]),e.supportingText?(d(),u("span",$,g(e.supportingText),1)):f("",!0),e.showAvatar?(d(),u("div",D,[V(a.$slots,"avatar",{},void 0,!0)])):f("",!0),s("button",{class:"search-action search-action--trailing",type:"button",onClick:_},[V(a.$slots,"trailing",{icon:c.value,dirty:!!t.value},()=>[h(y,null,{default:v(()=>[x(g(c.value),1)]),_:1})],!0)])])]))}},w=N(r,[["__scopeId","data-v-697f147f"]]);r.__docgenInfo=Object.assign({displayName:r.name??r.__name},{exportName:"default",displayName:"MdSearch",description:"",tags:{},props:[{name:"modelValue",type:{name:"string"},defaultValue:{func:!1,value:"''"}},{name:"placeholder",type:{name:"string"},defaultValue:{func:!1,value:"'Search...'"}},{name:"supportingText",type:{name:"string"},defaultValue:{func:!1,value:"''"}},{name:"showAvatar",type:{name:"boolean"},defaultValue:{func:!1,value:"false"}}],events:[{name:"searchClick"},{name:"update:modelValue"},{name:"trailingClick"}],slots:[{name:"avatar"},{name:"trailing",scoped:!0,bindings:[{name:"icon",title:"binding"},{name:"dirty",title:"binding"}]}],sourceFiles:["/home/runner/work/vue-material-3/vue-material-3/src/components/search/MdSearch.vue"]});const K={title:"Components/Search",component:w,args:{modelValue:"",placeholder:"Search trips",supportingText:"",showAvatar:!1}},E=e=>({components:{MdSearch:w},setup(){const o=S(e.modelValue);return{args:e,value:o}},template:`<div style="max-width: 560px;">
    <MdSearch
      v-model="value"
      :placeholder="args.placeholder"
      :supporting-text="args.supportingText"
      :show-avatar="args.showAvatar"
    />
  </div>`}),l=E.bind({});l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`args => ({
  components: {
    MdSearch
  },
  setup() {
    const value = ref(args.modelValue);
    return {
      args,
      value
    };
  },
  template: \`<div style="max-width: 560px;">
    <MdSearch
      v-model="value"
      :placeholder="args.placeholder"
      :supporting-text="args.supportingText"
      :show-avatar="args.showAvatar"
    />
  </div>\`
})`,...l.parameters?.docs?.source}}};const P=["Search"];export{l as Search,P as __namedExportsOrder,K as default};
