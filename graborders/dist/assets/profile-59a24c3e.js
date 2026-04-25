import{j as o,p as G,u as r,q as U,v as w,w as g,i,x as B,y as F,k as e,L as u,z as O}from"./index-d4577151.js";import{I as _}from"./I18nSelect-1bd9c0a6.js";import{u as H}from"./useDispatch-60bf329d.js";const Y=[{icon:"fas fa-language",name:o("pages.settings.language"),type:"modal",modal:"language"},{icon:"fas fa-shield-alt",path:"/typepassword",name:o("pages.profile.menu.password")},{icon:"fas fa-file-alt",path:"/transferAll",name:o("pages.profile.menu.withdrawalAddress")},{icon:"fas fa-comment-dots",path:"/online-service",name:o("pages.profile.menu.customerSupport")},{icon:"fas fa-building",path:"/about",name:o("pages.profile.menu.aboutUs")},{icon:"fas fa-question-circle",path:"/support",name:o("pages.profile.menu.helpcenter")},{icon:"fas fa-download",path:"/download",name:o("pages.profile.menu.downloadApp")},{icon:"fas fa-trash-alt",name:o("pages.profile.menu.clearCache"),type:"action"}],n={PENDING:"pending",SUCCESS:"success",UNVERIFIED:"unverified"};function Q(){const l=H(),x=G(),s=r(U.selectCurrentUser),h=r(w.selectRows);r(w.selectLoading),r(g.selectRows);const S=r(g.selectTotalFiat),b=r(g.selectLoading),[d,C]=i.useState(!1),[E,v]=i.useState(!1),[p,I]=i.useState(!1),t=i.useMemo(()=>{var a;return((a=h[0])==null?void 0:a.status)===n.PENDING?n.PENDING:s!=null&&s.kyc?n.SUCCESS:n.UNVERIFIED},[h,s==null?void 0:s.kyc]),m=i.useMemo(()=>({user:s}),[s]);i.useEffect(()=>{l(B.doFetch(m,m))},[l,m]),i.useEffect(()=>{let a=!0;return(async()=>{if(a)try{await l(O.doFetch(null,"USD"))}catch(f){a&&console.error(o("pages.wallet.errors.fetchAssets"),f)}})(),()=>{a=!1}},[l]),i.useCallback(()=>{l(F.doSignout())},[l]);const N=i.useCallback(()=>{console.log(o("pages.profile.cache.clearing")),alert(o("pages.profile.cache.cleared"))},[]),j=i.useCallback(()=>{C(!d),console.log(o("pages.profile.simulatedTrading.toggle",d?o("common.disabled"):o("common.enabled")))},[d]),z=i.useCallback(()=>{I(a=>!a)},[]),y=i.useCallback(()=>{v(!0)},[]),k=i.useCallback(()=>{v(!1)},[]),A=i.useMemo(()=>Y.map(a=>({...a,disabled:(a==null?void 0:a.requiresKyc)&&!(s!=null&&s.kyc)})),[s==null?void 0:s.kyc]),D=i.useCallback(()=>{t===n.UNVERIFIED?x.push("/proof"):t===n.PENDING&&alert(o("pages.profile.verification.pendingAlert"))},[t,x]),M=()=>{switch(t){case n.SUCCESS:return o("pages.profile.status.verified");case n.PENDING:return o("pages.profile.verification.pending.status");default:return o("pages.profile.status.unverified")}},P=()=>{switch(t){case n.SUCCESS:return"fas fa-check-circle";case n.PENDING:return"fas fa-clock";default:return"fas fa-exclamation-circle"}},L=()=>{switch(t){case n.SUCCESS:return o("pages.profile.status.verified");case n.PENDING:return o("pages.profile.verification.pending.button");default:return o("pages.profile.verification.alert.verifyNow")}},T=()=>t===n.SUCCESS||t===n.PENDING,V=()=>t===n.UNVERIFIED,q=i.useCallback((a,c)=>{if(a.type==="toggle")return e.jsxs("li",{className:"menu-item",children:[e.jsx("div",{className:"icon-container icon-green",children:e.jsx("i",{className:a.icon})}),e.jsx("div",{className:"menu-text",children:a.name}),e.jsx("div",{className:"menu-action",children:e.jsxs("label",{className:"toggle-switch",children:[e.jsx("input",{type:"checkbox",checked:d,onChange:j}),e.jsx("span",{className:"slider"})]})})]},c);if(a.type==="action")return e.jsxs("li",{className:"menu-item",onClick:N,children:[e.jsx("div",{className:"icon-container icon-gray",children:e.jsx("i",{className:a.icon})}),e.jsx("div",{className:"menu-text",children:a.name})]},c);if(a.type==="modal")return e.jsxs("li",{className:`menu-item ${a.disabled?"disabled":""}`,onClick:a.modal==="language"?y:null,children:[e.jsx("div",{className:`icon-container ${a.icon.includes("language")?"icon-green":"icon-gray"}`,children:e.jsx("i",{className:a.icon})}),e.jsx("div",{className:"menu-text",children:a.name}),e.jsx("div",{className:"menu-action",children:!a.disabled&&e.jsx("i",{className:"fas fa-chevron-right chevron"})})]},c);const f=e.jsxs("li",{className:`menu-item ${a.disabled?"disabled":""}`,children:[e.jsx("div",{className:`icon-container ${a.icon.includes("exchange-alt")?"icon-green":a.icon.includes("cog")?"icon-gray":a.icon.includes("shield-alt")?"icon-blue":a.icon.includes("file-alt")||a.icon.includes("gift")?"icon-green":a.icon.includes("comment-dots")?"icon-blue":a.icon.includes("building")?"icon-green":a.icon.includes("question-circle")?"icon-gray":a.icon.includes("download")?"icon-green":"icon-gray"}`,children:e.jsx("i",{className:a.icon})}),e.jsx("div",{className:"menu-text",children:a.name}),e.jsx("div",{className:"menu-action",children:!a.disabled&&e.jsx("i",{className:"fas fa-chevron-right chevron"})})]});return a.disabled?e.jsx("div",{className:"menu-link-wrapper",children:f},a.name):e.jsx(u,{to:a.path,className:"menu-link-wrapper",children:f},a.name)},[d,j,N,y]),R=()=>{l(F.doSignout())},$=(s==null?void 0:s.fullName)||(s==null?void 0:s.email)||o("pages.profile.user");return e.jsxs("div",{className:"profile-container",children:[e.jsxs("div",{className:"header",children:[e.jsxs("div",{className:"nav-bar",children:[e.jsx(u,{to:"/",className:"back-arrow",children:e.jsx("i",{className:"fas fa-arrow-left"})}),e.jsx("div",{className:"page-title",children:o("pages.profile.title")})]}),e.jsxs("div",{className:"asset-section",children:[e.jsx("div",{className:"user-name",children:$}),e.jsxs("div",{className:"valuation-card",children:[e.jsx("div",{className:"valuation-header",children:e.jsxs("div",{className:"valuation-label",children:[e.jsx("i",{className:`fas ${p?"fa-eye":"fa-eye-slash"}`,onClick:z,"aria-label":p?o("pages.wallet.showAmounts"):o("pages.wallet.hideAmounts")}),o("pages.wallet.assetValuation")]})}),e.jsx("div",{className:"balance-amount",children:b?e.jsx("div",{className:"balance-placeholder placeholder-text"}):p?o("common.hidden"):`$${S}`}),e.jsx("div",{className:"usd-equivalent",children:b?e.jsx("div",{className:"equivalent-placeholder placeholder-text"}):p?o("common.hidden"):o("pages.wallet.totalUsdValue")})]}),e.jsx("div",{className:"actions-section",children:e.jsxs("div",{className:"actions-grid",children:[e.jsxs(u,{to:"/deposit",className:"action-item remove_blue",children:[e.jsx("div",{className:"action-icon",children:e.jsx("i",{className:"fas fa-arrow-down"})}),e.jsx("span",{className:"action-label",children:o("pages.wallet.quickActions.deposit")})]}),e.jsxs(u,{to:"/withdraw",className:"action-item remove_blue",children:[e.jsx("div",{className:"action-icon",children:e.jsx("i",{className:"fas fa-arrow-up"})}),e.jsx("span",{className:"action-label",children:o("pages.wallet.quickActions.withdraw")})]})]})})]})]}),e.jsxs("div",{className:"content-card",children:[e.jsxs("ul",{className:"menu-list",children:[e.jsxs("li",{className:"menu-item kyc-status-item",children:[e.jsx("div",{className:"icon-container icon-gray",children:e.jsx("i",{className:P()})}),e.jsx("div",{className:"menu-text",children:e.jsx("div",{className:"kyc-badge-text",children:M()})}),e.jsx("div",{className:"menu-action",children:e.jsx("button",{className:`verify-button-small ${V()?"pulse":""}`,onClick:D,disabled:T(),children:L()})})]}),A.map((a,c)=>q(a,c))]}),e.jsx("div",{className:"signout-section",children:e.jsxs("button",{className:"signout-button",onClick:R,children:[e.jsx("i",{className:"fas fa-sign-out-alt"}),o("pages.profile.menu.logout")]})})]}),E&&e.jsx("div",{className:"modal-overlay",onClick:k,children:e.jsxs("div",{className:"modal-container-bottom",onClick:a=>a.stopPropagation(),children:[e.jsxs("div",{className:"modal-header-bottom",children:[e.jsx("div",{className:"modal-drag-handle"}),e.jsxs("div",{className:"modal-title-wrapper",children:[e.jsx("div",{className:"modal-title",children:o("pages.settings.modals.language.title")}),e.jsx("button",{className:"modal-close-btn-bottom",onClick:k,children:e.jsx("i",{className:"fas fa-times"})})]})]}),e.jsx("div",{className:"modal-content-bottom",children:e.jsx(_,{isInModal:!0})})]})}),e.jsx("style",{children:`
        /* Profile Container */
        .profile-container {
          max-width: 430px;
          margin: 0 auto;
          min-height: 100vh;
          background-color: #0f0f0f;
          border-top: 2px solid #39FF14;
          display: flex;
          flex-direction: column;
          box-sizing: border-box;
          color: #ffffff;
        }

        /* Header */
        .header {
          padding: 12px 16px;
          border-bottom: 1px solid #2a2a2a;
        }
        .nav-bar {
          display: flex;
          align-items: center;
          gap: 16px;
          margin-bottom: 16px;
        }
        .back-arrow {
          color: #ffffff;
          font-size: 18px;
          text-decoration: none;
        }
        .back-arrow:hover {
          color: #39FF14;
        }
        .page-title {
          font-size: 16px;
          font-weight: 500;
          color: #ffffff;
        }

        /* Asset Section */
        .asset-section {
          margin-top: 8px;
        }
        .user-name {
          font-size: 20px;
          font-weight: 600;
          margin-bottom: 16px;
          color: #ffffff;
          text-align: center;
        }
        .valuation-card {
          background-color: #0f0f0f;
          border: 1px solid #2a2a2a;
          border-radius: 12px;
          padding: 12px;
          margin-bottom: 16px;
        }
        .valuation-header {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 8px;
        }
        .valuation-label {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 12px;
          color: #aaaaaa;
        }
        .valuation-label i {
          cursor: pointer;
          font-size: 14px;
          color: #39FF14;
          transition: color 0.2s;
        }
        .valuation-label i:hover {
          color: #2ecc10;
        }
        .balance-amount {
          font-size: 28px;
          font-weight: bold;
          color: #ffffff;
          margin-bottom: 4px;
        }
        .usd-equivalent {
          font-size: 12px;
          color: #777777;
        }

        .actions-section {
          margin-bottom: 20px;
        }
        .actions-grid {
          display: flex;
          gap: 12px;
        }
        .action-item {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          background-color: #2a2a2a;
          padding: 10px;
          border-radius: 8px;
          text-decoration: none;
          color: #ffffff;
          transition: all 0.2s;
        }
        .action-item:hover {
          background-color: #39FF14;
          color: #0f0f0f;
        }
        .action-icon {
          font-size: 16px;
        }
        .action-label {
          font-size: 13px;
          font-weight: 500;
        }
        .remove_blue {
          -webkit-tap-highlight-color: transparent;
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

        /* Menu List */
        .menu-list {
          list-style: none;
          padding: 0;
          margin: 0;
        }
        .menu-item {
          display: flex;
          align-items: center;
          padding: 10px 0;
          border-bottom: 1px solid #2a2a2a;
          cursor: pointer;
          transition: color 0.2s;
        }
        .menu-item:hover:not(.disabled) {
          color: #39FF14;
        }
        .menu-item.disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        /* KYC Status Item */
        .kyc-status-item {
          border-bottom: 2px solid #39FF14;
          margin-bottom: 8px;
        }
        .kyc-badge-text {
          display: flex;
          align-items: center;
          gap: 6px;
        }
        .verify-button-small {
          background-color: #39FF14;
          color: #0f0f0f;
          font-weight: bold;
          padding: 5px 10px;
          border: none;
          border-radius: 20px;
          font-size: 11px;
          cursor: pointer;
          transition: background-color 0.2s;
        }
        .verify-button-small:hover:not(:disabled) {
          background-color: #2ecc10;
        }
        .verify-button-small:disabled {
          opacity: 0.5;
          cursor: not-allowed;
          background-color: #2a2a2a;
          color: #777777;
        }
        /* Pulse animation for the verify button when unverified */
        .verify-button-small.pulse {
          animation: pulse 2s infinite;
        }
        @keyframes pulse {
          0% { box-shadow: 0 0 0 0 rgba(57, 255, 20, 0.7); }
          70% { box-shadow: 0 0 0 10px rgba(57, 255, 20, 0); }
          100% { box-shadow: 0 0 0 0 rgba(57, 255, 20, 0); }
        }

        .icon-container {
          width: 36px;
          height: 36px;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-right: 14px;
          font-size: 16px;
        }
        .icon-green {
          background-color: rgba(57, 255, 20, 0.1);
          color: #39FF14;
        }
        .icon-gray {
          background-color: #2a2a2a;
          color: #ffffff;
        }
        .icon-blue {
          background-color: rgba(0, 123, 255, 0.1);
          color: #007bff;
        }
        .menu-text {
          flex: 1;
          font-size: 14px;
          color: #ffffff;
        }
        .menu-action {
          color: #777777;
          font-size: 13px;
        }
        .chevron {
          color: #39FF14;
        }

        /* Toggle Switch */
        .toggle-switch {
          position: relative;
          display: inline-block;
          width: 46px;
          height: 22px;
        }
        .toggle-switch input {
          opacity: 0;
          width: 0;
          height: 0;
        }
        .slider {
          position: absolute;
          cursor: pointer;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: #2a2a2a;
          transition: 0.2s;
          border-radius: 24px;
        }
        .slider:before {
          position: absolute;
          content: "";
          height: 18px;
          width: 18px;
          left: 2px;
          bottom: 2px;
          background-color: #ffffff;
          transition: 0.2s;
          border-radius: 50%;
        }
        input:checked + .slider {
          background-color: #39FF14;
        }
        input:checked + .slider:before {
          transform: translateX(24px);
          background-color: #0f0f0f;
        }

        /* Sign Out Button */
        .signout-section {
          margin-top: 20px;
          padding-top: 16px;
          border-top: 1px solid #2a2a2a;
        }
        .signout-button {
          background: none;
          border: 1px solid #39FF14;
          color: #39FF14;
          padding: 10px;
          border-radius: 6px;
          font-size: 14px;
          font-weight: bold;
          width: 100%;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          transition: all 0.2s;
        }
        .signout-button:hover {
          background-color: #39FF14;
          color: #0f0f0f;
        }
        .signout-button i {
          font-size: 16px;
        }

        .menu-link-wrapper {
          text-decoration: none;
          color: inherit;
          display: block;
        }

        /* Placeholder styles */
        .placeholder-text {
          background: linear-gradient(90deg, #2a2a2a 25%, #3a3a3a 50%, #2a2a2a 75%);
          background-size: 200% 100%;
          animation: loading 1.5s infinite;
          border-radius: 4px;
        }
        @keyframes loading {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
        .balance-placeholder {
          width: 100px;
          height: 28px;
        }
        .equivalent-placeholder {
          width: 70px;
          height: 12px;
        }

        /* Modal Styles */
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: rgba(0, 0, 0, 0.8);
          backdrop-filter: blur(4px);
          display: flex;
          align-items: flex-end;
          justify-content: center;
          z-index: 1000;
          animation: fadeIn 0.3s ease;
        }
        .modal-container-bottom {
          background-color: #1c1c1c;
          border-top: 2px solid #39FF14;
          border-radius: 24px 24px 0 0;
          width: 100%;
          max-width: 430px;
          max-height: 85vh;
          overflow: hidden;
          box-shadow: 0 -10px 40px rgba(0, 0, 0, 0.5);
          animation: slideUpFromBottom 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          display: flex;
          flex-direction: column;
          margin: 0 auto;
        }
        .modal-header-bottom {
          padding: 12px 20px 8px 20px;
          border-bottom: 1px solid #2a2a2a;
          position: relative;
        }
        .modal-drag-handle {
          width: 40px;
          height: 4px;
          background: #444;
          border-radius: 2px;
          margin: 0 auto 12px auto;
        }
        .modal-title-wrapper {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .modal-title {
          font-size: 16px;
          font-weight: 600;
          color: #ffffff;
        }
        .modal-close-btn-bottom {
          background: #2a2a2a;
          border: none;
          color: #ffffff;
          font-size: 14px;
          cursor: pointer;
          padding: 6px;
          border-radius: 50%;
          width: 32px;
          height: 32px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s ease;
        }
        .modal-close-btn-bottom:hover {
          background: #39FF14;
          color: #0f0f0f;
        }
        .modal-content-bottom {
          flex: 1;
          overflow-y: hidden;
          padding: 0;
          max-height: calc(85vh - 100px);
          background-color: #1c1c1c;
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideUpFromBottom {
          from {
            opacity: 0;
            transform: translateY(100%);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `})]})}export{Q as default};
