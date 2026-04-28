import React from "react";
import { Link, useLocation } from "react-router-dom";
import { i18n } from "../../i18n";

interface TabItem {
  icon: string;      // Font Awesome class, e.g., "fas fa-home"
  path: string;
  name: string;
}

function TabBottomNavigator() {
  const location = useLocation();

  const isActive = (pathname: string) => location.pathname === pathname;

  const tabs: TabItem[] = [
    {
      icon: "fas fa-home",
      path: "/",
      name: i18n("components.bottomNav.home"),
    },
    {
      icon: "fas fa-chart-line",
      path: "/market",
      name: i18n("components.bottomNav.market"),
    },
    {
      icon: "fas fa-chart-bar",   // This will be ignored for the futures tab
      path: "/futures",
      name: i18n("components.bottomNav.trade"),
    },
    {
      icon: "fas fa-history",
      path: "/history",
      name: i18n("components.bottomNav.history"),
    },
    {
      icon: "fas fa-user",
      path: "/profile",
      name: i18n("components.bottomNav.profile"),
    },
  ];

  return (
    <nav className="bottom-nav">
      {tabs.map((item, index) => {
        const isFutures = item.path === "/futures";

        return (
          <Link
            key={index}
            to={item.path}
            className={`nav-item ${isActive(item.path) ? "active" : ""} ${
              isFutures ? "futures-tab" : ""
            }`}
          >
            {/* Conditional rendering for the futures tab */}
            {isFutures ? (
              <img
                src="/icons/logo.png"
                alt="Futures"
                className="futures-icon"
              />
            ) : (
              <i className={item.icon}></i>
            )}

            {/* Remove the label only for the futures tab */}
            {!isFutures && <span className="nav-label">{item.name}</span>}
          </Link>
        );
      })}

      <style>{`
        .bottom-nav {
          position: fixed;
          bottom: 0;
          left: 0;
          right: 0;
          max-width: 400px;
          margin: 0 auto;
          background-color: #0f0f0f;
          display: flex;
          justify-content: space-around;
          align-items: center;
          padding: 6px 0 8px;
          z-index: 100;
        }

        .nav-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-decoration: none;
          color: #777777;
          font-size: 11px;
          transition: color 0.2s;
          padding: 4px 8px;
          border-radius: 8px;
          gap: 1px;
        }

        .nav-item i {
          font-size: 20px;
          margin-bottom: 2px;
        }

        .nav-item.active {
          color: #39FF14;
        }

        .nav-item.active i {
          color: #39FF14;
        }

        /* Active background tint (optional) */
        .nav-item.active {
          background-color: rgba(57, 255, 20, 0.05);
        }

        .nav-label {
          font-weight: 500;
          line-height: 1.2;
        }

        /* ----- Futures tab custom styles ----- */
        .futures-tab {
          /* Slightly raise the whole tab container (optional) */
          margin-top: -21px;        /* Adjust to taste */
        }

        .futures-icon {
              width: 53px;          /* control image size */
          object-fit: contain;
          transform: translateY(-8px);  /* pushes image a bit up relative to its own line */
          filter: drop-shadow(0 2px 4px rgba(0,0,0,0.3));  /* optional shadow for depth */
        }

        /* Remove default icon gap for the futures tab */
        .futures-tab .nav-label {
          display: none;            /* ensures no extra space from label */
        }

        /* Ensure container doesn't hide content behind it */
        body {
          padding-bottom: 60px;
        }
      `}</style>
    </nav>
  );
}

export default TabBottomNavigator;