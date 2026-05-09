import{i as c,k as r,n as T,L as A}from"./index-2fa1a0af.js";const $=`
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
`,L=[{key:"forex",label:"Forex",table_id:"currencies_rates.americas",version:"54",columnset_id:"overview",payload:{lang:"en",range:[0,300],scanner_product_label:"markets-screener"}},{key:"stocks",label:"Stocks",table_id:"stocks_market_movers.active",version:"54",columnset_id:"performance",payload:{lang:"en",range:[0,92],sort:{sortBy:{id:"TickerUniversal",params:{}},sortOrder:"asc",nullsFirst:!1},scanner_product_label:"markets-screener"},extraParams:{market:"america"}},{key:"crypto",label:"Crypto",table_id:"crypto_coins.all",version:"54",columnset_id:"overview",payload:{columns:["base_currency_desc","base_currency_logoid","type","typespecs","exchange","fundamental_currency_code","market_cap_calc"],ignore_unknown_fields:!1,options:{lang:"en"},range:[0,60],preset:"coin_market_cap_rank"}},{key:"gold_etf",label:"Gold ETFs",table_id:"etfs_funds.gold",version:"54",columnset_id:"performance",payload:{lang:"en",range:[0,100],sort:{sortBy:{id:"AssetsUnderManagement",params:{}},sortOrder:"desc",nullsFirst:!1},scanner_product_label:"markets-screener"}},{key:"agricultural",label:"Agricultural",table_id:"futures.quotes_agricultural",version:"54",columnset_id:"overview",payload:{lang:"en",range:[0,92],sort:{sortBy:{id:"TickerUniversal",params:{}},sortOrder:"asc",nullsFirst:!1},scanner_product_label:"markets-screener"}},{key:"energy",label:"Energy",table_id:"futures.quotes_energy",version:"54",columnset_id:"overview",payload:{lang:"en",range:[0,50],sort:{sortBy:{id:"TickerUniversal",params:{}},sortOrder:"asc",nullsFirst:!1},scanner_product_label:"markets-screener"}}],I=e=>`~m~${e.length}~m~${e}`,q=e=>{const t=[];let n=e;for(;n.length>0&&n.startsWith("~m~");){const s=n.indexOf("~m~",3),l=parseInt(n.substring(3,s)),b=n.substr(s+3,l);t.push(b),n=n.substr(s+3+l)}return t},M=e=>{try{const t=e.replace(/^=\{/,"{");return JSON.parse(t).symbol||"UNKNOWN"}catch{return e}};function R(e,t){return e.find(n=>n.id===t)}function W(e){var n;if(e["base-currency-logoid"]&&e["currency-logoid"])return{baseLogoId:e["base-currency-logoid"],currencyLogoId:e["currency-logoid"]};const t=e.logoid||((n=e.logo)==null?void 0:n.logoid);return t?{baseLogoId:t,currencyLogoId:void 0}:{}}function U(e){const t=e.indexOf(":");return t!==-1?e.substring(t+1):e}function J(e,t){const n=e==null?void 0:e.data;if(!n||!Array.isArray(n))return[];const s=e.symbols||[];let l="TickerUniversal";const b="Price";let g="Change";t==="crypto"&&(l="TickerInstrumentUniversal",g="ChangeCrypto");const h=R(n,l),k=R(n,b),j=R(n,g);if(!h)return[];const N=h.rawValues.length,d=[],v=new Set;for(let u=0;u<N;u++){const p=h.rawValues[u];if(v.has(p.name))continue;v.add(p.name);const w=k?k.rawValues[u]??null:null,S=j?j.rawValues[u]??null:null,C=W(p),P=s[u]||p.name,o=U(P);d.push({symbol:p.name,fullSymbol:P,routeSymbol:o,price:w,changePercent:S,baseLogoId:C.baseLogoId,currencyLogoId:C.currencyLogoId})}return d}function B(e){const[t,n]=c.useState([]),[s,l]=c.useState(!0),[b,g]=c.useState(null),[h,k]=c.useState(0),[j,N]=c.useState({}),d=c.useRef(null),v=c.useRef(null),u=c.useRef(new Set),p=c.useRef(null),w=c.useCallback(o=>{const a=d.current,i=v.current;if(!a||a.readyState!==WebSocket.OPEN||!i)return;const f=u.current,E=[];f.forEach(x=>{o.includes(x)||E.push(x)});const _=[];o.forEach(x=>{f.has(x)||_.push(x)}),E.length>0&&a.send(I(JSON.stringify({m:"quote_remove_symbols",p:[i,...E]}))),_.length>0&&a.send(I(JSON.stringify({m:"quote_add_symbols",p:[i,..._]}))),u.current=new Set(o)},[]);c.useEffect(()=>{d.current&&(d.current.close(),d.current=null),p.current&&clearTimeout(p.current),u.current=new Set,N({});const o=window.location.protocol==="https:"?"wss:":"ws:",a=new WebSocket(`${o}//${window.location.host}/ws/socket.io/websocket`);return d.current=a,a.onopen=()=>{const i="qs_"+Math.random().toString(36).substring(2,12);v.current=i,a.send(I(JSON.stringify({m:"quote_create_session",p:[i]}))),a.send(I(JSON.stringify({m:"quote_set_fields",p:[i,"ask","bid","lp"]}))),t.length>0&&w(t.map(f=>f.fullSymbol))},a.onmessage=i=>{const f=i.data;if(f.startsWith("~h~")){a.send(f);return}q(f).forEach(_=>{try{const x=JSON.parse(_);if(x.m==="qsd"){const O=x.p[1],z=M(O.n),m=O.v;if(!m)return;let y=null;typeof m.lp=="number"&&m.lp>0?y=m.lp:typeof m.ask=="number"&&typeof m.bid=="number"&&m.ask>0&&m.bid>0&&(y=(m.ask+m.bid)/2),y!==null&&y>0&&N(F=>F[z]===y?F:{...F,[z]:y})}}catch{}})},a.onclose=i=>{u.current=new Set,i.wasClean||(p.current=setTimeout(()=>{k(f=>f+1)},3e3))},a.onerror=i=>{console.error("Market WebSocket error:",i)},()=>{p.current&&clearTimeout(p.current),d.current&&(d.current.close(),d.current=null)}},[]),c.useEffect(()=>{t.length>0&&w(t.map(o=>o.fullSymbol))},[t,w]);const S=c.useCallback(async o=>{try{const a=await T.post("/api/tv/screener-facade/api/v1/screener-table/scan",e.payload,{params:{table_id:e.table_id,version:e.version,columnset_id:e.columnset_id,...e.extraParams||{}},headers:{"Content-Type":"application/json"}}),i=J(a.data,e.key);n(i),g(null)}catch(a){!T.isCancel(a)&&a.name!=="AbortError"&&a.code!=="ERR_CANCELED"&&(g(a.message),n([]))}finally{l(!1)}},[e]);c.useEffect(()=>{n([]),l(!0),g(null);const o=new AbortController;return S(o.signal),()=>o.abort()},[S,h]);const C=c.useCallback(()=>k(o=>o+1),[]);return{items:t.map(o=>{const a=j[o.fullSymbol],i=a!=null&&a>0?a:o.price;return{...o,currentPrice:i}}),loading:s,error:b,refetch:C}}function D(e,t){return t&&e.length>=6?e.slice(0,3)+"/"+e.slice(3):e}function K(e,t){return e==null?"—":t.endsWith("JPY")||t.endsWith("KRW")||t.endsWith("HUF")?e.toFixed(2):e.toFixed(4)}function V(e){return e==null?"—":`${e>=0?"+":""}${e.toFixed(2)}%`}const G=()=>r.jsxs("div",{className:"skeleton-row",children:[r.jsxs("div",{className:"skeleton-left",children:[r.jsx("div",{className:"skeleton-flags"}),r.jsx("div",{className:"skeleton-symbol"})]}),r.jsxs("div",{className:"skeleton-right",children:[r.jsx("div",{className:"skeleton-price"}),r.jsx("div",{className:"skeleton-change"})]})]}),Y=({baseId:e,quoteId:t})=>{const n=e&&t;return r.jsx("div",{className:"flag-container",children:n?r.jsxs(r.Fragment,{children:[r.jsx("img",{className:"flag-base",src:`https://s3-symbol-logo.tradingview.com/${e}.svg`,alt:"",onError:s=>{s.target.style.display="none"}}),r.jsx("img",{className:"flag-quote",src:`https://s3-symbol-logo.tradingview.com/${t}.svg`,alt:"",onError:s=>{s.target.style.display="none"}})]}):e?r.jsx("img",{className:"flag-single",src:`https://s3-symbol-logo.tradingview.com/${e}.svg`,alt:"",onError:s=>{s.target.style.display="none"}}):r.jsx("div",{className:"flag-single",style:{display:"flex",alignItems:"center",justifyContent:"center",background:"#333",fontSize:"12px",color:"#aaa"},children:"?"})})},H=({item:e,isForex:t})=>{const n=(e.changePercent??0)>=0,s=n?"green":"red",l=n?"▲":"▼",b=e.currentPrice??e.price;return r.jsx(A,{to:`/market/detail/${e.routeSymbol}`,className:"row-link",children:r.jsxs("div",{className:"currency-row",children:[r.jsxs("div",{className:"left-section",children:[r.jsx(Y,{baseId:e.baseLogoId,quoteId:e.currencyLogoId}),r.jsx("span",{className:"symbol-name",children:D(e.symbol,t)})]}),r.jsxs("div",{className:"right-section",children:[r.jsx("span",{className:"price-value",children:K(b,e.symbol)}),r.jsxs("span",{className:`change-percent ${s}`,children:[r.jsx("span",{className:"arrow",children:l}),V(e.changePercent)]})]})]})})},Q=({category:e})=>{const{items:t,loading:n,error:s,refetch:l}=B(e),b=e.key==="forex";return n?r.jsx(r.Fragment,{children:Array.from({length:15}).map((g,h)=>r.jsx(G,{},h))}):s?r.jsx("div",{className:"error-container",children:r.jsxs("div",{className:"error-box",children:[r.jsx("p",{className:"error-title",children:"Connection Error"}),r.jsx("p",{className:"error-message",children:s}),r.jsx("button",{className:"retry-btn",onClick:l,children:"Retry"})]})}):r.jsx(r.Fragment,{children:t.map(g=>r.jsx(H,{item:g,isForex:b},g.symbol))})},Z=()=>{const[e,t]=c.useState("forex"),n=L.find(s=>s.key===e)||L[0];return r.jsxs(r.Fragment,{children:[r.jsx("style",{children:$}),r.jsx("div",{className:"market-page",children:r.jsxs("div",{className:"market-container",children:[r.jsxs("header",{className:"market-header",children:[r.jsx("h1",{className:"market-title",children:"Forex Market"}),r.jsx("p",{className:"market-date",children:new Date().toLocaleDateString("en-US",{month:"long",day:"numeric",year:"numeric"})})]}),r.jsx("div",{className:"filter-bar",children:L.map(s=>r.jsx("div",{className:`filter-tab ${e===s.key?"active":""}`,onClick:()=>t(s.key),children:s.label},s.key))}),r.jsx(Q,{category:n},n.key)]})})]})};export{Z as default};
