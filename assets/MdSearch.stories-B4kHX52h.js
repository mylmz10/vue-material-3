import{r as m,w as S,e as i,h as p,d as f,H as x,M,t as V,l as c,j as w,c as k,b as n}from"./iframe-BZY2mGdK.js";import{_ as u}from"./MdIconButton-Bow7dLsv.js";import{_ as y}from"./_plugin-vue_export-helper-DlAUqK2U.js";import{_ as A}from"./MdAvatar-DS6R_geV.js";import"./preload-helper-PPVm8Dsz.js";import"./MdRipple-qtXqqLlf.js";import"./MdIcon-BgVvRcVs.js";const I={class:"search-wrapper"},_={class:"search-container"},C=["placeholder"],T={key:0,class:"supporting-text"},$={key:1,class:"avatar"},B={__name:"MdSearch",props:{modelValue:{type:String,default:""},placeholder:{type:String,default:"Search..."},supportingText:{type:String,default:""},showAvatar:{type:Boolean,default:!1},trailingIcon:{type:String,default:""}},emits:["update:modelValue","searchClick","trailingClick"],setup(e,{emit:s}){const d=e,v=s,r=m(d.modelValue);S(()=>d.modelValue,t=>{r.value=t});const g=()=>{v("update:modelValue",r.value)};return(t,a)=>(n(),i("div",I,[p("div",_,[f(u,{icon:"search",onClick:a[0]||(a[0]=l=>t.$emit("searchClick"))}),x(p("input",{"onUpdate:modelValue":a[1]||(a[1]=l=>r.value=l),type:"text",placeholder:e.placeholder,class:"search-input",onInput:g},null,40,C),[[M,r.value]]),e.supportingText?(n(),i("span",T,V(e.supportingText),1)):c("",!0),e.showAvatar?(n(),i("div",$,[w(t.$slots,"avatar",{},void 0,!0)])):c("",!0),e.trailingIcon?(n(),k(u,{key:2,icon:e.trailingIcon,onClick:a[2]||(a[2]=l=>t.$emit("trailingClick"))},null,8,["icon"])):c("",!0)])]))}},h=y(B,[["__scopeId","data-v-eb06a2c5"]]),U={title:"Components/Search",component:h,args:{modelValue:"",placeholder:"Search components",supportingText:"Press Enter to search",showAvatar:!0,trailingIcon:"close"}},b=e=>({components:{MdSearch:h,MdAvatar:A},setup(){const s=m(e.modelValue);return{args:e,value:s}},template:`<div style="max-width: 560px;">
    <MdSearch
      v-model="value"
      :placeholder="args.placeholder"
      :supporting-text="args.supportingText"
      :show-avatar="args.showAvatar"
      :trailing-icon="args.trailingIcon"
    >
      <template #avatar>
        <MdAvatar initials="VM" />
      </template>
    </MdSearch>
  </div>`}),o=b.bind({});o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`args => ({
  components: {
    MdSearch,
    MdAvatar
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
      :trailing-icon="args.trailingIcon"
    >
      <template #avatar>
        <MdAvatar initials="VM" />
      </template>
    </MdSearch>
  </div>\`
})`,...o.parameters?.docs?.source}}};const q=["Search"];export{o as Search,q as __namedExportsOrder,U as default};
