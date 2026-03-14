import{j as i,q as T,u as p,t as V,aq as N,i as n,ar as A,O as j,k as e,L as y}from"./index-3c390b80.js";import{I as R}from"./I18nSelect-2310cba3.js";import{u as G}from"./useDispatch-f272d96f.js";const B=[{icon:"fas fa-language",name:i("pages.settings.language"),type:"modal",modal:"language"},{icon:"fas fa-shield-alt",path:"/loginpassword",name:i("pages.profile.menu.password")},{icon:"fas fa-file-alt",path:"/transferAll",name:i("pages.profile.menu.withdrawalAddress")},{icon:"fas fa-comment-dots",path:"/online-service",name:i("pages.profile.menu.customerSupport")},{icon:"fas fa-building",path:"/about",name:i("pages.profile.menu.aboutUs")},{icon:"fas fa-question-circle",path:"/support",name:i("pages.profile.menu.helpcenter")},{icon:"fas fa-download",path:"/download",name:i("pages.profile.menu.downloadApp")},{icon:"fas fa-trash-alt",name:i("pages.profile.menu.clearCache"),type:"action"}],s={PENDING:"pending",SUCCESS:"success",UNVERIFIED:"unverified"};function H(){const l=G(),f=T(),o=p(V.selectCurrentUser),u=p(N.selectRows);p(N.selectLoading);const[r,k]=n.useState(!1),[w,g]=n.useState(!1),t=n.useMemo(()=>{var a;return((a=u[0])==null?void 0:a.status)===s.PENDING?s.PENDING:o!=null&&o.kyc?s.SUCCESS:s.UNVERIFIED},[u,o==null?void 0:o.kyc]),d=n.useMemo(()=>({user:o}),[o]);n.useEffect(()=>{l(A.doFetch(d,d))},[l,d]),n.useCallback(()=>{l(j.doSignout())},[l]);const m=n.useCallback(()=>{console.log(i("pages.profile.cache.clearing")),alert(i("pages.profile.cache.cleared"))},[]),x=n.useCallback(()=>{k(!r),console.log(i("pages.profile.simulatedTrading.toggle",r?i("common.disabled"):i("common.enabled")))},[r]),h=n.useCallback(()=>{g(!0)},[]),b=n.useCallback(()=>{g(!1)},[]),F=n.useMemo(()=>B.map(a=>({...a,disabled:(a==null?void 0:a.requiresKyc)&&!(o!=null&&o.kyc)})),[o==null?void 0:o.kyc]),S=n.useCallback(()=>{console.log(i("pages.profile.verification.kycStatus"),t),t===s.UNVERIFIED?(console.log(i("pages.profile.verification.redirecting")),f.push("/proof")):t===s.PENDING?(console.log(i("pages.profile.verification.pendingReview")),alert(i("pages.profile.verification.pendingAlert"))):console.log(i("pages.profile.verification.alreadyVerified"))},[t,f]),C=()=>o!=null&&o.fullName?o.fullName.charAt(0).toUpperCase():o!=null&&o.email?o.email.charAt(0).toUpperCase():i("pages.profile.userInitial"),I=()=>{switch(t){case s.SUCCESS:return i("pages.profile.status.verified");case s.PENDING:return i("pages.profile.verification.pending.status");default:return i("pages.profile.status.unverified")}},E=()=>{switch(t){case s.SUCCESS:return"fas fa-check-circle";case s.PENDING:return"fas fa-clock";default:return"fas fa-exclamation-circle"}},z=()=>{switch(t){case s.SUCCESS:return i("pages.profile.status.verified");case s.PENDING:return i("pages.profile.verification.pending.button");default:return i("pages.profile.verification.alert.verifyNow")}},D=()=>t===s.SUCCESS||t===s.PENDING,M=()=>t===s.UNVERIFIED,P=n.useCallback((a,c)=>{if(a.type==="toggle")return e.jsxs("li",{className:"menu-item",children:[e.jsx("div",{className:"icon-container icon-green",children:e.jsx("i",{className:a.icon})}),e.jsx("div",{className:"menu-text",children:a.name}),e.jsx("div",{className:"menu-action",children:e.jsxs("label",{className:"toggle-switch",children:[e.jsx("input",{type:"checkbox",checked:r,onChange:x}),e.jsx("span",{className:"slider"})]})})]},c);if(a.type==="action")return e.jsxs("li",{className:"menu-item",onClick:m,children:[e.jsx("div",{className:"icon-container icon-gray",children:e.jsx("i",{className:a.icon})}),e.jsx("div",{className:"menu-text",children:a.name})]},c);if(a.type==="modal")return e.jsxs("li",{className:`menu-item ${a.disabled?"disabled":""}`,onClick:a.modal==="language"?h:null,children:[e.jsx("div",{className:`icon-container ${a.icon.includes("language")?"icon-green":"icon-gray"}`,children:e.jsx("i",{className:a.icon})}),e.jsx("div",{className:"menu-text",children:a.name}),e.jsx("div",{className:"menu-action",children:!a.disabled&&e.jsx("i",{className:"fas fa-chevron-right chevron"})})]},c);const v=e.jsxs("li",{className:`menu-item ${a.disabled?"disabled":""}`,children:[e.jsx("div",{className:`icon-container ${a.icon.includes("exchange-alt")?"icon-green":a.icon.includes("cog")?"icon-gray":a.icon.includes("shield-alt")?"icon-blue":a.icon.includes("file-alt")||a.icon.includes("gift")?"icon-green":a.icon.includes("comment-dots")?"icon-blue":a.icon.includes("building")?"icon-green":a.icon.includes("question-circle")?"icon-gray":a.icon.includes("download")?"icon-green":"icon-gray"}`,children:e.jsx("i",{className:a.icon})}),e.jsx("div",{className:"menu-text",children:a.name}),e.jsx("div",{className:"menu-action",children:!a.disabled&&e.jsx("i",{className:"fas fa-chevron-right chevron"})})]});return a.disabled?e.jsx("div",{className:"menu-link-wrapper",children:v},a.name):e.jsx(y,{to:a.path,className:"menu-link-wrapper",children:v},a.name)},[r,x,m,h]),L=()=>{l(j.doSignout())};return e.jsxs("div",{className:"profile-container",children:[e.jsxs("div",{className:"header",children:[e.jsxs("div",{className:"nav-bar",children:[e.jsx(y,{to:"/",className:"back-arrow",children:e.jsx("i",{className:"fas fa-arrow-left"})}),e.jsx("div",{className:"page-title",children:i("pages.profile.title")})]}),e.jsxs("div",{className:"profile-section",children:[e.jsx("div",{className:"avatar-container",children:e.jsx("div",{className:"avatar-ring",children:e.jsxs("div",{className:"avatar",children:[e.jsx("div",{className:"avatar-initial",children:C()}),e.jsx("div",{className:"sunglasses",children:e.jsx("i",{className:"fas fa-sunglasses"})})]})})}),e.jsx("div",{className:"username",children:(o==null?void 0:o.fullName)||(o==null?void 0:o.email)||i("pages.profile.user")}),e.jsxs("div",{className:"user-id",children:[i("pages.profile.userId"),": ",(o==null?void 0:o.id)||i("common.na")]}),e.jsxs("div",{className:"certification-status",children:[e.jsxs("div",{className:`status-badge ${M()?"pulse":""}`,children:[e.jsx("i",{className:`${E()} status-icon`}),I()]}),e.jsx("button",{className:"verify-button",onClick:S,disabled:D(),children:z()})]})]})]}),e.jsxs("div",{className:"content-card",children:[e.jsx("ul",{className:"menu-list",children:F.map((a,c)=>P(a,c))}),e.jsx("div",{className:"signout-section",children:e.jsxs("button",{className:"signout-button",onClick:L,children:[e.jsx("i",{className:"fas fa-sign-out-alt"}),i("pages.profile.menu.logout")]})})]}),w&&e.jsx("div",{className:"modal-overlay",onClick:b,children:e.jsxs("div",{className:"modal-container-bottom",onClick:a=>a.stopPropagation(),children:[e.jsxs("div",{className:"modal-header-bottom",children:[e.jsx("div",{className:"modal-drag-handle"}),e.jsxs("div",{className:"modal-title-wrapper",children:[e.jsx("div",{className:"modal-title",children:i("pages.settings.modals.language.title")}),e.jsx("button",{className:"modal-close-btn-bottom",onClick:b,children:e.jsx("i",{className:"fas fa-times"})})]})]}),e.jsx("div",{className:"modal-content-bottom",children:e.jsx(R,{isInModal:!0})})]})}),e.jsx("style",{children:`
        /* Profile Container – matches login container */
        .profile-container {
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
          margin-bottom: 20px;
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

        /* Profile Section */
        .profile-section {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
        }
        .avatar-container {
          margin-bottom: 12px;
        }
        .avatar-ring {
          width: 80px;
          height: 80px;
          border-radius: 50%;
          background: linear-gradient(135deg, #39FF14, #2ecc10);
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .avatar {
          width: 74px;
          height: 74px;
          border-radius: 50%;
          background-color: #1c1c1c;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          border: 2px solid #000000;
        }
        .avatar-initial {
          font-size: 32px;
          font-weight: bold;
          color: #39FF14;
        }
        .sunglasses {
          position: absolute;
          bottom: -4px;
          right: -4px;
          background: #39FF14;
          border-radius: 50%;
          width: 24px;
          height: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #000000;
          font-size: 12px;
          border: 2px solid #000000;
        }
        .username {
          font-size: 20px;
          font-weight: 600;
          margin-bottom: 4px;
          color: #ffffff;
        }
        .user-id {
          font-size: 14px;
          color: #777777;
          margin-bottom: 16px;
        }

        /* Certification Status */
        .certification-status {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          margin-top: 8px;
          flex-wrap: wrap;
        }
        .status-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 6px 12px;
          background-color: #1c1c1c;
          border: 1px solid #2a2a2a;
          border-radius: 20px;
          font-size: 14px;
          color: #ffffff;
        }
        .status-badge.pulse {
          animation: pulse 2s infinite;
        }
        @keyframes pulse {
          0% { box-shadow: 0 0 0 0 rgba(57, 255, 20, 0.7); }
          70% { box-shadow: 0 0 0 10px rgba(57, 255, 20, 0); }
          100% { box-shadow: 0 0 0 0 rgba(57, 255, 20, 0); }
        }
        .status-icon {
          color: #39FF14;
        }
        .status-badge .fa-check-circle { color: #39FF14; }
        .status-badge .fa-clock { color: #ffaa00; }
        .status-badge .fa-exclamation-circle { color: #ff6b6b; }

        .verify-button {
          background-color: #39FF14;
          color: #000000;
          font-weight: bold;
          padding: 8px 20px;
          border: none;
          border-radius: 20px;
          font-size: 14px;
          cursor: pointer;
          transition: background-color 0.2s;
        }
        .verify-button:hover:not(:disabled) {
          background-color: #2ecc10;
        }
        .verify-button:disabled {
          opacity: 0.5;
          cursor: not-allowed;
          background-color: #2a2a2a;
          color: #777777;
        }

        /* Content Card */
        .content-card {
          flex: 1;
          background-color: #1c1c1c;
          border-top-left-radius: 24px;
          border-top-right-radius: 24px;
          padding: 24px 20px;
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
          padding: 9px 0;
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
        .icon-container {
          width: 40px;
          height: 40px;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-right: 16px;
          font-size: 18px;
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
          font-size: 16px;
          color: #ffffff;
        }
        .menu-action {
          color: #777777;
          font-size: 14px;
        }
        .chevron {
          color: #39FF14;
        }

        /* Toggle Switch (for simulated trading) */
        .toggle-switch {
          position: relative;
          display: inline-block;
          width: 50px;
          height: 24px;
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
          height: 20px;
          width: 20px;
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
          transform: translateX(26px);
          background-color: #000000;
        }

        /* Sign Out Button */
        .signout-section {
          margin-top: 24px;
          padding-top: 16px;
          border-top: 1px solid #2a2a2a;
        }
        .signout-button {
          background: none;
          border: 1px solid #39FF14;
          color: #39FF14;
          padding: 12px;
          border-radius: 6px;
          font-size: 16px;
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
          color: #000000;
        }
        .signout-button i {
          font-size: 18px;
        }

        /* Link wrapper – remove default underline */
        .menu-link-wrapper {
          text-decoration: none;
          color: inherit;
          display: block;
        }

        /* Modal Styles (dark theme) */
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
          padding: 16px 20px 8px 20px;
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
          font-size: 18px;
          font-weight: 600;
          color: #ffffff;
        }

        .modal-close-btn-bottom {
          background: #2a2a2a;
          border: none;
          color: #ffffff;
          font-size: 16px;
          cursor: pointer;
          padding: 8px;
          border-radius: 50%;
          width: 36px;
          height: 36px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s ease;
        }

        .modal-close-btn-bottom:hover {
          background: #39FF14;
          color: #000000;
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
      `})]})}export{H as default};
