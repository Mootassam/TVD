import{p as l,u as t,q as i,i as r,y as d,k as o}from"./index-88f5b839.js";import{u as p}from"./useDispatch-89848e8d.js";function x(){const n=p(),e=l(),s=t(i.selectCurrentUser),a=t(i.selectLoading);r.useEffect(()=>{s||e.replace("/auth/signin")},[s,e]);const c=r.useCallback(()=>{n(d.doSignout())},[n]);return o.jsxs("div",{className:"pending-container",children:[o.jsxs("div",{className:"pending-card",children:[o.jsx("div",{className:"pending-icon",children:o.jsx("i",{className:"fas fa-hourglass-half"})}),o.jsx("div",{className:"pending-title",children:"Your account is being processed"}),o.jsx("div",{className:"pending-message",children:"Thank you for registering. Your account has been created and is now awaiting approval. You should wait for approval before you can access the platform."}),o.jsx("button",{className:"logout-button",onClick:c,disabled:a,type:"button",children:a?o.jsxs("span",{children:[o.jsx("i",{className:"fas fa-spinner fa-spin",style:{marginRight:"8px"}}),"Logging out..."]}):o.jsxs("span",{children:[o.jsx("i",{className:"fas fa-sign-out-alt",style:{marginRight:"8px"}}),"Logout"]})})]}),o.jsx("style",{children:`
        .pending-container {
          max-width: 400px;
          margin: 0 auto;
          min-height: 100vh;
          background-color: #0f0f0f;
          border-top: 2px solid #39FF14;
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 20px;
          box-sizing: border-box;
        }
        .pending-card {
          background-color: #1c1c1c;
          border: 1px solid #2a2a2a;
          border-radius: 12px;
          padding: 32px 24px;
          text-align: center;
        }
        .pending-icon {
          font-size: 48px;
          color: #39FF14;
          margin-bottom: 20px;
        }
        .pending-title {
          color: #ffffff;
          font-size: 20px;
          font-weight: 600;
          margin-bottom: 14px;
        }
        .pending-message {
          color: #aaaaaa;
          font-size: 14px;
          line-height: 1.6;
          margin-bottom: 28px;
        }
        .logout-button {
          background-color: transparent;
          color: #39FF14;
          font-weight: bold;
          height: 50px;
          width: 100%;
          border: 1px solid #39FF14;
          border-radius: 6px;
          font-size: 16px;
          cursor: pointer;
          transition: background-color 0.2s, color 0.2s;
        }
        .logout-button:hover:not(:disabled) {
          background-color: #39FF14;
          color: #0f0f0f;
        }
        .logout-button:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }
      `})]})}export{x as default};
