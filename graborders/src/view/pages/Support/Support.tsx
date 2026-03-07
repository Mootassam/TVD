import React from "react";
import { Link } from "react-router-dom";
import { i18n } from "../../../i18n";

function HelpCenter() {
  const faqItems = [
    i18n("pages.helpCenter.faq.aboutAccounts"),
    i18n("pages.helpCenter.faq.transactionVolume"),
    i18n("pages.helpCenter.faq.transferFunds"),
    i18n("pages.helpCenter.faq.whatAreFutures"),
    i18n("pages.helpCenter.faq.convertedAmountChanges"),
    i18n("pages.helpCenter.faq.realNameAuthentication"),
    i18n("pages.helpCenter.faq.frozenAssets"),
    i18n("pages.helpCenter.faq.futuresTradingRules")
  ];

  return (
    <div className="helpcenter-container">
      {/* Header Section - Matching Profile Page */}
      <div className="header">
        <div className="nav-bar">
          <Link to="/profile" className="back-arrow">
            <i className="fas fa-arrow-left" />
          </Link>
          <div className="page-title">{i18n("pages.helpCenter.title")}</div>
        </div>
      </div>

      {/* Content Card - Matching Profile Page */}
      <div className="content-card">
        <div className="helpcenter-content">
          {faqItems.map((question, index) => (
            <Link to={`/support/details/${index + 1}`} className="remove_blue" key={index}>
              <div className="faq-item">
                <div className="faq-icon">
                  <i className="fas fa-arrow-left" />
                </div>
                <div className="faq-text">{question}</div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <style>{`
        /* HelpCenter Container – matches login/profile containers */
        .helpcenter-container {
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
      `}</style>
    </div>
  );
}

export default HelpCenter;