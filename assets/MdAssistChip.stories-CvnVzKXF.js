import{c as u,a as i,b as f,j as d}from"./iframe-BZY2mGdK.js";import{_ as c}from"./MdChip-BWs__v6G.js";import"./preload-helper-PPVm8Dsz.js";import"./MdIcon-BgVvRcVs.js";import"./_plugin-vue_export-helper-DlAUqK2U.js";import"./MdRipple-qtXqqLlf.js";const o={__name:"MdAssistChip",props:{alwaysFocusable:{type:Boolean,default:!1},disabled:{type:Boolean,default:!1},download:{type:String,default:""},elevated:{type:Boolean,default:!1},href:{type:String,default:""},label:{type:String,default:""},leadingIcon:{type:String,default:""},softDisabled:{type:Boolean,default:!1},tabIndex:{type:[Number,String],default:void 0},target:{type:String,default:""},trailingIcon:{type:String,default:""},value:{type:[String,Number,Boolean,Object],default:void 0}},emits:["click","focus","blur"],setup(e,{emit:r}){const s=r;return(n,t)=>(f(),u(c,{variant:"assist","always-focusable":e.alwaysFocusable,disabled:e.disabled,download:e.download,elevated:e.elevated,href:e.href,label:e.label,"leading-icon":e.leadingIcon,"soft-disabled":e.softDisabled,"tab-index":e.tabIndex,target:e.target,"trailing-icon":e.trailingIcon,value:e.value,onClick:t[0]||(t[0]=a=>s("click",a)),onFocus:t[1]||(t[1]=a=>s("focus",a)),onBlur:t[2]||(t[2]=a=>s("blur",a))},{"leading-icon":i(()=>[d(n.$slots,"leading-icon")]),"trailing-icon":i(()=>[d(n.$slots,"trailing-icon")]),default:i(()=>[d(n.$slots,"default")]),_:3},8,["always-focusable","disabled","download","elevated","href","label","leading-icon","soft-disabled","tab-index","target","trailing-icon","value"]))}},h={title:"Components/Chips",component:o,args:{label:"Assist chip",leadingIcon:"schedule",elevated:!1,disabled:!1}},b=e=>({components:{MdAssistChip:o},setup(){return{args:e}},template:'<MdAssistChip v-bind="args" />'}),l=b.bind({});l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`args => ({
  components: {
    MdAssistChip
  },
  setup() {
    return {
      args
    };
  },
  template: \`<MdAssistChip v-bind="args" />\`
})`,...l.parameters?.docs?.source}}};const S=["AssistChip"];export{l as AssistChip,S as __namedExportsOrder,h as default};
