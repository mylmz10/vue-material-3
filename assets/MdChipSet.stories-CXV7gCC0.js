import{l as d}from"./iframe-4Lc6ThV1.js";import{_ as p}from"./MdFilterChip-Cc3w0GPg.js";import"./preload-helper-PPVm8Dsz.js";import"./MdIcon-Cqy-6spS.js";import"./_plugin-vue_export-helper-DlAUqK2U.js";import"./MdRipple-BFgpYy2F.js";const o={name:"MdChipSet",props:{modelValue:{type:[String,Number,Boolean,Object,Array],default:void 0},selectionMode:{type:String,default:"single",validator:e=>["single","multi"].includes(e)}},emits:["update:modelValue","change"],data(){return{activeIndex:0}},computed:{isMulti(){return this.selectionMode==="multi"?!0:this.selectionMode==="single"?!1:Array.isArray(this.modelValue)},normalizedModelArray(){return Array.isArray(this.modelValue)?this.modelValue:this.modelValue===void 0||this.modelValue===null?[]:[this.modelValue]}},mounted(){this.$nextTick(this.syncActiveIndex)},watch:{modelValue(){this.$nextTick(this.syncActiveIndex)},selectionMode(){this.$nextTick(this.syncActiveIndex)}},methods:{getSlotItems(){return(this.$slots.default?this.$slots.default():[]).filter(t=>t&&typeof t.type!="symbol")},getItemValue(e,t){return e?.props?.value!==void 0?e.props.value:t},isItemSelected(e,t){if(this.modelValue===void 0)return!!e?.props?.selected;const i=this.getItemValue(e,t);return this.isMulti?this.normalizedModelArray.includes(i):this.modelValue===i},emitSelection(e){this.$emit("update:modelValue",e),this.$emit("change",e)},applySingleSelection(e){this.emitSelection(e)},applyMultiSelection(e,t){const i=[...this.normalizedModelArray],n=i.findIndex(a=>a===e);t&&n===-1&&i.push(e),!t&&n!==-1&&i.splice(n,1),this.emitSelection(i)},handleChipSelection(e,t,i){if(this.modelValue===void 0)return;const n=this.getItemValue(e,t);if(!this.isMulti){i&&this.applySingleSelection(n);return}this.applyMultiSelection(n,i)},handleChipClick(e,t){t?.defaultPrevented||(this.activeIndex=e)},getChipElements(){return this.$el?Array.from(this.$el.querySelectorAll('[data-md-chip="true"]')):[]},resolveCurrentIndex(e){if(!e.length)return 0;const t=typeof document<"u"?e.findIndex(i=>i===document.activeElement):-1;return t!==-1?t:Math.max(0,Math.min(this.activeIndex,e.length-1))},focusChip(e){const t=this.getChipElements();if(!t.length)return;const i=Math.max(0,Math.min(e,t.length-1));this.activeIndex=i,t[i]?.focus()},syncActiveIndex(){const e=this.getSlotItems();if(!e.length){this.activeIndex=0;return}const t=e.findIndex((i,n)=>this.isItemSelected(i,n));if(t!==-1){this.activeIndex=t;return}this.activeIndex=Math.max(0,Math.min(this.activeIndex,e.length-1))},handleKeydown(e){const t=this.getChipElements();if(!t.length)return;const i=!!e.target?.closest?.('[data-md-chip="true"]'),n=this.resolveCurrentIndex(t);if(e.key==="ArrowRight"||e.key==="ArrowDown"){e.preventDefault(),this.focusChip((n+1)%t.length);return}if(e.key==="ArrowLeft"||e.key==="ArrowUp"){e.preventDefault(),this.focusChip((n-1+t.length)%t.length);return}if(e.key==="Home"){e.preventDefault(),this.focusChip(0);return}if(e.key==="End"){e.preventDefault(),this.focusChip(t.length-1);return}if(e.key==="Enter"||e.key===" "){if(i)return;e.preventDefault(),t[n]?.click()}}},render(){const e=this.getSlotItems();return d("div",{class:"md-chip-set",role:"listbox","aria-multiselectable":this.isMulti?"true":void 0,onKeydown:this.handleKeydown},e.map((t,i)=>{const n=this.isItemSelected(t,i),a=t?.props?.onClick,h=t?.props?.["onUpdate:selected"],c=t?.props?.onFocus;return d(t.type,{...t.props,key:t?.key??i,selected:n,tabIndex:i===this.activeIndex?0:-1,onClick:l=>{a?.(l),this.handleChipClick(i,l)},"onUpdate:selected":l=>{h?.(l),this.handleChipSelection(t,i,!!l)},onFocus:l=>{this.activeIndex=i,c?.(l)}},t.children)}))}},I={title:"Components/ChipSet",component:o,argTypes:{}},u=e=>({components:{MdChipSet:o,MdFilterChip:p},data(){return{selectedChip:1}},setup(){return{args:e}},template:`
    <div>
      <MdChipSet v-model="selectedChip" selection-mode="single">
        <MdFilterChip label="Item 1" :value="0" />
        <MdFilterChip label="Item 2" :value="1" />
        <MdFilterChip label="Item 3" :value="2" />
      </MdChipSet>
      <p style="font-family: sans-serif; margin-top: 12px;">Selected: {{ selectedChip }}</p>
    </div>
  `}),m=e=>({components:{MdChipSet:o,MdFilterChip:p},data(){return{selectedChips:["alpha"]}},setup(){return{args:e}},template:`
    <div>
      <MdChipSet v-model="selectedChips" selection-mode="multi">
        <MdFilterChip label="Alpha" value="alpha" />
        <MdFilterChip label="Beta" value="beta" />
        <MdFilterChip label="Gamma" value="gamma" />
      </MdChipSet>
      <p style="font-family: sans-serif; margin-top: 12px;">Selected: {{ selectedChips }}</p>
    </div>
  `}),s=u.bind({});s.args={};const r=m.bind({});r.args={};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`args => ({
  components: {
    MdChipSet,
    MdFilterChip
  },
  data() {
    return {
      selectedChip: 1
    };
  },
  setup() {
    return {
      args
    };
  },
  template: \`
    <div>
      <MdChipSet v-model="selectedChip" selection-mode="single">
        <MdFilterChip label="Item 1" :value="0" />
        <MdFilterChip label="Item 2" :value="1" />
        <MdFilterChip label="Item 3" :value="2" />
      </MdChipSet>
      <p style="font-family: sans-serif; margin-top: 12px;">Selected: {{ selectedChip }}</p>
    </div>
  \`
})`,...s.parameters?.docs?.source}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`args => ({
  components: {
    MdChipSet,
    MdFilterChip
  },
  data() {
    return {
      selectedChips: ['alpha']
    };
  },
  setup() {
    return {
      args
    };
  },
  template: \`
    <div>
      <MdChipSet v-model="selectedChips" selection-mode="multi">
        <MdFilterChip label="Alpha" value="alpha" />
        <MdFilterChip label="Beta" value="beta" />
        <MdFilterChip label="Gamma" value="gamma" />
      </MdChipSet>
      <p style="font-family: sans-serif; margin-top: 12px;">Selected: {{ selectedChips }}</p>
    </div>
  \`
})`,...r.parameters?.docs?.source}}};const v=["SingleSelection","MultiSelection"];export{r as MultiSelection,s as SingleSelection,v as __namedExportsOrder,I as default};
