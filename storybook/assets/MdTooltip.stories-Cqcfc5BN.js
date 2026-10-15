import{v as Ce,p as ze,w as Fe,q as Ie,e as h,h as de,j as H,c as Oe,m as $e,I as He,n as pe,t as G,F as Ge,l as N,O as Ne,g as T,r as v,b as p,k as ce,z as ee}from"./iframe-BkwO8pQ8.js";import"./preload-helper-PPVm8Dsz.js";const De=["aria-describedby"],je=["id"],We={key:0,class:"md-tooltip__plain-text"},Ke={key:0,class:"md-tooltip__headline"},Ye={key:1,class:"md-tooltip__supporting-text"},qe={key:2,class:"md-tooltip__action-row"},Ue=1500,Je=500,s=8,l=4,k={__name:"MdTooltip",props:{actionLabel:{type:String,default:""},boundary:{type:String,default:"visual"},disabled:{type:Boolean,default:!1},headline:{type:String,default:""},id:{type:String,default:""},inAppBar:{type:Boolean,default:!1},interactive:{type:[Boolean,null],default:null},modelValue:{type:Boolean,default:void 0},placement:{type:String,default:""},persistent:{type:Boolean,default:!1},supportingText:{type:String,default:""},text:{type:String,default:""},variant:{type:String,default:"plain"}},emits:["action","close","open","update:modelValue"],setup(o,{emit:U}){let fe=0;const me=Ce(),a=o,L=U,_=v(null),V=v(null),i=v(!1),E=v({}),c=v(!1),f=v(!1),A=v(!1),S=`md-tooltip-${++fe}`,te=T(()=>a.id||`${S}-surface`);let B=null,C=null,J=!1,z=!1;const m=T(()=>a.variant==="rich"),g=T(()=>m.value&&a.persistent),P=T(()=>a.interactive==null?m.value:a.interactive),he=T(()=>m.value&&(!!a.actionLabel||!!me.action)),Q=T(()=>a.inAppBar?4:a.boundary==="text"?8:4),X=()=>{if(typeof window>"u")return new Map;const e="__mdTooltipRegistry";return window[e]||(window[e]=new Map),window[e]},r=()=>{B&&(window.clearTimeout(B),B=null)},b=()=>{C&&(window.clearTimeout(C),C=null)},ve=()=>{X().forEach((t,n)=>{n!==S&&t?.("handoff")})};function Z(){z&&(window.removeEventListener("resize",O),window.removeEventListener("scroll",O,!0),document.removeEventListener("mousedown",re),document.removeEventListener("keydown",se),z=!1)}const y=(e="programmatic")=>{if(!i.value){r(),b();return}r(),b(),c.value=!1,f.value=!1,i.value=!1,E.value={},Z(),L("update:modelValue",!1),L("close",{source:e})},ne=(e,t,n)=>Math.min(Math.max(e,t),n),oe=(e,t,n="center")=>n==="start"?e.left:n==="end"?e.right-t.width:e.left+(e.width-t.width)/2,ae=(e,t,n="center")=>n==="start"?e.top:n==="end"?e.bottom-t.height:e.top+(e.height-t.height)/2,ge=e=>{const t=(e||"").trim().toLowerCase().replace(/\s+/g,"-");return t?{"top-left":"top-start","top-right":"top-end","bottom-left":"bottom-start","bottom-right":"bottom-end","left-top":"left-start","left-bottom":"left-end","right-top":"right-start","right-bottom":"right-end"}[t]||t:""},ie=(e,t,n,u)=>{const w=ge(u);if(!w)return null;const[x,d="center"]=w.split("-");switch(x){case"top":return{left:oe(e,t,d),top:e.top-t.height-n};case"bottom":return{left:oe(e,t,d),top:e.bottom+n};case"left":return{left:e.left-t.width-n,top:ae(e,t,d)};case"right":return{left:e.right+n,top:ae(e,t,d)};default:return null}},F=(e,t)=>{const n=Math.max(s,window.innerWidth-t.width-s),u=Math.max(s,window.innerHeight-t.height-s);return{left:ne(e.left,s,n),top:ne(e.top,s,u)}},le=(e,t)=>e.left>=s&&e.top>=s&&e.left+t.width<=window.innerWidth-s&&e.top+t.height<=window.innerHeight-s,be=(e,t)=>{const n=ie(e,t,Q.value,a.placement);if(n)return F(n,t);const u=e.left+(e.width-t.width)/2,w={left:u,top:e.top-t.height-Q.value},x={left:u,top:e.bottom+Q.value},d=a.inAppBar?[x,w]:[w,x],Se=d.find(Be=>le(Be,t))||d[0];return F(Se,t)},ye=(e,t)=>{const n=ie(e,t,l,a.placement);if(n)return F(n,t);const u={left:e.left+(e.width-t.width)/2,top:e.bottom+l},x=[{left:e.right+l,top:e.bottom+l},{left:e.left-t.width-l,top:e.bottom+l},{left:e.right+l,top:e.top-t.height-l},{left:e.left-t.width-l,top:e.top-t.height-l},u,{left:e.left+(e.width-t.width)/2,top:e.top-t.height-l}].find(d=>le(d,t))||u;return F(x,t)},I=()=>{if(!_.value||!V.value)return;const e=_.value.getBoundingClientRect(),t=V.value.getBoundingClientRect(),n=m.value?ye(e,t):be(e,t);E.value={left:`${n.left}px`,top:`${n.top}px`}},O=()=>{i.value&&I()},re=e=>{if(!i.value)return;const t=e.target;_.value?.contains(t)||V.value?.contains(t)||y("outside-click")},se=e=>{e.key!=="Escape"||!i.value||y("escape")};function ue(){z||(window.addEventListener("resize",O),window.addEventListener("scroll",O,!0),document.addEventListener("mousedown",re),document.addEventListener("keydown",se),z=!0)}const $=async(e="programmatic")=>{a.disabled||(r(),ve(),i.value||(i.value=!0,ue(),L("update:modelValue",!0),L("open",{source:e})),await ee(),I())},M=(e="leave")=>{g.value||(r(),B=window.setTimeout(()=>{c.value||f.value||y(e)},Ue))},we=()=>{c.value=!0,r(),g.value||$("hover")},xe=()=>{c.value=!1,M("trigger-leave")},Te=()=>{c.value=!0,r(),g.value||$("focus")},ke=()=>{c.value=!1,M("trigger-blur")},Le=()=>{P.value&&(f.value=!0,r())},Pe=()=>{P.value&&(f.value=!1,M("tooltip-leave"))},Me=()=>{P.value&&(f.value=!0,r())},_e=()=>{P.value&&(f.value=!1,M("tooltip-blur"))},Ve=e=>{a.disabled||g.value||e.pointerType==="mouse"||(b(),J=!1,C=window.setTimeout(()=>{J=!0,A.value=!0,$("long-press")},Je))},R=()=>{b(),J&&(M("long-press-release"),window.setTimeout(()=>{A.value=!1},0))},Ee=e=>{if(A.value){e.preventDefault(),e.stopPropagation(),A.value=!1;return}if(g.value){if(i.value){y("trigger-click");return}$("trigger-click")}},Ae=()=>{L("action"),g.value&&y("action")};return ze(()=>{X().set(S,y)}),Fe(()=>a.modelValue,async e=>{if(e!==void 0){if(e===i.value){e&&(await ee(),I());return}if(r(),b(),c.value=!1,f.value=!1,i.value=!!e,e){ue(),await ee(),I();return}E.value={},Z()}},{immediate:!0}),Ie(()=>{r(),b(),Z(),X().delete(S)}),(e,t)=>(p(),h("span",{class:pe(["md-tooltip",`md-tooltip--${o.variant}`])},[de("span",{ref_key:"triggerEl",ref:_,class:"md-tooltip__trigger","aria-describedby":te.value,onMouseenter:we,onMouseleave:xe,onFocusin:Te,onFocusout:ke,onPointerdown:Ve,onPointerup:R,onPointercancel:R,onPointerleave:R,onClick:Ee},[H(e.$slots,"default")],40,De),(p(),Oe(Ne,{to:"body"},[i.value?(p(),h("div",{key:0,id:te.value,ref_key:"tooltipEl",ref:V,class:pe(["md-tooltip__surface",{"md-tooltip__surface--plain":!m.value,"md-tooltip__surface--rich":m.value,"md-tooltip__surface--interactive":P.value}]),style:He(E.value),role:"tooltip",onMouseenter:Le,onMouseleave:Pe,onFocusin:Me,onFocusout:_e,onClick:t[0]||(t[0]=$e(()=>{},["stop"]))},[m.value?(p(),h(Ge,{key:1},[o.headline||e.$slots.headline?(p(),h("div",Ke,[H(e.$slots,"headline",{},()=>[ce(G(o.headline),1)])])):N("",!0),o.supportingText||e.$slots["supporting-text"]?(p(),h("div",Ye,[H(e.$slots,"supporting-text",{},()=>[ce(G(o.supportingText),1)])])):N("",!0),he.value?(p(),h("div",qe,[H(e.$slots,"action",{},()=>[de("button",{type:"button",class:"md-tooltip__action",onClick:Ae},G(o.actionLabel),1)])])):N("",!0)],64)):(p(),h("span",We,G(o.text),1))],46,je)):N("",!0)]))],2))}};k.__docgenInfo=Object.assign({displayName:k.name??k.__name},{exportName:"default",displayName:"MdTooltip",description:"",tags:{},props:[{name:"actionLabel",type:{name:"string"},defaultValue:{func:!1,value:"''"}},{name:"boundary",type:{name:"string"},defaultValue:{func:!1,value:"'visual'"}},{name:"disabled",type:{name:"boolean"},defaultValue:{func:!1,value:"false"}},{name:"headline",type:{name:"string"},defaultValue:{func:!1,value:"''"}},{name:"id",type:{name:"string"},defaultValue:{func:!1,value:"''"}},{name:"inAppBar",type:{name:"boolean"},defaultValue:{func:!1,value:"false"}},{name:"interactive",type:{name:"boolean|null"},defaultValue:{func:!1,value:"null"}},{name:"modelValue",type:{name:"boolean"},defaultValue:{func:!1,value:"undefined"}},{name:"placement",type:{name:"string"},defaultValue:{func:!1,value:"''"}},{name:"persistent",type:{name:"boolean"},defaultValue:{func:!1,value:"false"}},{name:"supportingText",type:{name:"string"},defaultValue:{func:!1,value:"''"}},{name:"text",type:{name:"string"},defaultValue:{func:!1,value:"''"}},{name:"variant",type:{name:"string"},defaultValue:{func:!1,value:"'plain'"}}],events:[{name:"action"},{name:"close"},{name:"open"},{name:"update:modelValue"}],slots:[{name:"default"},{name:"headline"},{name:"supporting-text"},{name:"action"}],sourceFiles:["/home/runner/work/vue-material-3/vue-material-3/src/components/tooltip/MdTooltip.vue"]});const Qe=["","top","top-start","top-end","bottom","bottom-start","bottom-end","left","left-start","left-end","right","right-start","right-end"],q=(o,U)=>({components:{MdTooltip:k},setup(){return{args:o}},template:`
    <div style="padding: 96px; min-height: 360px; background: #f7f2fa; display: flex; align-items: center; justify-content: center;">
      <MdTooltip v-bind="args">
        ${U}
      </MdTooltip>
    </div>
  `}),Re={title:"Components/Tooltip",component:k,argTypes:{actionLabel:{control:"text"},boundary:{control:"select",options:["visual","text"]},disabled:{control:"boolean"},headline:{control:"text"},inAppBar:{control:"boolean"},interactive:{control:"boolean"},modelValue:{control:"boolean"},persistent:{control:"boolean"},placement:{control:"select",options:Qe},supportingText:{control:"text"},text:{control:"text"},variant:{control:"select",options:["plain","rich"]}}},D={args:{actionLabel:"Learn more",boundary:"visual",disabled:!1,headline:"Rich tooltip",inAppBar:!1,interactive:!0,modelValue:void 0,persistent:!1,placement:"",supportingText:"Rich tooltips bring attention to a particular element or feature that warrants the user's focus.",text:"Add to list",variant:"plain"},render:o=>q(o,`
        <button
          type="button"
          style="padding: 12px 20px; border: none; border-radius: 999px; background: #6750a4; color: white; cursor: pointer; font: inherit;"
        >
          Hover me
        </button>
      `)},j={args:{text:"Add to list"},render:o=>q(o,`
        <button
          type="button"
          style="width: 56px; height: 56px; border: none; border-radius: 16px; background: #ece6f0; color: #49454f; cursor: pointer; font-size: 24px;"
        >
          +
        </button>
      `)},W={render:()=>({components:{MdTooltip:k},template:`
      <div style="padding: 96px; min-height: 360px; background: #f7f2fa; display: flex; align-items: center; justify-content: center; font-family: sans-serif; color: #1d1b20;">
        <p style="margin: 0; font-size: 18px; line-height: 1.6;">
          Stock grants use the closing price from the day before the grant date.
          <MdTooltip boundary="text" text="Grant value is calculated using the closing stock price from the day before the grant date. Amounts do not reflect tax withholdings.">
            <span style="text-decoration: underline dotted; cursor: help;">How is this calculated?</span>
          </MdTooltip>
        </p>
      </div>
    `})},K={args:{variant:"rich",headline:"Rich tooltip",supportingText:"Rich tooltips bring attention to a particular element or feature that warrants the user's focus.",actionLabel:"Action"},render:o=>q(o,`
        <button
          type="button"
          style="padding: 12px 20px; border: none; border-radius: 999px; background: #6750a4; color: white; cursor: pointer; font: inherit;"
        >
          Hover me
        </button>
      `)},Y={args:{variant:"rich",persistent:!0,headline:"Paint Tool",supportingText:"Add annotations and highlights with the paint tool.",actionLabel:"Learn more"},render:o=>q(o,`
        <button
          type="button"
          style="width: 56px; height: 56px; border: none; border-radius: 16px; background: #ece6f0; color: #49454f; cursor: pointer; font-size: 20px;"
        >
          ✎
        </button>
      `)};D.parameters={...D.parameters,docs:{...D.parameters?.docs,source:{originalSource:`{
  args: {
    actionLabel: 'Learn more',
    boundary: 'visual',
    disabled: false,
    headline: 'Rich tooltip',
    inAppBar: false,
    interactive: true,
    modelValue: undefined,
    persistent: false,
    placement: '',
    supportingText: "Rich tooltips bring attention to a particular element or feature that warrants the user's focus.",
    text: 'Add to list',
    variant: 'plain'
  },
  render: args => renderTooltip(args, \`
        <button
          type="button"
          style="padding: 12px 20px; border: none; border-radius: 999px; background: #6750a4; color: white; cursor: pointer; font: inherit;"
        >
          Hover me
        </button>
      \`)
}`,...D.parameters?.docs?.source}}};j.parameters={...j.parameters,docs:{...j.parameters?.docs,source:{originalSource:`{
  args: {
    text: 'Add to list'
  },
  render: args => renderTooltip(args, \`
        <button
          type="button"
          style="width: 56px; height: 56px; border: none; border-radius: 16px; background: #ece6f0; color: #49454f; cursor: pointer; font-size: 24px;"
        >
          +
        </button>
      \`)
}`,...j.parameters?.docs?.source}}};W.parameters={...W.parameters,docs:{...W.parameters?.docs,source:{originalSource:`{
  render: () => ({
    components: {
      MdTooltip
    },
    template: \`
      <div style="padding: 96px; min-height: 360px; background: #f7f2fa; display: flex; align-items: center; justify-content: center; font-family: sans-serif; color: #1d1b20;">
        <p style="margin: 0; font-size: 18px; line-height: 1.6;">
          Stock grants use the closing price from the day before the grant date.
          <MdTooltip boundary="text" text="Grant value is calculated using the closing stock price from the day before the grant date. Amounts do not reflect tax withholdings.">
            <span style="text-decoration: underline dotted; cursor: help;">How is this calculated?</span>
          </MdTooltip>
        </p>
      </div>
    \`
  })
}`,...W.parameters?.docs?.source}}};K.parameters={...K.parameters,docs:{...K.parameters?.docs,source:{originalSource:`{
  args: {
    variant: 'rich',
    headline: 'Rich tooltip',
    supportingText: "Rich tooltips bring attention to a particular element or feature that warrants the user's focus.",
    actionLabel: 'Action'
  },
  render: args => renderTooltip(args, \`
        <button
          type="button"
          style="padding: 12px 20px; border: none; border-radius: 999px; background: #6750a4; color: white; cursor: pointer; font: inherit;"
        >
          Hover me
        </button>
      \`)
}`,...K.parameters?.docs?.source}}};Y.parameters={...Y.parameters,docs:{...Y.parameters?.docs,source:{originalSource:`{
  args: {
    variant: 'rich',
    persistent: true,
    headline: 'Paint Tool',
    supportingText: 'Add annotations and highlights with the paint tool.',
    actionLabel: 'Learn more'
  },
  render: args => renderTooltip(args, \`
        <button
          type="button"
          style="width: 56px; height: 56px; border: none; border-radius: 16px; background: #ece6f0; color: #49454f; cursor: pointer; font-size: 20px;"
        >
          ✎
        </button>
      \`)
}`,...Y.parameters?.docs?.source}}};const et=["Playground","PlainTooltip","PlainTextBoundary","RichTooltip","PersistentRichTooltip"];export{Y as PersistentRichTooltip,W as PlainTextBoundary,j as PlainTooltip,D as Playground,K as RichTooltip,et as __namedExportsOrder,Re as default};
