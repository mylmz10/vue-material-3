import{r as m,w as S,e as i,h as p,d as f,G as x,L as M,t as V,l as c,j as w,c as k,b as n}from"./iframe-9ulbaOut.js";import{_ as u}from"./MdIconButton-DBSOwFek.js";import{_ as y}from"./_plugin-vue_export-helper-DlAUqK2U.js";import{_ as A}from"./MdAvatar--hcTYyrr.js";import"./preload-helper-PPVm8Dsz.js";import"./MdRipple-Bs_--NBl.js";import"./MdIcon-roTV-g4b.js";const I={class:"search-wrapper"},_={class:"search-container"},C=["placeholder"],T={key:0,class:"supporting-text"},$={key:1,class:"avatar"},B={__name:"MdSearch",props:{modelValue:{type:String,default:""},placeholder:{type:String,default:"Search..."},supportingText:{type:String,default:""},showAvatar:{type:Boolean,default:!1},trailingIcon:{type:String,default:""}},emits:["update:modelValue","searchClick","trailingClick"],setup(e,{emit:s}){const d=e,v=s,r=m(d.modelValue);S(()=>d.modelValue,a=>{r.value=a});const g=()=>{v("update:modelValue",r.value)};return(a,t)=>(n(),i("div",I,[p("div",_,[f(u,{icon:"search",onClick:t[0]||(t[0]=l=>a.$emit("searchClick"))}),x(p("input",{"onUpdate:modelValue":t[1]||(t[1]=l=>r.value=l),type:"text",placeholder:e.placeholder,class:"search-input",onInput:g},null,40,C),[[M,r.value]]),e.supportingText?(n(),i("span",T,V(e.supportingText),1)):c("",!0),e.showAvatar?(n(),i("div",$,[w(a.$slots,"avatar",{},void 0,!0)])):c("",!0),e.trailingIcon?(n(),k(u,{key:2,icon:e.trailingIcon,onClick:t[2]||(t[2]=l=>a.$emit("trailingClick"))},null,8,["icon"])):c("",!0)])]))}},h=y(B,[["__scopeId","data-v-89416730"]]),P={title:"Components/Search",component:h,args:{modelValue:"",placeholder:"Search components",supportingText:"Press Enter to search",showAvatar:!0,trailingIcon:"close"}},E=e=>({components:{MdSearch:h,MdAvatar:A},setup(){const s=m(e.modelValue);return{args:e,value:s}},template:`<div style="max-width: 560px;">
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
  </div>`}),o=E.bind({});o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`args => ({
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
})`,...o.parameters?.docs?.source}}};const U=["Search"];export{o as Search,U as __namedExportsOrder,P as default};
