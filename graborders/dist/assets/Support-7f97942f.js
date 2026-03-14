import{j as a,k as e,L as t}from"./index-3c390b80.js";function s(){const o=[a("pages.helpCenter.faq.aboutAccounts"),a("pages.helpCenter.faq.transactionVolume"),a("pages.helpCenter.faq.transferFunds"),a("pages.helpCenter.faq.whatAreFutures"),a("pages.helpCenter.faq.convertedAmountChanges"),a("pages.helpCenter.faq.realNameAuthentication"),a("pages.helpCenter.faq.frozenAssets"),a("pages.helpCenter.faq.futuresTradingRules")];return e.jsxs("div",{className:"helpcenter-container",children:[e.jsx("div",{className:"header",children:e.jsxs("div",{className:"nav-bar",children:[e.jsx(t,{to:"/profile",className:"back-arrow",children:e.jsx("i",{className:"fas fa-arrow-left"})}),e.jsx("div",{className:"page-title",children:a("pages.helpCenter.title")})]})}),e.jsx("div",{className:"content-card",children:e.jsx("div",{className:"helpcenter-content",children:o.map((n,r)=>e.jsx(t,{to:`/support/details/${r+1}`,className:"remove_blue",children:e.jsxs("div",{className:"faq-item",children:[e.jsx("div",{className:"faq-icon",children:e.jsx("i",{className:"fas fa-arrow-left"})}),e.jsx("div",{className:"faq-text",children:n})]})},r))})}),e.jsx("style",{children:`
        /* HelpCenter Container – matches login/profile containers */
        .helpcenter-container {
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

        /* Help Center content – list of FAQ items */
        .helpcenter-content {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        /* FAQ item – styled like profile menu items */
        .faq-item {
          display: flex;
          align-items: center;
          padding: 16px 12px;
          background-color: #1c1c1c;
          border-bottom: 1px solid #2a2a2a;
          cursor: pointer;
          transition: all 0.2s;
          border-radius: 8px;
        }
        .faq-item:hover {
          background-color: #2a2a2a;
          border-color: #39FF14;
        }
        .faq-item:hover .faq-icon i {
          color: #39FF14;
        }

        .faq-icon {
          width: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .faq-icon i {
          color: #777777;
          font-size: 18px;
          transition: color 0.2s;
        }

        .faq-text {
          flex: 1;
          font-size: 15px;
          color: #ffffff;
          line-height: 1.4;
        }

        /* Link wrapper – remove default underline and ensure full width */
        .remove_blue {
          text-decoration: none;
          color: inherit;
          display: block;
          width: 100%;
        }
      `})]})}export{s as default};
