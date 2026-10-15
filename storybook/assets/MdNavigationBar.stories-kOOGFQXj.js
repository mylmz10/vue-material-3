import{e as s,d as u,F as v,f as g,b as i,c as f,r as N}from"./iframe-BkwO8pQ8.js";import{_}from"./MdNavigationTab-C6Z9Y9MH.js";import{M as x}from"./MdElevationOverlay-DZjsR60H.js";import"./preload-helper-PPVm8Dsz.js";import"./MdIcon-CAX4uc9J.js";import"./_plugin-vue_export-helper-DlAUqK2U.js";import"./MdRipple-DzJht9xn.js";const B={class:"md-navigation-bar"},t={__name:"MdNavigationBar",props:{items:{type:Array,default:()=>[]},modelValue:{type:Number}},emits:["update:modelValue"],setup(e,{emit:o}){const l=o,m=(c,d,a)=>{l("update:modelValue",a)};return(c,d)=>(i(),s("div",B,[u(x),(i(!0),s(v,null,g(e.items,(a,r)=>(i(),f(_,{selected:e.modelValue===r,label:a.label,"active-icon":a.activeIcon,onClick:p=>m(p,a,r)},null,8,["selected","label","active-icon","onClick"]))),256))]))}};t.__docgenInfo=Object.assign({displayName:t.name??t.__name},{exportName:"default",displayName:"MdNavigationBar",description:"",tags:{},props:[{name:"items",type:{name:"array"},defaultValue:{func:!1,value:"[]"}},{name:"modelValue",type:{name:"number"}}],events:[{name:"update:modelValue"}],sourceFiles:["/home/runner/work/vue-material-3/vue-material-3/src/components/navigation-bar/MdNavigationBar.vue"]});const E={title:"Components/NavigationBar",component:t,args:{modelValue:0,items:[{label:"Flights",activeIcon:"flight"},{label:"Trips",activeIcon:"luggage"},{label:"Explore",activeIcon:"explore"}]}},b=e=>({components:{MdNavigationBar:t},setup(){const o=N(e.modelValue);return{args:e,activeIndex:o}},template:`<div style="max-width: 420px;">
    <MdNavigationBar v-model="activeIndex" :items="args.items" />
  </div>`}),n=b.bind({});n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`args => ({
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
})`,...n.parameters?.docs?.source}}};const F=["NavigationBar"];export{n as NavigationBar,F as __namedExportsOrder,E as default};
