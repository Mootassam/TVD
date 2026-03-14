import{N as f,j as a,u as x,t as h,i as g,O as N,k as e,L as k,M as j}from"./index-3c390b80.js";import{u as F,y as v,F as y}from"./FormErrors-d19bd6fc.js";import{y as t}from"./yupFormSchemas-73599a06.js";import{I as i}from"./InputFormItem-0ad7c3ce.js";import{u as w}from"./useDispatch-f272d96f.js";const C=f().shape({accountHolder:t.string(a("entities.transaction.fields.accountHolder"),{required:!0}),ibanNumber:t.string(a("entities.transaction.fields.ibanNumber"),{required:!0}),bankName:t.string(a("entities.transaction.fields.bankName"),{required:!0}),ifscCode:t.string(a("entities.transaction.fields.ifscCode"),{required:!0})});function R(){const s=x(h.selectCurrentUser),n=w(),r=g.useCallback(async()=>{await n(N.doRefreshCurrentUser())},[n]),l=async({accountHolder:d,ibanNumber:p,bankName:m,ifscCode:u})=>{const b={accountHolder:d,ibanNumber:p,bankName:m,ifscCode:u};await n(j.doUpdateBank(b)),await r()},c={accountHolder:(s==null?void 0:s.accountHolder)||"",ibanNumber:(s==null?void 0:s.ibanNumber)||"",bankName:(s==null?void 0:s.bankName)||"",ifscCode:(s==null?void 0:s.ifscCode)||""},o=F({resolver:v.yupResolver(C),mode:"onSubmit",defaultValues:c});return e.jsxs("div",{className:"bank-details-container",children:[e.jsx("div",{className:"header",children:e.jsxs("div",{className:"nav-bar",children:[e.jsx(k,{to:"/profile",className:"back-arrow",children:e.jsx("i",{className:"fas fa-arrow-left"})}),e.jsx("div",{className:"page-title",children:a("pages.bankDetails.title")})]})}),e.jsx("div",{className:"content-card",children:e.jsx(y,{...o,children:e.jsxs("form",{onSubmit:o.handleSubmit(l),children:[e.jsxs("div",{className:"form-group",children:[e.jsxs("label",{className:"input-label",children:[e.jsx("span",{className:"required-star",children:"*"}),a("entities.transaction.fields.accountHolder")]}),e.jsx(i,{type:"text",name:"accountHolder",placeholder:a("entities.transaction.fields.accountHolder"),className:"bank-input"})]}),e.jsxs("div",{className:"form-group",children:[e.jsxs("label",{className:"input-label",children:[e.jsx("span",{className:"required-star",children:"*"}),a("entities.transaction.fields.ibanNumber")]}),e.jsx(i,{type:"text",name:"ibanNumber",placeholder:a("entities.transaction.fields.ibanNumber"),className:"bank-input"})]}),e.jsxs("div",{className:"form-group",children:[e.jsxs("label",{className:"input-label",children:[e.jsx("span",{className:"required-star",children:"*"}),a("entities.transaction.fields.bankName")]}),e.jsx(i,{type:"text",name:"bankName",placeholder:a("entities.transaction.fields.bankName"),className:"bank-input"})]}),e.jsxs("div",{className:"form-group",children:[e.jsxs("label",{className:"input-label",children:[e.jsx("span",{className:"required-star",children:"*"}),a("entities.transaction.fields.ifscCode")]}),e.jsx(i,{type:"text",name:"ifscCode",placeholder:a("entities.transaction.fields.ifscCode"),className:"bank-input"})]}),e.jsxs("button",{type:"submit",className:"bank-button",children:[e.jsx("i",{className:"fas fa-check",style:{marginRight:"8px"}}),a("pages.withdraw.confirm")]})]})})}),e.jsx("style",{children:`
        /* Bank Details Container – matches Profile */
        .bank-details-container {
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

        /* Form Group */
        .form-group {
          margin-bottom: 20px;
        }

        /* Input Label */
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

        /* Input Field (applied to InputFormItem) */
        .bank-input {
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
        .bank-input:focus {
          border-color: #39FF14;
        }
        .bank-input::placeholder {
          color: #777777;
        }

        /* Submit Button */
        .bank-button {
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
          margin-top: 24px;
        }
        .bank-button:hover {
          background-color: #2ecc10;
        }
        .bank-button:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        /* Responsive */
        @media (max-width: 380px) {
          .content-card {
            padding: 20px 16px;
          }
          .bank-input {
            padding: 10px;
            font-size: 15px;
          }
        }
      `})]})}export{R as default};
