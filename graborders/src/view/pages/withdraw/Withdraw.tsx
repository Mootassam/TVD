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
import actions from "src/modules/transaction/form/transactionFormActions";
import authActions from "src/modules/auth/authActions";

// Custom Modal Component (dark theme)
const CustomModal = ({ visible, title, onClose, children }) => {
  if (!visible) return null;

  return (
    <>
      <style>{`
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: rgba(0, 0, 0, 0.8);
          backdrop-filter: blur(4px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 9999;
          animation: fadeIn 0.3s ease;
        }
        .modal-container {
          background-color: #1c1c1c;
          border-radius: 16px;
          width: 90%;
          max-width: 400px;
          max-height: 90vh;
          overflow-y: auto;
          border: 1px solid #3a3a3a;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
          animation: slideIn 0.3s ease;
        }
        .modal-header {
          padding: 16px 20px;
          border-bottom: 1px solid #2a2a2a;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .modal-header h3 {
          margin: 0;
          color: #ffffff;
          font-size: 18px;
          font-weight: 600;
        }
        .modal-close {
          background: none;
          border: none;
          font-size: 24px;
          cursor: pointer;
          color: #777777;
          transition: color 0.2s;
        }
        .modal-close:hover {
          color: #39FF14;
        }
        .modal-body {
          padding: 20px;
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideIn {
          from {
            transform: translateY(-50px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
      `}</style>
      
      <div className="modal-overlay" onClick={onClose}>
        <div className="modal-container" onClick={(e) => e.stopPropagation()}>
          <div className="modal-header">
            <h3>{title}</h3>
            <button className="modal-close" onClick={onClose}>&times;</button>
          </div>
          <div className="modal-body">
            {children}
          </div>
        </div>
      </div>
    </>
  );
};

// Validation schema
const schema = yup.object().shape({
  amount: yupFormSchemas.integer(i18n("entities.transaction.fields.amount"), {
    required: true,
    min: 20,
  }),
  withdrawPassword: yupFormSchemas.string(
    i18n("user.fields.withdrawPassword"),
    { required: true }
  ),
  withdrawalMethod: yup.string().required(i18n("pages.withdraw.validation.selectMethod")),
});

