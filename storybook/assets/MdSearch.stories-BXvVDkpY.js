import{r as S,w as b,e as u,h as s,d as h,a as v,J as C,N as T,t as g,l as f,j as V,g as M,b as d,k as x}from"./iframe-BkwO8pQ8.js";import{M as y}from"./MdIcon-CAX4uc9J.js";import{_ as N}from"./_plugin-vue_export-helper-DlAUqK2U.js";import"./preload-helper-PPVm8Dsz.js";const A={class:"search-wrapper"},I={class:"search-container"},B=["placeholder"],$={key:0,class:"supporting-text"},j={key:1,class:"avatar"},r={__name:"MdSearch",props:{modelValue:{type:String,default:""},placeholder:{type:String,default:"Search..."},supportingText:{type:String,default:""},showAvatar:{type:Boolean,default:!1}},emits:["update:modelValue","searchClick","trailingClick"],setup(e,{emit:o}){const p=e,i=o,a=S(p.modelValue);b(()=>p.modelValue,n=>{a.value=n});const c=M(()=>a.value?"close":"mic"),k=()=>{i("update:modelValue",a.value)},_=()=>{a.value&&(a.value="",i("update:modelValue","")),i("trailingClick",c.value)};return(n,t)=>(d(),u("div",A,[s("div",I,[s("button",{class:"search-action search-action--leading",type:"button",onClick:t[0]||(t[0]=m=>n.$emit("searchClick"))},[h(y,null,{default:v(()=>[...t[2]||(t[2]=[x("search",-1)])]),_:1})]),C(s("input",{"onUpdate:modelValue":t[1]||(t[1]=m=>a.value=m),type:"text",placeholder:e.placeholder,class:"search-input",onInput:k},null,40,B),[[T,a.value]]),e.supportingText?(d(),u("span",$,g(e.supportingText),1)):f("",!0),e.showAvatar?(d(),u("div",j,[V(n.$slots,"avatar",{},void 0,!0)])):f("",!0),s("button",{class:"search-action search-action--trailing",type:"button",onClick:_},[V(n.$slots,"trailing",{icon:c.value,dirty:!!a.value},()=>[h(y,null,{default:v(()=>[x(g(c.value),1)]),_:1})],!0)])])]))}},w=N(r,[["__scopeId","data-v-abe89d34"]]);r.__docgenInfo=Object.assign({displayName:r.name??r.__name},{exportName:"default",displayName:"MdSearch",description:"",tags:{},props:[{name:"modelValue",type:{name:"string"},defaultValue:{func:!1,value:"''"}},{name:"placeholder",type:{name:"string"},defaultValue:{func:!1,value:"'Search...'"}},{name:"supportingText",type:{name:"string"},defaultValue:{func:!1,value:"''"}},{name:"showAvatar",type:{name:"boolean"},defaultValue:{func:!1,value:"false"}}],events:[{name:"searchClick"},{name:"update:modelValue"},{name:"trailingClick"}],slots:[{name:"avatar"},{name:"trailing",scoped:!0,bindings:[{name:"icon",title:"binding"},{name:"dirty",title:"binding"}]}],sourceFiles:["/home/runner/work/vue-material-3/vue-material-3/src/components/search/MdSearch.vue"]});const U={title:"Components/Search",component:w,args:{modelValue:"",placeholder:"Search trips",supportingText:"",showAvatar:!1}},D=e=>({components:{MdSearch:w},setup(){const o=S(e.modelValue);return{args:e,value:o}},template:`<div style="max-width: 560px;">
    <MdSearch
      v-model="value"
      :placeholder="args.placeholder"
      :supporting-text="args.supportingText"
      :show-avatar="args.showAvatar"
    />
  </div>`}),l=D.bind({});l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`args => ({
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
})`,...l.parameters?.docs?.source}}};const q=["Search"];export{l as Search,q as __namedExportsOrder,U as default};
