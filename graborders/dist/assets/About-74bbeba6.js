import{u as d,ab as r,i as l,k as a,L as p,ac as m}from"./index-a23148c8.js";import{L as f}from"./LoadingModal-9890861a.js";import{u as x}from"./useDispatch-1da8dfab.js";function u(){var n,i,s;const t=x(),o=d(r.selectRows),e=d(r.selectLoading),c=()=>{t(m.doFetch())};return l.useEffect(()=>{c()},[t]),a.jsxs("div",{className:"about-container",children:[a.jsx("div",{className:"header",children:a.jsxs("div",{className:"nav-bar",children:[a.jsx(p,{to:"/profile",className:"back-arrow",children:a.jsx("i",{className:"fas fa-arrow-left"})}),a.jsx("div",{className:"page-title",children:"About Us"})]})}),a.jsx("div",{className:"content-card",children:a.jsxs("div",{className:"about-content",children:[e&&a.jsx("div",{className:"loading-container",children:a.jsx(f,{})}),!e&&o&&((n=o[0])==null?void 0:n.companydetails)&&a.jsx("div",{className:"company-details",dangerouslySetInnerHTML:{__html:(i=o[0])==null?void 0:i.companydetails}}),!e&&(!o||o.length===0||!((s=o[0])!=null&&s.companydetails))&&a.jsxs("div",{className:"no-data-message",children:[a.jsx("i",{className:"fas fa-info-circle"}),a.jsx("p",{children:"No company information available at the moment."})]})]})}),a.jsx("style",{children:`
        /* About Container – matches login/profile containers */
        .about-container {
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

        /* About content area */
        .about-content {
          min-height: 200px;
        }

        /* Loading container – centers the LoadingModal */
        .loading-container {
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 200px;
        }

        /* Company details – rendered HTML */
        .company-details {
          color: #ffffff;
          font-size: 15px;
          line-height: 1.6;
        }
        .company-details h1,
        .company-details h2,
        .company-details h3,
        .company-details h4,
        .company-details h5,
        .company-details h6 {
          color: #39FF14;
          margin-top: 1.5em;
          margin-bottom: 0.5em;
        }
        .company-details p {
          margin-bottom: 1em;
          color: #dddddd;
        }
        .company-details a {
          color: #39FF14;
          text-decoration: none;
        }
        .company-details a:hover {
          text-decoration: underline;
        }
        .company-details ul,
        .company-details ol {
          margin-bottom: 1em;
          padding-left: 20px;
        }
        .company-details li {
          color: #dddddd;
        }
        .company-details strong {
          color: #ffffff;
        }
        .company-details img {
          max-width: 100%;
          height: auto;
          border-radius: 8px;
          border: 1px solid #2a2a2a;
        }
        .company-details blockquote {
          border-left: 4px solid #39FF14;
          padding-left: 16px;
          margin-left: 0;
          color: #bbbbbb;
          font-style: italic;
        }

        /* No data message */
        .no-data-message {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          min-height: 200px;
          background-color: #2a2a2a;
          border-radius: 12px;
          padding: 30px 20px;
          color: #ffffff;
        }
        .no-data-message i {
          font-size: 48px;
          color: #39FF14;
          margin-bottom: 16px;
        }
        .no-data-message p {
          font-size: 16px;
          color: #dddddd;
          margin: 0;
        }
      `})]})}export{u as default};