function Withdraw() {
  const currentUser = useSelector(authSelectors.selectCurrentUser);
  const dispatch = useDispatch();
  
  const [showBankModal, setShowBankModal] = useState(false);
  const [showCryptoModal, setShowCryptoModal] = useState(false);

  const refreshItems = useCallback(async () => {
    await dispatch(authActions.doRefreshCurrentUser());
  }, [dispatch]);

  const hasCompleteBankDetails = useCallback(() => {
    if (!currentUser) return false;
    return (
      currentUser.accountHolder?.trim() &&
      currentUser.ibanNumber?.trim() &&
      currentUser.bankName?.trim() &&
      currentUser.ifscCode?.trim()
    );
  }, [currentUser]);

  const hasCompleteCryptoDetails = useCallback(() => {
    if (!currentUser) return false;
    return (
      currentUser.trc20?.trim() &&
      currentUser.walletname?.trim() &&
      currentUser.usernamewallet?.trim() &&
      currentUser.preferredcoin?.trim()
    );
  }, [currentUser]);

  const getMissingBankFields = useCallback(() => {
    const missing = [];
    if (!currentUser?.accountHolder) missing.push(i18n("entities.transaction.fields.accountHolder"));
    if (!currentUser?.ibanNumber) missing.push(i18n("entities.transaction.fields.ibanNumber"));
    if (!currentUser?.bankName) missing.push(i18n("entities.transaction.fields.bankName"));
    if (!currentUser?.ifscCode) missing.push(i18n("entities.transaction.fields.ifscCode"));
    return missing;
  }, [currentUser]);

  const getMissingCryptoFields = useCallback(() => {
    const missing = [];
    if (!currentUser?.trc20) missing.push(i18n("user.fields.trc20"));
    if (!currentUser?.walletname) missing.push(i18n("pages.wallet.walletName"));
    if (!currentUser?.usernamewallet) missing.push(i18n("pages.wallet.username"));
    if (!currentUser?.preferredcoin) missing.push(i18n("pages.wallet.choosePreferredCoin"));
    return missing;
  }, [currentUser]);

  const onSubmit = async ({ amount, withdrawPassword, withdrawalMethod }) => {
    if (withdrawalMethod === "bank" && !hasCompleteBankDetails()) {
      setShowBankModal(true);
      return;
    }
    if (withdrawalMethod === "crypto" && !hasCompleteCryptoDetails()) {
      setShowCryptoModal(true);
      return;
    }

    const values = {
      status: "pending",
      date: new Date(),
      user: currentUser ? currentUser.id : null,
      type: "withdraw",
      amount,
      vip: currentUser,
      withdrawPassword,
      withdrawalMethod,
    };
    
    await dispatch(actions.doCreate(values));
    await refreshItems();
  };

  const form = useForm({
    resolver: yupResolver(schema),
    mode: "onSubmit",
    defaultValues: { amount: "", withdrawalMethod: "" },
  });

  return (
    <div className="withdraw-container">
      {/* Header Section – matches Profile */}
      <div className="header">
        <div className="nav-bar">
          <Link to="/wallets" className="back-arrow">
            <i className="fas fa-arrow-left" />
          </Link>
          <div className="page-title">{i18n('pages.withdraw.title')}</div>
        </div>
      </div>

      {/* Content Card */}
      <div className="content-card">
        <FormProvider {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            {/* Available Balance */}
            <div className="balance-info">
              <i className="fas fa-wallet" style={{ marginRight: '8px' }}></i>
              {i18n('pages.withdraw.availableBalance')} : ${currentUser?.balance?.toFixed(2) || 0}
            </div>

            {/* Amount Field */}
            <div className="form-group">
              <label className="input-label">
                <span className="required-star">*</span>
                {i18n('pages.withdraw.withdrawAmount')}
              </label>
              <InputFormItem
                type="number"
                name="amount"
                placeholder={i18n('pages.withdraw.amountPlaceholder')}
                className="withdraw-input"
              />
            </div>

            {/* Withdrawal Method Selection */}
            <div className="form-group">
              <label className="input-label">
                <span className="required-star">*</span>
                {i18n('pages.withdraw.selectMethod')}
              </label>
              
              <div className="method-selection">
                {/* Crypto Option */}
                <div 
                  className={`method-card ${form.watch('withdrawalMethod') === 'crypto' ? 'selected' : ''}`}
                  onClick={() => form.setValue('withdrawalMethod', 'crypto', { shouldValidate: true })}
                >
                  <i className="fab fa-bitcoin method-icon"></i>
                  <div className="method-label">{i18n('pages.withdraw.methods.crypto')}</div>
                  <div className={`method-status ${hasCompleteCryptoDetails() ? 'complete' : 'incomplete'}`}>
                    {hasCompleteCryptoDetails() ? i18n('pages.withdraw.status.complete') : i18n('pages.withdraw.status.incomplete')}
                  </div>
                  <div className="method-network-hint">{i18n('pages.withdraw.methods.cryptoNetworks')}</div>
                </div>

                {/* Bank Option */}
                <div 
                  className={`method-card ${form.watch('withdrawalMethod') === 'bank' ? 'selected' : ''}`}
                  onClick={() => form.setValue('withdrawalMethod', 'bank', { shouldValidate: true })}
                >
                  <i className="fas fa-university method-icon"></i>
                  <div className="method-label">{i18n('pages.withdraw.methods.bank')}</div>
                  <div className={`method-status ${hasCompleteBankDetails() ? 'complete' : 'incomplete'}`}>
                    {hasCompleteBankDetails() ? i18n('pages.withdraw.status.complete') : i18n('pages.withdraw.status.incomplete')}
                  </div>
                  <div className="method-network-hint">{i18n('pages.withdraw.methods.bankNetworks')}</div>
                </div>
              </div>
              
              <input type="hidden" {...form.register('withdrawalMethod')} />
              {form.formState.errors.withdrawalMethod && (
                <div className="error-message">
                  <i className="fas fa-exclamation-circle"></i>
                  {form.formState.errors.withdrawalMethod.message}
                </div>
              )}
            </div>

            {/* Selected Method Preview */}
            {form.watch('withdrawalMethod') === 'crypto' && hasCompleteCryptoDetails() && (
              <div className="preview-box">
                <i className="fab fa-bitcoin"></i>
                <strong>{i18n('pages.withdraw.withdrawingTo')}</strong><br/>
                <span className="preview-detail">
                  {currentUser?.preferredcoin?.toUpperCase()}: {currentUser?.trc20?.substring(0, 12)}...
                </span>
              </div>
            )}
            {form.watch('withdrawalMethod') === 'bank' && hasCompleteBankDetails() && (
              <div className="preview-box">
                <i className="fas fa-university"></i>
                <strong>{i18n('pages.withdraw.withdrawingTo')}</strong><br/>
                <span className="preview-detail">
                  {currentUser?.bankName} - {currentUser?.accountHolder}
                </span>
              </div>
            )}

            {/* Withdraw Password Field */}
            <div className="form-group">
              <label className="input-label">
                <span className="required-star">*</span>
                {i18n('pages.withdraw.withdrawPassword')}
              </label>
              <InputFormItem
                type="password"
                name="withdrawPassword"
                placeholder={i18n('pages.withdraw.withdrawPasswordPlaceholder')}
                className="withdraw-input"
              />
            </div>

            {/* Announcement */}
            <div className="announcement-container">
              <i className="fas fa-volume-high speaker"></i>
              <div className="announcement-text">
                {i18n('pages.withdraw.announcement')}
              </div>
            </div>

            {/* Submit Button */}
            <button className="withdraw-button" type="submit">
              <i className="fas fa-check"></i>
              {i18n('pages.withdraw.confirm')}
            </button>

            {/* Help text for incomplete profiles */}
            {(!hasCompleteBankDetails() || !hasCompleteCryptoDetails()) && (
              <div className="tip-box">
                <i className="fas fa-info-circle"></i>
                <span>
                  {i18n('pages.withdraw.completeDetailsIn')}{' '}
                  <Link to="/bind-account" className="tip-link">
                    {i18n('pages.bindAccount.title')}
                  </Link> 
                  {i18n('pages.withdraw.enableAllOptions')}
                </span>
              </div>
            )}
          </form>
        </FormProvider>
      </div>

      {/* Bank Details Modal */}
      <CustomModal
        visible={showBankModal}
        title={i18n('pages.withdraw.bankModal.title')}
        onClose={() => setShowBankModal(false)}
      >
        <div className="modal-content-centered">
          <i className="fas fa-exclamation-circle modal-warning-icon"></i>
          <h3 className="modal-subtitle">{i18n('pages.withdraw.bankModal.required')}</h3>
          <p className="modal-description">{i18n('pages.withdraw.bankModal.description')}</p>
          <ul className="missing-fields-list">
            {getMissingBankFields().map((field, index) => (
              <li key={index}><i className="fas fa-times"></i> {field}</li>
            ))}
          </ul>
          <div className="modal-actions">
            <button className="modal-cancel-btn" onClick={() => setShowBankModal(false)}>
              {i18n('common.cancel')}
            </button>
            <Link to="/bind-account" className="modal-action-link">
              <button className="modal-action-btn">
                {i18n('pages.withdraw.goToBindAccount')}
              </button>
            </Link>
          </div>
        </div>
      </CustomModal>

      {/* Crypto Details Modal */}
      <CustomModal
        visible={showCryptoModal}
        title={i18n('pages.withdraw.cryptoModal.title')}
        onClose={() => setShowCryptoModal(false)}
      >
        <div className="modal-content-centered">
          <i className="fas fa-exclamation-circle modal-warning-icon"></i>
          <h3 className="modal-subtitle">{i18n('pages.withdraw.cryptoModal.required')}</h3>
          <p className="modal-description">{i18n('pages.withdraw.cryptoModal.description')}</p>
          <ul className="missing-fields-list">
            {getMissingCryptoFields().map((field, index) => (
              <li key={index}><i className="fas fa-times"></i> {field}</li>
            ))}
          </ul>
          <div className="modal-actions">
            <button className="modal-cancel-btn" onClick={() => setShowCryptoModal(false)}>
              {i18n('common.cancel')}
            </button>
            <Link to="/bind-account" className="modal-action-link">
              <button className="modal-action-btn">
                {i18n('pages.withdraw.goToBindAccount')}
              </button>
            </Link>
          </div>
        </div>
      </CustomModal>

      <style>{`
        /* Withdraw Container – matches Profile container */
        .withdraw-container {
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

        /* Form elements */
        .form-group {
          margin-bottom: 20px;
        }
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
        .withdraw-input {
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
        .withdraw-input:focus {
          border-color: #39FF14;
        }
        .withdraw-input::placeholder {
          color: #777777;
        }

        /* Balance info */
        .balance-info {
          background-color: #2a2a2a;
          border-left: 4px solid #39FF14;
          border-radius: 8px;
          padding: 16px;
          margin-bottom: 24px;
          font-size: 16px;
          font-weight: 600;
          color: #ffffff;
        }
        .balance-info i {
          color: #39FF14;
        }

        /* Method selection cards */
        .method-selection {
          display: flex;
          gap: 12px;
          margin: 8px 0 12px;
        }
        .method-card {
          flex: 1;
          background-color: #2a2a2a;
          border: 1px solid #3a3a3a;
          border-radius: 12px;
          padding: 16px 8px;
          text-align: center;
          cursor: pointer;
          transition: all 0.2s;
        }
        .method-card.selected {
          border-color: #39FF14;
          background-color: rgba(57, 255, 20, 0.05);
          transform: translateY(-2px);
        }
        .method-card:hover {
          border-color: #39FF14;
        }
        .method-icon {
          font-size: 28px;
          color: #39FF14;
          margin-bottom: 8px;
        }
        .method-label {
          font-weight: 600;
          color: #ffffff;
          margin-bottom: 6px;
          font-size: 14px;
        }
        .method-status {
          font-size: 12px;
          padding: 4px 8px;
          border-radius: 20px;
          display: inline-block;
          margin-bottom: 6px;
        }
        .method-status.complete {
          color: #39FF14;
          background-color: rgba(57, 255, 20, 0.1);
        }
        .method-status.incomplete {
          color: #ffaa00;
          background-color: rgba(255, 170, 0, 0.1);
        }
        .method-network-hint {
          font-size: 10px;
          color: #777777;
        }

        /* Preview box */
        .preview-box {
          background-color: #2a2a2a;
          border: 1px solid #39FF14;
          border-radius: 8px;
          padding: 12px;
          margin-bottom: 20px;
          font-size: 13px;
        }
        .preview-box i {
          color: #39FF14;
          margin-right: 8px;
        }
        .preview-detail {
          color: #bbbbbb;
          font-size: 12px;
        }

        /* Error message */
        .error-message {
          color: #ff6b6b;
          font-size: 12px;
          margin-top: 4px;
          display: flex;
          align-items: center;
          gap: 4px;
        }

        /* Announcement */
        .announcement-container {
          display: flex;
          align-items: center;
          gap: 12px;
          margin: 20px 0;
          padding: 16px;
          background-color: #2a2a2a;
          border-radius: 8px;
          border-left: 4px solid #39FF14;
        }
        .speaker {
          font-size: 20px;
          color: #39FF14;
        }
        .announcement-text {
          font-size: 13px;
          color: #bbbbbb;
          line-height: 1.5;
        }

        /* Submit button */
        .withdraw-button {
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
          gap: 8px;
          margin-top: 20px;
        }
        .withdraw-button:hover {
          background-color: #2ecc10;
        }
        .withdraw-button:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        /* Tip box */
        .tip-box {
          margin-top: 20px;
          padding: 12px;
          background-color: rgba(57, 255, 20, 0.1);
          border: 1px solid #39FF14;
          border-radius: 8px;
          font-size: 13px;
          color: #bbbbbb;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .tip-box i {
          color: #39FF14;
          font-size: 16px;
        }
        .tip-link {
          color: #39FF14;
          text-decoration: none;
          font-weight: 500;
        }
        .tip-link:hover {
          text-decoration: underline;
        }

        /* Modal content */
        .modal-content-centered {
          text-align: center;
        }
        .modal-warning-icon {
          font-size: 48px;
          color: #ffaa00;
          margin-bottom: 16px;
        }
        .modal-subtitle {
          color: #ffffff;
          margin-bottom: 12px;
          font-size: 18px;
        }
        .modal-description {
          color: #bbbbbb;
          margin-bottom: 20px;
          font-size: 14px;
        }
        .missing-fields-list {
          text-align: left;
          margin-bottom: 24px;
          color: #bbbbbb;
          list-style: none;
          padding: 0;
        }
        .missing-fields-list li {
          margin-bottom: 8px;
          padding: 8px 12px;
          background-color: #2a2a2a;
          border-radius: 6px;
          font-size: 13px;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .missing-fields-list i {
          color: #ff6b6b;
          font-size: 14px;
        }
        .modal-actions {
          display: flex;
          gap: 12px;
          justify-content: center;
        }
        .modal-cancel-btn {
          flex: 1;
          background-color: #2a2a2a;
          border: 1px solid #3a3a3a;
          color: #ffffff;
          padding: 10px;
          border-radius: 6px;
          font-size: 14px;
          cursor: pointer;
          transition: all 0.2s;
        }
        .modal-cancel-btn:hover {
          border-color: #39FF14;
        }
        .modal-action-link {
          flex: 1;
          text-decoration: none;
        }
        .modal-action-btn {
          width: 100%;
          background-color: #39FF14;
          border: none;
          color: #000000;
          padding: 10px;
          border-radius: 6px;
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
          transition: background-color 0.2s;
        }
        .modal-action-btn:hover {
          background-color: #2ecc10;
        }

        /* Responsive */
        @media (max-width: 380px) {
          .content-card {
            padding: 16px;
          }
          .method-card {
            padding: 12px 4px;
          }
          .method-icon {
            font-size: 24px;
          }
          .method-label {
            font-size: 13px;
          }
        }
      `}</style>
    </div>
  );
}

export default Withdraw;