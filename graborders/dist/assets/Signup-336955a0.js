import{t as E,u as j,v as N,i as t,ab as v,X as A,j as a,aa as I,Z as P,k as e,L as k,a8 as B,a9 as R}from"./index-680400b2.js";import{u as O,y as T,F as Y}from"./FormErrors-ac5f9122.js";import{y as d}from"./yupFormSchemas-9e97c356.js";import{I as l}from"./InputFormItem-b434e9bf.js";import{I as q}from"./I18nSelect-18206cd8.js";import{u as D}from"./useDispatch-cbb2647c.js";function G(){const c=D(),u=E(),m=j(N.selectLoading),x=j(N.selectErrorMessage);t.useState(!1);const[h,C]=t.useState(""),[g,f]=t.useState(!1),[F,b]=t.useState(""),n=()=>{const o=R(),s=B();if(!Array.isArray(s)){b("");return}const r=Object.fromEntries(s.map(p=>[p.id,p.label]));b(r[o]||"")};t.useEffect(()=>{w(),n();const o=setInterval(n,500),s=()=>n();return window.addEventListener("focus",s),()=>{clearInterval(o),window.removeEventListener("focus",s)}},[]),t.useEffect(()=>{c(v.doClearErrorMessage())},[c]),t.useEffect(()=>{g||setTimeout(n,100)},[g]);const L=A().shape({email:d.string(a("pages.signup.labels.email"),{required:!0}),password:d.string(a("pages.signup.labels.password"),{required:!0,min:8}),newPasswordConfirmation:d.string(a("pages.signup.labels.confirmPassword"),{required:!0}).oneOf([I("password"),null],a("auth.passwordChange.mustMatch")),phoneNumber:d.string(a("pages.signup.labels.phoneNumber"),{required:!0}),captcha:P().required(a("pages.signup.labels.captcha")).test("captcha-match",a("pages.signup.captchaMismatch"),function(o){return o===h})}),i=O({resolver:T.yupResolver(L),mode:"onSubmit",defaultValues:{email:"",password:"",newPasswordConfirmation:"",phoneNumber:"",captcha:""}}),w=t.useCallback(()=>{const o="ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";let s="";for(let r=0;r<6;r++)s+=o.charAt(Math.floor(Math.random()*o.length));C(s),i.setValue("captcha",""),i.clearErrors("captcha")},[i]),S=t.useCallback(o=>{const{email:s,password:r,phoneNumber:p}=o;c(v.doRegisterEmailAndPassword(s,r,p))},[c]),M=t.useCallback(()=>{u.goBack()},[u]),z=()=>{f(!0)},y=()=>{f(!1),setTimeout(n,100)};return e.jsxs("div",{style:{backgroundColor:"#ffffff",minHeight:"100vh"},children:[e.jsxs("div",{className:"header",children:[e.jsxs("button",{className:"back-button",onClick:M,children:[e.jsx("span",{className:"back-arrow",children:"←"}),e.jsx("span",{children:a("pages.signup.title")})]}),e.jsx("div",{className:"language-selector-modal",onClick:z,children:e.jsxs("div",{className:"language-display",children:[F||a("common.selectLanguage"),e.jsx("i",{className:"fas fa-chevron-down"})]})})]}),e.jsx("div",{className:"containera",children:e.jsxs(Y,{...i,children:[x&&e.jsx("div",{className:"error-message",style:{color:"red",textAlign:"center",marginBottom:"1rem",padding:"0.5rem",backgroundColor:"#ffe6e6",borderRadius:"4px"},children:x}),e.jsxs("form",{onSubmit:i.handleSubmit(S),children:[e.jsxs("div",{className:"form-group",children:[e.jsx("label",{className:"form-label",children:a("pages.signup.labels.email")}),e.jsx(l,{type:"email",name:"email",placeholder:a("pages.signup.placeholders.email"),className:"form-input",externalErrorMessage:null,autoComplete:"email"})]}),e.jsxs("div",{className:"form-group",children:[e.jsx("label",{className:"form-label",children:a("pages.signup.labels.phoneNumber")}),e.jsx(l,{type:"tel",name:"phoneNumber",placeholder:a("pages.signup.placeholders.phoneNumber"),className:"form-input",autoComplete:"tel"})]}),e.jsxs("div",{className:"form-group",children:[e.jsx("label",{className:"form-label",children:a("pages.signup.labels.captcha")}),e.jsxs("div",{className:"captcha-container",children:[e.jsxs("div",{className:"captcha-display",onClick:w,children:[e.jsx("div",{className:"captcha-text",children:h}),e.jsxs("div",{className:"refresh-captcha",children:[e.jsx("i",{className:"fas fa-sync-alt"}),e.jsx("span",{className:"refresh-text",children:a("pages.signup.refresh")})]})]}),e.jsx(l,{type:"text",name:"captcha",placeholder:a("pages.signup.placeholders.captcha"),className:"form-input"})]})]}),e.jsxs("div",{className:"form-group",children:[e.jsx("label",{className:"form-label",children:a("pages.signup.labels.password")}),e.jsx(l,{type:"password",name:"password",placeholder:a("pages.signup.placeholders.password"),className:"form-input",autoComplete:"new-password"})]}),e.jsxs("div",{className:"form-group",children:[e.jsx("label",{className:"form-label",children:a("pages.signup.labels.confirmPassword")}),e.jsx(l,{type:"password",name:"newPasswordConfirmation",placeholder:a("pages.signup.placeholders.confirmPassword"),className:"form-input",autoComplete:"new-password"})]}),e.jsx("button",{className:"login-button",disabled:m,type:"submit",style:{opacity:m?.6:1},children:m?e.jsxs("span",{children:[e.jsx("i",{className:"fas fa-spinner fa-spin",style:{marginRight:"8px"}}),a("pages.signup.creatingAccount")]}):e.jsx("span",{children:a("pages.signup.createAccount")})}),e.jsx("div",{className:"footer",children:e.jsx(k,{to:"/auth/signin",className:"forgot-password",children:a("pages.signup.alreadyHaveAccount")})}),e.jsx("div",{className:"terms-section",style:{textAlign:"center",marginTop:"20px",padding:"0 16px",color:"#666",fontSize:"12px"},children:e.jsxs("p",{children:[a("pages.signup.terms.text")," ",e.jsx(k,{to:"/terms",style:{color:"#106cf5",textDecoration:"none"},children:a("pages.signup.terms.link")})]})})]})]})}),g&&e.jsx("div",{className:"modal-overlay",onClick:y,children:e.jsxs("div",{className:"modal-container-bottom",onClick:o=>o.stopPropagation(),children:[e.jsxs("div",{className:"modal-header-bottom",children:[e.jsx("div",{className:"modal-drag-handle"}),e.jsxs("div",{className:"modal-title-wrapper",children:[e.jsx("div",{className:"modal-title",children:a("common.selectLanguage")}),e.jsx("button",{className:"modal-close-btn-bottom",onClick:y,children:e.jsx("i",{className:"fas fa-times"})})]})]}),e.jsx("div",{className:"modal-content-bottom",children:e.jsx(q,{isInModal:!0})})]})}),e.jsx("style",{children:`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
        }

        /* Header Styles */
        .header {
          background-color: #007AFF;
          color: white;
          padding: 16px 20px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          max-width: 400px;
          margin: 0 auto;
          box-shadow: 0 2px 8px rgba(0, 122, 255, 0.15);
        }

        .back-button {
          display: flex;
          align-items: center;
          gap: 8px;
          background: none;
          border: none;
          color: white;
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
        }

        .back-arrow {
          font-size: 20px;
          font-weight: 300;
        }

        /* New Language Selector Modal Style */
        .language-selector-modal {
          background: rgba(255, 255, 255, 0.2);
          border: none;
          border-radius: 6px;
          padding: 6px 12px;
          color: white;
          font-size: 14px;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 6px;
          transition: all 0.2s ease;
          user-select: none;
          min-width: 80px;
          justify-content: center;
        }

        .language-selector-modal:hover {
          background: rgba(255, 255, 255, 0.3);
          transform: translateY(-1px);
        }

        .language-display {
          display: flex;
          align-items: center;
          gap: 6px;
          font-weight: 500;
        }

        .language-display i {
          font-size: 10px;
          transition: transform 0.2s ease;
        }

        .language-selector-modal:hover .language-display i {
          transform: translateY(1px);
        }

        /* Main Content */
        .containera {
          max-width: 400px;
          margin: 40px auto;
          padding: 0 20px;
          flex: 1;
          width: 100%;
          background-color: #ffffff;
        }

        /* Form Styles */
        .form-group {
          margin-bottom: 24px;
        }

        .form-label {
          display: block;
          margin-bottom: 8px;
          font-weight: 500;
          color: #1D1D1F;
          font-size: 14px;
        }

        .form-input {
          width: 100%;
          padding: 16px;
          background-color: #f8f9fa;
          border: 2px solid transparent;
          border-radius: 7px;
          font-size: 14px;
          transition: all 0.2s ease;
          border: none;
          outline: none;
        }

        .form-input:focus {
          outline: none;
          background-color: white;
          border-color: #007AFF;
          box-shadow: 0 0 0 4px rgba(0, 122, 255, 0.1);
        }

        .form-input::placeholder {
          color: #8E8E93;
        }

        /* Captcha Styles */
        .captcha-container {
          display: flex;
          gap: 12px;
          align-items: center;
        }

        .captcha-display {
          flex: 1;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border-radius: 7px;
          padding: 10px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          cursor: pointer;
        }

        .captcha-text {
          color: white;
          font-size: 20px;
          font-weight: bold;
          letter-spacing: 2px;
          font-family: 'Courier New', monospace;
        }

        .refresh-captcha {
          color: white;
          font-size: 14px;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        /* Buttons */
        .login-button {
          width: 100%;
          background-color: #007AFF;
          color: white;
          border: none;
          border-radius: 7px;
          padding: 12px;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
          margin-bottom: 16px;
        }

        .login-button:hover:not(:disabled) {
          background-color: #0056CC;
          transform: translateY(-1px);
        }

        .login-button:disabled {
          cursor: not-allowed;
        }

        /* Footer */
        .footer {
          text-align: center;
          margin-top: 24px;
        }

        .forgot-password {
          color: #007AFF;
          text-decoration: none;
          font-size: 15px;
          font-weight: 500;
        }

        .forgot-password:hover {
          text-decoration: underline;
        }

        /* Responsive */
        @media (max-width: 480px) {
          .containera {
            margin: 20px auto;
          }
          
          .header {
            padding: 12px 16px;
          }
          
          .form-input {
            padding: 14px;
          }
          
          .login-button {
            padding: 14px;
          }

          .captcha-container {
            flex-direction: column;
            gap: 12px;
          }

          .captcha-display {
            width: 100%;
          }

          .language-selector-modal {
            padding: 5px 10px;
            min-width: 70px;
          }
        }

        /* Input Form Item Override */
        .text-input {
          width: 100%;
          padding: 16px;
          background-color: #f8f9fa;
          border: 2px solid transparent;
          border-radius: 7px;
          font-size: 14px;
          transition: all 0.2s ease;
          border: none;
          outline: none;
        }

        .text-input:focus {
          outline: none;
          background-color: white;
          border-color: #007AFF;
          box-shadow: 0 0 0 4px rgba(0, 122, 255, 0.1);
        }

        .text-input::placeholder {
          color: #8E8E93;
        }

        /* Modal Styles for Language Selection */
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: rgba(0, 0, 0, 0.5);
          backdrop-filter: blur(4px);
          display: flex;
          align-items: flex-end;
          justify-content: center;
          z-index: 1000;
          animation: fadeIn 0.3s ease;
        }

        .modal-container-bottom {
          background: white;
          border-radius: 24px 24px 0 0;
          width: 100%;
          max-width: 400px;
          max-height: 85vh;
          overflow: hidden;
          box-shadow: 0 -10px 40px rgba(0, 0, 0, 0.15);
          animation: slideUpFromBottom 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          display: flex;
          flex-direction: column;
          margin: 0 auto;
        }

        .modal-header-bottom {
          padding: 16px 20px 8px 20px;
          border-bottom: 1px solid #eef2f7;
          position: relative;
        }

        .modal-drag-handle {
          width: 40px;
          height: 4px;
          background: #ddd;
          border-radius: 2px;
          margin: 0 auto 12px auto;
        }

        .modal-title-wrapper {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 8px;
        }

        .modal-title {
          font-size: 17px;
          font-weight: 700;
          color: #222;
          flex: 1;
          padding-right: 10px;
        }

        .modal-close-btn-bottom {
          background: #f5f7fa;
          border: none;
          color: #666;
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
          flex-shrink: 0;
        }

        .modal-close-btn-bottom:hover {
          background: #eef2f7;
          color: #333;
        }

        .modal-content-bottom {
          flex: 1;
          overflow-y: auto;
          padding: 0;
          max-height: calc(85vh - 100px);
        }

        /* Animations */
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

        @media (max-width: 480px) {
          .modal-container-bottom {
            max-height: 90vh;
          }

          .modal-header-bottom {
            padding: 12px 16px 6px 16px;
          }

          .modal-title {
            font-size: 16px;
          }

          .modal-drag-handle {
            width: 36px;
            height: 3px;
            margin-bottom: 10px;
          }
        }
      `})]})}export{G as default};
