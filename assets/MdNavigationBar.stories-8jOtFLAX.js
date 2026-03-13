import{e as r,d as v,F as u,f as g,b as o,c as x,r as B}from"./iframe-BZY2mGdK.js";import{_}from"./MdNavigationTab-CmR8URXO.js";import{M as f}from"./MdElevationOverlay-Dhs5M7wx.js";import"./preload-helper-PPVm8Dsz.js";import"./MdIcon-BgVvRcVs.js";import"./_plugin-vue_export-helper-DlAUqK2U.js";import"./MdRipple-qtXqqLlf.js";const N={class:"md-navigation-bar"},s={__name:"MdNavigationBar",props:{items:{type:Array,default:()=>[]},modelValue:{type:Number}},emits:["update:modelValue"],setup(e,{emit:n}){const l=n,c=(m,d,a)=>{l("update:modelValue",a)};return(m,d)=>(o(),r("div",N,[v(f),(o(!0),r(u,null,g(e.items,(a,i)=>(o(),x(_,{selected:e.modelValue===i,label:a.label,"active-icon":a.activeIcon,onClick:p=>c(p,a,i)},null,8,["selected","label","active-icon","onClick"]))),256))]))}},E={title:"Components/NavigationBar",component:s,args:{modelValue:0,items:[{label:"Flights",activeIcon:"flight"},{label:"Trips",activeIcon:"luggage"},{label:"Explore",activeIcon:"explore"}]}},b=e=>({components:{MdNavigationBar:s},setup(){const n=B(e.modelValue);return{args:e,activeIndex:n}},template:`<div style="max-width: 420px;">
    <MdNavigationBar v-model="activeIndex" :items="args.items" />
  </div>`}),t=b.bind({});t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`args => ({
  components: {
    MdNavigationBar
  },
  setup() {
    const activeIndex = ref(args.modelValue);
    return {
      args,
      activeIndex
    };
  },
  template: \`<div style="max-width: 420px;">
    <MdNavigationBar v-model="activeIndex" :items="args.items" />
  </div>\`
})`,...t.parameters?.docs?.source}}};const F=["NavigationBar"];export{t as NavigationBar,F as __namedExportsOrder,E as default};
