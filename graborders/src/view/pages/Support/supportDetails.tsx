import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import actions from "src/modules/rules/list/rulesListActions";
import selector from "src/modules/rules/list/rulesListSelectors";
import { i18n } from "../../../i18n";

function HelpCenterDetail() {
  const { id } = useParams();
  const dispatch = useDispatch();

  const records = useSelector(selector.selectRows);
  const record = records.find(r => r.id === id);

  useEffect(() => {
    dispatch(actions.doFetch());
  }, [dispatch]);

  return (
    <div className="helpcenterdetail-container">
      {/* Header Section - Matching Profile Page */}
      <div className="header">
        <div className="nav-bar">
          <Link to="/support" className="back-arrow">
            <i className="fas fa-arrow-left" />
          </Link>
          <div className="page-title">{i18n("pages.helpCenter.title")}</div>
        </div>
      </div>

      {/* Content Card - Matching Profile Page */}
      <div className="content-card">
        <div className="helpcenterdetail-content">
          {record && (
            <>
              <div className="question-title">{record.question}</div>
              <div className="divider-line"></div>
              <div className="answer-content">{record.description}</div>
            </>
          )}
        </div>
      </div>

      <style>{`
        /* HelpCenterDetail Container – matches login/profile containers */
        .helpcenterdetail-container {
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

        /* Detail content */
        .helpcenterdetail-content {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .question-title {
          font-size: 20px;
          font-weight: 600;
          color: #39FF14;
          line-height: 1.4;
        }

        .divider-line {
          height: 1px;
          background-color: #2a2a2a;
          width: 100%;
        }

        .answer-content {
          font-size: 16px;
          color: #dddddd;
          line-height: 1.6;
        }

        /* Optional: style for when question not found (you can add a message) */
        .not-found-message {
          text-align: center;
          color: #777777;
          padding: 40px 20px;
        }
      `}</style>
    </div>
  );
}

export default HelpCenterDetail;