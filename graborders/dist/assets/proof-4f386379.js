import{g as Xe,j as b,as as Ke,at as Je,af as Qe,R as oe,au as ze,av as et,i as E,W as I,k as s,aw as tt,u as rt,t as ot,L as nt,ax as je,N as at,ay as it}from"./index-3c390b80.js";import{a as st,b as lt,u as ct,y as dt,F as ut}from"./FormErrors-d19bd6fc.js";import{y as R}from"./yupFormSchemas-73599a06.js";import{I as se}from"./InputFormItem-0ad7c3ce.js";import{v as pt}from"./v4-4a60fe23.js";import{m as ft,s as mt,u as ht}from"./memoize.browser.esm-012df344.js";import{u as gt}from"./useDispatch-f272d96f.js";var Be={exports:{}};(function(e,o){(function(t){var r=/^(b|B)$/,n={iec:{bits:["b","Kib","Mib","Gib","Tib","Pib","Eib","Zib","Yib"],bytes:["B","KiB","MiB","GiB","TiB","PiB","EiB","ZiB","YiB"]},jedec:{bits:["b","Kb","Mb","Gb","Tb","Pb","Eb","Zb","Yb"],bytes:["B","KB","MB","GB","TB","PB","EB","ZB","YB"]}},i={iec:["","kibi","mebi","gibi","tebi","pebi","exbi","zebi","yobi"],jedec:["","kilo","mega","giga","tera","peta","exa","zetta","yotta"]};function a(c){var u,l,x,v,w,h,d,m,p,k,g,N,C,j,P,S=1<arguments.length&&arguments[1]!==void 0?arguments[1]:{},f=[],A=0,y=void 0,F=void 0;if(isNaN(c))throw new TypeError("Invalid number");return l=S.bits===!0,g=S.unix===!0,u=S.base||2,k=S.round!==void 0?S.round:g?1:2,h=S.locale!==void 0?S.locale:"",d=S.localeOptions||{},N=S.separator!==void 0?S.separator:"",C=S.spacer!==void 0?S.spacer:g?"":" ",P=S.symbols||{},j=u===2&&S.standard||"jedec",p=S.output||"string",v=S.fullform===!0,w=S.fullforms instanceof Array?S.fullforms:[],y=S.exponent!==void 0?S.exponent:-1,x=2<u?1e3:1024,(m=(F=Number(c))<0)&&(F=-F),(y===-1||isNaN(y))&&(y=Math.floor(Math.log(F)/Math.log(x)))<0&&(y=0),8<y&&(y=8),p==="exponent"?y:(F===0?(f[0]=0,f[1]=g?"":n[j][l?"bits":"bytes"][y]):(A=F/(u===2?Math.pow(2,10*y):Math.pow(1e3,y)),l&&x<=(A*=8)&&y<8&&(A/=x,y++),f[0]=Number(A.toFixed(0<y?k:0)),f[0]===x&&y<8&&S.exponent===void 0&&(f[0]=1,y++),f[1]=u===10&&y===1?l?"kb":"kB":n[j][l?"bits":"bytes"][y],g&&(f[1]=j==="jedec"?f[1].charAt(0):0<y?f[1].replace(/B$/,""):f[1],r.test(f[1])&&(f[0]=Math.floor(f[0]),f[1]=""))),m&&(f[0]=-f[0]),f[1]=P[f[1]]||f[1],h===!0?f[0]=f[0].toLocaleString():0<h.length?f[0]=f[0].toLocaleString(h,d):0<N.length&&(f[0]=f[0].toString().replace(".",N)),p==="array"?f:(v&&(f[1]=w[y]?w[y]:i[j][y]+(l?"bit":"byte")+(f[0]===1?"":"s")),p==="object"?{value:f[0],symbol:f[1],exponent:y}:f.join(C)))}a.partial=function(c){return function(u){return a(u,c)}},e.exports=a})()})(Be);var xt=Be.exports;const bt=Xe(xt);class Ce{static validate(o,t){if(!t)return;if(t.image&&!o.type.startsWith("image"))throw new Error(b("fileUploader.image"));if(t.storage.maxSizeInBytes&&o.size>t.storage.maxSizeInBytes)throw new Error(b("fileUploader.size",bt(t.storage.maxSizeInBytes)));const r=Ne(o.name);if(t.formats&&!t.formats.includes(r))throw new Error(b("fileUploader.formats",t.formats.join(", ")))}static async upload(o,t){try{this.validate(o,t)}catch(l){return Promise.reject(l)}const r=Ne(o.name),n=pt(),i=`${n}.${r}`,{uploadCredentials:a,downloadUrl:c,privateUrl:u}=await this.fetchFileCredentials(i,t);return await this.uploadToServer(o,a),{id:n,name:o.name,sizeInBytes:o.size,publicUrl:a&&a.publicUrl?a.publicUrl:null,privateUrl:u,downloadUrl:c,new:!0}}static async fetchFileCredentials(o,t){const r=Ke.get(),{data:n}=await Je.get(`/tenant/${r}/file/credentials`,{params:{filename:o,storageId:t.storage.id}});return n}static async uploadToServer(o,t){try{const r=t.url,n=new FormData;for(const[i,a]of Object.entries(t.fields||{}))n.append(i,a);return n.append("file",o),Qe.post(r,n,{headers:{"Content-Type":"multipart/form-data"}})}catch(r){throw console.error(r),r}}}function Ne(e){if(!e)return null;const t=/(?:\.([^.]+))?$/.exec(e);return t?t[1]:null}var vt=/^((children|dangerouslySetInnerHTML|key|ref|autoFocus|defaultValue|defaultChecked|innerHTML|suppressContentEditableWarning|suppressHydrationWarning|valueLink|accept|acceptCharset|accessKey|action|allow|allowUserMedia|allowPaymentRequest|allowFullScreen|allowTransparency|alt|async|autoComplete|autoPlay|capture|cellPadding|cellSpacing|challenge|charSet|checked|cite|classID|className|cols|colSpan|content|contentEditable|contextMenu|controls|controlsList|coords|crossOrigin|data|dateTime|decoding|default|defer|dir|disabled|disablePictureInPicture|download|draggable|encType|form|formAction|formEncType|formMethod|formNoValidate|formTarget|frameBorder|headers|height|hidden|high|href|hrefLang|htmlFor|httpEquiv|id|inputMode|integrity|is|keyParams|keyType|kind|label|lang|list|loading|loop|low|marginHeight|marginWidth|max|maxLength|media|mediaGroup|method|min|minLength|multiple|muted|name|nonce|noValidate|open|optimum|pattern|placeholder|playsInline|poster|preload|profile|radioGroup|readOnly|referrerPolicy|rel|required|reversed|role|rows|rowSpan|sandbox|scope|scoped|scrolling|seamless|selected|shape|size|sizes|slot|span|spellCheck|src|srcDoc|srcLang|srcSet|start|step|style|summary|tabIndex|target|title|type|useMap|value|width|wmode|wrap|about|datatype|inlist|prefix|property|resource|typeof|vocab|autoCapitalize|autoCorrect|autoSave|color|inert|itemProp|itemScope|itemType|itemID|itemRef|on|results|security|unselectable|accentHeight|accumulate|additive|alignmentBaseline|allowReorder|alphabetic|amplitude|arabicForm|ascent|attributeName|attributeType|autoReverse|azimuth|baseFrequency|baselineShift|baseProfile|bbox|begin|bias|by|calcMode|capHeight|clip|clipPathUnits|clipPath|clipRule|colorInterpolation|colorInterpolationFilters|colorProfile|colorRendering|contentScriptType|contentStyleType|cursor|cx|cy|d|decelerate|descent|diffuseConstant|direction|display|divisor|dominantBaseline|dur|dx|dy|edgeMode|elevation|enableBackground|end|exponent|externalResourcesRequired|fill|fillOpacity|fillRule|filter|filterRes|filterUnits|floodColor|floodOpacity|focusable|fontFamily|fontSize|fontSizeAdjust|fontStretch|fontStyle|fontVariant|fontWeight|format|from|fr|fx|fy|g1|g2|glyphName|glyphOrientationHorizontal|glyphOrientationVertical|glyphRef|gradientTransform|gradientUnits|hanging|horizAdvX|horizOriginX|ideographic|imageRendering|in|in2|intercept|k|k1|k2|k3|k4|kernelMatrix|kernelUnitLength|kerning|keyPoints|keySplines|keyTimes|lengthAdjust|letterSpacing|lightingColor|limitingConeAngle|local|markerEnd|markerMid|markerStart|markerHeight|markerUnits|markerWidth|mask|maskContentUnits|maskUnits|mathematical|mode|numOctaves|offset|opacity|operator|order|orient|orientation|origin|overflow|overlinePosition|overlineThickness|panose1|paintOrder|pathLength|patternContentUnits|patternTransform|patternUnits|pointerEvents|points|pointsAtX|pointsAtY|pointsAtZ|preserveAlpha|preserveAspectRatio|primitiveUnits|r|radius|refX|refY|renderingIntent|repeatCount|repeatDur|requiredExtensions|requiredFeatures|restart|result|rotate|rx|ry|scale|seed|shapeRendering|slope|spacing|specularConstant|specularExponent|speed|spreadMethod|startOffset|stdDeviation|stemh|stemv|stitchTiles|stopColor|stopOpacity|strikethroughPosition|strikethroughThickness|string|stroke|strokeDasharray|strokeDashoffset|strokeLinecap|strokeLinejoin|strokeMiterlimit|strokeOpacity|strokeWidth|surfaceScale|systemLanguage|tableValues|targetX|targetY|textAnchor|textDecoration|textRendering|textLength|to|transform|u1|u2|underlinePosition|underlineThickness|unicode|unicodeBidi|unicodeRange|unitsPerEm|vAlphabetic|vHanging|vIdeographic|vMathematical|values|vectorEffect|version|vertAdvY|vertOriginX|vertOriginY|viewBox|viewTarget|visibility|widths|wordSpacing|writingMode|x|xHeight|x1|x2|xChannelSelector|xlinkActuate|xlinkArcrole|xlinkHref|xlinkRole|xlinkShow|xlinkTitle|xlinkType|xmlBase|xmlns|xmlnsXlink|xmlLang|xmlSpace|y|y1|y2|yChannelSelector|z|zoomAndPan|for|class|autofocus)|(([Dd][Aa][Tt][Aa]|[Aa][Rr][Ii][Aa]|x)-.*))$/,Ie=ft(function(e){return vt.test(e)||e.charCodeAt(0)===111&&e.charCodeAt(1)===110&&e.charCodeAt(2)<91});function z(){return(z=Object.assign||function(e){for(var o=1;o<arguments.length;o++){var t=arguments[o];for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&(e[r]=t[r])}return e}).apply(this,arguments)}var Ae=function(e,o){for(var t=[e[0]],r=0,n=o.length;r<n;r+=1)t.push(o[r],e[r+1]);return t},ue=function(e){return e!==null&&typeof e=="object"&&(e.toString?e.toString():Object.prototype.toString.call(e))==="[object Object]"&&!ze.typeOf(e)},ee=Object.freeze([]),_=Object.freeze({});function $(e){return typeof e=="function"}function Fe(e){return e.displayName||e.name||"Component"}function ge(e){return e&&typeof e.styledComponentId=="string"}var Y=typeof process<"u"&&({}.REACT_APP_SC_ATTR||{}.SC_ATTR)||"data-styled",xe=typeof window<"u"&&"HTMLElement"in window,yt=!!(typeof SC_DISABLE_SPEEDY=="boolean"?SC_DISABLE_SPEEDY:typeof process<"u"&&{}.REACT_APP_SC_DISABLE_SPEEDY!==void 0&&{}.REACT_APP_SC_DISABLE_SPEEDY!==""?{}.REACT_APP_SC_DISABLE_SPEEDY!=="false"&&{}.REACT_APP_SC_DISABLE_SPEEDY:typeof process<"u"&&{}.SC_DISABLE_SPEEDY!==void 0&&{}.SC_DISABLE_SPEEDY!==""&&{}.SC_DISABLE_SPEEDY!=="false"&&{}.SC_DISABLE_SPEEDY);function H(e){for(var o=arguments.length,t=new Array(o>1?o-1:0),r=1;r<o;r++)t[r-1]=arguments[r];throw new Error("An error occurred. See https://git.io/JUIaE#"+e+" for more information."+(t.length>0?" Args: "+t.join(", "):""))}var St=function(){function e(t){this.groupSizes=new Uint32Array(512),this.length=512,this.tag=t}var o=e.prototype;return o.indexOfGroup=function(t){for(var r=0,n=0;n<t;n++)r+=this.groupSizes[n];return r},o.insertRules=function(t,r){if(t>=this.groupSizes.length){for(var n=this.groupSizes,i=n.length,a=i;t>=a;)(a<<=1)<0&&H(16,""+t);this.groupSizes=new Uint32Array(a),this.groupSizes.set(n),this.length=a;for(var c=i;c<a;c++)this.groupSizes[c]=0}for(var u=this.indexOfGroup(t+1),l=0,x=r.length;l<x;l++)this.tag.insertRule(u,r[l])&&(this.groupSizes[t]++,u++)},o.clearGroup=function(t){if(t<this.length){var r=this.groupSizes[t],n=this.indexOfGroup(t),i=n+r;this.groupSizes[t]=0;for(var a=n;a<i;a++)this.tag.deleteRule(n)}},o.getGroup=function(t){var r="";if(t>=this.length||this.groupSizes[t]===0)return r;for(var n=this.groupSizes[t],i=this.indexOfGroup(t),a=i+n,c=i;c<a;c++)r+=this.tag.getRule(c)+`/*!sc*/
`;return r},e}(),Q=new Map,te=new Map,le=1,K=function(e){if(Q.has(e))return Q.get(e);for(;te.has(le);)le++;var o=le++;return Q.set(e,o),te.set(o,e),o},wt=function(e){return te.get(e)},kt=function(e,o){Q.set(e,o),te.set(o,e)},jt="style["+Y+'][data-styled-version="5.2.1"]',Ct=new RegExp("^"+Y+'\\.g(\\d+)\\[id="([\\w\\d-]+)"\\].*?"([^"]*)'),Nt=function(e,o,t){for(var r,n=t.split(","),i=0,a=n.length;i<a;i++)(r=n[i])&&e.registerName(o,r)},It=function(e,o){for(var t=o.innerHTML.split(`/*!sc*/
`),r=[],n=0,i=t.length;n<i;n++){var a=t[n].trim();if(a){var c=a.match(Ct);if(c){var u=0|parseInt(c[1],10),l=c[2];u!==0&&(kt(l,u),Nt(e,l,c[3]),e.getTag().insertRules(u,r)),r.length=0}else r.push(a)}}},At=function(){return typeof __webpack_nonce__<"u"?__webpack_nonce__:null},_e=function(e){var o=document.head,t=e||o,r=document.createElement("style"),n=function(c){for(var u=c.childNodes,l=u.length;l>=0;l--){var x=u[l];if(x&&x.nodeType===1&&x.hasAttribute(Y))return x}}(t),i=n!==void 0?n.nextSibling:null;r.setAttribute(Y,"active"),r.setAttribute("data-styled-version","5.2.1");var a=At();return a&&r.setAttribute("nonce",a),t.insertBefore(r,i),r},Ft=function(){function e(t){var r=this.element=_e(t);r.appendChild(document.createTextNode("")),this.sheet=function(n){if(n.sheet)return n.sheet;for(var i=document.styleSheets,a=0,c=i.length;a<c;a++){var u=i[a];if(u.ownerNode===n)return u}H(17)}(r),this.length=0}var o=e.prototype;return o.insertRule=function(t,r){try{return this.sheet.insertRule(r,t),this.length++,!0}catch{return!1}},o.deleteRule=function(t){this.sheet.deleteRule(t),this.length--},o.getRule=function(t){var r=this.sheet.cssRules[t];return r!==void 0&&typeof r.cssText=="string"?r.cssText:""},e}(),Et=function(){function e(t){var r=this.element=_e(t);this.nodes=r.childNodes,this.length=0}var o=e.prototype;return o.insertRule=function(t,r){if(t<=this.length&&t>=0){var n=document.createTextNode(r),i=this.nodes[t];return this.element.insertBefore(n,i||null),this.length++,!0}return!1},o.deleteRule=function(t){this.element.removeChild(this.nodes[t]),this.length--},o.getRule=function(t){return t<this.length?this.nodes[t].textContent:""},e}(),Pt=function(){function e(t){this.rules=[],this.length=0}var o=e.prototype;return o.insertRule=function(t,r){return t<=this.length&&(this.rules.splice(t,0,r),this.length++,!0)},o.deleteRule=function(t){this.rules.splice(t,1),this.length--},o.getRule=function(t){return t<this.length?this.rules[t]:""},e}(),Ee=xe,Tt={isServer:!xe,useCSSOMInjection:!yt},Me=function(){function e(t,r,n){t===void 0&&(t=_),r===void 0&&(r={}),this.options=z({},Tt,{},t),this.gs=r,this.names=new Map(n),!this.options.isServer&&xe&&Ee&&(Ee=!1,function(i){for(var a=document.querySelectorAll(jt),c=0,u=a.length;c<u;c++){var l=a[c];l&&l.getAttribute(Y)!=="active"&&(It(i,l),l.parentNode&&l.parentNode.removeChild(l))}}(this))}e.registerId=function(t){return K(t)};var o=e.prototype;return o.reconstructWithOptions=function(t,r){return r===void 0&&(r=!0),new e(z({},this.options,{},t),this.gs,r&&this.names||void 0)},o.allocateGSInstance=function(t){return this.gs[t]=(this.gs[t]||0)+1},o.getTag=function(){return this.tag||(this.tag=(n=(r=this.options).isServer,i=r.useCSSOMInjection,a=r.target,t=n?new Pt(a):i?new Ft(a):new Et(a),new St(t)));var t,r,n,i,a},o.hasNameForId=function(t,r){return this.names.has(t)&&this.names.get(t).has(r)},o.registerName=function(t,r){if(K(t),this.names.has(t))this.names.get(t).add(r);else{var n=new Set;n.add(r),this.names.set(t,n)}},o.insertRules=function(t,r,n){this.registerName(t,r),this.getTag().insertRules(K(t),n)},o.clearNames=function(t){this.names.has(t)&&this.names.get(t).clear()},o.clearRules=function(t){this.getTag().clearGroup(K(t)),this.clearNames(t)},o.clearTag=function(){this.tag=void 0},o.toString=function(){return function(t){for(var r=t.getTag(),n=r.length,i="",a=0;a<n;a++){var c=wt(a);if(c!==void 0){var u=t.names.get(c),l=r.getGroup(a);if(u!==void 0&&l.length!==0){var x=Y+".g"+a+'[id="'+c+'"]',v="";u!==void 0&&u.forEach(function(w){w.length>0&&(v+=w+",")}),i+=""+l+x+'{content:"'+v+`"}/*!sc*/
`}}}return i}(this)},e}(),Rt=/(a)(d)/gi,Pe=function(e){return String.fromCharCode(e+(e>25?39:97))};function pe(e){var o,t="";for(o=Math.abs(e);o>52;o=o/52|0)t=Pe(o%52)+t;return(Pe(o%52)+t).replace(Rt,"$1-$2")}var q=function(e,o){for(var t=o.length;t;)e=33*e^o.charCodeAt(--t);return e},De=function(e){return q(5381,e)};function zt(e){for(var o=0;o<e.length;o+=1){var t=e[o];if($(t)&&!ge(t))return!1}return!0}var Bt=De("5.2.1"),_t=function(){function e(o,t,r){this.rules=o,this.staticRulesId="",this.isStatic=(r===void 0||r.isStatic)&&zt(o),this.componentId=t,this.baseHash=q(Bt,t),this.baseStyle=r,Me.registerId(t)}return e.prototype.generateAndInjectStyles=function(o,t,r){var n=this.componentId,i=[];if(this.baseStyle&&i.push(this.baseStyle.generateAndInjectStyles(o,t,r)),this.isStatic&&!r.hash)if(this.staticRulesId&&t.hasNameForId(n,this.staticRulesId))i.push(this.staticRulesId);else{var a=G(this.rules,o,t,r).join(""),c=pe(q(this.baseHash,a.length)>>>0);if(!t.hasNameForId(n,c)){var u=r(a,"."+c,void 0,n);t.insertRules(n,c,u)}i.push(c),this.staticRulesId=c}else{for(var l=this.rules.length,x=q(this.baseHash,r.hash),v="",w=0;w<l;w++){var h=this.rules[w];if(typeof h=="string")v+=h;else if(h){var d=G(h,o,t,r),m=Array.isArray(d)?d.join(""):d;x=q(x,m+w),v+=m}}if(v){var p=pe(x>>>0);if(!t.hasNameForId(n,p)){var k=r(v,"."+p,void 0,n);t.insertRules(n,p,k)}i.push(p)}}return i.join(" ")},e}(),Mt=/^\s*\/\/.*$/gm,Dt=[":","[",".","#"];function Ot(e){var o,t,r,n,i=e===void 0?_:e,a=i.options,c=a===void 0?_:a,u=i.plugins,l=u===void 0?ee:u,x=new mt(c),v=[],w=function(m){function p(k){if(k)try{m(k+"}")}catch{}}return function(k,g,N,C,j,P,S,f,A,y){switch(k){case 1:if(A===0&&g.charCodeAt(0)===64)return m(g+";"),"";break;case 2:if(f===0)return g+"/*|*/";break;case 3:switch(f){case 102:case 112:return m(N[0]+g),"";default:return g+(y===0?"/*|*/":"")}case-2:g.split("/*|*/}").forEach(p)}}}(function(m){v.push(m)}),h=function(m,p,k){return p===0&&Dt.includes(k[t.length])||k.match(n)?m:"."+o};function d(m,p,k,g){g===void 0&&(g="&");var N=m.replace(Mt,""),C=p&&k?k+" "+p+" { "+N+" }":N;return o=g,t=p,r=new RegExp("\\"+t+"\\b","g"),n=new RegExp("(\\"+t+"\\b){2,}"),x(k||!p?"":p,C)}return x.use([].concat(l,[function(m,p,k){m===2&&k.length&&k[0].lastIndexOf(t)>0&&(k[0]=k[0].replace(r,h))},w,function(m){if(m===-2){var p=v;return v=[],p}}])),d.hash=l.length?l.reduce(function(m,p){return p.name||H(15),q(m,p.name)},5381).toString():"",d}var Oe=oe.createContext();Oe.Consumer;var Le=oe.createContext(),Lt=(Le.Consumer,new Me),fe=Ot();function Ut(){return E.useContext(Oe)||Lt}function qt(){return E.useContext(Le)||fe}var Yt=function(){function e(o,t){var r=this;this.inject=function(n,i){i===void 0&&(i=fe);var a=r.name+i.hash;n.hasNameForId(r.id,a)||n.insertRules(r.id,a,i(r.rules,a,"@keyframes"))},this.toString=function(){return H(12,String(r.name))},this.name=o,this.id="sc-keyframes-"+o,this.rules=t}return e.prototype.getName=function(o){return o===void 0&&(o=fe),this.name+o.hash},e}(),Gt=/([A-Z])/,$t=/([A-Z])/g,Ht=/^ms-/,Vt=function(e){return"-"+e.toLowerCase()};function Te(e){return Gt.test(e)?e.replace($t,Vt).replace(Ht,"-ms-"):e}var Re=function(e){return e==null||e===!1||e===""};function G(e,o,t,r){if(Array.isArray(e)){for(var n,i=[],a=0,c=e.length;a<c;a+=1)(n=G(e[a],o,t,r))!==""&&(Array.isArray(n)?i.push.apply(i,n):i.push(n));return i}if(Re(e))return"";if(ge(e))return"."+e.styledComponentId;if($(e)){if(typeof(l=e)!="function"||l.prototype&&l.prototype.isReactComponent||!o)return e;var u=e(o);return G(u,o,t,r)}var l;return e instanceof Yt?t?(e.inject(t,r),e.getName(r)):e:ue(e)?function x(v,w){var h,d,m=[];for(var p in v)v.hasOwnProperty(p)&&!Re(v[p])&&(ue(v[p])?m.push.apply(m,x(v[p],p)):$(v[p])?m.push(Te(p)+":",v[p],";"):m.push(Te(p)+": "+(h=p,(d=v[p])==null||typeof d=="boolean"||d===""?"":typeof d!="number"||d===0||h in ht?String(d).trim():d+"px")+";"));return w?[w+" {"].concat(m,["}"]):m}(e):e.toString()}function Wt(e){for(var o=arguments.length,t=new Array(o>1?o-1:0),r=1;r<o;r++)t[r-1]=arguments[r];return $(e)||ue(e)?G(Ae(ee,[e].concat(t))):t.length===0&&e.length===1&&typeof e[0]=="string"?e:G(Ae(e,t))}var Zt=function(e,o,t){return t===void 0&&(t=_),e.theme!==t.theme&&e.theme||o||t.theme},Xt=/[!"#$%&'()*+,./:;<=>?@[\\\]^`{|}~-]+/g,Kt=/(^-|-$)/g;function ce(e){return e.replace(Xt,"-").replace(Kt,"")}var Jt=function(e){return pe(De(e)>>>0)};function J(e){return typeof e=="string"&&!0}var me=function(e){return typeof e=="function"||typeof e=="object"&&e!==null&&!Array.isArray(e)},Qt=function(e){return e!=="__proto__"&&e!=="constructor"&&e!=="prototype"};function er(e,o,t){var r=e[t];me(o)&&me(r)?Ue(r,o):e[t]=o}function Ue(e){for(var o=arguments.length,t=new Array(o>1?o-1:0),r=1;r<o;r++)t[r-1]=arguments[r];for(var n=0,i=t;n<i.length;n++){var a=i[n];if(me(a))for(var c in a)Qt(c)&&er(e,a[c],c)}return e}var qe=oe.createContext();qe.Consumer;var de={};function Ye(e,o,t){var r=ge(e),n=!J(e),i=o.attrs,a=i===void 0?ee:i,c=o.componentId,u=c===void 0?function(g,N){var C=typeof g!="string"?"sc":ce(g);de[C]=(de[C]||0)+1;var j=C+"-"+Jt("5.2.1"+C+de[C]);return N?N+"-"+j:j}(o.displayName,o.parentComponentId):c,l=o.displayName,x=l===void 0?function(g){return J(g)?"styled."+g:"Styled("+Fe(g)+")"}(e):l,v=o.displayName&&o.componentId?ce(o.displayName)+"-"+o.componentId:o.componentId||u,w=r&&e.attrs?Array.prototype.concat(e.attrs,a).filter(Boolean):a,h=o.shouldForwardProp;r&&e.shouldForwardProp&&(h=o.shouldForwardProp?function(g,N){return e.shouldForwardProp(g,N)&&o.shouldForwardProp(g,N)}:e.shouldForwardProp);var d,m=new _t(t,v,r?e.componentStyle:void 0),p=m.isStatic&&a.length===0,k=function(g,N){return function(C,j,P,S){var f=C.attrs,A=C.componentStyle,y=C.defaultProps,F=C.foldedComponentIds,ve=C.shouldForwardProp,ye=C.styledComponentId,He=C.target,Se=function(O,ae,ie){O===void 0&&(O=_);var V=z({},ae,{theme:O}),L={};return ie.forEach(function(W){var T,Z,X,U=W;for(T in $(U)&&(U=U(V)),U)V[T]=L[T]=T==="className"?(Z=L[T],X=U[T],Z&&X?Z+" "+X:Z||X):U[T]}),[V,L]}(Zt(j,E.useContext(qe),y)||_,j,f),Ve=Se[0],M=Se[1],we=function(O,ae,ie,V){var L=Ut(),W=qt(),T=ae?O.generateAndInjectStyles(_,L,W):O.generateAndInjectStyles(ie,L,W);return T}(A,S,Ve),We=P,ke=M.$as||j.$as||M.as||j.as||He,Ze=J(ke),ne=M!==j?z({},j,{},M):j,D={};for(var B in ne)B[0]!=="$"&&B!=="as"&&(B==="forwardedAs"?D.as=ne[B]:(ve?ve(B,Ie):!Ze||Ie(B))&&(D[B]=ne[B]));return j.style&&M.style!==j.style&&(D.style=z({},j.style,{},M.style)),D.className=Array.prototype.concat(F,ye,we!==ye?we:null,j.className,M.className).filter(Boolean).join(" "),D.ref=We,E.createElement(ke,D)}(d,g,N,p)};return k.displayName=x,(d=oe.forwardRef(k)).attrs=w,d.componentStyle=m,d.displayName=x,d.shouldForwardProp=h,d.foldedComponentIds=r?Array.prototype.concat(e.foldedComponentIds,e.styledComponentId):ee,d.styledComponentId=v,d.target=r?e.target:e,d.withComponent=function(g){var N=o.componentId,C=function(P,S){if(P==null)return{};var f,A,y={},F=Object.keys(P);for(A=0;A<F.length;A++)f=F[A],S.indexOf(f)>=0||(y[f]=P[f]);return y}(o,["componentId"]),j=N&&N+"-"+(J(g)?g:ce(Fe(g)));return Ye(g,z({},C,{attrs:w,componentId:j}),t)},Object.defineProperty(d,"defaultProps",{get:function(){return this._foldedDefaultProps},set:function(g){this._foldedDefaultProps=r?Ue({},e.defaultProps,g):g}}),d.toString=function(){return"."+d.styledComponentId},n&&et(d,e,{attrs:!0,componentStyle:!0,displayName:!0,foldedComponentIds:!0,shouldForwardProp:!0,styledComponentId:!0,target:!0,withComponent:!0}),d}var he=function(e){return function o(t,r,n){if(n===void 0&&(n=_),!ze.isValidElementType(r))return H(1,String(r));var i=function(){return t(r,n,Wt.apply(void 0,arguments))};return i.withConfig=function(a){return o(t,r,z({},n,{},a))},i.attrs=function(a){return o(t,r,z({},n,{attrs:Array.prototype.concat(n.attrs,a).filter(Boolean)}))},i}(Ye,e)};["a","abbr","address","area","article","aside","audio","b","base","bdi","bdo","big","blockquote","body","br","button","canvas","caption","cite","code","col","colgroup","data","datalist","dd","del","details","dfn","dialog","div","dl","dt","em","embed","fieldset","figcaption","figure","footer","form","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","i","iframe","img","input","ins","kbd","keygen","label","legend","li","link","main","map","mark","marquee","menu","menuitem","meta","meter","nav","noscript","object","ol","optgroup","option","output","p","param","picture","pre","progress","q","rp","rt","ruby","s","samp","script","section","select","small","source","span","strong","style","sub","summary","sup","table","tbody","td","textarea","tfoot","th","thead","time","title","tr","track","u","ul","var","video","wbr","circle","clipPath","defs","ellipse","foreignObject","g","image","line","linearGradient","marker","mask","path","pattern","polygon","polyline","radialGradient","rect","stop","svg","text","tspan"].forEach(function(e){he[e]=he(e)});const Ge=he,tr=Ge.div`
  .upload-area {
    background-color: #2a2a2a;
    border: 2px dashed #39ff14;
    border-radius: 8px;
    padding: 20px;
    text-align: center;
    cursor: pointer;
    transition: all 0.2s;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
    margin-top: 12px; /* space above the upload area */

    &:hover {
      background-color: #333333;
    }

    .upload-icon i {
      color: #39ff14;
      font-size: 24px;
    }

    .upload-text {
      color: #ffffff;
      font-size: 14px;
      font-weight: 500;
    }

    .upload-subtext {
      color: #aaaaaa;
      font-size: 12px;
    }
  }

  .upload-card {
    margin-bottom: 16px;
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
  }

  .uploaded-box {
    position: relative;
    width: 100%;          /* same as desired preview size */
    height: 260px;
    background-color: #2a2a2a;
    border: 2px solid #39ff14;  /* solid border for uploaded state */
    border-radius: 8px;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;

    .uploaded-img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
    }

    .img-buttons {
      position: absolute;
      top: 4px;
      right: 4px;
      display: flex;
      gap: 4px;
      background: rgba(0, 0, 0, 0.6);
      border-radius: 4px;
      padding: 2px;

      button {
        background: transparent;
        border: none;
        color: #ffffff;
        font-size: 14px;
        padding: 4px 6px;
        cursor: pointer;
        transition: color 0.2s;
        line-height: 1;

        &:hover {
          color: #39ff14;
        }

        i {
          font-size: 14px;
        }
      }
    }
  }
