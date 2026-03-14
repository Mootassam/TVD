import{R as ee,q as ae,ad as te,i as r,k as e,j as o}from"./index-a23148c8.js";import{F as se}from"./FuturesChart-449f8b76.js";import{C as re}from"./CoinSelectorSidebar-41e4a267.js";const ie={EUR:"eu",USD:"us",GBP:"gb",JPY:"jp",AUD:"au",CAD:"ca",CHF:"ch",NZD:"nz",MXN:"mx",TRY:"tr",ZAR:"za",SGD:"sg",HKD:"hk",KRW:"kr",INR:"in"};function ne(){const P=ae(),{id:h}=te(),[V,B]=r.useState({price:null,changePercent:null,high:null,low:null,volume:null,quoteVolume:null}),[A,M]=r.useState([]),[y,E]=r.useState(null),[n,X]=r.useState(h||"EURUSD"),[le,Y]=r.useState(!0),[j,G]=r.useState("orderBook"),[z,R]=r.useState(!1),g=r.useRef(null),q=r.useRef(n),F=r.useRef(!0),J=[{symbol:"EURUSD",name:"EUR / USD",baseCurrency:"EUR",quoteCurrency:"USD"},{symbol:"GBPUSD",name:"GBP / USD",baseCurrency:"GBP",quoteCurrency:"USD"},{symbol:"USDJPY",name:"USD / JPY",baseCurrency:"USD",quoteCurrency:"JPY"},{symbol:"AUDUSD",name:"AUD / USD",baseCurrency:"AUD",quoteCurrency:"USD"},{symbol:"USDCAD",name:"USD / CAD",baseCurrency:"USD",quoteCurrency:"CAD"},{symbol:"USDCHF",name:"USD / CHF",baseCurrency:"USD",quoteCurrency:"CHF"},{symbol:"NZDUSD",name:"NZD / USD",baseCurrency:"NZD",quoteCurrency:"USD"},{symbol:"EURGBP",name:"EUR / GBP",baseCurrency:"EUR",quoteCurrency:"GBP"},{symbol:"EURJPY",name:"EUR / JPY",baseCurrency:"EUR",quoteCurrency:"JPY"},{symbol:"GBPJPY",name:"GBP / JPY",baseCurrency:"GBP",quoteCurrency:"JPY"},{symbol:"AUDJPY",name:"AUD / JPY",baseCurrency:"AUD",quoteCurrency:"JPY"},{symbol:"EURAUD",name:"EUR / AUD",baseCurrency:"EUR",quoteCurrency:"AUD"},{symbol:"GBPAUD",name:"GBP / AUD",baseCurrency:"GBP",quoteCurrency:"AUD"},{symbol:"USDMXN",name:"USD / MXN",baseCurrency:"USD",quoteCurrency:"MXN"},{symbol:"USDRY",name:"USD / TRY",baseCurrency:"USD",quoteCurrency:"TRY"},{symbol:"USDZAR",name:"USD / ZAR",baseCurrency:"USD",quoteCurrency:"ZAR"},{symbol:"USDSGD",name:"USD / SGD",baseCurrency:"USD",quoteCurrency:"SGD"},{symbol:"USDHKD",name:"USD / HKD",baseCurrency:"USD",quoteCurrency:"HKD"},{symbol:"USDKRW",name:"USD / KRW",baseCurrency:"USD",quoteCurrency:"KRW"},{symbol:"USDINR",name:"USD / INR",baseCurrency:"USD",quoteCurrency:"INR"}],C=r.useCallback(a=>({EURUSD:1.085,GBPUSD:1.265,USDJPY:148.5,AUDUSD:.655,USDCAD:1.355,USDCHF:.875,NZDUSD:.605,EURGBP:.857,EURJPY:161.2,GBPJPY:188.3,AUDJPY:97.2,EURAUD:1.655,GBPAUD:1.93,USDMXN:17.2,USDRY:30.5,USDZAR:18.9,USDSGD:1.345,USDHKD:7.82,USDKRW:1330,USDINR:83.2})[a]||1,[]),D=r.useCallback(a=>a.includes("JPY")&&!a.startsWith("JPY")?3:5,[]),v=r.useCallback((a,t)=>{if(a===null||isNaN(a))return"0.00000";const s=t?D(t):5;return a.toFixed(s)},[D]),N=r.useCallback(a=>a===null||isNaN(a)?"0.00":a>=1e6?(a/1e6).toFixed(2)+"M":a>=1e3?(a/1e3).toFixed(2)+"K":a.toFixed(2),[]),$=r.useCallback(a=>{const s=(Math.random()*2-1)*1e-4;return a*(1+s)},[]),U=r.useCallback((a,t)=>{const s=D(t),l=a*2e-4,u=[],d=[];for(let i=0;i<10;i++){const c=a-l*(i+1)*(.5+Math.random()*.5),p=a+l*(i+1)*(.5+Math.random()*.5),x=Math.random()*1e6+5e5;u.push([Number(c.toFixed(s)),Number(x.toFixed(2))]),d.push([Number(p.toFixed(s)),Number(x.toFixed(2))])}return u.sort((i,c)=>c[0]-i[0]),d.sort((i,c)=>i[0]-c[0]),{lastUpdateId:Date.now(),bids:u,asks:d}},[D]),S=r.useCallback((a,t,s=10)=>{const l=[],u=D(t),d=Date.now();for(let i=0;i<s;i++){const c=Math.random()>.5?"buy":"sell",p=(Math.random()*2-1)*1e-4*a,x=a+p,_=Math.random()*1e5+5e4;l.push({id:`${d-i*1e3}-${i}`,price:Number(x.toFixed(u)),quantity:Number(_.toFixed(2)),time:d-i*1e3,side:c})}return l.sort((i,c)=>c.time-i.time)},[D]),T=r.useCallback(a=>{B(t=>{const s=t.price??C(a),l=$(s),u=(l-s)/s*100,d=Math.max(l*1.002,s*1.002),i=Math.min(l*.998,s*.998),c=1e6+Math.random()*5e5,p=l*c;return E(U(l,a)),M(S(l,a,10)),{price:l,changePercent:u,high:d,low:i,volume:c,quoteVolume:p}})},[$,U,S,C]),k=r.useCallback(a=>{const t=C(a);B({price:t,changePercent:0,high:t*1.002,low:t*.998,volume:1e6,quoteVolume:t*1e6}),E(U(t,a)),M(S(t,a,10)),Y(!1)},[C,U,S]);r.useEffect(()=>{h&&h!==n&&(X(h),q.current=h,Y(!0),k(h))},[h,n,k]),r.useEffect(()=>{const a=n;if(a)return F.current=!0,q.current=a,k(a),g.current&&clearInterval(g.current),g.current=setInterval(()=>{F.current&&q.current===a&&T(a)},1e3),()=>{F.current=!1,g.current&&(clearInterval(g.current),g.current=null)}},[n,k,T]);const O=r.useCallback(()=>P.goBack(),[P]),Q=a=>{if(a===n){R(!1);return}P.push(`/market/detail/${a}`)},H=()=>R(a=>!a),f=r.useMemo(()=>J.find(a=>a.symbol===n)||{symbol:n,name:n.replace(/(.{3})(.{3})/,"$1 / $2"),baseCurrency:n.slice(0,3),quoteCurrency:n.slice(3)},[n]),m=r.useCallback(({width:a="100%",height:t="1em"})=>e.jsx("div",{className:"loading-placeholder",style:{width:a,height:t}}),[]),I=r.useMemo(()=>{if(!y||!y.bids.length||!y.asks.length)return{buySide:[],sellSide:[]};const a=l=>{if(!l.length)return[];const u=l.map(c=>c[1]),d=Math.max(...u),i=Math.min(...u);return l.slice(0,10).map(c=>{const p=c[1];let x=d>i?(p-i)/(d-i)*100:0;return x=Math.max(x,10),{amount:N(p),price:v(c[0],n),intensity:Math.min(x,95)}})},t=a(y.bids),s=a(y.asks);for(;t.length<10;)t.push({amount:"0.00",price:"0.00000",intensity:10});for(;s.length<10;)s.push({amount:"0.00",price:"0.00000",intensity:10});return{buySide:t,sellSide:s}},[y,n,v,N]),{price:w,changePercent:b,high:K,low:Z,volume:W,quoteVolume:L}=V;return e.jsxs("div",{className:"market-detail-container",children:[e.jsx("div",{className:"header",children:e.jsxs("div",{className:"nav-bar",children:[e.jsx("div",{className:"back-arrow",onClick:O,children:e.jsx("i",{className:"fas fa-arrow-left"})}),e.jsxs("div",{className:"trading-pair",onClick:H,children:[e.jsx("div",{className:"pair-flag",children:e.jsx("img",{src:`https://flagcdn.com/w40/${ie[f.baseCurrency]||f.baseCurrency.toLowerCase()}.png`,alt:f.baseCurrency,onError:a=>{const t=a.target;t.style.display="none";const s=t.parentElement;s&&(s.innerText=f.baseCurrency)}})}),f.name,e.jsx("i",{className:`fas fa-chevron-down dropdown-arrow ${z?"rotate":""}`})]}),e.jsx("div",{className:"header-icon",onClick:H,children:e.jsx("i",{className:"fas fa-bars"})})]})}),e.jsx(re,{isOpen:z,onClose:()=>R(!1),selectedCoin:n,onCoinSelect:Q,availableCoins:J.map(a=>({symbol:a.symbol,name:a.name})),title:o("pages.marketDetail.coinSelector.title")}),e.jsx("div",{className:"price-section",children:e.jsxs("div",{className:"price-main-row",children:[e.jsxs("div",{className:"price-left-section",children:[e.jsx("div",{className:"current-price",children:w!==null?e.jsx("span",{style:{color:b!==null&&b<0?"#f56c6c":"#37b66a"},children:v(w,n)}):e.jsx(m,{width:"120px",height:"28px"})}),e.jsxs("div",{className:"price-info-row",children:[e.jsx("div",{className:"usd-price",children:w!==null?`$${w.toFixed(2)}`:"$0.00"}),e.jsx("div",{className:"price-change",style:{color:b!==null&&b<0?"#f56c6c":"#37b66a"},children:b!==null?`${b<0?"−":"+"}${Math.abs(b).toFixed(2)}%`:e.jsx(m,{width:"60px",height:"16px"})})]})]}),e.jsxs("div",{className:"stats-grid",children:[e.jsxs("div",{className:"stat-row",children:[e.jsxs("div",{className:"stat-item",children:[e.jsx("div",{className:"stat-label",children:o("pages.marketDetail.stats.high")}),e.jsx("div",{className:"stat-value",children:K!==null?v(K,n):e.jsx(m,{width:"60px",height:"12px"})})]}),e.jsxs("div",{className:"stat-item",children:[e.jsxs("div",{className:"stat-label",children:[o("pages.marketDetail.stats.volume"),"(",f.baseCurrency,")"]}),e.jsx("div",{className:"stat-value",children:W!==null?N(W):e.jsx(m,{width:"60px",height:"12px"})})]})]}),e.jsxs("div",{className:"stat-row",children:[e.jsxs("div",{className:"stat-item",children:[e.jsx("div",{className:"stat-label",children:o("pages.marketDetail.stats.low")}),e.jsx("div",{className:"stat-value",children:Z!==null?v(Z,n):e.jsx(m,{width:"60px",height:"12px"})})]}),e.jsxs("div",{className:"stat-item",children:[e.jsxs("div",{className:"stat-label",children:[o("pages.marketDetail.stats.volume"),"(",f.quoteCurrency,")"]}),e.jsx("div",{className:"stat-value",children:L!==null?N(L):e.jsx(m,{width:"60px",height:"12px"})})]})]})]})]})}),e.jsx("div",{className:"chart-section",children:e.jsx(se,{symbol:n},n)}),e.jsxs("div",{className:"tabs-section",children:[e.jsxs("div",{className:"tabs-header",children:[e.jsx("div",{className:`tab ${j==="orderBook"?"active":""}`,onClick:()=>G("orderBook"),children:o("pages.marketDetail.tabs.orderBook")}),e.jsx("div",{className:`tab ${j==="transactions"?"active":""}`,onClick:()=>G("transactions"),children:o("pages.marketDetail.tabs.transactions")})]}),e.jsxs("div",{className:"tab-content",children:[j==="orderBook"&&e.jsx("div",{className:"modern-order-book",children:e.jsxs("div",{className:"order-book-table",children:[e.jsxs("div",{className:"table-header",children:[e.jsxs("div",{className:"buy-section",children:[e.jsx("div",{className:"column-header",children:o("pages.marketDetail.orderBook.buy")}),e.jsx("div",{className:"column-header",children:o("pages.marketDetail.orderBook.quantity")}),e.jsx("div",{className:"column-header",children:o("pages.marketDetail.orderBook.price")})]}),e.jsxs("div",{className:"sell-section",children:[e.jsx("div",{className:"column-header",children:o("pages.marketDetail.orderBook.price")}),e.jsx("div",{className:"column-header",children:o("pages.marketDetail.orderBook.quantity")}),e.jsx("div",{className:"column-header",style:{textAlign:"right"},children:o("pages.marketDetail.orderBook.sell")})]})]}),e.jsx("div",{className:"table-body",children:I.buySide.map((a,t)=>{const s=I.sellSide[t]||{amount:"0.00",price:"0.00000",intensity:10};return e.jsxs("div",{className:"table-row",children:[e.jsxs("div",{className:"buy-section",children:[e.jsx("div",{className:"cell buy-cell",children:t+1}),e.jsx("div",{className:"cell quantity",children:a.amount}),e.jsxs("div",{className:"cell price-cell",children:[e.jsx("div",{className:"heatmap-bar buy-heatmap",style:{width:`${a.intensity}%`}}),e.jsx("span",{className:"price-value buy-price",children:a.price})]})]}),e.jsxs("div",{className:"sell-section",children:[e.jsxs("div",{className:"cell price-cell",children:[e.jsx("div",{className:"heatmap-bar sell-heatmap",style:{width:`${s.intensity}%`}}),e.jsx("span",{className:"price-value sell-price",children:s.price})]}),e.jsx("div",{className:"cell quantity",children:s.amount}),e.jsx("div",{className:"cell sell-cell",children:t+1})]})]},t)})})]})}),j==="transactions"&&e.jsxs("div",{className:"transactions-container",children:[e.jsxs("div",{className:"transactions-header",children:[e.jsx("div",{className:"header-item",children:o("pages.marketDetail.recentTrades.time")}),e.jsx("div",{className:"header-item",children:o("pages.marketDetail.recentTrades.price")}),e.jsx("div",{className:"header-item",children:o("pages.marketDetail.recentTrades.amount")})]}),e.jsx("div",{className:"transactions-list",children:A.length>0?A.slice(0,10).map(a=>e.jsxs("div",{className:"transaction-item",children:[e.jsx("div",{className:"transaction-time",children:new Date(a.time).toLocaleTimeString([],{hour:"2-digit",minute:"2-digit",second:"2-digit"})}),e.jsx("div",{className:`transaction-price ${a.side==="buy"?"buy":"sell"}`,children:v(a.price,n)}),e.jsx("div",{className:"transaction-amount",children:N(a.quantity)})]},a.id)):Array.from({length:5}).map((a,t)=>e.jsxs("div",{className:"transaction-item",children:[e.jsx("div",{className:"transaction-time",children:e.jsx(m,{width:"50px",height:"14px"})}),e.jsx("div",{className:"transaction-price",children:e.jsx(m,{width:"60px",height:"14px"})}),e.jsx("div",{className:"transaction-amount",children:e.jsx(m,{width:"50px",height:"14px"})})]},t))})]})]})]}),e.jsx("style",{children:`
        /* Market Detail Container – matches login/profile containers */
        .market-detail-container {
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
        .pair-flag {
          width: 24px;
          height: 24px;
          border-radius: 50%;
          overflow: hidden;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          background-color: #2a2a2a;
        }
        .pair-flag img {
          width: 100%;
          height: 100%;
          object-fit: cover;
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

        /* Price Section */
        .price-section {
          padding: 16px 20px;
          background-color: #000000;
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

        /* Stats Grid */
        .stats-grid {
          display: flex;
          flex-direction: column;
          gap: 12px;
          background-color: #1c1c1c;
          border-radius: 12px;
          padding: 16px;
          border: 1px solid #2a2a2a;
        }
        .stat-row {
          display: flex;
          justify-content: space-between;
        }
        .stat-item {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        .stat-label {
          font-size: 12px;
          color: #777777;
        }
        .stat-value {
          font-size: 14px;
          font-weight: 500;
          color: #ffffff;
        }

        /* Chart Section */
        .chart-section {
          margin: 0 20px 20px;
          background-color: #1c1c1c;
          border-radius: 12px;
          border: 1px solid #2a2a2a;
          overflow: hidden;
        }

        /* Tabs Section */
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

        /* Order Book Table */
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

        /* Transactions */
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

        /* Loading Placeholder */
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
      `})]})}const ue=ee.memo(ne);export{ue as default};
