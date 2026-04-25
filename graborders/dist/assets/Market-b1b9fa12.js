import{k as e,i as l,L as N}from"./index-d4577151.js";import{M as w,u as F,a as s}from"./MarketContext-45b340d3.js";const z=()=>{var f;const{data:g,isLoading:h,error:c,startRealtime:t,stopRealtime:n,isRealtimeActive:i,refresh:b}=F(),[a,m]=l.useState("Forex"),[d,p]=l.useState(!1);l.useEffect(()=>(t(a),()=>{n(a)}),[a,t,n]);const x=async()=>{p(!0),await b(a),p(!1)},u=()=>{i(a)?n(a):t(a)},o=g[a]||[],j=h[a],v=Object.keys(s),k=()=>e.jsxs("div",{className:"loading-row",children:[e.jsx("div",{className:"loading-icon"}),e.jsx("div",{className:"loading-line"}),e.jsx("div",{className:"loading-line short"})]});return e.jsxs("div",{className:"forex-container",children:[e.jsxs("div",{className:"forex-header",children:[e.jsx("h1",{className:"forex-title",children:s[a].title}),e.jsxs("div",{className:"header-actions",children:[e.jsxs("button",{className:`realtime-btn ${i(a)?"active":""}`,onClick:u,title:i(a)?"Stop real-time":"Start real-time",children:[e.jsx("span",{className:"realtime-dot"}),i(a)?"LIVE":"PAUSED"]}),e.jsx("button",{className:"refresh-btn",onClick:x,disabled:d,children:"↻"})]})]}),e.jsx("div",{className:"category-tabs",children:v.map(r=>e.jsx("button",{className:`tab-btn ${a===r?"active":""}`,onClick:()=>m(r),children:s[r].title},r))}),e.jsxs("div",{className:"forex-list",children:[e.jsxs("div",{className:"list-header",children:[e.jsx("span",{children:"Pair"}),e.jsx("span",{children:"Price"}),e.jsx("span",{children:"24h %"})]}),j&&o.length===0?e.jsx("div",{className:"loading-container",children:s[a].symbols.slice(0,8).map((r,y)=>e.jsx(k,{},y))}):c&&o.length===0?e.jsxs("div",{className:"error-container",children:[e.jsx("div",{className:"error-message",children:c}),e.jsx("button",{className:"retry-btn",onClick:x,children:"Retry"}),e.jsx("div",{className:"note",children:"Configure API keys in .env file for live data"})]}):o.length>0?o.map(r=>e.jsx(N,{to:`/market/detail/${r.symbol}`,className:"forex-link",children:e.jsxs("div",{className:"forex-row",children:[e.jsxs("div",{className:"forex-pair",children:[e.jsx("span",{className:"pair-name",children:r.name}),e.jsx("span",{className:"pair-symbol",children:r.symbol}),r.source&&e.jsx("span",{className:"source-tag",children:r.source})]}),e.jsx("div",{className:"forex-price",children:e.jsxs("span",{className:"price",children:["$",r.price]})}),e.jsx("div",{className:"forex-change",children:e.jsxs("span",{className:`change-indicator ${r.isPositive?"positive":"negative"}`,children:[r.isPositive?"▲":"▼"," ",Math.abs(parseFloat(r.changePercent)),"%"]})})]})},r.symbol)):e.jsx("div",{className:"no-results",children:"No data available"})]}),o.length>0&&e.jsxs("div",{className:"market-footer",children:[e.jsx("small",{children:i(a)?"● Real-time updates active":"○ Updates paused (click LIVE to enable)"}),((f=o[0])==null?void 0:f.source)&&e.jsxs("small",{className:"source-info",children:["Source: ",o[0].source]})]}),e.jsx("style",{children:`
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
          flex-wrap: wrap;
          gap: 12px;
        }
        .forex-title {
          color: #ffffff;
          font-size: 28px;
          font-weight: 600;
          margin: 0;
        }
        .header-actions {
          display: flex;
          gap: 8px;
          align-items: center;
        }
        .realtime-btn {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 6px 12px;
          border-radius: 20px;
          border: 1px solid #2a2a2a;
          background-color: #1c1c1c;
          color: #ffffff;
          font-size: 12px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
        }
        .realtime-btn.active {
          background-color: #39FF14;
          color: #000000;
          border-color: #39FF14;
        }
        .realtime-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background-color: #666;
          animation: blink 2s infinite;
        }
        .realtime-btn.active .realtime-dot {
          background-color: #ff0000;
          animation: blink 0.5s infinite;
        }
        @keyframes blink {
          0%, 50%, 100% { opacity: 1; }
          25%, 75% { opacity: 0.3; }
        }
        .refresh-btn {
          padding: 8px 12px;
          border-radius: 8px;
          border: 1px solid #2a2a2a;
          background-color: #1c1c1c;
          color: #ffffff;
          font-size: 16px;
          cursor: pointer;
          transition: all 0.2s;
        }
        .refresh-btn:hover:not(:disabled) {
          border-color: #39FF14;
          color: #39FF14;
        }
        .refresh-btn:disabled {
          animation: spin 0.5s linear infinite;
        }
        @keyframes spin {
          100% { transform: rotate(360deg); }
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
          flex-wrap: wrap;
        }
        .pair-name {
          color: #ffffff;
          font-weight: 500;
          font-size: 14px;
        }
        .pair-symbol {
          color: #666;
          font-size: 11px;
          background-color: #2a2a2a;
          padding: 2px 6px;
          border-radius: 4px;
        }
        .source-tag {
          color: #39FF14;
          font-size: 10px;
          background-color: rgba(57, 255, 20, 0.1);
          padding: 2px 6px;
          border-radius: 4px;
          margin-left: 4px;
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
        .change-indicator.positive { color: #39FF14; }
        .change-indicator.negative { color: #ff6b6b; }
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
        .error-container {
          text-align: center;
          padding: 40px 20px;
          color: #ff6b6b;
        }
        .error-message {
          font-size: 16px;
          margin-bottom: 16px;
        }
        .retry-btn {
          background-color: #39FF14;
          color: #000;
          border: none;
          padding: 10px 24px;
          border-radius: 20px;
          font-weight: 600;
          cursor: pointer;
          margin-right: 8px;
        }
        .note {
          color: #777;
          font-size: 12px;
          margin-top: 16px;
          max-width: 300px;
          margin-left: auto;
          margin-right: auto;
          line-height: 1.5;
        }
        .market-footer {
          margin-top: 16px;
          padding-top: 12px;
          border-top: 1px solid #2a2a2a;
          display: flex;
          justify-content: space-between;
          color: #666;
          font-size: 11px;
        }
        .no-results {
          text-align: center;
          padding: 40px 20px;
          color: #777777;
          font-size: 16px;
        }
      `})]})},P=()=>e.jsx(w,{children:e.jsx(z,{})});export{P as default};
