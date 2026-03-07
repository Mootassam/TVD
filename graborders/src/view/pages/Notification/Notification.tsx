import React, { useEffect, useState } from "react";
import { useHistory, Link } from "react-router-dom";
import SubHeader from "src/view/shared/Header/SubHeader";
import { useDispatch, useSelector } from "react-redux";
import notificationFormActions from "src/modules/notification/form/notificationFormActions";
import notificationListActions from "src/modules/notification/list/notificationListActions";
import notificationListSelectors from "src/modules/notification/list/notificationListSelectors";
import Dates from "src/view/shared/utils/Dates";
import { i18n } from "../../../i18n";
import LoadingModal from "src/shared/LoadingModal";

const typeConfig = {
  deposit: {
    icon: "fas fa-arrow-down",
    title: i18n("pages.notification.types.deposit.title"),
    getMessage: (item) => i18n("pages.notification.types.deposit.message", item.message),
  },
  withdraw: {
    icon: "fas fa-arrow-up",
    title: i18n("pages.notification.types.withdraw.title"),
    getMessage: (item) => i18n("pages.notification.types.withdraw.message", item.message),
  },
  staking: {
    icon: "fas fa-coins",
    title: i18n("pages.notification.types.staking.title"),
    getMessage: (item) => i18n("pages.notification.types.staking.message", item.message),
  },
  kyc: {
    icon: "fas fa-id-card",
    title: i18n("pages.notification.types.kyc.title"),
    getMessage: (item) => item.message || i18n("pages.notification.types.kyc.defaultMessage"),
  },
  commission: {
    icon: "fas fa-hand-holding-dollar",
    title: i18n("pages.notification.types.commission.title"),
    getMessage: (item) => i18n("pages.notification.types.commission.message", item.message),
  },
  futures: {
    icon: "fas fa-chart-line",
    title: i18n("pages.notification.types.futures.title"),
    getMessage: (item) => i18n("pages.notification.types.futures.message", item.message),
  },
  accountActivated: {
    icon: "fas fa-user-check",
    title: i18n("pages.notification.types.accountActivated.title"),
    getMessage: (item) => i18n("pages.notification.types.accountActivated.message", item.message),
  },
  custom: {
    icon: "fas fa-bell",
    title: i18n("pages.notification.types.custom.title"),
    getMessage: (item) => item.message || i18n("pages.notification.types.custom.defaultMessage"),
  },
  cancel_deposit: {
    icon: "fas fa-ban",
    title: i18n("pages.notification.types.cancelDeposit.title"),
    getMessage: (item) => i18n("pages.notification.types.cancelDeposit.message", item.message),
  },
  cancel_withdraw: {
    icon: "fas fa-ban",
    title: i18n("pages.notification.types.cancelWithdraw.title"),
    getMessage: (item) => i18n("pages.notification.types.cancelWithdraw.message", item.message),
  },
  cancel_activated: {
    icon: "fas fa-user-slash",
    title: i18n("pages.notification.types.cancelActivated.title"),
    getMessage: () => i18n("pages.notification.types.cancelActivated.message"),
  },
};

