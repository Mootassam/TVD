import{i as r,k as e}from"./index-680400b2.js";const u=[{symbol:"BTCUSDT",name:"BTC / USDT"},{symbol:"ETHUSDT",name:"ETH / USDT"},{symbol:"DOTUSDT",name:"DOT / USDT"},{symbol:"XRPUSDT",name:"XRP / USDT"},{symbol:"LINKUSDT",name:"LINK / USDT"},{symbol:"BCHUSDT",name:"BCH / USDT"},{symbol:"LTCUSDT",name:"LTC / USDT"},{symbol:"ADAUSDT",name:"ADA / USDT"},{symbol:"EOSUSDT",name:"EOS / USDT"},{symbol:"TRXUSDT",name:"TRX / USDT"},{symbol:"DASHUSDT",name:"DASH / USDT"},{symbol:"FILUSDT",name:"FIL / USDT"},{symbol:"YFIUSDT",name:"YFI / USDT"},{symbol:"ZECUSDT",name:"ZEC / USDT"},{symbol:"DOGEUSDT",name:"DOGE / USDT"}],y=({isOpen:a,onClose:o,selectedCoin:l,onCoinSelect:x,availableCoins:d=u,title:p="Select Trading Pair"})=>{const[t,n]=r.useState(""),i=r.useRef(null),m=r.useMemo(()=>d.filter(s=>s.name.toLowerCase().includes(t.toLowerCase())||s.symbol.toLowerCase().includes(t.toLowerCase())),[t,d]);r.useEffect(()=>{const s=c=>{const f=c.target;i.current&&f instanceof Node&&!i.current.contains(f)&&o()};return a&&(document.addEventListener("mousedown",s),n("")),()=>{document.removeEventListener("mousedown",s)}},[a,o]);const b=s=>{if(s===l){o();return}x(s)};return r.useEffect(()=>{const s=c=>{c.key==="Escape"&&a&&o()};return a&&document.addEventListener("keydown",s),()=>{document.removeEventListener("keydown",s)}},[a,o]),a?e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"sidebar-overlay"}),e.jsxs("div",{className:"coin-selector-sidebar",ref:i,children:[e.jsxs("div",{className:"sidebar-header",children:[e.jsx("div",{className:"sidebar-title",children:p}),e.jsx("div",{className:"close-sidebar",onClick:o,children:e.jsx("i",{className:"fas fa-times"})})]}),e.jsxs("div",{className:"search-container",children:[e.jsx("i",{className:"fas fa-search search-icon"}),e.jsx("input",{type:"text",placeholder:"Search coins...",value:t,onChange:s=>n(s.target.value),className:"search-input",autoFocus:!0}),t&&e.jsx("button",{className:"clear-search",onClick:()=>n(""),children:e.jsx("i",{className:"fas fa-times"})})]}),e.jsxs("div",{className:"coins-list",children:[m.map(s=>e.jsxs("div",{className:`coin-item ${l===s.symbol?"selected":""}`,onClick:()=>b(s.symbol),children:[e.jsx("div",{className:"coin-name",children:s.name}),e.jsx("div",{className:"coin-symbol",children:s.symbol})]},s.symbol)),m.length===0&&e.jsxs("div",{className:"no-results",children:[e.jsx("i",{className:"fas fa-search"}),e.jsx("div",{children:"No coins found"}),e.jsx("div",{className:"no-results-sub",children:"Try different search terms"})]})]}),e.jsx("style",{children:`
          .sidebar-overlay {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.5);
            z-index: 1000;
            animation: fadeIn 0.2s ease;
          }

          .coin-selector-sidebar {
            position: fixed;
            top: 0;
            left: 0;
            width: 90%;
            max-width: 250px;
            height: 100%;
            background: white;
            z-index: 1001;
            display: flex;
            flex-direction: column;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
            animation: slideFromLeft 0.2s ease;
            overflow: hidden;
          }

          .sidebar-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 20px;
            border-bottom: 1px solid #eef2f6;
            background: white;
          }

          .sidebar-title {
            font-size: 18px;
            font-weight: 600;
            color: #1a1a1a;
          }

          .close-sidebar {
            width: 32px;
            height: 32px;
            border-radius: 50%;
            background: #f8f9fa;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            transition: all 0.2s ease;
            color: #6c757d;
          }

          .close-sidebar:hover {
            background: #e9ecef;
          }

          .search-container {
            position: relative;
            padding: 16px 20px;
            border-bottom: 1px solid #eef2f6;
          }

          .search-icon {
            position: absolute;
            left: 36px;
            top: 50%;
            transform: translateY(-50%);
            color: #6c757d;
            font-size: 14px;
          }

          .search-input {
            width: 100%;
            padding: 12px 40px 12px 40px;
            border: 1px solid #e2e8f0;
            border-radius: 12px;
            font-size: 14px;
            background: #f8f9fa;
            transition: all 0.2s ease;
          }

          .search-input:focus {
            outline: none;
            border-color: #106cf5;
            background: white;
            box-shadow: 0 0 0 3px rgba(16, 108, 245, 0.1);
          }

          .clear-search {
            position: absolute;
            right: 36px;
            top: 50%;
            transform: translateY(-50%);
            background: none;
            border: none;
            color: #6c757d;
            cursor: pointer;
            padding: 4px;
            border-radius: 4px;
            transition: all 0.2s ease;
          }

          .clear-search:hover {
            background: #e9ecef;
          }

          .coins-list {
            flex: 1;
            overflow-y: auto;
            padding: 8px 0;
          }

          .coin-item {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 16px 20px;
            cursor: pointer;
            transition: all 0.2s ease;
            border-bottom: 1px solid #f8f9fa;
          }

          .coin-item:hover {
            background: #f8fbff;
          }

          .coin-item.selected {
            background: #106cf5;
            color: white;
          }

          .coin-item.selected .coin-symbol {
            color: rgba(255, 255, 255, 0.8);
          }

          .coin-name {
            font-size: 14px;
            font-weight: 500;

            color:#000
          }

          .coin-symbol {
            font-size: 12px;
            color: #6c757d;
          }

          .no-results {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            padding: 60px 20px;
            color: #6c757d;
            text-align: center;
          }

          .no-results i {
            font-size: 48px;
            margin-bottom: 16px;
            opacity: 0.5;
          }

          .no-results-sub {
            font-size: 12px;
            margin-top: 8px;
            opacity: 0.7;
          }

          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }

          @keyframes slideFromLeft {
            from {
              transform: translateX(-100%);
            }
            to {
              transform: translateX(0);
            }
          }

          @media (max-width: 380px) {
            .coin-selector-sidebar {
              width: 85%;
            }
          }
        `})]})]}):null};export{y as C};
