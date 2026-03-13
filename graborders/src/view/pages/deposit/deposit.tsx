import React, { useEffect, useMemo, useState, useCallback } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { QRCodeCanvas } from "qrcode.react";
import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";

import method from "src/modules/depositMethod/list/depositMethodListActions";
import selectors from "src/modules/depositMethod/list/depositMethodSelectors";
import depositActions from "src/modules/deposit/form/depositFormActions";
import FieldFormItem from "src/shared/form/FieldFormItem";

// Currency configurations
const CURRENCIES = [
  "USD", "ETH", "BTC", "USDC", "DAI",
  "SHIB", "XRP", "TRX", "SOL", "BNB", "DOGE"
];

// Minimum deposit in USD
const MIN_DEPOSIT_USD = 200;

// Decimal places for each currency
const CURRENCY_DECIMALS = {
  USD: 2,
  ETH: 6,
  BTC: 8,
  USDC: 2,
  DAI: 2,
  SHIB: 0,
  XRP: 2,
  TRX: 2,
  SOL: 4,
  BNB: 6,
  DOGE: 2,
};

interface CurrencyType {
  _id?: string;
  name?: string;
  symbol?: string;
  network?: any[];
  address?: string;
  minDeposit?: number;
  minimumAmount?: number;
  [key: string]: any;
}

// Helper to format numbers consistently - MOVED TO TOP LEVEL
const formatNumberHelper = (value: number, symbol?: string, decimals?: number) => {
  if (typeof value !== "number" || !isFinite(value) || value === 0) {
    return "0";
  }
  
  const decimalPlaces = decimals !== undefined ? decimals : (CURRENCY_DECIMALS[symbol?.toUpperCase()] || 2);
  
  // For very small numbers, show more precision but not scientific notation
  if (value > 0 && value < 0.000001) {
    return value.toFixed(decimalPlaces > 8 ? decimalPlaces : 8);
  }
  
  // For regular numbers
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 0,
    maximumFractionDigits: decimalPlaces,
  }).format(value);
};

// Helper to format USD values - MOVED TO TOP LEVEL
const formatUSDHelper = (value: number) => {
  if (typeof value !== "number" || !isFinite(value) || value === 0) {
    return "$0.00";
  }
  
  // For very small USD values, show more precision
  if (value > 0 && value < 0.01) {
    return `$${value.toFixed(6)}`;
  }
  
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 6,
  }).format(value);
};

