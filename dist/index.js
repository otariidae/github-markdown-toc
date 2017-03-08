(function p(v,E,k){function w(D,j){if(!E[D]){if(!v[D]){var N="function"==typeof require&&require;if(!j&&N)return N(D,!0);if(O)return O(D,!0);var L=new Error("Cannot find module '"+D+"'");throw L.code="MODULE_NOT_FOUND",L}var C=E[D]={exports:{}};v[D][0].call(C.exports,function(P){var A=v[D][1][P];return w(A?A:P)},C,C.exports,p,v,E,k)}return E[D].exports}for(var O="function"==typeof require&&require,S=0;S<k.length;S++)w(k[S]);return w})({1:[function(p,v){(function(k){"use strict";function w(Q,X){if(Q===X)return 0;for(var Y=Q.length,Z=X.length,$=0,W=Math.min(Y,Z);$<W;++$)if(Q[$]!==X[$]){Y=Q[$],Z=X[$];break}return Y<Z?-1:Z<Y?1:0}function O(Q){return k.Buffer&&"function"==typeof k.Buffer.isBuffer?k.Buffer.isBuffer(Q):!!(null!=Q&&Q._isBuffer)}function S(Q){return Object.prototype.toString.call(Q)}function D(Q){return!O(Q)&&!("function"!=typeof k.ArrayBuffer)&&("function"==typeof ArrayBuffer.isView?ArrayBuffer.isView(Q):!!Q&&(!!(Q instanceof DataView)||Q.buffer&&Q.buffer instanceof ArrayBuffer))}function j(Q){if(H.isFunction(Q)){if(U)return Q.name;var X=Q.toString(),Y=X.match(R);return Y&&Y[1]}}function N(Q,X){return"string"==typeof Q?Q.length<X?Q:Q.slice(0,X):Q}function L(Q){if(U||!H.isFunction(Q))return H.inspect(Q);var X=j(Q),Y=X?": "+X:"";return"[Function"+Y+"]"}function C(Q){return N(L(Q.actual),128)+" "+Q.operator+" "+N(L(Q.expected),128)}function P(Q,X,Y,Z,$){throw new K.AssertionError({message:Y,actual:Q,expected:X,operator:Z,stackStartFunction:$})}function A(Q,X){Q||P(Q,!0,X,"==",K.ok)}function M(Q,X,Y,Z){if(Q===X)return!0;if(O(Q)&&O(X))return 0===w(Q,X);if(H.isDate(Q)&&H.isDate(X))return Q.getTime()===X.getTime();if(H.isRegExp(Q)&&H.isRegExp(X))return Q.source===X.source&&Q.global===X.global&&Q.multiline===X.multiline&&Q.lastIndex===X.lastIndex&&Q.ignoreCase===X.ignoreCase;if((null===Q||"object"!=typeof Q)&&(null===X||"object"!=typeof X))return Y?Q==X:Q==X;if(D(Q)&&D(X)&&S(Q)===S(X)&&!(Q instanceof Float32Array||Q instanceof Float64Array))return 0===w(new Uint8Array(Q.buffer),new Uint8Array(X.buffer));if(O(Q)!==O(X))return!1;Z=Z||{actual:[],expected:[]};var $=Z.actual.indexOf(Q);return-1!==$&&$===Z.expected.indexOf(X)||(Z.actual.push(Q),Z.expected.push(X),T(Q,X,Y,Z))}function q(Q){return"[object Arguments]"==Object.prototype.toString.call(Q)}function T(Q,X,Y,Z){if(null===Q||Q===void 0||null===X||X===void 0)return!1;if(H.isPrimitive(Q)||H.isPrimitive(X))return Q===X;if(Y&&Object.getPrototypeOf(Q)!==Object.getPrototypeOf(X))return!1;var $=q(Q),W=q(X);if($&&!W||!$&&W)return!1;if($)return Q=I.call(Q),X=I.call(X),M(Q,X,Y);var ee=J(Q),te=J(X),ne,se;if(ee.length!==te.length)return!1;for(ee.sort(),te.sort(),se=ee.length-1;0<=se;se--)if(ee[se]!==te[se])return!1;for(se=ee.length-1;0<=se;se--)if(ne=ee[se],!M(Q[ne],X[ne],Y,Z))return!1;return!0}function F(Q,X,Y){M(Q,X,!0)&&P(Q,X,Y,"notDeepStrictEqual",F)}function V(Q,X){if(!Q||!X)return!1;if("[object RegExp]"==Object.prototype.toString.call(X))return X.test(Q);try{if(Q instanceof X)return!0}catch(Y){}return!Error.isPrototypeOf(X)&&!0===X.call({},Q)}function z(Q){var X;try{Q()}catch(Y){X=Y}return X}function G(Q,X,Y,Z){var $;if("function"!=typeof X)throw new TypeError("\"block\" argument must be a function");"string"==typeof Y&&(Z=Y,Y=null),$=z(X),Z=(Y&&Y.name?" ("+Y.name+").":".")+(Z?" "+Z:"."),Q&&!$&&P($,Y,"Missing expected exception"+Z);var W="string"==typeof Z,ee=!Q&&H.isError($),te=!Q&&$&&!Y;if((ee&&W&&V($,Y)||te)&&P($,Y,"Got unwanted exception"+Z),Q&&$&&Y&&!V($,Y)||!Q&&$)throw $}var H=p("util/"),B=Object.prototype.hasOwnProperty,I=Array.prototype.slice,U=function(){return"foo"===function(){}.name}(),K=v.exports=A,R=/\s*function\s+([^\(\s]*)\s*/;K.AssertionError=function(X){this.name="AssertionError",this.actual=X.actual,this.expected=X.expected,this.operator=X.operator,X.message?(this.message=X.message,this.generatedMessage=!1):(this.message=C(this),this.generatedMessage=!0);var Y=X.stackStartFunction||P;if(Error.captureStackTrace)Error.captureStackTrace(this,Y);else{var Z=new Error;if(Z.stack){var $=Z.stack,W=j(Y),ee=$.indexOf("\n"+W);if(0<=ee){var te=$.indexOf("\n",ee+1);$=$.substring(te+1)}this.stack=$}}},H.inherits(K.AssertionError,Error),K.fail=P,K.ok=A,K.equal=function(X,Y,Z){X!=Y&&P(X,Y,Z,"==",K.equal)},K.notEqual=function(X,Y,Z){X==Y&&P(X,Y,Z,"!=",K.notEqual)},K.deepEqual=function(X,Y,Z){M(X,Y,!1)||P(X,Y,Z,"deepEqual",K.deepEqual)},K.deepStrictEqual=function(X,Y,Z){M(X,Y,!0)||P(X,Y,Z,"deepStrictEqual",K.deepStrictEqual)},K.notDeepEqual=function(X,Y,Z){M(X,Y,!1)&&P(X,Y,Z,"notDeepEqual",K.notDeepEqual)},K.notDeepStrictEqual=F,K.strictEqual=function(X,Y,Z){X!==Y&&P(X,Y,Z,"===",K.strictEqual)},K.notStrictEqual=function(X,Y,Z){X===Y&&P(X,Y,Z,"!==",K.notStrictEqual)},K.throws=function(Q,X,Y){G(!0,Q,X,Y)},K.doesNotThrow=function(Q,X,Y){G(!1,Q,X,Y)},K.ifError=function(Q){if(Q)throw Q};var J=Object.keys||function(Q){var X=[];for(var Y in Q)B.call(Q,Y)&&X.push(Y);return X}}).call(this,"undefined"==typeof global?"undefined"==typeof self?"undefined"==typeof window?{}:window:self:global)},{"util/":15}],2:[function(p,v){function k(){this._events=this._events||{},this._maxListeners=this._maxListeners||void 0}function w(j){return"function"==typeof j}function O(j){return"number"==typeof j}function S(j){return"object"==typeof j&&null!==j}function D(j){return void 0===j}v.exports=k,k.EventEmitter=k,k.prototype._events=void 0,k.prototype._maxListeners=void 0,k.defaultMaxListeners=10,k.prototype.setMaxListeners=function(j){if(!O(j)||0>j||isNaN(j))throw TypeError("n must be a positive number");return this._maxListeners=j,this},k.prototype.emit=function(j){var N,L,C,P,A,M;if(this._events||(this._events={}),"error"===j&&(!this._events.error||S(this._events.error)&&!this._events.error.length))if(N=arguments[1],N instanceof Error)throw N;else{var q=new Error("Uncaught, unspecified \"error\" event. ("+N+")");throw q.context=N,q}if(L=this._events[j],D(L))return!1;if(w(L))switch(arguments.length){case 1:L.call(this);break;case 2:L.call(this,arguments[1]);break;case 3:L.call(this,arguments[1],arguments[2]);break;default:P=Array.prototype.slice.call(arguments,1),L.apply(this,P);}else if(S(L))for(P=Array.prototype.slice.call(arguments,1),M=L.slice(),C=M.length,A=0;A<C;A++)M[A].apply(this,P);return!0},k.prototype.addListener=function(j,N){var L;if(!w(N))throw TypeError("listener must be a function");return this._events||(this._events={}),this._events.newListener&&this.emit("newListener",j,w(N.listener)?N.listener:N),this._events[j]?S(this._events[j])?this._events[j].push(N):this._events[j]=[this._events[j],N]:this._events[j]=N,S(this._events[j])&&!this._events[j].warned&&(L=D(this._maxListeners)?k.defaultMaxListeners:this._maxListeners,L&&0<L&&this._events[j].length>L&&(this._events[j].warned=!0,console.error("(node) warning: possible EventEmitter memory leak detected. %d listeners added. Use emitter.setMaxListeners() to increase limit.",this._events[j].length),"function"==typeof console.trace&&console.trace())),this},k.prototype.on=k.prototype.addListener,k.prototype.once=function(j,N){function L(){this.removeListener(j,L),C||(C=!0,N.apply(this,arguments))}if(!w(N))throw TypeError("listener must be a function");var C=!1;return L.listener=N,this.on(j,L),this},k.prototype.removeListener=function(j,N){var L,C,P,A;if(!w(N))throw TypeError("listener must be a function");if(!this._events||!this._events[j])return this;if(L=this._events[j],P=L.length,C=-1,L===N||w(L.listener)&&L.listener===N)delete this._events[j],this._events.removeListener&&this.emit("removeListener",j,N);else if(S(L)){for(A=P;0<A--;)if(L[A]===N||L[A].listener&&L[A].listener===N){C=A;break}if(0>C)return this;1===L.length?(L.length=0,delete this._events[j]):L.splice(C,1),this._events.removeListener&&this.emit("removeListener",j,N)}return this},k.prototype.removeAllListeners=function(j){var N,L;if(!this._events)return this;if(!this._events.removeListener)return 0===arguments.length?this._events={}:this._events[j]&&delete this._events[j],this;if(0===arguments.length){for(N in this._events)"removeListener"!==N&&this.removeAllListeners(N);return this.removeAllListeners("removeListener"),this._events={},this}if(L=this._events[j],w(L))this.removeListener(j,L);else if(L)for(;L.length;)this.removeListener(j,L[L.length-1]);return delete this._events[j],this},k.prototype.listeners=function(j){var N;return N=this._events&&this._events[j]?w(this._events[j])?[this._events[j]]:this._events[j].slice():[],N},k.prototype.listenerCount=function(j){if(this._events){var N=this._events[j];if(w(N))return 1;if(N)return N.length}return 0},k.listenerCount=function(j,N){return j.listenerCount(N)}},{}],3:[function(p,v){(function(k){"use strict";v.exports=function(O,S,D,j,N,L,C,P){if("production"!==k.env.NODE_ENV&&void 0===S)throw new Error("invariant requires an error message argument");if(!O){var A;if(void 0===S)A=new Error("Minified exception occurred; use the non-minified dev environment for the full error message and additional helpful warnings.");else{var M=[D,j,N,L,C,P],q=0;A=new Error("Invariant Violation: "+S.replace(/%s/g,function(){return M[q++]}))}throw A.framesToPop=1,A}}}).call(this,p("_process"))},{_process:12}],4:[function(p,v){v.exports.Dispatcher=p("./lib/Dispatcher")},{"./lib/Dispatcher":5}],5:[function(p,v,E){(function(k){"use strict";function w(j,N){if(!(j instanceof N))throw new TypeError("Cannot call a class as a function")}E.__esModule=!0;var O=p("fbjs/lib/invariant"),D=function(){function j(){w(this,j),this._callbacks={},this._isDispatching=!1,this._isHandled={},this._isPending={},this._lastID=1}return j.prototype.register=function(L){var C="ID_"+this._lastID++;return this._callbacks[C]=L,C},j.prototype.unregister=function(L){this._callbacks[L]?void 0:"production"===k.env.NODE_ENV?O(!1):O(!1,"Dispatcher.unregister(...): `%s` does not map to a registered callback.",L),delete this._callbacks[L]},j.prototype.waitFor=function(L){this._isDispatching?void 0:"production"===k.env.NODE_ENV?O(!1):O(!1,"Dispatcher.waitFor(...): Must be invoked while dispatching.");for(var P,C=0;C<L.length;C++){if(P=L[C],this._isPending[P]){this._isHandled[P]?void 0:"production"===k.env.NODE_ENV?O(!1):O(!1,"Dispatcher.waitFor(...): Circular dependency detected while waiting for `%s`.",P);continue}this._callbacks[P]?void 0:"production"===k.env.NODE_ENV?O(!1):O(!1,"Dispatcher.waitFor(...): `%s` does not map to a registered callback.",P),this._invokeCallback(P)}},j.prototype.dispatch=function(L){this._isDispatching?"production"===k.env.NODE_ENV?O(!1):O(!1,"Dispatch.dispatch(...): Cannot dispatch in the middle of a dispatch."):void 0,this._startDispatching(L);try{for(var C in this._callbacks)this._isPending[C]||this._invokeCallback(C)}finally{this._stopDispatching()}},j.prototype.isDispatching=function(){return this._isDispatching},j.prototype._invokeCallback=function(L){this._isPending[L]=!0,this._callbacks[L](this._pendingPayload),this._isHandled[L]=!0},j.prototype._startDispatching=function(L){for(var C in this._callbacks)this._isPending[C]=!1,this._isHandled[C]=!1;this._pendingPayload=L,this._isDispatching=!0},j.prototype._stopDispatching=function(){delete this._pendingPayload,this._isDispatching=!1},j}();v.exports=D}).call(this,p("_process"))},{_process:12,"fbjs/lib/invariant":3}],6:[function(p,v){"use strict";v.exports={Store:p("./material-store"),StoreGroup:p("./material-store-group"),Action:p("./material-action"),Context:p("./material-context")}},{"./material-action":7,"./material-context":8,"./material-store":10,"./material-store-group":9}],7:[function(p,v,E){(function(k){"use strict";function w(S,D){if(!(S instanceof D))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(E,"__esModule",{value:!0});E["default"]=function S(D){w(this,S),"production"!==k.env.NODE_ENV&&(p("assert")("undefined"!=typeof D,"Constructor arguments is undefined.\n                Please `new "+this.constructor.name+"(context)`\n                "),p("assert")("undefined"!=typeof D.dispatch,"Constructor arguments was unexpected object.\n                Please `new "+this.constructor.name+"(context)`\n                ")),this.dispatch=D.dispatch.bind(D)},v.exports=E["default"]}).call(this,p("_process"))},{_process:12,assert:1}],8:[function(p,v,E){(function(k){"use strict";function O(P,A){if(!(P instanceof A))throw new TypeError("Cannot call a class as a function")}function S(P,A){if("function"!=typeof A&&null!==A)throw new TypeError("Super expression must either be null or a function, not "+typeof A);P.prototype=Object.create(A&&A.prototype,{constructor:{value:P,enumerable:!1,writable:!0,configurable:!0}}),A&&(Object.setPrototypeOf?Object.setPrototypeOf(P,A):P.__proto__=A)}Object.defineProperty(E,"__esModule",{value:!0});var D=p("flux"),j=p("events"),N=p("./material-store.js"),L=function(P){return P&&P.__esModule?P:{"default":P}}(N),C=function(P){function A(){O(this,A),P.call(this),this.dispatcher=new D.Dispatcher,this._stores=[]}return S(A,P),A.prototype._registerStore=function(q){if("production"!==k.env.NODE_ENV&&p("assert")(q instanceof L["default"],"The store'"+q+" is not instance of material-store.\nimport {Store} from \"material-flux\"class UserStore extends Store{ ... }"),!(0<=this._stores.indexOf(q))){var T=this.dispatcher.register(q.handler.bind(q));q._waitFor=this.waitFor.bind(this),q._token=T,this._stores.push(q)}},A.prototype.dispatch=function(q){for(var T=arguments.length,F=Array(1<T?T-1:0),V=1;V<T;V++)F[V-1]=arguments[V];this.dispatcher.dispatch({eventKey:q,args:F}),this.emit("dispatch",{eventKey:q,args:F})},A.prototype.waitFor=function(q){Array.isArray(q)||(q=[q]);var F=q.map(function(z){return z instanceof L["default"]?z._token:z});this.dispatcher.waitFor(F)},A}(j.EventEmitter);E["default"]=C,v.exports=E["default"]}).call(this,p("_process"))},{"./material-store.js":10,_process:12,assert:1,events:2,flux:4}],9:[function(p,v,E){(function(k){"use strict";function O(L,C){if(!(L instanceof C))throw new TypeError("Cannot call a class as a function")}function S(L){(0,j["default"])(L&&L.length,"Must provide at least one store to FluxStoreGroup");var C=L[0].context.dispatcher;return"production"!==k.env.NODE_ENV&&L.forEach(function(P){(0,j["default"])(P.context.dispatcher===C,"All stores in a FluxStoreGroup must use the same dispatcher")}),C}Object.defineProperty(E,"__esModule",{value:!0});var D=p("assert"),j=function(L){return L&&L.__esModule?L:{"default":L}}(D),N=function(){function L(C,P){var A=this;O(this,L),this._dispatcher=S(C);var M=C.map(function(q){return(0,j["default"])(q._token,q.constructor.name+" never register key.\nclass "+q.constructor.name+" extends Store {\n    constructor(..args){\n        super(..args);\n        // Needed!\n        this.register(key, handler);\n    }\n}\n            "),q._token});this._dispatchToken=this._dispatcher.register(function(){A._dispatcher.waitFor(M),P()})}return L.prototype.release=function(){this._dispatcher.unregister(this._dispatchToken)},L}();E["default"]=N,v.exports=E["default"]}).call(this,p("_process"))},{_process:12,assert:1}],10:[function(p,v,E){(function(k){"use strict";function O(C,P){if(!(C instanceof P))throw new TypeError("Cannot call a class as a function")}function S(C,P){if("function"!=typeof P&&null!==P)throw new TypeError("Super expression must either be null or a function, not "+typeof P);C.prototype=Object.create(P&&P.prototype,{constructor:{value:C,enumerable:!1,writable:!0,configurable:!0}}),P&&(Object.setPrototypeOf?Object.setPrototypeOf(C,P):C.__proto__=P)}Object.defineProperty(E,"__esModule",{value:!0});var D=p("events"),j=p("object-assign"),N=function(C){return C&&C.__esModule?C:{"default":C}}(j),L=function(C){function P(A){O(this,P),C.call(this),"production"!==k.env.NODE_ENV&&p("assert")("undefined"!=typeof A,"Constructor arguments is undefined.\n                Please `new "+this.constructor.name+"(context)`\n                "),this.context=A,this.state=void 0,this._handlers={}}return S(P,C),P.prototype.register=function(M,q){"production"!==k.env.NODE_ENV&&(p("assert")("undefined"!=typeof this.context,"Failed register event handler to store.\n                 \""+this.constructor.name+"\" has not context.\n                 Please `new "+this.constructor.name+"(context)`"),p("assert")("undefined"!=typeof M,"register Error: \"eventKey\" is undefined.\n                Failed register event handler to store with eventKey.\n                Please register(eventKey, handler);\n                ")),"function"!=typeof q||(this._handlers[M]=q.bind(this),this.context._registerStore(this))},P.prototype.handler=function(M){var q=M.args,T=M.eventKey;if("function"==typeof this._handlers[T]){var A=this._handlers[T];A.apply(this,q)}},P.prototype.onChange=function(M){return this.on("change",M),this.removeChangeListener.bind(this,M)},P.prototype.removeChangeListener=function(M){this.removeListener("change",M)},P.prototype.removeAllChangeListeners=function(){this.removeAllListeners("change")},P.prototype.waitFor=function(M){this._waitFor(M)},P.prototype.getState=function(){return(0,N["default"])({},this.state)},P.prototype.setState=function(M){"undefined"==typeof this.state&&(this.state={}),this.state=(0,N["default"])({},this.state,M),this.emitChange()},P.prototype.emitChange=function(){this.emit("change")},P}(D.EventEmitter);E["default"]=L,v.exports=E["default"]}).call(this,p("_process"))},{_process:12,assert:1,events:2,"object-assign":11}],11:[function(p,v){"use strict";function k(j){if(null===j||j===void 0)throw new TypeError("Object.assign cannot be called with null or undefined");return Object(j)}var O=Object.getOwnPropertySymbols,S=Object.prototype.hasOwnProperty,D=Object.prototype.propertyIsEnumerable;v.exports=function(){try{if(!Object.assign)return!1;var j=new String("abc");if(j[5]="de","5"===Object.getOwnPropertyNames(j)[0])return!1;for(var N={},L=0;10>L;L++)N["_"+String.fromCharCode(L)]=L;var C=Object.getOwnPropertyNames(N).map(function(A){return N[A]});if("0123456789"!==C.join(""))return!1;var P={};return"abcdefghijklmnopqrst".split("").forEach(function(A){P[A]=A}),"abcdefghijklmnopqrst"===Object.keys(Object.assign({},P)).join("")}catch(A){return!1}}()?Object.assign:function(j){for(var L,P,C=k(j),A=1;A<arguments.length;A++){for(var M in L=Object(arguments[A]),L)S.call(L,M)&&(C[M]=L[M]);if(O){P=O(L);for(var q=0;q<P.length;q++)D.call(L,P[q])&&(C[P[q]]=L[P[q]])}}return C}},{}],12:[function(p,v){function k(){throw new Error("setTimeout has not been defined")}function w(){throw new Error("clearTimeout has not been defined")}function O(V){if(P===setTimeout)return setTimeout(V,0);if((P===k||!P)&&setTimeout)return P=setTimeout,setTimeout(V,0);try{return P(V,0)}catch(z){try{return P.call(null,V,0)}catch(G){return P.call(this,V,0)}}}function S(V){if(A===clearTimeout)return clearTimeout(V);if((A===w||!A)&&clearTimeout)return A=clearTimeout,clearTimeout(V);try{return A(V)}catch(z){try{return A.call(null,V)}catch(G){return A.call(this,V)}}}function D(){q&&T&&(q=!1,T.length?M=T.concat(M):F=-1,M.length&&j())}function j(){if(!q){var V=O(D);q=!0;for(var z=M.length;z;){for(T=M,M=[];++F<z;)T&&T[F].run();F=-1,z=M.length}T=null,q=!1,S(V)}}function N(V,z){this.fun=V,this.array=z}function L(){}var C=v.exports={},P,A;(function(){try{P="function"==typeof setTimeout?setTimeout:k}catch(V){P=k}try{A="function"==typeof clearTimeout?clearTimeout:w}catch(V){A=w}})();var M=[],q=!1,T,F=-1;C.nextTick=function(V){var z=Array(arguments.length-1);if(1<arguments.length)for(var G=1;G<arguments.length;G++)z[G-1]=arguments[G];M.push(new N(V,z)),1!==M.length||q||O(j)},N.prototype.run=function(){this.fun.apply(null,this.array)},C.title="browser",C.browser=!0,C.env={},C.argv=[],C.version="",C.versions={},C.on=L,C.addListener=L,C.once=L,C.off=L,C.removeListener=L,C.removeAllListeners=L,C.emit=L,C.binding=function(){throw new Error("process.binding is not supported")},C.cwd=function(){return"/"},C.chdir=function(){throw new Error("process.chdir is not supported")},C.umask=function(){return 0}},{}],13:[function(p,v){v.exports="function"==typeof Object.create?function(w,O){w.super_=O,w.prototype=Object.create(O.prototype,{constructor:{value:w,enumerable:!1,writable:!0,configurable:!0}})}:function(w,O){w.super_=O;var S=function(){};S.prototype=O.prototype,w.prototype=new S,w.prototype.constructor=w}},{}],14:[function(p,v){v.exports=function(w){return w&&"object"==typeof w&&"function"==typeof w.copy&&"function"==typeof w.fill&&"function"==typeof w.readUInt8}},{}],15:[function(p,v,E){(function(k,w){function O(se,ae){var oe={seen:[],stylize:D};return 3<=arguments.length&&(oe.depth=arguments[2]),4<=arguments.length&&(oe.colors=arguments[3]),T(ae)?oe.showHidden=ae:ae&&E._extend(oe,ae),B(oe.showHidden)&&(oe.showHidden=!1),B(oe.depth)&&(oe.depth=2),B(oe.colors)&&(oe.colors=!1),B(oe.customInspect)&&(oe.customInspect=!0),oe.colors&&(oe.stylize=S),N(oe,se,oe.depth)}function S(se,ae){var oe=O.styles[ae];return oe?"\x1B["+O.colors[oe][0]+"m"+se+"\x1B["+O.colors[oe][1]+"m":se}function D(se){return se}function j(se){var ae={};return se.forEach(function(oe){ae[oe]=!0}),ae}function N(se,ae,oe){if(se.customInspect&&ae&&J(ae.inspect)&&ae.inspect!==E.inspect&&!(ae.constructor&&ae.constructor.prototype===ae)){var ie=ae.inspect(oe,se);return G(ie)||(ie=N(se,ie,oe)),ie}var le=L(se,ae);if(le)return le;var pe=Object.keys(ae),ce=j(pe);if(se.showHidden&&(pe=Object.getOwnPropertyNames(ae)),R(ae)&&(0<=pe.indexOf("message")||0<=pe.indexOf("description")))return C(ae);if(0===pe.length){if(J(ae)){var de=ae.name?": "+ae.name:"";return se.stylize("[Function"+de+"]","special")}if(I(ae))return se.stylize(RegExp.prototype.toString.call(ae),"regexp");if(K(ae))return se.stylize(Date.prototype.toString.call(ae),"date");if(R(ae))return C(ae)}var ue="",fe=!1,ge=["{","}"];if(q(ae)&&(fe=!0,ge=["[","]"]),J(ae)){var he=ae.name?": "+ae.name:"";ue=" [Function"+he+"]"}if(I(ae)&&(ue=" "+RegExp.prototype.toString.call(ae)),K(ae)&&(ue=" "+Date.prototype.toUTCString.call(ae)),R(ae)&&(ue=" "+C(ae)),0===pe.length&&(!fe||0==ae.length))return ge[0]+ue+ge[1];if(0>oe)return I(ae)?se.stylize(RegExp.prototype.toString.call(ae),"regexp"):se.stylize("[Object]","special");se.seen.push(ae);var _e;return _e=fe?P(se,ae,oe,ce,pe):pe.map(function(ye){return A(se,ae,oe,ce,ye,fe)}),se.seen.pop(),M(_e,ue,ge)}function L(se,ae){if(B(ae))return se.stylize("undefined","undefined");if(G(ae)){var oe="'"+JSON.stringify(ae).replace(/^"|"$/g,"").replace(/'/g,"\\'").replace(/\\"/g,"\"")+"'";return se.stylize(oe,"string")}return z(ae)?se.stylize(""+ae,"number"):T(ae)?se.stylize(""+ae,"boolean"):F(ae)?se.stylize("null","null"):void 0}function C(se){return"["+Error.prototype.toString.call(se)+"]"}function P(se,ae,oe,ie,le){for(var pe=[],ce=0,de=ae.length;ce<de;++ce)$(ae,ce+"")?pe.push(A(se,ae,oe,ie,ce+"",!0)):pe.push("");return le.forEach(function(ue){ue.match(/^\d+$/)||pe.push(A(se,ae,oe,ie,ue,!0))}),pe}function A(se,ae,oe,ie,le,pe){var ce,de,ue;if(ue=Object.getOwnPropertyDescriptor(ae,le)||{value:ae[le]},ue.get?ue.set?de=se.stylize("[Getter/Setter]","special"):de=se.stylize("[Getter]","special"):ue.set&&(de=se.stylize("[Setter]","special")),$(ie,le)||(ce="["+le+"]"),de||(0>se.seen.indexOf(ue.value)?(de=F(oe)?N(se,ue.value,null):N(se,ue.value,oe-1),-1<de.indexOf("\n")&&(pe?de=de.split("\n").map(function(fe){return"  "+fe}).join("\n").substr(2):de="\n"+de.split("\n").map(function(fe){return"   "+fe}).join("\n"))):de=se.stylize("[Circular]","special")),B(ce)){if(pe&&le.match(/^\d+$/))return de;ce=JSON.stringify(""+le),ce.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)?(ce=ce.substr(1,ce.length-2),ce=se.stylize(ce,"name")):(ce=ce.replace(/'/g,"\\'").replace(/\\"/g,"\"").replace(/(^"|"$)/g,"'"),ce=se.stylize(ce,"string"))}return ce+": "+de}function M(se,ae,oe){var ie=0,le=se.reduce(function(pe,ce){return ie++,0<=ce.indexOf("\n")&&ie++,pe+ce.replace(/\u001b\[\d\d?m/g,"").length+1},0);return 60<le?oe[0]+(""===ae?"":ae+"\n ")+" "+se.join(",\n  ")+" "+oe[1]:oe[0]+ae+" "+se.join(", ")+" "+oe[1]}function q(se){return Array.isArray(se)}function T(se){return"boolean"==typeof se}function F(se){return null===se}function z(se){return"number"==typeof se}function G(se){return"string"==typeof se}function B(se){return void 0===se}function I(se){return U(se)&&"[object RegExp]"===X(se)}function U(se){return"object"==typeof se&&null!==se}function K(se){return U(se)&&"[object Date]"===X(se)}function R(se){return U(se)&&("[object Error]"===X(se)||se instanceof Error)}function J(se){return"function"==typeof se}function X(se){return Object.prototype.toString.call(se)}function Y(se){return 10>se?"0"+se.toString(10):se.toString(10)}function Z(){var se=new Date,ae=[Y(se.getHours()),Y(se.getMinutes()),Y(se.getSeconds())].join(":");return[se.getDate(),ne[se.getMonth()],ae].join(" ")}function $(se,ae){return Object.prototype.hasOwnProperty.call(se,ae)}var W=/%[sdj%]/g;E.format=function(se){if(!G(se)){for(var ae=[],oe=0;oe<arguments.length;oe++)ae.push(O(arguments[oe]));return ae.join(" ")}for(var oe=1,ie=arguments,le=ie.length,pe=(se+"").replace(W,function(de){if("%%"===de)return"%";if(oe>=le)return de;switch(de){case"%s":return ie[oe++]+"";case"%d":return+ie[oe++];case"%j":try{return JSON.stringify(ie[oe++])}catch(ue){return"[Circular]"}default:return de;}}),ce=ie[oe];oe<le;ce=ie[++oe])pe+=F(ce)||!U(ce)?" "+ce:" "+O(ce);return pe},E.deprecate=function(se,ae){if(B(w.process))return function(){return E.deprecate(se,ae).apply(this,arguments)};if(!0===k.noDeprecation)return se;var ie=!1;return function(){if(!ie){if(k.throwDeprecation)throw new Error(ae);else k.traceDeprecation?console.trace(ae):console.error(ae);ie=!0}return se.apply(this,arguments)}};var ee={},te;E.debuglog=function(se){if(B(te)&&(te=k.env.NODE_DEBUG||""),se=se.toUpperCase(),!ee[se])if(new RegExp("\\b"+se+"\\b","i").test(te)){var ae=k.pid;ee[se]=function(){var oe=E.format.apply(E,arguments);console.error("%s %d: %s",se,ae,oe)}}else ee[se]=function(){};return ee[se]},E.inspect=O,O.colors={bold:[1,22],italic:[3,23],underline:[4,24],inverse:[7,27],white:[37,39],grey:[90,39],black:[30,39],blue:[34,39],cyan:[36,39],green:[32,39],magenta:[35,39],red:[31,39],yellow:[33,39]},O.styles={special:"cyan",number:"yellow",boolean:"yellow",undefined:"grey","null":"bold",string:"green",date:"magenta",regexp:"red"},E.isArray=q,E.isBoolean=T,E.isNull=F,E.isNullOrUndefined=function(se){return null==se},E.isNumber=z,E.isString=G,E.isSymbol=function(se){return"symbol"==typeof se},E.isUndefined=B,E.isRegExp=I,E.isObject=U,E.isDate=K,E.isError=R,E.isFunction=J,E.isPrimitive=function(se){return null===se||"boolean"==typeof se||"number"==typeof se||"string"==typeof se||"symbol"==typeof se||"undefined"==typeof se},E.isBuffer=p("./support/isBuffer");var ne=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];E.log=function(){console.log("%s - %s",Z(),E.format.apply(E,arguments))},E.inherits=p("inherits"),E._extend=function(se,ae){if(!ae||!U(ae))return se;for(var oe=Object.keys(ae),ie=oe.length;ie--;)se[oe[ie]]=ae[oe[ie]];return se}}).call(this,p("_process"),"undefined"==typeof global?"undefined"==typeof self?"undefined"==typeof window?{}:window:self:global)},{"./support/isBuffer":14,_process:12,inherits:13}],16:[function(p,v){v.exports={MOVE_TO_PAGE:Symbol("move-to-page"),TOGGLE_NAV:Symbol("toggle-nav")}},{}],17:[function(p,v){const k=p("./action-type.js"),{Action:w}=p("material-flux"),O=p("./check-js-enabled.js"),S=p("./check-page-type.js");v.exports=class extends w{async moveToPage(){let j;const N=S(location.href);j="release"===N?this.fetchReleaseHeader():"code"===N?await this.fetchMarkdownHeader():[];const L=!!j.length,C={headers:j,isAvailable:L};this.dispatch(k.MOVE_TO_PAGE,C)}toggleNav(){this.dispatch(k.TOGGLE_NAV)}fetchReleaseHeader(){const j=document.querySelectorAll(".release-title");return j?Array.from(j).map((N)=>{const{href:L}=N.querySelector("a"),P=N.textContent.trim();return{link:L,tag:"lv1",text:P}}):[]}async fetchMarkdownHeader(){const j=await O(),N=document.querySelector(".markdown-body");if(!N)return[];const L=N.querySelectorAll("h1, h2, h3, h4, h5, h6");return Array.from(L).map((C)=>{let{id:P,href:A}=C.querySelector(".anchor");P=`#${P}`,A=new URL(A).hash;const M=j?A:P,q=C.tagName.replace("H","lv"),T=C.textContent.trim();return{link:M,tag:q,text:T}})}}},{"./action-type.js":16,"./check-js-enabled.js":19,"./check-page-type.js":20,"material-flux":6}],18:[function(p,v){"use strict";function k(V,z){function G(){z.onBtnClicked()}var H=D("div");H.className="github-markdown-toc";var B=!V.isEnabled;S(H,"data-disabled",B);var I=V.isOpen;S(H,"data-open",I);var U=D("nav");L(U,H);var K=D("ol");L(K,U);var R=C();L(R,K);for(var J=V.headers,Q=[],X=0;X<J.length;X+=1)Q[X]=w(V,J,J[X],X,z),Q[X].mount(R.parentNode,R);L(A("\n  "),H);var Y=D("button");return Y.type="button",M(Y,"click",G),Y.className="toggle-btn",L(Y,H),{mount:function(Z,$){N(H,Z,$)},update:function(Z,$){var W;(W=!$.isEnabled)!=B&&(B=W,S(H,"data-disabled",B)),(W=$.isOpen)!==I&&(I=W,S(H,"data-open",I));for(var ee=$.headers,te=0;te<ee.length;te+=1)Q[te]?Q[te].update(Z,$,ee,ee[te],te):(Q[te]=w($,ee,ee[te],te,z),Q[te].mount(R.parentNode,R));P(Q,!0,ee.length),Q.length=ee.length},teardown:function(Z){P(Q,!1),q(Y,"click",G),Z&&j(H)}}}function w(V,z,G){var I=D("li"),U=G.tag;I.className=U;var K=D("a"),R=G.link;K.href=R,L(K,I);var J=G.text,Q=A(J);return L(Q,K),{mount:function(X,Y){N(I,X,Y)},update:function(X,Y,Z,$){var ee;(ee=$.tag)!==U&&(U=ee,I.className=U),(ee=$.link)!==R&&(R=ee,K.href=R),(ee=$.text)!==J&&(Q.data=J=ee)},teardown:function(X){X&&j(I)}}}function O(V){V=V||{},this._state=V.data||{},this._observers={pre:Object.create(null),post:Object.create(null)},this._handlers=Object.create(null),this._root=V._root,this._yield=V._yield,this._torndown=!1,this._fragment=k(this._state,this),V.target&&this._fragment.mount(V.target,null)}function S(V,z,G){V.setAttribute(z,G)}function D(V){return document.createElement(V)}function j(V){V.parentNode.removeChild(V)}function N(V,z,G){z.insertBefore(V,G)}function L(V,z){z.appendChild(V)}function C(){return document.createComment("")}function P(V,z,G){for(var H=G||0;H<V.length;H+=1)V[H].teardown(z)}function A(V){return document.createTextNode(V)}function M(V,z,G){V.addEventListener(z,G,!1)}function q(V,z,G){V.removeEventListener(z,G,!1)}function T(V,z,G,H){for(var B in z)if(B in G){var I=G[B],U=H[B];if(I!==U||"object"==typeof I){var K=z[B];if(K)for(var J,R=0;R<K.length;R+=1)J=K[R],J.__calling||(J.__calling=!0,J.call(V,I,U),J.__calling=!1)}}}var F=function(){return{methods:{onBtnClicked(){this.get("isEnabled")&&this.fire("toggle-nav")}}}}();O.prototype=F.methods,O.prototype.get=function(z){return z?this._state[z]:this._state},O.prototype.fire=function(z,G){var H=z in this._handlers&&this._handlers[z].slice();if(H)for(var B=0;B<H.length;B+=1)H[B].call(this,G)},O.prototype.observe=function(z,G,H){var B=H&&H.defer?this._observers.pre:this._observers.post;return(B[z]||(B[z]=[])).push(G),H&&!1===H.init||(G.__calling=!0,G.call(this,this._state[z]),G.__calling=!1),{cancel:function(){var I=B[z].indexOf(G);~I&&B[z].splice(I,1)}}},O.prototype.on=function(z,G){var H=this._handlers[z]||(this._handlers[z]=[]);return H.push(G),{cancel:function(){var B=H.indexOf(G);~B&&H.splice(B,1)}}},O.prototype.set=function(z){this._set(z),(this._root||this)._flush()},O.prototype._flush=function(){if(this._renderHooks)for(;this._renderHooks.length;){var z=this._renderHooks.pop();z.fn.call(z.context)}},O.prototype._set=function(z){var G=this._state;this._state=Object.assign({},G,z),T(this,this._observers.pre,z,G),this._fragment&&this._fragment.update(z,this._state),T(this,this._observers.post,z,G)},O.prototype.teardown=O.prototype.destroy=function(z){this.fire("teardown"),this._fragment.teardown(!1!==z),this._fragment=null,this._state={},this._torndown=!0},v.exports=O},{}],19:[function(p,v){v.exports=function(){return new Promise((w)=>{chrome.runtime.sendMessage({type:"is-js-enabled"},w)})}},{}],20:[function(p,v){v.exports=function(w){const{pathname:O}=new URL(w),[,S,D,...j]=O.split("/");if("releases"===j[0]&&1===j.length)return"release";return"blob"===j[0]||"tree"===j[0]||S&&D&&!j.length?"code":"unknown"}},{}],21:[function(p,v){const k=p("./action.js"),w=p("./store.js"),{Context:O}=p("material-flux");v.exports=class extends O{constructor(){super(),this.action=new k(this),this.store=new w(this)}}},{"./action.js":17,"./store.js":23,"material-flux":6}],22:[function(p){"use strict";const k=p("./app.html"),w=p("./context.js"),O=new w,S="githubMarkdownTocOpen",D=document.body,j=document.createElement("github-markdown-toc-container"),N=new k({data:O.store.getState(),target:j});D.appendChild(j),O.store.onChange(()=>{N.set(O.store.getState())}),O.store.onChange(()=>{const{isOpen:L}=O.store.getState();L?D.dataset[S]="":delete D.dataset[S]}),N.on("toggle-nav",O.action.toggleNav.bind(O.action)),window.addEventListener("pjax:end",O.action.moveToPage.bind(O.action)),O.action.moveToPage()},{"./app.html":18,"./context.js":21}],23:[function(p,v){const{Store:k}=p("material-flux"),w=p("./action-type.js");v.exports=class extends k{constructor(S){super(S),this.state={isOpen:!1,isEnabled:!1,headers:[]},this.register(w.MOVE_TO_PAGE,this.toPage),this.register(w.TOGGLE_NAV,this.toggleNav)}toPage({isAvailable:S,headers:D}){this.setState({headers:D,isEnabled:S,isOpen:!!S&&this.state.isOpen})}toggleNav(){this.setState({isOpen:!this.state.isOpen})}}},{"./action-type.js":16,"material-flux":6}]},{},[22]);