import{i as a,k as e}from"./index-680400b2.js";const g=({isOpen:t,onClose:o,type:c,amount:i,coinType:r})=>{a.useEffect(()=>{const s=n=>{n.key==="Escape"&&t&&o()};return document.addEventListener("keydown",s),()=>document.removeEventListener("keydown",s)},[t,o]),a.useEffect(()=>(t?document.body.style.overflow="hidden":document.body.style.overflow="unset",()=>{document.body.style.overflow="unset"}),[t]);const d=s=>{const n={deposit:{title:"Deposit Successful!",message:"Your funds have been successfully deposited to your wallet.",icon:"fa-arrow-down",color:"#106cf5"},convert:{title:"Conversion Successful!",message:"Your currency conversion has been completed successfully.",icon:"fa-exchange-alt",color:"#106cf5"},staking:{title:"Staking Successful!",message:"Your funds are now staked and earning rewards!",icon:"fa-coins",color:"#F3BA2F"},withdraw:{title:"Withdrawal Submitted!",message:"Your withdrawal request has been received and is under review.",icon:"fa-arrow-up",color:"#FF6838"}};return n[s]||n.deposit},l=s=>{s.target===s.currentTarget&&o()};if(!t)return null;const{title:u,message:p,icon:x,color:m}=d(c);return e.jsxs(e.Fragment,{children:[e.jsx("style",{children:`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
        }

        .success-modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: rgba(0, 0, 0, 0.7);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 10000;
          padding: 20px;
        }

        .success-modal-container {
          background: white;
          width: 100%;
          max-width: 400px;
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
          animation: modalSlideIn 0.3s ease;
        }

        @keyframes modalSlideIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .modal-header {
          background: linear-gradient(135deg, #106cf5 0%, #0a4fc4 100%);
          padding: 20px;
          position: relative;
          text-align: center;
        }

        .page-title {
          color: white;
          font-size: 18px;
          font-weight: 600;
        }

        .success-content {
          padding: 40px 20px 30px;
          text-align: center;
        }

        .success-icon {
          width: 80px;
          height: 80px;
          border-radius: 50%;
          background: ${m};
          display: flex;
          justify-content: center;
          align-items: center;
          margin: 0 auto 25px;
          color: white;
          font-size: 32px;
        }

        .success-title {
          font-size: 22px;
          font-weight: 600;
          color: #222;
          margin-bottom: 10px;
        }

        .success-amount {
          font-size: 28px;
          font-weight: 700;
          margin: 15px 0;
          color: #106cf5;
        }

        .success-message {
          color: #888f99;
          font-size: 14px;
          line-height: 1.6;
          margin-bottom: 30px;
          max-width: 300px;
          margin-left: auto;
          margin-right: auto;
        }

        .success-button {
          background: linear-gradient(135deg, #106cf5 0%, #0a4fc4 100%);
          border: none;
          border-radius: 8px;
          padding: 12px;
          color: white;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          width: 100%;
          margin-top: 10px;
        }

        .success-button:hover {
          opacity: 0.9;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(16, 108, 245, 0.3);
        }

        @media (max-width: 380px) {
          .success-modal-overlay {
            padding: 16px;
          }

          .success-content {
            padding: 30px 16px 25px;
          }

          .success-icon {
            width: 70px;
            height: 70px;
            font-size: 28px;
          }

          .success-title {
            font-size: 20px;
          }

          .success-amount {
            font-size: 24px;
          }
        }
      `}),e.jsx("div",{className:"success-modal-overlay",onClick:l,children:e.jsx("div",{className:"success-modal-container",children:e.jsxs("div",{className:"success-content",children:[e.jsx("div",{className:"success-icon",children:e.jsx("i",{className:`fas ${x}`})}),e.jsx("div",{className:"success-title",children:u}),e.jsxs("div",{className:"success-amount",children:[i," ",r]}),e.jsx("div",{className:"success-message",children:p}),e.jsx("button",{className:"success-button",onClick:o,children:"Done"})]})})})]})};export{g as S};
