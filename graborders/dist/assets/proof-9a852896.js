import{g as Xe,j as h,au as Je,av as Qe,n as et,F as oe,aw as Be,ax as tt,i as E,a0 as F,k as n,ay as rt,u as je,q as ot,v as at,p as nt,x as st,L as it,az as Ne,V as lt,aA as ct}from"./index-a8b69c34.js";import{a as dt,b as ut,u as pt,y as ft,F as mt}from"./FormErrors-34fd7332.js";import{y as T}from"./yupFormSchemas-53652da4.js";import{I as ie}from"./InputFormItem-2b2d64f8.js";import{v as ht}from"./v4-4a60fe23.js";import{m as gt,s as xt,u as bt}from"./memoize.browser.esm-012df344.js";import{u as yt}from"./useDispatch-34d25598.js";var _e={exports:{}};(function(e,o){(function(t){var r=/^(b|B)$/,a={iec:{bits:["b","Kib","Mib","Gib","Tib","Pib","Eib","Zib","Yib"],bytes:["B","KiB","MiB","GiB","TiB","PiB","EiB","ZiB","YiB"]},jedec:{bits:["b","Kb","Mb","Gb","Tb","Pb","Eb","Zb","Yb"],bytes:["B","KB","MB","GB","TB","PB","EB","ZB","YB"]}},i={iec:["","kibi","mebi","gibi","tebi","pebi","exbi","zebi","yobi"],jedec:["","kilo","mega","giga","tera","peta","exa","zetta","yotta"]};function s(l){var u,c,y,p,S,x,d,g,f,k,b,C,N,j,z,w=1<arguments.length&&arguments[1]!==void 0?arguments[1]:{},m=[],A=0,v=void 0,I=void 0;if(isNaN(l))throw new TypeError("Invalid number");return c=w.bits===!0,b=w.unix===!0,u=w.base||2,k=w.round!==void 0?w.round:b?1:2,x=w.locale!==void 0?w.locale:"",d=w.localeOptions||{},C=w.separator!==void 0?w.separator:"",N=w.spacer!==void 0?w.spacer:b?"":" ",z=w.symbols||{},j=u===2&&w.standard||"jedec",f=w.output||"string",p=w.fullform===!0,S=w.fullforms instanceof Array?w.fullforms:[],v=w.exponent!==void 0?w.exponent:-1,y=2<u?1e3:1024,(g=(I=Number(l))<0)&&(I=-I),(v===-1||isNaN(v))&&(v=Math.floor(Math.log(I)/Math.log(y)))<0&&(v=0),8<v&&(v=8),f==="exponent"?v:(I===0?(m[0]=0,m[1]=b?"":a[j][c?"bits":"bytes"][v]):(A=I/(u===2?Math.pow(2,10*v):Math.pow(1e3,v)),c&&y<=(A*=8)&&v<8&&(A/=y,v++),m[0]=Number(A.toFixed(0<v?k:0)),m[0]===y&&v<8&&w.exponent===void 0&&(m[0]=1,v++),m[1]=u===10&&v===1?c?"kb":"kB":a[j][c?"bits":"bytes"][v],b&&(m[1]=j==="jedec"?m[1].charAt(0):0<v?m[1].replace(/B$/,""):m[1],r.test(m[1])&&(m[0]=Math.floor(m[0]),m[1]=""))),g&&(m[0]=-m[0]),m[1]=z[m[1]]||m[1],x===!0?m[0]=m[0].toLocaleString():0<x.length?m[0]=m[0].toLocaleString(x,d):0<C.length&&(m[0]=m[0].toString().replace(".",C)),f==="array"?m:(p&&(m[1]=S[v]?S[v]:i[j][v]+(c?"bit":"byte")+(m[0]===1?"":"s")),f==="object"?{value:m[0],symbol:m[1],exponent:v}:m.join(N)))}s.partial=function(l){return function(u){return s(u,l)}},e.exports=s})()})(_e);var vt=_e.exports;const St=Xe(vt);class Ce{static validate(o,t){if(!t)return;if(t.image&&!o.type.startsWith("image"))throw new Error(h("fileUploader.image"));if(t.storage.maxSizeInBytes&&o.size>t.storage.maxSizeInBytes)throw new Error(h("fileUploader.size",St(t.storage.maxSizeInBytes)));const r=Fe(o.name);if(t.formats&&!t.formats.includes(r))throw new Error(h("fileUploader.formats",t.formats.join(", ")))}static async upload(o,t){try{this.validate(o,t)}catch(c){return Promise.reject(c)}const r=Fe(o.name),a=ht(),i=`${a}.${r}`,{uploadCredentials:s,downloadUrl:l,privateUrl:u}=await this.fetchFileCredentials(i,t);return await this.uploadToServer(o,s),{id:a,name:o.name,sizeInBytes:o.size,publicUrl:s&&s.publicUrl?s.publicUrl:null,privateUrl:u,downloadUrl:l,new:!0}}static async fetchFileCredentials(o,t){const r=Je.get(),{data:a}=await Qe.get(`/tenant/${r}/file/credentials`,{params:{filename:o,storageId:t.storage.id}});return a}static async uploadToServer(o,t){try{const r=t.url,a=new FormData;for(const[i,s]of Object.entries(t.fields||{}))a.append(i,s);return a.append("file",o),et.post(r,a,{headers:{"Content-Type":"multipart/form-data"}})}catch(r){throw console.error(r),r}}}function Fe(e){if(!e)return null;const t=/(?:\.([^.]+))?$/.exec(e);return t?t[1]:null}var wt=/^((children|dangerouslySetInnerHTML|key|ref|autoFocus|defaultValue|defaultChecked|innerHTML|suppressContentEditableWarning|suppressHydrationWarning|valueLink|accept|acceptCharset|accessKey|action|allow|allowUserMedia|allowPaymentRequest|allowFullScreen|allowTransparency|alt|async|autoComplete|autoPlay|capture|cellPadding|cellSpacing|challenge|charSet|checked|cite|classID|className|cols|colSpan|content|contentEditable|contextMenu|controls|controlsList|coords|crossOrigin|data|dateTime|decoding|default|defer|dir|disabled|disablePictureInPicture|download|draggable|encType|form|formAction|formEncType|formMethod|formNoValidate|formTarget|frameBorder|headers|height|hidden|high|href|hrefLang|htmlFor|httpEquiv|id|inputMode|integrity|is|keyParams|keyType|kind|label|lang|list|loading|loop|low|marginHeight|marginWidth|max|maxLength|media|mediaGroup|method|min|minLength|multiple|muted|name|nonce|noValidate|open|optimum|pattern|placeholder|playsInline|poster|preload|profile|radioGroup|readOnly|referrerPolicy|rel|required|reversed|role|rows|rowSpan|sandbox|scope|scoped|scrolling|seamless|selected|shape|size|sizes|slot|span|spellCheck|src|srcDoc|srcLang|srcSet|start|step|style|summary|tabIndex|target|title|type|useMap|value|width|wmode|wrap|about|datatype|inlist|prefix|property|resource|typeof|vocab|autoCapitalize|autoCorrect|autoSave|color|inert|itemProp|itemScope|itemType|itemID|itemRef|on|results|security|unselectable|accentHeight|accumulate|additive|alignmentBaseline|allowReorder|alphabetic|amplitude|arabicForm|ascent|attributeName|attributeType|autoReverse|azimuth|baseFrequency|baselineShift|baseProfile|bbox|begin|bias|by|calcMode|capHeight|clip|clipPathUnits|clipPath|clipRule|colorInterpolation|colorInterpolationFilters|colorProfile|colorRendering|contentScriptType|contentStyleType|cursor|cx|cy|d|decelerate|descent|diffuseConstant|direction|display|divisor|dominantBaseline|dur|dx|dy|edgeMode|elevation|enableBackground|end|exponent|externalResourcesRequired|fill|fillOpacity|fillRule|filter|filterRes|filterUnits|floodColor|floodOpacity|focusable|fontFamily|fontSize|fontSizeAdjust|fontStretch|fontStyle|fontVariant|fontWeight|format|from|fr|fx|fy|g1|g2|glyphName|glyphOrientationHorizontal|glyphOrientationVertical|glyphRef|gradientTransform|gradientUnits|hanging|horizAdvX|horizOriginX|ideographic|imageRendering|in|in2|intercept|k|k1|k2|k3|k4|kernelMatrix|kernelUnitLength|kerning|keyPoints|keySplines|keyTimes|lengthAdjust|letterSpacing|lightingColor|limitingConeAngle|local|markerEnd|markerMid|markerStart|markerHeight|markerUnits|markerWidth|mask|maskContentUnits|maskUnits|mathematical|mode|numOctaves|offset|opacity|operator|order|orient|orientation|origin|overflow|overlinePosition|overlineThickness|panose1|paintOrder|pathLength|patternContentUnits|patternTransform|patternUnits|pointerEvents|points|pointsAtX|pointsAtY|pointsAtZ|preserveAlpha|preserveAspectRatio|primitiveUnits|r|radius|refX|refY|renderingIntent|repeatCount|repeatDur|requiredExtensions|requiredFeatures|restart|result|rotate|rx|ry|scale|seed|shapeRendering|slope|spacing|specularConstant|specularExponent|speed|spreadMethod|startOffset|stdDeviation|stemh|stemv|stitchTiles|stopColor|stopOpacity|strikethroughPosition|strikethroughThickness|string|stroke|strokeDasharray|strokeDashoffset|strokeLinecap|strokeLinejoin|strokeMiterlimit|strokeOpacity|strokeWidth|surfaceScale|systemLanguage|tableValues|targetX|targetY|textAnchor|textDecoration|textRendering|textLength|to|transform|u1|u2|underlinePosition|underlineThickness|unicode|unicodeBidi|unicodeRange|unitsPerEm|vAlphabetic|vHanging|vIdeographic|vMathematical|values|vectorEffect|version|vertAdvY|vertOriginX|vertOriginY|viewBox|viewTarget|visibility|widths|wordSpacing|writingMode|x|xHeight|x1|x2|xChannelSelector|xlinkActuate|xlinkArcrole|xlinkHref|xlinkRole|xlinkShow|xlinkTitle|xlinkType|xmlBase|xmlns|xmlnsXlink|xmlLang|xmlSpace|y|y1|y2|yChannelSelector|z|zoomAndPan|for|class|autofocus)|(([Dd][Aa][Tt][Aa]|[Aa][Rr][Ii][Aa]|x)-.*))$/,Ae=gt(function(e){return wt.test(e)||e.charCodeAt(0)===111&&e.charCodeAt(1)===110&&e.charCodeAt(2)<91});function R(){return(R=Object.assign||function(e){for(var o=1;o<arguments.length;o++){var t=arguments[o];for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&(e[r]=t[r])}return e}).apply(this,arguments)}var Ie=function(e,o){for(var t=[e[0]],r=0,a=o.length;r<a;r+=1)t.push(o[r],e[r+1]);return t},ue=function(e){return e!==null&&typeof e=="object"&&(e.toString?e.toString():Object.prototype.toString.call(e))==="[object Object]"&&!Be.typeOf(e)},ee=Object.freeze([]),_=Object.freeze({});function H(e){return typeof e=="function"}function Ee(e){return e.displayName||e.name||"Component"}function ge(e){return e&&typeof e.styledComponentId=="string"}var Y=typeof process<"u"&&({}.REACT_APP_SC_ATTR||{}.SC_ATTR)||"data-styled",xe=typeof window<"u"&&"HTMLElement"in window,kt=!!(typeof SC_DISABLE_SPEEDY=="boolean"?SC_DISABLE_SPEEDY:typeof process<"u"&&{}.REACT_APP_SC_DISABLE_SPEEDY!==void 0&&{}.REACT_APP_SC_DISABLE_SPEEDY!==""?{}.REACT_APP_SC_DISABLE_SPEEDY!=="false"&&{}.REACT_APP_SC_DISABLE_SPEEDY:typeof process<"u"&&{}.SC_DISABLE_SPEEDY!==void 0&&{}.SC_DISABLE_SPEEDY!==""&&{}.SC_DISABLE_SPEEDY!=="false"&&{}.SC_DISABLE_SPEEDY);function $(e){for(var o=arguments.length,t=new Array(o>1?o-1:0),r=1;r<o;r++)t[r-1]=arguments[r];throw new Error("An error occurred. See https://git.io/JUIaE#"+e+" for more information."+(t.length>0?" Args: "+t.join(", "):""))}var jt=function(){function e(t){this.groupSizes=new Uint32Array(512),this.length=512,this.tag=t}var o=e.prototype;return o.indexOfGroup=function(t){for(var r=0,a=0;a<t;a++)r+=this.groupSizes[a];return r},o.insertRules=function(t,r){if(t>=this.groupSizes.length){for(var a=this.groupSizes,i=a.length,s=i;t>=s;)(s<<=1)<0&&$(16,""+t);this.groupSizes=new Uint32Array(s),this.groupSizes.set(a),this.length=s;for(var l=i;l<s;l++)this.groupSizes[l]=0}for(var u=this.indexOfGroup(t+1),c=0,y=r.length;c<y;c++)this.tag.insertRule(u,r[c])&&(this.groupSizes[t]++,u++)},o.clearGroup=function(t){if(t<this.length){var r=this.groupSizes[t],a=this.indexOfGroup(t),i=a+r;this.groupSizes[t]=0;for(var s=a;s<i;s++)this.tag.deleteRule(a)}},o.getGroup=function(t){var r="";if(t>=this.length||this.groupSizes[t]===0)return r;for(var a=this.groupSizes[t],i=this.indexOfGroup(t),s=i+a,l=i;l<s;l++)r+=this.tag.getRule(l)+`/*!sc*/
`;return r},e}(),Q=new Map,te=new Map,le=1,X=function(e){if(Q.has(e))return Q.get(e);for(;te.has(le);)le++;var o=le++;return Q.set(e,o),te.set(o,e),o},Nt=function(e){return te.get(e)},Ct=function(e,o){Q.set(e,o),te.set(o,e)},Ft="style["+Y+'][data-styled-version="5.2.1"]',At=new RegExp("^"+Y+'\\.g(\\d+)\\[id="([\\w\\d-]+)"\\].*?"([^"]*)'),It=function(e,o,t){for(var r,a=t.split(","),i=0,s=a.length;i<s;i++)(r=a[i])&&e.registerName(o,r)},Et=function(e,o){for(var t=o.innerHTML.split(`/*!sc*/
`),r=[],a=0,i=t.length;a<i;a++){var s=t[a].trim();if(s){var l=s.match(At);if(l){var u=0|parseInt(l[1],10),c=l[2];u!==0&&(Ct(c,u),It(e,c,l[3]),e.getTag().insertRules(u,r)),r.length=0}else r.push(s)}}},zt=function(){return typeof __webpack_nonce__<"u"?__webpack_nonce__:null},Me=function(e){var o=document.head,t=e||o,r=document.createElement("style"),a=function(l){for(var u=l.childNodes,c=u.length;c>=0;c--){var y=u[c];if(y&&y.nodeType===1&&y.hasAttribute(Y))return y}}(t),i=a!==void 0?a.nextSibling:null;r.setAttribute(Y,"active"),r.setAttribute("data-styled-version","5.2.1");var s=zt();return s&&r.setAttribute("nonce",s),t.insertBefore(r,i),r},Pt=function(){function e(t){var r=this.element=Me(t);r.appendChild(document.createTextNode("")),this.sheet=function(a){if(a.sheet)return a.sheet;for(var i=document.styleSheets,s=0,l=i.length;s<l;s++){var u=i[s];if(u.ownerNode===a)return u}$(17)}(r),this.length=0}var o=e.prototype;return o.insertRule=function(t,r){try{return this.sheet.insertRule(r,t),this.length++,!0}catch{return!1}},o.deleteRule=function(t){this.sheet.deleteRule(t),this.length--},o.getRule=function(t){var r=this.sheet.cssRules[t];return r!==void 0&&typeof r.cssText=="string"?r.cssText:""},e}(),Tt=function(){function e(t){var r=this.element=Me(t);this.nodes=r.childNodes,this.length=0}var o=e.prototype;return o.insertRule=function(t,r){if(t<=this.length&&t>=0){var a=document.createTextNode(r),i=this.nodes[t];return this.element.insertBefore(a,i||null),this.length++,!0}return!1},o.deleteRule=function(t){this.element.removeChild(this.nodes[t]),this.length--},o.getRule=function(t){return t<this.length?this.nodes[t].textContent:""},e}(),Rt=function(){function e(t){this.rules=[],this.length=0}var o=e.prototype;return o.insertRule=function(t,r){return t<=this.length&&(this.rules.splice(t,0,r),this.length++,!0)},o.deleteRule=function(t){this.rules.splice(t,1),this.length--},o.getRule=function(t){return t<this.length?this.rules[t]:""},e}(),ze=xe,Bt={isServer:!xe,useCSSOMInjection:!kt},De=function(){function e(t,r,a){t===void 0&&(t=_),r===void 0&&(r={}),this.options=R({},Bt,{},t),this.gs=r,this.names=new Map(a),!this.options.isServer&&xe&&ze&&(ze=!1,function(i){for(var s=document.querySelectorAll(Ft),l=0,u=s.length;l<u;l++){var c=s[l];c&&c.getAttribute(Y)!=="active"&&(Et(i,c),c.parentNode&&c.parentNode.removeChild(c))}}(this))}e.registerId=function(t){return X(t)};var o=e.prototype;return o.reconstructWithOptions=function(t,r){return r===void 0&&(r=!0),new e(R({},this.options,{},t),this.gs,r&&this.names||void 0)},o.allocateGSInstance=function(t){return this.gs[t]=(this.gs[t]||0)+1},o.getTag=function(){return this.tag||(this.tag=(a=(r=this.options).isServer,i=r.useCSSOMInjection,s=r.target,t=a?new Rt(s):i?new Pt(s):new Tt(s),new jt(t)));var t,r,a,i,s},o.hasNameForId=function(t,r){return this.names.has(t)&&this.names.get(t).has(r)},o.registerName=function(t,r){if(X(t),this.names.has(t))this.names.get(t).add(r);else{var a=new Set;a.add(r),this.names.set(t,a)}},o.insertRules=function(t,r,a){this.registerName(t,r),this.getTag().insertRules(X(t),a)},o.clearNames=function(t){this.names.has(t)&&this.names.get(t).clear()},o.clearRules=function(t){this.getTag().clearGroup(X(t)),this.clearNames(t)},o.clearTag=function(){this.tag=void 0},o.toString=function(){return function(t){for(var r=t.getTag(),a=r.length,i="",s=0;s<a;s++){var l=Nt(s);if(l!==void 0){var u=t.names.get(l),c=r.getGroup(s);if(u!==void 0&&c.length!==0){var y=Y+".g"+s+'[id="'+l+'"]',p="";u!==void 0&&u.forEach(function(S){S.length>0&&(p+=S+",")}),i+=""+c+y+'{content:"'+p+`"}/*!sc*/
`}}}return i}(this)},e}(),_t=/(a)(d)/gi,Pe=function(e){return String.fromCharCode(e+(e>25?39:97))};function pe(e){var o,t="";for(o=Math.abs(e);o>52;o=o/52|0)t=Pe(o%52)+t;return(Pe(o%52)+t).replace(_t,"$1-$2")}var q=function(e,o){for(var t=o.length;t;)e=33*e^o.charCodeAt(--t);return e},Oe=function(e){return q(5381,e)};function Mt(e){for(var o=0;o<e.length;o+=1){var t=e[o];if(H(t)&&!ge(t))return!1}return!0}var Dt=Oe("5.2.1"),Ot=function(){function e(o,t,r){this.rules=o,this.staticRulesId="",this.isStatic=(r===void 0||r.isStatic)&&Mt(o),this.componentId=t,this.baseHash=q(Dt,t),this.baseStyle=r,De.registerId(t)}return e.prototype.generateAndInjectStyles=function(o,t,r){var a=this.componentId,i=[];if(this.baseStyle&&i.push(this.baseStyle.generateAndInjectStyles(o,t,r)),this.isStatic&&!r.hash)if(this.staticRulesId&&t.hasNameForId(a,this.staticRulesId))i.push(this.staticRulesId);else{var s=G(this.rules,o,t,r).join(""),l=pe(q(this.baseHash,s.length)>>>0);if(!t.hasNameForId(a,l)){var u=r(s,"."+l,void 0,a);t.insertRules(a,l,u)}i.push(l),this.staticRulesId=l}else{for(var c=this.rules.length,y=q(this.baseHash,r.hash),p="",S=0;S<c;S++){var x=this.rules[S];if(typeof x=="string")p+=x;else if(x){var d=G(x,o,t,r),g=Array.isArray(d)?d.join(""):d;y=q(y,g+S),p+=g}}if(p){var f=pe(y>>>0);if(!t.hasNameForId(a,f)){var k=r(p,"."+f,void 0,a);t.insertRules(a,f,k)}i.push(f)}}return i.join(" ")},e}(),Lt=/^\s*\/\/.*$/gm,Ut=[":","[",".","#"];function qt(e){var o,t,r,a,i=e===void 0?_:e,s=i.options,l=s===void 0?_:s,u=i.plugins,c=u===void 0?ee:u,y=new xt(l),p=[],S=function(g){function f(k){if(k)try{g(k+"}")}catch{}}return function(k,b,C,N,j,z,w,m,A,v){switch(k){case 1:if(A===0&&b.charCodeAt(0)===64)return g(b+";"),"";break;case 2:if(m===0)return b+"/*|*/";break;case 3:switch(m){case 102:case 112:return g(C[0]+b),"";default:return b+(v===0?"/*|*/":"")}case-2:b.split("/*|*/}").forEach(f)}}}(function(g){p.push(g)}),x=function(g,f,k){return f===0&&Ut.includes(k[t.length])||k.match(a)?g:"."+o};function d(g,f,k,b){b===void 0&&(b="&");var C=g.replace(Lt,""),N=f&&k?k+" "+f+" { "+C+" }":C;return o=b,t=f,r=new RegExp("\\"+t+"\\b","g"),a=new RegExp("(\\"+t+"\\b){2,}"),y(k||!f?"":f,N)}return y.use([].concat(c,[function(g,f,k){g===2&&k.length&&k[0].lastIndexOf(t)>0&&(k[0]=k[0].replace(r,x))},S,function(g){if(g===-2){var f=p;return p=[],f}}])),d.hash=c.length?c.reduce(function(g,f){return f.name||$(15),q(g,f.name)},5381).toString():"",d}var Le=oe.createContext();Le.Consumer;var Ue=oe.createContext(),Yt=(Ue.Consumer,new De),fe=qt();function Gt(){return E.useContext(Le)||Yt}function Ht(){return E.useContext(Ue)||fe}var $t=function(){function e(o,t){var r=this;this.inject=function(a,i){i===void 0&&(i=fe);var s=r.name+i.hash;a.hasNameForId(r.id,s)||a.insertRules(r.id,s,i(r.rules,s,"@keyframes"))},this.toString=function(){return $(12,String(r.name))},this.name=o,this.id="sc-keyframes-"+o,this.rules=t}return e.prototype.getName=function(o){return o===void 0&&(o=fe),this.name+o.hash},e}(),Vt=/([A-Z])/,Wt=/([A-Z])/g,Zt=/^ms-/,Kt=function(e){return"-"+e.toLowerCase()};function Te(e){return Vt.test(e)?e.replace(Wt,Kt).replace(Zt,"-ms-"):e}var Re=function(e){return e==null||e===!1||e===""};function G(e,o,t,r){if(Array.isArray(e)){for(var a,i=[],s=0,l=e.length;s<l;s+=1)(a=G(e[s],o,t,r))!==""&&(Array.isArray(a)?i.push.apply(i,a):i.push(a));return i}if(Re(e))return"";if(ge(e))return"."+e.styledComponentId;if(H(e)){if(typeof(c=e)!="function"||c.prototype&&c.prototype.isReactComponent||!o)return e;var u=e(o);return G(u,o,t,r)}var c;return e instanceof $t?t?(e.inject(t,r),e.getName(r)):e:ue(e)?function y(p,S){var x,d,g=[];for(var f in p)p.hasOwnProperty(f)&&!Re(p[f])&&(ue(p[f])?g.push.apply(g,y(p[f],f)):H(p[f])?g.push(Te(f)+":",p[f],";"):g.push(Te(f)+": "+(x=f,(d=p[f])==null||typeof d=="boolean"||d===""?"":typeof d!="number"||d===0||x in bt?String(d).trim():d+"px")+";"));return S?[S+" {"].concat(g,["}"]):g}(e):e.toString()}function Xt(e){for(var o=arguments.length,t=new Array(o>1?o-1:0),r=1;r<o;r++)t[r-1]=arguments[r];return H(e)||ue(e)?G(Ie(ee,[e].concat(t))):t.length===0&&e.length===1&&typeof e[0]=="string"?e:G(Ie(e,t))}var Jt=function(e,o,t){return t===void 0&&(t=_),e.theme!==t.theme&&e.theme||o||t.theme},Qt=/[!"#$%&'()*+,./:;<=>?@[\\\]^`{|}~-]+/g,er=/(^-|-$)/g;function ce(e){return e.replace(Qt,"-").replace(er,"")}var tr=function(e){return pe(Oe(e)>>>0)};function J(e){return typeof e=="string"&&!0}var me=function(e){return typeof e=="function"||typeof e=="object"&&e!==null&&!Array.isArray(e)},rr=function(e){return e!=="__proto__"&&e!=="constructor"&&e!=="prototype"};function or(e,o,t){var r=e[t];me(o)&&me(r)?qe(r,o):e[t]=o}function qe(e){for(var o=arguments.length,t=new Array(o>1?o-1:0),r=1;r<o;r++)t[r-1]=arguments[r];for(var a=0,i=t;a<i.length;a++){var s=i[a];if(me(s))for(var l in s)rr(l)&&or(e,s[l],l)}return e}var Ye=oe.createContext();Ye.Consumer;var de={};function Ge(e,o,t){var r=ge(e),a=!J(e),i=o.attrs,s=i===void 0?ee:i,l=o.componentId,u=l===void 0?function(b,C){var N=typeof b!="string"?"sc":ce(b);de[N]=(de[N]||0)+1;var j=N+"-"+tr("5.2.1"+N+de[N]);return C?C+"-"+j:j}(o.displayName,o.parentComponentId):l,c=o.displayName,y=c===void 0?function(b){return J(b)?"styled."+b:"Styled("+Ee(b)+")"}(e):c,p=o.displayName&&o.componentId?ce(o.displayName)+"-"+o.componentId:o.componentId||u,S=r&&e.attrs?Array.prototype.concat(e.attrs,s).filter(Boolean):s,x=o.shouldForwardProp;r&&e.shouldForwardProp&&(x=o.shouldForwardProp?function(b,C){return e.shouldForwardProp(b,C)&&o.shouldForwardProp(b,C)}:e.shouldForwardProp);var d,g=new Ot(t,p,r?e.componentStyle:void 0),f=g.isStatic&&s.length===0,k=function(b,C){return function(N,j,z,w){var m=N.attrs,A=N.componentStyle,v=N.defaultProps,I=N.foldedComponentIds,ye=N.shouldForwardProp,ve=N.styledComponentId,Ve=N.target,Se=function(O,ne,se){O===void 0&&(O=_);var V=R({},ne,{theme:O}),L={};return se.forEach(function(W){var P,Z,K,U=W;for(P in H(U)&&(U=U(V)),U)V[P]=L[P]=P==="className"?(Z=L[P],K=U[P],Z&&K?Z+" "+K:Z||K):U[P]}),[V,L]}(Jt(j,E.useContext(Ye),v)||_,j,m),We=Se[0],M=Se[1],we=function(O,ne,se,V){var L=Gt(),W=Ht(),P=ne?O.generateAndInjectStyles(_,L,W):O.generateAndInjectStyles(se,L,W);return P}(A,w,We),Ze=z,ke=M.$as||j.$as||M.as||j.as||Ve,Ke=J(ke),ae=M!==j?R({},j,{},M):j,D={};for(var B in ae)B[0]!=="$"&&B!=="as"&&(B==="forwardedAs"?D.as=ae[B]:(ye?ye(B,Ae):!Ke||Ae(B))&&(D[B]=ae[B]));return j.style&&M.style!==j.style&&(D.style=R({},j.style,{},M.style)),D.className=Array.prototype.concat(I,ve,we!==ve?we:null,j.className,M.className).filter(Boolean).join(" "),D.ref=Ze,E.createElement(ke,D)}(d,b,C,f)};return k.displayName=y,(d=oe.forwardRef(k)).attrs=S,d.componentStyle=g,d.displayName=y,d.shouldForwardProp=x,d.foldedComponentIds=r?Array.prototype.concat(e.foldedComponentIds,e.styledComponentId):ee,d.styledComponentId=p,d.target=r?e.target:e,d.withComponent=function(b){var C=o.componentId,N=function(z,w){if(z==null)return{};var m,A,v={},I=Object.keys(z);for(A=0;A<I.length;A++)m=I[A],w.indexOf(m)>=0||(v[m]=z[m]);return v}(o,["componentId"]),j=C&&C+"-"+(J(b)?b:ce(Ee(b)));return Ge(b,R({},N,{attrs:S,componentId:j}),t)},Object.defineProperty(d,"defaultProps",{get:function(){return this._foldedDefaultProps},set:function(b){this._foldedDefaultProps=r?qe({},e.defaultProps,b):b}}),d.toString=function(){return"."+d.styledComponentId},a&&tt(d,e,{attrs:!0,componentStyle:!0,displayName:!0,foldedComponentIds:!0,shouldForwardProp:!0,styledComponentId:!0,target:!0,withComponent:!0}),d}var he=function(e){return function o(t,r,a){if(a===void 0&&(a=_),!Be.isValidElementType(r))return $(1,String(r));var i=function(){return t(r,a,Xt.apply(void 0,arguments))};return i.withConfig=function(s){return o(t,r,R({},a,{},s))},i.attrs=function(s){return o(t,r,R({},a,{attrs:Array.prototype.concat(a.attrs,s).filter(Boolean)}))},i}(Ge,e)};["a","abbr","address","area","article","aside","audio","b","base","bdi","bdo","big","blockquote","body","br","button","canvas","caption","cite","code","col","colgroup","data","datalist","dd","del","details","dfn","dialog","div","dl","dt","em","embed","fieldset","figcaption","figure","footer","form","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","i","iframe","img","input","ins","kbd","keygen","label","legend","li","link","main","map","mark","marquee","menu","menuitem","meta","meter","nav","noscript","object","ol","optgroup","option","output","p","param","picture","pre","progress","q","rp","rt","ruby","s","samp","script","section","select","small","source","span","strong","style","sub","summary","sup","table","tbody","td","textarea","tfoot","th","thead","time","title","tr","track","u","ul","var","video","wbr","circle","clipPath","defs","ellipse","foreignObject","g","image","line","linearGradient","marker","mask","path","pattern","polygon","polyline","radialGradient","rect","stop","svg","text","tspan"].forEach(function(e){he[e]=he(e)});const He=he,ar=He.div`
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
`,nr=He.div`
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
`;function $e(e){return n.jsx(nr,{children:n.jsxs("div",{className:"modal",children:[n.jsx("span",{className:"close",onClick:e.onClose,children:"×"}),n.jsx("img",{className:"modal-content",src:e.src,alt:e.alt})]})})}$e.propTypes={src:F.string.isRequired,alt:F.string.isRequired,onClose:F.func.isRequired};function be(e){const[o,t]=E.useState(!1),[r,a]=E.useState(null),i=E.useRef(),s=()=>{const{value:x}=e;return x?Array.isArray(x)?x:[x]:[]},l=x=>{const d=s().filter(g=>g.id!==x);e.onChange(d)},u=async x=>{try{const d=x.target.files;if(!d||!d.length)return;let g=d[0];Ce.validate(g,{storage:e.storage,image:!0}),t(!0),g=await Ce.upload(g,{storage:e.storage,image:!0}),i!=null&&i.current&&(i.current.value=null),t(!1),e.onChange([g])}catch(d){i!=null&&i.current&&(i.current.value=null),console.error(d),t(!1),rt.showMessage(d)}},c=x=>{a({src:x.downloadUrl,alt:x.name})},y=()=>{a(null)},{readonly:p}=e,S=n.jsx("label",{children:n.jsxs("div",{className:"upload-area",children:[n.jsx("div",{className:"upload-icon",children:n.jsx("i",{className:"fas fa-cloud-upload-alt"})}),n.jsx("div",{className:"upload-text",children:e.text}),n.jsx("div",{className:"upload-subtext",children:"JPG, PNG or PDF, max 5MB"}),n.jsx("input",{style:{display:"none"},disabled:o||p,accept:"image/*",type:"file",onChange:u,ref:i})]})});return n.jsxs(ar,{children:[p||s().length>0?null:S,s().length>0&&n.jsx("div",{className:"upload-card",children:s().length===0?S:s().map(x=>n.jsxs("div",{className:"uploaded-box",children:[n.jsx("img",{alt:x.name,src:x.downloadUrl,className:"uploaded-img"}),n.jsxs("div",{className:"img-buttons",children:[n.jsx("button",{type:"button",className:"btn btn-link",onClick:()=>c(x),children:n.jsx("i",{className:"fas fa-search"})}),!p&&n.jsx("button",{type:"button",className:"btn btn-link ml-2",onClick:()=>l(x.id),children:n.jsx("i",{className:"fas fa-times"})})]})]},x.id||x.name))}),r&&n.jsx($e,{src:r.src,alt:r.alt,onClose:y})]})}be.propTypes={readonly:F.bool,storage:F.object,value:F.any,onChange:F.func,text:F.string};be.defaultProps={text:"Upload"};function re(e){const{label:o,name:t,text:r,hint:a,storage:i,max:s,required:l,externalErrorMessage:u}=e,{errors:c,formState:{touched:y,isSubmitted:p},setValue:S,watch:x,register:d}=dt();E.useEffect(()=>{d({name:t})},[d,t]);const g=ut.errorMessage(t,c,y,p,u);return n.jsxs("div",{className:"file-upload",children:[!!o&&n.jsx("label",{className:`input-label ${l?"required":null}`,htmlFor:t,children:o}),n.jsx(be,{storage:i,value:x(t),onChange:f=>{S(t,f,{shouldValidate:!0,shouldDirty:!0}),e.onChange&&e.onChange(f)},text:r,max:s}),n.jsx("div",{className:"invalid-feedback",children:g}),!!a&&n.jsx("small",{className:"form-text text-muted",children:a})]})}re.defaultProps={max:void 0,required:!1};re.propTypes={storage:F.object.isRequired,max:F.number,required:F.bool,name:F.string.isRequired,label:F.string,hint:F.string,formItemProps:F.object,text:F.string};const sr={status:["pending","canceled","success"],type:["withdraw","deposit"]},ir=e=>lt().shape({user:T.relationToOne(h("entities.vip.fields.title"),{}),Documenttype:T.string(h("pages.proof.fields.documentType")),realname:T.string(h("pages.proof.fields.fullName"),{required:!0}),idnumer:T.string(h("pages.proof.fields.documentNumber"),{required:!0}),address:T.string(h("pages.proof.fields.address"),{required:!0}),front:T.images(h("pages.proof.fields.frontSide"),{required:!0}),back:e==="passport"?T.images(h("pages.proof.fields.backSide")):T.images(h("pages.proof.fields.backSide"),{required:!0}),status:T.enumerator(h("entities.transaction.fields.status"),{options:sr.status})});function hr(){const[e,o]=E.useState("passport"),t=je(ot.selectCurrentUser),r=je(at.selectKycStatus),a=yt(),i=nt();E.useEffect(()=>{a(st.doFetch())},[a]);const s=E.useMemo(()=>ir(e),[e]),l=pt({resolver:ft.yupResolver(s),mode:"all",defaultValues:{user:t||[],Documenttype:e,realname:"",idnumer:"",address:"",front:[],back:[],status:"pending"}}),u=p=>{const S={...p,user:t,Documenttype:e};e==="passport"&&(S.back=[]),a(ct.doCreate(S))},c=p=>{o(p),p==="passport"&&l.setValue("back",[])},y=[{value:"passport",label:h("pages.proof.documentTypes.passport"),icon:"fas fa-passport"},{value:"idCard",label:h("pages.proof.documentTypes.idCard"),icon:"fas fa-id-card"},{value:"driversLicense",label:h("pages.proof.documentTypes.driversLicense"),icon:"fas fa-id-card-alt"}];return r!=="unverified"?n.jsxs("div",{className:"proof-container",children:[n.jsx("div",{className:"header",children:n.jsxs("div",{className:"nav-bar",children:[n.jsx("button",{className:"back-arrow",onClick:()=>i.push("/profile"),type:"button",children:n.jsx("i",{className:"fas fa-arrow-left"})}),n.jsx("div",{className:"page-title",children:h("pages.proof.title")})]})}),n.jsx("div",{className:"content-card",children:n.jsx("div",{className:"kyc-status-view",children:r==="pending"?n.jsxs(n.Fragment,{children:[n.jsx("div",{className:"status-icon pending",children:n.jsx("i",{className:"fas fa-clock"})}),n.jsx("h2",{className:"status-title",children:h("pages.kycStatus.pending.title")}),n.jsx("p",{className:"status-message",children:h("pages.kycStatus.pending.message")}),n.jsxs("div",{className:"status-note",children:[n.jsx("i",{className:"fas fa-info-circle"}),h("pages.kycStatus.pending.note")]})]}):n.jsxs(n.Fragment,{children:[n.jsx("div",{className:"status-icon success",children:n.jsx("i",{className:"fas fa-check-circle"})}),n.jsx("h2",{className:"status-title",children:h("pages.kycStatus.success.title")}),n.jsx("p",{className:"status-message",children:h("pages.kycStatus.success.message")}),n.jsxs("div",{className:"status-features",children:[n.jsx("h3",{children:h("pages.kycStatus.success.featuresTitle")}),n.jsx("ul",{children:n.jsxs("li",{children:[n.jsx("i",{className:"fas fa-check"}),h("pages.kycStatus.success.features.allAccess")]})})]})]})})}),n.jsx("style",{children:`
          .proof-container {
            max-width: 430px;
            margin: 0 auto;
            min-height: 100vh;
            background-color: #0f0f0f;
            border-top: 2px solid #39FF14;
            display: flex;
            flex-direction: column;
            box-sizing: border-box;
            color: #ffffff;
          }

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
            background: none;
            border: none;
            color: #ffffff;
            font-size: 20px;
            cursor: pointer;
            padding: 0;
            display: flex;
            align-items: center;
            justify-content: center;
          }

          .back-arrow:hover {
            color: #39FF14;
          }

          .page-title {
            font-size: 18px;
            font-weight: 500;
            color: #ffffff;
          }

          .content-card {
            flex: 1;
            background-color: #1c1c1c;
            border-top-left-radius: 24px;
            border-top-right-radius: 24px;
            padding: 24px 20px;
            margin-top: 20px;
            border-top: 2px solid #39FF14;
            display: flex;
            flex-direction: column;
            align-items: center;
          }

          .kyc-status-view {
            text-align: center;
            width: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
          }

          .status-icon {
            width: 80px;
            height: 80px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 32px;
            margin-bottom: 20px;
          }

          .status-icon.pending {
            background-color: rgba(0, 123, 255, 0.15);
            color: #007bff;
            border: 2px solid #007bff;
          }

          .status-icon.success {
            background-color: rgba(57, 255, 20, 0.15);
            color: #39FF14;
            border: 2px solid #39FF14;
          }

          .status-title {
            font-size: 22px;
            font-weight: 600;
            margin-bottom: 12px;
            color: #ffffff;
          }

          .status-message {
            font-size: 14px;
            color: #aaaaaa;
            line-height: 1.6;
            margin-bottom: 20px;
            max-width: 340px;
          }

          .status-note {
            background-color: #2a2a2a;
            border-left: 4px solid #007bff;
            padding: 12px 16px;
            border-radius: 8px;
            font-size: 13px;
            color: #cccccc;
            display: flex;
            align-items: center;
            gap: 10px;
            margin-bottom: 24px;
            max-width: 340px;
            text-align: left;
          }

          .status-note i {
            color: #007bff;
            font-size: 16px;
          }

          .status-features {
            background-color: #2a2a2a;
            border-radius: 12px;
            padding: 20px;
            margin-bottom: 24px;
            width: 100%;
            max-width: 340px;
          }

          .status-features h3 {
            font-size: 14px;
            color: #39FF14;
            margin-bottom: 16px;
            text-align: left;
          }

          .status-features ul {
            list-style: none;
            padding: 0;
            margin: 0;
          }

          .status-features li {
            display: flex;
            align-items: center;
            gap: 12px;
            padding: 10px 0;
            border-bottom: 1px solid #3a3a3a;
            font-size: 13px;
            color: #ffffff;
          }

          .status-features li:last-child {
            border-bottom: none;
          }

          .status-features li i {
            color: #39FF14;
            width: 16px;
            text-align: center;
          }

          .back-to-profile {
            background-color: #2a2a2a;
            color: #ffffff;
            font-weight: bold;
            padding: 12px 24px;
            border: none;
            border-radius: 25px;
            font-size: 14px;
            cursor: pointer;
            text-decoration: none;
            transition: all 0.2s;
            display: inline-flex;
            align-items: center;
            gap: 8px;
          }

          .back-to-profile:hover {
            background-color: #39FF14;
            color: #0f0f0f;
          }
        `})]}):n.jsxs("div",{className:"proof-container",children:[n.jsx("div",{className:"header",children:n.jsxs("div",{className:"nav-bar",children:[n.jsx(it,{to:"/profile",className:"back-arrow",children:n.jsx("i",{className:"fas fa-arrow-left"})}),n.jsx("div",{className:"page-title",children:h("pages.proof.title")})]})}),n.jsxs("div",{className:"content-card",children:[n.jsxs("div",{className:"instructions",children:[n.jsx("i",{className:"fas fa-info-circle"}),h("pages.proof.instructions")]}),n.jsx(mt,{...l,children:n.jsxs("form",{onSubmit:l.handleSubmit(u),children:[n.jsxs("div",{className:"form-section",children:[n.jsx("div",{className:"section-title",children:h("pages.proof.sections.documentInfo")}),n.jsxs("div",{className:"document-type-section",children:[n.jsxs("div",{className:"input-label",children:[h("pages.proof.fields.documentType")," ",n.jsx("span",{className:"required",children:"*"})]}),n.jsx("div",{className:"document-type-options",children:y.map(p=>n.jsxs("div",{className:`document-option ${p.value===e?"selected":""}`,onClick:()=>c(p.value),children:[n.jsx("i",{className:`${p.icon} document-icon`}),n.jsx("span",{className:"document-text",children:p.label})]},p.value))})]}),n.jsx("div",{className:"input-group",children:n.jsx(ie,{className:"form-input",name:"realname",label:h("pages.proof.fields.fullName"),placeholder:h("pages.proof.placeholders.fullName")})}),n.jsx("div",{className:"input-group",children:n.jsx(ie,{className:"form-input",name:"idnumer",label:h("pages.proof.fields.documentNumber"),placeholder:h("pages.proof.placeholders.documentNumber")})}),n.jsx("div",{className:"input-group",children:n.jsx(ie,{className:"form-input",name:"address",label:h("pages.proof.fields.address"),placeholder:h("pages.proof.placeholders.address")})})]}),n.jsxs("div",{className:"form-section",children:[n.jsx("div",{className:"section-title",children:h("pages.proof.sections.documentUpload")}),n.jsx("div",{className:"upload-section",children:n.jsx(re,{name:"front",label:h("pages.proof.fields.frontSide"),storage:Ne.values.categoryPhoto,text:h("pages.proof.uploadTexts.frontSide"),max:2})}),e!=="passport"&&n.jsx("div",{className:"upload-section",children:n.jsx(re,{name:"back",label:h("pages.proof.fields.backSide"),storage:Ne.values.categoryPhoto,text:h("pages.proof.uploadTexts.backSide"),max:2})})]}),n.jsxs("div",{className:"security-note",children:[n.jsxs("div",{className:"security-header",children:[n.jsx("i",{className:"fas fa-shield-alt"})," ",h("pages.proof.security.title")]}),n.jsx("div",{className:"security-text",children:h("pages.proof.security.text")})]}),n.jsx("button",{type:"submit",className:"submit-button",children:h("pages.proof.buttons.validateDocuments")})]})})]}),n.jsx("style",{children:`
        /* Proof Container – matches login/profile containers */
        .proof-container {
          max-width: 430px;
          margin: 0 auto;
          min-height: 100vh;
          background-color: #0f0f0f;
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
          // min-width: 100px;
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
          color: #0f0f0f;
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
      `})]})}export{hr as default};
