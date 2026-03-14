import{R as F,ad as Se,u as ae,ah as ie,i as C,N as Me,V as Re,S as Ae,ai as Fe,aj as ke,k as a,L as je,af as Ie}from"./index-a23148c8.js";import{u as Pe,y as De,F as ze}from"./FormErrors-e6dcc768.js";import{F as le}from"./FieldFormItem-198d9347.js";import{u as Le}from"./useDispatch-1da8dfab.js";var Te=Object.defineProperty,Z=Object.getOwnPropertySymbols,fe=Object.prototype.hasOwnProperty,he=Object.prototype.propertyIsEnumerable,ce=(l,i,s)=>i in l?Te(l,i,{enumerable:!0,configurable:!0,writable:!0,value:s}):l[i]=s,oe=(l,i)=>{for(var s in i||(i={}))fe.call(i,s)&&ce(l,s,i[s]);if(Z)for(var s of Z(i))he.call(i,s)&&ce(l,s,i[s]);return l},se=(l,i)=>{var s={};for(var u in l)fe.call(l,u)&&i.indexOf(u)<0&&(s[u]=l[u]);if(l!=null&&Z)for(var u of Z(l))i.indexOf(u)<0&&he.call(l,u)&&(s[u]=l[u]);return s};/**
 * @license QR Code generator library (TypeScript)
 * Copyright (c) Project Nayuki.
 * SPDX-License-Identifier: MIT
 */var _;(l=>{const i=class b{constructor(e,o,t,r){if(this.version=e,this.errorCorrectionLevel=o,this.modules=[],this.isFunction=[],e<b.MIN_VERSION||e>b.MAX_VERSION)throw new RangeError("Version value out of range");if(r<-1||r>7)throw new RangeError("Mask value out of range");this.size=e*4+17;let n=[];for(let c=0;c<this.size;c++)n.push(!1);for(let c=0;c<this.size;c++)this.modules.push(n.slice()),this.isFunction.push(n.slice());this.drawFunctionPatterns();const d=this.addEccAndInterleave(t);if(this.drawCodewords(d),r==-1){let c=1e9;for(let g=0;g<8;g++){this.applyMask(g),this.drawFormatBits(g);const h=this.getPenaltyScore();h<c&&(r=g,c=h),this.applyMask(g)}}x(0<=r&&r<=7),this.mask=r,this.applyMask(r),this.drawFormatBits(r),this.isFunction=[]}static encodeText(e,o){const t=l.QrSegment.makeSegments(e);return b.encodeSegments(t,o)}static encodeBinary(e,o){const t=l.QrSegment.makeBytes(e);return b.encodeSegments([t],o)}static encodeSegments(e,o,t=1,r=40,n=-1,d=!0){if(!(b.MIN_VERSION<=t&&t<=r&&r<=b.MAX_VERSION)||n<-1||n>7)throw new RangeError("Invalid value");let c,g;for(c=t;;c++){const p=b.getNumDataCodewords(c,o)*8,M=v.getTotalBits(e,c);if(M<=p){g=M;break}if(c>=r)throw new RangeError("Data too long")}for(const p of[b.Ecc.MEDIUM,b.Ecc.QUARTILE,b.Ecc.HIGH])d&&g<=b.getNumDataCodewords(c,p)*8&&(o=p);let h=[];for(const p of e){s(p.mode.modeBits,4,h),s(p.numChars,p.mode.numCharCountBits(c),h);for(const M of p.getData())h.push(M)}x(h.length==g);const S=b.getNumDataCodewords(c,o)*8;x(h.length<=S),s(0,Math.min(4,S-h.length),h),s(0,(8-h.length%8)%8,h),x(h.length%8==0);for(let p=236;h.length<S;p^=253)s(p,8,h);let E=[];for(;E.length*8<h.length;)E.push(0);return h.forEach((p,M)=>E[M>>>3]|=p<<7-(M&7)),new b(c,o,E,n)}getModule(e,o){return 0<=e&&e<this.size&&0<=o&&o<this.size&&this.modules[o][e]}getModules(){return this.modules}drawFunctionPatterns(){for(let t=0;t<this.size;t++)this.setFunctionModule(6,t,t%2==0),this.setFunctionModule(t,6,t%2==0);this.drawFinderPattern(3,3),this.drawFinderPattern(this.size-4,3),this.drawFinderPattern(3,this.size-4);const e=this.getAlignmentPatternPositions(),o=e.length;for(let t=0;t<o;t++)for(let r=0;r<o;r++)t==0&&r==0||t==0&&r==o-1||t==o-1&&r==0||this.drawAlignmentPattern(e[t],e[r]);this.drawFormatBits(0),this.drawVersion()}drawFormatBits(e){const o=this.errorCorrectionLevel.formatBits<<3|e;let t=o;for(let n=0;n<10;n++)t=t<<1^(t>>>9)*1335;const r=(o<<10|t)^21522;x(r>>>15==0);for(let n=0;n<=5;n++)this.setFunctionModule(8,n,u(r,n));this.setFunctionModule(8,7,u(r,6)),this.setFunctionModule(8,8,u(r,7)),this.setFunctionModule(7,8,u(r,8));for(let n=9;n<15;n++)this.setFunctionModule(14-n,8,u(r,n));for(let n=0;n<8;n++)this.setFunctionModule(this.size-1-n,8,u(r,n));for(let n=8;n<15;n++)this.setFunctionModule(8,this.size-15+n,u(r,n));this.setFunctionModule(8,this.size-8,!0)}drawVersion(){if(this.version<7)return;let e=this.version;for(let t=0;t<12;t++)e=e<<1^(e>>>11)*7973;const o=this.version<<12|e;x(o>>>18==0);for(let t=0;t<18;t++){const r=u(o,t),n=this.size-11+t%3,d=Math.floor(t/3);this.setFunctionModule(n,d,r),this.setFunctionModule(d,n,r)}}drawFinderPattern(e,o){for(let t=-4;t<=4;t++)for(let r=-4;r<=4;r++){const n=Math.max(Math.abs(r),Math.abs(t)),d=e+r,c=o+t;0<=d&&d<this.size&&0<=c&&c<this.size&&this.setFunctionModule(d,c,n!=2&&n!=4)}}drawAlignmentPattern(e,o){for(let t=-2;t<=2;t++)for(let r=-2;r<=2;r++)this.setFunctionModule(e+r,o+t,Math.max(Math.abs(r),Math.abs(t))!=1)}setFunctionModule(e,o,t){this.modules[o][e]=t,this.isFunction[o][e]=!0}addEccAndInterleave(e){const o=this.version,t=this.errorCorrectionLevel;if(e.length!=b.getNumDataCodewords(o,t))throw new RangeError("Invalid argument");const r=b.NUM_ERROR_CORRECTION_BLOCKS[t.ordinal][o],n=b.ECC_CODEWORDS_PER_BLOCK[t.ordinal][o],d=Math.floor(b.getNumRawDataModules(o)/8),c=r-d%r,g=Math.floor(d/r);let h=[];const S=b.reedSolomonComputeDivisor(n);for(let p=0,M=0;p<r;p++){let A=e.slice(M,M+g-n+(p<c?0:1));M+=A.length;const O=b.reedSolomonComputeRemainder(A,S);p<c&&A.push(0),h.push(A.concat(O))}let E=[];for(let p=0;p<h[0].length;p++)h.forEach((M,A)=>{(p!=g-n||A>=c)&&E.push(M[p])});return x(E.length==d),E}drawCodewords(e){if(e.length!=Math.floor(b.getNumRawDataModules(this.version)/8))throw new RangeError("Invalid argument");let o=0;for(let t=this.size-1;t>=1;t-=2){t==6&&(t=5);for(let r=0;r<this.size;r++)for(let n=0;n<2;n++){const d=t-n,g=(t+1&2)==0?this.size-1-r:r;!this.isFunction[g][d]&&o<e.length*8&&(this.modules[g][d]=u(e[o>>>3],7-(o&7)),o++)}}x(o==e.length*8)}applyMask(e){if(e<0||e>7)throw new RangeError("Mask value out of range");for(let o=0;o<this.size;o++)for(let t=0;t<this.size;t++){let r;switch(e){case 0:r=(t+o)%2==0;break;case 1:r=o%2==0;break;case 2:r=t%3==0;break;case 3:r=(t+o)%3==0;break;case 4:r=(Math.floor(t/3)+Math.floor(o/2))%2==0;break;case 5:r=t*o%2+t*o%3==0;break;case 6:r=(t*o%2+t*o%3)%2==0;break;case 7:r=((t+o)%2+t*o%3)%2==0;break;default:throw new Error("Unreachable")}!this.isFunction[o][t]&&r&&(this.modules[o][t]=!this.modules[o][t])}}getPenaltyScore(){let e=0;for(let n=0;n<this.size;n++){let d=!1,c=0,g=[0,0,0,0,0,0,0];for(let h=0;h<this.size;h++)this.modules[n][h]==d?(c++,c==5?e+=b.PENALTY_N1:c>5&&e++):(this.finderPenaltyAddHistory(c,g),d||(e+=this.finderPenaltyCountPatterns(g)*b.PENALTY_N3),d=this.modules[n][h],c=1);e+=this.finderPenaltyTerminateAndCount(d,c,g)*b.PENALTY_N3}for(let n=0;n<this.size;n++){let d=!1,c=0,g=[0,0,0,0,0,0,0];for(let h=0;h<this.size;h++)this.modules[h][n]==d?(c++,c==5?e+=b.PENALTY_N1:c>5&&e++):(this.finderPenaltyAddHistory(c,g),d||(e+=this.finderPenaltyCountPatterns(g)*b.PENALTY_N3),d=this.modules[h][n],c=1);e+=this.finderPenaltyTerminateAndCount(d,c,g)*b.PENALTY_N3}for(let n=0;n<this.size-1;n++)for(let d=0;d<this.size-1;d++){const c=this.modules[n][d];c==this.modules[n][d+1]&&c==this.modules[n+1][d]&&c==this.modules[n+1][d+1]&&(e+=b.PENALTY_N2)}let o=0;for(const n of this.modules)o=n.reduce((d,c)=>d+(c?1:0),o);const t=this.size*this.size,r=Math.ceil(Math.abs(o*20-t*10)/t)-1;return x(0<=r&&r<=9),e+=r*b.PENALTY_N4,x(0<=e&&e<=2568888),e}getAlignmentPatternPositions(){if(this.version==1)return[];{const e=Math.floor(this.version/7)+2,o=this.version==32?26:Math.ceil((this.version*4+4)/(e*2-2))*2;let t=[6];for(let r=this.size-7;t.length<e;r-=o)t.splice(1,0,r);return t}}static getNumRawDataModules(e){if(e<b.MIN_VERSION||e>b.MAX_VERSION)throw new RangeError("Version number out of range");let o=(16*e+128)*e+64;if(e>=2){const t=Math.floor(e/7)+2;o-=(25*t-10)*t-55,e>=7&&(o-=36)}return x(208<=o&&o<=29648),o}static getNumDataCodewords(e,o){return Math.floor(b.getNumRawDataModules(e)/8)-b.ECC_CODEWORDS_PER_BLOCK[o.ordinal][e]*b.NUM_ERROR_CORRECTION_BLOCKS[o.ordinal][e]}static reedSolomonComputeDivisor(e){if(e<1||e>255)throw new RangeError("Degree out of range");let o=[];for(let r=0;r<e-1;r++)o.push(0);o.push(1);let t=1;for(let r=0;r<e;r++){for(let n=0;n<o.length;n++)o[n]=b.reedSolomonMultiply(o[n],t),n+1<o.length&&(o[n]^=o[n+1]);t=b.reedSolomonMultiply(t,2)}return o}static reedSolomonComputeRemainder(e,o){let t=o.map(r=>0);for(const r of e){const n=r^t.shift();t.push(0),o.forEach((d,c)=>t[c]^=b.reedSolomonMultiply(d,n))}return t}static reedSolomonMultiply(e,o){if(e>>>8||o>>>8)throw new RangeError("Byte out of range");let t=0;for(let r=7;r>=0;r--)t=t<<1^(t>>>7)*285,t^=(o>>>r&1)*e;return x(t>>>8==0),t}finderPenaltyCountPatterns(e){const o=e[1];x(o<=this.size*3);const t=o>0&&e[2]==o&&e[3]==o*3&&e[4]==o&&e[5]==o;return(t&&e[0]>=o*4&&e[6]>=o?1:0)+(t&&e[6]>=o*4&&e[0]>=o?1:0)}finderPenaltyTerminateAndCount(e,o,t){return e&&(this.finderPenaltyAddHistory(o,t),o=0),o+=this.size,this.finderPenaltyAddHistory(o,t),this.finderPenaltyCountPatterns(t)}finderPenaltyAddHistory(e,o){o[0]==0&&(e+=this.size),o.pop(),o.unshift(e)}};i.MIN_VERSION=1,i.MAX_VERSION=40,i.PENALTY_N1=3,i.PENALTY_N2=3,i.PENALTY_N3=40,i.PENALTY_N4=10,i.ECC_CODEWORDS_PER_BLOCK=[[-1,7,10,15,20,26,18,20,24,30,18,20,24,26,30,22,24,28,30,28,28,28,28,30,30,26,28,30,30,30,30,30,30,30,30,30,30,30,30,30,30],[-1,10,16,26,18,24,16,18,22,22,26,30,22,22,24,24,28,28,26,26,26,26,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28],[-1,13,22,18,26,18,24,18,22,20,24,28,26,24,20,30,24,28,28,26,30,28,30,30,30,30,28,30,30,30,30,30,30,30,30,30,30,30,30,30,30],[-1,17,28,22,16,22,28,26,26,24,28,24,28,22,24,24,30,28,28,26,28,30,24,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30]],i.NUM_ERROR_CORRECTION_BLOCKS=[[-1,1,1,1,1,1,2,2,2,2,4,4,4,4,4,6,6,6,6,7,8,8,9,9,10,12,12,12,13,14,15,16,17,18,19,19,20,21,22,24,25],[-1,1,1,1,2,2,4,4,4,5,5,5,8,9,9,10,10,11,13,14,16,17,17,18,20,21,23,25,26,28,29,31,33,35,37,38,40,43,45,47,49],[-1,1,1,2,2,4,4,6,6,8,8,8,10,12,16,12,17,16,18,21,20,23,23,25,27,29,34,34,35,38,40,43,45,48,51,53,56,59,62,65,68],[-1,1,1,2,4,4,4,5,6,8,8,11,11,16,16,18,16,19,21,25,25,25,34,30,32,35,37,40,42,45,48,51,54,57,60,63,66,70,74,77,81]],l.QrCode=i;function s(N,e,o){if(e<0||e>31||N>>>e)throw new RangeError("Value out of range");for(let t=e-1;t>=0;t--)o.push(N>>>t&1)}function u(N,e){return(N>>>e&1)!=0}function x(N){if(!N)throw new Error("Assertion error")}const m=class R{constructor(e,o,t){if(this.mode=e,this.numChars=o,this.bitData=t,o<0)throw new RangeError("Invalid argument");this.bitData=t.slice()}static makeBytes(e){let o=[];for(const t of e)s(t,8,o);return new R(R.Mode.BYTE,e.length,o)}static makeNumeric(e){if(!R.isNumeric(e))throw new RangeError("String contains non-numeric characters");let o=[];for(let t=0;t<e.length;){const r=Math.min(e.length-t,3);s(parseInt(e.substring(t,t+r),10),r*3+1,o),t+=r}return new R(R.Mode.NUMERIC,e.length,o)}static makeAlphanumeric(e){if(!R.isAlphanumeric(e))throw new RangeError("String contains unencodable characters in alphanumeric mode");let o=[],t;for(t=0;t+2<=e.length;t+=2){let r=R.ALPHANUMERIC_CHARSET.indexOf(e.charAt(t))*45;r+=R.ALPHANUMERIC_CHARSET.indexOf(e.charAt(t+1)),s(r,11,o)}return t<e.length&&s(R.ALPHANUMERIC_CHARSET.indexOf(e.charAt(t)),6,o),new R(R.Mode.ALPHANUMERIC,e.length,o)}static makeSegments(e){return e==""?[]:R.isNumeric(e)?[R.makeNumeric(e)]:R.isAlphanumeric(e)?[R.makeAlphanumeric(e)]:[R.makeBytes(R.toUtf8ByteArray(e))]}static makeEci(e){let o=[];if(e<0)throw new RangeError("ECI assignment value out of range");if(e<128)s(e,8,o);else if(e<16384)s(2,2,o),s(e,14,o);else if(e<1e6)s(6,3,o),s(e,21,o);else throw new RangeError("ECI assignment value out of range");return new R(R.Mode.ECI,0,o)}static isNumeric(e){return R.NUMERIC_REGEX.test(e)}static isAlphanumeric(e){return R.ALPHANUMERIC_REGEX.test(e)}getData(){return this.bitData.slice()}static getTotalBits(e,o){let t=0;for(const r of e){const n=r.mode.numCharCountBits(o);if(r.numChars>=1<<n)return 1/0;t+=4+n+r.bitData.length}return t}static toUtf8ByteArray(e){e=encodeURI(e);let o=[];for(let t=0;t<e.length;t++)e.charAt(t)!="%"?o.push(e.charCodeAt(t)):(o.push(parseInt(e.substring(t+1,t+3),16)),t+=2);return o}};m.NUMERIC_REGEX=/^[0-9]*$/,m.ALPHANUMERIC_REGEX=/^[A-Z0-9 $%*+.\/:-]*$/,m.ALPHANUMERIC_CHARSET="0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ $%*+-./:";let v=m;l.QrSegment=m})(_||(_={}));(l=>{(i=>{const s=class{constructor(x,m){this.ordinal=x,this.formatBits=m}};s.LOW=new s(0,1),s.MEDIUM=new s(1,0),s.QUARTILE=new s(2,3),s.HIGH=new s(3,2),i.Ecc=s})(l.QrCode||(l.QrCode={}))})(_||(_={}));(l=>{(i=>{const s=class{constructor(x,m){this.modeBits=x,this.numBitsCharCount=m}numCharCountBits(x){return this.numBitsCharCount[Math.floor((x+7)/17)]}};s.NUMERIC=new s(1,[10,12,14]),s.ALPHANUMERIC=new s(2,[9,11,13]),s.BYTE=new s(4,[8,16,16]),s.KANJI=new s(8,[8,10,12]),s.ECI=new s(7,[0,0,0]),i.Mode=s})(l.QrSegment||(l.QrSegment={}))})(_||(_={}));var $=_;/**
 * @license qrcode.react
 * Copyright (c) Paul O'Shannessy
 * SPDX-License-Identifier: ISC
 */var Oe={L:$.QrCode.Ecc.LOW,M:$.QrCode.Ecc.MEDIUM,Q:$.QrCode.Ecc.QUARTILE,H:$.QrCode.Ecc.HIGH},me=128,pe="L",ge="#FFFFFF",xe="#000000",be=!1,we=1,Ue=4,Be=0,_e=.1;function ye(l,i=0){const s=[];return l.forEach(function(u,x){let m=null;u.forEach(function(v,N){if(!v&&m!==null){s.push(`M${m+i} ${x+i}h${N-m}v1H${m+i}z`),m=null;return}if(N===u.length-1){if(!v)return;m===null?s.push(`M${N+i},${x+i} h1v1H${N+i}z`):s.push(`M${m+i},${x+i} h${N+1-m}v1H${m+i}z`);return}v&&m===null&&(m=N)})}),s.join("")}function ve(l,i){return l.slice().map((s,u)=>u<i.y||u>=i.y+i.h?s:s.map((x,m)=>m<i.x||m>=i.x+i.w?x:!1))}function $e(l,i,s,u){if(u==null)return null;const x=l.length+s*2,m=Math.floor(i*_e),v=x/i,N=(u.width||m)*v,e=(u.height||m)*v,o=u.x==null?l.length/2-N/2:u.x*v,t=u.y==null?l.length/2-e/2:u.y*v,r=u.opacity==null?1:u.opacity;let n=null;if(u.excavate){let c=Math.floor(o),g=Math.floor(t),h=Math.ceil(N+o-c),S=Math.ceil(e+t-g);n={x:c,y:g,w:h,h:S}}const d=u.crossOrigin;return{x:o,y:t,h:e,w:N,excavation:n,opacity:r,crossOrigin:d}}function Qe(l,i){return i!=null?Math.max(Math.floor(i),0):l?Ue:Be}function Ce({value:l,level:i,minVersion:s,includeMargin:u,marginSize:x,imageSettings:m,size:v,boostLevel:N}){let e=F.useMemo(()=>{const c=(Array.isArray(l)?l:[l]).reduce((g,h)=>(g.push(...$.QrSegment.makeSegments(h)),g),[]);return $.QrCode.encodeSegments(c,Oe[i],s,void 0,void 0,N)},[l,i,s,N]);const{cells:o,margin:t,numCells:r,calculatedImageSettings:n}=F.useMemo(()=>{let d=e.getModules();const c=Qe(u,x),g=d.length+c*2,h=$e(d,v,c,m);return{cells:d,margin:c,numCells:g,calculatedImageSettings:h}},[e,v,m,u,x]);return{qrcode:e,margin:t,cells:o,numCells:r,calculatedImageSettings:n}}var He=function(){try{new Path2D().addPath(new Path2D)}catch{return!1}return!0}(),Ne=F.forwardRef(function(i,s){const u=i,{value:x,size:m=me,level:v=pe,bgColor:N=ge,fgColor:e=xe,includeMargin:o=be,minVersion:t=we,boostLevel:r,marginSize:n,imageSettings:d}=u,g=se(u,["value","size","level","bgColor","fgColor","includeMargin","minVersion","boostLevel","marginSize","imageSettings"]),{style:h}=g,S=se(g,["style"]),E=d==null?void 0:d.src,p=F.useRef(null),M=F.useRef(null),A=F.useCallback(P=>{p.current=P,typeof s=="function"?s(P):s&&(s.current=P)},[s]),[O,j]=F.useState(!1),{margin:z,cells:Y,numCells:Q,calculatedImageSettings:I}=Ce({value:x,level:v,minVersion:t,boostLevel:r,includeMargin:o,marginSize:n,imageSettings:d,size:m});F.useEffect(()=>{if(p.current!=null){const P=p.current,L=P.getContext("2d");if(!L)return;let D=Y;const U=M.current,V=I!=null&&U!==null&&U.complete&&U.naturalHeight!==0&&U.naturalWidth!==0;V&&I.excavation!=null&&(D=ve(Y,I.excavation));const X=window.devicePixelRatio||1;P.height=P.width=m*X;const q=m/Q*X;L.scale(q,q),L.fillStyle=N,L.fillRect(0,0,Q,Q),L.fillStyle=e,He?L.fill(new Path2D(ye(D,z))):Y.forEach(function(J,W){J.forEach(function(ee,H){ee&&L.fillRect(H+z,W+z,1,1)})}),I&&(L.globalAlpha=I.opacity),V&&L.drawImage(U,I.x+z,I.y+z,I.w,I.h)}}),F.useEffect(()=>{j(!1)},[E]);const G=oe({height:m,width:m},h);let T=null;return E!=null&&(T=F.createElement("img",{src:E,key:E,style:{display:"none"},onLoad:()=>{j(!0)},ref:M,crossOrigin:I==null?void 0:I.crossOrigin})),F.createElement(F.Fragment,null,F.createElement("canvas",oe({style:G,height:m,width:m,ref:A,role:"img"},S)),T)});Ne.displayName="QRCodeCanvas";var Ye=F.forwardRef(function(i,s){const u=i,{value:x,size:m=me,level:v=pe,bgColor:N=ge,fgColor:e=xe,includeMargin:o=be,minVersion:t=we,boostLevel:r,title:n,marginSize:d,imageSettings:c}=u,g=se(u,["value","size","level","bgColor","fgColor","includeMargin","minVersion","boostLevel","title","marginSize","imageSettings"]),{margin:h,cells:S,numCells:E,calculatedImageSettings:p}=Ce({value:x,level:v,minVersion:t,boostLevel:r,includeMargin:o,marginSize:d,imageSettings:c,size:m});let M=S,A=null;c!=null&&p!=null&&(p.excavation!=null&&(M=ve(S,p.excavation)),A=F.createElement("image",{href:c.src,height:p.h,width:p.w,x:p.x+h,y:p.y+h,preserveAspectRatio:"none",opacity:p.opacity,crossOrigin:p.crossOrigin}));const O=ye(M,h);return F.createElement("svg",oe({height:m,width:m,viewBox:`0 0 ${E} ${E}`,ref:s,role:"img"},g),!!n&&F.createElement("title",null,n),F.createElement("path",{fill:N,d:`M0,0 h${E}v${E}H0z`,shapeRendering:"crispEdges"}),F.createElement("path",{fill:e,d:O,shapeRendering:"crispEdges"}),A)});Ye.displayName="QRCodeSVG";const de=["USD","ETH","BTC","USDC","DAI","SHIB","XRP","TRX","SOL","BNB","DOGE"],te=200,Ge={USD:2,ETH:6,BTC:8,USDC:2,DAI:2,SHIB:0,XRP:2,TRX:2,SOL:4,BNB:6,DOGE:2},ue=(l,i,s)=>{if(typeof l!="number"||!isFinite(l)||l===0)return"0";const u=s!==void 0?s:Ge[i==null?void 0:i.toUpperCase()]||2;return l>0&&l<1e-6?l.toFixed(u>8?u:8):new Intl.NumberFormat("en-US",{minimumFractionDigits:0,maximumFractionDigits:u}).format(l)},Ve=l=>typeof l!="number"||!isFinite(l)||l===0?"$0.00":l>0&&l<.01?`$${l.toFixed(6)}`:new Intl.NumberFormat("en-US",{style:"currency",currency:"USD",minimumFractionDigits:2,maximumFractionDigits:6}).format(l);function tt(){var ne;const l=Le(),i=Se(),s=((i==null?void 0:i.id)||"").toString(),u=ae(ie.selectRows),x=ae(ie.selectLoading),[m,v]=C.useState(!1),[N,e]=C.useState("Address copied"),[o,t]=C.useState(!1),[r,n]=C.useState(!1),[d,c]=C.useState({}),[g,h]=C.useState(!1),[S,E]=C.useState(""),[p,M]=C.useState(null),[A,O]=C.useState([]),[j,z]=C.useState(null),[Y,Q]=C.useState(0),[I,G]=C.useState("");C.useEffect(()=>{const f=async()=>{try{h(!0);const y=await Ie.get("https://min-api.cryptocompare.com/data/pricemulti",{params:{fsyms:de.join(","),tsyms:"USD"}});if(y.data&&y.data.Response!=="Error"){const k={};de.forEach(B=>{var K;(K=y.data[B])!=null&&K.USD&&(k[B]=y.data[B].USD)}),c(k)}}catch(y){console.error("Failed to fetch exchange rates:",y)}finally{h(!1)}};f();const w=setInterval(f,5*60*1e3);return()=>clearInterval(w)},[]);const T=C.useMemo(()=>{if(!s||!d[s.toUpperCase()])return 0;const f=d[s.toUpperCase()];return te/f},[s,d]),P=C.useMemo(()=>T===0?"0":ue(T,s),[T,s]),L=C.useMemo(()=>Me().shape({amount:Re().typeError("Amount must be a number").positive("Amount must be positive").required("Amount is required").min(T||0,`Minimum deposit is ${P} ${s}`),txid:Ae().required("Transaction ID is required")}),[T,P,s]),D=Pe({resolver:De.yupResolver(L),mode:"onChange",defaultValues:{amount:"",txid:""}});C.useCallback((f,w)=>ue(f,s,w),[s]);const U=C.useCallback(f=>Ve(f),[]);C.useEffect(()=>{l(Fe.doFetch())},[l]),C.useEffect(()=>{if(!u||!s)return;const f=u.find(w=>!w||!w.symbol?!1:w.symbol.toString().toLowerCase()===s.toString().toLowerCase());if(!f){M(null),O([]),z(null),E("");return}if(M(f),Q(T),Array.isArray(f.network)&&f.network.length>0){const w=f.network.map((k,B)=>({_id:k._id??`${f._id??s}-network-${B}`,name:k.name??k.network??`${f.name??s} Network`,wallet:k.wallet??k.address??k.depositAddress??"",raw:k}));O(w);const y=w.find(k=>k._id===j)||w[0];z(y._id),E(y.wallet||"")}else if(f.address){const w={_id:f._id??`${s}-single`,name:`${f.name??s} Network`,wallet:f.address,raw:null};O([w]),z(w._id),E(w.wallet||"")}else O([]),z(null),E("")},[u,s,T]),C.useEffect(()=>{if(!j)return;const f=A.find(w=>w._id===j);f&&E(f.wallet||"")},[j,A]);const V=C.useCallback(async()=>{if(!S){console.error("No address to copy");return}try{await navigator.clipboard.writeText(S),e("Address copied"),v(!0),setTimeout(()=>v(!1),3e3)}catch(f){console.error("Failed to copy address: ",f),e("Failed to copy address"),v(!0),setTimeout(()=>v(!1),3e3)}},[S]),X=C.useCallback(()=>{var w;const f=document.querySelector(".qr-box canvas");if(!(f instanceof HTMLCanvasElement)){console.error("QR canvas not found"),e("Unable to save QR"),v(!0),setTimeout(()=>v(!1),3e3);return}try{const y=document.createElement("a"),k=(((w=A.find(B=>B._id===j))==null?void 0:w.name)||"deposit").replace(/\s+/g,"-");y.download=`${s}-${k}-address.png`,y.href=f.toDataURL("image/png"),y.click(),e("QR code saved"),v(!0),setTimeout(()=>v(!1),3e3)}catch(y){console.error("Failed to save QR code",y),e("Unable to save QR"),v(!0),setTimeout(()=>v(!1),3e3)}},[A,j,s]),q=C.useCallback(f=>{const w=f.target.value;z(w),D.setValue("amount",""),D.clearErrors("amount")},[D]),J=C.useCallback(async f=>{if(!j||!p||!S){console.error("Missing required information");return}t(!0);try{const w=new Date,y=w.getFullYear(),k=String(w.getMonth()+1).padStart(2,"0"),B=String(w.getDate()).padStart(2,"0"),K=Math.floor(Math.random()*1e7).toString().padStart(7,"0"),Ee={orderno:`RE${y}${k}${B}${K}`,amount:f.amount,txid:f.txid,rechargechannel:s,status:"pending",network:j,rechargetime:w.toISOString()};G(f.amount),await l(ke.doCreate(Ee)),n(!0),D.reset()}catch(w){console.error("Deposit submission error:",w)}finally{t(!1)}},[j,p,S,s,l,D]),W=C.useCallback(()=>{n(!1),G("")},[]),ee=C.useCallback(f=>`https://images.weserv.nl/?url=https://bin.bnbstatic.com/static/assets/logos/${f?f.toUpperCase():""}.png`,[]),H=D.watch("amount"),re=C.useMemo(()=>{if(!H||!d[s==null?void 0:s.toUpperCase()])return 0;const f=Number(H);return isNaN(f)||!isFinite(f)?0:f*d[s.toUpperCase()]},[H,s,d]);return a.jsxs("div",{className:"deposit-container",children:[a.jsx("div",{className:"header",children:a.jsxs("div",{className:"nav-bar",children:[a.jsx(je,{to:"/deposit",className:"back-arrow","aria-label":"Back to deposits",children:a.jsx("i",{className:"fas fa-arrow-left"})}),a.jsxs("div",{className:"page-title",children:["Deposit ",s||"..."]})]})}),a.jsx("div",{className:"content-card",children:a.jsxs("div",{className:"deposit-content",children:[a.jsxs("div",{className:"section",children:[a.jsx("div",{className:"section-label",children:"Deposit currency"}),a.jsxs("div",{className:"currency-display",children:[a.jsx("div",{className:"currency-icon","aria-hidden":!0,children:a.jsx("img",{src:ee(s),alt:s,onError:f=>{const w=f.target;w.onerror=null,w.style.display="none";const y=w.parentElement;y&&(y.textContent=s&&s.charAt(0)||"C",y.style.background="#f0f0f0",y.style.color="#333",y.style.fontSize="14px",y.style.fontWeight="bold",y.style.display="inline-flex",y.style.alignItems="center",y.style.justifyContent="center",y.style.width="32px",y.style.height="32px",y.style.borderRadius="50%")}})}),a.jsxs("div",{className:"currency-details",children:[a.jsx("div",{className:"currency-name",children:(p==null?void 0:p.name)||s}),d[s==null?void 0:s.toUpperCase()]&&a.jsxs("div",{className:"currency-rate",children:["1 ",s," ≈ ",U(d[s.toUpperCase()])]})]})]}),a.jsx("div",{className:"section-note",children:"Fixed currency - cannot be changed"})]}),A.length>0&&a.jsxs("div",{className:"section",children:[a.jsx("div",{className:"section-label",children:"Deposit network"}),a.jsxs("div",{className:"network-select-wrapper",children:[a.jsx("select",{className:"network-select",value:j||"",onChange:q,"aria-label":"Select deposit network",children:A.map(f=>a.jsx("option",{value:f._id,children:f.name},f._id))}),a.jsx("div",{className:"select-arrow",children:a.jsx("i",{className:"fas fa-chevron-down"})})]})]}),S&&a.jsxs("div",{className:"qr-section",children:[a.jsx("div",{className:"section-label",children:"Save QR code"}),a.jsxs("div",{className:"qr-container",children:[a.jsx("div",{className:"qr-box","aria-hidden":!0,children:a.jsx(Ne,{value:S,size:180,bgColor:"#ffffff",fgColor:"#000000",level:"H",includeMargin:!0})}),a.jsxs("div",{className:"address-section",children:[a.jsx("div",{className:"address-label",children:"Wallet Address"}),a.jsx("div",{className:"address-text",id:"walletAddress",children:S}),a.jsxs("div",{className:"address-actions",children:[a.jsxs("button",{type:"button",className:"action-btn copy-btn",onClick:V,"aria-label":"Copy address",children:[a.jsx("i",{className:"fas fa-copy"})," Copy Address"]}),a.jsxs("button",{type:"button",className:"action-btn save-btn",onClick:X,"aria-label":"Save QR code",children:[a.jsx("i",{className:"fas fa-download"})," Save QR Code"]})]})]})]})]}),S&&a.jsx(ze,{...D,children:a.jsxs("form",{onSubmit:D.handleSubmit(J),className:"deposit-form",children:[a.jsx("div",{className:"section",children:a.jsxs("div",{className:"form-group",children:[a.jsxs("div",{className:"input-with-usd",children:[a.jsx(le,{name:"amount",label:`Amount (${s})`,placeholder:`Minimum: ${P} ${s}`,className:"withdraw-input"}),re>0&&a.jsxs("div",{className:"usd-value-display",children:["≈ ",U(re)]})]}),a.jsxs("div",{className:"min-amount-note",children:["Minimum deposit: ",P," ",s," (",U(te),")"]})]})}),a.jsx("div",{className:"section",children:a.jsx("div",{className:"form-group",children:a.jsx(le,{name:"txid",label:"Transaction ID",placeholder:"Enter your transaction ID",className:"withdraw-input"})})}),a.jsx("div",{className:"form-actions",children:a.jsx("button",{type:"submit",className:"submit-btn",disabled:!D.formState.isValid||o||g,"aria-disabled":!D.formState.isValid||o||g,children:o?a.jsxs(a.Fragment,{children:[a.jsx("i",{className:"fas fa-spinner fa-spin"})," Processing..."]}):g?a.jsxs(a.Fragment,{children:[a.jsx("i",{className:"fas fa-spinner fa-spin"})," Loading rates..."]}):"Confirm Deposit"})})]})}),x&&a.jsxs("div",{className:"loading-section",role:"status","aria-live":"polite",children:[a.jsx("div",{className:"spinner"}),a.jsx("div",{children:"Loading deposit information..."})]}),!x&&!S&&s&&a.jsxs("div",{className:"error-section",role:"alert",children:[a.jsx("i",{className:"fas fa-exclamation-triangle"}),a.jsxs("div",{children:["No deposit address found for ",s]}),a.jsx("div",{className:"error-note",children:"Please contact support or try another currency."})]}),a.jsxs("div",{className:"hint-section",children:[a.jsx("div",{className:"hint-title",children:"Important Notes"}),a.jsxs("div",{className:"hint-content",children:[a.jsxs("div",{className:"hint-item",children:["1. Send only ",s," to this deposit address. Sending other currencies may result in permanent loss."]}),a.jsxs("div",{className:"hint-item",children:["2. Ensure you are using the correct network (",(ne=A.find(f=>f._id===j))==null?void 0:ne.name,")."]}),a.jsxs("div",{className:"hint-item",children:["3. Minimum deposit amount: ",P," ",s," ($",te," USD equivalent)"]}),a.jsx("div",{className:"hint-item",children:"4. Transactions typically require 1-3 network confirmations before being credited to your account."}),a.jsx("div",{className:"hint-item",children:"5. Always double-check the address before sending funds."})]})]})]})}),a.jsxs("div",{className:`toast ${m?"visible":""}`,role:"status","aria-live":"polite",children:[a.jsx("i",{className:"fas fa-check-circle toast-icon"}),N]}),r&&a.jsx("div",{className:"modal-overlay",role:"dialog","aria-modal":"true",children:a.jsxs("div",{className:"modal-content",children:[a.jsxs("div",{className:"modal-header",children:[a.jsx("h3",{children:"Deposit Submitted Successfully"}),a.jsx("button",{className:"modal-close",onClick:W,"aria-label":"Close",children:a.jsx("i",{className:"fas fa-times"})})]}),a.jsxs("div",{className:"modal-body",children:[a.jsx("div",{className:"success-icon",children:a.jsx("i",{className:"fas fa-check-circle"})}),a.jsxs("div",{className:"success-message",children:["Your deposit of ",I," ",s," has been submitted for processing."]}),a.jsxs("div",{className:"success-details",children:[a.jsx("p",{children:"Please wait for network confirmations. This usually takes 5-30 minutes."}),a.jsx("p",{children:"You can track the status in your transaction history."})]})]}),a.jsx("div",{className:"modal-footer",children:a.jsx("button",{className:"modal-btn",onClick:W,children:"OK"})})]})}),a.jsx("style",{children:`
        /* Deposit Container – matches profile/wallet theme */
        .deposit-container {
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

        /* Header / Navigation */
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
          flex: 1;
        }

        /* Content Card */
        .content-card {
          flex: 1;
          background-color: #1c1c1c;
          border-top-left-radius: 24px;
          border-top-right-radius: 24px;
          padding: 24px 20px;
          border-top: 2px solid #39FF14;
        }

        /* Deposit Content */
        .deposit-content {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        /* Info Box (minimum deposit) */
        .info-box {
          background-color: #2a2a2a;
          border-radius: 8px;
          padding: 12px 16px;
          border: 1px solid #3a3a3a;
        }
        .info-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 14px;
        }
        .info-label {
          color: #aaaaaa;
        }
        .info-value {
          color: #39FF14;
          font-weight: 600;
        }
        .rate-loading {
          font-size: 12px;
          color: #aaaaaa;
          margin-top: 8px;
        }
        .rate-loading i {
          margin-right: 4px;
        }

        /* Section */
        .section {
          margin-bottom: 8px;
        }
        .section-label {
          font-size: 14px;
          font-weight: 500;
          color: #ffffff;
          margin-bottom: 8px;
        }
        .section-note {
          font-size: 12px;
          color: #777777;
          margin-top: 4px;
        }

        /* Currency Display - updated for consistent height */
        .currency-display {
          display: flex;
          align-items: center;
          gap: 12px;
          background-color: #2a2a2a;
          border-radius: 8px;
          padding: 8px 12px;
          border: 1px solid #3a3a3a;
          min-height: 46px;
          box-sizing: border-box;
        }

        /* Icon container - smaller and consistent */
        .currency-icon {
          height: 25px;
          border-radius: 50%;
          background-color: #1c1c1c;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 1px solid #39FF14;
          overflow: hidden;
          flex-shrink: 0;
        }

        /* Fallback text inside icon */
        .currency-icon:empty::before,
        .currency-icon span {
          font-size: 14px;
          font-weight: bold;
          color: #39FF14;
        }

        .currency-icon img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .currency-details {
          flex: 1;
        }
        .currency-name {
          font-size: 16px;
          font-weight: 600;
          color: #ffffff;
        }
        .currency-rate {
          font-size: 12px;
          color: #aaaaaa;
          margin-top: 2px;
        }

        /* Network Select - updated for consistent height */
        .network-select-wrapper {
          position: relative;
          height: 46px;
        }

        .network-select {
          width: 100%;
          padding: 12px 16px;
          background-color: #2a2a2a;
          border: 1px solid #3a3a3a;
          border-radius: 6px;
          color: #ffffff;
          font-size: 14px;
          appearance: none;
          cursor: pointer;
          line-height: 1.2;
          height: 46px;
        }

        .network-select:focus {
          outline: none;
          border-color: #39FF14;
        }

        .select-arrow {
          position: absolute;
          right: 12px;
          top: 50%;
          transform: translateY(-50%);
          color: #39FF14;
          pointer-events: none;
        }

        /* QR Section */
        .qr-section {
          margin-top: 8px;
        }
        .qr-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 16px;
          background-color: #2a2a2a;
          border-radius: 12px;
          padding: 20px;
          border: 1px solid #3a3a3a;
        }
        .qr-box {
          background: #ffffff;
          padding: 12px;
          border-radius: 8px;
          display: inline-block;
        }
        .qr-box canvas {
          display: block;
          width: 180px;
          height: 180px;
        }
        .address-section {
          width: 100%;
          text-align: center;
        }
        .address-label {
          font-size: 12px;
          color: #aaaaaa;
          margin-bottom: 4px;
        }
        .address-text {
          font-size: 14px;
          font-weight: 500;
          color: #ffffff;
          word-break: break-all;
          background-color: #1c1c1c;
          padding: 8px;
          border-radius: 6px;
          margin-bottom: 12px;
        }
        .address-actions {
          display: flex;
          gap: 8px;
        }
        .action-btn {
          flex: 1;
          background: none;
          border: 1px solid #39FF14;
          color: #39FF14;
          padding: 8px;
          border-radius: 6px;
          font-size: 14px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          transition: all 0.2s;
        }
        .action-btn:hover {
          background-color: #39FF14;
          color: #000000;
        }
        .action-btn i {
          font-size: 14px;
        }

        /* Form */
        .deposit-form {
          margin-top: 16px;
        }
        .form-group {
          margin-bottom: 16px;
        }
        .input-with-usd {
          position: relative;
        }
        .withdraw-input {
          width: 100%;
        }
        .withdraw-input input {
          width: 100%;
          padding: 12px;
          background-color: #2a2a2a;
          border: 1px solid #3a3a3a;
          border-radius: 6px;
          color: #ffffff;
          font-size: 16px;
        }
        .withdraw-input input:focus {
          outline: none;
          border-color: #39FF14;
        }
        .usd-value-display {
          position: absolute;
          right: 12px;
          top: 50%;
          transform: translateY(-50%);
          color: #39FF14;
          font-size: 14px;
          font-weight: 500;
          background-color: #2a2a2a;
          padding-left: 8px;
        }
        .min-amount-note {
          font-size: 12px;
          color: #777777;
          margin-top: 4px;
        }

        /* Submit Button */
        .form-actions {
          margin-top: 24px;
        }
        .submit-btn {
          width: 100%;
          background-color: #39FF14;
          color: #000000;
          border: none;
          border-radius: 6px;
          padding: 14px;
          font-size: 16px;
          font-weight: bold;
          cursor: pointer;
          transition: background-color 0.2s;
        }
        .submit-btn:hover:not(:disabled) {
          background-color: #2ecc10;
        }
        .submit-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
          background-color: #2a2a2a;
          color: #777777;
        }

        /* Loading / Error */
        .loading-section {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
          padding: 24px;
          color: #aaaaaa;
        }
        .spinner {
          width: 30px;
          height: 30px;
          border: 2px solid #39FF14;
          border-top-color: transparent;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        .error-section {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
          padding: 24px;
          color: #ff6b6b;
          text-align: center;
        }
        .error-section i {
          font-size: 32px;
        }
        .error-note {
          font-size: 14px;
          color: #aaaaaa;
        }

        /* Hint Section */
        .hint-section {
          background-color: #2a2a2a;
          border-radius: 8px;
          padding: 16px;
          border: 1px solid #3a3a3a;
          margin-top: 8px;
        }
        .hint-title {
          font-size: 16px;
          font-weight: 600;
          color: #39FF14;
          margin-bottom: 12px;
        }
        .hint-content {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .hint-item {
          font-size: 13px;
          color: #cccccc;
          line-height: 1.5;
        }

        /* Toast */
        .toast {
          position: fixed;
          bottom: 24px;
          left: 50%;
          transform: translateX(-50%) translateY(100px);
          background-color: #39FF14;
          color: #000000;
          padding: 12px 24px;
          border-radius: 30px;
          font-size: 14px;
          font-weight: 600;
          box-shadow: 0 4px 15px rgba(57, 255, 20, 0.3);
          display: flex;
          align-items: center;
          gap: 8px;
          transition: transform 0.3s ease;
          z-index: 1100;
          max-width: 90%;
          white-space: nowrap;
        }
        .toast.visible {
          transform: translateX(-50%) translateY(0);
        }
        .toast-icon {
          font-size: 16px;
        }

        /* Modal */
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: rgba(0, 0, 0, 0.8);
          backdrop-filter: blur(4px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 2000;
          padding: 20px;
        }
        .modal-content {
          background-color: #1c1c1c;
          border-top: 2px solid #39FF14;
          border-radius: 24px;
          width: 100%;
          max-width: 380px;
          max-height: 90vh;
          overflow-y: auto;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.5);
          animation: modalSlideUp 0.3s ease;
        }
        @keyframes modalSlideUp {
          from {
            opacity: 0;
            transform: translateY(50px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 16px 20px;
          border-bottom: 1px solid #2a2a2a;
        }
        .modal-header h3 {
          margin: 0;
          font-size: 18px;
          font-weight: 600;
          color: #ffffff;
        }
        .modal-close {
          background: #2a2a2a;
          border: none;
          color: #ffffff;
          font-size: 16px;
          cursor: pointer;
          padding: 8px;
          border-radius: 50%;
          width: 36px;
          height: 36px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s;
        }
        .modal-close:hover {
          background: #39FF14;
          color: #000000;
        }
        .modal-body {
          padding: 24px 20px;
          text-align: center;
        }
        .success-icon {
          font-size: 48px;
          color: #39FF14;
          margin-bottom: 16px;
        }
        .success-message {
          font-size: 16px;
          font-weight: 500;
          color: #ffffff;
          margin-bottom: 12px;
        }
        .success-details {
          font-size: 14px;
          color: #aaaaaa;
          line-height: 1.5;
        }
        .modal-footer {
          padding: 16px 20px;
          border-top: 1px solid #2a2a2a;
          display: flex;
          justify-content: center;
        }
        .modal-btn {
          background-color: #39FF14;
          color: #000000;
          border: none;
          border-radius: 6px;
          padding: 12px 30px;
          font-size: 16px;
          font-weight: bold;
          cursor: pointer;
          transition: background-color 0.2s;
        }
        .modal-btn:hover {
          background-color: #2ecc10;
        }

        /* Responsive */
        @media (max-width: 360px) {
          .content-card {
            padding: 20px 16px;
          }
          .qr-box canvas {
            width: 150px;
            height: 150px;
          }
        }

        /* Remove blue highlight on tap */
        .back-arrow, .action-btn, .submit-btn, .modal-close, .modal-btn {
          -webkit-tap-highlight-color: transparent;
        }
      `})]})}export{tt as default};
