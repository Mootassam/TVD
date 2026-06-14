import{al as n,u as r,aj as s,i as l,ak as c,k as e,L as d,j as p}from"./index-caa1b5dd.js";import{u as f}from"./useDispatch-5f691ae2.js";function g(){const{id:o}=n(),a=f(),t=r(s.selectRows).find(i=>i.id===o);return l.useEffect(()=>{a(c.doFetch())},[a]),e.jsxs("div",{className:"helpcenterdetail-container",children:[e.jsx("div",{className:"header",children:e.jsxs("div",{className:"nav-bar",children:[e.jsx(d,{to:"/support",className:"back-arrow",children:e.jsx("i",{className:"fas fa-arrow-left"})}),e.jsx("div",{className:"page-title",children:p("pages.helpCenter.title")})]})}),e.jsx("div",{className:"content-card",children:e.jsx("div",{className:"helpcenterdetail-content",children:t&&e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"question-title",children:t.question}),e.jsx("div",{className:"divider-line"}),e.jsx("div",{className:"answer-content",children:t.description})]})})}),e.jsx("style",{children:`
        /* HelpCenterDetail Container – matches login/profile containers */
        .helpcenterdetail-container {
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

        /* Detail content */
        .helpcenterdetail-content {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .question-title {
          font-size: 20px;
          font-weight: 600;
          color: #39FF14;
          line-height: 1.4;
        }

        .divider-line {
          height: 1px;
          background-color: #2a2a2a;
          width: 100%;
        }

        .answer-content {
          font-size: 16px;
          color: #dddddd;
          line-height: 1.6;
        }

        /* Optional: style for when question not found (you can add a message) */
        .not-found-message {
          text-align: center;
          color: #777777;
          padding: 40px 20px;
        }
      `})]})}export{g as default};
