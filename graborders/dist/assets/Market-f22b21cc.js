import{i as c,k as a,L as C}from"./index-a8b69c34.js";const P={Forex:{title:"Forex",symbols:["EURUSD","GBPUSD","USDJPY","AUDUSD","USDCAD","USDCHF","NZDUSD","EURGBP","EURJPY","GBPJPY","AUDJPY","EURAUD","GBPAUD","USDMXN","USDTRY","USDZAR","USDSGD","USDHKD","USDKRW","USDINR"]},Metal:{title:"Metals",symbols:["XAUUSD","XAGUSD","XPTUSD","XPDUSD"]},Oil:{title:"Oil & Gas",symbols:["USOIL","UKOIL","NGAS"]},CFD:{title:"Indices",symbols:["US30","US500","NAS100","US2000","GER40","UK100","FRA40","EU50","JP225"]},Crypto:{title:"Crypto",symbols:["BTCUSD","ETHUSD","XRPUSD","SOLUSD","ADAUSD","DOGEUSD","DOTUSD","AVAXUSD","LINKUSD","MATICUSD","UNIUSD","ATOMUSD","LTCUSD","BCHUSD","NEARUSD","ALGOUSD","VETUSD","FILUSD","THETAUSD","AXSUSD","SANDUSD","MANAUSD","ENJUSD","CHZUSD","APEUSD"]}},R={EURUSD:"EURUSD=X",GBPUSD:"GBPUSD=X",USDJPY:"USDJPY=X",AUDUSD:"AUDUSD=X",USDCAD:"USDCAD=X",USDCHF:"USDCHF=X",NZDUSD:"NZDUSD=X",EURGBP:"EURGBP=X",EURJPY:"EURJPY=X",GBPJPY:"GBPJPY=X",AUDJPY:"AUDJPY=X",EURAUD:"EURAUD=X",GBPAUD:"GBPAUD=X",USDMXN:"USDMXN=X",USDTRY:"USDTRY=X",USDZAR:"USDZAR=X",USDSGD:"USDSGD=X",USDHKD:"USDHKD=X",USDKRW:"USDKRW=X",USDINR:"USDINR=X",XAUUSD:"GC=F",XAGUSD:"SI=F",XPTUSD:"PL=F",XPDUSD:"PA=F",USOIL:"CL=F",UKOIL:"BZ=F",NGAS:"NG=F",US30:"YM=F",US500:"ES=F",NAS100:"NQ=F",US2000:"RTY=F",GER40:"DAX",UK100:"FTSE",FRA40:"FCHI",EU50:"STOXX50E",JP225:"N225"},f=e=>({EURUSD:{short:"EUR/USD",full:"Euro / US Dollar"},GBPUSD:{short:"GBP/USD",full:"British Pound / US Dollar"},USDJPY:{short:"USD/JPY",full:"US Dollar / Japanese Yen"},AUDUSD:{short:"AUD/USD",full:"Australian Dollar / US Dollar"},USDCAD:{short:"USD/CAD",full:"US Dollar / Canadian Dollar"},USDCHF:{short:"USD/CHF",full:"US Dollar / Swiss Franc"},NZDUSD:{short:"NZD/USD",full:"New Zealand Dollar / US Dollar"},EURGBP:{short:"EUR/GBP",full:"Euro / British Pound"},EURJPY:{short:"EUR/JPY",full:"Euro / Japanese Yen"},GBPJPY:{short:"GBP/JPY",full:"British Pound / Japanese Yen"},AUDJPY:{short:"AUD/JPY",full:"Australian Dollar / Japanese Yen"},EURAUD:{short:"EUR/AUD",full:"Euro / Australian Dollar"},GBPAUD:{short:"GBP/AUD",full:"British Pound / Australian Dollar"},USDMXN:{short:"USD/MXN",full:"US Dollar / Mexican Peso"},USDTRY:{short:"USD/TRY",full:"US Dollar / Turkish Lira"},USDZAR:{short:"USD/ZAR",full:"US Dollar / South African Rand"},USDSGD:{short:"USD/SGD",full:"US Dollar / Singapore Dollar"},USDHKD:{short:"USD/HKD",full:"US Dollar / Hong Kong Dollar"},USDKRW:{short:"USD/KRW",full:"US Dollar / South Korean Won"},USDINR:{short:"USD/INR",full:"US Dollar / Indian Rupee"},XAUUSD:{short:"Gold",full:"Gold Spot"},XAGUSD:{short:"Silver",full:"Silver Spot"},XPTUSD:{short:"Platinum",full:"Platinum Spot"},XPDUSD:{short:"Palladium",full:"Palladium Spot"},USOIL:{short:"Crude Oil",full:"WTI Crude Oil"},UKOIL:{short:"Brent Oil",full:"Brent Crude Oil"},NGAS:{short:"Nat Gas",full:"Natural Gas"},US30:{short:"US 30",full:"Dow Jones 30"},US500:{short:"US 500",full:"S&P 500"},NAS100:{short:"NAS 100",full:"Nasdaq 100"},US2000:{short:"Russell 2000",full:"Russell 2000"},GER40:{short:"DAX",full:"DAX 40"},UK100:{short:"FTSE 100",full:"FTSE 100"},FRA40:{short:"CAC 40",full:"CAC 40"},EU50:{short:"Euro Stoxx 50",full:"Euro Stoxx 50"},JP225:{short:"Nikkei 225",full:"Nikkei 225"},BTCUSD:{short:"BTC/USD",full:"Bitcoin"},ETHUSD:{short:"ETH/USD",full:"Ethereum"},XRPUSD:{short:"XRP/USD",full:"Ripple"},SOLUSD:{short:"SOL/USD",full:"Solana"},ADAUSD:{short:"ADA/USD",full:"Cardano"},DOGEUSD:{short:"DOGE/USD",full:"Dogecoin"},DOTUSD:{short:"DOT/USD",full:"Polkadot"},AVAXUSD:{short:"AVAX/USD",full:"Avalanche"},LINKUSD:{short:"LINK/USD",full:"Chainlink"},MATICUSD:{short:"MATIC/USD",full:"Polygon"},UNIUSD:{short:"UNI/USD",full:"Uniswap"},ATOMUSD:{short:"ATOM/USD",full:"Cosmos"},LTCUSD:{short:"LTC/USD",full:"Litecoin"},BCHUSD:{short:"BCH/USD",full:"Bitcoin Cash"},NEARUSD:{short:"NEAR/USD",full:"Near Protocol"},ALGOUSD:{short:"ALGO/USD",full:"Algorand"},VETUSD:{short:"VET/USD",full:"VeChain"},FILUSD:{short:"FIL/USD",full:"Filecoin"},THETAUSD:{short:"THETA/USD",full:"Theta Network"},AXSUSD:{short:"AXS/USD",full:"Axie Infinity"},SANDUSD:{short:"SAND/USD",full:"The Sandbox"},MANAUSD:{short:"MANA/USD",full:"Decentraland"},ENJUSD:{short:"ENJ/USD",full:"Enjin Coin"},CHZUSD:{short:"CHZ/USD",full:"Chiliz"},APEUSD:{short:"APE/USD",full:"ApeCoin"}})[e]??{short:e,full:e},N=(e,o)=>["XAUUSD","GC=F"].includes(e)||["XAGUSD","SI=F"].includes(e)||["XPTUSD","PL=F","XPDUSD","PA=F"].includes(e)||["USOIL","CL=F","UKOIL","BZ=F"].includes(e)?o.toFixed(2):["NGAS","NG=F"].includes(e)?o.toFixed(3):["BTCUSD","ETHUSD"].includes(e)?o.toFixed(2):["XRPUSD","ADAUSD","DOGEUSD","MATICUSD","UNIUSD","THETAUSD","CHZUSD","APEUSD"].includes(e)?o.toFixed(4):["LTCUSD","BCHUSD","FILUSD","AXSUSD","SANDUSD","MANAUSD","ENJUSD"].includes(e)||["DOTUSD","AVAXUSD","LINKUSD","ATOMUSD","NEARUSD"].includes(e)?o.toFixed(2):["ALGOUSD","VETUSD"].includes(e)?o.toFixed(4):["US30","US500","NAS100","US2000","GER40","UK100","FRA40","EU50","JP225"].includes(e)?o.toFixed(0):e.endsWith("JPY")?o.toFixed(3):e.includes("USD")&&!e.startsWith("USD")?o.toFixed(5):o.toFixed(2),E=e=>e>=1e9?`${(e/1e9).toFixed(2)}B`:e>=1e6?`${(e/1e6).toFixed(2)}M`:e>=1e3?`${(e/1e3).toFixed(2)}K`:e.toFixed(2),k=e=>{const[o,g]=c.useState({}),p=c.useCallback(async()=>{const n=await Promise.allSettled(e.map(async l=>{var A,m;const d=`https://query1.finance.yahoo.com/v8/finance/chart/${R[l]||l}?interval=1m&range=1d`,i=await(await fetch(d)).json(),t=(m=(A=i==null?void 0:i.chart)==null?void 0:A.result)==null?void 0:m[0];if(!t)return null;const r=t.meta,s=r.previousClose||r.chartPreviousClose||r.regularMarketPrice,U=r.regularMarketPrice,S=U-s,h=s?S/s*100:0;return{symbol:l,data:{price:U,change:S,changePercent:h,dayHigh:r.regularMarketDayHigh||U,dayLow:r.regularMarketDayLow||U,volume:r.regularMarketVolume||0}}})),u={};n.forEach(l=>{l.status==="fulfilled"&&l.value&&(u[l.value.symbol]=l.value.data)}),g(l=>({...l,...u}))},[e]);return c.useEffect(()=>{if(e.length===0)return;p();const n=setInterval(p,5e3);return()=>clearInterval(n)},[e,p]),o},v=(e,o)=>{const[g,p]=c.useState({}),n=c.useRef(null);return c.useEffect(()=>{if(!o||e.length===0){n.current&&(n.current.close(),n.current=null);return}const l=`wss://stream.binance.com:9443/stream?streams=${e.map(d=>`${d.toLowerCase()}@ticker`).join("/")}`,D=new WebSocket(l);return n.current=D,D.onmessage=d=>{const x=JSON.parse(d.data);if(x!=null&&x.data){const i=x.data,r=i.s.replace("USDT","USD"),s=parseFloat(i.c),U=parseFloat(i.p),S=parseFloat(i.P),h=parseFloat(i.h),A=parseFloat(i.l),m=parseFloat(i.q);isNaN(s)||p(F=>({...F,[r]:{price:s,change:U,changePercent:S,high:h,low:A,volume:m}}))}},D.onerror=d=>console.error("Binance WS error",d),()=>{D.close(),n.current=null}},[e,o]),g},X=()=>{const[e,o]=c.useState("Forex"),[g,p]=c.useState(Date.now()),n=c.useMemo(()=>P[e].symbols,[e]),u=k(e!=="Crypto"?n:[]),l=c.useMemo(()=>P.Crypto.symbols.map(t=>t.replace("USD","USDT")),[]),D=v(l,e==="Crypto"),d=c.useMemo(()=>n.map(t=>{if(e==="Crypto"){const s=D[t];if(s){const U=s.price,S=s.change,h=s.changePercent,A=h>=0;return{symbol:t,name:f(t).short,fullName:f(t).full,price:N(t,U),change:`${S>=0?"+":""}${S.toFixed(2)}`,changePercent:`${h>=0?"+":""}${h.toFixed(2)}`,isPositive:A,volume:E(s.volume)}}return{symbol:t,name:f(t).short,fullName:f(t).full,price:"—",change:"—",changePercent:"—",isPositive:!0,volume:"—"}}const r=u[t];if(r){const s=r.price,U=r.change,S=r.changePercent,h=S>=0;return{symbol:t,name:f(t).short,fullName:f(t).full,price:N(t,s),change:`${U>=0?"+":""}${U.toFixed(2)}`,changePercent:`${S>=0?"+":""}${S.toFixed(2)}`,isPositive:h,volume:E(r.volume)}}return{symbol:t,name:f(t).short,fullName:f(t).full,price:"—",change:"—",changePercent:"—",isPositive:!0,volume:"—"}}),[e,n,D,u]);c.useEffect(()=>{(Object.keys(u).length>0||Object.keys(D).length>0)&&p(Date.now())},[u,D]);const x=t=>new Date(t).toLocaleTimeString("en-US",{hour:"2-digit",minute:"2-digit",second:"2-digit"}),i=e==="Crypto"?Object.keys(D).length===0:Object.keys(u).length===0;return a.jsxs("div",{className:"market-app",children:[a.jsx("div",{className:"category-tabs",children:Object.keys(P).map(t=>a.jsx("button",{className:`tab-btn ${e===t?"active":""}`,onClick:()=>o(t),children:P[t].title},t))}),a.jsxs("div",{className:"live-indicator",children:[a.jsx("span",{className:"live-dot"}),a.jsxs("span",{className:"live-text",children:[e==="Crypto"?"Live":"Real-time"," · Updated"," ",x(g)]})]}),a.jsx("div",{className:"market-list",children:i?Array.from({length:8}).map((t,r)=>a.jsxs("div",{className:"skeleton-row",children:[a.jsx("div",{className:"skeleton-box icon"}),a.jsx("div",{className:"skeleton-box name"}),a.jsx("div",{className:"skeleton-box price"}),a.jsx("div",{className:"skeleton-box change"})]},r)):d.map(t=>a.jsx(C,{to:`/market/detail/${t.symbol}`,className:"market-row-link",children:a.jsxs("div",{className:"market-row",children:[a.jsxs("div",{className:"asset-cell",children:[a.jsx("div",{className:"asset-icon",children:t.symbol.slice(0,3).toUpperCase()}),a.jsxs("div",{className:"asset-text",children:[a.jsx("span",{className:"symbol",children:t.name}),a.jsx("span",{className:"full-name",children:t.fullName})]})]}),a.jsxs("div",{className:"price-cell",children:[a.jsxs("span",{className:"last-price",children:["$",t.price]}),a.jsx("span",{className:"volume",children:t.volume})]}),a.jsxs("div",{className:`change-cell ${t.isPositive?"positive":"negative"}`,children:[a.jsxs("span",{className:"change-percent",children:[t.changePercent,"%"]}),a.jsx("span",{className:"change-abs",children:t.change})]})]})},t.symbol))}),a.jsx("style",{children:`
        .market-app {
          max-width: 480px;
          margin: 0 auto;
          background: #0a0b0d;
          min-height: 100vh;
          color: #eaeaea;
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
          padding: 20px 16px;
          box-sizing: border-box;
        }
        .category-tabs {
          display: flex;
          gap: 8px;
          overflow-x: auto;
          padding-bottom: 12px;
          scrollbar-width: none;
        }
        .category-tabs::-webkit-scrollbar { display: none; }
        .tab-btn {
          background: #1a1d21;
          border: 1px solid #2a2d31;
          border-radius: 24px;
          padding: 10px 18px;
          font-size: 14px;
          font-weight: 500;
          color: #aaa;
          white-space: nowrap;
          cursor: pointer;
          transition: all 0.2s;
        }
        .tab-btn.active {
          background: #00e676;
          color: #000;
          border-color: #00e676;
          font-weight: 600;
        }
        .tab-btn:not(.active):hover {
          border-color: #00e676;
          color: #fff;
        }
        .live-indicator {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 18px;
          font-size: 12px;
          color: #999;
        }
        .live-dot {
          width: 8px;
          height: 8px;
          background: #00e676;
          border-radius: 50%;
          animation: pulse-dot 2s infinite;
        }
        @keyframes pulse-dot {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }
        .live-text { letter-spacing: 0.3px; }
        .market-list {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        .market-row-link {
          text-decoration: none;
          color: inherit;
        }
        .market-row {
          display: flex;
          align-items: center;
          background: #111318;
          border: 1px solid #1e2025;
          border-radius: 12px;
          padding: 12px 14px;
          transition: border-color 0.2s, background 0.2s;
        }
        .market-row:hover {
          border-color: #00e676;
          background: #16181d;
        }
        .asset-cell {
          display: flex;
          align-items: center;
          gap: 12px;
          flex: 1.5;
        }
        .asset-icon {
          width: 40px;
          height: 40px;
          border-radius: 10px;
          background: linear-gradient(135deg, #1e2a33, #0f1419);
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          font-size: 12px;
          color: #00e676;
          letter-spacing: 0.5px;
          border: 1px solid #2a2d31;
        }
        .asset-text {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }
        .symbol {
          font-weight: 600;
          font-size: 15px;
          color: #f0f0f0;
        }
        .full-name {
          font-size: 12px;
          color: #888;
        }
        .price-cell {
          flex: 1.2;
          text-align: right;
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 2px;
        }
        .last-price {
          font-size: 16px;
          font-weight: 600;
          color: #fff;
          font-family: 'JetBrains Mono', monospace;
        }
        .volume {
          font-size: 11px;
          color: #666;
        }
        .change-cell {
          flex: 1;
          text-align: right;
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 2px;
          font-weight: 600;
          font-size: 15px;
        }
        .change-percent {
          font-family: 'JetBrains Mono', monospace;
        }
        .change-abs {
          font-size: 12px;
          font-weight: 500;
          color: #999;
        }
        .positive .change-percent {
          color: #00e676;
        }
        .negative .change-percent {
          color: #ff4d4d;
        }
        .skeleton-row {
          display: flex;
          align-items: center;
          padding: 12px 14px;
          border-radius: 12px;
          background: #111318;
          border: 1px solid #1e2025;
          gap: 12px;
        }
        .skeleton-box {
          background: #1e2025;
          border-radius: 8px;
          animation: shimmer 1.5s infinite;
        }
        .skeleton-box.icon {
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }
        .skeleton-box.name { flex: 1; height: 16px; }
        .skeleton-box.price { width: 80px; height: 16px; }
        .skeleton-box.change { width: 60px; height: 16px; }
        @keyframes shimmer {
          0% { opacity: 0.4; }
          50% { opacity: 0.8; }
          100% { opacity: 0.4; }
        }
      `})]})};export{X as default};
