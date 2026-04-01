import React from "react";
import { Link } from "react-router-dom";
import { i18n } from "../../../i18n";

function TypePassword() {
  return (
    <div className="typepassword-container">
      {/* Header Section - Matching Profile Page */}
      <div className="header">
        <div className="nav-bar">
          <Link to="/profile" className="back-arrow">
            <i className="fas fa-arrow-left" />
          </Link>
          <div className="page-title">{i18n("pages.passwordType.title")}</div>
        </div>
      </div>

      {/* Content Card - Matching Profile Page */}
      <div className="content-card">
        <div className="password-options">
          <Link to="/loginpassword" className="password-option remove_blue">
            <div className="option-content-wrapper">
              <div className="option-icon">
                <div className="icon-circle">
                  <i className="fas fa-key" />
                </div>
              </div>
              <div className="option-content">
                <div className="option-title">
                  {i18n("pages.passwordType.options.login.title")}
                </div>
             
              </div>
              <div className="option-arrow">
                <i className="fas fa-chevron-right" />
              </div>
            </div>
          </Link>
          
          <Link to="/withdrawPassword" className="password-option remove_blue">
            <div className="option-content-wrapper">
              <div className="option-icon">
                <div className="icon-circle">
                  <i className="fas fa-lock" />
                </div>
              </div>
              <div className="option-content">
                <div className="option-title">
                  {i18n("pages.passwordType.options.withdrawal.title")}
                </div>
              
              </div>
              <div className="option-arrow">
                <i className="fas fa-chevron-right" />
              </div>
            </div>
          </Link>
        </div>
      </div>

<style>{`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
  }

  .typepassword-container {
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

  /* Header Section - Matches About */
  .header {
    padding: 16px 20px;
    border-bottom: 1px solid #2a2a2a;
  }

  .nav-bar {
    display: flex;
    align-items: center;
    gap: 16px;
    position: relative;
  }

  .back-arrow {
    color: #ffffff;
    font-size: 20px;
    text-decoration: none;
    transition: opacity 0.3s ease;
  }

  .back-arrow:hover {
    color: #39FF14;
  }

  .page-title {
    font-size: 18px;
    font-weight: 500;
    color: #ffffff;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
  }

  /* Content Card - Matches About */
  .content-card {
    flex: 1;
    background-color: #1c1c1c;
    border-top-left-radius: 24px;
    border-top-right-radius: 24px;
    padding: 24px 20px;
    margin-top: 20px;
    border-top: 2px solid #39FF14;
  }

  .password-options {
    margin-bottom: 30px;
  }

  .password-option {
    display: block;
    text-decoration: none;
    color: inherit;
    margin-bottom: 16px;
  }

  .password-option:last-child {
    margin-bottom: 0;
  }

  .option-content-wrapper {
    display: flex;
    align-items: center;
    padding: 12px;
    background-color: #2a2a2a;
    border: 1px solid #3a3a3a;
    border-radius: 12px;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    cursor: pointer;
  }

  .password-option:hover .option-content-wrapper {
    transform: translateY(-2px);
    border-color: #39FF14;
    box-shadow: 0 4px 12px rgba(57, 255, 20, 0.1);
  }

  .option-icon {
    margin-right: 16px;
    flex-shrink: 0;
  }

  .icon-circle {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 20px;
    width: 40px;
    height: 40px;
    background-color: #1c1c1c;
    border-radius: 12px;
  }

  /* Icon colors */
  .password-option:nth-child(1) .icon-circle {
    color: #39FF14;
  }

  .password-option:nth-child(2) .icon-circle {
    color: #39FF14;
  }

  .option-content {
    flex: 1;
  }

  .option-title {
    font-size: 15px;
    font-weight: 600;
    color: #ffffff;
    margin-bottom: 4px;
  }

  .option-desc {
    font-size: 14px;
    color: #aaaaaa;
    line-height: 1.3;
  }

  .option-arrow {
    color: #888;
    font-size: 14px;
    margin-left: 12px;
    transition: transform 0.3s ease;
  }

  .password-option:hover .option-arrow {
    color: #39FF14;
    transform: translateX(3px);
  }

  /* Pulse animation (optional, kept but color adapted) */
  @keyframes pulse {
    0% {
      box-shadow: 0 0 0 0 rgba(57, 255, 20, 0.4);
    }
    70% {
      box-shadow: 0 0 0 6px rgba(57, 255, 20, 0);
    }
    100% {
      box-shadow: 0 0 0 0 rgba(57, 255, 20, 0);
    }
  }

  .pulse {
    animation: pulse 2s infinite;
  }

  /* Responsive adjustments */
  @media (max-width: 380px) {
    .typepassword-container {
      padding: 0;
    }

    .header {
      padding: 16px;
    }

    .content-card {
      padding: 20px 16px;
    }

    .option-content-wrapper {
      padding: 10px;
    }

    .icon-circle {
      width: 36px;
      height: 36px;
      font-size: 16px;
    }

    .option-title {
      font-size: 14px;
    }

    .option-desc {
      font-size: 12px;
    }
  }
`}</style>
    </div>
  );
}

export default TypePassword;