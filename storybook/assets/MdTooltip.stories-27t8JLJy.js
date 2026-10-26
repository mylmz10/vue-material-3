import{A as Ee,x as Ve,w as Ce,y as Ge,g as f,p as ue,q as H,c as Se,j as Oe,n as Be,b as de,t as N,F as He,v as z,R as Ne,r as m,k as w,e as u,s as pe,l as Z}from"./iframe-Bo7-BOp5.js";import"./preload-helper-PPVm8Dsz.js";const ze=["aria-describedby"],We=["id"],Fe={key:0,class:"md-tooltip__plain-text"},$e={key:0,class:"md-tooltip__headline"},De={key:1,class:"md-tooltip__supporting-text"},je={key:2,class:"md-tooltip__action-row"};let Re=0;const x={__name:"MdTooltip",props:{actionLabel:{type:String,default:""},boundary:{type:String,default:"visual"},disabled:{type:Boolean,default:!1},headline:{type:String,default:""},id:{type:String,default:""},inAppBar:{type:Boolean,default:!1},interactive:{type:[Boolean,null],default:null},modelValue:{type:Boolean,default:void 0},placement:{type:String,default:""},persistent:{type:Boolean,default:!1},supportingText:{type:String,default:""},text:{type:String,default:""},variant:{type:String,default:"plain"}},emits:["action","close","open","update:modelValue"],setup(o,{emit:Y}){const ce=Ee(),a=o,T=Y,A=m(null),M=m(null),i=m(!1),I=m({}),d=m(!1),p=m(!1),L=m(!1),k=`md-tooltip-${++Re}`,ee=w(()=>a.id||`${k}-surface`);let E=null,V=null,K=!1,C=!1;const c=w(()=>a.variant==="rich"),h=w(()=>c.value&&a.persistent),_=w(()=>a.interactive==null?c.value:a.interactive),fe=w(()=>c.value&&(!!a.actionLabel||!!ce.action)),q=w(()=>a.inAppBar?4:a.boundary==="text"?8:4),U=()=>{if(typeof window>"u")return new Map;const e="__mdTooltipRegistry";return window[e]||(window[e]=new Map),window[e]},l=()=>{E&&(window.clearTimeout(E),E=null)},v=()=>{V&&(window.clearTimeout(V),V=null)},J=()=>{U().forEach((t,n)=>{n!==k&&t?.("handoff")})};function Q(){C&&(window.removeEventListener("resize",O),window.removeEventListener("scroll",O,!0),document.removeEventListener("mousedown",le),document.removeEventListener("keydown",re),C=!1)}const g=(e="programmatic")=>{if(!i.value){l(),v();return}l(),v(),d.value=!1,p.value=!1,i.value=!1,I.value={},Q(),T("update:modelValue",!1),T("close",{source:e})},te=(e,t,n)=>Math.min(Math.max(e,t),n),ne=(e,t,n="center")=>n==="start"?e.left:n==="end"?e.right-t.width:e.left+(e.width-t.width)/2,oe=(e,t,n="center")=>n==="start"?e.top:n==="end"?e.bottom-t.height:e.top+(e.height-t.height)/2,me=e=>{const t=(e||"").trim().toLowerCase().replace(/\s+/g,"-");return t?{"top-left":"top-start","top-right":"top-end","bottom-left":"bottom-start","bottom-right":"bottom-end","left-top":"left-start","left-bottom":"left-end","right-top":"right-start","right-bottom":"right-end"}[t]||t:""},ae=(e,t,n,r)=>{const b=me(r);if(!b)return null;const[y,s="center"]=b.split("-");switch(y){case"top":return{left:ne(e,t,s),top:e.top-t.height-n};case"bottom":return{left:ne(e,t,s),top:e.bottom+n};case"left":return{left:e.left-t.width-n,top:oe(e,t,s)};case"right":return{left:e.right+n,top:oe(e,t,s)};default:return null}},G=(e,t)=>{const n=Math.max(8,window.innerWidth-t.width-8),r=Math.max(8,window.innerHeight-t.height-8);return{left:te(e.left,8,n),top:te(e.top,8,r)}},ie=(e,t)=>e.left>=8&&e.top>=8&&e.left+t.width<=window.innerWidth-8&&e.top+t.height<=window.innerHeight-8,he=(e,t)=>{const n=ae(e,t,q.value,a.placement);if(n)return G(n,t);const r=e.left+(e.width-t.width)/2,b={left:r,top:e.top-t.height-q.value},y={left:r,top:e.bottom+q.value},s=a.inAppBar?[y,b]:[b,y],Le=s.find(ke=>ie(ke,t))||s[0];return G(Le,t)},ve=(e,t)=>{const n=ae(e,t,4,a.placement);if(n)return G(n,t);const r={left:e.left+(e.width-t.width)/2,top:e.bottom+4},y=[{left:e.right+4,top:e.bottom+4},{left:e.left-t.width-4,top:e.bottom+4},{left:e.right+4,top:e.top-t.height-4},{left:e.left-t.width-4,top:e.top-t.height-4},r,{left:e.left+(e.width-t.width)/2,top:e.top-t.height-4}].find(s=>ie(s,t))||r;return G(y,t)},S=()=>{if(!A.value||!M.value)return;const e=A.value.getBoundingClientRect(),t=M.value.getBoundingClientRect(),n=c.value?ve(e,t):he(e,t);I.value={left:`${n.left}px`,top:`${n.top}px`}},O=()=>{i.value&&S()},le=e=>{if(!i.value)return;const t=e.target;A.value?.contains(t)||M.value?.contains(t)||g("outside-click")},re=e=>{e.key!=="Escape"||!i.value||g("escape")};function se(){C||(window.addEventListener("resize",O),window.addEventListener("scroll",O,!0),document.addEventListener("mousedown",le),document.addEventListener("keydown",re),C=!0)}const B=async(e="programmatic")=>{a.disabled||(l(),J(),i.value||(i.value=!0,se(),T("update:modelValue",!0),T("open",{source:e})),await Z(),S())},P=(e="leave")=>{h.value||(l(),E=window.setTimeout(()=>{d.value||p.value||g(e)},1500))},ge=()=>{d.value=!0,l(),h.value||B("hover")},be=()=>{d.value=!1,P("trigger-leave")},ye=()=>{d.value=!0,l(),h.value||B("focus")},we=()=>{d.value=!1,P("trigger-blur")},xe=()=>{_.value&&(p.value=!0,l())},Te=()=>{_.value&&(p.value=!1,P("tooltip-leave"))},_e=()=>{_.value&&(p.value=!0,l())},Pe=()=>{_.value&&(p.value=!1,P("tooltip-blur"))},Ae=e=>{a.disabled||h.value||e.pointerType==="mouse"||(v(),K=!1,V=window.setTimeout(()=>{K=!0,L.value=!0,B("long-press")},500))},X=()=>{v(),K&&(P("long-press-release"),window.setTimeout(()=>{L.value=!1},0))},Me=e=>{if(L.value){e.preventDefault(),e.stopPropagation(),L.value=!1;return}if(h.value){if(i.value){g("trigger-click");return}B("trigger-click")}},Ie=()=>{T("action"),h.value&&g("action")};return Ve(()=>{U().set(k,g),i.value&&J()}),Ce(()=>a.modelValue,async e=>{if(e!==void 0){if(e===i.value){e&&(await Z(),S());return}if(l(),v(),d.value=!1,p.value=!1,i.value=!!e,e){J(),se(),await Z(),S();return}I.value={},Q()}},{immediate:!0}),Ge(()=>{l(),v(),Q(),U().delete(k)}),(e,t)=>(u(),f("span",{class:de(["md-tooltip",`md-tooltip--${o.variant}`])},[ue("span",{ref_key:"triggerEl",ref:A,class:"md-tooltip__trigger","aria-describedby":ee.value,onMouseenter:ge,onMouseleave:be,onFocusin:ye,onFocusout:we,onPointerdown:Ae,onPointerup:X,onPointercancel:X,onPointerleave:X,onClick:Me},[H(e.$slots,"default")],40,ze),(u(),Se(Ne,{to:"body"},[i.value?(u(),f("div",{key:0,id:ee.value,ref_key:"tooltipEl",ref:M,class:de(["md-tooltip__surface",{"md-tooltip__surface--plain":!c.value,"md-tooltip__surface--rich":c.value,"md-tooltip__surface--interactive":_.value}]),style:Be(I.value),role:"tooltip",onMouseenter:xe,onMouseleave:Te,onFocusin:_e,onFocusout:Pe,onClick:t[0]||(t[0]=Oe(()=>{},["stop"]))},[c.value?(u(),f(He,{key:1},[o.headline||e.$slots.headline?(u(),f("div",$e,[H(e.$slots,"headline",{},()=>[pe(N(o.headline),1)])])):z("",!0),o.supportingText||e.$slots["supporting-text"]?(u(),f("div",De,[H(e.$slots,"supporting-text",{},()=>[pe(N(o.supportingText),1)])])):z("",!0),fe.value?(u(),f("div",je,[H(e.$slots,"action",{},()=>[ue("button",{type:"button",class:"md-tooltip__action",onClick:Ie},N(o.actionLabel),1)])])):z("",!0)],64)):(u(),f("span",Fe,N(o.text),1))],46,We)):z("",!0)]))],2))}};x.__docgenInfo=Object.assign({displayName:x.name??x.__name},{exportName:"default",displayName:"MdTooltip",description:"",tags:{},props:[{name:"actionLabel",type:{name:"string"},defaultValue:{func:!1,value:"''"}},{name:"boundary",type:{name:"string"},defaultValue:{func:!1,value:"'visual'"}},{name:"disabled",type:{name:"boolean"},defaultValue:{func:!1,value:"false"}},{name:"headline",type:{name:"string"},defaultValue:{func:!1,value:"''"}},{name:"id",type:{name:"string"},defaultValue:{func:!1,value:"''"}},{name:"inAppBar",type:{name:"boolean"},defaultValue:{func:!1,value:"false"}},{name:"interactive",type:{name:"boolean|null"},defaultValue:{func:!1,value:"null"}},{name:"modelValue",type:{name:"boolean"},defaultValue:{func:!1,value:"undefined"}},{name:"placement",type:{name:"string"},defaultValue:{func:!1,value:"''"}},{name:"persistent",type:{name:"boolean"},defaultValue:{func:!1,value:"false"}},{name:"supportingText",type:{name:"string"},defaultValue:{func:!1,value:"''"}},{name:"text",type:{name:"string"},defaultValue:{func:!1,value:"''"}},{name:"variant",type:{name:"string"},defaultValue:{func:!1,value:"'plain'"}}],events:[{name:"action"},{name:"close"},{name:"open"},{name:"update:modelValue"}],slots:[{name:"default"},{name:"headline"},{name:"supporting-text"},{name:"action"}],sourceFiles:["/home/runner/work/vue-material-3/vue-material-3/src/components/tooltip/MdTooltip.vue"]});const Ye=["","top","top-start","top-end","bottom","bottom-start","bottom-end","left","left-start","left-end","right","right-start","right-end"],R=(o,Y)=>({components:{MdTooltip:x},setup(){return{args:o}},template:`
    <div style="padding: 96px; min-height: 360px; background: #f7f2fa; display: flex; align-items: center; justify-content: center;">
      <MdTooltip v-bind="args">
        ${Y}
      </MdTooltip>
    </div>
  `}),Ze={title:"Components/Tooltip",component:x,argTypes:{actionLabel:{control:"text"},boundary:{control:"select",options:["visual","text"]},disabled:{control:"boolean"},headline:{control:"text"},inAppBar:{control:"boolean"},interactive:{control:"boolean"},modelValue:{control:"boolean"},persistent:{control:"boolean"},placement:{control:"select",options:Ye},supportingText:{control:"text"},text:{control:"text"},variant:{control:"select",options:["plain","rich"]}}},W={args:{actionLabel:"Learn more",boundary:"visual",disabled:!1,headline:"Rich tooltip",inAppBar:!1,interactive:!0,modelValue:void 0,persistent:!1,placement:"",supportingText:"Rich tooltips bring attention to a particular element or feature that warrants the user's focus.",text:"Add to list",variant:"plain"},render:o=>R(o,`
        <button
          type="button"
          style="padding: 12px 20px; border: none; border-radius: 999px; background: #6750a4; color: white; cursor: pointer; font: inherit;"
        >
          Hover me
        </button>
      `)},F={args:{text:"Add to list"},render:o=>R(o,`
        <button
          type="button"
          style="width: 56px; height: 56px; border: none; border-radius: 16px; background: #ece6f0; color: #49454f; cursor: pointer; font-size: 24px;"
        >
          +
        </button>
      `)},$={render:()=>({components:{MdTooltip:x},template:`
      <div style="padding: 96px; min-height: 360px; background: #f7f2fa; display: flex; align-items: center; justify-content: center; font-family: sans-serif; color: #1d1b20;">
        <p style="margin: 0; font-size: 18px; line-height: 1.6;">
          Stock grants use the closing price from the day before the grant date.
          <MdTooltip boundary="text" text="Grant value is calculated using the closing stock price from the day before the grant date. Amounts do not reflect tax withholdings.">
            <span style="text-decoration: underline dotted; cursor: help;">How is this calculated?</span>
          </MdTooltip>
        </p>
      </div>
    `})},D={args:{variant:"rich",headline:"Rich tooltip",supportingText:"Rich tooltips bring attention to a particular element or feature that warrants the user's focus.",actionLabel:"Action"},render:o=>R(o,`
        <button
          type="button"
          style="padding: 12px 20px; border: none; border-radius: 999px; background: #6750a4; color: white; cursor: pointer; font: inherit;"
        >
          Hover me
        </button>
      `)},j={args:{variant:"rich",persistent:!0,headline:"Paint Tool",supportingText:"Add annotations and highlights with the paint tool.",actionLabel:"Learn more"},render:o=>R(o,`
        <button
          type="button"
          style="width: 56px; height: 56px; border: none; border-radius: 16px; background: #ece6f0; color: #49454f; cursor: pointer; font-size: 20px;"
        >
          ✎
        </button>
      `)};W.parameters={...W.parameters,docs:{...W.parameters?.docs,source:{originalSource:`{
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
}`,...W.parameters?.docs?.source}}};F.parameters={...F.parameters,docs:{...F.parameters?.docs,source:{originalSource:`{
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
}`,...F.parameters?.docs?.source}}};$.parameters={...$.parameters,docs:{...$.parameters?.docs,source:{originalSource:`{
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
}`,...$.parameters?.docs?.source}}};D.parameters={...D.parameters,docs:{...D.parameters?.docs,source:{originalSource:`{
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
}`,...D.parameters?.docs?.source}}};j.parameters={...j.parameters,docs:{...j.parameters?.docs,source:{originalSource:`{
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
}`,...j.parameters?.docs?.source}}};const et=["Playground","PlainTooltip","PlainTextBoundary","RichTooltip","PersistentRichTooltip"];export{j as PersistentRichTooltip,$ as PlainTextBoundary,F as PlainTooltip,W as Playground,D as RichTooltip,et as __namedExportsOrder,Ze as default};
