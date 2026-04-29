import{V as N,j as e,p as F,u as m,q as f,i as p,y as r,k as o,L as x}from"./index-08d76576.js";import{u as z,y as S,F as L}from"./FormErrors-c4df4977.js";import{y as i}from"./yupFormSchemas-9b5af03a.js";import{I as g}from"./InputFormItem-0297965e.js";import{I as M}from"./I18nSelect-482077b5.js";import{u as C}from"./useDispatch-be0b7342.js";const I=N().shape({email:i.string(e("user.fields.username"),{required:!0}).email(e("validation.email")),password:i.string(e("user.fields.password"),{required:!0,min:6}),rememberMe:i.boolean(e("user.fields.rememberMe"))});function q(){const t=C(),u=F(),n=m(f.selectLoading),s=m(f.selectErrorMessage),[b,l]=p.useState(!1),d=z({resolver:S.yupResolver(I),mode:"onSubmit",defaultValues:{email:"",password:"",rememberMe:!0}});p.useEffect(()=>{t(r.doClearErrorMessage())},[t]);const h=({email:a,password:y,rememberMe:v})=>{t(r.doSigninWithEmailAndPassword(a,y,v))},j=()=>{t(r.doDemoLogin())},w=()=>{u.goBack()},k=()=>{l(!0)},c=()=>{l(!1)};return o.jsxs("div",{className:"login-container",children:[o.jsxs("div",{className:"top-bar",children:[o.jsxs("button",{className:"back-button",onClick:w,children:[o.jsx("span",{className:"back-arrow",children:"←"})," Back"]}),o.jsx("button",{className:"icon-button",onClick:k,children:"🌐"})]}),o.jsxs("div",{className:"main-content",children:[o.jsxs("div",{className:"logo",children:[o.jsx("span",{className:"neon",children:"IC"}),o.jsx("span",{className:"white",children:"Markets"}),o.jsx("span",{className:"neon",children:"Global"})]}),o.jsx("div",{className:"heading",children:"Sign in to Secure Client Area"}),o.jsxs(L,{...d,children:[s&&o.jsx("div",{className:"error-message",children:s}),o.jsxs("form",{onSubmit:d.handleSubmit(h),children:[o.jsx(g,{type:"email",name:"email",placeholder:e("auth.fields.emailPlaceholder"),className:"input-field"}),o.jsx(g,{type:"password",name:"password",placeholder:e("auth.fields.passwordPlaceholder"),className:"input-field",autoComplete:"current-password"}),o.jsx("div",{className:"forgot-link",children:o.jsx(x,{to:"/online-service",children:e("auth.signin.forgetPassword")})}),o.jsx("button",{className:"login-button",disabled:n,type:"submit",children:n?o.jsxs(o.Fragment,{children:[o.jsx("i",{className:"fas fa-spinner fa-spin",style:{marginRight:"8px"}}),e("auth.signin.signingIn")]}):e("auth.signin.button")}),o.jsx("button",{className:"demo-login-button",onClick:j,disabled:n,type:"button",children:n?o.jsxs(o.Fragment,{children:[o.jsx("i",{className:"fas fa-spinner fa-spin",style:{marginRight:"8px"}}),"Loading..."]}):" Login to Demo Account"})]})]}),o.jsx(x,{to:"/auth/signup",className:"bottom-text remove_blue",children:o.jsx("p",{children:"Don't have an account?"})})]}),b&&o.jsx("div",{className:"modal-overlay",onClick:c,children:o.jsxs("div",{className:"modal-container-bottom",onClick:a=>a.stopPropagation(),children:[o.jsxs("div",{className:"modal-header-bottom",children:[o.jsx("div",{className:"modal-drag-handle"}),o.jsxs("div",{className:"modal-title-wrapper",children:[o.jsx("div",{className:"modal-title",children:e("auth.common.selectLanguage")}),o.jsx("button",{className:"modal-close-btn-bottom",onClick:c,children:o.jsx("i",{className:"fas fa-times"})})]})]}),o.jsx("div",{className:"modal-content-bottom",children:o.jsx(M,{isInModal:!0})})]})}),o.jsx("style",{children:`
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
      `})]})}export{q as default};
