import{v as zt,p as Vt,w as $t,q as Ft,e as m,h as ut,j as I,c as Ht,m as It,E as Ot,n as pt,t as O,F as Gt,l as G,M as Dt,g as T,r as v,b as p,k as ct,z as R}from"./iframe-1pZw89sQ.js";import"./preload-helper-PPVm8Dsz.js";const Nt=["aria-describedby"],jt=["id"],Wt={key:0,class:"md-tooltip__plain-text"},Kt={key:0,class:"md-tooltip__headline"},Yt={key:1,class:"md-tooltip__supporting-text"},qt={key:2,class:"md-tooltip__action-row"},Ut=1500,Jt=500,s=8,a=4,tt={__name:"MdTooltip",props:{actionLabel:{type:String,default:""},boundary:{type:String,default:"visual"},disabled:{type:Boolean,default:!1},headline:{type:String,default:""},id:{type:String,default:""},inAppBar:{type:Boolean,default:!1},interactive:{type:[Boolean,null],default:null},modelValue:{type:Boolean,default:void 0},placement:{type:String,default:""},persistent:{type:Boolean,default:!1},supportingText:{type:String,default:""},text:{type:String,default:""},variant:{type:String,default:"plain"}},emits:["action","close","open","update:modelValue"],setup(n,{emit:q}){let ht=0;const ft=zt(),r=n,k=q,M=v(null),_=v(null),i=v(!1),E=v({}),c=v(!1),h=v(!1),S=v(!1),A=`md-tooltip-${++ht}`,et=T(()=>r.id||`${A}-surface`);let C=null,B=null,U=!1,z=!1;const f=T(()=>r.variant==="rich"),g=T(()=>f.value&&r.persistent),L=T(()=>r.interactive==null?f.value:r.interactive),mt=T(()=>f.value&&(!!r.actionLabel||!!ft.action)),J=T(()=>r.inAppBar?4:r.boundary==="text"?8:4),Q=()=>{if(typeof window>"u")return new Map;const t="__mdTooltipRegistry";return window[t]||(window[t]=new Map),window[t]},l=()=>{C&&(window.clearTimeout(C),C=null)},b=()=>{B&&(window.clearTimeout(B),B=null)},vt=()=>{Q().forEach((e,o)=>{o!==A&&e?.("handoff")})};function X(){z&&(window.removeEventListener("resize",F),window.removeEventListener("scroll",F,!0),document.removeEventListener("mousedown",lt),document.removeEventListener("keydown",st),z=!1)}const w=(t="programmatic")=>{if(!i.value){l(),b();return}l(),b(),c.value=!1,h.value=!1,i.value=!1,E.value={},X(),k("update:modelValue",!1),k("close",{source:t})},ot=(t,e,o)=>Math.min(Math.max(t,e),o),nt=(t,e,o="center")=>o==="start"?t.left:o==="end"?t.right-e.width:t.left+(t.width-e.width)/2,rt=(t,e,o="center")=>o==="start"?t.top:o==="end"?t.bottom-e.height:t.top+(t.height-e.height)/2,gt=t=>{const e=(t||"").trim().toLowerCase().replace(/\s+/g,"-");return e?{"top-left":"top-start","top-right":"top-end","bottom-left":"bottom-start","bottom-right":"bottom-end","left-top":"left-start","left-bottom":"left-end","right-top":"right-start","right-bottom":"right-end"}[e]||e:""},it=(t,e,o,d)=>{const y=gt(d);if(!y)return null;const[x,u="center"]=y.split("-");switch(x){case"top":return{left:nt(t,e,u),top:t.top-e.height-o};case"bottom":return{left:nt(t,e,u),top:t.bottom+o};case"left":return{left:t.left-e.width-o,top:rt(t,e,u)};case"right":return{left:t.right+o,top:rt(t,e,u)};default:return null}},V=(t,e)=>{const o=Math.max(s,window.innerWidth-e.width-s),d=Math.max(s,window.innerHeight-e.height-s);return{left:ot(t.left,s,o),top:ot(t.top,s,d)}},at=(t,e)=>t.left>=s&&t.top>=s&&t.left+e.width<=window.innerWidth-s&&t.top+e.height<=window.innerHeight-s,bt=(t,e)=>{const o=it(t,e,J.value,r.placement);if(o)return V(o,e);const d=t.left+(t.width-e.width)/2,y={left:d,top:t.top-e.height-J.value},x={left:d,top:t.bottom+J.value},u=r.inAppBar?[x,y]:[y,x],Ct=u.find(Bt=>at(Bt,e))||u[0];return V(Ct,e)},wt=(t,e)=>{const o=it(t,e,a,r.placement);if(o)return V(o,e);const d={left:t.left+(t.width-e.width)/2,top:t.bottom+a},x=[{left:t.right+a,top:t.bottom+a},{left:t.left-e.width-a,top:t.bottom+a},{left:t.right+a,top:t.top-e.height-a},{left:t.left-e.width-a,top:t.top-e.height-a},d,{left:t.left+(t.width-e.width)/2,top:t.top-e.height-a}].find(u=>at(u,e))||d;return V(x,e)},$=()=>{if(!M.value||!_.value)return;const t=M.value.getBoundingClientRect(),e=_.value.getBoundingClientRect(),o=f.value?wt(t,e):bt(t,e);E.value={left:`${o.left}px`,top:`${o.top}px`}},F=()=>{i.value&&$()},lt=t=>{if(!i.value)return;const e=t.target;M.value?.contains(e)||_.value?.contains(e)||w("outside-click")},st=t=>{t.key!=="Escape"||!i.value||w("escape")};function dt(){z||(window.addEventListener("resize",F),window.addEventListener("scroll",F,!0),document.addEventListener("mousedown",lt),document.addEventListener("keydown",st),z=!0)}const H=async(t="programmatic")=>{r.disabled||(l(),vt(),i.value||(i.value=!0,dt(),k("update:modelValue",!0),k("open",{source:t})),await R(),$())},P=(t="leave")=>{g.value||(l(),C=window.setTimeout(()=>{c.value||h.value||w(t)},Ut))},yt=()=>{c.value=!0,l(),g.value||H("hover")},xt=()=>{c.value=!1,P("trigger-leave")},Tt=()=>{c.value=!0,l(),g.value||H("focus")},kt=()=>{c.value=!1,P("trigger-blur")},Lt=()=>{L.value&&(h.value=!0,l())},Pt=()=>{L.value&&(h.value=!1,P("tooltip-leave"))},Mt=()=>{L.value&&(h.value=!0,l())},_t=()=>{L.value&&(h.value=!1,P("tooltip-blur"))},Et=t=>{r.disabled||g.value||t.pointerType==="mouse"||(b(),U=!1,B=window.setTimeout(()=>{U=!0,S.value=!0,H("long-press")},Jt))},Z=()=>{b(),U&&(P("long-press-release"),window.setTimeout(()=>{S.value=!1},0))},St=t=>{if(S.value){t.preventDefault(),t.stopPropagation(),S.value=!1;return}if(g.value){if(i.value){w("trigger-click");return}H("trigger-click")}},At=()=>{k("action"),g.value&&w("action")};return Vt(()=>{Q().set(A,w)}),$t(()=>r.modelValue,async t=>{if(t!==void 0){if(t===i.value){t&&(await R(),$());return}if(l(),b(),c.value=!1,h.value=!1,i.value=!!t,t){dt(),await R(),$();return}E.value={},X()}},{immediate:!0}),Ft(()=>{l(),b(),X(),Q().delete(A)}),(t,e)=>(p(),m("span",{class:pt(["md-tooltip",`md-tooltip--${n.variant}`])},[ut("span",{ref_key:"triggerEl",ref:M,class:"md-tooltip__trigger","aria-describedby":et.value,onMouseenter:yt,onMouseleave:xt,onFocusin:Tt,onFocusout:kt,onPointerdown:Et,onPointerup:Z,onPointercancel:Z,onPointerleave:Z,onClick:St},[I(t.$slots,"default")],40,Nt),(p(),Ht(Dt,{to:"body"},[i.value?(p(),m("div",{key:0,id:et.value,ref_key:"tooltipEl",ref:_,class:pt(["md-tooltip__surface",{"md-tooltip__surface--plain":!f.value,"md-tooltip__surface--rich":f.value,"md-tooltip__surface--interactive":L.value}]),style:Ot(E.value),role:"tooltip",onMouseenter:Lt,onMouseleave:Pt,onFocusin:Mt,onFocusout:_t,onClick:e[0]||(e[0]=It(()=>{},["stop"]))},[f.value?(p(),m(Gt,{key:1},[n.headline||t.$slots.headline?(p(),m("div",Kt,[I(t.$slots,"headline",{},()=>[ct(O(n.headline),1)])])):G("",!0),n.supportingText||t.$slots["supporting-text"]?(p(),m("div",Yt,[I(t.$slots,"supporting-text",{},()=>[ct(O(n.supportingText),1)])])):G("",!0),mt.value?(p(),m("div",qt,[I(t.$slots,"action",{},()=>[ut("button",{type:"button",class:"md-tooltip__action",onClick:At},O(n.actionLabel),1)])])):G("",!0)],64)):(p(),m("span",Wt,O(n.text),1))],46,jt)):G("",!0)]))],2))}},Qt=["","top","top-start","top-end","bottom","bottom-start","bottom-end","left","left-start","left-end","right","right-start","right-end"],Y=(n,q)=>({components:{MdTooltip:tt},setup(){return{args:n}},template:`
    <div style="padding: 96px; min-height: 360px; background: #f7f2fa; display: flex; align-items: center; justify-content: center;">
      <MdTooltip v-bind="args">
        ${q}
      </MdTooltip>
    </div>
  `}),Rt={title:"Components/Tooltip",component:tt,argTypes:{actionLabel:{control:"text"},boundary:{control:"select",options:["visual","text"]},disabled:{control:"boolean"},headline:{control:"text"},inAppBar:{control:"boolean"},interactive:{control:"boolean"},modelValue:{control:"boolean"},persistent:{control:"boolean"},placement:{control:"select",options:Qt},supportingText:{control:"text"},text:{control:"text"},variant:{control:"select",options:["plain","rich"]}}},D={args:{actionLabel:"Learn more",boundary:"visual",disabled:!1,headline:"Rich tooltip",inAppBar:!1,interactive:!0,modelValue:void 0,persistent:!1,placement:"",supportingText:"Rich tooltips bring attention to a particular element or feature that warrants the user's focus.",text:"Add to list",variant:"plain"},render:n=>Y(n,`
        <button
          type="button"
          style="padding: 12px 20px; border: none; border-radius: 999px; background: #6750a4; color: white; cursor: pointer; font: inherit;"
        >
          Hover me
        </button>
      `)},N={args:{text:"Add to list"},render:n=>Y(n,`
        <button
          type="button"
          style="width: 56px; height: 56px; border: none; border-radius: 16px; background: #ece6f0; color: #49454f; cursor: pointer; font-size: 24px;"
        >
          +
        </button>
      `)},j={render:()=>({components:{MdTooltip:tt},template:`
      <div style="padding: 96px; min-height: 360px; background: #f7f2fa; display: flex; align-items: center; justify-content: center; font-family: sans-serif; color: #1d1b20;">
        <p style="margin: 0; font-size: 18px; line-height: 1.6;">
          Stock grants use the closing price from the day before the grant date.
          <MdTooltip boundary="text" text="Grant value is calculated using the closing stock price from the day before the grant date. Amounts do not reflect tax withholdings.">
            <span style="text-decoration: underline dotted; cursor: help;">How is this calculated?</span>
          </MdTooltip>
        </p>
      </div>
    `})},W={args:{variant:"rich",headline:"Rich tooltip",supportingText:"Rich tooltips bring attention to a particular element or feature that warrants the user's focus.",actionLabel:"Action"},render:n=>Y(n,`
        <button
          type="button"
          style="padding: 12px 20px; border: none; border-radius: 999px; background: #6750a4; color: white; cursor: pointer; font: inherit;"
        >
          Hover me
        </button>
      `)},K={args:{variant:"rich",persistent:!0,headline:"Paint Tool",supportingText:"Add annotations and highlights with the paint tool.",actionLabel:"Learn more"},render:n=>Y(n,`
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
}`,...D.parameters?.docs?.source}}};N.parameters={...N.parameters,docs:{...N.parameters?.docs,source:{originalSource:`{
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
}`,...N.parameters?.docs?.source}}};j.parameters={...j.parameters,docs:{...j.parameters?.docs,source:{originalSource:`{
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
}`,...j.parameters?.docs?.source}}};W.parameters={...W.parameters,docs:{...W.parameters?.docs,source:{originalSource:`{
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
}`,...W.parameters?.docs?.source}}};K.parameters={...K.parameters,docs:{...K.parameters?.docs,source:{originalSource:`{
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
}`,...K.parameters?.docs?.source}}};const te=["Playground","PlainTooltip","PlainTextBoundary","RichTooltip","PersistentRichTooltip"];export{K as PersistentRichTooltip,j as PlainTextBoundary,N as PlainTooltip,D as Playground,W as RichTooltip,te as __namedExportsOrder,Rt as default};
