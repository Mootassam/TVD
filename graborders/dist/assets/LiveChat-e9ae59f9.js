import{u as i,aF as c,i as d,aG as p,k as a,L as x,j as o}from"./index-1743411d.js";import{L as g}from"./LoadingModal-a1c0dd49.js";import{u as f}from"./useDispatch-b6333f32.js";function m(){const r=f(),t=i(c.selectRows),s=i(c.selectLoading);return d.useEffect(()=>{r(p.doFetch())},[r]),a.jsxs("div",{className:"customer-service-container",children:[a.jsx("div",{className:"header",children:a.jsxs("div",{className:"nav-bar",children:[a.jsx(x,{to:"/profile",className:"back-arrow",children:a.jsx("i",{className:"fas fa-arrow-left"})}),a.jsx("div",{className:"page-title",children:o("pages.online.title")})]})}),a.jsxs("div",{className:"content-card",children:[a.jsx("div",{className:"service-description-card",children:a.jsxs("div",{className:"description-content",children:[a.jsx("i",{className:"fa-solid fa-comments description-icon"}),a.jsx("p",{className:"description-text",children:o("pages.online.description")})]})}),a.jsxs("div",{className:"support-agents-list",children:[s&&a.jsx(g,{}),!s&&t&&t.map((e,l)=>{var n;return a.jsxs("div",{className:"support-agent-card",children:[a.jsxs("div",{className:"agent-header",children:[a.jsx("h3",{className:"agent-title",children:e==null?void 0:e.name}),a.jsx("div",{className:`platform-badge ${e.type}`,children:e.type==="whatsApp"?a.jsx("i",{className:"fa-brands fa-whatsapp"}):a.jsx("i",{className:"fa-brands fa-telegram"})})]}),a.jsxs("div",{className:"agent-profile",children:[a.jsx("img",{src:(n=e==null?void 0:e.photo[0])==null?void 0:n.downloadUrl,alt:`${e==null?void 0:e.name}`,className:"agent-photo"}),a.jsx("div",{className:"status-indicator online"})]}),a.jsx("div",{className:"agent-actions",children:e.type==="whatsApp"?a.jsxs("a",{href:`https://wa.me/${e.number}`,className:"contact-button whatsapp-button",target:"_blank",rel:"noopener noreferrer",children:[a.jsx("i",{className:"fa-brands fa-whatsapp button-icon"}),a.jsx("span",{children:o("pages.online.contactWhatsApp")})]}):a.jsxs("a",{href:`https://t.me/${e.number}`,className:"contact-button telegram-button",target:"_blank",rel:"noopener noreferrer",children:[a.jsx("i",{className:"fa-brands fa-telegram button-icon"}),a.jsx("span",{children:o("pages.online.contactTelegram")}),a.jsx("i",{className:"fa-solid fa-external-link action-arrow"})]})})]},l)})]})]}),a.jsx("style",{children:`
        /* Customer Service Container – matches profile theme */
        .customer-service-container {
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

        /* Header */
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
          flex: 1;
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

        /* Service Description Card */
        .service-description-card {
          background-color: #2a2a2a;
          border-radius: 12px;
          padding: 16px;
          margin-bottom: 24px;
          border: 1px solid #3a3a3a;
        }
        .description-content {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .description-icon {
          font-size: 24px;
          color: #39FF14;
        }
        .description-text {
          font-size: 14px;
          color: #cccccc;
          line-height: 1.5;
          margin: 0;
        }

        /* Support Agents List */
        .support-agents-list {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        /* Support Agent Card */
        .support-agent-card {
          background-color: #2a2a2a;
          border-radius: 12px;
          padding: 16px;
          border: 1px solid #3a3a3a;
          transition: all 0.2s ease;
        }
        .support-agent-card:hover {
          border-color: #39FF14;
        }

        /* Agent Header */
        .agent-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 12px;
        }
        .agent-title {
          font-size: 16px;
          font-weight: 600;
          color: #ffffff;
          margin: 0;
        }
        .platform-badge {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 18px;
        }
        .platform-badge.whatsApp {
          background-color: rgba(37, 211, 102, 0.2);
          color: #25D366;
        }
        .platform-badge.telegram {
          background-color: rgba(0, 136, 204, 0.2);
          color: #0088cc;
        }

        /* Agent Profile */
        .agent-profile {
          position: relative;
          width: 80px;
          height: 80px;
          margin: 0 auto 12px;
        }
        .agent-photo {
          width: 100%;
          height: 100%;
          border-radius: 50%;
          object-fit: cover;
          border: 2px solid #39FF14;
        }
        .status-indicator {
          position: absolute;
          bottom: 4px;
          right: 4px;
          width: 16px;
          height: 16px;
          border-radius: 50%;
          border: 2px solid #1c1c1c;
        }
        .status-indicator.online {
          background-color: #39FF14;
        }
        .status-indicator.offline {
          background-color: #777777;
        }

        /* Agent Actions */
        .agent-actions {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .contact-button {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 12px;
          border-radius: 8px;
          text-decoration: none;
          font-size: 14px;
          font-weight: 500;
          transition: all 0.2s;
          border: 1px solid transparent;
        }
        .whatsapp-button {
          background-color: rgba(37, 211, 102, 0.1);
          color: #25D366;
          border-color: #25D366;
        }
        .whatsapp-button:hover {
          background-color: #25D366;
          color: #000000;
        }
        .telegram-button {
          background-color: rgba(0, 136, 204, 0.1);
          color: #0088cc;
          border-color: #0088cc;
        }
        .telegram-button:hover {
          background-color: #0088cc;
          color: #000000;
        }
        .button-icon {
          font-size: 18px;
        }
        .action-arrow {
          margin-left: auto;
          font-size: 12px;
        }

        /* Loading Modal (adjust if needed) */
        .loading-modal {
          background-color: #1c1c1c;
          color: #39FF14;
        }

        /* Responsive */
        @media (max-width: 360px) {
          .content-card {
            padding: 20px 16px;
          }
          .agent-profile {
            width: 70px;
            height: 70px;
          }
        }
      `})]})}export{m as default};
