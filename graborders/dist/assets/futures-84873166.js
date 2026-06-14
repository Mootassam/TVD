import{i as t,O,S as Me,N as je,T as Be,k as e,j as a,u as z,w as Je,M as K,q as He,z as Pe}from"./index-caa1b5dd.js";import{C as Xe}from"./CoinSelectorSidebar-8d6a3ca1.js";import{T as Ye}from"./TradingViewChart-6d6078bd.js";import{u as Ke}from"./useDispatch-5f691ae2.js";const Ze=({isOpen:r,onClose:u,direction:p,dispatch:f,listAssets:C,selectedCoin:L,marketPrice:I,availableBalance:m,setOpeningOrders:A,isDemoAccount:P=!1})=>{const[D,J]=t.useState("120"),[Q,Z]=t.useState("20"),[l,$]=t.useState(200),[S,U]=t.useState("configuring"),[k,T]=t.useState(0),[H,c]=t.useState(null),[ee,G]=t.useState(""),[X,W]=t.useState(null),[le,N]=t.useState(""),[V,_]=t.useState(!1),[g,q]=t.useState(null),oe=n=>Number.isFinite(n)?n.toLocaleString(void 0,{minimumFractionDigits:2,maximumFractionDigits:2}):"0.00",ce=(n,d)=>{J(n),Z(d)};t.useEffect(()=>(r?document.body.style.overflow="hidden":document.body.style.overflow="unset",()=>{document.body.style.overflow="unset"}),[r]),t.useEffect(()=>{f(O.doFetch())},[f]),t.useEffect(()=>{l<200?G("Minimum amount is 200 USD"):l>m?G("Insufficient balance"):G("")},[l,m]),t.useEffect(()=>{let n=null;return S==="in-progress"&&(k>0?n=setInterval(()=>{T(d=>d-1)},1e3):(async()=>await te())()),()=>{n&&clearInterval(n)}},[S,k]);const E=parseFloat(I||"0")>0,ye=async()=>{if(!(!p||l<200||l>m||!E)){_(!0);try{const n=parseFloat(I||"0")||0,d=await De();if(!d||!d.id){_(!1);return}W(d.id),q({futuresAmount:l,contractDuration:D,futuresStatus:p==="up"?"long":"short",openPositionPrice:n,closePositionPrice:null,leverage:1,openPositionTime:new Date,closePositionTime:null}),A(y=>[...y,{id:d.id,futuresAmount:l,contractDuration:D,futuresStatus:p==="up"?"long":"short",openPositionPrice:n,closePositionPrice:null,leverage:1,openPositionTime:new Date().toISOString(),closePositionTime:null}]);const b=parseInt(D,10)||0;T(b),U("in-progress")}catch(n){console.error("startTrade error",n)}finally{_(!1)}}},te=async()=>{if(A([]),!X){c("loss"),N(`-${l.toFixed(2)} USD`),U("completed");return}try{const n=await f(Me.doFind(X)),d=n&&n.payload?n.payload:n;if(!d){c("loss"),N(`-${l.toFixed(2)} USD`),U("completed");return}if(d.finalized){const j=d.control==="profit",fe=Number(d.profitAndLossAmount??(j?ue(l,1,Q):-l));c(j?"win":"loss"),N(`${j?"+":""}${fe.toFixed(2)} USD`),U("completed"),f(O.doFetchPending()),f(O.doFetch());return}const b=d.futuresStatus==="long",y=new Date;let x;P?x=Math.random()<.85:x=Math.random()<.3;const F=d.openPositionPrice,re=.002+Math.random()*(.005-.002),M=F*(re/100);let B;x?B=b?F+M:F-M:B=b?F-M:F+M;let w;if(x){const j=.1+Math.random()*.1;w=l*j}else{const j=.1+Math.random()*.19999999999999998;w=l*j}const me=x?l+w:-w,pe={control:x?"profit":"loss",closePositionPrice:B,closePositionTime:y.toISOString(),profitAndLossAmount:me};try{await f(je.doUpdate(X,pe)),c(x?"win":"loss"),N(`${x?"+":"-"}${w.toFixed(2)} USD`),U("completed"),f(O.doFetchPending()),f(O.doFetch())}catch(j){console.error("Error finalizing trade:",j),c("loss"),N(`-${l.toFixed(2)} USD`),U("completed")}}catch(n){console.error("completeTrade error",n),c("loss"),N(`-${l.toFixed(2)} USD`),U("completed")}},De=async()=>{const n=parseFloat(I||"0")||0,d={futuresStatus:p==="up"?"long":"short",profitAndLossAmount:"",leverage:1,control:"loss",operate:"low",futureCoin:L.replace("USD","/USD"),closePositionTime:"",closePositionPrice:"",openPositionTime:new Date().toISOString(),openPositionPrice:n,contractDuration:D,futuresAmount:l};try{const b=await f(je.doCreate(d)),y=b&&b.id?b:b&&b.payload?b.payload:null;return y&&y.id?(W(y.id),y):(console.warn("Create did not return created record"),null)}catch(b){return console.error("create error",b),null}},de=()=>{U("configuring"),A([]),c(null),T(0),W(null),N(""),q(null),$(200),Z("20"),J("120")},ue=(n,d,b)=>{const y=Number.isFinite(n)?n:0,x=typeof d=="number"?d:parseInt(d,10)||0,F=parseInt(b,10)||0;return y*x*F/100},se=()=>{if(S!=="in-progress")return 0;const n=parseInt(D,10)||1;return(n-k)/n*100},Se=n=>{const d=Math.floor(n/60),b=n%60;return`${d.toString().padStart(2,"0")}:${b.toString().padStart(2,"0")}`},ne=n=>n?new Date(n).toLocaleTimeString():"-",Y=n=>{const d=parseInt(n.target.value,10)||0;$(d)};return r?Be.createPortal(e.jsxs("div",{className:"modal-overlay",onClick:u,children:[e.jsxs("div",{className:`modal-container ${p==="up"?"up-theme":"down-theme"}`,onClick:n=>n.stopPropagation(),children:[e.jsxs("div",{className:"modal-header",children:[e.jsx("div",{className:"pair-info",children:e.jsx("div",{className:"pair-name",children:L.replace("USD","/USD")})}),e.jsx("button",{className:"close-btn",onClick:u,children:"×"})]}),S!=="configuring"&&e.jsxs("div",{className:"trade-progress-section",children:[e.jsx("div",{className:"progress-container",children:e.jsx("div",{className:"circular-progress",style:{background:`conic-gradient(${p==="up"?"#00C076":"#FF6838"} ${se()}%, #3a3a3a ${se()}%)`},children:e.jsxs("div",{className:"progress-inner",children:[e.jsx("div",{className:"progress-time",children:Se(k)}),e.jsx("div",{className:"progress-label",children:"Remaining"})]})})}),g&&e.jsxs("div",{className:"trade-details",children:[e.jsxs("div",{className:"trade-details-row",children:[e.jsx("span",{children:"Futures Amount:"}),e.jsxs("span",{children:[g.futuresAmount," USD"]})]}),e.jsxs("div",{className:"trade-details-row",children:[e.jsx("span",{children:"Contract Duration:"}),e.jsxs("span",{children:[g.contractDuration,"s"]})]}),e.jsxs("div",{className:"trade-details-row",children:[e.jsx("span",{children:"Future Type:"}),e.jsx("span",{className:g.futuresStatus==="long"?"up-text":"down-text",children:g.futuresStatus.toUpperCase()})]}),e.jsxs("div",{className:"trade-details-row",children:[e.jsx("span",{children:"Open Position Price:"}),e.jsxs("span",{children:[g.openPositionPrice.toFixed(4)," USD"]})]}),e.jsxs("div",{className:"trade-details-row",children:[e.jsx("span",{children:"Close Position Price:"}),e.jsxs("span",{children:[g.closePositionPrice?g.closePositionPrice.toFixed(4):"-"," USD"]})]}),e.jsxs("div",{className:"trade-details-row",children:[e.jsx("span",{children:"Leverage:"}),e.jsxs("span",{children:[g.leverage,"x"]})]}),e.jsxs("div",{className:"trade-details-row",children:[e.jsx("span",{children:"Open Time:"}),e.jsx("span",{children:ne(g.openPositionTime)})]}),e.jsxs("div",{className:"trade-details-row",children:[e.jsx("span",{children:"Close Time:"}),e.jsx("span",{children:ne(g.closePositionTime)})]})]}),e.jsxs("div",{className:"trade-actions",children:[S==="in-progress"&&e.jsx("button",{className:"trade-action-btn keep-buying",onClick:u,children:"Keep Buying"}),S==="completed"&&e.jsxs(e.Fragment,{children:[e.jsx("button",{className:"trade-action-btn secondary",onClick:u,children:"Close"}),e.jsx("button",{className:"trade-action-btn primary",onClick:de,children:"New Trade"})]})]})]}),S==="configuring"&&e.jsxs(e.Fragment,{children:[e.jsx("div",{className:`direction-indicator ${p}-indicator`,children:p==="up"?"Predicting price will go UP":"Predicting price will go DOWN"}),e.jsxs("div",{className:"modal-content",children:[e.jsxs("div",{className:"section",children:[e.jsxs("div",{className:"section-title",children:[e.jsx("span",{children:"Contract Duration"}),e.jsx("span",{children:"Payout"})]}),e.jsx("div",{className:"options-container",children:[{duration:"60",payout:"10"},{duration:"120",payout:"20"},{duration:"240",payout:"40"},{duration:"300",payout:"80"},{duration:"360",payout:"160"},{duration:"420",payout:"320"}].map(n=>e.jsxs("button",{className:`option-btn ${D===n.duration?"selected":""}`,onClick:()=>ce(n.duration,n.payout),children:[n.duration,"s"]},n.duration))})]}),e.jsxs("div",{className:"section",children:[e.jsx("div",{className:"section-title",children:e.jsx("span",{children:"Futures Amount (USD)"})}),e.jsxs("div",{className:"amount-control",children:[e.jsx("button",{className:"amount-btn",onClick:()=>$(n=>Math.max(200,n-1)),children:"-"}),e.jsx("input",{type:"number",className:"amount-inputs",value:l,onChange:Y,min:"200",placeholder:"Enter amount"}),e.jsx("button",{className:"amount-btn",onClick:()=>$(n=>n+1),children:"+"})]}),e.jsxs("div",{className:"balance-info",children:["Available: ",oe(m)," USD"]}),ee&&e.jsx("div",{className:"error-message",style:{color:"#FF6838",fontSize:"12px",marginTop:"5px"},children:ee})]}),!E&&e.jsx("div",{style:{textAlign:"center",color:"#AAAAAA",fontSize:"13px",marginBottom:"10px"},children:"⏳ Waiting for live price..."}),e.jsx("button",{className:"confirm-btn",onClick:ye,disabled:!p||l<200||l>m||V||!E,style:{opacity:!p||l<200||l>m||!E?.5:1,cursor:!p||l<200||l>m||!E?"not-allowed":"pointer"},children:V?"CREATING...":E?l>m?"INSUFFICIENT BALANCE":"CONFIRM ORDER":"PRICE LOADING..."})]})]})]}),e.jsx("style",{children:` 
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
`})]}),document.body):null};function We(r){const{countFutures:u,futuretLoading:p,listFutures:f,handleOpenOrderModal:C,formatNumber:L,formatDateTime:I}=r;return e.jsxs("div",{className:"orders-container",children:[u>0&&!p&&(f==null?void 0:f.map(m=>{var A;return e.jsxs("div",{className:"order-card",onClick:()=>C(m),children:[e.jsxs("div",{className:"order-header",children:[e.jsx("div",{className:"order-pair",children:m.futureCoin||"BTC/USD"}),e.jsx("div",{className:`order-direction ${m.futuresStatus==="long"?"buy":"sell"}`,children:m.futuresStatus==="long"?a("pages.futures.actions.buyUp"):a("pages.futures.actions.buyDown")})]}),e.jsxs("div",{className:`order-status ${m.finalized?"closed":"open"}`,children:["● ",m.finalized?a("pages.futures.orderDetails.closed"):a("pages.futures.orderDetails.open")]}),e.jsxs("div",{className:"order-details",children:[e.jsxs("div",{className:"order-row",children:[e.jsx("span",{className:"order-label",children:a("pages.futures.orderDetails.futuresAmount")}),e.jsxs("span",{className:"order-value",children:["$",m.futuresAmount]})]}),e.jsxs("div",{className:"order-row",children:[e.jsx("span",{className:"order-label",children:a("pages.futures.orderDetails.openPositionPrice")}),e.jsx("span",{className:"order-value",children:L((A=m==null?void 0:m.openPositionPrice)==null?void 0:A.toString(),(m==null?void 0:m.openPositionPrice)>1e3?0:2)})]}),e.jsxs("div",{className:"order-row",children:[e.jsx("span",{className:"order-label",children:a("pages.futures.orderDetails.openPositionTime")}),e.jsx("span",{className:"order-value",children:I(m.openPositionTime)})]}),e.jsxs("div",{className:"order-row",children:[e.jsx("span",{className:"order-label",children:a("pages.futures.orderDetails.leverage")}),e.jsxs("span",{className:"order-value",children:[m.leverage,"x"]})]})]})]},m.id)})),f.length===0&&!p&&e.jsxs("div",{className:"no-orders",children:[e.jsx("i",{className:"fas fa-file-invoice"}),e.jsx("div",{children:a("pages.futures.list.noOrders")})]}),e.jsx("style",{children:` 
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
            `})]})}const h=r=>{const u=r.toUpperCase();return["BTCUSD","ETHUSD","XRPUSD","SOLUSD","ADAUSD","DOGEUSD","DOTUSD","AVAXUSD","LINKUSD","MATICUSD","UNIUSD","ATOMUSD","LTCUSD","BCHUSD","NEARUSD","ALGOUSD","VETUSD","FILUSD","THETAUSD","AXSUSD","SANDUSD","MANAUSD","ENJUSD","CHZUSD","APEUSD"].includes(u)?`BINANCE:${u.replace("USD","")}USDT`:["EURUSD","GBPUSD","USDJPY","AUDUSD","USDCAD","USDCHF","NZDUSD","EURGBP","EURJPY","GBPJPY","AUDJPY","EURAUD","GBPAUD","USDMXN","USDTRY","USDZAR","USDSGD","USDHKD","USDKRW","USDINR","EURCHF","EURNZD","GBPEUR","AUDNZD","CADJPY","CHFJPY","NZDJPY","SGDJPY","HKDJPY","ZARJPY"].includes(u)?`FX:${u}`:["XAUUSD","XAGUSD","XPTUSD","XPDUSD","XAUEUR","XAGEUR","XPTEUR","XAUGBP","XAGGBP","USOIL","UKOIL","BRENT","WTI","CRUDE","NGAS","HEAT","GAS"].includes(u)?`OANDA:${u}`:["US30","US500","NAS100","US2000","GER40","UK100","FRA40","EU50","JP225","HK50","AUS200","TWII","KR100","IN50","TECH100"].includes(u)?`TVC:${u}`:u},Ve={EUR:"eu",USD:"us",GBP:"gb",JPY:"jp",AUD:"au",CAD:"ca",CHF:"ch",NZD:"nz",MXN:"mx",TRY:"tr",ZAR:"za",SGD:"sg",HKD:"hk",KRW:"kr",INR:"in",XAU:"au",XAG:"au",XPT:"au",XPD:"au",USOIL:"us",UKOIL:"gb",BRENT:"gb",WTI:"us",CRUDE:"us",NGAS:"us",HEAT:"us",GAS:"us",US30:"us",US500:"us",NAS100:"us",US2000:"us",GER40:"de",UK100:"gb",FRA40:"fr",EU50:"eu",JP225:"jp",HK50:"hk",AUS200:"au",TWII:"tw",KR100:"kr",IN50:"in",TECH100:"us",BTC:"generic",ETH:"generic",XRP:"generic",SOL:"generic",ADA:"generic",DOGE:"generic",DOT:"generic",AVAX:"generic",LINK:"generic",MATIC:"generic",UNI:"generic",ATOM:"generic",LTC:"generic",BCH:"generic",NEAR:"generic",ALGO:"generic",VET:"generic",FIL:"generic",THETA:"generic",AXS:"generic",SAND:"generic",MANA:"generic",ENJ:"generic",CHZ:"generic",APE:"generic"},we=[{symbol:"EURUSD",name:"EUR / USD"},{symbol:"GBPUSD",name:"GBP / USD"},{symbol:"USDJPY",name:"USD / JPY"},{symbol:"AUDUSD",name:"AUD / USD"},{symbol:"USDCAD",name:"USD / CAD"},{symbol:"USDCHF",name:"USD / CHF"},{symbol:"NZDUSD",name:"NZD / USD"},{symbol:"EURGBP",name:"EUR / GBP"},{symbol:"EURJPY",name:"EUR / JPY"},{symbol:"GBPJPY",name:"GBP / JPY"},{symbol:"AUDJPY",name:"AUD / JPY"},{symbol:"EURAUD",name:"EUR / AUD"},{symbol:"GBPAUD",name:"GBP / AUD"},{symbol:"USDMXN",name:"USD / MXN"},{symbol:"USDTRY",name:"USD / TRY"},{symbol:"USDZAR",name:"USD / ZAR"},{symbol:"USDSGD",name:"USD / SGD"},{symbol:"USDHKD",name:"USD / HKD"},{symbol:"USDKRW",name:"USD / KRW"},{symbol:"USDINR",name:"USD / INR"},{symbol:"EURCHF",name:"EUR / CHF"},{symbol:"EURNZD",name:"EUR / NZD"},{symbol:"GBPEUR",name:"GBP / EUR"},{symbol:"AUDNZD",name:"AUD / NZD"},{symbol:"CADJPY",name:"CAD / JPY"},{symbol:"CHFJPY",name:"CHF / JPY"},{symbol:"NZDJPY",name:"NZD / JPY"},{symbol:"SGDJPY",name:"SGD / JPY"},{symbol:"HKDJPY",name:"HKD / JPY"},{symbol:"ZARJPY",name:"ZAR / JPY"},{symbol:"XAUUSD",name:"Gold"},{symbol:"XAGUSD",name:"Silver"},{symbol:"XPTUSD",name:"Platinum"},{symbol:"XPDUSD",name:"Palladium"},{symbol:"XAUEUR",name:"Gold / EUR"},{symbol:"XAGEUR",name:"Silver / EUR"},{symbol:"XPTEUR",name:"Platinum / EUR"},{symbol:"XAUGBP",name:"Gold / GBP"},{symbol:"XAGGBP",name:"Silver / GBP"},{symbol:"USOIL",name:"US Oil"},{symbol:"UKOIL",name:"UK Oil"},{symbol:"BRENT",name:"Brent"},{symbol:"WTI",name:"WTI"},{symbol:"CRUDE",name:"Crude"},{symbol:"NGAS",name:"Natural Gas"},{symbol:"HEAT",name:"Heating Oil"},{symbol:"GAS",name:"Gasoline"},{symbol:"US30",name:"Dow 30"},{symbol:"US500",name:"S&P 500"},{symbol:"NAS100",name:"Nasdaq 100"},{symbol:"US2000",name:"Russell 2000"},{symbol:"GER40",name:"DAX"},{symbol:"UK100",name:"FTSE 100"},{symbol:"FRA40",name:"CAC 40"},{symbol:"EU50",name:"Euro Stoxx 50"},{symbol:"JP225",name:"Nikkei 225"},{symbol:"HK50",name:"Hang Seng"},{symbol:"AUS200",name:"ASX 200"},{symbol:"TWII",name:"Taiwan"},{symbol:"KR100",name:"KOSPI"},{symbol:"IN50",name:"Nifty 50"},{symbol:"TECH100",name:"Tech 100"},{symbol:"BTCUSD",name:"Bitcoin"},{symbol:"ETHUSD",name:"Ethereum"},{symbol:"XRPUSD",name:"Ripple"},{symbol:"SOLUSD",name:"Solana"},{symbol:"ADAUSD",name:"Cardano"},{symbol:"DOGEUSD",name:"Dogecoin"},{symbol:"DOTUSD",name:"Polkadot"},{symbol:"AVAXUSD",name:"Avalanche"},{symbol:"LINKUSD",name:"Chainlink"},{symbol:"MATICUSD",name:"Polygon"},{symbol:"UNIUSD",name:"Uniswap"},{symbol:"ATOMUSD",name:"Cosmos"},{symbol:"LTCUSD",name:"Litecoin"},{symbol:"BCHUSD",name:"Bitcoin Cash"},{symbol:"NEARUSD",name:"Near"},{symbol:"ALGOUSD",name:"Algorand"},{symbol:"VETUSD",name:"VeChain"},{symbol:"FILUSD",name:"Filecoin"},{symbol:"THETAUSD",name:"Theta"},{symbol:"AXSUSD",name:"Axie Infinity"},{symbol:"SANDUSD",name:"The Sandbox"},{symbol:"MANAUSD",name:"Decentraland"},{symbol:"ENJUSD",name:"Enjin Coin"},{symbol:"CHZUSD",name:"Chiliz"},{symbol:"APEUSD",name:"ApeCoin"}];function so(){console.log("Futures component rendering");const r=Ke(),u=z(Je.selectRows),p=z(K.selectRows),f=z(K.pendingRows),C=z(K.pendingcount),L=z(K.pendingLoading),I=z(K.selectLoading),m=z(K.selectCount),A=z(He.selectCurrentUser),P=t.useRef(null),ie=t.useRef(null),D=t.useRef(null),J=t.useRef(null),[Q,Z]=t.useState([]),[l,$]=t.useState(null),[S,U]=t.useState(null),k=t.useRef({}),T=t.useRef({}),H=t.useRef({}),[c,ee]=t.useState("EURUSD"),[G,X]=t.useState("openOrders"),[W,le]=t.useState(!1),[N,V]=t.useState(null),[_,g]=t.useState(!1),[q,oe]=t.useState(null),[ce,E]=t.useState(!1),[ye,te]=t.useState(!0),[De,de]=t.useState(!0),[ue,se]=t.useState(0),[Se,ne]=t.useState([]),[Y,n]=t.useState(!1);t.useEffect(()=>{const o=s=>{Y&&N&&(s.preventDefault(),s.returnValue="")};return window.addEventListener("beforeunload",o),()=>{window.removeEventListener("beforeunload",o)}},[Y,N]),t.useEffect(()=>{n((A==null?void 0:A.accountType)==="demo")},[A]);const d=t.useCallback(o=>`~m~${o.length}~m~${o}`,[]),b=t.useCallback(o=>{const s=[];let i=o;for(;i.length>0&&i.startsWith("~m~");){const v=i.indexOf("~m~",3),be=parseInt(i.substring(3,v)),ge=i.substr(v+3,be);s.push(ge),i=i.substr(v+3+be)}return s},[]),y=t.useCallback(o=>{try{const s=o.replace(/^=\{/,"{");return JSON.parse(s).symbol||"UNKNOWN"}catch{return o}},[]),x=t.useCallback(o=>{const s=P.current,i=ie.current;!s||s.readyState!==WebSocket.OPEN||!i||D.current!==o&&(D.current&&s.send(d(JSON.stringify({m:"quote_remove_symbols",p:[i,D.current]}))),s.send(d(JSON.stringify({m:"quote_add_symbols",p:[i,o]}))),D.current=o,Z([]),$(null),U(null),te(!0),delete T.current[o],delete H.current[o],delete k.current[o])},[d]),F=t.useCallback(()=>{P.current&&(P.current.close(),P.current=null);const o=window.location.protocol==="https:"?"wss:":"ws:",s=new WebSocket(`${o}//${window.location.host}/ws/socket.io/websocket`);P.current=s,s.onopen=()=>{const i="qs_"+Math.random().toString(36).substring(2,12);ie.current=i,s.send(d(JSON.stringify({m:"quote_create_session",p:[i]}))),s.send(d(JSON.stringify({m:"quote_set_fields",p:[i,"ask","bid","ask_size","bid_size"]}))),x(h(re.current))},s.onmessage=i=>{const v=i.data;if(v.startsWith("~h~")){s.send(v);return}b(v).forEach(ge=>{try{const xe=JSON.parse(ge);if(xe.m==="qsd"){const Ne=xe.p[1],Fe=y(Ne.n),he=Ne.v;if(!he)return;const ze={symbol:Fe,ask:he.ask??0,bid:he.bid??0};Z(Oe=>[...Oe.filter($e=>$e.symbol!==Fe),ze])}}catch{}})},s.onclose=i=>{D.current=null,i.wasClean||(J.current=setTimeout(()=>{F()},3e3))},s.onerror=i=>{console.error("WebSocket error:",i)}},[d,b,y,x]),re=t.useRef(c);t.useEffect(()=>{re.current=c},[c]),t.useEffect(()=>(F(),()=>{J.current&&clearTimeout(J.current),P.current&&(P.current.close(),P.current=null)}),[F]),t.useEffect(()=>{x(h(c))},[c,x]),t.useEffect(()=>{const o=Q.find(i=>i.symbol===h(c));if(!o||!o.ask||!o.bid)return;const s=(o.ask+o.bid)/2;if($(s),te(!1),k.current[h(c)]===void 0)k.current[h(c)]=s,U(0);else{const i=k.current[h(c)],v=(s-i)/i*100;U(v)}(!T.current[h(c)]||s>T.current[h(c)])&&(T.current[h(c)]=s),(!H.current[h(c)]||s<H.current[h(c)])&&(H.current[h(c)]=s)},[Q,c]);const M=t.useCallback(()=>{if((u==null?void 0:u.length)>0){const o=u.find(s=>s.symbol==="USDT");se((o==null?void 0:o.amount)||0)}},[u]);t.useEffect(()=>{M()},[M]),t.useEffect(()=>{const o=setTimeout(()=>de(!1),1500);return()=>clearTimeout(o)},[]),t.useEffect(()=>{let o=!0;return(async()=>{try{await Promise.all([r(O.doFetchPending()),r(Pe.doFetch())])}catch(i){o&&console.error("Error fetching data:",i)}})(),()=>{o=!1}},[r]);const B=t.useMemo(()=>G==="openOrders"?{count:C,loading:L,list:Array.isArray(f)?f:[]}:{count:m,loading:I,list:Array.isArray(p)?p:[]},[G,C,L,f,m,I,p]),w=t.useCallback((o,s)=>{if(o==null)return"0.00";const i=typeof o=="string"?parseFloat(o):o;return isNaN(i)?"0.00":i.toFixed(s??5)},[]),me=t.useCallback(o=>{if(!o)return a("pages.assetsDetail.status.pending");try{const s=new Date(o);if(isNaN(s.getTime()))return o;const i=new Date;return s.toDateString()===i.toDateString()?a("pages.history.dateFormats.today",s.toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"})):a("pages.history.dateFormats.yesterday",s.toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"}))}catch(s){return console.error("Error formatting date:",s,o),o}},[]),pe=t.useCallback(o=>{if(!o)return a("pages.assetsDetail.status.pending");try{const s=new Date(o);return isNaN(s.getTime())?o:`${s.toLocaleDateString([],{year:"numeric",month:"short",day:"numeric"})} ${s.toLocaleTimeString([],{hour:"2-digit",minute:"2-digit",second:"2-digit"})}`}catch(s){return console.error("Error formatting date:",s,o),o}},[]),j=t.useCallback((o,s=2)=>{if(o==null)return"0.00";const i=typeof o=="string"?parseFloat(o):o;return isNaN(i)?"0.00":i.toFixed(s)},[]),fe=t.useMemo(()=>{const o=c.slice(0,3);return`https://flagcdn.com/w40/${Ve[o]||o.toLowerCase()}.png`},[c]),ve=t.useCallback(()=>g(!0),[]),Ce=t.useCallback(()=>g(!1),[]),ke=t.useCallback(o=>{ee(o),g(!1)},[]),Ue=t.useCallback(o=>{console.log("Opening modal with direction:",o,"isDemoAccount:",Y),r(Pe.doFetch()),V(o),le(!0)},[r]),Te=t.useCallback(()=>{le(!1),V(null)},[]),Ee=t.useCallback(o=>{oe(o),E(!0)},[]),Re=t.useCallback(()=>{E(!1),oe(null)},[]),Ae=t.useCallback(o=>{o==="openOrders"?(X("openOrders"),r(O.doFetchPending())):(X("recentOrders"),r(O.doFetch()))},[r]),ae=({width:o="100%",height:s="1em"})=>e.jsx("div",{className:"loading-placeholder",style:{width:o,height:s}}),Le=t.useMemo(()=>{const o=we.find(s=>s.symbol===c);return(o==null?void 0:o.name)||c.replace(/(.{3})(.{3})/,"$1 / $2")},[c]),Ie=T.current[h(c)]??l??0,Ge=H.current[h(c)]??l??0;return e.jsxs("div",{className:"container",children:[e.jsxs("div",{className:"header",children:[e.jsxs("div",{className:"header-top",children:[e.jsxs("div",{className:"market-info",children:[e.jsx("div",{className:"market-icon",children:e.jsx("img",{src:fe,style:{width:30,height:30,borderRadius:"50%",objectFit:"cover"},alt:c,onError:o=>{o.target.style.display="none"}})}),e.jsx("div",{className:"market-name",children:Le}),e.jsx("div",{className:"market-change",style:{color:(S??0)<0?"#FF6838":"#00C076"},children:l!==null?`${(S??0)>0?"+":""}${(S??0).toFixed(2)}%`:e.jsx(ae,{width:"50px",height:"16px"})})]}),e.jsx("div",{className:"additional-actions",onClick:ve,children:e.jsx("i",{className:"fas fa-filter"})})]}),e.jsx("div",{className:"market-price",style:{color:(S??0)<0?"#FF6838":"#39FF14"},children:l!==null?`$${w(l)}`:e.jsx(ae,{width:"120px",height:"28px"})}),e.jsxs("div",{className:"market-stats",children:[e.jsxs("span",{children:[a("pages.marketDetail.stats.high"),": "," ",l!==null?`$${w(Ie)}`:e.jsx(ae,{width:"80px",height:"12px"})]}),e.jsxs("span",{children:[a("pages.marketDetail.stats.low"),": "," ",l!==null?`$${w(Ge)}`:e.jsx(ae,{width:"80px",height:"12px"})]})]})]}),e.jsx(Ye,{symbol:c,height:400},c),e.jsxs("div",{className:"future-action-buttons",children:[e.jsx("button",{className:"action-button buy-button",onClick:()=>Ue("up"),children:a("pages.futures.actions.buyUp")}),e.jsx("button",{className:"action-button sell-button",onClick:()=>Ue("down"),children:a("pages.futures.actions.buyDown")})]}),e.jsxs("div",{className:"section-tabs",children:[e.jsxs("div",{className:`tab ${G==="openOrders"?"active":""}`,onClick:()=>Ae("openOrders"),children:[a("pages.futures.tabs.openOrders")," (",C||0,")"]}),e.jsxs("div",{className:`tab ${G==="recentOrders"?"active":""}`,onClick:()=>Ae("recentOrders"),children:[a("pages.futures.tabs.recentOrders")," (",m||0,")"]})]}),e.jsx(We,{countFutures:B.count,futuretLoading:B.loading,listFutures:B.list,handleOpenOrderModal:Ee,formatNumber:w,formatDateTime:me}),ce&&q&&e.jsx(_e,{selectedOrder:q,onClose:Re,formatDateTimeDetailed:pe,safeToFixed:j}),e.jsx(Ze,{isOpen:W,onClose:Te,direction:N,dispatch:r,listAssets:u,selectedCoin:c,marketPrice:(l==null?void 0:l.toString())??"0",availableBalance:ue,setOpeningOrders:ne,isDemoAccount:Y}),e.jsx(Xe,{isOpen:_,onClose:Ce,selectedCoin:c,onCoinSelect:ke,availableCoins:we.map(o=>({symbol:o.symbol,name:o.name})),title:a("pages.marketDetail.coinSelector.title")}),e.jsx("style",{children:`
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
      `})]})}const _e=({selectedOrder:r,onClose:u,formatDateTimeDetailed:p,safeToFixed:f})=>e.jsx("div",{className:"modal-overlays",onClick:u,children:e.jsxs("div",{className:"modal-content",onClick:C=>C.stopPropagation(),children:[e.jsxs("div",{className:"modal-header",children:[e.jsx("h2",{children:a("pages.futures.orderDetails.title")}),e.jsx("button",{className:"modal-close",onClick:u,children:e.jsx("i",{className:"fas fa-times"})})]}),e.jsxs("div",{className:"modal-body",children:[e.jsxs("div",{className:"order-detail-section",children:[e.jsxs("div",{className:"detail-header",children:[e.jsx("span",{className:"detail-pair",children:r.symbol||r.pair}),e.jsx("span",{className:`detail-direction ${r.futuresStatus==="long"||r.direction==="BUY UP"?"buy":"sell"}`,children:r.futuresStatus==="long"?a("pages.futures.actions.buyUp"):r.futuresStatus==="short"?a("pages.futures.actions.buyDown"):r.direction})]}),e.jsxs("div",{className:`detail-status ${r.finalized?"closed":"open"}`,children:["● ",r.finalized?a("pages.futures.orderDetails.closed"):a("pages.futures.orderDetails.open")]})]}),e.jsxs("div",{className:"order-detail-section",children:[e.jsx(R,{label:a("pages.futures.orderDetails.futuresAmount"),value:`${r.futuresAmount||r.investment} USD`}),r.contractDuration&&e.jsx(R,{label:a("pages.futures.orderDetails.contractDuration"),value:`${r.contractDuration} ${a("pages.futures.orderDetails.seconds")}`}),e.jsx(R,{label:a("pages.futures.orderDetails.futuresStatus"),value:r.closePositionTime?a("pages.futures.orderDetails.completed"):a("pages.futures.orderDetails.open")}),e.jsx(R,{label:a("pages.futures.orderDetails.openPositionPrice"),value:r.openPositionPrice||r.openPrice}),e.jsx(R,{label:a("pages.futures.orderDetails.openPositionTime"),value:p(r.openPositionTime||r.openTime)}),r.closePositionPrice&&e.jsx(R,{label:a("pages.futures.orderDetails.closePositionPrice"),value:r.closePositionPrice}),r.closePositionTime&&e.jsx(R,{label:a("pages.futures.orderDetails.closePositionTime"),value:p(r.closePositionTime)}),e.jsx(R,{label:a("pages.futures.orderDetails.profitLossAmount"),value:r.profitAndLossAmount||r.pnl?`${f(r.profitAndLossAmount||r.pnl,2)} USD`:"__",className:r.control==="profit"?"profit":"loss"}),e.jsx(R,{label:a("pages.futures.orderDetails.leverage"),value:`${r.leverage}X`})]})]}),e.jsx("div",{className:"modal-footer",children:e.jsx("button",{className:"modal-button",onClick:u,children:a("pages.futures.orderDetails.done")})})]})}),R=({label:r,value:u,className:p=""})=>e.jsxs("div",{className:"detail-row",children:[e.jsx("span",{className:"detail-label",children:r}),e.jsx("span",{className:`detail-value ${p}`,children:u})]});export{so as default};
