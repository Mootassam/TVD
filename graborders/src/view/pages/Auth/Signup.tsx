import React, { useCallback, useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

// Local imports
import actions from "src/modules/auth/authActions";
import { i18n } from "../../../i18n";
import yupFormSchemas from "src/modules/shared/yup/yupFormSchemas";
import InputFormItem from "src/shared/form/InputFormItem";
import selectors from "src/modules/auth/authSelectors";

function Signup() {
  const dispatch = useDispatch();
  const history = useHistory();
  const loading = useSelector(selectors.selectLoading);
  const errorMessage = useSelector(selectors.selectErrorMessage);
  const [captchaText, setCaptchaText] = useState("");

  // Generate initial captcha on component mount
  useEffect(() => {
    refreshCaptcha();
    dispatch(actions.doClearErrorMessage());
  }, [dispatch]);

  // Validation schema
  const schema = yup.object().shape({
    email: yupFormSchemas.string(i18n("pages.signup.labels.email"), {
      required: true,
    }),
    password: yupFormSchemas.string(i18n("pages.signup.labels.password"), {
      required: true,
      min: 8,
    }),
    newPasswordConfirmation: yupFormSchemas
      .string(i18n("pages.signup.labels.confirmPassword"), {
        required: true,
      })
      .oneOf(
        [yup.ref("password"), null],
        i18n("auth.passwordChange.mustMatch")
      ),
    phoneNumber: yupFormSchemas.string(i18n("pages.signup.labels.phoneNumber"), {
      required: true,
    }),
    captcha: yup
      .string()
      .required(i18n("pages.signup.labels.captcha"))
      .test("captcha-match", i18n("pages.signup.captchaMismatch"), function (value) {
        return value === captchaText;
      }),
  });

  const form = useForm({
    resolver: yupResolver(schema),
    mode: "onSubmit",
    defaultValues: {
      email: "",
      password: "",
      newPasswordConfirmation: "",
      phoneNumber: "",
      captcha: "",
    },
  });

  // Generate new captcha
  const refreshCaptcha = useCallback(() => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let newCaptcha = "";
    for (let i = 0; i < 6; i++) {
      newCaptcha += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setCaptchaText(newCaptcha);
    form.setValue("captcha", "");
    form.clearErrors("captcha");
  }, [form]);

  const onSubmit = useCallback(
    (data) => {
      const { email, password, phoneNumber } = data;
      dispatch(
        actions.doRegisterEmailAndPassword(
          email,
          password,
          phoneNumber,
        )
      );
    },
    [dispatch]
  );

  return (
    <div className="signup-container">
      {/* Heading */}
      <div className="heading">Create your account</div>

      {/* Form Content */}
      <div className="main-content">
        <FormProvider {...form}>
          {errorMessage && (
            <div className="error-message">{errorMessage}</div>
          )}

          <form onSubmit={form.handleSubmit(onSubmit)}>
            {/* Email Field */}
            <div className="form-group">
              <label className="form-label">{i18n("pages.signup.labels.email")}</label>
              <InputFormItem
                type="email"
                name="email"
                placeholder={i18n("pages.signup.placeholders.email")}
                className="input-field"
                externalErrorMessage={null}
                autoComplete="email"
              />
            </div>

            {/* Phone Number Field */}
            <div className="form-group">
              <label className="form-label">{i18n("pages.signup.labels.phoneNumber")}</label>
              <InputFormItem
                type="tel"
                name="phoneNumber"
                placeholder={i18n("pages.signup.placeholders.phoneNumber")}
                className="input-field"
                autoComplete="tel"
              />
            </div>

            {/* Graphical Captcha */}
            <div className="form-group">
              <label className="form-label">{i18n("pages.signup.labels.captcha")}</label>
              <div className="captcha-container">
                <div className="captcha-display" onClick={refreshCaptcha}>
                  <div className="captcha-text">{captchaText}</div>
                  <div className="refresh-captcha">
                    <i className="fas fa-sync-alt" />
                    <span className="refresh-text">{i18n("pages.signup.refresh")}</span>
                  </div>
                </div>
                <InputFormItem
                  type="text"
                  name="captcha"
                  placeholder={i18n("pages.signup.placeholders.captcha")}
                  className="input-field"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="form-group">
              <label className="form-label">{i18n("pages.signup.labels.password")}</label>
              <InputFormItem
                type="password"
                name="password"
                placeholder={i18n("pages.signup.placeholders.password")}
                className="input-field"
                autoComplete="new-password"
              />
            </div>

            {/* Confirm Password Field */}
            <div className="form-group">
              <label className="form-label">{i18n("pages.signup.labels.confirmPassword")}</label>
              <InputFormItem
                type="password"
                name="newPasswordConfirmation"
                placeholder={i18n("pages.signup.placeholders.confirmPassword")}
                className="input-field"
                autoComplete="new-password"
              />
            </div>

            {/* Sign Up Button */}
            <button
              className="signup-button"
              disabled={loading}
              type="submit"
            >
              {loading ? (
                <span>
                  <i className="fas fa-spinner fa-spin" style={{ marginRight: "8px" }}></i>
                  {i18n("pages.signup.creatingAccount")}
                </span>
              ) : (
                <span>{i18n("pages.signup.createAccount")}</span>
              )}
            </button>

            {/* Already have account link */}
            <div className="login-link">
              <Link to="/auth/signin">{i18n("pages.signup.alreadyHaveAccount")}</Link>
            </div>
          </form>
        </FormProvider>
      </div>

      <style>{`
        .signup-container {
          max-width: 430px;
          margin: 0 auto;
          min-height: 100vh;
          background-color: #000000;
          border-top: 2px solid #39FF14;
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 20px;
          box-sizing: border-box;
        }

        .heading {
          color: #ffffff;
          font-size: 24px;
          font-weight: 500;
          text-align: center;
          margin-bottom: 30px;
        }

        .form-group {
          margin-bottom: 16px;
        }

        .form-label {
          display: block;
          color: #ffffff;
          font-size: 14px;
          margin-bottom: 6px;
          font-weight: 500;
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
          box-sizing: border-box;
        }
        .input-field:focus {
          border-color: #39FF14;
        }
        .input-field::placeholder {
          color: #777777;
        }

        .captcha-container {
          display: flex;
          gap: 8px;
        }

        .captcha-display {
          background-color: #2a2a2a;
          border: 1px solid #3a3a3a;
          border-radius: 6px;
          height: 48px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 16px;
          cursor: pointer;
          color: #ffffff;
          font-size: 24px;
          font-weight: bold;
          letter-spacing: 4px;
        }
        .captcha-display:hover {
          border-color: #39FF14;
        }

        .refresh-captcha {
          display: flex;
          align-items: center;
          gap: 8px;
          color: #39FF14;
          font-size: 14px;
        }
        .refresh-captcha i {
          font-size: 16px;
        }
        .refresh-text {
          font-weight: 500;
        }

        .signup-button {
          background-color: #39FF14;
          color: #000000;
          font-weight: bold;
          height: 50px;
          width: 100%;
          border: none;
          border-radius: 6px;
          font-size: 16px;
          cursor: pointer;
          margin: 24px 0 16px;
          transition: background-color 0.2s;
        }
        .signup-button:hover {
          background-color: #2ecc10;
        }
        .signup-button:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .login-link {
          text-align: right;
        }
        .login-link a {
          color: #39FF14;
          text-decoration: none;
          font-size: 14px;
        }
        .login-link a:hover {
          text-decoration: underline;
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
      `}</style>
    </div>
  );
}

export default Signup;