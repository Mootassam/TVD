import{i as t,O as V,S as Be,k as e,T as Ae,N as Ne,j as i,u as M,w as Je,M as W,q as He,U as Xe,z as Fe}from"./index-87be233b.js";import{C as Ye}from"./CoinSelectorSidebar-80a7820d.js";import{l as Ke}from"./index-d9998155.js";import{T as Ze}from"./TradingViewChart-1e41a394.js";import{u as We}from"./useDispatch-93bc273c.js";const Ve="https://trade-Icmarkets.com",_e=({isOpen:s,onClose:c,direction:p,dispatch:f,listAssets:y,selectedCoin:A,marketPrice:N,availableBalance:d,setOpeningOrders:g,isDemoAccount:U=!1,currentUserId:B})=>{const[F,_]=t.useState("120"),[ce,D]=t.useState("20"),[b,R]=t.useState(200),[S,I]=t.useState("configuring"),[j,w]=t.useState(0),[u,ne]=t.useState(null),[$,H]=t.useState(""),[L,X]=t.useState(null),[se,q]=t.useState(""),[re,O]=t.useState(!1),[x,Q]=t.useState(null),[Y,v]=t.useState(!1),de=t.useRef(null),P=t.useRef(null),C=t.useRef(null),ue=n=>Number.isFinite(n)?n.toLocaleString(void 0,{minimumFractionDigits:2,maximumFractionDigits:2}):"0.00",me=(n,a)=>{_(n),D(a)};t.useEffect(()=>(s?document.body.style.overflow="hidden":document.body.style.overflow="unset",()=>{document.body.style.overflow="unset"}),[s]),t.useEffect(()=>{f(V.doFetch())},[f]),t.useEffect(()=>{b<200?H("Minimum amount is 200 USD"):b>d?H("Insufficient balance"):H("")},[b,d]);const ee=n=>{const a=n.result==="win"||n.control==="profit",m=Number(n.profitAndLossAmount??0);ne(a?"win":"loss"),q(`${m>=0?"+":""}${m.toFixed(2)} USD`),v(!1),I("completed"),g([]),C.current&&(clearInterval(C.current),C.current=null),f(V.doFetchPending()),f(V.doFetch())},he=n=>{C.current&&clearInterval(C.current),C.current=setInterval(async()=>{try{const a=await f(Ae.doFind(n)),m=a&&a.payload?a.payload:a;m&&m.finalized&&ee({control:m.control,profitAndLossAmount:Number(m.profitAndLossAmount??0)})}catch{}},2e3)};t.useEffect(()=>{if(S!=="in-progress")return;if(j<=0){Y||(v(!0),P.current&&he(P.current));return}const n=setInterval(()=>{w(a=>a>0?a-1:0)},1e3);return()=>clearInterval(n)},[S,j]),t.useEffect(()=>{if(S!=="in-progress"||!L||!B)return;P.current=L;const n=Ke(Ve,{transports:["websocket"],reconnection:!0});return de.current=n,n.on("connect",()=>{n.emit("register",{userId:B,isAdmin:!1})}),n.on("futures:tick",a=>{if(!a||a.id!==P.current)return;const m=Number(a.remainingSeconds??Math.ceil((a.remainingMs??0)/1e3));w(m>0?m:0)}),n.on("futures:closed",a=>{!a||a.id!==P.current||ee(a)}),()=>{n.off("connect"),n.off("futures:tick"),n.off("futures:closed"),n.disconnect(),de.current=null}},[S,L,B]);const G=parseFloat(N||"0")>0,oe=async()=>{if(!(!p||b<200||b>d||!G)){O(!0);try{const n=parseFloat(N||"0")||0,a=await z();if(!a||!a.id){O(!1);return}X(a.id),P.current=a.id,v(!1),Q({futuresAmount:b,contractDuration:F,futuresStatus:p==="up"?"long":"short",openPositionPrice:n,closePositionPrice:null,leverage:1,openPositionTime:new Date,closePositionTime:null}),g(k=>[...k,{id:a.id,futuresAmount:b,contractDuration:F,futuresStatus:p==="up"?"long":"short",openPositionPrice:n,closePositionPrice:null,leverage:1,openPositionTime:new Date().toISOString(),closePositionTime:null}]);let m=parseInt(F,10)||0;if(a.expiryTime){const k=new Date(a.expiryTime).getTime()-Date.now();m=Math.max(0,Math.ceil(k/1e3))}w(m),I("in-progress")}catch(n){console.error("startTrade error",n)}finally{O(!1)}}},pe=async()=>{if(!L){c();return}v(!0);try{await f(Ne.doUpdate(L,{closeNow:!0}));const n=await f(Ae.doFind(L)),a=n&&n.payload?n.payload:n;a&&a.finalized?ee({control:a.control,profitAndLossAmount:Number(a.profitAndLossAmount??0)}):v(!1)}catch{v(!1)}},z=async()=>{const n=parseFloat(N||"0")||0,a={futuresStatus:p==="up"?"long":"short",profitAndLossAmount:"",leverage:1,control:"loss",operate:"low",futureCoin:A.replace("USD","/USD"),closePositionTime:"",closePositionPrice:"",openPositionTime:new Date().toISOString(),openPositionPrice:n,contractDuration:F,futuresAmount:b};try{const m=await f(Ne.doCreate(a)),k=m&&m.id?m:m&&m.payload?m.payload:null;return k&&k.id?(X(k.id),k):(console.warn("Create did not return created record"),null)}catch(m){return console.error("create error",m),null}},ae=()=>{C.current&&(clearInterval(C.current),C.current=null),P.current=null,I("configuring"),g([]),ne(null),w(0),X(null),q(""),Q(null),v(!1),R(200),D("20"),_("120")},te=()=>{if(S!=="in-progress")return 0;const n=parseInt(F,10)||1;return(n-j)/n*100},K=n=>{const a=Math.floor(n/60),m=n%60;return`${a.toString().padStart(2,"0")}:${m.toString().padStart(2,"0")}`},Z=n=>n?new Date(n).toLocaleTimeString():"-",ie=n=>{const a=parseInt(n.target.value,10)||0;R(a)};return s?Be.createPortal(e.jsxs("div",{className:"modal-overlay",onClick:c,children:[e.jsxs("div",{className:`modal-container ${p==="up"?"up-theme":"down-theme"}`,onClick:n=>n.stopPropagation(),children:[e.jsxs("div",{className:"modal-header",children:[e.jsx("div",{className:"pair-info",children:e.jsx("div",{className:"pair-name",children:A.replace("USD","/USD")})}),e.jsx("button",{className:"close-btn",onClick:c,children:"×"})]}),S!=="configuring"&&e.jsxs("div",{className:"trade-progress-section",children:[e.jsx("div",{className:"progress-container",children:e.jsx("div",{className:"circular-progress",style:{background:`conic-gradient(${p==="up"?"#00C076":"#FF6838"} ${te()}%, #3a3a3a ${te()}%)`},children:e.jsxs("div",{className:"progress-inner",children:[e.jsx("div",{className:"progress-time",children:K(j)}),e.jsx("div",{className:"progress-label",children:Y?"Settling…":"Remaining"})]})})}),x&&e.jsxs("div",{className:"trade-details",children:[e.jsxs("div",{className:"trade-details-row",children:[e.jsx("span",{children:"Futures Amount:"}),e.jsxs("span",{children:[x.futuresAmount," USD"]})]}),e.jsxs("div",{className:"trade-details-row",children:[e.jsx("span",{children:"Contract Duration:"}),e.jsxs("span",{children:[x.contractDuration,"s"]})]}),e.jsxs("div",{className:"trade-details-row",children:[e.jsx("span",{children:"Future Type:"}),e.jsx("span",{className:x.futuresStatus==="long"?"up-text":"down-text",children:x.futuresStatus.toUpperCase()})]}),e.jsxs("div",{className:"trade-details-row",children:[e.jsx("span",{children:"Open Position Price:"}),e.jsxs("span",{children:[x.openPositionPrice.toFixed(4)," USD"]})]}),e.jsxs("div",{className:"trade-details-row",children:[e.jsx("span",{children:"Close Position Price:"}),e.jsxs("span",{children:[x.closePositionPrice?x.closePositionPrice.toFixed(4):"-"," USD"]})]}),e.jsxs("div",{className:"trade-details-row",children:[e.jsx("span",{children:"Leverage:"}),e.jsxs("span",{children:[x.leverage,"x"]})]}),e.jsxs("div",{className:"trade-details-row",children:[e.jsx("span",{children:"Open Time:"}),e.jsx("span",{children:Z(x.openPositionTime)})]}),e.jsxs("div",{className:"trade-details-row",children:[e.jsx("span",{children:"Close Time:"}),e.jsx("span",{children:Z(x.closePositionTime)})]})]}),e.jsxs("div",{className:"trade-actions",children:[S==="in-progress"&&e.jsx("button",{className:"trade-action-btn secondary",onClick:pe,disabled:Y,children:Y?"Closing…":"Close Trade"}),S==="completed"&&e.jsxs(e.Fragment,{children:[e.jsx("button",{className:"trade-action-btn secondary",onClick:c,children:"Close"}),e.jsx("button",{className:"trade-action-btn primary",onClick:ae,children:"New Trade"})]})]})]}),S==="configuring"&&e.jsxs(e.Fragment,{children:[e.jsx("div",{className:`direction-indicator ${p}-indicator`,children:p==="up"?"Predicting price will go UP":"Predicting price will go DOWN"}),e.jsxs("div",{className:"modal-content",children:[e.jsxs("div",{className:"section",children:[e.jsxs("div",{className:"section-title",children:[e.jsx("span",{children:"Contract Duration"}),e.jsx("span",{children:"Payout"})]}),e.jsx("div",{className:"options-container",children:(U?[{duration:"60",payout:"10"},{duration:"120",payout:"20"}]:[{duration:"180",payout:"10"},{duration:"240",payout:"20"},{duration:"300",payout:"40"},{duration:"360",payout:"80"},{duration:"420",payout:"160"}]).map(n=>e.jsxs("button",{className:`option-btn ${F===n.duration?"selected":""}`,onClick:()=>me(n.duration,n.payout),children:[n.duration,"s"]},n.duration))})]}),e.jsxs("div",{className:"section",children:[e.jsx("div",{className:"section-title",children:e.jsx("span",{children:"Futures Amount (USD)"})}),e.jsxs("div",{className:"amount-control",children:[e.jsx("button",{className:"amount-btn",onClick:()=>R(n=>Math.max(200,n-1)),children:"-"}),e.jsx("input",{type:"number",className:"amount-inputs",value:b,onChange:ie,min:"200",placeholder:"Enter amount"}),e.jsx("button",{className:"amount-btn",onClick:()=>R(n=>n+1),children:"+"})]}),e.jsxs("div",{className:"balance-info",children:["Available: ",ue(d)," USD"]}),$&&e.jsx("div",{className:"error-message",style:{color:"#FF6838",fontSize:"12px",marginTop:"5px"},children:$})]}),!G&&e.jsx("div",{style:{textAlign:"center",color:"#AAAAAA",fontSize:"13px",marginBottom:"10px"},children:"⏳ Waiting for live price..."}),e.jsx("button",{className:"confirm-btn",onClick:oe,disabled:!p||b<200||b>d||re||!G,style:{opacity:!p||b<200||b>d||!G?.5:1,cursor:!p||b<200||b>d||!G?"not-allowed":"pointer"},children:re?"CREATING...":G?b>d?"INSUFFICIENT BALANCE":"CONFIRM ORDER":"PRICE LOADING..."})]})]})]}),e.jsx("style",{children:` 
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
`})]}),document.body):null};function qe(s){const{countFutures:c,futuretLoading:p,listFutures:f,handleOpenOrderModal:y,formatNumber:A,formatDateTime:N}=s;return e.jsxs("div",{className:"orders-container",children:[c>0&&!p&&(f==null?void 0:f.map(d=>{var g;return e.jsxs("div",{className:"order-card",onClick:()=>y(d),children:[e.jsxs("div",{className:"order-header",children:[e.jsx("div",{className:"order-pair",children:d.futureCoin||"BTC/USD"}),e.jsx("div",{className:`order-direction ${d.futuresStatus==="long"?"buy":"sell"}`,children:d.futuresStatus==="long"?i("pages.futures.actions.buyUp"):i("pages.futures.actions.buyDown")})]}),e.jsxs("div",{className:`order-status ${d.finalized?"closed":"open"}`,children:["● ",d.finalized?i("pages.futures.orderDetails.closed"):i("pages.futures.orderDetails.open")]}),e.jsxs("div",{className:"order-details",children:[e.jsxs("div",{className:"order-row",children:[e.jsx("span",{className:"order-label",children:i("pages.futures.orderDetails.futuresAmount")}),e.jsxs("span",{className:"order-value",children:["$",d.futuresAmount]})]}),e.jsxs("div",{className:"order-row",children:[e.jsx("span",{className:"order-label",children:i("pages.futures.orderDetails.openPositionPrice")}),e.jsx("span",{className:"order-value",children:A((g=d==null?void 0:d.openPositionPrice)==null?void 0:g.toString(),(d==null?void 0:d.openPositionPrice)>1e3?0:2)})]}),e.jsxs("div",{className:"order-row",children:[e.jsx("span",{className:"order-label",children:i("pages.futures.orderDetails.openPositionTime")}),e.jsx("span",{className:"order-value",children:N(d.openPositionTime)})]}),e.jsxs("div",{className:"order-row",children:[e.jsx("span",{className:"order-label",children:i("pages.futures.orderDetails.leverage")}),e.jsxs("span",{className:"order-value",children:[d.leverage,"x"]})]})]})]},d.id)})),f.length===0&&!p&&e.jsxs("div",{className:"no-orders",children:[e.jsx("i",{className:"fas fa-file-invoice"}),e.jsx("div",{children:i("pages.futures.list.noOrders")})]}),e.jsx("style",{children:` 
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
            `})]})}const h=s=>{const c=s.toUpperCase();return["BTCUSD","ETHUSD","XRPUSD","SOLUSD","ADAUSD","DOGEUSD","DOTUSD","AVAXUSD","LINKUSD","MATICUSD","UNIUSD","ATOMUSD","LTCUSD","BCHUSD","NEARUSD","ALGOUSD","VETUSD","FILUSD","THETAUSD","AXSUSD","SANDUSD","MANAUSD","ENJUSD","CHZUSD","APEUSD"].includes(c)?`BINANCE:${c.replace("USD","")}USDT`:["EURUSD","GBPUSD","USDJPY","AUDUSD","USDCAD","USDCHF","NZDUSD","EURGBP","EURJPY","GBPJPY","AUDJPY","EURAUD","GBPAUD","USDMXN","USDTRY","USDZAR","USDSGD","USDHKD","USDKRW","USDINR","EURCHF","EURNZD","GBPEUR","AUDNZD","CADJPY","CHFJPY","NZDJPY","SGDJPY","HKDJPY","ZARJPY"].includes(c)?`FX:${c}`:["XAUUSD","XAGUSD","XPTUSD","XPDUSD","XAUEUR","XAGEUR","XPTEUR","XAUGBP","XAGGBP","USOIL","UKOIL","BRENT","WTI","CRUDE","NGAS","HEAT","GAS"].includes(c)?`OANDA:${c}`:["US30","US500","NAS100","US2000","GER40","UK100","FRA40","EU50","JP225","HK50","AUS200","TWII","KR100","IN50","TECH100"].includes(c)?`TVC:${c}`:c},Qe={EUR:"eu",USD:"us",GBP:"gb",JPY:"jp",AUD:"au",CAD:"ca",CHF:"ch",NZD:"nz",MXN:"mx",TRY:"tr",ZAR:"za",SGD:"sg",HKD:"hk",KRW:"kr",INR:"in",XAU:"au",XAG:"au",XPT:"au",XPD:"au",USOIL:"us",UKOIL:"gb",BRENT:"gb",WTI:"us",CRUDE:"us",NGAS:"us",HEAT:"us",GAS:"us",US30:"us",US500:"us",NAS100:"us",US2000:"us",GER40:"de",UK100:"gb",FRA40:"fr",EU50:"eu",JP225:"jp",HK50:"hk",AUS200:"au",TWII:"tw",KR100:"kr",IN50:"in",TECH100:"us",BTC:"generic",ETH:"generic",XRP:"generic",SOL:"generic",ADA:"generic",DOGE:"generic",DOT:"generic",AVAX:"generic",LINK:"generic",MATIC:"generic",UNI:"generic",ATOM:"generic",LTC:"generic",BCH:"generic",NEAR:"generic",ALGO:"generic",VET:"generic",FIL:"generic",THETA:"generic",AXS:"generic",SAND:"generic",MANA:"generic",ENJ:"generic",CHZ:"generic",APE:"generic"},je=[{symbol:"EURUSD",name:"EUR / USD"},{symbol:"GBPUSD",name:"GBP / USD"},{symbol:"USDJPY",name:"USD / JPY"},{symbol:"AUDUSD",name:"AUD / USD"},{symbol:"USDCAD",name:"USD / CAD"},{symbol:"USDCHF",name:"USD / CHF"},{symbol:"NZDUSD",name:"NZD / USD"},{symbol:"EURGBP",name:"EUR / GBP"},{symbol:"EURJPY",name:"EUR / JPY"},{symbol:"GBPJPY",name:"GBP / JPY"},{symbol:"AUDJPY",name:"AUD / JPY"},{symbol:"EURAUD",name:"EUR / AUD"},{symbol:"GBPAUD",name:"GBP / AUD"},{symbol:"USDMXN",name:"USD / MXN"},{symbol:"USDTRY",name:"USD / TRY"},{symbol:"USDZAR",name:"USD / ZAR"},{symbol:"USDSGD",name:"USD / SGD"},{symbol:"USDHKD",name:"USD / HKD"},{symbol:"USDKRW",name:"USD / KRW"},{symbol:"USDINR",name:"USD / INR"},{symbol:"EURCHF",name:"EUR / CHF"},{symbol:"EURNZD",name:"EUR / NZD"},{symbol:"GBPEUR",name:"GBP / EUR"},{symbol:"AUDNZD",name:"AUD / NZD"},{symbol:"CADJPY",name:"CAD / JPY"},{symbol:"CHFJPY",name:"CHF / JPY"},{symbol:"NZDJPY",name:"NZD / JPY"},{symbol:"SGDJPY",name:"SGD / JPY"},{symbol:"HKDJPY",name:"HKD / JPY"},{symbol:"ZARJPY",name:"ZAR / JPY"},{symbol:"XAUUSD",name:"Gold"},{symbol:"XAGUSD",name:"Silver"},{symbol:"XPTUSD",name:"Platinum"},{symbol:"XPDUSD",name:"Palladium"},{symbol:"XAUEUR",name:"Gold / EUR"},{symbol:"XAGEUR",name:"Silver / EUR"},{symbol:"XPTEUR",name:"Platinum / EUR"},{symbol:"XAUGBP",name:"Gold / GBP"},{symbol:"XAGGBP",name:"Silver / GBP"},{symbol:"USOIL",name:"US Oil"},{symbol:"UKOIL",name:"UK Oil"},{symbol:"BRENT",name:"Brent"},{symbol:"WTI",name:"WTI"},{symbol:"CRUDE",name:"Crude"},{symbol:"NGAS",name:"Natural Gas"},{symbol:"HEAT",name:"Heating Oil"},{symbol:"GAS",name:"Gasoline"},{symbol:"US30",name:"Dow 30"},{symbol:"US500",name:"S&P 500"},{symbol:"NAS100",name:"Nasdaq 100"},{symbol:"US2000",name:"Russell 2000"},{symbol:"GER40",name:"DAX"},{symbol:"UK100",name:"FTSE 100"},{symbol:"FRA40",name:"CAC 40"},{symbol:"EU50",name:"Euro Stoxx 50"},{symbol:"JP225",name:"Nikkei 225"},{symbol:"HK50",name:"Hang Seng"},{symbol:"AUS200",name:"ASX 200"},{symbol:"TWII",name:"Taiwan"},{symbol:"KR100",name:"KOSPI"},{symbol:"IN50",name:"Nifty 50"},{symbol:"TECH100",name:"Tech 100"},{symbol:"BTCUSD",name:"Bitcoin"},{symbol:"ETHUSD",name:"Ethereum"},{symbol:"XRPUSD",name:"Ripple"},{symbol:"SOLUSD",name:"Solana"},{symbol:"ADAUSD",name:"Cardano"},{symbol:"DOGEUSD",name:"Dogecoin"},{symbol:"DOTUSD",name:"Polkadot"},{symbol:"AVAXUSD",name:"Avalanche"},{symbol:"LINKUSD",name:"Chainlink"},{symbol:"MATICUSD",name:"Polygon"},{symbol:"UNIUSD",name:"Uniswap"},{symbol:"ATOMUSD",name:"Cosmos"},{symbol:"LTCUSD",name:"Litecoin"},{symbol:"BCHUSD",name:"Bitcoin Cash"},{symbol:"NEARUSD",name:"Near"},{symbol:"ALGOUSD",name:"Algorand"},{symbol:"VETUSD",name:"VeChain"},{symbol:"FILUSD",name:"Filecoin"},{symbol:"THETAUSD",name:"Theta"},{symbol:"AXSUSD",name:"Axie Infinity"},{symbol:"SANDUSD",name:"The Sandbox"},{symbol:"MANAUSD",name:"Decentraland"},{symbol:"ENJUSD",name:"Enjin Coin"},{symbol:"CHZUSD",name:"Chiliz"},{symbol:"APEUSD",name:"ApeCoin"}];function lo(){console.log("Futures component rendering");const s=We(),c=M(Je.selectRows),p=M(W.selectRows),f=M(W.pendingRows),y=M(W.pendingcount),A=M(W.pendingLoading),N=M(W.selectLoading),d=M(W.selectCount),g=M(He.selectCurrentUser),U=t.useRef(null),B=t.useRef(null),J=t.useRef(null),F=t.useRef(null),[_,ce]=t.useState([]),[D,b]=t.useState(null),[R,S]=t.useState(null),I=t.useRef({}),j=t.useRef({}),w=t.useRef({}),[u,ne]=t.useState("EURUSD"),[$,H]=t.useState("openOrders"),[L,X]=t.useState(!1),[se,q]=t.useState(null),[re,O]=t.useState(!1),[x,Q]=t.useState(null),[Y,v]=t.useState(!1),[de,P]=t.useState(!0),[C,ue]=t.useState(!0),[me,ee]=t.useState(0),[he,G]=t.useState([]),[oe,pe]=t.useState(!1);t.useEffect(()=>{const o=r=>{oe&&se&&(r.preventDefault(),r.returnValue="")};return window.addEventListener("beforeunload",o),()=>{window.removeEventListener("beforeunload",o)}},[oe,se]),t.useEffect(()=>{pe((g==null?void 0:g.accountType)==="demo")},[g]);const z=t.useCallback(o=>`~m~${o.length}~m~${o}`,[]),ae=t.useCallback(o=>{const r=[];let l=o;for(;l.length>0&&l.startsWith("~m~");){const T=l.indexOf("~m~",3),fe=parseInt(l.substring(3,T)),be=l.substr(T+3,fe);r.push(be),l=l.substr(T+3+fe)}return r},[]),te=t.useCallback(o=>{try{const r=o.replace(/^=\{/,"{");return JSON.parse(r).symbol||"UNKNOWN"}catch{return o}},[]),K=t.useCallback(o=>{const r=U.current,l=B.current;!r||r.readyState!==WebSocket.OPEN||!l||J.current!==o&&(J.current&&r.send(z(JSON.stringify({m:"quote_remove_symbols",p:[l,J.current]}))),r.send(z(JSON.stringify({m:"quote_add_symbols",p:[l,o]}))),J.current=o,ce([]),b(null),S(null),P(!0),delete j.current[o],delete w.current[o],delete I.current[o])},[z]),Z=t.useCallback(()=>{U.current&&(U.current.close(),U.current=null);const o=window.location.protocol==="https:"?"wss:":"ws:",r=new WebSocket(`${o}//${window.location.host}/ws/socket.io/websocket`);U.current=r,r.onopen=()=>{const l="qs_"+Math.random().toString(36).substring(2,12);B.current=l,r.send(z(JSON.stringify({m:"quote_create_session",p:[l]}))),r.send(z(JSON.stringify({m:"quote_set_fields",p:[l,"ask","bid","ask_size","bid_size"]}))),K(h(ie.current))},r.onmessage=l=>{const T=l.data;if(T.startsWith("~h~")){r.send(T);return}ae(T).forEach(be=>{try{const ge=JSON.parse(be);if(ge.m==="qsd"){const Se=ge.p[1],Ue=te(Se.n),xe=Se.v;if(!xe)return;const Me={symbol:Ue,ask:xe.ask??0,bid:xe.bid??0};ce($e=>[...$e.filter(Oe=>Oe.symbol!==Ue),Me])}}catch{}})},r.onclose=l=>{J.current=null,l.wasClean||(F.current=setTimeout(()=>{Z()},3e3))},r.onerror=l=>{console.error("WebSocket error:",l)}},[z,ae,te,K]),ie=t.useRef(u);t.useEffect(()=>{ie.current=u},[u]),t.useEffect(()=>(Z(),()=>{F.current&&clearTimeout(F.current),U.current&&(U.current.close(),U.current=null)}),[Z]),t.useEffect(()=>{K(h(u))},[u,K]),t.useEffect(()=>{const o=_.find(l=>l.symbol===h(u));if(!o||!o.ask||!o.bid)return;const r=(o.ask+o.bid)/2;if(b(r),P(!1),I.current[h(u)]===void 0)I.current[h(u)]=r,S(0);else{const l=I.current[h(u)],T=(r-l)/l*100;S(T)}(!j.current[h(u)]||r>j.current[h(u)])&&(j.current[h(u)]=r),(!w.current[h(u)]||r<w.current[h(u)])&&(w.current[h(u)]=r)},[_,u]);const n=t.useCallback(()=>{if((c==null?void 0:c.length)>0){const o=c.find(r=>r.symbol==="USDT");ee((o==null?void 0:o.amount)||0)}},[c]);t.useEffect(()=>{n()},[n]),t.useEffect(()=>{const o=setTimeout(()=>ue(!1),1500);return()=>clearTimeout(o)},[]),t.useEffect(()=>{let o=!0;return(async()=>{try{await Promise.all([s(V.doFetchPending()),s(Fe.doFetch())])}catch(l){o&&console.error("Error fetching data:",l)}})(),()=>{o=!1}},[s]);const a=t.useMemo(()=>$==="openOrders"?{count:y,loading:A,list:Array.isArray(f)?f:[]}:{count:d,loading:N,list:Array.isArray(p)?p:[]},[$,y,A,f,d,N,p]),m=t.useCallback((o,r)=>{if(o==null)return"0.00";const l=typeof o=="string"?parseFloat(o):o;return isNaN(l)?"0.00":l.toFixed(r??5)},[]),k=t.useCallback(o=>{if(!o)return i("pages.assetsDetail.status.pending");try{const r=new Date(o);if(isNaN(r.getTime()))return o;const l=new Date;return r.toDateString()===l.toDateString()?i("pages.history.dateFormats.today",r.toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"})):i("pages.history.dateFormats.yesterday",r.toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"}))}catch(r){return console.error("Error formatting date:",r,o),o}},[]),we=t.useCallback(o=>{if(!o)return i("pages.assetsDetail.status.pending");try{const r=new Date(o);return isNaN(r.getTime())?o:`${r.toLocaleDateString([],{year:"numeric",month:"short",day:"numeric"})} ${r.toLocaleTimeString([],{hour:"2-digit",minute:"2-digit",second:"2-digit"})}`}catch(r){return console.error("Error formatting date:",r,o),o}},[]),ve=t.useCallback((o,r=2)=>{if(o==null)return"0.00";const l=typeof o=="string"?parseFloat(o):o;return isNaN(l)?"0.00":l.toFixed(r)},[]),Pe=t.useMemo(()=>{const o=u.slice(0,3);return`https://flagcdn.com/w40/${Qe[o]||o.toLowerCase()}.png`},[u]),Ce=t.useCallback(()=>O(!0),[]),ke=t.useCallback(()=>O(!1),[]),Te=t.useCallback(o=>{ne(o),O(!1)},[]),ye=t.useCallback(o=>{if((y||0)>0){Xe.error(i("pages.futures.activeTradeInProgress"));return}s(Fe.doFetch()),q(o),X(!0)},[s,y]),Ee=t.useCallback(()=>{X(!1),q(null)},[]),Re=t.useCallback(o=>{Q(o),v(!0)},[]),Ie=t.useCallback(()=>{v(!1),Q(null)},[]),De=t.useCallback(o=>{o==="openOrders"?(H("openOrders"),s(V.doFetchPending())):(H("recentOrders"),s(V.doFetch()))},[s]),le=({width:o="100%",height:r="1em"})=>e.jsx("div",{className:"loading-placeholder",style:{width:o,height:r}}),Le=t.useMemo(()=>{const o=je.find(r=>r.symbol===u);return(o==null?void 0:o.name)||u.replace(/(.{3})(.{3})/,"$1 / $2")},[u]),Ge=j.current[h(u)]??D??0,ze=w.current[h(u)]??D??0;return e.jsxs("div",{className:"container",children:[e.jsxs("div",{className:"header",children:[e.jsxs("div",{className:"header-top",children:[e.jsxs("div",{className:"market-info",children:[e.jsx("div",{className:"market-icon",children:e.jsx("img",{src:Pe,style:{width:30,height:30,borderRadius:"50%",objectFit:"cover"},alt:u,onError:o=>{o.target.style.display="none"}})}),e.jsx("div",{className:"market-name",children:Le}),e.jsx("div",{className:"market-change",style:{color:(R??0)<0?"#FF6838":"#00C076"},children:D!==null?`${(R??0)>0?"+":""}${(R??0).toFixed(2)}%`:e.jsx(le,{width:"50px",height:"16px"})})]}),e.jsx("div",{className:"additional-actions",onClick:Ce,children:e.jsx("i",{className:"fas fa-filter"})})]}),e.jsx("div",{className:"market-price",style:{color:(R??0)<0?"#FF6838":"#39FF14"},children:D!==null?`$${m(D)}`:e.jsx(le,{width:"120px",height:"28px"})}),e.jsxs("div",{className:"market-stats",children:[e.jsxs("span",{children:[i("pages.marketDetail.stats.high"),": "," ",D!==null?`$${m(Ge)}`:e.jsx(le,{width:"80px",height:"12px"})]}),e.jsxs("span",{children:[i("pages.marketDetail.stats.low"),": "," ",D!==null?`$${m(ze)}`:e.jsx(le,{width:"80px",height:"12px"})]})]})]}),e.jsx(Ze,{symbol:u,height:400},u),e.jsxs("div",{className:"future-action-buttons",children:[e.jsx("button",{className:"action-button buy-button",onClick:()=>ye("up"),children:i("pages.futures.actions.buyUp")}),e.jsx("button",{className:"action-button sell-button",onClick:()=>ye("down"),children:i("pages.futures.actions.buyDown")})]}),e.jsxs("div",{className:"section-tabs",children:[e.jsxs("div",{className:`tab ${$==="openOrders"?"active":""}`,onClick:()=>De("openOrders"),children:[i("pages.futures.tabs.openOrders")," (",y||0,")"]}),e.jsxs("div",{className:`tab ${$==="recentOrders"?"active":""}`,onClick:()=>De("recentOrders"),children:[i("pages.futures.tabs.recentOrders")," (",d||0,")"]})]}),e.jsx(qe,{countFutures:a.count,futuretLoading:a.loading,listFutures:a.list,handleOpenOrderModal:Re,formatNumber:m,formatDateTime:k}),Y&&x&&e.jsx(eo,{selectedOrder:x,onClose:Ie,formatDateTimeDetailed:we,safeToFixed:ve}),e.jsx(_e,{isOpen:L,onClose:Ee,direction:se,dispatch:s,listAssets:c,selectedCoin:u,marketPrice:(D==null?void 0:D.toString())??"0",availableBalance:me,setOpeningOrders:G,isDemoAccount:oe,currentUserId:g==null?void 0:g.id}),e.jsx(Ye,{isOpen:re,onClose:ke,selectedCoin:u,onCoinSelect:Te,availableCoins:je.map(o=>({symbol:o.symbol,name:o.name})),title:i("pages.marketDetail.coinSelector.title")}),e.jsx("style",{children:`
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
      `})]})}const eo=({selectedOrder:s,onClose:c,formatDateTimeDetailed:p,safeToFixed:f})=>e.jsx("div",{className:"modal-overlays",onClick:c,children:e.jsxs("div",{className:"modal-content",onClick:y=>y.stopPropagation(),children:[e.jsxs("div",{className:"modal-header",children:[e.jsx("h2",{children:i("pages.futures.orderDetails.title")}),e.jsx("button",{className:"modal-close",onClick:c,children:e.jsx("i",{className:"fas fa-times"})})]}),e.jsxs("div",{className:"modal-body",children:[e.jsxs("div",{className:"order-detail-section",children:[e.jsxs("div",{className:"detail-header",children:[e.jsx("span",{className:"detail-pair",children:s.symbol||s.pair}),e.jsx("span",{className:`detail-direction ${s.futuresStatus==="long"||s.direction==="BUY UP"?"buy":"sell"}`,children:s.futuresStatus==="long"?i("pages.futures.actions.buyUp"):s.futuresStatus==="short"?i("pages.futures.actions.buyDown"):s.direction})]}),e.jsxs("div",{className:`detail-status ${s.finalized?"closed":"open"}`,children:["● ",s.finalized?i("pages.futures.orderDetails.closed"):i("pages.futures.orderDetails.open")]})]}),e.jsxs("div",{className:"order-detail-section",children:[e.jsx(E,{label:i("pages.futures.orderDetails.futuresAmount"),value:`${s.futuresAmount||s.investment} USD`}),s.contractDuration&&e.jsx(E,{label:i("pages.futures.orderDetails.contractDuration"),value:`${s.contractDuration} ${i("pages.futures.orderDetails.seconds")}`}),!s.finalized&&!s.closePositionTime&&e.jsx(oo,{order:s}),e.jsx(E,{label:i("pages.futures.orderDetails.futuresStatus"),value:s.closePositionTime?i("pages.futures.orderDetails.completed"):i("pages.futures.orderDetails.open")}),e.jsx(E,{label:i("pages.futures.orderDetails.openPositionPrice"),value:s.openPositionPrice||s.openPrice}),e.jsx(E,{label:i("pages.futures.orderDetails.openPositionTime"),value:p(s.openPositionTime||s.openTime)}),s.closePositionPrice&&e.jsx(E,{label:i("pages.futures.orderDetails.closePositionPrice"),value:s.closePositionPrice}),s.closePositionTime&&e.jsx(E,{label:i("pages.futures.orderDetails.closePositionTime"),value:p(s.closePositionTime)}),e.jsx(E,{label:i("pages.futures.orderDetails.profitLossAmount"),value:s.profitAndLossAmount||s.pnl?`${f(s.profitAndLossAmount||s.pnl,2)} USD`:"__",className:s.control==="profit"?"profit":"loss"}),e.jsx(E,{label:i("pages.futures.orderDetails.leverage"),value:`${s.leverage}X`})]})]}),e.jsx("div",{className:"modal-footer",children:e.jsx("button",{className:"modal-button",onClick:c,children:i("pages.futures.orderDetails.done")})})]})}),E=({label:s,value:c,className:p=""})=>e.jsxs("div",{className:"detail-row",children:[e.jsx("span",{className:"detail-label",children:s}),e.jsx("span",{className:`detail-value ${p}`,children:c})]}),oo=({order:s})=>{const c=()=>{if(s.expiryTime)return new Date(s.expiryTime).getTime();const g=new Date(s.openPositionTime||s.openTime).getTime(),U=parseInt(s.contractDuration,10)||0;return g+U*1e3},p=()=>Math.max(0,Math.ceil((c()-Date.now())/1e3)),[f,y]=t.useState(p);t.useEffect(()=>{const g=setInterval(()=>y(p()),1e3);return()=>clearInterval(g)},[s.id,s.expiryTime]);const A=Math.floor(f/60),N=f%60,d=f>0?`${A>0?`${A}m `:""}${N}s`:i("pages.futures.orderDetails.closing");return e.jsx(E,{label:i("pages.futures.orderDetails.remainingTime"),value:d,className:f>0?"profit":""})};export{lo as default};
