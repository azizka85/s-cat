import{a as p,b as h,d as m}from"./chunk-TVQHBZNT.js";import{a as r}from"./chunk-OOUCEZ5I.js";var d=r((O,a)=>{var{mount:j,unmount:y}=m(),c=class{content=null;async replaceContent(e){this.content?.replaceSelf?this.content.replaceSelf(e):(await this.content?.unmount?.(),await y(this.content?.elem||null),this.content?.elem?.replaceWith(e.elem||""),await e.mount?.(),await j(e.elem)),this.content=e}};a.exports={BaseLayout:c}});var C=r((S,f)=>{var{trimSlashes:g}=p(),{LANGUAGES:i}=h();function k(t){for(let e of Object.keys(t))delete t[e]}function s(t){let e=[];for(let n of Object.keys(t))t[n]?e.push(`${n}=${t[n]}`):e.push(n);return e.join("&")}function l(t,e,n){let o={...t};return o[e]=n,s(o)}function w(t,e){let n={...t};return e in n?(delete n[e],s(n)):l(n,e,"1")}function u(t){if(!t)return t;let e=t.split("");return e[0].toUpperCase()+e.slice(1).join("").toLowerCase()}function $(t){return t.split("-").map(n=>u(n)).join("")}var x=`(${Object.keys(i).join("|")})?`;function P(t,e){t=g(t);let n=new RegExp(`^(${Object.keys(i).join("|")})`);return t.search(n)>=0?t.replace(n,e):`${e}/${t}`}f.exports={clearProperties:k,getQueryParameters:s,setQueryParameter:l,toggleQueryParameter:w,capitalize:u,toCamel:$,localeRoute:x,changeLangPath:P}});export{d as a,C as b};