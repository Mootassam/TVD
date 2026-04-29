import{i,k as r,n as F,L as O}from"./index-08d76576.js";const T=`
  :root {
    --bg-row: #2a2a2a;
    --green: #36f936;
    --red: #ff4d4d;
    --text-primary: #ffffff;
    --text-secondary: #a0a0a0;
    --neon-green: #39FF14;
  }

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body {
    font-family: 'Inter', -apple-system, sans-serif;
    color: var(--text-primary);
  }

  .market-page {
    display: flex;
    justify-content: center;
    padding: 16px;
    min-height: 100vh;
    background-color: #0f0f0f;
    border-top: 2px solid var(--neon-green);
    max-width: 400px;
    margin: auto;
  }

  .market-container {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .market-header {
    margin-bottom: 12px;
    padding: 0 4px;
  }

  .market-title {
    font-size: 20px;
    font-weight: 700;
    color: #fff;
    margin-bottom: 2px;
  }

  .market-date {
    font-size: 12px;
    color: var(--text-secondary);
  }

  .filter-bar {
    display: flex;
    gap: 8px;
    overflow-x: auto;
    padding-bottom: 6px;
    scrollbar-width: thin;
    scrollbar-color: #333 transparent;
    margin-bottom: 4px;
  }

  .filter-bar::-webkit-scrollbar {
    height: 4px;
  }

  .filter-bar::-webkit-scrollbar-thumb {
    background: #444;
    border-radius: 4px;
  }

  .filter-tab {
    flex-shrink: 0;
    padding: 6px 14px;
    border-radius: 20px;
    background: #2a2a2a;
    color: #aaa;
    font-size: 12px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s;
    border: 1px solid transparent;
    white-space: nowrap;
  }

  .filter-tab.active {
    background: #333;
    color: #fff;
    border-color: var(--neon-green);
    font-weight: 600;
  }

  .filter-tab:hover {
    background: #383838;
    color: #ddd;
  }

  .skeleton-row {
    background: #2a2a2a;
    border-radius: 8px;
    padding: 4px 14px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    animation: shimmer 1.4s infinite linear;
    background: linear-gradient(90deg, #2a2a2a 25%, #3a3a3a 50%, #2a2a2a 75%);
    background-size: 200% 100%;
  }

  @keyframes shimmer {
    0% { background-position: -200% 0; }
    100% { background-position: 200% 0; }
  }

  .skeleton-left {
    display: flex;
    align-items: center;
    gap: 10px;
    flex: 1;
  }
  .skeleton-flags {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    background: #3a3a3a;
  }
  .skeleton-symbol {
    width: 70px;
    height: 12px;
    border-radius: 6px;
    background: #3a3a3a;
  }
  .skeleton-right {
    display: flex;
    align-items: center;
    gap: 10px;
  }
  .skeleton-price {
    width: 60px;
    height: 12px;
    border-radius: 6px;
    background: #3a3a3a;
  }
  .skeleton-change {
    width: 50px;
    height: 12px;
    border-radius: 6px;
    background: #3a3a3a;
  }

  .row-link {
    text-decoration: none;
    color: inherit;
    display: block;
  }

  .currency-row {
    background: var(--bg-row);
    border-radius: 8px;
    padding: 4px 14px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    transition: background 0.15s, transform 0.1s;
  }

  .currency-row:hover {
    background: #333;
    transform: translateY(-1px);
  }

  .left-section {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .flag-container {
    position: relative;
    width: 30px;
    height: 30px;
    flex-shrink: 0;
  }

  .flag-single {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    object-fit: cover;
    background: #1e1e1e;
    border: 1px solid rgba(255,255,255,0.15);
  }

  .flag-base {
    border-radius: 50%;
    object-fit: cover;
    background: #1e1e1e;
    border: 1px solid rgba(255,255,255,0.15);
    display: block;
  }

  .flag-quote {
    position: absolute;
    top: 22%;
    left: 15%;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    object-fit: cover;
    background: #1e1e1e;
    border: 1px solid rgba(255,255,255,0.15);
    z-index: 2;
  }

  .symbol-name {
    font-size: 14px;
    font-weight: 600;
    color: #fff;
    white-space: nowrap;
  }

  .right-section {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .price-value {
    font-size: 13px;
    font-weight: 600;
    color: #fff;
    white-space: nowrap;
    min-width: 70px;
    text-align: right;
  }

  .change-percent {
    font-size: 13px;
    font-weight: 600;
    white-space: nowrap;
    display: flex;
    align-items: center;
    gap: 3px;
  }

  .arrow {
    font-size: 11px;
    line-height: 1;
  }

  .green { color: var(--green); }
  .red { color: var(--red); }

  .error-container {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 200px;
    color: var(--text-secondary);
    font-size: 14px;
    text-align: center;
  }

  .error-box {
    background: #2a1a1a;
    padding: 20px;
    border-radius: 12px;
    border: 1px solid #ff4d4d33;
  }

  .error-title {
    color: var(--red);
    font-weight: 600;
    margin-bottom: 8px;
  }

  .error-message {
    font-size: 12px;
    color: var(--text-secondary);
    margin-bottom: 12px;
  }

  .retry-btn {
    background: #ff4d4d22;
    color: var(--red);
    border: 1px solid var(--red);
    padding: 6px 16px;
    border-radius: 6px;
    cursor: pointer;
    font-size: 12px;
  }
`,P=[{key:"forex",label:"Forex",table_id:"currencies_rates.americas",version:"54",columnset_id:"overview",payload:{lang:"en",range:[0,300],scanner_product_label:"markets-screener"}},{key:"stocks",label:"Stocks",table_id:"stocks_market_movers.active",version:"54",columnset_id:"performance",payload:{lang:"en",range:[0,92],sort:{sortBy:{id:"TickerUniversal",params:{}},sortOrder:"asc",nullsFirst:!1},scanner_product_label:"markets-screener"},extraParams:{market:"america"}},{key:"crypto",label:"Crypto",table_id:"crypto_coins.all",version:"54",columnset_id:"overview",payload:{columns:["base_currency_desc","base_currency_logoid","type","typespecs","exchange","fundamental_currency_code","market_cap_calc"],ignore_unknown_fields:!1,options:{lang:"en"},range:[0,60],preset:"coin_market_cap_rank"}},{key:"gold_etf",label:"Gold ETFs",table_id:"etfs_funds.gold",version:"54",columnset_id:"performance",payload:{lang:"en",range:[0,100],sort:{sortBy:{id:"AssetsUnderManagement",params:{}},sortOrder:"desc",nullsFirst:!1},scanner_product_label:"markets-screener"}},{key:"agricultural",label:"Agricultural",table_id:"futures.quotes_agricultural",version:"54",columnset_id:"overview",payload:{lang:"en",range:[0,92],sort:{sortBy:{id:"TickerUniversal",params:{}},sortOrder:"asc",nullsFirst:!1},scanner_product_label:"markets-screener"}},{key:"energy",label:"Energy",table_id:"futures.quotes_energy",version:"54",columnset_id:"overview",payload:{lang:"en",range:[0,50],sort:{sortBy:{id:"TickerUniversal",params:{}},sortOrder:"asc",nullsFirst:!1},scanner_product_label:"markets-screener"}}],S=e=>`~m~${e.length}~m~${e}`,A=e=>{const s=[];let n=e;for(;n.length>0&&n.startsWith("~m~");){const t=n.indexOf("~m~",3),l=parseInt(n.substring(3,t)),p=n.substr(t+3,l);s.push(p),n=n.substr(t+3+l)}return s},q=e=>{try{const s=e.replace(/^=\{/,"{");return JSON.parse(s).symbol||"UNKNOWN"}catch{return e}};function R(e,s){return e.find(n=>n.id===s)}function M(e){var n;if(e["base-currency-logoid"]&&e["currency-logoid"])return{baseLogoId:e["base-currency-logoid"],currencyLogoId:e["currency-logoid"]};const s=e.logoid||((n=e.logo)==null?void 0:n.logoid);return s?{baseLogoId:s,currencyLogoId:void 0}:{}}function W(e,s){const n=e==null?void 0:e.data;if(!n||!Array.isArray(n))return[];let t="TickerUniversal";const l="Price";let p="Change";s==="crypto"&&(t="TickerInstrumentUniversal",p="ChangeCrypto");const d=R(n,t),y=R(n,l),v=R(n,p);if(!d)return[];const C=d.rawValues.length,w=[],u=new Set;for(let m=0;m<C;m++){const f=d.rawValues[m];if(u.has(f.name))continue;u.add(f.name);const x=y?y.rawValues[m]??null:null,_=v?v.rawValues[m]??null:null,j=M(f);w.push({symbol:f.name,price:x,changePercent:_,baseLogoId:j.baseLogoId,currencyLogoId:j.currencyLogoId})}return w}function $(e){const[s,n]=i.useState([]),[t,l]=i.useState(!0),[p,d]=i.useState(null),[y,v]=i.useState(0),[C,w]=i.useState({}),u=i.useRef(null),m=i.useRef(null),f=i.useRef(new Set),x=i.useRef(null),_=i.useCallback(o=>{const a=u.current,c=m.current;if(!a||a.readyState!==WebSocket.OPEN||!c)return;const E=f.current,N=[];E.forEach(b=>{o.includes(b)||N.push(b)});const h=[];o.forEach(b=>{E.has(b)||h.push(b)}),N.length>0&&a.send(S(JSON.stringify({m:"quote_remove_symbols",p:[c,...N]}))),h.length>0&&a.send(S(JSON.stringify({m:"quote_add_symbols",p:[c,...h]}))),f.current=new Set(o)},[]);i.useEffect(()=>{u.current&&(u.current.close(),u.current=null),x.current&&clearTimeout(x.current),f.current=new Set,w({});const o=new WebSocket("wss://widgetdata.tradingview.com/socket.io/websocket");return u.current=o,o.onopen=()=>{const a="qs_"+Math.random().toString(36).substring(2,12);m.current=a,o.send(S(JSON.stringify({m:"quote_create_session",p:[a]}))),o.send(S(JSON.stringify({m:"quote_set_fields",p:[a,"ask","bid","lp"]}))),s.length>0&&_(s.map(c=>c.symbol))},o.onmessage=a=>{const c=a.data;if(c.startsWith("~h~")){o.send(c);return}A(c).forEach(N=>{try{const h=JSON.parse(N);if(h.m==="qsd"){const b=h.p[1],L=q(b.n),g=b.v;if(!g)return;let k=null;typeof g.lp=="number"&&g.lp>0?k=g.lp:typeof g.ask=="number"&&typeof g.bid=="number"&&g.ask>0&&g.bid>0&&(k=(g.ask+g.bid)/2),k!==null&&k>0&&w(I=>I[L]===k?I:{...I,[L]:k})}}catch{}})},o.onclose=a=>{f.current=new Set,a.wasClean||(x.current=setTimeout(()=>{v(c=>c+1)},3e3))},o.onerror=a=>{console.error("Market WebSocket error:",a)},()=>{x.current&&clearTimeout(x.current),u.current&&(u.current.close(),u.current=null)}},[]),i.useEffect(()=>{s.length>0&&_(s.map(o=>o.symbol))},[s,_]);const j=i.useCallback(async o=>{try{const a=await F.post("/api/tv/screener-facade/api/v1/screener-table/scan",e.payload,{params:{table_id:e.table_id,version:e.version,columnset_id:e.columnset_id,...e.extraParams||{}},headers:{"Content-Type":"application/json"}}),c=W(a.data,e.key);n(c),d(null)}catch(a){!F.isCancel(a)&&a.name!=="AbortError"&&a.code!=="ERR_CANCELED"&&(d(a.message),n([]))}finally{l(!1)}},[e]);i.useEffect(()=>{n([]),l(!0),d(null);const o=new AbortController;return j(o.signal),()=>o.abort()},[j,y]);const z=i.useCallback(()=>v(o=>o+1),[]);return{items:s.map(o=>{const a=C[o.symbol],c=a!=null&&a>0?a:o.price;return{...o,currentPrice:c}}),loading:t,error:p,refetch:z}}function U(e,s){return s&&e.length>=6?e.slice(0,3)+"/"+e.slice(3):e}function J(e,s){return e==null?"—":s.endsWith("JPY")||s.endsWith("KRW")||s.endsWith("HUF")?e.toFixed(2):e.toFixed(4)}function B(e){return e==null?"—":`${e>=0?"+":""}${e.toFixed(2)}%`}const D=()=>r.jsxs("div",{className:"skeleton-row",children:[r.jsxs("div",{className:"skeleton-left",children:[r.jsx("div",{className:"skeleton-flags"}),r.jsx("div",{className:"skeleton-symbol"})]}),r.jsxs("div",{className:"skeleton-right",children:[r.jsx("div",{className:"skeleton-price"}),r.jsx("div",{className:"skeleton-change"})]})]}),K=({baseId:e,quoteId:s})=>{const n=e&&s;return r.jsx("div",{className:"flag-container",children:n?r.jsxs(r.Fragment,{children:[r.jsx("img",{className:"flag-base",src:`https://s3-symbol-logo.tradingview.com/${e}.svg`,alt:"",onError:t=>{t.target.style.display="none"}}),r.jsx("img",{className:"flag-quote",src:`https://s3-symbol-logo.tradingview.com/${s}.svg`,alt:"",onError:t=>{t.target.style.display="none"}})]}):e?r.jsx("img",{className:"flag-single",src:`https://s3-symbol-logo.tradingview.com/${e}.svg`,alt:"",onError:t=>{t.target.style.display="none"}}):r.jsx("div",{className:"flag-single",style:{display:"flex",alignItems:"center",justifyContent:"center",background:"#333",fontSize:"12px",color:"#aaa"},children:"?"})})},V=({item:e,isForex:s})=>{const n=(e.changePercent??0)>=0,t=n?"green":"red",l=n?"▲":"▼",p=e.currentPrice??e.price;return r.jsx(O,{to:`/market/detail/${e.symbol}`,className:"row-link",children:r.jsxs("div",{className:"currency-row",children:[r.jsxs("div",{className:"left-section",children:[r.jsx(K,{baseId:e.baseLogoId,quoteId:e.currencyLogoId}),r.jsx("span",{className:"symbol-name",children:U(e.symbol,s)})]}),r.jsxs("div",{className:"right-section",children:[r.jsx("span",{className:"price-value",children:J(p,e.symbol)}),r.jsxs("span",{className:`change-percent ${t}`,children:[r.jsx("span",{className:"arrow",children:l}),B(e.changePercent)]})]})]})})},G=({category:e})=>{const{items:s,loading:n,error:t,refetch:l}=$(e),p=e.key==="forex";return n?r.jsx(r.Fragment,{children:Array.from({length:15}).map((d,y)=>r.jsx(D,{},y))}):t?r.jsx("div",{className:"error-container",children:r.jsxs("div",{className:"error-box",children:[r.jsx("p",{className:"error-title",children:"Connection Error"}),r.jsx("p",{className:"error-message",children:t}),r.jsx("button",{className:"retry-btn",onClick:l,children:"Retry"})]})}):r.jsx(r.Fragment,{children:s.map(d=>r.jsx(V,{item:d,isForex:p},d.symbol))})},Q=()=>{const[e,s]=i.useState("forex"),n=P.find(t=>t.key===e)||P[0];return r.jsxs(r.Fragment,{children:[r.jsx("style",{children:T}),r.jsx("div",{className:"market-page",children:r.jsxs("div",{className:"market-container",children:[r.jsxs("header",{className:"market-header",children:[r.jsx("h1",{className:"market-title",children:"Forex Market"}),r.jsx("p",{className:"market-date",children:new Date().toLocaleDateString("en-US",{month:"long",day:"numeric",year:"numeric"})})]}),r.jsx("div",{className:"filter-bar",children:P.map(t=>r.jsx("div",{className:`filter-tab ${e===t.key?"active":""}`,onClick:()=>s(t.key),children:t.label},t.key))}),r.jsx(G,{category:n},n.key)]})})]})};export{Q as default};
