import{N as C,j as o,S as M,u as S,t as P,i as l,O as q,k as a,L as x,ak as I}from"./index-a23148c8.js";import{u as A,y as B,F as $}from"./FormErrors-e6dcc768.js";import{y as j}from"./yupFormSchemas-38d196c5.js";import{I as N}from"./InputFormItem-accaa65b.js";import{u as D}from"./useDispatch-1da8dfab.js";const k=({visible:e,title:d,onClose:h,children:c})=>e?a.jsxs(a.Fragment,{children:[a.jsx("style",{children:`
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: rgba(0, 0, 0, 0.8);
          backdrop-filter: blur(4px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 9999;
          animation: fadeIn 0.3s ease;
        }
        .modal-container {
          background-color: #1c1c1c;
          border-radius: 16px;
          width: 90%;
          max-width: 400px;
          max-height: 90vh;
          overflow-y: auto;
          border: 1px solid #3a3a3a;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
          animation: slideIn 0.3s ease;
        }
        .modal-header {
          padding: 16px 20px;
          border-bottom: 1px solid #2a2a2a;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .modal-header h3 {
          margin: 0;
          color: #ffffff;
          font-size: 18px;
          font-weight: 600;
        }
        .modal-close {
          background: none;
          border: none;
          font-size: 24px;
          cursor: pointer;
          color: #777777;
          transition: color 0.2s;
        }
        .modal-close:hover {
          color: #39FF14;
        }
        .modal-body {
          padding: 20px;
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideIn {
          from {
            transform: translateY(-50px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
      `}),a.jsx("div",{className:"modal-overlay",onClick:h,children:a.jsxs("div",{className:"modal-container",onClick:f=>f.stopPropagation(),children:[a.jsxs("div",{className:"modal-header",children:[a.jsx("h3",{children:d}),a.jsx("button",{className:"modal-close",onClick:h,children:"×"})]}),a.jsx("div",{className:"modal-body",children:c})]})})]}):null,H=C().shape({amount:j.integer(o("entities.transaction.fields.amount"),{required:!0,min:20}),withdrawPassword:j.string(o("user.fields.withdrawPassword"),{required:!0}),withdrawalMethod:M().required(o("pages.withdraw.validation.selectMethod"))});function L(){var w,g,u;const e=S(P.selectCurrentUser),d=D(),[h,c]=l.useState(!1),[f,b]=l.useState(!1),v=l.useCallback(async()=>{await d(q.doRefreshCurrentUser())},[d]),p=l.useCallback(()=>{var t,i,r,n;return e?((t=e.accountHolder)==null?void 0:t.trim())&&((i=e.ibanNumber)==null?void 0:i.trim())&&((r=e.bankName)==null?void 0:r.trim())&&((n=e.ifscCode)==null?void 0:n.trim()):!1},[e]),m=l.useCallback(()=>{var t,i,r,n;return e?((t=e.trc20)==null?void 0:t.trim())&&((i=e.walletname)==null?void 0:i.trim())&&((r=e.usernamewallet)==null?void 0:r.trim())&&((n=e.preferredcoin)==null?void 0:n.trim()):!1},[e]),y=l.useCallback(()=>{const t=[];return e!=null&&e.accountHolder||t.push(o("entities.transaction.fields.accountHolder")),e!=null&&e.ibanNumber||t.push(o("entities.transaction.fields.ibanNumber")),e!=null&&e.bankName||t.push(o("entities.transaction.fields.bankName")),e!=null&&e.ifscCode||t.push(o("entities.transaction.fields.ifscCode")),t},[e]),F=l.useCallback(()=>{const t=[];return e!=null&&e.trc20||t.push(o("user.fields.trc20")),e!=null&&e.walletname||t.push(o("pages.wallet.walletName")),e!=null&&e.usernamewallet||t.push(o("pages.wallet.username")),e!=null&&e.preferredcoin||t.push(o("pages.wallet.choosePreferredCoin")),t},[e]),z=async({amount:t,withdrawPassword:i,withdrawalMethod:r})=>{if(r==="bank"&&!p()){c(!0);return}if(r==="crypto"&&!m()){b(!0);return}const n={status:"pending",date:new Date,user:e?e.id:null,type:"withdraw",amount:t,vip:e,withdrawPassword:i,withdrawalMethod:r};await d(I.doCreate(n)),await v()},s=A({resolver:B.yupResolver(H),mode:"onSubmit",defaultValues:{amount:"",withdrawalMethod:""}});return a.jsxs("div",{className:"withdraw-container",children:[a.jsx("div",{className:"header",children:a.jsxs("div",{className:"nav-bar",children:[a.jsx(x,{to:"/wallets",className:"back-arrow",children:a.jsx("i",{className:"fas fa-arrow-left"})}),a.jsx("div",{className:"page-title",children:o("pages.withdraw.title")})]})}),a.jsx("div",{className:"content-card",children:a.jsx($,{...s,children:a.jsxs("form",{onSubmit:s.handleSubmit(z),children:[a.jsxs("div",{className:"balance-info",children:[a.jsx("i",{className:"fas fa-wallet",style:{marginRight:"8px"}}),o("pages.withdraw.availableBalance")," : $",((w=e==null?void 0:e.balance)==null?void 0:w.toFixed(2))||0]}),a.jsxs("div",{className:"form-group",children:[a.jsxs("label",{className:"input-label",children:[a.jsx("span",{className:"required-star",children:"*"}),o("pages.withdraw.withdrawAmount")]}),a.jsx(N,{type:"number",name:"amount",placeholder:o("pages.withdraw.amountPlaceholder"),className:"withdraw-input"})]}),a.jsxs("div",{className:"form-group",children:[a.jsxs("label",{className:"input-label",children:[a.jsx("span",{className:"required-star",children:"*"}),o("pages.withdraw.selectMethod")]}),a.jsxs("div",{className:"method-selection",children:[a.jsxs("div",{className:`method-card ${s.watch("withdrawalMethod")==="crypto"?"selected":""}`,onClick:()=>s.setValue("withdrawalMethod","crypto",{shouldValidate:!0}),children:[a.jsx("i",{className:"fab fa-bitcoin method-icon"}),a.jsx("div",{className:"method-label",children:o("pages.withdraw.methods.crypto")}),a.jsx("div",{className:`method-status ${m()?"complete":"incomplete"}`,children:m()?o("pages.withdraw.status.complete"):o("pages.withdraw.status.incomplete")}),a.jsx("div",{className:"method-network-hint",children:o("pages.withdraw.methods.cryptoNetworks")})]}),a.jsxs("div",{className:`method-card ${s.watch("withdrawalMethod")==="bank"?"selected":""}`,onClick:()=>s.setValue("withdrawalMethod","bank",{shouldValidate:!0}),children:[a.jsx("i",{className:"fas fa-university method-icon"}),a.jsx("div",{className:"method-label",children:o("pages.withdraw.methods.bank")}),a.jsx("div",{className:`method-status ${p()?"complete":"incomplete"}`,children:p()?o("pages.withdraw.status.complete"):o("pages.withdraw.status.incomplete")}),a.jsx("div",{className:"method-network-hint",children:o("pages.withdraw.methods.bankNetworks")})]})]}),a.jsx("input",{type:"hidden",...s.register("withdrawalMethod")}),s.formState.errors.withdrawalMethod&&a.jsxs("div",{className:"error-message",children:[a.jsx("i",{className:"fas fa-exclamation-circle"}),s.formState.errors.withdrawalMethod.message]})]}),s.watch("withdrawalMethod")==="crypto"&&m()&&a.jsxs("div",{className:"preview-box",children:[a.jsx("i",{className:"fab fa-bitcoin"}),a.jsx("strong",{children:o("pages.withdraw.withdrawingTo")}),a.jsx("br",{}),a.jsxs("span",{className:"preview-detail",children:[(g=e==null?void 0:e.preferredcoin)==null?void 0:g.toUpperCase(),": ",(u=e==null?void 0:e.trc20)==null?void 0:u.substring(0,12),"..."]})]}),s.watch("withdrawalMethod")==="bank"&&p()&&a.jsxs("div",{className:"preview-box",children:[a.jsx("i",{className:"fas fa-university"}),a.jsx("strong",{children:o("pages.withdraw.withdrawingTo")}),a.jsx("br",{}),a.jsxs("span",{className:"preview-detail",children:[e==null?void 0:e.bankName," - ",e==null?void 0:e.accountHolder]})]}),a.jsxs("div",{className:"form-group",children:[a.jsxs("label",{className:"input-label",children:[a.jsx("span",{className:"required-star",children:"*"}),o("pages.withdraw.withdrawPassword")]}),a.jsx(N,{type:"password",name:"withdrawPassword",placeholder:o("pages.withdraw.withdrawPasswordPlaceholder"),className:"withdraw-input"})]}),a.jsxs("div",{className:"announcement-container",children:[a.jsx("i",{className:"fas fa-volume-high speaker"}),a.jsx("div",{className:"announcement-text",children:o("pages.withdraw.announcement")})]}),a.jsxs("button",{className:"withdraw-button",type:"submit",children:[a.jsx("i",{className:"fas fa-check"}),o("pages.withdraw.confirm")]}),(!p()||!m())&&a.jsxs("div",{className:"tip-box",children:[a.jsx("i",{className:"fas fa-info-circle"}),a.jsxs("span",{children:[o("pages.withdraw.completeDetailsIn")," ",a.jsx(x,{to:"/bind-account",className:"tip-link",children:o("pages.bindAccount.title")}),o("pages.withdraw.enableAllOptions")]})]})]})})}),a.jsx(k,{visible:h,title:o("pages.withdraw.bankModal.title"),onClose:()=>c(!1),children:a.jsxs("div",{className:"modal-content-centered",children:[a.jsx("i",{className:"fas fa-exclamation-circle modal-warning-icon"}),a.jsx("h3",{className:"modal-subtitle",children:o("pages.withdraw.bankModal.required")}),a.jsx("p",{className:"modal-description",children:o("pages.withdraw.bankModal.description")}),a.jsx("ul",{className:"missing-fields-list",children:y().map((t,i)=>a.jsxs("li",{children:[a.jsx("i",{className:"fas fa-times"})," ",t]},i))}),a.jsxs("div",{className:"modal-actions",children:[a.jsx("button",{className:"modal-cancel-btn",onClick:()=>c(!1),children:o("common.cancel")}),a.jsx(x,{to:"/bind-account",className:"modal-action-link",children:a.jsx("button",{className:"modal-action-btn",children:o("pages.withdraw.goToBindAccount")})})]})]})}),a.jsx(k,{visible:f,title:o("pages.withdraw.cryptoModal.title"),onClose:()=>b(!1),children:a.jsxs("div",{className:"modal-content-centered",children:[a.jsx("i",{className:"fas fa-exclamation-circle modal-warning-icon"}),a.jsx("h3",{className:"modal-subtitle",children:o("pages.withdraw.cryptoModal.required")}),a.jsx("p",{className:"modal-description",children:o("pages.withdraw.cryptoModal.description")}),a.jsx("ul",{className:"missing-fields-list",children:F().map((t,i)=>a.jsxs("li",{children:[a.jsx("i",{className:"fas fa-times"})," ",t]},i))}),a.jsxs("div",{className:"modal-actions",children:[a.jsx("button",{className:"modal-cancel-btn",onClick:()=>b(!1),children:o("common.cancel")}),a.jsx(x,{to:"/bind-account",className:"modal-action-link",children:a.jsx("button",{className:"modal-action-btn",children:o("pages.withdraw.goToBindAccount")})})]})]})}),a.jsx("style",{children:`
        /* Withdraw Container – matches Profile container */
        .withdraw-container {
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
          border-top: 2px solid #39FF14;
        }

        /* Form elements */
        .form-group {
          margin-bottom: 20px;
        }
        .input-label {
          display: flex;
          align-items: center;
          gap: 4px;
          font-size: 14px;
          font-weight: 500;
          color: #bbbbbb;
          margin-bottom: 6px;
        }
        .required-star {
          color: #39FF14;
          font-size: 16px;
          margin-right: 2px;
        }
        .withdraw-input {
          background-color: #2a2a2a;
          border: 1px solid #3a3a3a;
          border-radius: 8px;
          padding: 12px;
          color: #ffffff;
          font-size: 16px;
          width: 100%;
          outline: none;
          transition: border-color 0.2s;
        }
        .withdraw-input:focus {
          border-color: #39FF14;
        }
        .withdraw-input::placeholder {
          color: #777777;
        }

        /* Balance info */
        .balance-info {
          background-color: #2a2a2a;
          border-left: 4px solid #39FF14;
          border-radius: 8px;
          padding: 16px;
          margin-bottom: 24px;
          font-size: 16px;
          font-weight: 600;
          color: #ffffff;
        }
        .balance-info i {
          color: #39FF14;
        }

        /* Method selection cards */
        .method-selection {
          display: flex;
          gap: 12px;
          margin: 8px 0 12px;
        }
        .method-card {
          flex: 1;
          background-color: #2a2a2a;
          border: 1px solid #3a3a3a;
          border-radius: 12px;
          padding: 16px 8px;
          text-align: center;
          cursor: pointer;
          transition: all 0.2s;
        }
        .method-card.selected {
          border-color: #39FF14;
          background-color: rgba(57, 255, 20, 0.05);
          transform: translateY(-2px);
        }
        .method-card:hover {
          border-color: #39FF14;
        }
        .method-icon {
          font-size: 28px;
          color: #39FF14;
          margin-bottom: 8px;
        }
        .method-label {
          font-weight: 600;
          color: #ffffff;
          margin-bottom: 6px;
          font-size: 14px;
        }
        .method-status {
          font-size: 12px;
          padding: 4px 8px;
          border-radius: 20px;
          display: inline-block;
          margin-bottom: 6px;
        }
        .method-status.complete {
          color: #39FF14;
          background-color: rgba(57, 255, 20, 0.1);
        }
        .method-status.incomplete {
          color: #ffaa00;
          background-color: rgba(255, 170, 0, 0.1);
        }
        .method-network-hint {
          font-size: 10px;
          color: #777777;
        }

        /* Preview box */
        .preview-box {
          background-color: #2a2a2a;
          border: 1px solid #39FF14;
          border-radius: 8px;
          padding: 12px;
          margin-bottom: 20px;
          font-size: 13px;
        }
        .preview-box i {
          color: #39FF14;
          margin-right: 8px;
        }
        .preview-detail {
          color: #bbbbbb;
          font-size: 12px;
        }

        /* Error message */
        .error-message {
          color: #ff6b6b;
          font-size: 12px;
          margin-top: 4px;
          display: flex;
          align-items: center;
          gap: 4px;
        }

        /* Announcement */
        .announcement-container {
          display: flex;
          align-items: center;
          gap: 12px;
          margin: 20px 0;
          padding: 16px;
          background-color: #2a2a2a;
          border-radius: 8px;
          border-left: 4px solid #39FF14;
        }
        .speaker {
          font-size: 20px;
          color: #39FF14;
        }
        .announcement-text {
          font-size: 13px;
          color: #bbbbbb;
          line-height: 1.5;
        }

        /* Submit button */
        .withdraw-button {
          background-color: #39FF14;
          color: #000000;
          font-weight: bold;
          height: 48px;
          width: 100%;
          border: none;
          border-radius: 8px;
          font-size: 16px;
          cursor: pointer;
          transition: background-color 0.2s;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          margin-top: 20px;
        }
        .withdraw-button:hover {
          background-color: #2ecc10;
        }
        .withdraw-button:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        /* Tip box */
        .tip-box {
          margin-top: 20px;
          padding: 12px;
          background-color: rgba(57, 255, 20, 0.1);
          border: 1px solid #39FF14;
          border-radius: 8px;
          font-size: 13px;
          color: #bbbbbb;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .tip-box i {
          color: #39FF14;
          font-size: 16px;
        }
        .tip-link {
          color: #39FF14;
          text-decoration: none;
          font-weight: 500;
        }
        .tip-link:hover {
          text-decoration: underline;
        }

        /* Modal content */
        .modal-content-centered {
          text-align: center;
        }
        .modal-warning-icon {
          font-size: 48px;
          color: #ffaa00;
          margin-bottom: 16px;
        }
        .modal-subtitle {
          color: #ffffff;
          margin-bottom: 12px;
          font-size: 18px;
        }
        .modal-description {
          color: #bbbbbb;
          margin-bottom: 20px;
          font-size: 14px;
        }
        .missing-fields-list {
          text-align: left;
          margin-bottom: 24px;
          color: #bbbbbb;
          list-style: none;
          padding: 0;
        }
        .missing-fields-list li {
          margin-bottom: 8px;
          padding: 8px 12px;
          background-color: #2a2a2a;
          border-radius: 6px;
          font-size: 13px;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .missing-fields-list i {
          color: #ff6b6b;
          font-size: 14px;
        }
        .modal-actions {
          display: flex;
          gap: 12px;
          justify-content: center;
        }
        .modal-cancel-btn {
          flex: 1;
          background-color: #2a2a2a;
          border: 1px solid #3a3a3a;
          color: #ffffff;
          padding: 10px;
          border-radius: 6px;
          font-size: 14px;
          cursor: pointer;
          transition: all 0.2s;
        }
        .modal-cancel-btn:hover {
          border-color: #39FF14;
        }
        .modal-action-link {
          flex: 1;
          text-decoration: none;
        }
        .modal-action-btn {
          width: 100%;
          background-color: #39FF14;
          border: none;
          color: #000000;
          padding: 10px;
          border-radius: 6px;
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
          transition: background-color 0.2s;
        }
        .modal-action-btn:hover {
          background-color: #2ecc10;
        }

        /* Responsive */
        @media (max-width: 380px) {
          .content-card {
            padding: 16px;
          }
          .method-card {
            padding: 12px 4px;
          }
          .method-icon {
            font-size: 24px;
          }
          .method-label {
            font-size: 13px;
          }
        }
      `})]})}export{L as default};
