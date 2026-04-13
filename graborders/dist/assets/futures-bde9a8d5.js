import{i as a,O as J,S as ue,k as e,T as pe,N as me,j as r,u as T,w as ce,M as I,z as de}from"./index-a7b7f0f1.js";import{C as fe}from"./CoinSelectorSidebar-db8535b0.js";import{F as xe}from"./FuturesChart-c7744812.js";import{u as ge}from"./useDispatch-1fd5d25d.js";import"./MarketContext-fd5718cf.js";const be=({isOpen:s,onClose:l,direction:c,dispatch:p,listAssets:D,selectedCoin:N,marketPrice:j,availableBalance:i,setOpeningOrders:F})=>{const[w,O]=a.useState("120"),[Y,V]=a.useState("20"),[v,f]=a.useState("2"),[d,x]=a.useState(30),[b,h]=a.useState("configuring"),[R,L]=a.useState(0),[Q,P]=a.useState(null),[B,H]=a.useState(""),[$,ee]=a.useState(null),[le,U]=a.useState(""),[K,Z]=a.useState(!1),[g,S]=a.useState(null),W=t=>Number.isFinite(t)?t.toLocaleString(void 0,{minimumFractionDigits:2,maximumFractionDigits:2}):"0.00",oe=(t,u)=>{O(t),V(u)};a.useEffect(()=>(s?document.body.style.overflow="hidden":document.body.style.overflow="unset",()=>{document.body.style.overflow="unset"}),[s]),a.useEffect(()=>{p(J.doFetch())},[p]),a.useEffect(()=>{d<30?H("Minimum amount is 30 USD"):d>i?H("Insufficient balance"):H("")},[d,i]),a.useEffect(()=>{let t=null;return b==="in-progress"&&(R>0?t=setInterval(()=>{L(u=>u-1)},1e3):(async()=>await te())()),()=>{t&&clearInterval(t)}},[b,R]);const A=async()=>{if(!(!c||d<30||d>i)){Z(!0);try{const t=await se();if(!t||!t.id){Z(!1);return}S({futuresAmount:d,contractDuration:w,futuresStatus:c==="up"?"long":"short",openPositionPrice:parseFloat(j||"0")||0,closePositionPrice:null,leverage:parseInt(v,10),openPositionTime:new Date,closePositionTime:null}),F(m=>[...m,{id:$,futuresAmount:d,contractDuration:w,futuresStatus:c==="up"?"long":"short",openPositionPrice:parseFloat(j||"0")||0,closePositionPrice:null,leverage:parseInt(v,10),openPositionTime:new Date().toISOString(),closePositionTime:null}]);const u=parseInt(w,10)||0;L(u),h("in-progress")}catch(t){console.error("startTrade error",t)}finally{Z(!1)}}},te=async()=>{if(F([]),!$){P("loss"),U(`-${d.toFixed(2)} USD`),h("completed");return}try{const t=await p(ue.doFind($)),u=t&&t.payload?t.payload:t;if(!u){P("loss"),U(`-${d.toFixed(2)} USD`),h("completed");return}if(S({...g,closePositionPrice:u.closePositionPrice,closePositionTime:u.closePositionTime,profitAndLossAmount:u.profitAndLossAmount}),u.control==="profit"){P("win");const m=Number(u.profitAndLossAmount??G(d,v,Y));U(`+${Number.isFinite(m)?m.toFixed(2):"0.00"} USD`)}else{P("loss");const m=Number(u.futuresAmount??d);U(`-${Number.isFinite(m)?m.toFixed(2):d.toFixed(2)} USD`)}h("completed"),p(J.doFetchPending())}catch(t){console.error("completeTrade error",t),P("loss"),U(`-${d.toFixed(2)} USD`),h("completed")}},se=async()=>{const t=parseFloat(j||"0")||0,u={futuresStatus:c==="up"?"long":"short",profitAndLossAmount:"",leverage:parseInt(v,10),control:"loss",operate:"low",futureCoin:N.replace("USD","/USD"),closePositionTime:"",closePositionPrice:"",openPositionTime:new Date().toISOString(),openPositionPrice:t,contractDuration:w,futuresAmount:d};try{const m=await p(me.doCreate(u)),C=m&&m.id?m:m&&m.payload?m.payload:null;return C&&C.id?(ee(C.id),C):(console.warn("Create did not return created record"),null)}catch(m){return console.error("create error",m),null}},ae=()=>{h("configuring"),F([]),P(null),L(0),ee(null),U(""),S(null),x(30),V("20"),O("120")},G=(t,u,m)=>{const C=Number.isFinite(t)?t:0,_=parseInt(u,10)||0,z=parseInt(m,10)||0;return C*_*z/100},E=()=>{if(b!=="in-progress")return 0;const t=parseInt(w,10)||1;return(t-R)/t*100},X=t=>{const u=Math.floor(t/60),m=t%60;return`${u.toString().padStart(2,"0")}:${m.toString().padStart(2,"0")}`},q=t=>t?new Date(t).toLocaleTimeString():"-",re=t=>{const u=parseInt(t.target.value,10)||0;x(u)};if(!s)return null;const ne=e.jsxs("div",{className:"modal-overlay",onClick:l,children:[e.jsxs("div",{className:`modal-container ${c==="up"?"up-theme":"down-theme"}`,onClick:t=>t.stopPropagation(),children:[e.jsxs("div",{className:"modal-header",children:[e.jsx("div",{className:"pair-info",children:e.jsx("div",{className:"pair-name",children:N.replace("USD","/USD")})}),e.jsx("button",{className:"close-btn",onClick:l,children:"×"})]}),b!=="configuring"&&e.jsxs("div",{className:"trade-progress-section",children:[e.jsx("div",{className:"progress-container",children:e.jsx("div",{className:"circular-progress",style:{background:`conic-gradient(${c==="up"?"#00C076":"#FF6838"} ${E()}%, #3a3a3a ${E()}%)`},children:e.jsxs("div",{className:"progress-inner",children:[e.jsx("div",{className:"progress-time",children:X(R)}),e.jsx("div",{className:"progress-label",children:"Remaining"})]})})}),g&&e.jsxs("div",{className:"trade-details",children:[e.jsxs("div",{className:"trade-details-row",children:[e.jsx("span",{children:"Futures Amount:"}),e.jsxs("span",{children:[g.futuresAmount," USD"]})]}),e.jsxs("div",{className:"trade-details-row",children:[e.jsx("span",{children:"Contract Duration:"}),e.jsxs("span",{children:[g.contractDuration,"s"]})]}),e.jsxs("div",{className:"trade-details-row",children:[e.jsx("span",{children:"Future Type:"}),e.jsx("span",{className:g.futuresStatus==="long"?"up-text":"down-text",children:g.futuresStatus.toUpperCase()})]}),e.jsxs("div",{className:"trade-details-row",children:[e.jsx("span",{children:"Open Position Price:"}),e.jsxs("span",{children:[g.openPositionPrice.toFixed(4)," USD"]})]}),e.jsxs("div",{className:"trade-details-row",children:[e.jsx("span",{children:"Close Position Price:"}),e.jsxs("span",{children:[g.closePositionPrice?g.closePositionPrice.toFixed(4):"-"," USD"]})]}),e.jsxs("div",{className:"trade-details-row",children:[e.jsx("span",{children:"Leverage:"}),e.jsxs("span",{children:[g.leverage,"x"]})]}),e.jsxs("div",{className:"trade-details-row",children:[e.jsx("span",{children:"Open Time:"}),e.jsx("span",{children:q(g.openPositionTime)})]}),e.jsxs("div",{className:"trade-details-row",children:[e.jsx("span",{children:"Close Time:"}),e.jsx("span",{children:q(g.closePositionTime)})]})]}),e.jsxs("div",{className:"trade-actions",children:[b==="in-progress"&&e.jsx("button",{className:"trade-action-btn keep-buying",onClick:l,children:"Keep Buying"}),b==="completed"&&e.jsxs(e.Fragment,{children:[e.jsx("button",{className:"trade-action-btn secondary",onClick:l,children:"Close"}),e.jsx("button",{className:"trade-action-btn primary",onClick:ae,children:"New Trade"})]})]})]}),b==="configuring"&&e.jsxs(e.Fragment,{children:[e.jsx("div",{className:`direction-indicator ${c}-indicator`,children:c==="up"?"Predicting price will go UP":"Predicting price will go DOWN"}),e.jsxs("div",{className:"modal-content",children:[e.jsxs("div",{className:"section",children:[e.jsxs("div",{className:"section-title",children:[e.jsx("span",{children:"Contract Duration"}),e.jsx("span",{children:"Payout"})]}),e.jsx("div",{className:"options-container",children:[{duration:"60",payout:"10"},{duration:"120",payout:"20"},{duration:"180",payout:"40"},{duration:"240",payout:"80"}].map(t=>e.jsxs("button",{className:`option-btn ${w===t.duration?"selected":""}`,onClick:()=>oe(t.duration,t.payout),children:[t.duration,"s (",t.payout,"%)"]},t.duration))})]}),e.jsxs("div",{className:"section",children:[e.jsx("div",{className:"section-title",children:e.jsx("span",{children:"Leverage"})}),e.jsx("div",{className:"options-container",children:["1","2","5","10","20"].map(t=>e.jsxs("button",{className:`option-btn ${v===t?"selected":""}`,onClick:()=>f(t),children:[t,"×"]},t))})]}),e.jsxs("div",{className:"section",children:[e.jsx("div",{className:"section-title",children:e.jsx("span",{children:"Futures Amount (USD)"})}),e.jsxs("div",{className:"amount-control",children:[e.jsx("button",{className:"amount-btn",onClick:()=>x(t=>Math.max(1,t-1)),children:"-"}),e.jsx("input",{type:"number",className:"amount-inputs",value:d,onChange:re,min:"1",placeholder:"Enter amount"}),e.jsx("button",{className:"amount-btn",onClick:()=>x(t=>t+1),children:"+"})]}),e.jsxs("div",{className:"balance-info",children:["Available: ",W(i)," USD"]}),B&&e.jsx("div",{className:"error-message",style:{color:"#FF6838",fontSize:"12px",marginTop:"5px"},children:B})]}),e.jsxs("div",{className:"profit-info",children:["Projected Profit: ",G(d,v,Y).toFixed(2)," USD"]}),e.jsx("button",{className:"confirm-btn",onClick:A,disabled:!c||d<30||d>i||K,style:{opacity:!c||d<30||d>i?.5:1,cursor:!c||d<30||d>i?"not-allowed":"pointer"},children:K?"CREATING...":d>i?"INSUFFICIENT BALANCE":"CONFIRM ORDER"})]})]})]}),e.jsx("style",{children:` 
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
`})]});return pe.createPortal(ne,document.body)};function he(s){const{countFutures:l,futuretLoading:c,listFutures:p,handleOpenOrderModal:D,formatNumber:N,formatDateTime:j}=s;return e.jsxs("div",{className:"orders-container",children:[l>0&&!c&&(p==null?void 0:p.map(i=>{var F;return e.jsxs("div",{className:"order-card",onClick:()=>D(i),children:[e.jsxs("div",{className:"order-header",children:[e.jsx("div",{className:"order-pair",children:i.futureCoin||"BTC/USD"}),e.jsx("div",{className:`order-direction ${i.futuresStatus==="long"?"buy":"sell"}`,children:i.futuresStatus==="long"?r("pages.futures.actions.buyUp"):r("pages.futures.actions.buyDown")})]}),e.jsxs("div",{className:`order-status ${i.finalized?"closed":"open"}`,children:["● ",i.finalized?r("pages.futures.orderDetails.closed"):r("pages.futures.orderDetails.open")]}),e.jsxs("div",{className:"order-details",children:[e.jsxs("div",{className:"order-row",children:[e.jsx("span",{className:"order-label",children:r("pages.futures.orderDetails.futuresAmount")}),e.jsxs("span",{className:"order-value",children:["$",i.futuresAmount]})]}),e.jsxs("div",{className:"order-row",children:[e.jsx("span",{className:"order-label",children:r("pages.futures.orderDetails.openPositionPrice")}),e.jsx("span",{className:"order-value",children:N((F=i==null?void 0:i.openPositionPrice)==null?void 0:F.toString(),(i==null?void 0:i.openPositionPrice)>1e3?0:2)})]}),e.jsxs("div",{className:"order-row",children:[e.jsx("span",{className:"order-label",children:r("pages.futures.orderDetails.openPositionTime")}),e.jsx("span",{className:"order-value",children:j(i.openPositionTime)})]}),e.jsxs("div",{className:"order-row",children:[e.jsx("span",{className:"order-label",children:r("pages.futures.orderDetails.leverage")}),e.jsxs("span",{className:"order-value",children:[i.leverage,"x"]})]})]})]},i.id)})),p.length===0&&!c&&e.jsxs("div",{className:"no-orders",children:[e.jsx("i",{className:"fas fa-file-invoice"}),e.jsx("div",{children:r("pages.futures.list.noOrders")})]}),e.jsx("style",{children:` 
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
            `})]})}const M={EURUSD:1.085,GBPUSD:1.265,USDJPY:148.5,AUDUSD:.655,USDCAD:1.355,USDCHF:.875,NZDUSD:.605,EURGBP:.857,EURJPY:161.2,GBPJPY:188.3,AUDJPY:97.2,EURAUD:1.655,GBPAUD:1.93,USDMXN:17.2,USDRY:30.5,USDZAR:18.9,USDSGD:1.345,USDHKD:7.82,USDKRW:1330,USDINR:83.2},ye={EUR:"eu",USD:"us",GBP:"gb",JPY:"jp",AUD:"au",CAD:"ca",CHF:"ch",NZD:"nz",MXN:"mx",TRY:"tr",ZAR:"za",SGD:"sg",HKD:"hk",KRW:"kr",INR:"in"},De=s=>s.includes("JPY")&&!s.startsWith("JPY")?3:5,je=(s,l=5e-4)=>{const c=(Math.random()*2-1)*l;return s*(1+c)},Fe=(s,l)=>{const p=je(l,.001),D=(p-l)/l*100,N=Math.max(l,p)*1.002,j=Math.min(l,p)*.998,i=1e6+Math.random()*5e5,F=p*i;return{symbol:s,price:p,changePercent:D,high:N,low:j,volume:i,quoteVolume:F}},ve=[{symbol:"EURUSD",name:"EUR / USD"},{symbol:"GBPUSD",name:"GBP / USD"},{symbol:"USDJPY",name:"USD / JPY"},{symbol:"AUDUSD",name:"AUD / USD"},{symbol:"USDCAD",name:"USD / CAD"},{symbol:"USDCHF",name:"USD / CHF"},{symbol:"NZDUSD",name:"NZD / USD"},{symbol:"EURGBP",name:"EUR / GBP"},{symbol:"EURJPY",name:"EUR / JPY"},{symbol:"GBPJPY",name:"GBP / JPY"},{symbol:"AUDJPY",name:"AUD / JPY"},{symbol:"EURAUD",name:"EUR / AUD"},{symbol:"GBPAUD",name:"GBP / AUD"},{symbol:"USDMXN",name:"USD / MXN"},{symbol:"USDRY",name:"USD / TRY"},{symbol:"USDZAR",name:"USD / ZAR"},{symbol:"USDSGD",name:"USD / SGD"},{symbol:"USDHKD",name:"USD / HKD"},{symbol:"USDKRW",name:"USD / KRW"},{symbol:"USDINR",name:"USD / INR"}];function Ae(){const s=ge(),l=T(ce.selectRows);T(ce.selectLoading);const c=T(I.selectRows),p=T(I.pendingRows),D=T(I.pendingcount),N=T(I.pendingLoading),j=T(I.selectLoading),i=T(I.selectCount),[F,w]=a.useState(!1),[O,Y]=a.useState(null),[V,v]=a.useState(!1),[f,d]=a.useState("EURUSD"),[x,b]=a.useState({symbol:"EURUSD",price:M.EURUSD,changePercent:0,high:M.EURUSD*1.002,low:M.EURUSD*.998,volume:1e6,quoteVolume:M.EURUSD*1e6}),[h,R]=a.useState("openOrders"),[L,Q]=a.useState(null),[P,B]=a.useState(!1),[H,$]=a.useState(!0),[ee,le]=a.useState(!0),[U,K]=a.useState(0),[Z,g]=a.useState([]),S=a.useRef(null),W=a.useRef(f),oe=a.useCallback((o,n=2)=>{if(o==null)return"0.00";const y=typeof o=="string"?parseFloat(o):o;return isNaN(y)?"0.00":y.toFixed(n)},[]),A=a.useCallback((o,n)=>{if(o==null)return"0.00";const y=typeof o=="string"?parseFloat(o):o;if(isNaN(y))return"0.00";const ie=n??De(f);return y.toLocaleString(void 0,{minimumFractionDigits:ie,maximumFractionDigits:ie})},[f]),te=a.useCallback(o=>{if(o==null)return"0";const n=typeof o=="string"?parseFloat(o):o;return isNaN(n)?"0":n>=1e9?(n/1e9).toFixed(2)+r("pages.marketDetail.volume.billion"):n>=1e6?(n/1e6).toFixed(2)+r("pages.marketDetail.volume.million"):A(n,0)},[A]),se=a.useCallback(o=>{if(!o)return r("pages.assetsDetail.status.pending");try{const n=new Date(o);if(isNaN(n.getTime()))return o;const y=new Date;return n.toDateString()===y.toDateString()?r("pages.history.dateFormats.today",n.toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"})):r("pages.history.dateFormats.yesterday",n.toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"}))}catch(n){return console.error("Error formatting date:",n,o),o}},[]),ae=a.useCallback(o=>{if(!o)return r("pages.assetsDetail.status.pending");try{const n=new Date(o);return isNaN(n.getTime())?o:`${n.toLocaleDateString([],{year:"numeric",month:"short",day:"numeric"})} ${n.toLocaleTimeString([],{hour:"2-digit",minute:"2-digit",second:"2-digit"})}`}catch(n){return console.error("Error formatting date:",n,o),o}},[]),G=a.useCallback(()=>{if((l==null?void 0:l.length)>0){const o=l.find(n=>n.symbol==="USDT");K((o==null?void 0:o.amount)||0)}},[l]),E=a.useMemo(()=>h==="openOrders"?{count:D,loading:N,list:Array.isArray(p)?p:[]}:{count:i,loading:j,list:Array.isArray(c)?c:[]},[h,D,N,p,i,j,c]),X=a.useMemo(()=>{const o=f.slice(0,3);return`https://flagcdn.com/w40/${ye[o]||o.toLowerCase()}.png`},[f]);a.useEffect(()=>{if(!f)return;let o=!0;W.current=f;const n=M[f]||1;return b({symbol:f,price:n,changePercent:0,high:n*1.002,low:n*.998,volume:1e6,quoteVolume:n*1e6}),S.current&&clearInterval(S.current),S.current=setInterval(()=>{!o||W.current!==f||b(y=>Fe(f,y.price))},3e3),()=>{o=!1,S.current&&clearInterval(S.current)}},[f]),a.useEffect(()=>{const o=setTimeout(()=>{le(!1)},1500);return()=>clearTimeout(o)},[]),a.useEffect(()=>{let o=!0;return(async()=>{try{await Promise.all([s(J.doFetchPending()),s(de.doFetch())])}catch(y){o&&console.error("Error fetching data:",y)}})(),()=>{o=!1}},[s]),a.useEffect(()=>{G()},[G]);const q=a.useCallback(()=>{v(!0)},[]),re=a.useCallback(()=>{v(!1)},[]),ne=a.useCallback(o=>{$(!0);const n=M[o]||1;b({symbol:o,price:n,changePercent:0,high:n*1.002,low:n*.998,volume:1e6,quoteVolume:n*1e6}),d(o),v(!1),$(!1)},[]),t=a.useCallback(o=>{s(de.doFetch()),Y(o),w(!0)},[s]),u=a.useCallback(()=>{w(!1),Y(null)},[]),m=a.useCallback(o=>{Q(o),B(!0)},[]),C=a.useCallback(()=>{B(!1),Q(null)},[]),_=a.useCallback(o=>{o==="openOrders"?(R("openOrders"),s(J.doFetchPending())):(R("recentOrders"),s(J.doFetch()))},[s]),z=a.useCallback(({width:o="100%",height:n="1em"})=>e.jsx("div",{className:"loading-placeholder",style:{width:o,height:n}}),[]);return e.jsxs("div",{className:"container",children:[e.jsxs("div",{className:"header",children:[e.jsxs("div",{className:"header-top",children:[e.jsxs("div",{className:"market-info",children:[e.jsx("div",{className:"market-icon",children:e.jsx("img",{src:X,style:{width:30,height:30,borderRadius:"50%",objectFit:"cover"},alt:f,onError:o=>{o.target.style.display="none"}})}),e.jsx("div",{className:"market-name",children:f}),e.jsx("div",{className:"market-change",style:{color:x.changePercent<0?"#FF6838":"#00C076"},children:x?`${x.changePercent>0?"+":""}${x.changePercent.toFixed(2)}%`:e.jsx(z,{width:"50px",height:"16px"})})]}),e.jsx("div",{className:"additional-actions",onClick:q,children:e.jsx("i",{className:"fas fa-filter"})})]}),e.jsx("div",{className:"market-price",children:x?`$${A(x.price)}`:e.jsx(z,{width:"120px",height:"28px"})}),e.jsxs("div",{className:"market-stats",children:[e.jsxs("span",{children:[r("pages.marketDetail.stats.high"),":"," ",x?`$${A(x.high)}`:e.jsx(z,{width:"80px",height:"12px"})]}),e.jsxs("span",{children:[r("pages.marketDetail.stats.volume"),":"," ",x?`${te(x.volume)} ${f.slice(0,3)}`:e.jsx(z,{width:"80px",height:"12px"})]}),e.jsxs("span",{children:[r("pages.marketDetail.stats.low"),":"," ",x?`$${A(x.low)}`:e.jsx(z,{width:"80px",height:"12px"})]})]})]}),e.jsx(xe,{symbol:f}),e.jsxs("div",{className:"future-action-buttons",children:[e.jsx("button",{className:"action-button buy-button",onClick:()=>t("up"),children:r("pages.futures.actions.buyUp")}),e.jsx("button",{className:"action-button sell-button",onClick:()=>t("down"),children:r("pages.futures.actions.buyDown")})]}),e.jsxs("div",{className:"section-tabs",children:[e.jsxs("div",{className:`tab ${h==="openOrders"?"active":""}`,onClick:()=>_("openOrders"),children:[r("pages.futures.tabs.openOrders")," (",D||0,")"]}),e.jsxs("div",{className:`tab ${h==="recentOrders"?"active":""}`,onClick:()=>_("recentOrders"),children:[r("pages.futures.tabs.recentOrders")," (",i||0,")"]})]}),e.jsx(he,{countFutures:E.count,futuretLoading:E.loading,listFutures:E.list,handleOpenOrderModal:m,formatNumber:A,formatDateTime:se}),P&&L&&e.jsx(Ne,{selectedOrder:L,onClose:C,formatDateTimeDetailed:ae,safeToFixed:oe}),e.jsx(be,{isOpen:F,onClose:u,direction:O,dispatch:s,listAssets:l,selectedCoin:f,marketPrice:x.price.toString(),availableBalance:U,setOpeningOrders:g,coinIcon:X}),e.jsx(fe,{isOpen:V,onClose:re,selectedCoin:f,onCoinSelect:ne,availableCoins:ve,title:r("pages.marketDetail.coinSelector.title")}),e.jsx("style",{children:`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }

        .container {
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
          color: #39FF14;
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
      `})]})}const Ne=({selectedOrder:s,onClose:l,formatDateTimeDetailed:c,safeToFixed:p})=>e.jsx("div",{className:"modal-overlays",onClick:l,children:e.jsxs("div",{className:"modal-content",onClick:D=>D.stopPropagation(),children:[e.jsxs("div",{className:"modal-header",children:[e.jsx("h2",{children:r("pages.futures.orderDetails.title")}),e.jsx("button",{className:"modal-close",onClick:l,children:e.jsx("i",{className:"fas fa-times"})})]}),e.jsxs("div",{className:"modal-body",children:[e.jsxs("div",{className:"order-detail-section",children:[e.jsxs("div",{className:"detail-header",children:[e.jsx("span",{className:"detail-pair",children:s.symbol||s.pair}),e.jsx("span",{className:`detail-direction ${s.futuresStatus==="long"||s.direction==="BUY UP"?"buy":"sell"}`,children:s.futuresStatus==="long"?r("pages.futures.actions.buyUp"):s.futuresStatus==="short"?r("pages.futures.actions.buyDown"):s.direction})]}),e.jsxs("div",{className:`detail-status ${s.finalized?"closed":"open"}`,children:["● ",s.finalized?r("pages.futures.orderDetails.closed"):r("pages.futures.orderDetails.open")]})]}),e.jsxs("div",{className:"order-detail-section",children:[e.jsx(k,{label:r("pages.futures.orderDetails.futuresAmount"),value:`${s.futuresAmount||s.investment} USD`}),s.contractDuration&&e.jsx(k,{label:r("pages.futures.orderDetails.contractDuration"),value:`${s.contractDuration} ${r("pages.futures.orderDetails.seconds")}`}),e.jsx(k,{label:r("pages.futures.orderDetails.futuresStatus"),value:s.closePositionTime?r("pages.futures.orderDetails.completed"):r("pages.futures.orderDetails.open")}),e.jsx(k,{label:r("pages.futures.orderDetails.openPositionPrice"),value:s.openPositionPrice||s.openPrice}),e.jsx(k,{label:r("pages.futures.orderDetails.openPositionTime"),value:c(s.openPositionTime||s.openTime)}),s.closePositionPrice&&e.jsx(k,{label:r("pages.futures.orderDetails.closePositionPrice"),value:s.closePositionPrice}),s.closePositionTime&&e.jsx(k,{label:r("pages.futures.orderDetails.closePositionTime"),value:c(s.closePositionTime)}),e.jsx(k,{label:r("pages.futures.orderDetails.profitLossAmount"),value:s.profitAndLossAmount||s.pnl?`${p(s.profitAndLossAmount||s.pnl,2)} USD`:"__",className:s.control==="profit"?"profit":"loss"}),e.jsx(k,{label:r("pages.futures.orderDetails.leverage"),value:`${s.leverage}X`})]})]}),e.jsx("div",{className:"modal-footer",children:e.jsx("button",{className:"modal-button",onClick:l,children:r("pages.futures.orderDetails.done")})})]})}),k=({label:s,value:l,className:c=""})=>e.jsxs("div",{className:"detail-row",children:[e.jsx("span",{className:"detail-label",children:s}),e.jsx("span",{className:`detail-value ${c}`,children:l})]});export{Ae as default};
