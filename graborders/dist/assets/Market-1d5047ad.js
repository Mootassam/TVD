import{i,k as r,n as z,L as T}from"./index-6af00e78.js";const A=`
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
`,L=[{key:"forex",label:"Forex",table_id:"currencies_rates.americas",version:"54",columnset_id:"overview",payload:{lang:"en",range:[0,300],scanner_product_label:"markets-screener"}},{key:"stocks",label:"Stocks",table_id:"stocks_market_movers.active",version:"54",columnset_id:"performance",payload:{lang:"en",range:[0,92],sort:{sortBy:{id:"TickerUniversal",params:{}},sortOrder:"asc",nullsFirst:!1},scanner_product_label:"markets-screener"},extraParams:{market:"america"}},{key:"crypto",label:"Crypto",table_id:"crypto_coins.all",version:"54",columnset_id:"overview",payload:{columns:["base_currency_desc","base_currency_logoid","type","typespecs","exchange","fundamental_currency_code","market_cap_calc"],ignore_unknown_fields:!1,options:{lang:"en"},range:[0,60],preset:"coin_market_cap_rank"}},{key:"gold_etf",label:"Gold ETFs",table_id:"etfs_funds.gold",version:"54",columnset_id:"performance",payload:{lang:"en",range:[0,100],sort:{sortBy:{id:"AssetsUnderManagement",params:{}},sortOrder:"desc",nullsFirst:!1},scanner_product_label:"markets-screener"}},{key:"agricultural",label:"Agricultural",table_id:"futures.quotes_agricultural",version:"54",columnset_id:"overview",payload:{lang:"en",range:[0,92],sort:{sortBy:{id:"TickerUniversal",params:{}},sortOrder:"asc",nullsFirst:!1},scanner_product_label:"markets-screener"}},{key:"energy",label:"Energy",table_id:"futures.quotes_energy",version:"54",columnset_id:"overview",payload:{lang:"en",range:[0,50],sort:{sortBy:{id:"TickerUniversal",params:{}},sortOrder:"asc",nullsFirst:!1},scanner_product_label:"markets-screener"}}],E=e=>`~m~${e.length}~m~${e}`,q=e=>{const t=[];let n=e;for(;n.length>0&&n.startsWith("~m~");){const o=n.indexOf("~m~",3),l=parseInt(n.substring(3,o)),m=n.substr(o+3,l);t.push(m),n=n.substr(o+3+l)}return t},M=e=>{try{const t=e.replace(/^=\{/,"{");return JSON.parse(t).symbol||"UNKNOWN"}catch{return e}};function R(e,t){return e.find(n=>n.id===t)}function W(e){var n;if(e["base-currency-logoid"]&&e["currency-logoid"])return{baseLogoId:e["base-currency-logoid"],currencyLogoId:e["currency-logoid"]};const t=e.logoid||((n=e.logo)==null?void 0:n.logoid);return t?{baseLogoId:t,currencyLogoId:void 0}:{}}function $(e){const t=e.indexOf(":");return t!==-1?e.substring(t+1):e}function U(e,t){const n=e==null?void 0:e.data;if(!n||!Array.isArray(n))return[];const o=e.symbols||[];let l="TickerUniversal";const m="Price";let p="Change";t==="crypto"&&(l="TickerInstrumentUniversal",p="ChangeCrypto");const x=R(n,l),k=R(n,m),j=R(n,p);if(!x)return[];const N=x.rawValues.length,d=[],v=new Set;for(let u=0;u<N;u++){const g=x.rawValues[u];if(v.has(g.name))continue;v.add(g.name);const w=k?k.rawValues[u]??null:null,S=j?j.rawValues[u]??null:null,C=W(g),I=o[u]||g.name,s=$(I);d.push({symbol:g.name,fullSymbol:I,routeSymbol:s,price:w,changePercent:S,baseLogoId:C.baseLogoId,currencyLogoId:C.currencyLogoId})}return d}function J(e){const[t,n]=i.useState([]),[o,l]=i.useState(!0),[m,p]=i.useState(null),[x,k]=i.useState(0),[j,N]=i.useState({}),d=i.useRef(null),v=i.useRef(null),u=i.useRef(new Set),g=i.useRef(null),w=i.useCallback(s=>{const a=d.current,c=v.current;if(!a||a.readyState!==WebSocket.OPEN||!c)return;const P=u.current,_=[];P.forEach(b=>{s.includes(b)||_.push(b)});const h=[];s.forEach(b=>{P.has(b)||h.push(b)}),_.length>0&&a.send(E(JSON.stringify({m:"quote_remove_symbols",p:[c,..._]}))),h.length>0&&a.send(E(JSON.stringify({m:"quote_add_symbols",p:[c,...h]}))),u.current=new Set(s)},[]);i.useEffect(()=>{d.current&&(d.current.close(),d.current=null),g.current&&clearTimeout(g.current),u.current=new Set,N({});const s=new WebSocket("wss://widgetdata.tradingview.com/socket.io/websocket");return d.current=s,s.onopen=()=>{const a="qs_"+Math.random().toString(36).substring(2,12);v.current=a,s.send(E(JSON.stringify({m:"quote_create_session",p:[a]}))),s.send(E(JSON.stringify({m:"quote_set_fields",p:[a,"ask","bid","lp"]}))),t.length>0&&w(t.map(c=>c.fullSymbol))},s.onmessage=a=>{const c=a.data;if(c.startsWith("~h~")){s.send(c);return}q(c).forEach(_=>{try{const h=JSON.parse(_);if(h.m==="qsd"){const b=h.p[1],O=M(b.n),f=b.v;if(!f)return;let y=null;typeof f.lp=="number"&&f.lp>0?y=f.lp:typeof f.ask=="number"&&typeof f.bid=="number"&&f.ask>0&&f.bid>0&&(y=(f.ask+f.bid)/2),y!==null&&y>0&&N(F=>F[O]===y?F:{...F,[O]:y})}}catch{}})},s.onclose=a=>{u.current=new Set,a.wasClean||(g.current=setTimeout(()=>{k(c=>c+1)},3e3))},s.onerror=a=>{console.error("Market WebSocket error:",a)},()=>{g.current&&clearTimeout(g.current),d.current&&(d.current.close(),d.current=null)}},[]),i.useEffect(()=>{t.length>0&&w(t.map(s=>s.fullSymbol))},[t,w]);const S=i.useCallback(async s=>{try{const a=await z.post("/api/tv/screener-facade/api/v1/screener-table/scan",e.payload,{params:{table_id:e.table_id,version:e.version,columnset_id:e.columnset_id,...e.extraParams||{}},headers:{"Content-Type":"application/json"}}),c=U(a.data,e.key);n(c),p(null)}catch(a){!z.isCancel(a)&&a.name!=="AbortError"&&a.code!=="ERR_CANCELED"&&(p(a.message),n([]))}finally{l(!1)}},[e]);i.useEffect(()=>{n([]),l(!0),p(null);const s=new AbortController;return S(s.signal),()=>s.abort()},[S,x]);const C=i.useCallback(()=>k(s=>s+1),[]);return{items:t.map(s=>{const a=j[s.fullSymbol],c=a!=null&&a>0?a:s.price;return{...s,currentPrice:c}}),loading:o,error:m,refetch:C}}function B(e,t){return t&&e.length>=6?e.slice(0,3)+"/"+e.slice(3):e}function D(e,t){return e==null?"—":t.endsWith("JPY")||t.endsWith("KRW")||t.endsWith("HUF")?e.toFixed(2):e.toFixed(4)}function K(e){return e==null?"—":`${e>=0?"+":""}${e.toFixed(2)}%`}const V=()=>r.jsxs("div",{className:"skeleton-row",children:[r.jsxs("div",{className:"skeleton-left",children:[r.jsx("div",{className:"skeleton-flags"}),r.jsx("div",{className:"skeleton-symbol"})]}),r.jsxs("div",{className:"skeleton-right",children:[r.jsx("div",{className:"skeleton-price"}),r.jsx("div",{className:"skeleton-change"})]})]}),G=({baseId:e,quoteId:t})=>{const n=e&&t;return r.jsx("div",{className:"flag-container",children:n?r.jsxs(r.Fragment,{children:[r.jsx("img",{className:"flag-base",src:`https://s3-symbol-logo.tradingview.com/${e}.svg`,alt:"",onError:o=>{o.target.style.display="none"}}),r.jsx("img",{className:"flag-quote",src:`https://s3-symbol-logo.tradingview.com/${t}.svg`,alt:"",onError:o=>{o.target.style.display="none"}})]}):e?r.jsx("img",{className:"flag-single",src:`https://s3-symbol-logo.tradingview.com/${e}.svg`,alt:"",onError:o=>{o.target.style.display="none"}}):r.jsx("div",{className:"flag-single",style:{display:"flex",alignItems:"center",justifyContent:"center",background:"#333",fontSize:"12px",color:"#aaa"},children:"?"})})},Y=({item:e,isForex:t})=>{const n=(e.changePercent??0)>=0,o=n?"green":"red",l=n?"▲":"▼",m=e.currentPrice??e.price;return r.jsx(T,{to:`/market/detail/${e.routeSymbol}`,className:"row-link",children:r.jsxs("div",{className:"currency-row",children:[r.jsxs("div",{className:"left-section",children:[r.jsx(G,{baseId:e.baseLogoId,quoteId:e.currencyLogoId}),r.jsx("span",{className:"symbol-name",children:B(e.symbol,t)})]}),r.jsxs("div",{className:"right-section",children:[r.jsx("span",{className:"price-value",children:D(m,e.symbol)}),r.jsxs("span",{className:`change-percent ${o}`,children:[r.jsx("span",{className:"arrow",children:l}),K(e.changePercent)]})]})]})})},H=({category:e})=>{const{items:t,loading:n,error:o,refetch:l}=J(e),m=e.key==="forex";return n?r.jsx(r.Fragment,{children:Array.from({length:15}).map((p,x)=>r.jsx(V,{},x))}):o?r.jsx("div",{className:"error-container",children:r.jsxs("div",{className:"error-box",children:[r.jsx("p",{className:"error-title",children:"Connection Error"}),r.jsx("p",{className:"error-message",children:o}),r.jsx("button",{className:"retry-btn",onClick:l,children:"Retry"})]})}):r.jsx(r.Fragment,{children:t.map(p=>r.jsx(Y,{item:p,isForex:m},p.symbol))})},X=()=>{const[e,t]=i.useState("forex"),n=L.find(o=>o.key===e)||L[0];return r.jsxs(r.Fragment,{children:[r.jsx("style",{children:A}),r.jsx("div",{className:"market-page",children:r.jsxs("div",{className:"market-container",children:[r.jsxs("header",{className:"market-header",children:[r.jsx("h1",{className:"market-title",children:"Forex Market"}),r.jsx("p",{className:"market-date",children:new Date().toLocaleDateString("en-US",{month:"long",day:"numeric",year:"numeric"})})]}),r.jsx("div",{className:"filter-bar",children:L.map(o=>r.jsx("div",{className:`filter-tab ${e===o.key?"active":""}`,onClick:()=>t(o.key),children:o.label},o.key))}),r.jsx(H,{category:n},n.key)]})})]})};export{X as default};
