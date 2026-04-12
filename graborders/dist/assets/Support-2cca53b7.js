import{aj as f,ak as u,E as r,al as R,u as C,i as S,j as p,k as a,L as h}from"./index-86a7a122.js";import{u as T}from"./useDispatch-3492122d.js";class y{static async update(t,n){const s={id:t,data:n},o=f.get();return(await u.put(`/tenant/${o}/rules/${t}`,s)).data}static async destroyAll(t){const n={ids:t},s=f.get();return(await u.delete(`/tenant/${s}/rules`,{params:n})).data}static async create(t){const n={data:t},s=f.get();return(await u.post(`/tenant/${s}/rules`,n)).data}static async import(t,n){const s={data:t,importHash:n},o=f.get();return(await u.post(`/tenant/${o}/rules/import`,s)).data}static async find(t){const n=f.get();return(await u.get(`/tenant/${n}/rules/${t}`)).data}static async list(t,n,s,o){const d={filter:t,orderBy:n,limit:s,offset:o},_=f.get();return(await u.get(`/tenant/${_}/rules`,{params:d})).data}static async listAutocomplete(t,n){const s={query:t,limit:n},o=f.get();return(await u.get(`/tenant/${o}/rules/autocomplete`,{params:s})).data}}const c=e=>e.rules.list,F=r([c],e=>e.loading),A=r([c],e=>e.exportLoading),g=r([c],e=>e.rows),x=r([c],e=>e.count),L=r([x],e=>e>0),w=r([c],e=>e.sorter||{}),b=r([c],e=>{const t=e.sorter;if(!t||!t.field)return null;let n=t.order==="descend"?"DESC":"ASC";return`${t.field}_${n}`}),N=r([c],e=>e.filter),O=r([c],e=>e.rawFilter),$=r([c],e=>e.pagination.pageSize),D=r([c],e=>{const t=e.pagination;return!t||!t.pageSize?0:((t.current||1)-1)*t.pageSize}),v=r([c,x],(e,t)=>({...e.pagination,total:t})),m=r([c],e=>e.selectedKeys),H=r([c,g],(e,t)=>t.filter(n=>e.selectedKeys.includes(n.id))),q=r([g,m],(e,t)=>e.length===t.length),E={selectLoading:F,selectRows:g,selectCount:x,selectOrderBy:b,selectLimit:$,selectFilter:N,selectOffset:D,selectPagination:v,selectSelectedKeys:m,selectSelectedRows:H,selectHasRows:L,selectExportLoading:A,selectRawFilter:O,selectIsAllSelected:q,selectSorter:w},l="RULES_LIST",i={FETCH_STARTED:`${l}_FETCH_STARTED`,FETCH_SUCCESS:`${l}_FETCH_SUCCESS`,FETCH_ERROR:`${l}_FETCH_ERROR`,RESETED:`${l}_RESETED`,TOGGLE_ONE_SELECTED:`${l}_TOGGLE_ONE_SELECTED`,TOGGLE_ALL_SELECTED:`${l}_TOGGLE_ALL_SELECTED`,CLEAR_ALL_SELECTED:`${l}_CLEAR_ALL_SELECTED`,PAGINATION_CHANGED:`${l}_PAGINATION_CHANGED`,SORTER_CHANGED:`${l}_SORTER_CHANGED`,EXPORT_STARTED:`${l}_EXPORT_STARTED`,EXPORT_SUCCESS:`${l}_EXPORT_SUCCESS`,EXPORT_ERROR:`${l}_EXPORT_ERROR`,doReset:()=>async e=>{e({type:i.RESETED}),e(i.doFetch())},doChangePagination:e=>async(t,n)=>{t({type:i.PAGINATION_CHANGED,payload:e}),t(i.doFetchCurrentFilter())},doChangeSort:e=>async(t,n)=>{t({type:i.SORTER_CHANGED,payload:e}),t(i.doFetchCurrentFilter())},doFetchCurrentFilter:()=>async(e,t)=>{const n=E.selectFilter(t()),s=E.selectRawFilter(t());e(i.doFetch(n,s,!0))},doFetch:(e,t,n=!1)=>async(s,o)=>{try{s({type:i.FETCH_STARTED,payload:{filter:e,rawFilter:t,keepPagination:n}});const d=await y.list(e,E.selectOrderBy(o()),E.selectLimit(o()),E.selectOffset(o()));s({type:i.FETCH_SUCCESS,payload:{rows:d.rows,count:d.count}})}catch(d){R.handle(d),s({type:i.FETCH_ERROR})}}};function k(){const e=T(),t=C(E.selectRows);return console.log("🚀 ~ HelpCenter ~ record:",t),C(E.selectLoading),S.useEffect(()=>{e(i.doFetch())},[e]),p("pages.helpCenter.faq.aboutAccounts"),p("pages.helpCenter.faq.transactionVolume"),p("pages.helpCenter.faq.transferFunds"),p("pages.helpCenter.faq.whatAreFutures"),p("pages.helpCenter.faq.convertedAmountChanges"),p("pages.helpCenter.faq.realNameAuthentication"),p("pages.helpCenter.faq.frozenAssets"),p("pages.helpCenter.faq.futuresTradingRules"),a.jsxs("div",{className:"helpcenter-container",children:[a.jsx("div",{className:"header",children:a.jsxs("div",{className:"nav-bar",children:[a.jsx(h,{to:"/profile",className:"back-arrow",children:a.jsx("i",{className:"fas fa-arrow-left"})}),a.jsx("div",{className:"page-title",children:p("pages.helpCenter.title")})]})}),a.jsx("div",{className:"content-card",children:a.jsx("div",{className:"helpcenter-content",children:t.map((n,s)=>a.jsx(h,{to:`/support/details/${s+1}`,className:"remove_blue",children:a.jsxs("div",{className:"faq-item",children:[a.jsx("div",{className:"faq-icon",children:a.jsx("i",{className:"fas fa-arrow-left"})}),a.jsx("div",{className:"faq-text",children:n.question})]})},s))})}),a.jsx("style",{children:`
        /* HelpCenter Container – matches login/profile containers */
        .helpcenter-container {
          max-width: 430px;
          margin: 0 auto;
          min-height: 100vh;
          background-color: #0f0f0f;
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
        }

        /* Help Center content – list of FAQ items */
        .helpcenter-content {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        /* FAQ item – styled like profile menu items */
        .faq-item {
          display: flex;
          align-items: center;
          padding: 16px 12px;
          background-color: #1c1c1c;
          border-bottom: 1px solid #2a2a2a;
          cursor: pointer;
          transition: all 0.2s;
          border-radius: 8px;
        }
        .faq-item:hover {
          background-color: #2a2a2a;
          border-color: #39FF14;
        }
        .faq-item:hover .faq-icon i {
          color: #39FF14;
        }

        .faq-icon {
          width: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .faq-icon i {
          color: #777777;
          font-size: 18px;
          transition: color 0.2s;
        }

        .faq-text {
          flex: 1;
          font-size: 15px;
          color: #ffffff;
          line-height: 1.4;
        }

        /* Link wrapper – remove default underline and ensure full width */
        .remove_blue {
          text-decoration: none;
          color: inherit;
          display: block;
          width: 100%;
        }
      `})]})}export{k as default};
