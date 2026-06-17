import{u as g,q as x,i as e,j as a,at as h,W as b,k as s,L as P,V as N}from"./index-97f8229a.js";import{u as v,y as F,F as j}from"./FormErrors-e6042c05.js";import{F as n}from"./FieldFormItem-1cada2f9.js";import{y as d}from"./yupFormSchemas-cf7b023e.js";import{u as y}from"./useDispatch-498bb1c1.js";function I(){const l=y(),i=g(x.selectCurrentUser),[o,c]=e.useState(!1);e.useEffect(()=>{i&&c(!!i.withdrawPassword)},[i]);const p=e.useMemo(()=>{const r={newPassword:d.string(a("pages.withdrawPassword.fields.newPassword"),{required:!0}),newPasswordConfirmation:d.string(a("pages.withdrawPassword.fields.newPasswordConfirmation"),{required:!0}).oneOf([h("newPassword"),null],a("pages.withdrawPassword.validation.mustMatch"))};return o&&(r.oldPassword=d.string(a("pages.withdrawPassword.fields.oldPassword"),{required:!0})),b().shape(r)},[o]),f=e.useMemo(()=>({oldPassword:"",newPassword:"",newPasswordConfirmation:""}),[]),t=v({resolver:F.yupResolver(p),mode:"all",defaultValues:f}),w=r=>{const u={oldPassword:o?r.oldPassword:void 0,newPassword:r.newPassword};l(N.doUpdateWithdrawPassword(u))},m=o?"Change Withdraw Password":"Set Withdraw Password";return s.jsxs("div",{className:"withdrawpassword-container",children:[s.jsx("div",{className:"header",children:s.jsxs("div",{className:"nav-bar",children:[s.jsx(P,{to:"/passwordtype",className:"back-arrow",children:s.jsx("i",{className:"fas fa-arrow-left"})}),s.jsx("div",{className:"page-title",children:m})]})}),s.jsx("div",{className:"content-card",children:s.jsx(j,{...t,children:s.jsx("form",{onSubmit:t.handleSubmit(w),children:s.jsxs("div",{className:"password-form",children:[o&&s.jsx("div",{className:"form-group",children:s.jsx(n,{name:"oldPassword",type:"password",label:a("pages.withdrawPassword.fields.oldPassword"),className:"form-input",className1:"form-group-inner",className2:"form-label",className3:"password-input-container",placeholder:a("pages.withdrawPassword.placeholders.oldPassword")})}),s.jsx("div",{className:"form-group",children:s.jsx(n,{name:"newPassword",type:"password",label:a("pages.withdrawPassword.fields.newPassword"),className:"form-input",className1:"form-group-inner",className2:"form-label",className3:"password-input-container",placeholder:a("pages.withdrawPassword.placeholders.newPassword")})}),s.jsx("div",{className:"form-group",children:s.jsx(n,{name:"newPasswordConfirmation",type:"password",label:a("pages.withdrawPassword.fields.newPasswordConfirmation"),className:"form-input",className1:"form-group-inner",className2:"form-label",className3:"password-input-container",placeholder:a("pages.withdrawPassword.placeholders.confirmPassword")})}),s.jsx("button",{type:"submit",className:"save-button",children:o?a("pages.withdrawPassword.buttons.saveChanges"):a("pages.withdrawPassword.buttons.setPassword")}),!o&&s.jsxs("div",{className:"info-message",children:[s.jsx("i",{className:"fas fa-info-circle"}),a("pages.withdrawPassword.infoMessage")]}),o&&s.jsxs("div",{className:"warning-message",children:[s.jsx("i",{className:"fas fa-exclamation-circle"}),a("pages.withdrawPassword.warningMessage")]})]})})})}),s.jsx("style",{children:`
        /* Main container – matches login/profile/proof containers */
        .withdrawpassword-container {
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

        /* Password form container */
        .password-form {
          display: flex;
          flex-direction: column;
        }

        /* Form group wrapper */
        .form-group {
          width: 100%;
        }

        /* Inner container for each field (className1) */
        .form-group-inner {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        /* Label style (className2) */
        .form-label {
          font-size: 14px;
          color: #ffffff;
          margin-bottom: 4px;
        }

        /* Password input container (className3) – can be used for positioning, but we'll focus on the input */
        .password-input-container {
          width: 100%;
        }

        /* Input field (className) */
        .form-input {
          background-color: #1c1c1c;
          border: 1px solid #2a2a2a;
          border-radius: 6px;
          height: 48px;
          width: 100%;
          padding: 0 16px;
          color: #ffffff;
          font-size: 16px;
          outline: none;
          box-sizing: border-box;
        }
        .form-input:focus {
          border-color: #39FF14;
        }
        .form-input::placeholder {
          color: #777777;
        }

        /* Error message styling (if FieldFormItem displays errors) */
        .form-group .error-message {
          color: #ff6b6b;
          font-size: 12px;
          margin-top: 4px;
        }

        /* Save button – matches login button */
        .save-button {
          background-color: #39FF14;
          color: #0f0f0f;
          font-weight: bold;
          height: 50px;
          width: 100%;
          border: none;
          border-radius: 6px;
          font-size: 16px;
          cursor: pointer;
          transition: background-color 0.2s;
          margin-top: 8px;
        }
        .save-button:hover {
          background-color: #2ecc10;
        }
        .save-button:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        /* Warning message (for existing password) */
        .warning-message {
          background-color: #2a2a2a;
          border-left: 4px solid #ffaa00;
          padding: 12px 16px;
          border-radius: 8px;
          font-size: 14px;
          color: #ffffff;
          display: flex;
          align-items: center;
          gap: 10px;
          margin-top: 16px;
        }
        .warning-message i {
          color: #ffaa00;
          font-size: 18px;
        }

        /* Info message (for setting new password) */
        .info-message {
          background-color: #2a2a2a;
          border-left: 4px solid #39FF14;
          padding: 12px 16px;
          border-radius: 8px;
          font-size: 14px;
          color: #ffffff;
          display: flex;
          align-items: center;
          gap: 10px;
          margin-top: 16px;
        }
        .info-message i {
          color: #39FF14;
          font-size: 18px;
        }
      `})]})}export{I as default};
