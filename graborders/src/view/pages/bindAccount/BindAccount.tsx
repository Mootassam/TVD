import React from 'react';
import { Link } from 'react-router-dom';
import { i18n } from '../../../i18n';

function BindAccount() {
  return (
    <div className="bind-account-container">
      {/* Header Section – matches Profile */}
      <div className="header">
        <div className="nav-bar">
          <Link to="/profile" className="back-arrow">
            <i className="fas fa-arrow-left" />
          </Link>
          <div className="page-title">{i18n('pages.bindAccount.title')}</div>
        </div>
      </div>

      {/* Content Card */}
      <div className="content-card">
        <h1 className="section-title">{i18n('pages.bindAccount.currentBankTitle')}</h1>
        
        <Link to="/bank_details" className="card-link">
          <div className="card">
            <div className="card-left">
              <div className="icon-circle">
                <i className="fas fa-university"></i>
              </div>
              <span className="card-label">{i18n('pages.bindAccount.bank')}</span>
            </div>
            <div className="card-arrow">
              <i className="fas fa-chevron-right"></i>
            </div>
          </div>
        </Link>

        <h2 className="section-subtitle">{i18n('pages.bindAccount.cryptoTitle')}</h2>

        <Link to="/walletSettings" className="card-link">
          <div className="card">
            <div className="card-left">
              <div className="icon-circle">
                <i className="fas fa-wallet"></i>
              </div>
              <span className="card-label">{i18n('pages.bindAccount.cryptoLabel')}</span>
              <span className="popular-badge">{i18n('pages.bindAccount.popular')}</span>
            </div>
            <div className="card-arrow">
              <i className="fas fa-chevron-right"></i>
            </div>
          </div>
        </Link>
      </div>

      <style>{`
        /* Bind Account Container – matches Profile */
        .bind-account-container {
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
          border-top: 2px solid #39FF14;
        }

        /* Section Titles */
        .section-title {
          font-size: 18px;
          font-weight: 600;
          color: #39FF14;
          margin-bottom: 20px;
        }
        .section-subtitle {
          font-size: 16px;
          font-weight: 600;
          color: #39FF14;
          margin: 32px 0 20px 0;
        }

        /* Card Links */
        .card-link {
          text-decoration: none;
          display: block;
        }

        /* Card */
        .card {
          background-color: #2a2a2a;
          border: 1px solid #3a3a3a;
          border-radius: 16px;
          padding: 10px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          transition: all 0.2s ease;
          margin-bottom: 16px;
        }
        .card:hover {
          border-color: #39FF14;
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(57, 255, 20, 0.1);
        }

        /* Card Left Section */
        .card-left {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        /* Icon Circle */
        .icon-circle {
          width: 40px;
          height: 40px;
          background-color: #1c1c1c;
          border: 1px solid #39FF14;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #39FF14;
          font-size: 18px;
        }

        /* Card Label */
        .card-label {
          font-size: 16px;
          font-weight: 500;
          color: #ffffff;
        }

        /* Popular Badge */
        .popular-badge {
          background-color: #39FF14;
          color: #000000;
          font-size: 11px;
          font-weight: 600;
          padding: 4px 8px;
          border-radius: 20px;
          margin-left: 8px;
          text-transform: uppercase;
        }

        /* Arrow */
        .card-arrow {
          color: #777777;
          font-size: 16px;
          transition: color 0.2s, transform 0.2s;
        }
        .card:hover .card-arrow {
          color: #39FF14;
          transform: translateX(4px);
        }

        /* Responsive */
        @media (max-width: 380px) {
          .content-card {
            padding: 20px 16px;
          }
          .card {
            padding: 10px;
          }
          .icon-circle {
            width: 36px;
            height: 36px;
            font-size: 16px;
          }
          .card-label {
            font-size: 15px;
          }
        }
      `}</style>
    </div>
  );
}

export default BindAccount;