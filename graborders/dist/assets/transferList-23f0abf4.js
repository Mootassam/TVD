import{u as l,B as p,i as h,E as f,k as t,L as u,j as e}from"./index-680400b2.js";import{L as y}from"./LoadingModal-8565358b.js";import{u as b}from"./useDispatch-cbb2647c.js";function N(){const o=b(),n=l(p.selectListTransfer),r=l(p.selectLoading);h.useEffect(()=>{o(f.TransferList())},[o]);const x=a=>{const s=new Date(a),i=new Date,g=s.toDateString()===i.toDateString(),d=new Date(i);d.setDate(i.getDate()-1);const m=s.toDateString()===d.toDateString();return g?e("pages.history.dateFormats.today",s.toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"})):m?e("pages.history.dateFormats.yesterday",s.toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"})):s.toLocaleDateString([],{month:"short",day:"numeric",hour:"2-digit",minute:"2-digit"})},c=a=>{switch(a){case"trade":return e("pages.transfer.accountTypes.trade");case"perpetual":return e("pages.transfer.accountTypes.perpetual");case"exchange":return e("pages.transfer.accountTypes.exchange");default:return a}};return t.jsxs("div",{className:"history-container",children:[t.jsx("div",{className:"header",children:t.jsxs("div",{className:"nav-bar",children:[t.jsx(u,{to:"/wallets",className:"back-arrow",children:t.jsx("i",{className:"fas fa-arrow-left"})}),t.jsx("div",{className:"page-title",children:e("pages.transfer.title")})]})}),t.jsx("div",{className:"content-card",children:t.jsxs("div",{className:"history-content",children:[r&&t.jsx("div",{className:"loading-container",children:t.jsx(y,{})}),!r&&t.jsx(t.Fragment,{children:t.jsx("div",{className:"transaction-list",children:n&&n.length>0?n.map(a=>t.jsxs("div",{className:"transaction-item",children:[t.jsxs("div",{className:"transaction-info",children:[t.jsx("div",{className:"transaction-icon",style:{backgroundColor:"#627EEA"},children:t.jsx("i",{className:"fas fa-exchange-alt"})}),t.jsxs("div",{className:"transaction-details",children:[t.jsxs("div",{className:"transaction-type",children:[c(a.fromAccount)," → ",c(a.toAccount)]}),t.jsx("div",{className:"transaction-date",children:a.createdAt?x(a.createdAt):e("common.dateNotAvailable")})]})]}),t.jsxs("div",{className:"transaction-amount",children:[t.jsxs("div",{className:"amount",style:{color:"#2ff378"},children:["+",a.amount]}),t.jsx("div",{className:`transaction-status status-${a.status}`,children:a.status==="completed"?e("pages.transfer.status.completed"):a.status})]})]},a._id)):t.jsxs("div",{className:"no-data-message",children:[t.jsx("i",{className:"fas fa-exchange-alt"}),t.jsx("p",{children:e("pages.transfer.noTransferHistory")})]})})})]})}),t.jsx("style",{children:`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
        }

        body {
          background-color: #f5f7fa;
          color: #333;
          line-height: 1.6;
          overflow-x: hidden;
        }

        .history-container {
          max-width: 400px;
          margin: 0 auto;
          position: relative;
          min-height: 100vh;
          background: linear-gradient(135deg, #106cf5 0%, #0a4fc4 100%);
        }

        /* Header Section */
        .header {
          min-height: 60px;
          position: relative;
          padding: 15px 20px;
        }

        .nav-bar {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .back-arrow {
          color: white;
          font-size: 20px;
          font-weight: 300;
          text-decoration: none;
          transition: opacity 0.3s ease;
        }

        .back-arrow:hover {
          opacity: 0.8;
        }

        .page-title {
          color: white;
          font-size: 17px;
          font-weight: 600;
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
        }

        /* Content Card */
        .content-card {
          background: white;
          border-radius: 40px 40px 0 0;
          padding: 30px 20px 100px;
          box-shadow: 0 -5px 20px rgba(0, 0, 0, 0.05);
          min-height: calc(100vh - 60px);
        }

        .history-content {
          width: 100%;
        }

        .loading-container {
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 200px;
        }

        /* Transaction List */
        .transaction-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .transaction-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 15px;
          background-color: #f8f9fa;
          border-radius: 12px;
          border: 1px solid #e7eaee;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .transaction-item:hover {
          background-color: #f0f2f5;
          transform: translateY(-2px);
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
        }

        .transaction-info {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .transaction-icon {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 16px;
          color: #FFF;
        }

        .transaction-details {
          display: flex;
          flex-direction: column;
        }

        .transaction-type {
          font-weight: 600;
          margin-bottom: 4px;
          font-size: 14px;
          color: #222;
        }

        .transaction-date {
          color: #888f99;
          font-size: 12px;
        }

        .transaction-amount {
          text-align: right;
        }

        .amount {
          font-weight: 600;
          margin-bottom: 4px;
          font-size: 14px;
        }

        .transaction-status {
          font-size: 11px;
          padding: 2px 8px;
          border-radius: 10px;
          display: inline-block;
        }

        .transaction-status.status-completed {
          background-color: rgba(40, 167, 69, 0.1);
          color: #28a745;
        }

        .transaction-status.status-pending {
          background-color: rgba(255, 193, 7, 0.1);
          color: #ffc107;
        }

        .transaction-status.status-canceled {
          background-color: rgba(220, 53, 69, 0.1);
          color: #dc3545;
        }

        .no-data-message {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          min-height: 200px;
          text-align: center;
          color: #888f99;
          padding: 40px 20px;
        }

        .no-data-message i {
          font-size: 48px;
          color: #e7eaee;
          margin-bottom: 16px;
        }

        .no-data-message p {
          font-size: 14px;
          max-width: 250px;
          line-height: 1.4;
        }

        /* Responsive adjustments */
        @media (max-width: 380px) {
          .history-container {
            padding: 0;
          }

          .header {
            padding: 16px;
            min-height: 50px;
          }

          .content-card {
            padding: 25px 16px 100px;
          }

          .transaction-type {
            font-size: 13px;
          }

          .transaction-date {
            font-size: 11px;
          }

          .amount {
            font-size: 13px;
          }
        }

        @media (min-width: 768px) {
          .content-card {
            border-radius: 30px 30px 0 0;
          }

          .transaction-list {
            max-width: 600px;
            margin: 0 auto;
          }
        }
      `})]})}export{N as default};
