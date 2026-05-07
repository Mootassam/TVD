import{F as ne,p as se,al as ae,i as a,k as r,L as te,j as d}from"./index-6af00e78.js";import{T as ce}from"./TradingViewChart-158bc88c.js";import{C as oe}from"./CoinSelectorSidebar-c7303105.js";function ie(){const R=se(),{id:G}=ae(),C=a.useRef(null),B=a.useRef(null),p=a.useRef(null),k=a.useRef(null),F=a.useRef(G||"EURUSD"),[J,I]=a.useState([]),[m,X]=a.useState(null),[U,E]=a.useState(null),x=a.useRef({}),[t,V]=a.useState(G||"EURUSD"),[D,H]=a.useState(null),[O,Y]=a.useState([]),[N,M]=a.useState("orderBook"),[K,v]=a.useState(!1),[le,L]=a.useState(!0);a.useEffect(()=>{F.current=t},[t]);const S=a.useCallback(e=>`~m~${e.length}~m~${e}`,[]),W=a.useCallback(e=>{const n=[];let s=e;for(;s.length>0&&s.startsWith("~m~");){const i=s.indexOf("~m~",3),u=parseInt(s.substring(3,i)),l=s.substr(i+3,u);n.push(l),s=s.substr(i+3+u)}return n},[]),Z=a.useCallback(e=>{try{const n=e.replace(/^=\{/,"{");return JSON.parse(n).symbol||"UNKNOWN"}catch{return e}},[]),g=a.useCallback(e=>{const n=C.current,s=B.current;!n||n.readyState!==WebSocket.OPEN||!s||p.current!==e&&(p.current&&n.send(S(JSON.stringify({m:"quote_remove_symbols",p:[s,p.current]}))),n.send(S(JSON.stringify({m:"quote_add_symbols",p:[s,e]}))),p.current=e,I([]),X(null),E(null),L(!0),delete x.current[e])},[S]),j=a.useCallback(()=>{C.current&&(C.current.close(),C.current=null);const e=new WebSocket("wss://widgetdata.tradingview.com/socket.io/websocket");C.current=e,e.onopen=()=>{const n="qs_"+Math.random().toString(36).substring(2,12);B.current=n,e.send(S(JSON.stringify({m:"quote_create_session",p:[n]}))),e.send(S(JSON.stringify({m:"quote_set_fields",p:[n,"ask","bid","ask_size","bid_size"]}))),g(F.current)},e.onmessage=n=>{const s=n.data;if(s.startsWith("~h~")){e.send(s);return}W(s).forEach(u=>{try{const l=JSON.parse(u);if(l.m==="qsd"){const c=l.p[1],o=Z(c.n),y=c.v;if(!y)return;const b={symbol:o,ask:y.ask??0,bid:y.bid??0};I(w=>[...w.filter(re=>re.symbol!==o),b])}}catch{}})},e.onclose=n=>{p.current=null,n.wasClean||(k.current=setTimeout(()=>{j()},3e3))},e.onerror=n=>{console.error("WebSocket error:",n)}},[S,W,Z,g]);a.useEffect(()=>(j(),()=>{k.current&&clearTimeout(k.current),C.current&&(C.current.close(),C.current=null)}),[j]),a.useEffect(()=>{g(t)},[t,g]),a.useEffect(()=>{const e=J.find(s=>s.symbol===t);if(!e||!e.ask||!e.bid)return;const n=(e.ask+e.bid)/2;if(X(n),L(!1),x.current[t]===void 0)x.current[t]=n,E(0);else{const s=x.current[t],i=(n-s)/s*100;E(i)}},[J,t]);const f=a.useCallback(e=>["XAUUSD","XAUEUR","XAUGBP"].includes(e)||["XAGUSD","XAGEUR","XAGGBP"].includes(e)||["XPTUSD","XPTEUR"].includes(e)||["XPDUSD"].includes(e)||["USOIL","UKOIL","BRENT","WTI","CRUDE"].includes(e)?2:["NGAS","HEAT","GAS"].includes(e)?3:["BTCUSD","ETHUSD"].includes(e)?2:["XRPUSD","ADAUSD","DOGEUSD","MATICUSD","UNIUSD","THETAUSD","CHZUSD","APEUSD"].includes(e)?4:["LTCUSD","BCHUSD","FILUSD","AXSUSD","SANDUSD","MANAUSD","ENJUSD"].includes(e)||["DOTUSD","AVAXUSD","LINKUSD","ATOMUSD","NEARUSD"].includes(e)?2:["ALGOUSD","VETUSD"].includes(e)?4:["US30","US500","NAS100","US2000","GER40","UK100","FRA40","EU50","JP225","HK50","AUS200","TWII","KR100","IN50","TECH100"].includes(e)?0:e.endsWith("JPY")?3:e.includes("USD")&&!e.startsWith("USD")?5:2,[]),A=a.useCallback((e,n)=>{if(e===null||isNaN(e))return"0.00000";const s=n?f(n):5;return e.toFixed(s)},[f]),T=a.useCallback(e=>e===null||isNaN(e)?"0.00":e>=1e6?(e/1e6).toFixed(2)+"M":e>=1e3?(e/1e3).toFixed(2)+"K":e.toFixed(2),[]),q=a.useCallback((e,n)=>{const s=f(n),i=e*2e-4,u=[],l=[];for(let c=1;c<=10;c++){const o=e-i*c*(.5+Math.random()*.5),y=e+i*c*(.5+Math.random()*.5),b=Math.random()*1e6+5e5;u.push([Number(o.toFixed(s)),Number(b.toFixed(2))]),l.push([Number(y.toFixed(s)),Number(b.toFixed(2))])}return u.sort((c,o)=>o[0]-c[0]),l.sort((c,o)=>c[0]-o[0]),{lastUpdateId:Date.now(),bids:u,asks:l}},[f]),P=a.useCallback((e,n,s=10)=>{const i=[],u=f(n),l=Date.now();for(let c=0;c<s;c++){const o=Math.random()>.5?"buy":"sell",y=(Math.random()*2-1)*1e-4*e,b=e+y,w=Math.random()*1e5+5e4;i.push({id:`${l-c*1e3}-${c}`,price:Number(b.toFixed(u)),quantity:Number(w.toFixed(2)),time:l-c*1e3,side:o})}return i.sort((c,o)=>o.time-c.time)},[f]);a.useEffect(()=>{if(m===null)return;const e=setInterval(()=>{H(q(m,t)),Y(P(m,t,10))},2e3);return()=>clearInterval(e)},[m,t,q,P]),a.useEffect(()=>{m!==null&&(H(q(m,t)),Y(P(m,t,10)))},[m,t,q,P]);const z=[{symbol:"EURUSD",name:"EUR / USD",baseCurrency:"EUR",quoteCurrency:"USD"},{symbol:"GBPUSD",name:"GBP / USD",baseCurrency:"GBP",quoteCurrency:"USD"},{symbol:"USDJPY",name:"USD / JPY",baseCurrency:"USD",quoteCurrency:"JPY"},{symbol:"AUDUSD",name:"AUD / USD",baseCurrency:"AUD",quoteCurrency:"USD"},{symbol:"USDCAD",name:"USD / CAD",baseCurrency:"USD",quoteCurrency:"CAD"},{symbol:"USDCHF",name:"USD / CHF",baseCurrency:"USD",quoteCurrency:"CHF"},{symbol:"NZDUSD",name:"NZD / USD",baseCurrency:"NZD",quoteCurrency:"USD"},{symbol:"EURGBP",name:"EUR / GBP",baseCurrency:"EUR",quoteCurrency:"GBP"},{symbol:"EURJPY",name:"EUR / JPY",baseCurrency:"EUR",quoteCurrency:"JPY"},{symbol:"GBPJPY",name:"GBP / JPY",baseCurrency:"GBP",quoteCurrency:"JPY"},{symbol:"AUDJPY",name:"AUD / JPY",baseCurrency:"AUD",quoteCurrency:"JPY"},{symbol:"EURAUD",name:"EUR / AUD",baseCurrency:"EUR",quoteCurrency:"AUD"},{symbol:"GBPAUD",name:"GBP / AUD",baseCurrency:"GBP",quoteCurrency:"AUD"},{symbol:"USDMXN",name:"USD / MXN",baseCurrency:"USD",quoteCurrency:"MXN"},{symbol:"USDTRY",name:"USD / TRY",baseCurrency:"USD",quoteCurrency:"TRY"},{symbol:"USDZAR",name:"USD / ZAR",baseCurrency:"USD",quoteCurrency:"ZAR"},{symbol:"USDSGD",name:"USD / SGD",baseCurrency:"USD",quoteCurrency:"SGD"},{symbol:"USDHKD",name:"USD / HKD",baseCurrency:"USD",quoteCurrency:"HKD"},{symbol:"USDKRW",name:"USD / KRW",baseCurrency:"USD",quoteCurrency:"KRW"},{symbol:"USDINR",name:"USD / INR",baseCurrency:"USD",quoteCurrency:"INR"},{symbol:"EURCHF",name:"EUR / CHF",baseCurrency:"EUR",quoteCurrency:"CHF"},{symbol:"EURNZD",name:"EUR / NZD",baseCurrency:"EUR",quoteCurrency:"NZD"},{symbol:"GBPEUR",name:"GBP / EUR",baseCurrency:"GBP",quoteCurrency:"EUR"},{symbol:"AUDNZD",name:"AUD / NZD",baseCurrency:"AUD",quoteCurrency:"NZD"},{symbol:"CADJPY",name:"CAD / JPY",baseCurrency:"CAD",quoteCurrency:"JPY"},{symbol:"CHFJPY",name:"CHF / JPY",baseCurrency:"CHF",quoteCurrency:"JPY"},{symbol:"NZDJPY",name:"NZD / JPY",baseCurrency:"NZD",quoteCurrency:"JPY"},{symbol:"SGDJPY",name:"SGD / JPY",baseCurrency:"SGD",quoteCurrency:"JPY"},{symbol:"HKDJPY",name:"HKD / JPY",baseCurrency:"HKD",quoteCurrency:"JPY"},{symbol:"ZARJPY",name:"ZAR / JPY",baseCurrency:"ZAR",quoteCurrency:"JPY"},{symbol:"XAUUSD",name:"Gold",baseCurrency:"XAU",quoteCurrency:"USD"},{symbol:"XAGUSD",name:"Silver",baseCurrency:"XAG",quoteCurrency:"USD"},{symbol:"XPTUSD",name:"Platinum",baseCurrency:"XPT",quoteCurrency:"USD"},{symbol:"XPDUSD",name:"Palladium",baseCurrency:"XPD",quoteCurrency:"USD"},{symbol:"XAUEUR",name:"Gold / EUR",baseCurrency:"XAU",quoteCurrency:"EUR"},{symbol:"XAGEUR",name:"Silver / EUR",baseCurrency:"XAG",quoteCurrency:"EUR"},{symbol:"XPTEUR",name:"Platinum / EUR",baseCurrency:"XPT",quoteCurrency:"EUR"},{symbol:"XAUGBP",name:"Gold / GBP",baseCurrency:"XAU",quoteCurrency:"GBP"},{symbol:"XAGGBP",name:"Silver / GBP",baseCurrency:"XAG",quoteCurrency:"GBP"},{symbol:"USOIL",name:"US Oil",baseCurrency:"USOIL",quoteCurrency:"USD"},{symbol:"UKOIL",name:"UK Oil",baseCurrency:"UKOIL",quoteCurrency:"USD"},{symbol:"BRENT",name:"Brent",baseCurrency:"BRENT",quoteCurrency:"USD"},{symbol:"WTI",name:"WTI",baseCurrency:"WTI",quoteCurrency:"USD"},{symbol:"CRUDE",name:"Crude",baseCurrency:"CRUDE",quoteCurrency:"USD"},{symbol:"NGAS",name:"Natural Gas",baseCurrency:"NGAS",quoteCurrency:"USD"},{symbol:"HEAT",name:"Heating Oil",baseCurrency:"HEAT",quoteCurrency:"USD"},{symbol:"GAS",name:"Gasoline",baseCurrency:"GAS",quoteCurrency:"USD"},{symbol:"US30",name:"Dow 30",baseCurrency:"US30",quoteCurrency:"USD"},{symbol:"US500",name:"S&P 500",baseCurrency:"US500",quoteCurrency:"USD"},{symbol:"NAS100",name:"Nasdaq 100",baseCurrency:"NAS100",quoteCurrency:"USD"},{symbol:"US2000",name:"Russell 2000",baseCurrency:"US2000",quoteCurrency:"USD"},{symbol:"GER40",name:"DAX",baseCurrency:"GER40",quoteCurrency:"EUR"},{symbol:"UK100",name:"FTSE 100",baseCurrency:"UK100",quoteCurrency:"GBP"},{symbol:"FRA40",name:"CAC 40",baseCurrency:"FRA40",quoteCurrency:"EUR"},{symbol:"EU50",name:"Euro Stoxx 50",baseCurrency:"EU50",quoteCurrency:"EUR"},{symbol:"JP225",name:"Nikkei 225",baseCurrency:"JP225",quoteCurrency:"JPY"},{symbol:"HK50",name:"Hang Seng",baseCurrency:"HK50",quoteCurrency:"HKD"},{symbol:"AUS200",name:"ASX 200",baseCurrency:"AUS200",quoteCurrency:"AUD"},{symbol:"TWII",name:"Taiwan",baseCurrency:"TWII",quoteCurrency:"TWD"},{symbol:"KR100",name:"KOSPI",baseCurrency:"KR100",quoteCurrency:"KRW"},{symbol:"IN50",name:"Nifty 50",baseCurrency:"IN50",quoteCurrency:"INR"},{symbol:"TECH100",name:"Tech 100",baseCurrency:"TECH100",quoteCurrency:"USD"},{symbol:"BTCUSD",name:"Bitcoin",baseCurrency:"BTC",quoteCurrency:"USD"},{symbol:"ETHUSD",name:"Ethereum",baseCurrency:"ETH",quoteCurrency:"USD"},{symbol:"XRPUSD",name:"Ripple",baseCurrency:"XRP",quoteCurrency:"USD"},{symbol:"SOLUSD",name:"Solana",baseCurrency:"SOL",quoteCurrency:"USD"},{symbol:"ADAUSD",name:"Cardano",baseCurrency:"ADA",quoteCurrency:"USD"},{symbol:"DOGEUSD",name:"Dogecoin",baseCurrency:"DOGE",quoteCurrency:"USD"},{symbol:"DOTUSD",name:"Polkadot",baseCurrency:"DOT",quoteCurrency:"USD"},{symbol:"AVAXUSD",name:"Avalanche",baseCurrency:"AVAX",quoteCurrency:"USD"},{symbol:"LINKUSD",name:"Chainlink",baseCurrency:"LINK",quoteCurrency:"USD"},{symbol:"MATICUSD",name:"Polygon",baseCurrency:"MATIC",quoteCurrency:"USD"},{symbol:"UNIUSD",name:"Uniswap",baseCurrency:"UNI",quoteCurrency:"USD"},{symbol:"ATOMUSD",name:"Cosmos",baseCurrency:"ATOM",quoteCurrency:"USD"},{symbol:"LTCUSD",name:"Litecoin",baseCurrency:"LTC",quoteCurrency:"USD"},{symbol:"BCHUSD",name:"Bitcoin Cash",baseCurrency:"BCH",quoteCurrency:"USD"},{symbol:"NEARUSD",name:"Near",baseCurrency:"NEAR",quoteCurrency:"USD"},{symbol:"ALGOUSD",name:"Algorand",baseCurrency:"ALGO",quoteCurrency:"USD"},{symbol:"VETUSD",name:"VeChain",baseCurrency:"VET",quoteCurrency:"USD"},{symbol:"FILUSD",name:"Filecoin",baseCurrency:"FIL",quoteCurrency:"USD"},{symbol:"THETAUSD",name:"Theta",baseCurrency:"THETA",quoteCurrency:"USD"},{symbol:"AXSUSD",name:"Axie Infinity",baseCurrency:"AXS",quoteCurrency:"USD"},{symbol:"SANDUSD",name:"The Sandbox",baseCurrency:"SAND",quoteCurrency:"USD"},{symbol:"MANAUSD",name:"Decentraland",baseCurrency:"MANA",quoteCurrency:"USD"},{symbol:"ENJUSD",name:"Enjin Coin",baseCurrency:"ENJ",quoteCurrency:"USD"},{symbol:"CHZUSD",name:"Chiliz",baseCurrency:"CHZ",quoteCurrency:"USD"},{symbol:"APEUSD",name:"ApeCoin",baseCurrency:"APE",quoteCurrency:"USD"}];a.useCallback(()=>R.goBack(),[R]);const Q=e=>{if(e===t){v(!1);return}V(e),R.push(`/market/detail/${e}`)},$=()=>v(e=>!e),ee=a.useMemo(()=>z.find(e=>e.symbol===t)||{symbol:t,name:t.replace(/(.{3})(.{3})/,"$1 / $2"),baseCurrency:t.slice(0,3),quoteCurrency:t.slice(3)},[t]),h=({width:e="100%",height:n="1em"})=>r.jsx("div",{className:"loading-placeholder",style:{width:e,height:n}}),_=a.useMemo(()=>{if(!D||!D.bids.length||!D.asks.length)return{buySide:[],sellSide:[]};const e=i=>{if(!i.length)return[];const u=i.map(o=>o[1]),l=Math.max(...u),c=Math.min(...u);return i.slice(0,10).map(o=>{const y=o[1];let b=l>c?(y-c)/(l-c)*100:0;return b=Math.max(b,10),{amount:T(y),price:A(o[0],t),intensity:Math.min(b,95)}})},n=e(D.bids),s=e(D.asks);for(;n.length<10;)n.push({amount:"0.00",price:"0.00000",intensity:10});for(;s.length<10;)s.push({amount:"0.00",price:"0.00000",intensity:10});return{buySide:n,sellSide:s}},[D,t,A,T]);return r.jsxs("div",{className:"market-detail-container",children:[r.jsx("div",{className:"header",children:r.jsxs("div",{className:"nav-bar",children:[r.jsx(te,{className:"back-arrow",to:"/market",children:r.jsx("i",{className:"fas fa-arrow-left"})}),r.jsxs("div",{className:"trading-pair",onClick:$,children:[ee.name,r.jsx("i",{className:`fas fa-chevron-down dropdown-arrow ${K?"rotate":""}`})]}),r.jsx("div",{className:"header-icon",onClick:$,children:r.jsx("i",{className:"fas fa-bars"})})]})}),r.jsx(oe,{isOpen:K,onClose:()=>v(!1),selectedCoin:t,onCoinSelect:Q,availableCoins:z.map(e=>({symbol:e.symbol,name:e.name})),title:d("pages.marketDetail.coinSelector.title")}),r.jsx("div",{className:"price-section",children:r.jsx("div",{className:"price-main-row",children:r.jsxs("div",{className:"price-left-section",children:[r.jsx("div",{className:"current-price",children:m!==null?r.jsx("span",{style:{color:U!==null&&U<0?"#f56c6c":"#37b66a"},children:A(m,t)}):r.jsx(h,{width:"120px",height:"28px"})}),r.jsxs("div",{className:"price-info-row",children:[r.jsx("div",{className:"usd-price",children:m!==null?`$${m.toFixed(2)}`:"$0.00"}),r.jsx("div",{className:"price-change",style:{color:U!==null&&U<0?"#f56c6c":"#37b66a"},children:U!==null?`${U<0?"−":"+"}${Math.abs(U).toFixed(2)}%`:r.jsx(h,{width:"60px",height:"16px"})})]})]})})}),r.jsx("div",{className:"chart-section",children:r.jsx(ce,{symbol:t,height:400},t)}),r.jsxs("div",{className:"tabs-section",children:[r.jsxs("div",{className:"tabs-header",children:[r.jsx("div",{className:`tab ${N==="orderBook"?"active":""}`,onClick:()=>M("orderBook"),children:d("pages.marketDetail.tabs.orderBook")}),r.jsx("div",{className:`tab ${N==="transactions"?"active":""}`,onClick:()=>M("transactions"),children:d("pages.marketDetail.tabs.transactions")})]}),r.jsxs("div",{className:"tab-content",children:[N==="orderBook"&&r.jsx("div",{className:"modern-order-book",children:r.jsxs("div",{className:"order-book-table",children:[r.jsxs("div",{className:"table-header",children:[r.jsxs("div",{className:"buy-section",children:[r.jsx("div",{className:"column-header",children:d("pages.marketDetail.orderBook.buy")}),r.jsx("div",{className:"column-header",children:d("pages.marketDetail.orderBook.quantity")}),r.jsx("div",{className:"column-header",children:d("pages.marketDetail.orderBook.price")})]}),r.jsxs("div",{className:"sell-section",children:[r.jsx("div",{className:"column-header",children:d("pages.marketDetail.orderBook.price")}),r.jsx("div",{className:"column-header",children:d("pages.marketDetail.orderBook.quantity")}),r.jsx("div",{className:"column-header",style:{textAlign:"right"},children:d("pages.marketDetail.orderBook.sell")})]})]}),r.jsx("div",{className:"table-body",children:_.buySide.map((e,n)=>{const s=_.sellSide[n]||{amount:"0.00",price:"0.00000",intensity:10};return r.jsxs("div",{className:"table-row",children:[r.jsxs("div",{className:"buy-section",children:[r.jsx("div",{className:"cell buy-cell",children:n+1}),r.jsx("div",{className:"cell quantity",children:e.amount}),r.jsxs("div",{className:"cell price-cell",children:[r.jsx("div",{className:"heatmap-bar buy-heatmap",style:{width:`${e.intensity}%`}}),r.jsx("span",{className:"price-value buy-price",children:e.price})]})]}),r.jsxs("div",{className:"sell-section",children:[r.jsxs("div",{className:"cell price-cell",children:[r.jsx("div",{className:"heatmap-bar sell-heatmap",style:{width:`${s.intensity}%`}}),r.jsx("span",{className:"price-value sell-price",children:s.price})]}),r.jsx("div",{className:"cell quantity",children:s.amount}),r.jsx("div",{className:"cell sell-cell",children:n+1})]})]},n)})})]})}),N==="transactions"&&r.jsxs("div",{className:"transactions-container",children:[r.jsxs("div",{className:"transactions-header",children:[r.jsx("div",{className:"header-item",children:d("pages.marketDetail.recentTrades.time")}),r.jsx("div",{className:"header-item",children:d("pages.marketDetail.recentTrades.price")}),r.jsx("div",{className:"header-item",children:d("pages.marketDetail.recentTrades.amount")})]}),r.jsx("div",{className:"transactions-list",children:O.length>0?O.slice(0,10).map(e=>r.jsxs("div",{className:"transaction-item",children:[r.jsx("div",{className:"transaction-time",children:new Date(e.time).toLocaleTimeString([],{hour:"2-digit",minute:"2-digit",second:"2-digit"})}),r.jsx("div",{className:`transaction-price ${e.side==="buy"?"buy":"sell"}`,children:A(e.price,t)}),r.jsx("div",{className:"transaction-amount",children:T(e.quantity)})]},e.id)):Array.from({length:5}).map((e,n)=>r.jsxs("div",{className:"transaction-item",children:[r.jsx("div",{className:"transaction-time",children:r.jsx(h,{width:"50px",height:"14px"})}),r.jsx("div",{className:"transaction-price",children:r.jsx(h,{width:"60px",height:"14px"})}),r.jsx("div",{className:"transaction-amount",children:r.jsx(h,{width:"50px",height:"14px"})})]},n))})]})]})]}),r.jsx("style",{children:`
        .market-detail-container {
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
          padding: 16px 20px;
          border-bottom: 1px solid #2a2a2a;
        }
        .nav-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .back-arrow {
          color: #ffffff;
          font-size: 20px;
          cursor: pointer;
        }
        .back-arrow:hover {
          color: #39FF14;
        }
        .trading-pair {
          font-size: 18px;
          font-weight: 500;
          color: #ffffff;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .trading-pair:hover {
          color: #39FF14;
        }
        .dropdown-arrow {
          font-size: 14px;
          transition: transform 0.2s;
        }
        .dropdown-arrow.rotate {
          transform: rotate(180deg);
        }
        .header-icon {
          color: #ffffff;
          font-size: 20px;
          cursor: pointer;
        }
        .header-icon:hover {
          color: #39FF14;
        }
        .price-section {
          padding: 16px 20px;
          background-color: #0f0f0f;
        }
        .price-main-row {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .price-left-section {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        .current-price {
          font-size: 28px;
          font-weight: 600;
        }
        .price-info-row {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .usd-price {
          font-size: 14px;
          color: #aaaaaa;
        }
        .price-change {
          font-size: 14px;
          font-weight: 500;
        }
        .chart-section {
          margin: 0 20px 20px;
          background-color: #1c1c1c;
          overflow: hidden;
        }
        .tabs-section {
          margin: 0 20px 20px;
          background-color: #1c1c1c;
          border-radius: 12px;
          border: 1px solid #2a2a2a;
          overflow: hidden;
        }
        .tabs-header {
          display: flex;
          border-bottom: 1px solid #2a2a2a;
        }
        .tab {
          flex: 1;
          padding: 14px;
          text-align: center;
          font-size: 14px;
          font-weight: 500;
          color: #777777;
          cursor: pointer;
          transition: all 0.2s;
        }
        .tab.active {
          color: #39FF14;
          border-bottom: 2px solid #39FF14;
        }
        .tab:hover:not(.active) {
          color: #ffffff;
        }
        .tab-content {
          padding: 16px;
        }
        .modern-order-book {
          width: 100%;
        }
        .order-book-table {
          display: flex;
          flex-direction: column;
        }
        .table-header {
          display: flex;
          margin-bottom: 12px;
          font-size: 12px;
          color: #777777;
        }
        .buy-section {
          flex: 1;
          display: flex;
          gap: 8px;
        }
        .sell-section {
          flex: 1;
          display: flex;
          gap: 8px;
        }
        .column-header {
          flex: 1;
          text-align: left;
        }
        .table-body {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        .table-row {
          display: flex;
          align-items: center;
          font-size: 13px;
        }
        .cell {
          flex: 1;
          text-align: left;
          padding: 4px 0;
        }
        .price-cell {
          position: relative;
          display: flex;
          align-items: center;
        }
        .heatmap-bar {
          position: absolute;
          left: 0;
          height: 100%;
          opacity: 0.2;
          z-index: 0;
          border-radius: 2px;
        }
        .buy-heatmap {
          background-color: #39FF14;
        }
        .sell-heatmap {
          background-color: #ff4d4d;
        }
        .price-value {
          position: relative;
          z-index: 1;
        }
        .buy-price {
          color: #39FF14;
        }
        .sell-price {
          color: #ff4d4d;
        }
        .buy-cell, .sell-cell {
          color: #777777;
          font-size: 11px;
        }
        .transactions-container {
          width: 100%;
        }
        .transactions-header {
          display: flex;
          justify-content: space-between;
          padding: 8px 0;
          font-size: 12px;
          color: #777777;
          border-bottom: 1px solid #2a2a2a;
          margin-bottom: 8px;
        }
        .header-item {
          flex: 1;
          text-align: left;
        }
        .transactions-list {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .transaction-item {
          display: flex;
          justify-content: space-between;
          padding: 8px 0;
          font-size: 13px;
          border-bottom: 1px solid #2a2a2a;
        }
        .transaction-time {
          flex: 1;
          color: #aaaaaa;
        }
        .transaction-price {
          flex: 1;
          font-weight: 500;
        }
        .transaction-price.buy {
          color: #39FF14;
        }
        .transaction-price.sell {
          color: #ff4d4d;
        }
        .transaction-amount {
          flex: 1;
          text-align: right;
          color: #ffffff;
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
      `})]})}const be=ne.memo(ie);export{be as default};
