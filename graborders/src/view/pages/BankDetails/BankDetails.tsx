import React, { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { i18n } from "../../../i18n";
import authSelectors from "src/modules/auth/authSelectors";
import yupFormSchemas from "src/modules/shared/yup/yupFormSchemas";
import InputFormItem from "src/shared/form/InputFormItem";
import actions from "src/modules/user/form/userFormActions";
import authActions from "src/modules/auth/authActions";

const schema = yup.object().shape({
  accountHolder: yupFormSchemas.string(i18n("entities.transaction.fields.accountHolder"), {
    required: true,
  }),
  ibanNumber: yupFormSchemas.string(i18n("entities.transaction.fields.ibanNumber"), {
    required: true,
  }),
  bankName: yupFormSchemas.string(i18n("entities.transaction.fields.bankName"), {
    required: true,
  }),
  ifscCode: yupFormSchemas.string(i18n("entities.transaction.fields.ifscCode"), {
    required: true,
  })
});

function BankDetails() {
  const currentUser = useSelector(authSelectors.selectCurrentUser);
  const dispatch = useDispatch();

  const refreshItems = useCallback(async () => {
    await dispatch(authActions.doRefreshCurrentUser());
  }, [dispatch]);

  const onSubmit = async ({ accountHolder, ibanNumber, bankName, ifscCode }) => {
    const values = {
      accountHolder,
      ibanNumber,
      bankName,
      ifscCode,
    };
    // Uncomment when action is ready
    await dispatch(actions.doUpdateBank(values));
    await refreshItems();
  };

  const initialValues = {
    accountHolder: currentUser?.accountHolder || "",
    ibanNumber: currentUser?.ibanNumber || "",
    bankName: currentUser?.bankName || "",
    ifscCode: currentUser?.ifscCode || "",
  };

  const form = useForm({
    resolver: yupResolver(schema),
    mode: "onSubmit",
    defaultValues: initialValues,
  });

  return (
    <div className="bank-details-container">
      {/* Header Section – matches Profile */}
      <div className="header">
        <div className="nav-bar">
          <Link to="/profile" className="back-arrow">
            <i className="fas fa-arrow-left" />
          </Link>
          <div className="page-title">{i18n('pages.bankDetails.title')}</div>
        </div>
      </div>

      {/* Content Card */}
      <div className="content-card">
        <FormProvider {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            {/* Account Holder */}
            <div className="form-group">
              <label className="input-label">
                <span className="required-star">*</span>
                {i18n('entities.transaction.fields.accountHolder')}
              </label>
              <InputFormItem
                type="text"
                name="accountHolder"
                placeholder={i18n("entities.transaction.fields.accountHolder")}
                className="bank-input"
              />
            </div>

            {/* IBAN Number */}
            <div className="form-group">
              <label className="input-label">
                <span className="required-star">*</span>
                {i18n('entities.transaction.fields.ibanNumber')}
              </label>
              <InputFormItem
                type="text"
                name="ibanNumber"
                placeholder={i18n("entities.transaction.fields.ibanNumber")}
                className="bank-input"
              />
            </div>

            {/* Bank Name */}
            <div className="form-group">
              <label className="input-label">
                <span className="required-star">*</span>
                {i18n('entities.transaction.fields.bankName')}
              </label>
              <InputFormItem
                type="text"
                name="bankName"
                placeholder={i18n("entities.transaction.fields.bankName")}
                className="bank-input"
              />
            </div>

            {/* IFSC Code */}
            <div className="form-group">
              <label className="input-label">
                <span className="required-star">*</span>
                {i18n('entities.transaction.fields.ifscCode')}
              </label>
              <InputFormItem
                type="text"
                name="ifscCode"
                placeholder={i18n("entities.transaction.fields.ifscCode")}
                className="bank-input"
              />
            </div>

            {/* Submit Button */}
            <button type="submit" className="bank-button">
              <i className="fas fa-check" style={{ marginRight: '8px' }}></i>
              {i18n('pages.withdraw.confirm')}
            </button>
          </form>
        </FormProvider>
      </div>

      <style>{`
        /* Bank Details Container – matches Profile */
        .bank-details-container {
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
          border-top: 2px solid #39FF14;
        }

        /* Form Group */
        .form-group {
          margin-bottom: 20px;
        }

        /* Input Label */
        .input-label {
          display: flex;
          align-items: center;
          gap: 4px;
          font-size: 14px;
          font-weight: 500;
          color: #bbbbbb;
          margin-bottom: 6px;
        }
        .required-star {
          color: #39FF14;
          font-size: 16px;
          margin-right: 2px;
        }

        /* Input Field (applied to InputFormItem) */
        .bank-input {
          background-color: #2a2a2a;
          border: 1px solid #3a3a3a;
          border-radius: 8px;
          padding: 12px;
          color: #ffffff;
          font-size: 16px;
          width: 100%;
          outline: none;
          transition: border-color 0.2s;
        }
        .bank-input:focus {
          border-color: #39FF14;
        }
        .bank-input::placeholder {
          color: #777777;
        }

        /* Submit Button */
        .bank-button {
          background-color: #39FF14;
          color: #000000;
          font-weight: bold;
          height: 48px;
          width: 100%;
          border: none;
          border-radius: 8px;
          font-size: 16px;
          cursor: pointer;
          transition: background-color 0.2s;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-top: 24px;
        }
        .bank-button:hover {
          background-color: #2ecc10;
        }
        .bank-button:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        /* Responsive */
        @media (max-width: 380px) {
          .content-card {
            padding: 20px 16px;
          }
          .bank-input {
            padding: 10px;
            font-size: 15px;
          }
        }
      `}</style>
    </div>
  );
}

export default BankDetails;