function Deposit() {
  const dispatch = useDispatch();
  const params = useParams();
  const symbol = (params?.id || "").toString();

  const listMethod = useSelector(selectors.selectRows);
  const loading = useSelector(selectors.selectLoading);

  const [showToast, setShowToast] = useState(false);
  const [copiedText, setCopiedText] = useState("Address copied");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [exchangeRates, setExchangeRates] = useState<Record<string, number>>({});
  const [loadingRates, setLoadingRates] = useState(false);

  const [currentAddress, setCurrentAddress] = useState("");
  const [currentCurrency, setCurrentCurrency] = useState<CurrencyType | null>(null);
  const [networkOptions, setNetworkOptions] = useState<Array<{ _id: string; name: string; wallet: string; raw: any }>>([]);
  const [selectedNetwork, setSelectedNetwork] = useState<string | null>(null);
  const [minDepositAmount, setMinDepositAmount] = useState(0);
  const [submittedAmount, setSubmittedAmount] = useState("");

  // Fetch exchange rates
  useEffect(() => {
    const fetchExchangeRates = async () => {
      try {
        setLoadingRates(true);
        const response = await axios.get(
          "https://min-api.cryptocompare.com/data/pricemulti",
          {
            params: {
              fsyms: CURRENCIES.join(","),
              tsyms: "USD",
            },
          }
        );
        
        if (response.data && response.data.Response !== "Error") {
          const rates: Record<string, number> = {};
          CURRENCIES.forEach(currency => {
            if (response.data[currency]?.USD) {
              rates[currency] = response.data[currency].USD;
            }
          });
          setExchangeRates(rates);
        }
      } catch (error) {
        console.error("Failed to fetch exchange rates:", error);
      } finally {
        setLoadingRates(false);
      }
    };

    fetchExchangeRates();
    // Refresh rates every 5 minutes
    const interval = setInterval(fetchExchangeRates, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  // Calculate minimum deposit in selected currency
  const minInCurrency = useMemo(() => {
    if (!symbol || !exchangeRates[symbol.toUpperCase()]) return 0;
    const rate = exchangeRates[symbol.toUpperCase()];
    return MIN_DEPOSIT_USD / rate;
  }, [symbol, exchangeRates]);

  // Format minimum amount for display
  const formattedMinAmount = useMemo(() => {
    if (minInCurrency === 0) return "0";
    return formatNumberHelper(minInCurrency, symbol);
  }, [minInCurrency, symbol]);

  // Dynamic validation schema based on minInCurrency - FIXED: Use formattedMinAmount directly
  const schema = useMemo(() => {
    return yup.object().shape({
      amount: yup
        .number()
        .typeError("Amount must be a number")
        .positive("Amount must be positive")
        .required("Amount is required")
        .min(minInCurrency || 0, `Minimum deposit is ${formattedMinAmount} ${symbol}`),
      txid: yup.string().required("Transaction ID is required"),
    });
  }, [minInCurrency, formattedMinAmount, symbol]);

  const formMethods = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
    defaultValues: {
      amount: "",
      txid: "",
    },
  });

  // Memoized version of formatNumber for component use
  const formatNumber = useCallback((value: number, decimals?: number) => {
    return formatNumberHelper(value, symbol, decimals);
  }, [symbol]);

  // Memoized version of formatUSD for component use
  const formatUSD = useCallback((value: number) => {
    return formatUSDHelper(value);
  }, []);

  // Fetch deposit methods on mount
  useEffect(() => {
    dispatch(method.doFetch());
  }, [dispatch]);

  // When listMethod or symbol changes, find currency and setup network options
  useEffect(() => {
    if (!listMethod || !symbol) {
      return;
    }

    // Find currency by symbol (case-insensitive)
    const currency = listMethod.find((item) => {
      if (!item || !item.symbol) return false;
      return item.symbol.toString().toLowerCase() === symbol.toString().toLowerCase();
    });

    if (!currency) {
      // No matching currency found
      setCurrentCurrency(null);
      setNetworkOptions([]);
      setSelectedNetwork(null);
      setCurrentAddress("");
      return;
    }

    setCurrentCurrency(currency);

    // Update min deposit amount
    setMinDepositAmount(minInCurrency);

    // Normalize networks
    if (Array.isArray(currency.network) && currency.network.length > 0) {
      const normalized = currency.network.map((n, idx) => ({
        _id: n._id ?? `${currency._id ?? symbol}-network-${idx}`,
        name: n.name ?? n.network ?? `${currency.name ?? symbol} Network`,
        wallet: n.wallet ?? n.address ?? n.depositAddress ?? "",
        raw: n,
      }));
      setNetworkOptions(normalized);

      // default to first network's id (or keep the current selectedNetwork if it exists in normalized)
      const defaultNet = normalized.find(n => n._id === selectedNetwork) || normalized[0];
      setSelectedNetwork(defaultNet._id);
      setCurrentAddress(defaultNet.wallet || "");
    } else if (currency.address) {
      // Currency has a direct address (no separate networks)
      const single = {
        _id: currency._id ?? `${symbol}-single`,
        name: `${currency.name ?? symbol} Network`,
        wallet: currency.address,
        raw: null,
      };
      setNetworkOptions([single]);
      setSelectedNetwork(single._id);
      setCurrentAddress(single.wallet || "");
    } else {
      // No networks and no direct address
      setNetworkOptions([]);
      setSelectedNetwork(null);
      setCurrentAddress("");
    }
  }, [listMethod, symbol, minInCurrency]);

  // Update currentAddress when selectedNetwork changes
  useEffect(() => {
    if (!selectedNetwork) {
      return;
    }
    const found = networkOptions.find((n) => n._id === selectedNetwork);
    if (found) {
      setCurrentAddress(found.wallet || "");
    }
  }, [selectedNetwork, networkOptions]);

  // Copy address to clipboard with feedback
  const copyAddressToClipboard = useCallback(async () => {
    if (!currentAddress) {
      console.error("No address to copy");
      return;
    }
    try {
      await navigator.clipboard.writeText(currentAddress);
      setCopiedText("Address copied");
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    } catch (err) {
      console.error("Failed to copy address: ", err);
      setCopiedText("Failed to copy address");
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    }
  }, [currentAddress]);

  // Save QR code as PNG
  const saveQRCode = useCallback(() => {
    const canvas = document.querySelector(".qr-box canvas");
    if (!(canvas instanceof HTMLCanvasElement)) {
      console.error("QR canvas not found");
      setCopiedText("Unable to save QR");
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
      return;
    }
    try {
      const link = document.createElement("a");
      const networkNameSafe = (networkOptions.find(n => n._id === selectedNetwork)?.name || "deposit").replace(/\s+/g, "-");
      link.download = `${symbol}-${networkNameSafe}-address.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();
      setCopiedText("QR code saved");
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    } catch (err) {
      console.error("Failed to save QR code", err);
      setCopiedText("Unable to save QR");
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    }
  }, [networkOptions, selectedNetwork, symbol]);

  // Handle network selection change
  const handleNetworkSelect = useCallback((event) => {
    const networkId = event.target.value;
    setSelectedNetwork(networkId);
    // clear amount to avoid mismatched validation if min changes
    formMethods.setValue("amount", "");
    formMethods.clearErrors("amount");
  }, [formMethods]);

  // Handle form submit
  const onSubmit = useCallback(async (data) => {
    if (!selectedNetwork || !currentCurrency || !currentAddress) {
      console.error("Missing required information");
      return;
    }

    setIsSubmitting(true);
    try {
      const now = new Date();
      const year = now.getFullYear();
      const month = String(now.getMonth() + 1).padStart(2, "0");
      const day = String(now.getDate()).padStart(2, "0");
      const randomDigits = Math.floor(Math.random() * 10000000).toString().padStart(7, "0");
      const orderno = `RE${year}${month}${day}${randomDigits}`;
      const depositData = {
        orderno,
        amount: data.amount,
        txid: data.txid,
        rechargechannel: symbol,
        status: "pending",
        network: selectedNetwork,
        rechargetime: now.toISOString()
      };

      setSubmittedAmount(data.amount);

      await dispatch(depositActions.doCreate(depositData));

      setShowSuccessModal(true);
      formMethods.reset();
    } catch (error) {
      console.error("Deposit submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  }, [selectedNetwork, currentCurrency, currentAddress, symbol, dispatch, formMethods]);

  const handleCloseModal = useCallback(() => {
    setShowSuccessModal(false);
    setSubmittedAmount("");
  }, []);

  // Get currency icon URL
  const getCurrencyIcon = useCallback((sym: string) => {
    const cleanSymbol = sym ? sym.toUpperCase() : "";
    return `https://images.weserv.nl/?url=https://bin.bnbstatic.com/static/assets/logos/${cleanSymbol}.png`;
  }, []);

  // Calculate USD value of entered amount
  const enteredAmount = formMethods.watch("amount");
  const enteredAmountUSD = useMemo(() => {
    if (!enteredAmount || !exchangeRates[symbol?.toUpperCase()]) return 0;
    const amountNum = Number(enteredAmount);
    if (isNaN(amountNum) || !isFinite(amountNum)) return 0;
    return amountNum * exchangeRates[symbol.toUpperCase()];
  }, [enteredAmount, symbol, exchangeRates]);

  return (
    <div className="deposit-container">
      {/* Header */}
      <div className="header">
        <div className="nav-bar">
          <Link to="/deposit" className="back-arrow" aria-label="Back to deposits">
            <i className="fas fa-arrow-left" />
          </Link>
          <div className="page-title">Deposit {symbol || "..."}</div>
        </div>
      </div>

      {/* Content */}
      <div className="content-card">
        <div className="deposit-content">
          {/* Minimum deposit requirement */}

          {/* Currency display */}
          <div className="section">
            <div className="section-label">Deposit currency</div>
            <div className="currency-display">
              <div className="currency-icon" aria-hidden>
                <img
                  src={getCurrencyIcon(symbol)}
                  alt={symbol}
                  onError={(e) => {
                    const img = e.target as HTMLImageElement;
                    img.onerror = null;
                    img.style.display = "none";
                    const parent = img.parentElement;
                    if (parent) {
                      parent.textContent = (symbol && symbol.charAt(0)) || "C";
                      parent.style.background = "#f0f0f0";
                      parent.style.color = "#333";
                      parent.style.fontSize = "14px";
                      parent.style.fontWeight = "bold";
                      parent.style.display = "inline-flex";
                      parent.style.alignItems = "center";
                      parent.style.justifyContent = "center";
                      parent.style.width = "32px";
                      parent.style.height = "32px";
                      parent.style.borderRadius = "50%";
                    }
                  }}
                />
              </div>
              <div className="currency-details">
                <div className="currency-name">{currentCurrency?.name || symbol}</div>
                {exchangeRates[symbol?.toUpperCase()] && (
                  <div className="currency-rate">
                    1 {symbol} ≈ {formatUSD(exchangeRates[symbol.toUpperCase()])}
                  </div>
                )}
              </div>
            </div>
            <div className="section-note">Fixed currency - cannot be changed</div>
          </div>

          {/* Network select */}
          {networkOptions.length > 0 && (
            <div className="section">
              <div className="section-label">Deposit network</div>
              <div className="network-select-wrapper">
                <select
                  className="network-select"
                  value={selectedNetwork || ""}
                  onChange={handleNetworkSelect}
                  aria-label="Select deposit network"
                >
                  {networkOptions.map((network) => (
                    <option key={network._id} value={network._id}>
                      {network.name}
                    </option>
                  ))}
                </select>
                <div className="select-arrow">
                  <i className="fas fa-chevron-down" />
                </div>
              </div>
            </div>
          )}

          {/* QR code & address */}
          {currentAddress && (
            <div className="qr-section">
              <div className="section-label">Save QR code</div>
              <div className="qr-container">
                <div className="qr-box" aria-hidden>
                  <QRCodeCanvas
                    value={currentAddress}
                    size={180}
                    bgColor="#ffffff"
                    fgColor="#000000"
                    level="H"
                    includeMargin={true}
                  />
                </div>

                <div className="address-section">
                  <div className="address-label">Wallet Address</div>
                  <div className="address-text" id="walletAddress">
                    {currentAddress}
                  </div>
                  <div className="address-actions">
                    <button
                      type="button"
                      className="action-btn copy-btn"
                      onClick={copyAddressToClipboard}
                      aria-label="Copy address"
                    >
                      <i className="fas fa-copy" /> Copy Address
                    </button>
                    <button
                      type="button"
                      className="action-btn save-btn"
                      onClick={saveQRCode}
                      aria-label="Save QR code"
                    >
                      <i className="fas fa-download" /> Save QR Code
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Deposit form */}
          {currentAddress && (
            <FormProvider {...formMethods}>
              <form onSubmit={formMethods.handleSubmit(onSubmit)} className="deposit-form">
                <div className="section">
                  <div className="form-group">
                    <div className="input-with-usd">
                      <FieldFormItem
                        name="amount"
                        label={`Amount (${symbol})`}
                        placeholder={`Minimum: ${formattedMinAmount} ${symbol}`}
                        className="withdraw-input"
                      />
                      {enteredAmountUSD > 0 && (
                        <div className="usd-value-display">
                          ≈ {formatUSD(enteredAmountUSD)}
                        </div>
                      )}
                    </div>
                    <div className="min-amount-note">
                      Minimum deposit: {formattedMinAmount} {symbol} ({formatUSD(MIN_DEPOSIT_USD)})
                    </div>
                  </div>
                </div>

                <div className="section">
                  <div className="form-group">
                    <FieldFormItem
                      name="txid"
                      label="Transaction ID"
                      placeholder="Enter your transaction ID"
                      className="withdraw-input"
                    />
                  </div>
                </div>

                <div className="form-actions">
                  <button
                    type="submit"
                    className="submit-btn"
                    disabled={!formMethods.formState.isValid || isSubmitting || loadingRates}
                    aria-disabled={!formMethods.formState.isValid || isSubmitting || loadingRates}
                  >
                    {isSubmitting ? (
                      <>
                        <i className="fas fa-spinner fa-spin" /> Processing...
                      </>
                    ) : loadingRates ? (
                      <>
                        <i className="fas fa-spinner fa-spin" /> Loading rates...
                      </>
                    ) : (
                      "Confirm Deposit"
                    )}
                  </button>
                </div>
              </form>
            </FormProvider>
          )}

          {/* Loading */}
          {loading && (
            <div className="loading-section" role="status" aria-live="polite">
              <div className="spinner" />
              <div>Loading deposit information...</div>
            </div>
          )}

          {/* No address found */}
          {!loading && !currentAddress && symbol && (
            <div className="error-section" role="alert">
              <i className="fas fa-exclamation-triangle" />
              <div>No deposit address found for {symbol}</div>
              <div className="error-note">Please contact support or try another currency.</div>
            </div>
          )}

          {/* Hint Section */}
          <div className="hint-section">
            <div className="hint-title">Important Notes</div>
            <div className="hint-content">
              <div className="hint-item">
                1. Send only {symbol} to this deposit address. Sending other currencies may result in permanent loss.
              </div>
              <div className="hint-item">2. Ensure you are using the correct network ({networkOptions.find(n => n._id === selectedNetwork)?.name}).</div>
              <div className="hint-item">
                3. Minimum deposit amount: {formattedMinAmount} {symbol} (${MIN_DEPOSIT_USD} USD equivalent)
              </div>
              <div className="hint-item">4. Transactions typically require 1-3 network confirmations before being credited to your account.</div>
              <div className="hint-item">5. Always double-check the address before sending funds.</div>
            </div>
          </div>
        </div>
      </div>

      {/* Toast */}
      <div className={`toast ${showToast ? "visible" : ""}`} role="status" aria-live="polite">
        <i className="fas fa-check-circle toast-icon" />
        {copiedText}
      </div>

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="modal-overlay" role="dialog" aria-modal="true">
          <div className="modal-content">
            <div className="modal-header">
              <h3>Deposit Submitted Successfully</h3>
              <button className="modal-close" onClick={handleCloseModal} aria-label="Close">
                <i className="fas fa-times" />
              </button>
            </div>
            <div className="modal-body">
              <div className="success-icon"><i className="fas fa-check-circle" /></div>
              <div className="success-message">
                Your deposit of {submittedAmount} {symbol} has been submitted for processing.
              </div>
              <div className="success-details">
                <p>Please wait for network confirmations. This usually takes 5-30 minutes.</p>
                <p>You can track the status in your transaction history.</p>
              </div>
            </div>
            <div className="modal-footer">
              <button className="modal-btn" onClick={handleCloseModal}>OK</button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        /* Deposit Container – matches profile/wallet theme */
        .deposit-container {
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
          flex: 1;
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

        /* Deposit Content */
        .deposit-content {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        /* Info Box (minimum deposit) */
        .info-box {
          background-color: #2a2a2a;
          border-radius: 8px;
          padding: 12px 16px;
          border: 1px solid #3a3a3a;
        }
        .info-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 14px;
        }
        .info-label {
          color: #aaaaaa;
        }
        .info-value {
          color: #39FF14;
          font-weight: 600;
        }
        .rate-loading {
          font-size: 12px;
          color: #aaaaaa;
          margin-top: 8px;
        }
        .rate-loading i {
          margin-right: 4px;
        }

        /* Section */
        .section {
          margin-bottom: 8px;
        }
        .section-label {
          font-size: 14px;
          font-weight: 500;
          color: #ffffff;
          margin-bottom: 8px;
        }
        .section-note {
          font-size: 12px;
          color: #777777;
          margin-top: 4px;
        }

        /* Currency Display - updated for consistent height */
        .currency-display {
          display: flex;
          align-items: center;
          gap: 12px;
          background-color: #2a2a2a;
          border-radius: 8px;
          padding: 8px 12px;
          border: 1px solid #3a3a3a;
          min-height: 46px;
          box-sizing: border-box;
        }

        /* Icon container - smaller and consistent */
        .currency-icon {
          height: 25px;
          border-radius: 50%;
          background-color: #1c1c1c;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 1px solid #39FF14;
          overflow: hidden;
          flex-shrink: 0;
        }

        /* Fallback text inside icon */
        .currency-icon:empty::before,
        .currency-icon span {
          font-size: 14px;
          font-weight: bold;
          color: #39FF14;
        }

        .currency-icon img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .currency-details {
          flex: 1;
        }
        .currency-name {
          font-size: 16px;
          font-weight: 600;
          color: #ffffff;
        }
        .currency-rate {
          font-size: 12px;
          color: #aaaaaa;
          margin-top: 2px;
        }

        /* Network Select - updated for consistent height */
        .network-select-wrapper {
          position: relative;
          height: 46px;
        }

        .network-select {
          width: 100%;
          padding: 12px 16px;
          background-color: #2a2a2a;
          border: 1px solid #3a3a3a;
          border-radius: 6px;
          color: #ffffff;
          font-size: 14px;
          appearance: none;
          cursor: pointer;
          line-height: 1.2;
          height: 46px;
        }

        .network-select:focus {
          outline: none;
          border-color: #39FF14;
        }

        .select-arrow {
          position: absolute;
          right: 12px;
          top: 50%;
          transform: translateY(-50%);
          color: #39FF14;
          pointer-events: none;
        }

        /* QR Section */
        .qr-section {
          margin-top: 8px;
        }
        .qr-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 16px;
          background-color: #2a2a2a;
          border-radius: 12px;
          padding: 20px;
          border: 1px solid #3a3a3a;
        }
        .qr-box {
          background: #ffffff;
          padding: 12px;
          border-radius: 8px;
          display: inline-block;
        }
        .qr-box canvas {
          display: block;
          width: 180px;
          height: 180px;
        }
        .address-section {
          width: 100%;
          text-align: center;
        }
        .address-label {
          font-size: 12px;
          color: #aaaaaa;
          margin-bottom: 4px;
        }
        .address-text {
          font-size: 14px;
          font-weight: 500;
          color: #ffffff;
          word-break: break-all;
          background-color: #1c1c1c;
          padding: 8px;
          border-radius: 6px;
          margin-bottom: 12px;
        }
        .address-actions {
          display: flex;
          gap: 8px;
        }
        .action-btn {
          flex: 1;
          background: none;
          border: 1px solid #39FF14;
          color: #39FF14;
          padding: 8px;
          border-radius: 6px;
          font-size: 14px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          transition: all 0.2s;
        }
        .action-btn:hover {
          background-color: #39FF14;
          color: #000000;
        }
        .action-btn i {
          font-size: 14px;
        }

        /* Form */
        .deposit-form {
          margin-top: 16px;
        }
        .form-group {
          margin-bottom: 16px;
        }
        .input-with-usd {
          position: relative;
        }
        .withdraw-input {
          width: 100%;
        }
        .withdraw-input input {
          width: 100%;
          padding: 12px;
          background-color: #2a2a2a;
          border: 1px solid #3a3a3a;
          border-radius: 6px;
          color: #ffffff;
          font-size: 16px;
        }
        .withdraw-input input:focus {
          outline: none;
          border-color: #39FF14;
        }
        .usd-value-display {
          position: absolute;
          right: 12px;
          top: 50%;
          transform: translateY(-50%);
          color: #39FF14;
          font-size: 14px;
          font-weight: 500;
          background-color: #2a2a2a;
          padding-left: 8px;
        }
        .min-amount-note {
          font-size: 12px;
          color: #777777;
          margin-top: 4px;
        }

        /* Submit Button */
        .form-actions {
          margin-top: 24px;
        }
        .submit-btn {
          width: 100%;
          background-color: #39FF14;
          color: #000000;
          border: none;
          border-radius: 6px;
          padding: 14px;
          font-size: 16px;
          font-weight: bold;
          cursor: pointer;
          transition: background-color 0.2s;
        }
        .submit-btn:hover:not(:disabled) {
          background-color: #2ecc10;
        }
        .submit-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
          background-color: #2a2a2a;
          color: #777777;
        }

        /* Loading / Error */
        .loading-section {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
          padding: 24px;
          color: #aaaaaa;
        }
        .spinner {
          width: 30px;
          height: 30px;
          border: 2px solid #39FF14;
          border-top-color: transparent;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        .error-section {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
          padding: 24px;
          color: #ff6b6b;
          text-align: center;
        }
        .error-section i {
          font-size: 32px;
        }
        .error-note {
          font-size: 14px;
          color: #aaaaaa;
        }

        /* Hint Section */
        .hint-section {
          background-color: #2a2a2a;
          border-radius: 8px;
          padding: 16px;
          border: 1px solid #3a3a3a;
          margin-top: 8px;
        }
        .hint-title {
          font-size: 16px;
          font-weight: 600;
          color: #39FF14;
          margin-bottom: 12px;
        }
        .hint-content {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .hint-item {
          font-size: 13px;
          color: #cccccc;
          line-height: 1.5;
        }

        /* Toast */
        .toast {
          position: fixed;
          bottom: 24px;
          left: 50%;
          transform: translateX(-50%) translateY(100px);
          background-color: #39FF14;
          color: #000000;
          padding: 12px 24px;
          border-radius: 30px;
          font-size: 14px;
          font-weight: 600;
          box-shadow: 0 4px 15px rgba(57, 255, 20, 0.3);
          display: flex;
          align-items: center;
          gap: 8px;
          transition: transform 0.3s ease;
          z-index: 1100;
          max-width: 90%;
          white-space: nowrap;
        }
        .toast.visible {
          transform: translateX(-50%) translateY(0);
        }
        .toast-icon {
          font-size: 16px;
        }

        /* Modal */
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
          z-index: 2000;
          padding: 20px;
        }
        .modal-content {
          background-color: #1c1c1c;
          border-top: 2px solid #39FF14;
          border-radius: 24px;
          width: 100%;
          max-width: 380px;
          max-height: 90vh;
          overflow-y: auto;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.5);
          animation: modalSlideUp 0.3s ease;
        }
        @keyframes modalSlideUp {
          from {
            opacity: 0;
            transform: translateY(50px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 16px 20px;
          border-bottom: 1px solid #2a2a2a;
        }
        .modal-header h3 {
          margin: 0;
          font-size: 18px;
          font-weight: 600;
          color: #ffffff;
        }
        .modal-close {
          background: #2a2a2a;
          border: none;
          color: #ffffff;
          font-size: 16px;
          cursor: pointer;
          padding: 8px;
          border-radius: 50%;
          width: 36px;
          height: 36px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s;
        }
        .modal-close:hover {
          background: #39FF14;
          color: #000000;
        }
        .modal-body {
          padding: 24px 20px;
          text-align: center;
        }
        .success-icon {
          font-size: 48px;
          color: #39FF14;
          margin-bottom: 16px;
        }
        .success-message {
          font-size: 16px;
          font-weight: 500;
          color: #ffffff;
          margin-bottom: 12px;
        }
        .success-details {
          font-size: 14px;
          color: #aaaaaa;
          line-height: 1.5;
        }
        .modal-footer {
          padding: 16px 20px;
          border-top: 1px solid #2a2a2a;
          display: flex;
          justify-content: center;
        }
        .modal-btn {
          background-color: #39FF14;
          color: #000000;
          border: none;
          border-radius: 6px;
          padding: 12px 30px;
          font-size: 16px;
          font-weight: bold;
          cursor: pointer;
          transition: background-color 0.2s;
        }
        .modal-btn:hover {
          background-color: #2ecc10;
        }

        /* Responsive */
        @media (max-width: 360px) {
          .content-card {
            padding: 20px 16px;
          }
          .qr-box canvas {
            width: 150px;
            height: 150px;
          }
        }

        /* Remove blue highlight on tap */
        .back-arrow, .action-btn, .submit-btn, .modal-close, .modal-btn {
          -webkit-tap-highlight-color: transparent;
        }
      `}</style>
    </div>
  );
}

export default Deposit;