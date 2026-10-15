import{w as x,e as S,I as L,n as h,h as y,t as J,l as I,F as ke,f as Me,g as s,r as i,b as V}from"./iframe-BkwO8pQ8.js";import"./preload-helper-PPVm8Dsz.js";const _e={key:0,class:"md-slider__label-container"},Le={class:"md-slider__track-container"},we={key:0,class:"md-slider__tick-container"},Ne=["value","min","max","step","disabled","name","form","required","aria-label"],Te=["value","min","max","step","disabled","name","form","required","aria-label"],k={__name:"MdSlider",props:{ariaLabel:{type:String,default:""},ariaLabelEnd:{type:String,default:""},ariaLabelStart:{type:String,default:""},disabled:{type:Boolean,default:!1},form:{type:String,default:""},labeled:{type:Boolean,default:!1},max:{type:Number,default:100},min:{type:Number,default:0},modelValue:{type:[Number,Object,Array],default:void 0},name:{type:String,default:""},nameEnd:{type:String,default:""},nameStart:{type:String,default:""},range:{type:Boolean,default:!1},required:{type:Boolean,default:!1},step:{type:Number,default:1},ticks:{type:Boolean,default:!1},value:{type:Number,default:void 0},valueEnd:{type:Number,default:void 0},valueLabel:{type:String,default:""},valueLabelEnd:{type:String,default:""},valueLabelStart:{type:String,default:""},valueStart:{type:Number,default:void 0},withTickMarks:{type:Boolean,default:!1}},emits:["update:modelValue","update:valueStart","update:valueEnd","input","change","focus","blur"],setup(u,{expose:p,emit:g}){const n=u,m=g,M=i(null),c=i(null),q=i(null),r=i(0),l=i(0),$=i(!1),B=i(!1),P=i(!1),o=i(""),_=s(()=>Number.isFinite(n.step)&&n.step>0?n.step:1),f=s(()=>{const e=Number.isFinite(n.min)?n.min:0,a=Number.isFinite(n.max)?n.max:100;return e<=a?{min:e,max:a}:{min:a,max:e}}),C=s(()=>f.value.min),A=s(()=>f.value.max),j=s(()=>n.ticks||n.withTickMarks),U=e=>{const a=String(e);if(a.includes("e-"))return Number(a.split("e-")[1]||0);const t=a.split(".")[1];return t?t.length:0},O=s(()=>U(_.value)),W=(e,a)=>{const t=Number(e);return Number.isFinite(t)?t:a},Y=e=>{const{min:a,max:t}=f.value;return Math.min(t,Math.max(a,e))},Z=e=>{const{min:a}=f.value,t=_.value,d=a+Math.round((e-a)/t)*t;return Number(d.toFixed(O.value))},v=(e,a)=>{const t=W(e,a);return Y(Z(t))},ee=()=>{const{min:e}=f.value,a=n.modelValue??n.value??e;r.value=e,l.value=v(a,e)},ae=()=>{const{min:e,max:a}=f.value;let t=v(n.valueStart??e,e),d=v(n.valueEnd??a,a);t>d&&([t,d]=[d,t]),r.value=t,l.value=d};x(()=>[n.range,n.min,n.max,n.step],()=>{if(n.range){ae();return}ee()},{immediate:!0}),x(()=>n.modelValue,e=>{n.range||e===void 0||typeof e=="object"||(l.value=v(e,l.value))}),x(()=>n.value,e=>{n.range||n.modelValue!==void 0||e===void 0||(l.value=v(e,l.value))}),x(()=>[n.valueStart,n.valueEnd],([e,a])=>{if(!n.range)return;let t=e===void 0?r.value:v(e,r.value),d=a===void 0?l.value:v(a,l.value);t>d&&([t,d]=[d,t]),r.value=t,l.value=d});const R=e=>{const{min:a,max:t}=f.value;return t===a?0:(e-a)/(t-a)*100},E=s(()=>n.range?R(r.value):0),b=s(()=>R(l.value)),X=s(()=>n.range?o.value==="start"?!0:o.value==="end"?!1:r.value>=l.value:!1),ne=s(()=>({left:`${Math.min(E.value,b.value)}%`,width:`${Math.max(b.value-E.value,0)}%`})),te=s(()=>({"--slider-start-percent":`${E.value}%`,"--slider-end-percent":`${b.value}%`,"--md-slider-split-percent":`${(E.value+b.value)/2}%`})),D=s(()=>{if(!j.value)return[];const{min:e,max:a}=f.value,t=_.value,d=Math.floor((a-e)/t)+1;return d<2||d>201?[]:Array.from({length:d},(qe,he)=>Number((e+he*t).toFixed(O.value)))}),le=e=>n.range?e>=r.value&&e<=l.value:e<=l.value,ue=s(()=>n.valueLabelStart||r.value),re=s(()=>n.range?n.valueLabelEnd||l.value:n.valueLabel||l.value),se=s(()=>n.range&&n.labeled&&($.value||B.value)),de=s(()=>n.labeled&&($.value||P.value)),ie=s(()=>{if(n.range)return n.nameStart||n.name||void 0}),oe=s(()=>n.range?n.nameEnd||n.nameStart||n.name||void 0:n.name||void 0),ve=e=>({activeThumb:e,valueEnd:l.value,valueStart:r.value}),G=e=>{m("update:modelValue",l.value),m(e,l.value)},z=(e,a)=>{m("update:valueStart",r.value),m("update:valueEnd",l.value),m("update:modelValue",{valueEnd:l.value,valueStart:r.value}),m(e,ve(a))},me=e=>{if(n.disabled)return;o.value="start";const a=v(e.target.value,r.value);r.value=Math.min(a,l.value),e.target.value=String(r.value),z("input","start")},ce=e=>{if(n.disabled)return;o.value="start";const a=v(e.target.value,r.value);r.value=Math.min(a,l.value),e.target.value=String(r.value),z("change","start")},fe=e=>{if(n.disabled)return;o.value="end";const a=v(e.target.value,l.value);if(n.range){l.value=Math.max(a,r.value),e.target.value=String(l.value),z("input","end");return}l.value=a,e.target.value=String(l.value),G("input")},pe=e=>{if(n.disabled)return;o.value="end";const a=v(e.target.value,l.value);if(n.range){l.value=Math.max(a,r.value),e.target.value=String(l.value),z("change","end");return}l.value=a,e.target.value=String(l.value),G("change")},ge=e=>{B.value=!0,o.value="start",m("focus",e)},be=e=>{B.value=!1,P.value||(o.value=""),m("blur",e)},Se=e=>{P.value=!0,o.value="end",m("focus",e)},ye=e=>{P.value=!1,B.value||(o.value=""),m("blur",e)},Ve=e=>{const a=q.value?.getBoundingClientRect();return!a||a.width<=0?b.value:(Math.min(a.right,Math.max(a.left,e.clientX))-a.left)/a.width*100},H=e=>{if(!n.range||n.disabled)return;const a=Ve(e),t=Math.abs(a-E.value),d=Math.abs(a-b.value);o.value=t<=d?"start":"end"},xe=e=>{H(e)},Ee=e=>{e.buttons===0&&H(e)};return p({blur:()=>{M.value?.blur(),c.value?.blur()},checkValidity:()=>{if(!n.range)return c.value?.checkValidity();const e=M.value?.checkValidity()??!0,a=c.value?.checkValidity()??!0;return e&&a},focus:()=>c.value?.focus(),focusEnd:()=>c.value?.focus(),focusStart:()=>M.value?.focus(),reportValidity:()=>{if(!n.range)return c.value?.reportValidity();const e=M.value?.reportValidity()??!0,a=c.value?.reportValidity()??!0;return e&&a}}),(e,a)=>(V(),S("div",{ref_key:"sliderEl",ref:q,class:h(["md-slider",{"md-slider--disabled":u.disabled,"md-slider--labeled":u.labeled,"md-slider--range":u.range}]),style:L(te.value),onMouseenter:a[0]||(a[0]=t=>$.value=!0),onMouseleave:a[1]||(a[1]=t=>$.value=!1),onPointerdown:xe,onPointermove:Ee},[u.labeled?(V(),S("div",_e,[u.range?(V(),S("div",{key:0,class:h(["md-slider__label md-slider__label--start",{"md-slider__label--visible":se.value}]),style:L({left:`${E.value}%`})},[y("span",null,J(ue.value),1)],6)):I("",!0),y("div",{class:h(["md-slider__label md-slider__label--end",{"md-slider__label--visible":de.value}]),style:L({left:`${b.value}%`})},[y("span",null,J(re.value),1)],6)])):I("",!0),y("div",Le,[a[2]||(a[2]=y("div",{class:"md-slider__track md-slider__track--inactive"},null,-1)),y("div",{class:"md-slider__track md-slider__track--active",style:L(ne.value)},null,4),j.value&&D.value.length>0?(V(),S("div",we,[(V(!0),S(ke,null,Me(D.value,t=>(V(),S("div",{key:`tick-${t}`,class:h(["md-slider__tick",{"md-slider__tick--active":le(t)}]),style:L({left:`${R(t)}%`})},null,6))),128))])):I("",!0)]),u.range?(V(),S("input",{key:1,ref_key:"startInputEl",ref:M,class:h(["md-slider__input md-slider__input--start",{"md-slider__input--on-top":X.value}]),type:"range",value:r.value,min:C.value,max:A.value,step:_.value,disabled:u.disabled,name:ie.value,form:u.form||void 0,required:u.required,"aria-label":u.ariaLabelStart||`${u.ariaLabel||"slider"} start`,onInput:me,onChange:ce,onFocus:ge,onBlur:be},null,42,Ne)):I("",!0),y("input",{ref_key:"endInputEl",ref:c,class:h(["md-slider__input md-slider__input--end",{"md-slider__input--on-top":!X.value}]),type:"range",value:l.value,min:C.value,max:A.value,step:_.value,disabled:u.disabled,name:oe.value,form:u.form||void 0,required:u.required,"aria-label":u.ariaLabelEnd||u.ariaLabel||"slider",onInput:fe,onChange:pe,onFocus:Se,onBlur:ye},null,42,Te)],38))}};k.__docgenInfo=Object.assign({displayName:k.name??k.__name},{exportName:"default",displayName:"MdSlider",description:"",tags:{},expose:[{name:"blur"},{name:"checkValidity"},{name:"focus"},{name:"focusEnd"},{name:"focusStart"},{name:"reportValidity"}],props:[{name:"ariaLabel",type:{name:"string"},defaultValue:{func:!1,value:"''"}},{name:"ariaLabelEnd",type:{name:"string"},defaultValue:{func:!1,value:"''"}},{name:"ariaLabelStart",type:{name:"string"},defaultValue:{func:!1,value:"''"}},{name:"disabled",type:{name:"boolean"},defaultValue:{func:!1,value:"false"}},{name:"form",type:{name:"string"},defaultValue:{func:!1,value:"''"}},{name:"labeled",type:{name:"boolean"},defaultValue:{func:!1,value:"false"}},{name:"max",type:{name:"number"},defaultValue:{func:!1,value:"100"}},{name:"min",type:{name:"number"},defaultValue:{func:!1,value:"0"}},{name:"modelValue",type:{name:"number|object|array"},defaultValue:{func:!1,value:"undefined"}},{name:"name",type:{name:"string"},defaultValue:{func:!1,value:"''"}},{name:"nameEnd",type:{name:"string"},defaultValue:{func:!1,value:"''"}},{name:"nameStart",type:{name:"string"},defaultValue:{func:!1,value:"''"}},{name:"range",type:{name:"boolean"},defaultValue:{func:!1,value:"false"}},{name:"required",type:{name:"boolean"},defaultValue:{func:!1,value:"false"}},{name:"step",type:{name:"number"},defaultValue:{func:!1,value:"1"}},{name:"ticks",type:{name:"boolean"},defaultValue:{func:!1,value:"false"}},{name:"value",type:{name:"number"},defaultValue:{func:!1,value:"undefined"}},{name:"valueEnd",type:{name:"number"},defaultValue:{func:!1,value:"undefined"}},{name:"valueLabel",type:{name:"string"},defaultValue:{func:!1,value:"''"}},{name:"valueLabelEnd",type:{name:"string"},defaultValue:{func:!1,value:"''"}},{name:"valueLabelStart",type:{name:"string"},defaultValue:{func:!1,value:"''"}},{name:"valueStart",type:{name:"number"},defaultValue:{func:!1,value:"undefined"}},{name:"withTickMarks",type:{name:"boolean"},defaultValue:{func:!1,value:"false"}}],events:[{name:"update:modelValue"},{name:"update:valueStart"},{name:"update:valueEnd"},{name:"input"},{name:"change"},{name:"focus"},{name:"blur"}],sourceFiles:["/home/runner/work/vue-material-3/vue-material-3/src/components/slider/MdSlider.vue"]});const je={title:"Components/Slider",component:k,argTypes:{disabled:{control:"boolean"},labeled:{control:"boolean"},max:{control:"number"},min:{control:"number"},step:{control:"number"},ticks:{control:"boolean"}}},K=u=>({components:{MdSlider:k},setup(){const p=i(u.modelValue??50);return x(()=>u.modelValue,g=>{g!==void 0&&(p.value=g)}),{args:u,singleValue:p}},template:`
    <div style="max-width: 520px; padding: 20px;">
      <MdSlider v-bind="args" :range="false" v-model="singleValue" />
      <p style="margin-top: 12px; font-family: sans-serif;">Value: {{ singleValue }}</p>
    </div>
  `}),Q=u=>({components:{MdSlider:k},setup(){const p=i(u.valueStart??30),g=i(u.valueEnd??70);return x(()=>u.valueStart,n=>{n!==void 0&&(p.value=n)}),x(()=>u.valueEnd,n=>{n!==void 0&&(g.value=n)}),{args:u,valueEnd:g,valueStart:p}},template:`
    <div style="max-width: 520px; padding: 20px;">
      <MdSlider
        v-bind="args"
        range
        :value-start="valueStart"
        :value-end="valueEnd"
        @update:valueStart="valueStart = $event"
        @update:valueEnd="valueEnd = $event"
      />
      <p style="margin-top: 12px; font-family: sans-serif;">
        Range: {{ valueStart }} - {{ valueEnd }}
      </p>
    </div>
  `}),w=K.bind({});w.args={min:0,max:100,step:1,modelValue:50,ticks:!1,labeled:!1,disabled:!1};const N=K.bind({});N.args={min:0,max:100,step:10,modelValue:40,ticks:!0,labeled:!0,disabled:!1};const T=Q.bind({});T.args={min:0,max:100,step:1,valueStart:25,valueEnd:75,ticks:!1,labeled:!1,disabled:!1};const F=Q.bind({});F.args={min:0,max:100,step:10,valueStart:30,valueEnd:70,ticks:!0,labeled:!0,disabled:!1};w.parameters={...w.parameters,docs:{...w.parameters?.docs,source:{originalSource:`args => ({
  components: {
    MdSlider
  },
  setup() {
    const singleValue = ref(args.modelValue ?? 50);
    watch(() => args.modelValue, nextValue => {
      if (nextValue === undefined) {
        return;
      }
      singleValue.value = nextValue;
    });
    return {
      args,
      singleValue
    };
  },
  template: \`
    <div style="max-width: 520px; padding: 20px;">
      <MdSlider v-bind="args" :range="false" v-model="singleValue" />
      <p style="margin-top: 12px; font-family: sans-serif;">Value: {{ singleValue }}</p>
    </div>
  \`
})`,...w.parameters?.docs?.source}}};N.parameters={...N.parameters,docs:{...N.parameters?.docs,source:{originalSource:`args => ({
  components: {
    MdSlider
  },
  setup() {
    const singleValue = ref(args.modelValue ?? 50);
    watch(() => args.modelValue, nextValue => {
      if (nextValue === undefined) {
        return;
      }
      singleValue.value = nextValue;
    });
    return {
      args,
      singleValue
    };
  },
  template: \`
    <div style="max-width: 520px; padding: 20px;">
      <MdSlider v-bind="args" :range="false" v-model="singleValue" />
      <p style="margin-top: 12px; font-family: sans-serif;">Value: {{ singleValue }}</p>
    </div>
  \`
})`,...N.parameters?.docs?.source}}};T.parameters={...T.parameters,docs:{...T.parameters?.docs,source:{originalSource:`args => ({
  components: {
    MdSlider
  },
  setup() {
    const valueStart = ref(args.valueStart ?? 30);
    const valueEnd = ref(args.valueEnd ?? 70);
    watch(() => args.valueStart, nextValue => {
      if (nextValue === undefined) {
        return;
      }
      valueStart.value = nextValue;
    });
    watch(() => args.valueEnd, nextValue => {
      if (nextValue === undefined) {
        return;
      }
      valueEnd.value = nextValue;
    });
    return {
      args,
      valueEnd,
      valueStart
    };
  },
  template: \`
    <div style="max-width: 520px; padding: 20px;">
      <MdSlider
        v-bind="args"
        range
        :value-start="valueStart"
        :value-end="valueEnd"
        @update:valueStart="valueStart = $event"
        @update:valueEnd="valueEnd = $event"
      />
      <p style="margin-top: 12px; font-family: sans-serif;">
        Range: {{ valueStart }} - {{ valueEnd }}
      </p>
    </div>
  \`
})`,...T.parameters?.docs?.source}}};F.parameters={...F.parameters,docs:{...F.parameters?.docs,source:{originalSource:`args => ({
  components: {
    MdSlider
  },
  setup() {
    const valueStart = ref(args.valueStart ?? 30);
    const valueEnd = ref(args.valueEnd ?? 70);
    watch(() => args.valueStart, nextValue => {
      if (nextValue === undefined) {
        return;
      }
      valueStart.value = nextValue;
    });
    watch(() => args.valueEnd, nextValue => {
      if (nextValue === undefined) {
        return;
      }
      valueEnd.value = nextValue;
    });
    return {
      args,
      valueEnd,
      valueStart
    };
  },
  template: \`
    <div style="max-width: 520px; padding: 20px;">
      <MdSlider
        v-bind="args"
        range
        :value-start="valueStart"
        :value-end="valueEnd"
        @update:valueStart="valueStart = $event"
        @update:valueEnd="valueEnd = $event"
      />
      <p style="margin-top: 12px; font-family: sans-serif;">
        Range: {{ valueStart }} - {{ valueEnd }}
      </p>
    </div>
  \`
})`,...F.parameters?.docs?.source}}};const Oe=["Single","LabeledTicks","Range","RangeLabeledTicks"];export{N as LabeledTicks,T as Range,F as RangeLabeledTicks,w as Single,Oe as __namedExportsOrder,je as default};
