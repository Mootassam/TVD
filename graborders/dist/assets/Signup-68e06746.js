import{q as w,u as h,t as g,i as l,O as f,N as y,j as a,ap as v,S as F,k as e,L as k}from"./index-3c390b80.js";import{u as C,y as z,F as S}from"./FormErrors-d19bd6fc.js";import{y as c}from"./yupFormSchemas-73599a06.js";import{I as o}from"./InputFormItem-0ad7c3ce.js";import{u as E}from"./useDispatch-f272d96f.js";function I(){const i=E();w();const p=h(g.selectLoading),d=h(g.selectErrorMessage),[u,x]=l.useState("");l.useEffect(()=>{m(),i(f.doClearErrorMessage())},[i]);const b=y().shape({email:c.string(a("pages.signup.labels.email"),{required:!0}),password:c.string(a("pages.signup.labels.password"),{required:!0,min:8}),newPasswordConfirmation:c.string(a("pages.signup.labels.confirmPassword"),{required:!0}).oneOf([v("password"),null],a("auth.passwordChange.mustMatch")),phoneNumber:c.string(a("pages.signup.labels.phoneNumber"),{required:!0}),captcha:F().required(a("pages.signup.labels.captcha")).test("captcha-match",a("pages.signup.captchaMismatch"),function(s){return s===u})}),r=C({resolver:z.yupResolver(b),mode:"onSubmit",defaultValues:{email:"",password:"",newPasswordConfirmation:"",phoneNumber:"",captcha:""}}),m=l.useCallback(()=>{const s="ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";let n="";for(let t=0;t<6;t++)n+=s.charAt(Math.floor(Math.random()*s.length));x(n),r.setValue("captcha",""),r.clearErrors("captcha")},[r]),j=l.useCallback(s=>{const{email:n,password:t,phoneNumber:N}=s;i(f.doRegisterEmailAndPassword(n,t,N))},[i]);return e.jsxs("div",{className:"signup-container",children:[e.jsx("div",{className:"heading",children:"Create your account"}),e.jsx("div",{className:"main-content",children:e.jsxs(S,{...r,children:[d&&e.jsx("div",{className:"error-message",children:d}),e.jsxs("form",{onSubmit:r.handleSubmit(j),children:[e.jsxs("div",{className:"form-group",children:[e.jsx("label",{className:"form-label",children:a("pages.signup.labels.email")}),e.jsx(o,{type:"email",name:"email",placeholder:a("pages.signup.placeholders.email"),className:"input-field",externalErrorMessage:null,autoComplete:"email"})]}),e.jsxs("div",{className:"form-group",children:[e.jsx("label",{className:"form-label",children:a("pages.signup.labels.phoneNumber")}),e.jsx(o,{type:"tel",name:"phoneNumber",placeholder:a("pages.signup.placeholders.phoneNumber"),className:"input-field",autoComplete:"tel"})]}),e.jsxs("div",{className:"form-group",children:[e.jsx("label",{className:"form-label",children:a("pages.signup.labels.captcha")}),e.jsxs("div",{className:"captcha-container",children:[e.jsxs("div",{className:"captcha-display",onClick:m,children:[e.jsx("div",{className:"captcha-text",children:u}),e.jsxs("div",{className:"refresh-captcha",children:[e.jsx("i",{className:"fas fa-sync-alt"}),e.jsx("span",{className:"refresh-text",children:a("pages.signup.refresh")})]})]}),e.jsx(o,{type:"text",name:"captcha",placeholder:a("pages.signup.placeholders.captcha"),className:"input-field"})]})]}),e.jsxs("div",{className:"form-group",children:[e.jsx("label",{className:"form-label",children:a("pages.signup.labels.password")}),e.jsx(o,{type:"password",name:"password",placeholder:a("pages.signup.placeholders.password"),className:"input-field",autoComplete:"new-password"})]}),e.jsxs("div",{className:"form-group",children:[e.jsx("label",{className:"form-label",children:a("pages.signup.labels.confirmPassword")}),e.jsx(o,{type:"password",name:"newPasswordConfirmation",placeholder:a("pages.signup.placeholders.confirmPassword"),className:"input-field",autoComplete:"new-password"})]}),e.jsx("button",{className:"signup-button",disabled:p,type:"submit",children:p?e.jsxs("span",{children:[e.jsx("i",{className:"fas fa-spinner fa-spin",style:{marginRight:"8px"}}),a("pages.signup.creatingAccount")]}):e.jsx("span",{children:a("pages.signup.createAccount")})}),e.jsx("div",{className:"login-link",children:e.jsx(k,{to:"/auth/signin",children:a("pages.signup.alreadyHaveAccount")})})]})]})}),e.jsx("style",{children:`
        .signup-container {
          max-width: 430px;
          margin: 0 auto;
          min-height: 100vh;
          background-color: #000000;
          border-top: 2px solid #39FF14;
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 20px;
          box-sizing: border-box;
        }

        .heading {
          color: #ffffff;
          font-size: 24px;
          font-weight: 500;
          text-align: center;
          margin-bottom: 30px;
        }

        .form-group {
          margin-bottom: 16px;
        }

        .form-label {
          display: block;
          color: #ffffff;
          font-size: 14px;
          margin-bottom: 6px;
          font-weight: 500;
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
          box-sizing: border-box;
        }
        .input-field:focus {
          border-color: #39FF14;
        }
        .input-field::placeholder {
          color: #777777;
        }

        .captcha-container {
          display: flex;
          gap: 8px;
        }

        .captcha-display {
          background-color: #2a2a2a;
          border: 1px solid #3a3a3a;
          border-radius: 6px;
          height: 48px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 16px;
          cursor: pointer;
          color: #ffffff;
          font-size: 24px;
          font-weight: bold;
          letter-spacing: 4px;
        }
        .captcha-display:hover {
          border-color: #39FF14;
        }

        .refresh-captcha {
          display: flex;
          align-items: center;
          gap: 8px;
          color: #39FF14;
          font-size: 14px;
        }
        .refresh-captcha i {
          font-size: 16px;
        }
        .refresh-text {
          font-weight: 500;
        }

        .signup-button {
          background-color: #39FF14;
          color: #000000;
          font-weight: bold;
          height: 50px;
          width: 100%;
          border: none;
          border-radius: 6px;
          font-size: 16px;
          cursor: pointer;
          margin: 24px 0 16px;
          transition: background-color 0.2s;
        }
        .signup-button:hover {
          background-color: #2ecc10;
        }
        .signup-button:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .login-link {
          text-align: right;
        }
        .login-link a {
          color: #39FF14;
          text-decoration: none;
          font-size: 14px;
        }
        .login-link a:hover {
          text-decoration: underline;
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
      `})]})}export{I as default};
