import{p as c,w as g,e as d,l as v,h as u,j as M,n as w,r as s,b as r}from"./iframe-BZY2mGdK.js";import{_ as h}from"./MdFilledButton-BkjlfHw4.js";import{M as _}from"./MdList-DAh2WUEY.js";import{_ as x}from"./MdListItem-CMefjZUf.js";import"./preload-helper-PPVm8Dsz.js";import"./buttonSharedProps-CQjuewrW.js";import"./MdRipple-qtXqqLlf.js";import"./MdIcon-BgVvRcVs.js";import"./_plugin-vue_export-helper-DlAUqK2U.js";const D={class:"md-navigation-drawer__slot-content"},l={__name:"MdNavigationDrawer",props:{opened:{type:Boolean},modal:{type:Boolean}},emits:["change"],setup(e,{emit:t}){const n=s(!1),p=t,o=e,m=()=>{n.value=!1,p("change",n.value)};return c(()=>{console.log(o.opened),n.value=o.opened}),g(()=>o.opened,i=>{n.value=i},{immediate:!0}),(i,L)=>(r(),d("div",{class:w(["md-navigation-drawer",{"md-navigation-drawer--opened":n.value,"md-navigation-drawer--modal":e.modal}])},[e.modal?(r(),d("div",{key:0,class:"md-navigation-drawer__overlay",onClick:m})):v("",!0),u("div",D,[M(i.$slots,"default")])],2))}},F={title:"Components/NavigationDrawer",component:l,args:{opened:!0,modal:!1}},f=e=>({components:{MdNavigationDrawer:l,MdFilledButton:h,MdList:_,MdListItem:x},setup(){const t=s(e.opened);return{args:e,opened:t,toggle:()=>{t.value=!t.value}}},template:`<div style="position: relative; min-height: 320px; padding: 16px;">
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
  </div>`}),a=f.bind({});a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`args => ({
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
})`,...a.parameters?.docs?.source}}};const O=["NavigationDrawer"];export{a as NavigationDrawer,O as __namedExportsOrder,F as default};
