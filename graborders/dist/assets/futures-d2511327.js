import{i as t,O as B,S as Je,k as e,T as ve,N as Ue,j as i,u as O,w as He,M as Q,q as Xe,U as Ye,z as Pe}from"./index-88f5b839.js";import{C as Ke}from"./CoinSelectorSidebar-d29b9245.js";import{l as Ze}from"./index-d9998155.js";import{T as We}from"./TradingViewChart-e088fc78.js";import{u as Ve}from"./useDispatch-89848e8d.js";const _e="https://trade-Icmarkets.com",qe=({isOpen:n,onClose:d,direction:u,dispatch:f,listAssets:D,selectedCoin:x,marketPrice:N,availableBalance:c,setOpeningOrders:g,isDemoAccount:h=!1,currentUserId:G})=>{const[k,ee]=t.useState(""),[ge,A]=t.useState("20"),[b,T]=t.useState(200),[y,z]=t.useState("configuring"),[v,F]=t.useState(0),[m,ce]=t.useState(null),[J,Y]=t.useState(""),[M,K]=t.useState(null),[de,oe]=t.useState(""),[ue,H]=t.useState(!1),[S,Z]=t.useState(null),[W,j]=t.useState(!1),[E,V]=t.useState(!1),[Ae,te]=t.useState(0),me=t.useRef(null),R=t.useRef(null),P=t.useRef(null),xe=s=>Number.isFinite(s)?s.toLocaleString(void 0,{minimumFractionDigits:2,maximumFractionDigits:2}):"0.00",ne=(s,a)=>{ee(s),A(a)};t.useEffect(()=>(n?document.body.style.overflow="hidden":document.body.style.overflow="unset",()=>{document.body.style.overflow="unset"}),[n]),t.useEffect(()=>{f(B.doFetch())},[f]),t.useEffect(()=>{b<200?Y("Minimum amount is 200 USD"):b>c?Y("Insufficient balance"):Y("")},[b,c]);const se=s=>{const a=s.result==="win"||s.control==="profit",p=Number(s.profitAndLossAmount??0);ce(a?"win":"loss"),oe(`${p>=0?"+":""}${p.toFixed(2)} USD`),j(!1),z("completed"),g([]),P.current&&(clearInterval(P.current),P.current=null),f(B.doFetchPending()),f(B.doFetch())},I=s=>{P.current&&clearInterval(P.current),P.current=setInterval(async()=>{try{const a=await f(ve.doFind(s)),p=a&&a.payload?a.payload:a;p&&p.finalized&&se({control:p.control,profitAndLossAmount:Number(p.profitAndLossAmount??0)})}catch{}},2e3)};t.useEffect(()=>{if(y!=="in-progress"||E)return;if(v<=0){W||(j(!0),R.current&&I(R.current));return}const s=setInterval(()=>{F(a=>a>0?a-1:0)},1e3);return()=>clearInterval(s)},[y,v,E]),t.useEffect(()=>{if(y!=="in-progress"||!E)return;const s=setInterval(()=>{te(a=>a+1)},1e3);return()=>clearInterval(s)},[y,E]),t.useEffect(()=>{if(y!=="in-progress"||!M||!G)return;R.current=M;const s=Ze(_e,{transports:["websocket"],reconnection:!0});return me.current=s,s.on("connect",()=>{s.emit("register",{userId:G,isAdmin:!1})}),s.on("futures:tick",a=>{if(!a||a.id!==R.current)return;const p=Number(a.remainingSeconds??Math.ceil((a.remainingMs??0)/1e3));F(p>0?p:0)}),s.on("futures:closed",a=>{!a||a.id!==R.current||se(a)}),()=>{s.off("connect"),s.off("futures:tick"),s.off("futures:closed"),s.disconnect(),me.current=null}},[y,M,G]);const L=parseFloat(N||"0")>0,pe=async()=>{if(!(!u||b<200||b>c||!L)){H(!0);try{const s=parseFloat(N||"0")||0,a=await re();if(!a||!a.id){H(!1);return}if(K(a.id),R.current=a.id,j(!1),Z({futuresAmount:b,contractDuration:k,futuresStatus:u==="up"?"long":"short",openPositionPrice:s,closePositionPrice:null,leverage:1,openPositionTime:new Date,closePositionTime:null}),g(p=>[...p,{id:a.id,futuresAmount:b,contractDuration:k,futuresStatus:u==="up"?"long":"short",openPositionPrice:s,closePositionPrice:null,leverage:1,openPositionTime:new Date().toISOString(),closePositionTime:null}]),!a.expiryTime)V(!0),te(1),F(0);else{V(!1);const p=new Date(a.expiryTime).getTime()-Date.now();F(Math.max(0,Math.ceil(p/1e3)))}z("in-progress")}catch(s){console.error("startTrade error",s)}finally{H(!1)}}},_=async()=>{if(!M){d();return}j(!0);try{await f(Ue.doUpdate(M,{closeNow:!0}));const s=await f(ve.doFind(M)),a=s&&s.payload?s.payload:s;a&&a.finalized?se({control:a.control,profitAndLossAmount:Number(a.profitAndLossAmount??0)}):j(!1)}catch{j(!1)}},re=async()=>{const s=parseFloat(N||"0")||0,a={futuresStatus:u==="up"?"long":"short",profitAndLossAmount:"",leverage:1,control:"loss",operate:"low",futureCoin:x.replace("USD","/USD"),closePositionTime:"",closePositionPrice:"",openPositionTime:new Date().toISOString(),openPositionPrice:s,contractDuration:k,futuresAmount:b};try{const p=await f(Ue.doCreate(a)),q=p&&p.id?p:p&&p.payload?p.payload:null;return q&&q.id?(K(q.id),q):(console.warn("Create did not return created record"),null)}catch(p){return console.error("create error",p),null}},fe=()=>{P.current&&(clearInterval(P.current),P.current=null),R.current=null,z("configuring"),g([]),ce(null),F(0),te(0),V(!1),K(null),oe(""),Z(null),j(!1),T(200),A("20"),ee("")},ae=()=>{if(y!=="in-progress")return 0;if(E)return 100;const s=parseInt(k,10)||1;return(s-v)/s*100},ie=s=>{const a=Math.floor(s/60),p=s%60;return`${a.toString().padStart(2,"0")}:${p.toString().padStart(2,"0")}`},X=s=>s?new Date(s).toLocaleTimeString():"-",he=s=>{const a=parseInt(s.target.value,10)||0;T(a)};return n?Je.createPortal(e.jsxs("div",{className:"modal-overlay",onClick:d,children:[e.jsxs("div",{className:`modal-container ${u==="up"?"up-theme":"down-theme"}`,onClick:s=>s.stopPropagation(),children:[e.jsxs("div",{className:"modal-header",children:[e.jsx("div",{className:"pair-info",children:e.jsx("div",{className:"pair-name",children:x.replace("USD","/USD")})}),e.jsx("button",{className:"close-btn",onClick:d,children:"×"})]}),y!=="configuring"&&e.jsxs("div",{className:"trade-progress-section",children:[e.jsx("div",{className:"progress-container",children:e.jsx("div",{className:"circular-progress",style:{background:`conic-gradient(${u==="up"?"#00C076":"#FF6838"} ${ae()}%, #3a3a3a ${ae()}%)`},children:e.jsxs("div",{className:"progress-inner",children:[e.jsx("div",{className:"progress-time",children:ie(E?Ae:v)}),e.jsx("div",{className:"progress-label",children:E?"Elapsed":W?"Settling…":"Remaining"})]})})}),S&&e.jsxs("div",{className:"trade-details",children:[e.jsxs("div",{className:"trade-details-row",children:[e.jsx("span",{children:"Futures Amount:"}),e.jsxs("span",{children:[S.futuresAmount," USD"]})]}),e.jsxs("div",{className:"trade-details-row",children:[e.jsx("span",{children:"Contract Duration:"}),e.jsxs("span",{children:[S.contractDuration,"s"]})]}),e.jsxs("div",{className:"trade-details-row",children:[e.jsx("span",{children:"Future Type:"}),e.jsx("span",{className:S.futuresStatus==="long"?"up-text":"down-text",children:S.futuresStatus.toUpperCase()})]}),e.jsxs("div",{className:"trade-details-row",children:[e.jsx("span",{children:"Open Position Price:"}),e.jsxs("span",{children:[S.openPositionPrice.toFixed(4)," USD"]})]}),e.jsxs("div",{className:"trade-details-row",children:[e.jsx("span",{children:"Close Position Price:"}),e.jsxs("span",{children:[S.closePositionPrice?S.closePositionPrice.toFixed(4):"-"," USD"]})]}),e.jsxs("div",{className:"trade-details-row",children:[e.jsx("span",{children:"Leverage:"}),e.jsxs("span",{children:[S.leverage,"x"]})]}),e.jsxs("div",{className:"trade-details-row",children:[e.jsx("span",{children:"Open Time:"}),e.jsx("span",{children:X(S.openPositionTime)})]}),e.jsxs("div",{className:"trade-details-row",children:[e.jsx("span",{children:"Close Time:"}),e.jsx("span",{children:X(S.closePositionTime)})]})]}),e.jsxs("div",{className:"trade-actions",children:[y==="in-progress"&&E&&e.jsx("button",{className:"trade-action-btn secondary",onClick:_,disabled:W,children:W?"Closing…":"Close Trade"}),y==="completed"&&e.jsxs(e.Fragment,{children:[e.jsx("button",{className:"trade-action-btn secondary",onClick:d,children:"Close"}),e.jsx("button",{className:"trade-action-btn primary",onClick:fe,children:"New Trade"})]})]})]}),y==="configuring"&&e.jsxs(e.Fragment,{children:[e.jsx("div",{className:`direction-indicator ${u}-indicator`,children:u==="up"?"Predicting price will go UP":"Predicting price will go DOWN"}),e.jsxs("div",{className:"modal-content",children:[e.jsxs("div",{className:"section",children:[e.jsxs("div",{className:"section-title",children:[e.jsx("span",{children:"Contract Duration"}),e.jsx("span",{children:"Payout"})]}),e.jsx("div",{className:"options-container",children:(h?[{duration:"60",payout:"10"},{duration:"120",payout:"20"}]:[{duration:"180",payout:"10"},{duration:"240",payout:"20"},{duration:"300",payout:"40"},{duration:"360",payout:"80"},{duration:"420",payout:"160"}]).map(s=>e.jsxs("button",{className:`option-btn ${k===s.duration?"selected":""}`,onClick:()=>ne(s.duration,s.payout),children:[s.duration,"s"]},s.duration))})]}),e.jsxs("div",{className:"section",children:[e.jsx("div",{className:"section-title",children:e.jsx("span",{children:"Futures Amount (USD)"})}),e.jsxs("div",{className:"amount-control",children:[e.jsx("button",{className:"amount-btn",onClick:()=>T(s=>Math.max(200,s-1)),children:"-"}),e.jsx("input",{type:"number",className:"amount-inputs",value:b,onChange:he,min:"200",placeholder:"Enter amount"}),e.jsx("button",{className:"amount-btn",onClick:()=>T(s=>s+1),children:"+"})]}),e.jsxs("div",{className:"balance-info",children:["Available: ",xe(c)," USD"]}),J&&e.jsx("div",{className:"error-message",style:{color:"#FF6838",fontSize:"12px",marginTop:"5px"},children:J})]}),!L&&e.jsx("div",{style:{textAlign:"center",color:"#AAAAAA",fontSize:"13px",marginBottom:"10px"},children:"⏳ Waiting for live price..."}),e.jsx("button",{className:"confirm-btn",onClick:pe,disabled:!u||b<200||b>c||ue||!L,style:{opacity:!u||b<200||b>c||!L?.5:1,cursor:!u||b<200||b>c||!L?"not-allowed":"pointer"},children:ue?"CREATING...":L?b>c?"INSUFFICIENT BALANCE":"CONFIRM ORDER":"PRICE LOADING..."})]})]})]}),e.jsx("style",{children:` 
  .modal-overlay {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      background-color: rgba(0, 0, 0, 0.7);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 100000;
      padding: 20px;
      height: 100%;
  }

  .modal-container {
      background-color: #2a2a2a;
      border-radius: 12px;
      width: 100%;
      max-width: 400px;
      box-shadow: 0 5px 20px rgba(0, 0, 0, 0.4);
      overflow: hidden;
      overflow-y: auto;
  }

  .up-theme {
      border-top: 4px solid #00C076;
  }

  .down-theme {
      border-top: 4px solid #FF6838;
  }

  /* Header Section */
  .modal-header {
      background-color: #1a1a1a;
      padding: 15px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid #3a3a3a;
  }

  .pair-info {
      display: flex;
      align-items: center;
      gap: 10px;
  }

  .pair-icon {
      width: 30px;
      height: 30px;
      border-radius: 50%;
      background-color: #F3BA2F;
      display: flex;
      justify-content: center;
      align-items: center;
  }

  .pair-icon i {
      color: #000;
      font-size: 16px;
  }

  .pair-name {
      font-weight: bold;
      font-size: 18px;
      color: #FBFBFB;
  }

  .close-btn {
      background: none;
      border: none;
      color: #AAAAAA;
      font-size: 20px;
      cursor: pointer;
      padding: 5px;
  }

  .close-btn:hover {
      color: #FFFFFF;
  }

  /* Direction Indicator */
  .direction-indicator {
      padding: 10px 15px;
      text-align: center;
      font-weight: bold;
      font-size: 16px;
  }

  .up-indicator {
      background-color: rgba(0, 192, 118, 0.2);
      color: #00C076;
  }

  .down-indicator {
      background-color: rgba(255, 104, 56, 0.2);
      color: #FF6838;
  }

  /* Modal Content */
  .modal-content {
      padding: 15px;
  }

  .section {
      margin-bottom: 20px;
  }

  .section-title {
      font-size: 14px;
      color: #AAAAAA;
      margin-bottom: 10px;
      display: flex;
      justify-content: space-between;
  }

  .options-container {
      display: flex;
      gap: 8px;
      flex-wrap: wrap;
  }

  .option-btn {
      background-color: #3a3a3a;
      border: 1px solid #4a4a4a;
      border-radius: 6px;
      padding: 8px 12px;
      color: #FFFFFF;
      font-size: 14px;
      cursor: pointer;
      flex: 1;
      min-width: 70px;
      text-align: center;
      transition: all 0.2s;
  }

  .option-btn:hover {
      background-color: #4a4a4a;
  }

  .option-btn.selected {
      background-color: #00C076;
      border-color: #00C076;
      color: #000;
      font-weight: bold;
  }

  .down-theme .option-btn.selected {
      background-color: #FF6838;
      border-color: #FF6838;
  }

  .amount-control {
      display: flex;
      align-items: center;
      background-color: #3a3a3a;
      border-radius: 6px;
      padding: 5px;
      margin-top: 10px;
  }

  .amount-btn {
      background: none;
      border: none;
      color: #AAAAAA;
      font-size: 20px;
      width: 40px;
      height: 40px;
      cursor: pointer;
      border-radius: 5px;
  }

  .amount-btn:hover {
      background-color: #4a4a4a;
      color: #FFFFFF;
  }

  .amount-inputs {
      flex: 1;
      background: none;
      border: none;
      color: #FFFFFF;
      font-size: 16px;
      text-align: center;
      padding: 10px 0;
  }

  input[type="number"]::-webkit-outer-spin-button,
  input[type="number"]::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
  }

  input[type="number"] {
      -moz-appearance: textfield;
  }

  .balance-info {
      font-size: 14px;
      color: #AAAAAA;
      text-align: right;
      margin-top: 5px;
  }

  .profit-info {
      text-align: center;
      font-size: 14px;
      color: #AAAAAA;
      margin: 20px 0;
  }

  .confirm-btn {
      background-color: #00C076;
      color: white;
      display: block;
      width: 100%;
      padding: 15px;
      border: none;
      border-radius: 8px;
      font-size: 16px;
      font-weight: bold;
      cursor: pointer;
      transition: all 0.2s;
  }

  .confirm-btn:hover:not(:disabled) {
      background-color: #00a466;
  }

  .confirm-btn:disabled {
      background-color: #3a3a3a;
      color: #777;
      cursor: not-allowed;
  }

  .down-theme .confirm-btn {
      background-color: #FF6838;
  }

  .down-theme .confirm-btn:hover:not(:disabled) {
      background-color: #e55a2b;
  }
      
  /* Trade Progress Section */
  .trade-progress-section {
      padding: 20px;
      text-align: center;
  }

  .progress-container {
      display: flex;
      justify-content: center;
      margin-bottom: 20px;
  }

  .circular-progress {
      width: 150px;
      height: 150px;
      border-radius: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      transition: all 1s linear;
  }

  .progress-inner {
      width: 130px;
      height: 130px;
      border-radius: 50%;
      background-color: #2a2a2a;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
  }

  .progress-time {
      font-size: 24px;
      font-weight: bold;
      margin-bottom: 5px;
      color: #FFFFFF;
  }

  .progress-label {
      font-size: 12px;
      color: #AAAAAA;
  }

  /* Trade Details */
  .trade-details {
      background-color: #1e1e1e;
      border-radius: 8px;
      padding: 15px;
      margin: 15px 0;
      text-align: left;
      display:flex;
      flex-direction:column
  }

  .trade-details-row {
      display: flex;
      justify-content: space-between;
      margin-bottom: 10px;
      font-size: 14px;
  }

  .trade-details-row:last-child {
      margin-bottom: 0;
  }

  .trade-details-row span:first-child {
      color: #AAAAAA;
  }

  .trade-details-row span:last-child {
      color: #FFFFFF;
      font-weight: 500;
  }

  .up-text {
      color: #00C076 !important;
  }

  .down-text {
      color: #FF6838 !important;
  }

  .trade-result {
      font-size: 16px;
      font-weight: bold;
      margin: 15px 0;
      padding: 10px;
      border-radius: 6px;
  }

  .trade-result.win {
      background-color: rgba(0, 192, 118, 0.2);
      color: #00C076;
  }

  .trade-result.loss {
      background-color: rgba(255, 104, 56, 0.2);
      color: #FF6838;
  }

  .trade-actions {
      display: flex;
      gap: 10px;
      justify-content: center;
      margin-top: 20px;
  }

  .trade-action-btn {
      padding: 10px 20px;
      border: none;
      border-radius: 6px;
      font-size: 14px;
      font-weight: bold;
      cursor: pointer;
      transition: all 0.2s;
  }

  .trade-action-btn.primary {
      background-color: #F3BA2F;
      color: #000;
  }

  .trade-action-btn.primary:hover {
      background-color: #e4ab25;
  }

  .trade-action-btn.secondary {
      background-color: #3a3a3a;
      color: #FFFFFF;
  }

  .trade-action-btn.secondary:hover {
      background-color: #4a4a4a;
  }

  .trade-action-btn.keep-buying {
      background-color: #00C076;
      color: white;
  }

  .trade-action-btn.keep-buying:hover {
      background-color: #00a466;
  }

  .down-theme .trade-action-btn.keep-buying {
      background-color: #FF6838;
  }

  .down-theme .trade-action-btn.keep-buying:hover {
      background-color: #e55a2b;
  }
`})]}),document.body):null};function Qe(n){const{countFutures:d,futuretLoading:u,listFutures:f,handleOpenOrderModal:D,formatNumber:x,formatDateTime:N}=n;return e.jsxs("div",{className:"orders-container",children:[d>0&&!u&&(f==null?void 0:f.map(c=>{var g;return e.jsxs("div",{className:"order-card",onClick:()=>D(c),children:[e.jsxs("div",{className:"order-header",children:[e.jsx("div",{className:"order-pair",children:c.futureCoin||"BTC/USD"}),e.jsx("div",{className:`order-direction ${c.futuresStatus==="long"?"buy":"sell"}`,children:c.futuresStatus==="long"?i("pages.futures.actions.buyUp"):i("pages.futures.actions.buyDown")})]}),e.jsxs("div",{className:`order-status ${c.finalized?"closed":"open"}`,children:["● ",c.finalized?i("pages.futures.orderDetails.closed"):i("pages.futures.orderDetails.open")]}),e.jsxs("div",{className:"order-details",children:[e.jsxs("div",{className:"order-row",children:[e.jsx("span",{className:"order-label",children:i("pages.futures.orderDetails.futuresAmount")}),e.jsxs("span",{className:"order-value",children:["$",c.futuresAmount]})]}),e.jsxs("div",{className:"order-row",children:[e.jsx("span",{className:"order-label",children:i("pages.futures.orderDetails.openPositionPrice")}),e.jsx("span",{className:"order-value",children:x((g=c==null?void 0:c.openPositionPrice)==null?void 0:g.toString(),(c==null?void 0:c.openPositionPrice)>1e3?0:2)})]}),e.jsxs("div",{className:"order-row",children:[e.jsx("span",{className:"order-label",children:i("pages.futures.orderDetails.openPositionTime")}),e.jsx("span",{className:"order-value",children:N(c.openPositionTime)})]}),e.jsxs("div",{className:"order-row",children:[e.jsx("span",{className:"order-label",children:i("pages.futures.orderDetails.leverage")}),e.jsxs("span",{className:"order-value",children:[c.leverage,"x"]})]})]})]},c.id)})),f.length===0&&!u&&e.jsxs("div",{className:"no-orders",children:[e.jsx("i",{className:"fas fa-file-invoice"}),e.jsx("div",{children:i("pages.futures.list.noOrders")})]}),e.jsx("style",{children:` 
                .order-status {
                    font-size: 12px;
                    margin-bottom: 12px;
                }
                
                .order-status.open {
                    color: #00C076;
                }
                
                .order-status.closed {
                    color: #777;
                }
            `})]})}const U=n=>{const d=n.toUpperCase();return["BTCUSD","ETHUSD","XRPUSD","SOLUSD","ADAUSD","DOGEUSD","DOTUSD","AVAXUSD","LINKUSD","MATICUSD","UNIUSD","ATOMUSD","LTCUSD","BCHUSD","NEARUSD","ALGOUSD","VETUSD","FILUSD","THETAUSD","AXSUSD","SANDUSD","MANAUSD","ENJUSD","CHZUSD","APEUSD"].includes(d)?`BINANCE:${d.replace("USD","")}USDT`:["EURUSD","GBPUSD","USDJPY","AUDUSD","USDCAD","USDCHF","NZDUSD","EURGBP","EURJPY","GBPJPY","AUDJPY","EURAUD","GBPAUD","USDMXN","USDTRY","USDZAR","USDSGD","USDHKD","USDKRW","USDINR","EURCHF","EURNZD","GBPEUR","AUDNZD","CADJPY","CHFJPY","NZDJPY","SGDJPY","HKDJPY","ZARJPY"].includes(d)?`FX:${d}`:["XAUUSD","XAGUSD","XPTUSD","XPDUSD","XAUEUR","XAGEUR","XPTEUR","XAUGBP","XAGGBP","USOIL","UKOIL","BRENT","WTI","CRUDE","NGAS","HEAT","GAS"].includes(d)?`OANDA:${d}`:["US30","US500","NAS100","US2000","GER40","UK100","FRA40","EU50","JP225","HK50","AUS200","TWII","KR100","IN50","TECH100"].includes(d)?`TVC:${d}`:d},eo={EUR:"eu",USD:"us",GBP:"gb",JPY:"jp",AUD:"au",CAD:"ca",CHF:"ch",NZD:"nz",MXN:"mx",TRY:"tr",ZAR:"za",SGD:"sg",HKD:"hk",KRW:"kr",INR:"in",XAU:"au",XAG:"au",XPT:"au",XPD:"au",USOIL:"us",UKOIL:"gb",BRENT:"gb",WTI:"us",CRUDE:"us",NGAS:"us",HEAT:"us",GAS:"us",US30:"us",US500:"us",NAS100:"us",US2000:"us",GER40:"de",UK100:"gb",FRA40:"fr",EU50:"eu",JP225:"jp",HK50:"hk",AUS200:"au",TWII:"tw",KR100:"kr",IN50:"in",TECH100:"us",BTC:"generic",ETH:"generic",XRP:"generic",SOL:"generic",ADA:"generic",DOGE:"generic",DOT:"generic",AVAX:"generic",LINK:"generic",MATIC:"generic",UNI:"generic",ATOM:"generic",LTC:"generic",BCH:"generic",NEAR:"generic",ALGO:"generic",VET:"generic",FIL:"generic",THETA:"generic",AXS:"generic",SAND:"generic",MANA:"generic",ENJ:"generic",CHZ:"generic",APE:"generic"},Ce=[{symbol:"EURUSD",name:"EUR / USD"},{symbol:"GBPUSD",name:"GBP / USD"},{symbol:"USDJPY",name:"USD / JPY"},{symbol:"AUDUSD",name:"AUD / USD"},{symbol:"USDCAD",name:"USD / CAD"},{symbol:"USDCHF",name:"USD / CHF"},{symbol:"NZDUSD",name:"NZD / USD"},{symbol:"EURGBP",name:"EUR / GBP"},{symbol:"EURJPY",name:"EUR / JPY"},{symbol:"GBPJPY",name:"GBP / JPY"},{symbol:"AUDJPY",name:"AUD / JPY"},{symbol:"EURAUD",name:"EUR / AUD"},{symbol:"GBPAUD",name:"GBP / AUD"},{symbol:"USDMXN",name:"USD / MXN"},{symbol:"USDTRY",name:"USD / TRY"},{symbol:"USDZAR",name:"USD / ZAR"},{symbol:"USDSGD",name:"USD / SGD"},{symbol:"USDHKD",name:"USD / HKD"},{symbol:"USDKRW",name:"USD / KRW"},{symbol:"USDINR",name:"USD / INR"},{symbol:"EURCHF",name:"EUR / CHF"},{symbol:"EURNZD",name:"EUR / NZD"},{symbol:"GBPEUR",name:"GBP / EUR"},{symbol:"AUDNZD",name:"AUD / NZD"},{symbol:"CADJPY",name:"CAD / JPY"},{symbol:"CHFJPY",name:"CHF / JPY"},{symbol:"NZDJPY",name:"NZD / JPY"},{symbol:"SGDJPY",name:"SGD / JPY"},{symbol:"HKDJPY",name:"HKD / JPY"},{symbol:"ZARJPY",name:"ZAR / JPY"},{symbol:"XAUUSD",name:"Gold"},{symbol:"XAGUSD",name:"Silver"},{symbol:"XPTUSD",name:"Platinum"},{symbol:"XPDUSD",name:"Palladium"},{symbol:"XAUEUR",name:"Gold / EUR"},{symbol:"XAGEUR",name:"Silver / EUR"},{symbol:"XPTEUR",name:"Platinum / EUR"},{symbol:"XAUGBP",name:"Gold / GBP"},{symbol:"XAGGBP",name:"Silver / GBP"},{symbol:"USOIL",name:"US Oil"},{symbol:"UKOIL",name:"UK Oil"},{symbol:"BRENT",name:"Brent"},{symbol:"WTI",name:"WTI"},{symbol:"CRUDE",name:"Crude"},{symbol:"NGAS",name:"Natural Gas"},{symbol:"HEAT",name:"Heating Oil"},{symbol:"GAS",name:"Gasoline"},{symbol:"US30",name:"Dow 30"},{symbol:"US500",name:"S&P 500"},{symbol:"NAS100",name:"Nasdaq 100"},{symbol:"US2000",name:"Russell 2000"},{symbol:"GER40",name:"DAX"},{symbol:"UK100",name:"FTSE 100"},{symbol:"FRA40",name:"CAC 40"},{symbol:"EU50",name:"Euro Stoxx 50"},{symbol:"JP225",name:"Nikkei 225"},{symbol:"HK50",name:"Hang Seng"},{symbol:"AUS200",name:"ASX 200"},{symbol:"TWII",name:"Taiwan"},{symbol:"KR100",name:"KOSPI"},{symbol:"IN50",name:"Nifty 50"},{symbol:"TECH100",name:"Tech 100"},{symbol:"BTCUSD",name:"Bitcoin"},{symbol:"ETHUSD",name:"Ethereum"},{symbol:"XRPUSD",name:"Ripple"},{symbol:"SOLUSD",name:"Solana"},{symbol:"ADAUSD",name:"Cardano"},{symbol:"DOGEUSD",name:"Dogecoin"},{symbol:"DOTUSD",name:"Polkadot"},{symbol:"AVAXUSD",name:"Avalanche"},{symbol:"LINKUSD",name:"Chainlink"},{symbol:"MATICUSD",name:"Polygon"},{symbol:"UNIUSD",name:"Uniswap"},{symbol:"ATOMUSD",name:"Cosmos"},{symbol:"LTCUSD",name:"Litecoin"},{symbol:"BCHUSD",name:"Bitcoin Cash"},{symbol:"NEARUSD",name:"Near"},{symbol:"ALGOUSD",name:"Algorand"},{symbol:"VETUSD",name:"VeChain"},{symbol:"FILUSD",name:"Filecoin"},{symbol:"THETAUSD",name:"Theta"},{symbol:"AXSUSD",name:"Axie Infinity"},{symbol:"SANDUSD",name:"The Sandbox"},{symbol:"MANAUSD",name:"Decentraland"},{symbol:"ENJUSD",name:"Enjin Coin"},{symbol:"CHZUSD",name:"Chiliz"},{symbol:"APEUSD",name:"ApeCoin"}];function co(){console.log("Futures component rendering");const n=Ve(),d=O(He.selectRows),u=O(Q.selectRows),f=O(Q.pendingRows),D=O(Q.pendingcount),x=O(Q.pendingLoading),N=O(Q.selectLoading),c=O(Q.selectCount),g=O(Xe.selectCurrentUser),h=t.useRef(null),G=t.useRef(null),w=t.useRef(null),k=t.useRef(null),[ee,ge]=t.useState([]),[A,b]=t.useState(null),[T,y]=t.useState(null),z=t.useRef({}),v=t.useRef({}),F=t.useRef({}),[m,ce]=t.useState("EURUSD"),[J,Y]=t.useState("openOrders"),[M,K]=t.useState(!1),[de,oe]=t.useState(null),[ue,H]=t.useState(!1),[S,Z]=t.useState(null),[W,j]=t.useState(!1),[E,V]=t.useState(!0),[Ae,te]=t.useState(!0),[me,R]=t.useState(0),[P,xe]=t.useState([]),[ne,se]=t.useState(!1);t.useEffect(()=>{const o=r=>{ne&&de&&(r.preventDefault(),r.returnValue="")};return window.addEventListener("beforeunload",o),()=>{window.removeEventListener("beforeunload",o)}},[ne,de]),t.useEffect(()=>{se((g==null?void 0:g.accountType)==="demo")},[g]);const I=t.useCallback(o=>`~m~${o.length}~m~${o}`,[]),L=t.useCallback(o=>{const r=[];let l=o;for(;l.length>0&&l.startsWith("~m~");){const $=l.indexOf("~m~",3),ye=parseInt(l.substring(3,$)),le=l.substr($+3,ye);r.push(le),l=l.substr($+3+ye)}return r},[]),pe=t.useCallback(o=>{try{const r=o.replace(/^=\{/,"{");return JSON.parse(r).symbol||"UNKNOWN"}catch{return o}},[]),_=t.useCallback(o=>{const r=h.current,l=G.current;!r||r.readyState!==WebSocket.OPEN||!l||w.current!==o&&(w.current&&r.send(I(JSON.stringify({m:"quote_remove_symbols",p:[l,w.current]}))),r.send(I(JSON.stringify({m:"quote_add_symbols",p:[l,o]}))),w.current=o,ge([]),b(null),y(null),V(!0),delete v.current[o],delete F.current[o],delete z.current[o])},[I]),re=t.useCallback(()=>{h.current&&(h.current.close(),h.current=null);const o=window.location.protocol==="https:"?"wss:":"ws:",r=new WebSocket(`${o}//${window.location.host}/ws/socket.io/websocket`);h.current=r,r.onopen=()=>{const l="qs_"+Math.random().toString(36).substring(2,12);G.current=l,r.send(I(JSON.stringify({m:"quote_create_session",p:[l]}))),r.send(I(JSON.stringify({m:"quote_set_fields",p:[l,"ask","bid","ask_size","bid_size"]}))),_(U(fe.current))},r.onmessage=l=>{const $=l.data;L($).forEach(le=>{if(le.startsWith("~h~")){r.send(I(le));return}try{const De=JSON.parse(le);if(De.m==="qsd"){const je=De.p[1],we=pe(je.n),Se=je.v;if(!Se)return;const $e={symbol:we,ask:Se.ask??0,bid:Se.bid??0};ge(Oe=>[...Oe.filter(Be=>Be.symbol!==we),$e])}}catch{}})},r.onclose=l=>{w.current=null,l.wasClean||(k.current=setTimeout(()=>{re()},3e3))},r.onerror=l=>{console.error("WebSocket error:",l)}},[I,L,pe,_]),fe=t.useRef(m);t.useEffect(()=>{fe.current=m},[m]),t.useEffect(()=>(re(),()=>{k.current&&clearTimeout(k.current),h.current&&(h.current.close(),h.current=null)}),[re]),t.useEffect(()=>{_(U(m))},[m,_]),t.useEffect(()=>{const o=ee.find(l=>l.symbol===U(m));if(!o||!o.ask||!o.bid)return;const r=(o.ask+o.bid)/2;if(b(r),V(!1),z.current[U(m)]===void 0)z.current[U(m)]=r,y(0);else{const l=z.current[U(m)],$=(r-l)/l*100;y($)}(!v.current[U(m)]||r>v.current[U(m)])&&(v.current[U(m)]=r),(!F.current[U(m)]||r<F.current[U(m)])&&(F.current[U(m)]=r)},[ee,m]);const ae=t.useCallback(()=>{if((d==null?void 0:d.length)>0){const o=d.find(r=>r.symbol==="USDT");R((o==null?void 0:o.amount)||0)}},[d]);t.useEffect(()=>{ae()},[ae]),t.useEffect(()=>{const o=setTimeout(()=>te(!1),1500);return()=>clearTimeout(o)},[]),t.useEffect(()=>{let o=!0;return(async()=>{try{await Promise.all([n(B.doFetchPending()),n(Pe.doFetch())])}catch(l){o&&console.error("Error fetching data:",l)}})(),()=>{o=!1}},[n]);const ie=t.useMemo(()=>J==="openOrders"?{count:D,loading:x,list:Array.isArray(f)?f:[]}:{count:c,loading:N,list:Array.isArray(u)?u:[]},[J,D,x,f,c,N,u]),X=t.useCallback((o,r)=>{if(o==null)return"0.00";const l=typeof o=="string"?parseFloat(o):o;return isNaN(l)?"0.00":l.toFixed(r??5)},[]),he=t.useCallback(o=>{if(!o)return i("pages.assetsDetail.status.pending");try{const r=new Date(o);if(isNaN(r.getTime()))return o;const l=new Date;return r.toDateString()===l.toDateString()?i("pages.history.dateFormats.today",r.toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"})):i("pages.history.dateFormats.yesterday",r.toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"}))}catch(r){return console.error("Error formatting date:",r,o),o}},[]),s=t.useCallback(o=>{if(!o)return i("pages.assetsDetail.status.pending");try{const r=new Date(o);return isNaN(r.getTime())?o:`${r.toLocaleDateString([],{year:"numeric",month:"short",day:"numeric"})} ${r.toLocaleTimeString([],{hour:"2-digit",minute:"2-digit",second:"2-digit"})}`}catch(r){return console.error("Error formatting date:",r,o),o}},[]),a=t.useCallback((o,r=2)=>{if(o==null)return"0.00";const l=typeof o=="string"?parseFloat(o):o;return isNaN(l)?"0.00":l.toFixed(r)},[]),p=t.useMemo(()=>{const o=m.slice(0,3);return`https://flagcdn.com/w40/${eo[o]||o.toLowerCase()}.png`},[m]),q=t.useCallback(()=>H(!0),[]),ke=t.useCallback(()=>H(!1),[]),Te=t.useCallback(o=>{ce(o),H(!1)},[]),Ne=t.useCallback(o=>{if((D||0)>0){Ye.error(i("pages.futures.activeTradeInProgress"));return}n(Pe.doFetch()),oe(o),K(!0)},[n,D]),Ee=t.useCallback(()=>{K(!1),oe(null)},[]),Re=t.useCallback(o=>{Z(o),j(!0)},[]),Ie=t.useCallback(()=>{j(!1),Z(null)},[]),Le=t.useCallback(async o=>{o!=null&&o.id&&(await n(Ue.doUpdate(o.id,{closeNow:!0})),n(B.doFetch()),n(B.doFetchPending()),j(!1),Z(null))},[n]),Fe=t.useCallback(o=>{o==="openOrders"?(Y("openOrders"),n(B.doFetchPending())):(Y("recentOrders"),n(B.doFetch()))},[n]),be=({width:o="100%",height:r="1em"})=>e.jsx("div",{className:"loading-placeholder",style:{width:o,height:r}}),Ge=t.useMemo(()=>{const o=Ce.find(r=>r.symbol===m);return(o==null?void 0:o.name)||m.replace(/(.{3})(.{3})/,"$1 / $2")},[m]),ze=v.current[U(m)]??A??0,Me=F.current[U(m)]??A??0;return e.jsxs("div",{className:"container",children:[e.jsxs("div",{className:"header",children:[e.jsxs("div",{className:"header-top",children:[e.jsxs("div",{className:"market-info",children:[e.jsx("div",{className:"market-icon",children:e.jsx("img",{src:p,style:{width:30,height:30,borderRadius:"50%",objectFit:"cover"},alt:m,onError:o=>{o.target.style.display="none"}})}),e.jsx("div",{className:"market-name",children:Ge}),e.jsx("div",{className:"market-change",style:{color:(T??0)<0?"#FF6838":"#00C076"},children:A!==null?`${(T??0)>0?"+":""}${(T??0).toFixed(2)}%`:e.jsx(be,{width:"50px",height:"16px"})})]}),e.jsx("div",{className:"additional-actions",onClick:q,children:e.jsx("i",{className:"fas fa-filter"})})]}),e.jsx("div",{className:"market-price",style:{color:(T??0)<0?"#FF6838":"#39FF14"},children:A!==null?`$${X(A)}`:e.jsx(be,{width:"120px",height:"28px"})}),e.jsxs("div",{className:"market-stats",children:[e.jsxs("span",{children:[i("pages.marketDetail.stats.high"),": "," ",A!==null?`$${X(ze)}`:e.jsx(be,{width:"80px",height:"12px"})]}),e.jsxs("span",{children:[i("pages.marketDetail.stats.low"),": "," ",A!==null?`$${X(Me)}`:e.jsx(be,{width:"80px",height:"12px"})]})]})]}),e.jsx(We,{symbol:m,height:400},m),e.jsxs("div",{className:"future-action-buttons",children:[e.jsx("button",{className:"action-button buy-button",onClick:()=>Ne("up"),children:i("pages.futures.actions.buyUp")}),e.jsx("button",{className:"action-button sell-button",onClick:()=>Ne("down"),children:i("pages.futures.actions.buyDown")})]}),e.jsxs("div",{className:"section-tabs",children:[e.jsxs("div",{className:`tab ${J==="openOrders"?"active":""}`,onClick:()=>Fe("openOrders"),children:[i("pages.futures.tabs.openOrders")," (",D||0,")"]}),e.jsxs("div",{className:`tab ${J==="recentOrders"?"active":""}`,onClick:()=>Fe("recentOrders"),children:[i("pages.futures.tabs.recentOrders")," (",c||0,")"]})]}),e.jsx(Qe,{countFutures:ie.count,futuretLoading:ie.loading,listFutures:ie.list,handleOpenOrderModal:Re,formatNumber:X,formatDateTime:he}),W&&S&&e.jsx(oo,{selectedOrder:S,onClose:Ie,onCloseTrade:Le,formatDateTimeDetailed:s,safeToFixed:a}),e.jsx(qe,{isOpen:M,onClose:Ee,direction:de,dispatch:n,listAssets:d,selectedCoin:m,marketPrice:(A==null?void 0:A.toString())??"0",availableBalance:me,setOpeningOrders:xe,isDemoAccount:ne,currentUserId:g==null?void 0:g.id}),e.jsx(Ke,{isOpen:ue,onClose:ke,selectedCoin:m,onCoinSelect:Te,availableCoins:Ce.map(o=>({symbol:o.symbol,name:o.name})),title:i("pages.marketDetail.coinSelector.title")}),e.jsx("style",{children:`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }

        .container {
          max-width: 400px;
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
          background-color: #0f0f0f;
          padding: 20px 15px 15px;
          position: sticky;
          top: 0;
          z-index: 100;
          border-bottom: 1px solid #2a2a2a;
        }

        .header-top {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 15px;
        }

        .market-info {
          display: flex;
          align-items: center;
        }

        .market-icon {
          width: 30px;
          height: 30px;
          border-radius: 50%;
          background-color: #1c1c1c;
          margin-right: 10px;
          display: flex;
          justify-content: center;
          align-items: center;
          border: 1px solid #2a2a2a;
          overflow: hidden;
        }
        .market-icon img {
          border-radius: 50%;
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .market-name {
          font-weight: bold;
          font-size: 18px;
          margin-right: 10px;
          color: #ffffff;
        }

        .market-change {
          font-size: 14px;
          font-weight: bold;
        }

        .market-price {
          font-size: 24px;
          font-weight: bold;
          margin-bottom: 5px;
        }

        .market-stats {
          display: flex;
          justify-content: space-between;
          font-size: 12px;
          color: #aaaaaa;
          flex-wrap: wrap;
        }

        .market-stats span {
          margin-right: 10px;
          margin-bottom: 5px;
        }

        .additional-actions {
          color: #aaaaaa;
          font-size: 20px;
          cursor: pointer;
        }
        .additional-actions:hover {
          color: #39FF14;
        }

        .future-action-buttons {
          display: flex;
          gap: 15px;
          margin: 15px;
        }

        .action-button {
          flex: 1;
          padding: 13px;
          border: none;
          font-size: 13px;
          font-weight: bold;
          cursor: pointer;
          border-radius: 6px;
          transition: opacity 0.2s;
        }
        .action-button:hover {
          opacity: 0.9;
        }

        .buy-button {
          background-color: #39FF14;
          color: #0f0f0f;
        }

        .sell-button {
          background-color: #ff4d4d;
          color: #ffffff;
        }

        .section-tabs {
          display: flex;
          margin: 15px 15px 0;
          border-bottom: 1px solid #2a2a2a;
        }

        .tab {
          padding: 10px 15px;
          cursor: pointer;
          color: #777;
          font-size: 14px;
          position: relative;
          flex: 1;
          text-align: center;
        }

        .tab.active {
          color: #39FF14;
          font-weight: bold;
        }

        .tab.active::after {
          content: '';
          position: absolute;
          bottom: -1px;
          left: 0;
          right: 0;
          height: 2px;
          background-color: #39FF14;
        }

        .orders-container {
          margin: 15px;
        }

        .order-card {
          background-color: #1c1c1c;
          border: 1px solid #2a2a2a;
          border-radius: 8px;
          padding: 15px;
          margin-bottom: 15px;
          cursor: pointer;
          transition: transform 0.2s, border-color 0.2s;
        }
        .order-card.loading {
          cursor: default;
        }
        .order-card:hover:not(.loading) {
          transform: translateY(-2px);
          border-color: #39FF14;
        }

        .order-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 8px;
        }

        .order-pair {
          font-weight: bold;
          font-size: 16px;
          color: #ffffff;
        }

        .order-direction {
          font-size: 12px;
          padding: 4px 8px;
          border-radius: 4px;
          font-weight: bold;
        }
        .order-direction.buy {
          background-color: rgba(57, 255, 20, 0.2);
          color: #39FF14;
        }
        .order-direction.sell {
          background-color: rgba(255, 77, 77, 0.2);
          color: #ff4d4d;
        }

        .order-status {
          font-size: 12px;
          margin-bottom: 12px;
        }
        .order-status.open {
          color: #39FF14;
        }
        .order-status.closed {
          color: #777;
        }

        .order-details {
          border-top: 1px solid #2a2a2a;
          padding-top: 12px;
        }

        .order-row {
          display: flex;
          justify-content: space-between;
          margin-bottom: 8px;
          font-size: 13px;
        }

        .order-label {
          color: #aaaaaa;
        }

        .order-value {
          font-weight: 500;
          color: #ffffff;
        }
        .order-value.buy {
          color: #39FF14;
        }
        .order-value.sell {
          color: #ff4d4d;
        }

        .no-orders {
          text-align: center;
          padding: 30px 0;
          color: #777;
        }
        .no-orders i {
          font-size: 24px;
          margin-bottom: 10px;
          opacity: 0.5;
          color: #39FF14;
        }

        .loading-placeholder {
          animation: pulse 1.5s ease-in-out infinite;
          background-color: #2a2a2a;
          border-radius: 4px;
        }

        @keyframes pulse {
          0% { opacity: 1; }
          50% { opacity: 0.5; }
          100% { opacity: 1; }
        }

        .modal-overlays {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: rgba(0, 0, 0, 0.8);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 1000;
          padding: 20px;
        }

        .modal-content {
          background-color: #1c1c1c;
          border-radius: 12px;
          width: 100%;
          max-width: 400px;
          max-height: 80vh;
          overflow-y: auto;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
          border: 1px solid #2a2a2a;
        }

        .modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 20px;
          border-bottom: 1px solid #2a2a2a;
        }

        .modal-header h2 {
          font-size: 18px;
          font-weight: bold;
          color: #ffffff;
        }

        .modal-close {
          background: none;
          border: none;
          color: #aaaaaa;
          font-size: 20px;
          cursor: pointer;
        }
        .modal-close:hover {
          color: #39FF14;
        }

        .modal-body {
          padding: 20px;
        }

        .modal-footer {
          display: flex;
          justify-content: flex-end;
          padding: 20px;
          border-top: 1px solid #2a2a2a;
          gap: 10px;
        }

        .modal-button {
          background-color: #2a2a2a;
          color: white;
          border: none;
          border-radius: 6px;
          padding: 10px 20px;
          cursor: pointer;
          font-weight: bold;
        }
        .modal-button:hover {
          background-color: #39FF14;
          color: #0f0f0f;
        }

        .close-order-button {
          background-color: #ff4d4d;
          color: white;
          border: none;
          border-radius: 6px;
          padding: 10px 20px;
          cursor: pointer;
          font-weight: bold;
        }
        .close-order-button:hover {
          background-color: #ff3333;
        }

        .order-detail-section {
          margin-bottom: 20px;
        }

        .order-detail-section h3 {
          font-size: 14px;
          color: #aaaaaa;
          margin-bottom: 12px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .detail-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 10px;
        }

        .detail-pair {
          font-weight: bold;
          font-size: 18px;
          color: #ffffff;
        }

        .detail-direction {
          font-size: 14px;
          padding: 4px 8px;
          border-radius: 4px;
          font-weight: bold;
        }
        .detail-direction.buy {
          background-color: rgba(57, 255, 20, 0.2);
          color: #39FF14;
        }
        .detail-direction.sell {
          background-color: rgba(255, 77, 77, 0.2);
          color: #ff4d4d;
        }

        .detail-status {
          font-size: 14px;
          margin-bottom: 15px;
        }
        .detail-status.open {
          color: #39FF14;
        }
        .detail-status.closed {
          color: #777;
        }

        .detail-row {
          display: flex;
          justify-content: space-between;
          margin-bottom: 10px;
          font-size: 14px;
        }

        .detail-label {
          color: #aaaaaa;
        }

        .detail-value {
          font-weight: 500;
          color: #ffffff;
        }
        .detail-value.profit {
          color: #39FF14;
        }
        .detail-value.loss {
          color: #ff4d4d;
        }
      `})]})}const oo=({selectedOrder:n,onClose:d,onCloseTrade:u,formatDateTimeDetailed:f,safeToFixed:D})=>{const x=parseInt(n.contractDuration,10)||0,N=!n.expiryTime&&x<=0,c=!n.finalized&&!n.closePositionTime,g=N&&c;return e.jsx("div",{className:"modal-overlays",onClick:d,children:e.jsxs("div",{className:"modal-content",onClick:h=>h.stopPropagation(),children:[e.jsxs("div",{className:"modal-header",children:[e.jsx("h2",{children:i("pages.futures.orderDetails.title")}),e.jsx("button",{className:"modal-close",onClick:d,children:e.jsx("i",{className:"fas fa-times"})})]}),e.jsxs("div",{className:"modal-body",children:[e.jsxs("div",{className:"order-detail-section",children:[e.jsxs("div",{className:"detail-header",children:[e.jsx("span",{className:"detail-pair",children:n.symbol||n.pair}),e.jsx("span",{className:`detail-direction ${n.futuresStatus==="long"||n.direction==="BUY UP"?"buy":"sell"}`,children:n.futuresStatus==="long"?i("pages.futures.actions.buyUp"):n.futuresStatus==="short"?i("pages.futures.actions.buyDown"):n.direction})]}),e.jsxs("div",{className:`detail-status ${n.finalized?"closed":"open"}`,children:["● ",n.finalized?i("pages.futures.orderDetails.closed"):i("pages.futures.orderDetails.open")]})]}),e.jsxs("div",{className:"order-detail-section",children:[e.jsx(C,{label:i("pages.futures.orderDetails.futuresAmount"),value:`${n.futuresAmount||n.investment} USD`}),n.contractDuration&&e.jsx(C,{label:i("pages.futures.orderDetails.contractDuration"),value:`${n.contractDuration} ${i("pages.futures.orderDetails.seconds")}`}),!n.finalized&&!n.closePositionTime&&e.jsx(to,{order:n}),e.jsx(C,{label:i("pages.futures.orderDetails.futuresStatus"),value:n.closePositionTime?i("pages.futures.orderDetails.completed"):i("pages.futures.orderDetails.open")}),e.jsx(C,{label:i("pages.futures.orderDetails.openPositionPrice"),value:n.openPositionPrice||n.openPrice}),e.jsx(C,{label:i("pages.futures.orderDetails.openPositionTime"),value:f(n.openPositionTime||n.openTime)}),n.closePositionPrice&&e.jsx(C,{label:i("pages.futures.orderDetails.closePositionPrice"),value:n.closePositionPrice}),n.closePositionTime&&e.jsx(C,{label:i("pages.futures.orderDetails.closePositionTime"),value:f(n.closePositionTime)}),e.jsx(C,{label:i("pages.futures.orderDetails.profitLossAmount"),value:n.profitAndLossAmount||n.pnl?`${D(n.profitAndLossAmount||n.pnl,2)} USD`:"__",className:n.control==="profit"?"profit":"loss"}),e.jsx(C,{label:i("pages.futures.orderDetails.leverage"),value:`${n.leverage}X`})]})]}),e.jsxs("div",{className:"modal-footer",children:[g&&e.jsx("button",{className:"modal-button",style:{backgroundColor:"#FF6838",color:"#fff"},onClick:()=>u&&u(n),children:i("pages.futures.orderDetails.closeTrade")}),e.jsx("button",{className:"modal-button",onClick:d,children:i("pages.futures.orderDetails.done")})]})]})})},C=({label:n,value:d,className:u=""})=>e.jsxs("div",{className:"detail-row",children:[e.jsx("span",{className:"detail-label",children:n}),e.jsx("span",{className:`detail-value ${u}`,children:d})]}),to=({order:n})=>{const d=parseInt(n.contractDuration,10)||0,u=!n.expiryTime&&d<=0,f=()=>new Date(n.openPositionTime||n.openTime).getTime(),D=()=>{if(u)return Math.max(1,Math.floor((Date.now()-f())/1e3));const w=n.expiryTime?new Date(n.expiryTime).getTime():f()+d*1e3;return Math.max(0,Math.ceil((w-Date.now())/1e3))},[x,N]=t.useState(D);t.useEffect(()=>{const w=setInterval(()=>N(D()),1e3);return()=>clearInterval(w)},[n.id,n.expiryTime]);const c=Math.floor(x/60),g=x%60,h=`${c>0?`${c}m `:""}${g}s`,G=u||x>0?h:i("pages.futures.orderDetails.closing");return e.jsx(C,{label:u?i("pages.futures.orderDetails.elapsedTime"):i("pages.futures.orderDetails.remainingTime"),value:G,className:u||x>0?"profit":""})};export{co as default};
