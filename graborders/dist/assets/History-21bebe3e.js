import{i as p,u as y,o as h,t as b,k as s,j as o}from"./index-56963767.js";import{L as F}from"./LoadingModal-91482506.js";import{u as C}from"./useDispatch-8ce87bff.js";function k(){const d=C(),[i,n]=p.useState("all"),f=y(h.selectLoading),l=y(h.selectRows);p.useEffect(()=>{d(b.doFetch())},[d]);const u=(e,r,a)=>{const t={icon:"fa-exchange-alt",typeText:o("pages.history.transactionTypes.transaction"),iconClass:"swap",color:"#627EEA",amountColor:r==="in"?"#2ff378":"#FF6838"};switch(e){case"deposit":t.icon="fa-arrow-down",t.typeText=o("pages.history.transactionTypes.deposit"),t.iconClass="deposit",t.color="#F3BA2F",t.amountColor="#2ff378";break;case"withdraw":t.icon="fa-arrow-up",t.typeText=o("pages.history.transactionTypes.withdrawal"),t.iconClass="withdraw",t.color="#FF6838",t.amountColor="#FF6838";break;case"futures_reserved":t.icon="fa-lock",t.typeText=o("pages.history.transactionTypes.futuresReserved")||"Futures Reserved",t.iconClass="futures-reserved",t.color="#FF9800",t.amountColor="#FFB74D";break;case"convert_in":t.icon="fa-exchange-alt",t.typeText=a?o("pages.history.transactionTypes.convertedFrom",a):o("pages.history.transactionTypes.conversionIn"),t.iconClass="convert-in",t.color="#9C27B0",t.amountColor="#2ff378";break;case"convert_out":t.icon="fa-exchange-alt",t.typeText=a?o("pages.history.transactionTypes.convertedTo",a):o("pages.history.transactionTypes.conversionOut"),t.iconClass="convert-out",t.color="#9C27B0",t.amountColor="#FF6838";break;case"stacking":t.icon="fa-coins",t.typeText=o("pages.history.transactionTypes.stakedAmount"),t.iconClass="stacking",t.color="#FF9800",t.amountColor="#FFB74D";break;case"staking_reward":t.icon="fa-gift",t.typeText=o("pages.history.transactionTypes.stakingRewards"),t.iconClass="staking_reward",t.color="#4CAF50",t.amountColor="#81C784";break;case"futures_profit":t.icon="fa-chart-line",t.typeText=o("pages.history.transactionTypes.futuresProfit"),t.iconClass="futures-profit",t.color="#00C076",t.amountColor="#00C076";break;case"futures_loss":t.icon="fa-chart-line",t.typeText=o("pages.history.transactionTypes.futuresLoss"),t.iconClass="futures-loss",t.color="#FF6838",t.amountColor="#FF6838";break;case"spot_profit":t.icon="fa-coins",t.typeText=o("pages.history.transactionTypes.spotTradingProfit"),t.iconClass="spot-profit",t.color="#4CAF50",t.amountColor="#2ff378";break;case"spot_loss":t.icon="fa-coins",t.typeText=o("pages.history.transactionTypes.spotTradingLoss"),t.iconClass="spot-loss",t.color="#FF5722",t.amountColor="#FF6838";break;case"reward":t.icon="fa-hand-holding-dollar",t.typeText=o("pages.history.transactionTypes.referralReward"),t.iconClass="spot-profit",t.color="#63f211ff",t.amountColor="#5ffc1bff";break;case"bonus":t.icon="fa-gift",t.typeText=o("pages.history.transactionTypes.bonus"),t.iconClass="bonus",t.color="#E91E63",t.amountColor="#E91E63";break;default:t.icon="fa-exchange-alt",t.typeText=o("pages.history.transactionTypes.transaction"),t.iconClass="default",t.color="#627EEA",t.amountColor="#627EEA"}return t},g=p.useMemo(()=>l?l.filter(e=>{if(i==="all")return!0;switch(i){case"deposits":return e.type==="deposit";case"withdrawals":return e.type==="withdraw";case"futuresReserved":return e.type==="futures_reserved";case"profits":return e.type.includes("profit")||e.direction==="in"&&e.type!=="deposit";case"losses":return e.type.includes("loss")||e.direction==="out"&&e.type!=="withdraw"&&e.type!=="futures_reserved";case"conversions":return e.type.includes("convert");case"stacking":return e.type==="stacking";default:return!0}}):[],[l,i]),x=e=>{const r=new Date(e),a=new Date,t=r.toDateString()===a.toDateString(),c=new Date(a);c.setDate(a.getDate()-1);const m=r.toDateString()===c.toDateString();return t?o("pages.history.dateFormats.today",r.toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"})):m?o("pages.history.dateFormats.yesterday",r.toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"})):r.toLocaleDateString([],{month:"short",day:"numeric",hour:"2-digit",minute:"2-digit"})};return s.jsxs("div",{className:"history-container",children:[s.jsx("div",{className:"content-card",children:s.jsxs("div",{className:"history-content",children:[f&&s.jsx("div",{className:"loading-container",children:s.jsx(F,{})}),!f&&s.jsxs(s.Fragment,{children:[s.jsxs("div",{className:"filter-options",children:[s.jsx("button",{className:`filter-option ${i==="all"?"active":""}`,onClick:()=>n("all"),children:o("pages.history.filters.all")}),s.jsx("button",{className:`filter-option ${i==="deposits"?"active":""}`,onClick:()=>n("deposits"),children:o("pages.history.filters.deposits")}),s.jsx("button",{className:`filter-option ${i==="withdrawals"?"active":""}`,onClick:()=>n("withdrawals"),children:o("pages.history.filters.withdrawals")}),s.jsx("button",{className:`filter-option ${i==="futuresReserved"?"active":""}`,onClick:()=>n("futuresReserved"),children:o("pages.history.filters.futuresReserved")}),s.jsx("button",{className:`filter-option ${i==="profits"?"active":""}`,onClick:()=>n("profits"),children:o("pages.history.filters.profits")}),s.jsx("button",{className:`filter-option ${i==="losses"?"active":""}`,onClick:()=>n("losses"),children:o("pages.history.filters.losses")})]}),s.jsx("div",{className:"transaction-list",children:g.length>0?g.map(e=>{const{icon:r,typeText:a,iconClass:t,amountColor:c}=u(e.type,e.direction,e.relatedAsset);return s.jsxs("div",{className:"transaction-item",children:[s.jsxs("div",{className:"transaction-info",children:[s.jsx("div",{className:`transaction-icon ${t}`,style:{backgroundColor:u(e.type,e.direction,e.relatedAsset).color},children:s.jsx("i",{className:`fas ${r}`})}),s.jsxs("div",{className:"transaction-details",children:[s.jsx("div",{className:"transaction-type",children:a}),s.jsx("div",{className:"transaction-date",children:x(e.dateTransaction)})]})]}),s.jsxs("div",{className:"transaction-amount",children:[s.jsxs("div",{className:"amount",style:{color:c},children:[e.direction==="in"?"+":"-",e.amount.toFixed(0)," ",e.asset]}),s.jsx("div",{className:`transaction-status status-${e.status}`,children:o(`pages.history.status.${e.status}`)})]})]},e.id)}):s.jsxs("div",{className:"no-data-message",children:[s.jsx("i",{className:"fas fa-receipt"}),s.jsx("p",{children:o("pages.history.noTransactions")||"No transaction history available"})]})})]})]})}),s.jsx("style",{children:`
        /* History Container – matches Profile container */
        .history-container {
          max-width: 400px;
          margin: 0 auto;
          min-height: 100vh;
          background-color: #0f0f0f;
          border-top: 2px solid #39FF14;
          display: flex;
          flex-direction: column;
          box-sizing: border-box;
          color: #ffffff;
        }

        /* Content Card */
        .content-card {
          flex: 1;
          background-color: #1c1c1c;
          padding: 20px 16px;
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
          color: #0f0f0f;
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
        .transaction-traded {
          font-size: 12px;
          color: #999999;
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
      `})]})}export{k as default};
