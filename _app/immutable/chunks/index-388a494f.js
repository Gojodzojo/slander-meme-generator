function N(){}function nt(t,e){for(const n in e)t[n]=e[n];return t}function ct(t){return t&&typeof t=="object"&&typeof t.then=="function"}function Q(t){return t()}function J(){return Object.create(null)}function k(t){t.forEach(Q)}function R(t){return typeof t=="function"}function vt(t,e){return t!=t?e==e:t!==e||t&&typeof t=="object"||typeof t=="function"}let S;function Et(t,e){return S||(S=document.createElement("a")),S.href=e,t===S.href}function St(t,e){return t!=t?e==e:t!==e}function rt(t){return Object.keys(t).length===0}function it(t,...e){if(t==null)return N;const n=t.subscribe(...e);return n.unsubscribe?()=>n.unsubscribe():n}function jt(t,e,n){t.$$.on_destroy.push(it(e,n))}function At(t,e,n,c){if(t){const r=U(t,e,n,c);return t[0](r)}}function U(t,e,n,c){return t[1]&&c?nt(n.ctx.slice(),t[1](c(e))):n.ctx}function Ct(t,e,n,c){if(t[2]&&c){const r=t[2](c(n));if(e.dirty===void 0)return r;if(typeof r=="object"){const l=[],s=Math.max(e.dirty.length,r.length);for(let u=0;u<s;u+=1)l[u]=e.dirty[u]|r[u];return l}return e.dirty|r}return e.dirty}function Nt(t,e,n,c,r,l){if(r){const s=U(e,n,c,l);t.p(s,r)}}function Mt(t){if(t.ctx.length>32){const e=[],n=t.ctx.length/32;for(let c=0;c<n;c++)e[c]=-1;return e}return-1}function qt(t){const e={};for(const n in t)n[0]!=="$"&&(e[n]=t[n]);return e}function Pt(t,e){const n={};e=new Set(e);for(const c in t)!e.has(c)&&c[0]!=="$"&&(n[c]=t[c]);return n}function Ot(t){const e={};for(const n in t)e[n]=!0;return e}function Tt(t){return t&&R(t.destroy)?t.destroy:N}let M=!1;function st(){M=!0}function lt(){M=!1}function ut(t,e,n,c){for(;t<e;){const r=t+(e-t>>1);n(r)<=c?t=r+1:e=r}return t}function ot(t){if(t.hydrate_init)return;t.hydrate_init=!0;let e=t.childNodes;if(t.nodeName==="HEAD"){const i=[];for(let o=0;o<e.length;o++){const _=e[o];_.claim_order!==void 0&&i.push(_)}e=i}const n=new Int32Array(e.length+1),c=new Int32Array(e.length);n[0]=-1;let r=0;for(let i=0;i<e.length;i++){const o=e[i].claim_order,_=(r>0&&e[n[r]].claim_order<=o?r+1:ut(1,r,a=>e[n[a]].claim_order,o))-1;c[i]=n[_]+1;const d=_+1;n[d]=i,r=Math.max(d,r)}const l=[],s=[];let u=e.length-1;for(let i=n[r]+1;i!=0;i=c[i-1]){for(l.push(e[i-1]);u>=i;u--)s.push(e[u]);u--}for(;u>=0;u--)s.push(e[u]);l.reverse(),s.sort((i,o)=>i.claim_order-o.claim_order);for(let i=0,o=0;i<s.length;i++){for(;o<l.length&&s[i].claim_order>=l[o].claim_order;)o++;const _=o<l.length?l[o]:null;t.insertBefore(s[i],_)}}function at(t,e){if(M){for(ot(t),(t.actual_end_child===void 0||t.actual_end_child!==null&&t.actual_end_child.parentElement!==t)&&(t.actual_end_child=t.firstChild);t.actual_end_child!==null&&t.actual_end_child.claim_order===void 0;)t.actual_end_child=t.actual_end_child.nextSibling;e!==t.actual_end_child?(e.claim_order!==void 0||e.parentNode!==t)&&t.insertBefore(e,t.actual_end_child):t.actual_end_child=e.nextSibling}else(e.parentNode!==t||e.nextSibling!==null)&&t.appendChild(e)}function Dt(t,e,n){M&&!n?at(t,e):(e.parentNode!==t||e.nextSibling!=n)&&t.insertBefore(e,n||null)}function ft(t){t.parentNode.removeChild(t)}function Lt(t,e){for(let n=0;n<t.length;n+=1)t[n]&&t[n].d(e)}function _t(t){return document.createElement(t)}function dt(t){return document.createElementNS("http://www.w3.org/2000/svg",t)}function F(t){return document.createTextNode(t)}function Bt(){return F(" ")}function zt(){return F("")}function Ft(t,e,n,c){return t.addEventListener(e,n,c),()=>t.removeEventListener(e,n,c)}function Ht(t){return function(e){return e.preventDefault(),t.call(this,e)}}function It(t){return function(e){return e.stopPropagation(),t.call(this,e)}}function V(t,e,n){n==null?t.removeAttribute(e):t.getAttribute(e)!==n&&t.setAttribute(e,n)}function Wt(t,e){const n=Object.getOwnPropertyDescriptors(t.__proto__);for(const c in e)e[c]==null?t.removeAttribute(c):c==="style"?t.style.cssText=e[c]:c==="__value"?t.value=t[c]=e[c]:n[c]&&n[c].set?t[c]=e[c]:V(t,c,e[c])}function Gt(t,e){for(const n in e)V(t,n,e[n])}function ht(t){return Array.from(t.childNodes)}function mt(t){t.claim_info===void 0&&(t.claim_info={last_index:0,total_claimed:0})}function X(t,e,n,c,r=!1){mt(t);const l=(()=>{for(let s=t.claim_info.last_index;s<t.length;s++){const u=t[s];if(e(u)){const i=n(u);return i===void 0?t.splice(s,1):t[s]=i,r||(t.claim_info.last_index=s),u}}for(let s=t.claim_info.last_index-1;s>=0;s--){const u=t[s];if(e(u)){const i=n(u);return i===void 0?t.splice(s,1):t[s]=i,r?i===void 0&&t.claim_info.last_index--:t.claim_info.last_index=s,u}}return c()})();return l.claim_order=t.claim_info.total_claimed,t.claim_info.total_claimed+=1,l}function Y(t,e,n,c){return X(t,r=>r.nodeName===e,r=>{const l=[];for(let s=0;s<r.attributes.length;s++){const u=r.attributes[s];n[u.name]||l.push(u.name)}l.forEach(s=>r.removeAttribute(s))},()=>c(e))}function Jt(t,e,n){return Y(t,e,n,_t)}function Kt(t,e,n){return Y(t,e,n,dt)}function pt(t,e){return X(t,n=>n.nodeType===3,n=>{const c=""+e;if(n.data.startsWith(c)){if(n.data.length!==c.length)return n.splitText(c.length)}else n.data=c},()=>F(e),!0)}function Qt(t){return pt(t," ")}function Rt(t,e){e=""+e,t.wholeText!==e&&(t.data=e)}function Ut(t,e){t.value=e==null?"":e}function Vt(t,e,n,c){n===null?t.style.removeProperty(e):t.style.setProperty(e,n,c?"important":"")}function Xt(t,e,n){t.classList[n?"add":"remove"](e)}function yt(t,e,{bubbles:n=!1,cancelable:c=!1}={}){const r=document.createEvent("CustomEvent");return r.initCustomEvent(t,n,c,e),r}function Yt(t,e=document.body){return Array.from(e.querySelectorAll(t))}let $;function g(t){$=t}function x(){if(!$)throw new Error("Function called outside component initialization");return $}function Zt(t){x().$$.on_mount.push(t)}function te(t){x().$$.after_update.push(t)}function ee(){const t=x();return(e,n,{cancelable:c=!1}={})=>{const r=t.$$.callbacks[e];if(r){const l=yt(e,n,{cancelable:c});return r.slice().forEach(s=>{s.call(t,l)}),!l.defaultPrevented}return!0}}function ne(t,e){return x().$$.context.set(t,e),e}function ce(t){return x().$$.context.get(t)}function re(t,e){const n=t.$$.callbacks[e.type];n&&n.slice().forEach(c=>c.call(this,e))}const w=[],K=[],A=[],L=[],Z=Promise.resolve();let B=!1;function tt(){B||(B=!0,Z.then(H))}function ie(){return tt(),Z}function z(t){A.push(t)}function se(t){L.push(t)}const D=new Set;let j=0;function H(){const t=$;do{for(;j<w.length;){const e=w[j];j++,g(e),gt(e.$$)}for(g(null),w.length=0,j=0;K.length;)K.pop()();for(let e=0;e<A.length;e+=1){const n=A[e];D.has(n)||(D.add(n),n())}A.length=0}while(w.length);for(;L.length;)L.pop()();B=!1,D.clear(),g(t)}function gt(t){if(t.fragment!==null){t.update(),k(t.before_update);const e=t.dirty;t.dirty=[-1],t.fragment&&t.fragment.p(t.ctx,e),t.after_update.forEach(z)}}const C=new Set;let b;function bt(){b={r:0,c:[],p:b}}function xt(){b.r||k(b.c),b=b.p}function I(t,e){t&&t.i&&(C.delete(t),t.i(e))}function et(t,e,n,c){if(t&&t.o){if(C.has(t))return;C.add(t),b.c.push(()=>{C.delete(t),c&&(n&&t.d(1),c())}),t.o(e)}}function le(t,e){const n=e.token={};function c(r,l,s,u){if(e.token!==n)return;e.resolved=u;let i=e.ctx;s!==void 0&&(i=i.slice(),i[s]=u);const o=r&&(e.current=r)(i);let _=!1;e.block&&(e.blocks?e.blocks.forEach((d,a)=>{a!==l&&d&&(bt(),et(d,1,1,()=>{e.blocks[a]===d&&(e.blocks[a]=null)}),xt())}):e.block.d(1),o.c(),I(o,1),o.m(e.mount(),e.anchor),_=!0),e.block=o,e.blocks&&(e.blocks[l]=o),_&&H()}if(ct(t)){const r=x();if(t.then(l=>{g(r),c(e.then,1,e.value,l),g(null)},l=>{if(g(r),c(e.catch,2,e.error,l),g(null),!e.hasCatch)throw l}),e.current!==e.pending)return c(e.pending,0),!0}else{if(e.current!==e.then)return c(e.then,1,e.value,t),!0;e.resolved=t}}function ue(t,e,n){const c=e.slice(),{resolved:r}=t;t.current===t.then&&(c[t.value]=r),t.current===t.catch&&(c[t.error]=r),t.block.p(c,n)}function oe(t,e){et(t,1,1,()=>{e.delete(t.key)})}function ae(t,e,n,c,r,l,s,u,i,o,_,d){let a=t.length,m=l.length,h=a;const q={};for(;h--;)q[t[h].key]=h;const v=[],P=new Map,O=new Map;for(h=m;h--;){const f=d(r,l,h),p=n(f);let y=s.get(p);y?c&&y.p(f,e):(y=o(p,f),y.c()),P.set(p,v[h]=y),p in q&&O.set(p,Math.abs(h-q[p]))}const W=new Set,G=new Set;function T(f){I(f,1),f.m(u,_),s.set(f.key,f),_=f.first,m--}for(;a&&m;){const f=v[m-1],p=t[a-1],y=f.key,E=p.key;f===p?(_=f.first,a--,m--):P.has(E)?!s.has(y)||W.has(y)?T(f):G.has(E)?a--:O.get(y)>O.get(E)?(G.add(y),T(f)):(W.add(E),a--):(i(p,s),a--)}for(;a--;){const f=t[a];P.has(f.key)||i(f,s)}for(;m;)T(v[m-1]);return v}function fe(t,e){const n={},c={},r={$$scope:1};let l=t.length;for(;l--;){const s=t[l],u=e[l];if(u){for(const i in s)i in u||(c[i]=1);for(const i in u)r[i]||(n[i]=u[i],r[i]=1);t[l]=u}else for(const i in s)r[i]=1}for(const s in c)s in n||(n[s]=void 0);return n}function _e(t){return typeof t=="object"&&t!==null?t:{}}function de(t,e,n){const c=t.$$.props[e];c!==void 0&&(t.$$.bound[c]=n,n(t.$$.ctx[c]))}function he(t){t&&t.c()}function me(t,e){t&&t.l(e)}function wt(t,e,n,c){const{fragment:r,on_mount:l,on_destroy:s,after_update:u}=t.$$;r&&r.m(e,n),c||z(()=>{const i=l.map(Q).filter(R);s?s.push(...i):k(i),t.$$.on_mount=[]}),u.forEach(z)}function $t(t,e){const n=t.$$;n.fragment!==null&&(k(n.on_destroy),n.fragment&&n.fragment.d(e),n.on_destroy=n.fragment=null,n.ctx=[])}function kt(t,e){t.$$.dirty[0]===-1&&(w.push(t),tt(),t.$$.dirty.fill(0)),t.$$.dirty[e/31|0]|=1<<e%31}function pe(t,e,n,c,r,l,s,u=[-1]){const i=$;g(t);const o=t.$$={fragment:null,ctx:null,props:l,update:N,not_equal:r,bound:J(),on_mount:[],on_destroy:[],on_disconnect:[],before_update:[],after_update:[],context:new Map(e.context||(i?i.$$.context:[])),callbacks:J(),dirty:u,skip_bound:!1,root:e.target||i.$$.root};s&&s(o.root);let _=!1;if(o.ctx=n?n(t,e.props||{},(d,a,...m)=>{const h=m.length?m[0]:a;return o.ctx&&r(o.ctx[d],o.ctx[d]=h)&&(!o.skip_bound&&o.bound[d]&&o.bound[d](h),_&&kt(t,d)),a}):[],o.update(),_=!0,k(o.before_update),o.fragment=c?c(o.ctx):!1,e.target){if(e.hydrate){st();const d=ht(e.target);o.fragment&&o.fragment.l(d),d.forEach(ft)}else o.fragment&&o.fragment.c();e.intro&&I(t.$$.fragment),wt(t,e.target,e.anchor,e.customElement),lt(),H()}g(i)}class ye{$destroy(){$t(this,1),this.$destroy=N}$on(e,n){const c=this.$$.callbacks[e]||(this.$$.callbacks[e]=[]);return c.push(n),()=>{const r=c.indexOf(n);r!==-1&&c.splice(r,1)}}$set(e){this.$$set&&!rt(e)&&(this.$$.skip_bound=!0,this.$$set(e),this.$$.skip_bound=!1)}}export{Ut as $,_e as A,$t as B,nt as C,ie as D,N as E,At as F,Nt as G,Mt as H,Ct as I,at as J,Pt as K,qt as L,re as M,Wt as N,Xt as O,Ft as P,k as Q,ce as R,ye as S,Ot as T,K as U,dt as V,Kt as W,Gt as X,It as Y,ee as Z,jt as _,ht as a,Et as a0,Tt as a1,Ht as a2,de as a3,se as a4,Lt as a5,St as a6,R as a7,le as a8,ue as a9,ae as aa,oe as ab,Yt as ac,V as b,Jt as c,ft as d,_t as e,Vt as f,Dt as g,pt as h,pe as i,Rt as j,Bt as k,zt as l,Qt as m,bt as n,et as o,xt as p,I as q,ne as r,vt as s,F as t,te as u,Zt as v,he as w,me as x,wt as y,fe as z};
