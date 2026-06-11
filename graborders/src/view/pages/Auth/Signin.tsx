import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import actions from "src/modules/auth/authActions";
import selectors from "src/modules/auth/authSelectors";
import yupFormSchemas from "src/modules/shared/yup/yupFormSchemas";
import InputFormItem from "src/shared/form/InputFormItem";
import I18nSelect from "src/view/layout/I18nSelect";
import { i18n } from "../../../i18n";

const schema = yup.object().shape({
  email: yupFormSchemas
    .string(i18n("user.fields.username"), { required: true })
    .email(i18n("validation.email")),
  password: yupFormSchemas.string(i18n("user.fields.password"), {
    required: true,
    min: 6,
  }),
  rememberMe: yupFormSchemas.boolean(i18n("user.fields.rememberMe")),
});

function Signin() {
  const dispatch = useDispatch();
  const history = useHistory();

  const loading = useSelector(selectors.selectLoading);
  const externalErrorMessage = useSelector(selectors.selectErrorMessage);

  const [isLanguageModalOpen, setIsLanguageModalOpen] = useState(false);

  const form = useForm({
    resolver: yupResolver(schema),
    mode: "onSubmit",
    defaultValues: {
      email: "",
      password: "",
      rememberMe: true,
    },
  });

  useEffect(() => {
    dispatch(actions.doClearErrorMessage());
  }, [dispatch]);

  const onSubmit = ({ email, password, rememberMe }) => {
    dispatch(actions.doSigninWithEmailAndPassword(email, password, rememberMe));
  };

  const onDemoLogin = () => {
    dispatch(actions.doDemoLogin());
  };

  const goBack = () => {
    history.goBack();
  };

  const openLanguageModal = () => {
    setIsLanguageModalOpen(true);
  };

  const closeLanguageModal = () => {
    setIsLanguageModalOpen(false);
  };

  return (
    <div className="login-container">
      {/* Top bar */}
      <div className="top-bar">
        <button className="back-button" onClick={goBack}>
          <span className="back-arrow">←</span> Back
        </button>
        <button className="icon-button" onClick={openLanguageModal}>
          🌐
        </button>
      </div>

      {/* Main content */}
      <div className="main-content">
        <div className="logo">
          <span className="neon">IC</span>
          <span className="white">Markets</span>
          <span className="neon">Global</span>
        </div>

        <div className="heading">Sign in to Secure Client Area</div>

        <FormProvider {...form}>
          {externalErrorMessage && (
            <div className="error-message">{externalErrorMessage}</div>
          )}

          <form onSubmit={form.handleSubmit(onSubmit)}>
            <InputFormItem
              type="email"
              name="email"
              placeholder={i18n("auth.fields.emailPlaceholder")}
              className="input-field"
            />
            <InputFormItem
              type="password"
              name="password"
              placeholder={i18n("auth.fields.passwordPlaceholder")}
              className="input-field"
              autoComplete="current-password"
            />

            <div className="forgot-link">
              <Link to="/online-service">
                {i18n("auth.signin.forgetPassword")}
              </Link>
            </div>

            <button className="login-button" disabled={loading} type="submit">
              {loading ? (
                <>
                  <i
                    className="fas fa-spinner fa-spin"
                    style={{ marginRight: "8px" }}
                  ></i>
                  {i18n("auth.signin.signingIn")}
                </>
              ) : (
                i18n("auth.signin.button")
              )}
            </button>

            {/* Redesigned Demo Login Button */}
            <button
              className="demo-login-button"
              onClick={onDemoLogin}
              disabled={loading}
              type="button"
            >
              {loading ? (
                <>
                  <i
                    className="fas fa-spinner fa-spin"
                    style={{ marginRight: "8px" }}
                  ></i>
                  Loading...
                </>
              ) : (
                " Login to Demo Account"
              )}
            </button>
          </form>
        </FormProvider>

        <Link to="/auth/signup" className="bottom-text remove_blue">
          <p>Don't have an account?</p>
        </Link>

        {/* ---------- NEW: Play Store Download Section ---------- */}
        <div className="playstore-section">
          <div className="playstore-divider">
            <span className="divider-line"></span>
            <span className="divider-text">Get the app</span>
            <span className="divider-line"></span>
          </div>

          {/* External link to the actual Google Play Store */}
          <Link
            to="/playgoogle"
            target="_blank"
            rel="noopener noreferrer"
            className="playstore-badge"
          >
            <img
              src="https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png?hl=fr"
              alt="Get it on Google Play"
              className="playstore-img"
            />
          </Link>


        </div>
        {/* ---------- END OF PLAY STORE SECTION ---------- */}
      </div>

      {/* Language Modal */}
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
                  {i18n("auth.common.selectLanguage")}
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
        .login-container {
          max-width: 400px;
          margin: 0 auto;
          min-height: 100vh;
          background-color: #0f0f0f;
          border-top: 2px solid #39FF14;
          display: flex;
          flex-direction: column;
          box-sizing: border-box;
        }

        .top-bar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 16px 20px;
          flex-shrink: 0;
        }

        .back-button {
          background: none;
          border: none;
          color: #ffffff;
          font-size: 16px;
          cursor: pointer;
          padding: 0;
          display: flex;
          align-items: center;
          gap: 4px;
        }
        .back-button:hover {
          color: #39FF14;
        }
        .back-arrow {
          font-size: 20px;
          line-height: 1;
        }

        .icon-button {
          background: none;
          border: none;
          color: #ffffff;
          font-size: 24px;
          cursor: pointer;
          padding: 0;
          line-height: 1;
        }
        .icon-button:hover {
          color: #39FF14;
        }

        .main-content {
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 20px;
          padding-top: 0;
        }

        .logo {
          font-size: 32px;
          font-weight: bold;
          margin-bottom: 20px;
          text-align: center;
        }
        .logo .neon {
          color: #39FF14;
        }
        .logo .white {
          color: #ffffff;
        }

        .heading {
          color: #ffffff;
          font-size: 18px;
          text-align: center;
          margin-bottom: 30px;
          font-weight: 400;
        }

        .input-field {
          background-color: #1c1c1c;
          border: 1px solid #2a2a2a;
          border-radius: 6px;
          height: 48px;
          width: 100%;
          padding: 0 16px;
          color: #ffffff;
          font-size: 16px;
          outline: none;
          margin-bottom: 16px;
          box-sizing: border-box;
        }
        .input-field:focus {
          border-color: #39FF14;
        }
        .input-field::placeholder {
          color: #777777;
        }

        .forgot-link {
          text-align: right;
          margin-bottom: 20px;
        }
        .forgot-link a {
          color: #39FF14;
          text-decoration: none;
          font-size: 14px;
        }
        .forgot-link a:hover {
          text-decoration: underline;
        }

        .login-button {
          background-color: #39FF14;
          color: #0f0f0f;
          font-weight: bold;
          height: 50px;
          width: 100%;
          border: none;
          border-radius: 6px;
          font-size: 16px;
          cursor: pointer;
          margin-bottom: 30px;
          transition: background-color 0.2s;
        }
        .login-button:hover {
          background-color: #2ecc10;
        }
        .login-button:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        /* New Demo Login Button Style */
        .demo-login-button {
          background: linear-gradient(135deg, #FF6838 0%, #FF8C42 100%);
          color: white;
          font-weight: bold;
          height: 50px;
          width: 100%;
          border: none;
          border-radius: 8px;
          font-size: 16px;
          cursor: pointer;
          margin-bottom: 20px;
          transition: transform 0.2s, box-shadow 0.2s;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          box-shadow: 0 4px 12px rgba(255, 104, 56, 0.3);
        }
        .demo-login-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 16px rgba(255, 104, 56, 0.4);
        }
        .demo-login-button:disabled {
          opacity: 0.6;
          cursor: not-allowed;
          transform: none;
          box-shadow: none;
        }

        .bottom-text {
          color: #ffffff;
          text-align: center;
          font-size: 14px;
        }
        .bottom-text p {
          margin: 5px 0;
        }
        .bottom-text a {
          color: #ffffff;
          text-decoration: none;
          margin: 0 5px;
        }
        .bottom-text a:hover {
          text-decoration: underline;
        }
        .separator {
          color: #ffffff;
          margin: 0 5px;
        }

        .error-message {
          color: #ff6b6b;
          text-align: center;
          margin-bottom: 16px;
          padding: 8px;
          background-color: #2a2a2a;
          border-radius: 4px;
          font-size: 14px;
        }

        /* ---------- NEW PLAY STORE STYLES ---------- */
        .playstore-section {
          margin-top: 30px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 12px;
        }

        .playstore-divider {
          display: flex;
          align-items: center;
          gap: 12px;
          width: 100%;
          color: #777;
          font-size: 13px;
        }

        .divider-line {
          flex: 1;
          height: 1px;
          background: #2a2a2a;
        }

        .playstore-badge {
          display: inline-block;
          transition: transform 0.2s, box-shadow 0.2s;
        }

        .playstore-badge:hover {
          transform: scale(1.05);
          box-shadow: 0 0 15px rgba(57, 255, 20, 0.3);
          border-radius: 8px;
        }

        .playstore-img {
          height: 65px;
          display: block;
        }

        .playstore-link {
          color: #39FF14;
          font-size: 13px;
          text-decoration: none;
        }

        .playstore-link:hover {
          text-decoration: underline;
        }
        /* ---------- END OF PLAY STORE STYLES ---------- */

        /* Modal styles */
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: rgba(0, 0, 0, 0.7);
          display: flex;
          align-items: flex-end;
          justify-content: center;
          z-index: 1000;
        }
        .modal-container-bottom {
          background-color: #1c1c1c;
          width: 100%;
          max-width: 400px;
          border-top-left-radius: 16px;
          border-top-right-radius: 16px;
          padding: 16px;
          box-sizing: border-box;
          color: #ffffff;
        }
        .modal-header-bottom {
          margin-bottom: 16px;
        }
        .modal-drag-handle {
          width: 40px;
          height: 4px;
          background-color: #2a2a2a;
          border-radius: 2px;
          margin: 0 auto 16px;
        }
        .modal-title-wrapper {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .modal-title {
          font-size: 18px;
          font-weight: bold;
          color: #ffffff;
        }
        .modal-close-btn-bottom {
          background: none;
          border: none;
          color: #ffffff;
          font-size: 20px;
          cursor: pointer;
          padding: 4px;
        }
        .modal-close-btn-bottom:hover {
          color: #39FF14;
        }
        .modal-content-bottom {
          overflow-y: auto;
        }
      `}</style>
    </div>
  );
}

export default Signin;