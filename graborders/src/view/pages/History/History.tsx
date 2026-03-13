import React, { useEffect, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import transactionListSelector from "src/modules/transaction/list/transactionListSelectors";
import transactionListActions from "src/modules/transaction/list/transactionListActions";
import { i18n } from "../../../i18n";
import LoadingModal from "src/shared/LoadingModal";

function History() {
  const dispatch = useDispatch();

  const [typeFilter, setTypeFilter] = useState("all");
  const Transactionloading = useSelector(transactionListSelector.selectLoading);
  const transaction = useSelector(transactionListSelector.selectRows);

  useEffect(() => {
    dispatch(transactionListActions.doFetch());
  }, [dispatch]);

  // Enhanced transaction configuration
  const getTransactionConfig = (type, direction, relatedAsset) => {
    const config = {
      icon: 'fa-exchange-alt',
      typeText: i18n("pages.history.transactionTypes.transaction"),
      iconClass: 'swap',
      color: '#627EEA',
      amountColor: direction === 'in' ? '#2ff378' : '#FF6838'
    };

    switch (type) {
      case 'deposit':
        config.icon = 'fa-arrow-down';
        config.typeText = i18n("pages.history.transactionTypes.deposit");
        config.iconClass = 'deposit';
        config.color = '#F3BA2F';
        config.amountColor = '#2ff378';
        break;

      case 'withdraw':
        config.icon = 'fa-arrow-up';
        config.typeText = i18n("pages.history.transactionTypes.withdrawal");
        config.iconClass = 'withdraw';
        config.color = '#FF6838';
        config.amountColor = '#FF6838';
        break;

      case 'convert_in':
        config.icon = 'fa-exchange-alt';
        config.typeText = relatedAsset ? i18n("pages.history.transactionTypes.convertedFrom", relatedAsset) : i18n("pages.history.transactionTypes.conversionIn");
        config.iconClass = 'convert-in';
        config.color = '#9C27B0';
        config.amountColor = '#2ff378';
        break;

      case 'convert_out':
        config.icon = 'fa-exchange-alt';
        config.typeText = relatedAsset ? i18n("pages.history.transactionTypes.convertedTo", relatedAsset) : i18n("pages.history.transactionTypes.conversionOut");
        config.iconClass = 'convert-out';
        config.color = '#9C27B0';
        config.amountColor = '#FF6838';
        break;

      case 'stacking':
        config.icon = 'fa-coins';
        config.typeText = i18n("pages.history.transactionTypes.stakedAmount");
        config.iconClass = 'stacking';
        config.color = '#FF9800';
        config.amountColor = '#FFB74D';
        break;

      case 'staking_reward':
        config.icon = 'fa-gift';
        config.typeText = i18n("pages.history.transactionTypes.stakingRewards");
        config.iconClass = 'staking_reward';
        config.color = '#4CAF50';
        config.amountColor = '#81C784';
        break;

      case 'futures_profit':
        config.icon = 'fa-chart-line';
        config.typeText = i18n("pages.history.transactionTypes.futuresProfit");
        config.iconClass = 'futures-profit';
        config.color = '#00C076';
        config.amountColor = '#00C076';
        break;

      case 'futures_loss':
        config.icon = 'fa-chart-line';
        config.typeText = i18n("pages.history.transactionTypes.futuresLoss");
        config.iconClass = 'futures-loss';
        config.color = '#FF6838';
        config.amountColor = '#FF6838';
        break;

      case 'spot_profit':
        config.icon = 'fa-coins';
        config.typeText = i18n("pages.history.transactionTypes.spotTradingProfit");
        config.iconClass = 'spot-profit';
        config.color = '#4CAF50';
        config.amountColor = '#2ff378';
        break;

      case 'spot_loss':
        config.icon = 'fa-coins';
        config.typeText = i18n("pages.history.transactionTypes.spotTradingLoss");
        config.iconClass = 'spot-loss';
        config.color = '#FF5722';
        config.amountColor = '#FF6838';
        break;

      case 'reward':
        config.icon = 'fa-hand-holding-dollar';
        config.typeText = i18n("pages.history.transactionTypes.referralReward");
        config.iconClass = 'spot-profit';
        config.color = '#63f211ff';
        config.amountColor = '#5ffc1bff';
        break;

      case 'bonus':
        config.icon = 'fa-gift';
        config.typeText = i18n("pages.history.transactionTypes.bonus");
        config.iconClass = 'bonus';
        config.color = '#E91E63';
        config.amountColor = '#E91E63';
        break;

      default:
        config.icon = 'fa-exchange-alt';
        config.typeText = i18n("pages.history.transactionTypes.transaction");
        config.iconClass = 'default';
        config.color = '#627EEA';
        config.amountColor = '#627EEA';
    }
    return config;
  };

  // Filter transactions based on selected filters
  const filteredTransactions = useMemo(() => {
    if (!transaction) return [];

    return transaction.filter((tx) => {
      // Apply type filter
      if (typeFilter !== "all") {
        const typeMatch =
          typeFilter === "deposits" ? (tx.type === "deposit" || tx.direction === "in") :
            typeFilter === "withdrawals" ? (tx.type === "withdraw" || tx.direction === "out") :
              typeFilter === "profits" ? (tx.type.includes('profit') || (tx.direction === "in" && tx.type !== "deposit")) :
                typeFilter === "losses" ? (tx.type.includes('loss') || (tx.direction === "out" && tx.type !== "withdraw")) :
                  typeFilter === "conversions" ? tx.type.includes('convert') :
                    typeFilter === "stacking" ? tx.type === "stacking" : true;
        if (!typeMatch) return false;
      }

      return true;
    });
  }, [transaction, typeFilter]);

  // Format date based on how recent it is
  const formatDate = (date) => {
    const transactionDate = new Date(date);
    const now = new Date();
    const isToday = transactionDate.toDateString() === now.toDateString();

    // Reset now date after checking today
    const yesterday = new Date(now);
    yesterday.setDate(now.getDate() - 1);
    const isYesterday = transactionDate.toDateString() === yesterday.toDateString();

    if (isToday) {
      return i18n("pages.history.dateFormats.today", transactionDate.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }));
    } else if (isYesterday) {
      return i18n("pages.history.dateFormats.yesterday", transactionDate.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }));
    } else {
      return transactionDate.toLocaleDateString([], {
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    }
  };

  return (
    <div className="history-container">
      {/* Header Section - Matching Profile Page */}
      <div className="header">
        <div className="nav-bar">
          <Link to="/wallets" className="back-arrow">
            <i className="fas fa-arrow-left" />
          </Link>
          <div className="page-title">{i18n("pages.history.title")}</div>
        </div>
      </div>

      {/* Content Card - Matching Profile Page */}
      <div className="content-card">
        <div className="history-content">
          {/* Loading State */}
          {Transactionloading && (
            <div className="loading-container">
              <LoadingModal />
            </div>
          )}

          {/* Content when not loading */}
          {!Transactionloading && (
            <>
              {/* Filter Options */}
              <div className="filter-options">
                <button
                  className={`filter-option ${typeFilter === "all" ? "active" : ""}`}
                  onClick={() => setTypeFilter("all")}
                >
                  {i18n("pages.history.filters.all")}
                </button>
                <button
                  className={`filter-option ${typeFilter === "deposits" ? "active" : ""}`}
                  onClick={() => setTypeFilter("deposits")}
                >
                  {i18n("pages.history.filters.deposits")}
                </button>
                <button
                  className={`filter-option ${typeFilter === "withdrawals" ? "active" : ""}`}
                  onClick={() => setTypeFilter("withdrawals")}
                >
                  {i18n("pages.history.filters.withdrawals")}
                </button>
                <button
                  className={`filter-option ${typeFilter === "profits" ? "active" : ""}`}
                  onClick={() => setTypeFilter("profits")}
                >
                  {i18n("pages.history.filters.profits")}
                </button>
                <button
                  className={`filter-option ${typeFilter === "losses" ? "active" : ""}`}
                  onClick={() => setTypeFilter("losses")}
                >
                  {i18n("pages.history.filters.losses")}
                </button>
             
              </div>

              {/* Transaction List */}
              <div className="transaction-list">
                {filteredTransactions.length > 0 ? (
                  filteredTransactions.map((transaction) => {
                    const { icon, typeText, iconClass, amountColor } = getTransactionConfig(
                      transaction.type,
                      transaction.direction,
                      transaction.relatedAsset
                    );

                    return (
                      <div className="transaction-item" key={transaction.id}>
                        <div className="transaction-info">
                          <div
                            className={`transaction-icon ${iconClass}`}
                            style={{ backgroundColor: getTransactionConfig(transaction.type, transaction.direction, transaction.relatedAsset).color }}
                          >
                            <i className={`fas ${icon}`} />
                          </div>
                          <div className="transaction-details">
                            <div className="transaction-type">
                              {typeText}
                            </div>
                            <div className="transaction-date">
                              {formatDate(transaction.dateTransaction)}
                            </div>
                          </div>
                        </div>
                        <div className="transaction-amount">
                          <div
                            className="amount"
                            style={{ color: amountColor }}
                          >
                            {transaction.direction === 'in' ? '+' : '-'}
                            {transaction.amount.toFixed(0)} {transaction.asset}
                          </div>
                          <div
                            className={`transaction-status status-${transaction.status}`}
                          >
                            {i18n(`pages.history.status.${transaction.status}`)}
                          </div>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div className="no-data-message">
                    <i className="fas fa-receipt"></i>
                    <p>No transaction history available</p>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>

      <style>{`
        /* History Container – matches Profile container */
        .history-container {
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
          padding: 20px 16px;
          border-top: 2px solid #39FF14;
        }

        /* Filter Options */
        .filter-options {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-bottom: 20px;
        }
        .filter-option {
          background-color: #2a2a2a;
          border: 1px solid #3a3a3a;
          border-radius: 20px;
          padding: 6px 14px;
          font-size: 13px;
          font-weight: 500;
          color: #bbbbbb;
          cursor: pointer;
          transition: all 0.2s;
        }
        .filter-option.active {
          background-color: #39FF14;
          border-color: #39FF14;
          color: #000000;
        }
        .filter-option:hover {
          border-color: #39FF14;
        }

        /* Transaction List */
        .transaction-list {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .transaction-item {
          background-color: #2a2a2a;
          border-radius: 12px;
          padding: 12px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          border: 1px solid #3a3a3a;
          transition: border-color 0.2s;
        }
        .transaction-item:hover {
          border-color: #39FF14;
        }
        .transaction-info {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .transaction-icon {
          width: 40px;
          height: 40px;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #ffffff;
          font-size: 18px;
          flex-shrink: 0;
        }
        .transaction-details {
          display: flex;
          flex-direction: column;
        }
        .transaction-type {
          font-weight: 600;
          font-size: 15px;
          color: #ffffff;
        }
        .transaction-date {
          font-size: 12px;
          color: #777777;
          margin-top: 2px;
        }
        .transaction-amount {
          text-align: right;
        }
        .amount {
          font-weight: 600;
          font-size: 15px;
          white-space: nowrap;
        }
        .transaction-status {
          font-size: 11px;
          margin-top: 2px;
          font-weight: 500;
        }
        .status-pending {
          color: #ffaa00;
        }
        .status-success {
          color: #39FF14;
        }
        .status-failed {
          color: #ff6b6b;
        }

        /* No data message */
        .no-data-message {
          text-align: center;
          padding: 40px 20px;
          color: #777777;
        }
        .no-data-message i {
          font-size: 48px;
          margin-bottom: 16px;
          color: #39FF14;
        }
        .no-data-message p {
          font-size: 16px;
        }

        /* Loading container */
        .loading-container {
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 200px;
        }

        /* Minimal spacing */
        .history-content {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        /* Responsive adjustments */
        @media (max-width: 380px) {
          .filter-option {
            padding: 4px 10px;
            font-size: 12px;
          }
          .transaction-item {
            padding: 10px;
          }
          .transaction-icon {
            width: 36px;
            height: 36px;
            font-size: 16px;
          }
          .amount {
            font-size: 14px;
          }
        }
      `}</style>
    </div>
  );
}

export default History;