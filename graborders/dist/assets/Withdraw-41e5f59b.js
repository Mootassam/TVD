import{n as M,X as we,j as c,Y as ge,u as k,v as be,B as ye,V as Ne,i as r,E as je,W as ve,a5 as ee,k as e,L as te,o as Se}from"./index-680400b2.js";import{u as ke,y as Ce,c as se,F as Ae}from"./FormErrors-ac5f9122.js";import{y as b}from"./yupFormSchemas-9e97c356.js";import{F as ne}from"./FieldFormItem-af656ecb.js";import{S as ze}from"./sucessModal-7f68abcb.js";import{u as De}from"./useDispatch-cbb2647c.js";const C=i=>i.withdraw.form,Fe=M([C],i=>i.record),Ie=M([C],i=>!!i.initLoading),Re=M([C],i=>!!i.saveLoading),Ee=M([C],i=>!!i.withdrawModal),re={selectInitLoading:Ie,selectSaveLoading:Re,selectRecord:Fe,selectModal:Ee,selectRaw:C},V=["USD","ETH","BTC","USDC","DAI","SHIB","XRP","TRX","SOL","BNB","DOGE"],E=500,ae=5,Me={USD:2,ETH:6,BTC:8,USDC:2,DAI:2,SHIB:0,XRP:2,TRX:2,SOL:4,BNB:6,DOGE:2},Ue=we().shape({orderNo:b.string(c("entities.withdraw.fields.orderNo")),currency:b.string(c("entities.withdraw.fields.currency")),withdrawAmount:ge().typeError(c("pages.withdraw.errors.amountNumber")).required(c("pages.withdraw.errors.amountRequired")).test("positive",c("pages.withdraw.errors.amountPositive"),i=>typeof i=="number"&&i>0),fee:b.decimal(c("entities.withdraw.fields.fee")),totalAmount:b.decimal(c("entities.withdraw.fields.totalAmount")),auditor:b.relationToOne(c("entities.withdraw.fields.auditor")),acceptTime:b.datetime(c("entities.withdraw.fields.acceptTime")),status:b.enumerator(c("entities.withdraw.fields.status"),{options:["pending","canceled","success"]})});function Oe(){var Q;const i=De(),A=k(be.selectCurrentUser),U=k(ye.selectRows)||[],W=k(re.selectModal),u=k(Ne.selectRows),T=k(re.selectSaveLoading),[ie,$]=r.useState(""),[Le,z]=r.useState(""),[s,L]=r.useState(""),[w,v]=r.useState(""),[_,H]=r.useState(null),[O,P]=r.useState(!1),[X,D]=r.useState(!1),[d,oe]=r.useState({}),[F,Y]=r.useState(!1);r.useEffect(()=>{i(je.doFetch("exchange"))},[i]),r.useEffect(()=>{i(ve.doFetch())},[i]),r.useEffect(()=>{const t=async()=>{try{Y(!0);const a=await Se.get("https://min-api.cryptocompare.com/data/pricemulti",{params:{fsyms:V.join(","),tsyms:"USD"}});if(a.data&&a.data.Response!=="Error"){const m={};V.forEach(o=>{var Z;(Z=a.data[o])!=null&&Z.USD&&(m[o]=a.data[o].USD)}),oe(m)}}catch(a){console.error("Failed to fetch exchange rates:",a)}finally{Y(!1)}};t();const n=setInterval(t,5*60*1e3);return()=>clearInterval(n)},[]),r.useEffect(()=>{if(u&&u.length>0&&!s){const t=u[0],n=t.symbol||t.id;L(n),l.setValue("currency",n),t.network&&t.network.length>0&&v(t.network[0]._id||t.network[0].name)}},[u]),r.useEffect(()=>{var t,n;if(s&&U.length){const a=U.find(o=>String(o.symbol).toUpperCase()===String(s).toUpperCase());H(a||null);const m=((n=(t=A==null?void 0:A.wallet)==null?void 0:t[s])==null?void 0:n.address)||"";z(m),l.setValue("currency",s),m&&l.setValue("withdrawAdress",m)}else H(null),z(""),l.setValue("currency",""),l.setValue("withdrawAdress","")},[s,U,A]);const B={orderNo:"",currency:"",withdrawAmount:"",fee:"",totalAmount:"",auditor:"",acceptTime:"",status:"pending",withdrawAdress:""},l=ke({resolver:Ce.yupResolver(Ue),mode:"all",defaultValues:B}),le=se({control:l.control,name:"withdrawAmount"});se({control:l.control,name:"currency"});const f=Number(le),y=!Number.isNaN(f)&&isFinite(f),N=_&&Number(_.amount)||0,{minInCurrency:j,feeInCurrency:p}=r.useMemo(()=>{if(!s||!d[s])return{minInCurrency:0,feeInCurrency:0};const t=d[s],n=E/t,a=ae/t;return{minInCurrency:n,feeInCurrency:a}},[s,d]),I=r.useMemo(()=>!u||!s?null:u.find(t=>{const n=t.symbol||t.id||"";return String(n).toUpperCase()===String(s).toUpperCase()}),[u,s]),x=(I==null?void 0:I.network)||[];r.useEffect(()=>{if(x.length>0){const t=x[0];v(t._id||t.name),D(!1)}else v("")},[I,x]);const S=y?Math.max(f-p,0):0,h=r.useCallback((t,n)=>{if(typeof t!="number"||!isFinite(t)||t===0)return"0";const a=n!==void 0?n:Me[s]||2;return t>0&&t<1e-6?t.toFixed(a>8?a:8):new Intl.NumberFormat("en-US",{minimumFractionDigits:0,maximumFractionDigits:a}).format(t)},[s]),g=r.useCallback(t=>typeof t!="number"||!isFinite(t)||t===0?"$0.00":t>0&&t<.01?`$${t.toFixed(6)}`:new Intl.NumberFormat("en-US",{style:"currency",currency:"USD",minimumFractionDigits:2,maximumFractionDigits:6}).format(t),[]),q=r.useCallback(t=>`https://images.weserv.nl/?url=https://bin.bnbstatic.com/static/assets/logos/${t?t.toUpperCase():""}.png`,[]),ce=r.useCallback(t=>{v(t._id||t.name),D(!1)},[]),R=r.useCallback(()=>{if(!s)return{disabled:!0,label:c("pages.withdraw.validation.selectCurrency"),reason:"selectCurrency"};if(x.length>0&&!w)return{disabled:!0,label:c("pages.withdraw.validation.selectNetwork"),reason:"selectNetwork"};if(!y||f<=0)return{disabled:!0,label:c("pages.withdraw.validation.enterAmount"),reason:"enterAmount"};if(f<j){const n=h(j);return{disabled:!0,label:c("pages.withdraw.validation.belowMin",n,s),reason:"belowMin"}}if(f>N)return{disabled:!0,label:c("pages.withdraw.validation.insufficientBalance"),reason:"insufficientBalance"};if(f+p>N)return{disabled:!0,label:c("pages.withdraw.validation.insufficientForFee"),reason:"insufficientForFee"};const t=l.getValues("withdrawAdress");return!t||t.trim()===""?{disabled:!0,label:c("pages.withdraw.validation.enterAddress"),reason:"enterAddress"}:{disabled:!1,label:c("pages.withdraw.confirmWithdrawal"),reason:"ok"}},[s,x,w,y,f,j,N,p,l,h])(),de=r.useCallback(()=>{i(ee.doClose()),l.reset(B),L(""),z(""),$(""),v("")},[i,l,B]),me=r.useCallback(async t=>{if(!R.disabled)try{t.currency=s;const n=new Date,a=`${n.getFullYear()}${String(n.getMonth()+1).padStart(2,"0")}${String(n.getDate()).padStart(2,"0")}`,m=Math.floor(Math.random()*1e7).toString().padStart(7,"0");t.orderNo=`RE${a}${m}`;const o=Number(t.withdrawAmount)||0;t.fee=p,t.totalAmount=o-p,t.status="pending",t.network=w,$(t.totalAmount.toString()),await i(ee.doCreate(t))}catch(n){console.error("Withdrawal submission error:",n)}},[s,p,w,R.disabled,i]),pe=r.useCallback(t=>{const n=t.symbol||t.id;L(n),l.setValue("currency",n),l.setValue("withdrawAmount",""),l.setValue("withdrawAdress",""),P(!1),D(!1)},[l]),G=r.useMemo(()=>!y||!d[s]?0:f*d[s],[f,s,d,y]),ue=r.useMemo(()=>d[s]?p*d[s]:0,[p,s,d]),J=r.useMemo(()=>d[s]?S*d[s]:0,[S,s,d]),fe=r.useMemo(()=>N===0?"0":h(N),[N,h]),K=r.useMemo(()=>j===0?"0":h(j),[j,h]),he=r.useMemo(()=>p===0?"0":h(p),[p,h]),xe=r.useMemo(()=>S===0?"0":h(S),[S,h]);return l.formState,e.jsxs("div",{className:"withdraw-container",children:[e.jsx("div",{className:"header",children:e.jsxs("div",{className:"nav-bar",children:[e.jsx(te,{to:"/wallets",className:"back-arrow",children:e.jsx("i",{className:"fas fa-arrow-left"})}),e.jsx("div",{className:"page-title",children:"Withdraw"}),e.jsx(te,{className:"header-icon",to:"/history",style:{color:"white"},children:e.jsx("i",{className:"fas fa-receipt"})})]})}),e.jsx("div",{className:"content-card",children:e.jsx("div",{className:"withdraw-content",children:e.jsxs("div",{className:"form-section",children:[e.jsxs("div",{className:"input-field",children:[e.jsx("label",{className:"input-label",children:"Select currency"}),e.jsxs("div",{className:"custom-select-wrapper",children:[e.jsxs("div",{className:"currency-select-trigger",onClick:()=>P(!O),children:[s?e.jsxs("div",{className:"selected-currency",children:[e.jsx("div",{className:"currency-icon",children:e.jsx("img",{src:q(s),alt:s,onError:t=>{const n=t.target;n.onerror=null,n.style.display="none";const a=n.parentElement;a&&(a.textContent=s.charAt(0),a.style.background="#f0f0f0",a.style.color="#333",a.style.fontSize="14px",a.style.fontWeight="bold",a.style.display="inline-flex",a.style.alignItems="center",a.style.justifyContent="center",a.style.width="24px",a.style.height="24px",a.style.borderRadius="50%")}})}),e.jsx("span",{className:"currency-text",children:s}),F?e.jsx("span",{className:"rate-loading",children:"Loading rates..."}):d[s]?e.jsxs("span",{className:"currency-rate",children:["(1 ",s," ≈ ",g(d[s]),")"]}):null]}):e.jsx("span",{className:"placeholder",children:"Select Currency"}),e.jsx("i",{className:"fas fa-chevron-down dropdown-arrow"})]}),O&&e.jsx("div",{className:"currency-dropdown",children:u&&u.length>0?u.filter(t=>V.includes(t.symbol||t.id)).map(t=>{const n=t.symbol||t.id;return e.jsxs("div",{className:"currency-option",onClick:()=>pe(t),children:[e.jsx("div",{className:"currency-icon",children:e.jsx("img",{src:q(n),alt:n,onError:a=>{const m=a.target;m.onerror=null,m.style.display="none";const o=m.parentElement;o&&(o.textContent=n.charAt(0),o.style.background="#f0f0f0",o.style.color="#333",o.style.fontSize="14px",o.style.fontWeight="bold",o.style.display="inline-flex",o.style.alignItems="center",o.style.justifyContent="center",o.style.width="24px",o.style.height="24px",o.style.borderRadius="50%")}})}),e.jsx("span",{className:"currency-text",children:n}),F?e.jsx("span",{className:"rate-loading-small",children:"..."}):d[n]?e.jsxs("span",{className:"currency-rate-small",children:["(",g(d[n]),")"]}):null]},t.id||n)}):e.jsx("div",{className:"no-options",children:"No currencies available"})})]})]}),s&&d[s]&&e.jsx("div",{className:"info-box",children:e.jsxs("div",{className:"info-row",children:[e.jsx("span",{className:"info-label",children:"Minimum withdrawal:"}),e.jsxs("span",{className:"info-value",children:[K," ",s," (",g(E),")"]})]})}),s&&x.length>0&&e.jsxs("div",{className:"input-field",children:[e.jsx("label",{className:"input-label",children:"Withdraw network"}),e.jsxs("div",{className:"custom-select-wrapper",children:[e.jsxs("div",{className:"network-select-trigger",onClick:()=>D(!X),children:[e.jsxs("div",{className:"selected-network",children:[e.jsx("i",{className:"fas fa-network-wired network-icon"}),e.jsx("span",{className:"network-text",children:((Q=x.find(t=>t._id===w||t.id===w||t.name===w))==null?void 0:Q.name)||"Select Network"})]}),e.jsx("i",{className:"fas fa-chevron-down dropdown-arrow"})]}),X&&e.jsx("div",{className:"network-dropdown",children:x.map(t=>e.jsxs("div",{className:"network-option",onClick:()=>ce(t),children:[e.jsx("i",{className:"fas fa-network-wired network-icon-small"}),e.jsx("span",{className:"network-text",children:t.name})]},t._id||t.id||t.name))})]})]}),e.jsx(Ae,{...l,children:e.jsxs("form",{onSubmit:l.handleSubmit(me),children:[e.jsxs("div",{className:"input-field",children:[e.jsx("label",{className:"input-label",children:"Withdraw address"}),e.jsx("div",{className:"input-wrapper",children:e.jsx(ne,{name:"withdrawAdress",type:"text",className:"address-field",placeholder:"Enter your wallet address",onChange:t=>z(t.target.value)})}),e.jsx("br",{})]}),e.jsxs("div",{className:"input-field",children:[e.jsx("label",{className:"input-label",children:"Amount of coins withdrawn"}),e.jsx("div",{className:"input-wrapper",children:e.jsx(ne,{name:"withdrawAmount",type:"number",className:"amount-field",placeholder:"0.0",step:"any"})}),e.jsxs("div",{className:"balance-info",children:[e.jsxs("div",{className:"balance-text",children:["Available: ",e.jsxs("span",{className:"balance-amount",children:[fe," ",s]})]}),y&&G>0&&e.jsxs("div",{className:"usd-value",children:["≈ ",g(G)]})]})]}),e.jsxs("div",{className:"fee-section",children:[e.jsxs("div",{className:"fee-row",children:[e.jsx("div",{className:"fee-label",children:"Withdrawal fee:"}),e.jsxs("div",{className:"fee-value",children:[he," ",s,e.jsxs("span",{className:"fee-usd",children:[" (",g(ue),")"]})]})]}),e.jsxs("div",{className:"fee-row",children:[e.jsx("div",{className:"fee-label",children:"Minimum withdrawal:"}),e.jsxs("div",{className:"fee-value",children:[K," ",s,e.jsxs("span",{className:"fee-usd",children:[" (",g(E),")"]})]})]}),e.jsxs("div",{className:"fee-row",children:[e.jsx("div",{className:"fee-label",children:"You will receive:"}),e.jsxs("div",{className:"fee-value receive-amount",children:[xe," ",s,J>0&&e.jsxs("span",{className:"receive-usd",children:[" (≈ ",g(J),")"]})]})]})]}),e.jsxs("div",{className:"notice-section",children:[e.jsx("div",{className:"notice-title",children:"Important notice"}),e.jsxs("div",{className:"notice-content",children:[e.jsxs("div",{className:"notice-item",children:["1. Minimum withdrawal amount is $",E," USD equivalent in selected currency."]}),e.jsxs("div",{className:"notice-item",children:["2. Withdrawal fee is $",ae," USD equivalent in selected currency."]}),e.jsx("div",{className:"notice-item",children:"3. After submitting the withdraw application, the money will arrive within 24 hours. If the money does not arrive after the expected withdraw time, please consult the online customer service."}),e.jsx("div",{className:"notice-item",children:"4. After submitting the withdraw application, the funds are frozen because the withdraw is in progress and the funds are temporarily held by the system. This does not mean that you have lost the asset or that there is an abnormality with the asset."})]})]}),e.jsx("button",{type:"submit",className:"withdraw-button",disabled:R.disabled||T||F,children:T?e.jsxs(e.Fragment,{children:[e.jsx("i",{className:"fas fa-spinner fa-spin",style:{marginRight:"8px"}}),"Processing..."]}):F?e.jsxs(e.Fragment,{children:[e.jsx("i",{className:"fas fa-spinner fa-spin",style:{marginRight:"8px"}}),"Loading rates..."]}):R.label})]})})]})})}),W&&e.jsx(ze,{isOpen:W,onClose:de,type:"withdraw",amount:ie,coinType:s}),e.jsx("style",{children:`
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

        .withdraw-container {
          max-width: 400px;
          margin: 0 auto;
          position: relative;
          min-height: 100vh;
          background: linear-gradient(135deg, #106cf5 0%, #0a4fc4 100%);
        }

        /* Header Section */
        .header {
          min-height: 60px;
          position: relative;
          padding: 15px 20px;
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

        /* Content Card */
        .content-card {
          background: #f2f4f7;
          border-radius: 40px 40px 0 0;
          padding: 20px;
          box-shadow: 0 -5px 20px rgba(0, 0, 0, 0.05);
          min-height: calc(100vh - 60px);
        }

        .withdraw-content {
          width: 100%;
        }

        /* Form Sections */
        .form-section {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .input-field {
          display: flex;
          flex-direction: column;
        }

        .input-label {
          font-size: 12px;
          font-weight: 600;
          color: #222;
          margin-bottom: 8px;
        }

        .custom-select-wrapper {
          position: relative;
        }

        .currency-select-trigger,
        .network-select-trigger {
          width: 100%;
          padding: 12px;
          border: 1px solid #e0e0e0;
          border-radius: 8px;
          font-size: 12px;
          background-color: white;
          color: #333;
          cursor: pointer;
          display: flex;
          justify-content: space-between;
          align-items: center;
          transition: all 0.3s ease;
        }

        .currency-select-trigger:hover,
        .network-select-trigger:hover {
          border-color: #106cf5;
        }

        .selected-currency {
          display: flex;
          align-items: center;
          gap: 10px;
          flex: 1;
        }

        .selected-network {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .currency-icon {
          width: 24px;
          height: 24px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          flex-shrink: 0;
        }

        .currency-icon img {
          width: 100%;
          height: 100%;
          object-fit: contain;
        }

        .currency-text,
        .network-text {
          font-size: 12px;
          font-weight: 500;
        }

        .currency-rate {
          font-size: 11px;
          color: #666;
          margin-left: auto;
          margin-right: 10px;
        }

        .currency-rate-small {
          font-size: 10px;
          color: #666;
          margin-left: auto;
        }

        .rate-loading {
          font-size: 11px;
          color: #999;
          margin-left: auto;
          margin-right: 10px;
        }

        .rate-loading-small {
          font-size: 10px;
          color: #999;
          margin-left: auto;
        }

        .network-icon {
          color: #106cf5;
          font-size: 14px;
        }

        .dropdown-arrow {
          color: #666;
          font-size: 12px;
          transition: transform 0.3s ease;
        }

        /* Dropdowns */
        .currency-dropdown,
        .network-dropdown {
          position: absolute;
          top: 100%;
          left: 0;
          right: 0;
          background: white;
          border: 1px solid #e0e0e0;
          border-radius: 8px;
          margin-top: 4px;
          max-height: 200px;
          overflow-y: auto;
          z-index: 1000;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }

        .currency-option,
        .network-option {
          padding: 12px;
          display: flex;
          align-items: center;
          gap: 10px;
          cursor: pointer;
          transition: background-color 0.2s ease;
        }

        .currency-option:hover,
        .network-option:hover {
          background-color: #f5f7fa;
        }

        .currency-option .currency-icon {
          width: 24px;
          height: 24px;
        }

        .network-icon-small {
          color: #106cf5;
          font-size: 12px;
        }

        .no-options {
          padding: 12px;
          color: #999;
          font-size: 12px;
          text-align: center;
        }

        .placeholder {
          color: #999;
        }

        /* Info Box */
        .info-box {
          background: #e8f4ff;
          border: 1px solid #b6d9ff;
          border-radius: 8px;
          padding: 12px;
          margin: 5px 0;
        }

        .info-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .info-label {
          font-size: 12px;
          color: #106cf5;
          font-weight: 500;
        }

        .info-value {
          font-size: 12px;
          font-weight: 600;
          color: #222;
        }

        /* Input Fields */
        .input-wrapper {
          position: relative;
        }

        .address-field, .amount-field {
          width: 100%;
          padding: 12px;
          border: 1px solid #e0e0e0;
          border-radius: 8px;
          font-size: 12px;
          background-color: white;
          color: #333;
          transition: all 0.3s ease;
        }

        .address-field:focus, .amount-field:focus {
          outline: none;
          border-color: #106cf5;
          box-shadow: 0 0 0 3px rgba(16, 108, 245, 0.1);
        }

        .balance-info {
          margin-top: 8px;
        }

        .balance-text {
          font-size: 14px;
          color: #666;
        }

        .balance-amount {
          font-weight: 600;
          color: #106cf5;
        }

        .usd-value {
          font-size: 12px;
          color: #666;
          margin-top: 2px;
        }

        /* Fee Section */
        .fee-section {
          background: white;
          border-radius: 8px;
          padding: 16px;
          margin: 10px 0;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
        }

        .fee-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 8px 0;
          border-bottom: 1px solid #f0f0f0;
        }

        .fee-row:last-child {
          border-bottom: none;
        }

        .fee-label {
          font-size: 14px;
          color: #666;
        }

        .fee-value {
          font-size: 15px;
          font-weight: 600;
          color: #222;
          text-align: right;
          display: flex;
          flex-direction: column;
          align-items: flex-end;
        }

        .fee-usd {
          font-size: 12px;
          color: #666;
          font-weight: normal;
          margin-top: 2px;
        }

        .receive-amount {
          color: #106cf5;
          font-size: 16px;
        }

        .receive-usd {
          font-size: 12px;
          color: #106cf5;
          font-weight: normal;
          margin-top: 2px;
        }

        /* Notice Section */
        .notice-section {
          background: white;
          border-radius: 8px;
          padding: 16px;
          margin: 10px 0;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
        }

        .notice-title {
          font-size: 14px;
          font-weight: 600;
          color: #222;
          margin-bottom: 12px;
        }

        .notice-content {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .notice-item {
          font-size: 10px;
          color: #666;
          line-height: 1.4;
        }

        /* Withdraw Button */
        .withdraw-button {
          width: 100%;
          padding: 12px;
          background: #106cf5;
          color: white;
          border: none;
          border-radius: 8px;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          margin-top: 20px;
        }

        .withdraw-button:hover:not(:disabled) {
          background: #0a4fc4;
          transform: translateY(-2px);
          box-shadow: 0 4px 15px rgba(16, 108, 245, 0.3);
        }

        .withdraw-button:disabled {
          background: #ccc;
          cursor: not-allowed;
          transform: none;
          box-shadow: none;
        }

        /* Responsive */
        @media (max-width: 380px) {
          .withdraw-container {
            padding: 0;
          }

          .header {
            padding: 16px;
            min-height: 50px;
          }

          .content-card {
            padding: 16px;
            border-radius: 30px 30px 0 0;
          }

          .currency-select-trigger,
          .network-select-trigger,
          .address-field,
          .amount-field {
            padding: 12px;
            font-size: 14px;
          }

          .input-label {
            font-size: 13px;
          }

          .balance-text {
            font-size: 13px;
          }

          .fee-section, .notice-section {
            padding: 12px;
          }

          .fee-label, .fee-value {
            font-size: 13px;
          }

          .notice-title {
            font-size: 13px;
          }

          .notice-item {
            font-size: 10px;
          }

          .withdraw-button {
            padding: 12px;
            font-size: 15px;
          }

          .currency-icon {
            width: 20px;
            height: 20px;
          }

          .currency-text, .network-text {
            font-size: 11px;
          }
        }

        @media (min-width: 768px) {
          .content-card {
            border-radius: 30px 30px 0 0;
          }

          .withdraw-content {
            max-width: 600px;
            margin: 0 auto;
          }
        }
      `})]})}export{Oe as default};
