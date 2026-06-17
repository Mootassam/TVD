import{i as t,O as q,S as Be,k as e,T as we,N as ve,j as i,u as $,w as Je,M as _,q as He,U as Xe,z as Pe}from"./index-7d92ccb6.js";import{C as Ye}from"./CoinSelectorSidebar-d1a95154.js";import{l as Ke}from"./index-d9998155.js";import{T as Ze}from"./TradingViewChart-7e3ed3cf.js";import{u as We}from"./useDispatch-3068ff20.js";const Ve="https://trade-Icmarkets.com",_e=({isOpen:n,onClose:c,direction:u,dispatch:f,listAssets:h,selectedCoin:S,marketPrice:F,availableBalance:d,setOpeningOrders:g,isDemoAccount:U=!1,currentUserId:L})=>{const[T,Q]=t.useState(""),[be,A]=t.useState("20"),[b,E]=t.useState(200),[x,G]=t.useState("configuring"),[w,N]=t.useState(0),[m,le]=t.useState(null),[B,X]=t.useState(""),[z,Y]=t.useState(null),[ce,ee]=t.useState(""),[de,J]=t.useState(!1),[y,oe]=t.useState(null),[K,v]=t.useState(!1),[M,Z]=t.useState(!1),[Ue,te]=t.useState(0),ue=t.useRef(null),R=t.useRef(null),P=t.useRef(null),ge=s=>Number.isFinite(s)?s.toLocaleString(void 0,{minimumFractionDigits:2,maximumFractionDigits:2}):"0.00",se=(s,a)=>{Q(s),A(a)};t.useEffect(()=>(n?document.body.style.overflow="hidden":document.body.style.overflow="unset",()=>{document.body.style.overflow="unset"}),[n]),t.useEffect(()=>{f(q.doFetch())},[f]),t.useEffect(()=>{b<200?X("Minimum amount is 200 USD"):b>d?X("Insufficient balance"):X("")},[b,d]);const ne=s=>{const a=s.result==="win"||s.control==="profit",p=Number(s.profitAndLossAmount??0);le(a?"win":"loss"),ee(`${p>=0?"+":""}${p.toFixed(2)} USD`),v(!1),G("completed"),g([]),P.current&&(clearInterval(P.current),P.current=null),f(q.doFetchPending()),f(q.doFetch())},O=s=>{P.current&&clearInterval(P.current),P.current=setInterval(async()=>{try{const a=await f(we.doFind(s)),p=a&&a.payload?a.payload:a;p&&p.finalized&&ne({control:p.control,profitAndLossAmount:Number(p.profitAndLossAmount??0)})}catch{}},2e3)};t.useEffect(()=>{if(x!=="in-progress"||M)return;if(w<=0){K||(v(!0),R.current&&O(R.current));return}const s=setInterval(()=>{N(a=>a>0?a-1:0)},1e3);return()=>clearInterval(s)},[x,w,M]),t.useEffect(()=>{if(x!=="in-progress"||!M)return;const s=setInterval(()=>{te(a=>a+1)},1e3);return()=>clearInterval(s)},[x,M]),t.useEffect(()=>{if(x!=="in-progress"||!z||!L)return;R.current=z;const s=Ke(Ve,{transports:["websocket"],reconnection:!0});return ue.current=s,s.on("connect",()=>{s.emit("register",{userId:L,isAdmin:!1})}),s.on("futures:tick",a=>{if(!a||a.id!==R.current)return;const p=Number(a.remainingSeconds??Math.ceil((a.remainingMs??0)/1e3));N(p>0?p:0)}),s.on("futures:closed",a=>{!a||a.id!==R.current||ne(a)}),()=>{s.off("connect"),s.off("futures:tick"),s.off("futures:closed"),s.disconnect(),ue.current=null}},[x,z,L]);const I=parseFloat(F||"0")>0,me=async()=>{if(!(!u||b<200||b>d||!I)){J(!0);try{const s=parseFloat(F||"0")||0,a=await re();if(!a||!a.id){J(!1);return}if(Y(a.id),R.current=a.id,v(!1),oe({futuresAmount:b,contractDuration:T,futuresStatus:u==="up"?"long":"short",openPositionPrice:s,closePositionPrice:null,leverage:1,openPositionTime:new Date,closePositionTime:null}),g(p=>[...p,{id:a.id,futuresAmount:b,contractDuration:T,futuresStatus:u==="up"?"long":"short",openPositionPrice:s,closePositionPrice:null,leverage:1,openPositionTime:new Date().toISOString(),closePositionTime:null}]),!a.expiryTime)Z(!0),te(1),N(0);else{Z(!1);const p=new Date(a.expiryTime).getTime()-Date.now();N(Math.max(0,Math.ceil(p/1e3)))}G("in-progress")}catch(s){console.error("startTrade error",s)}finally{J(!1)}}},W=async()=>{if(!z){c();return}v(!0);try{await f(ve.doUpdate(z,{closeNow:!0}));const s=await f(we.doFind(z)),a=s&&s.payload?s.payload:s;a&&a.finalized?ne({control:a.control,profitAndLossAmount:Number(a.profitAndLossAmount??0)}):v(!1)}catch{v(!1)}},re=async()=>{const s=parseFloat(F||"0")||0,a={futuresStatus:u==="up"?"long":"short",profitAndLossAmount:"",leverage:1,control:"loss",operate:"low",futureCoin:S.replace("USD","/USD"),closePositionTime:"",closePositionPrice:"",openPositionTime:new Date().toISOString(),openPositionPrice:s,contractDuration:T,futuresAmount:b};try{const p=await f(ve.doCreate(a)),V=p&&p.id?p:p&&p.payload?p.payload:null;return V&&V.id?(Y(V.id),V):(console.warn("Create did not return created record"),null)}catch(p){return console.error("create error",p),null}},pe=()=>{P.current&&(clearInterval(P.current),P.current=null),R.current=null,G("configuring"),g([]),le(null),N(0),te(0),Z(!1),Y(null),ee(""),oe(null),v(!1),E(200),A("20"),Q("")},ae=()=>{if(x!=="in-progress")return 0;if(M)return 100;const s=parseInt(T,10)||1;return(s-w)/s*100},ie=s=>{const a=Math.floor(s/60),p=s%60;return`${a.toString().padStart(2,"0")}:${p.toString().padStart(2,"0")}`},H=s=>s?new Date(s).toLocaleTimeString():"-",xe=s=>{const a=parseInt(s.target.value,10)||0;E(a)};return n?Be.createPortal(e.jsxs("div",{className:"modal-overlay",onClick:c,children:[e.jsxs("div",{className:`modal-container ${u==="up"?"up-theme":"down-theme"}`,onClick:s=>s.stopPropagation(),children:[e.jsxs("div",{className:"modal-header",children:[e.jsx("div",{className:"pair-info",children:e.jsx("div",{className:"pair-name",children:S.replace("USD","/USD")})}),e.jsx("button",{className:"close-btn",onClick:c,children:"×"})]}),x!=="configuring"&&e.jsxs("div",{className:"trade-progress-section",children:[e.jsx("div",{className:"progress-container",children:e.jsx("div",{className:"circular-progress",style:{background:`conic-gradient(${u==="up"?"#00C076":"#FF6838"} ${ae()}%, #3a3a3a ${ae()}%)`},children:e.jsxs("div",{className:"progress-inner",children:[e.jsx("div",{className:"progress-time",children:ie(M?Ue:w)}),e.jsx("div",{className:"progress-label",children:M?"Elapsed":K?"Settling…":"Remaining"})]})})}),y&&e.jsxs("div",{className:"trade-details",children:[e.jsxs("div",{className:"trade-details-row",children:[e.jsx("span",{children:"Futures Amount:"}),e.jsxs("span",{children:[y.futuresAmount," USD"]})]}),e.jsxs("div",{className:"trade-details-row",children:[e.jsx("span",{children:"Contract Duration:"}),e.jsxs("span",{children:[y.contractDuration,"s"]})]}),e.jsxs("div",{className:"trade-details-row",children:[e.jsx("span",{children:"Future Type:"}),e.jsx("span",{className:y.futuresStatus==="long"?"up-text":"down-text",children:y.futuresStatus.toUpperCase()})]}),e.jsxs("div",{className:"trade-details-row",children:[e.jsx("span",{children:"Open Position Price:"}),e.jsxs("span",{children:[y.openPositionPrice.toFixed(4)," USD"]})]}),e.jsxs("div",{className:"trade-details-row",children:[e.jsx("span",{children:"Close Position Price:"}),e.jsxs("span",{children:[y.closePositionPrice?y.closePositionPrice.toFixed(4):"-"," USD"]})]}),e.jsxs("div",{className:"trade-details-row",children:[e.jsx("span",{children:"Leverage:"}),e.jsxs("span",{children:[y.leverage,"x"]})]}),e.jsxs("div",{className:"trade-details-row",children:[e.jsx("span",{children:"Open Time:"}),e.jsx("span",{children:H(y.openPositionTime)})]}),e.jsxs("div",{className:"trade-details-row",children:[e.jsx("span",{children:"Close Time:"}),e.jsx("span",{children:H(y.closePositionTime)})]})]}),e.jsxs("div",{className:"trade-actions",children:[x==="in-progress"&&e.jsx("button",{className:"trade-action-btn secondary",onClick:W,disabled:K,children:K?"Closing…":"Close Trade"}),x==="completed"&&e.jsxs(e.Fragment,{children:[e.jsx("button",{className:"trade-action-btn secondary",onClick:c,children:"Close"}),e.jsx("button",{className:"trade-action-btn primary",onClick:pe,children:"New Trade"})]})]})]}),x==="configuring"&&e.jsxs(e.Fragment,{children:[e.jsx("div",{className:`direction-indicator ${u}-indicator`,children:u==="up"?"Predicting price will go UP":"Predicting price will go DOWN"}),e.jsxs("div",{className:"modal-content",children:[e.jsxs("div",{className:"section",children:[e.jsxs("div",{className:"section-title",children:[e.jsx("span",{children:"Contract Duration"}),e.jsx("span",{children:"Payout"})]}),e.jsx("div",{className:"options-container",children:(U?[{duration:"60",payout:"10"},{duration:"120",payout:"20"}]:[{duration:"180",payout:"10"},{duration:"240",payout:"20"},{duration:"300",payout:"40"},{duration:"360",payout:"80"},{duration:"420",payout:"160"}]).map(s=>e.jsxs("button",{className:`option-btn ${T===s.duration?"selected":""}`,onClick:()=>se(s.duration,s.payout),children:[s.duration,"s"]},s.duration))})]}),e.jsxs("div",{className:"section",children:[e.jsx("div",{className:"section-title",children:e.jsx("span",{children:"Futures Amount (USD)"})}),e.jsxs("div",{className:"amount-control",children:[e.jsx("button",{className:"amount-btn",onClick:()=>E(s=>Math.max(200,s-1)),children:"-"}),e.jsx("input",{type:"number",className:"amount-inputs",value:b,onChange:xe,min:"200",placeholder:"Enter amount"}),e.jsx("button",{className:"amount-btn",onClick:()=>E(s=>s+1),children:"+"})]}),e.jsxs("div",{className:"balance-info",children:["Available: ",ge(d)," USD"]}),B&&e.jsx("div",{className:"error-message",style:{color:"#FF6838",fontSize:"12px",marginTop:"5px"},children:B})]}),!I&&e.jsx("div",{style:{textAlign:"center",color:"#AAAAAA",fontSize:"13px",marginBottom:"10px"},children:"⏳ Waiting for live price..."}),e.jsx("button",{className:"confirm-btn",onClick:me,disabled:!u||b<200||b>d||de||!I,style:{opacity:!u||b<200||b>d||!I?.5:1,cursor:!u||b<200||b>d||!I?"not-allowed":"pointer"},children:de?"CREATING...":I?b>d?"INSUFFICIENT BALANCE":"CONFIRM ORDER":"PRICE LOADING..."})]})]})]}),e.jsx("style",{children:` 
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
`})]}),document.body):null};function qe(n){const{countFutures:c,futuretLoading:u,listFutures:f,handleOpenOrderModal:h,formatNumber:S,formatDateTime:F}=n;return e.jsxs("div",{className:"orders-container",children:[c>0&&!u&&(f==null?void 0:f.map(d=>{var g;return e.jsxs("div",{className:"order-card",onClick:()=>h(d),children:[e.jsxs("div",{className:"order-header",children:[e.jsx("div",{className:"order-pair",children:d.futureCoin||"BTC/USD"}),e.jsx("div",{className:`order-direction ${d.futuresStatus==="long"?"buy":"sell"}`,children:d.futuresStatus==="long"?i("pages.futures.actions.buyUp"):i("pages.futures.actions.buyDown")})]}),e.jsxs("div",{className:`order-status ${d.finalized?"closed":"open"}`,children:["● ",d.finalized?i("pages.futures.orderDetails.closed"):i("pages.futures.orderDetails.open")]}),e.jsxs("div",{className:"order-details",children:[e.jsxs("div",{className:"order-row",children:[e.jsx("span",{className:"order-label",children:i("pages.futures.orderDetails.futuresAmount")}),e.jsxs("span",{className:"order-value",children:["$",d.futuresAmount]})]}),e.jsxs("div",{className:"order-row",children:[e.jsx("span",{className:"order-label",children:i("pages.futures.orderDetails.openPositionPrice")}),e.jsx("span",{className:"order-value",children:S((g=d==null?void 0:d.openPositionPrice)==null?void 0:g.toString(),(d==null?void 0:d.openPositionPrice)>1e3?0:2)})]}),e.jsxs("div",{className:"order-row",children:[e.jsx("span",{className:"order-label",children:i("pages.futures.orderDetails.openPositionTime")}),e.jsx("span",{className:"order-value",children:F(d.openPositionTime)})]}),e.jsxs("div",{className:"order-row",children:[e.jsx("span",{className:"order-label",children:i("pages.futures.orderDetails.leverage")}),e.jsxs("span",{className:"order-value",children:[d.leverage,"x"]})]})]})]},d.id)})),f.length===0&&!u&&e.jsxs("div",{className:"no-orders",children:[e.jsx("i",{className:"fas fa-file-invoice"}),e.jsx("div",{children:i("pages.futures.list.noOrders")})]}),e.jsx("style",{children:` 
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
            `})]})}const D=n=>{const c=n.toUpperCase();return["BTCUSD","ETHUSD","XRPUSD","SOLUSD","ADAUSD","DOGEUSD","DOTUSD","AVAXUSD","LINKUSD","MATICUSD","UNIUSD","ATOMUSD","LTCUSD","BCHUSD","NEARUSD","ALGOUSD","VETUSD","FILUSD","THETAUSD","AXSUSD","SANDUSD","MANAUSD","ENJUSD","CHZUSD","APEUSD"].includes(c)?`BINANCE:${c.replace("USD","")}USDT`:["EURUSD","GBPUSD","USDJPY","AUDUSD","USDCAD","USDCHF","NZDUSD","EURGBP","EURJPY","GBPJPY","AUDJPY","EURAUD","GBPAUD","USDMXN","USDTRY","USDZAR","USDSGD","USDHKD","USDKRW","USDINR","EURCHF","EURNZD","GBPEUR","AUDNZD","CADJPY","CHFJPY","NZDJPY","SGDJPY","HKDJPY","ZARJPY"].includes(c)?`FX:${c}`:["XAUUSD","XAGUSD","XPTUSD","XPDUSD","XAUEUR","XAGEUR","XPTEUR","XAUGBP","XAGGBP","USOIL","UKOIL","BRENT","WTI","CRUDE","NGAS","HEAT","GAS"].includes(c)?`OANDA:${c}`:["US30","US500","NAS100","US2000","GER40","UK100","FRA40","EU50","JP225","HK50","AUS200","TWII","KR100","IN50","TECH100"].includes(c)?`TVC:${c}`:c},Qe={EUR:"eu",USD:"us",GBP:"gb",JPY:"jp",AUD:"au",CAD:"ca",CHF:"ch",NZD:"nz",MXN:"mx",TRY:"tr",ZAR:"za",SGD:"sg",HKD:"hk",KRW:"kr",INR:"in",XAU:"au",XAG:"au",XPT:"au",XPD:"au",USOIL:"us",UKOIL:"gb",BRENT:"gb",WTI:"us",CRUDE:"us",NGAS:"us",HEAT:"us",GAS:"us",US30:"us",US500:"us",NAS100:"us",US2000:"us",GER40:"de",UK100:"gb",FRA40:"fr",EU50:"eu",JP225:"jp",HK50:"hk",AUS200:"au",TWII:"tw",KR100:"kr",IN50:"in",TECH100:"us",BTC:"generic",ETH:"generic",XRP:"generic",SOL:"generic",ADA:"generic",DOGE:"generic",DOT:"generic",AVAX:"generic",LINK:"generic",MATIC:"generic",UNI:"generic",ATOM:"generic",LTC:"generic",BCH:"generic",NEAR:"generic",ALGO:"generic",VET:"generic",FIL:"generic",THETA:"generic",AXS:"generic",SAND:"generic",MANA:"generic",ENJ:"generic",CHZ:"generic",APE:"generic"},Ce=[{symbol:"EURUSD",name:"EUR / USD"},{symbol:"GBPUSD",name:"GBP / USD"},{symbol:"USDJPY",name:"USD / JPY"},{symbol:"AUDUSD",name:"AUD / USD"},{symbol:"USDCAD",name:"USD / CAD"},{symbol:"USDCHF",name:"USD / CHF"},{symbol:"NZDUSD",name:"NZD / USD"},{symbol:"EURGBP",name:"EUR / GBP"},{symbol:"EURJPY",name:"EUR / JPY"},{symbol:"GBPJPY",name:"GBP / JPY"},{symbol:"AUDJPY",name:"AUD / JPY"},{symbol:"EURAUD",name:"EUR / AUD"},{symbol:"GBPAUD",name:"GBP / AUD"},{symbol:"USDMXN",name:"USD / MXN"},{symbol:"USDTRY",name:"USD / TRY"},{symbol:"USDZAR",name:"USD / ZAR"},{symbol:"USDSGD",name:"USD / SGD"},{symbol:"USDHKD",name:"USD / HKD"},{symbol:"USDKRW",name:"USD / KRW"},{symbol:"USDINR",name:"USD / INR"},{symbol:"EURCHF",name:"EUR / CHF"},{symbol:"EURNZD",name:"EUR / NZD"},{symbol:"GBPEUR",name:"GBP / EUR"},{symbol:"AUDNZD",name:"AUD / NZD"},{symbol:"CADJPY",name:"CAD / JPY"},{symbol:"CHFJPY",name:"CHF / JPY"},{symbol:"NZDJPY",name:"NZD / JPY"},{symbol:"SGDJPY",name:"SGD / JPY"},{symbol:"HKDJPY",name:"HKD / JPY"},{symbol:"ZARJPY",name:"ZAR / JPY"},{symbol:"XAUUSD",name:"Gold"},{symbol:"XAGUSD",name:"Silver"},{symbol:"XPTUSD",name:"Platinum"},{symbol:"XPDUSD",name:"Palladium"},{symbol:"XAUEUR",name:"Gold / EUR"},{symbol:"XAGEUR",name:"Silver / EUR"},{symbol:"XPTEUR",name:"Platinum / EUR"},{symbol:"XAUGBP",name:"Gold / GBP"},{symbol:"XAGGBP",name:"Silver / GBP"},{symbol:"USOIL",name:"US Oil"},{symbol:"UKOIL",name:"UK Oil"},{symbol:"BRENT",name:"Brent"},{symbol:"WTI",name:"WTI"},{symbol:"CRUDE",name:"Crude"},{symbol:"NGAS",name:"Natural Gas"},{symbol:"HEAT",name:"Heating Oil"},{symbol:"GAS",name:"Gasoline"},{symbol:"US30",name:"Dow 30"},{symbol:"US500",name:"S&P 500"},{symbol:"NAS100",name:"Nasdaq 100"},{symbol:"US2000",name:"Russell 2000"},{symbol:"GER40",name:"DAX"},{symbol:"UK100",name:"FTSE 100"},{symbol:"FRA40",name:"CAC 40"},{symbol:"EU50",name:"Euro Stoxx 50"},{symbol:"JP225",name:"Nikkei 225"},{symbol:"HK50",name:"Hang Seng"},{symbol:"AUS200",name:"ASX 200"},{symbol:"TWII",name:"Taiwan"},{symbol:"KR100",name:"KOSPI"},{symbol:"IN50",name:"Nifty 50"},{symbol:"TECH100",name:"Tech 100"},{symbol:"BTCUSD",name:"Bitcoin"},{symbol:"ETHUSD",name:"Ethereum"},{symbol:"XRPUSD",name:"Ripple"},{symbol:"SOLUSD",name:"Solana"},{symbol:"ADAUSD",name:"Cardano"},{symbol:"DOGEUSD",name:"Dogecoin"},{symbol:"DOTUSD",name:"Polkadot"},{symbol:"AVAXUSD",name:"Avalanche"},{symbol:"LINKUSD",name:"Chainlink"},{symbol:"MATICUSD",name:"Polygon"},{symbol:"UNIUSD",name:"Uniswap"},{symbol:"ATOMUSD",name:"Cosmos"},{symbol:"LTCUSD",name:"Litecoin"},{symbol:"BCHUSD",name:"Bitcoin Cash"},{symbol:"NEARUSD",name:"Near"},{symbol:"ALGOUSD",name:"Algorand"},{symbol:"VETUSD",name:"VeChain"},{symbol:"FILUSD",name:"Filecoin"},{symbol:"THETAUSD",name:"Theta"},{symbol:"AXSUSD",name:"Axie Infinity"},{symbol:"SANDUSD",name:"The Sandbox"},{symbol:"MANAUSD",name:"Decentraland"},{symbol:"ENJUSD",name:"Enjin Coin"},{symbol:"CHZUSD",name:"Chiliz"},{symbol:"APEUSD",name:"ApeCoin"}];function lo(){console.log("Futures component rendering");const n=We(),c=$(Je.selectRows),u=$(_.selectRows),f=$(_.pendingRows),h=$(_.pendingcount),S=$(_.pendingLoading),F=$(_.selectLoading),d=$(_.selectCount),g=$(He.selectCurrentUser),U=t.useRef(null),L=t.useRef(null),j=t.useRef(null),T=t.useRef(null),[Q,be]=t.useState([]),[A,b]=t.useState(null),[E,x]=t.useState(null),G=t.useRef({}),w=t.useRef({}),N=t.useRef({}),[m,le]=t.useState("EURUSD"),[B,X]=t.useState("openOrders"),[z,Y]=t.useState(!1),[ce,ee]=t.useState(null),[de,J]=t.useState(!1),[y,oe]=t.useState(null),[K,v]=t.useState(!1),[M,Z]=t.useState(!0),[Ue,te]=t.useState(!0),[ue,R]=t.useState(0),[P,ge]=t.useState([]),[se,ne]=t.useState(!1);t.useEffect(()=>{const o=r=>{se&&ce&&(r.preventDefault(),r.returnValue="")};return window.addEventListener("beforeunload",o),()=>{window.removeEventListener("beforeunload",o)}},[se,ce]),t.useEffect(()=>{ne((g==null?void 0:g.accountType)==="demo")},[g]);const O=t.useCallback(o=>`~m~${o.length}~m~${o}`,[]),I=t.useCallback(o=>{const r=[];let l=o;for(;l.length>0&&l.startsWith("~m~");){const C=l.indexOf("~m~",3),he=parseInt(l.substring(3,C)),ye=l.substr(C+3,he);r.push(ye),l=l.substr(C+3+he)}return r},[]),me=t.useCallback(o=>{try{const r=o.replace(/^=\{/,"{");return JSON.parse(r).symbol||"UNKNOWN"}catch{return o}},[]),W=t.useCallback(o=>{const r=U.current,l=L.current;!r||r.readyState!==WebSocket.OPEN||!l||j.current!==o&&(j.current&&r.send(O(JSON.stringify({m:"quote_remove_symbols",p:[l,j.current]}))),r.send(O(JSON.stringify({m:"quote_add_symbols",p:[l,o]}))),j.current=o,be([]),b(null),x(null),Z(!0),delete w.current[o],delete N.current[o],delete G.current[o])},[O]),re=t.useCallback(()=>{U.current&&(U.current.close(),U.current=null);const o=window.location.protocol==="https:"?"wss:":"ws:",r=new WebSocket(`${o}//${window.location.host}/ws/socket.io/websocket`);U.current=r,r.onopen=()=>{const l="qs_"+Math.random().toString(36).substring(2,12);L.current=l,r.send(O(JSON.stringify({m:"quote_create_session",p:[l]}))),r.send(O(JSON.stringify({m:"quote_set_fields",p:[l,"ask","bid","ask_size","bid_size"]}))),W(D(pe.current))},r.onmessage=l=>{const C=l.data;if(C.startsWith("~h~")){r.send(C);return}I(C).forEach(ye=>{try{const De=JSON.parse(ye);if(De.m==="qsd"){const Fe=De.p[1],je=me(Fe.n),Se=Fe.v;if(!Se)return;const Me={symbol:je,ask:Se.ask??0,bid:Se.bid??0};be(Oe=>[...Oe.filter($e=>$e.symbol!==je),Me])}}catch{}})},r.onclose=l=>{j.current=null,l.wasClean||(T.current=setTimeout(()=>{re()},3e3))},r.onerror=l=>{console.error("WebSocket error:",l)}},[O,I,me,W]),pe=t.useRef(m);t.useEffect(()=>{pe.current=m},[m]),t.useEffect(()=>(re(),()=>{T.current&&clearTimeout(T.current),U.current&&(U.current.close(),U.current=null)}),[re]),t.useEffect(()=>{W(D(m))},[m,W]),t.useEffect(()=>{const o=Q.find(l=>l.symbol===D(m));if(!o||!o.ask||!o.bid)return;const r=(o.ask+o.bid)/2;if(b(r),Z(!1),G.current[D(m)]===void 0)G.current[D(m)]=r,x(0);else{const l=G.current[D(m)],C=(r-l)/l*100;x(C)}(!w.current[D(m)]||r>w.current[D(m)])&&(w.current[D(m)]=r),(!N.current[D(m)]||r<N.current[D(m)])&&(N.current[D(m)]=r)},[Q,m]);const ae=t.useCallback(()=>{if((c==null?void 0:c.length)>0){const o=c.find(r=>r.symbol==="USDT");R((o==null?void 0:o.amount)||0)}},[c]);t.useEffect(()=>{ae()},[ae]),t.useEffect(()=>{const o=setTimeout(()=>te(!1),1500);return()=>clearTimeout(o)},[]),t.useEffect(()=>{let o=!0;return(async()=>{try{await Promise.all([n(q.doFetchPending()),n(Pe.doFetch())])}catch(l){o&&console.error("Error fetching data:",l)}})(),()=>{o=!1}},[n]);const ie=t.useMemo(()=>B==="openOrders"?{count:h,loading:S,list:Array.isArray(f)?f:[]}:{count:d,loading:F,list:Array.isArray(u)?u:[]},[B,h,S,f,d,F,u]),H=t.useCallback((o,r)=>{if(o==null)return"0.00";const l=typeof o=="string"?parseFloat(o):o;return isNaN(l)?"0.00":l.toFixed(r??5)},[]),xe=t.useCallback(o=>{if(!o)return i("pages.assetsDetail.status.pending");try{const r=new Date(o);if(isNaN(r.getTime()))return o;const l=new Date;return r.toDateString()===l.toDateString()?i("pages.history.dateFormats.today",r.toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"})):i("pages.history.dateFormats.yesterday",r.toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"}))}catch(r){return console.error("Error formatting date:",r,o),o}},[]),s=t.useCallback(o=>{if(!o)return i("pages.assetsDetail.status.pending");try{const r=new Date(o);return isNaN(r.getTime())?o:`${r.toLocaleDateString([],{year:"numeric",month:"short",day:"numeric"})} ${r.toLocaleTimeString([],{hour:"2-digit",minute:"2-digit",second:"2-digit"})}`}catch(r){return console.error("Error formatting date:",r,o),o}},[]),a=t.useCallback((o,r=2)=>{if(o==null)return"0.00";const l=typeof o=="string"?parseFloat(o):o;return isNaN(l)?"0.00":l.toFixed(r)},[]),p=t.useMemo(()=>{const o=m.slice(0,3);return`https://flagcdn.com/w40/${Qe[o]||o.toLowerCase()}.png`},[m]),V=t.useCallback(()=>J(!0),[]),ke=t.useCallback(()=>J(!1),[]),Te=t.useCallback(o=>{le(o),J(!1)},[]),Ae=t.useCallback(o=>{if((h||0)>0){Xe.error(i("pages.futures.activeTradeInProgress"));return}n(Pe.doFetch()),ee(o),Y(!0)},[n,h]),Ee=t.useCallback(()=>{Y(!1),ee(null)},[]),Re=t.useCallback(o=>{oe(o),v(!0)},[]),Ie=t.useCallback(()=>{v(!1),oe(null)},[]),Ne=t.useCallback(o=>{o==="openOrders"?(X("openOrders"),n(q.doFetchPending())):(X("recentOrders"),n(q.doFetch()))},[n]),fe=({width:o="100%",height:r="1em"})=>e.jsx("div",{className:"loading-placeholder",style:{width:o,height:r}}),Le=t.useMemo(()=>{const o=Ce.find(r=>r.symbol===m);return(o==null?void 0:o.name)||m.replace(/(.{3})(.{3})/,"$1 / $2")},[m]),Ge=w.current[D(m)]??A??0,ze=N.current[D(m)]??A??0;return e.jsxs("div",{className:"container",children:[e.jsxs("div",{className:"header",children:[e.jsxs("div",{className:"header-top",children:[e.jsxs("div",{className:"market-info",children:[e.jsx("div",{className:"market-icon",children:e.jsx("img",{src:p,style:{width:30,height:30,borderRadius:"50%",objectFit:"cover"},alt:m,onError:o=>{o.target.style.display="none"}})}),e.jsx("div",{className:"market-name",children:Le}),e.jsx("div",{className:"market-change",style:{color:(E??0)<0?"#FF6838":"#00C076"},children:A!==null?`${(E??0)>0?"+":""}${(E??0).toFixed(2)}%`:e.jsx(fe,{width:"50px",height:"16px"})})]}),e.jsx("div",{className:"additional-actions",onClick:V,children:e.jsx("i",{className:"fas fa-filter"})})]}),e.jsx("div",{className:"market-price",style:{color:(E??0)<0?"#FF6838":"#39FF14"},children:A!==null?`$${H(A)}`:e.jsx(fe,{width:"120px",height:"28px"})}),e.jsxs("div",{className:"market-stats",children:[e.jsxs("span",{children:[i("pages.marketDetail.stats.high"),": "," ",A!==null?`$${H(Ge)}`:e.jsx(fe,{width:"80px",height:"12px"})]}),e.jsxs("span",{children:[i("pages.marketDetail.stats.low"),": "," ",A!==null?`$${H(ze)}`:e.jsx(fe,{width:"80px",height:"12px"})]})]})]}),e.jsx(Ze,{symbol:m,height:400},m),e.jsxs("div",{className:"future-action-buttons",children:[e.jsx("button",{className:"action-button buy-button",onClick:()=>Ae("up"),children:i("pages.futures.actions.buyUp")}),e.jsx("button",{className:"action-button sell-button",onClick:()=>Ae("down"),children:i("pages.futures.actions.buyDown")})]}),e.jsxs("div",{className:"section-tabs",children:[e.jsxs("div",{className:`tab ${B==="openOrders"?"active":""}`,onClick:()=>Ne("openOrders"),children:[i("pages.futures.tabs.openOrders")," (",h||0,")"]}),e.jsxs("div",{className:`tab ${B==="recentOrders"?"active":""}`,onClick:()=>Ne("recentOrders"),children:[i("pages.futures.tabs.recentOrders")," (",d||0,")"]})]}),e.jsx(qe,{countFutures:ie.count,futuretLoading:ie.loading,listFutures:ie.list,handleOpenOrderModal:Re,formatNumber:H,formatDateTime:xe}),K&&y&&e.jsx(eo,{selectedOrder:y,onClose:Ie,formatDateTimeDetailed:s,safeToFixed:a}),e.jsx(_e,{isOpen:z,onClose:Ee,direction:ce,dispatch:n,listAssets:c,selectedCoin:m,marketPrice:(A==null?void 0:A.toString())??"0",availableBalance:ue,setOpeningOrders:ge,isDemoAccount:se,currentUserId:g==null?void 0:g.id}),e.jsx(Ye,{isOpen:de,onClose:ke,selectedCoin:m,onCoinSelect:Te,availableCoins:Ce.map(o=>({symbol:o.symbol,name:o.name})),title:i("pages.marketDetail.coinSelector.title")}),e.jsx("style",{children:`
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
      `})]})}const eo=({selectedOrder:n,onClose:c,formatDateTimeDetailed:u,safeToFixed:f})=>e.jsx("div",{className:"modal-overlays",onClick:c,children:e.jsxs("div",{className:"modal-content",onClick:h=>h.stopPropagation(),children:[e.jsxs("div",{className:"modal-header",children:[e.jsx("h2",{children:i("pages.futures.orderDetails.title")}),e.jsx("button",{className:"modal-close",onClick:c,children:e.jsx("i",{className:"fas fa-times"})})]}),e.jsxs("div",{className:"modal-body",children:[e.jsxs("div",{className:"order-detail-section",children:[e.jsxs("div",{className:"detail-header",children:[e.jsx("span",{className:"detail-pair",children:n.symbol||n.pair}),e.jsx("span",{className:`detail-direction ${n.futuresStatus==="long"||n.direction==="BUY UP"?"buy":"sell"}`,children:n.futuresStatus==="long"?i("pages.futures.actions.buyUp"):n.futuresStatus==="short"?i("pages.futures.actions.buyDown"):n.direction})]}),e.jsxs("div",{className:`detail-status ${n.finalized?"closed":"open"}`,children:["● ",n.finalized?i("pages.futures.orderDetails.closed"):i("pages.futures.orderDetails.open")]})]}),e.jsxs("div",{className:"order-detail-section",children:[e.jsx(k,{label:i("pages.futures.orderDetails.futuresAmount"),value:`${n.futuresAmount||n.investment} USD`}),n.contractDuration&&e.jsx(k,{label:i("pages.futures.orderDetails.contractDuration"),value:`${n.contractDuration} ${i("pages.futures.orderDetails.seconds")}`}),!n.finalized&&!n.closePositionTime&&e.jsx(oo,{order:n}),e.jsx(k,{label:i("pages.futures.orderDetails.futuresStatus"),value:n.closePositionTime?i("pages.futures.orderDetails.completed"):i("pages.futures.orderDetails.open")}),e.jsx(k,{label:i("pages.futures.orderDetails.openPositionPrice"),value:n.openPositionPrice||n.openPrice}),e.jsx(k,{label:i("pages.futures.orderDetails.openPositionTime"),value:u(n.openPositionTime||n.openTime)}),n.closePositionPrice&&e.jsx(k,{label:i("pages.futures.orderDetails.closePositionPrice"),value:n.closePositionPrice}),n.closePositionTime&&e.jsx(k,{label:i("pages.futures.orderDetails.closePositionTime"),value:u(n.closePositionTime)}),e.jsx(k,{label:i("pages.futures.orderDetails.profitLossAmount"),value:n.profitAndLossAmount||n.pnl?`${f(n.profitAndLossAmount||n.pnl,2)} USD`:"__",className:n.control==="profit"?"profit":"loss"}),e.jsx(k,{label:i("pages.futures.orderDetails.leverage"),value:`${n.leverage}X`})]})]}),e.jsx("div",{className:"modal-footer",children:e.jsx("button",{className:"modal-button",onClick:c,children:i("pages.futures.orderDetails.done")})})]})}),k=({label:n,value:c,className:u=""})=>e.jsxs("div",{className:"detail-row",children:[e.jsx("span",{className:"detail-label",children:n}),e.jsx("span",{className:`detail-value ${u}`,children:c})]}),oo=({order:n})=>{const c=parseInt(n.contractDuration,10)||0,u=!n.expiryTime&&c<=0,f=()=>new Date(n.openPositionTime||n.openTime).getTime(),h=()=>{if(u)return Math.max(1,Math.floor((Date.now()-f())/1e3));const j=n.expiryTime?new Date(n.expiryTime).getTime():f()+c*1e3;return Math.max(0,Math.ceil((j-Date.now())/1e3))},[S,F]=t.useState(h);t.useEffect(()=>{const j=setInterval(()=>F(h()),1e3);return()=>clearInterval(j)},[n.id,n.expiryTime]);const d=Math.floor(S/60),g=S%60,U=`${d>0?`${d}m `:""}${g}s`,L=u||S>0?U:i("pages.futures.orderDetails.closing");return e.jsx(k,{label:u?i("pages.futures.orderDetails.elapsedTime"):i("pages.futures.orderDetails.remainingTime"),value:L,className:u||S>0?"profit":""})};export{lo as default};
