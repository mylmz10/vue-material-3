import{o as f,c as b,w as i,r as d}from"./iframe-C_bcjK8c.js";import{a as g,_ as c}from"./MdFilterChip-BM-1NZ3I.js";import"./preload-helper-PPVm8Dsz.js";import"./MdIcon-ByZyJWIN.js";import"./_plugin-vue_export-helper-DlAUqK2U.js";import"./MdRipple-BcHFM7kG.js";const m={__name:"MdAssistChip",props:{alwaysFocusable:{type:Boolean,default:!1},disabled:{type:Boolean,default:!1},download:{type:String,default:""},elevated:{type:Boolean,default:!1},href:{type:String,default:""},label:{type:String,default:""},leadingIcon:{type:String,default:""},softDisabled:{type:Boolean,default:!1},tabIndex:{type:[Number,String],default:void 0},target:{type:String,default:""},trailingIcon:{type:String,default:""},value:{type:[String,Number,Boolean,Object],default:void 0}},emits:["click","focus","blur"],setup(e,{emit:s}){const l=s;return(n,a)=>(f(),b(g,{variant:"assist","always-focusable":e.alwaysFocusable,disabled:e.disabled,download:e.download,elevated:e.elevated,href:e.href,label:e.label,"leading-icon":e.leadingIcon,"soft-disabled":e.softDisabled,"tab-index":e.tabIndex,target:e.target,"trailing-icon":e.trailingIcon,value:e.value,onClick:a[0]||(a[0]=t=>l("click",t)),onFocus:a[1]||(a[1]=t=>l("focus",t)),onBlur:a[2]||(a[2]=t=>l("blur",t))},{"leading-icon":i(()=>[d(n.$slots,"leading-icon")]),"trailing-icon":i(()=>[d(n.$slots,"trailing-icon")]),default:i(()=>[d(n.$slots,"default")]),_:3},8,["always-focusable","disabled","download","elevated","href","label","leading-icon","soft-disabled","tab-index","target","trailing-icon","value"]))}},y={__name:"MdInputChip",props:{alwaysFocusable:{type:Boolean,default:!1},avatar:{type:String,default:""},disabled:{type:Boolean,default:!1},download:{type:String,default:""},href:{type:String,default:""},label:{type:String,default:""},leadingIcon:{type:String,default:""},removable:{type:Boolean,default:!1},removeAriaLabel:{type:String,default:"Remove"},selected:{type:Boolean,default:!1},softDisabled:{type:Boolean,default:!1},tabIndex:{type:[Number,String],default:void 0},target:{type:String,default:""},trailingIcon:{type:String,default:""},value:{type:[String,Number,Boolean,Object],default:void 0}},emits:["update:selected","input","change","click","remove","focus","blur"],setup(e,{emit:s}){const l=s;return(n,a)=>(f(),b(g,{variant:"input","always-focusable":e.alwaysFocusable,avatar:e.avatar,disabled:e.disabled,download:e.download,href:e.href,label:e.label,"leading-icon":e.leadingIcon,removable:e.removable,"remove-aria-label":e.removeAriaLabel,selected:e.selected,"soft-disabled":e.softDisabled,"tab-index":e.tabIndex,target:e.target,"trailing-icon":e.trailingIcon,value:e.value,"onUpdate:selected":a[0]||(a[0]=t=>l("update:selected",t)),onInput:a[1]||(a[1]=t=>l("input",t)),onChange:a[2]||(a[2]=t=>l("change",t)),onClick:a[3]||(a[3]=t=>l("click",t)),onRemove:a[4]||(a[4]=t=>l("remove",t)),onFocus:a[5]||(a[5]=t=>l("focus",t)),onBlur:a[6]||(a[6]=t=>l("blur",t))},{avatar:i(()=>[d(n.$slots,"avatar")]),"leading-icon":i(()=>[d(n.$slots,"leading-icon")]),"trailing-icon":i(()=>[d(n.$slots,"trailing-icon")]),default:i(()=>[d(n.$slots,"default")]),_:3},8,["always-focusable","avatar","disabled","download","href","label","leading-icon","removable","remove-aria-label","selected","soft-disabled","tab-index","target","trailing-icon","value"]))}},v={__name:"MdSuggestionChip",props:{alwaysFocusable:{type:Boolean,default:!1},disabled:{type:Boolean,default:!1},download:{type:String,default:""},elevated:{type:Boolean,default:!1},href:{type:String,default:""},label:{type:String,default:""},leadingIcon:{type:String,default:""},softDisabled:{type:Boolean,default:!1},tabIndex:{type:[Number,String],default:void 0},target:{type:String,default:""},trailingIcon:{type:String,default:""},value:{type:[String,Number,Boolean,Object],default:void 0}},emits:["click","focus","blur"],setup(e,{emit:s}){const l=s;return(n,a)=>(f(),b(g,{variant:"suggestion","always-focusable":e.alwaysFocusable,disabled:e.disabled,download:e.download,elevated:e.elevated,href:e.href,label:e.label,"leading-icon":e.leadingIcon,"soft-disabled":e.softDisabled,"tab-index":e.tabIndex,target:e.target,"trailing-icon":e.trailingIcon,value:e.value,onClick:a[0]||(a[0]=t=>l("click",t)),onFocus:a[1]||(a[1]=t=>l("focus",t)),onBlur:a[2]||(a[2]=t=>l("blur",t))},{"leading-icon":i(()=>[d(n.$slots,"leading-icon")]),"trailing-icon":i(()=>[d(n.$slots,"trailing-icon")]),default:i(()=>[d(n.$slots,"default")]),_:3},8,["always-focusable","disabled","download","elevated","href","label","leading-icon","soft-disabled","tab-index","target","trailing-icon","value"]))}},F={title:"Components/Chip",component:g,argTypes:{}},C=e=>({components:{MdChip:g},setup(){return{args:e}},template:'<MdChip v-bind="args"></MdChip>'}),o=C.bind({});o.args={label:"Filter",variant:"filter",selected:!1};const p=e=>({components:{MdAssistChip:m,MdFilterChip:c,MdInputChip:y,MdSuggestionChip:v},setup(){return{args:e}},template:`
    <div style="display: flex; flex-wrap: wrap; gap: 8px;">
      <MdAssistChip label="Assist" leading-icon="add" />
      <MdSuggestionChip label="Suggestion" leading-icon="lightbulb" />
      <MdFilterChip v-bind="args" />
      <MdInputChip label="Input" removable leading-icon="person" />
    </div>
  `}),r=p.bind({});r.args={label:"Filter",selected:!0,leadingIcon:"done",removable:!1};const u=p.bind({});u.args={label:"Item 1",selected:!1,leadingIcon:""};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`args => ({
  components: {
    MdChip
  },
  setup() {
    return {
      args
    };
  },
  template: \`<MdChip v-bind="args"></MdChip>\`
})`,...o.parameters?.docs?.source}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`args => ({
  components: {
    MdAssistChip,
    MdFilterChip,
    MdInputChip,
    MdSuggestionChip
  },
  setup() {
    return {
      args
    };
  },
  template: \`
    <div style="display: flex; flex-wrap: wrap; gap: 8px;">
      <MdAssistChip label="Assist" leading-icon="add" />
      <MdSuggestionChip label="Suggestion" leading-icon="lightbulb" />
      <MdFilterChip v-bind="args" />
      <MdInputChip label="Input" removable leading-icon="person" />
    </div>
  \`
})`,...r.parameters?.docs?.source}}};u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`args => ({
  components: {
    MdAssistChip,
    MdFilterChip,
    MdInputChip,
    MdSuggestionChip
  },
  setup() {
    return {
      args
    };
  },
  template: \`
    <div style="display: flex; flex-wrap: wrap; gap: 8px;">
      <MdAssistChip label="Assist" leading-icon="add" />
      <MdSuggestionChip label="Suggestion" leading-icon="lightbulb" />
      <MdFilterChip v-bind="args" />
      <MdInputChip label="Input" removable leading-icon="person" />
    </div>
  \`
})`,...u.parameters?.docs?.source}}};const x=["Chip","Wrappers","FilterChip"];export{o as Chip,u as FilterChip,r as Wrappers,x as __namedExportsOrder,F as default};
