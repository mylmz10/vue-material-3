import{c as u,a as o,b as g,j as s}from"./iframe-9ulbaOut.js";import{_ as f}from"./MdChip-C-9xQYMp.js";import"./preload-helper-PPVm8Dsz.js";import"./MdIcon-roTV-g4b.js";import"./_plugin-vue_export-helper-DlAUqK2U.js";import"./MdRipple-Bs_--NBl.js";const d={__name:"MdSuggestionChip",props:{alwaysFocusable:{type:Boolean,default:!1},disabled:{type:Boolean,default:!1},download:{type:String,default:""},elevated:{type:Boolean,default:!1},href:{type:String,default:""},label:{type:String,default:""},leadingIcon:{type:String,default:""},softDisabled:{type:Boolean,default:!1},tabIndex:{type:[Number,String],default:void 0},target:{type:String,default:""},trailingIcon:{type:String,default:""},value:{type:[String,Number,Boolean,Object],default:void 0}},emits:["click","focus","blur"],setup(e,{emit:r}){const l=r;return(i,t)=>(g(),u(f,{variant:"suggestion","always-focusable":e.alwaysFocusable,disabled:e.disabled,download:e.download,elevated:e.elevated,href:e.href,label:e.label,"leading-icon":e.leadingIcon,"soft-disabled":e.softDisabled,"tab-index":e.tabIndex,target:e.target,"trailing-icon":e.trailingIcon,value:e.value,onClick:t[0]||(t[0]=a=>l("click",a)),onFocus:t[1]||(t[1]=a=>l("focus",a)),onBlur:t[2]||(t[2]=a=>l("blur",a))},{"leading-icon":o(()=>[s(i.$slots,"leading-icon")]),"trailing-icon":o(()=>[s(i.$slots,"trailing-icon")]),default:o(()=>[s(i.$slots,"default")]),_:3},8,["always-focusable","disabled","download","elevated","href","label","leading-icon","soft-disabled","tab-index","target","trailing-icon","value"]))}},C={title:"Components/Chips",component:d,args:{label:"Suggestion chip",leadingIcon:"lightbulb",elevated:!1,disabled:!1}},c=e=>({components:{MdSuggestionChip:d},setup(){return{args:e}},template:'<MdSuggestionChip v-bind="args" />'}),n=c.bind({});n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`args => ({
  components: {
    MdSuggestionChip
  },
  setup() {
    return {
      args
    };
  },
  template: \`<MdSuggestionChip v-bind="args" />\`
})`,...n.parameters?.docs?.source}}};const h=["SuggestionChip"];export{n as SuggestionChip,h as __namedExportsOrder,C as default};
