import{i as p,u as h,B as u,I as b,k as o,L as w,j as e}from"./index-3c390b80.js";import{L as F}from"./LoadingModal-95a35fb5.js";import{u as C}from"./useDispatch-f272d96f.js";function k(){const d=C(),[a,r]=p.useState("all"),f=h(u.selectLoading),l=h(u.selectRows);p.useEffect(()=>{d(b.doFetch())},[d]);const x=(s,i,n)=>{const t={icon:"fa-exchange-alt",typeText:e("pages.history.transactionTypes.transaction"),iconClass:"swap",color:"#627EEA",amountColor:i==="in"?"#2ff378":"#FF6838"};switch(s){case"deposit":t.icon="fa-arrow-down",t.typeText=e("pages.history.transactionTypes.deposit"),t.iconClass="deposit",t.color="#F3BA2F",t.amountColor="#2ff378";break;case"withdraw":t.icon="fa-arrow-up",t.typeText=e("pages.history.transactionTypes.withdrawal"),t.iconClass="withdraw",t.color="#FF6838",t.amountColor="#FF6838";break;case"convert_in":t.icon="fa-exchange-alt",t.typeText=n?e("pages.history.transactionTypes.convertedFrom",n):e("pages.history.transactionTypes.conversionIn"),t.iconClass="convert-in",t.color="#9C27B0",t.amountColor="#2ff378";break;case"convert_out":t.icon="fa-exchange-alt",t.typeText=n?e("pages.history.transactionTypes.convertedTo",n):e("pages.history.transactionTypes.conversionOut"),t.iconClass="convert-out",t.color="#9C27B0",t.amountColor="#FF6838";break;case"stacking":t.icon="fa-coins",t.typeText=e("pages.history.transactionTypes.stakedAmount"),t.iconClass="stacking",t.color="#FF9800",t.amountColor="#FFB74D";break;case"staking_reward":t.icon="fa-gift",t.typeText=e("pages.history.transactionTypes.stakingRewards"),t.iconClass="staking_reward",t.color="#4CAF50",t.amountColor="#81C784";break;case"futures_profit":t.icon="fa-chart-line",t.typeText=e("pages.history.transactionTypes.futuresProfit"),t.iconClass="futures-profit",t.color="#00C076",t.amountColor="#00C076";break;case"futures_loss":t.icon="fa-chart-line",t.typeText=e("pages.history.transactionTypes.futuresLoss"),t.iconClass="futures-loss",t.color="#FF6838",t.amountColor="#FF6838";break;case"spot_profit":t.icon="fa-coins",t.typeText=e("pages.history.transactionTypes.spotTradingProfit"),t.iconClass="spot-profit",t.color="#4CAF50",t.amountColor="#2ff378";break;case"spot_loss":t.icon="fa-coins",t.typeText=e("pages.history.transactionTypes.spotTradingLoss"),t.iconClass="spot-loss",t.color="#FF5722",t.amountColor="#FF6838";break;case"reward":t.icon="fa-hand-holding-dollar",t.typeText=e("pages.history.transactionTypes.referralReward"),t.iconClass="spot-profit",t.color="#63f211ff",t.amountColor="#5ffc1bff";break;case"bonus":t.icon="fa-gift",t.typeText=e("pages.history.transactionTypes.bonus"),t.iconClass="bonus",t.color="#E91E63",t.amountColor="#E91E63";break;default:t.icon="fa-exchange-alt",t.typeText=e("pages.history.transactionTypes.transaction"),t.iconClass="default",t.color="#627EEA",t.amountColor="#627EEA"}return t},g=p.useMemo(()=>l?l.filter(s=>!(a!=="all"&&!(a==="deposits"?s.type==="deposit"||s.direction==="in":a==="withdrawals"?s.type==="withdraw"||s.direction==="out":a==="profits"?s.type.includes("profit")||s.direction==="in"&&s.type!=="deposit":a==="losses"?s.type.includes("loss")||s.direction==="out"&&s.type!=="withdraw":a==="conversions"?s.type.includes("convert"):a==="stacking"?s.type==="stacking":!0))):[],[l,a]),m=s=>{const i=new Date(s),n=new Date,t=i.toDateString()===n.toDateString(),c=new Date(n);c.setDate(n.getDate()-1);const y=i.toDateString()===c.toDateString();return t?e("pages.history.dateFormats.today",i.toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"})):y?e("pages.history.dateFormats.yesterday",i.toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"})):i.toLocaleDateString([],{month:"short",day:"numeric",hour:"2-digit",minute:"2-digit"})};return o.jsxs("div",{className:"history-container",children:[o.jsx("div",{className:"header",children:o.jsxs("div",{className:"nav-bar",children:[o.jsx(w,{to:"/wallets",className:"back-arrow",children:o.jsx("i",{className:"fas fa-arrow-left"})}),o.jsx("div",{className:"page-title",children:e("pages.history.title")})]})}),o.jsx("div",{className:"content-card",children:o.jsxs("div",{className:"history-content",children:[f&&o.jsx("div",{className:"loading-container",children:o.jsx(F,{})}),!f&&o.jsxs(o.Fragment,{children:[o.jsxs("div",{className:"filter-options",children:[o.jsx("button",{className:`filter-option ${a==="all"?"active":""}`,onClick:()=>r("all"),children:e("pages.history.filters.all")}),o.jsx("button",{className:`filter-option ${a==="deposits"?"active":""}`,onClick:()=>r("deposits"),children:e("pages.history.filters.deposits")}),o.jsx("button",{className:`filter-option ${a==="withdrawals"?"active":""}`,onClick:()=>r("withdrawals"),children:e("pages.history.filters.withdrawals")}),o.jsx("button",{className:`filter-option ${a==="profits"?"active":""}`,onClick:()=>r("profits"),children:e("pages.history.filters.profits")}),o.jsx("button",{className:`filter-option ${a==="losses"?"active":""}`,onClick:()=>r("losses"),children:e("pages.history.filters.losses")})]}),o.jsx("div",{className:"transaction-list",children:g.length>0?g.map(s=>{const{icon:i,typeText:n,iconClass:t,amountColor:c}=x(s.type,s.direction,s.relatedAsset);return o.jsxs("div",{className:"transaction-item",children:[o.jsxs("div",{className:"transaction-info",children:[o.jsx("div",{className:`transaction-icon ${t}`,style:{backgroundColor:x(s.type,s.direction,s.relatedAsset).color},children:o.jsx("i",{className:`fas ${i}`})}),o.jsxs("div",{className:"transaction-details",children:[o.jsx("div",{className:"transaction-type",children:n}),o.jsx("div",{className:"transaction-date",children:m(s.dateTransaction)})]})]}),o.jsxs("div",{className:"transaction-amount",children:[o.jsxs("div",{className:"amount",style:{color:c},children:[s.direction==="in"?"+":"-",s.amount.toFixed(0)," ",s.asset]}),o.jsx("div",{className:`transaction-status status-${s.status}`,children:e(`pages.history.status.${s.status}`)})]})]},s.id)}):o.jsxs("div",{className:"no-data-message",children:[o.jsx("i",{className:"fas fa-receipt"}),o.jsx("p",{children:"No transaction history available"})]})})]})]})}),o.jsx("style",{children:`
        /* History Container – matches Profile container */
        .history-container {
          max-width: 430px;
          margin: 0 auto;
          min-height: 100vh;
          background-color: #000000;
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
          gap: 16px;
        }
        .back-arrow {
          color: #ffffff;
          font-size: 20px;
          text-decoration: none;
        }
        .back-arrow:hover {
          color: #39FF14;
        }
        .page-title {
          font-size: 18px;
          font-weight: 500;
          color: #ffffff;
        }

        /* Content Card */
        .content-card {
          flex: 1;
          background-color: #1c1c1c;
          border-top-left-radius: 24px;
          border-top-right-radius: 24px;
          padding: 20px 16px;
          border-top: 2px solid #39FF14;
        }

        /* Filter Options */
        .filter-options {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-bottom: 20px;
        }
        .filter-option {
          background-color: #2a2a2a;
          border: 1px solid #3a3a3a;
          border-radius: 20px;
          padding: 6px 14px;
          font-size: 13px;
          font-weight: 500;
          color: #bbbbbb;
          cursor: pointer;
          transition: all 0.2s;
        }
        .filter-option.active {
          background-color: #39FF14;
          border-color: #39FF14;
          color: #000000;
        }
        .filter-option:hover {
          border-color: #39FF14;
        }

        /* Transaction List */
        .transaction-list {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .transaction-item {
          background-color: #2a2a2a;
          border-radius: 12px;
          padding: 12px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          border: 1px solid #3a3a3a;
          transition: border-color 0.2s;
        }
        .transaction-item:hover {
          border-color: #39FF14;
        }
        .transaction-info {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .transaction-icon {
          width: 40px;
          height: 40px;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #ffffff;
          font-size: 18px;
          flex-shrink: 0;
        }
        .transaction-details {
          display: flex;
          flex-direction: column;
        }
        .transaction-type {
          font-weight: 600;
          font-size: 15px;
          color: #ffffff;
        }
        .transaction-date {
          font-size: 12px;
          color: #777777;
          margin-top: 2px;
        }
        .transaction-amount {
          text-align: right;
        }
        .amount {
          font-weight: 600;
          font-size: 15px;
          white-space: nowrap;
        }
        .transaction-status {
          font-size: 11px;
          margin-top: 2px;
          font-weight: 500;
        }
        .status-pending {
          color: #ffaa00;
        }
        .status-success {
          color: #39FF14;
        }
        .status-failed {
          color: #ff6b6b;
        }

        /* No data message */
        .no-data-message {
          text-align: center;
          padding: 40px 20px;
          color: #777777;
        }
        .no-data-message i {
          font-size: 48px;
          margin-bottom: 16px;
          color: #39FF14;
        }
        .no-data-message p {
          font-size: 16px;
        }

        /* Loading container */
        .loading-container {
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 200px;
        }

        /* Minimal spacing */
        .history-content {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        /* Responsive adjustments */
        @media (max-width: 380px) {
          .filter-option {
            padding: 4px 10px;
            font-size: 12px;
          }
          .transaction-item {
            padding: 10px;
          }
          .transaction-icon {
            width: 36px;
            height: 36px;
            font-size: 16px;
          }
          .amount {
            font-size: 14px;
          }
        }
      `})]})}export{k as default};
