import{N as y,j as e,q as N,u as d,t as m,i as f,O as p,k as o,L as x}from"./index-a23148c8.js";import{u as F,y as z,F as M}from"./FormErrors-e6dcc768.js";import{y as n}from"./yupFormSchemas-38d196c5.js";import{I as g}from"./InputFormItem-accaa65b.js";import{I as S}from"./I18nSelect-edbcdc43.js";import{u as C}from"./useDispatch-1da8dfab.js";const I=y().shape({email:n.string(e("user.fields.username"),{required:!0}).email(e("validation.email")),password:n.string(e("user.fields.password"),{required:!0,min:6}),rememberMe:n.boolean(e("user.fields.rememberMe"))});function O(){const t=C(),u=N(),r=d(m.selectLoading),i=d(m.selectErrorMessage),[b,s]=f.useState(!1),l=F({resolver:z.yupResolver(I),mode:"onSubmit",defaultValues:{email:"",password:"",rememberMe:!0}});f.useEffect(()=>{t(p.doClearErrorMessage())},[t]);const h=({email:a,password:v,rememberMe:w})=>{t(p.doSigninWithEmailAndPassword(a,v,w))},j=()=>{u.goBack()},k=()=>{s(!0)},c=()=>{s(!1)};return o.jsxs("div",{className:"login-container",children:[o.jsxs("div",{className:"top-bar",children:[o.jsxs("button",{className:"back-button",onClick:j,children:[o.jsx("span",{className:"back-arrow",children:"←"})," Back"]}),o.jsx("button",{className:"icon-button",onClick:k,children:"🌐"})]}),o.jsxs("div",{className:"main-content",children:[o.jsxs("div",{className:"logo",children:[o.jsx("span",{className:"neon",children:"IC"}),o.jsx("span",{className:"white",children:"Markets"}),o.jsx("span",{className:"neon",children:"Global"})]}),o.jsx("div",{className:"heading",children:"Sign in to Secure Client Area"}),o.jsxs(M,{...l,children:[i&&o.jsx("div",{className:"error-message",children:i}),o.jsxs("form",{onSubmit:l.handleSubmit(h),children:[o.jsx(g,{type:"email",name:"email",placeholder:e("auth.fields.emailPlaceholder"),className:"input-field"}),o.jsx(g,{type:"password",name:"password",placeholder:e("auth.fields.passwordPlaceholder"),className:"input-field",autoComplete:"current-password"}),o.jsx("div",{className:"forgot-link",children:o.jsx(x,{to:"/online-service",children:e("auth.signin.forgetPassword")})}),o.jsx("button",{className:"login-button",disabled:r,type:"submit",children:r?o.jsxs(o.Fragment,{children:[o.jsx("i",{className:"fas fa-spinner fa-spin",style:{marginRight:"8px"}}),e("auth.signin.signingIn")]}):e("auth.signin.button")})]})]}),o.jsx(x,{to:"/auth/signup",className:"bottom-text remove_blue",children:o.jsx("p",{children:"Don't have an account?"})})]}),b&&o.jsx("div",{className:"modal-overlay",onClick:c,children:o.jsxs("div",{className:"modal-container-bottom",onClick:a=>a.stopPropagation(),children:[o.jsxs("div",{className:"modal-header-bottom",children:[o.jsx("div",{className:"modal-drag-handle"}),o.jsxs("div",{className:"modal-title-wrapper",children:[o.jsx("div",{className:"modal-title",children:e("auth.common.selectLanguage")}),o.jsx("button",{className:"modal-close-btn-bottom",onClick:c,children:o.jsx("i",{className:"fas fa-times"})})]})]}),o.jsx("div",{className:"modal-content-bottom",children:o.jsx(S,{isInModal:!0})})]})}),o.jsx("style",{children:`
        .login-container {
          max-width: 430px;
          margin: 0 auto;
          min-height: 100vh;
          background-color: #000000;
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
          padding-top: 0; /* already have top bar padding */
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
          color: #000000;
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
          max-width: 430px;
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
          max-height: 60vh;
          overflow-y: auto;
        }
      `})]})}export{O as default};
