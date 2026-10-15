import{p as c,w as g,e as r,l as v,h as u,j as M,n as w,r as l,b as s}from"./iframe-BkwO8pQ8.js";import{_ as h}from"./MdFilledButton-V4ssLdhD.js";import{M as _}from"./MdList-97n-f0b_.js";import{_ as N}from"./MdListItem-DRpRPN8Q.js";import"./preload-helper-PPVm8Dsz.js";import"./buttonSharedProps-BmV0GGB_.js";import"./MdRipple-DzJht9xn.js";import"./MdIcon-CAX4uc9J.js";import"./_plugin-vue_export-helper-DlAUqK2U.js";const f={class:"md-navigation-drawer__slot-content"},t={__name:"MdNavigationDrawer",props:{opened:{type:Boolean},modal:{type:Boolean}},emits:["change"],setup(e,{emit:n}){const a=l(!1),m=n,d=e,p=()=>{a.value=!1,m("change",a.value)};return c(()=>{a.value=d.opened}),g(()=>d.opened,i=>{a.value=i},{immediate:!0}),(i,D)=>(s(),r("div",{class:w(["md-navigation-drawer",{"md-navigation-drawer--opened":a.value,"md-navigation-drawer--modal":e.modal}])},[e.modal?(s(),r("div",{key:0,class:"md-navigation-drawer__overlay",onClick:p})):v("",!0),u("div",f,[M(i.$slots,"default")])],2))}};t.__docgenInfo=Object.assign({displayName:t.name??t.__name},{exportName:"default",displayName:"MdNavigationDrawer",description:"",tags:{},props:[{name:"opened",type:{name:"boolean"}},{name:"modal",type:{name:"boolean"}}],events:[{name:"change"}],slots:[{name:"default"}],sourceFiles:["/home/runner/work/vue-material-3/vue-material-3/src/components/navigation-drawer/MdNavigationDrawer.vue"]});const $={title:"Components/NavigationDrawer",component:t,args:{opened:!0,modal:!1}},x=e=>({components:{MdNavigationDrawer:t,MdFilledButton:h,MdList:_,MdListItem:N},setup(){const n=l(e.opened);return{args:e,opened:n,toggle:()=>{n.value=!n.value}}},template:`<div style="position: relative; min-height: 320px; padding: 16px;">
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
  </div>`}),o=x.bind({});o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`args => ({
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
})`,...o.parameters?.docs?.source}}};const O=["NavigationDrawer"];export{o as NavigationDrawer,O as __namedExportsOrder,$ as default};
