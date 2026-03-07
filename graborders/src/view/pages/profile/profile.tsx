import React, { useMemo, useEffect, useCallback, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import authActions from "src/modules/auth/authActions";
import authSelectors from "src/modules/auth/authSelectors";
import kycSelectors from "src/modules/kyc/list/kycListSelectors";
import actions from "src/modules/kyc/list/kycListActions";
import { i18n } from "../../../i18n";

// Constants for menu items
const MENU_ITEMS = [
  {
    icon: "fas fa-cog",
    path: "/settings",
    name: i18n("pages.profile.menu.preferences"),
  },
  {
    icon: "fas fa-shield-alt",
    path: "/loginpassword",
    name: i18n("pages.profile.menu.password"),
  },
  {
    icon: "fas fa-file-alt",
    path: "/transferAll",
    name: i18n("pages.profile.menu.withdrawalAddress"),
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

// Status constants for better maintainability
const VERIFICATION_STATUS = {
  PENDING: "pending",
  SUCCESS: "success",
  UNVERIFIED: "unverified",
};

function Profile() {
  const dispatch = useDispatch();
  const history = useHistory(); // Add useHistory hook
  const currentUser = useSelector(authSelectors.selectCurrentUser);
  const selectRows = useSelector(kycSelectors.selectRows);
  const loading = useSelector(kycSelectors.selectLoading);
  const [simulatedTradingEnabled, setSimulatedTradingEnabled] = useState(false);

  const kycStatus = useMemo(() => {
    if (selectRows[0]?.status === VERIFICATION_STATUS.PENDING) {
      return VERIFICATION_STATUS.PENDING;
    }
    return currentUser?.kyc
      ? VERIFICATION_STATUS.SUCCESS
      : VERIFICATION_STATUS.UNVERIFIED;
  }, [selectRows, currentUser?.kyc]);

  // Memoized user data to prevent unnecessary re-renders
  const userData = useMemo(() => ({ user: currentUser }), [currentUser]);

  useEffect(() => {
    dispatch(actions.doFetch(userData, userData));
  }, [dispatch, userData]);

  const handleSignout = useCallback(() => {
    dispatch(authActions.doSignout());
  }, [dispatch]);

  const handleClearCache = useCallback(() => {
    console.log(i18n("pages.profile.cache.clearing"));
    // Add your cache clearing logic here
    alert(i18n("pages.profile.cache.cleared"));
  }, []);

  const toggleSimulatedTrading = useCallback(() => {
    setSimulatedTradingEnabled(!simulatedTradingEnabled);
    console.log(i18n("pages.profile.simulatedTrading.toggle", !simulatedTradingEnabled ? i18n("common.enabled") : i18n("common.disabled")));
  }, [simulatedTradingEnabled]);

  const menuItems = useMemo(
    () =>
      MENU_ITEMS.map((item) => ({
        ...item,
        disabled: item?.requiresKyc && !currentUser?.kyc,
      })),
    [currentUser?.kyc]
  );

  const handleVerifyNow = useCallback(() => {
    console.log(i18n("pages.profile.verification.kycStatus"), kycStatus);
    
    // Only redirect to /proof if user is unverified
    if (kycStatus === VERIFICATION_STATUS.UNVERIFIED) {
      console.log(i18n("pages.profile.verification.redirecting"));
      history.push('/proof'); // Redirect to proof page
    } else if (kycStatus === VERIFICATION_STATUS.PENDING) {
      console.log(i18n("pages.profile.verification.pendingReview"));
      // You might want to show a message here
      alert(i18n("pages.profile.verification.pendingAlert"));
    } else {
      console.log(i18n("pages.profile.verification.alreadyVerified"));
      // No action needed for verified users
    }
  }, [kycStatus, history]);

  const getUserInitial = () => {
    if (currentUser?.fullName) {
      return currentUser.fullName.charAt(0).toUpperCase();
    } else if (currentUser?.email) {
      return currentUser.email.charAt(0).toUpperCase();
    }
    return i18n("pages.profile.userInitial");
  };

  const getVerificationText = () => {
    switch (kycStatus) {
      case VERIFICATION_STATUS.SUCCESS:
        return i18n("pages.profile.status.verified");
      case VERIFICATION_STATUS.PENDING:
        return i18n("pages.profile.verification.pending.status");
      default:
        return i18n("pages.profile.status.unverified");
    }
  };

  const getVerificationIcon = () => {
    switch (kycStatus) {
      case VERIFICATION_STATUS.SUCCESS:
        return "fas fa-check-circle";
      case VERIFICATION_STATUS.PENDING:
        return "fas fa-clock";
      default:
        return "fas fa-exclamation-circle";
    }
  };

  const getVerificationButtonText = () => {
    switch (kycStatus) {
      case VERIFICATION_STATUS.SUCCESS:
        return i18n("pages.profile.status.verified");
      case VERIFICATION_STATUS.PENDING:
        return i18n("pages.profile.verification.pending.button");
      default:
        return i18n("pages.profile.verification.alert.verifyNow");
    }
  };

  const isVerificationButtonDisabled = () => {
    return kycStatus === VERIFICATION_STATUS.SUCCESS || kycStatus === VERIFICATION_STATUS.PENDING;
  };

  const shouldPulseBadge = () => {
    return kycStatus === VERIFICATION_STATUS.UNVERIFIED;
  };

  // Memoized render function for menu items
  const renderMenuItem = useCallback((item, index) => {
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

    const menuItemContent = (
      <li className={`menu-item ${item.disabled ? 'disabled' : ''}`}>
        <div className={`icon-container ${item.icon.includes('exchange-alt') ? 'icon-green' :
            item.icon.includes('cog') ? 'icon-gray' :
              item.icon.includes('shield-alt') ? 'icon-blue' :
                item.icon.includes('file-alt') ? 'icon-green' :
                  item.icon.includes('gift') ? 'icon-green' :
                    item.icon.includes('comment-dots') ? 'icon-blue' :
                      item.icon.includes('building') ? 'icon-green' :
                        item.icon.includes('question-circle') ? 'icon-gray' :
                          item.icon.includes('download') ? 'icon-green' : 'icon-gray'
          }`}>
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
  }, [simulatedTradingEnabled, toggleSimulatedTrading, handleClearCache]);

  const handleSignOut = () => {
    dispatch(authActions.doSignout());
  };

  return (
    <div className="profile-container">
      {/* Header Section */}
      <div className="header">
        <div className="nav-bar">
          <Link to="/" className="back-arrow">
            <i className="fas fa-arrow-left" />
          </Link>
          <div className="page-title">{i18n("pages.profile.title")}</div>
        </div>

        <div className="profile-section">
          <div className="avatar-container">
            <div className="avatar-ring">
              <div className="avatar">
                <div className="avatar-initial">{getUserInitial()}</div>
                <div className="sunglasses">
                  <i className="fas fa-sunglasses" />
                </div>
              </div>
            </div>
          </div>

          <div className="username">{currentUser?.fullName || currentUser?.email || i18n("pages.profile.user")}</div>
          <div className="user-id">{i18n("pages.profile.userId")}: {currentUser?.id || i18n("common.na")}</div>

          {/* Certification Status Section */}
          <div className="certification-status">
            <div className={`status-badge ${shouldPulseBadge() ? 'pulse' : ''}`}>
              <i className={`${getVerificationIcon()} status-icon`} />
              {getVerificationText()}
            </div>
            <button
              className="verify-button"
              onClick={handleVerifyNow}
              disabled={isVerificationButtonDisabled()}
            >
              {getVerificationButtonText()}
            </button>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="content-card">
        <ul className="menu-list">
          {menuItems.map((item, index) => renderMenuItem(item, index))}
        </ul>

        <div className="signout-section">
          <button className="signout-button" onClick={handleSignOut}>
            <i className="fas fa-sign-out-alt" />
            {i18n("pages.profile.menu.logout")}
          </button>
        </div>
      </div>


 {/* Sign Out Button */}
      
      {/* Add necessary styles - make sure these are included */}
      <style>{`
/* Profile Container – matches login container */
.profile-container {
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
  margin-bottom: 20px;
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

/* Profile Section */
.profile-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}
.avatar-container {
  margin-bottom: 12px;
}
.avatar-ring {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: linear-gradient(135deg, #39FF14, #2ecc10);
  display: flex;
  align-items: center;
  justify-content: center;
}
.avatar {
  width: 74px;
  height: 74px;
  border-radius: 50%;
  background-color: #1c1c1c;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  border: 2px solid #000000;
}
.avatar-initial {
  font-size: 32px;
  font-weight: bold;
  color: #39FF14;
}
.sunglasses {
  position: absolute;
  bottom: -4px;
  right: -4px;
  background: #39FF14;
  border-radius: 50%;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #000000;
  font-size: 12px;
  border: 2px solid #000000;
}
.username {
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 4px;
  color: #ffffff;
}
.user-id {
  font-size: 14px;
  color: #777777;
  margin-bottom: 16px;
}

/* Certification Status */
.certification-status {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  margin-top: 8px;
  flex-wrap: wrap;
}
.status-badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  background-color: #1c1c1c;
  border: 1px solid #2a2a2a;
  border-radius: 20px;
  font-size: 14px;
  color: #ffffff;
}
.status-badge.pulse {
  animation: pulse 2s infinite;
}
@keyframes pulse {
  0% { box-shadow: 0 0 0 0 rgba(57, 255, 20, 0.7); }
  70% { box-shadow: 0 0 0 10px rgba(57, 255, 20, 0); }
  100% { box-shadow: 0 0 0 0 rgba(57, 255, 20, 0); }
}
.status-icon {
  color: #39FF14; /* default green, you can customize per status */
}
/* Optional: different icon colors for status */
.status-badge .fa-check-circle { color: #39FF14; }
.status-badge .fa-clock { color: #ffaa00; }
.status-badge .fa-exclamation-circle { color: #ff6b6b; }

.verify-button {
  background-color: #39FF14;
  color: #000000;
  font-weight: bold;
  padding: 8px 20px;
  border: none;
  border-radius: 20px;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.2s;
}
.verify-button:hover:not(:disabled) {
  background-color: #2ecc10;
}
.verify-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  background-color: #2a2a2a;
  color: #777777;
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

/* Menu List */
.menu-list {
  list-style: none;
  padding: 0;
  margin: 0;
}
.menu-item {
  display: flex;
  align-items: center;
  padding: 16px 0;
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
.icon-container {
  width: 40px;
  height: 40px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 16px;
  font-size: 18px;
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
  font-size: 16px;
  color: #ffffff;
}
.menu-action {
  color: #777777;
  font-size: 14px;
}
.chevron {
  color: #39FF14;
}

/* Toggle Switch (for simulated trading) */
.toggle-switch {
  position: relative;
  display: inline-block;
  width: 50px;
  height: 24px;
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
  height: 20px;
  width: 20px;
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
  transform: translateX(26px);
  background-color: #000000;
}

/* Sign Out Button */
.signout-section {
  margin-top: 24px;
  padding-top: 16px;
  border-top: 1px solid #2a2a2a;
}
.signout-button {
  background: none;
  border: 1px solid #39FF14;
  color: #39FF14;
  padding: 12px;
  border-radius: 6px;
  font-size: 16px;
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
  color: #000000;
}
.signout-button i {
  font-size: 18px;
}

/* Link wrapper – remove default underline */
.menu-link-wrapper {
  text-decoration: none;
  color: inherit;
  display: block;
}

      `}</style>
    </div>
  );
}

export default Profile;