import{a as Y,b as E}from"./chunk-ULXPTNPY.js";import{b as X,c as $}from"./chunk-TVQHBZNT.js";import{a as u,b as y}from"./chunk-OOUCEZ5I.js";var g=u((ne,k)=>{var f=class{node=null;static get instance(){return f.page||(f.page=new f),f.page}get elem(){return this.node}async init(e,t){let s=e||document.body;return this.node=s.querySelector('[data-page="loader-page"]'),s}},v=f;y(v,"page",null);k.exports={LoaderPage:v}});var q=u((ae,A)=>{function Z(o){let e=typeof o;return e==="function"||e==="object"&&!!o}A.exports={isObject:Z}});var N=u((ie,U)=>{var{isObject:S}=q(),x=class{data;globalContext;extension;constructor(){this.resetContext()}static create(e){let t=new x;return t.add(e),t}translate(e,t,s,i){let n,a,c=this.globalContext;return S(t)?(a=t,S(s)&&(c=s)):typeof t=="number"?(n=t,a=s,i&&(c=i)):typeof s=="number"?(n=s,a=i):(a=s,i&&(c=i)),this.translateText(e,n,a,c)}add(e){if(!this.data)this.data=e;else{if(e.values&&this.data.values)for(let t of Object.keys(e.values))this.data.values[t]=e.values[t];if(e.contexts&&this.data.contexts)for(let t of e.contexts)this.data.contexts.push(t)}}setContext(e,t){his.globalContext[e]=t}extend(e){this.extension=e}clearContext(e){delete this.globalContext[e]}reset(){this.resetData(),this.resetContext()}resetData(){this.data={values:{},contexts:[]}}resetContext(){this.globalContext={}}translateText(e,t,s,i){if(i=i||this.globalContext,!this.data)return this.useOriginalText(""+e,t,s);let n=this.getContextData(this.data,i),a=null;return n&&(a=this.findTranslation(e,t,s,n?.values)),a===null&&(a=this.findTranslation(e,t,s,this.data.values)),a===null&&(a=this.useOriginalText(""+e,t,s)),a}findTranslation(e,t,s,i){let n=i?.[e];if(n===void 0)return null;if(typeof n=="object"&&!Array.isArray(n))return this.extension?(n=""+this.extension(e,t,s,n),n=this.applyNumbers(n,t||0),this.applyFormatting(n,s)):this.useOriginalText(""+e,t,s);if(t===void 0&&typeof n=="string")return this.applyFormatting(n,s);if(n instanceof Array){for(let a of n)if(t===void 0&&a[0]===null&&a[1]===null||t!==void 0&&(a[0]!==null&&t>=a[0]&&(a[1]===null||t<=a[1])||a[0]===null&&a[1]&&t<=a[1])){let c=t||0,l=""+(a[2]??""),W=this.applyNumbers(l,c);return this.applyFormatting(W,s)}}return null}applyNumbers(e,t){return e=e.replace("-%n",""+-t),e=e.replace("%n",""+t),e}applyFormatting(e,t){if(t)for(let s of Object.keys(t)){let i=new RegExp(`%{${s}}`,"g");e=e.replace(i,t[s])}return e}getContextData(e,t){if(!e.contexts)return null;for(let s of e.contexts){let i=!0;for(let n of Object.keys(s.matches)){let a=s.matches[n];i=i&&a===t[n]}if(i)return s}return null}useOriginalText(e,t,s){return t===void 0?this.applyFormatting(e,s):this.applyFormatting(e.replace("%n",""+t),s)}};U.exports={Translator:x}});var R=u((oe,P)=>{var{Translator:O}=N(),{isObject:m}=q();P.exports={Translator:O,isObject:m}});var V=u((le,G)=>{var{BaseLayout:_}=Y(),d=class extends _{static get instance(){return d.layout||(d.layout=new d),d.layout}},L=d;y(L,"layout",null);G.exports={DefaultLayout:L}});var K=u((re,J)=>{var{Translator:ee}=R(),{DefaultLayout:B}=V(),{LoaderPage:M}=g(),{toCamel:w}=E(),{layouts:r,views:p,context:b,languages:h}=$();function z(){document.querySelector(".splash")?.classList.remove("splash-open")}function F(o){let e=[...o].reverse(),t=B.instance;for(let s of e){if(!(s in r)||t.content!==r[s])break;t=r[s]}return t}async function H(o,e,t){let s={};for(let i of o)if(!(i in r)){let n=await import(`./views/layouts/${i}.js?time=${Date.now()}`);e=await n.default[w(i)]?.instance?.init?.(e,t),r[i]=n.default[w(i)]?.instance,s[i]=!0}return s}async function I(o,e,t,s){let i=[...t].reverse(),n=B.instance;for(let a of i)n.content!==r[a]&&await n.replaceContent(r[a]),await r[a].load?.(o,e,s[a]??!1),n=r[a];return n}async function te(o,e,t,s,i){b.page=e;let n=null,a=!1;if(!i&&(!(o in h)||!(t in p))){let l=F(s);l.content!==M.instance&&await l.replaceContent(M.instance)}if(!(o in h)){let l=await import(`./locales/${o}.js?time=${Date.now()}`);h[o]=ee.create(l.default)}if(b.tr=h[o].translate.bind(h[o]),document.documentElement.lang=o,document.title=b.tr("Catalog of Services"),!(t in p)){let l=await import(`./views/${t}.js?time=${Date.now()}`);n=await l.default[w(t)]?.instance?.init?.(n,i),p[t]=l.default[w(t)]?.instance,a=!0}let c=await H(s,n,i);if(b.page.fragment===e.fragment){let l=await I(o,e,s,c);l.content!==p[t]&&await l.replaceContent(p[t]),await p[t].load?.(o,e,a)}i&&z()}J.exports={hideSplash:z,getExistingLayout:F,initLayouts:H,loadLayouts:I,loadPage:te}});var{LoaderPage:se}=g(),{loadPage:j}=K(),{localeRoute:C}=E(),{router:Q,routeNavigator:D}=$(),{DEFAULT_LANGUAGE:T}=X();window.addEventListener("DOMContentLoaded",()=>{let o=!0;se.instance.init(null,o),Q.addRoutes([{rule:`${C}/?`,async handler(e){await j(e.match?.[0]||T,e,"home-page",["main-layout"],o)}},{rule:`${C}/?sign-in`,async handler(e){await j(e.match?.[0]||T,e,"sign-in-page",[],o)}},{rule:`${C}/?sign-up`,async handler(e){await j(e.match?.[0]||T,e,"sign-up-page",[],o)}}]),D.addUriListener(),Q.processUrl(D.fragment,D.query).catch(e=>console.error(e)).finally(()=>o=!1)});
