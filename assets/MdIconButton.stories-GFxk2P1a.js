import{r as l}from"./iframe-BZY2mGdK.js";import{_ as r}from"./MdIconButton-Bow7dLsv.js";import"./preload-helper-PPVm8Dsz.js";import"./MdRipple-qtXqqLlf.js";import"./MdIcon-BgVvRcVs.js";import"./_plugin-vue_export-helper-DlAUqK2U.js";const f={title:"Components/Icon Button",component:r,argTypes:{icon:{control:"text"},selectedIcon:{control:"text"},disabled:{control:"boolean"},softDisabled:{control:"boolean"},filled:{control:"boolean"},tonal:{control:"boolean"},outlined:{control:"boolean"},toggle:{control:"boolean"},selected:{control:"boolean"},href:{control:"text"},target:{control:"text"},download:{control:"text"}}},c=s=>({components:{MdIconButton:r},setup(){return{args:s}},template:'<md-icon-button v-bind="args" />'}),e=c.bind({});e.args={icon:"star"};const d=s=>({components:{MdIconButton:r},setup(){const a=l(s.selected??!1);return{args:s,selected:a}},template:'<md-icon-button v-bind="args" v-model:selected="selected" :selected-icon="args.selectedIcon" />'}),o=d.bind({});o.args={icon:"visibility",selectedIcon:"visibility_off",toggle:!0,selected:!1};const t=c.bind({});t.args={icon:"open_in_new",href:"https://google.com",target:"_blank"};const n=c.bind({});n.args={icon:"favorite",softDisabled:!0};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`args => ({
  components: {
    MdIconButton
  },
  setup() {
    return {
      args
    };
  },
  template: '<md-icon-button v-bind="args" />'
})`,...e.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`args => ({
  components: {
    MdIconButton
  },
  setup() {
    const selected = ref(args.selected ?? false);
    return {
      args,
      selected
    };
  },
  template: '<md-icon-button v-bind="args" v-model:selected="selected" :selected-icon="args.selectedIcon" />'
})`,...o.parameters?.docs?.source}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`args => ({
  components: {
    MdIconButton
  },
  setup() {
    return {
      args
    };
  },
  template: '<md-icon-button v-bind="args" />'
})`,...t.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`args => ({
  components: {
    MdIconButton
  },
  setup() {
    return {
      args
    };
  },
  template: '<md-icon-button v-bind="args" />'
})`,...n.parameters?.docs?.source}}};const I=["IconButton","Toggle","Link","SoftDisabled"];export{e as IconButton,t as Link,n as SoftDisabled,o as Toggle,I as __namedExportsOrder,f as default};
