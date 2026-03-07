import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import actions from 'src/modules/company/list/companyListActions'
import selectors from 'src/modules/company/list/companyListSelectors' 
import { useDispatch, useSelector } from "react-redux";
import LoadingModal from "src/shared/LoadingModal";

function About() {
  const dispatch = useDispatch();

  const record = useSelector(selectors.selectRows); 
  const loading = useSelector(selectors.selectLoading);

  const doFetch = () => { 
    dispatch(actions.doFetch());
  };

  useEffect(() => {
    doFetch();
  }, [dispatch]);

  return (
    <div className="about-container">
      {/* Header Section - Matching Profile Page */}
      <div className="header">
        <div className="nav-bar">
          <Link to="/profile" className="back-arrow">
            <i className="fas fa-arrow-left" />
          </Link>
          <div className="page-title">About Us</div>
        </div>
      </div>

      {/* Content Card - Matching Profile Page */}
      <div className="content-card">
        <div className="about-content">
          {loading && (
            <div className="loading-container">
              <LoadingModal />
            </div>
          )}
          {!loading && record && record[0]?.companydetails && (
            <div 
              className="company-details"
              dangerouslySetInnerHTML={{ __html: record[0]?.companydetails }} 
            />
          )}
          {!loading && (!record || record.length === 0 || !record[0]?.companydetails) && (
            <div className="no-data-message">
              <i className="fas fa-info-circle"></i>
              <p>No company information available at the moment.</p>
            </div>
          )}
        </div>
      </div>

      <style>{`
        /* About Container – matches login/profile containers */
        .about-container {
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

        /* About content area */
        .about-content {
          min-height: 200px;
        }

        /* Loading container – centers the LoadingModal */
        .loading-container {
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 200px;
        }

        /* Company details – rendered HTML */
        .company-details {
          color: #ffffff;
          font-size: 15px;
          line-height: 1.6;
        }
        .company-details h1,
        .company-details h2,
        .company-details h3,
        .company-details h4,
        .company-details h5,
        .company-details h6 {
          color: #39FF14;
          margin-top: 1.5em;
          margin-bottom: 0.5em;
        }
        .company-details p {
          margin-bottom: 1em;
          color: #dddddd;
        }
        .company-details a {
          color: #39FF14;
          text-decoration: none;
        }
        .company-details a:hover {
          text-decoration: underline;
        }
        .company-details ul,
        .company-details ol {
          margin-bottom: 1em;
          padding-left: 20px;
        }
        .company-details li {
          color: #dddddd;
        }
        .company-details strong {
          color: #ffffff;
        }
        .company-details img {
          max-width: 100%;
          height: auto;
          border-radius: 8px;
          border: 1px solid #2a2a2a;
        }
        .company-details blockquote {
          border-left: 4px solid #39FF14;
          padding-left: 16px;
          margin-left: 0;
          color: #bbbbbb;
          font-style: italic;
        }

        /* No data message */
        .no-data-message {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          min-height: 200px;
          background-color: #2a2a2a;
          border-radius: 12px;
          padding: 30px 20px;
          color: #ffffff;
        }
        .no-data-message i {
          font-size: 48px;
          color: #39FF14;
          margin-bottom: 16px;
        }
        .no-data-message p {
          font-size: 16px;
          color: #dddddd;
          margin: 0;
        }
      `}</style>
    </div>
  );
}

export default About;