import{s as a}from"./iframe-BkwO8pQ8.js";import{_ as c}from"./MdFilterChip-D3ASSX35.js";import"./preload-helper-PPVm8Dsz.js";import"./MdChip-BIEwVqax.js";import"./MdIcon-CAX4uc9J.js";import"./_plugin-vue_export-helper-DlAUqK2U.js";import"./MdRipple-DzJht9xn.js";const l={name:"MdChipSet",props:{modelValue:{type:[String,Number,Boolean,Object,Array],default:void 0},selectionMode:{type:String,default:"single",validator:e=>["single","multi"].includes(e)}},emits:["update:modelValue","change"],data(){return{activeIndex:0}},computed:{isMulti(){return this.selectionMode==="multi"?!0:this.selectionMode==="single"?!1:Array.isArray(this.modelValue)},normalizedModelArray(){return Array.isArray(this.modelValue)?this.modelValue:this.modelValue===void 0||this.modelValue===null?[]:[this.modelValue]}},mounted(){this.$nextTick(this.syncActiveIndex)},watch:{modelValue(){this.$nextTick(this.syncActiveIndex)},selectionMode(){this.$nextTick(this.syncActiveIndex)}},methods:{getSlotItems(){return(this.$slots.default?this.$slots.default():[]).filter(t=>t&&typeof t.type!="symbol")},getItemValue(e,t){return e?.props?.value!==void 0?e.props.value:t},isItemSelected(e,t){if(this.modelValue===void 0)return!!e?.props?.selected;const i=this.getItemValue(e,t);return this.isMulti?this.normalizedModelArray.includes(i):this.modelValue===i},emitSelection(e){this.$emit("update:modelValue",e),this.$emit("change",e)},applySingleSelection(e){this.emitSelection(e)},applyMultiSelection(e,t){const i=[...this.normalizedModelArray],n=i.findIndex(o=>o===e);t&&n===-1&&i.push(e),!t&&n!==-1&&i.splice(n,1),this.emitSelection(i)},handleChipSelection(e,t,i){if(this.modelValue===void 0)return;const n=this.getItemValue(e,t);if(!this.isMulti){i&&this.applySingleSelection(n);return}this.applyMultiSelection(n,i)},handleChipClick(e,t){t?.defaultPrevented||(this.activeIndex=e)},getChipElements(){return this.$el?Array.from(this.$el.querySelectorAll('[data-md-chip="true"]')):[]},resolveCurrentIndex(e){if(!e.length)return 0;const t=typeof document<"u"?e.findIndex(i=>i===document.activeElement):-1;return t!==-1?t:Math.max(0,Math.min(this.activeIndex,e.length-1))},focusChip(e){const t=this.getChipElements();if(!t.length)return;const i=Math.max(0,Math.min(e,t.length-1));this.activeIndex=i,t[i]?.focus()},syncActiveIndex(){const e=this.getSlotItems();if(!e.length){this.activeIndex=0;return}const t=e.findIndex((i,n)=>this.isItemSelected(i,n));if(t!==-1){this.activeIndex=t;return}this.activeIndex=Math.max(0,Math.min(this.activeIndex,e.length-1))},handleKeydown(e){const t=this.getChipElements();if(!t.length)return;const i=!!e.target?.closest?.('[data-md-chip="true"]'),n=this.resolveCurrentIndex(t);if(e.key==="ArrowRight"||e.key==="ArrowDown"){e.preventDefault(),this.focusChip((n+1)%t.length);return}if(e.key==="ArrowLeft"||e.key==="ArrowUp"){e.preventDefault(),this.focusChip((n-1+t.length)%t.length);return}if(e.key==="Home"){e.preventDefault(),this.focusChip(0);return}if(e.key==="End"){e.preventDefault(),this.focusChip(t.length-1);return}if(e.key==="Enter"||e.key===" "){if(i)return;e.preventDefault(),t[n]?.click()}}},render(){const e=this.getSlotItems();return a("div",{class:"md-chip-set",role:"listbox","aria-multiselectable":this.isMulti?"true":void 0,onKeydown:this.handleKeydown},e.map((t,i)=>{const n=this.isItemSelected(t,i),o=t?.props?.onClick,d=t?.props?.["onUpdate:selected"],u=t?.props?.onFocus;return a(t.type,{...t.props,key:t?.key??i,selected:n,tabIndex:i===this.activeIndex?0:-1,onClick:s=>{o?.(s),this.handleChipClick(i,s)},"onUpdate:selected":s=>{d?.(s),this.handleChipSelection(t,i,!!s)},onFocus:s=>{this.activeIndex=i,u?.(s)}},t.children)}))}};l.__docgenInfo=Object.assign({displayName:l.name??l.__name},{displayName:"MdChipSet",exportName:"default",description:"",tags:{},props:[{name:"modelValue",type:{name:"string|number|boolean|object|array"},defaultValue:{func:!1,value:"undefined"}},{name:"selectionMode",type:{name:"string"},defaultValue:{func:!1,value:"'single'"},values:["single","multi"]}],events:[{name:"update:modelValue",type:{names:["undefined"]}},{name:"change",type:{names:["undefined"]}}],sourceFiles:["/home/runner/work/vue-material-3/vue-material-3/src/components/chips/MdChipSet.vue"]});const I={title:"Components/Chips",component:l,args:{selectionMode:"single"}},h=e=>({components:{MdChipSet:l,MdFilterChip:c},data(){return{selectedChip:1,selectedChips:[1]}},setup(){return{args:e}},template:`
    <div>
      <MdChipSet
        v-model="args.selectionMode === 'single' ? selectedChip : selectedChips"
        :selection-mode="args.selectionMode"
      >
        <MdFilterChip label="Item 1" :value="1" />
        <MdFilterChip label="Item 2" :value="2" />
        <MdFilterChip label="Item 3" :value="3" />
      </MdChipSet>
      <p style="font-family: sans-serif; margin-top: 12px;">
        Selected:
        {{ args.selectionMode === 'single' ? selectedChip : selectedChips.join(', ') }}
      </p>
    </div>
  `}),r=h.bind({});r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`args => ({
  components: {
    MdChipSet,
    MdFilterChip
  },
  data() {
    return {
      selectedChip: 1,
      selectedChips: [1]
    };
  },
  setup() {
    return {
      args
    };
  },
  template: \`
    <div>
      <MdChipSet
        v-model="args.selectionMode === 'single' ? selectedChip : selectedChips"
        :selection-mode="args.selectionMode"
      >
        <MdFilterChip label="Item 1" :value="1" />
        <MdFilterChip label="Item 2" :value="2" />
        <MdFilterChip label="Item 3" :value="3" />
      </MdChipSet>
      <p style="font-family: sans-serif; margin-top: 12px;">
        Selected:
        {{ args.selectionMode === 'single' ? selectedChip : selectedChips.join(', ') }}
      </p>
    </div>
  \`
})`,...r.parameters?.docs?.source}}};const S=["ChipSet"];export{r as ChipSet,S as __namedExportsOrder,I as default};
