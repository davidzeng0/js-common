'use strict';

var cookie = require('cookie');
var D = require('node-fetch');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var D__default = /*#__PURE__*/_interopDefault(D);

var B=Object.defineProperty;var r=(s,t)=>B(s,"name",{value:t,configurable:!0});var c={fromMap(s){var t={};for(var[e,n]of s)t[e]=n;return t},toMap(s){var t=new Map;for(var[e,n]of c.entries(s))t.set(e,n);return t},entries(s){return s instanceof Map?s.entries():Object.entries(s).values()}};var X={parse(s){return cookie.parse(s)},stringify(s){var t=[];for(var[e,n]of c.entries(s))t.push(cookie.serialize(e,n));return t.join("; ")}};var o=class extends Error{simpleMessage;constructor(t,e){if(t instanceof Error){super(t.message),this.name=this.constructor.name,this.simpleMessage=e;return}if(typeof t!="object"){t!==void 0&&(t=t.toString()),super(t),this.name=this.constructor.name,this.simpleMessage=e;return}var n=t??{},a=n.simpleMessage??e;n.error instanceof Error?super(n.error.message):super(n.error??a),this.name=this.constructor.name,this.simpleMessage=a;}userFriendlyMessage(){return this.simpleMessage??"Unknown error"}};r(o,"GenericError");var m=class extends o{constructor(t){super(t,"Network error");}};r(m,"NetworkError");var f=class extends o{constructor(t,e="Error communicating with server"){super(t,e);}};r(f,"HttpError");var d=class extends f{};r(d,"ClientError");var g=class extends f{};r(g,"ServerError");var l=class extends g{};r(l,"InternalServerError");var O=class extends f{};r(O,"ApiError");var u=class extends o{constructor(t){super(t,"Error processing input");}};r(u,"ParseError");var P=class extends o{constructor(t){super(t,"Error serializing input");}};r(P,"SerializeError");var K=class extends o{constructor(t){super(t,"Internal error");}};r(K,"InternalError");var R=class extends o{constructor(t){super(t,"Entity not found");}};r(R,"NotFoundError");var V=class extends o{constructor(t){super(t,"Invalid argument");}};r(V,"InvalidArgumentError");var M=class extends o{constructor(t){super(t,"Function not implemented");}};r(M,"UnimplementedError");var _=class extends o{constructor(t){super(t,"Function not supported");}};r(_,"UnsupportedError");var b=class extends o{constructor(t){super(t,"Permission denied");}};r(b,"PermissionDeniedError");var w=class extends o{constructor(t){super(t,"Rate limited");}};r(w,"RateLimitedError");var N=class extends o{constructor(t){super(t,"Resource unavailable, try again later");}};r(N,"UnavailableError");var S=class extends o{constructor(t){super(t,"Operation timed out");}};r(S,"TimedOutError");var C=class extends o{constructor(t){super(t,"Precondition failed");}};r(C,"PreconditionFailedError");var y=class extends o{constructor(t){super(t,"Operation cancelled");}};r(y,"AbortedError");var A=class extends o{constructor(t){super(t,"Entity already exists");}};r(A,"ExistsError");var H={parse(s){var t=s.split(";"),e=t.shift().trim().split("/");if(e.length!=2)throw new u("Invalid mime type");var n={};for(var a of t){var T=a.trim(),p=T.indexOf("=");if(p==-1)throw new u("Invalid mime type");var E=T.substring(0,p),h=T.substring(p+1);h.charAt(0)==='"'&&h.charAt(h.length-1)==='"'&&(h=h.substring(1,h.length-1)),n[E]=h;}return {type:e[0],subtype:e[1],params:n}},typeEquals(s,t){return typeof s=="string"&&(s=this.parse(s)),typeof t=="string"&&(t=this.parse(t)),s.type==t.type&&s.subtype==t.subtype}};var x={fromKV(s){return new URLSearchParams(Object.entries(s))},toKV(s){s instanceof URLSearchParams||(s=new URLSearchParams(s));var t={};for(var[e,n]of s)t[e]=n;return t},toString(s){return typeof s=="string"?s:(s instanceof URLSearchParams||(s=this.fromKV(s)),s.toString())}},U=class{scheme;host;path_;params_;fragment;constructor(){this.scheme="https",this.path_=[];}setScheme(t){return this.scheme=t,this}setHost(t){return this.host=t,this}setPath(t){this.path_=[],this.addPath(t);}addPath(t){this.path_.push(t);}setParam(t,e){return this.params_||(this.params_={}),this.params_[t]=e,this}setParams(t){if(typeof t=="string"&&(t=x.toKV(t)),!this.params_)t instanceof Map&&(t=c.fromMap(t)),this.params_=t;else {var e=this.params_;for(var[n,a]of c.entries(t))e[n]=a;}return this}setFragment(t){return this.fragment=t,this}get origin(){return `${this.scheme}://${this.host}`}get path(){return `/${this.path_.join("/")}`}get href(){var t="";return this.host!==void 0&&(t+=this.origin),t+=this.path,this.params_!==void 0&&(t+=`?${x.fromKV(this.params_)}`),this.fragment&&(t+=`#${this.fragment}`),t}build(){return this.href}};r(U,"URLBuilder");var I=(i=>(i.GET="GET",i.HEAD="HEAD",i.POST="POST",i.PUT="PUT",i.DELETE="DELETE",i.CONNECT="CONNECT",i.OPTIONS="OPTIONS",i.TRACE="TRACE",i.PATCH="PATCH",i))(I||{}),F=(i=>(i.CONTENT_TYPE="Content-Type",i.AUTHORIZATION="Authorization",i.COOKIE="Cookie",i.SET_COOKIE="Set-Cookie",i.ORIGIN="Origin",i.USER_AGENT="User-Agent",i.CONTENT_LENGTH="Content-Length",i.DATE="Date",i.REFERRER="Referer",i))(F||{}),v=(p=>(p.JSON="application/json",p.URLFORM="application/x-www-form-urlencoded",p.PROTOBUF="application/x-protobuf",p.OCTET_STREAM="application/octet-stream",p.TEXT="text/plain",p.PROTOBUFFER="application/x-protobuffer",p))(v||{});var L=class{method;headers;body;constructor(){this.method="GET";}setMethod(t){this.method=t;}setHeader(t,e){return this.headers||(this.headers={}),this.headers[t]=e,this}setHeaders(t){if(!this.headers)t instanceof Map&&(t=c.fromMap(t)),this.headers=t;else {var e=this.headers;for(var[n,a]of c.entries(t))e[n]=a;}return this}post(t,e){return this.method="POST",this.body=t,e!==void 0&&this.setHeader("Content-Type",e),this}postForm(t){return this.post(x.toString(t),"application/x-www-form-urlencoded")}postJSON(t){return this.post(JSON.stringify(t),"application/json")}postProtobuf(t){return this.post(t,"application/x-protobuf")}postBinary(t){return this.post(t,"application/octet-stream")}async execute(t){var e,n;try{e=await D__default.default(t,{method:this.method,headers:this.headers,body:this.body,compress:!0}),n=await e.arrayBuffer();}catch(a){throw a.name=="AbortError"?new y(a):a instanceof D.FetchError?new m(a):a}return {status:e.status,statusText:e.statusText,ok:e.ok,headers:e.headers,url:e.url,redirected:e.redirected,body:Buffer.from(n)}}};r(L,"Request");

exports.AbortedError = y;
exports.ApiError = O;
exports.ClientError = d;
exports.Cookie = X;
exports.ExistsError = A;
exports.GenericError = o;
exports.HttpContentType = v;
exports.HttpError = f;
exports.HttpHeader = F;
exports.HttpMethod = I;
exports.InternalError = K;
exports.InternalServerError = l;
exports.InvalidArgumentError = V;
exports.KV = c;
exports.Mime = H;
exports.NetworkError = m;
exports.NotFoundError = R;
exports.ParseError = u;
exports.PermissionDeniedError = b;
exports.PreconditionFailedError = C;
exports.RateLimitedError = w;
exports.Request = L;
exports.SerializeError = P;
exports.ServerError = g;
exports.TimedOutError = S;
exports.URLBuilder = U;
exports.URLParams = x;
exports.UnavailableError = N;
exports.UnimplementedError = M;
exports.UnsupportedError = _;
