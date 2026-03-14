import{j as t,q as h,u as c,v as l,i as r,o as u,k as i,L as y,al as b}from"./index-a23148c8.js";import{D as v}from"./Dates-689c3b73.js";import{L as N}from"./LoadingModal-9890861a.js";import{u as j}from"./useDispatch-1da8dfab.js";import"./v4-4a60fe23.js";const f={deposit:{icon:"fas fa-arrow-down",title:t("pages.notification.types.deposit.title"),getMessage:e=>t("pages.notification.types.deposit.message",e.message)},withdraw:{icon:"fas fa-arrow-up",title:t("pages.notification.types.withdraw.title"),getMessage:e=>t("pages.notification.types.withdraw.message",e.message)},staking:{icon:"fas fa-coins",title:t("pages.notification.types.staking.title"),getMessage:e=>t("pages.notification.types.staking.message",e.message)},kyc:{icon:"fas fa-id-card",title:t("pages.notification.types.kyc.title"),getMessage:e=>e.message||t("pages.notification.types.kyc.defaultMessage")},commission:{icon:"fas fa-hand-holding-dollar",title:t("pages.notification.types.commission.title"),getMessage:e=>t("pages.notification.types.commission.message",e.message)},futures:{icon:"fas fa-chart-line",title:t("pages.notification.types.futures.title"),getMessage:e=>t("pages.notification.types.futures.message",e.message)},accountActivated:{icon:"fas fa-user-check",title:t("pages.notification.types.accountActivated.title"),getMessage:e=>t("pages.notification.types.accountActivated.message",e.message)},custom:{icon:"fas fa-bell",title:t("pages.notification.types.custom.title"),getMessage:e=>e.message||t("pages.notification.types.custom.defaultMessage")},cancel_deposit:{icon:"fas fa-ban",title:t("pages.notification.types.cancelDeposit.title"),getMessage:e=>t("pages.notification.types.cancelDeposit.message",e.message)},cancel_withdraw:{icon:"fas fa-ban",title:t("pages.notification.types.cancelWithdraw.title"),getMessage:e=>t("pages.notification.types.cancelWithdraw.message",e.message)},cancel_activated:{icon:"fas fa-user-slash",title:t("pages.notification.types.cancelActivated.title"),getMessage:()=>t("pages.notification.types.cancelActivated.message")}};function A(){const e=j();h();const s=c(l.selectRows),d=c(l.selectLoading),[o,p]=r.useState("all");r.useEffect(()=>{const a=o==="all"?"":o;e(u.doFetch(a))},[e,o]);const g=a=>{e(b.doUpdate(a.id)),a.type==="accountActivated"&&(window.location.href="/profile")},m=a=>{p(a)},x=[{key:"all",label:t("pages.notification.filters.all")},{key:"unread",label:t("pages.notification.filters.unread")},{key:"read",label:t("pages.notification.filters.read")}];return i.jsxs("div",{className:"notification-container",children:[i.jsx("div",{className:"header",children:i.jsxs("div",{className:"nav-bar",children:[i.jsx(y,{to:"/",className:"back-arrow",children:i.jsx("i",{className:"fas fa-arrow-left"})}),i.jsx("div",{className:"page-title",children:"Notifications"})]})}),i.jsxs("div",{className:"content-card",children:[i.jsx("div",{className:"filter-tabs",children:x.map(a=>i.jsx("button",{className:`filter-tab ${o===a.key?"active":""}`,onClick:()=>m(a.key),children:a.label},a.key))}),i.jsx("div",{className:"notification-content",children:d?i.jsx("div",{className:"loading-container",children:i.jsx(N,{})}):(s==null?void 0:s.length)>0?i.jsx("div",{className:"notification-list",children:s.map(a=>{const n=f[a.type]||f.custom;return i.jsxs("div",{className:`notification-item ${a.status==="unread"?"unread":""}`,onClick:()=>g(a),children:[i.jsx("div",{className:"notification-icon",children:i.jsx("i",{className:n.icon})}),i.jsxs("div",{className:"notification-details",children:[i.jsx("div",{className:"notification-title",children:n.title}),i.jsx("div",{className:"notification-message",children:n.getMessage(a)}),i.jsx("div",{className:"notification-time",children:v.Monthago(a.createdAt)})]}),a.status==="unread"&&i.jsx("div",{className:"unread-indicator"})]},a.id)})}):i.jsxs("div",{className:"empty-state",children:[i.jsx("div",{className:"empty-icon",children:i.jsx("i",{className:"fas fa-bell-slash"})}),i.jsx("div",{className:"empty-title",children:t("pages.notification.emptyState.title")}),i.jsx("div",{className:"empty-message",children:o==="all"?t("pages.notification.emptyState.noNotifications"):t("pages.notification.emptyState.noFilteredNotifications",o)})]})})]}),i.jsx("style",{children:`
        /* Notification Container – matches login/profile containers */
        .notification-container {
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
          padding: 24px 20px;
          margin-top: 20px;
          border-top: 2px solid #39FF14;
        }

        /* Filter Tabs */
        .filter-tabs {
          display: flex;
          gap: 10px;
          margin-bottom: 24px;
          border-bottom: 1px solid #2a2a2a;
          padding-bottom: 8px;
        }
        .filter-tab {
          background: none;
          border: none;
          color: #777777;
          font-size: 14px;
          font-weight: 500;
          padding: 6px 12px;
          cursor: pointer;
          transition: all 0.2s;
        }
        .filter-tab.active {
          color: #39FF14;
          border-bottom: 2px solid #39FF14;
        }
        .filter-tab:hover:not(.active) {
          color: #ffffff;
        }

        /* Notification Content */
        .notification-content {
          min-height: 200px;
        }

        /* Loading Container */
        .loading-container {
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 200px;
        }

        /* Notification List */
        .notification-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .notification-item {
          display: flex;
          align-items: flex-start;
          gap: 15px;
          padding: 16px;
          background-color: #1c1c1c;
          border: 1px solid #2a2a2a;
          border-radius: 12px;
          cursor: pointer;
          transition: all 0.2s;
          position: relative;
        }
        .notification-item:hover {
          background-color: #2a2a2a;
          border-color: #39FF14;
        }
        .notification-item.unread {
          border-left: 4px solid #39FF14;
        }

        .notification-icon {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background-color: #2a2a2a;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #39FF14;
          font-size: 18px;
          flex-shrink: 0;
        }

        .notification-details {
          flex: 1;
        }
        .notification-title {
          font-size: 14px;
          font-weight: 600;
          color: #ffffff;
          margin-bottom: 4px;
        }
        .notification-message {
          font-size: 13px;
          color: #dddddd;
          margin-bottom: 6px;
          line-height: 1.4;
        }
        .notification-time {
          font-size: 11px;
          color: #777777;
        }

        .unread-indicator {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background-color: #39FF14;
          position: absolute;
          top: 16px;
          right: 16px;
        }

        /* Empty State */
        .empty-state {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          min-height: 300px;
          padding: 30px 20px;
          background-color: #1c1c1c;
          border-radius: 12px;
          border: 1px solid #2a2a2a;
        }
        .empty-icon {
          width: 70px;
          height: 70px;
          border-radius: 50%;
          background-color: #2a2a2a;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 16px;
        }
        .empty-icon i {
          font-size: 30px;
          color: #39FF14;
        }
        .empty-title {
          font-size: 18px;
          font-weight: 600;
          color: #ffffff;
          margin-bottom: 8px;
        }
        .empty-message {
          font-size: 14px;
          color: #aaaaaa;
          max-width: 250px;
        }
      `})]})}export{A as default};
