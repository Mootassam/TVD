import{i as t,k as e}from"./index-a23148c8.js";const u=[{symbol:"EURUSD",name:"EUR / USD"},{symbol:"GBPUSD",name:"GBP / USD"},{symbol:"USDJPY",name:"USD / JPY"},{symbol:"AUDUSD",name:"AUD / USD"},{symbol:"USDCAD",name:"USD / CAD"},{symbol:"USDCHF",name:"USD / CHF"},{symbol:"NZDUSD",name:"NZD / USD"},{symbol:"EURGBP",name:"EUR / GBP"},{symbol:"EURJPY",name:"EUR / JPY"},{symbol:"GBPJPY",name:"GBP / JPY"},{symbol:"AUDJPY",name:"AUD / JPY"},{symbol:"EURAUD",name:"EUR / AUD"},{symbol:"GBPAUD",name:"GBP / AUD"},{symbol:"USDMXN",name:"USD / MXN"},{symbol:"USDRY",name:"USD / TRY"},{symbol:"USDZAR",name:"USD / ZAR"},{symbol:"USDSGD",name:"USD / SGD"},{symbol:"USDHKD",name:"USD / HKD"},{symbol:"USDKRW",name:"USD / KRW"},{symbol:"USDINR",name:"USD / INR"}],y=({isOpen:s,onClose:r,selectedCoin:c,onCoinSelect:f,availableCoins:d=u,title:x="Select Trading Pair"})=>{const[o,i]=t.useState(""),n=t.useRef(null),m=t.useMemo(()=>d.filter(a=>a.name.toLowerCase().includes(o.toLowerCase())||a.symbol.toLowerCase().includes(o.toLowerCase())),[o,d]);t.useEffect(()=>{const a=l=>{const p=l.target;n.current&&p instanceof Node&&!n.current.contains(p)&&r()};return s&&(document.addEventListener("mousedown",a),i("")),()=>{document.removeEventListener("mousedown",a)}},[s,r]);const b=a=>{if(a===c){r();return}f(a)};return t.useEffect(()=>{const a=l=>{l.key==="Escape"&&s&&r()};return s&&document.addEventListener("keydown",a),()=>{document.removeEventListener("keydown",a)}},[s,r]),s?e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"sidebar-overlay"}),e.jsxs("div",{className:"coin-selector-sidebar",ref:n,children:[e.jsxs("div",{className:"sidebar-header",children:[e.jsx("div",{className:"sidebar-title",children:x}),e.jsx("div",{className:"close-sidebar",onClick:r,children:e.jsx("i",{className:"fas fa-times"})})]}),e.jsxs("div",{className:"search-container",children:[e.jsx("i",{className:"fas fa-search search-icon"}),e.jsx("input",{type:"text",placeholder:"Search pairs...",value:o,onChange:a=>i(a.target.value),className:"search-input",autoFocus:!0}),o&&e.jsx("button",{className:"clear-search",onClick:()=>i(""),children:e.jsx("i",{className:"fas fa-times"})})]}),e.jsxs("div",{className:"pairs-list",children:[m.map(a=>e.jsxs("div",{className:`pair-item ${c===a.symbol?"selected":""}`,onClick:()=>b(a.symbol),children:[e.jsx("div",{className:"pair-name",children:a.name}),e.jsx("div",{className:"pair-symbol",children:a.symbol})]},a.symbol)),m.length===0&&e.jsxs("div",{className:"no-results",children:[e.jsx("i",{className:"fas fa-search"}),e.jsx("div",{children:"No pairs found"}),e.jsx("div",{className:"no-results-sub",children:"Try different search terms"})]})]}),e.jsx("style",{children:`
                    .sidebar-overlay {
                        position: fixed;
                        top: 0;
                        left: 0;
                        right: 0;
                        bottom: 0;
                        background: rgba(0, 0, 0, 0.7);
                        z-index: 1000;
                        animation: fadeIn 0.2s ease;
                    }

                    .coin-selector-sidebar {
                        position: fixed;
                        top: 0;
                        left: 0;
                        width: 90%;
                        max-width: 280px;
                        height: 100%;
                        background: #1c1c1c; /* dark background */
                        z-index: 1001;
                        display: flex;
                        flex-direction: column;
                        box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
                        animation: slideFromLeft 0.2s ease;
                        overflow: hidden;
                        border-right: 1px solid #2a2a2a;
                    }

                    .sidebar-header {
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        padding: 20px;
                        border-bottom: 1px solid #2a2a2a;
                        background: #1c1c1c;
                    }

                    .sidebar-title {
                        font-size: 18px;
                        font-weight: 600;
                        color: #ffffff;
                    }

                    .close-sidebar {
                        width: 32px;
                        height: 32px;
                        border-radius: 50%;
                        background: #2a2a2a;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        cursor: pointer;
                        transition: all 0.2s ease;
                        color: #aaaaaa;
                    }

                    .close-sidebar:hover {
                        background: #3a3a3a;
                        color: #39FF14;
                    }

                    .search-container {
                        position: relative;
                        padding: 16px 20px;
                        border-bottom: 1px solid #2a2a2a;
                    }

                    .search-icon {
                        position: absolute;
                        left: 36px;
                        top: 50%;
                        transform: translateY(-50%);
                        color: #777777;
                        font-size: 14px;
                    }

                    .search-input {
                        width: 100%;
                        padding: 12px 40px 12px 40px;
                        border: 1px solid #2a2a2a;
                        border-radius: 12px;
                        font-size: 14px;
                        background: #2a2a2a;
                        color: #ffffff;
                        transition: all 0.2s ease;
                    }

                    .search-input:focus {
                        outline: none;
                        border-color: #39FF14;
                        background: #1c1c1c;
                        box-shadow: 0 0 0 3px rgba(57, 255, 20, 0.1);
                    }

                    .search-input::placeholder {
                        color: #777777;
                    }

                    .clear-search {
                        position: absolute;
                        right: 36px;
                        top: 50%;
                        transform: translateY(-50%);
                        background: none;
                        border: none;
                        color: #777777;
                        cursor: pointer;
                        padding: 4px;
                        border-radius: 4px;
                        transition: all 0.2s ease;
                    }

                    .clear-search:hover {
                        background: #3a3a3a;
                        color: #39FF14;
                    }

                    .pairs-list {
                        flex: 1;
                        overflow-y: auto;
                        padding: 8px 0;
                    }

                    .pair-item {
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        padding: 16px 20px;
                        cursor: pointer;
                        transition: all 0.2s ease;
                        border-bottom: 1px solid #2a2a2a;
                    }

                    .pair-item:hover {
                        background: #2a2a2a;
                    }

                    .pair-item.selected {
                        background: #39FF14;
                    }

                    .pair-item.selected .pair-name,
                    .pair-item.selected .pair-symbol {
                        color: #000000; /* black text on green */
                    }

                    .pair-name {
                        font-size: 14px;
                        font-weight: 500;
                        color: #ffffff;
                    }

                    .pair-symbol {
                        font-size: 12px;
                        color: #aaaaaa;
                    }

                    .no-results {
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        justify-content: center;
                        padding: 60px 20px;
                        color: #777777;
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
