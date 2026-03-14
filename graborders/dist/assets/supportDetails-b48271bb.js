import{ad as c,i as n,j as e,k as t,L as u}from"./index-a23148c8.js";function f(){const{id:s}=c(),[i,r]=n.useState(""),[o,l]=n.useState(""),p=[{id:"1",question:e("pages.helpCenter.faq.aboutAccounts"),answer:e("pages.helpCenterDetail.answers.aboutAccounts")},{id:"2",question:e("pages.helpCenter.faq.transactionVolume"),answer:e("pages.helpCenterDetail.answers.transactionVolume")},{id:"3",question:e("pages.helpCenter.faq.transferFunds"),answer:e("pages.helpCenterDetail.answers.transferFunds")},{id:"4",question:e("pages.helpCenter.faq.whatAreFutures"),answer:e("pages.helpCenterDetail.answers.whatAreFutures")},{id:"5",question:e("pages.helpCenter.faq.convertedAmountChanges"),answer:e("pages.helpCenterDetail.answers.convertedAmountChanges")},{id:"6",question:e("pages.helpCenter.faq.realNameAuthentication"),answer:e("pages.helpCenterDetail.answers.realNameAuthentication")},{id:"7",question:e("pages.helpCenter.faq.frozenAssets"),answer:e("pages.helpCenterDetail.answers.frozenAssets")},{id:"8",question:e("pages.helpCenter.faq.futuresTradingRules"),answer:e("pages.helpCenterDetail.answers.futuresTradingRules")},{id:"9",question:e("pages.helpCenterDetail.questions.aiQuantification"),answer:e("pages.helpCenterDetail.answers.aiQuantification")},{id:"10",question:e("pages.helpCenterDetail.questions.exploreNFTs"),answer:e("pages.helpCenterDetail.answers.exploreNFTs")},{id:"11",question:e("pages.helpCenterDetail.questions.bitcoinEnergy"),answer:e("pages.helpCenterDetail.answers.bitcoinEnergy")},{id:"12",question:e("pages.helpCenterDetail.questions.bitcoinRecordPrice"),answer:e("pages.helpCenterDetail.answers.bitcoinRecordPrice")},{id:"13",question:e("pages.helpCenterDetail.questions.trumpStatueBitcoin"),answer:e("pages.helpCenterDetail.answers.trumpStatueBitcoin")}];return n.useEffect(()=>{const a=p.find(d=>d.id===s);a?(r(a.question),l(a.answer)):console.log(e("pages.helpCenterDetail.faqNotFound"))},[s]),t.jsxs("div",{className:"helpcenterdetail-container",children:[t.jsx("div",{className:"header",children:t.jsxs("div",{className:"nav-bar",children:[t.jsx(u,{to:"/support",className:"back-arrow",children:t.jsx("i",{className:"fas fa-arrow-left"})}),t.jsx("div",{className:"page-title",children:e("pages.helpCenter.title")})]})}),t.jsx("div",{className:"content-card",children:t.jsx("div",{className:"helpcenterdetail-content",children:i&&t.jsxs(t.Fragment,{children:[t.jsx("div",{className:"question-title",children:i}),t.jsx("div",{className:"divider-line"}),t.jsx("div",{className:"answer-content",children:o})]})})}),t.jsx("style",{children:`
        /* HelpCenterDetail Container – matches login/profile containers */
        .helpcenterdetail-container {
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
      `})]})}export{f as default};
