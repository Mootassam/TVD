import{k as e,j as o,L as r}from"./index-a8b69c34.js";function a(){return e.jsxs("div",{className:"error403-container",children:[e.jsx("div",{className:"header",children:e.jsx("div",{className:"nav-bar",children:e.jsx("div",{className:"page-title",children:"403 Error"})})}),e.jsx("div",{className:"content-card",children:e.jsxs("div",{className:"error403-content",children:[e.jsxs("div",{className:"crypto-animation",children:[e.jsx("div",{className:"crypto-icon bitcoin",children:e.jsx("i",{className:"fab fa-bitcoin"})}),e.jsx("div",{className:"crypto-icon ethereum",children:e.jsx("i",{className:"fab fa-ethereum"})}),e.jsx("div",{className:"crypto-icon altcoin",children:e.jsx("i",{className:"fas fa-coins"})})]}),e.jsx("div",{className:"error-icon",children:e.jsx("i",{className:"fas fa-exclamation-triangle"})}),e.jsx("h1",{className:"error-code",children:"403"}),e.jsx("h2",{className:"error-title",children:"Access Denied"}),e.jsx("p",{className:"error-message",children:o("errors.403")}),e.jsxs(r,{to:"/",className:"home-button",children:[e.jsx("i",{className:"fas fa-home"})," ",o("errors.backToHome")]})]})}),e.jsx("style",{children:`
        /* Container – matches the 404 design */
        .error403-container {
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
          margin-bottom: 20px;
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

        /* Error Content */
        .error403-content {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          min-height: 60vh;
          text-align: center;
        }

        /* Crypto Animation – same floating effect */
        .crypto-animation {
          position: relative;
          width: 200px;
          height: 100px;
          margin: 0 auto 20px;
        }
        .crypto-icon {
          position: absolute;
          font-size: 48px;
          color: #39FF14;
          opacity: 0.8;
          animation: float 3s ease-in-out infinite;
        }
        .bitcoin {
          left: 0;
          top: 0;
          animation-delay: 0s;
        }
        .ethereum {
          left: 70px;
          top: 20px;
          animation-delay: 0.5s;
        }
        .altcoin {
          left: 140px;
          top: 0;
          animation-delay: 1s;
        }

        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
          100% { transform: translateY(0px); }
        }

        /* Error Icon */
        .error-icon {
          font-size: 48px;
          color: #ff6b6b;
          margin-bottom: 10px;
        }

        /* Error Code */
        .error-code {
          font-size: 72px;
          font-weight: bold;
          color: #39FF14;
          margin: 10px 0;
          line-height: 1;
        }

        /* Error Title */
        .error-title {
          font-size: 24px;
          font-weight: 600;
          color: #ffffff;
          margin-bottom: 12px;
        }

        /* Error Message */
        .error-message {
          font-size: 16px;
          color: #aaaaaa;
          max-width: 300px;
          margin-bottom: 30px;
          line-height: 1.5;
        }

        /* Home Button – matches signout button style */
        .home-button {
          background: none;
          border: 1px solid #39FF14;
          color: #39FF14;
          padding: 12px 24px;
          border-radius: 6px;
          font-size: 16px;
          font-weight: bold;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          transition: all 0.2s;
          text-decoration: none;
        }
        .home-button:hover {
          background-color: #39FF14;
          color: #0f0f0f;
        }

        /* Remove default link underline */
        a {
          text-decoration: none;
        }
      `})]})}export{a as default};
