import{i,k as r,L as b}from"./index-3c390b80.js";const R={EUR:"eu",USD:"us",GBP:"gb",JPY:"jp",AUD:"au",CAD:"ca",CHF:"ch",NZD:"nz",MXN:"mx",TRY:"tr",ZAR:"za",SGD:"sg",HKD:"hk",KRW:"kr",INR:"in"},C=()=>{const[u,S]=i.useState({}),[c,m]=i.useState(""),[j,D]=i.useState(!0),x=i.useRef(null),p=i.useRef(!0),l=i.useMemo(()=>["EURUSD","GBPUSD","USDJPY","AUDUSD","USDCAD","USDCHF","NZDUSD","EURGBP","EURJPY","GBPJPY","AUDJPY","EURAUD","GBPAUD","USDMXN","USDRY","USDZAR","USDSGD","USDHKD","USDKRW","USDINR"],[]),h=i.useCallback(a=>isNaN(a)?"0.0000":a.toFixed(5),[]),U=i.useCallback(a=>{const t=(Math.random()*4-2)/100;return{price:a*(1+t),changePercent:t*100}},[]),g=i.useCallback(()=>{S(a=>{const t={...a};return l.forEach(e=>{if(!t[e]){let n=1;e==="EURUSD"?n=1.085:e==="GBPUSD"?n=1.265:e==="USDJPY"?n=148.5:e==="AUDUSD"?n=.655:e==="USDCAD"?n=1.355:e==="USDCHF"?n=.875:e==="NZDUSD"?n=.605:e==="EURGBP"?n=.857:e==="EURJPY"?n=161.2:e==="GBPJPY"?n=188.3:e==="AUDJPY"?n=97.2:e==="EURAUD"?n=1.655:e==="GBPAUD"?n=1.93:e==="USDMXN"?n=17.2:e==="USDRY"?n=30.5:e==="USDZAR"?n=18.9:e==="USDSGD"?n=1.345:e==="USDHKD"?n=7.82:e==="USDKRW"?n=1330:e==="USDINR"&&(n=83.2),t[e]={symbol:e,name:`${e.slice(0,3)}/${e.slice(3)}`,price:h(n),change:"0.00",changePercent:"0.00",volume:"0",volumeFormatted:"0",isPositive:!0,quoteVolume:0}}const o=parseFloat(t[e].price),{price:f,changePercent:d}=U(o),s=d>=0;t[e]={...t[e],price:h(f),change:(f-o).toFixed(5),changePercent:Math.abs(d).toFixed(2),isPositive:s}}),t})},[l,h,U]);i.useEffect(()=>(p.current=!0,D(!0),g(),D(!1),x.current=setInterval(()=>{p.current&&g()},3e3),()=>{p.current=!1,x.current&&clearInterval(x.current)}),[g]);const v=i.useMemo(()=>{const a=Object.values(u);if(a.length===0)return[];let t=a;if(c){const e=c.toLowerCase();t=t.filter(o=>o.name.toLowerCase().includes(e)||o.symbol.toLowerCase().includes(e))}return l.map(e=>t.find(o=>o.symbol===e)).filter(Boolean)},[u,c,l]),P=a=>m(a.target.value),N=()=>m(""),w=()=>r.jsxs("div",{className:"loading-row",children:[r.jsx("div",{className:"loading-icon"}),r.jsx("div",{className:"loading-line"}),r.jsx("div",{className:"loading-line short"}),r.jsx("div",{className:"loading-line"})]});return r.jsxs("div",{className:"forex-container",children:[r.jsxs("div",{className:"forex-header",children:[r.jsx("h1",{className:"forex-title",children:"Forex Market"}),r.jsxs("div",{className:"search-wrapper",children:[r.jsx("i",{className:"fas fa-search search-icon"}),r.jsx("input",{type:"text",className:"search-input",placeholder:"Search pair (e.g., EURUSD)",value:c,onChange:P}),c&&r.jsx("button",{className:"clear-search",onClick:N,children:"×"})]})]}),r.jsxs("div",{className:"forex-list",children:[r.jsxs("div",{className:"list-header",children:[r.jsx("span",{children:"Pair"}),r.jsx("span",{children:"Latest Price"}),r.jsx("span",{children:"Change 24h"})]}),j?r.jsx("div",{className:"loading-container",children:l.map(a=>r.jsx(w,{},a))}):v.length>0?v.map(a=>{const t=a.symbol.slice(0,3),o=`https://flagcdn.com/w40/${R[t]||t.toLowerCase()}.png`;return r.jsx(b,{to:`/market/detail/${a.symbol}`,className:"forex-link",children:r.jsxs("div",{className:"forex-row",children:[r.jsxs("div",{className:"forex-pair",children:[r.jsx("div",{className:"forex-icon",children:r.jsx("img",{src:o,alt:t,onError:f=>{const d=f.target;d.style.display="none";const s=d.parentElement;s&&(s.innerText=t,s.style.display="flex",s.style.alignItems="center",s.style.justifyContent="center")}})}),r.jsx("span",{className:"pair-name",children:a.name})]}),r.jsx("div",{className:"forex-price",children:r.jsxs("span",{className:"price",children:["$",a.price]})}),r.jsx("div",{className:"forex-change",children:r.jsxs("span",{className:a.isPositive?"change-positive":"change-negative",children:[a.isPositive?"+":"",a.changePercent,"%"]})})]})},a.symbol)}):r.jsx("div",{className:"no-results",children:"No matching pairs found"})]}),r.jsx("style",{children:`
        .forex-container {
          max-width: 430px;
          margin: 0 auto;
          min-height: 100vh;
          background-color: #000000;
          border-top: 2px solid #39FF14;
          display: flex;
          flex-direction: column;
          padding: 20px;
          box-sizing: border-box;
        }
        .forex-header {
          margin-bottom: 24px;
        }
        .forex-title {
          color: #ffffff;
          font-size: 28px;
          font-weight: 600;
          margin: 0 0 16px 0;
          text-align: center;
        }
        .search-wrapper {
          position: relative;
          width: 100%;
        }
        .search-icon {
          position: absolute;
          left: 16px;
          top: 50%;
          transform: translateY(-50%);
          color: #777777;
          font-size: 16px;
          pointer-events: none;
        }
        .search-input {
          background-color: #1c1c1c;
          border: 1px solid #2a2a2a;
          border-radius: 30px;
          height: 48px;
          width: 100%;
          padding: 0 48px 0 48px;
          color: #ffffff;
          font-size: 16px;
          outline: none;
          box-sizing: border-box;
        }
        .search-input:focus {
          border-color: #39FF14;
        }
        .search-input::placeholder {
          color: #777777;
        }
        .clear-search {
          position: absolute;
          right: 16px;
          top: 50%;
          transform: translateY(-50%);
          background: none;
          border: none;
          color: #ffffff;
          font-size: 24px;
          cursor: pointer;
          padding: 0;
          line-height: 1;
        }
        .clear-search:hover {
          color: #39FF14;
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
        .forex-icon {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background-color: #2a2a2a;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #39FF14;
          font-weight: bold;
          font-size: 12px;
          text-transform: uppercase;
          overflow: hidden;
        }
        .forex-icon img {
          width: 100%;
          height: 100%;
          object-fit: cover;
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
        .change-positive {
          color: #39FF14;
        }
        .change-negative {
          color: #ff6b6b;
        }
        .loading-container {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
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
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background-color: #2a2a2a;
          animation: pulse 1.5s infinite;
        }
        .loading-line {
          height: 16px;
          background-color: #2a2a2a;
          border-radius: 4px;
          flex: 1;
          animation: pulse 1.5s infinite;
        }
        .loading-line.short {
          flex: 0.5;
        }
        @keyframes pulse {
          0% { opacity: 0.6; }
          50% { opacity: 1; }
          100% { opacity: 0.6; }
        }
        .no-results {
          text-align: center;
          padding: 40px 20px;
          color: #777777;
          font-size: 16px;
        }
      `})]})};export{C as default};
