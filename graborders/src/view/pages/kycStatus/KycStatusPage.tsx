import React, { useEffect } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import kycSelectors from "src/modules/kyc/list/kycListSelectors";
import kycListActions from "src/modules/kyc/list/kycListActions";
import { i18n } from "../../../i18n";

function KycStatusPage() {
  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();
  const kycStatus = useSelector(kycSelectors.selectKycStatus);

  // Fetch KYC data on mount to get accurate status
  useEffect(() => {
    dispatch(kycListActions.doFetch());
  }, [dispatch]);

  // Get the redirect location if any
  const from = location.state?.from || '/';

  // If KYC is already verified, redirect to the intended page
  useEffect(() => {
    if (kycStatus === 'success') {
      history.replace(from);
    }
  }, [kycStatus, history, from]);

  const renderContent = () => {
    switch (kycStatus) {
      case 'pending':
        return (
          <div className="status-content">
            <div className="status-icon pending">
              <i className="fas fa-clock"></i>
            </div>
            <h2 className="status-title">
              {i18n("pages.kycStatus.pending.title")}
            </h2>
            <p className="status-message">
              {i18n("pages.kycStatus.pending.message")}
            </p>
            <div className="status-note">
              <i className="fas fa-info-circle"></i>
              {i18n("pages.kycStatus.pending.note")}
            </div>
          </div>
        );

      case 'unverified':
      default:
        return (
          <div className="status-content">
            <div className="icon-wrapper">
              <div className="status-icon unverified">
                <i className="fas fa-exclamation-triangle"></i>
              </div>
            </div>
            <h2 className="status-title">
              {i18n("pages.kycStatus.unverified.title")}
            </h2>
            <p className="status-message">
              {i18n("pages.kycStatus.unverified.message")}
            </p>
            <div className="status-features">
              <h3>{i18n("pages.kycStatus.unverified.featuresTitle")}</h3>
              <ul>
                <li>
                  <i className="fas fa-shield-alt"></i>
                  {i18n("pages.kycStatus.unverified.features.password")}
                </li>
                <li>
                  <i className="fas fa-file-alt"></i>
                  {i18n("pages.kycStatus.unverified.features.withdrawal")}
                </li>
                <li>
                  <i className="fas fa-arrow-down"></i>
                  {i18n("pages.kycStatus.unverified.features.deposit")}
                </li>
                <li>
                  <i className="fas fa-arrow-up"></i>
                  {i18n("pages.kycStatus.unverified.features.withdraw")}
                </li>
              </ul>
            </div>
            <Link to="/proof" className="verify-button">
              {i18n("pages.kycStatus.unverified.verifyNow")}
            </Link>
          </div>
        );

      case 'success':
        // This should not render as useEffect will redirect
        return null;
    }
  };

  return (
    <div className="kyc-status-container">
      {/* Header Section */}
      <div className="header">
        <div className="nav-bar">
          <button
            className="back-arrow"
            onClick={() => history.goBack()}
            type="button"
          >
            <i className="fas fa-arrow-left" />
          </button>
          <div className="page-title">
            {kycStatus === 'pending'
              ? i18n("pages.kycStatus.pending.title")
              : i18n("pages.kycStatus.unverified.title")}
          </div>
        </div>
      </div>

      {/* Content Card */}
      <div className="content-card">
        {renderContent()}
      </div>

      <style>{`
        .kyc-status-container {
          max-width: 400px;
          margin: 0 auto;
          min-height: 100vh;
          background-color: #0f0f0f;
          border-top: 2px solid #39FF14;
          display: flex;
          flex-direction: column;
          box-sizing: border-box;
          color: #ffffff;
        }

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
          background: none;
          border: none;
          color: #ffffff;
          font-size: 20px;
          cursor: pointer;
          padding: 0;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .back-arrow:hover {
          color: #39FF14;
        }

        .page-title {
          font-size: 18px;
          font-weight: 500;
          color: #ffffff;
        }

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
          align-items: center;
        }

        .status-content {
          text-align: center;
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .icon-wrapper {
          margin-bottom: 16px;
        }

        .status-icon {
          width: 80px;
          height: 80px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 32px;
          margin: 0 auto;
        }

        .status-icon.unverified {
          background-color: rgba(255, 193, 7, 0.15);
          color: #ffc107;
          border: 2px solid #ffc107;
        }

        .status-icon.pending {
          background-color: rgba(0, 123, 255, 0.15);
          color: #007bff;
          border: 2px solid #007bff;
        }

        .status-icon.success {
          background-color: rgba(57, 255, 20, 0.15);
          color: #39FF14;
          border: 2px solid #39FF14;
        }

        .status-title {
          font-size: 22px;
          font-weight: 600;
          margin-bottom: 12px;
          color: #ffffff;
        }

        .status-message {
          font-size: 14px;
          color: #aaaaaa;
          line-height: 1.6;
          margin-bottom: 20px;
          max-width: 340px;
        }

        .status-note {
          background-color: #2a2a2a;
          border-left: 4px solid #ffc107;
          padding: 12px 16px;
          border-radius: 8px;
          font-size: 13px;
          color: #cccccc;
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 24px;
          max-width: 340px;
          text-align: left;
        }

        .status-note i {
          color: #ffc107;
          font-size: 16px;
        }

        .status-features {
          background-color: #2a2a2a;
          border-radius: 12px;
          padding: 20px;
          margin-bottom: 24px;
          width: 100%;
          max-width: 340px;
        }

        .status-features h3 {
          font-size: 14px;
          color: #39FF14;
          margin-bottom: 16px;
          text-align: left;
        }

        .status-features ul {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .status-features li {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 10px 0;
          border-bottom: 1px solid #3a3a3a;
          font-size: 13px;
          color: #ffffff;
        }

        .status-features li:last-child {
          border-bottom: none;
        }

        .status-features li i {
          color: #39FF14;
          width: 16px;
          text-align: center;
        }

        .verify-button {
          background-color: #39FF14;
          color: #0f0f0f;
          font-weight: bold;
          padding: 14px 32px;
          border: none;
          border-radius: 25px;
          font-size: 16px;
          cursor: pointer;
          text-decoration: none;
          transition: all 0.2s;
          display: inline-block;
        }

        .verify-button:hover {
          background-color: #2ecc10;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(57, 255, 20, 0.3);
        }

        @media (max-width: 400px) {
          .kyc-status-container {
            max-width: 100%;
          }

          .content-card {
            border-radius: 0;
          }
        }
      `}</style>
    </div>
  );
}

export default KycStatusPage;
