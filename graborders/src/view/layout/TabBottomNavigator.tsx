import React from "react";
import { Link, useLocation } from "react-router-dom";
import { i18n } from "../../i18n";

interface TabItem {
  icon: string;
  path: string;
  name: string;
}

function TabBottomNavigator() {
  const location = useLocation();

  const isActive = (pathname: string) => location.pathname === pathname;

  const tabs: TabItem[] = [
    {
      icon: "./icons/home.png",
      path: "/",
      name: i18n("components.bottomNav.home"),
    },
    {
      icon: "./icons/quotes.png",
      path: "/market",
      name: i18n("components.bottomNav.market"),
    },
    {
      icon: "./icons/trade.png",
      path: "/trade",
      name: i18n("components.bottomNav.trade"),
    },
        {
      icon: "./icons/trade.png",
      path: "/futures",
      name: i18n("components.bottomNav.futures"),
    },
    {
      icon: "./icons/assets.png",
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
          <img src={item.icon} alt={item.name} className="nav-icon" />
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
          padding: 8px 0 12px;
          box-sizing: border-box;
          z-index: 1000;
        }

        .nav-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-decoration: none;
          color: #ffffff;
          font-size: 12px;
          gap: 4px;
          transition: color 0.2s;
        }

        .nav-item.active {
          color: #39FF14;
        }

        .nav-icon {
          height: 24px;
          width: 24px;
          object-fit: contain;
          filter: brightness(0) invert(1); /* makes image white */
          transition: filter 0.2s;
        }

        .nav-item.active .nav-icon {
          filter: brightness(0) saturate(100%) invert(76%) sepia(96%) saturate(1080%) hue-rotate(44deg) brightness(105%) contrast(101%);
          /* This filter turns the icon neon green (#39FF14) */
        }

        .nav-label {
          font-weight: 500;
        }

        /* Optional hover effect */
        .nav-item:hover {
          color: #39FF14;
        }
        .nav-item:hover .nav-icon {
          filter: brightness(0) saturate(100%) invert(76%) sepia(96%) saturate(1080%) hue-rotate(44deg) brightness(105%) contrast(101%);
        }
      `}</style>
    </nav>
  );
}

export default TabBottomNavigator;