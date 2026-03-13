import React from "react";
import { Link } from "react-router-dom";

function Error404Page() {
  return (
    <div className="error404-container">
      {/* Header Section - Matching Other Pages */}
      <div className="header">
        <div className="nav-bar">
          <div className="page-title">404 Error</div>
        </div>
      </div>

      {/* Content Card - Matching Other Pages */}
      <div className="content-card">
        <div className="error404-content">
          {/* Forex Animation */}
          <div className="forex-animation">
            <div className="forex-icon dollar">
              <i className="fas fa-dollar-sign" />
            </div>
            <div className="forex-icon euro">
              <i className="fas fa-euro-sign" />
            </div>
            <div className="forex-icon pound">
              <i className="fas fa-pound-sign" />
            </div>
          </div>

          {/* Error Icon */}
          <div className="error-icon">
            <i className="fas fa-exclamation-circle" />
          </div>

          {/* Error Code */}
          <h1 className="error-code">404</h1>

          {/* Error Title */}
          <h2 className="error-title">Page Not Found</h2>

          {/* Error Message */}
          <p className="error-message">
            The page you're looking for doesn't exist. It might have been moved or
            you entered the wrong address.
          </p>

          {/* Home Button */}
          <Link to="/" className="home-button">
            <i className="fas fa-home" /> Go Back Home
          </Link>
        </div>
      </div>

      <style>{`
        /* Error Container – matches profile container */
        .error404-container {
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
          border-top: 2px solid #39FF14;
        }

        /* Error Content */
        .error404-content {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          min-height: 60vh;
          text-align: center;
        }

        /* Forex Animation */
        .forex-animation {
          position: relative;
          width: 200px;
          height: 100px;
          margin: 0 auto 20px;
        }
        .forex-icon {
          position: absolute;
          font-size: 48px;
          color: #39FF14;
          opacity: 0.8;
          animation: float 3s ease-in-out infinite;
        }
        .dollar {
          left: 0;
          top: 0;
          animation-delay: 0s;
        }
        .euro {
          left: 70px;
          top: 20px;
          animation-delay: 0.5s;
        }
        .pound {
          left: 140px;
          top: 0;
          animation-delay: 1s;
        }
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
          100% { transform: translateY(0px); }
        }

        /* Error Icon */
        .error-icon {
          font-size: 48px;
          color: #ff6b6b;
          margin-bottom: 10px;
        }

        /* Error Code */
        .error-code {
          font-size: 72px;
          font-weight: bold;
          color: #39FF14;
          margin: 10px 0;
          line-height: 1;
        }

        /* Error Title */
        .error-title {
          font-size: 24px;
          font-weight: 600;
          color: #ffffff;
          margin-bottom: 12px;
        }

        /* Error Message */
        .error-message {
          font-size: 16px;
          color: #aaaaaa;
          max-width: 300px;
          margin-bottom: 30px;
          line-height: 1.5;
        }

        /* Home Button – matches signout button style */
        .home-button {
          background: none;
          border: 1px solid #39FF14;
          color: #39FF14;
          padding: 12px 24px;
          border-radius: 6px;
          font-size: 16px;
          font-weight: bold;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          transition: all 0.2s;
          text-decoration: none;
        }
        .home-button:hover {
          background-color: #39FF14;
          color: #000000;
        }

        /* Remove default link underline */
        a {
          text-decoration: none;
        }
      `}</style>
    </div>
  );
}

export default Error404Page;