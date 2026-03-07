import{g as dt,j as N,ae as ut,af as pt,o as ft,R as Ne,ag as Qe,ah as ht,i as oe,a0 as W,k as l,ai as mt,u as gt,v as xt,L as bt,aj as $e,X as vt,ak as yt}from"./index-680400b2.js";import{a as wt,b as kt,u as St,y as Ct,F as At}from"./FormErrors-ac5f9122.js";import{y as ne}from"./yupFormSchemas-9e97c356.js";import{I as Ee}from"./InputFormItem-b434e9bf.js";import{v as jt}from"./v4-4a60fe23.js";import{u as Nt}from"./useDispatch-cbb2647c.js";var Je={exports:{}};(function(e,r){(function(t){var a=/^(b|B)$/,n={iec:{bits:["b","Kib","Mib","Gib","Tib","Pib","Eib","Zib","Yib"],bytes:["B","KiB","MiB","GiB","TiB","PiB","EiB","ZiB","YiB"]},jedec:{bits:["b","Kb","Mb","Gb","Tb","Pb","Eb","Zb","Yb"],bytes:["B","KB","MB","GB","TB","PB","EB","ZB","YB"]}},s={iec:["","kibi","mebi","gibi","tebi","pebi","exbi","zebi","yobi"],jedec:["","kilo","mega","giga","tera","peta","exa","zetta","yotta"]};function i(u){var m,p,A,j,O,w,g,y,x,B,C,D,F,_,J,M=1<arguments.length&&arguments[1]!==void 0?arguments[1]:{},b=[],V=0,I=void 0,Z=void 0;if(isNaN(u))throw new TypeError("Invalid number");return p=M.bits===!0,C=M.unix===!0,m=M.base||2,B=M.round!==void 0?M.round:C?1:2,w=M.locale!==void 0?M.locale:"",g=M.localeOptions||{},D=M.separator!==void 0?M.separator:"",F=M.spacer!==void 0?M.spacer:C?"":" ",J=M.symbols||{},_=m===2&&M.standard||"jedec",x=M.output||"string",j=M.fullform===!0,O=M.fullforms instanceof Array?M.fullforms:[],I=M.exponent!==void 0?M.exponent:-1,A=2<m?1e3:1024,(y=(Z=Number(u))<0)&&(Z=-Z),(I===-1||isNaN(I))&&(I=Math.floor(Math.log(Z)/Math.log(A)))<0&&(I=0),8<I&&(I=8),x==="exponent"?I:(Z===0?(b[0]=0,b[1]=C?"":n[_][p?"bits":"bytes"][I]):(V=Z/(m===2?Math.pow(2,10*I):Math.pow(1e3,I)),p&&A<=(V*=8)&&I<8&&(V/=A,I++),b[0]=Number(V.toFixed(0<I?B:0)),b[0]===A&&I<8&&M.exponent===void 0&&(b[0]=1,I++),b[1]=m===10&&I===1?p?"kb":"kB":n[_][p?"bits":"bytes"][I],C&&(b[1]=_==="jedec"?b[1].charAt(0):0<I?b[1].replace(/B$/,""):b[1],a.test(b[1])&&(b[0]=Math.floor(b[0]),b[1]=""))),y&&(b[0]=-b[0]),b[1]=J[b[1]]||b[1],w===!0?b[0]=b[0].toLocaleString():0<w.length?b[0]=b[0].toLocaleString(w,g):0<D.length&&(b[0]=b[0].toString().replace(".",D)),x==="array"?b:(j&&(b[1]=O[I]?O[I]:s[_][I]+(p?"bit":"byte")+(b[0]===1?"":"s")),x==="object"?{value:b[0],symbol:b[1],exponent:I}:b.join(F)))}i.partial=function(u){return function(m){return i(m,u)}},e.exports=i})()})(Je);var It=Je.exports;const zt=dt(It);class Ye{static validate(r,t){if(!t)return;if(t.image&&!r.type.startsWith("image"))throw new Error(N("fileUploader.image"));if(t.storage.maxSizeInBytes&&r.size>t.storage.maxSizeInBytes)throw new Error(N("fileUploader.size",zt(t.storage.maxSizeInBytes)));const a=Ge(r.name);if(t.formats&&!t.formats.includes(a))throw new Error(N("fileUploader.formats",t.formats.join(", ")))}static async upload(r,t){try{this.validate(r,t)}catch(p){return Promise.reject(p)}const a=Ge(r.name),n=jt(),s=`${n}.${a}`,{uploadCredentials:i,downloadUrl:u,privateUrl:m}=await this.fetchFileCredentials(s,t);return await this.uploadToServer(r,i),{id:n,name:r.name,sizeInBytes:r.size,publicUrl:i&&i.publicUrl?i.publicUrl:null,privateUrl:m,downloadUrl:u,new:!0}}static async fetchFileCredentials(r,t){const a=ut.get(),{data:n}=await pt.get(`/tenant/${a}/file/credentials`,{params:{filename:r,storageId:t.storage.id}});return n}static async uploadToServer(r,t){try{const a=t.url,n=new FormData;for(const[s,i]of Object.entries(t.fields||{}))n.append(s,i);return n.append("file",r),ft.post(a,n,{headers:{"Content-Type":"multipart/form-data"}})}catch(a){throw console.error(a),a}}}function Ge(e){if(!e)return null;const t=/(?:\.([^.]+))?$/.exec(e);return t?t[1]:null}function Et(e){function r(h,d,f,k,o){for(var E=0,c=0,L=0,P=0,T,S,$=0,X=0,z,H=z=T=0,R=0,Y=0,ge=0,G=0,ye=f.length,xe=ye-1,re,v="",U="",Ie="",ze="",se;R<ye;){if(S=f.charCodeAt(R),R===xe&&c+P+L+E!==0&&(c!==0&&(S=c===47?10:47),P=L=E=0,ye++,xe++),c+P+L+E===0){if(R===xe&&(0<Y&&(v=v.replace(O,"")),0<v.trim().length)){switch(S){case 32:case 9:case 59:case 13:case 10:break;default:v+=f.charAt(R)}S=59}switch(S){case 123:for(v=v.trim(),T=v.charCodeAt(0),z=1,G=++R;R<ye;){switch(S=f.charCodeAt(R)){case 123:z++;break;case 125:z--;break;case 47:switch(S=f.charCodeAt(R+1)){case 42:case 47:e:{for(H=R+1;H<xe;++H)switch(f.charCodeAt(H)){case 47:if(S===42&&f.charCodeAt(H-1)===42&&R+2!==H){R=H+1;break e}break;case 10:if(S===47){R=H+1;break e}}R=H}}break;case 91:S++;case 40:S++;case 34:case 39:for(;R++<xe&&f.charCodeAt(R)!==S;);}if(z===0)break;R++}switch(z=f.substring(G,R),T===0&&(T=(v=v.replace(j,"").trim()).charCodeAt(0)),T){case 64:switch(0<Y&&(v=v.replace(O,"")),S=v.charCodeAt(1),S){case 100:case 109:case 115:case 45:Y=d;break;default:Y=pe}if(z=r(d,Y,z,S,o+1),G=z.length,0<Q&&(Y=t(pe,v,ge),se=u(3,z,Y,d,ee,K,G,S,o,k),v=Y.join(""),se!==void 0&&(G=(z=se.trim()).length)===0&&(S=0,z="")),0<G)switch(S){case 115:v=v.replace(J,i);case 100:case 109:case 45:z=v+"{"+z+"}";break;case 107:v=v.replace(C,"$1 $2"),z=v+"{"+z+"}",z=q===1||q===2&&s("@"+z,3)?"@-webkit-"+z+"@"+z:"@"+z;break;default:z=v+z,k===112&&(z=(U+=z,""))}else z="";break;default:z=r(d,t(d,v,ge),z,k,o+1)}Ie+=z,z=ge=Y=H=T=0,v="",S=f.charCodeAt(++R);break;case 125:case 59:if(v=(0<Y?v.replace(O,""):v).trim(),1<(G=v.length))switch(H===0&&(T=v.charCodeAt(0),T===45||96<T&&123>T)&&(G=(v=v.replace(" ",":")).length),0<Q&&(se=u(1,v,d,h,ee,K,U.length,k,o,k))!==void 0&&(G=(v=se.trim()).length)===0&&(v="\0\0"),T=v.charCodeAt(0),S=v.charCodeAt(1),T){case 0:break;case 64:if(S===105||S===99){ze+=v+f.charAt(R);break}default:v.charCodeAt(G-1)!==58&&(U+=n(v,T,S,v.charCodeAt(2)))}ge=Y=H=T=0,v="",S=f.charCodeAt(++R)}}switch(S){case 13:case 10:c===47?c=0:1+T===0&&k!==107&&0<v.length&&(Y=1,v+="\0"),0<Q*he&&u(0,v,d,h,ee,K,U.length,k,o,k),K=1,ee++;break;case 59:case 125:if(c+P+L+E===0){K++;break}default:switch(K++,re=f.charAt(R),S){case 9:case 32:if(P+E+c===0)switch($){case 44:case 58:case 9:case 32:re="";break;default:S!==32&&(re=" ")}break;case 0:re="\\0";break;case 12:re="\\f";break;case 11:re="\\v";break;case 38:P+c+E===0&&(Y=ge=1,re="\f"+re);break;case 108:if(P+c+E+ae===0&&0<H)switch(R-H){case 2:$===112&&f.charCodeAt(R-3)===58&&(ae=$);case 8:X===111&&(ae=X)}break;case 58:P+c+E===0&&(H=R);break;case 44:c+L+P+E===0&&(Y=1,re+="\r");break;case 34:case 39:c===0&&(P=P===S?0:P===0?S:P);break;case 91:P+c+L===0&&E++;break;case 93:P+c+L===0&&E--;break;case 41:P+c+E===0&&L--;break;case 40:if(P+c+E===0){if(T===0)switch(2*$+3*X){case 533:break;default:T=1}L++}break;case 64:c+L+P+E+H+z===0&&(z=1);break;case 42:case 47:if(!(0<P+E+L))switch(c){case 0:switch(2*S+3*f.charCodeAt(R+1)){case 235:c=47;break;case 220:G=R,c=42}break;case 42:S===47&&$===42&&G+2!==R&&(f.charCodeAt(G+2)===33&&(U+=f.substring(G,R+1)),re="",c=0)}}c===0&&(v+=re)}X=$,$=S,R++}if(G=U.length,0<G){if(Y=d,0<Q&&(se=u(2,U,Y,h,ee,K,G,k,o,k),se!==void 0&&(U=se).length===0))return ze+U+Ie;if(U=Y.join(",")+"{"+U+"}",q*ae!==0){switch(q!==2||s(U,2)||(ae=0),ae){case 111:U=U.replace(F,":-moz-$1")+U;break;case 112:U=U.replace(D,"::-webkit-input-$1")+U.replace(D,"::-moz-$1")+U.replace(D,":-ms-input-$1")+U}ae=0}}return ze+U+Ie}function t(h,d,f){var k=d.trim().split(x);d=k;var o=k.length,E=h.length;switch(E){case 0:case 1:var c=0;for(h=E===0?"":h[0]+" ";c<o;++c)d[c]=a(h,d[c],f).trim();break;default:var L=c=0;for(d=[];c<o;++c)for(var P=0;P<E;++P)d[L++]=a(h[P]+" ",k[c],f).trim()}return d}function a(h,d,f){var k=d.charCodeAt(0);switch(33>k&&(k=(d=d.trim()).charCodeAt(0)),k){case 38:return d.replace(B,"$1"+h.trim());case 58:return h.trim()+d.replace(B,"$1"+h.trim());default:if(0<1*f&&0<d.indexOf("\f"))return d.replace(B,(h.charCodeAt(0)===58?"":"$1")+h.trim())}return h+d}function n(h,d,f,k){var o=h+";",E=2*d+3*f+4*k;if(E===944){h=o.indexOf(":",9)+1;var c=o.substring(h,o.length-1).trim();return c=o.substring(0,h).trim()+c+";",q===1||q===2&&s(c,1)?"-webkit-"+c+c:c}if(q===0||q===2&&!s(o,1))return o;switch(E){case 1015:return o.charCodeAt(10)===97?"-webkit-"+o+o:o;case 951:return o.charCodeAt(3)===116?"-webkit-"+o+o:o;case 963:return o.charCodeAt(5)===110?"-webkit-"+o+o:o;case 1009:if(o.charCodeAt(4)!==100)break;case 969:case 942:return"-webkit-"+o+o;case 978:return"-webkit-"+o+"-moz-"+o+o;case 1019:case 983:return"-webkit-"+o+"-moz-"+o+"-ms-"+o+o;case 883:if(o.charCodeAt(8)===45)return"-webkit-"+o+o;if(0<o.indexOf("image-set(",11))return o.replace(Z,"$1-webkit-$2")+o;break;case 932:if(o.charCodeAt(4)===45)switch(o.charCodeAt(5)){case 103:return"-webkit-box-"+o.replace("-grow","")+"-webkit-"+o+"-ms-"+o.replace("grow","positive")+o;case 115:return"-webkit-"+o+"-ms-"+o.replace("shrink","negative")+o;case 98:return"-webkit-"+o+"-ms-"+o.replace("basis","preferred-size")+o}return"-webkit-"+o+"-ms-"+o+o;case 964:return"-webkit-"+o+"-ms-flex-"+o+o;case 1023:if(o.charCodeAt(8)!==99)break;return c=o.substring(o.indexOf(":",15)).replace("flex-","").replace("space-between","justify"),"-webkit-box-pack"+c+"-webkit-"+o+"-ms-flex-pack"+c+o;case 1005:return g.test(o)?o.replace(w,":-webkit-")+o.replace(w,":-moz-")+o:o;case 1e3:switch(c=o.substring(13).trim(),d=c.indexOf("-")+1,c.charCodeAt(0)+c.charCodeAt(d)){case 226:c=o.replace(_,"tb");break;case 232:c=o.replace(_,"tb-rl");break;case 220:c=o.replace(_,"lr");break;default:return o}return"-webkit-"+o+"-ms-"+c+o;case 1017:if(o.indexOf("sticky",9)===-1)break;case 975:switch(d=(o=h).length-10,c=(o.charCodeAt(d)===33?o.substring(0,d):o).substring(h.indexOf(":",7)+1).trim(),E=c.charCodeAt(0)+(c.charCodeAt(7)|0)){case 203:if(111>c.charCodeAt(8))break;case 115:o=o.replace(c,"-webkit-"+c)+";"+o;break;case 207:case 102:o=o.replace(c,"-webkit-"+(102<E?"inline-":"")+"box")+";"+o.replace(c,"-webkit-"+c)+";"+o.replace(c,"-ms-"+c+"box")+";"+o}return o+";";case 938:if(o.charCodeAt(5)===45)switch(o.charCodeAt(6)){case 105:return c=o.replace("-items",""),"-webkit-"+o+"-webkit-box-"+c+"-ms-flex-"+c+o;case 115:return"-webkit-"+o+"-ms-flex-item-"+o.replace(b,"")+o;default:return"-webkit-"+o+"-ms-flex-line-pack"+o.replace("align-content","").replace(b,"")+o}break;case 973:case 989:if(o.charCodeAt(3)!==45||o.charCodeAt(4)===122)break;case 931:case 953:if(I.test(h)===!0)return(c=h.substring(h.indexOf(":")+1)).charCodeAt(0)===115?n(h.replace("stretch","fill-available"),d,f,k).replace(":fill-available",":stretch"):o.replace(c,"-webkit-"+c)+o.replace(c,"-moz-"+c.replace("fill-",""))+o;break;case 962:if(o="-webkit-"+o+(o.charCodeAt(5)===102?"-ms-"+o:"")+o,f+k===211&&o.charCodeAt(13)===105&&0<o.indexOf("transform",10))return o.substring(0,o.indexOf(";",27)+1).replace(y,"$1-webkit-$2")+o}return o}function s(h,d){var f=h.indexOf(d===1?":":"{"),k=h.substring(0,d!==3?f:10);return f=h.substring(f+1,h.length-1),fe(d!==2?k:k.replace(V,"$1"),f,d)}function i(h,d){var f=n(d,d.charCodeAt(0),d.charCodeAt(1),d.charCodeAt(2));return f!==d+";"?f.replace(M," or ($1)").substring(4):"("+d+")"}function u(h,d,f,k,o,E,c,L,P,T){for(var S=0,$=d,X;S<Q;++S)switch(X=te[S].call(A,h,$,f,k,o,E,c,L,P,T)){case void 0:case!1:case!0:case null:break;default:$=X}if($!==d)return $}function m(h){switch(h){case void 0:case null:Q=te.length=0;break;default:if(typeof h=="function")te[Q++]=h;else if(typeof h=="object")for(var d=0,f=h.length;d<f;++d)m(h[d]);else he=!!h|0}return m}function p(h){return h=h.prefix,h!==void 0&&(fe=null,h?typeof h!="function"?q=1:(q=2,fe=h):q=0),p}function A(h,d){var f=h;if(33>f.charCodeAt(0)&&(f=f.trim()),me=f,f=[me],0<Q){var k=u(-1,d,f,f,ee,K,0,0,0,0);k!==void 0&&typeof k=="string"&&(d=k)}var o=r(pe,f,d,0,0);return 0<Q&&(k=u(-2,o,f,f,ee,K,o.length,0,0,0),k!==void 0&&(o=k)),me="",ae=0,K=ee=1,o}var j=/^\0+/g,O=/[\0\r\f]/g,w=/: */g,g=/zoo|gra/,y=/([,: ])(transform)/g,x=/,\r+?/g,B=/([\t\r\n ])*\f?&/g,C=/@(k\w+)\s*(\S*)\s*/,D=/::(place)/g,F=/:(read-only)/g,_=/[svh]\w+-[tblr]{2}/,J=/\(\s*(.*)\s*\)/g,M=/([\s\S]*?);/g,b=/-self|flex-/g,V=/[^]*?(:[rp][el]a[\w-]+)[^]*/,I=/stretch|:\s*\w+\-(?:conte|avail)/,Z=/([^-])(image-set\()/,K=1,ee=1,ae=0,q=1,pe=[],te=[],Q=0,fe=null,he=0,me="";return A.use=m,A.set=p,e!==void 0&&p(e),A}var Pt={animationIterationCount:1,borderImageOutset:1,borderImageSlice:1,borderImageWidth:1,boxFlex:1,boxFlexGroup:1,boxOrdinalGroup:1,columnCount:1,columns:1,flex:1,flexGrow:1,flexPositive:1,flexShrink:1,flexNegative:1,flexOrder:1,gridRow:1,gridRowEnd:1,gridRowSpan:1,gridRowStart:1,gridColumn:1,gridColumnEnd:1,gridColumnSpan:1,gridColumnStart:1,msGridRow:1,msGridRowSpan:1,msGridColumn:1,msGridColumnSpan:1,fontWeight:1,lineHeight:1,opacity:1,order:1,orphans:1,tabSize:1,widows:1,zIndex:1,zoom:1,WebkitLineClamp:1,fillOpacity:1,floodOpacity:1,stopOpacity:1,strokeDasharray:1,strokeDashoffset:1,strokeMiterlimit:1,strokeOpacity:1,strokeWidth:1};function Rt(e){var r={};return function(t){return r[t]===void 0&&(r[t]=e(t)),r[t]}}var Tt=/^((children|dangerouslySetInnerHTML|key|ref|autoFocus|defaultValue|defaultChecked|innerHTML|suppressContentEditableWarning|suppressHydrationWarning|valueLink|accept|acceptCharset|accessKey|action|allow|allowUserMedia|allowPaymentRequest|allowFullScreen|allowTransparency|alt|async|autoComplete|autoPlay|capture|cellPadding|cellSpacing|challenge|charSet|checked|cite|classID|className|cols|colSpan|content|contentEditable|contextMenu|controls|controlsList|coords|crossOrigin|data|dateTime|decoding|default|defer|dir|disabled|disablePictureInPicture|download|draggable|encType|form|formAction|formEncType|formMethod|formNoValidate|formTarget|frameBorder|headers|height|hidden|high|href|hrefLang|htmlFor|httpEquiv|id|inputMode|integrity|is|keyParams|keyType|kind|label|lang|list|loading|loop|low|marginHeight|marginWidth|max|maxLength|media|mediaGroup|method|min|minLength|multiple|muted|name|nonce|noValidate|open|optimum|pattern|placeholder|playsInline|poster|preload|profile|radioGroup|readOnly|referrerPolicy|rel|required|reversed|role|rows|rowSpan|sandbox|scope|scoped|scrolling|seamless|selected|shape|size|sizes|slot|span|spellCheck|src|srcDoc|srcLang|srcSet|start|step|style|summary|tabIndex|target|title|type|useMap|value|width|wmode|wrap|about|datatype|inlist|prefix|property|resource|typeof|vocab|autoCapitalize|autoCorrect|autoSave|color|inert|itemProp|itemScope|itemType|itemID|itemRef|on|results|security|unselectable|accentHeight|accumulate|additive|alignmentBaseline|allowReorder|alphabetic|amplitude|arabicForm|ascent|attributeName|attributeType|autoReverse|azimuth|baseFrequency|baselineShift|baseProfile|bbox|begin|bias|by|calcMode|capHeight|clip|clipPathUnits|clipPath|clipRule|colorInterpolation|colorInterpolationFilters|colorProfile|colorRendering|contentScriptType|contentStyleType|cursor|cx|cy|d|decelerate|descent|diffuseConstant|direction|display|divisor|dominantBaseline|dur|dx|dy|edgeMode|elevation|enableBackground|end|exponent|externalResourcesRequired|fill|fillOpacity|fillRule|filter|filterRes|filterUnits|floodColor|floodOpacity|focusable|fontFamily|fontSize|fontSizeAdjust|fontStretch|fontStyle|fontVariant|fontWeight|format|from|fr|fx|fy|g1|g2|glyphName|glyphOrientationHorizontal|glyphOrientationVertical|glyphRef|gradientTransform|gradientUnits|hanging|horizAdvX|horizOriginX|ideographic|imageRendering|in|in2|intercept|k|k1|k2|k3|k4|kernelMatrix|kernelUnitLength|kerning|keyPoints|keySplines|keyTimes|lengthAdjust|letterSpacing|lightingColor|limitingConeAngle|local|markerEnd|markerMid|markerStart|markerHeight|markerUnits|markerWidth|mask|maskContentUnits|maskUnits|mathematical|mode|numOctaves|offset|opacity|operator|order|orient|orientation|origin|overflow|overlinePosition|overlineThickness|panose1|paintOrder|pathLength|patternContentUnits|patternTransform|patternUnits|pointerEvents|points|pointsAtX|pointsAtY|pointsAtZ|preserveAlpha|preserveAspectRatio|primitiveUnits|r|radius|refX|refY|renderingIntent|repeatCount|repeatDur|requiredExtensions|requiredFeatures|restart|result|rotate|rx|ry|scale|seed|shapeRendering|slope|spacing|specularConstant|specularExponent|speed|spreadMethod|startOffset|stdDeviation|stemh|stemv|stitchTiles|stopColor|stopOpacity|strikethroughPosition|strikethroughThickness|string|stroke|strokeDasharray|strokeDashoffset|strokeLinecap|strokeLinejoin|strokeMiterlimit|strokeOpacity|strokeWidth|surfaceScale|systemLanguage|tableValues|targetX|targetY|textAnchor|textDecoration|textRendering|textLength|to|transform|u1|u2|underlinePosition|underlineThickness|unicode|unicodeBidi|unicodeRange|unitsPerEm|vAlphabetic|vHanging|vIdeographic|vMathematical|values|vectorEffect|version|vertAdvY|vertOriginX|vertOriginY|viewBox|viewTarget|visibility|widths|wordSpacing|writingMode|x|xHeight|x1|x2|xChannelSelector|xlinkActuate|xlinkArcrole|xlinkHref|xlinkRole|xlinkShow|xlinkTitle|xlinkType|xmlBase|xmlns|xmlnsXlink|xmlLang|xmlSpace|y|y1|y2|yChannelSelector|z|zoomAndPan|for|class|autofocus)|(([Dd][Aa][Tt][Aa]|[Aa][Rr][Ii][Aa]|x)-.*))$/,He=Rt(function(e){return Tt.test(e)||e.charCodeAt(0)===111&&e.charCodeAt(1)===110&&e.charCodeAt(2)<91});function ie(){return(ie=Object.assign||function(e){for(var r=1;r<arguments.length;r++){var t=arguments[r];for(var a in t)Object.prototype.hasOwnProperty.call(t,a)&&(e[a]=t[a])}return e}).apply(this,arguments)}var We=function(e,r){for(var t=[e[0]],a=0,n=r.length;a<n;a+=1)t.push(r[a],e[a+1]);return t},Oe=function(e){return e!==null&&typeof e=="object"&&(e.toString?e.toString():Object.prototype.toString.call(e))==="[object Object]"&&!Qe.typeOf(e)},Ce=Object.freeze([]),ce=Object.freeze({});function be(e){return typeof e=="function"}function Ve(e){return e.displayName||e.name||"Component"}function Fe(e){return e&&typeof e.styledComponentId=="string"}var de=typeof process<"u"&&({}.REACT_APP_SC_ATTR||{}.SC_ATTR)||"data-styled",Le=typeof window<"u"&&"HTMLElement"in window,Ot=!!(typeof SC_DISABLE_SPEEDY=="boolean"?SC_DISABLE_SPEEDY:typeof process<"u"&&{}.REACT_APP_SC_DISABLE_SPEEDY!==void 0&&{}.REACT_APP_SC_DISABLE_SPEEDY!==""?{}.REACT_APP_SC_DISABLE_SPEEDY!=="false"&&{}.REACT_APP_SC_DISABLE_SPEEDY:typeof process<"u"&&{}.SC_DISABLE_SPEEDY!==void 0&&{}.SC_DISABLE_SPEEDY!==""&&{}.SC_DISABLE_SPEEDY!=="false"&&{}.SC_DISABLE_SPEEDY);function ve(e){for(var r=arguments.length,t=new Array(r>1?r-1:0),a=1;a<r;a++)t[a-1]=arguments[a];throw new Error("An error occurred. See https://git.io/JUIaE#"+e+" for more information."+(t.length>0?" Args: "+t.join(", "):""))}var Bt=function(){function e(t){this.groupSizes=new Uint32Array(512),this.length=512,this.tag=t}var r=e.prototype;return r.indexOfGroup=function(t){for(var a=0,n=0;n<t;n++)a+=this.groupSizes[n];return a},r.insertRules=function(t,a){if(t>=this.groupSizes.length){for(var n=this.groupSizes,s=n.length,i=s;t>=i;)(i<<=1)<0&&ve(16,""+t);this.groupSizes=new Uint32Array(i),this.groupSizes.set(n),this.length=i;for(var u=s;u<i;u++)this.groupSizes[u]=0}for(var m=this.indexOfGroup(t+1),p=0,A=a.length;p<A;p++)this.tag.insertRule(m,a[p])&&(this.groupSizes[t]++,m++)},r.clearGroup=function(t){if(t<this.length){var a=this.groupSizes[t],n=this.indexOfGroup(t),s=n+a;this.groupSizes[t]=0;for(var i=n;i<s;i++)this.tag.deleteRule(n)}},r.getGroup=function(t){var a="";if(t>=this.length||this.groupSizes[t]===0)return a;for(var n=this.groupSizes[t],s=this.indexOfGroup(t),i=s+n,u=s;u<i;u++)a+=this.tag.getRule(u)+`/*!sc*/
`;return a},e}(),Se=new Map,Ae=new Map,Pe=1,we=function(e){if(Se.has(e))return Se.get(e);for(;Ae.has(Pe);)Pe++;var r=Pe++;return Se.set(e,r),Ae.set(r,e),r},Mt=function(e){return Ae.get(e)},_t=function(e,r){Se.set(e,r),Ae.set(r,e)},Dt="style["+de+'][data-styled-version="5.2.1"]',Ft=new RegExp("^"+de+'\\.g(\\d+)\\[id="([\\w\\d-]+)"\\].*?"([^"]*)'),Lt=function(e,r,t){for(var a,n=t.split(","),s=0,i=n.length;s<i;s++)(a=n[s])&&e.registerName(r,a)},Ut=function(e,r){for(var t=r.innerHTML.split(`/*!sc*/
`),a=[],n=0,s=t.length;n<s;n++){var i=t[n].trim();if(i){var u=i.match(Ft);if(u){var m=0|parseInt(u[1],10),p=u[2];m!==0&&(_t(p,m),Lt(e,p,u[3]),e.getTag().insertRules(m,a)),a.length=0}else a.push(i)}}},$t=function(){return typeof __webpack_nonce__<"u"?__webpack_nonce__:null},et=function(e){var r=document.head,t=e||r,a=document.createElement("style"),n=function(u){for(var m=u.childNodes,p=m.length;p>=0;p--){var A=m[p];if(A&&A.nodeType===1&&A.hasAttribute(de))return A}}(t),s=n!==void 0?n.nextSibling:null;a.setAttribute(de,"active"),a.setAttribute("data-styled-version","5.2.1");var i=$t();return i&&a.setAttribute("nonce",i),t.insertBefore(a,s),a},Yt=function(){function e(t){var a=this.element=et(t);a.appendChild(document.createTextNode("")),this.sheet=function(n){if(n.sheet)return n.sheet;for(var s=document.styleSheets,i=0,u=s.length;i<u;i++){var m=s[i];if(m.ownerNode===n)return m}ve(17)}(a),this.length=0}var r=e.prototype;return r.insertRule=function(t,a){try{return this.sheet.insertRule(a,t),this.length++,!0}catch{return!1}},r.deleteRule=function(t){this.sheet.deleteRule(t),this.length--},r.getRule=function(t){var a=this.sheet.cssRules[t];return a!==void 0&&typeof a.cssText=="string"?a.cssText:""},e}(),Gt=function(){function e(t){var a=this.element=et(t);this.nodes=a.childNodes,this.length=0}var r=e.prototype;return r.insertRule=function(t,a){if(t<=this.length&&t>=0){var n=document.createTextNode(a),s=this.nodes[t];return this.element.insertBefore(n,s||null),this.length++,!0}return!1},r.deleteRule=function(t){this.element.removeChild(this.nodes[t]),this.length--},r.getRule=function(t){return t<this.length?this.nodes[t].textContent:""},e}(),Ht=function(){function e(t){this.rules=[],this.length=0}var r=e.prototype;return r.insertRule=function(t,a){return t<=this.length&&(this.rules.splice(t,0,a),this.length++,!0)},r.deleteRule=function(t){this.rules.splice(t,1),this.length--},r.getRule=function(t){return t<this.length?this.rules[t]:""},e}(),qe=Le,Wt={isServer:!Le,useCSSOMInjection:!Ot},tt=function(){function e(t,a,n){t===void 0&&(t=ce),a===void 0&&(a={}),this.options=ie({},Wt,{},t),this.gs=a,this.names=new Map(n),!this.options.isServer&&Le&&qe&&(qe=!1,function(s){for(var i=document.querySelectorAll(Dt),u=0,m=i.length;u<m;u++){var p=i[u];p&&p.getAttribute(de)!=="active"&&(Ut(s,p),p.parentNode&&p.parentNode.removeChild(p))}}(this))}e.registerId=function(t){return we(t)};var r=e.prototype;return r.reconstructWithOptions=function(t,a){return a===void 0&&(a=!0),new e(ie({},this.options,{},t),this.gs,a&&this.names||void 0)},r.allocateGSInstance=function(t){return this.gs[t]=(this.gs[t]||0)+1},r.getTag=function(){return this.tag||(this.tag=(n=(a=this.options).isServer,s=a.useCSSOMInjection,i=a.target,t=n?new Ht(i):s?new Yt(i):new Gt(i),new Bt(t)));var t,a,n,s,i},r.hasNameForId=function(t,a){return this.names.has(t)&&this.names.get(t).has(a)},r.registerName=function(t,a){if(we(t),this.names.has(t))this.names.get(t).add(a);else{var n=new Set;n.add(a),this.names.set(t,n)}},r.insertRules=function(t,a,n){this.registerName(t,a),this.getTag().insertRules(we(t),n)},r.clearNames=function(t){this.names.has(t)&&this.names.get(t).clear()},r.clearRules=function(t){this.getTag().clearGroup(we(t)),this.clearNames(t)},r.clearTag=function(){this.tag=void 0},r.toString=function(){return function(t){for(var a=t.getTag(),n=a.length,s="",i=0;i<n;i++){var u=Mt(i);if(u!==void 0){var m=t.names.get(u),p=a.getGroup(i);if(m!==void 0&&p.length!==0){var A=de+".g"+i+'[id="'+u+'"]',j="";m!==void 0&&m.forEach(function(O){O.length>0&&(j+=O+",")}),s+=""+p+A+'{content:"'+j+`"}/*!sc*/
`}}}return s}(this)},e}(),Vt=/(a)(d)/gi,Xe=function(e){return String.fromCharCode(e+(e>25?39:97))};function Be(e){var r,t="";for(r=Math.abs(e);r>52;r=r/52|0)t=Xe(r%52)+t;return(Xe(r%52)+t).replace(Vt,"$1-$2")}var le=function(e,r){for(var t=r.length;t;)e=33*e^r.charCodeAt(--t);return e},rt=function(e){return le(5381,e)};function qt(e){for(var r=0;r<e.length;r+=1){var t=e[r];if(be(t)&&!Fe(t))return!1}return!0}var Xt=rt("5.2.1"),Zt=function(){function e(r,t,a){this.rules=r,this.staticRulesId="",this.isStatic=(a===void 0||a.isStatic)&&qt(r),this.componentId=t,this.baseHash=le(Xt,t),this.baseStyle=a,tt.registerId(t)}return e.prototype.generateAndInjectStyles=function(r,t,a){var n=this.componentId,s=[];if(this.baseStyle&&s.push(this.baseStyle.generateAndInjectStyles(r,t,a)),this.isStatic&&!a.hash)if(this.staticRulesId&&t.hasNameForId(n,this.staticRulesId))s.push(this.staticRulesId);else{var i=ue(this.rules,r,t,a).join(""),u=Be(le(this.baseHash,i.length)>>>0);if(!t.hasNameForId(n,u)){var m=a(i,"."+u,void 0,n);t.insertRules(n,u,m)}s.push(u),this.staticRulesId=u}else{for(var p=this.rules.length,A=le(this.baseHash,a.hash),j="",O=0;O<p;O++){var w=this.rules[O];if(typeof w=="string")j+=w;else if(w){var g=ue(w,r,t,a),y=Array.isArray(g)?g.join(""):g;A=le(A,y+O),j+=y}}if(j){var x=Be(A>>>0);if(!t.hasNameForId(n,x)){var B=a(j,"."+x,void 0,n);t.insertRules(n,x,B)}s.push(x)}}return s.join(" ")},e}(),Kt=/^\s*\/\/.*$/gm,Qt=[":","[",".","#"];function Jt(e){var r,t,a,n,s=e===void 0?ce:e,i=s.options,u=i===void 0?ce:i,m=s.plugins,p=m===void 0?Ce:m,A=new Et(u),j=[],O=function(y){function x(B){if(B)try{y(B+"}")}catch{}}return function(B,C,D,F,_,J,M,b,V,I){switch(B){case 1:if(V===0&&C.charCodeAt(0)===64)return y(C+";"),"";break;case 2:if(b===0)return C+"/*|*/";break;case 3:switch(b){case 102:case 112:return y(D[0]+C),"";default:return C+(I===0?"/*|*/":"")}case-2:C.split("/*|*/}").forEach(x)}}}(function(y){j.push(y)}),w=function(y,x,B){return x===0&&Qt.includes(B[t.length])||B.match(n)?y:"."+r};function g(y,x,B,C){C===void 0&&(C="&");var D=y.replace(Kt,""),F=x&&B?B+" "+x+" { "+D+" }":D;return r=C,t=x,a=new RegExp("\\"+t+"\\b","g"),n=new RegExp("(\\"+t+"\\b){2,}"),A(B||!x?"":x,F)}return A.use([].concat(p,[function(y,x,B){y===2&&B.length&&B[0].lastIndexOf(t)>0&&(B[0]=B[0].replace(a,w))},O,function(y){if(y===-2){var x=j;return j=[],x}}])),g.hash=p.length?p.reduce(function(y,x){return x.name||ve(15),le(y,x.name)},5381).toString():"",g}var at=Ne.createContext();at.Consumer;var ot=Ne.createContext(),er=(ot.Consumer,new tt),Me=Jt();function tr(){return oe.useContext(at)||er}function rr(){return oe.useContext(ot)||Me}var ar=function(){function e(r,t){var a=this;this.inject=function(n,s){s===void 0&&(s=Me);var i=a.name+s.hash;n.hasNameForId(a.id,i)||n.insertRules(a.id,i,s(a.rules,i,"@keyframes"))},this.toString=function(){return ve(12,String(a.name))},this.name=r,this.id="sc-keyframes-"+r,this.rules=t}return e.prototype.getName=function(r){return r===void 0&&(r=Me),this.name+r.hash},e}(),or=/([A-Z])/,nr=/([A-Z])/g,ir=/^ms-/,sr=function(e){return"-"+e.toLowerCase()};function Ze(e){return or.test(e)?e.replace(nr,sr).replace(ir,"-ms-"):e}var Ke=function(e){return e==null||e===!1||e===""};function ue(e,r,t,a){if(Array.isArray(e)){for(var n,s=[],i=0,u=e.length;i<u;i+=1)(n=ue(e[i],r,t,a))!==""&&(Array.isArray(n)?s.push.apply(s,n):s.push(n));return s}if(Ke(e))return"";if(Fe(e))return"."+e.styledComponentId;if(be(e)){if(typeof(p=e)!="function"||p.prototype&&p.prototype.isReactComponent||!r)return e;var m=e(r);return ue(m,r,t,a)}var p;return e instanceof ar?t?(e.inject(t,a),e.getName(a)):e:Oe(e)?function A(j,O){var w,g,y=[];for(var x in j)j.hasOwnProperty(x)&&!Ke(j[x])&&(Oe(j[x])?y.push.apply(y,A(j[x],x)):be(j[x])?y.push(Ze(x)+":",j[x],";"):y.push(Ze(x)+": "+(w=x,(g=j[x])==null||typeof g=="boolean"||g===""?"":typeof g!="number"||g===0||w in Pt?String(g).trim():g+"px")+";"));return O?[O+" {"].concat(y,["}"]):y}(e):e.toString()}function cr(e){for(var r=arguments.length,t=new Array(r>1?r-1:0),a=1;a<r;a++)t[a-1]=arguments[a];return be(e)||Oe(e)?ue(We(Ce,[e].concat(t))):t.length===0&&e.length===1&&typeof e[0]=="string"?e:ue(We(e,t))}var lr=function(e,r,t){return t===void 0&&(t=ce),e.theme!==t.theme&&e.theme||r||t.theme},dr=/[!"#$%&'()*+,./:;<=>?@[\\\]^`{|}~-]+/g,ur=/(^-|-$)/g;function Re(e){return e.replace(dr,"-").replace(ur,"")}var pr=function(e){return Be(rt(e)>>>0)};function ke(e){return typeof e=="string"&&!0}var _e=function(e){return typeof e=="function"||typeof e=="object"&&e!==null&&!Array.isArray(e)},fr=function(e){return e!=="__proto__"&&e!=="constructor"&&e!=="prototype"};function hr(e,r,t){var a=e[t];_e(r)&&_e(a)?nt(a,r):e[t]=r}function nt(e){for(var r=arguments.length,t=new Array(r>1?r-1:0),a=1;a<r;a++)t[a-1]=arguments[a];for(var n=0,s=t;n<s.length;n++){var i=s[n];if(_e(i))for(var u in i)fr(u)&&hr(e,i[u],u)}return e}var it=Ne.createContext();it.Consumer;var Te={};function st(e,r,t){var a=Fe(e),n=!ke(e),s=r.attrs,i=s===void 0?Ce:s,u=r.componentId,m=u===void 0?function(C,D){var F=typeof C!="string"?"sc":Re(C);Te[F]=(Te[F]||0)+1;var _=F+"-"+pr("5.2.1"+F+Te[F]);return D?D+"-"+_:_}(r.displayName,r.parentComponentId):u,p=r.displayName,A=p===void 0?function(C){return ke(C)?"styled."+C:"Styled("+Ve(C)+")"}(e):p,j=r.displayName&&r.componentId?Re(r.displayName)+"-"+r.componentId:r.componentId||m,O=a&&e.attrs?Array.prototype.concat(e.attrs,i).filter(Boolean):i,w=r.shouldForwardProp;a&&e.shouldForwardProp&&(w=r.shouldForwardProp?function(C,D){return e.shouldForwardProp(C,D)&&r.shouldForwardProp(C,D)}:e.shouldForwardProp);var g,y=new Zt(t,j,a?e.componentStyle:void 0),x=y.isStatic&&i.length===0,B=function(C,D){return function(F,_,J,M){var b=F.attrs,V=F.componentStyle,I=F.defaultProps,Z=F.foldedComponentIds,K=F.shouldForwardProp,ee=F.styledComponentId,ae=F.target,q=function(k,o,E){k===void 0&&(k=ce);var c=ie({},o,{theme:k}),L={};return E.forEach(function(P){var T,S,$,X=P;for(T in be(X)&&(X=X(c)),X)c[T]=L[T]=T==="className"?(S=L[T],$=X[T],S&&$?S+" "+$:S||$):X[T]}),[c,L]}(lr(_,oe.useContext(it),I)||ce,_,b),pe=q[0],te=q[1],Q=function(k,o,E,c){var L=tr(),P=rr(),T=o?k.generateAndInjectStyles(ce,L,P):k.generateAndInjectStyles(E,L,P);return T}(V,M,pe),fe=J,he=te.$as||_.$as||te.as||_.as||ae,me=ke(he),h=te!==_?ie({},_,{},te):_,d={};for(var f in h)f[0]!=="$"&&f!=="as"&&(f==="forwardedAs"?d.as=h[f]:(K?K(f,He):!me||He(f))&&(d[f]=h[f]));return _.style&&te.style!==_.style&&(d.style=ie({},_.style,{},te.style)),d.className=Array.prototype.concat(Z,ee,Q!==ee?Q:null,_.className,te.className).filter(Boolean).join(" "),d.ref=fe,oe.createElement(he,d)}(g,C,D,x)};return B.displayName=A,(g=Ne.forwardRef(B)).attrs=O,g.componentStyle=y,g.displayName=A,g.shouldForwardProp=w,g.foldedComponentIds=a?Array.prototype.concat(e.foldedComponentIds,e.styledComponentId):Ce,g.styledComponentId=j,g.target=a?e.target:e,g.withComponent=function(C){var D=r.componentId,F=function(J,M){if(J==null)return{};var b,V,I={},Z=Object.keys(J);for(V=0;V<Z.length;V++)b=Z[V],M.indexOf(b)>=0||(I[b]=J[b]);return I}(r,["componentId"]),_=D&&D+"-"+(ke(C)?C:Re(Ve(C)));return st(C,ie({},F,{attrs:O,componentId:_}),t)},Object.defineProperty(g,"defaultProps",{get:function(){return this._foldedDefaultProps},set:function(C){this._foldedDefaultProps=a?nt({},e.defaultProps,C):C}}),g.toString=function(){return"."+g.styledComponentId},n&&ht(g,e,{attrs:!0,componentStyle:!0,displayName:!0,foldedComponentIds:!0,shouldForwardProp:!0,styledComponentId:!0,target:!0,withComponent:!0}),g}var De=function(e){return function r(t,a,n){if(n===void 0&&(n=ce),!Qe.isValidElementType(a))return ve(1,String(a));var s=function(){return t(a,n,cr.apply(void 0,arguments))};return s.withConfig=function(i){return r(t,a,ie({},n,{},i))},s.attrs=function(i){return r(t,a,ie({},n,{attrs:Array.prototype.concat(n.attrs,i).filter(Boolean)}))},s}(st,e)};["a","abbr","address","area","article","aside","audio","b","base","bdi","bdo","big","blockquote","body","br","button","canvas","caption","cite","code","col","colgroup","data","datalist","dd","del","details","dfn","dialog","div","dl","dt","em","embed","fieldset","figcaption","figure","footer","form","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","i","iframe","img","input","ins","kbd","keygen","label","legend","li","link","main","map","mark","marquee","menu","menuitem","meta","meter","nav","noscript","object","ol","optgroup","option","output","p","param","picture","pre","progress","q","rp","rt","ruby","s","samp","script","section","select","small","source","span","strong","style","sub","summary","sup","table","tbody","td","textarea","tfoot","th","thead","time","title","tr","track","u","ul","var","video","wbr","circle","clipPath","defs","ellipse","foreignObject","g","image","line","linearGradient","marker","mask","path","pattern","polygon","polyline","radialGradient","rect","stop","svg","text","tspan"].forEach(function(e){De[e]=De(e)});const ct=De,mr=ct.div`
/* ImagesUploader.css or add to your style tag */
.images-uploader-wrapper {
  width: 100%;
  margin-bottom: 16px;
}

.upload-area {
  border: 2px dashed #e7eaee;
  border-radius: 12px;
  padding: 40px 20px;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  background: #f8f9fa;
  position: relative;
}

.upload-area:hover {
  border-color: #106cf5;
  background: #f0f7ff;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(16, 108, 245, 0.1);
}

.upload-area:active {
  transform: translateY(0);
}

.upload-icon {
  font-size: 48px;
  color: #106cf5;
  margin-bottom: 16px;
  opacity: 0.8;
}

.upload-text {
  font-size: 16px;
  font-weight: 600;
  color: #222;
  margin-bottom: 8px;
}

.upload-subtext {
  font-size: 12px;
  color: #888f99;
  font-weight: 400;
}

/* Upload card for showing uploaded image */
.upload-card {
  border: 1px solid #e7eaee;
  border-radius: 12px;
  padding: 16px;
  background: #fff;
  transition: all 0.3s ease;
}

.upload-card:hover {
  border-color: #106cf5;
  box-shadow: 0 4px 12px rgba(16, 108, 245, 0.1);
}

.uploaded-box {
  position: relative;
  border-radius: 8px;
  overflow: hidden;
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f8f9fa;
}

.uploaded-img {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  border-radius: 6px;
}

/* Image buttons */
.img-buttons {
  position: absolute;
  bottom: 12px;
  right: 12px;
  display: flex;
  gap: 8px;
  background: rgba(0, 0, 0, 0.6);
  padding: 6px 10px;
  border-radius: 20px;
  backdrop-filter: blur(4px);
}

.img-buttons button {
  background: none;
  border: none;
  color: white;
  font-size: 14px;
  cursor: pointer;
  padding: 4px 8px;
  border-radius: 50%;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
}

.img-buttons button:hover {
  background: rgba(255, 255, 255, 0.2);
  transform: scale(1.1);
}

.img-buttons button:active {
  transform: scale(0.95);
}

/* Loading state */
.upload-area.loading {
  opacity: 0.7;
  cursor: not-allowed;
}

.upload-area.loading .upload-icon {
  animation: spin 1s linear infinite;
}

/* Responsive adjustments */
@media (max-width: 380px) {
  .upload-area {
    padding: 30px 16px;
  }
  
  .upload-icon {
    font-size: 36px;
    margin-bottom: 12px;
  }
  
  .upload-text {
    font-size: 14px;
  }
  
  .upload-subtext {
    font-size: 11px;
  }
  
  .uploaded-box {
    height: 160px;
  }
  
  .upload-card {
    padding: 12px;
  }
}

/* Animations */
@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

/* Progress indicator for upload */
.upload-progress {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: #e7eaee;
  overflow: hidden;
  border-radius: 12px 12px 0 0;
}

.upload-progress-bar {
  height: 100%;
  background: linear-gradient(90deg, #106cf5 0%, #0a4fc4 100%);
  transition: width 0.3s ease;
}

/* Error state */
.upload-area.error {
  border-color: #f44336;
  background: #fff5f5;
}

.upload-area.error .upload-icon {
  color: #f44336;
}

.upload-area.error .upload-text {
  color: #f44336;
}

/* Success state */
.upload-area.success {
  border-color: #37b66a;
  background: #f7fdf9;
}

.upload-area.success .upload-icon {
  color: #37b66a;
}

.upload-area.success .upload-text {
  color: #37b66a;
}

`,gr=ct.div`
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
`;function lt(e){return l.jsx(gr,{children:l.jsxs("div",{className:"modal",children:[l.jsx("span",{className:"close",onClick:e.onClose,children:"×"}),l.jsx("img",{className:"modal-content",src:e.src,alt:e.alt})]})})}lt.propTypes={src:W.string.isRequired,alt:W.string.isRequired,onClose:W.func.isRequired};function Ue(e){const[r,t]=oe.useState(!1),[a,n]=oe.useState(null),s=oe.useRef(),i=()=>{const{value:w}=e;return w?Array.isArray(w)?w:[w]:[]},u=w=>{const g=i().filter(y=>y.id!==w);e.onChange(g)},m=async w=>{try{const g=w.target.files;if(!g||!g.length)return;let y=g[0];Ye.validate(y,{storage:e.storage,image:!0}),t(!0),y=await Ye.upload(y,{storage:e.storage,image:!0}),s!=null&&s.current&&(s.current.value=null),t(!1),e.onChange([y])}catch(g){s!=null&&s.current&&(s.current.value=null),console.error(g),t(!1),mt.showMessage(g)}},p=w=>{n({src:w.downloadUrl,alt:w.name})},A=()=>{n(null)},{readonly:j}=e,O=l.jsx("label",{children:l.jsxs("div",{className:"upload-area",children:[l.jsx("div",{className:"upload-icon",children:l.jsx("i",{className:"fas fa-cloud-upload-alt"})}),l.jsx("div",{className:"upload-text",children:e.text}),l.jsx("div",{className:"upload-subtext",children:"JPG, PNG or PDF, max 5MB"}),l.jsx("input",{style:{display:"none"},disabled:r||j,accept:"image/*",type:"file",onChange:m,ref:s})]})});return l.jsxs(mr,{children:[j||i().length>0?null:O,i().length>0&&l.jsx("div",{className:"upload-card",children:i().length===0?O:i().map(w=>l.jsxs("div",{className:"uploaded-box",children:[l.jsx("img",{alt:w.name,src:w.downloadUrl,className:"uploaded-img"}),l.jsxs("div",{className:"img-buttons",children:[l.jsx("button",{type:"button",className:"btn btn-link",onClick:()=>p(w),children:l.jsx("i",{className:"fas fa-search"})}),!j&&l.jsx("button",{type:"button",className:"btn btn-link ml-2",onClick:()=>u(w.id),children:l.jsx("i",{className:"fas fa-times"})})]})]},w.id||w.name))}),a&&l.jsx(lt,{src:a.src,alt:a.alt,onClose:A})]})}Ue.propTypes={readonly:W.bool,storage:W.object,value:W.any,onChange:W.func,text:W.string};Ue.defaultProps={text:"Upload"};function je(e){const{label:r,name:t,text:a,hint:n,storage:s,max:i,required:u,externalErrorMessage:m}=e,{errors:p,formState:{touched:A,isSubmitted:j},setValue:O,watch:w,register:g}=wt();oe.useEffect(()=>{g({name:t})},[g,t]);const y=kt.errorMessage(t,p,A,j,m);return l.jsxs("div",{className:"file-upload",children:[!!r&&l.jsx("label",{className:`input-label ${u?"required":null}`,htmlFor:t,children:r}),l.jsx(Ue,{storage:s,value:w(t),onChange:x=>{O(t,x,{shouldValidate:!0,shouldDirty:!0}),e.onChange&&e.onChange(x)},text:a,max:i}),l.jsx("div",{className:"invalid-feedback",children:y}),!!n&&l.jsx("small",{className:"form-text text-muted",children:n})]})}je.defaultProps={max:void 0,required:!1};je.propTypes={storage:W.object.isRequired,max:W.number,required:W.bool,name:W.string.isRequired,label:W.string,hint:W.string,formItemProps:W.object,text:W.string};const xr={status:["pending","canceled","success"],type:["withdraw","deposit"]},br=e=>vt().shape({user:ne.relationToOne(N("entities.vip.fields.title"),{}),Documenttype:ne.string(N("pages.proof.fields.documentType")),realname:ne.string(N("pages.proof.fields.fullName"),{required:!0}),idnumer:ne.string(N("pages.proof.fields.documentNumber"),{required:!0}),address:ne.string(N("pages.proof.fields.address"),{required:!0}),front:ne.images(N("pages.proof.fields.frontSide"),{required:!0}),back:e==="passport"?ne.images(N("pages.proof.fields.backSide")):ne.images(N("pages.proof.fields.backSide"),{required:!0}),status:ne.enumerator(N("entities.transaction.fields.status"),{options:xr.status})});function Ar(){const[e,r]=oe.useState("passport"),t=gt(xt.selectCurrentUser),a=Nt(),n=oe.useMemo(()=>br(e),[e]),s=St({resolver:Ct.yupResolver(n),mode:"all",defaultValues:{user:t||[],Documenttype:e,realname:"",idnumer:"",address:"",front:[],back:[],status:"pending"}}),i=p=>{const A={...p,user:t,Documenttype:e};e==="passport"&&(A.back=[]),a(yt.doCreate(A))},u=p=>{r(p),p==="passport"&&s.setValue("back",[])},m=[{value:"passport",label:N("pages.proof.documentTypes.passport"),icon:"fas fa-passport"},{value:"idCard",label:N("pages.proof.documentTypes.idCard"),icon:"fas fa-id-card"},{value:"driversLicense",label:N("pages.proof.documentTypes.driversLicense"),icon:"fas fa-id-card-alt"}];return l.jsxs("div",{className:"proof-container",children:[l.jsx("div",{className:"header",children:l.jsxs("div",{className:"nav-bar",children:[l.jsx(bt,{to:"/profile",className:"back-arrow",children:l.jsx("i",{className:"fas fa-arrow-left"})}),l.jsx("div",{className:"page-title",children:N("pages.proof.title")})]})}),l.jsxs("div",{className:"content-card",children:[l.jsxs("div",{className:"instructions",children:[l.jsx("i",{className:"fas fa-info-circle"}),N("pages.proof.instructions")]}),l.jsx(At,{...s,children:l.jsxs("form",{onSubmit:s.handleSubmit(i),children:[l.jsxs("div",{className:"form-section",children:[l.jsx("div",{className:"section-title",children:N("pages.proof.sections.documentInfo")}),l.jsxs("div",{className:"document-type-section",children:[l.jsxs("div",{className:"input-label",children:[N("pages.proof.fields.documentType")," ",l.jsx("span",{className:"required",children:"*"})]}),l.jsx("div",{className:"document-type-options",children:m.map(p=>l.jsxs("div",{className:`document-option ${p.value===e?"selected":""}`,onClick:()=>u(p.value),children:[l.jsx("i",{className:`${p.icon} document-icon`}),l.jsx("span",{className:"document-text",children:p.label})]},p.value))})]}),l.jsx("div",{className:"input-group",children:l.jsx(Ee,{className:"form-input",name:"realname",label:N("pages.proof.fields.fullName"),placeholder:N("pages.proof.placeholders.fullName")})}),l.jsx("div",{className:"input-group",children:l.jsx(Ee,{className:"form-input",name:"idnumer",label:N("pages.proof.fields.documentNumber"),placeholder:N("pages.proof.placeholders.documentNumber")})}),l.jsx("div",{className:"input-group",children:l.jsx(Ee,{className:"form-input",name:"address",label:N("pages.proof.fields.address"),placeholder:N("pages.proof.placeholders.address")})})]}),l.jsxs("div",{className:"form-section",children:[l.jsx("div",{className:"section-title",children:N("pages.proof.sections.documentUpload")}),l.jsx("div",{className:"upload-section",children:l.jsx(je,{name:"front",label:N("pages.proof.fields.frontSide"),storage:$e.values.categoryPhoto,text:N("pages.proof.uploadTexts.frontSide"),max:2})}),e!=="passport"&&l.jsx("div",{className:"upload-section",children:l.jsx(je,{name:"back",label:N("pages.proof.fields.backSide"),storage:$e.values.categoryPhoto,text:N("pages.proof.uploadTexts.backSide"),max:2})})]}),l.jsxs("div",{className:"security-note",children:[l.jsxs("div",{className:"security-header",children:[l.jsx("i",{className:"fas fa-shield-alt"})," ",N("pages.proof.security.title")]}),l.jsx("div",{className:"security-text",children:N("pages.proof.security.text")})]}),l.jsx("button",{type:"submit",className:"submit-button",children:N("pages.proof.buttons.validateDocuments")})]})})]}),l.jsx("style",{children:`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
        }

        body {
          background-color: #f5f7fa;
          color: #333;
          line-height: 1.6;
          overflow-x: hidden;
        }

        .proof-container {
          max-width: 400px;
          margin: 0 auto;
          position: relative;
          min-height: 100vh;
          background: linear-gradient(135deg, #106cf5 0%, #0a4fc4 100%);
        }

        /* Header Section - Matching Profile Page */
        .header {
          min-height: 60px;
          position: relative;
          padding: 20px;
        }

        .nav-bar {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .back-arrow {
          color: white;
          font-size: 20px;
          font-weight: 300;
          text-decoration: none;
          transition: opacity 0.3s ease;
        }

        .back-arrow:hover {
          opacity: 0.8;
        }

        .page-title {
          color: white;
          font-size: 17px;
          font-weight: 600;
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
        }

        /* Content Card - Matching Profile Page */
        .content-card {
          background: white;
          border-radius: 40px 40px 0 0;
          padding: 25px 20px 100px;
          box-shadow: 0 -5px 20px rgba(0, 0, 0, 0.05);
          min-height: calc(100vh - 60px);
        }

        .instructions {
          background: #f0f7ff;
          border: 1px solid #e6f0ff;
          border-radius: 12px;
          padding: 16px;
          font-size: 14px;
          color: #106cf5;
          margin-bottom: 25px;
          display: flex;
          align-items: flex-start;
          gap: 10px;
          line-height: 1.5;
        }

        .instructions i {
          font-size: 16px;
          margin-top: 2px;
          flex-shrink: 0;
        }

        .form-section {
          margin-bottom: 30px;
        }

        .section-title {
          font-size: 16px;
          font-weight: 600;
          color: #222;
          margin-bottom: 16px;
          padding-bottom: 8px;
          border-bottom: 1px solid #e7eaee;
        }

        .document-type-section {
          margin-bottom: 20px;
        }

        .input-label {
          display: block;
          font-size: 14px;
          color: #666;
          margin-bottom: 10px;
          font-weight: 500;
        }

        .required {
          color: #f44336;
        }

        .document-type-options {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .document-option {
          display: flex;
          align-items: center;
          padding: 14px 16px;
          border: 1px solid #e7eaee;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.3s ease;
          background: #f8f9fa;
        }

        .document-option:hover {
          border-color: #106cf5;
          background: #f0f7ff;
        }

        .document-option.selected {
          border-color: #106cf5;
          background: #e6f0ff;
          box-shadow: 0 0 0 2px rgba(16, 108, 245, 0.1);
        }

        .document-icon {
          font-size: 18px;
          color: #666;
          margin-right: 12px;
          width: 24px;
          text-align: center;
        }

        .document-option.selected .document-icon {
          color: #106cf5;
        }

        .document-text {
          font-size: 14px;
          font-weight: 500;
          color: #222;
        }

        .document-option.selected .document-text {
          color: #106cf5;
          font-weight: 600;
        }

        .input-group {
          margin-bottom: 12px;
        }

        /* Input styling */
        .text-input {
          width: 100%;
        }

        .text-input input {
          width: 100%;
          padding: 12px 16px;
          font-size: 14px;
          border: 1px solid #e7eaee;
          border-radius: 8px;
          background: #fff;
          transition: all 0.3s ease;
          outline: none;
          color: #333;
        }

        .text-input input:focus {
          border-color: #106cf5;
          box-shadow: 0 0 0 2px rgba(16, 108, 245, 0.1);
        }

        .text-input input::placeholder {
          color: #aaa;
          font-size: 14px;
        }

        .text-input label {
          display: block;
          font-size: 14px;
          color: #666;
          margin-bottom: 6px;
          font-weight: 500;
        }

        /* Upload section styling */
        .upload-section {
          margin-bottom: 20px;
        }

        /* Security Note */
        .security-note {
          background: #fef3e9;
          border: 1px solid #ffd8b5;
          border-radius: 12px;
          padding: 18px;
          margin-bottom: 25px;
        }

        .security-header {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 15px;
          font-weight: 600;
          color: #ff7a00;
          margin-bottom: 8px;
        }

        .security-header i {
          font-size: 18px;
        }

        .security-text {
          font-size: 13px;
          color: #ff7a00;
          line-height: 1.5;
          opacity: 0.9;
        }

        /* Submit Button */
        .submit-button {
          width: 100%;
          padding: 12px;
          background: #106cf5;
          color: white;
          border: none;
          border-radius: 8px;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
        }

        .submit-button:hover {
          background: #0a4fc4;
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(16, 108, 245, 0.3);
        }

        .submit-button:active {
          transform: translateY(0);
        }

        /* Image upload component styling override */
        .ant-upload.ant-upload-select {
          width: 100% !important;
        }

        .ant-upload-list-item {
          margin-top: 8px !important;
        }

        /* Responsive adjustments */
        @media (max-width: 380px) {
          .proof-container {
            padding: 0;
          }

          .header {
            padding: 16px;
            min-height: 50px;
          }

          .content-card {
            padding: 20px 16px 80px;
            border-radius: 30px 30px 0 0;
          }

          .instructions {
            font-size: 13px;
            padding: 14px;
          }

          .section-title {
            font-size: 15px;
          }

          .document-option {
            padding: 12px 14px;
          }

          .document-text {
            font-size: 13px;
          }

          .text-input input {
            padding: 10px 14px;
            font-size: 13px;
          }

          .submit-button {
            padding: 12px;
            font-size: 14px;
          }
        }

        @media (min-width: 768px) {
          .content-card {
            border-radius: 30px 30px 0 0;
            padding: 30px 25px 100px;
          }

          .document-type-options {
            flex-direction: row;
            gap: 12px;
          }

          .document-option {
            flex: 1;
            flex-direction: column;
            text-align: center;
            padding: 16px 10px;
          }

          .document-icon {
            margin-right: 0;
            margin-bottom: 8px;
          }
        }
      `})]})}export{Ar as default};
