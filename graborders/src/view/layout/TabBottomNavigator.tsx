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
      icon: "fas fa-chart-bar",
      path: "/futures",
      name: i18n("components.bottomNav.trade"),
    },
      {
      icon: "fas fa-history",
      path: "/history",
      name: i18n("components.bottomNav.history"),
    },
    {
      icon: "fas fa-wallet",
      path: "/wallets",
      name: i18n("components.bottomNav.wallets"),
    },
  ];

  return (
    <nav className="bottom-nav">
      {tabs.map((item, index) => (
        <Link
          key={index}
          to={item.path}
          className={`nav-item ${isActive(item.path) ? "active" : ""}`}
        >
          <i className={item.icon}></i>
          <span className="nav-label">{item.name}</span>
        </Link>
      ))}

      <style>{`
        .bottom-nav {
          position: fixed;
          bottom: 0;
          left: 0;
          right: 0;
          max-width: 430px;
          margin: 0 auto;
          background-color: #1c1c1c;
          border-top: 1px solid #2a2a2a;
          display: flex;
          justify-content: space-around;
          align-items: center;
          padding: 6px 0 8px;
          box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.5);
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

        .nav-label {
          font-weight: 500;
          line-height: 1.2;
        }

        /* Optional: add a subtle indicator for active tab */
        .nav-item.active {
          background-color: rgba(57, 255, 20, 0.05);
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