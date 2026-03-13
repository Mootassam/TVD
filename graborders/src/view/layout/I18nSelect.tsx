import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { getLanguages, getLanguageCode, i18n } from '../../i18n';
import actions from 'src/modules/layout/layoutActions';

const I18nSelect = ({ isInModal = false }) => {
  const [loadingLanguage, setLoadingLanguage] = useState(null);

  const doChangeLanguage = async (language) => {
    setLoadingLanguage(language);
    try {
      await actions.doChangeLanguage(language);
    } finally {
      setTimeout(() => {
        setLoadingLanguage(null);
      }, 300);
    }
  };

  // When used inside a modal, we don't need the header
  if (isInModal) {
    return (
      <div className="i18n-modal-content">
        <div className="languages-list-modal">
          {getLanguages().map((language) => {
            const isActive = getLanguageCode() === language.id;
            const isLoading = loadingLanguage === language.id;

            return (
              <div
                key={language.id}
                onClick={() => !isLoading && doChangeLanguage(language.id)}
                className={`language-item-modal ${isActive ? 'active' : ''} ${isLoading ? 'loading' : ''}`}
              >
                <div className="language-flag-modal">
                  <img src={language.flag} alt={language.label} />
                </div>
                <div className="language-info-modal">
                  <div className="language-name-modal">{language.label}</div>
                  <div className="language-native-modal">{language.label}</div>
                </div>
                {isActive && !isLoading && (
                  <div className="selected-indicator-modal">
                    <i className="fas fa-check"></i>
                  </div>
                )}
                {isLoading && (
                  <div className="loading-indicator-modal">
                    <i className="fas fa-spinner fa-spin"></i>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="language-help-modal">
          <i className="fas fa-info-circle"></i>
          <span>Changing the language will affect all text in the application</span>
        </div>

        <style jsx="true">{`
          .i18n-modal-content {
            padding: 0;
            height: 100%;
            display: flex;
            flex-direction: column;
            background-color: #1c1c1c;
            color: #ffffff;
          }

          .languages-list-modal {
            flex: 1;
            overflow-y: auto;
            padding: 8px 0;
            max-height: calc(85vh - 120px);
          }

          .languages-list-modal::-webkit-scrollbar {
            width: 4px;
          }
          .languages-list-modal::-webkit-scrollbar-track {
            background: #2a2a2a;
            border-radius: 2px;
          }
          .languages-list-modal::-webkit-scrollbar-thumb {
            background: #39FF14;
            border-radius: 2px;
          }
          .languages-list-modal::-webkit-scrollbar-thumb:hover {
            background: #2ecc10;
          }

          .language-item-modal {
            display: flex;
            align-items: center;
            padding: 16px 20px;
            cursor: pointer;
            transition: all 0.2s ease;
            border-bottom: 1px solid #2a2a2a;
          }
          .language-item-modal:last-child {
            border-bottom: none;
          }
          .language-item-modal:hover {
            background-color: #2a2a2a;
          }
          .language-item-modal.active {
            background-color: rgba(57, 255, 20, 0.1);
          }
          .language-item-modal.loading {
            opacity: 0.7;
            cursor: not-allowed;
          }

          .language-flag-modal {
            width: 32px;
            height: 24px;
            margin-right: 16px;
            border-radius: 3px;
            overflow: hidden;
            box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
            flex-shrink: 0;
          }
          .language-flag-modal img {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }

          .language-info-modal {
            flex: 1;
          }
          .language-name-modal {
            font-size: 16px;
            font-weight: 600;
            color: #ffffff;
            margin-bottom: 2px;
          }
          .language-native-modal {
            font-size: 13px;
            color: #aaaaaa;
            font-weight: 400;
          }

          .selected-indicator-modal {
            color: #39FF14;
            font-size: 16px;
            margin-left: 10px;
            flex-shrink: 0;
            animation: fadeInScale 0.3s ease;
          }
          .loading-indicator-modal {
            color: #39FF14;
            font-size: 16px;
            margin-left: 10px;
            flex-shrink: 0;
          }

          .language-help-modal {
            padding: 16px 20px;
            border-top: 1px solid #2a2a2a;
            background-color: #1c1c1c;
            display: flex;
            align-items: center;
            gap: 10px;
          }
          .language-help-modal i {
            color: #39FF14;
            font-size: 14px;
            flex-shrink: 0;
          }
          .language-help-modal span {
            font-size: 13px;
            color: #dddddd;
            line-height: 1.4;
          }

          @keyframes fadeInScale {
            from {
              opacity: 0;
              transform: scale(0.8);
            }
            to {
              opacity: 1;
              transform: scale(1);
            }
          }

          @media (max-width: 380px) {
            .language-item-modal {
              padding: 14px 16px;
            }
            .language-flag-modal {
              width: 28px;
              height: 21px;
              margin-right: 12px;
            }
            .language-name-modal {
              font-size: 15px;
            }
            .language-help-modal {
              padding: 14px 16px;
            }
          }
        `}</style>
      </div>
    );
  }

  // Original standalone component (for when not in modal)
  return (
    <div className="i18n-container">
      {/* Header Section - Matching Profile Page */}
      <div className="header">
        <div className="nav-bar">
          <Link to="/settings" className="back-arrow">
            <i className="fas fa-arrow-left"></i>
          </Link>
          <div className="page-title">{i18n('pages.language.selectLanguage')}</div>
        </div>
      </div>

      {/* Content Card - Matching Profile Page */}
      <div className="content-card">
        <div className="language-intro">
          <div className="language-icon">
            <i className="fas fa-language"></i>
          </div>
          <h2>{i18n('pages.language.choosePreferred')}</h2>
          <p>Select your preferred language for the application interface</p>
        </div>

        <div className="languages-list">
          {getLanguages().map((language) => {
            const isActive = getLanguageCode() === language.id;
            const isLoading = loadingLanguage === language.id;

            return (
              <div
                key={language.id}
                onClick={() => !isLoading && doChangeLanguage(language.id)}
                className={`language-item ${isActive ? 'active' : ''} ${isLoading ? 'loading' : ''}`}
              >
                <div className="language-flag">
                  <img src={language.flag} alt={language.label} />
                </div>
                <div className="language-info">
                  <div className="language-name">{language.label}</div>
                  <div className="language-native">{language.label}</div>
                </div>
                {isActive && !isLoading && (
                  <div className="selected-indicator">
                    <i className="fas fa-check"></i>
                  </div>
                )}
                {isLoading && (
                  <div className="loading-indicator">
                    <i className="fas fa-spinner fa-spin"></i>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="language-help">
          <p>
            <i className="fas fa-info-circle"></i>
            Changing the language will affect all text in the application
          </p>
        </div>
      </div>

      <style>{`
        /* I18n Container – matches login/profile containers */
        .i18n-container {
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
          position: relative;
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
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
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
          display: flex;
          flex-direction: column;
        }

        .language-intro {
          text-align: center;
          margin-bottom: 20px;
          padding: 20px 0;
        }
        .language-icon {
          font-size: 32px;
          color: #39FF14;
          margin-bottom: 16px;
        }
        .language-intro h2 {
          font-size: 20px;
          font-weight: 700;
          color: #ffffff;
          margin-bottom: 8px;
        }
        .language-intro p {
          font-size: 14px;
          color: #aaaaaa;
          line-height: 1.4;
        }

        .languages-list {
          flex: 1;
          overflow-y: auto;
          margin-bottom: 20px;
        }
        .languages-list::-webkit-scrollbar {
          width: 4px;
        }
        .languages-list::-webkit-scrollbar-track {
          background: #2a2a2a;
          border-radius: 2px;
        }
        .languages-list::-webkit-scrollbar-thumb {
          background: #39FF14;
          border-radius: 2px;
        }
        .languages-list::-webkit-scrollbar-thumb:hover {
          background: #2ecc10;
        }

        .language-item {
          display: flex;
          align-items: center;
          padding: 16px;
          border: 1px solid #2a2a2a;
          border-radius: 7px;
          margin-bottom: 12px;
          cursor: pointer;
          transition: all 0.2s ease;
          background-color: #1c1c1c;
        }
        .language-item:last-child {
          margin-bottom: 0;
        }
        .language-item:hover {
          border-color: #39FF14;
          background-color: #2a2a2a;
        }
        .language-item.active {
          background-color: rgba(57, 255, 20, 0.1);
          border-color: #39FF14;
        }
        .language-item.loading {
          opacity: 0.7;
          cursor: not-allowed;
        }

        .language-flag {
          width: 40px;
          height: 30px;
          margin-right: 16px;
          border-radius: 4px;
          overflow: hidden;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
        }
        .language-flag img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .language-info {
          flex: 1;
        }
        .language-name {
          font-size: 16px;
          font-weight: 600;
          color: #ffffff;
          margin-bottom: 4px;
        }
        .language-native {
          font-size: 14px;
          color: #aaaaaa;
        }

        .selected-indicator {
          color: #39FF14;
          font-size: 18px;
        }
        .loading-indicator {
          color: #39FF14;
          font-size: 18px;
        }

        .language-help {
          padding: 16px;
          background-color: #1c1c1c;
          border-radius: 7px;
          border: 1px solid #2a2a2a;
        }
        .language-help p {
          font-size: 14px;
          color: #dddddd;
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .language-help i {
          color: #39FF14;
          font-size: 16px;
        }

        /* Responsive adjustments */
        @media (max-width: 380px) {
          .header {
            padding: 16px;
          }
          .content-card {
            padding: 20px 16px;
          }
          .language-intro {
            padding: 16px 0;
            margin-bottom: 16px;
          }
          .language-icon {
            font-size: 28px;
            margin-bottom: 12px;
          }
          .language-intro h2 {
            font-size: 18px;
          }
          .language-item {
            padding: 14px;
          }
          .language-flag {
            width: 36px;
            height: 27px;
            margin-right: 12px;
          }
          .language-name {
            font-size: 15px;
          }
          .language-native {
            font-size: 13px;
          }
          .language-help {
            padding: 14px;
          }
          .language-help p {
            font-size: 13px;
          }
        }
      `}</style>
    </div>
  );
};

export default I18nSelect;