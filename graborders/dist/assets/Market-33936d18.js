import{i as c,k as e,j as i,L as z,o as R}from"./index-680400b2.js";const M=()=>{const[T,S]=c.useState({}),[u,j]=c.useState(""),[N,v]=c.useState(!0),d=c.useRef(null),g=c.useRef(null),h=c.useRef(!0),l=c.useMemo(()=>["SHIBUSD","USDCUSD","DOGEUSD","TRXUSD","XRPUSD","ADAUSD","FILUSD","TONUSD","MATICUSD","DOTUSD","SOLUSD","TRUMPUSD","EOSUSD","LINKUSD","ZECUSD","DASHUSD","LTCUSD","ETHUSD","BCHUSD","BNBUSD","BTCUSD","XMRUSD","YFIUSD"],[]),b=c.useCallback(r=>r>=1e9?(r/1e9).toFixed(1)+"B":r>=1e6?(r/1e6).toFixed(1)+"M":r.toFixed(0),[]),f=c.useCallback(r=>{const s=Number(r);return isNaN(s)?"0.00":s.toLocaleString(void 0,{minimumFractionDigits:2,maximumFractionDigits:s<1?6:4})},[]),y=c.useCallback(()=>{g.current&&(g.current.abort(),g.current=null)},[]),D=c.useCallback(()=>{if(d.current){try{d.current.onclose=null,d.current.close()}catch(r){console.warn("Error closing WebSocket:",r)}d.current=null}},[]);c.useEffect(()=>((async()=>{try{v(!0),y(),g.current=new AbortController;const s=g.current.signal,a=new Promise((o,p)=>{setTimeout(()=>p(new Error(i("common.timeout"))),5e3)}),x=`https://api.binance.com/api/v3/ticker/24hr?symbols=[${l.map(o=>`"${o}"`).join(",")}]`,w=R.get(x,{signal:s}),m=await Promise.race([w,a]),n={};m.data.forEach(o=>{const p=o.symbol,E=p.replace("USD",""),F=parseFloat(o.priceChangePercent)>=0,L=Math.abs(Number(o.priceChangePercent)).toFixed(2);n[p]={symbol:p,name:`${E}/USD`,price:f(o.lastPrice),change:o.priceChange,changePercent:L,volume:o.volume,volumeFormatted:b(Number(o.volume)),isPositive:F,quoteVolume:parseFloat(o.quoteVolume)}}),l.forEach(o=>{if(!n[o]){const p=o.replace("USD","");n[o]={symbol:o,name:`${p}/USD`,price:"0.00",change:"0.00",changePercent:"0.00",volume:"0",volumeFormatted:"0",isPositive:!0,quoteVolume:0}}}),h.current&&(S(n),v(!1))}catch(s){if(s.name==="AbortError"){console.log(i("common.requestAborted"));return}console.error(i("common.fetchError"),s);const a={};l.forEach(t=>{const x=t.replace("USD","");a[t]={symbol:t,name:`${x}/USD`,price:"0.00",change:"0.00",changePercent:"0.00",volume:"0",volumeFormatted:"0",isPositive:!0,quoteVolume:0}}),h.current&&(S(a),v(!1))}})(),()=>{y()}),[l,f,b,y]),c.useEffect(()=>{h.current=!0;const r=()=>{try{const s=l.map(a=>`${a.toLowerCase()}@ticker`).join("/");d.current=new WebSocket(`wss://stream.binance.com:9443/ws/${s}`),d.current.onopen=()=>{console.log(i("pages.market.websocketConnected"))},d.current.onmessage=a=>{if(h.current)try{const t=JSON.parse(a.data),x=Array.isArray(t)?t:[t];S(w=>{const m={...w};return x.forEach(n=>{if(l.includes(n.s)&&m[n.s]){const o=parseFloat(n.P)>=0,p=Math.abs(Number(n.P)).toFixed(2);m[n.s]={...m[n.s],price:f(n.c),change:n.p,changePercent:p,volume:n.v,volumeFormatted:b(Number(n.v)),isPositive:o,quoteVolume:parseFloat(n.q)}}}),m})}catch(t){console.error(i("pages.market.websocketParseError"),t)}},d.current.onerror=a=>{console.error(i("pages.market.websocketError"),a)},d.current.onclose=a=>{console.log(i("pages.market.websocketClosed"),a.code),a.code!==1e3&&h.current&&setTimeout(()=>{h.current&&r()},2e3)}}catch(s){console.error(i("pages.market.websocketSetupError"),s)}};return r(),()=>{h.current=!1,D()}},[l,f,b,D]);const k=c.useMemo(()=>{const r=Object.values(T);if(r.length===0)return[];let s=r;if(u){const a=u.toLowerCase();s=s.filter(t=>t.name.toLowerCase().includes(a)||t.symbol.toLowerCase().includes(a))}return l.map(a=>s.find(t=>t.symbol===a)).filter(Boolean)},[T,u,l]),U=r=>{j(r.target.value)},C=c.useCallback(()=>{j("")},[]),P=c.useCallback(({pair:r})=>e.jsxs("div",{className:"table-row",children:[e.jsxs("div",{className:"pair-col",children:[e.jsx("div",{className:"crypto-icon",children:r.replace("USD","").substring(0,2)}),e.jsxs("span",{children:[r.replace("USD",""),"/USD"]})]}),e.jsxs("div",{className:"price-col",children:[e.jsx("div",{className:"crypto-price",children:"..."}),e.jsx("div",{className:"usd-price",children:"..."})]}),e.jsx("div",{className:"change-col",children:e.jsx("span",{className:"change-positive",children:"..."})})]}),[]);return e.jsxs("div",{className:"container",style:{backgroundColor:"#106cf5"},children:[e.jsxs("div",{className:"header",children:[e.jsx("div",{className:"header-title",children:i("pages.market.title")}),e.jsxs("div",{className:"search-bar",children:[e.jsx("i",{className:"fas fa-search"}),e.jsx("input",{type:"text",placeholder:i("pages.market.search.placeholder"),value:u,onChange:U}),u&&e.jsx("button",{className:"clear-search",onClick:C,style:{background:"none",border:"none",color:"rgba(255, 255, 255, 0.8)",cursor:"pointer",fontSize:"18px",padding:"0 5px"},title:i("pages.market.search.clear"),"aria-label":i("pages.market.search.clear"),children:"×"})]})]}),e.jsxs("div",{className:"content",style:{borderRadius:"21px 21px 0 0",backgroundColor:"white",padding:"20px 16px 100px"},children:[e.jsxs("div",{className:"table-header",children:[e.jsx("div",{className:"pair-col",style:{fontSize:12},children:i("pages.market.tableHeaders.pair")}),e.jsx("div",{className:"price-col",style:{fontSize:12},children:i("pages.market.tableHeaders.latestPrice")}),e.jsx("div",{className:"change-col",style:{fontSize:12},children:i("pages.market.tableHeaders.change24h")})]}),N?e.jsx("div",{children:l.map(r=>e.jsx(P,{pair:r},r))}):k.length>0?e.jsx(e.Fragment,{children:k.map(r=>e.jsx(z,{to:`/market/detail/${r.symbol}`,className:"remove_blue",children:e.jsxs("div",{className:"table-row",children:[e.jsxs("div",{className:"pair-col",children:[e.jsx("div",{className:"crypto-icon",children:e.jsx("img",{src:`https://images.weserv.nl/?url=https://bin.bnbstatic.com/static/assets/logos/${r.name.split("/")[0]}.png`,style:{width:25,height:25},alt:r.name.split("/")[0],onError:s=>{const a=s.target;a.style.display="none";const t=a.parentElement;t&&(t.innerHTML=r.name.split("/")[0].substring(0,2),t.style.display="flex",t.style.alignItems="center",t.style.justifyContent="center",t.style.width="32px",t.style.height="32px",t.style.borderRadius="50%",t.style.color="#106cf5",t.style.fontSize="14px")}})}),e.jsx("span",{children:r.name})]}),e.jsxs("div",{className:"price-col",children:[e.jsxs("div",{className:"crypto-price",children:["$",r.price]}),e.jsxs("div",{className:"usd-price",children:["$",r.price]})]}),e.jsx("div",{className:"change-col",children:e.jsxs("span",{className:r.isPositive?"change-positive":"change-negative",children:[r.isPositive?"+":"",r.changePercent,"%"]})})]})},r.symbol))}):e.jsx("div",{style:{textAlign:"center",padding:"40px 20px",color:"#666",fontSize:"16px"},children:i("pages.market.noResults")})]}),e.jsx("style",{children:`
        .container {
          max-width: 400px;
          width: 100%;
          margin: 0 auto;
        }

        /* Header Styles */
        .header {
          background-color: #106cf5;
          color: white;
          padding: 10px 20px 20px;
          position: relative;
        }

        .header-title {
          text-align: center;
          font-size: 22px;
          font-weight: 700;
          margin-bottom: 20px;
        }

        .search-bar {
          background: rgba(255, 255, 255, 0.2);
          border-radius: 25px;
          padding: 12px 20px;
          display: flex;
          align-items: center;
          backdrop-filter: blur(10px);
        }

        .search-bar i {
          margin-right: 10px;
          color: rgba(255, 255, 255, 0.8);
        }

        .search-bar input {
          background: transparent;
          border: none;
          color: white;
          font-size: 12px;
          width: 100%;
          outline: none;
        }

        .search-bar input::placeholder {
          color: rgba(255, 255, 255, 0.7);
        }

        /* Main Content */
        .table-header {
          display: flex;
          color: #6c757d;
          font-size: 12px;
        }

        .table-row {
          display: flex;
          align-items: center;
          transition: background-color 0.2s;
          margin-top: 8px !important;
          border-radius: 8px;
        }

        .table-row:hover {
          background-color: #f8f9fa;
        }

        .pair-col {
          flex: 2;
          display: flex;
          align-items: center;
        }

        .price-col {
          flex: 2;
          text-align: right;
          margin-right: 15px;
        }

        .change-col {
          flex: 1;
          text-align: right;
        }

        .crypto-icon {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-right: 12px;
          font-size: 14px;
          color: #106cf5;
          background: #f0f4ff;
          overflow: hidden;
        }

        .crypto-icon img {
          border-radius: 50%;
        }

        .crypto-price {
          font-size: 16px;
        }

        .usd-price {
          font-size: 12px;
          color: #6c757d;
          margin-top: 2px;
        }

        .change-positive {
          background-color: #37b66a;
          color: white;
          padding: 6px 10px;
          border-radius: 4px;
          font-size: 13px;
          font-weight: 500;
          display: inline-block;
          min-width: 70px;
          text-align: center;
        }

        .change-negative {
          background-color: #e53858;
          color: white;
          padding: 6px 10px;
          border-radius: 4px;
          font-size: 13px;
          font-weight: 500;
          display: inline-block;
          min-width: 70px;
          text-align: center;
        }

        .remove_blue {
          text-decoration: none;
          color: inherit;
        }

        /* Responsive adjustments */
        @media (max-width: 380px) {
          .table-row {
            padding: 10px 12px;
          }

          .crypto-icon {
            width: 28px;
            height: 28px;
            margin-right: 10px;
          }

          .crypto-price {
            font-size: 14px;
          }
        }

        /* Animation for price updates */
        @keyframes highlightUpdate {
          0% {
            background-color: rgba(55, 182, 106, 0.1);
          }
          100% {
            background-color: transparent;
          }
        }

        .price-update {
          animation: highlightUpdate 1s ease-in-out;
        }
      `})]})};export{M as default};