`,rr=Ge.div`
  /* The Modal (background) */
  .modal {
    display: block;
    position: fixed; /* Stay in place */
    z-index: 9999; /* Sit on top */
    padding-top: 100px; /* Location of the box */
    left: 0;
    top: 0;
    width: 100%; /* Full width */
    height: 100%; /* Full height */
    overflow: auto; /* Enable scroll if needed */
    background-color: rgb(0, 0, 0); /* Fallback color */
    background-color: rgba(
      0,
      0,
      0,
      0.9
    ); /* Black w/ opacity */
  }

  /* Modal Content (Image) */
  .modal-content {
    margin: auto;
    display: block;
    width: 80%;
    max-width: 700px;
  }

  /* Caption of Modal Image (Image Text) - Same Width as the Image */
  #caption {
    margin: auto;
    display: block;
    width: 80%;
    max-width: 700px;
    text-align: center;
    color: #ccc;
    padding: 10px 0;
    height: 150px;
  }

  /* Add Animation - Zoom in the Modal */
  .modal-content,
  #caption {
    animation-name: zoom;
    animation-duration: 0.6s;
  }

  @keyframes zoom {
    from {
      transform: scale(0);
    }
    to {
      transform: scale(1);
    }
  }

  /* The Close Button */
  .close {
    position: absolute;
    top: 15px;
    right: 35px;
    color: #f1f1f1;
    font-size: 40px;
    font-weight: bold;
    transition: 0.3s;
  }

  .close:hover,
  .close:focus {
    color: #bbb;
    text-decoration: none;
    cursor: pointer;
  }

  /* 100% Image Width on Smaller Screens */
  @media only screen and (max-width: 700px) {
    .modal-content {
      width: 100%;
    }
  }
