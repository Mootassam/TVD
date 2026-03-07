import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import assetsListActions from 'src/modules/assets/list/assetsListActions';
import selectors from 'src/modules/assets/list/assetsListSelectors';
import { i18n } from "../../../i18n";
import LoadingModal from 'src/shared/LoadingModal';

function TransferList() {
  const dispatch = useDispatch();
  const transferList = useSelector(selectors.selectListTransfer);
  const loading = useSelector(selectors.selectLoading);

  useEffect(() => {
    dispatch(assetsListActions.TransferList());
    // Simulate loading state for better UX
  }, [dispatch]);

  // Format date similar to History component
  const formatDate = (date) => {
    const transferDate = new Date(date);
    const now = new Date();
    const isToday = transferDate.toDateString() === now.toDateString();

    const yesterday = new Date(now);
    yesterday.setDate(now.getDate() - 1);
    const isYesterday = transferDate.toDateString() === yesterday.toDateString();

    if (isToday) {
      return i18n("pages.history.dateFormats.today", transferDate.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }));
    } else if (isYesterday) {
      return i18n("pages.history.dateFormats.yesterday", transferDate.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }));
    } else {
      return transferDate.toLocaleDateString([], {
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    }
  };

  // Function to get display name for account types
  const getAccountDisplayName = (account) => {
    switch (account) {
      case 'trade':
        return i18n("pages.transfer.accountTypes.trade");
      case 'perpetual':
        return i18n("pages.transfer.accountTypes.perpetual");
      case 'exchange':
        return i18n("pages.transfer.accountTypes.exchange");
      default:
        return account;
    }
  };

  return (
    <div className="history-container">
      {/* Header Section - Matching History Page */}
      <div className="header">
        <div className="nav-bar">
          <Link to="/wallets" className="back-arrow">
            <i className="fas fa-arrow-left" />
          </Link>
          <div className="page-title">{i18n("pages.transfer.title")}</div>
        </div>
      </div>

      {/* Content Card - Matching History Page */}
      <div className="content-card">
        <div className="history-content">
          {/* Loading State */}
          {loading && (
            <div className="loading-container">
              <LoadingModal />
            </div>
          )}

          {/* Content when not loading */}
          {!loading && (
            <>
              {/* Transfer List */}
              <div className="transaction-list">
                {transferList && transferList.length > 0 ? (
                  transferList.map((transfer) => (
                    <div className="transaction-item" key={transfer._id}>
                      <div className="transaction-info">
                        <div
                          className="transaction-icon"
                          style={{ backgroundColor: '#627EEA' }}
                        >
                          <i className="fas fa-exchange-alt" />
                        </div>
                        <div className="transaction-details">
                          <div className="transaction-type">
                            {getAccountDisplayName(transfer.fromAccount)} → {getAccountDisplayName(transfer.toAccount)}
                          </div>
                          <div className="transaction-date">
                            {transfer.createdAt ? formatDate(transfer.createdAt) : i18n("common.dateNotAvailable")}
                          </div>
                        </div>
                      </div>
                      <div className="transaction-amount">
                        <div
                          className="amount"
                          style={{ color: '#2ff378' }}
                        >
                          +{transfer.amount}
                        </div>
                        <div
                          className={`transaction-status status-${transfer.status}`}
                        >
                          {transfer.status === 'completed' ? i18n("pages.transfer.status.completed") : transfer.status}
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="no-data-message">
                    <i className="fas fa-exchange-alt"></i>
                    <p>{i18n("pages.transfer.noTransferHistory")}</p>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>

      <style>{`
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

        .history-container {
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
          background: white;
          border-radius: 40px 40px 0 0;
          padding: 30px 20px 100px;
          box-shadow: 0 -5px 20px rgba(0, 0, 0, 0.05);
          min-height: calc(100vh - 60px);
        }

        .history-content {
          width: 100%;
        }

        .loading-container {
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 200px;
        }

        /* Transaction List */
        .transaction-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .transaction-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 15px;
          background-color: #f8f9fa;
          border-radius: 12px;
          border: 1px solid #e7eaee;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .transaction-item:hover {
          background-color: #f0f2f5;
          transform: translateY(-2px);
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
        }

        .transaction-info {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .transaction-icon {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 16px;
          color: #FFF;
        }

        .transaction-details {
          display: flex;
          flex-direction: column;
        }

        .transaction-type {
          font-weight: 600;
          margin-bottom: 4px;
          font-size: 14px;
          color: #222;
        }

        .transaction-date {
          color: #888f99;
          font-size: 12px;
        }

        .transaction-amount {
          text-align: right;
        }

        .amount {
          font-weight: 600;
          margin-bottom: 4px;
          font-size: 14px;
        }

        .transaction-status {
          font-size: 11px;
          padding: 2px 8px;
          border-radius: 10px;
          display: inline-block;
        }

        .transaction-status.status-completed {
          background-color: rgba(40, 167, 69, 0.1);
          color: #28a745;
        }

        .transaction-status.status-pending {
          background-color: rgba(255, 193, 7, 0.1);
          color: #ffc107;
        }

        .transaction-status.status-canceled {
          background-color: rgba(220, 53, 69, 0.1);
          color: #dc3545;
        }

        .no-data-message {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          min-height: 200px;
          text-align: center;
          color: #888f99;
          padding: 40px 20px;
        }

        .no-data-message i {
          font-size: 48px;
          color: #e7eaee;
          margin-bottom: 16px;
        }

        .no-data-message p {
          font-size: 14px;
          max-width: 250px;
          line-height: 1.4;
        }

        /* Responsive adjustments */
        @media (max-width: 380px) {
          .history-container {
            padding: 0;
          }

          .header {
            padding: 16px;
            min-height: 50px;
          }

          .content-card {
            padding: 25px 16px 100px;
          }

          .transaction-type {
            font-size: 13px;
          }

          .transaction-date {
            font-size: 11px;
          }

          .amount {
            font-size: 13px;
          }
        }

        @media (min-width: 768px) {
          .content-card {
            border-radius: 30px 30px 0 0;
          }

          .transaction-list {
            max-width: 600px;
            margin: 0 auto;
          }
        }
      `}</style>
    </div>
  );
}

export default TransferList; // Changed from transferList to TransferList