import{R as ne,t as le,S as oe,i as r,j as s,o as W,k as e}from"./index-680400b2.js";import{F as ce}from"./FuturesChart-dd2ea807.js";import{C as de}from"./CoinSelectorSidebar-734eaac9.js";function me(){const z=le(),{id:b}=oe(),[f,S]=r.useState(null),[g,D]=r.useState(null),[V,T]=r.useState(null),[X,C]=r.useState(null),[G,U]=r.useState(null),[K,P]=r.useState(null),[Q,L]=r.useState([]),[k,R]=r.useState(null),[c,ae]=r.useState(b||"BTCUSDT"),[ue,q]=r.useState(!0),[B,Y]=r.useState("orderBook"),[A,M]=r.useState(!1),O=r.useRef(null),I=r.useRef(null),H=r.useRef(null),x=r.useRef(c),y=r.useRef({}),N=r.useRef(null),Z=[{symbol:"BTCUSDT",name:"BTC / USDT"},{symbol:"ETHUSDT",name:"ETH / USDT"},{symbol:"DOTUSDT",name:"DOT / USDT"},{symbol:"XRPUSDT",name:"XRP / USDT"},{symbol:"LINKUSDT",name:"LINK / USDT"},{symbol:"BCHUSDT",name:"BCH / USDT"},{symbol:"LTCUSDT",name:"LTC / USDT"},{symbol:"ADAUSDT",name:"ADA / USDT"},{symbol:"EOSUSDT",name:"EOS / USDT"},{symbol:"TRXUSDT",name:"TRX / USDT"},{symbol:"DASHUSDT",name:"DASH / USDT"},{symbol:"FILUSDT",name:"FIL / USDT"},{symbol:"YFIUSDT",name:"YFI / USDT"},{symbol:"ZECUSDT",name:"ZEC / USDT"},{symbol:"DOGEUSDT",name:"DOGE / USDT"}],v=r.useCallback((t,a=4)=>{const l=Number(t);return isNaN(l)?"0.0000":l.toLocaleString(void 0,{minimumFractionDigits:a,maximumFractionDigits:a})},[]),F=r.useCallback(t=>{const a=Number(t);return isNaN(a)?"0.00":a>=1e9?(a/1e9).toFixed(2)+s("pages.marketDetail.volume.billion"):a>=1e6?(a/1e6).toFixed(2)+s("pages.marketDetail.volume.million"):a>=1e3?(a/1e3).toFixed(2)+"K":a.toFixed(2)},[]),$=r.useCallback(()=>{Object.values(y.current).forEach(t=>{t&&clearTimeout(t)}),y.current={},[O,I,H].forEach(t=>{if(t.current){try{t.current.onclose=null,t.current.close()}catch(a){console.warn(s("pages.marketDetail.websocketCloseError"),a)}t.current=null}})},[]),E=r.useCallback(()=>{N.current&&(N.current.abort(),N.current=null)},[]),_=r.useCallback(()=>{S(null),D(null),T(null),C(null),U(null),P(null),L([]),R(null)},[]);r.useEffect(()=>{b&&b!==c&&(console.log("Coin changing from",c,"to",b),E(),$(),_(),x.current=b,ae(b))},[b,c,$,_,E]);const J=r.useCallback(async t=>{if(!t)return;E(),N.current=new AbortController;const a=N.current.signal;try{q(!0);const l=new Promise((i,o)=>{setTimeout(()=>o(new Error(s("common.timeout"))),5e3)}),u=Promise.all([W.get(`https://api.binance.com/api/v3/ticker/24hr?symbol=${t}`,{signal:a}),W.get(`https://api.binance.com/api/v3/trades?symbol=${t}&limit=10`,{signal:a}),W.get(`https://api.binance.com/api/v3/depth?symbol=${t}&limit=10`,{signal:a})]),[d,j,n]=await Promise.race([u,l]);if(x.current===t){const i=d.data;S(i.lastPrice||i.c),D(i.priceChangePercent||i.P),T(i.highPrice||i.h),C(i.lowPrice||i.l),U(i.volume||i.v),P(i.quoteVolume||i.q),L(j.data.slice(0,5)),R(n.data),q(!1),console.log(s("pages.marketDetail.initialDataLoaded"),t)}}catch(l){if(l.name==="AbortError"){console.log(s("common.requestAborted"),t);return}console.error(s("pages.marketDetail.fetchError"),t,":",l),x.current===t&&(q(!1),S("0.0000"),D("0.00"),T("0.0000"),C("0.0000"),U("0.00"),P("0.00"))}},[E]);r.useEffect(()=>{const t=c;if(!t)return;console.log(s("pages.marketDetail.setupWebsockets"),t),x.current=t,J(t);let a=!0;const l=(n,i,o)=>{if(!a||x.current!==t)return null;try{const m=new WebSocket(n);return m.onopen=()=>{console.log(s("pages.marketDetail.websocketConnected"),o,t)},m.onmessage=w=>{if(!(!a||x.current!==t))try{const p=JSON.parse(w.data);i(p)}catch(p){console.error(s("pages.marketDetail.websocketParseError"),o,p)}},m.onclose=w=>{console.log(s("pages.marketDetail.websocketClosed"),o,t,s("pages.marketDetail.code"),w.code),a&&x.current===t&&w.code!==1e3&&(y.current[o]=setTimeout(()=>{if(a&&x.current===t){console.log(s("pages.marketDetail.reconnecting"),o,t);const p=l(n,i,o);o==="ticker"&&p?I.current=p:o==="trade"&&p?O.current=p:o==="depth"&&p&&(H.current=p)}},1e3))},m.onerror=w=>{console.error(s("pages.marketDetail.websocketError"),t,o,w)},m}catch(m){return console.error(s("pages.marketDetail.websocketCreateError"),o,m),null}},u=`wss://stream.binance.com:9443/ws/${t.toLowerCase()}@ticker`;I.current=l(u,n=>{S(n.c),D(n.P),T(n.h),C(n.l),U(n.v),P(n.q)},"ticker");const d=`wss://stream.binance.com:9443/ws/${t.toLowerCase()}@trade`;O.current=l(d,n=>{L(i=>[n,...i.slice(0,9)])},"trade");const j=`wss://stream.binance.com:9443/ws/${t.toLowerCase()}@depth`;return H.current=l(j,n=>{R(i=>i&&{lastUpdateId:n.u,bids:n.b&&n.b.length>0?n.b:i.bids,asks:n.a&&n.a.length>0?n.a:i.asks})},"depth"),()=>{console.log(s("pages.marketDetail.cleaningUp"),t),a=!1,Object.values(y.current).forEach(n=>{n&&clearTimeout(n)}),y.current={},$()}},[c,J,$]);const se=r.useCallback(()=>{z.goBack()},[z]),ie=t=>{if(t===c){M(!1);return}console.log(s("pages.marketDetail.selectingCoin"),t),z.push(`/market/detail/${t}`)},ee=()=>{M(!A)},re=r.useMemo(()=>{const t=Z.find(a=>a.symbol===c);return t?t.name:`${c.replace("USDT","")} / USDT`},[c]),h=r.useCallback(({width:t="100%",height:a="1em"})=>e.jsx("div",{className:"loading-placeholder",style:{width:t,height:a}}),[]),te=r.useMemo(()=>{if(!k||!k.bids||!k.asks)return{buySide:[],sellSide:[]};const t=u=>{if(!u||u.length===0)return[];const d=u.map(i=>Number(i[1])).filter(i=>!isNaN(i));if(d.length===0)return[];const j=Math.max(...d),n=Math.min(...d);return u.slice(0,10).map(i=>{const o=Number(i[1]);let m=0;return j>n&&(m=(o-n)/(j-n)*100),m=Math.max(m,10),{amount:F(i[1]),price:v(i[0]),intensity:Math.min(m,95)}})},a=t(k.bids),l=t(k.asks);if(a.length===0){const u=f?Number(f):1;for(let d=0;d<10;d++)a.push({amount:"0.00",price:(u*(1-(d+1)*.001)).toFixed(4),intensity:20+d*5}),l.push({amount:"0.00",price:(u*(1+(d+1)*.001)).toFixed(4),intensity:20+d*5})}return{buySide:a,sellSide:l}},[k,f,v,F]);return e.jsxs("div",{className:"market-detail-container",children:[e.jsx("div",{className:"header",children:e.jsxs("div",{className:"nav-bar",children:[e.jsx("div",{className:"back-arrow",onClick:se,children:e.jsx("i",{className:"fas fa-arrow-left"})}),e.jsxs("div",{className:"trading-pair",onClick:ee,children:[re,e.jsx("i",{className:`fas fa-chevron-down dropdown-arrow ${A?"rotate":""}`})]}),e.jsx("div",{className:"header-icon",onClick:ee,children:e.jsx("i",{className:"fas fa-bars"})})]})}),e.jsx(de,{isOpen:A,onClose:()=>M(!1),selectedCoin:c,onCoinSelect:ie,availableCoins:Z,title:s("pages.marketDetail.coinSelector.title")}),e.jsx("div",{className:"price-section",children:e.jsxs("div",{className:"price-main-row",children:[e.jsxs("div",{className:"price-left-section",children:[e.jsx("div",{className:"current-price",children:f!==null?e.jsx("span",{style:{color:g&&parseFloat(g)<0?"#f56c6c":"#37b66a"},children:v(f)}):e.jsx(h,{width:"120px",height:"28px"})}),e.jsxs("div",{className:"price-info-row",children:[e.jsx("div",{className:"usd-price",children:f!==null?`$${Number(f).toFixed(2)}`:"$0.00"}),e.jsx("div",{className:"price-change",style:{color:g&&parseFloat(g)<0?"#f56c6c":"#37b66a"},children:g!==null?`${parseFloat(g)<0?"−":"+"}${Math.abs(parseFloat(g)).toFixed(2)}%`:e.jsx(h,{width:"60px",height:"16px"})})]})]}),e.jsxs("div",{className:"stats-grid",children:[e.jsxs("div",{className:"stat-row",children:[e.jsxs("div",{className:"stat-item",children:[e.jsx("div",{className:"stat-label",children:s("pages.marketDetail.stats.high")}),e.jsx("div",{className:"stat-value",children:V!==null?v(V):e.jsx(h,{width:"60px",height:"12px"})})]}),e.jsxs("div",{className:"stat-item",children:[e.jsxs("div",{className:"stat-label",children:[s("pages.marketDetail.stats.volume"),"(",c.replace("USDT",""),")"]}),e.jsx("div",{className:"stat-value",children:G!==null?F(G):e.jsx(h,{width:"60px",height:"12px"})})]})]}),e.jsxs("div",{className:"stat-row",children:[e.jsxs("div",{className:"stat-item",children:[e.jsx("div",{className:"stat-label",children:s("pages.marketDetail.stats.low")}),e.jsx("div",{className:"stat-value",children:X!==null?v(X):e.jsx(h,{width:"60px",height:"12px"})})]}),e.jsxs("div",{className:"stat-item",children:[e.jsxs("div",{className:"stat-label",children:[s("pages.marketDetail.stats.volume"),"(USDT)"]}),e.jsx("div",{className:"stat-value",children:K!==null?F(K):e.jsx(h,{width:"60px",height:"12px"})})]})]})]})]})}),e.jsx("div",{className:"chart-section",children:e.jsx(ce,{symbol:c},c)}),e.jsxs("div",{className:"tabs-section",children:[e.jsxs("div",{className:"tabs-header",children:[e.jsx("div",{className:`tab ${B==="orderBook"?"active":""}`,onClick:()=>Y("orderBook"),children:s("pages.marketDetail.tabs.orderBook")}),e.jsx("div",{className:`tab ${B==="transactions"?"active":""}`,onClick:()=>Y("transactions"),children:s("pages.marketDetail.tabs.transactions")})]}),e.jsxs("div",{className:"tab-content",children:[B==="orderBook"&&e.jsx("div",{className:"modern-order-book",children:e.jsxs("div",{className:"order-book-table",children:[e.jsxs("div",{className:"table-header",children:[e.jsxs("div",{className:"buy-section",children:[e.jsx("div",{className:"column-header",children:s("pages.marketDetail.orderBook.buy")}),e.jsx("div",{className:"column-header",children:s("pages.marketDetail.orderBook.quantity")}),e.jsx("div",{className:"column-header",children:s("pages.marketDetail.orderBook.price")})]}),e.jsxs("div",{className:"sell-section",children:[e.jsx("div",{className:"column-header",children:s("pages.marketDetail.orderBook.price")}),e.jsx("div",{className:"column-header",children:s("pages.marketDetail.orderBook.quantity")}),e.jsx("div",{className:"column-header",style:{textAlign:"right"},children:s("pages.marketDetail.orderBook.sell")})]})]}),e.jsx("div",{className:"table-body",children:te.buySide.map((t,a)=>{const l=te.sellSide[a]||{amount:"0.00",price:"0.0000",intensity:20};return e.jsxs("div",{className:"table-row",children:[e.jsxs("div",{className:"buy-section",children:[e.jsx("div",{className:"cell buy-cell",children:a+1}),e.jsx("div",{className:"cell quantity",children:t.amount}),e.jsxs("div",{className:"cell price-cell",children:[e.jsx("div",{className:"heatmap-bar buy-heatmap",style:{width:`${t.intensity}%`}}),e.jsx("span",{className:"price-value buy-price",children:t.price})]})]}),e.jsxs("div",{className:"sell-section",children:[e.jsxs("div",{className:"cell price-cell",children:[e.jsx("div",{className:"heatmap-bar sell-heatmap",style:{width:`${l.intensity}%`}}),e.jsx("span",{className:"price-value sell-price",children:l.price})]}),e.jsx("div",{className:"cell quantity",children:l.amount}),e.jsx("div",{className:"cell sell-cell",children:a+1})]})]},a)})})]})}),B==="transactions"&&e.jsxs("div",{className:"transactions-container",children:[e.jsxs("div",{className:"transactions-header",children:[e.jsx("div",{className:"header-item",children:s("pages.marketDetail.recentTrades.time")}),e.jsx("div",{className:"header-item",children:s("pages.marketDetail.recentTrades.price")}),e.jsx("div",{className:"header-item",children:s("pages.marketDetail.recentTrades.amount")})]}),e.jsx("div",{className:"transactions-list",children:Q.length>0?Q.slice(0,10).map((t,a)=>e.jsxs("div",{className:"transaction-item",children:[e.jsx("div",{className:"transaction-time",children:new Date(t.T).toLocaleTimeString([],{hour:"2-digit",minute:"2-digit",second:"2-digit"})}),e.jsx("div",{className:`transaction-price ${t.m?"sell":"buy"}`,children:v(t.p)}),e.jsx("div",{className:"transaction-amount",children:Number(t.q).toFixed(4)})]},`${t.t}-${t.T}-${a}`)):Array.from({length:5}).map((t,a)=>e.jsxs("div",{className:"transaction-item",children:[e.jsx("div",{className:"transaction-time",children:e.jsx(h,{width:"50px",height:"14px"})}),e.jsx("div",{className:"transaction-price",children:e.jsx(h,{width:"60px",height:"14px"})}),e.jsx("div",{className:"transaction-amount",children:e.jsx(h,{width:"50px",height:"14px"})})]},a))})]})]})]}),e.jsx("style",{children:`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
        }

        .market-detail-container {
          max-width: 400px;
          margin: 0 auto;
          height: 100dvh;
          position: relative;
          background: #f2f4f7;
        }

        /* Header Section */
        .header {
          padding: 15px 20px;
          color: #000;
          position: sticky;
          top: 0;
          z-index: 100;
          background: #f2f4f7;
        }

        .nav-bar {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .back-arrow {
          font-size: 18px;
          font-weight: 300;
          cursor: pointer;
        }

        .trading-pair {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 16px;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .trading-pair:hover {
          opacity: 0.8;
        }

        .dropdown-arrow {
          font-size: 12px;
          transition: transform 0.3s ease;
          color: #6c757d;
        }

        .dropdown-arrow.rotate {
          transform: rotate(180deg);
        }

        .header-icon {
          font-size: 16px;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .header-icon:hover {
          opacity: 0.8;
        }

        /* Price Section */
        .price-section {
          padding: 20px;
          background: white;
          border-bottom: 1px solid #e9ecef;
          border-radius: 40px 40px 0 0;
        }

        .price-main-row {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 20px;
        }

        .price-left-section {
          flex: 1;
        }

        .current-price {
          font-size: 1.75rem;
          font-weight: 600;
          line-height: 1.75rem;
          margin-bottom: 8px;
        }

        .price-info-row {
          display: flex;
          align-items: center;
          gap: 12px;
          font-size: 14px;
        }

        .usd-price {
          color: #6c757d;
        }

        .price-change {
        
        }

        /* Stats Grid */
        .stats-grid {
          display: flex;
          gap: 8px;
          min-width: 140px;
        }

        .stat-row {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .stat-item {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          font-size: 12px;
        }

        .stat-label {
          color: #6c757d;
          white-space: nowrap;
        }

        .stat-value {
          color: #333;
          font-weight: 500;
          white-space: nowrap;
        }

        /* Chart Section */
        .chart-section {
          background: white;
          border-bottom: 1px solid #e9ecef;
        }

        /* Tabs Section */
        .tabs-section {
          background: white;
        }

        .tabs-header {
          display: flex;
          border-bottom: 1px solid #eef2f6;
          background: white;
        }

        .tab {
          flex: 1;
          padding: 16px;
          text-align: center;
          font-size: 14px;
          font-weight: 500;
          color: #6c757d;
          cursor: pointer;
          transition: all 0.2s ease;
          border-bottom: 2px solid transparent;
        }

        .tab.active {
          color: #106cf5;
          border-bottom: 2px solid #106cf5;
          background: linear-gradient(to bottom, #f8fbff, #ffffff);
        }

        .tab-content {
          padding: 0;
          min-height: 400px;
          max-height: 500px;
          overflow: hidden;
        }

        /* Modern Order Book */
        .modern-order-book {
          background: white;
          border-radius: 12px;
          overflow: hidden;
        }

        .order-book-table {
          display: flex;
          flex-direction: column;
          background: white;
        }

        .table-header {
          display: flex;
          background: #f8fbff;
          border-bottom: 1px solid #eef2f6;
          font-size: 12px !important;
          padding: 8px 5px;
          color: #6c757d;
        }

        .buy-section, .sell-section {
          display: flex;
          justify-content: space-between;
        }

        .column-header {
          text-align: center;
        }

        .buy-section .column-header:first-child,
        .sell-section .column-header:last-child {
          text-align: left;
          flex: 0.8;
        }

        .buy-section .column-header:last-child,
        .sell-section .column-header:first-child {
          flex: 1.2;
        }

        .table-body {
          display: flex;
          flex-direction: column;
          max-height: 360px;
          overflow-y: auto;
          scrollbar-width: thin;
          scrollbar-color: #cbd5e0 #f7fafc;
        }

        .table-body::-webkit-scrollbar {
          width: 6px;
        }

        .table-body::-webkit-scrollbar-track {
          background: #f7fafc;
          border-radius: 3px;
        }

        .table-body::-webkit-scrollbar-thumb {
          background: #cbd5e0;
          border-radius: 3px;
        }

        .table-body::-webkit-scrollbar-thumb:hover {
          background: #a0aec0;
        }

        .table-row {
          display: flex;
          border-bottom: 1px solid #f1f5f9;
          font-size: 12px;
          color: #2d3748;
          transition: background-color 0.15s ease;
        }

        .table-row:hover {
          background: #fafbfc;
        }

        .buy-section, .sell-section {
          display: flex;
          flex: 1;
          align-items: center;
        }

        .cell {
          flex: 1;
          text-align: center;
          padding: 0 4px;
          position: relative;
          z-index: 1;
        }

        .buy-cell, .sell-cell {
          flex: 0.8;
          font-size: 11px;
          text-align: left;
          border-radius: 4px;
        }

        .buy-cell {
        }

        .sell-cell {
          text-align: right;
        }

        .quantity {
          color: #4a5568;
          font-weight: 500;
        }

        .price-cell {
          flex: 1.2;
          text-align: right;
          position: relative;
          padding: 4px 8px;
          border-radius: 4px;
          overflow: hidden;
        }

        .buy-section .price-cell {
          text-align: right;
        }

        .sell-section .price-cell {
          text-align: left;
        }

        .heatmap-bar {
          position: absolute;
          top: 0;
          bottom: 0;
          border-radius: 3px;
          opacity: 0.12;
          transition: width 0.3s ease;
        }

        .buy-heatmap {
          right: 0;
          background: linear-gradient(90deg, transparent, #37b66a);
        }

        .sell-heatmap {
          left: 0;
          background: linear-gradient(90deg, #f56c6c, transparent);
        }

        .price-value {
          position: relative;
          z-index: 2;
        
        }

        .buy-price {
          color: #37b66a;
        }

        .sell-price {
          color: #f56c6c;
        }

        /* Transactions Container */
        .transactions-container {
          display: flex;
          flex-direction: column;
          height: 100%;
        }

        .transactions-header {
          display: flex;
          justify-content: space-between;
          padding: 12px 16px;
          background: #f8fbff;
          border-bottom: 1px solid #eef2f6;
          font-size: 12px;
          color: #6c757d;
          font-weight: 500;
        }

        .header-item {
          flex: 1;
          text-align: center;
        }

        .header-item:first-child {
          text-align: left;
        }

        .header-item:last-child {
          text-align: right;
        }

        /* Latest Transactions */
        .transactions-list {
          display: flex;
          flex-direction: column;
          flex: 1;
          max-height: 400px;
          overflow-y: auto;
        }

        .transaction-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 12px;
          padding: 10px 16px;
          border-bottom: 1px solid #f0f0f0;
        }

        .transaction-time {
          color: #6c757d;
          flex: 1;
        }

        .transaction-price {
          flex: 1;
          text-align: center;
          font-weight: 500;
        }

        .transaction-price.buy {
          color: #37b66a;
        }

        .transaction-price.sell {
          color: #f56c6c;
        }

        .transaction-amount {
          color: #6c757d;
          flex: 1;
          text-align: right;
        }

        /* Loading placeholder animation */
        .loading-placeholder {
          background: linear-gradient(90deg, #e9ecef 25%, #f8f9fa 50%, #e9ecef 75%);
          background-size: 200% 100%;
          animation: loading 1.5s infinite;
          border-radius: 4px;
          display: inline-block;
        }

        @keyframes loading {
          0% {
            background-position: 200% 0;
          }
          100% {
            background-position: -200% 0;
          }
        }

        /* Responsive adjustments */
        @media (max-width: 380px) {
          .market-detail-container {
            padding: 0;
          }

          .header,
          .price-section,
          .tabs-section {
            padding-left: 16px;
            padding-right: 16px;
          }

          .price-main-row {
            gap: 15px;
          }

          .table-header,
          .table-row {
            padding-left: 12px;
            padding-right: 12px;
          }

          .transactions-header,
          .transaction-item {
            padding-left: 12px;
            padding-right: 12px;
          }
        }
      `})]})}const be=ne.memo(me);export{be as default};
