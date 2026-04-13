import{F as ne,p as se,al as te,i as n,k as r,j as l}from"./index-a7b7f0f1.js";import{F as ce}from"./FuturesChart-c7744812.js";import{C as ie}from"./CoinSelectorSidebar-db8535b0.js";import{f as oe}from"./MarketContext-fd5718cf.js";function le(){const j=se(),{id:S}=te(),[Q,B]=n.useState({price:null,changePercent:null,high:null,low:null,volume:null,quoteVolume:null}),[I,H]=n.useState([]),[C,X]=n.useState(null),[c,_]=n.useState(S||"EURUSD"),[ue,F]=n.useState(!0),[N,J]=n.useState("orderBook"),[Y,T]=n.useState(!1),p=n.useRef(null),k=n.useRef(c),G=n.useRef(!0),y=n.useRef({}),f={BTCUSD:"bitcoin",ETHUSD:"ethereum",XRPUSD:"ripple",SOLUSD:"solana",ADAUSD:"cardano",DOGEUSD:"dogecoin",DOTUSD:"polkadot",AVAXUSD:"avalanche-2",LINKUSD:"chainlink",MATICUSD:"matic-network",UNIUSD:"uniswap",ATOMUSD:"cosmos",LTCUSD:"litecoin",BCHUSD:"bitcoin-cash",NEARUSD:"near-protocol",ALGOUSD:"algorand",VETUSD:"vechain",FILUSD:"filecoin",THETAUSD:"theta-token",AXSUSD:"axie-infinity",SANDUSD:"the-sandbox",MANAUSD:"decentraland",ENJUSD:"enjincoin",CHZUSD:"chiliz",APEUSD:"apecoin"},g=n.useCallback(async()=>{await oe()},[]),M=[{symbol:"EURUSD",name:"EUR / USD",baseCurrency:"EUR",quoteCurrency:"USD"},{symbol:"GBPUSD",name:"GBP / USD",baseCurrency:"GBP",quoteCurrency:"USD"},{symbol:"USDJPY",name:"USD / JPY",baseCurrency:"USD",quoteCurrency:"JPY"},{symbol:"AUDUSD",name:"AUD / USD",baseCurrency:"AUD",quoteCurrency:"USD"},{symbol:"USDCAD",name:"USD / CAD",baseCurrency:"USD",quoteCurrency:"CAD"},{symbol:"USDCHF",name:"USD / CHF",baseCurrency:"USD",quoteCurrency:"CHF"},{symbol:"NZDUSD",name:"NZD / USD",baseCurrency:"NZD",quoteCurrency:"USD"},{symbol:"EURGBP",name:"EUR / GBP",baseCurrency:"EUR",quoteCurrency:"GBP"},{symbol:"EURJPY",name:"EUR / JPY",baseCurrency:"EUR",quoteCurrency:"JPY"},{symbol:"GBPJPY",name:"GBP / JPY",baseCurrency:"GBP",quoteCurrency:"JPY"},{symbol:"AUDJPY",name:"AUD / JPY",baseCurrency:"AUD",quoteCurrency:"JPY"},{symbol:"EURAUD",name:"EUR / AUD",baseCurrency:"EUR",quoteCurrency:"AUD"},{symbol:"GBPAUD",name:"GBP / AUD",baseCurrency:"GBP",quoteCurrency:"AUD"},{symbol:"USDMXN",name:"USD / MXN",baseCurrency:"USD",quoteCurrency:"MXN"},{symbol:"USDTRY",name:"USD / TRY",baseCurrency:"USD",quoteCurrency:"TRY"},{symbol:"USDZAR",name:"USD / ZAR",baseCurrency:"USD",quoteCurrency:"ZAR"},{symbol:"USDSGD",name:"USD / SGD",baseCurrency:"USD",quoteCurrency:"SGD"},{symbol:"USDHKD",name:"USD / HKD",baseCurrency:"USD",quoteCurrency:"HKD"},{symbol:"USDKRW",name:"USD / KRW",baseCurrency:"USD",quoteCurrency:"KRW"},{symbol:"USDINR",name:"USD / INR",baseCurrency:"USD",quoteCurrency:"INR"},{symbol:"EURCHF",name:"EUR / CHF",baseCurrency:"EUR",quoteCurrency:"CHF"},{symbol:"EURNZD",name:"EUR / NZD",baseCurrency:"EUR",quoteCurrency:"NZD"},{symbol:"GBPEUR",name:"GBP / EUR",baseCurrency:"GBP",quoteCurrency:"EUR"},{symbol:"AUDNZD",name:"AUD / NZD",baseCurrency:"AUD",quoteCurrency:"NZD"},{symbol:"CADJPY",name:"CAD / JPY",baseCurrency:"CAD",quoteCurrency:"JPY"},{symbol:"CHFJPY",name:"CHF / JPY",baseCurrency:"CHF",quoteCurrency:"JPY"},{symbol:"NZDJPY",name:"NZD / JPY",baseCurrency:"NZD",quoteCurrency:"JPY"},{symbol:"SGDJPY",name:"SGD / JPY",baseCurrency:"SGD",quoteCurrency:"JPY"},{symbol:"HKDJPY",name:"HKD / JPY",baseCurrency:"HKD",quoteCurrency:"JPY"},{symbol:"ZARJPY",name:"ZAR / JPY",baseCurrency:"ZAR",quoteCurrency:"JPY"},{symbol:"XAUUSD",name:"Gold",baseCurrency:"XAU",quoteCurrency:"USD"},{symbol:"XAGUSD",name:"Silver",baseCurrency:"XAG",quoteCurrency:"USD"},{symbol:"XPTUSD",name:"Platinum",baseCurrency:"XPT",quoteCurrency:"USD"},{symbol:"XPDUSD",name:"Palladium",baseCurrency:"XPD",quoteCurrency:"USD"},{symbol:"XAUEUR",name:"Gold / EUR",baseCurrency:"XAU",quoteCurrency:"EUR"},{symbol:"XAGEUR",name:"Silver / EUR",baseCurrency:"XAG",quoteCurrency:"EUR"},{symbol:"XPTEUR",name:"Platinum / EUR",baseCurrency:"XPT",quoteCurrency:"EUR"},{symbol:"XAUGBP",name:"Gold / GBP",baseCurrency:"XAU",quoteCurrency:"GBP"},{symbol:"XAGGBP",name:"Silver / GBP",baseCurrency:"XAG",quoteCurrency:"GBP"},{symbol:"USOIL",name:"US Oil",baseCurrency:"USOIL",quoteCurrency:"USD"},{symbol:"UKOIL",name:"UK Oil",baseCurrency:"UKOIL",quoteCurrency:"USD"},{symbol:"BRENT",name:"Brent",baseCurrency:"BRENT",quoteCurrency:"USD"},{symbol:"WTI",name:"WTI",baseCurrency:"WTI",quoteCurrency:"USD"},{symbol:"CRUDE",name:"Crude",baseCurrency:"CRUDE",quoteCurrency:"USD"},{symbol:"NGAS",name:"Natural Gas",baseCurrency:"NGAS",quoteCurrency:"USD"},{symbol:"HEAT",name:"Heating Oil",baseCurrency:"HEAT",quoteCurrency:"USD"},{symbol:"GAS",name:"Gasoline",baseCurrency:"GAS",quoteCurrency:"USD"},{symbol:"US30",name:"Dow 30",baseCurrency:"US30",quoteCurrency:"USD"},{symbol:"US500",name:"S&P 500",baseCurrency:"US500",quoteCurrency:"USD"},{symbol:"NAS100",name:"Nasdaq 100",baseCurrency:"NAS100",quoteCurrency:"USD"},{symbol:"US2000",name:"Russell 2000",baseCurrency:"US2000",quoteCurrency:"USD"},{symbol:"GER40",name:"DAX",baseCurrency:"GER40",quoteCurrency:"EUR"},{symbol:"UK100",name:"FTSE 100",baseCurrency:"UK100",quoteCurrency:"GBP"},{symbol:"FRA40",name:"CAC 40",baseCurrency:"FRA40",quoteCurrency:"EUR"},{symbol:"EU50",name:"Euro Stoxx 50",baseCurrency:"EU50",quoteCurrency:"EUR"},{symbol:"JP225",name:"Nikkei 225",baseCurrency:"JP225",quoteCurrency:"JPY"},{symbol:"HK50",name:"Hang Seng",baseCurrency:"HK50",quoteCurrency:"HKD"},{symbol:"AUS200",name:"ASX 200",baseCurrency:"AUS200",quoteCurrency:"AUD"},{symbol:"TWII",name:"Taiwan",baseCurrency:"TWII",quoteCurrency:"TWD"},{symbol:"KR100",name:"KOSPI",baseCurrency:"KR100",quoteCurrency:"KRW"},{symbol:"IN50",name:"Nifty 50",baseCurrency:"IN50",quoteCurrency:"INR"},{symbol:"TECH100",name:"Tech 100",baseCurrency:"TECH100",quoteCurrency:"USD"},{symbol:"BTCUSD",name:"Bitcoin",baseCurrency:"BTC",quoteCurrency:"USD"},{symbol:"ETHUSD",name:"Ethereum",baseCurrency:"ETH",quoteCurrency:"USD"},{symbol:"XRPUSD",name:"Ripple",baseCurrency:"XRP",quoteCurrency:"USD"},{symbol:"SOLUSD",name:"Solana",baseCurrency:"SOL",quoteCurrency:"USD"},{symbol:"ADAUSD",name:"Cardano",baseCurrency:"ADA",quoteCurrency:"USD"},{symbol:"DOGEUSD",name:"Dogecoin",baseCurrency:"DOGE",quoteCurrency:"USD"},{symbol:"DOTUSD",name:"Polkadot",baseCurrency:"DOT",quoteCurrency:"USD"},{symbol:"AVAXUSD",name:"Avalanche",baseCurrency:"AVAX",quoteCurrency:"USD"},{symbol:"LINKUSD",name:"Chainlink",baseCurrency:"LINK",quoteCurrency:"USD"},{symbol:"MATICUSD",name:"Polygon",baseCurrency:"MATIC",quoteCurrency:"USD"},{symbol:"UNIUSD",name:"Uniswap",baseCurrency:"UNI",quoteCurrency:"USD"},{symbol:"ATOMUSD",name:"Cosmos",baseCurrency:"ATOM",quoteCurrency:"USD"},{symbol:"LTCUSD",name:"Litecoin",baseCurrency:"LTC",quoteCurrency:"USD"},{symbol:"BCHUSD",name:"Bitcoin Cash",baseCurrency:"BCH",quoteCurrency:"USD"},{symbol:"NEARUSD",name:"Near",baseCurrency:"NEAR",quoteCurrency:"USD"},{symbol:"ALGOUSD",name:"Algorand",baseCurrency:"ALGO",quoteCurrency:"USD"},{symbol:"VETUSD",name:"VeChain",baseCurrency:"VET",quoteCurrency:"USD"},{symbol:"FILUSD",name:"Filecoin",baseCurrency:"FIL",quoteCurrency:"USD"},{symbol:"THETAUSD",name:"Theta",baseCurrency:"THETA",quoteCurrency:"USD"},{symbol:"AXSUSD",name:"Axie Infinity",baseCurrency:"AXS",quoteCurrency:"USD"},{symbol:"SANDUSD",name:"The Sandbox",baseCurrency:"SAND",quoteCurrency:"USD"},{symbol:"MANAUSD",name:"Decentraland",baseCurrency:"MANA",quoteCurrency:"USD"},{symbol:"ENJUSD",name:"Enjin Coin",baseCurrency:"ENJ",quoteCurrency:"USD"},{symbol:"CHZUSD",name:"Chiliz",baseCurrency:"CHZ",quoteCurrency:"USD"},{symbol:"APEUSD",name:"ApeCoin",baseCurrency:"APE",quoteCurrency:"USD"}],P=n.useCallback(e=>({EURUSD:1.0842,GBPUSD:1.2635,USDJPY:148.65,AUDUSD:.6532,USDCAD:1.358,USDCHF:.8795,NZDUSD:.6025,EURGBP:.859,EURJPY:161.15,GBPJPY:187.65,AUDJPY:97.15,EURAUD:1.659,GBPAUD:1.934,USDMXN:17.25,USDTRY:32.15,USDZAR:18.95,USDSGD:1.342,USDHKD:7.8185,USDKRW:1335,USDINR:83.25,EURCHF:.953,EURNZD:1.799,GBPEUR:1.1645,AUDNZD:1.0845,CADJPY:109.5,CHFJPY:169.05,NZDJPY:91.25,SGDJPY:110.75,HKDJPY:19.02,ZARJPY:7.85,XAUUSD:2345.8,XAGUSD:28.25,XPTUSD:985.5,XPDUSD:1045,XAUEUR:2165,XAGEUR:26.05,XPTEUR:908,XAUGBP:1855,XAGGBP:22.35,USOIL:84.25,UKOIL:87.85,BRENT:87.15,WTI:84.35,CRUDE:84.5,NGAS:2.85,HEAT:2.65,GAS:2.75,US30:38550,US500:5125,NAS100:18450,US2000:2185,GER40:18485,UK100:8075,FRA40:7525,EU50:4895,JP225:39750,HK50:16750,AUS200:7850,TWII:20750,KR100:2850,IN50:22450,TECH100:8450,BTCUSD:67450,ETHUSD:3425,XRPUSD:.515,SOLUSD:142.5,ADAUSD:.445,DOGEUSD:.0825,DOTUSD:7.15,AVAXUSD:34.85,LINKUSD:14.25,MATICUSD:.585,UNIUSD:6.85,ATOMUSD:8.45,LTCUSD:84.5,BCHUSD:485,NEARUSD:5.25,ALGOUSD:.185,VETUSD:.0225,FILUSD:5.85,THETAUSD:.985,AXSUSD:6.85,SANDUSD:.425,MANAUSD:.385,ENJUSD:.285,CHZUSD:.085,APEUSD:1.25})[e]||1,[]),h=n.useCallback(e=>["XAUUSD","XAUEUR","XAUGBP"].includes(e)||["XAGUSD","XAGEUR","XAGGBP"].includes(e)||["XPTUSD","XPTEUR"].includes(e)||["XPDUSD"].includes(e)||["USOIL","UKOIL","BRENT","WTI","CRUDE"].includes(e)?2:["NGAS","HEAT","GAS"].includes(e)?3:["BTCUSD","ETHUSD"].includes(e)?2:["XRPUSD","ADAUSD","DOGEUSD","MATICUSD","UNIUSD","THETAUSD","CHZUSD","APEUSD"].includes(e)?4:["LTCUSD","BCHUSD","FILUSD","AXSUSD","SANDUSD","MANAUSD","ENJUSD"].includes(e)||["DOTUSD","AVAXUSD","LINKUSD","ATOMUSD","NEARUSD"].includes(e)?2:["ALGOUSD","VETUSD"].includes(e)?4:["US30","US500","NAS100","US2000","GER40","UK100","FRA40","EU50","JP225","HK50","AUS200","TWII","KR100","IN50","TECH100"].includes(e)?0:e.endsWith("JPY")?3:e.includes("USD")&&!e.startsWith("USD")?5:2,[]),x=n.useCallback((e,a)=>{if(e===null||isNaN(e))return"0.00000";const s=a?h(a):5;return e.toFixed(s)},[h]),A=n.useCallback(e=>e===null||isNaN(e)?"0.00":e>=1e6?(e/1e6).toFixed(2)+"M":e>=1e3?(e/1e3).toFixed(2)+"K":e.toFixed(2),[]),O=n.useCallback(e=>{const s=(Math.random()*2-1)*1e-4;return e*(1+s)},[]),v=n.useCallback((e,a)=>{const s=h(a),i=e*2e-4,u=[],d=[];for(let t=0;t<10;t++){const o=e-i*(t+1)*(.5+Math.random()*.5),D=e+i*(t+1)*(.5+Math.random()*.5),m=Math.random()*1e6+5e5;u.push([Number(o.toFixed(s)),Number(m.toFixed(2))]),d.push([Number(D.toFixed(s)),Number(m.toFixed(2))])}return u.sort((t,o)=>o[0]-t[0]),d.sort((t,o)=>t[0]-o[0]),{lastUpdateId:Date.now(),bids:u,asks:d}},[h]),E=n.useCallback((e,a,s=10)=>{const i=[],u=h(a),d=Date.now();for(let t=0;t<s;t++){const o=Math.random()>.5?"buy":"sell",D=(Math.random()*2-1)*1e-4*e,m=e+D,ae=Math.random()*1e5+5e4;i.push({id:`${d-t*1e3}-${t}`,price:Number(m.toFixed(u)),quantity:Number(ae.toFixed(2)),time:d-t*1e3,side:o})}return i.sort((t,o)=>o.time-t.time)},[h]),K=n.useCallback(async e=>{f[e]&&await g(),B(a=>{let s=a.price??P(e),i,u;f[e]&&y.current[e]&&y.current[e].price?(i=y.current[e].price,u=y.current[e].change):(i=O(s),u=(i-s)/s*100);const d=f[e]?.01:.002,t=i*(1+d),o=i*(1-d),D=1e6+Math.random()*5e5,m=i*D;return X(v(i,e)),H(E(i,e,10)),{price:i,changePercent:u,high:t,low:o,volume:D,quoteVolume:m}})},[O,v,E,P,g]),R=n.useCallback(async e=>{f[e]&&await g();let a=P(e),s=0;f[e]&&y.current[e]&&y.current[e].price&&(a=y.current[e].price,s=y.current[e].change),B({price:a,changePercent:s,high:a*1.002,low:a*.998,volume:1e6,quoteVolume:a*1e6}),X(v(a,e)),H(E(a,e,10)),F(!1)},[P,v,E,g]);n.useEffect(()=>{S&&S!==c&&(_(S),k.current=S,F(!0),R(S))},[S,c,R]),n.useEffect(()=>{const e=c;if(e)return G.current=!0,k.current=e,R(e),p.current&&clearInterval(p.current),p.current=setInterval(async()=>{G.current&&k.current===e&&await K(e)},2e3),()=>{G.current=!1,p.current&&(clearInterval(p.current),p.current=null)}},[c,R,K]);const ee=n.useCallback(()=>j.goBack(),[j]),re=e=>{if(e===c){T(!1);return}j.push(`/market/detail/${e}`)},L=()=>T(e=>!e),w=n.useMemo(()=>M.find(e=>e.symbol===c)||{symbol:c,name:c.replace(/(.{3})(.{3})/,"$1 / $2"),baseCurrency:c.slice(0,3),quoteCurrency:c.slice(3)},[c]),U=n.useCallback(({width:e="100%",height:a="1em"})=>r.jsx("div",{className:"loading-placeholder",style:{width:e,height:a}}),[]),Z=n.useMemo(()=>{if(!C||!C.bids.length||!C.asks.length)return{buySide:[],sellSide:[]};const e=i=>{if(!i.length)return[];const u=i.map(o=>o[1]),d=Math.max(...u),t=Math.min(...u);return i.slice(0,10).map(o=>{const D=o[1];let m=d>t?(D-t)/(d-t)*100:0;return m=Math.max(m,10),{amount:A(D),price:x(o[0],c),intensity:Math.min(m,95)}})},a=e(C.bids),s=e(C.asks);for(;a.length<10;)a.push({amount:"0.00",price:"0.00000",intensity:10});for(;s.length<10;)s.push({amount:"0.00",price:"0.00000",intensity:10});return{buySide:a,sellSide:s}},[C,c,x,A]),{price:q,changePercent:b,high:z,low:W,volume:V,quoteVolume:$}=Q;return r.jsxs("div",{className:"market-detail-container",children:[r.jsx("div",{className:"header",children:r.jsxs("div",{className:"nav-bar",children:[r.jsx("div",{className:"back-arrow",onClick:ee,children:r.jsx("i",{className:"fas fa-arrow-left"})}),r.jsxs("div",{className:"trading-pair",onClick:L,children:[w.name,r.jsx("i",{className:`fas fa-chevron-down dropdown-arrow ${Y?"rotate":""}`})]}),r.jsx("div",{className:"header-icon",onClick:L,children:r.jsx("i",{className:"fas fa-bars"})})]})}),r.jsx(ie,{isOpen:Y,onClose:()=>T(!1),selectedCoin:c,onCoinSelect:re,availableCoins:M.map(e=>({symbol:e.symbol,name:e.name})),title:l("pages.marketDetail.coinSelector.title")}),r.jsx("div",{className:"price-section",children:r.jsxs("div",{className:"price-main-row",children:[r.jsxs("div",{className:"price-left-section",children:[r.jsx("div",{className:"current-price",children:q!==null?r.jsx("span",{style:{color:b!==null&&b<0?"#f56c6c":"#37b66a"},children:x(q,c)}):r.jsx(U,{width:"120px",height:"28px"})}),r.jsxs("div",{className:"price-info-row",children:[r.jsx("div",{className:"usd-price",children:q!==null?`$${q.toFixed(2)}`:"$0.00"}),r.jsx("div",{className:"price-change",style:{color:b!==null&&b<0?"#f56c6c":"#37b66a"},children:b!==null?`${b<0?"−":"+"}${Math.abs(b).toFixed(2)}%`:r.jsx(U,{width:"60px",height:"16px"})})]})]}),r.jsxs("div",{className:"stats-grid",children:[r.jsxs("div",{className:"stat-row",children:[r.jsxs("div",{className:"stat-item",children:[r.jsx("div",{className:"stat-label",children:l("pages.marketDetail.stats.high")}),r.jsx("div",{className:"stat-value",children:z!==null?x(z,c):r.jsx(U,{width:"60px",height:"12px"})})]}),r.jsxs("div",{className:"stat-item",children:[r.jsxs("div",{className:"stat-label",children:[l("pages.marketDetail.stats.volume"),"(",w.baseCurrency,")"]}),r.jsx("div",{className:"stat-value",children:V!==null?A(V):r.jsx(U,{width:"60px",height:"12px"})})]})]}),r.jsxs("div",{className:"stat-row",children:[r.jsxs("div",{className:"stat-item",children:[r.jsx("div",{className:"stat-label",children:l("pages.marketDetail.stats.low")}),r.jsx("div",{className:"stat-value",children:W!==null?x(W,c):r.jsx(U,{width:"60px",height:"12px"})})]}),r.jsxs("div",{className:"stat-item",children:[r.jsxs("div",{className:"stat-label",children:[l("pages.marketDetail.stats.volume"),"(",w.quoteCurrency,")"]}),r.jsx("div",{className:"stat-value",children:$!==null?A($):r.jsx(U,{width:"60px",height:"12px"})})]})]})]})]})}),r.jsx("div",{className:"chart-section",children:r.jsx(ce,{symbol:c},c)}),r.jsxs("div",{className:"tabs-section",children:[r.jsxs("div",{className:"tabs-header",children:[r.jsx("div",{className:`tab ${N==="orderBook"?"active":""}`,onClick:()=>J("orderBook"),children:l("pages.marketDetail.tabs.orderBook")}),r.jsx("div",{className:`tab ${N==="transactions"?"active":""}`,onClick:()=>J("transactions"),children:l("pages.marketDetail.tabs.transactions")})]}),r.jsxs("div",{className:"tab-content",children:[N==="orderBook"&&r.jsx("div",{className:"modern-order-book",children:r.jsxs("div",{className:"order-book-table",children:[r.jsxs("div",{className:"table-header",children:[r.jsxs("div",{className:"buy-section",children:[r.jsx("div",{className:"column-header",children:l("pages.marketDetail.orderBook.buy")}),r.jsx("div",{className:"column-header",children:l("pages.marketDetail.orderBook.quantity")}),r.jsx("div",{className:"column-header",children:l("pages.marketDetail.orderBook.price")})]}),r.jsxs("div",{className:"sell-section",children:[r.jsx("div",{className:"column-header",children:l("pages.marketDetail.orderBook.price")}),r.jsx("div",{className:"column-header",children:l("pages.marketDetail.orderBook.quantity")}),r.jsx("div",{className:"column-header",style:{textAlign:"right"},children:l("pages.marketDetail.orderBook.sell")})]})]}),r.jsx("div",{className:"table-body",children:Z.buySide.map((e,a)=>{const s=Z.sellSide[a]||{amount:"0.00",price:"0.00000",intensity:10};return r.jsxs("div",{className:"table-row",children:[r.jsxs("div",{className:"buy-section",children:[r.jsx("div",{className:"cell buy-cell",children:a+1}),r.jsx("div",{className:"cell quantity",children:e.amount}),r.jsxs("div",{className:"cell price-cell",children:[r.jsx("div",{className:"heatmap-bar buy-heatmap",style:{width:`${e.intensity}%`}}),r.jsx("span",{className:"price-value buy-price",children:e.price})]})]}),r.jsxs("div",{className:"sell-section",children:[r.jsxs("div",{className:"cell price-cell",children:[r.jsx("div",{className:"heatmap-bar sell-heatmap",style:{width:`${s.intensity}%`}}),r.jsx("span",{className:"price-value sell-price",children:s.price})]}),r.jsx("div",{className:"cell quantity",children:s.amount}),r.jsx("div",{className:"cell sell-cell",children:a+1})]})]},a)})})]})}),N==="transactions"&&r.jsxs("div",{className:"transactions-container",children:[r.jsxs("div",{className:"transactions-header",children:[r.jsx("div",{className:"header-item",children:l("pages.marketDetail.recentTrades.time")}),r.jsx("div",{className:"header-item",children:l("pages.marketDetail.recentTrades.price")}),r.jsx("div",{className:"header-item",children:l("pages.marketDetail.recentTrades.amount")})]}),r.jsx("div",{className:"transactions-list",children:I.length>0?I.slice(0,10).map(e=>r.jsxs("div",{className:"transaction-item",children:[r.jsx("div",{className:"transaction-time",children:new Date(e.time).toLocaleTimeString([],{hour:"2-digit",minute:"2-digit",second:"2-digit"})}),r.jsx("div",{className:`transaction-price ${e.side==="buy"?"buy":"sell"}`,children:x(e.price,c)}),r.jsx("div",{className:"transaction-amount",children:A(e.quantity)})]},e.id)):Array.from({length:5}).map((e,a)=>r.jsxs("div",{className:"transaction-item",children:[r.jsx("div",{className:"transaction-time",children:r.jsx(U,{width:"50px",height:"14px"})}),r.jsx("div",{className:"transaction-price",children:r.jsx(U,{width:"60px",height:"14px"})}),r.jsx("div",{className:"transaction-amount",children:r.jsx(U,{width:"50px",height:"14px"})})]},a))})]})]})]}),r.jsx("style",{children:`
        /* Market Detail Container – matches login/profile containers */
        .market-detail-container {
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
      `})]})}const ye=ne.memo(le);export{ye as default};
