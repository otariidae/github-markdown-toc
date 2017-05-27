!function(){'use strict';function c(a){for(var b=1;b<arguments.length;b+=1){var c=arguments[b];for(var d in c)a[d]=c[d]}return a}function d(a,b){b.appendChild(a)}function e(a,b,c){b.insertBefore(a,c)}function h(a){a.parentNode.removeChild(a)}function i(a,b,c){for(var d=c;d<a.length;d+=1)a[d]&&a[d].destroy(b)}function j(a){return document.createElement(a)}function k(a){return document.createTextNode(a)}function l(a,b,c){a.addEventListener(b,c,!1)}function m(a,b,c){a.removeEventListener(b,c,!1)}function n(a,b,c){a.setAttribute(b,c)}function p(a,b){return a!==b||(a&&typeof a==='object'||typeof a==='function')}function q(a,b,c,d){for(var e in b){if(!(e in c))continue;var f=c[e],g=d[e];if(p(f,g)){var h=b[e];if(!h)continue;for(var i=0;i<h.length;i+=1){var j=h[i];if(j.__calling)continue;j.__calling=!0;j.call(a,f,g);j.__calling=!1}}}}function r(a){return a?this._state[a]:this._state}function s(a,b){var c=a in this._handlers&&this._handlers[a].slice();if(!c)return;for(var d=0;d<c.length;d+=1)c[d].call(this,b)}function t(a,b,c){var d=c&&c.defer?this._observers.post:this._observers.pre;(d[a]||(d[a]=[])).push(b);(!c||c.init!==!1)&&(b.__calling=!0,b.call(this,this._state[a]),b.__calling=!1);return{cancel:function(){var c=d[a].indexOf(b);~c&&d[a].splice(c,1)}}}function u(a,b){if(a==='teardown')return this.on('destroy',b);var c=this._handlers[a]||(this._handlers[a]=[]);c.push(b);return{cancel:function(){var a=c.indexOf(b);~a&&c.splice(a,1)}}}function v(a){this._set(c({},a));this._root._flush()}function w(){if(!this._renderHooks)return;while(this._renderHooks.length)this._renderHooks.pop()()}var x={get:r,fire:s,observe:t,on:u,set:v,_flush:w},y=function(){return{methods:{onBtnClicked(){this.get('isEnabled')&&this.fire('toggle-nav')}}}}();function z(a,b){var c,f,g,o,p,q=j('div');q.className="github-markdown-toc";n(q,'aria-disabled',c=!a.isEnabled);n(q,'aria-busy',f=a.isLoading);n(q,'data-open',g=a.isOpen);var r=j('nav');d(r,q);r.id="github-markdown-toc__nav-panel";n(r,'aria-hidden',o=!a.isOpen);var s=j('ol');d(s,r);var t=a.headers,u=[];for(var v=0;v<t.length;v+=1)u[v]=A(a,t,t[v],v,b),u[v].mount(s,null);d(k("\n  "),q);var w=j('button');d(w,q);w.type="button";w.className="toggle-btn";n(w,'aria-controls',"github-markdown-toc__nav-panel");w.disabled=p=!a.isEnabled;function x(a){b.onBtnClicked()}l(w,'click',x);return{mount:function(a,b){e(q,a,b)},update:function(a,d){c!==(c=!d.isEnabled)&&n(q,'aria-disabled',c);f!==(f=d.isLoading)&&n(q,'aria-busy',f);g!==(g=d.isOpen)&&n(q,'data-open',g);o!==(o=!d.isOpen)&&n(r,'aria-hidden',o);var e=d.headers;if('headers' in a){for(var h=0;h<e.length;h+=1)u[h]?u[h].update(a,d,e,e[h],h):(u[h]=A(d,e,e[h],h,b),u[h].mount(s,null));i(u,!0,e.length);u.length=e.length}p!==(p=!d.isEnabled)&&(w.disabled=p)},destroy:function(a){i(u,!1,0);m(w,'click',x);a&&h(q)}}}function A(a,b,c,f,g){var i,l,m,o=j('li');n(o,'data-level',i=c.level);var p=j('a');d(p,o);p.href=l=c.link;var q=k(m=c.text);d(q,p);return{mount:function(a,b){e(o,a,b)},update:function(a,b,c,d,e){i!==(i=d.level)&&n(o,'data-level',i);l!==(l=d.link)&&(p.href=l);m!==(m=d.text)&&(q.data=m)},destroy:function(a){a&&h(o)}}}function B(a){a=a||{};this._state=a.data||{};this._observers={pre:Object.create(null),post:Object.create(null)};this._handlers=Object.create(null);this._root=a._root||this;this._yield=a._yield;this._torndown=!1;this._fragment=z(this._state,this);a.target&&this._fragment.mount(a.target,null)}c(B.prototype,y.methods,x);B.prototype._set=function b(a){var d=this._state;this._state=c({},d,a);q(this,this._observers.pre,a,d);this._fragment.update(a,this._state);q(this,this._observers.post,a,d)};B.prototype.teardown=B.prototype.destroy=function b(a){this.fire('destroy');this._fragment.destroy(a!==!1);this._fragment=null;this._state={};this._torndown=!0};class C{constructor(){this._handlers=new Map()}on(a,b){this._handlers.has(a)||this._handlers.set(a,new Set());this._handlers.get(a).add(b)}off(a,b){if(!this._handlers.has(a)){return !1}return this._handlers.get(a).delete(b)}emit(a,b){this._handlers.has(a)&&this._handlers.get(a).forEach(a=>a(b))}}function D(a){if(!a){return !1}let b=Object.getPrototypeOf(a);return Object.prototype.toString.call(a)==='[object Object]'&&(b===Object.getPrototypeOf({})||b===null)}function E(a){let b={};Object.entries(a).forEach(([a,c])=>{D(c)&&(b[a]=E(c))});return Object.assign({},a,b)}function F(a,...b){let c=b.map(a=>D(a)?E(a):a);return Object.assign(a,...c)}let G=Symbol('on-change');class H{constructor(a){this._dispatcher=a}dispatch(a,b){this._dispatcher.emit(a,b)}}class I extends C{constructor(a){super();this._state={};this._dispatcher=a}setState(a){this._state=F({},this._state,a);this.emit(G)}getState(){return F({},this._state)}register(a,b){this._dispatcher.on(a,b)}onChange(a){this.on(G,a)}removeChangeListener(a){return this.off(G,a)}}let J=C;function K(a){return function c(b){return b[a]}}function L(a){return function c(b){return b.map(a)}}function M(a){return function c(b){return b.filter(a)}}function N(a,b){return function(...c){return b(a(...c))}}function O(...a){return a.reduce(N)}function P(a,b,c){return{link:a,level:b,text:c}}function Q(a){return function c(b){return b.querySelectorAll(a)}}function R(a){return O(Q(a),Array.from)}let S=O(K('textContent'),Boolean),T=M(S),U=R('h1, h2, h3, h4, h5, h6');class V{constructor(a){this.RELEASE=Symbol('release');this.CODE=Symbol('code');this.WIKI=Symbol('wiki');this.UNKNOWN=Symbol('unknown');let{pathname:b}=new URL(a),[,c,d,e,...f]=b.split('/');e==='releases'&&f.length===0?(this._type=this.RELEASE):e==='blob'||e==='tree'||c&&d&&!e?(this._type=this.CODE):e==='wiki'?(this._type=this.WIKI):(this._type=this.UNKNOWN)}getType(){return this._type}isReleasePage(){return this._type===this.RELEASE}isCodePage(){return this._type===this.CODE}isWikiPage(){return this._type===this.WIKI}isUnknownPage(){return this._type===this.UNKNOWN}}function W(){return new Promise(a=>{chrome.runtime.sendMessage({type:'is-js-enabled'},a)})}class X{constructor(){this.headers=[]}async getHeaderList(){return this.headers}static createFromUrl(a){let b=new V(a);if(b.isReleasePage())return new Y();if(b.isCodePage())return new Z();if(b.isWikiPage())return new _();return new $()}}class Y extends X{constructor(){super();this.headers=R('.release-title')(document)}async getHeaderList(){return O(T,(L(a=>{let{href: b}=a.querySelector('a'),c=1,d=a.textContent.trim();return P(b,c,d)})))(this.headers)}}class Z extends X{constructor(){super();let a=document.querySelector('.markdown-body');this.headers=a?U(a):this.headers}async getHeaderList(){let a=await W();return O(T,(L(b=>{let{id:c,href:d}=b.querySelector('.anchor');c=`#${c}`;d=new URL(d).hash;let e=a?d:c,f=Number(b.tagName[1]),g=b.textContent.trim();return P(e,f,g)})))(this.headers)}}class _ extends X{constructor(){super();let a=document.querySelector('.wiki-body .markdown-body');this.headers=a?U(a):this.headers}async getHeaderList(){let a=await W();return O(T,(L(b=>{let{id:c,href:d}=b.querySelector('.anchor');c=`#${c}`;d=new URL(d).hash;let e=a?d:c,f=Number(b.tagName[1]),g=b.textContent.trim();return P(e,f,g)})))(this.headers)}}class $ extends X{}let aa={START_LOADING:Symbol('start-loading'),MOVE_TO_PAGE:Symbol('move-to-page'),TOGGLE_NAV:Symbol('toggle-nav')};class ab extends H{startLoading(){this.dispatch(aa.START_LOADING)}async moveToPage(){let a=X.createFromUrl(location.href),b=await a.getHeaderList(),c=Boolean(b.length),d={headers:b,isAvailable:c};this.dispatch(aa.MOVE_TO_PAGE,d)}toggleNav(){this.dispatch(aa.TOGGLE_NAV)}}class ac extends I{constructor(a){super(a);this.setState({isLoading:!1,isOpen:!1,isEnabled:!1,headers:[]});this.register(aa.START_LOADING,this.loading.bind(this));this.register(aa.MOVE_TO_PAGE,this.toPage.bind(this));this.register(aa.TOGGLE_NAV,this.toggleNav.bind(this))}loading(){this.setState({isLoading:!0})}toPage({isAvailable:a,headers:b}){this.setState({headers:b,isLoading:!1,isEnabled:a,isOpen:a?this.getState().isOpen:!1})}toggleNav(){this.setState({isOpen:!this.getState().isOpen})}}let ad=new J(),ae=new ab(ad),af=new ac(ad),ag='githubMarkdownTocOpen',ah=document.body,ai=document.createElement('github-markdown-toc-container'),aj=new B({data:af.getState(),target:ai});ah.appendChild(ai);af.onChange(()=>{aj.set(af.getState())});af.onChange(()=>{let{isOpen:a}=af.getState();a?(ah.dataset[ag]=''):delete ah.dataset[ag]});aj.on('toggle-nav',ae.toggleNav.bind(ae));window.addEventListener('pjax:start',ae.startLoading.bind(ae));window.addEventListener('pjax:end',ae.moveToPage.bind(ae));ae.moveToPage()}()
//# sourceMappingURL=index.js.map
