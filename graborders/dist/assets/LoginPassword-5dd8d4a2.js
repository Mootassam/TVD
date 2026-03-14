import{N as t,j as s,ap as c,u as p,t as f,i as m,k as o,L as g,O as u}from"./index-a23148c8.js";import{y as a}from"./yupFormSchemas-38d196c5.js";import{u as w,y as x,F as b}from"./FormErrors-e6dcc768.js";import{F as r}from"./FieldFormItem-198d9347.js";import{u as h}from"./useDispatch-1da8dfab.js";const P=t().shape({oldPassword:a.string(s("pages.loginPassword.fields.oldPassword"),{required:!0}),newPassword:a.string(s("pages.loginPassword.fields.newPassword"),{required:!0}),newPasswordConfirmation:a.string(s("pages.loginPassword.fields.newPasswordConfirmation"),{required:!0}).oneOf([c("newPassword"),null],s("pages.loginPassword.validation.mustMatch"))});function k(){const i=h();p(f.selectCurrentUser);const[l]=m.useState(()=>({oldPassword:"",newPassword:"",newPasswordConfirmation:""})),e=w({resolver:x.yupResolver(P),mode:"all",defaultValues:l}),d=n=>{i(u.doChangePassword(n.oldPassword,n.newPassword))};return o.jsxs("div",{className:"loginpassword-container",children:[o.jsx("div",{className:"header",children:o.jsxs("div",{className:"nav-bar",children:[o.jsx(g,{to:"/profile",className:"back-arrow",children:o.jsx("i",{className:"fas fa-arrow-left"})}),o.jsx("div",{className:"page-title",children:"Change Login Password"})]})}),o.jsx("div",{className:"content-card",children:o.jsx(b,{...e,children:o.jsx("form",{onSubmit:e.handleSubmit(d),children:o.jsxs("div",{className:"password-form",children:[o.jsx("div",{className:"form-group",children:o.jsx(r,{name:"oldPassword",type:"password",label:s("pages.loginPassword.fields.oldPassword"),className:"form-input",className1:"form-group-inner",className2:"form-label",className3:"password-input-container",placeholder:s("pages.loginPassword.placeholders.oldPassword")})}),o.jsx("div",{className:"form-group",children:o.jsx(r,{name:"newPassword",type:"password",label:s("pages.loginPassword.fields.newPassword"),className:"form-input",className1:"form-group-inner",className2:"form-label",className3:"password-input-container",placeholder:s("pages.loginPassword.placeholders.newPassword")})}),o.jsx("div",{className:"form-group",children:o.jsx(r,{name:"newPasswordConfirmation",type:"password",label:s("pages.loginPassword.fields.newPasswordConfirmation"),className:"form-input",className1:"form-group-inner",className2:"form-label",className3:"password-input-container",placeholder:s("pages.loginPassword.placeholders.confirmPassword")})}),o.jsx("button",{type:"submit",className:"save-button",children:s("pages.loginPassword.buttons.saveChanges")}),o.jsxs("div",{className:"warning-message",children:[o.jsx("i",{className:"fas fa-exclamation-circle"}),s("pages.loginPassword.warningMessage")]})]})})})}),o.jsx("style",{children:`
        /* Main container – matches login/profile/proof containers */
        .loginpassword-container {
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
          color: #000000;
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

        /* Warning message */
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
      `})]})}export{k as default};
