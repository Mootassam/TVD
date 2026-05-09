import{p as d,aF as f,u as p,v as u,i as n,x,k as s,j as e,L as g}from"./index-a677a7f0.js";import{u as m}from"./useDispatch-0be2239c.js";function y(){var o;const a=d(),c=f(),i=m(),t=p(u.selectKycStatus);n.useEffect(()=>{i(x.doFetch())},[i]);const r=((o=c.state)==null?void 0:o.from)||"/";n.useEffect(()=>{t==="success"&&a.replace(r)},[t,a,r]);const l=()=>{switch(t){case"pending":return s.jsxs("div",{className:"status-content",children:[s.jsx("div",{className:"status-icon pending",children:s.jsx("i",{className:"fas fa-clock"})}),s.jsx("h2",{className:"status-title",children:e("pages.kycStatus.pending.title")}),s.jsx("p",{className:"status-message",children:e("pages.kycStatus.pending.message")}),s.jsxs("div",{className:"status-note",children:[s.jsx("i",{className:"fas fa-info-circle"}),e("pages.kycStatus.pending.note")]})]});case"unverified":default:return s.jsxs("div",{className:"status-content",children:[s.jsx("div",{className:"icon-wrapper",children:s.jsx("div",{className:"status-icon unverified",children:s.jsx("i",{className:"fas fa-exclamation-triangle"})})}),s.jsx("h2",{className:"status-title",children:e("pages.kycStatus.unverified.title")}),s.jsx("p",{className:"status-message",children:e("pages.kycStatus.unverified.message")}),s.jsxs("div",{className:"status-features",children:[s.jsx("h3",{children:e("pages.kycStatus.unverified.featuresTitle")}),s.jsxs("ul",{children:[s.jsxs("li",{children:[s.jsx("i",{className:"fas fa-shield-alt"}),e("pages.kycStatus.unverified.features.password")]}),s.jsxs("li",{children:[s.jsx("i",{className:"fas fa-file-alt"}),e("pages.kycStatus.unverified.features.withdrawal")]}),s.jsxs("li",{children:[s.jsx("i",{className:"fas fa-arrow-down"}),e("pages.kycStatus.unverified.features.deposit")]}),s.jsxs("li",{children:[s.jsx("i",{className:"fas fa-arrow-up"}),e("pages.kycStatus.unverified.features.withdraw")]})]})]}),s.jsx(g,{to:"/proof",className:"verify-button",children:e("pages.kycStatus.unverified.verifyNow")})]});case"success":return null}};return s.jsxs("div",{className:"kyc-status-container",children:[s.jsx("div",{className:"header",children:s.jsxs("div",{className:"nav-bar",children:[s.jsx("button",{className:"back-arrow",onClick:()=>a.goBack(),type:"button",children:s.jsx("i",{className:"fas fa-arrow-left"})}),s.jsx("div",{className:"page-title",children:t==="pending"?e("pages.kycStatus.pending.title"):e("pages.kycStatus.unverified.title")})]})}),s.jsx("div",{className:"content-card",children:l()}),s.jsx("style",{children:`
        .kyc-status-container {
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
          background: none;
          border: none;
          color: #ffffff;
          font-size: 20px;
          cursor: pointer;
          padding: 0;
          display: flex;
          align-items: center;
          justify-content: center;
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
          margin-top: 20px;
          border-top: 2px solid #39FF14;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .status-content {
          text-align: center;
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .icon-wrapper {
          margin-bottom: 16px;
        }

        .status-icon {
          width: 80px;
          height: 80px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 32px;
          margin: 0 auto;
        }

        .status-icon.unverified {
          background-color: rgba(255, 193, 7, 0.15);
          color: #ffc107;
          border: 2px solid #ffc107;
        }

        .status-icon.pending {
          background-color: rgba(0, 123, 255, 0.15);
          color: #007bff;
          border: 2px solid #007bff;
        }

        .status-icon.success {
          background-color: rgba(57, 255, 20, 0.15);
          color: #39FF14;
          border: 2px solid #39FF14;
        }

        .status-title {
          font-size: 22px;
          font-weight: 600;
          margin-bottom: 12px;
          color: #ffffff;
        }

        .status-message {
          font-size: 14px;
          color: #aaaaaa;
          line-height: 1.6;
          margin-bottom: 20px;
          max-width: 340px;
        }

        .status-note {
          background-color: #2a2a2a;
          border-left: 4px solid #ffc107;
          padding: 12px 16px;
          border-radius: 8px;
          font-size: 13px;
          color: #cccccc;
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 24px;
          max-width: 340px;
          text-align: left;
        }

        .status-note i {
          color: #ffc107;
          font-size: 16px;
        }

        .status-features {
          background-color: #2a2a2a;
          border-radius: 12px;
          padding: 20px;
          margin-bottom: 24px;
          width: 100%;
          max-width: 340px;
        }

        .status-features h3 {
          font-size: 14px;
          color: #39FF14;
          margin-bottom: 16px;
          text-align: left;
        }

        .status-features ul {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .status-features li {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 10px 0;
          border-bottom: 1px solid #3a3a3a;
          font-size: 13px;
          color: #ffffff;
        }

        .status-features li:last-child {
          border-bottom: none;
        }

        .status-features li i {
          color: #39FF14;
          width: 16px;
          text-align: center;
        }

        .verify-button {
          background-color: #39FF14;
          color: #0f0f0f;
          font-weight: bold;
          padding: 14px 32px;
          border: none;
          border-radius: 25px;
          font-size: 16px;
          cursor: pointer;
          text-decoration: none;
          transition: all 0.2s;
          display: inline-block;
        }

        .verify-button:hover {
          background-color: #2ecc10;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(57, 255, 20, 0.3);
        }

        @media (max-width: 400px) {
          .kyc-status-container {
            max-width: 100%;
          }

          .content-card {
            border-radius: 0;
          }
        }
      `})]})}export{y as default};
