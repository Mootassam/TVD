import{i as t,k as e,j as n,K as pe,o as ve,G as Q,M as ye,F as Ae,u as O,B as de,D as G,E as ue}from"./index-680400b2.js";import{F as Fe}from"./FuturesChart-dd2ea807.js";import{u as Ne}from"./useDispatch-cbb2647c.js";const we=({isOpen:a,onClose:m,onSelectCoin:u})=>{const[v,T]=t.useState({}),[A,F]=t.useState(""),[l,U]=t.useState("All"),[S,I]=t.useState(!0),$=t.useRef(null);t.useEffect(()=>{(async()=>{try{I(!0);const i=(await ve.get("https://api.binance.com/api/v3/ticker/24hr")).data.filter(p=>p.symbol.endsWith("USDT")&&!p.symbol.includes("UP")&&!p.symbol.includes("DOWN")&&!p.symbol.includes("BEAR")&&!p.symbol.includes("BULL"));i.sort((p,P)=>parseFloat(P.quoteVolume)-parseFloat(p.quoteVolume));const d=i.slice(0,100),g={};d.forEach(p=>{const P=p.symbol,y=P.replace("USDT",""),C=!p.priceChangePercent.startsWith("-"),B=Math.abs(Number(p.priceChangePercent)).toFixed(2),k=Number(p.volume);let z=k.toFixed(0);k>=1e9?z=(k/1e9).toFixed(1)+"B":k>=1e6&&(z=(k/1e6).toFixed(1)+"M"),g[P]={symbol:P,name:`${y}/USDT`,price:Number(p.lastPrice).toLocaleString(void 0,{minimumFractionDigits:2,maximumFractionDigits:Number(p.lastPrice)<1?6:4}),change:p.priceChange,changePercent:B,volume:p.volume,volumeFormatted:z,isPositive:C}}),T(g),I(!1)}catch{I(!1)}})()},[]),t.useEffect(()=>($.current=new WebSocket("wss://stream.binance.com:9443/ws/!ticker@arr"),$.current.onmessage=r=>{const f=JSON.parse(r.data);T(i=>{const d={...i};return f.forEach(g=>{if(d[g.s]){const p=!g.P.startsWith("-"),P=Math.abs(Number(g.P)).toFixed(2),y=Number(g.v);let C=y.toFixed(0);y>=1e9?C=(y/1e9).toFixed(1)+"B":y>=1e6&&(C=(y/1e6).toFixed(1)+"M"),d[g.s]={...d[g.s],price:Number(g.c).toLocaleString(void 0,{minimumFractionDigits:2,maximumFractionDigits:Number(g.c)<1?6:4}),change:g.p,changePercent:P,volume:g.v,volumeFormatted:C,isPositive:p}}}),d})},()=>{$.current&&$.current.close()}),[]);const W=t.useMemo(()=>{const r=Object.values(v);if(r.length===0)return[];let f=r;if(A){const i=A.toLowerCase();f=f.filter(d=>d.name.toLowerCase().includes(i)||d.symbol.toLowerCase().includes(i))}switch(l){case"Gainers":return f.filter(i=>i.isPositive).sort((i,d)=>Number(d.changePercent)-Number(i.changePercent));case"Losers":return f.filter(i=>!i.isPositive).sort((i,d)=>Number(i.changePercent)-Number(d.changePercent));case"Favorites":return f.filter(i=>["BTCUSDT","ETHUSDT","BNBUSDT"].includes(i.symbol)).sort((i,d)=>Number(d.volume)-Number(i.volume));default:return f.sort((i,d)=>Number(d.volume)-Number(i.volume))}},[v,A,l]),D=r=>{u(r.symbol),m()};if(!a)return null;const j=e.jsxs("div",{className:"modal-overlay",onClick:m,children:[e.jsxs("div",{className:"coin-modal-container",onClick:r=>r.stopPropagation(),children:[e.jsxs("div",{className:"coin-modal-header",children:[e.jsx("div",{className:"coin-modal-title",children:n("components.coinListModal.title")}),e.jsx("button",{className:"close-btn",onClick:m,children:e.jsx("i",{className:"fas fa-times"})})]}),e.jsx("div",{className:"search-section",children:e.jsxs("div",{className:"search-input-container",children:[e.jsx("i",{className:"fas fa-search search-icon"}),e.jsx("input",{type:"text",placeholder:n("components.coinListModal.search.placeholder"),className:"search-input",value:A,onChange:r=>F(r.target.value)}),A&&e.jsx("button",{className:"clear-search",onClick:()=>F(""),children:e.jsx("i",{className:"fas fa-times"})})]})}),S&&e.jsxs("div",{className:"loading-state",children:[e.jsx("i",{className:"fas fa-spinner fa-spin"}),e.jsx("p",{children:n("components.coinListModal.loading")})]}),!S&&e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"coin-list",children:W.length>0?W.map(r=>e.jsxs("div",{className:"coin-item",onClick:()=>D(r),children:[e.jsxs("div",{className:"coin-info",children:[e.jsxs("div",{className:`coin-icon ${r.name.toLowerCase()}`,children:[e.jsx("img",{src:`https://images.weserv.nl/?url=https://bin.bnbstatic.com/static/assets/logos/${r.name.split("/")[0]}.png`,style:{width:40,height:40},alt:r.name.split("/")[0],onError:f=>{f.target.src=`https://via.placeholder.com/40/3a3a3a/ffffff?text=${r.name.split("/")[0].charAt(0)}`}}),e.jsx("i",{className:"fas fa-coins",style:{display:"none"}})]}),e.jsxs("div",{className:"coin-details",children:[e.jsx("div",{className:"coin-symbol",children:r.symbol}),e.jsx("div",{className:"coin-name",children:r.name})]})]}),e.jsxs("div",{className:"coin-price-info",children:[e.jsxs("div",{className:"coin-price",children:["$",r.price]}),e.jsx("div",{className:`coin-change ${r.isPositive?"positive":"negative"}`,children:r.change})]})]},r.symbol)):e.jsxs("div",{className:"no-results",children:[e.jsx("i",{className:"fas fa-search"}),e.jsx("p",{children:n("components.coinListModal.noResults")})]})}),e.jsxs("div",{className:"quick-select-section",children:[e.jsx("div",{className:"section-label",children:n("components.coinListModal.popular")}),e.jsxs("div",{className:"quick-select-chips",children:[e.jsx("button",{className:"chip",onClick:()=>F("BTC"),children:"BTC"}),e.jsx("button",{className:"chip",onClick:()=>F("ETH"),children:"ETH"}),e.jsx("button",{className:"chip",onClick:()=>F("BNB"),children:"BNB"}),e.jsx("button",{className:"chip",onClick:()=>F("SOL"),children:"SOL"})]})]})]})]}),e.jsx("style",{children:`
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: rgba(0, 0, 0, 0.7);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 1000;
          padding: 20px;
        }
        
        .coin-modal-container {
          background-color: #2a2a2a;
          border-radius: 12px;
          width: 100%;
          max-width: 400px;
          max-height: 80vh;
          box-shadow: 0 5px 20px rgba(0, 0, 0, 0.4);
          overflow: hidden;
          display: flex;
          flex-direction: column;
        }
        
        /* Header Section */
        .coin-modal-header {
          background-color: #1a1a1a;
          padding: 15px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 1px solid #3a3a3a;
        }
        
        .coin-modal-title {
          font-weight: bold;
          font-size: 18px;
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
        
        /* Search Section */
        .search-section {
          padding: 15px;
          border-bottom: 1px solid #3a3a3a;
        }
        
        .search-input-container {
          position: relative;
          display: flex;
          align-items: center;
        }
        
        .search-icon {
          position: absolute;
          left: 12px;
          color: #AAAAAA;
        }
        
        .search-input {
          width: 100%;
          padding: 12px 40px;
          background-color: #3a3a3a;
          border: 1px solid #4a4a4a;
          border-radius: 8px;
          color: #FFFFFF;
          font-size: 14px;
        }
        
        .search-input:focus {
          outline: none;
          border-color: #F3BA2F;
        }
        
        .clear-search {
          position: absolute;
          right: 12px;
          background: none;
          border: none;
          color: #AAAAAA;
          cursor: pointer;
        }
        
        .clear-search:hover {
          color: #FFFFFF;
        }
        
        /* Loading State */
        .loading-state, .error-state {
          padding: 40px 20px;
          text-align: center;
          color: #AAAAAA;
        }
        
        .loading-state i, .error-state i {
          font-size: 32px;
          margin-bottom: 10px;
        }
        
        .error-state button {
          margin-top: 10px;
          padding: 8px 16px;
          background-color: #F3BA2F;
          border: none;
          border-radius: 4px;
          cursor: pointer;
        }
        
        /* Coin List */
        .coin-list {
          flex: 1;
          overflow-y: auto;
          max-height: 40vh;
        }
        
        .coin-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 12px 15px;
          cursor: pointer;
          transition: background-color 0.2s;
        }
        
        .coin-item:hover {
          background-color: #3a3a3a;
        }
        
        .coin-info {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        
        .coin-icon {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background-color: #3a3a3a;
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 18px;
          overflow: hidden;
        }
        
        .coin-icon img {
          width: 24px;
          height: 24px;
          object-fit: contain;
        }
        
        .coin-details {
          display: flex;
          flex-direction: column;
        }
        
        .coin-symbol {
          font-weight: bold;
          font-size: 16px;
        }
        
        .coin-name {
          font-size: 12px;
          color: #AAAAAA;
        }
        
        .coin-price-info {
          text-align: right;
        }
        
        .coin-price {
          font-weight: bold;
          font-size: 14px;
        }
        
        .coin-change {
          font-size: 12px;
        }
        
        .coin-change.positive {
          color: #00C076;
        }
        
        .coin-change.negative {
          color: #FF6838;
        }
        
        .no-results {
          padding: 40px 20px;
          text-align: center;
          color: #AAAAAA;
        }
        
        .no-results i {
          font-size: 32px;
          margin-bottom: 10px;
        }
        
        /* Quick Select Section */
        .quick-select-section {
          padding: 15px;
          border-top: 1px solid #3a3a3a;
        }
        
        .section-label {
          font-size: 14px;
          color: #AAAAAA;
          margin-bottom: 10px;
        }
        
        .quick-select-chips {
          display: flex;
          gap: 8px;
        }
        
        .chip {
          padding: 8px 16px;
          background-color: #3a3a3a;
          border: 1px solid #4a4a4a;
          border-radius: 20px;
          color: #FFFFFF;
          font-size: 14px;
          cursor: pointer;
          transition: all 0.2s;
        }
        
        .chip:hover {
          background-color: #4a4a4a;
          border-color: #F3BA2F;
        }
      `})]});return pe.createPortal(j,document.body)},ke=({isOpen:a,onClose:m,direction:u,dispatch:v,listAssets:T,selectedCoin:A,marketPrice:F,availableBalance:l,setOpeningOrders:U})=>{const[S,I]=t.useState("120"),[$,W]=t.useState("20"),[D,j]=t.useState("2"),[r,f]=t.useState(30),[i,d]=t.useState("configuring"),[g,p]=t.useState(0),[P,y]=t.useState(null),[C,B]=t.useState(""),[k,z]=t.useState(null),[te,M]=t.useState(""),[J,K]=t.useState(!1),[N,X]=t.useState(null),H=(s,x)=>{I(s),W(x)};t.useEffect(()=>(a?document.body.style.overflow="hidden":document.body.style.overflow="unset",()=>{document.body.style.overflow="unset"}),[a]),t.useEffect(()=>{v(Q.doFetch())},[v]),t.useEffect(()=>{r<30?B("Minimum amount is 30 USDT"):r>l?B("Insufficient balance"):B("")},[r,l]),t.useEffect(()=>{let s=null;return i==="in-progress"&&(g>0?s=setInterval(()=>{p(x=>x-1)},1e3):(async()=>await oe())()),()=>{s&&clearInterval(s)}},[i,g]);const ie=async()=>{if(!(!u||r<30||r>l)){K(!0);try{const s=await se();if(!s||!s.id){K(!1);return}X({futuresAmount:r,contractDuration:S,futuresStatus:u==="up"?"long":"short",openPositionPrice:parseFloat(F||"0")||0,closePositionPrice:null,leverage:parseInt(D,10),openPositionTime:new Date,closePositionTime:null}),U(h=>[...h,{id:k,futuresAmount:r,contractDuration:S,futuresStatus:u==="up"?"long":"short",openPositionPrice:parseFloat(F||"0")||0,closePositionPrice:null,leverage:parseInt(D,10),openPositionTime:new Date().toISOString(),closePositionTime:null}]);const x=parseInt(S,10)||0;p(x),d("in-progress")}catch(s){console.error("startTrade error",s)}finally{K(!1)}}},oe=async()=>{if(U([]),!k){y("loss"),M(`-${r.toFixed(2)} USDT`),d("completed");return}try{const s=await v(ye.doFind(k)),x=s&&s.payload?s.payload:s;if(!x){y("loss"),M(`-${r.toFixed(2)} USDT`),d("completed");return}if(X({...N,closePositionPrice:x.closePositionPrice,closePositionTime:x.closePositionTime,profitAndLossAmount:x.profitAndLossAmount}),x.control==="profit"){y("win");const h=Number(x.profitAndLossAmount??ae(r,D,$));M(`+${Number.isFinite(h)?h.toFixed(2):"0.00"} USDT`)}else{y("loss");const h=Number(x.futuresAmount??r);M(`-${Number.isFinite(h)?h.toFixed(2):r.toFixed(2)} USDT`)}d("completed"),v(Q.doFetchPending())}catch(s){console.error("completeTrade error",s),y("loss"),M(`-${r.toFixed(2)} USDT`),d("completed")}},se=async()=>{const s=parseFloat(F||"0")||0,x={futuresStatus:u==="up"?"long":"short",profitAndLossAmount:"",leverage:parseInt(D,10),control:"loss",operate:"low",futureCoin:A.replace("USDT","/USDT"),closePositionTime:"",closePositionPrice:"",openPositionTime:new Date().toISOString(),openPositionPrice:s,contractDuration:S,futuresAmount:r};try{const h=await v(Ae.doCreate(x)),R=h&&h.id?h:h&&h.payload?h.payload:null;return R&&R.id?(z(R.id),R):(console.warn("Create did not return created record"),null)}catch(h){return console.error("create error",h),null}},re=()=>{d("configuring"),U([]),y(null),p(0),z(null),M(""),X(null),f(30),W("20"),I("120")},ae=(s,x,h)=>{const R=Number.isFinite(s)?s:0,ee=parseInt(x,10)||0,Y=parseInt(h,10)||0;return R*ee*Y/100},Z=()=>{if(i!=="in-progress")return 0;const s=parseInt(S,10)||1;return(s-g)/s*100},L=s=>{const x=Math.floor(s/60),h=s%60;return`${x.toString().padStart(2,"0")}:${h.toString().padStart(2,"0")}`},q=s=>s?new Date(s).toLocaleTimeString():"-",V=s=>{const x=parseInt(s.target.value,10)||0;f(x)};if(!a)return null;const ne=e.jsxs("div",{className:"modal-overlay",onClick:m,children:[e.jsxs("div",{className:`modal-container ${u==="up"?"up-theme":"down-theme"}`,onClick:s=>s.stopPropagation(),children:[e.jsxs("div",{className:"modal-header",children:[e.jsxs("div",{className:"pair-info",children:[e.jsx("div",{className:"pair-icon",children:e.jsx("img",{src:`https://images.weserv.nl/?url=https://bin.bnbstatic.com/static/assets/logos/${A.split("USDT")[0]}.png`,style:{width:30,height:30},alt:A,loading:"lazy"})}),e.jsx("div",{className:"pair-name",children:A.replace("USDT","/USDT")})]}),e.jsx("button",{className:"close-btn",onClick:m,children:"×"})]}),i!=="configuring"&&e.jsxs("div",{className:"trade-progress-section",children:[e.jsx("div",{className:"progress-container",children:e.jsx("div",{className:"circular-progress",style:{background:`conic-gradient(${u==="up"?"#00C076":"#FF6838"} ${Z()}%, #3a3a3a ${Z()}%)`},children:e.jsxs("div",{className:"progress-inner",children:[e.jsx("div",{className:"progress-time",children:L(g)}),e.jsx("div",{className:"progress-label",children:"Remaining"})]})})}),N&&e.jsxs("div",{className:"trade-details",children:[e.jsxs("div",{className:"trade-details-row",children:[e.jsx("span",{children:"Futures Amount:"}),e.jsxs("span",{children:[N.futuresAmount," USDT"]})]}),e.jsxs("div",{className:"trade-details-row",children:[e.jsx("span",{children:"Contract Duration:"}),e.jsxs("span",{children:[N.contractDuration,"s"]})]}),e.jsxs("div",{className:"trade-details-row",children:[e.jsx("span",{children:"Future Type:"}),e.jsx("span",{className:N.futuresStatus==="long"?"up-text":"down-text",children:N.futuresStatus.toUpperCase()})]}),e.jsxs("div",{className:"trade-details-row",children:[e.jsx("span",{children:"Open Position Price:"}),e.jsxs("span",{children:[N.openPositionPrice.toFixed(4)," USDT"]})]}),e.jsxs("div",{className:"trade-details-row",children:[e.jsx("span",{children:"Close Position Price:"}),e.jsxs("span",{children:[N.closePositionPrice?N.closePositionPrice.toFixed(4):"-"," USDT"]})]}),e.jsxs("div",{className:"trade-details-row",children:[e.jsx("span",{children:"Leverage:"}),e.jsxs("span",{children:[N.leverage,"x"]})]}),e.jsxs("div",{className:"trade-details-row",children:[e.jsx("span",{children:"Open Time:"}),e.jsx("span",{children:q(N.openPositionTime)})]}),e.jsxs("div",{className:"trade-details-row",children:[e.jsx("span",{children:"Close Time:"}),e.jsx("span",{children:q(N.closePositionTime)})]})]}),e.jsxs("div",{className:"trade-actions",children:[i==="in-progress"&&e.jsx("button",{className:"trade-action-btn keep-buying",onClick:m,children:"Keep Buying"}),i==="completed"&&e.jsxs(e.Fragment,{children:[e.jsx("button",{className:"trade-action-btn secondary",onClick:m,children:"Close"}),e.jsx("button",{className:"trade-action-btn primary",onClick:re,children:"New Trade"})]})]})]}),i==="configuring"&&e.jsxs(e.Fragment,{children:[e.jsx("div",{className:`direction-indicator ${u}-indicator`,children:u==="up"?"Predicting price will go UP":"Predicting price will go DOWN"}),e.jsxs("div",{className:"modal-content",children:[e.jsxs("div",{className:"section",children:[e.jsxs("div",{className:"section-title",children:[e.jsx("span",{children:"Contract Duration"}),e.jsx("span",{children:"Payout"})]}),e.jsx("div",{className:"options-container",children:[{duration:"60",payout:"10"},{duration:"120",payout:"20"},{duration:"180",payout:"40"},{duration:"240",payout:"80"}].map(s=>e.jsxs("button",{className:`option-btn ${S===s.duration?"selected":""}`,onClick:()=>H(s.duration,s.payout),children:[s.duration,"s (",s.payout,"%)"]},s.duration))})]}),e.jsxs("div",{className:"section",children:[e.jsx("div",{className:"section-title",children:e.jsx("span",{children:"Leverage"})}),e.jsx("div",{className:"options-container",children:["1","2","5","10","20"].map(s=>e.jsxs("button",{className:`option-btn ${D===s?"selected":""}`,onClick:()=>j(s),children:[s,"×"]},s))})]}),e.jsxs("div",{className:"section",children:[e.jsx("div",{className:"section-title",children:e.jsx("span",{children:"Futures Amount (USDT)"})}),e.jsxs("div",{className:"amount-control",children:[e.jsx("button",{className:"amount-btn",onClick:()=>f(s=>Math.max(1,s-1)),children:"-"}),e.jsx("input",{type:"number",className:"amount-inputs",value:r,onChange:V,min:"1",placeholder:"Enter amount"}),e.jsx("button",{className:"amount-btn",onClick:()=>f(s=>s+1),children:"+"})]}),e.jsxs("div",{className:"balance-info",children:["Available: ",l," USDT"]}),C&&e.jsx("div",{className:"error-message",style:{color:"#FF6838",fontSize:"12px",marginTop:"5px"},children:C})]}),e.jsxs("div",{className:"profit-info",children:["Projected Profit: ",ae(r,D,$).toFixed(2)," USDT"]}),e.jsx("button",{className:"confirm-btn",onClick:ie,disabled:!u||r<30||r>l||J,style:{opacity:!u||r<30||r>l?.5:1,cursor:!u||r<30||r>l?"not-allowed":"pointer"},children:J?"CREATING...":r>l?"INSUFFICIENT BALANCE":"CONFIRM ORDER"})]})]})]}),e.jsx("style",{children:` 
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
  }

  .modal-container {
      background-color: #2a2a2a;
      border-radius: 12px;
      width: 100%;
      max-width: 400px;
      box-shadow: 0 5px 20px rgba(0, 0, 0, 0.4);
      overflow: hidden;
      max-height: 90vh;
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
`})]});return pe.createPortal(ne,document.body)};function Se(a){const{countFutures:m,futuretLoading:u,listFutures:v,handleOpenOrderModal:T,formatNumber:A,formatDateTime:F}=a;return e.jsxs("div",{className:"orders-container",children:[m&&!u&&(v==null?void 0:v.map(l=>{var U;return e.jsxs("div",{className:"order-card",onClick:()=>T(l),children:[e.jsxs("div",{className:"order-header",children:[e.jsx("div",{className:"order-pair",children:l.symbol||"BTC/USDT"}),e.jsx("div",{className:`order-direction ${l.futuresStatus==="long"?"buy":"sell"}`,children:l.futuresStatus==="long"?n("pages.futures.actions.buyUp"):n("pages.futures.actions.buyDown")})]}),e.jsxs("div",{className:`order-status ${l.finalized?"closed":"open"}`,children:["● ",l.finalized?n("pages.futures.orderDetails.closed"):n("pages.futures.orderDetails.open")]}),e.jsxs("div",{className:"order-details",children:[e.jsxs("div",{className:"order-row",children:[e.jsx("span",{className:"order-label",children:n("pages.futures.orderDetails.futuresAmount")}),e.jsxs("span",{className:"order-value",children:["$",l.futuresAmount]})]}),e.jsxs("div",{className:"order-row",children:[e.jsx("span",{className:"order-label",children:n("pages.futures.orderDetails.openPositionPrice")}),e.jsx("span",{className:"order-value",children:A((U=l==null?void 0:l.openPositionPrice)==null?void 0:U.toString(),(l==null?void 0:l.openPositionPrice)>1e3?0:2)})]}),e.jsxs("div",{className:"order-row",children:[e.jsx("span",{className:"order-label",children:n("pages.futures.orderDetails.openPositionTime")}),e.jsx("span",{className:"order-value",children:F(l.openPositionTime)})]}),e.jsxs("div",{className:"order-row",children:[e.jsx("span",{className:"order-label",children:n("pages.futures.orderDetails.leverage")}),e.jsxs("span",{className:"order-value",children:[l.leverage,"x"]})]})]})]},l.id)})),v.length===0&&!u&&e.jsxs("div",{className:"no-orders",children:[e.jsx("i",{className:"fas fa-file-invoice"}),e.jsx("div",{children:n("pages.futures.list.noOrders")})]}),e.jsx("style",{children:` 
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
            `})]})}function ze(){const a=Ne(),m=O(de.selectRows);O(de.selectLoading);const u=O(G.selectRows),v=O(G.pendingRows),T=O(G.pendingcount),A=O(G.pendingLoading),F=O(G.selectLoading),l=O(G.selectCount),[U,S]=t.useState(!1),[I,$]=t.useState(null),[W,D]=t.useState(!1),[j,r]=t.useState("BTCUSDT"),[f,i]=t.useState("0"),[d,g]=t.useState("0"),[p,P]=t.useState("0"),[y,C]=t.useState("0"),[B,k]=t.useState("0"),[z,te]=t.useState("openOrders"),[M,J]=t.useState(null),[K,N]=t.useState(!1),[X,H]=t.useState(!0),[ie,oe]=t.useState(!0),[se,re]=t.useState(0),[ae,Z]=t.useState([]),L=t.useRef(null),q=t.useRef(j),V=t.useRef(),ne=t.useCallback((o,c=2)=>{if(o==null)return"0.00";const b=typeof o=="string"?parseFloat(o):o;return isNaN(b)?"0.00":b.toFixed(c)},[]),s=t.useCallback((o,c=2)=>{if(o==null)return"0.00";const b=typeof o=="string"?parseFloat(o):o;return isNaN(b)?"0.00":b.toLocaleString(void 0,{minimumFractionDigits:c,maximumFractionDigits:c})},[]),x=t.useCallback(o=>{if(o==null)return"0";const c=typeof o=="string"?parseFloat(o):o;return isNaN(c)?"0":c>=1e9?(c/1e9).toFixed(2)+n("pages.marketDetail.volume.billion"):c>=1e6?(c/1e6).toFixed(2)+n("pages.marketDetail.volume.million"):s(c,0)},[s]),h=t.useCallback(o=>{if(!o)return n("pages.assetsDetail.status.pending");try{const c=new Date(o);if(isNaN(c.getTime()))return o;const b=new Date;return c.toDateString()===b.toDateString()?n("pages.history.dateFormats.today",c.toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"})):n("pages.history.dateFormats.yesterday",c.toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"}))}catch(c){return console.error("Error formatting date:",c,o),o}},[]),R=t.useCallback(o=>{if(!o)return n("pages.assetsDetail.status.pending");try{const c=new Date(o);return isNaN(c.getTime())?o:`${c.toLocaleDateString([],{year:"numeric",month:"short",day:"numeric"})} ${c.toLocaleTimeString([],{hour:"2-digit",minute:"2-digit",second:"2-digit"})}`}catch(c){return console.error("Error formatting date:",c,o),o}},[]),ee=t.useCallback(()=>{if((m==null?void 0:m.length)>0){const o=m.find(c=>c.symbol==="USDT");re((o==null?void 0:o.amount)||0)}},[m]),Y=t.useMemo(()=>z==="openOrders"?{count:T,loading:A,list:Array.isArray(v)?v:[]}:{count:l,loading:F,list:Array.isArray(u)?u:[]},[z,T,A,v,l,F,u]);t.useEffect(()=>{let o=!0;return(async()=>{if(j)try{H(!0);const b=await fetch(`https://api.binance.com/api/v3/ticker/24hr?symbol=${j}`);if(!b.ok)throw new Error("Failed to fetch ticker data");const w=await b.json();o&&(i(w.lastPrice||"0"),g(w.priceChangePercent||"0"),P(w.highPrice||"0"),C(w.lowPrice||"0"),k(w.volume||"0"),H(!1))}catch(b){console.error("Error fetching initial data:",b),o&&H(!1)}})(),()=>{o=!1}},[j]),t.useEffect(()=>{if(!j)return;let o=!0;q.current=j;const c=()=>{L.current&&L.current.close(),V.current&&clearTimeout(V.current);try{L.current=new WebSocket(`wss://stream.binance.com:9443/ws/${j.toLowerCase()}@ticker`),L.current.onopen=()=>{},L.current.onmessage=b=>{if(o)try{const w=JSON.parse(b.data);w.s===q.current&&o&&(i(w.c||"0"),g(w.P||"0"),P(w.h||"0"),C(w.l||"0"),k(w.v||"0"))}catch(w){console.error("Error parsing WebSocket message:",w)}},L.current.onerror=b=>{console.error("Ticker WebSocket error:",b)},L.current.onclose=b=>{j===q.current&&o&&(V.current=setTimeout(c,2e3))}}catch(b){console.error("WebSocket connection error:",b)}};return c(),()=>{o=!1,L.current&&L.current.close(),V.current&&clearTimeout(V.current)}},[j]),t.useEffect(()=>{const o=setTimeout(()=>{oe(!1)},1500);return()=>clearTimeout(o)},[]),t.useEffect(()=>{let o=!0;return(async()=>{try{await Promise.all([a(Q.doFetchPending()),a(ue.doFetch())])}catch(b){o&&console.error("Error fetching data:",b)}})(),()=>{o=!1}},[a]),t.useEffect(()=>{ee()},[ee]);const me=t.useCallback(()=>{D(!0)},[]),xe=t.useCallback(()=>{D(!1)},[]),ge=t.useCallback(o=>{H(!0),i("0"),g("0"),P("0"),C("0"),k("0"),r(o),D(!1)},[]),ce=t.useCallback(o=>{a(ue.doFetch()),$(o),S(!0)},[a]),he=t.useCallback(()=>{S(!1),$(null)},[]),fe=t.useCallback(o=>{J(o),N(!0)},[]),be=t.useCallback(()=>{N(!1),J(null)},[]),le=t.useCallback(o=>{o==="openOrders"?(te("openOrders"),a(Q.doFetchPending())):(te("recentOrders"),a(Q.doFetch()))},[a]),_=t.useCallback(({width:o="100%",height:c="1em"})=>e.jsx("div",{className:"loading-placeholder",style:{width:o,height:c}}),[]),je=t.useMemo(()=>`https://images.weserv.nl/?url=https://bin.bnbstatic.com/static/assets/logos/${j.split("USDT")[0]}.png`,[j]);return e.jsxs("div",{className:"container",children:[e.jsxs("div",{className:"header",children:[e.jsxs("div",{className:"header-top",children:[e.jsxs("div",{className:"market-info",children:[e.jsx("div",{className:"market-icon",children:e.jsx("img",{src:je,style:{width:30,height:30},alt:j,loading:"lazy",onError:o=>{o.target.style.display="none"}})}),e.jsx("div",{className:"market-name",children:j}),e.jsx("div",{className:"market-change",style:{color:d!=null&&d.startsWith("-")?"#FF6838":"#00C076"},children:d!=="0"?`${d}%`:e.jsx(_,{width:"50px",height:"16px"})})]}),e.jsx("div",{className:"additional-actions",onClick:me,children:e.jsx("i",{className:"fas fa-filter"})})]}),e.jsx("div",{className:"market-price",children:f!=="0"?`$${s(f)}`:e.jsx(_,{width:"120px",height:"28px"})}),e.jsxs("div",{className:"market-stats",children:[e.jsxs("span",{children:[n("pages.marketDetail.stats.high"),":"," ",p!=="0"?`$${s(p)}`:e.jsx(_,{width:"80px",height:"12px"})]}),e.jsxs("span",{children:[n("pages.marketDetail.stats.volume"),":"," ",B!=="0"?`${x(B)} ${j.replace("USDT","")}`:e.jsx(_,{width:"80px",height:"12px"})]}),e.jsxs("span",{children:[n("pages.marketDetail.stats.low"),":"," ",y!=="0"?`$${s(y)}`:e.jsx(_,{width:"80px",height:"12px"})]})]})]}),e.jsx(Fe,{symbol:j}),e.jsxs("div",{className:"future-action-buttons",children:[e.jsx("button",{className:"action-button buy-button",onClick:()=>ce("up"),children:n("pages.futures.actions.buyUp")}),e.jsx("button",{className:"action-button sell-button",onClick:()=>ce("down"),children:n("pages.futures.actions.buyDown")})]}),e.jsxs("div",{className:"section-tabs",children:[e.jsxs("div",{className:`tab ${z==="openOrders"?"active":""}`,onClick:()=>le("openOrders"),children:[n("pages.futures.tabs.openOrders")," (",T||0,")"]}),e.jsxs("div",{className:`tab ${z==="recentOrders"?"active":""}`,onClick:()=>le("recentOrders"),children:[n("pages.futures.tabs.recentOrders")," (",l||0,")"]})]}),e.jsx(Se,{countFutures:Y.count,futuretLoading:Y.loading,listFutures:Y.list,handleOpenOrderModal:fe,formatNumber:s,formatDateTime:h}),K&&M&&e.jsx(De,{selectedOrder:M,onClose:be,formatDateTimeDetailed:R,safeToFixed:ne}),e.jsx(ke,{isOpen:U,onClose:he,direction:I,dispatch:a,listAssets:m,selectedCoin:j,marketPrice:f,availableBalance:se,setOpeningOrders:Z}),e.jsx(we,{isOpen:W,onClose:xe,onSelectCoin:ge}),e.jsx("style",{children:`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }
        
        .container {
          max-width: 400px;
          margin: 0 auto;
          padding-bottom: 70px;
          background-color: #000000;
          color: #FFFFFF;
          min-height: 100vh;
        }

        .modal-content {
  max-height: 90vh;
  overflow-y: scroll;  /* allow scroll */
  scrollbar-width: none; /* Firefox */
}
        
        /* Header Section */
        .header {
          background-color: #000000;
          padding: 20px 15px 15px;
          position: sticky;
          top: 0;
          z-index: 100;
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
          background-color: #F3BA2F;
          margin-right: 10px;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        
        .market-icon i {
          color: #000;
        }
        
        .market-name {
          font-weight: bold;
          font-size: 18px;
          margin-right: 10px;
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
          color: #AAAAAA;
          flex-wrap: wrap;
        }
        
        .market-stats span {
          margin-right: 10px;
          margin-bottom: 5px;
        }
        
        .additional-actions {
          color: #AAAAAA;
          font-size: 20px;
          cursor: pointer;
        }
        
        /* Trading View Chart */
        .chart-container {
          height: 480px;
          background-color: #1A1A1A;
          margin: 15px;
          border-radius: 12px;
          position: relative;
          overflow: hidden;
        }
        
        .chart-placeholder {
          width: 100%;
          height: 100%;
        }
        
        .chart-loading {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          background-color: rgba(0, 0, 0, 0.7);
          z-index: 10;
          color: #777;
        }
        
        .chart-controls {
          position: absolute;
          bottom: 10px;
          right: 10px;
          display: flex;
          gap: 5px;
          z-index: 5;
        }
        
        .chart-timeframe {
          background-color: #2A2A2A;
          color: #AAAAAA;
          border: none;
          border-radius: 4px;
          padding: 4px 8px;
          font-size: 12px;
        }
        
        /* Action Buttons */
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
        }
        
        .buy-button {
          background-color: #00C076;
          color: white;
        }
        
        .sell-button {
          background-color: #FF6838;
          color: white;
        }
        
        /* Section Tabs */
        .section-tabs {
          display: flex;
          margin: 15px 15px 0;
          border-bottom: 1px solid #2A2A2A;
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
          color: #FFFFFF;
          font-weight: bold;
        }
        
        .tab.active::after {
          content: '';
          position: absolute;
          bottom: -1px;
          left: 0;
          right: 0;
          height: 2px;
          background-color: #00C076;
        }
        
        /* Orders Container */
        .orders-container {
          margin: 15px;
        }
        
        .order-card {
          background-color: #1A1A1A;
          border-radius: 8px;
          padding: 15px;
          margin-bottom: 15px;
          cursor: pointer;
          transition: transform 0.2s, box-shadow 0.2s;
        }
        
        .order-card.loading {
          cursor: default;
        }
        
        .order-card:hover:not(.loading) {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
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
        }
        
        .order-direction {
          font-size: 12px;
          padding: 4px 8px;
          border-radius: 4px;
          font-weight: bold;
        }
        
        .order-direction.buy {
          background-color: rgba(0, 192, 118, 0.2);
          color: #00C076;
        }
        
        .order-direction.sell {
          background-color: rgba(255, 104, 56, 0.2);
          color: #FF6838;
        }
        
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
        
        .order-details {
          border-top: 1px solid #2A2A2A;
          padding-top: 12px;
        }
        
        .order-row {
          display: flex;
          justify-content: space-between;
          margin-bottom: 8px;
          font-size: 13px;
        }
        
        .order-label {
          color: #AAAAAA;
        }
        
        .order-value {
          font-weight: 500;
        }
        
        .order-value.buy {
          color: #00C076;
        }
        
        .order-value.sell {
          color: #FF6838;
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
        }
        
        /* Loading Placeholder */
        .loading-placeholder {
          animation: pulse 1.5s ease-in-out infinite;
          background-color: #2A2A2A;
          border-radius: 4px;
        }
        
        @keyframes pulse {
          0% { opacity: 1; }
          50% { opacity: 0.5; }
          100% { opacity: 1; }
        }
        
        /* Modal Styles */
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
          background-color: #1A1A1A;
          border-radius: 12px;
          width: 100%;
          max-width: 400px;
          max-height: 80vh;
          overflow-y: auto;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        }
        
        .modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 20px;
          border-bottom: 1px solid #2A2A2A;
        }
        
        .modal-header h2 {
          font-size: 18px;
          font-weight: bold;
        }
        
        .modal-close {
          background: none;
          border: none;
          color: #AAAAAA;
          font-size: 20px;
          cursor: pointer;
        }
        
        .modal-body {
          padding: 20px;
        }
        
        .modal-footer {
          display: flex;
          justify-content: flex-end;
          padding: 20px;
          border-top: 1px solid #2A2A2A;
          gap: 10px;
        }
        
        .modal-button {
          background-color: #2A2A2A;
          color: white;
          border: none;
          border-radius: 6px;
          padding: 10px 20px;
          cursor: pointer;
          font-weight: bold;
        }
        
        .close-order-button {
          background-color: #FF6838;
          color: white;
          border: none;
          border-radius: 6px;
          padding: 10px 20px;
          cursor: pointer;
          font-weight: bold;
        }
        
        .order-detail-section {
          margin-bottom: 20px;
        }
        
        .order-detail-section h3 {
          font-size: 14px;
          color: #AAAAAA;
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
        }
        
        .detail-direction {
          font-size: 14px;
          padding: 4px 8px;
          border-radius: 4px;
          font-weight: bold;
        }
        
        .detail-direction.buy {
          background-color: rgba(0, 192, 118, 0.2);
          color: #00C076;
        }
        
        .detail-direction.sell {
          background-color: rgba(255, 104, 56, 0.2);
          color: #FF6838;
        }
        
        .detail-status {
          font-size: 14px;
          margin-bottom: 15px;
        }
        
        .detail-status.open {
          color: #00C076;
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
          color: #AAAAAA;
        }
        
        .detail-value {
          font-weight: 500;
        }
        
        .detail-value.profit {
          color: #00C076;
        }
        
        .detail-value.loss {
          color: #FF6838;
        }
      `})]})}const De=({selectedOrder:a,onClose:m,formatDateTimeDetailed:u,safeToFixed:v})=>e.jsx("div",{className:"modal-overlays",onClick:m,children:e.jsxs("div",{className:"modal-content",onClick:T=>T.stopPropagation(),children:[e.jsxs("div",{className:"modal-header",children:[e.jsx("h2",{children:n("pages.futures.orderDetails.title")}),e.jsx("button",{className:"modal-close",onClick:m,children:e.jsx("i",{className:"fas fa-times"})})]}),e.jsxs("div",{className:"modal-body",children:[e.jsxs("div",{className:"order-detail-section",children:[e.jsxs("div",{className:"detail-header",children:[e.jsx("span",{className:"detail-pair",children:a.symbol||a.pair}),e.jsx("span",{className:`detail-direction ${a.futuresStatus==="long"||a.direction==="BUY UP"?"buy":"sell"}`,children:a.futuresStatus==="long"?n("pages.futures.actions.buyUp"):a.futuresStatus==="short"?n("pages.futures.actions.buyDown"):a.direction})]}),e.jsxs("div",{className:`detail-status ${a.finalized?"closed":"open"}`,children:["● ",a.finalized?n("pages.futures.orderDetails.closed"):n("pages.futures.orderDetails.open")]})]}),e.jsxs("div",{className:"order-detail-section",children:[e.jsx(E,{label:n("pages.futures.orderDetails.futuresAmount"),value:`${a.futuresAmount||a.investment} USDT`}),a.contractDuration&&e.jsx(E,{label:n("pages.futures.orderDetails.contractDuration"),value:`${a.contractDuration} ${n("pages.futures.orderDetails.seconds")}`}),e.jsx(E,{label:n("pages.futures.orderDetails.futuresStatus"),value:a.closePositionTime?n("pages.futures.orderDetails.completed"):n("pages.futures.orderDetails.open")}),e.jsx(E,{label:n("pages.futures.orderDetails.openPositionPrice"),value:a.openPositionPrice||a.openPrice}),e.jsx(E,{label:n("pages.futures.orderDetails.openPositionTime"),value:u(a.openPositionTime||a.openTime)}),a.closePositionPrice&&e.jsx(E,{label:n("pages.futures.orderDetails.closePositionPrice"),value:a.closePositionPrice}),a.closePositionTime&&e.jsx(E,{label:n("pages.futures.orderDetails.closePositionTime"),value:u(a.closePositionTime)}),e.jsx(E,{label:n("pages.futures.orderDetails.profitLossAmount"),value:a.profitAndLossAmount||a.pnl?`${v(a.profitAndLossAmount||a.pnl,2)} USDT`:"__",className:a.control==="profit"?"profit":"loss"}),e.jsx(E,{label:n("pages.futures.orderDetails.leverage"),value:`${a.leverage}X`})]})]}),e.jsx("div",{className:"modal-footer",children:e.jsx("button",{className:"modal-button",onClick:m,children:n("pages.futures.orderDetails.done")})})]})}),E=({label:a,value:m,className:u=""})=>e.jsxs("div",{className:"detail-row",children:[e.jsx("span",{className:"detail-label",children:a}),e.jsx("span",{className:`detail-value ${u}`,children:m})]});export{ze as default};