`;function $e(e){return s.jsx(rr,{children:s.jsxs("div",{className:"modal",children:[s.jsx("span",{className:"close",onClick:e.onClose,children:"×"}),s.jsx("img",{className:"modal-content",src:e.src,alt:e.alt})]})})}$e.propTypes={src:I.string.isRequired,alt:I.string.isRequired,onClose:I.func.isRequired};function be(e){const[o,t]=E.useState(!1),[r,n]=E.useState(null),i=E.useRef(),a=()=>{const{value:h}=e;return h?Array.isArray(h)?h:[h]:[]},c=h=>{const d=a().filter(m=>m.id!==h);e.onChange(d)},u=async h=>{try{const d=h.target.files;if(!d||!d.length)return;let m=d[0];Ce.validate(m,{storage:e.storage,image:!0}),t(!0),m=await Ce.upload(m,{storage:e.storage,image:!0}),i!=null&&i.current&&(i.current.value=null),t(!1),e.onChange([m])}catch(d){i!=null&&i.current&&(i.current.value=null),console.error(d),t(!1),tt.showMessage(d)}},l=h=>{n({src:h.downloadUrl,alt:h.name})},x=()=>{n(null)},{readonly:v}=e,w=s.jsx("label",{children:s.jsxs("div",{className:"upload-area",children:[s.jsx("div",{className:"upload-icon",children:s.jsx("i",{className:"fas fa-cloud-upload-alt"})}),s.jsx("div",{className:"upload-text",children:e.text}),s.jsx("div",{className:"upload-subtext",children:"JPG, PNG or PDF, max 5MB"}),s.jsx("input",{style:{display:"none"},disabled:o||v,accept:"image/*",type:"file",onChange:u,ref:i})]})});return s.jsxs(tr,{children:[v||a().length>0?null:w,a().length>0&&s.jsx("div",{className:"upload-card",children:a().length===0?w:a().map(h=>s.jsxs("div",{className:"uploaded-box",children:[s.jsx("img",{alt:h.name,src:h.downloadUrl,className:"uploaded-img"}),s.jsxs("div",{className:"img-buttons",children:[s.jsx("button",{type:"button",className:"btn btn-link",onClick:()=>l(h),children:s.jsx("i",{className:"fas fa-search"})}),!v&&s.jsx("button",{type:"button",className:"btn btn-link ml-2",onClick:()=>c(h.id),children:s.jsx("i",{className:"fas fa-times"})})]})]},h.id||h.name))}),r&&s.jsx($e,{src:r.src,alt:r.alt,onClose:x})]})}be.propTypes={readonly:I.bool,storage:I.object,value:I.any,onChange:I.func,text:I.string};be.defaultProps={text:"Upload"};function re(e){const{label:o,name:t,text:r,hint:n,storage:i,max:a,required:c,externalErrorMessage:u}=e,{errors:l,formState:{touched:x,isSubmitted:v},setValue:w,watch:h,register:d}=st();E.useEffect(()=>{d({name:t})},[d,t]);const m=lt.errorMessage(t,l,x,v,u);return s.jsxs("div",{className:"file-upload",children:[!!o&&s.jsx("label",{className:`input-label ${c?"required":null}`,htmlFor:t,children:o}),s.jsx(be,{storage:i,value:h(t),onChange:p=>{w(t,p,{shouldValidate:!0,shouldDirty:!0}),e.onChange&&e.onChange(p)},text:r,max:a}),s.jsx("div",{className:"invalid-feedback",children:m}),!!n&&s.jsx("small",{className:"form-text text-muted",children:n})]})}re.defaultProps={max:void 0,required:!1};re.propTypes={storage:I.object.isRequired,max:I.number,required:I.bool,name:I.string.isRequired,label:I.string,hint:I.string,formItemProps:I.object,text:I.string};const or={status:["pending","canceled","success"],type:["withdraw","deposit"]},nr=e=>at().shape({user:R.relationToOne(b("entities.vip.fields.title"),{}),Documenttype:R.string(b("pages.proof.fields.documentType")),realname:R.string(b("pages.proof.fields.fullName"),{required:!0}),idnumer:R.string(b("pages.proof.fields.documentNumber"),{required:!0}),address:R.string(b("pages.proof.fields.address"),{required:!0}),front:R.images(b("pages.proof.fields.frontSide"),{required:!0}),back:e==="passport"?R.images(b("pages.proof.fields.backSide")):R.images(b("pages.proof.fields.backSide"),{required:!0}),status:R.enumerator(b("entities.transaction.fields.status"),{options:or.status})});function pr(){const[e,o]=E.useState("passport"),t=rt(ot.selectCurrentUser),r=gt(),n=E.useMemo(()=>nr(e),[e]),i=ct({resolver:dt.yupResolver(n),mode:"all",defaultValues:{user:t||[],Documenttype:e,realname:"",idnumer:"",address:"",front:[],back:[],status:"pending"}}),a=l=>{const x={...l,user:t,Documenttype:e};e==="passport"&&(x.back=[]),r(it.doCreate(x))},c=l=>{o(l),l==="passport"&&i.setValue("back",[])},u=[{value:"passport",label:b("pages.proof.documentTypes.passport"),icon:"fas fa-passport"},{value:"idCard",label:b("pages.proof.documentTypes.idCard"),icon:"fas fa-id-card"},{value:"driversLicense",label:b("pages.proof.documentTypes.driversLicense"),icon:"fas fa-id-card-alt"}];return s.jsxs("div",{className:"proof-container",children:[s.jsx("div",{className:"header",children:s.jsxs("div",{className:"nav-bar",children:[s.jsx(nt,{to:"/profile",className:"back-arrow",children:s.jsx("i",{className:"fas fa-arrow-left"})}),s.jsx("div",{className:"page-title",children:b("pages.proof.title")})]})}),s.jsxs("div",{className:"content-card",children:[s.jsxs("div",{className:"instructions",children:[s.jsx("i",{className:"fas fa-info-circle"}),b("pages.proof.instructions")]}),s.jsx(ut,{...i,children:s.jsxs("form",{onSubmit:i.handleSubmit(a),children:[s.jsxs("div",{className:"form-section",children:[s.jsx("div",{className:"section-title",children:b("pages.proof.sections.documentInfo")}),s.jsxs("div",{className:"document-type-section",children:[s.jsxs("div",{className:"input-label",children:[b("pages.proof.fields.documentType")," ",s.jsx("span",{className:"required",children:"*"})]}),s.jsx("div",{className:"document-type-options",children:u.map(l=>s.jsxs("div",{className:`document-option ${l.value===e?"selected":""}`,onClick:()=>c(l.value),children:[s.jsx("i",{className:`${l.icon} document-icon`}),s.jsx("span",{className:"document-text",children:l.label})]},l.value))})]}),s.jsx("div",{className:"input-group",children:s.jsx(se,{className:"form-input",name:"realname",label:b("pages.proof.fields.fullName"),placeholder:b("pages.proof.placeholders.fullName")})}),s.jsx("div",{className:"input-group",children:s.jsx(se,{className:"form-input",name:"idnumer",label:b("pages.proof.fields.documentNumber"),placeholder:b("pages.proof.placeholders.documentNumber")})}),s.jsx("div",{className:"input-group",children:s.jsx(se,{className:"form-input",name:"address",label:b("pages.proof.fields.address"),placeholder:b("pages.proof.placeholders.address")})})]}),s.jsxs("div",{className:"form-section",children:[s.jsx("div",{className:"section-title",children:b("pages.proof.sections.documentUpload")}),s.jsx("div",{className:"upload-section",children:s.jsx(re,{name:"front",label:b("pages.proof.fields.frontSide"),storage:je.values.categoryPhoto,text:b("pages.proof.uploadTexts.frontSide"),max:2})}),e!=="passport"&&s.jsx("div",{className:"upload-section",children:s.jsx(re,{name:"back",label:b("pages.proof.fields.backSide"),storage:je.values.categoryPhoto,text:b("pages.proof.uploadTexts.backSide"),max:2})})]}),s.jsxs("div",{className:"security-note",children:[s.jsxs("div",{className:"security-header",children:[s.jsx("i",{className:"fas fa-shield-alt"})," ",b("pages.proof.security.title")]}),s.jsx("div",{className:"security-text",children:b("pages.proof.security.text")})]}),s.jsx("button",{type:"submit",className:"submit-button",children:b("pages.proof.buttons.validateDocuments")})]})})]}),s.jsx("style",{children:`
        /* Proof Container – matches login/profile containers */
        .proof-container {
          max-width: 430px;
          margin: 0 auto;
          min-height: 100vh;
          background-color: #000000;
          border-top: 2px solid #39FF14;
          display: flex;
          flex-direction: column;
          box-sizing: border-box;
          color: #ffffff;
        }

        /* Header / Navigation (matches profile) */
        .header {
          padding: 16px 20px;
          border-bottom: 1px solid #2a2a2a;
        }
        .nav-bar {
          display: flex;
          align-items: center;
          gap: 16px;
        }
        .back-arrow {
          color: #ffffff;
          font-size: 20px;
          text-decoration: none;
        }
        .back-arrow:hover {
          color: #39FF14;
        }
        .page-title {
          font-size: 18px;
          font-weight: 500;
          color: #ffffff;
        }

        /* Content Card – matches profile card */
        .content-card {
          flex: 1;
          background-color: #1c1c1c;
          border-top-left-radius: 24px;
          border-top-right-radius: 24px;
          padding: 24px 20px;
          margin-top: 20px;
          border-top: 2px solid #39FF14;
        }

        /* Instructions banner */
        .instructions {
          background-color: #2a2a2a;
          border-left: 4px solid #39FF14;
          padding: 12px 16px;
          border-radius: 8px;
          margin-bottom: 24px;
          font-size: 14px;
          color: #ffffff;
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .instructions i {
          color: #39FF14;
          font-size: 18px;
        }

        /* Form sections */
        .form-section {
          margin-bottom: 32px;
        }
        .section-title {
          font-size: 16px;
          font-weight: 600;
          color: #39FF14;
          margin-bottom: 20px;
          padding-bottom: 8px;
          border-bottom: 1px solid #2a2a2a;
        }

        /* Document type selector */
        .document-type-section {
          margin-bottom: 20px;
        }
        .input-label {
          font-size: 14px;
          color: #ffffff;
          margin-bottom: 8px;
        }
        .required {
          color: #39FF14;
        }
        .document-type-options {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
        }
        .document-option {
          flex: 1;
          min-width: 100px;
          background-color: #2a2a2a;
          border: 1px solid #2a2a2a;
          border-radius: 8px;
          padding: 12px 8px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
          cursor: pointer;
          transition: all 0.2s;
        }
        .document-option:hover {
          border-color: #39FF14;
          background-color: #333333;
        }
        .document-option.selected {
          border-color: #39FF14;
          background-color: rgba(57, 255, 20, 0.1);
        }
        .document-icon {
          font-size: 24px;
          color: #39FF14;
        }
        .document-text {
          font-size: 12px;
          text-align: center;
          color: #ffffff;
        }

        /* Input fields – matches login page input styling */
        .form-input {
          background-color: #1c1c1c;
          border: 1px solid #2a2a2a;
          border-radius: 6px;
          height: 48px;
          width: 100%;
          padding: 0 16px;
          color: #ffffff;
          font-size: 16px;
          outline: none;
          box-sizing: border-box;
        }
        .form-input:focus {
          border-color: #39FF14;
        }
        .form-input::placeholder {
          color: #777777;
        }

        /* Input groups (for label + input) – assuming label is rendered by InputFormItem */
        .input-group {
          margin-bottom: 16px;
        }
        /* If InputFormItem renders its own label, we can style it generically */
        .input-group label {
          display: block;
          font-size: 14px;
          color: #ffffff;
          margin-bottom: 6px;
        }

        /* Upload sections – base styles for ImagesFormItem containers */
        .upload-section {
          margin-bottom: 24px;
        }
        /* You may need to add specific overrides for the upload component's internal elements */
        .upload-section .images-form-item {
          /* Add styles if needed */
        }
        .upload-section .image-upload-area {
          background-color: #2a2a2a;
          border: 2px dashed #39FF14;
          border-radius: 8px;
          padding: 20px;
          text-align: center;
          cursor: pointer;
          transition: all 0.2s;
        }
        .upload-section .image-upload-area:hover {
          background-color: #333333;
        }
        .upload-section .image-upload-area i {
          color: #39FF14;
          font-size: 24px;
          margin-bottom: 8px;
        }
        .upload-section .image-upload-area p {
          color: #ffffff;
          font-size: 14px;
        }
        .upload-section .image-preview {
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
          margin-top: 10px;
        }
        .upload-section .image-preview img {
          width: 80px;
          height: 80px;
          object-fit: cover;
          border-radius: 6px;
          border: 2px solid #39FF14;
        }

        /* Security note */
        .security-note {
          background-color: #2a2a2a;
          border-radius: 8px;
          padding: 16px;
          margin-bottom: 24px;
        }
        .security-header {
          font-size: 14px;
          font-weight: bold;
          color: #39FF14;
          margin-bottom: 8px;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .security-text {
          font-size: 13px;
          color: #bbbbbb;
          line-height: 1.5;
        }

        /* Submit button – matches login button */
        .submit-button {
          background-color: #39FF14;
          color: #000000;
          font-weight: bold;
          height: 50px;
          width: 100%;
          border: none;
          border-radius: 6px;
          font-size: 16px;
          cursor: pointer;
          transition: background-color 0.2s;
        }
        .submit-button:hover {
          background-color: #2ecc10;
        }
        .submit-button:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }
      `})]})}export{pr as default};
