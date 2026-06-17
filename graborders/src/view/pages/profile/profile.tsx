import React, { useMemo, useEffect, useCallback, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import authActions from "src/modules/auth/authActions";
import authSelectors from "src/modules/auth/authSelectors";
import kycSelectors from "src/modules/kyc/list/kycListSelectors";
import actions from "src/modules/kyc/list/kycListActions";
import assetsActions from "src/modules/assets/list/assetsListActions";
import assetsListSelectors from "src/modules/assets/list/assetsListSelectors";
import { i18n } from "../../../i18n";
import I18nSelect from "src/view/layout/I18nSelect";

// Constants for menu items
const MENU_ITEMS = [
  // {
  //   icon: "fas fa-language",
  //   name: i18n("pages.settings.language"),
  //   type: "modal",
  //   modal: "language",
  // },
  {
    icon: "fas fa-shield-alt",
    path: "/typepassword",
    name: i18n("pages.profile.menu.password"),
    requiresKyc: true,
  },

  // --- New notification item ---
  {
    icon: "fas fa-bell",
    path: "/notification",
    name: i18n("pages.profile.menu.notifications"),
  },
  {
    icon: "fas fa-comment-dots",
    path: "/online-service",
    name: i18n("pages.profile.menu.customerSupport"),
  },
  {
    icon: "fas fa-building",
    path: "/about",
    name: i18n("pages.profile.menu.aboutUs"),
  },
  {
    icon: "fas fa-question-circle",
    path: "/support",
    name: i18n("pages.profile.menu.helpcenter"),
  },

  {
    icon: "fas fa-link",
    path: "/bind-account",
    name: i18n("pages.profile.menu.BindAccount"),
  },
  {
    icon: "fas fa-download",
    path: "/download",
    name: i18n("pages.profile.menu.downloadApp"),
  },


  {
    icon: "fas fa-trash-alt",
    name: i18n("pages.profile.menu.clearCache"),
    type: "action",
  },





];

function Profile() {
  const dispatch = useDispatch();
  const history = useHistory();

  // User & KYC
  const currentUser = useSelector(authSelectors.selectCurrentUser);
  const kycStatus = useSelector(kycSelectors.selectKycStatus);
  const loadingKyc = useSelector(kycSelectors.selectLoading);

  // Asset data
  const listAssets = useSelector(assetsListSelectors.selectRows);
  const selectTotalFiat = useSelector(assetsListSelectors.selectTotalFiat);
  console.log("🚀 ~ Profile ~ selectTotalFiat:", selectTotalFiat)
  const loadingAssets = useSelector(assetsListSelectors.selectLoading);

  // State
  const [simulatedTradingEnabled, setSimulatedTradingEnabled] = useState(false);
  const [isLanguageModalOpen, setIsLanguageModalOpen] = useState(false);
  const [hideAmounts, setHideAmounts] = useState(false);

  // KYC status - using selector directly
  const isKycVerified = useMemo(() => {
    return kycStatus === 'success';
  }, [kycStatus]);

  // Memoized user data for KYC fetch
  const userData = useMemo(() => ({ user: currentUser }), [currentUser]);

  // Fetch KYC data
  useEffect(() => {
    dispatch(actions.doFetch(userData, userData));
  }, [dispatch, userData]);

  // Fetch assets
  useEffect(() => {
    let isMounted = true;
    const fetchAssets = async () => {
      if (!isMounted) return;
      try {
        await dispatch(assetsActions.doFetch(null, "USD"));
      } catch (error) {
        if (isMounted) {
          console.error(i18n("pages.wallet.errors.fetchAssets"), error);
        }
      }
    };
    fetchAssets();
    return () => {
      isMounted = false;
    };
  }, [dispatch]);

  // Handlers
  const handleSignout = useCallback(() => {
    dispatch(authActions.doSignout());
  }, [dispatch]);

  const handleClearCache = useCallback(() => {
    console.log(i18n("pages.profile.cache.clearing"));
    alert(i18n("pages.profile.cache.cleared"));
  }, []);

  const toggleSimulatedTrading = useCallback(() => {
    setSimulatedTradingEnabled(!simulatedTradingEnabled);
    console.log(
      i18n(
        "pages.profile.simulatedTrading.toggle",
        !simulatedTradingEnabled ? i18n("common.enabled") : i18n("common.disabled")
      )
    );
  }, [simulatedTradingEnabled]);

  const toggleHideAmounts = useCallback(() => {
    setHideAmounts((prev) => !prev);
  }, []);

  const openLanguageModal = useCallback(() => {
    setIsLanguageModalOpen(true);
  }, []);

  const closeLanguageModal = useCallback(() => {
    setIsLanguageModalOpen(false);
  }, []);

  const menuItems = useMemo(
    () => {
      let items = MENU_ITEMS.map((item) => ({
        ...item,
        disabled: item?.requiresKyc && !isKycVerified,
      }));

      // For demo accounts, disable KYC-required items (keep visible but not clickable)
      if (currentUser?.accountType === 'demo') {
        items = items.map(item => ({
          ...item,
          disabled: item.requiresKyc ? true : item.disabled,
        }));
      }

      return items;
    },
    [isKycVerified, currentUser?.accountType]
  );

  const handleVerifyNow = useCallback(() => {
    if (kycStatus === 'unverified') {
      history.push("/proof");
    } else if (kycStatus === 'pending') {
      alert(i18n("pages.profile.verification.pendingAlert"));
    } else {
      // already verified – do nothing or show message
    }
  }, [kycStatus, history]);

  // KYC display helpers
  const getVerificationText = () => {
    switch (kycStatus) {
      case 'success':
        return i18n("pages.profile.status.verified");
      case 'pending':
        return i18n("pages.profile.verification.pending.status");
      default:
        return i18n("pages.profile.status.unverified");
    }
  };

  const getVerificationIcon = () => {
    switch (kycStatus) {
      case 'success':
        return "fas fa-check-circle";
      case 'pending':
        return "fas fa-clock";
      default:
        return "fas fa-exclamation-circle";
    }
  };

  const getVerificationButtonText = () => {
    switch (kycStatus) {
      case 'success':
        return i18n("pages.profile.status.verified");
      case 'pending':
        return i18n("pages.profile.verification.pending.button");
      default:
        return i18n("pages.profile.verification.alert.verifyNow");
    }
  };

  const isVerificationButtonDisabled = () => {
    return (
      kycStatus === 'success' ||
      kycStatus === 'pending'
    );
  };

  const shouldPulseBadge = () => {
    return kycStatus === 'unverified';
  };

  // Render menu items (includes standard items plus the special KYC item)
  const renderMenuItem = useCallback(
    (item, index) => {
      // Toggle item (currently unused)
      if (item.type === "toggle") {
        return (
          <li className="menu-item" key={index}>
            <div className="icon-container icon-green">
              <i className={item.icon} />
            </div>
            <div className="menu-text">{item.name}</div>
            <div className="menu-action">
              <label className="toggle-switch">
                <input
                  type="checkbox"
                  checked={simulatedTradingEnabled}
                  onChange={toggleSimulatedTrading}
                />
                <span className="slider"></span>
              </label>
            </div>
          </li>
        );
      }

      // Action items (clear cache)
      if (item.type === "action") {
        return (
          <li className="menu-item" key={index} onClick={handleClearCache}>
            <div className="icon-container icon-gray">
              <i className={item.icon} />
            </div>
            <div className="menu-text">{item.name}</div>
          </li>
        );
      }

      // Modal items (language)
      if (item.type === "modal") {
        return (
          <li
            className={`menu-item ${item.disabled ? "disabled" : ""}`}
            key={index}
            onClick={item.modal === "language" ? openLanguageModal : undefined}
          >
            <div
              className={`icon-container ${item.icon.includes("language") ? "icon-green" : "icon-gray"
                }`}
            >
              <i className={item.icon} />
            </div>
            <div className="menu-text">{item.name}</div>
            <div className="menu-action">
              {!item.disabled && <i className="fas fa-chevron-right chevron" />}
            </div>
          </li>
        );
      }

      // Regular link items (including the new notification item)
      const menuItemContent = (
        <li className={`menu-item ${item.disabled ? "disabled" : ""}`}>
          <div
            className={`icon-container ${item.icon.includes("exchange-alt")
                ? "icon-green"
                : item.icon.includes("cog")
                  ? "icon-gray"
                  : item.icon.includes("shield-alt")
                    ? "icon-blue"
                    : item.icon.includes("file-alt")
                      ? "icon-green"
                      : item.icon.includes("gift")
                        ? "icon-green"
                        : item.icon.includes("comment-dots")
                          ? "icon-blue"
                          : item.icon.includes("building")
                            ? "icon-green"
                            : item.icon.includes("question-circle")
                              ? "icon-gray"
                              : item.icon.includes("download")
                                ? "icon-green"
                                : "icon-gray"
              }`}
          >
            <i className={item.icon} />
          </div>
          <div className="menu-text">{item.name}</div>
          <div className="menu-action">
            {!item.disabled && <i className="fas fa-chevron-right chevron" />}
          </div>
        </li>
      );

      return item.disabled ? (
        <div key={item.name} className="menu-link-wrapper">
          {menuItemContent}
        </div>
      ) : (
        <Link to={item.path} key={item.name} className="menu-link-wrapper">
          {menuItemContent}
        </Link>
      );
    },
    [
      simulatedTradingEnabled,
      toggleSimulatedTrading,
      handleClearCache,
      openLanguageModal,
    ]
  );

  const handleSignOut = () => {
    dispatch(authActions.doSignout());
  };

  // Username display
  const displayName = currentUser?.fullName || currentUser?.email || i18n("pages.profile.user");

  return (
    <div className="profile-container">
      {/* Header Section */}
      <div className="header">
        {/* Asset Section – replaces old profile-section */}
        <div className="asset-section">
          {/* User name */}
          <div className="user-name">
            {displayName}
            {currentUser?.accountType === 'demo' && (
              <span style={{
                backgroundColor: '#FF6838',
                color: 'white',
                padding: '2px 8px',
                borderRadius: '4px',
                fontSize: '12px',
                marginLeft: '8px',
                fontWeight: 'bold',
                verticalAlign: 'middle'
              }}>DEMO</span>
            )}
          </div>

          {/* Valuation Card */}
          <div className="valuation-card">
            <div className="valuation-header">
              <div className="valuation-label">
                <i
                  className={`fas ${hideAmounts ? "fa-eye" : "fa-eye-slash"}`}
                  onClick={toggleHideAmounts}
                  aria-label={
                    hideAmounts
                      ? i18n("pages.wallet.showAmounts")
                      : i18n("pages.wallet.hideAmounts")
                  }
                ></i>
                {i18n("pages.wallet.assetValuation")}
              </div>
            </div>
            <div className="balance-amount">
              {loadingAssets ? (
                <div className="balance-placeholder placeholder-text"></div>
              ) : hideAmounts ? (
                i18n("common.hidden")
              ) : (
                `$${selectTotalFiat}`
              )}
            </div>
            <div className="usd-equivalent">
              {loadingAssets ? (
                <div className="equivalent-placeholder placeholder-text"></div>
              ) : hideAmounts ? (
                i18n("common.hidden")
              ) : (
                i18n("pages.wallet.totalUsdValue")
              )}
            </div>
          </div>

          {/* Quick Actions - Deposit / Withdraw */}
          {currentUser?.accountType !== 'demo' && (
            <div className="actions-section">
              <div className="actions-grid">
                <Link to="/deposit" className="action-item remove_blue">
                  <div className="action-icon">
                    <i className="fas fa-arrow-down" />
                  </div>
                  <span className="action-label">
                    {i18n("pages.wallet.quickActions.deposit")}
                  </span>
                </Link>
                <Link to="/withdraw" className="action-item remove_blue">
                  <div className="action-icon">
                    <i className="fas fa-arrow-up" />
                  </div>
                  <span className="action-label">
                    {i18n("pages.wallet.quickActions.withdraw")}
                  </span>
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Content Card */}
      <div className="content-card">
        <ul className="menu-list">
          {/* KYC Status Item – appears at the top of the menu - hidden for demo accounts */}
          {currentUser?.accountType !== 'demo' && (
            <li className="menu-item kyc-status-item">
              <div className="icon-container icon-gray">
                <i className={getVerificationIcon()} />
              </div>
              <div className="menu-text">
                <div className="kyc-badge-text">{getVerificationText()}</div>
              </div>
              <div className="menu-action">
                <button
                  className={`verify-button-small ${shouldPulseBadge() ? "pulse" : ""}`}
                  onClick={handleVerifyNow}
                  disabled={isVerificationButtonDisabled()}
                >
                  {getVerificationButtonText()}
                </button>
              </div>
            </li>
          )}

          {/* Other menu items (now includes Notifications) */}
          {menuItems.map((item, index) => renderMenuItem(item, index))}
        </ul>

        <div className="signout-section">
          <button className="signout-button" onClick={handleSignOut}>
            <i className="fas fa-sign-out-alt" />
            {i18n("pages.profile.menu.logout")}
          </button>
        </div>
      </div>

      {/* Language Selection Modal */}
      {isLanguageModalOpen && (
        <div className="modal-overlay" onClick={closeLanguageModal}>
          <div
            className="modal-container-bottom"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-header-bottom">
              <div className="modal-drag-handle"></div>
              <div className="modal-title-wrapper">
                <div className="modal-title">
                  {i18n("pages.settings.modals.language.title")}
                </div>
                <button
                  className="modal-close-btn-bottom"
                  onClick={closeLanguageModal}
                >
                  <i className="fas fa-times" />
                </button>
              </div>
            </div>
            <div className="modal-content-bottom">
              <I18nSelect isInModal={true} />
            </div>
          </div>
        </div>
      )}

      <style>{`
        /* Profile Container */
        .profile-container {
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

        /* Header */
        .header {
          padding: 12px 16px;
        }
        .nav-bar {
          display: flex;
          align-items: center;
          gap: 16px;
          margin-bottom: 16px;
        }
        .back-arrow {
          color: #ffffff;
          font-size: 18px;
          text-decoration: none;
        }
        .back-arrow:hover {
          color: #39FF14;
        }
        .page-title {
          font-size: 16px;
          font-weight: 500;
          color: #ffffff;
        }

        /* Asset Section */
        .asset-section {
          margin-top: 8px;
        }
        .user-name {
          font-size: 20px;
          font-weight: 600;
          margin-bottom: 16px;
          color: #ffffff;
          text-align: center;
        }
        .valuation-card {
          background-color: #0f0f0f;
          border: 1px solid #2a2a2a;
          border-radius: 12px;
          padding: 12px;
          margin-bottom: 16px;
        }
        .valuation-header {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 8px;
        }
        .valuation-label {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 12px;
          color: #aaaaaa;
        }
        .valuation-label i {
          cursor: pointer;
          font-size: 14px;
          color: #39FF14;
          transition: color 0.2s;
        }
        .valuation-label i:hover {
          color: #2ecc10;
        }
        .balance-amount {
          font-size: 28px;
          font-weight: bold;
          color: #ffffff;
          margin-bottom: 4px;
        }
        .usd-equivalent {
          font-size: 12px;
          color: #777777;
        }

        .actions-section {
          margin-bottom: 20px;
        }
        .actions-grid {
          display: flex;
          gap: 12px;
        }
        .action-item {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          background-color: #2a2a2a;
          padding: 10px;
          border-radius: 8px;
          text-decoration: none;
          color: #ffffff;
          transition: all 0.2s;
        }
        .action-item:hover {
          background-color: #39FF14;
          color: #0f0f0f;
        }
        .action-icon {
          font-size: 16px;
        }
        .action-label {
          font-size: 13px;
          font-weight: 500;
        }
        .remove_blue {
          -webkit-tap-highlight-color: transparent;
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

        /* Menu List */
        .menu-list {
          list-style: none;
          padding: 0;
          margin: 0;
        }
        .menu-item {
          display: flex;
          align-items: center;
          padding: 10px 0;
          border-bottom: 1px solid #2a2a2a;
          cursor: pointer;
          transition: color 0.2s;
        }
        .menu-item:hover:not(.disabled) {
          color: #39FF14;
        }
        .menu-item.disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        /* KYC Status Item */
        .kyc-status-item {
          border-bottom: 2px solid #39FF14;
          margin-bottom: 8px;
        }
        .kyc-badge-text {
          display: flex;
          align-items: center;
          gap: 6px;
        }
        .verify-button-small {
          background-color: #39FF14;
          color: #0f0f0f;
          font-weight: bold;
          padding: 5px 10px;
          border: none;
          border-radius: 20px;
          font-size: 11px;
          cursor: pointer;
          transition: background-color 0.2s;
        }
        .verify-button-small:hover:not(:disabled) {
          background-color: #2ecc10;
        }
        .verify-button-small:disabled {
          opacity: 0.5;
          cursor: not-allowed;
          background-color: #2a2a2a;
          color: #777777;
        }
        /* Pulse animation for the verify button when unverified */
        .verify-button-small.pulse {
          animation: pulse 2s infinite;
        }
        @keyframes pulse {
          0% { box-shadow: 0 0 0 0 rgba(57, 255, 20, 0.7); }
          70% { box-shadow: 0 0 0 10px rgba(57, 255, 20, 0); }
          100% { box-shadow: 0 0 0 0 rgba(57, 255, 20, 0); }
        }

        .icon-container {
          width: 36px;
          height: 36px;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-right: 14px;
          font-size: 16px;
        }
        .icon-green {
          background-color: rgba(57, 255, 20, 0.1);
          color: #39FF14;
        }
        .icon-gray {
          background-color: #2a2a2a;
          color: #ffffff;
        }
        .icon-blue {
          background-color: rgba(0, 123, 255, 0.1);
          color: #007bff;
        }
        .menu-text {
          flex: 1;
          font-size: 14px;
          color: #ffffff;
        }
        .menu-action {
          color: #777777;
          font-size: 13px;
        }
        .chevron {
          color: #39FF14;
        }

        /* Toggle Switch */
        .toggle-switch {
          position: relative;
          display: inline-block;
          width: 46px;
          height: 22px;
        }
        .toggle-switch input {
          opacity: 0;
          width: 0;
          height: 0;
        }
        .slider {
          position: absolute;
          cursor: pointer;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: #2a2a2a;
          transition: 0.2s;
          border-radius: 24px;
        }
        .slider:before {
          position: absolute;
          content: "";
          height: 18px;
          width: 18px;
          left: 2px;
          bottom: 2px;
          background-color: #ffffff;
          transition: 0.2s;
          border-radius: 50%;
        }
        input:checked + .slider {
          background-color: #39FF14;
        }
        input:checked + .slider:before {
          transform: translateX(24px);
          background-color: #0f0f0f;
        }

        /* Sign Out Button */
        .signout-section {
          margin-top: 20px;
          padding-top: 16px;
          border-top: 1px solid #2a2a2a;
        }
        .signout-button {
          background: none;
          border: 1px solid #39FF14;
          color: #39FF14;
          padding: 10px;
          border-radius: 6px;
          font-size: 14px;
          font-weight: bold;
          width: 100%;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          transition: all 0.2s;
        }
        .signout-button:hover {
          background-color: #39FF14;
          color: #0f0f0f;
        }
        .signout-button i {
          font-size: 16px;
        }

        .menu-link-wrapper {
          text-decoration: none;
          color: inherit;
          display: block;
        }

        /* Placeholder styles */
        .placeholder-text {
          background: linear-gradient(90deg, #2a2a2a 25%, #3a3a3a 50%, #2a2a2a 75%);
          background-size: 200% 100%;
          animation: loading 1.5s infinite;
          border-radius: 4px;
        }
        @keyframes loading {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
        .balance-placeholder {
          width: 100px;
          height: 28px;
        }
        .equivalent-placeholder {
          width: 70px;
          height: 12px;
        }

        /* Modal Styles */
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: rgba(0, 0, 0, 0.8);
          backdrop-filter: blur(4px);
          display: flex;
          align-items: flex-end;
          justify-content: center;
          z-index: 1000;
          animation: fadeIn 0.3s ease;
        }
        .modal-container-bottom {
          background-color: #1c1c1c;
          border-top: 2px solid #39FF14;
          border-radius: 24px 24px 0 0;
          width: 100%;
          max-width: 400px;
          max-height: 85vh;
          overflow: hidden;
          box-shadow: 0 -10px 40px rgba(0, 0, 0, 0.5);
          animation: slideUpFromBottom 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          display: flex;
          flex-direction: column;
          margin: 0 auto;
        }
        .modal-header-bottom {
          padding: 12px 20px 8px 20px;
          border-bottom: 1px solid #2a2a2a;
          position: relative;
        }
        .modal-drag-handle {
          width: 40px;
          height: 4px;
          background: #444;
          border-radius: 2px;
          margin: 0 auto 12px auto;
        }
        .modal-title-wrapper {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .modal-title {
          font-size: 16px;
          font-weight: 600;
          color: #ffffff;
        }
        .modal-close-btn-bottom {
          background: #2a2a2a;
          border: none;
          color: #ffffff;
          font-size: 14px;
          cursor: pointer;
          padding: 6px;
          border-radius: 50%;
          width: 32px;
          height: 32px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s ease;
        }
        .modal-close-btn-bottom:hover {
          background: #39FF14;
          color: #0f0f0f;
        }
        .modal-content-bottom {
          flex: 1;
          overflow-y: hidden;
          padding: 0;
          max-height: calc(85vh - 100px);
          background-color: #1c1c1c;
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideUpFromBottom {
          from {
            opacity: 0;
            transform: translateY(100%);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}

export default Profile;