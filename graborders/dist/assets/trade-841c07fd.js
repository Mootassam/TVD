import{u as F,A as he,B as ve,C as ye,D as Z,i as o,j as s,E as Je,F as Xe,G as ee,H as Ne,I as te,k as e,L as Ze,J as et}from"./index-680400b2.js";import{C as tt}from"./CoinSelectorSidebar-734eaac9.js";import{u as at}from"./useDispatch-cbb2647c.js";const m=l=>{if(l==null||l==="")return NaN;const N=Number(l);return Number.isFinite(N)?N:NaN},st=[{value:30,label:"30s - 20%"},{value:60,label:"60s - 30%"},{value:120,label:"120s - 50%"},{value:86400,label:"24h - 60%"},{value:172800,label:"48h - 70%"},{value:259200,label:"72h - 80%"},{value:604800,label:"7d - 90%"},{value:1296e3,label:"15d - 100%"}],rt=["1","2","3","5","10","20","50","100"],je=(l,N,C=!0)=>{const k=o.useRef(null),y=o.useRef(N);return o.useEffect(()=>{y.current=N},[N]),o.useEffect(()=>{if(!C||!l){k.current&&(k.current.close(),k.current=null);return}try{const j=new WebSocket(l);return k.current=j,j.onopen=()=>{console.log(s("pages.trade.websocketConnected"),l)},j.onmessage=M=>{try{const z=JSON.parse(M.data);y.current(z)}catch(z){console.error(s("pages.trade.websocketParseError"),z)}},j.onerror=M=>{console.error(s("pages.trade.websocketError"),M)},j.onclose=()=>{console.log(s("pages.trade.websocketClosed"))},()=>{j.readyState===WebSocket.OPEN&&j.close()}}catch(j){console.error(s("pages.trade.websocketCreateError"),j)}},[l,C]),k},we=({onPercentageSelect:l,currentPercentage:N=0})=>{const C=[0,25,50,75,100],k=y=>{l(y/100)};return e.jsxs("div",{className:"percentage-progress-bar",children:[e.jsx("div",{className:"progress-bar-labels",children:C.map(y=>e.jsxs("span",{className:"progress-label",children:[y,"%"]},y))}),e.jsxs("div",{className:"progress-bar-track",children:[e.jsx("div",{className:"progress-bar-fill",style:{width:`${N}%`}}),e.jsx("div",{className:"progress-bar-markers",children:C.map(y=>e.jsx("div",{className:`progress-marker ${y<=N?"active":""}`,onClick:()=>k(y)},y))})]})]})};function ct(){const l=at(),N=F(he.selectRows)||[],C=F(ve.selectRows)||[],k=F(ye.selectRows)||[],y=F(Z.selectRows)||[],j=F(Z.pendingRows),M=F(he.selectLoading),z=F(Z.selectLoading),ae=F(ye.selectLoading),ke=F(ve.selectLoading),[f,Ce]=o.useState("BTCUSDT"),[g,Te]=o.useState("0"),[ot,Se]=o.useState("0"),[Fe,I]=o.useState(!1),[v,Pe]=o.useState("LIMIT"),[A,se]=o.useState("0"),[re,L]=o.useState(""),[b,P]=o.useState(""),[x,Q]=o.useState("buy"),[O,De]=o.useState({asks:[],bids:[]}),[E,V]=o.useState(!1),[oe,T]=o.useState(""),[p,Ae]=o.useState("Positions"),[n,Me]=o.useState("trade"),[W,ze]=o.useState("10"),[Y,Le]=o.useState("30"),[c,ie]=o.useState(null),[Ee,ne]=o.useState(!1),le=o.useRef(null),R=o.useRef(!0),ce=o.useRef(f),h=o.useCallback((t,a=2)=>{const i=Number(t);return Number.isFinite(i)?i.toLocaleString(void 0,{minimumFractionDigits:a,maximumFractionDigits:a}):0 .toFixed(a)},[]),D=o.useCallback(t=>{const a=Number(t);return Number.isFinite(a)?new Intl.NumberFormat("en-US",{style:"currency",currency:"USD",minimumFractionDigits:2,maximumFractionDigits:2}).format(a):s("common.currencyFormat","0.00")},[]),_=o.useCallback(t=>{try{return new Date(t).toLocaleDateString("en-US",{month:"short",day:"numeric",year:"numeric"})}catch{return s("common.invalidDate")}},[]),U=o.useCallback(t=>{try{return new Date(t).toLocaleTimeString("en-US",{hour:"2-digit",minute:"2-digit",hour12:!0})}catch{return s("common.invalidTime")}},[]),de=o.useCallback(t=>t?t<60?`${t}s`:t<3600?`${Math.floor(t/60)}m`:t<86400?`${Math.floor(t/3600)}h`:t<604800?`${Math.floor(t/86400)}d`:`${Math.floor(t/86400)}d`:"N/A",[]),S=o.useMemo(()=>f.replace("USDT",""),[f]),H=o.useMemo(()=>{if(!Array.isArray(C))return{};const t={};for(const a of C)a.symbol&&a.amount&&(t[a.symbol]=Number(a.amount)||0);return t},[C]),d=o.useMemo(()=>n==="trade"||x==="buy"?H.USDT||0:H[S]||0,[n,x,S,H]),pe=o.useMemo(()=>{if(n==="trade"){const t=m(b);if(!Number.isFinite(t)||t<=0||d<=0)return 0;const a=t/d*100;return Math.min(100,Math.max(0,a))}else if(x==="buy"){const t=m(b);if(!Number.isFinite(t)||t<=0||d<=0)return 0;const a=t/d*100;return Math.min(100,Math.max(0,a))}else{const t=m(b),a=m(g);if(!Number.isFinite(t)||t<=0||!Number.isFinite(a)||a<=0||d<=0)return 0;const r=t/a/d*100;return Math.min(100,Math.max(0,r))}},[n,x,b,d,g]),Ue=o.useMemo(()=>n==="trade"?`${s("pages.trade.available")}: ${h(d,2)} USDT`:x==="buy"?`${s("pages.trade.available")}: ${h(d,2)} USDT`:`${s("pages.trade.available")}: ${h(d,6)} ${S}`,[n,x,d,S,h]),$e=o.useMemo(()=>E?s("pages.trade.placing"):n==="trade"?`${x==="buy"?s("pages.trade.long"):s("pages.trade.short")} (USDT)`:`${x==="buy"?s("pages.trade.buy"):s("pages.trade.sell")} ${S}`,[E,n,x,S]),Ie=o.useMemo(()=>f?`wss://stream.binance.com:9443/ws/${f.toLowerCase()}@ticker`:null,[f]),Oe=o.useMemo(()=>f?`wss://stream.binance.com:9443/ws/${f.toLowerCase()}@depth20@100ms`:null,[f]),Re=o.useCallback(t=>{t.c!==void 0&&Te(t.c),t.P!==void 0&&Se(t.P)},[]),Be=o.useCallback(t=>{const a=(t.asks||[]).slice(0,5).map(r=>({price:r[0],amount:r[1]})),i=(t.bids||[]).slice(0,5).map(r=>({price:r[0],amount:r[1]}));De({asks:a,bids:i})},[]);je(Ie,Re,R.current),je(Oe,Be,R.current);const $=o.useCallback(t=>{const a=m(t),i=m(n==="perpetual"&&v==="LIMIT"?A:g);if(Number.isFinite(a)&&Number.isFinite(i)&&i>0){const r=a/i;L(r.toFixed(8))}else L("")},[n,v,A,g]);o.useEffect(()=>(R.current=!0,l(Je.doFetch(n)),()=>{R.current=!1,le.current&&le.current.abort()}),[l,n]),o.useEffect(()=>{if(!R.current)return;const a=setTimeout(()=>{if(p==="Transaction history"){l(et.doFetch());return}n==="perpetual"?p==="Positions"?l(te.doFetchPending()):p==="History orders"&&l(te.doFetch()):n==="trade"&&(p==="Positions"?l(ee.doFetchPending()):p==="History orders"&&l(ee.doFetch()))},100);return()=>clearTimeout(a)},[l,n,p]),o.useEffect(()=>{g&&g!=="0"&&(se(g),b&&!isNaN(Number(b))&&$(b))},[g,b,$]),o.useEffect(()=>{ce.current!==f&&(L(""),P(""),ce.current=f)},[f]);const ue=o.useCallback(t=>{const i=t.target.value.replace(/[^\d.]/g,""),r=i.split(".");if(r.length>2){const u=r[0]+"."+r.slice(1).join("");P(u)}else P(i);i!==""?$(i):L("")},[$]),Ke=o.useCallback(t=>{const a=t.target.value;se(a),b&&!isNaN(Number(b))&&$(b)},[b,$]),me=o.useCallback(t=>{if(n==="trade"){const a=d,i=a*t,r=Math.min(i,a),u=parseFloat(r.toFixed(8));P(u.toString())}else if(x==="buy"){const a=d,i=a*t,r=Math.min(i,a),u=parseFloat(r.toFixed(8));P(u.toString())}else{const a=d,i=a*t,r=m(g)||m(A)||1,u=i*r,w=a*r,K=Math.min(u,w),G=parseFloat(K.toFixed(8));P(G.toString())}},[n,x,d,g,A]),fe=o.useCallback(async t=>{const a=parseFloat(g||"0")||0,r={futuresStatus:x==="buy"?"long":"short",profitAndLossAmount:"",leverage:parseInt(W,10),control:"loss",operate:"low",futureCoin:f.replace("USDT","/USDT"),closePositionTime:"",closePositionPrice:"",openPositionTime:new Date().toISOString(),openPositionPrice:a,contractDuration:Y,futuresAmount:t.toFixed(8)};try{const u=await l(Xe.doCreate(r)),w=u!=null&&u.id?u:u==null?void 0:u.payload;return w!=null&&w.id?(L(""),P(""),p==="Positions"&&l(ee.doFetchPending()),w):null}catch(u){throw console.error(s("pages.trade.errors.createError"),u),u}},[g,x,W,f,Y,l,p]),Qe=o.useCallback(()=>I(!0),[]);o.useCallback(()=>I(!1),[]);const Ve=o.useCallback(t=>{if(!t||t===f){I(!1);return}Ce(t),I(!1)},[f]),_e=o.useCallback(t=>{ie(t),ne(!0)},[]),xe=o.useCallback(()=>{ne(!1),setTimeout(()=>{ie(null)},300)},[]),ge=o.useCallback(()=>{const t=Date.now().toString(36),a=Math.floor(Math.random()*1e6).toString(36);return s("pages.trade.orderNumberFormat",t,a)},[]),J=o.useCallback((t,a,i=1e-6)=>Math.abs(t-a)<=i,[]),He=o.useCallback(async()=>{if(T(""),!E)if(n==="trade"){const t=m(b);if(!Number.isFinite(t)||t<=0){T(s("pages.trade.errors.invalidAmount"));return}if(t>d+1e-6){T(s("pages.trade.errors.insufficientUSDT",h(d,2)));return}const a=J(t,d)?d:t;V(!0);try{await fe(a)}catch(i){console.error(s("pages.trade.errors.createError"),i),T(s("pages.trade.errors.failedOrder"))}finally{V(!1)}}else{const t=m(v==="MARKET"?g:A),a=m(re);if(!Number.isFinite(a)||a<=0){T(s("pages.trade.errors.invalidQuantity"));return}if(!Number.isFinite(t)||t<=0){T(s("pages.trade.errors.invalidPrice"));return}if(x==="buy"){if(t*a>d+1e-6){T(s("pages.trade.errors.insufficientUSDT",h(d,2)));return}}else if(a>d+1e-6){T(s("pages.trade.errors.insufficientCoin",h(d,6),S));return}V(!0);try{const i=t,w=i*a*.001,K=J(a,d)?d:a,G=i*K,Ye={orderNo:ge(),orderType:v.toLowerCase(),tradingPair:f.replace("USDT","/USDT"),status:v==="MARKET"?"completed":"pending",direction:x.toUpperCase(),delegateType:v,delegateState:v==="MARKET"?"Filled":"Pending",orderQuantity:K,commissionPrice:i,entrustedValue:G,transactionQuantity:v==="MARKET"?K:0,transactionValue:v==="MARKET"?G:0,closingPrice:v==="MARKET"?i:0,handlingFee:v==="MARKET"?w:0,commissionTime:new Date().toISOString(),closingTime:v==="MARKET"?new Date().toISOString():null};await l(Ne.doCreate(Ye)),L(""),P(""),p==="Positions"&&l(te.doFetchPending())}catch(i){console.error(s("pages.trade.errors.placeOrderError"),i),T(s("pages.trade.errors.failedOrder"))}finally{V(!1)}}},[E,re,v,g,A,f,x,l,ge,d,S,h,n,b,p,fe,J]),qe=o.useCallback(async(t,a)=>{a.status="canceled",l(Ne.doUpdate(t,a))},[l]),be=o.useMemo(()=>{const t=[...O.asks.map(a=>m(a.amount)),...O.bids.map(a=>m(a.amount))].filter(a=>Number.isFinite(a));return Math.max(...t,1)},[O]),Ge=o.useCallback((t,a,i)=>{const r={icon:"fa-exchange-alt",typeText:s("pages.history.transactionTypes.transaction"),iconClass:"swap",color:"#627EEA",amountColor:a==="in"?"#2ff378":"#FF6838"};switch(t){case"deposit":r.icon="fa-arrow-down",r.typeText=s("pages.history.transactionTypes.deposit"),r.iconClass="deposit",r.color="#F3BA2F",r.amountColor="#2ff378";break;case"withdraw":r.icon="fa-arrow-up",r.typeText=s("pages.history.transactionTypes.withdrawal"),r.iconClass="withdraw",r.color="#FF6838",r.amountColor="#FF6838";break;case"futures_profit":r.icon="fa-chart-line",r.typeText=s("pages.history.transactionTypes.futuresProfit"),r.iconClass="futures-profit",r.color="#00C076",r.amountColor="#00C076";break;case"futures_loss":r.icon="fa-chart-line",r.typeText=s("pages.history.transactionTypes.futuresLoss"),r.iconClass="futures-loss",r.color="#FF6838",r.amountColor="#FF6838";break;case"futures_reserved":r.icon="fa-clock",r.typeText=s("pages.history.transactionTypes.futuresReserved"),r.iconClass="futures-reserved",r.color="#FF9800",r.amountColor="#FF6838";break;case"order_reserved":r.icon="fa-clock",r.typeText=s("pages.history.transactionTypes.orderReserved"),r.iconClass="order-reserved",r.color="#FF9800",r.amountColor="#FF6838";break;default:r.icon="fa-exchange-alt",r.typeText=s("pages.history.transactionTypes.transaction"),r.iconClass="default",r.color="#627EEA",r.amountColor="#627EEA"}return r},[]),q=o.useCallback(t=>{const a={color:"#6c757d",bgColor:"#e9ecef",text:t||s("common.unknown")};switch(t==null?void 0:t.toLowerCase()){case"long":a.color="#37b66a",a.bgColor="rgba(55, 182, 106, 0.1)",a.text=s("pages.trade.futuresStatus.long");break;case"short":a.color="#f56c6c",a.bgColor="rgba(245, 108, 108, 0.1)",a.text=s("pages.trade.futuresStatus.short");break;case"closed":a.color="#106cf5",a.bgColor="rgba(16, 108, 245, 0.1)",a.text=s("pages.trade.futuresStatus.closed");break;case"liquidated":a.color="#dc3545",a.bgColor="rgba(220, 53, 69, 0.1)",a.text=s("pages.trade.futuresStatus.liquidated");break}return a},[]),X=o.useMemo(()=>p==="Transaction history"?ae:n==="perpetual"?M:n==="trade"?z:!1,[p,n,M,z,ae]),B=o.useMemo(()=>p==="Transaction history"?k:n==="perpetual"&&p==="Positions"?N.filter(t=>t.status==="pending"):n==="perpetual"&&p==="History orders"?N.filter(t=>t.status!=="pending"):n==="trade"&&p==="Positions"?j:n==="trade"&&p==="History orders"?y.filter(t=>t.closePositionTime):[],[p,n,N,y,k,j]),We=o.useMemo(()=>X?!1:B.length===0,[X,B]);return o.useCallback(t=>{var w;if(!t||!t.futuresAmount||!t.openPositionPrice||!g)return 0;const a=parseFloat(t.futuresAmount),i=parseFloat(t.openPositionPrice),r=m(g),u=parseInt(t.leverage||"1",10);return!a||!i||!r?0:((w=t.futuresStatus)==null?void 0:w.toLowerCase())==="long"?(r-i)/i*a*u:(i-r)/i*a*u},[g]),e.jsxs("div",{className:"container",children:[e.jsx("div",{className:"trade-header",children:e.jsxs("div",{className:"nav-bar",children:[e.jsxs("div",{className:"back-arrow",children:[e.jsxs("div",{className:"trading-pair",onClick:Qe,children:[e.jsx("i",{className:"fas fa-chevron-down dropdown-arrow"}),f.replace("USDT","")," / USDT"]}),e.jsx("div",{children:e.jsx("p",{style:{fontSize:10},children:n==="trade"?s("pages.trade.tradingMode.trade"):s("pages.trade.tradingMode.perpetual")})})]}),e.jsxs("div",{className:"header-right",children:[e.jsxs("select",{className:"trade-type-select",value:n,onChange:t=>Me(t.target.value),children:[e.jsx("option",{value:"trade",children:s("pages.trade.tradingMode.trade")}),e.jsx("option",{value:"perpetual",children:s("pages.trade.tradingMode.perpetual")})]}),e.jsx(Ze,{to:`market/detail/${f}`,className:"chart-icon",children:e.jsx("i",{className:"fas fa-chart-line"})})]})]})}),e.jsxs("div",{className:"main-content",children:[e.jsxs("div",{className:"trading-layout",children:[e.jsxs("div",{className:"trade-form",children:[e.jsxs("div",{className:"buy-sell-tabs",role:"tablist",children:[e.jsx("div",{role:"tab","aria-selected":x==="buy",tabIndex:0,className:`buy-tab ${x==="buy"?"active":""}`,onClick:()=>Q("buy"),onKeyDown:t=>t.key==="Enter"&&Q("buy"),children:s("pages.trade.long")}),e.jsx("div",{role:"tab","aria-selected":x==="sell",tabIndex:0,className:`sell-tab ${x==="sell"?"active":""}`,onClick:()=>Q("sell"),onKeyDown:t=>t.key==="Enter"&&Q("sell"),children:s("pages.trade.short")})]}),n==="trade"&&e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"input-group",children:[e.jsx("div",{className:"input-label",children:s("pages.trade.tradingPeriod")}),e.jsx("select",{className:"order-type-select",value:Y,onChange:t=>Le(t.target.value),children:st.map(t=>e.jsx("option",{value:t.value,children:t.label},t.value))})]}),e.jsxs("div",{className:"input-group",children:[e.jsx("div",{className:"input-label",children:s("pages.trade.leverage")}),e.jsx("select",{className:"order-type-select",value:W,onChange:t=>ze(t.target.value),children:rt.map(t=>e.jsxs("option",{value:t,children:[t,"x"]},t))})]}),e.jsxs("div",{className:"input-group",children:[e.jsxs("div",{className:"input-label",children:[s("pages.trade.amount")," (USDT)"]}),e.jsx("div",{className:"input-with-buttons",children:e.jsx("input",{className:"value-input",value:b,onChange:ue,placeholder:"0.0",inputMode:"decimal","aria-label":s("pages.trade.amount")})}),e.jsx(we,{onPercentageSelect:me,currentPercentage:pe})]})]}),n==="perpetual"&&e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"order-type",children:[e.jsx("div",{className:"order-type-label",children:s("pages.trade.orderType")}),e.jsxs("select",{className:"order-type-select",value:v,onChange:t=>Pe(t.target.value),children:[e.jsx("option",{value:"LIMIT",children:s("pages.trade.limit")}),e.jsx("option",{value:"MARKET",children:s("pages.trade.market")})]})]}),v==="LIMIT"&&e.jsxs("div",{className:"input-group",children:[e.jsx("div",{className:"input-label",children:s("pages.trade.price")}),e.jsx("div",{className:"input-with-buttons",children:e.jsx("input",{className:"value-input",value:A,onChange:Ke,inputMode:"decimal","aria-label":s("pages.trade.price")})})]}),e.jsxs("div",{className:"input-group",children:[e.jsxs("div",{className:"input-label",children:[s("pages.trade.amount")," (USDT)"]}),e.jsx("div",{className:"input-with-buttons",children:e.jsx("input",{className:"value-input",value:b,onChange:ue,placeholder:"0.0",inputMode:"decimal","aria-label":s("pages.trade.amount")})}),e.jsx(we,{onPercentageSelect:me,currentPercentage:pe})]})]}),e.jsx("div",{className:"balance-info",children:Ue}),oe&&e.jsx("div",{className:"error-message",role:"alert",children:oe}),e.jsx("button",{className:`action-button ${x==="buy"?"buy-button":"sell-button"}`,onClick:He,disabled:E||ke,"aria-busy":E,children:$e})]}),e.jsxs("div",{className:"order-book",role:"region","aria-label":"order book",children:[e.jsxs("div",{className:"order-book-header",children:[e.jsx("span",{children:s("pages.trade.orderBook.price")}),e.jsxs("span",{children:[s("pages.trade.orderBook.amount")," (",S,")"]})]}),O.asks.map((t,a)=>{const i=m(t.amount)||0,r=Math.min(100,i/be*100);return e.jsxs("div",{className:"order-book-row ask-row",children:[e.jsx("div",{className:"depth-bar ask-depth",style:{width:`${r}%`}}),e.jsx("div",{className:"order-price",children:h(t.price,4)}),e.jsx("div",{className:"order-amount",children:h(t.amount,4)})]},`ask-${a}`)}),e.jsx("div",{className:"order-book-row current-price-row",children:e.jsxs("div",{className:"current-price",children:["$",h(g,2)]})}),O.bids.map((t,a)=>{const i=m(t.amount)||0,r=Math.min(100,i/be*100);return e.jsxs("div",{className:"order-book-row bid-row",children:[e.jsx("div",{className:"depth-bar bid-depth",style:{width:`${r}%`}}),e.jsx("div",{className:"order-price",children:h(t.price,4)}),e.jsx("div",{className:"order-amount",children:h(t.amount,4)})]},`bid-${a}`)})]})]}),e.jsxs("div",{className:"orders-tabs",children:[e.jsx("div",{className:"orders-tabs-header",children:[s("pages.trade.tabs.positions"),s("pages.trade.tabs.historyOrders"),s("pages.trade.tabs.transactionHistory")].map(t=>e.jsx("div",{className:`orders-tab ${p===t?"active":""}`,onClick:()=>Ae(t),children:t},t))}),e.jsx("div",{className:"orders-tab-content",children:X?e.jsx("div",{className:"loading-skeleton",children:[...Array(3)].map((t,a)=>e.jsx("div",{className:"skeleton-item"},a))}):We?e.jsxs("div",{className:"empty-orders",children:[e.jsx("div",{className:"empty-icon",children:e.jsx("i",{className:"fas fa-inbox"})}),e.jsx("div",{className:"empty-text",children:s("pages.trade.noData",p.toLowerCase())}),e.jsx("div",{className:"empty-subtext",children:p===s("pages.trade.tabs.transactionHistory")?s("pages.trade.noTransactionsText"):s("pages.trade.noOrdersText",p.toLowerCase())})]}):p===s("pages.trade.tabs.transactionHistory")?e.jsx("div",{className:"transactions-list",children:B.map(t=>{const a=Ge(t.type,t.direction,t.relatedAsset),i=t.direction==="in"?"+":"-";return e.jsxs("div",{className:"transaction-item",children:[e.jsx("div",{className:"transaction-icon",style:{backgroundColor:a.color},children:e.jsx("i",{className:`fas ${a.icon}`})}),e.jsxs("div",{className:"transaction-details",children:[e.jsxs("div",{className:"transaction-main",children:[e.jsx("div",{className:"transaction-type",children:a.typeText}),e.jsxs("div",{className:"transaction-amount",style:{color:a.amountColor},children:[i,h(t.amount,2)," ",t.asset]})]}),e.jsxs("div",{className:"transaction-secondary",children:[e.jsx("div",{className:"transaction-status",children:e.jsx("span",{className:`status-badge status-${t.status}`,children:t.status})}),e.jsxs("div",{className:"transaction-date",children:[_(t.createdAt)," ",U(t.createdAt)]})]})]})]},t.id??t._id)})}):n==="perpetual"?e.jsx("div",{className:"orders-list",children:B.map(t=>{var a;return e.jsxs("div",{className:"order-item",children:[e.jsxs("div",{className:"order-main-info",children:[e.jsxs("div",{className:"order-pair-action",children:[e.jsx("span",{className:"order-pair",children:t.tradingPair}),e.jsx("span",{className:`order-action ${String((t==null?void 0:t.direction)||"").toLowerCase()}`,children:t.direction}),e.jsx("span",{className:"order-type-badge",children:t.orderType})]}),e.jsxs("div",{className:"order-date",children:[t.commissionTime?new Date(t.commissionTime).toLocaleDateString():"",e.jsx("span",{className:"order-time",children:t.commissionTime?new Date(t.commissionTime).toLocaleTimeString():""})]})]}),e.jsxs("div",{className:"order-details",children:[e.jsxs("div",{className:"order-detail",children:[e.jsx("span",{className:"detail-label",children:s("pages.trade.orderDetails.status")}),e.jsx("span",{className:`order-status ${String(t.status).toLowerCase()}`,children:t.status})]}),e.jsxs("div",{className:"order-detail",children:[e.jsx("span",{className:"detail-label",children:s("pages.trade.orderDetails.price")}),e.jsxs("span",{className:"order-price-value",children:[h(t.commissionPrice,4)," USDT"]})]}),e.jsxs("div",{className:"order-detail",children:[e.jsx("span",{className:"detail-label",children:s("pages.trade.orderDetails.amount")}),e.jsxs("span",{className:"order-amount-value",children:[t.orderQuantity," ",(a=t==null?void 0:t.tradingPair)==null?void 0:a.split("/")[0]]})]}),e.jsxs("div",{className:"order-detail",children:[e.jsx("span",{className:"detail-label",children:s("pages.trade.orderDetails.total")}),e.jsxs("span",{className:"order-total",children:[h(t.entrustedValue)," USDT"]})]})]}),e.jsx("div",{className:"order-actions",children:String(t.status).toLowerCase()==="pending"||String(t.status).toLowerCase()==="partially filled"?e.jsx("button",{className:"cancel-order-btn",onClick:()=>qe(t.id,t),children:s("pages.trade.cancel")}):e.jsx("div",{className:"completed-indicator",children:e.jsx("i",{className:"fas fa-check-circle"})})})]},t.id??t.orderNo)})}):e.jsx("div",{className:"futures-list",children:B.map(t=>{const a=q(t.futuresStatus),i=t.profitAndLossAmount?m(t.profitAndLossAmount):0,r=i>=0;return e.jsxs("div",{className:"future-item",onClick:()=>_e(t),children:[e.jsxs("div",{className:"future-header",children:[e.jsxs("div",{className:"future-pair-status",children:[e.jsx("span",{className:"future-pair",children:t.futureCoin||s("common.unknown")}),e.jsx("span",{className:"future-status",style:{color:a.color,backgroundColor:a.bgColor},children:a.text})]}),e.jsxs("div",{className:"future-leverage",children:[t.leverage,"x"]})]}),e.jsxs("div",{className:"future-details",children:[e.jsxs("div",{className:"future-detail-row",children:[e.jsx("span",{className:"detail-label",children:s("pages.trade.futuresDetails.amount")}),e.jsx("span",{className:"detail-value",children:D(t.futuresAmount)})]}),e.jsxs("div",{className:"future-detail-row",children:[e.jsx("span",{className:"detail-label",children:s("pages.trade.futuresDetails.duration")}),e.jsx("span",{className:"detail-value",children:de(t.contractDuration)})]}),e.jsxs("div",{className:"future-detail-row",children:[e.jsx("span",{className:"detail-label",children:s("pages.trade.futuresDetails.entryPrice")}),e.jsx("span",{className:"detail-value",children:D(t.openPositionPrice)})]}),t.closePositionPrice&&e.jsxs("div",{className:"future-detail-row",children:[e.jsx("span",{className:"detail-label",children:s("pages.trade.futuresDetails.exitPrice")}),e.jsx("span",{className:"detail-value",children:D(t.closePositionPrice)})]}),(i!==0||t.profitAndLossAmount)&&e.jsxs("div",{className:"future-detail-row",children:[e.jsx("span",{className:"detail-label",children:s("pages.trade.futuresDetails.pnl")}),e.jsxs("span",{className:`detail-value ${r?"profit":"loss"}`,children:[r?"+":"",D(i)]})]})]}),e.jsxs("div",{className:"future-footer",children:[e.jsxs("div",{className:"future-timestamp",children:[e.jsx("div",{className:"timestamp-label",children:s("pages.trade.futuresDetails.opened")}),e.jsx("div",{className:"timestamp-value",children:t.openPositionTime?U(t.openPositionTime):s("common.na")})]}),t.closePositionTime&&e.jsxs("div",{className:"future-timestamp",children:[e.jsx("div",{className:"timestamp-label",children:s("pages.trade.futuresDetails.closed")}),e.jsx("div",{className:"timestamp-value",children:U(t.closePositionTime)})]})]})]},t.id??t._id)})})})]})]}),e.jsx(tt,{isOpen:Fe,onClose:()=>I(!1),selectedCoin:f,onCoinSelect:Ve,title:s("pages.trade.coinSelector.title")}),e.jsx("div",{className:`modal-overlay ${Ee&&c?"active":""}`,onClick:xe,children:e.jsx("div",{className:"future-details-modal",onClick:t=>t.stopPropagation(),children:c&&e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"modal-header",children:[e.jsxs("h3",{className:"modal-title",children:[c.futureCoin||s("common.unknown"),e.jsxs("span",{className:"modal-leverage",children:[c.leverage,"x"]})]}),e.jsx("button",{className:"modal-close-btn",onClick:xe,children:e.jsx("i",{className:"fas fa-times"})})]}),e.jsxs("div",{className:"modal-body",children:[e.jsxs("div",{className:"modal-summary",children:[e.jsx("div",{className:"status-badge-large",style:{backgroundColor:q(c.futuresStatus).bgColor,color:q(c.futuresStatus).color},children:q(c.futuresStatus).text}),e.jsxs("div",{className:"pnl-summary",children:[e.jsx("div",{className:"pnl-title",children:s("pages.trade.futuresDetails.pnl")}),e.jsxs("div",{className:`pnl-amount ${(c.profitAndLossAmount?m(c.profitAndLossAmount):0)>=0?"profit":"loss"}`,children:[(c.profitAndLossAmount?m(c.profitAndLossAmount):0)>=0?"+":"",D(c.profitAndLossAmount?m(c.profitAndLossAmount):0)]})]})]}),e.jsxs("div",{className:"details-grid",children:[e.jsxs("div",{className:"detail-item",children:[e.jsx("div",{className:"detail-label",children:s("pages.trade.futuresDetails.amount")}),e.jsx("div",{className:"detail-value",children:D(c.futuresAmount)})]}),e.jsxs("div",{className:"detail-item",children:[e.jsx("div",{className:"detail-label",children:s("pages.trade.futuresDetails.duration")}),e.jsx("div",{className:"detail-value",children:de(c.contractDuration)})]}),e.jsxs("div",{className:"detail-item",children:[e.jsx("div",{className:"detail-label",children:s("pages.trade.futuresDetails.entryPrice")}),e.jsx("div",{className:"detail-value",children:D(c.openPositionPrice)})]}),c.closePositionPrice&&e.jsxs("div",{className:"detail-item",children:[e.jsx("div",{className:"detail-label",children:s("pages.trade.futuresDetails.exitPrice")}),e.jsx("div",{className:"detail-value",children:D(c.closePositionPrice)})]})]}),e.jsxs("div",{className:"timestamps-section",children:[e.jsxs("div",{className:"timestamp-item",children:[e.jsx("div",{className:"timestamp-label",children:s("pages.trade.futuresDetails.opened")}),e.jsx("div",{className:"timestamp-value",children:c.openPositionTime?e.jsxs(e.Fragment,{children:[_(c.openPositionTime),e.jsx("span",{className:"timestamp-time",children:U(c.openPositionTime)})]}):s("common.na")})]}),c.closePositionTime&&e.jsxs("div",{className:"timestamp-item",children:[e.jsx("div",{className:"timestamp-label",children:s("pages.trade.futuresDetails.closed")}),e.jsxs("div",{className:"timestamp-value",children:[_(c.closePositionTime),e.jsx("span",{className:"timestamp-time",children:U(c.closePositionTime)})]})]}),c.contractDuration&&!c.closePositionTime&&e.jsxs("div",{className:"timestamp-item",children:[e.jsx("div",{className:"timestamp-label",children:s("pages.trade.futuresDetails.closed")}),e.jsx("div",{className:"timestamp-value",children:(()=>{const t=new Date(c.openPositionTime),a=new Date(t.getTime()+parseInt(c.contractDuration)*1e3);return e.jsxs(e.Fragment,{children:[_(a.toISOString()),e.jsx("span",{className:"timestamp-time",children:U(a.toISOString())})]})})()})]})]})]})]})})}),e.jsx("style",{children:`
        /* Container */
        .container {
          background-color: rgb(16, 108, 245);
          color: #FFFFFF;
          min-height: 100vh;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif;
          max-width: 400px;
          margin: 0 auto;
          overflow-x: hidden;
        }
        
        /* Trade Header */
        .trade-header {
          padding: 15px 20px;
          color: #fff;
          top: 0;
          z-index: 100;
        }

        .nav-bar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 10px;
        }

        .back-arrow {
          font-size: 18px;
          font-weight: 300;
          cursor: pointer;
          display: flex;
          align-items: center;
          display: flex;
          flex-direction: column;
        }

        .trading-pair {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 16px;
          cursor: pointer;
          transition: all 0.2s ease;
          font-weight: 600;
        }

        .trading-pair:hover {
          opacity: 0.8;
        }

        select option {
          color: #000;
        }

        .dropdown-arrow {
          font-size: 12px;
          transition: transform 0.3s ease;
          color: #fff;
        }

        .header-right {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .trade-type-select {
          font-size: 10px;
          padding: 5px;
          background: rgba(255, 255, 255, 0.2);
          color: #fff;
          border: 1px solid rgba(255,255,255,0.3);
          border-radius: 4px;
        }

        .chart-icon {
          color: #fff;
          font-size: 16px;
          text-decoration: none;
          transition: opacity 0.2s ease;
        }

        .chart-icon:hover {
          opacity: 0.8;
        }

        /* Main Content */
        .main-content {
          background: white;
          border-radius: 40px 40px 0 0;
          padding: 20px 16px 100px;
          min-height: calc(100vh - 120px);
        }

        /* Trading Layout */
        .trading-layout {
          display: flex;
          gap: 12px;
          margin-bottom: 20px;
          align-items: stretch;
        }

        /* Trade Form - 50% width */
        .trade-form {
          display: flex;
          width: 50%;
          flex-direction: column;
        }

        /* Order Book */
        .order-book {
          flex: 1;
          display: flex;
          flex-direction: column;
          position: relative;
        }

        /* Percentage Progress Bar - Modern Design */
        .percentage-progress-bar {
          margin-top: 12px;
          width: 100%;
        }

        .progress-bar-labels {
          display: flex;
          justify-content: space-between;
          margin-bottom: 6px;
          font-size: 10px;
          color: #6c757d;
          font-weight: 500;
        }

        .progress-label {
          position: relative;
          text-align: center;
          width: 20%;
          cursor: pointer;
          transition: color 0.2s ease;
        }

        .progress-label:hover {
          color: #106cf5;
        }

        .progress-bar-track {
          position: relative;
          width: 100%;
          height: 4px;
          background-color: #e9ecef;
          border-radius: 2px;
          box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.05);
        }

        .progress-bar-fill {
          position: absolute;
          height: 100%;
          background-color: #106cf5;
          border-radius: 2px;
          transition: width 0.3s ease;
          box-shadow: 0 1px 2px rgba(16, 108, 245, 0.2);
        }

        .progress-bar-markers {
          position: absolute;
          top: -4px;
          left: 0;
          right: 0;
          display: flex;
          justify-content: space-between;
          pointer-events: none;
        }

        .progress-marker {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background-color: #ffffff;
          border: 2px solid #e9ecef;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
          pointer-events: auto;
        }

        .progress-marker:hover {
          transform: scale(1.2);
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.15);
        }

        .progress-marker.active {
          background-color: #106cf5;
          border-color: #106cf5;
          box-shadow: 0 0 0 3px rgba(16, 108, 245, 0.2);
        }

        /* Orders Tabs */
        .orders-tabs {
          margin-top: 20px;
        }

        .orders-tabs-header {
          display: flex;
          gap: 16px;
          margin-bottom: 16px;
          border-bottom: 1px solid #eef2f6;
          padding-bottom: 8px;
        }

        .orders-tab {
          font-size: 12px;
          cursor: pointer;
          color: #888f99;
          transition: color 0.2s ease;
          padding: 4px 0;
        }

        .orders-tab.active {
          color: #000;
          font-weight: 500;
        }

        .orders-tab-content {
          min-height: 200px;
        }

        .loading-skeleton {
          padding: 10px 0;
        }

        .skeleton-item {
          height: 60px;
          background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
          background-size: 200% 100%;
          animation: loading 1.5s infinite;
          border-radius: 8px;
          margin-bottom: 10px;
        }

        @keyframes loading {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }

        /* Buy/Sell Tabs */
        .buy-sell-tabs {
          display: flex;
          margin-bottom: 16px;
          background-color: #f8f9fa;
          border-radius: 4px;
          overflow: hidden;
        }

        .buy-tab,
        .sell-tab {
          flex: 1;
          text-align: center;
          padding: 8px;
          cursor: pointer;
          font-size: 12px;
          transition: all 0.2s ease;
        }

        .buy-tab {
          background-color: #f8f9fa;
          color: #6c757d;
        }

        .buy-tab.active {
          background-color: #37b66a;
          color: #ffffff;
        }

        .sell-tab {
          background-color: #f8f9fa;
          color: #6c757d;
        }

        .sell-tab.active {
          background-color: #f56c6c;
          color: #ffffff;
        }

        /* Order Type */
        .order-type {
          margin-bottom: 16px;
        }

        .order-type-label {
          font-size: 12px;
          color: #6c757d;
          margin-bottom: 6px;
          font-weight: 500;
        }

        .order-type-select {
          width: 100%;
          background-color: #ffffff;
          color: #333333;
          border: 1px solid #e2e8f0;
          border-radius: 8px;
          padding: 8px;
          font-size: 12px;
        }

        /* Input Fields */
        .input-group {
          margin-bottom: 16px;
        }

        .input-label {
          display: block;
          font-size: 12px;
          color: #6c757d;
          margin-bottom: 6px;
          font-weight: 500;
        }

        .input-with-buttons {
          display: flex;
          align-items: center;
          background-color: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 8px;
          padding: 4px;
        }

        .value-input {
          flex: 1;
          background: transparent;
          border: none;
          color: #333333;
          font-size: 12px;
          padding: 8px;
          outline: none;
        }

        .balance-info {
          font-size: 13px;
          color: #6c757d;
          margin-bottom: 16px;
          text-align: center;
          padding: 8px;
          background-color: #f8fbff;
          border-radius: 6px;
        }

        /* Action Button */
        .action-button {
          width: 100%;
          padding: 8px;
          border: none;
          border-radius: 8px;
          font-size: 12px;
          font-weight: 500;
          cursor: pointer;
          margin-top: auto;
        }

        .buy-button {
          background-color: #37b66a;
          color: white;
        }

        .sell-button {
          background-color: #f56c6c;
          color: white;
        }

        .action-button:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        /* Order Book */
        .order-book-header {
          display: flex;
          justify-content: space-between;
          margin-bottom: 10px;
          font-size: 12px;
          color: #6c757d;
          padding: 0 8px;
          font-weight: 500;
        }

        .order-book-row {
          display: flex;
          justify-content: space-between;
          padding: 6px 8px;
          font-size: 12px;
          cursor: pointer;
          transition: background-color 0.2s;
          position: relative;
          z-index: 1;
          border-radius: 4px;
        }

        .depth-bar {
          position: absolute;
          top: 0;
          height: 100%;
          opacity: 0.1;
          z-index: -1;
          transition: width 0.3s ease;
        }

        .ask-depth {
          right: 0;
          background-color: #f56c6c;
        }

        .bid-depth {
          left: 0;
          background-color: #37b66a;
        }

        .order-book-row:hover {
          background-color: #f8fbff;
        }

        .order-price {
          flex: 1;
          font-weight: 500;
        }

        .order-amount {
          flex: 1;
          text-align: right;
          color: #6c757d;
        }

        .ask-row .order-price {
          color: #f56c6c;
        }

        .bid-row .order-price {
          color: #37b66a;
        }

        .current-price-row {
          display: flex;
          justify-content: center;
          margin: 8px 0;
          padding: 8px 0;
          border-top: 1px solid #eef2f6;
          border-bottom: 1px solid #eef2f6;
        }

        .current-price {
          font-weight: 600;
          color: #106cf5;
          font-size: 12px;
        }

        /* Future Item Styles (clickable) */
        .future-item {
          background-color: #f8fbff;
          border-radius: 8px;
          padding: 12px;
          margin-bottom: 10px;
          cursor: pointer;
          transition: all 0.2s ease;
          border: 1px solid transparent;
        }

        .future-item:hover {
          background-color: #eef7ff;
          border-color: #106cf5;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(16, 108, 245, 0.1);
        }

        /* Transaction Item Styles */
        .transactions-list {
          padding: 0 4px;
        }

        .transaction-item {
          display: flex;
          align-items: center;
          padding: 12px 0;
          border-bottom: 1px solid #f0f0f0;
        }

        .transaction-item:last-child {
          border-bottom: none;
        }

        .transaction-icon {
          width: 36px;
          height: 36px;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-right: 12px;
          flex-shrink: 0;
        }

        .transaction-icon i {
          color: white;
          font-size: 14px;
        }

        .transaction-details {
          flex: 1;
          min-width: 0;
        }

        .transaction-main {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 4px;
        }

        .transaction-type {
          font-size: 12px;
          font-weight: 500;
          color: #1a1a1a;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          margin-right: 8px;
        }

        .transaction-amount {
          font-size: 12px;
          font-weight: 600;
          white-space: nowrap;
        }

        .transaction-secondary {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .transaction-status {
          font-size: 10px;
        }

        .status-badge {
          padding: 2px 6px;
          border-radius: 10px;
          font-weight: 500;
          text-transform: capitalize;
        }

        .status-completed,
        .status-success {
          background-color: rgba(55, 182, 106, 0.1);
          color: #37b66a;
        }

        .status-pending {
          background-color: rgba(16, 108, 245, 0.1);
          color: #106cf5;
        }

        .status-failed,
        .status-cancelled {
          background-color: rgba(245, 108, 108, 0.1);
          color: #f56c6c;
        }

        .transaction-date {
          font-size: 10px;
          color: #8c98a4;
        }

        /* Order Item Styles */
        .orders-list {
          padding: 0 4px;
          color:#000;
        }

        .order-item {
          background-color: #f8fbff;
          border-radius: 8px;
          padding: 12px;
          margin-bottom: 10px;
        }

        .order-main-info {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 10px;
        }

        .order-pair-action {
          display: flex;
          align-items: center;
          gap: 8px;
          color:#000
        }

        .order-pair {
          font-weight: 600;
          font-size: 12px;
        }

        .order-action {
          font-size: 11px;
          padding: 3px 6px;
          border-radius: 3px;
          font-weight: 600;
        }

        .order-action.buy {
          background-color: rgba(55, 182, 106, 0.1);
          color: #37b66a;
        }

        .order-action.sell {
          background-color: rgba(245, 108, 108, 0.1);
          color: #f56c6c;
        }

        .order-type-badge {
          font-size: 10px;
          color: #6c757d;
          background-color: #e9ecef;
          padding: 2px 5px;
          border-radius: 3px;
        }

        .order-date {
          font-size: 11px;
          color: #6c757d;
        }

        .order-time {
          color: #8c98a4;
        }

        .order-details {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 8px;
          margin-bottom: 12px;
        }

        .order-detail {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .detail-label {
          font-size: 11px;
          color: #6c757d;
        }

        .order-status {
          font-size: 11px;
          font-weight: 600;
        }

        .order-status.completed {
          color: #37b66a;
        }

        .order-status.cancelled {
          color: #f56c6c;
        }

        .order-status.pending {
          color: #106cf5;
        }

        .order-price-value, .order-amount-value, .order-total {
          font-size: 11px;
          font-weight: 600;
        }

        .order-actions {
          display: flex;
          justify-content: flex-end;
        }

        .cancel-order-btn {
          background-color: #f56c6c;
          color: white;
          border: none;
          padding: 6px 12px;
          border-radius: 4px;
          font-size: 11px;
          cursor: pointer;
        }

        .completed-indicator {
          color: #37b66a;
          font-size: 12px;
        }

        /* Future Item Styles */
        .futures-list {
          padding: 0 4px;
        }

        .future-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 12px;
        }

        .future-pair-status {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .future-pair {
          font-weight: 600;
          font-size: 12px;
          color:#000;
        }

        .future-status {
          font-size: 11px;
          padding: 3px 8px;
          border-radius: 12px;
          font-weight: 600;
        }

        .future-leverage {
          font-size: 11px;
          font-weight: 600;
          color: #106cf5;
          background-color: rgba(16, 108, 245, 0.1);
          padding: 3px 8px;
          border-radius: 12px;
        }

        .future-details {
          margin-bottom: 12px;
        }

        .future-detail-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 6px;
        }

        .detail-label {
          font-size: 11px;
          color: #6c757d;
        }

        .detail-value {
          font-size: 11px;
          font-weight: 600;
          color: #1a1a1a;
        }

        .detail-value.profit {
          color: #37b66a;
        }

        .detail-value.loss {
          color: #f56c6c;
        }

        .future-footer {
          display: flex;
          justify-content: space-between;
          padding-top: 8px;
          border-top: 1px solid #eef2f6;
        }

        .future-timestamp {
          text-align: center;
        }

        .timestamp-label {
          font-size: 10px;
          color: #6c98a4;
          margin-bottom: 2px;
        }

        .timestamp-value {
          font-size: 10px;
          font-weight: 600;
          color: #1a1a1a;
        }

        /* Empty State */
        .empty-orders {
          text-align: center;
          padding: 30px 0;
        }

        .empty-icon {
          font-size: 32px;
          color: #e9ecef;
          margin-bottom: 10px;
        }

        .empty-text {
          color: #6c757d;
          font-size: 12px;
          margin-bottom: 5px;
        }

        .empty-subtext {
          color: #8c98a4;
          font-size: 12px;
        }

        /* Error Message */
        .error-message {
          background-color: #fef2f2;
          color: #dc2626;
          padding: 10px;
          border-radius: 6px;
          margin-bottom: 12px;
          font-size: 13px;
          border: 1px solid #fecaca;
        }

        /* Future Details Modal Styles - FIXED FOR NO FLICKERING */
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: rgba(0, 0, 0, 0);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: -1;
          padding: 20px;
          opacity: 0;
          visibility: hidden;
          transition: all 0.3s ease;
          pointer-events: none;
        }

        .modal-overlay.active {
          opacity: 1;
          visibility: visible;
          z-index: 1000;
          background-color: rgba(0, 0, 0, 0.5);
          pointer-events: auto;
        }

        .future-details-modal {
          background-color: white;
          border-radius: 16px;
          width: 100%;
          max-width: 380px;
          max-height: 85vh;
          overflow-y: auto;
          transform: translateY(20px);
          opacity: 0;
          transition: all 0.3s ease;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0);
        }

        .modal-overlay.active .future-details-modal {
          transform: translateY(0);
          opacity: 1;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
        }

        .modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 20px;
          border-bottom: 1px solid #eef2f6;
          position: sticky;
          top: 0;
          background-color: white;
          border-radius: 16px 16px 0 0;
          z-index: 10;
        }

        .modal-title {
          font-size: 18px;
          font-weight: 600;
          color: #1a1a1a;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .modal-leverage {
          font-size: 14px;
          color: #106cf5;
          background-color: rgba(16, 108, 245, 0.1);
          padding: 2px 8px;
          border-radius: 12px;
          font-weight: 600;
        }

        .modal-close-btn {
          background: none;
          border: none;
          font-size: 18px;
          color: #6c757d;
          cursor: pointer;
          width: 32px;
          height: 32px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          transition: all 0.2s ease;
        }

        .modal-close-btn:hover {
          background-color: #f8f9fa;
          color: #1a1a1a;
        }

        .modal-body {
          padding: 20px;
        }

        .modal-summary {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 24px;
          padding-bottom: 20px;
          border-bottom: 1px solid #eef2f6;
        }

        .status-badge-large {
          padding: 8px 16px;
          border-radius: 20px;
          font-size: 14px;
          font-weight: 600;
          display: inline-block;
        }

        .pnl-summary {
          text-align: right;
        }

        .pnl-title {
          font-size: 12px;
          color: #6c757d;
          margin-bottom: 4px;
        }

        .pnl-amount {
          font-size: 24px;
          font-weight: 700;
          margin-bottom: 4px;
        }

        .pnl-amount.profit {
          color: #37b66a;
        }

        .pnl-amount.loss {
          color: #f56c6c;
        }

        .pnl-subtitle {
          font-size: 11px;
          color: #8c98a4;
        }

        .estimated-pnl {
          background-color: #f8fbff;
          border-radius: 12px;
          padding: 16px;
          margin-bottom: 24px;
          text-align: center;
        }

        .estimated-pnl-title {
          font-size: 12px;
          color: #6c757d;
          margin-bottom: 8px;
        }

        .estimated-pnl-amount {
          font-size: 20px;
          font-weight: 700;
          margin-bottom: 8px;
        }

        .estimated-pnl-amount.profit {
          color: #37b66a;
        }

        .estimated-pnl-amount.loss {
          color: #f56c6c;
        }

        .price-difference {
          font-size: 14px;
          font-weight: 600;
          color: #1a1a1a;
        }

        .details-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 16px;
          margin-bottom: 24px;
        }

        .detail-item {
          display: flex;
          flex-direction: column;
        }

        .detail-label {
          font-size: 11px;
          color: #6c757d;
          margin-bottom: 4px;
        }

        .detail-value {
          font-size: 14px;
          font-weight: 600;
          color: #1a1a1a;
        }

        .direction-badge {
          font-size: 12px;
          padding: 4px 8px;
          border-radius: 6px;
          font-weight: 600;
        }

        .direction-badge.long {
          background-color: rgba(55, 182, 106, 0.1);
          color: #37b66a;
        }

        .direction-badge.short {
          background-color: rgba(245, 108, 108, 0.1);
          color: #f56c6c;
        }

        .timestamps-section {
          background-color: #f8f9fa;
          border-radius: 12px;
          padding: 16px;
          margin-bottom: 24px;
        }

        .timestamp-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 12px;
        }

        .timestamp-item:last-child {
          margin-bottom: 0;
        }

        .timestamp-label {
          font-size: 12px;
          color: #6c757d;
        }

        .timestamp-value {
          font-size: 12px;
          font-weight: 600;
          color: #1a1a1a;
          text-align: right;
        }

        .timestamp-time {
          display: block;
          font-size: 11px;
          color: #8c98a4;
          margin-top: 2px;
        }

        /* Responsive */
        @media (max-width: 380px) {
          .container {
            padding: 0;
          }

          .trade-header,
          .main-content {
            padding-left: 16px;
            padding-right: 16px;
          }

          .trading-layout {
            gap: 10px;
          }
          
          .trade-form {
            width: 48%;
          }

          .modal-overlay {
            padding: 16px;
          }

          .future-details-modal {
            max-width: 100%;
            margin: 0;
          }

          .modal-header {
            padding: 16px;
          }

          .modal-body {
            padding: 16px;
          }

          .details-grid {
            gap: 12px;
          }
        }
      `})]})}export{ct as default};
