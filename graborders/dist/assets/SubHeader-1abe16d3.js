import{i as l,H as d,p as u,u as f,q as h,I as m,k as e,L as r}from"./index-87be233b.js";import{l as p}from"./index-d9998155.js";import{u as x}from"./useDispatch-93bc273c.js";let t=null;function k(o,i=!1){const[n,c]=l.useState(0),a=x();return l.useEffect(()=>{if(o)return t||(t=p("https://trade-Icmarkets.com",{transports:["websocket"],reconnection:!0,reconnectionAttempts:5,reconnectionDelay:1e3})),t.emit("register",{userId:o,isAdmin:i}),t.on("success",s=>{console.log("Socket connected successfully",s)}),t.on("connect_error",s=>{console.error("Socket connection error:",s)}),t.on("newNotification",s=>{a(d.doFetch())}),()=>{t&&(t.off("success"),t.off("newNotification"),t.off("connect_error"))}},[o,i]),{notifications:n}}function j(o){const i=u(),n=f(h.selectCurrentUser),c=f(m.selectCount);k(n.id);const a=()=>{i.goBack()};return e.jsxs("div",{className:"header",children:[e.jsxs("div",{className:"header-content",children:[e.jsx("div",{className:"back-button",onClick:()=>a(),children:e.jsx("i",{className:"fas fa-arrow-left"})}),e.jsx(r,{to:"/",className:"notification-link",children:e.jsx("i",{className:"fas fa-home header-icon",style:{color:"white",marginLeft:9}})}),e.jsx("div",{className:"page-title",children:o==null?void 0:o.title}),e.jsxs("div",{className:"header-icons",children:[e.jsxs(r,{to:"/notification",className:"notification-link",children:[e.jsx("i",{className:"fas fa-bell header-icon"}),c>0&&e.jsx("span",{className:"notification-badge",children:c})]}),e.jsx(r,{to:"/profile",className:"notification-link",children:e.jsx("i",{className:"fas fa-user header-icon",style:{color:"white",marginLeft:9}})})]})]}),e.jsx("style",{children:` /* Header Section */
  .header {
      background-color: #0f0f0f;
      padding: 15px 10px;
      position: sticky;
      top: 0;
      z-index: 100;
      /* margin-bottom: 20px; */
  }

  .header-content {
      display: flex;
      justify-content: space-between;
      align-items: center;
  }

  .back-button {
      color: #FFFFFF;
      font-size: 20px;
  }

  .page-title {
      font-size: 20px;
      font-weight: bold;
      color: #FFFFFF;
  }

  .header-icons {
      display: flex;
      gap: 15px;
  }

  .header-icon {
      color: #FFFFFF;
      font-size: 20px;
  }

  .notification-link {
      position: relative;
      display: inline-block;
  }

  .notification-badge {
      position: absolute;
      top: -8px;
      right: -8px;
      background: #FF4444;
      color: white;
      border-radius: 50%;
      width: 18px;
      height: 18px;
      font-size: 10px;
      font-weight: bold;
      display: flex;
      align-items: center;
      justify-content: center;
      animation: pulse 2s infinite;
  }

  @keyframes pulse {
      0% { transform: scale(1); }
      50% { transform: scale(1.1); }
      100% { transform: scale(1); }
  }
`})]})}export{j as S};
