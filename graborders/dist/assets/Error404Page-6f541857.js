import{k as e,L as t}from"./index-680400b2.js";function o(){return e.jsxs("div",{className:"error404-container",children:[e.jsx("div",{className:"header",children:e.jsx("div",{className:"nav-bar",children:e.jsx("div",{className:"page-title",children:"404 Error"})})}),e.jsx("div",{className:"content-card",children:e.jsxs("div",{className:"error404-content",children:[e.jsxs("div",{className:"crypto-animation",children:[e.jsx("div",{className:"crypto-icon btc-icon",children:e.jsx("i",{className:"fab fa-btc"})}),e.jsx("div",{className:"crypto-icon eth-icon",children:e.jsx("i",{className:"fab fa-ethereum"})}),e.jsx("div",{className:"crypto-icon usdt-icon",children:e.jsx("i",{className:"fas fa-dollar-sign"})})]}),e.jsx("div",{className:"error-icon",children:e.jsx("i",{className:"fas fa-exclamation-circle"})}),e.jsx("h1",{className:"error-code",children:"404"}),e.jsx("h2",{className:"error-title",children:"Page Not Found"}),e.jsx("p",{className:"error-message",children:"The page you're looking for doesn't exist. It might have been moved or you entered the wrong address."}),e.jsxs(t,{to:"/",className:"home-button",children:[e.jsx("i",{className:"fas fa-home"})," Go Back Home"]})]})}),e.jsx("style",{children:`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
        }

        body {
          background-color: #f5f7fa;
          color: #333;
          line-height: 1.6;
          overflow-x: hidden;
        }

        .error404-container {
          max-width: 400px;
          margin: 0 auto;
          position: relative;
          min-height: 100vh;
          background: linear-gradient(135deg, #106cf5 0%, #0a4fc4 100%);
        }

        /* Header Section - Matching Other Pages */
        .header {
          background: linear-gradient(135deg, #106cf5 0%, #0a4fc4 100%);
          min-height: 60px;
          position: relative;
          padding: 20px;
        }

        .nav-bar {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .back-arrow {
          color: white;
          font-size: 20px;
          font-weight: 300;
          text-decoration: none;
          transition: opacity 0.3s ease;
        }

        .back-arrow:hover {
          opacity: 0.8;
        }

        .page-title {
          color: white;
          font-size: 17px;
          font-weight: 600;
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
        }

        /* Content Card - Matching Other Pages */
        .content-card {
          background: white;
          border-radius: 40px 40px 0 0;
          padding: 40px 20px 100px;
          box-shadow: 0 -5px 20px rgba(0, 0, 0, 0.05);
          min-height: calc(100vh - 60px);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .error404-content {
          width: 100%;
          text-align: center;
          max-width: 320px;
          margin: 0 auto;
        }

        /* Crypto Animation */
        .crypto-animation {
          position: relative;
          height: 120px;
          margin-bottom: 30px;
        }

        .crypto-icon {
          position: absolute;
          width: 50px;
          height: 50px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 24px;
          color: white;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
          animation: float 3s ease-in-out infinite;
        }

        .btc-icon {
          background: linear-gradient(135deg, #F7931A 0%, #F15A24 100%);
          top: 10px;
          left: 30%;
          animation-delay: 0s;
        }

        .eth-icon {
          background: linear-gradient(135deg, #627EEA 0%, #8A63D2 100%);
          top: 40px;
          left: 50%;
          transform: translateX(-50%);
          animation-delay: 0.5s;
        }

        .usdt-icon {
          background: linear-gradient(135deg, #26A17B 0%, #1C7B5F 100%);
          top: 10px;
          right: 30%;
          animation-delay: 1s;
        }

        /* Error Icon */
        .error-icon {
          font-size: 48px;
          color: #ff7a00;
          margin-bottom: 20px;
          animation: pulse 2s infinite;
        }

        /* Error Code */
        .error-code {
          font-size: 72px;
          font-weight: 800;
          color: #222;
          margin-bottom: 10px;
          line-height: 1;
        }

        /* Error Title */
        .error-title {
          font-size: 24px;
          font-weight: 700;
          color: #222;
          margin-bottom: 16px;
        }

        /* Error Message */
        .error-message {
          font-size: 14px;
          color: #888f99;
          line-height: 1.5;
          margin-bottom: 30px;
          padding: 0 10px;
        }

        /* Home Button */
        .home-button {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          background: #106cf5;
          color: white;
          text-decoration: none;
          padding: 12px 28px;
          border-radius: 8px;
          font-size: 14px;
          font-weight: 600;
          transition: all 0.3s ease;
          border: none;
          cursor: pointer;
          box-shadow: 0 4px 12px rgba(16, 108, 245, 0.2);
        }

        .home-button:hover {
          background: #0a4fc4;
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(16, 108, 245, 0.3);
        }

        .home-button:active {
          transform: translateY(0);
        }

        /* Animations */
        @keyframes float {
          0% {
            transform: translateY(0) rotate(0deg);
          }
          50% {
            transform: translateY(-10px) rotate(5deg);
          }
          100% {
            transform: translateY(0) rotate(0deg);
          }
        }

        @keyframes pulse {
          0% {
            transform: scale(1);
            opacity: 1;
          }
          50% {
            transform: scale(1.05);
            opacity: 0.8;
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }

        @keyframes bounce {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-15px);
          }
        }

        /* Responsive adjustments */
        @media (max-width: 380px) {
          .error404-container {
            padding: 0;
          }

          .header {
            padding: 16px;
            min-height: 50px;
          }

          .content-card {
            padding: 30px 16px 80px;
            border-radius: 30px 30px 0 0;
          }

          .error-code {
            font-size: 60px;
          }

          .error-title {
            font-size: 20px;
          }

          .error-message {
            font-size: 13px;
          }

          .home-button {
            padding: 10px 24px;
            font-size: 13px;
          }

          .crypto-icon {
            width: 44px;
            height: 44px;
            font-size: 20px;
          }
        }

        @media (min-width: 768px) {
          .content-card {
            border-radius: 30px 30px 0 0;
          }

          .error404-content {
            max-width: 360px;
          }

          .error-code {
            font-size: 80px;
          }

          .error-title {
            font-size: 28px;
          }

          .error-message {
            font-size: 16px;
          }
        }
      `})]})}export{o as default};
