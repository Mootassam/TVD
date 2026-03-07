import{k as e,L as n}from"./index-680400b2.js";function c(){const t=[{id:1,platform:"Telegram",description:"Get instant support via Telegram messenger",icon:"fab fa-telegram",link:"https://t.me/IC Markets Globaloffficial",color:"#0088cc",isExternal:!0},{id:2,platform:"Email",description:"Send us an email and we'll respond within 24 hours",icon:"fas fa-envelope",link:"mailto:IC Markets Global.helpdesk01@gmail.com",color:"#ea4335",isExternal:!0}],a=i=>{i.isExternal&&window.open(i.link,"_blank","noopener,noreferrer")};return e.jsxs("div",{className:"livechat-container",children:[e.jsx("div",{className:"header",children:e.jsxs("div",{className:"nav-bar",children:[e.jsx(n,{to:"/profile",className:"back-arrow",children:e.jsx("i",{className:"fas fa-arrow-left"})}),e.jsx("div",{className:"page-title",children:"Live Support"})]})}),e.jsx("div",{className:"content-card",children:e.jsxs("div",{className:"livechat-content",children:[e.jsxs("div",{className:"hero-section",children:[e.jsx("div",{className:"hero-icon",children:e.jsx("i",{className:"fas fa-headset"})}),e.jsx("h1",{className:"hero-title",children:"How Can We Help You?"}),e.jsx("p",{className:"hero-description",children:"Choose your preferred contact method to get in touch with our support team. We're here to assist you with any questions or concerns."})]}),e.jsx("div",{className:"contact-options",children:t.map(i=>e.jsx("div",{className:"contact-card",onClick:()=>a(i),style:{borderLeft:`4px solid ${i.color}`},children:e.jsxs("div",{className:"contact-card-content",children:[e.jsx("div",{className:"contact-icon",style:{color:i.color},children:e.jsx("i",{className:i.icon})}),e.jsxs("div",{className:"contact-info",children:[e.jsx("h3",{className:"contact-platform",children:i.platform}),e.jsx("p",{className:"contact-description",children:i.description}),e.jsxs("div",{className:"contact-link",children:[e.jsx("span",{className:"link-text",children:i.platform==="Email"?"IC Markets Global.helpdesk01@gmail.com":"t.me/IC Markets Globaloffficial"}),e.jsx("i",{className:"fas fa-external-link-alt"})]})]}),e.jsx("div",{className:"contact-arrow",children:e.jsx("i",{className:"fas fa-chevron-right"})})]})},i.id))}),e.jsxs("div",{className:"support-info",children:[e.jsxs("div",{className:"info-card",children:[e.jsx("div",{className:"info-icon",children:e.jsx("i",{className:"fas fa-clock"})}),e.jsxs("div",{className:"info-content",children:[e.jsx("h4",{children:"Response Time"}),e.jsxs("p",{children:["Telegram: Usually within minutes",e.jsx("br",{}),"Email: Within 24 hours"]})]})]}),e.jsxs("div",{className:"info-card",children:[e.jsx("div",{className:"info-icon",children:e.jsx("i",{className:"fas fa-info-circle"})}),e.jsxs("div",{className:"info-content",children:[e.jsx("h4",{children:"What to Include"}),e.jsx("p",{children:"Please provide your username and a detailed description of your issue for faster assistance."})]})]})]})]})}),e.jsx("style",{children:`
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

        .livechat-container {
          max-width: 400px;
          margin: 0 auto;
          position: relative;
          min-height: 100vh;
          background: linear-gradient(135deg, #106cf5 0%, #0a4fc4 100%);
        }

        /* Header Section - Matching Profile Page */
        .header {
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

        /* Content Card - Matching Profile Page */
        .content-card {
          background: white;
          border-radius: 40px 40px 0 0;
          padding: 30px 20px 100px;
          box-shadow: 0 -5px 20px rgba(0, 0, 0, 0.05);
          min-height: calc(100vh - 60px);
        }

        .livechat-content {
          width: 100%;
        }

        /* Hero Section */
        .hero-section {
          text-align: center;
          margin-bottom: 40px;
          padding: 0 10px;
        }

        .hero-icon {
          width: 80px;
          height: 80px;
          margin: 0 auto 20px;
          background: linear-gradient(135deg, #106cf5 0%, #0a4fc4 100%);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .hero-icon i {
          font-size: 36px;
          color: white;
        }

        .hero-title {
          font-size: 24px;
          color: #222;
          margin-bottom: 12px;
          font-weight: 600;
        }

        .hero-description {
          font-size: 14px;
          color: #666;
          line-height: 1.6;
          max-width: 320px;
          margin: 0 auto;
        }

        /* Contact Options */
        .contact-options {
          margin-bottom: 40px;
        }

        .contact-card {
          background: white;
          border-radius: 12px;
          padding: 20px;
          margin-bottom: 16px;
          box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
          cursor: pointer;
          transition: all 0.3s ease;
          border: 1px solid #e7eaee;
        }

        .contact-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);
          border-color: #106cf5;
        }

        .contact-card-content {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .contact-icon {
          width: 50px;
          height: 50px;
          background-color: rgba(16, 108, 245, 0.1);
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .contact-icon i {
          font-size: 24px;
        }

        .contact-info {
          flex: 1;
          min-width: 0;
        }

        .contact-platform {
          font-size: 16px;
          font-weight: 600;
          color: #222;
          margin-bottom: 4px;
        }

        .contact-description {
          font-size: 13px;
          color: #666;
          margin-bottom: 8px;
          line-height: 1.4;
        }

        .contact-link {
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .link-text {
          font-size: 13px;
          color: #106cf5;
          font-weight: 500;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .contact-link i {
          font-size: 12px;
          color: #106cf5;
        }

        .contact-arrow {
          color: #888f99;
          font-size: 14px;
        }

        /* Support Information */
        .support-info {
          background: #f8f9fa;
          border-radius: 16px;
          padding: 24px;
          border: 1px solid #e7eaee;
        }

        .info-card {
          display: flex;
          gap: 16px;
          margin-bottom: 24px;
        }

        .info-card:last-child {
          margin-bottom: 0;
        }

        .info-icon {
          width: 40px;
          height: 40px;
          background: linear-gradient(135deg, #106cf5 0%, #0a4fc4 100%);
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .info-icon i {
          font-size: 18px;
          color: white;
        }

        .info-content h4 {
          font-size: 15px;
          font-weight: 600;
          color: #222;
          margin-bottom: 6px;
        }

        .info-content p {
          font-size: 13px;
          color: #666;
          line-height: 1.5;
        }

        /* Responsive adjustments */
        @media (max-width: 380px) {
          .livechat-container {
            padding: 0;
          }

          .header {
            padding: 16px;
            min-height: 50px;
          }

          .content-card {
            padding: 25px 16px 100px;
          }

          .hero-title {
            font-size: 22px;
          }

          .hero-icon {
            width: 70px;
            height: 70px;
          }

          .hero-icon i {
            font-size: 32px;
          }

          .contact-card {
            padding: 16px;
          }

          .contact-icon {
            width: 45px;
            height: 45px;
          }

          .contact-icon i {
            font-size: 20px;
          }

          .support-info {
            padding: 20px;
          }
        }

        @media (min-width: 768px) {
          .content-card {
            border-radius: 30px 30px 0 0;
          }

          .livechat-content {
            max-width: 600px;
            margin: 0 auto;
          }

          .hero-section {
            padding: 0;
          }
        }
      `})]})}export{c as default};
