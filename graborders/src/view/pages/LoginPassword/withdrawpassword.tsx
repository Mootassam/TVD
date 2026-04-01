import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { i18n } from "../../../i18n";
import authSelectors from "src/modules/auth/authSelectors";
import actions from "src/modules/auth/authActions";
import FieldFormItem from "src/shared/form/FieldFormItem";
import yupFormSchemas from "src/modules/shared/yup/yupFormSchemas";
import userFormActions from "src/modules/user/form/userFormActions";

function WithdrawPassword() {
  const dispatch = useDispatch();
  const currentUser = useSelector(authSelectors.selectCurrentUser);
  const [hasWithdrawPassword, setHasWithdrawPassword] = useState(false);


  // Determine if user already has a withdrawal password
  useEffect(() => {
    if (currentUser) {
      setHasWithdrawPassword(!!currentUser.withdrawPassword);
    }
  }, [currentUser]);

  // Dynamic validation schema
  const schema = useMemo(() => {
    const shape = {
      newPassword: yupFormSchemas.string(i18n("pages.withdrawPassword.fields.newPassword"), {
        required: true,
      }),
      newPasswordConfirmation: yupFormSchemas
        .string(i18n("pages.withdrawPassword.fields.newPasswordConfirmation"), {
          required: true,
        })
        .oneOf(
          [yup.ref("newPassword"), null],
          i18n("pages.withdrawPassword.validation.mustMatch")
        ),
    };

    // Only require old password if user already has one
    if (hasWithdrawPassword) {
      shape.oldPassword = yupFormSchemas.string(i18n("pages.withdrawPassword.fields.oldPassword"), {
        required: true,
      });
    }

    return yup.object().shape(shape);
  }, [hasWithdrawPassword]);

  const initialValues = useMemo(() => ({
    oldPassword: "",
    newPassword: "",
    newPasswordConfirmation: "",
  }), []);

  const form = useForm({
    resolver: yupResolver(schema),
    mode: "all",
    defaultValues: initialValues,
  });

  const onSubmit = (values) => {
    // If no existing password, oldPassword will not be present in values, so we pass undefined
    const oldPassword = hasWithdrawPassword ? values.oldPassword : undefined;

    const data = {
      oldPassword,
      newPassword: values.newPassword,
    };
    dispatch(userFormActions.doUpdateWithdrawPassword(data));
  };

  const pageTitle = hasWithdrawPassword
    ? "Change Withdraw Password"
    : "Set Withdraw Password";

  return (
    <div className="withdrawpassword-container">
      <div className="header">
        <div className="nav-bar">
          <Link to="/passwordtype" className="back-arrow">
            <i className="fas fa-arrow-left" />
          </Link>
          <div className="page-title">{pageTitle}</div>
        </div>
      </div>

      <div className="content-card">
        <FormProvider {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="password-form">
              {/* Conditionally render old password field */}
              {hasWithdrawPassword && (
                <div className="form-group">
                  <FieldFormItem
                    name="oldPassword"
                    type="password"
                    label={i18n("pages.withdrawPassword.fields.oldPassword")}
                    className="form-input"
                    className1="form-group-inner"
                    className2="form-label"
                    className3="password-input-container"
                    placeholder={i18n("pages.withdrawPassword.placeholders.oldPassword")}
                  />
                </div>
              )}

              <div className="form-group">
                <FieldFormItem
                  name="newPassword"
                  type="password"
                  label={i18n("pages.withdrawPassword.fields.newPassword")}
                  className="form-input"
                  className1="form-group-inner"
                  className2="form-label"
                  className3="password-input-container"
                  placeholder={i18n("pages.withdrawPassword.placeholders.newPassword")}
                />
              </div>

              <div className="form-group">
                <FieldFormItem
                  name="newPasswordConfirmation"
                  type="password"
                  label={i18n("pages.withdrawPassword.fields.newPasswordConfirmation")}
                  className="form-input"
                  className1="form-group-inner"
                  className2="form-label"
                  className3="password-input-container"
                  placeholder={i18n("pages.withdrawPassword.placeholders.confirmPassword")}
                />
              </div>

              <button type="submit" className="save-button">
                {hasWithdrawPassword
                  ? i18n("pages.withdrawPassword.buttons.saveChanges")
                  : i18n("pages.withdrawPassword.buttons.setPassword")}
              </button>

              {/* Informative message for users without existing password */}
              {!hasWithdrawPassword && (
                <div className="info-message">
                  <i className="fas fa-info-circle"></i>
                  {i18n("pages.withdrawPassword.infoMessage")}
                </div>
              )}

              {/* Existing warning message (only show if old password exists) */}
              {hasWithdrawPassword && (
                <div className="warning-message">
                  <i className="fas fa-exclamation-circle"></i>
                  {i18n("pages.withdrawPassword.warningMessage")}
                </div>
              )}
            </div>
          </form>
        </FormProvider>
      </div>

      <style>{`
        /* Main container – matches login/profile/proof containers */
        .withdrawpassword-container {
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

        /* Password form container */
        .password-form {
          display: flex;
          flex-direction: column;
        }

        /* Form group wrapper */
        .form-group {
          width: 100%;
        }

        /* Inner container for each field (className1) */
        .form-group-inner {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        /* Label style (className2) */
        .form-label {
          font-size: 14px;
          color: #ffffff;
          margin-bottom: 4px;
        }

        /* Password input container (className3) – can be used for positioning, but we'll focus on the input */
        .password-input-container {
          width: 100%;
        }

        /* Input field (className) */
        .form-input {
          background-color: #1c1c1c;
          border: 1px solid #2a2a2a;
          border-radius: 6px;
          height: 48px;
          width: 100%;
          padding: 0 16px;
          color: #ffffff;
          font-size: 16px;
          outline: none;
          box-sizing: border-box;
        }
        .form-input:focus {
          border-color: #39FF14;
        }
        .form-input::placeholder {
          color: #777777;
        }

        /* Error message styling (if FieldFormItem displays errors) */
        .form-group .error-message {
          color: #ff6b6b;
          font-size: 12px;
          margin-top: 4px;
        }

        /* Save button – matches login button */
        .save-button {
          background-color: #39FF14;
          color: #000000;
          font-weight: bold;
          height: 50px;
          width: 100%;
          border: none;
          border-radius: 6px;
          font-size: 16px;
          cursor: pointer;
          transition: background-color 0.2s;
          margin-top: 8px;
        }
        .save-button:hover {
          background-color: #2ecc10;
        }
        .save-button:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        /* Warning message (for existing password) */
        .warning-message {
          background-color: #2a2a2a;
          border-left: 4px solid #ffaa00;
          padding: 12px 16px;
          border-radius: 8px;
          font-size: 14px;
          color: #ffffff;
          display: flex;
          align-items: center;
          gap: 10px;
          margin-top: 16px;
        }
        .warning-message i {
          color: #ffaa00;
          font-size: 18px;
        }

        /* Info message (for setting new password) */
        .info-message {
          background-color: #2a2a2a;
          border-left: 4px solid #39FF14;
          padding: 12px 16px;
          border-radius: 8px;
          font-size: 14px;
          color: #ffffff;
          display: flex;
          align-items: center;
          gap: 10px;
          margin-top: 16px;
        }
        .info-message i {
          color: #39FF14;
          font-size: 18px;
        }
      `}</style>
    </div>
  );
}

export default WithdrawPassword;