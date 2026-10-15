import{c as r,a as s,b as m,j as i,r as f}from"./iframe-BkwO8pQ8.js";import{_ as v}from"./MdChip-BIEwVqax.js";import"./preload-helper-PPVm8Dsz.js";import"./MdIcon-CAX4uc9J.js";import"./_plugin-vue_export-helper-DlAUqK2U.js";import"./MdRipple-DzJht9xn.js";const t={__name:"MdInputChip",props:{alwaysFocusable:{type:Boolean,default:!1},avatar:{type:String,default:""},disabled:{type:Boolean,default:!1},download:{type:String,default:""},href:{type:String,default:""},label:{type:String,default:""},leadingIcon:{type:String,default:""},removable:{type:Boolean,default:!1},removeAriaLabel:{type:String,default:"Remove"},selected:{type:Boolean,default:!1},softDisabled:{type:Boolean,default:!1},tabIndex:{type:[Number,String],default:void 0},target:{type:String,default:""},trailingIcon:{type:String,default:""},value:{type:[String,Number,Boolean,Object],default:void 0}},emits:["update:selected","input","change","click","remove","focus","blur"],setup(e,{emit:o}){const l=o;return(u,a)=>(m(),r(v,{variant:"input","always-focusable":e.alwaysFocusable,avatar:e.avatar,disabled:e.disabled,download:e.download,href:e.href,label:e.label,"leading-icon":e.leadingIcon,removable:e.removable,"remove-aria-label":e.removeAriaLabel,selected:e.selected,"soft-disabled":e.softDisabled,"tab-index":e.tabIndex,target:e.target,"trailing-icon":e.trailingIcon,value:e.value,"onUpdate:selected":a[0]||(a[0]=n=>l("update:selected",n)),onInput:a[1]||(a[1]=n=>l("input",n)),onChange:a[2]||(a[2]=n=>l("change",n)),onClick:a[3]||(a[3]=n=>l("click",n)),onRemove:a[4]||(a[4]=n=>l("remove",n)),onFocus:a[5]||(a[5]=n=>l("focus",n)),onBlur:a[6]||(a[6]=n=>l("blur",n))},{avatar:s(()=>[i(u.$slots,"avatar")]),"leading-icon":s(()=>[i(u.$slots,"leading-icon")]),"trailing-icon":s(()=>[i(u.$slots,"trailing-icon")]),default:s(()=>[i(u.$slots,"default")]),_:3},8,["always-focusable","avatar","disabled","download","href","label","leading-icon","removable","remove-aria-label","selected","soft-disabled","tab-index","target","trailing-icon","value"]))}};t.__docgenInfo=Object.assign({displayName:t.name??t.__name},{exportName:"default",displayName:"MdInputChip",description:"",tags:{},props:[{name:"alwaysFocusable",type:{name:"boolean"},defaultValue:{func:!1,value:"false"}},{name:"avatar",type:{name:"string"},defaultValue:{func:!1,value:"''"}},{name:"disabled",type:{name:"boolean"},defaultValue:{func:!1,value:"false"}},{name:"download",type:{name:"string"},defaultValue:{func:!1,value:"''"}},{name:"href",type:{name:"string"},defaultValue:{func:!1,value:"''"}},{name:"label",type:{name:"string"},defaultValue:{func:!1,value:"''"}},{name:"leadingIcon",type:{name:"string"},defaultValue:{func:!1,value:"''"}},{name:"removable",type:{name:"boolean"},defaultValue:{func:!1,value:"false"}},{name:"removeAriaLabel",type:{name:"string"},defaultValue:{func:!1,value:"'Remove'"}},{name:"selected",type:{name:"boolean"},defaultValue:{func:!1,value:"false"}},{name:"softDisabled",type:{name:"boolean"},defaultValue:{func:!1,value:"false"}},{name:"tabIndex",type:{name:"number|string"},defaultValue:{func:!1,value:"undefined"}},{name:"target",type:{name:"string"},defaultValue:{func:!1,value:"''"}},{name:"trailingIcon",type:{name:"string"},defaultValue:{func:!1,value:"''"}},{name:"value",type:{name:"string|number|boolean|object"},defaultValue:{func:!1,value:"undefined"}}],events:[{name:"update:selected"},{name:"input"},{name:"change"},{name:"click"},{name:"remove"},{name:"focus"},{name:"blur"}],slots:[{name:"default"},{name:"avatar"},{name:"leading-icon"},{name:"trailing-icon"}],sourceFiles:["/home/runner/work/vue-material-3/vue-material-3/src/components/chips/MdInputChip.vue"]});const V={title:"Components/Chips",component:t,args:{label:"Input chip",removable:!0,selected:!1,disabled:!1}},p=e=>({components:{MdInputChip:t},setup(){const o=f(!1);return{args:e,removed:o,onRemove:()=>{o.value=!0}}},template:`<div>
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
})`,...d.parameters?.docs?.source}}};const h=["InputChip"];export{d as InputChip,h as __namedExportsOrder,V as default};
