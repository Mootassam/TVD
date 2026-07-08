import{W as R,j as o,Z as h,a0 as k,u as j,q as E,w as v,i as n,y as H,k as a,L as x,z as L,U as V,ar as Y}from"./index-a47ef697.js";import{u as W,y as O,F as Z}from"./FormErrors-b683205f.js";import{y as F}from"./yupFormSchemas-19eace5f.js";import{I as S}from"./InputFormItem-7a818a7d.js";import{u as G}from"./useDispatch-85fd9340.js";const z=({visible:e,title:d,onClose:c,children:f})=>e?a.jsxs(a.Fragment,{children:[a.jsx("style",{children:`
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
      `}),a.jsx("div",{className:"modal-overlay",onClick:c,children:a.jsxs("div",{className:"modal-container",onClick:b=>b.stopPropagation(),children:[a.jsxs("div",{className:"modal-header",children:[a.jsx("h3",{children:d}),a.jsx("button",{className:"modal-close",onClick:c,children:"×"})]}),a.jsx("div",{className:"modal-body",children:f})]})})]}):null,J=R().shape({amount:F.integer(o("entities.transaction.fields.amount"),{required:!0,min:10}),withdrawPassword:F.string(o("user.fields.withdrawPassword"),{required:!0}),withdrawalMethod:h().required(o("pages.withdraw.validation.selectMethod")),currency:h().default("USDT"),withdrawAddress:h(),network:h(),fee:k().default(0),totalAmount:k().default(0),orderNo:h()});function aa(){var N,y;const e=j(E.selectCurrentUser),d=G(),c=j(v.selectRows),f=j(v.selectLoading),[b,g]=n.useState(!1),[M,u]=n.useState(!1),C=n.useCallback(async()=>{await d(H.doRefreshCurrentUser())},[d]);n.useEffect(()=>{let t=!0;return(async()=>{if(t)try{await d(L.doFetch(null,"USD"))}catch(i){t&&console.error(o("pages.wallet.errors.fetchAssets"),i)}})(),()=>{t=!1}},[d]);const w=n.useMemo(()=>c.find(t=>t.symbol==="USDT"),[c]),A=(w==null?void 0:w.amount)||0,p=n.useCallback(()=>{var t,r,i,l;return e?((t=e.accountHolder)==null?void 0:t.trim())&&((r=e.ibanNumber)==null?void 0:r.trim())&&((i=e.bankName)==null?void 0:i.trim())&&((l=e.ifscCode)==null?void 0:l.trim()):!1},[e]),m=n.useCallback(()=>{var t,r,i,l;return e?((t=e.trc20)==null?void 0:t.trim())&&((r=e.walletname)==null?void 0:r.trim())&&((i=e.usernamewallet)==null?void 0:i.trim())&&((l=e.preferredcoin)==null?void 0:l.trim()):!1},[e]),$=n.useCallback(()=>{const t=[];return e!=null&&e.accountHolder||t.push(o("entities.transaction.fields.accountHolder")),e!=null&&e.ibanNumber||t.push(o("entities.transaction.fields.ibanNumber")),e!=null&&e.bankName||t.push(o("entities.transaction.fields.bankName")),e!=null&&e.ifscCode||t.push(o("entities.transaction.fields.ifscCode")),t},[e]),D=n.useCallback(()=>{const t=[];return e!=null&&e.trc20||t.push(o("user.fields.trc20")),e!=null&&e.walletname||t.push(o("pages.wallet.walletName")),e!=null&&e.usernamewallet||t.push(o("pages.wallet.username")),e!=null&&e.preferredcoin||t.push(o("pages.wallet.choosePreferredCoin")),t},[e]);n.useCallback(()=>{const t=new Date,r=`${t.getFullYear()}${String(t.getMonth()+1).padStart(2,"0")}${String(t.getDate()).padStart(2,"0")}`,i=Math.floor(Math.random()*1e7).toString().padStart(7,"0");return`RE${r}${i}`},[]);const T=async({amount:t,withdrawPassword:r,withdrawalMethod:i})=>{if((e==null?void 0:e.accountType)!=="demo"&&(e!=null&&e.frozen)){V.error("Withdrawal unavailable. Please contact customer support");return}if(i==="bank"&&!p()){g(!0);return}if(i==="crypto"&&!m()){u(!0);return}i==="crypto"?e!=null&&e.trc20:i==="bank"&&`${e==null?void 0:e.bankName}${e==null?void 0:e.accountHolder}${e==null?void 0:e.ibanNumber}`;const l=new Date,P=`${l.getFullYear()}${String(l.getMonth()+1).padStart(2,"0")}${String(l.getDate()).padStart(2,"0")}`,q=Math.floor(Math.random()*1e7).toString().padStart(7,"0"),I=`RE${P}${q}`,B={currency:"USDT",date:new Date,totalAmount:Number(t),orderNo:I,status:"pending",withdrawPassword:r,withdrawAmount:Number(t),withdrawType:i};await d(Y.doCreate(B)),await C()},s=W({resolver:O.yupResolver(J),mode:"onSubmit",defaultValues:{amount:"",withdrawalMethod:"",currency:"USDT",withdrawAddress:"",network:"",fee:0,totalAmount:0,orderNo:""}});return a.jsxs("div",{className:"withdraw-container",children:[a.jsx("div",{className:"header",children:a.jsxs("div",{className:"nav-bar",children:[a.jsx(x,{to:"/profile",className:"back-arrow",children:a.jsx("i",{className:"fas fa-arrow-left"})}),a.jsx("div",{className:"page-title",children:o("pages.withdraw.title")})]})}),a.jsx("div",{className:"content-card",children:a.jsx(Z,{...s,children:a.jsxs("form",{onSubmit:s.handleSubmit(T),children:[a.jsx("input",{type:"hidden",...s.register("currency")}),a.jsx("input",{type:"hidden",...s.register("withdrawAddress")}),a.jsx("input",{type:"hidden",...s.register("network")}),a.jsx("input",{type:"hidden",...s.register("fee")}),a.jsx("input",{type:"hidden",...s.register("totalAmount")}),a.jsx("input",{type:"hidden",...s.register("orderNo")}),a.jsxs("div",{className:"balance-info",children:[a.jsx("i",{className:"fas fa-wallet",style:{marginRight:"8px"}}),o("pages.withdraw.availableBalance")," :"," ",f?a.jsx("span",{className:"balance-placeholder",children:"--"}):`${A.toFixed(2)} USDT`]}),a.jsxs("div",{className:"form-group",children:[a.jsxs("label",{className:"input-label",children:[a.jsx("span",{className:"required-star",children:"*"}),o("pages.withdraw.withdrawAmount")]}),a.jsx(S,{type:"number",name:"amount",placeholder:o("pages.withdraw.amountPlaceholder"),className:"withdraw-input"})]}),a.jsxs("div",{className:"form-group",children:[a.jsxs("label",{className:"input-label",children:[a.jsx("span",{className:"required-star",children:"*"}),o("pages.withdraw.selectMethod")]}),a.jsxs("div",{className:"method-selection",children:[a.jsxs("div",{className:`method-card ${s.watch("withdrawalMethod")==="crypto"?"selected":""}`,onClick:()=>s.setValue("withdrawalMethod","crypto",{shouldValidate:!0}),children:[a.jsx("i",{className:"fab fa-bitcoin method-icon"}),a.jsx("div",{className:"method-label",children:o("pages.withdraw.methods.crypto")}),a.jsx("div",{className:`method-status ${m()?"complete":"incomplete"}`,children:m()?o("pages.withdraw.status.complete"):o("pages.withdraw.status.incomplete")}),a.jsx("div",{className:"method-network-hint",children:o("pages.withdraw.methods.cryptoNetworks")})]}),a.jsxs("div",{className:`method-card ${s.watch("withdrawalMethod")==="bank"?"selected":""}`,onClick:()=>s.setValue("withdrawalMethod","bank",{shouldValidate:!0}),children:[a.jsx("i",{className:"fas fa-university method-icon"}),a.jsx("div",{className:"method-label",children:o("pages.withdraw.methods.bank")}),a.jsx("div",{className:`method-status ${p()?"complete":"incomplete"}`,children:p()?o("pages.withdraw.status.complete"):o("pages.withdraw.status.incomplete")}),a.jsx("div",{className:"method-network-hint",children:o("pages.withdraw.methods.bankNetworks")})]})]}),a.jsx("input",{type:"hidden",...s.register("withdrawalMethod")}),s.formState.errors.withdrawalMethod&&a.jsxs("div",{className:"error-message",children:[a.jsx("i",{className:"fas fa-exclamation-circle"}),s.formState.errors.withdrawalMethod.message]})]}),s.watch("withdrawalMethod")==="crypto"&&m()&&a.jsxs("div",{className:"preview-box",children:[a.jsx("i",{className:"fab fa-bitcoin"}),a.jsx("strong",{children:o("pages.withdraw.withdrawingTo")}),a.jsx("br",{}),a.jsxs("span",{className:"preview-detail",children:[(N=e==null?void 0:e.preferredcoin)==null?void 0:N.toUpperCase(),": ",(y=e==null?void 0:e.trc20)==null?void 0:y.substring(0,12),"..."]})]}),s.watch("withdrawalMethod")==="bank"&&p()&&a.jsxs("div",{className:"preview-box",children:[a.jsx("i",{className:"fas fa-university"}),a.jsx("strong",{children:o("pages.withdraw.withdrawingTo")}),a.jsx("br",{}),a.jsxs("span",{className:"preview-detail",children:[e==null?void 0:e.bankName," - ",e==null?void 0:e.accountHolder]})]}),a.jsxs("div",{className:"form-group",children:[a.jsxs("label",{className:"input-label",children:[a.jsx("span",{className:"required-star",children:"*"}),o("pages.withdraw.withdrawPassword")]}),a.jsx(S,{type:"password",name:"withdrawPassword",placeholder:o("pages.withdraw.withdrawPasswordPlaceholder"),className:"withdraw-input"})]}),a.jsxs("div",{className:"announcement-container",children:[a.jsx("i",{className:"fas fa-volume-high speaker"}),a.jsx("div",{className:"announcement-text",children:o("pages.withdraw.announcement")})]}),a.jsxs("button",{className:"withdraw-button",type:"submit",children:[a.jsx("i",{className:"fas fa-check"}),o("pages.withdraw.confirm")]}),(e==null?void 0:e.accountType)!=="demo"&&(!p()||!m())&&a.jsxs("div",{className:"tip-box",children:[a.jsx("i",{className:"fas fa-info-circle"}),a.jsxs("span",{children:[o("pages.withdraw.completeDetailsIn")," ",a.jsx(x,{to:"/bind-account",className:"tip-link",children:o("pages.bindAccount.title")})," ",o("pages.withdraw.enableAllOptions")]})]})]})})}),a.jsx(z,{visible:b,title:o("pages.withdraw.bankModal.title"),onClose:()=>g(!1),children:a.jsxs("div",{className:"modal-content-centered",children:[a.jsx("i",{className:"fas fa-exclamation-circle modal-warning-icon"}),a.jsx("h3",{className:"modal-subtitle",children:o("pages.withdraw.bankModal.required")}),a.jsx("p",{className:"modal-description",children:o("pages.withdraw.bankModal.description")}),a.jsx("ul",{className:"missing-fields-list",children:$().map((t,r)=>a.jsxs("li",{children:[a.jsx("i",{className:"fas fa-times"})," ",t]},r))}),a.jsxs("div",{className:"modal-actions",children:[a.jsx("button",{className:"modal-cancel-btn",onClick:()=>g(!1),children:o("common.cancel")}),(e==null?void 0:e.accountType)!=="demo"&&a.jsx(x,{to:"/bind-account",className:"modal-action-link",children:a.jsx("button",{className:"modal-action-btn",children:o("pages.withdraw.goToBindAccount")})})]})]})}),a.jsx(z,{visible:M,title:o("pages.withdraw.cryptoModal.title"),onClose:()=>u(!1),children:a.jsxs("div",{className:"modal-content-centered",children:[a.jsx("i",{className:"fas fa-exclamation-circle modal-warning-icon"}),a.jsx("h3",{className:"modal-subtitle",children:o("pages.withdraw.cryptoModal.required")}),a.jsx("p",{className:"modal-description",children:o("pages.withdraw.cryptoModal.description")}),a.jsx("ul",{className:"missing-fields-list",children:D().map((t,r)=>a.jsxs("li",{children:[a.jsx("i",{className:"fas fa-times"})," ",t]},r))}),a.jsxs("div",{className:"modal-actions",children:[a.jsx("button",{className:"modal-cancel-btn",onClick:()=>u(!1),children:o("common.cancel")}),(e==null?void 0:e.accountType)!=="demo"&&a.jsx(x,{to:"/bind-account",className:"modal-action-link",children:a.jsx("button",{className:"modal-action-btn",children:o("pages.withdraw.goToBindAccount")})})]})]})}),a.jsx("style",{children:`
        /* All existing styles remain exactly as in the original component */
        .withdraw-container {
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
        .content-card {
          flex: 1;
          background-color: #1c1c1c;
          border-top-left-radius: 24px;
          border-top-right-radius: 24px;
          padding: 24px 20px;
          border-top: 2px solid #39FF14;
        }
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
        .balance-placeholder {
          opacity: 0.7;
        }
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
        .error-message {
          color: #ff6b6b;
          font-size: 12px;
          margin-top: 4px;
          display: flex;
          align-items: center;
          gap: 4px;
        }
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
        .withdraw-button {
          background-color: #39FF14;
          color: #0f0f0f;
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
          color: #0f0f0f;
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
      `})]})}export{aa as default};
