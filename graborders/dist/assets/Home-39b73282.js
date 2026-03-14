import{i,j as n,k as e,L as s}from"./index-a23148c8.js";function f(){const[c,l]=i.useState(0),[d,p]=i.useState(0),o=["./images/slides/1.png","./images/slides/2.png","./images/slides/3.png"],r=[n("pages.home.announcements.maintenanceNotice")];i.useEffect(()=>{const t=setInterval(()=>{l(a=>(a+1)%o.length)},3e3);return()=>clearInterval(t)},[o.length]),i.useEffect(()=>{const t=setInterval(()=>{p(a=>(a+1)%r.length)},4e3);return()=>clearInterval(t)},[r.length]);const x=(t,a=80)=>t.length<=a?t:t.substring(0,a)+"...";return e.jsxs("div",{className:"home-container",children:[e.jsxs("div",{className:"header",children:[e.jsx("div",{className:"logo",children:e.jsx("img",{src:"./images/logo.png",style:{height:"20px"},alt:n("pages.home.logoAlt")})}),e.jsxs("div",{className:"header-icons",children:[e.jsx(s,{to:"/notification",className:"icon-circle",children:e.jsx("i",{className:"far fa-envelope"})}),e.jsx(s,{to:"/profile",className:"icon-circle",children:e.jsx("i",{className:"far fa-user"})})]})]}),e.jsxs("div",{className:"hero-section",children:[e.jsx("div",{className:"crypto-illustration",children:e.jsx("img",{src:"./images/header.png",alt:n("pages.home.headerAlt"),style:{width:"100%",height:"auto"}})}),e.jsx("div",{className:"slogan",children:n("pages.home.slogan")})]}),e.jsxs("div",{className:"slideshow-section",children:[e.jsx("div",{className:"section-title",children:"Market Updates"}),e.jsxs("div",{className:"slideshow-container",children:[o.map((t,a)=>e.jsx("div",{className:`slide ${a===c?"active":""}`,children:e.jsx("img",{src:t,alt:`Slide ${a+1}`})},a)),e.jsx("div",{className:"slide-dots",children:o.map((t,a)=>e.jsx("span",{className:`dot ${a===c?"active":""}`,onClick:()=>l(a)},a))})]})]}),e.jsxs("div",{className:"announcements-section",children:[e.jsxs("div",{className:"announcement-header",children:[e.jsx("i",{className:"fas fa-bullhorn"}),e.jsx("span",{children:"Announcements"})]}),e.jsx("div",{className:"announcement-ticker",children:e.jsx("p",{className:"ticker-text",children:x(r[d])})})]}),e.jsxs("div",{className:"market-section",children:[e.jsx("div",{className:"section-title",children:"Forex Market"}),e.jsxs(s,{to:"/market",className:"view-all-link",children:["View All Markets ",e.jsx("i",{className:"fas fa-chevron-right"})]})]}),e.jsx("style",{children:`
        /* Home Container – matches other pages */
        .home-container {
          max-width: 430px;
          margin: 0 auto;
          min-height: 100vh;
          background-color: #000000;
          border-top: 2px solid #39FF14;
          display: flex;
          flex-direction: column;
          color: #ffffff;
          box-sizing: border-box;
        }

        /* Header */
        .header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 16px 20px;
          border-bottom: 1px solid #2a2a2a;
        }
        .logo img {
          height: 24px;
        }
        .header-icons {
          display: flex;
          gap: 12px;
        }
        .icon-circle {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background-color: #2a2a2a;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #ffffff;
          text-decoration: none;
          transition: all 0.2s;
        }
        .icon-circle:hover {
          background-color: #39FF14;
          color: #000000;
        }

        /* Hero Section */
        .hero-section {
          padding: 20px;
          text-align: center;
        }
        .crypto-illustration {
          margin-bottom: 16px;
        }
        .slogan {
          font-size: 18px;
          font-weight: 500;
          color: #39FF14;
        }

        /* Slideshow */
        .slideshow-section {
          padding: 0 20px 20px;
        }
        .section-title {
          font-size: 18px;
          font-weight: 600;
          margin-bottom: 16px;
          color: #ffffff;
          border-left: 4px solid #39FF14;
          padding-left: 12px;
        }
        .slideshow-container {
          position: relative;
          width: 100%;
          height: 160px;
          border-radius: 12px;
          overflow: hidden;
          background-color: #1c1c1c;
        }
        .slide {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          opacity: 0;
          transition: opacity 0.5s ease;
        }
        .slide.active {
          opacity: 1;
        }
        .slide img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .slide-dots {
          position: absolute;
          bottom: 12px;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          gap: 8px;
        }
        .dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background-color: #aaaaaa;
          cursor: pointer;
          transition: background-color 0.3s;
        }
        .dot.active {
          background-color: #39FF14;
        }

        /* Announcements */
        .announcements-section {
          display: flex;
          align-items: center;
          gap: 12px;
          background-color: #2a2a2a;
          margin: 0 20px 20px;
          padding: 10px 16px;
          border-radius: 30px;
          border: 1px solid #3a3a3a;
        }
        .announcement-header {
          display: flex;
          align-items: center;
          gap: 6px;
          color: #39FF14;
          font-weight: 600;
          font-size: 14px;
        }
        .announcement-ticker {
          flex: 1;
          overflow: hidden;
        }
        .ticker-text {
          font-size: 13px;
          color: #ffffff;
          white-space: nowrap;
          animation: ticker 15s linear infinite;
        }
        @keyframes ticker {
          0% { transform: translateX(100%); }
          100% { transform: translateX(-100%); }
        }

        /* Market Section */
        .market-section {
          padding: 0 20px 20px;
        }
        .market-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 12px;
          margin-bottom: 12px;
        }
        .market-card {
          background-color: #2a2a2a;
          border-radius: 8px;
          padding: 12px;
          border: 1px solid #3a3a3a;
          transition: all 0.2s;
        }
        .market-card:hover {
          border-color: #39FF14;
        }
        .market-pair {
          font-size: 14px;
          font-weight: 600;
          color: #ffffff;
          margin-bottom: 4px;
        }
        .market-price {
          font-size: 16px;
          font-weight: 700;
          color: #39FF14;
          margin-bottom: 4px;
        }
        .market-change {
          font-size: 12px;
          font-weight: 500;
        }
        .market-change.positive {
          color: #39FF14;
        }
        .market-change.negative {
          color: #ff6b6b;
        }
        .view-all-link {
          display: inline-block;
          color: #39FF14;
          text-decoration: none;
          font-size: 14px;
          font-weight: 500;
          margin-top: 8px;
        }
        .view-all-link i {
          font-size: 12px;
          margin-left: 4px;
        }

        /* Features */
        .features-section {
          padding: 0 20px 20px;
        }
        .features-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 16px;
        }
        .feature-card {
          background-color: #2a2a2a;
          border-radius: 12px;
          padding: 16px 12px;
          text-align: center;
          border: 1px solid #3a3a3a;
        }
        .feature-icon {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          background-color: #1c1c1c;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 12px;
          border: 1px solid #39FF14;
          color: #39FF14;
          font-size: 20px;
        }
        .feature-title {
          font-size: 16px;
          font-weight: 600;
          margin-bottom: 4px;
          color: #ffffff;
        }
        .feature-desc {
          font-size: 12px;
          color: #aaaaaa;
          line-height: 1.4;
        }

        /* CTA */
        .cta-section {
          margin: 0 20px 20px;
          background: linear-gradient(135deg, #1c1c1c, #2a2a2a);
          border-radius: 16px;
          padding: 24px 20px;
          text-align: center;
          border: 1px solid #39FF14;
        }
        .cta-content h3 {
          font-size: 20px;
          font-weight: 700;
          color: #39FF14;
          margin-bottom: 8px;
        }
        .cta-content p {
          font-size: 14px;
          color: #aaaaaa;
          margin-bottom: 16px;
        }
        .cta-button {
          display: inline-block;
          background-color: #39FF14;
          color: #000000;
          font-weight: 700;
          padding: 12px 32px;
          border-radius: 30px;
          text-decoration: none;
          transition: background-color 0.2s;
        }
        .cta-button:hover {
          background-color: #2ecc10;
        }

        /* Footer */
        .footer {
          background-color: #1c1c1c;
          padding: 20px;
          text-align: center;
          border-top: 1px solid #2a2a2a;
        }
        .footer-links {
          display: flex;
          justify-content: center;
          gap: 20px;
          margin-bottom: 12px;
        }
        .footer-links a {
          color: #aaaaaa;
          text-decoration: none;
          font-size: 13px;
        }
        .footer-links a:hover {
          color: #39FF14;
        }
        .copyright {
          font-size: 12px;
          color: #777777;
        }

        /* Responsive */
        @media (max-width: 360px) {
          .market-grid {
            gap: 8px;
          }
          .features-grid {
            gap: 10px;
          }
          .feature-card {
            padding: 12px 8px;
          }
        }
      `})]})}export{f as default};
