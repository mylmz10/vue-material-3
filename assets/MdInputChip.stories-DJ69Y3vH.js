import{c as u,a as i,b as m,j as r,r as v}from"./iframe-9ulbaOut.js";import{_ as f}from"./MdChip-C-9xQYMp.js";import"./preload-helper-PPVm8Dsz.js";import"./MdIcon-roTV-g4b.js";import"./_plugin-vue_export-helper-DlAUqK2U.js";import"./MdRipple-Bs_--NBl.js";const s={__name:"MdInputChip",props:{alwaysFocusable:{type:Boolean,default:!1},avatar:{type:String,default:""},disabled:{type:Boolean,default:!1},download:{type:String,default:""},href:{type:String,default:""},label:{type:String,default:""},leadingIcon:{type:String,default:""},removable:{type:Boolean,default:!1},removeAriaLabel:{type:String,default:"Remove"},selected:{type:Boolean,default:!1},softDisabled:{type:Boolean,default:!1},tabIndex:{type:[Number,String],default:void 0},target:{type:String,default:""},trailingIcon:{type:String,default:""},value:{type:[String,Number,Boolean,Object],default:void 0}},emits:["update:selected","input","change","click","remove","focus","blur"],setup(e,{emit:l}){const n=l;return(o,a)=>(m(),u(f,{variant:"input","always-focusable":e.alwaysFocusable,avatar:e.avatar,disabled:e.disabled,download:e.download,href:e.href,label:e.label,"leading-icon":e.leadingIcon,removable:e.removable,"remove-aria-label":e.removeAriaLabel,selected:e.selected,"soft-disabled":e.softDisabled,"tab-index":e.tabIndex,target:e.target,"trailing-icon":e.trailingIcon,value:e.value,"onUpdate:selected":a[0]||(a[0]=t=>n("update:selected",t)),onInput:a[1]||(a[1]=t=>n("input",t)),onChange:a[2]||(a[2]=t=>n("change",t)),onClick:a[3]||(a[3]=t=>n("click",t)),onRemove:a[4]||(a[4]=t=>n("remove",t)),onFocus:a[5]||(a[5]=t=>n("focus",t)),onBlur:a[6]||(a[6]=t=>n("blur",t))},{avatar:i(()=>[r(o.$slots,"avatar")]),"leading-icon":i(()=>[r(o.$slots,"leading-icon")]),"trailing-icon":i(()=>[r(o.$slots,"trailing-icon")]),default:i(()=>[r(o.$slots,"default")]),_:3},8,["always-focusable","avatar","disabled","download","href","label","leading-icon","removable","remove-aria-label","selected","soft-disabled","tab-index","target","trailing-icon","value"]))}},S={title:"Components/Chips",component:s,args:{label:"Input chip",removable:!0,selected:!1,disabled:!1}},p=e=>({components:{MdInputChip:s},setup(){const l=v(!1);return{args:e,removed:l,onRemove:()=>{l.value=!0}}},template:`<div>
    <MdInputChip v-if="!removed" v-bind="args" @remove="onRemove" />
    <span v-else>Chip removed</span>
  </div>`}),d=p.bind({});d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`args => ({
  components: {
    MdInputChip
  },
  setup() {
    const removed = ref(false);
    const onRemove = () => {
      removed.value = true;
    };
    return {
      args,
      removed,
      onRemove
    };
  },
  template: \`<div>
    <MdInputChip v-if="!removed" v-bind="args" @remove="onRemove" />
    <span v-else>Chip removed</span>
  </div>\`
})`,...d.parameters?.docs?.source}}};const w=["InputChip"];export{d as InputChip,w as __namedExportsOrder,S as default};
