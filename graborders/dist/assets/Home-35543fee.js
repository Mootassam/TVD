import{i as l,j as o,k as e,L as J,n as p}from"./index-a47ef697.js";function be(){const[v,j]=l.useState(0),[G,M]=l.useState(0),[$,w]=l.useState([]),[H,N]=l.useState(!0),[F,y]=l.useState(null),[P,U]=l.useState([]),[_,C]=l.useState(!0),[D,S]=l.useState(null),[z,L]=l.useState(null),m=["/images/slides/forex2.png","/images/slides/gold.png","/images/slides/crypto.png","/images/slides/energy.png","https://www.icmarkets.com/blog/wp-content/uploads/2018/03/pics-new19-01.png"],f=[o("pages.home.maintenanceNotice"),o("pages.home.newSpreads"),o("pages.home.weekendSupport")],X=()=>{const a=new Date;return a.setDate(a.getDate()-1),a.toISOString().split("T")[0]},W=async()=>{var a,s;try{const n=["EUR","GBP","JPY","AUD","CAD","CHF","CNY"].join(",");let t=null,r=null;try{const c=await p.get("https://open.er-api.com/v6/latest/USD",{timeout:1e5});if((a=c.data)!=null&&a.rates){const i=c.data.rates;t={EUR:i.EUR,GBP:i.GBP,JPY:i.JPY,AUD:i.AUD,CAD:i.CAD,CHF:i.CHF,CNY:i.CNY}}}catch(c){console.warn("Primary forex API failed, trying fallback:",c.message)}if(!t)try{t={...(await p.get("https://api.frankfurter.app/latest?from=USD&to=EUR,GBP,JPY,AUD,CAD,CHF",{timeout:5e3})).data.rates,CNY:0}}catch(c){console.warn("Fallback API also failed:",c.message)}t||(t={EUR:.92,GBP:.79,JPY:149.5,AUD:1.53,CAD:1.36,CHF:.88,CNY:7.24});const q=X();try{const c=await p.get(`https://open.er-api.com/v6/latest/USD?date=${q}`,{timeout:5e3});if((s=c.data)!=null&&s.rates){const i=c.data.rates;r={EUR:i.EUR,GBP:i.GBP,JPY:i.JPY,AUD:i.AUD,CAD:i.CAD,CHF:i.CHF,CNY:i.CNY}}}catch{r=t}const A=t.EUR,Y=t.GBP,E=t.JPY,I=t.AUD,R=t.CAD,ie=1/A,ne=1/Y,oe=E,ce=1/I,le=R,K=(r==null?void 0:r.EUR)||A,V=(r==null?void 0:r.GBP)||Y,Z=(r==null?void 0:r.JPY)||E,ee=(r==null?void 0:r.AUD)||I,ae=(r==null?void 0:r.CAD)||R,de=1/K,pe=1/V,xe=Z,me=1/ee,ge=ae,se=(c,i)=>{if(!i||i===0)return"+0.00%";const x=(c-i)/i*100;return`${x>=0?"+":""}${x.toFixed(2)}%`},b=(c,i,x,B,te,re)=>{const k=c==="USD"?x:1/x,T=c==="USD"?B:1/B;return{pair:`${c}/${i}`,price:k.toFixed(te),change:se(k,T),up:k>=T,spread:re}};return[b("USD","EUR",t.EUR,(r==null?void 0:r.EUR)||t.EUR,5,"0.1"),b("USD","GBP",t.GBP,(r==null?void 0:r.GBP)||t.GBP,5,"0.2"),b("USD","JPY",t.JPY,(r==null?void 0:r.JPY)||t.JPY,3,"0.3")]}catch(d){throw console.error("Forex API error:",d),new Error("Failed to fetch forex rates")}},O=async()=>{var a,s;try{let d=0,n=0;try{const t=await p.get("https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd&include_24hr_change=true",{timeout:5e3});d=((a=t.data.bitcoin)==null?void 0:a.usd)||0,n=((s=t.data.bitcoin)==null?void 0:s.usd_24h_change)||0}catch(t){console.warn("CoinGecko API failed, trying fallback:",t.message)}if(!d)try{const t=await p.get("https://api.binance.com/api/v3/ticker/24hr?symbol=BTCUSDT",{timeout:5e3});d=parseFloat(t.data.lastPrice),n=parseFloat(t.data.priceChangePercent)}catch(t){console.warn("Binance fallback also failed:",t.message),d=67e3,n=2.5}return{pair:"BTC/USD",price:d.toLocaleString(void 0,{minimumFractionDigits:0,maximumFractionDigits:0}),change:`${n>=0?"+":""}${n.toFixed(2)}%`,up:n>=0,spread:"15.0"}}catch(d){throw console.error("BTC API error:",d),new Error("Failed to fetch BTC price")}},g=l.useCallback(async()=>{N(!0),y(null);try{const[a,s]=await Promise.all([W(),O()]);w([...a,s]),L(new Date)}catch(a){console.error("Market data error:",a),y("Unable to load live market data. Please refresh."),w([])}finally{N(!1)}},[]),h=async()=>{C(!0),S(null);try{const a="https://feeds.bloomberg.com/markets/news.rss",s=await p.get(`https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(a)}`);if(s.data&&s.data.items){const d=s.data.items.slice(0,18).map(n=>{let t=null;if(n.thumbnail)t=n.thumbnail;else if(n.enclosure&&n.enclosure.link)t=n.enclosure.link;else if(n.description){const r=n.description.match(/<img[^>]+src="([^">]+)"/);r&&r[1]&&(t=r[1])}return t||(t="https://via.placeholder.com/300x160/1c1c1c/39FF14?text=Market+News"),{title:n.title||"Market Update",link:n.link||"#",imageUrl:t,description:n.description?n.description.replace(/<[^>]*>/g,"").substring(0,100):"",pubDate:n.pubDate}});U(d)}else throw new Error("Invalid news response")}catch(a){console.error("News API error:",a),S("Unable to load news. Please try again later."),U([])}finally{C(!1)}};l.useEffect(()=>{const a=setInterval(()=>{j(s=>(s+1)%m.length)},3e3);return()=>clearInterval(a)},[m.length]),l.useEffect(()=>{const a=setInterval(()=>{M(s=>(s+1)%f.length)},4e3);return()=>clearInterval(a)},[f.length]),l.useEffect(()=>{g(),h();const a=setInterval(()=>{g()},3e4),s=setInterval(()=>{h()},3e5);return()=>{clearInterval(a),clearInterval(s)}},[g]);const u=(a,s=80)=>a?a.length<=s?a:a.substring(0,s)+"...":"",Q=[{icon:"fas fa-bolt",title:o("pages.home.execution"),desc:o("pages.home.executionDesc")},{icon:"fas fa-shield-alt",title:o("pages.home.secure"),desc:o("pages.home.secureDesc")},{icon:"fas fa-chart-line",title:o("pages.home.spreads"),desc:o("pages.home.spreadsDesc")},{icon:"fas fa-headset",title:o("pages.home.support"),desc:o("pages.home.supportDesc")}];return e.jsxs("div",{className:"home-container",children:[e.jsxs("div",{className:"header",children:[e.jsx("div",{className:"logo",children:e.jsx("img",{src:"./images/logo.png",style:{height:"20px"},alt:o("pages.home.logoAlt")})}),e.jsx("div",{className:"header-icons",children:e.jsx(J,{to:"/notification",className:"icon-circle",children:e.jsx("i",{className:"far fa-envelope"})})})]}),e.jsx("div",{className:"hero-section"}),e.jsxs("div",{className:"slideshow-section",children:[e.jsx("div",{className:"section-title",children:o("pages.home.promoTitle")}),e.jsxs("div",{className:"slideshow-container",children:[m.map((a,s)=>e.jsx("div",{className:`slide ${s===v?"active":""}`,children:e.jsx("img",{src:a,alt:`Slide ${s+1}`})},s)),e.jsx("div",{className:"slide-dots",children:m.map((a,s)=>e.jsx("span",{className:`dot ${s===v?"active":""}`,onClick:()=>j(s)},s))})]})]}),e.jsxs("div",{className:"announcements-section",children:[e.jsxs("div",{className:"announcement-header",children:[e.jsx("i",{className:"fas fa-bullhorn"}),e.jsx("span",{children:o("pages.home.title")})]}),e.jsx("div",{className:"announcement-ticker",children:e.jsx("p",{className:"ticker-text",children:u(f[G])})})]}),e.jsxs("div",{className:"market-section",children:[e.jsxs("div",{className:"section-header",children:[e.jsx("div",{className:"section-title",children:o("pages.home.marketTitle")}),e.jsxs(J,{to:"/market",className:"view-all-link",children:[o("pages.home.viewAll")," ",e.jsx("i",{className:"fas fa-chevron-right"})]})]}),z&&e.jsxs("div",{className:"last-update",children:[e.jsx("i",{className:"fas fa-sync-alt"})," Updated: ",z.toLocaleTimeString()]}),H?e.jsx("div",{className:"loading-skeleton",children:[...Array(6)].map((a,s)=>e.jsxs("div",{className:"market-card skeleton",children:[e.jsx("div",{className:"skeleton-line"}),e.jsx("div",{className:"skeleton-line"}),e.jsx("div",{className:"skeleton-line short"})]},s))}):F?e.jsxs("div",{className:"error-message",children:[e.jsx("i",{className:"fas fa-exclamation-triangle"})," ",F,e.jsx("button",{onClick:g,className:"retry-btn",children:"Retry"})]}):e.jsx("div",{className:"market-grid",children:$.map((a,s)=>e.jsxs("div",{className:"market-card",children:[e.jsx("div",{className:"market-pair",children:a.pair}),e.jsx("div",{className:"market-price",children:a.price}),e.jsxs("div",{className:"market-details",children:[e.jsx("span",{className:`market-change ${a.up?"positive":"negative"}`,children:a.change}),e.jsxs("span",{className:"market-spread",children:[o("pages.home.spread"),": ",a.spread]})]})]},s))})]}),e.jsxs("div",{className:"news-section",children:[e.jsx("div",{className:"section-header",children:e.jsxs("div",{className:"section-title",children:[e.jsx("i",{className:"fas fa-newspaper"})," Market News"]})}),_?e.jsx("div",{className:"news-horizontal",children:[...Array(5)].map((a,s)=>e.jsxs("div",{className:"news-card skeleton-news",children:[e.jsx("div",{className:"skeleton-image"}),e.jsx("div",{className:"skeleton-title"}),e.jsx("div",{className:"skeleton-text"})]},s))}):D?e.jsxs("div",{className:"error-message",children:[e.jsx("i",{className:"fas fa-exclamation-triangle"})," ",D,e.jsx("button",{onClick:h,className:"retry-btn",children:"Retry"})]}):P.length>0?e.jsx("div",{className:"news-horizontal",children:P.map((a,s)=>e.jsxs("a",{href:a.link,target:"_blank",rel:"noopener noreferrer",className:"news-card",children:[e.jsx("div",{className:"news-image",children:e.jsx("img",{src:a.imageUrl,alt:a.title})}),e.jsxs("div",{className:"news-content",children:[e.jsx("h4",{className:"news-title",children:u(a.title,60)}),e.jsx("p",{className:"news-desc",children:u(a.description,80)}),e.jsx("span",{className:"news-source",children:"Bloomberg Markets"})]})]},s))}):e.jsx("div",{className:"no-data-message",children:"No news available at the moment."})]}),e.jsxs("div",{className:"features-section",children:[e.jsx("div",{className:"section-title",children:o("pages.home.featuresTitle")}),e.jsx("div",{className:"features-grid",children:Q.map((a,s)=>e.jsxs("div",{className:"feature-card",children:[e.jsx("div",{className:"feature-icon",children:e.jsx("i",{className:a.icon})}),e.jsx("div",{className:"feature-title",children:a.title}),e.jsx("div",{className:"feature-desc",children:a.desc})]},s))})]}),e.jsxs("div",{className:"stats-section",children:[e.jsxs("div",{className:"section-title",children:[e.jsx("i",{className:"fas fa-chart-bar"})," Platform Statistics"]}),e.jsxs("div",{className:"stats-grid",children:[e.jsxs("div",{className:"stat-card",children:[e.jsx("div",{className:"stat-value",children:"10M+"}),e.jsx("div",{className:"stat-label",children:"Trades Executed"})]}),e.jsxs("div",{className:"stat-card",children:[e.jsx("div",{className:"stat-value",children:"180+"}),e.jsx("div",{className:"stat-label",children:"Countries Supported"})]}),e.jsxs("div",{className:"stat-card",children:[e.jsx("div",{className:"stat-value",children:"0.01s"}),e.jsx("div",{className:"stat-label",children:"Avg Execution"})]}),e.jsxs("div",{className:"stat-card",children:[e.jsx("div",{className:"stat-value",children:"24/7"}),e.jsx("div",{className:"stat-label",children:"Customer Support"})]})]})]}),e.jsxs("div",{className:"why-choose-section",children:[e.jsxs("div",{className:"section-title",children:[e.jsx("i",{className:"fas fa-check-circle"})," Why Choose Us"]}),e.jsxs("div",{className:"benefits-list",children:[e.jsxs("div",{className:"benefit-item",children:[e.jsx("i",{className:"fas fa-shield-alt"}),e.jsxs("div",{children:[e.jsx("strong",{children:"Regulated & Secure"}),e.jsx("p",{children:"Fully regulated with segregated client funds"})]})]}),e.jsxs("div",{className:"benefit-item",children:[e.jsx("i",{className:"fas fa-tachometer-alt"}),e.jsxs("div",{children:[e.jsx("strong",{children:"Lightning Fast"}),e.jsx("p",{children:"Ultra-low latency execution under 10ms"})]})]}),e.jsxs("div",{className:"benefit-item",children:[e.jsx("i",{className:"fas fa-percentage"}),e.jsxs("div",{children:[e.jsx("strong",{children:"Raw Spreads"}),e.jsx("p",{children:"Starting from 0.0 pips with no markup"})]})]}),e.jsxs("div",{className:"benefit-item",children:[e.jsx("i",{className:"fas fa-mobile-alt"}),e.jsxs("div",{children:[e.jsx("strong",{children:"Trade Anywhere"}),e.jsx("p",{children:"Mobile, tablet & desktop platforms"})]})]})]})]}),e.jsx("style",{children:`
        .home-container {
          max-width: 400px;
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
        
        /* Slideshow */
        .slideshow-section { padding: 0 20px 20px; }
        .section-title {
          font-size: 18px;
          font-weight: 600;
          margin-bottom: 16px;
          color: #ffffff;
          border-left: 4px solid #39FF14;
          padding-left: 12px;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .slideshow-container {
          position: relative;
          width: 100%;
          height: 202px;
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
          // object-fit: cover;
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
        .last-update {
          font-size: 11px;
          color: #888;
          text-align: right;
          margin-bottom: 12px;
          display: flex;
          justify-content: flex-end;
          align-items: center;
          gap: 6px;
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
          display: flex;
          align-items: center;
          gap: 4px;
        }
        .view-all-link i { font-size: 12px; }
        
        /* News Section */
        .news-section {
          padding: 0 20px 24px;
        }
        .news-horizontal {
         display: grid;
    grid-auto-columns: max-content;
    flex-direction: column;
    gap: 16px;
    overflow-x: auto;
    grid-template-columns: repeat(2, 1fr);
    padding-bottom: 8px;
        }
        .news-horizontal::-webkit-scrollbar {
          height: 4px;
        }
        .news-horizontal::-webkit-scrollbar-track {
          background: #2a2a2a;
          border-radius: 4px;
        }
        .news-horizontal::-webkit-scrollbar-thumb {
          background: #39FF14;
          border-radius: 4px;
        }
        .news-card {
          flex: 0 0 280px;
          background-color: #1c1c1c;
          border-radius: 12px;
          overflow: hidden;
          border: 1px solid #3a3a3a;
          transition: all 0.2s;
          text-decoration: none;
          color: #ffffff;
          display: flex;
          flex-direction: column;
        }
        .news-card:hover {
          border-color: #39FF14;
          transform: translateY(-2px);
        }
        .news-image {
          width: 100%;
          height: 140px;
          overflow: hidden;
          background-color: #2a2a2a;
        }
        .news-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.3s;
        }
        .news-card:hover .news-image img {
          transform: scale(1.05);
        }
        .news-content {
          padding: 12px;
          flex: 1;
          display: flex;
          flex-direction: column;
        }
        .news-title {
          font-size: 14px;
          font-weight: 600;
          margin: 0 0 6px 0;
          line-height: 1.4;
          color: #ffffff;
        }
        .news-desc {
          font-size: 12px;
          color: #aaaaaa;
          line-height: 1.4;
          margin: 0 0 8px 0;
          flex: 1;
        }
        .news-source {
          font-size: 10px;
          color: #39FF14;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        
        /* Loading Skeletons */
        .loading-skeleton {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 12px;
        }
        .skeleton, .skeleton-news {
          background-color: #2a2a2a;
          border-radius: 8px;
          padding: 12px;
        }
        .skeleton-line {
          height: 14px;
          background: linear-gradient(90deg, #2a2a2a 25%, #3a3a3a 50%, #2a2a2a 75%);
          background-size: 200% 100%;
          animation: shimmer 1.5s infinite;
          border-radius: 4px;
          margin-bottom: 8px;
        }
        .skeleton-line.short { width: 60%; }
        .skeleton-image {
          height: 140px;
          background: linear-gradient(90deg, #2a2a2a 25%, #3a3a3a 50%, #2a2a2a 75%);
          background-size: 200% 100%;
          animation: shimmer 1.5s infinite;
        }
        .skeleton-title {
          height: 16px;
          width: 80%;
          margin: 12px 0 8px;
          background: linear-gradient(90deg, #2a2a2a 25%, #3a3a3a 50%, #2a2a2a 75%);
          background-size: 200% 100%;
          animation: shimmer 1.5s infinite;
          border-radius: 4px;
        }
        .skeleton-text {
          height: 12px;
          width: 90%;
          background: linear-gradient(90deg, #2a2a2a 25%, #3a3a3a 50%, #2a2a2a 75%);
          background-size: 200% 100%;
          animation: shimmer 1.5s infinite;
          border-radius: 4px;
        }
        @keyframes shimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
        
        /* Error and Retry */
        .error-message {
          background-color: rgba(255, 107, 107, 0.1);
          border: 1px solid #ff6b6b;
          border-radius: 8px;
          padding: 16px;
          text-align: center;
          color: #ff6b6b;
          font-size: 14px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 12px;
        }
        .retry-btn {
          background-color: #39FF14;
          color: #0f0f0f;
          border: none;
          padding: 6px 16px;
          border-radius: 20px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
        }
        .retry-btn:hover {
          background-color: #2ecc10;
        }
        .no-data-message {
          text-align: center;
          padding: 32px;
          color: #888;
          background-color: #1c1c1c;
          border-radius: 12px;
        }
        
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
          .news-card { flex: 0 0 260px; }
        }
        
        /* Stats Section */
        .stats-section { padding: 0 20px 20px; }
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 12px;
        }
        .stat-card {
          background: linear-gradient(135deg, #1c1c1c 0%, #2a2a2a 100%);
          border-radius: 12px;
          padding: 16px;
          text-align: center;
          border: 1px solid #39FF14;
        }
        .stat-value {
          font-size: 24px;
          font-weight: 700;
          color: #39FF14;
          margin-bottom: 4px;
        }
        .stat-label {
          font-size: 11px;
          color: #aaaaaa;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        
        /* Instruments Section */
        .instruments-section { padding: 0 20px 20px; }
        .instruments-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 10px;
        }
        .instrument-card {
          background-color: #2a2a2a;
          border-radius: 10px;
          padding: 14px 10px;
          text-align: center;
          border: 1px solid #3a3a3a;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
          transition: all 0.2s;
        }
        .instrument-card:hover {
          border-color: #39FF14;
          transform: translateY(-2px);
        }
        .instrument-card i {
          font-size: 24px;
          color: #39FF14;
        }
        .instrument-card span {
          font-size: 12px;
          color: #ffffff;
          font-weight: 500;
        }
        
        /* Why Choose Us Section */
        .why-choose-section { padding: 0 20px 24px; }
        .benefits-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .benefit-item {
          background-color: #2a2a2a;
          border-radius: 12px;
          padding: 14px;
          display: flex;
          align-items: flex-start;
          gap: 14px;
          border: 1px solid #3a3a3a;
          transition: all 0.2s;
        }
        .benefit-item:hover {
          border-color: #39FF14;
        }
        .benefit-item i {
          font-size: 24px;
          color: #39FF14;
          min-width: 32px;
        }
        .benefit-item strong {
          display: block;
          color: #ffffff;
          font-size: 14px;
          margin-bottom: 4px;
        }
        .benefit-item p {
          margin: 0;
          font-size: 12px;
          color: #aaaaaa;
          line-height: 1.4;
        }
        
        /* Floating CTA */
        .floating-cta {
          position: fixed;
          bottom: 24px;
          left: 50%;
          transform: translateX(-50%);
          z-index: 100;
        }
        .floating-cta-btn {
          display: flex;
          align-items: center;
          gap: 8px;
          background: linear-gradient(135deg, #39FF14 0%, #2ecc10 100%);
          color: #0f0f0f;
          font-weight: 700;
          padding: 14px 28px;
          border-radius: 30px;
          text-decoration: none;
          box-shadow: 0 4px 20px rgba(57, 255, 20, 0.4);
          transition: all 0.2s;
          font-size: 15px;
        }
        .floating-cta-btn:hover {
          transform: scale(1.05);
          box-shadow: 0 6px 25px rgba(57, 255, 20, 0.6);
        }
      `})]})}export{be as default};
