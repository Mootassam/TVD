import{k as e,i as o,L as G}from"./index-a7b7f0f1.js";import{M as m,f as S}from"./MarketContext-fd5718cf.js";const c={Forex:{title:"Forex",symbols:["EURUSD","GBPUSD","USDJPY","AUDUSD","USDCAD","USDCHF","NZDUSD","EURGBP","EURJPY","GBPJPY","AUDJPY","EURAUD","GBPAUD","USDMXN","USDTRY","USDZAR","USDSGD","USDHKD","USDKRW","USDINR","EURCHF","EURNZD","GBPEUR","AUDNZD","CADJPY","CHFJPY","NZDJPY","SGDJPY","HKDJPY","ZARJPY"]},Metal:{title:"Metals",symbols:["XAUUSD","XAGUSD","XPTUSD","XPDUSD","XAUEUR","XAGEUR","XPTEUR","XAUGBP","XAGGBP"]},Oil:{title:"Oil",symbols:["USOIL","UKOIL","BRENT","WTI","CRUDE","NGAS","HEAT","GAS"]},CFD:{title:"CFD",symbols:["US30","US500","NAS100","US2000","GER40","UK100","FRA40","EU50","JP225","HK50","AUS200","TWII","KR100","IN50","TECH100"]},Crypto:{title:"Crypto",symbols:["BTCUSD","ETHUSD","XRPUSD","SOLUSD","ADAUSD","DOGEUSD","DOTUSD","AVAXUSD","LINKUSD","MATICUSD","UNIUSD","ATOMUSD","LTCUSD","BCHUSD","NEARUSD","ALGOUSD","VETUSD","FILUSD","THETAUSD","AXSUSD","SANDUSD","MANAUSD","ENJUSD","CHZUSD","APEUSD"]}},P={EURUSD:1.0842,GBPUSD:1.2635,USDJPY:148.65,AUDUSD:.6532,USDCAD:1.358,USDCHF:.8795,NZDUSD:.6025,EURGBP:.859,EURJPY:161.15,GBPJPY:187.65,AUDJPY:97.15,EURAUD:1.659,GBPAUD:1.934,USDMXN:17.25,USDTRY:32.15,USDZAR:18.95,USDSGD:1.342,USDHKD:7.8185,USDKRW:1335,USDINR:83.25,EURCHF:.953,EURNZD:1.799,GBPEUR:1.1645,AUDNZD:1.0845,CADJPY:109.5,CHFJPY:169.05,NZDJPY:91.25,SGDJPY:110.75,HKDJPY:19.02,ZARJPY:7.85,XAUUSD:2345.8,XAGUSD:28.25,XPTUSD:985.5,XPDUSD:1045,XAUEUR:2165,XAGEUR:26.05,XPTEUR:908,XAUGBP:1855,XAGGBP:22.35,USOIL:84.25,UKOIL:87.85,BRENT:87.15,WTI:84.35,CRUDE:84.5,NGAS:2.85,HEAT:2.65,GAS:2.75,US30:38550,US500:5125,NAS100:18450,US2000:2185,GER40:18485,UK100:8075,FRA40:7525,EU50:4895,JP225:39750,HK50:16750,AUS200:7850,TWII:20750,KR100:2850,IN50:22450,TECH100:8450,BTCUSD:67450,ETHUSD:3425,XRPUSD:.515,SOLUSD:142.5,ADAUSD:.445,DOGEUSD:.0825,DOTUSD:7.15,AVAXUSD:34.85,LINKUSD:14.25,MATICUSD:.585,UNIUSD:6.85,ATOMUSD:8.45,LTCUSD:84.5,BCHUSD:485,NEARUSD:5.25,ALGOUSD:.185,VETUSD:.0225,FILUSD:5.85,THETAUSD:.985,AXSUSD:6.85,SANDUSD:.425,MANAUSD:.385,ENJUSD:.285,CHZUSD:.085,APEUSD:1.25},X=(t,i)=>["XAUUSD","XAUEUR","XAUGBP"].includes(t)||["XAGUSD","XAGEUR","XAGGBP"].includes(t)||["XPTUSD","XPTEUR"].includes(t)||["XPDUSD"].includes(t)||["USOIL","UKOIL","BRENT","WTI","CRUDE"].includes(t)?i.toFixed(2):["NGAS","HEAT","GAS"].includes(t)?i.toFixed(3):["BTCUSD","ETHUSD"].includes(t)?i.toFixed(2):["XRPUSD","ADAUSD","DOGEUSD","MATICUSD","UNIUSD","THETAUSD","CHZUSD","APEUSD"].includes(t)?i.toFixed(4):["LTCUSD","BCHUSD","FILUSD","AXSUSD","SANDUSD","MANAUSD","ENJUSD"].includes(t)||["DOTUSD","AVAXUSD","LINKUSD","ATOMUSD","NEARUSD"].includes(t)?i.toFixed(2):["ALGOUSD","VETUSD"].includes(t)?i.toFixed(4):["US30","US500","NAS100","US2000","GER40","UK100","FRA40","EU50","JP225","HK50","AUS200","TWII","KR100","IN50","TECH100"].includes(t)?i.toFixed(0):t.endsWith("JPY")?i.toFixed(3):t.includes("USD")&&!t.startsWith("USD")?i.toFixed(5):i.toFixed(2),b=t=>({XAUUSD:"Gold",XAGUSD:"Silver",XPTUSD:"Platinum",XPDUSD:"Palladium",XAUEUR:"Gold/EUR",XAGEUR:"Silver/EUR",XPTEUR:"Platinum/EUR",XAUGBP:"Gold/GBP",XAGGBP:"Silver/GBP",USOIL:"US Oil",UKOIL:"UK Oil",BRENT:"Brent",WTI:"WTI",CRUDE:"Crude",NGAS:"Natural Gas",HEAT:"Heating Oil",GAS:"Gasoline",US30:"Dow 30",US500:"S&P 500",NAS100:"Nasdaq 100",US2000:"Russell 2000",GER40:"DAX",UK100:"FTSE 100",FRA40:"CAC 40",EU50:"Euro Stoxx 50",JP225:"Nikkei 225",HK50:"Hang Seng",AUS200:"ASX 200",TWII:"Taiwan",KR100:"KOSPI",IN50:"Nifty 50",TECH100:"Tech 100",BTCUSD:"Bitcoin",ETHUSD:"Ethereum",XRPUSD:"Ripple",SOLUSD:"Solana",ADAUSD:"Cardano",DOGEUSD:"Dogecoin",DOTUSD:"Polkadot",AVAXUSD:"Avalanche",LINKUSD:"Chainlink",MATICUSD:"Polygon",UNIUSD:"Uniswap",ATOMUSD:"Cosmos",LTCUSD:"Litecoin",BCHUSD:"Bitcoin Cash",NEARUSD:"Near",ALGOUSD:"Algorand",VETUSD:"VeChain",FILUSD:"Filecoin",THETAUSD:"Theta",AXSUSD:"Axie Infinity",SANDUSD:"The Sandbox",MANAUSD:"Decentraland",ENJUSD:"Enjin Coin",CHZUSD:"Chiliz",APEUSD:"ApeCoin"})[t]||t,I=()=>{const[t,i]=o.useState({}),[n,E]=o.useState("Forex"),[N,h]=o.useState(!0),[H,R]=o.useState(Date.now()),d=o.useRef(null),x=o.useRef(!0),s=o.useRef({}),f=o.useCallback(async()=>{n==="Crypto"&&await S(),i(a=>{const U={...a};return c[n].symbols.forEach(r=>{let D=P[r]||1;a[r]?D=parseFloat(a[r].price):n==="Crypto"&&s.current[r]&&(D=s.current[r].price);let l=0,A="0.00";if(n==="Crypto"&&s.current[r]&&s.current[r].change!=null&&!isNaN(s.current[r].change))l=s.current[r].change,A=Number(l).toFixed(2);else{const F=n==="Metal"?.001:n==="Oil"?.002:n==="CFD"?.001:5e-4;l=(Math.random()*2-1)*F,A=(l*100).toFixed(2)}const p=D*(1+l/100),u=p-D,C=l>=0;U[r]={symbol:r,name:b(r),price:X(r,p),change:u>=0?`+${Math.abs(u).toFixed(2)}`:u.toFixed(2),changePercent:A,isPositive:C,volume:"0"},P[r]=p}),U}),R(Date.now())},[n,S]);o.useEffect(()=>(x.current=!0,h(!0),i({}),(async()=>{n==="Crypto"&&await S(),await f(),h(!1)})(),d.current=setInterval(()=>{x.current&&f()},2500),()=>{x.current=!1,d.current&&clearInterval(d.current)}),[n,f,S]);const g=o.useMemo(()=>c[n].symbols.map(U=>t[U]).filter(Boolean),[t,n]),T=()=>e.jsxs("div",{className:"loading-row",children:[e.jsx("div",{className:"loading-icon"}),e.jsx("div",{className:"loading-line"}),e.jsx("div",{className:"loading-line short"})]});return e.jsxs("div",{className:"forex-container",children:[e.jsx("div",{className:"forex-header",children:e.jsx("h1",{className:"forex-title",children:c[n].title})}),e.jsx("div",{className:"category-tabs",children:Object.keys(c).map(a=>e.jsx("button",{className:`tab-btn ${n===a?"active":""}`,onClick:()=>E(a),children:c[a].title},a))}),e.jsxs("div",{className:"forex-list",children:[e.jsxs("div",{className:"list-header",children:[e.jsx("span",{children:"Pair"}),e.jsx("span",{children:"Price"}),e.jsx("span",{children:"24h %"})]}),N?e.jsx("div",{className:"loading-container",children:c[n].symbols.slice(0,6).map((a,U)=>e.jsx(T,{},U))}):g.length>0?g.map(a=>e.jsx(G,{to:`/market/detail/${a.symbol}`,className:"forex-link",children:e.jsxs("div",{className:"forex-row",children:[e.jsx("div",{className:"forex-pair",children:e.jsx("span",{className:"pair-name",children:a.name})}),e.jsx("div",{className:"forex-price",children:e.jsxs("span",{className:"price",children:["$",a.price]})}),e.jsx("div",{className:"forex-change",children:e.jsxs("span",{className:a.isPositive?"change-positive":"change-negative",children:[a.isPositive?"+":"",a.changePercent,"%"]})})]})},a.symbol)):e.jsx("div",{className:"no-results",children:"Loading data..."})]}),e.jsx("style",{children:`
        .forex-container {
          max-width: 430px;
          margin: 0 auto;
          min-height: 100vh;
          background-color: #0f0f0f;
          border-top: 2px solid #39FF14;
          display: flex;
          flex-direction: column;
          padding: 20px;
          box-sizing: border-box;
        }
        .forex-header {
          margin-bottom: 16px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .forex-title {
          color: #ffffff;
          font-size: 28px;
          font-weight: 600;
          margin: 0;
        }
        .last-update {
          display: flex;
          align-items: center;
          gap: 6px;
          color: #39FF14;
          font-size: 12px;
        }
        .update-dot {
          width: 8px;
          height: 8px;
          background-color: #39FF14;
          border-radius: 50%;
          animation: blink 2s infinite;
        }
        @keyframes blink {
          0%, 50%, 100% { opacity: 1; }
          25%, 75% { opacity: 0.3; }
        }
        .category-tabs {
          display: flex;
          gap: 8px;
          margin-bottom: 20px;
          overflow-x: auto;
          padding-bottom: 8px;
          scrollbar-width: none;
        }
        .category-tabs::-webkit-scrollbar {
          display: none;
        }
        .tab-btn {
          background-color: #1c1c1c;
          border: 1px solid #2a2a2a;
          border-radius: 20px;
          padding: 10px 16px;
          color: #ffffff;
          font-size: 14px;
          font-weight: 500;
          white-space: nowrap;
          cursor: pointer;
          transition: all 0.2s;
        }
        .tab-btn.active {
          background-color: #39FF14;
          color: #000000;
          border-color: #39FF14;
        }
        .tab-btn:not(.active):hover {
          border-color: #39FF14;
        }
        .list-header {
          display: flex;
          justify-content: space-between;
          padding: 0 0 8px 0;
          margin-bottom: 8px;
          border-bottom: 1px solid #2a2a2a;
          color: #777777;
          font-size: 12px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        .list-header span:first-child { flex: 2; }
        .list-header span:nth-child(2) { flex: 1; text-align: right; }
        .list-header span:nth-child(3) { flex: 0.8; text-align: right; }
        .forex-link {
          text-decoration: none;
          display: block;
          margin-bottom: 8px;
        }
        .forex-row {
          background-color: #1c1c1c;
          border: 1px solid #2a2a2a;
          border-radius: 8px;
          padding: 12px 16px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          transition: border-color 0.2s;
        }
        .forex-row:hover {
          border-color: #39FF14;
        }
        .forex-pair {
          display: flex;
          align-items: center;
          gap: 12px;
          flex: 2;
        }

        .icon-text {
          font-size: 10px;
          color: #39FF14;
          font-weight: bold;
        }
        .pair-name {
          color: #ffffff;
          font-weight: 500;
          font-size: 14px;
        }
        .forex-price {
          flex: 1;
          text-align: right;
          color: #ffffff;
          font-weight: 500;
          font-size: 14px;
        }
        .forex-change {
          flex: 0.8;
          text-align: right;
          font-weight: 600;
          font-size: 14px;
        }
        .change-positive { color: #39FF14; }
        .change-negative { color: #ff6b6b; }
        .loading-container { display: flex; flex-direction: column; gap: 8px; }
        .loading-row {
          background-color: #1c1c1c;
          border: 1px solid #2a2a2a;
          border-radius: 8px;
          padding: 12px 16px;
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .loading-icon {
          width: 32px; height: 32px;
          border-radius: 50%; background-color: #2a2a2a;
          animation: pulse 1.5s infinite;
        }
        .loading-line {
          height: 16px; background-color: #2a2a2a;
          border-radius: 4px; flex: 1;
          animation: pulse 1.5s infinite;
        }
        .loading-line.short { flex: 0.5; }
        @keyframes pulse {
          0% { opacity: 0.6; } 50% { opacity: 1; } 100% { opacity: 0.6; }
        }
        .no-results {
          text-align: center;
          padding: 40px 20px;
          color: #777777;
          font-size: 16px;
        }
      `})]})},j=()=>e.jsx(m,{children:e.jsx(I,{})});export{j as default};
