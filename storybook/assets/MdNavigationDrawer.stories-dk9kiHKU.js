import{r as m,w as p,c as g,a as v,m as u,D as w,e as l,g as M,v as f,p as h,q as D}from"./iframe-Bo7-BOp5.js";import{M as N}from"./MdDialog-CSi7GlCP.js";import{_ as b}from"./MdFilledButton-BZ6CpELC.js";import{M as x}from"./MdList-CXwprW_B.js";import{_ as y}from"./MdListItem-YNiqYbuk.js";import"./preload-helper-PPVm8Dsz.js";import"./MdElevationOverlay-CBKC7xja.js";import"./_plugin-vue_export-helper-DlAUqK2U.js";import"./buttonSharedProps-CMd8JqkZ.js";import"./MdRipple-DHfXgmxP.js";import"./MdIcon-DuMzCwGM.js";const L={class:"md-navigation-drawer__slot-content"},o=Object.assign({inheritAttrs:!1},{__name:"MdNavigationDrawer",props:{opened:{type:Boolean},modal:{type:Boolean}},emits:["change"],setup(e,{emit:n}){const i=n,r=e,t=m(r.opened),s=()=>{t.value&&(t.value=!1,i("change",!1))},c=a=>{a||s()};return p(()=>r.opened,a=>{t.value=a}),(a,_)=>(l(),g(w(e.modal?N:"div"),u({class:["md-navigation-drawer",{"md-navigation-drawer--opened":t.value,"md-navigation-drawer--modal":e.modal}]},a.$attrs,{"model-value":e.modal?t.value:void 0,"keep-mounted":e.modal||void 0,"aria-label":e.modal?a.$attrs["aria-label"]||"Navigation":a.$attrs["aria-label"],"container-class":e.modal?"md-navigation-drawer__modal-container":void 0,"content-class":e.modal?"md-navigation-drawer__modal-content":void 0,"header-class":e.modal?"md-navigation-drawer__empty":void 0,"footer-class":e.modal?"md-navigation-drawer__empty":void 0,"onUpdate:modelValue":c}),{default:v(()=>[e.modal?(l(),M("div",{key:0,class:"md-navigation-drawer__overlay",onClick:s})):f("",!0),h("div",L,[D(a.$slots,"default")])]),_:3},16,["class","model-value","keep-mounted","aria-label","container-class","content-class","header-class","footer-class"]))}});o.__docgenInfo=Object.assign({displayName:o.name??o.__name},{exportName:"default",displayName:"MdNavigationDrawer",description:"",tags:{},props:[{name:"opened",type:{name:"boolean"}},{name:"modal",type:{name:"boolean"}}],events:[{name:"change"}],slots:[{name:"default"}],sourceFiles:["/home/runner/work/vue-material-3/vue-material-3/src/components/navigation-drawer/MdNavigationDrawer.vue"]});const q={title:"Components/NavigationDrawer",component:o,args:{opened:!0,modal:!1}},I=e=>({components:{MdNavigationDrawer:o,MdFilledButton:b,MdList:x,MdListItem:y},setup(){const n=m(e.opened);return{args:e,opened:n,toggle:()=>{n.value=!n.value}}},template:`<div style="position: relative; min-height: 320px; padding: 16px;">
    <MdFilledButton :label="opened ? 'Close Drawer' : 'Open Drawer'" @click="toggle" />
    <div style="margin-top: 12px; max-width: 360px;">
      <MdNavigationDrawer :opened="opened" :modal="args.modal" @change="opened = $event">
        <MdList>
          <MdListItem headline="Inbox" icon="inbox" :selected="true" />
          <MdListItem headline="Starred" icon="star" />
          <MdListItem headline="Sent" icon="send" />
        </MdList>
      </MdNavigationDrawer>
    </div>
  </div>`}),d=I.bind({});d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`args => ({
  components: {
    MdNavigationDrawer,
    MdFilledButton,
    MdList,
    MdListItem
  },
  setup() {
    const opened = ref(args.opened);
    const toggle = () => {
      opened.value = !opened.value;
    };
    return {
      args,
      opened,
      toggle
    };
  },
  template: \`<div style="position: relative; min-height: 320px; padding: 16px;">
    <MdFilledButton :label="opened ? 'Close Drawer' : 'Open Drawer'" @click="toggle" />
    <div style="margin-top: 12px; max-width: 360px;">
      <MdNavigationDrawer :opened="opened" :modal="args.modal" @change="opened = $event">
        <MdList>
          <MdListItem headline="Inbox" icon="inbox" :selected="true" />
          <MdListItem headline="Starred" icon="star" />
          <MdListItem headline="Sent" icon="send" />
        </MdList>
      </MdNavigationDrawer>
    </div>
  </div>\`
})`,...d.parameters?.docs?.source}}};const A=["NavigationDrawer"];export{d as NavigationDrawer,A as __namedExportsOrder,q as default};
