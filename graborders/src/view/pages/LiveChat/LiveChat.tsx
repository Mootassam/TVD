import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from 'react-router-dom';
import actions from "src/modules/category/list/categoryListActions";
import selector from "src/modules/category/list/categoryListSelectors";
import LoadingModal from "src/shared/LoadingModal";
import SubHeader from "src/view/shared/Header/SubHeader";
import { i18n } from "../../../i18n";

function Online() {
  const dispatch = useDispatch();

  const record = useSelector(selector.selectRows);
  const loading = useSelector(selector.selectLoading);

  useEffect(() => {
    dispatch(actions.doFetch());
    // eslint-disable-next-line
  }, [dispatch]);

  const handleLiveChatClick = () => {
    // navigate("/LiveChat");
  };

  return (
    <div className="customer-service-container">
      {/* Header */}
      <div className="header">
        <div className="nav-bar">
          <Link to="/profile" className="back-arrow">
            <i className="fas fa-arrow-left" />
          </Link>
          <div className="page-title">{i18n('pages.online.title')}</div>
        </div>
      </div>

      {/* Content Card */}
      <div className="content-card">
        {/* Service Description Card */}
        <div className="service-description-card">
          <div className="description-content">
            <i className="fa-solid fa-comments description-icon"></i>
            <p className="description-text">
              {i18n('pages.online.description')}
            </p>
          </div>
        </div>

        {/* Support Agents List */}
        <div className="support-agents-list">
          {loading && <LoadingModal />}
          {!loading && record && record.map((item, index) => (
            <div className="support-agent-card" key={index}>
              <div className="agent-header">
                <h3 className="agent-title">{item?.name}</h3>
                <div className={`platform-badge ${item.type}`}>
                  {item.type === "whatsApp" ? (
                    <i className="fa-brands fa-whatsapp"></i>
                  ) : (
                    <i className="fa-brands fa-telegram"></i>
                  )}
                </div>
              </div>

              <div className="agent-profile">
                <img
                  src={item?.photo[0]?.downloadUrl}
                  alt={`${item?.name}`}
                  className="agent-photo"
                />
                <div className="status-indicator online"></div>
              </div>

              <div className="agent-actions">
                {item.type === "whatsApp" ? (
                  <a
                    href={`https://wa.me/${item.number}`}
                    className="contact-button whatsapp-button"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className="fa-brands fa-whatsapp button-icon"></i>
                    <span>{i18n('pages.online.contactWhatsApp')}</span>
                  </a>
                ) : (
                  <a
                    href={`https://t.me/${item.number}`}
                    className="contact-button telegram-button"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className="fa-brands fa-telegram button-icon"></i>
                    <span>{i18n('pages.online.contactTelegram')}</span>
                    <i className="fa-solid fa-external-link action-arrow"></i>
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        /* Customer Service Container – matches profile theme */
        .customer-service-container {
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

        /* Header */
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
          flex: 1;
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

        /* Service Description Card */
        .service-description-card {
          background-color: #2a2a2a;
          border-radius: 12px;
          padding: 16px;
          margin-bottom: 24px;
          border: 1px solid #3a3a3a;
        }
        .description-content {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .description-icon {
          font-size: 24px;
          color: #39FF14;
        }
        .description-text {
          font-size: 14px;
          color: #cccccc;
          line-height: 1.5;
          margin: 0;
        }

        /* Support Agents List */
        .support-agents-list {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        /* Support Agent Card */
        .support-agent-card {
          background-color: #2a2a2a;
          border-radius: 12px;
          padding: 16px;
          border: 1px solid #3a3a3a;
          transition: all 0.2s ease;
        }
        .support-agent-card:hover {
          border-color: #39FF14;
        }

        /* Agent Header */
        .agent-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 12px;
        }
        .agent-title {
          font-size: 16px;
          font-weight: 600;
          color: #ffffff;
          margin: 0;
        }
        .platform-badge {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 18px;
        }
        .platform-badge.whatsApp {
          background-color: rgba(37, 211, 102, 0.2);
          color: #25D366;
        }
        .platform-badge.telegram {
          background-color: rgba(0, 136, 204, 0.2);
          color: #0088cc;
        }

        /* Agent Profile */
        .agent-profile {
          position: relative;
          width: 80px;
          height: 80px;
          margin: 0 auto 12px;
        }
        .agent-photo {
          width: 100%;
          height: 100%;
          border-radius: 50%;
          object-fit: cover;
          border: 2px solid #39FF14;
        }
        .status-indicator {
          position: absolute;
          bottom: 4px;
          right: 4px;
          width: 16px;
          height: 16px;
          border-radius: 50%;
          border: 2px solid #1c1c1c;
        }
        .status-indicator.online {
          background-color: #39FF14;
        }
        .status-indicator.offline {
          background-color: #777777;
        }

        /* Agent Actions */
        .agent-actions {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .contact-button {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 12px;
          border-radius: 8px;
          text-decoration: none;
          font-size: 14px;
          font-weight: 500;
          transition: all 0.2s;
          border: 1px solid transparent;
        }
        .whatsapp-button {
          background-color: rgba(37, 211, 102, 0.1);
          color: #25D366;
          border-color: #25D366;
        }
        .whatsapp-button:hover {
          background-color: #25D366;
          color: #000000;
        }
        .telegram-button {
          background-color: rgba(0, 136, 204, 0.1);
          color: #0088cc;
          border-color: #0088cc;
        }
        .telegram-button:hover {
          background-color: #0088cc;
          color: #000000;
        }
        .button-icon {
          font-size: 18px;
        }
        .action-arrow {
          margin-left: auto;
          font-size: 12px;
        }

        /* Loading Modal (adjust if needed) */
        .loading-modal {
          background-color: #1c1c1c;
          color: #39FF14;
        }

        /* Responsive */
        @media (max-width: 360px) {
          .content-card {
            padding: 20px 16px;
          }
          .agent-profile {
            width: 70px;
            height: 70px;
          }
        }
      `}</style>
    </div>
  );
}

export default Online;