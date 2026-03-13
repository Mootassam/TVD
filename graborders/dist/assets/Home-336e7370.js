import{i as r,j as s,k as e,L as t}from"./index-680400b2.js";function h(){const[c,d]=r.useState(0),[l,m]=r.useState(0),n=["./images/slides/1.png","./images/slides/2.png","./images/slides/3.png"],o=[s("pages.home.announcements.maintenanceNotice"),s("pages.home.announcements.contractServerUpgrade"),s("pages.home.announcements.binexOptionsMaintenance"),s("pages.home.announcements.clientVersionUpgrade"),s("pages.home.announcements.platformTradingAnnouncement"),s("pages.home.announcements.platformUpgradeOptimization"),s("pages.home.announcements.march15Upgrade"),s("pages.home.announcements.optionsTradingMaintenance"),s("pages.home.announcements.latestVersionUpgrade"),s("pages.home.announcements.userSecurityReminder"),s("pages.home.announcements.perpetualContractUpgrade"),s("pages.home.announcements.maintenanceCompletion"),s("pages.home.announcements.bitcoinWithdrawal"),s("pages.home.announcements.tradingPairsUpgrade"),s("pages.home.announcements.ethWalletMaintenance"),s("pages.home.announcements.ethHardFork"),s("pages.home.announcements.identityAuthUpdate"),s("pages.home.announcements.filIncomeIssuance"),s("pages.home.announcements.apiOrderLimit"),s("pages.home.announcements.customerChatFunction"),s("pages.home.announcements.ethNetworkUpgrade"),s("pages.home.announcements.delistingCurrencies"),s("pages.home.announcements.dotUSDLaunch"),s("pages.home.announcements.decUSDLaunch"),s("pages.home.announcements.USDIntroduction"),s("pages.home.announcements.ethereumNetworkMaintenance"),s("pages.home.announcements.projectReviewStandards"),s("pages.home.announcements.liquidityMiningUpgrade"),s("pages.home.announcements.liquidityMiningFee"),s("pages.home.announcements.delistingTradingPairs"),s("pages.home.announcements.systemTemporaryMaintenance"),s("pages.home.announcements.temporaryRechargeSuspension"),s("pages.home.announcements.delistingNotification"),s("pages.home.announcements.serverUpgrade"),s("pages.home.announcements.serverNetworkUpgrade"),s("pages.home.announcements.appDownloadOpen")];r.useEffect(()=>{const a=setInterval(()=>{d(i=>(i+1)%n.length)},3e3);return()=>clearInterval(a)},[n.length]),r.useEffect(()=>{const a=setInterval(()=>{m(i=>(i+1)%o.length)},4e3);return()=>clearInterval(a)},[o.length]);const p=(a,i=80)=>a.length<=i?a:a.substring(0,i)+"...";return e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"container background",children:[e.jsxs("div",{className:"hero-section",children:[e.jsxs("div",{className:"header",children:[e.jsx("div",{className:"logo",children:e.jsx("img",{src:"./images/logo.png",style:{height:"32px"},alt:s("pages.home.logoAlt")})}),e.jsxs("div",{className:"header-icons",children:[e.jsx(t,{to:"/notification",className:"icon-circle",children:e.jsx("div",{className:"icon-circle",children:e.jsx("i",{className:"far fa-envelope"})})}),e.jsx(t,{to:"/profile",className:"icon-circle",children:e.jsx("i",{className:"far fa-user"})})]})]}),e.jsx("div",{className:"crypto-illustration",children:e.jsx("img",{src:"./images/header.png",alt:s("pages.home.headerAlt"),style:{height:"100%",width:"100%",objectFit:"contain"}})}),e.jsx("div",{className:"slogan",children:s("pages.home.slogan")})]}),e.jsxs("div",{style:{padding:"0px 16px"},children:[e.jsx("div",{className:"promo-banner",children:e.jsxs("div",{className:"slider-container",children:[e.jsx("div",{className:"slides-wrapper",style:{transform:`translateX(-${c*100}%)`,transition:"transform 0.5s ease-in-out"},children:n.map((a,i)=>e.jsx("div",{className:"slide",children:e.jsx("img",{src:a,alt:s("pages.home.promoAlt",i+1),className:"promo__images"})},i))}),e.jsx("div",{className:"pagination-dots",children:n.map((a,i)=>e.jsx("div",{className:`dot ${i===c?"active":""}`,onClick:()=>d(i)},i))})]})}),e.jsxs("div",{className:"announcement-card",children:[e.jsx("div",{className:"announcement-icon",children:e.jsx("i",{className:"fas fa-bullhorn"})}),e.jsx("div",{className:"announcement-content",children:e.jsx("div",{className:"announcement-text",children:e.jsx("div",{className:"announcement-desc",children:p(o[l])})},l)})]}),e.jsx(t,{to:"/trade",className:"remove_blue",children:e.jsx("div",{className:"feature-card",children:e.jsxs("div",{className:"quick-trade-header",children:[e.jsxs("div",{children:[e.jsxs("div",{className:"card-title",children:[e.jsx("span",{className:"highlight",children:s("pages.home.quickTrade.highlight")}),s("pages.home.quickTrade.title")]}),e.jsx("div",{className:"card-subtitle",children:s("pages.home.quickTrade.subtitle")})]}),e.jsx("div",{className:"arrow-button",children:e.jsx("i",{className:"fas fa-arrow-right"})})]})})}),e.jsx(t,{to:"/product/details/9",className:"remove_blue",children:e.jsxs("div",{className:"ai-card",children:[e.jsx("div",{className:"ai-title",children:s("pages.home.aiTrading.title")}),e.jsx("div",{className:"ai-description",children:s("pages.home.aiTrading.description")})]})}),e.jsx(t,{to:"/product/details/10",className:"remove_blue",children:e.jsxs("div",{className:"ai-card2",children:[e.jsx("div",{className:"ai-title",children:s("pages.home.nftExploration.title")}),e.jsx("div",{className:"ai-description",children:s("pages.home.nftExploration.description")})]})}),e.jsxs("div",{className:"stats-section",children:[e.jsx("div",{className:"section-title",children:s("pages.home.stats.title")}),e.jsxs("div",{className:"stats-grid",children:[e.jsxs("div",{className:"stat-item",children:[e.jsx("div",{className:"stat-value",children:s("pages.home.stats.users")}),e.jsx("div",{className:"stat-label",children:s("pages.home.stats.usersLabel")})]}),e.jsxs("div",{className:"stat-item",children:[e.jsx("div",{className:"stat-value",children:s("pages.home.stats.organizations")}),e.jsx("div",{className:"stat-label",children:s("pages.home.stats.organizationsLabel")})]}),e.jsxs("div",{className:"stat-item",children:[e.jsx("div",{className:"stat-value",children:s("pages.home.stats.liquidity")}),e.jsx("div",{className:"stat-label",children:s("pages.home.stats.liquidityLabel")})]}),e.jsxs("div",{className:"stat-item",children:[e.jsx("div",{className:"stat-value",children:s("pages.home.stats.orders")}),e.jsx("div",{className:"stat-label",children:s("pages.home.stats.ordersLabel")})]})]})]}),e.jsxs("div",{className:"services-section",children:[e.jsx("div",{className:"section-title",children:s("pages.home.services.title")}),e.jsx("div",{className:"section-subtitle",children:s("pages.home.services.subtitle")}),e.jsxs("div",{className:"services-grid",children:[e.jsxs("div",{className:"service-item",children:[e.jsx("div",{className:"service-icon",children:e.jsx("img",{src:"./images/services/s1.png",className:"service__image",alt:s("pages.home.services.highInterest.alt")})}),e.jsxs("div",{className:"service__description",children:[e.jsx("div",{className:"service-title",children:s("pages.home.services.highInterest.title")}),e.jsx("div",{className:"service-desc",children:s("pages.home.services.highInterest.desc")})]})]}),e.jsxs("div",{className:"service-item",children:[e.jsx("div",{className:"service-icon",children:e.jsx("img",{src:"./images/services/s2.png",alt:s("pages.home.services.liquidityMining.alt"),className:"service__image"})}),e.jsxs("div",{className:"service__description",children:[e.jsx("div",{className:"service-title",children:s("pages.home.services.liquidityMining.title")}),e.jsx("div",{className:"service-desc",children:s("pages.home.services.liquidityMining.desc")})]})]}),e.jsxs("div",{className:"service-item",children:[e.jsx("div",{className:"service-icon",children:e.jsx("img",{src:"./images/services/s3.png",alt:s("pages.home.services.service24h.alt"),className:"service__image"})}),e.jsxs("div",{className:"service__description",children:[e.jsx("div",{className:"service-title",children:s("pages.home.services.service24h.title")}),e.jsx("div",{className:"service-desc",children:s("pages.home.services.service24h.desc")})]})]}),e.jsxs("div",{className:"service-item",children:[e.jsx("div",{className:"service-icon",children:e.jsx("img",{src:"./images/services/s4.png",alt:s("pages.home.services.highContract.alt"),className:"service__image"})}),e.jsxs("div",{className:"service__description",children:[e.jsx("div",{className:"service-title",children:s("pages.home.services.highContract.title")}),e.jsx("div",{className:"service-desc",children:s("pages.home.services.highContract.desc")})]})]}),e.jsxs("div",{className:"service-item",children:[e.jsx("div",{className:"service-icon",children:e.jsx("img",{src:"./images/services/s5.png",alt:s("pages.home.services.expertTeam.alt"),className:"service__image"})}),e.jsxs("div",{className:"service__description",children:[e.jsx("div",{className:"service-title",children:s("pages.home.services.expertTeam.title")}),e.jsx("div",{className:"service-desc",children:s("pages.home.services.expertTeam.desc")})]})]}),e.jsxs("div",{className:"service-item",children:[e.jsx("div",{className:"service-icon",children:e.jsx("img",{src:"./images/services/s6.png",alt:s("pages.home.services.securityProtection.alt"),className:"service__image"})}),e.jsxs("div",{className:"service__description",children:[e.jsx("div",{className:"service-title",children:s("pages.home.services.securityProtection.title")}),e.jsx("div",{className:"service-desc",children:s("pages.home.services.securityProtection.desc")})]})]})]})]}),e.jsxs("div",{className:"demo-section",children:[e.jsx("div",{className:"section-title",children:s("pages.home.demo.fastSwap.title")}),e.jsx("div",{className:"section-subtitle",children:s("pages.home.demo.fastSwap.subtitle")}),e.jsx("div",{className:"demo-photo",children:e.jsx("img",{src:"./images/demo/phone1.png",alt:s("pages.home.demo.fastSwap.alt"),className:"image_demo"})})]}),e.jsxs("div",{className:"demo-section",children:[e.jsx("div",{className:"section-title",children:s("pages.home.demo.advancedTraders.title")}),e.jsx("div",{className:"section-subtitle",children:s("pages.home.demo.advancedTraders.subtitle")}),e.jsx("div",{className:"demo-photo",children:e.jsx("img",{src:"./images/demo/phone2.png",alt:s("pages.home.demo.advancedTraders.alt"),className:"image_demo"})})]}),e.jsxs("div",{className:"demo-section",children:[e.jsx("div",{className:"section-title",children:s("pages.home.demo.walletManagement.title")}),e.jsx("div",{className:"section-subtitle",children:s("pages.home.demo.walletManagement.subtitle")}),e.jsx("div",{className:"demo-photo",children:e.jsx("img",{src:"./images/demo/phone3.png",alt:s("pages.home.demo.walletManagement.alt"),className:"image_demo"})})]}),e.jsxs("div",{className:"demo-section",children:[e.jsx("div",{className:"section-title",children:s("pages.home.demo.liquidityMining.title")}),e.jsx("div",{className:"section-subtitle",children:s("pages.home.demo.liquidityMining.subtitle")}),e.jsx("div",{className:"demo-photo",children:e.jsx("img",{src:"./images/demo/phone4.png",alt:s("pages.home.demo.liquidityMining.alt"),className:"image_demo"})})]}),e.jsxs("div",{className:"demo-section",children:[e.jsx("div",{className:"section-title",children:s("pages.home.demo.startTrading.title")}),e.jsx("div",{className:"section-subtitle",children:s("pages.home.demo.startTrading.subtitle")}),e.jsx("div",{className:"demo-photo",children:e.jsx("img",{src:"./images/demo/phone5.png",alt:s("pages.home.demo.startTrading.alt"),className:"image_demo"})})]}),e.jsxs("div",{className:"news-section",children:[e.jsx("div",{className:"section-title",children:s("pages.home.news.title")}),e.jsx(t,{to:"/product/details/11",className:"remove_blue",children:e.jsxs("div",{className:"news-item",children:[e.jsxs("div",{children:[e.jsx("div",{className:"news-date",children:s("pages.home.news.elonMusk.date")}),e.jsx("div",{className:"news-title",children:s("pages.home.news.elonMusk.title")})]}),e.jsx("div",{children:e.jsx("img",{src:"./images/news/elon.jpg",alt:s("pages.home.news.elonMusk.alt"),style:{width:"128px",height:"72px",objectFit:"cover"}})})]})}),e.jsx(t,{to:"/product/details/12",className:"remove_blue",children:e.jsxs("div",{className:"news-item",children:[e.jsxs("div",{children:[e.jsx("div",{className:"news-date",children:s("pages.home.news.bitcoinRecord.date")}),e.jsx("div",{className:"news-title",children:s("pages.home.news.bitcoinRecord.title")})]}),e.jsx("div",{children:e.jsx("img",{src:"./images/news/bitcoin.jpg",alt:s("pages.home.news.bitcoinRecord.alt"),style:{width:"128px",height:"72px",objectFit:"cover"}})})]})}),e.jsx(t,{to:"/product/details/13",className:"remove_blue",children:e.jsxs("div",{className:"news-item",children:[e.jsxs("div",{children:[e.jsx("div",{className:"news-date",children:s("pages.home.news.trumpStatue.date")}),e.jsx("div",{className:"news-title",children:s("pages.home.news.trumpStatue.title")})]}),e.jsx("img",{src:"./images/news/trump.jpg",alt:s("pages.home.news.trumpStatue.alt"),style:{width:"128px",height:"72px",objectFit:"cover"}})]})})]}),e.jsxs("div",{className:"partners-section",children:[e.jsx("div",{className:"partners-title",children:s("pages.home.partners.title")}),e.jsx("p",{className:"description__t",children:s("pages.home.partners.description")}),e.jsxs("div",{className:"partners-grid",children:[e.jsx("div",{className:"partner-item",children:s("pages.home.partners.binance")}),e.jsx("div",{className:"partner-item",children:s("pages.home.partners.coinbase")}),e.jsx("div",{className:"partner-item",children:s("pages.home.partners.kraken")}),e.jsx("div",{className:"partner-item",children:s("pages.home.partners.ftx")}),e.jsx("div",{className:"partner-item",children:s("pages.home.partners.bitfinex")}),e.jsx("div",{className:"partner-item",children:s("pages.home.partners.huobi")})]})]})]})]}),e.jsx("style",{children:`
        .remove_blue {
          text-decoration: none;
          color: inherit;
        }
        
        .remove_blue:hover {
          text-decoration: none;
          color: inherit;
        }
        
        .news-item {
          cursor: pointer;
          transition: background-color 0.2s ease;
        }
   
        .promo__images { 
            width: 100%;
            object-fit: cover;
            display: block;
        }

        .description__t {
            font-size: 10px;
            color: #888f99;
            margin-top: 10px;
            text-align: center;
        }

        .demo-photo { 
            display: flex;  
            justify-content: center;
        }

        .image_demo { 
            width: 70%;
            max-width: 300px;
        }

        .service__image { 
            width: 50px;
            height: 50px;
            object-fit: contain;
        }

        .service__description { 
            display: flex;
            flex-direction: column;
        }

        .header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 16px 0;
        }

        .logo {
            font-size: 24px;
            font-weight: 800;
            color: #106cf5;
            display: flex;
            align-items: center;
        }

        .logo-icon {
            margin-right: 8px;
            font-size: 22px;
        }

        .header-icons {
            display: flex;
            gap: 10px;
            align-items: center;
        }

        .icon-circle {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #fff;
            font-size: 18px;
            background: rgba(255, 255, 255, 0.2);
            text-decoration: none;
            transition: background 0.3s ease;
        }

        .icon-circle:hover {
            background: rgba(255, 255, 255, 0.3);
        }

        /* Hero Section */
        .hero-section {
            text-align: center;
            background: linear-gradient(180deg, #0c396c, #0a66ff, #f2f4f7);
            padding: 0px 10px;
        }

        .crypto-illustration {
            width: 100%;
            max-width: 280px;
            height: 200px;
            margin: 0 auto 20px;
            border-radius: 20px;
            display: flex;
            align-items: center;
            justify-content: center;
            position: relative;
            overflow: hidden;
            box-shadow: 0 10px 20px rgba(16, 108, 245, 0.15);
        }

        .coin {
            position: absolute;
            width: 60px;
            height: 60px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: bold;
            color: white;
            font-size: 24px;
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
        }

        .bitcoin {
            background: linear-gradient(135deg, #F7931A 0%, #F15A24 100%);
            top: 30px;
            left: 50px;
            animation: float 4s ease-in-out infinite;
        }

        .ethereum {
            background: linear-gradient(135deg, #627EEA 0%, #8A63D2 100%);
            bottom: 40px;
            right: 50px;
            animation: float 4s ease-in-out infinite 1s;
        }

        .hand {
            position: absolute;
            bottom: 0;
            width: 120px;
            height: 100px;
            background: #FFD7B5;
            border-radius: 50% 50% 0 0;
            z-index: 2;
        }

        .slogan {
            color: #106cf5;
            font-size: 18px;
            font-weight: 600;
            margin-top: 10px;
            padding-bottom: 20px;
        }

        /* Promo Banner - Auto Slider */
        .promo-banner {
            color: white;
            position: relative;
        }

        .slider-container {
            position: relative;
            width: 100%;
            overflow: hidden;
            border-radius: 16px;
        }

        .slides-wrapper {
            display: flex;
            height: 100%;
        }

        .slide {
            width: 100%;
            height: 100%;
            flex-shrink: 0;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .pagination-dots {
            display: flex;
            justify-content: center;
            margin-top: 12px;
            gap: 6px;
        }

        .dot {
            width: 6px;
            height: 6px;
            border-radius: 50%;
            background: rgba(0, 0, 0, 0.2);
            cursor: pointer;
            transition: all 0.3s ease;
        }

        .dot.active {
            background: #106cf5;
            width: 20px;
            border-radius: 3px;
        }

        /* Announcement Card - Single Text Version */
        .announcement-card {
            background: #fff;
            border-radius: 10px;
            padding: 15px;
            margin-bottom: 16px;
            display: flex;
            align-items: center;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
            margin-top: 10px;
            position: relative;
            overflow: hidden;
        }

        .announcement-icon {
            width: 30px;
            height: 30px;
            border-radius: 50%;
            background: #f0f7ff;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #106cf5;
            margin-right: 12px;
            font-size: 13px;
            flex-shrink: 0;
            z-index: 2;
        }

        .announcement-content {
            flex: 1;
            position: relative;
            min-height: 40px;
            display: flex;
            align-items: center;
        }

        .announcement-text {
            position: absolute;
            width: 100%;
            opacity: 0;
            transform: translateY(10px);
            animation: fadeInUp 0.5s ease forwards;
        }

        @keyframes fadeInUp {
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }

        .announcement-desc {
            font-size: 13px;
            color: #666;
            line-height: 1.4;
            max-height: 36px;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
        }

        /* Feature Cards */
        .feature-card {
            background: #fff;
            border-radius: 16px;
            padding: 10px 20px;
            margin-bottom: 16px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
        }

        .quick-trade-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        .card-title {
            font-size: 18px;
            font-weight: 700;
        }

        .highlight {
            color: #106cf5;
        }

        .card-subtitle {
            font-size: 14px;
            color: #666;
            margin-bottom: 12px;
        }

        .arrow-button {
            width: 36px;
            height: 36px;
            border-radius: 50%;
            background: #106cf5;
            color: white;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 16px;
        }

        .ai-card {
            background: #f2f4f7;
            border-radius: 16px;
            padding: 20px;
            margin-bottom: 20px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
            background-image: url('./images/ai.png');
            background-size: cover;
            width: 100%;
            background-position: center;  
            background-repeat: no-repeat;
            height: 470px;
            display: flex;
            flex-direction: column;
        }

        .ai-card2 {
            background: #f2f4f7;
            border-radius: 16px;
            padding: 20px;
            margin-bottom: 20px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
            background-image: url('./images/ai2.png');
            background-size: cover;
            width: 100%;
            background-position: center;  
            background-repeat: no-repeat;
            height: 470px;
            display: flex;
            flex-direction: column;
        }

        .ai-title {
            font-size: 20px;
            font-weight: 700;
            margin-bottom: 8px;
            color: #222;
        }

        .ai-description {
            font-size: 14px;
            color: #888f99;
        }

        /* Stats Section */
        .stats-section {
            background: #f2f4f7;
            border-radius: 16px;
            padding: 20px;
            margin-bottom: 20px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
        }

        .section-title {
            font-size: 20px;
            font-weight: 700;
            color: #222;
            margin-bottom: 10px;
        }

        .section-subtitle {
            font-size: 12px;
            color: #888f99;
            margin-top: 5px;
            margin-bottom: 25px;
            line-height: 1.4;
        }

        .stats-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 16px;
        }

        .stat-item {
            text-align: center;
            padding: 16px;
            background: #f8f9fa;
            border-radius: 12px;
        }

        .stat-value {
            font-size: 20px;
            font-weight: 700;
            color: #106cf5;
            margin-bottom: 4px;
        }

        .stat-label {
            font-size: 14px;
            color: #666;
        }

        /* Services Section */
        .services-section {
            padding: 20px;
        }

        .demo-section {
            padding: 0 20px;
            margin-bottom: 30px;
        }

        .services-grid {
            display: flex;
            align-items: left;
            flex-direction: column;
            gap: 16px;
        }

        .service-item {
            gap: 12px;
            display: flex;
            align-items: center;
            border-bottom: 1px solid #e7eaee;
            padding-bottom: 15px;
        }

        .service-item:last-child {
            border-bottom: none;
        }

        .service-icon {
            width: 50px;
            height: 50px;
            border-radius: 50%;
            background: #f0f7ff;
            color: white;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 18px;
            flex-shrink: 0;
        }

        .service-title {
            font-size: 14px;
            font-weight: 600;
        }

        .service-desc {
            font-size: 10px;
            color: #666;
        }

        /* News Section */
        .news-section {
            background: #f2f4f7;
            border-radius: 16px;
            padding: 20px;
            margin-bottom: 20px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
        }

        .news-item {
            padding: 12px 0;
            display: flex;
            justify-content: space-between;
            align-items: center;
            border-bottom: 1px solid #e7eaee;
        }

        .news-item:last-child {
            border-bottom: none;
        }

        .news-date {
            font-size: 12px;
            color: #106cf5;
            margin-bottom: 4px;
        }

        .news-title {
            font-size: 15px;
            font-weight: 500;
            line-height: 1.3;
        }

        /* Partners Section */
        .partners-section {
            background: #f2f4f7;
            border-radius: 16px;
            padding: 20px;
            margin-bottom: 20px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
        }

        .partners-title {
            font-size: 20px;
            font-weight: 600;
            text-align: center;
            color: #106cf5;
            margin-bottom: 10px;
        }

        .partners-grid {
            display: grid;
            grid-template-columns: 1fr 1fr 1fr;
            gap: 12px;
        }

        .partner-item {
            height: 60px;
            background: #f8f9fa;
            border-radius: 8px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: 600;
            color: #555;
            font-size: 14px;
        }

        /* CTA Section */
        .cta-section {
            background: linear-gradient(135deg, #106cf5 0%, #0a4fc4 100%);
            border-radius: 16px;
            padding: 30px 20px;
            margin-bottom: 20px;
            color: white;
            text-align: center;
            box-shadow: 0 6px 15px rgba(16, 108, 245, 0.2);
        }

        .cta-title {
            font-size: 20px;
            font-weight: 700;
            margin-bottom: 12px;
        }

        .cta-subtitle {
            font-size: 16px;
            margin-bottom: 20px;
            opacity: 0.9;
        }

        .cta-buttons {
            display: flex;
            justify-content: center;
            gap: 12px;
        }

        .cta-button {
            padding: 10px 20px;
            background: rgba(255, 255, 255, 0.2);
            border-radius: 8px;
            font-weight: 600;
            display: flex;
            align-items: center;
            gap: 8px;
        }

        /* Navigation Bar */
        .nav-bar {
            position: fixed;
            bottom: 0;
            left: 0;
            right: 0;
            background: #f2f4f7;
            display: flex;
            justify-content: space-around;
            padding: 12px 0;
            box-shadow: 0 -4px 20px rgba(0, 0, 0, 0.08);
            border-top-left-radius: 20px;
            border-top-right-radius: 20px;
            z-index: 100;
            max-width: 400px;
            margin: 0 auto;
        }

        .nav-item {
            display: flex;
            flex-direction: column;
            align-items: center;
            color: #8e8e93;
            font-size: 12px;
            transition: color 0.2s;
        }

        .nav-item.active {
            color: #106cf5;
        }

        .nav-icon {
            font-size: 20px;
            margin-bottom: 4px;
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

        /* Responsive adjustments */
        @media (max-width: 380px) {
            .container {
                padding: 0 12px;
            }
            
            .crypto-illustration {
                height: 180px;
            }
            
            .coin {
                width: 50px;
                height: 50px;
                font-size: 20px;
            }
            
            .stats-grid, .services-grid {
                grid-template-columns: 1fr;
            }
            
            .promo__images {
                object-fit: contain;
            }
            
            .ai-card, .ai-card2 {
                height: 400px;
            }
            
            .announcement-desc {
                font-size: 12px;
            }
        }
        
        @media (min-width: 768px) {
            .slider-container {
                max-width: 600px;
                margin: 0 auto;
            }
            
            .partners-grid {
                grid-template-columns: repeat(3, 1fr);
            }
        }
      `})]})}export{h as default};
