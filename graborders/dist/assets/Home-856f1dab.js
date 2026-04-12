import{i as n,j as t,k as e,L as f,n as C}from"./index-86a7a122.js";function A(){const[g,m]=n.useState(0),[j,v]=n.useState(0),[o,k]=n.useState([]),[r,h]=n.useState(!1),[p,N]=n.useState(5),[F,c]=n.useState(!0),l=["https://www.icmarkets.com/blog/wp-content/uploads/2017/12/Metal-trading.jpg","https://www.icmarkets.com/blog/wp-content/uploads/2025/09/Earning-report_1-1200x740.png","https://www.icmarkets.com/blog/wp-content/uploads/2018/03/pics-new19-01.png"],x=[t("pages.home.maintenanceNotice"),t("pages.home.newSpreads"),t("pages.home.weekendSupport")];n.useEffect(()=>{const a=setInterval(()=>{m(s=>(s+1)%l.length)},3e3);return()=>clearInterval(a)},[l.length]),n.useEffect(()=>{const a=setInterval(()=>{v(s=>(s+1)%x.length)},4e3);return()=>clearInterval(a)},[x.length]);const y=(a,s=80)=>a.length<=s?a:a.substring(0,s)+"...",z=async()=>{if(!r){h(!0);try{const s=`https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent("https://www.fxstreet.com/rss/news")}`,d=await C.get(s);if(d.data&&d.data.status==="ok"&&d.data.items){const u=d.data.items.map(i=>{var w,b;return{id:i.guid||i.link,title:i.title,description:((w=i.description)==null?void 0:w.replace(/<[^>]*>/g,"").substring(0,120))+"..."||"",image:i.thumbnail||((b=i.enclosure)==null?void 0:b.link)||"",link:i.link,pubDate:i.pubDate,source:"FXStreet"}});k(u),c(u.length>p)}else c(!1)}catch(a){console.error("Error fetching forex news:",a),c(!1)}finally{h(!1)}}},S=()=>{const a=p+5;N(a),c(o.length>a)};n.useEffect(()=>{z()},[]);const D=[{pair:"EUR/USD",price:"1.09234",change:"+0.12%",up:!0,spread:"0.1"},{pair:"GBP/USD",price:"1.26542",change:"-0.05%",up:!1,spread:"0.2"},{pair:"USD/JPY",price:"148.327",change:"+0.23%",up:!0,spread:"0.3"},{pair:"AUD/USD",price:"0.65871",change:"+0.08%",up:!0,spread:"0.4"},{pair:"USD/CAD",price:"1.35219",change:"-0.03%",up:!1,spread:"0.3"},{pair:"BTC/USD",price:"43,215",change:"+2.34%",up:!0,spread:"15.0"}],U=[{icon:"fas fa-bolt",title:t("pages.home.execution"),desc:t("pages.home.executionDesc")},{icon:"fas fa-shield-alt",title:t("pages.home.secure"),desc:t("pages.home.secureDesc")},{icon:"fas fa-chart-line",title:t("pages.home.spreads"),desc:t("pages.home.spreadsDesc")},{icon:"fas fa-headset",title:t("pages.home.support"),desc:t("pages.home.supportDesc")}];return e.jsxs("div",{className:"home-container",children:[e.jsxs("div",{className:"header",children:[e.jsx("div",{className:"logo",children:e.jsx("img",{src:"./images/logo.png",style:{height:"20px"},alt:t("pages.home.logoAlt")})}),e.jsx("div",{className:"header-icons",children:e.jsx(f,{to:"/notification",className:"icon-circle",children:e.jsx("i",{className:"far fa-envelope"})})})]}),e.jsx("div",{className:"hero-section"}),e.jsxs("div",{className:"slideshow-section",children:[e.jsx("div",{className:"section-title",children:t("pages.home.promoTitle")}),e.jsxs("div",{className:"slideshow-container",children:[l.map((a,s)=>e.jsx("div",{className:`slide ${s===g?"active":""}`,children:e.jsx("img",{src:a,alt:`Slide ${s+1}`})},s)),e.jsx("div",{className:"slide-dots",children:l.map((a,s)=>e.jsx("span",{className:`dot ${s===g?"active":""}`,onClick:()=>m(s)},s))})]})]}),e.jsxs("div",{className:"announcements-section",children:[e.jsxs("div",{className:"announcement-header",children:[e.jsx("i",{className:"fas fa-bullhorn"}),e.jsx("span",{children:t("pages.home.title")})]}),e.jsx("div",{className:"announcement-ticker",children:e.jsx("p",{className:"ticker-text",children:y(x[j])})})]}),e.jsxs("div",{className:"market-section",children:[e.jsxs("div",{className:"section-header",children:[e.jsx("div",{className:"section-title",children:t("pages.home.marketTitle")}),e.jsxs(f,{to:"/market",className:"view-all-link",children:[t("pages.home.viewAll")," ",e.jsx("i",{className:"fas fa-chevron-right"})]})]}),e.jsx("div",{className:"market-grid",children:D.map((a,s)=>e.jsxs("div",{className:"market-card",children:[e.jsx("div",{className:"market-pair",children:a.pair}),e.jsx("div",{className:"market-price",children:a.price}),e.jsxs("div",{className:"market-details",children:[e.jsx("span",{className:`market-change ${a.up?"positive":"negative"}`,children:a.change}),e.jsxs("span",{className:"market-spread",children:[t("pages.home.spread"),": ",a.spread]})]})]},s))})]}),e.jsxs("div",{className:"features-section",children:[e.jsx("div",{className:"section-title",children:t("pages.home.featuresTitle")}),e.jsx("div",{className:"features-grid",children:U.map((a,s)=>e.jsxs("div",{className:"feature-card",children:[e.jsx("div",{className:"feature-icon",children:e.jsx("i",{className:a.icon})}),e.jsx("div",{className:"feature-title",children:a.title}),e.jsx("div",{className:"feature-desc",children:a.desc})]},s))})]}),e.jsxs("div",{className:"news-section",children:[e.jsxs("div",{className:"section-header",children:[e.jsxs("div",{className:"section-title",children:[e.jsx("i",{className:"fas fa-newspaper",style:{marginRight:"8px"}}),"Forex News"]}),e.jsxs("a",{href:"https://www.fxstreet.com/news",target:"_blank",rel:"noopener noreferrer",className:"view-all-link",children:["View All ",e.jsx("i",{className:"fas fa-chevron-right"})]})]}),r&&o.length===0?e.jsxs("div",{className:"news-loading",children:[e.jsx("i",{className:"fas fa-spinner fa-spin"}),e.jsx("span",{children:"Loading forex news..."})]}):o.length>0?e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"news-grid",children:o.slice(0,p).map((a,s)=>e.jsxs("a",{href:a.link,target:"_blank",rel:"noopener noreferrer",className:"news-card",children:[a.image&&e.jsx("div",{className:"news-image",children:e.jsx("img",{src:a.image,alt:a.title})}),e.jsxs("div",{className:"news-content",children:[e.jsx("div",{className:"news-title",children:a.title}),e.jsx("div",{className:"news-desc",children:a.description}),e.jsxs("div",{className:"news-meta",children:[e.jsx("span",{className:"news-source",children:a.source}),e.jsx("span",{className:"news-date",children:new Date(a.pubDate).toLocaleDateString()})]})]})]},s))}),F&&e.jsx("button",{className:"load-more-btn",onClick:S,disabled:r,children:r?e.jsxs(e.Fragment,{children:[e.jsx("i",{className:"fas fa-spinner fa-spin"})," Loading..."]}):e.jsxs(e.Fragment,{children:["Load More News ",e.jsx("i",{className:"fas fa-arrow-down"})]})})]}):e.jsxs("div",{className:"news-empty",children:[e.jsx("i",{className:"fas fa-info-circle"}),e.jsx("span",{children:"No news available at the moment"})]})]}),e.jsx("div",{className:"cta-section",children:e.jsxs("div",{className:"cta-content",children:[e.jsx("h3",{children:t("pages.home.ctaTitle")}),e.jsx("p",{children:t("pages.home.ctaDesc")}),e.jsx(f,{to:"/register",className:"cta-button",children:t("pages.home.ctaButton")})]})}),e.jsx("style",{children:`
        .home-container {
          max-width: 430px;
          margin: 0 auto;
          min-height: 100vh;
          background-color: #0f0f0f;
          border-top: 2px solid #39FF14;
          display: flex;
          flex-direction: column;
          color: #ffffff;
          box-sizing: border-box;
          font-family: 'Inter', sans-serif;
        }

        /* Header */
        .header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 16px 20px;
          border-bottom: 1px solid #2a2a2a;
        }
        .logo img { height: 24px; }
        .header-icons { display: flex; gap: 12px; }
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
        .icon-circle:hover { background-color: #39FF14; color: #0f0f0f; }

        /* Hero */
        .hero-section {
          padding: 10px 20px 16px;
          text-align: center;
        }
        .slogan {
          font-size: 22px;
          font-weight: 700;
          color: #39FF14;
          margin-bottom: 8px;
        }
        .hero-sub {
          font-size: 14px;
          color: #aaaaaa;
          margin: 0;
        }

        /* Slideshow */
        .slideshow-section { padding: 0 20px 20px; }
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
        .slide.active { opacity: 1; }
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
        .dot.active { background-color: #39FF14; }

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
        .announcement-ticker { flex: 1; overflow: hidden; }
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
        .market-section { padding: 0 20px 20px; }
        .section-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 16px;
        }
        .market-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 12px;
        }
        .market-card {
          background-color: #2a2a2a;
          border-radius: 8px;
          padding: 12px;
          border: 1px solid #3a3a3a;
          transition: all 0.2s;
        }
        .market-card:hover { border-color: #39FF14; }
        .market-pair {
          font-size: 14px;
          font-weight: 600;
          color: #ffffff;
          margin-bottom: 4px;
        }
        .market-price {
          font-size: 18px;
          font-weight: 700;
          color: #39FF14;
          margin-bottom: 4px;
        }
        .market-details {
          display: flex;
          justify-content: space-between;
          font-size: 12px;
        }
        .market-change.positive { color: #39FF14; }
        .market-change.negative { color: #ff6b6b; }
        .market-spread { color: #aaaaaa; }
        .view-all-link {
          color: #39FF14;
          text-decoration: none;
          font-size: 14px;
          font-weight: 500;
        }
        .view-all-link i { font-size: 12px; margin-left: 4px; }

        /* Features */
        .features-section { padding: 0 20px 20px; }
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
          color: #0f0f0f;
          font-weight: 700;
          padding: 12px 32px;
          border-radius: 30px;
          text-decoration: none;
          transition: background-color 0.2s;
        }
        .cta-button:hover { background-color: #2ecc10; }

        /* Forex News Section */
        .news-section {
          padding: 0 20px 20px;
        }
        .news-grid {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        .news-card {
          display: flex;
          background-color: #2a2a2a;
          border-radius: 12px;
          overflow: hidden;
          text-decoration: none;
          border: 1px solid #3a3a3a;
          transition: all 0.3s ease;
        }
        .news-card:hover {
          border-color: #39FF14;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(57, 255, 20, 0.15);
        }
        .news-image {
          width: 120px;
          min-width: 120px;
          height: 100px;
          overflow: hidden;
        }
        .news-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .news-content {
          padding: 12px;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }
        .news-title {
          font-size: 14px;
          font-weight: 600;
          color: #ffffff;
          line-height: 1.3;
          margin-bottom: 4px;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .news-desc {
          font-size: 12px;
          color: #aaaaaa;
          line-height: 1.4;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .news-meta {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: 8px;
          font-size: 11px;
        }
        .news-source {
          color: #39FF14;
          font-weight: 600;
        }
        .news-date {
          color: #777777;
        }
        .news-loading {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          padding: 40px 20px;
          color: #aaaaaa;
          font-size: 14px;
        }
        .news-loading i {
          color: #39FF14;
          font-size: 20px;
        }
        .news-empty {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 40px 20px;
          color: #777777;
          font-size: 14px;
        }
        .load-more-btn {
          width: 100%;
          margin-top: 16px;
          padding: 14px 20px;
          background-color: #2a2a2a;
          border: 1px solid #39FF14;
          border-radius: 30px;
          color: #39FF14;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
        }
        .load-more-btn:hover:not(:disabled) {
          background-color: #39FF14;
          color: #0f0f0f;
        }
        .load-more-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
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
        .footer-links a:hover { color: #39FF14; }
        .copyright {
          font-size: 12px;
          color: #777777;
        }

        @media (max-width: 360px) {
          .market-grid { gap: 8px; }
          .features-grid { gap: 10px; }
          .feature-card { padding: 12px 8px; }
          .news-card { flex-direction: column; }
          .news-image { width: 100%; height: 140px; }
        }
      `})]})}export{A as default};
