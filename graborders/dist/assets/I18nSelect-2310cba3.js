import{am as x,i as m,k as a,an as g,ao as c,L as f,j as p}from"./index-3c390b80.js";const s="LAYOUT",n={MENU_TOGGLE:`${s}_MENU_TOGGLE`,MENU_HIDE:`${s}_MENU_HIDE`,MENU_SHOW:`${s}_MENU_SHOW`,MENU_SUBMENU:`${s}_SUBMENU_SHOW`,doChangeLanguage:l=>{x(l),window.location.reload()},doToggleMenu:()=>({type:n.MENU_TOGGLE}),doShowMenu:()=>({type:n.MENU_SHOW}),doHideMenu:()=>({type:n.MENU_HIDE}),dosubMenu:l=>({type:n.MENU_SUBMENU,payload:l})},h=({isInModal:l=!1})=>{const[t,r]=m.useState(null),d=async e=>{r(e);try{await n.doChangeLanguage(e)}finally{setTimeout(()=>{r(null)},300)}};return l?a.jsxs("div",{className:"i18n-modal-content",children:[a.jsx("div",{className:"languages-list-modal",children:g().map(e=>{const o=c()===e.id,i=t===e.id;return a.jsxs("div",{onClick:()=>!i&&d(e.id),className:`language-item-modal ${o?"active":""} ${i?"loading":""}`,children:[a.jsx("div",{className:"language-flag-modal",children:a.jsx("img",{src:e.flag,alt:e.label})}),a.jsxs("div",{className:"language-info-modal",children:[a.jsx("div",{className:"language-name-modal",children:e.label}),a.jsx("div",{className:"language-native-modal",children:e.label})]}),o&&!i&&a.jsx("div",{className:"selected-indicator-modal",children:a.jsx("i",{className:"fas fa-check"})}),i&&a.jsx("div",{className:"loading-indicator-modal",children:a.jsx("i",{className:"fas fa-spinner fa-spin"})})]},e.id)})}),a.jsxs("div",{className:"language-help-modal",children:[a.jsx("i",{className:"fas fa-info-circle"}),a.jsx("span",{children:"Changing the language will affect all text in the application"})]}),a.jsx("style",{jsx:"true",children:`
          .i18n-modal-content {
            padding: 0;
            height: 100%;
            display: flex;
            flex-direction: column;
            background-color: #1c1c1c;
            color: #ffffff;
          }

          .languages-list-modal {
            flex: 1;
            overflow-y: auto;
            padding: 8px 0;
            max-height: calc(85vh - 120px);
          }

          .languages-list-modal::-webkit-scrollbar {
            width: 4px;
          }
          .languages-list-modal::-webkit-scrollbar-track {
            background: #2a2a2a;
            border-radius: 2px;
          }
          .languages-list-modal::-webkit-scrollbar-thumb {
            background: #39FF14;
            border-radius: 2px;
          }
          .languages-list-modal::-webkit-scrollbar-thumb:hover {
            background: #2ecc10;
          }

          .language-item-modal {
            display: flex;
            align-items: center;
            padding: 16px 20px;
            cursor: pointer;
            transition: all 0.2s ease;
            border-bottom: 1px solid #2a2a2a;
          }
          .language-item-modal:last-child {
            border-bottom: none;
          }
          .language-item-modal:hover {
            background-color: #2a2a2a;
          }
          .language-item-modal.active {
            background-color: rgba(57, 255, 20, 0.1);
          }
          .language-item-modal.loading {
            opacity: 0.7;
            cursor: not-allowed;
          }

          .language-flag-modal {
            width: 32px;
            height: 24px;
            margin-right: 16px;
            border-radius: 3px;
            overflow: hidden;
            box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
            flex-shrink: 0;
          }
          .language-flag-modal img {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }

          .language-info-modal {
            flex: 1;
          }
          .language-name-modal {
            font-size: 16px;
            font-weight: 600;
            color: #ffffff;
            margin-bottom: 2px;
          }
          .language-native-modal {
            font-size: 13px;
            color: #aaaaaa;
            font-weight: 400;
          }

          .selected-indicator-modal {
            color: #39FF14;
            font-size: 16px;
            margin-left: 10px;
            flex-shrink: 0;
            animation: fadeInScale 0.3s ease;
          }
          .loading-indicator-modal {
            color: #39FF14;
            font-size: 16px;
            margin-left: 10px;
            flex-shrink: 0;
          }

          .language-help-modal {
            padding: 16px 20px;
            border-top: 1px solid #2a2a2a;
            background-color: #1c1c1c;
            display: flex;
            align-items: center;
            gap: 10px;
          }
          .language-help-modal i {
            color: #39FF14;
            font-size: 14px;
            flex-shrink: 0;
          }
          .language-help-modal span {
            font-size: 13px;
            color: #dddddd;
            line-height: 1.4;
          }

          @keyframes fadeInScale {
            from {
              opacity: 0;
              transform: scale(0.8);
            }
            to {
              opacity: 1;
              transform: scale(1);
            }
          }

          @media (max-width: 380px) {
            .language-item-modal {
              padding: 14px 16px;
            }
            .language-flag-modal {
              width: 28px;
              height: 21px;
              margin-right: 12px;
            }
            .language-name-modal {
              font-size: 15px;
            }
            .language-help-modal {
              padding: 14px 16px;
            }
          }
        `})]}):a.jsxs("div",{className:"i18n-container",children:[a.jsx("div",{className:"header",children:a.jsxs("div",{className:"nav-bar",children:[a.jsx(f,{to:"/settings",className:"back-arrow",children:a.jsx("i",{className:"fas fa-arrow-left"})}),a.jsx("div",{className:"page-title",children:p("pages.language.selectLanguage")})]})}),a.jsxs("div",{className:"content-card",children:[a.jsxs("div",{className:"language-intro",children:[a.jsx("div",{className:"language-icon",children:a.jsx("i",{className:"fas fa-language"})}),a.jsx("h2",{children:p("pages.language.choosePreferred")}),a.jsx("p",{children:"Select your preferred language for the application interface"})]}),a.jsx("div",{className:"languages-list",children:g().map(e=>{const o=c()===e.id,i=t===e.id;return a.jsxs("div",{onClick:()=>!i&&d(e.id),className:`language-item ${o?"active":""} ${i?"loading":""}`,children:[a.jsx("div",{className:"language-flag",children:a.jsx("img",{src:e.flag,alt:e.label})}),a.jsxs("div",{className:"language-info",children:[a.jsx("div",{className:"language-name",children:e.label}),a.jsx("div",{className:"language-native",children:e.label})]}),o&&!i&&a.jsx("div",{className:"selected-indicator",children:a.jsx("i",{className:"fas fa-check"})}),i&&a.jsx("div",{className:"loading-indicator",children:a.jsx("i",{className:"fas fa-spinner fa-spin"})})]},e.id)})}),a.jsx("div",{className:"language-help",children:a.jsxs("p",{children:[a.jsx("i",{className:"fas fa-info-circle"}),"Changing the language will affect all text in the application"]})})]}),a.jsx("style",{children:`
        /* I18n Container – matches login/profile containers */
        .i18n-container {
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
          position: relative;
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
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
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
          display: flex;
          flex-direction: column;
        }

        .language-intro {
          text-align: center;
          margin-bottom: 20px;
          padding: 20px 0;
        }
        .language-icon {
          font-size: 32px;
          color: #39FF14;
          margin-bottom: 16px;
        }
        .language-intro h2 {
          font-size: 20px;
          font-weight: 700;
          color: #ffffff;
          margin-bottom: 8px;
        }
        .language-intro p {
          font-size: 14px;
          color: #aaaaaa;
          line-height: 1.4;
        }

        .languages-list {
          flex: 1;
          overflow-y: auto;
          margin-bottom: 20px;
        }
        .languages-list::-webkit-scrollbar {
          width: 4px;
        }
        .languages-list::-webkit-scrollbar-track {
          background: #2a2a2a;
          border-radius: 2px;
        }
        .languages-list::-webkit-scrollbar-thumb {
          background: #39FF14;
          border-radius: 2px;
        }
        .languages-list::-webkit-scrollbar-thumb:hover {
          background: #2ecc10;
        }

        .language-item {
          display: flex;
          align-items: center;
          padding: 16px;
          border: 1px solid #2a2a2a;
          border-radius: 7px;
          margin-bottom: 12px;
          cursor: pointer;
          transition: all 0.2s ease;
          background-color: #1c1c1c;
        }
        .language-item:last-child {
          margin-bottom: 0;
        }
        .language-item:hover {
          border-color: #39FF14;
          background-color: #2a2a2a;
        }
        .language-item.active {
          background-color: rgba(57, 255, 20, 0.1);
          border-color: #39FF14;
        }
        .language-item.loading {
          opacity: 0.7;
          cursor: not-allowed;
        }

        .language-flag {
          width: 40px;
          height: 30px;
          margin-right: 16px;
          border-radius: 4px;
          overflow: hidden;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
        }
        .language-flag img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .language-info {
          flex: 1;
        }
        .language-name {
          font-size: 16px;
          font-weight: 600;
          color: #ffffff;
          margin-bottom: 4px;
        }
        .language-native {
          font-size: 14px;
          color: #aaaaaa;
        }

        .selected-indicator {
          color: #39FF14;
          font-size: 18px;
        }
        .loading-indicator {
          color: #39FF14;
          font-size: 18px;
        }

        .language-help {
          padding: 16px;
          background-color: #1c1c1c;
          border-radius: 7px;
          border: 1px solid #2a2a2a;
        }
        .language-help p {
          font-size: 14px;
          color: #dddddd;
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .language-help i {
          color: #39FF14;
          font-size: 16px;
        }

        /* Responsive adjustments */
        @media (max-width: 380px) {
          .header {
            padding: 16px;
          }
          .content-card {
            padding: 20px 16px;
          }
          .language-intro {
            padding: 16px 0;
            margin-bottom: 16px;
          }
          .language-icon {
            font-size: 28px;
            margin-bottom: 12px;
          }
          .language-intro h2 {
            font-size: 18px;
          }
          .language-item {
            padding: 14px;
          }
          .language-flag {
            width: 36px;
            height: 27px;
            margin-right: 12px;
          }
          .language-name {
            font-size: 15px;
          }
          .language-native {
            font-size: 13px;
          }
          .language-help {
            padding: 14px;
          }
          .language-help p {
            font-size: 13px;
          }
        }
      `})]})};export{h as I};
