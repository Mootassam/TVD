import React, { useCallback, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import authActions from "src/modules/auth/authActions";
import selectors from "src/modules/auth/authSelectors";

// Shown to a freshly registered customer whose account has not yet been
// approved by an admin. They can only wait for approval or log out.
function PendingApproval() {
  const dispatch = useDispatch();
  const history = useHistory();
  const currentUser = useSelector(selectors.selectCurrentUser);
  const loading = useSelector(selectors.selectLoading);

  // Once signed out (or if reached without a session) send them to sign in.
  useEffect(() => {
    if (!currentUser) {
      history.replace("/auth/signin");
    }
  }, [currentUser, history]);

  const handleLogout = useCallback(() => {
    dispatch(authActions.doSignout());
  }, [dispatch]);

  return (
    <div className="pending-container">
      <div className="pending-card">
        <div className="pending-icon">
          <i className="fas fa-hourglass-half" />
        </div>

        <div className="pending-title">Your account is being processed</div>

        <div className="pending-message">
          Thank you for registering. Your account has been created and is now
          awaiting approval. You should wait for approval before you can access
          the platform.
        </div>

        <button
          className="logout-button"
          onClick={handleLogout}
          disabled={loading}
          type="button"
        >
          {loading ? (
            <span>
              <i className="fas fa-spinner fa-spin" style={{ marginRight: "8px" }} />
              Logging out...
            </span>
          ) : (
            <span>
              <i className="fas fa-sign-out-alt" style={{ marginRight: "8px" }} />
              Logout
            </span>
          )}
        </button>
      </div>

      <style>{`
        .pending-container {
          max-width: 400px;
          margin: 0 auto;
          min-height: 100vh;
          background-color: #0f0f0f;
          border-top: 2px solid #39FF14;
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 20px;
          box-sizing: border-box;
        }
        .pending-card {
          background-color: #1c1c1c;
          border: 1px solid #2a2a2a;
          border-radius: 12px;
          padding: 32px 24px;
          text-align: center;
        }
        .pending-icon {
          font-size: 48px;
          color: #39FF14;
          margin-bottom: 20px;
        }
        .pending-title {
          color: #ffffff;
          font-size: 20px;
          font-weight: 600;
          margin-bottom: 14px;
        }
        .pending-message {
          color: #aaaaaa;
          font-size: 14px;
          line-height: 1.6;
          margin-bottom: 28px;
        }
        .logout-button {
          background-color: transparent;
          color: #39FF14;
          font-weight: bold;
          height: 50px;
          width: 100%;
          border: 1px solid #39FF14;
          border-radius: 6px;
          font-size: 16px;
          cursor: pointer;
          transition: background-color 0.2s, color 0.2s;
        }
        .logout-button:hover:not(:disabled) {
          background-color: #39FF14;
          color: #0f0f0f;
        }
        .logout-button:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }
      `}</style>
    </div>
  );
}

export default PendingApproval;
