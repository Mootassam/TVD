import{V as N,j as e,p as F,u as m,q as f,i as x,y as r,k as o,L as s}from"./index-06606010.js";import{u as S,y as z,F as L}from"./FormErrors-1826fada.js";import{y as i}from"./yupFormSchemas-2ff3bbb9.js";import{I as g}from"./InputFormItem-081ff3b7.js";import{I as E}from"./I18nSelect-9b3267ca.js";import{u as M}from"./useDispatch-648acaba.js";const C=N().shape({email:i.string(e("user.fields.username"),{required:!0}).email(e("validation.email")),password:i.string(e("user.fields.password"),{required:!0,min:6}),rememberMe:i.boolean(e("user.fields.rememberMe"))});function O(){const t=M(),b=F(),a=m(f.selectLoading),l=m(f.selectErrorMessage),[u,d]=x.useState(!1),c=S({resolver:z.yupResolver(C),mode:"onSubmit",defaultValues:{email:"",password:"",rememberMe:!0}});x.useEffect(()=>{t(r.doClearErrorMessage())},[t]);const h=({email:n,password:w,rememberMe:k})=>{t(r.doSigninWithEmailAndPassword(n,w,k))},y=()=>{t(r.doDemoLogin())},j=()=>{b.goBack()},v=()=>{d(!0)},p=()=>{d(!1)};return o.jsxs("div",{className:"login-container",children:[o.jsxs("div",{className:"top-bar",children:[o.jsxs("button",{className:"back-button",onClick:j,children:[o.jsx("span",{className:"back-arrow",children:"←"})," Back"]}),o.jsx("button",{className:"icon-button",onClick:v,children:"🌐"})]}),o.jsxs("div",{className:"main-content",children:[o.jsxs("div",{className:"logo",children:[o.jsx("span",{className:"neon",children:"IC"}),o.jsx("span",{className:"white",children:"Markets"}),o.jsx("span",{className:"neon",children:"Global"})]}),o.jsx("div",{className:"heading",children:"Sign in to Secure Client Area"}),o.jsxs(L,{...c,children:[l&&o.jsx("div",{className:"error-message",children:l}),o.jsxs("form",{onSubmit:c.handleSubmit(h),children:[o.jsx(g,{type:"email",name:"email",placeholder:e("auth.fields.emailPlaceholder"),className:"input-field"}),o.jsx(g,{type:"password",name:"password",placeholder:e("auth.fields.passwordPlaceholder"),className:"input-field",autoComplete:"current-password"}),o.jsx("div",{className:"forgot-link",children:o.jsx(s,{to:"/online-service",children:e("auth.signin.forgetPassword")})}),o.jsx("button",{className:"login-button",disabled:a,type:"submit",children:a?o.jsxs(o.Fragment,{children:[o.jsx("i",{className:"fas fa-spinner fa-spin",style:{marginRight:"8px"}}),e("auth.signin.signingIn")]}):e("auth.signin.button")}),o.jsx("button",{className:"demo-login-button",onClick:y,disabled:a,type:"button",children:a?o.jsxs(o.Fragment,{children:[o.jsx("i",{className:"fas fa-spinner fa-spin",style:{marginRight:"8px"}}),"Loading..."]}):" Login to Demo Account"})]})]}),o.jsx(s,{to:"/auth/signup",className:"bottom-text remove_blue",children:o.jsx("p",{children:"Don't have an account?"})}),o.jsxs("div",{className:"playstore-section",children:[o.jsxs("div",{className:"playstore-divider",children:[o.jsx("span",{className:"divider-line"}),o.jsx("span",{className:"divider-text",children:"Get the app"}),o.jsx("span",{className:"divider-line"})]}),o.jsx(s,{to:"/playgoogle",target:"_blank",rel:"noopener noreferrer",className:"playstore-badge",children:o.jsx("img",{src:"https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png?hl=fr",alt:"Get it on Google Play",className:"playstore-img"})})]})]}),u&&o.jsx("div",{className:"modal-overlay",onClick:p,children:o.jsxs("div",{className:"modal-container-bottom",onClick:n=>n.stopPropagation(),children:[o.jsxs("div",{className:"modal-header-bottom",children:[o.jsx("div",{className:"modal-drag-handle"}),o.jsxs("div",{className:"modal-title-wrapper",children:[o.jsx("div",{className:"modal-title",children:e("auth.common.selectLanguage")}),o.jsx("button",{className:"modal-close-btn-bottom",onClick:p,children:o.jsx("i",{className:"fas fa-times"})})]})]}),o.jsx("div",{className:"modal-content-bottom",children:o.jsx(E,{isInModal:!0})})]})}),o.jsx("style",{children:`
        .login-container {
          max-width: 400px;
          margin: 0 auto;
          min-height: 100vh;
          background-color: #0f0f0f;
          border-top: 2px solid #39FF14;
          display: flex;
          flex-direction: column;
          box-sizing: border-box;
        }

        .top-bar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 16px 20px;
          flex-shrink: 0;
        }

        .back-button {
          background: none;
          border: none;
          color: #ffffff;
          font-size: 16px;
          cursor: pointer;
          padding: 0;
          display: flex;
          align-items: center;
          gap: 4px;
        }
        .back-button:hover {
          color: #39FF14;
        }
        .back-arrow {
          font-size: 20px;
          line-height: 1;
        }

        .icon-button {
          background: none;
          border: none;
          color: #ffffff;
          font-size: 24px;
          cursor: pointer;
          padding: 0;
          line-height: 1;
        }
        .icon-button:hover {
          color: #39FF14;
        }

        .main-content {
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 20px;
          padding-top: 0;
        }

        .logo {
          font-size: 32px;
          font-weight: bold;
          margin-bottom: 20px;
          text-align: center;
        }
        .logo .neon {
          color: #39FF14;
        }
        .logo .white {
          color: #ffffff;
        }

        .heading {
          color: #ffffff;
          font-size: 18px;
          text-align: center;
          margin-bottom: 30px;
          font-weight: 400;
        }

        .input-field {
          background-color: #1c1c1c;
          border: 1px solid #2a2a2a;
          border-radius: 6px;
          height: 48px;
          width: 100%;
          padding: 0 16px;
          color: #ffffff;
          font-size: 16px;
          outline: none;
          margin-bottom: 16px;
          box-sizing: border-box;
        }
        .input-field:focus {
          border-color: #39FF14;
        }
        .input-field::placeholder {
          color: #777777;
        }

        .forgot-link {
          text-align: right;
          margin-bottom: 20px;
        }
        .forgot-link a {
          color: #39FF14;
          text-decoration: none;
          font-size: 14px;
        }
        .forgot-link a:hover {
          text-decoration: underline;
        }

        .login-button {
          background-color: #39FF14;
          color: #0f0f0f;
          font-weight: bold;
          height: 50px;
          width: 100%;
          border: none;
          border-radius: 6px;
          font-size: 16px;
          cursor: pointer;
          margin-bottom: 30px;
          transition: background-color 0.2s;
        }
        .login-button:hover {
          background-color: #2ecc10;
        }
        .login-button:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        /* New Demo Login Button Style */
        .demo-login-button {
          background: linear-gradient(135deg, #FF6838 0%, #FF8C42 100%);
          color: white;
          font-weight: bold;
          height: 50px;
          width: 100%;
          border: none;
          border-radius: 8px;
          font-size: 16px;
          cursor: pointer;
          margin-bottom: 20px;
          transition: transform 0.2s, box-shadow 0.2s;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          box-shadow: 0 4px 12px rgba(255, 104, 56, 0.3);
        }
        .demo-login-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 16px rgba(255, 104, 56, 0.4);
        }
        .demo-login-button:disabled {
          opacity: 0.6;
          cursor: not-allowed;
          transform: none;
          box-shadow: none;
        }

        .bottom-text {
          color: #ffffff;
          text-align: center;
          font-size: 14px;
        }
        .bottom-text p {
          margin: 5px 0;
        }
        .bottom-text a {
          color: #ffffff;
          text-decoration: none;
          margin: 0 5px;
        }
        .bottom-text a:hover {
          text-decoration: underline;
        }
        .separator {
          color: #ffffff;
          margin: 0 5px;
        }

        .error-message {
          color: #ff6b6b;
          text-align: center;
          margin-bottom: 16px;
          padding: 8px;
          background-color: #2a2a2a;
          border-radius: 4px;
          font-size: 14px;
        }

        /* ---------- NEW PLAY STORE STYLES ---------- */
        .playstore-section {
          margin-top: 30px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 12px;
        }

        .playstore-divider {
          display: flex;
          align-items: center;
          gap: 12px;
          width: 100%;
          color: #777;
          font-size: 13px;
        }

        .divider-line {
          flex: 1;
          height: 1px;
          background: #2a2a2a;
        }

        .playstore-badge {
          display: inline-block;
          transition: transform 0.2s, box-shadow 0.2s;
        }

        .playstore-badge:hover {
          transform: scale(1.05);
          box-shadow: 0 0 15px rgba(57, 255, 20, 0.3);
          border-radius: 8px;
        }

        .playstore-img {
          height: 65px;
          display: block;
        }

        .playstore-link {
          color: #39FF14;
          font-size: 13px;
          text-decoration: none;
        }

        .playstore-link:hover {
          text-decoration: underline;
        }
        /* ---------- END OF PLAY STORE STYLES ---------- */

        /* Modal styles */
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: rgba(0, 0, 0, 0.7);
          display: flex;
          align-items: flex-end;
          justify-content: center;
          z-index: 1000;
        }
        .modal-container-bottom {
          background-color: #1c1c1c;
          width: 100%;
          max-width: 400px;
          border-top-left-radius: 16px;
          border-top-right-radius: 16px;
          padding: 16px;
          box-sizing: border-box;
          color: #ffffff;
        }
        .modal-header-bottom {
          margin-bottom: 16px;
        }
        .modal-drag-handle {
          width: 40px;
          height: 4px;
          background-color: #2a2a2a;
          border-radius: 2px;
          margin: 0 auto 16px;
        }
        .modal-title-wrapper {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .modal-title {
          font-size: 18px;
          font-weight: bold;
          color: #ffffff;
        }
        .modal-close-btn-bottom {
          background: none;
          border: none;
          color: #ffffff;
          font-size: 20px;
          cursor: pointer;
          padding: 4px;
        }
        .modal-close-btn-bottom:hover {
          color: #39FF14;
        }
        .modal-content-bottom {
          overflow-y: auto;
        }
      `})]})}export{O as default};