function Notification() {
  const dispatch = useDispatch();
  const history = useHistory();
  const allNotification = useSelector(notificationListSelectors.selectRows);
  const loadingNotification = useSelector(
    notificationListSelectors.selectLoading
  );
  const [activeFilter, setActiveFilter] = useState("all");

  useEffect(() => {
    const status = activeFilter === "all" ? "" : activeFilter;
    dispatch(notificationListActions.doFetch(status));
  }, [dispatch, activeFilter]);

  const handleNotificationClick = (item) => {
    dispatch(notificationFormActions.doUpdate(item.id));

    if (item.type === "accountActivated") {
      window.location.href = "/profile";
    }
  };

  const handleFilterChange = (filter) => {
    setActiveFilter(filter);
  };

  const filterTabs = [
    { key: "all", label: i18n("pages.notification.filters.all") },
    { key: "unread", label: i18n("pages.notification.filters.unread") },
    { key: "read", label: i18n("pages.notification.filters.read") },
  ];

  return (
    <div className="notification-container">
      {/* Header Section - Matching About Page */}
      <div className="header">
        <div className="nav-bar">
          <Link to="/" className="back-arrow">
            <i className="fas fa-arrow-left" />
          </Link>
          <div className="page-title">Notifications</div>
        </div>
      </div>

      {/* Content Card - Matching About Page */}
      <div className="content-card">
        {/* Filter Tabs */}
        <div className="filter-tabs">
          {filterTabs.map((tab) => (
            <button
              key={tab.key}
              className={`filter-tab ${activeFilter === tab.key ? "active" : ""}`}
              onClick={() => handleFilterChange(tab.key)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Notification Content */}
        <div className="notification-content">
          {loadingNotification ? (
            <div className="loading-container">
              <LoadingModal />
            </div>
          ) : allNotification?.length > 0 ? (
            <div className="notification-list">
              {allNotification.map((item) => {
                const config = typeConfig[item.type] || typeConfig.custom;
                return (
                  <div
                    key={item.id}
                    className={`notification-item ${item.status === "unread" ? "unread" : ""
                      }`}
                    onClick={() => handleNotificationClick(item)}
                  >
                    <div className="notification-icon">
                      <i className={config.icon} />
                    </div>
                    <div className="notification-details">
                      <div className="notification-title">{config.title}</div>
                      <div className="notification-message">
                        {config.getMessage(item)}
                      </div>
                      <div className="notification-time">
                        {Dates.Monthago(item.createdAt)}
                      </div>
                    </div>
                    {item.status === "unread" && (
                      <div className="unread-indicator" />
                    )}
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="empty-state">
              <div className="empty-icon">
                <i className="fas fa-bell-slash" />
              </div>
              <div className="empty-title">{i18n("pages.notification.emptyState.title")}</div>
              <div className="empty-message">
                {activeFilter === "all"
                  ? i18n("pages.notification.emptyState.noNotifications")
                  : i18n("pages.notification.emptyState.noFilteredNotifications", activeFilter)}
              </div>
            </div>
          )}
        </div>
      </div>

      <style>{`
        /* Notification Container – matches login/profile containers */
        .notification-container {
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

        /* Filter Tabs */
        .filter-tabs {
          display: flex;
          gap: 10px;
          margin-bottom: 24px;
          border-bottom: 1px solid #2a2a2a;
          padding-bottom: 8px;
        }
        .filter-tab {
          background: none;
          border: none;
          color: #777777;
          font-size: 14px;
          font-weight: 500;
          padding: 6px 12px;
          cursor: pointer;
          transition: all 0.2s;
        }
        .filter-tab.active {
          color: #39FF14;
          border-bottom: 2px solid #39FF14;
        }
        .filter-tab:hover:not(.active) {
          color: #ffffff;
        }

        /* Notification Content */
        .notification-content {
          min-height: 200px;
        }

        /* Loading Container */
        .loading-container {
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 200px;
        }

        /* Notification List */
        .notification-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .notification-item {
          display: flex;
          align-items: flex-start;
          gap: 15px;
          padding: 16px;
          background-color: #1c1c1c;
          border: 1px solid #2a2a2a;
          border-radius: 12px;
          cursor: pointer;
          transition: all 0.2s;
          position: relative;
        }
        .notification-item:hover {
          background-color: #2a2a2a;
          border-color: #39FF14;
        }
        .notification-item.unread {
          border-left: 4px solid #39FF14;
        }

        .notification-icon {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background-color: #2a2a2a;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #39FF14;
          font-size: 18px;
          flex-shrink: 0;
        }

        .notification-details {
          flex: 1;
        }
        .notification-title {
          font-size: 14px;
          font-weight: 600;
          color: #ffffff;
          margin-bottom: 4px;
        }
        .notification-message {
          font-size: 13px;
          color: #dddddd;
          margin-bottom: 6px;
          line-height: 1.4;
        }
        .notification-time {
          font-size: 11px;
          color: #777777;
        }

        .unread-indicator {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background-color: #39FF14;
          position: absolute;
          top: 16px;
          right: 16px;
        }

        /* Empty State */
        .empty-state {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          min-height: 300px;
          padding: 30px 20px;
          background-color: #1c1c1c;
          border-radius: 12px;
          border: 1px solid #2a2a2a;
        }
        .empty-icon {
          width: 70px;
          height: 70px;
          border-radius: 50%;
          background-color: #2a2a2a;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 16px;
        }
        .empty-icon i {
          font-size: 30px;
          color: #39FF14;
        }
        .empty-title {
          font-size: 18px;
          font-weight: 600;
          color: #ffffff;
          margin-bottom: 8px;
        }
        .empty-message {
          font-size: 14px;
          color: #aaaaaa;
          max-width: 250px;
        }
      `}</style>
    </div>
  );
}

export default Notification;