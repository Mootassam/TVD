import React, { useMemo, useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useForm, FormProvider, useWatch } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import yupFormSchemas from "src/modules/shared/yup/yupFormSchemas";
import { i18n } from "../../../i18n";
import authSelectors from "src/modules/auth/authSelectors";
import actions from "src/modules/withdraw/form/withdrawFormActions";
import selectors from "src/modules/withdraw/form/withdrawFormSelectors";
import FieldFormItem from "src/shared/form/FieldFormItem";
import assetsListSelectors from "src/modules/assets/list/assetsListSelectors";
import assetsListActions from "src/modules/assets/list/assetsListActions";
import SuccessModalComponent from "src/view/shared/modals/sucessModal";
import method from "src/modules/depositMethod/list/depositMethodListActions";
import depositMethodselectors from "src/modules/depositMethod/list/depositMethodSelectors";
import axios from "axios";

// Currency configurations
const CURRENCIES = [
  "USDT", "ETH", "BTC", "USDC", "DAI",
  "SHIB", "XRP", "TRX", "SOL", "BNB", "DOGE"
];

// Minimum withdrawal in USD
const MIN_WITHDRAWAL_USD = 500;
const WITHDRAWAL_FEE_USD = 5;

// Decimal places for each currency
const CURRENCY_DECIMALS = {
  USDT: 2,
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

const schema = yup.object().shape({
  orderNo: yupFormSchemas.string(i18n("entities.withdraw.fields.orderNo")),
  currency: yupFormSchemas.string(i18n("entities.withdraw.fields.currency")),
  withdrawAmount: yup
    .number()
    .typeError(i18n("pages.withdraw.errors.amountNumber"))
    .required(i18n("pages.withdraw.errors.amountRequired"))
    .test(
      "positive",
      i18n("pages.withdraw.errors.amountPositive"),
      (val) => typeof val === "number" && val > 0
    ),
  fee: yupFormSchemas.decimal(i18n("entities.withdraw.fields.fee")),
  totalAmount: yupFormSchemas.decimal(
    i18n("entities.withdraw.fields.totalAmount")
  ),
  auditor: yupFormSchemas.relationToOne(i18n("entities.withdraw.fields.auditor")),
  acceptTime: yupFormSchemas.datetime(i18n("entities.withdraw.fields.acceptTime")),
  status: yupFormSchemas.enumerator(i18n("entities.withdraw.fields.status"), {
    options: ["pending", "canceled", "success"],
  }),
});

function Withdraw() {
  const dispatch = useDispatch();
  const currentUser = useSelector(authSelectors.selectCurrentUser);
  const assets = useSelector(assetsListSelectors.selectRows) || [];
  const selectModal = useSelector(selectors.selectModal);
  const listMethod = useSelector(depositMethodselectors.selectRows);
  const loading = useSelector(selectors.selectSaveLoading);

  const [amount, setAmount] = useState("");
  const [address, setAddress] = useState("");
  const [selected, setSelected] = useState("");
  const [selectedNetwork, setSelectedNetwork] = useState("");
  const [item, setItem] = useState<{ symbol: string; amount: number } | null>(null);
  const [showCurrencyDropdown, setShowCurrencyDropdown] = useState(false);
  const [showNetworkDropdown, setShowNetworkDropdown] = useState(false);
  const [exchangeRates, setExchangeRates] = useState<Record<string, number>>({});
  const [loadingRates, setLoadingRates] = useState(false);

  // Fetch assets once
  useEffect(() => {
    dispatch(assetsListActions.doFetch('exchange'));
  }, [dispatch]);

  // Fetch deposit methods on mount
  useEffect(() => {
    dispatch(method.doFetch());
  }, [dispatch]);

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

  // Set default currency when listMethod loads
  useEffect(() => {
    if (listMethod && listMethod.length > 0 && !selected) {
      const defaultCurrency = listMethod[0];
      const symbol = defaultCurrency.symbol || defaultCurrency.id;
      setSelected(symbol);
      form.setValue("currency", symbol);
      
      if (defaultCurrency.network && defaultCurrency.network.length > 0) {
        setSelectedNetwork(defaultCurrency.network[0]._id || defaultCurrency.network[0].name);
      }
    }
  }, [listMethod]);

  // Update selected asset info when currency or assets change
  useEffect(() => {
    if (selected && assets.length) {
      const found = assets.find((a) =>
        String(a.symbol).toUpperCase() === String(selected).toUpperCase()
      );
      setItem(found || null);

      const walletAddress = currentUser?.wallet?.[selected]?.address || "";
      setAddress(walletAddress);

      form.setValue("currency", selected);
      
      if (walletAddress) {
        form.setValue("withdrawAdress", walletAddress);
      }
    } else {
      setItem(null);
      setAddress("");
      form.setValue("currency", "");
      form.setValue("withdrawAdress", "");
    }
  }, [selected, assets, currentUser]);

  const initialValues = {
    orderNo: "",
    currency: "",
    withdrawAmount: "",
    fee: "",
    totalAmount: "",
    auditor: "",
    acceptTime: "",
    status: "pending",
    withdrawAdress: "",
  };

  const form = useForm({
    resolver: yupResolver(schema),
    mode: "all",
    defaultValues: initialValues,
  });

  // Watch fields we need to react to
  const watchedAmount = useWatch({ control: form.control, name: "withdrawAmount" });
  const watchedCurrency = useWatch({ control: form.control, name: "currency" });

  // Parsed numeric values
  const parsedAmount = Number(watchedAmount);
  const isAmountNumber = !Number.isNaN(parsedAmount) && isFinite(parsedAmount);
  const availableBalance = item ? Number(item.amount) || 0 : 0;

  // Calculate minimum withdrawal and fee in selected currency
  const { minInCurrency, feeInCurrency } = useMemo(() => {
    if (!selected || !exchangeRates[selected]) {
      return { minInCurrency: 0, feeInCurrency: 0 };
    }

    const rate = exchangeRates[selected];
    const minInCurrency = MIN_WITHDRAWAL_USD / rate;
    const feeInCurrency = WITHDRAWAL_FEE_USD / rate;

    return {
      minInCurrency,
      feeInCurrency,
    };
  }, [selected, exchangeRates]);

  // Get selected method details
  const selectedMethod = useMemo(() => {
    if (!listMethod || !selected) return null;
    return listMethod.find((method) => {
      const methodSymbol = method.symbol || method.id || "";
      return String(methodSymbol).toUpperCase() === String(selected).toUpperCase();
    });
  }, [listMethod, selected]);

  // Get network list for selected currency
  const networkList = selectedMethod?.network || [];

  // Set default network when currency changes
  useEffect(() => {
    if (networkList.length > 0) {
      const defaultNetwork = networkList[0];
      setSelectedNetwork(defaultNetwork._id || defaultNetwork.name);
      setShowNetworkDropdown(false);
    } else {
      setSelectedNetwork("");
    }
  }, [selectedMethod, networkList]);

  // Receive amount (what user receives after fee)
  const receiveAmount = isAmountNumber ? Math.max(parsedAmount - feeInCurrency, 0) : 0;

  // Helper to format numbers consistently - FIXED FOR ZERO AND SMALL VALUES
  const formatNumber = useCallback((value: number, decimals?: number) => {
    if (typeof value !== "number" || !isFinite(value) || value === 0) {
      return "0";
    }
    
    const decimalPlaces = decimals !== undefined ? decimals : (CURRENCY_DECIMALS[selected] || 2);
    
    // For very small numbers, show more precision but not scientific notation
    if (value > 0 && value < 0.000001) {
      // Format with maximum precision but no scientific notation
      return value.toFixed(decimalPlaces > 8 ? decimalPlaces : 8);
    }
    
    // For regular numbers
    return new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 0,
      maximumFractionDigits: decimalPlaces,
    }).format(value);
  }, [selected]);

  // Helper to format USD values
  const formatUSD = useCallback((value: number) => {
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
  }, []);

  // Get currency icon URL
  const getCurrencyIcon = useCallback((symbol: string) => {
    const cleanSymbol = symbol ? symbol.toUpperCase() : "";
    return `https://images.weserv.nl/?url=https://bin.bnbstatic.com/static/assets/logos/${cleanSymbol}.png`;
  }, []);

  // Handle network selection
  const handleNetworkSelect = useCallback((network: any) => {
    setSelectedNetwork(network._id || network.name);
    setShowNetworkDropdown(false);
  }, []);

  // Validation checks
  const computeValidationState = useCallback(() => {
    if (!selected) {
      return { disabled: true, label: i18n("pages.withdraw.validation.selectCurrency"), reason: "selectCurrency" };
    }

    if (networkList.length > 0 && !selectedNetwork) {
      return { disabled: true, label: i18n("pages.withdraw.validation.selectNetwork"), reason: "selectNetwork" };
    }

    if (!isAmountNumber || parsedAmount <= 0) {
      return { disabled: true, label: i18n("pages.withdraw.validation.enterAmount"), reason: "enterAmount" };
    }

    // Check minimum withdrawal
    if (parsedAmount < minInCurrency) {
      const formattedMin = formatNumber(minInCurrency);
      return {
        disabled: true,
        label: i18n("pages.withdraw.validation.belowMin", formattedMin, selected),
        reason: "belowMin",
      };
    }

    // Check available balance
    if (parsedAmount > availableBalance) {
      return {
        disabled: true,
        label: i18n("pages.withdraw.validation.insufficientBalance"),
        reason: "insufficientBalance",
      };
    }

    // Check if fee can be covered
    if (parsedAmount + feeInCurrency > availableBalance) {
      return {
        disabled: true,
        label: i18n("pages.withdraw.validation.insufficientForFee"),
        reason: "insufficientForFee",
      };
    }

    const withdrawAddress = form.getValues("withdrawAdress");
    if (!withdrawAddress || withdrawAddress.trim() === "") {
      return { disabled: true, label: i18n("pages.withdraw.validation.enterAddress"), reason: "enterAddress" };
    }

    return { disabled: false, label: i18n("pages.withdraw.confirmWithdrawal"), reason: "ok" };
  }, [selected, networkList, selectedNetwork, isAmountNumber, parsedAmount, minInCurrency, availableBalance, feeInCurrency, form, formatNumber]);

  const validationState = computeValidationState();

  const handleCloseModal = useCallback(() => {
    dispatch(actions.doClose());
    form.reset(initialValues);
    setSelected("");
    setAddress("");
    setAmount("");
    setSelectedNetwork("");
  }, [dispatch, form, initialValues]);

  // Submit handler
  const onSubmit = useCallback(async (values: any) => {
    if (validationState.disabled) return;

    try {
      values.currency = selected;

      // Generate order number
      const now = new Date();
      const dateStr = `${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, "0")}${String(now.getDate()).padStart(2, "0")}`;
      const randomDigits = Math.floor(Math.random() * 1e7).toString().padStart(7, "0");
      values.orderNo = `RE${dateStr}${randomDigits}`;

      // Set fee and total amount
      const amountNum = Number(values.withdrawAmount) || 0;
      values.fee = feeInCurrency;
      values.totalAmount = amountNum - feeInCurrency;
      values.status = "pending";
      values.network = selectedNetwork;

      setAmount(values.totalAmount.toString());

      await dispatch(actions.doCreate(values));
    } catch (error) {
      console.error("Withdrawal submission error:", error);
    }
  }, [selected, feeInCurrency, selectedNetwork, validationState.disabled, dispatch]);

  // Handle currency selection
  const handleCurrencySelect = useCallback((currency: any) => {
    const symbol = currency.symbol || currency.id;
    setSelected(symbol);
    form.setValue("currency", symbol);
    form.setValue("withdrawAmount", "");
    form.setValue("withdrawAdress", "");
    setShowCurrencyDropdown(false);
    setShowNetworkDropdown(false);
  }, [form]);

  // Calculate USD value of withdrawal amount
  const withdrawalUSDValue = useMemo(() => {
    if (!isAmountNumber || !exchangeRates[selected]) return 0;
    return parsedAmount * exchangeRates[selected];
  }, [parsedAmount, selected, exchangeRates, isAmountNumber]);

  // Calculate USD value of fee
  const feeUSDValue = useMemo(() => {
    if (!exchangeRates[selected]) return 0;
    return feeInCurrency * exchangeRates[selected];
  }, [feeInCurrency, selected, exchangeRates]);

  // Calculate USD value of receive amount
  const receiveUSDValue = useMemo(() => {
    if (!exchangeRates[selected]) return 0;
    return receiveAmount * exchangeRates[selected];
  }, [receiveAmount, selected, exchangeRates]);

  // Format available balance with proper handling
  const formattedAvailableBalance = useMemo(() => {
    if (availableBalance === 0) return "0";
    return formatNumber(availableBalance);
  }, [availableBalance, formatNumber]);

  // Format minimum withdrawal amount
  const formattedMinAmount = useMemo(() => {
    if (minInCurrency === 0) return "0";
    return formatNumber(minInCurrency);
  }, [minInCurrency, formatNumber]);

  // Format fee amount
  const formattedFeeAmount = useMemo(() => {
    if (feeInCurrency === 0) return "0";
    return formatNumber(feeInCurrency);
  }, [feeInCurrency, formatNumber]);

  // Format receive amount
  const formattedReceiveAmount = useMemo(() => {
    if (receiveAmount === 0) return "0";
    return formatNumber(receiveAmount);
  }, [receiveAmount, formatNumber]);

  // Form errors
  const { errors } = form.formState;

  return (
    <div className="withdraw-container">
      {/* Header Section */}
      <div className="header">
        <div className="nav-bar">
          <Link to="/wallets" className="back-arrow">
            <i className="fas fa-arrow-left" />
          </Link>
          <div className="page-title">Withdraw</div>
          <Link className="header-icon" to="/history" style={{ color: 'white' }}>
            <i className="fas fa-receipt" />
          </Link>
        </div>
      </div>

      {/* Content Card */}
      <div className="content-card">
        <div className="withdraw-content">
          {/* Select currency section */}
          <div className="form-section">
            <div className="input-field">
              <label className="input-label">Select currency</label>
              <div className="custom-select-wrapper">
                <div
                  className="currency-select-trigger"
                  onClick={() => setShowCurrencyDropdown(!showCurrencyDropdown)}
                >
                  {selected ? (
                    <div className="selected-currency">
                      <div className="currency-icon">
                        <img
                          src={getCurrencyIcon(selected)}
                          alt={selected}
                          onError={(e) => {
                            const img = e.target as HTMLImageElement;
                            img.onerror = null;
                            img.style.display = "none";
                            const parent = img.parentElement;
                            if (parent) {
                              parent.textContent = selected.charAt(0);
                              parent.style.background = "#f0f0f0";
                              parent.style.color = "#333";
                              parent.style.fontSize = "14px";
                              parent.style.fontWeight = "bold";
                              parent.style.display = "inline-flex";
                              parent.style.alignItems = "center";
                              parent.style.justifyContent = "center";
                              parent.style.width = "24px";
                              parent.style.height = "24px";
                              parent.style.borderRadius = "50%";
                            }
                          }}
                        />
                      </div>
                      <span className="currency-text">{selected}</span>
                      {loadingRates ? (
                        <span className="rate-loading">Loading rates...</span>
                      ) : exchangeRates[selected] ? (
                        <span className="currency-rate">
                          (1 {selected} ≈ {formatUSD(exchangeRates[selected])})
                        </span>
                      ) : null}
                    </div>
                  ) : (
                    <span className="placeholder">Select Currency</span>
                  )}
                  <i className="fas fa-chevron-down dropdown-arrow" />
                </div>

                {showCurrencyDropdown && (
                  <div className="currency-dropdown">
                    {listMethod && listMethod.length > 0 ? (
                      listMethod
                        .filter(currency => CURRENCIES.includes(currency.symbol || currency.id))
                        .map((currency) => {
                          const symbol = currency.symbol || currency.id;
                          return (
                            <div
                              key={currency.id || symbol}
                              className="currency-option"
                              onClick={() => handleCurrencySelect(currency)}
                            >
                              <div className="currency-icon">
                                <img
                                  src={getCurrencyIcon(symbol)}
                                  alt={symbol}
                                  onError={(e) => {
                                    const img = e.target as HTMLImageElement;
                                    img.onerror = null;
                                    img.style.display = "none";
                                    const parent = img.parentElement;
                                    if (parent) {
                                      parent.textContent = symbol.charAt(0);
                                      parent.style.background = "#f0f0f0";
                                      parent.style.color = "#333";
                                      parent.style.fontSize = "14px";
                                      parent.style.fontWeight = "bold";
                                      parent.style.display = "inline-flex";
                                      parent.style.alignItems = "center";
                                      parent.style.justifyContent = "center";
                                      parent.style.width = "24px";
                                      parent.style.height = "24px";
                                      parent.style.borderRadius = "50%";
                                    }
                                  }}
                                />
                              </div>
                              <span className="currency-text">{symbol}</span>
                              {loadingRates ? (
                                <span className="rate-loading-small">...</span>
                              ) : exchangeRates[symbol] ? (
                                <span className="currency-rate-small">
                                  ({formatUSD(exchangeRates[symbol])})
                                </span>
                              ) : null}
                            </div>
                          );
                        })
                    ) : (
                      <div className="no-options">No currencies available</div>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Minimum withdrawal requirement */}
            {selected && exchangeRates[selected] && (
              <div className="info-box">
                <div className="info-row">
                  <span className="info-label">Minimum withdrawal:</span>
                  <span className="info-value">
                    {formattedMinAmount} {selected} ({formatUSD(MIN_WITHDRAWAL_USD)})
                  </span>
                </div>
              </div>
            )}

            {/* Withdraw network */}
            {selected && networkList.length > 0 && (
              <div className="input-field">
                <label className="input-label">Withdraw network</label>
                <div className="custom-select-wrapper">
                  <div
                    className="network-select-trigger"
                    onClick={() => setShowNetworkDropdown(!showNetworkDropdown)}
                  >
                    <div className="selected-network">
                      <i className="fas fa-network-wired network-icon" />
                      <span className="network-text">
                        {networkList.find(n => 
                          n._id === selectedNetwork || 
                          n.id === selectedNetwork || 
                          n.name === selectedNetwork
                        )?.name || "Select Network"}
                      </span>
                    </div>
                    <i className="fas fa-chevron-down dropdown-arrow" />
                  </div>
                  
                  {showNetworkDropdown && (
                    <div className="network-dropdown">
                      {networkList.map((network) => (
                        <div
                          key={network._id || network.id || network.name}
                          className="network-option"
                          onClick={() => handleNetworkSelect(network)}
                        >
                          <i className="fas fa-network-wired network-icon-small" />
                          <span className="network-text">{network.name}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            <FormProvider {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                {/* Withdraw address */}
                <div className="input-field">
                  <label className="input-label">Withdraw address</label>
                  <div className="input-wrapper">
                    <FieldFormItem
                      name="withdrawAdress"
                      type="text"
                      className="address-field"
                      placeholder="Enter your wallet address"
                      onChange={(e) => setAddress(e.target.value)}
                    />
                  </div>
                  <br />
                </div>

                {/* Amount section */}
                <div className="input-field">
                  <label className="input-label">Amount of coins withdrawn</label>
                  <div className="input-wrapper">
                    <FieldFormItem
                      name="withdrawAmount"
                      type="number"
                      className="amount-field"
                      placeholder="0.0"
                      step="any"
                    />
                  </div>
                  <div className="balance-info">
                    <div className="balance-text">
                      Available: <span className="balance-amount">{formattedAvailableBalance} {selected}</span>
                    </div>
                    {isAmountNumber && withdrawalUSDValue > 0 && (
                      <div className="usd-value">
                        ≈ {formatUSD(withdrawalUSDValue)}
                      </div>
                    )}
                  </div>
                </div>

                {/* Fee section */}
                <div className="fee-section">
                  <div className="fee-row">
                    <div className="fee-label">Withdrawal fee:</div>
                    <div className="fee-value">
                      {formattedFeeAmount} {selected}
                      <span className="fee-usd"> ({formatUSD(feeUSDValue)})</span>
                    </div>
                  </div>
                  <div className="fee-row">
                    <div className="fee-label">Minimum withdrawal:</div>
                    <div className="fee-value">
                      {formattedMinAmount} {selected}
                      <span className="fee-usd"> ({formatUSD(MIN_WITHDRAWAL_USD)})</span>
                    </div>
                  </div>
                  <div className="fee-row">
                    <div className="fee-label">You will receive:</div>
                    <div className="fee-value receive-amount">
                      {formattedReceiveAmount} {selected}
                      {receiveUSDValue > 0 && (
                        <span className="receive-usd"> (≈ {formatUSD(receiveUSDValue)})</span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Important notice section */}
                <div className="notice-section">
                  <div className="notice-title">Important notice</div>
                  <div className="notice-content">
                    <div className="notice-item">1. Minimum withdrawal amount is ${MIN_WITHDRAWAL_USD} USD equivalent in selected currency.</div>
                    <div className="notice-item">2. Withdrawal fee is ${WITHDRAWAL_FEE_USD} USD equivalent in selected currency.</div>
                    <div className="notice-item">3. After submitting the withdraw application, the money will arrive within 24 hours. If the money does not arrive after the expected withdraw time, please consult the online customer service.</div>
                    <div className="notice-item">4. After submitting the withdraw application, the funds are frozen because the withdraw is in progress and the funds are temporarily held by the system. This does not mean that you have lost the asset or that there is an abnormality with the asset.</div>
                  </div>
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  className="withdraw-button"
                  disabled={validationState.disabled || loading || loadingRates}
                >
                  {loading ? (
                    <>
                      <i className="fas fa-spinner fa-spin" style={{ marginRight: '8px' }}></i>
                      Processing...
                    </>
                  ) : loadingRates ? (
                    <>
                      <i className="fas fa-spinner fa-spin" style={{ marginRight: '8px' }}></i>
                      Loading rates...
                    </>
                  ) : (
                    validationState.label
                  )}
                </button>
              </form>
            </FormProvider>
          </div>
        </div>
      </div>

      {selectModal && (
        <SuccessModalComponent
          isOpen={selectModal}
          onClose={handleCloseModal}
          type='withdraw'
          amount={amount}
          coinType={selected}
        />
      )}

      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
        }

        body {
          background-color: #f5f7fa;
          color: #333;
          line-height: 1.6;
          overflow-x: hidden;
        }

        .withdraw-container {
          max-width: 400px;
          margin: 0 auto;
          position: relative;
          min-height: 100vh;
          background: linear-gradient(135deg, #106cf5 0%, #0a4fc4 100%);
        }

        /* Header Section */
        .header {
          min-height: 60px;
          position: relative;
          padding: 15px 20px;
        }

        .nav-bar {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .back-arrow {
          color: white;
          font-size: 20px;
          font-weight: 300;
          text-decoration: none;
          transition: opacity 0.3s ease;
        }

        .back-arrow:hover {
          opacity: 0.8;
        }

        .page-title {
          color: white;
          font-size: 17px;
          font-weight: 600;
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
        }

        /* Content Card */
        .content-card {
          background: #f2f4f7;
          border-radius: 40px 40px 0 0;
          padding: 20px;
          box-shadow: 0 -5px 20px rgba(0, 0, 0, 0.05);
          min-height: calc(100vh - 60px);
        }

        .withdraw-content {
          width: 100%;
        }

        /* Form Sections */
        .form-section {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .input-field {
          display: flex;
          flex-direction: column;
        }

        .input-label {
          font-size: 12px;
          font-weight: 600;
          color: #222;
          margin-bottom: 8px;
        }

        .custom-select-wrapper {
          position: relative;
        }

        .currency-select-trigger,
        .network-select-trigger {
          width: 100%;
          padding: 12px;
          border: 1px solid #e0e0e0;
          border-radius: 8px;
          font-size: 12px;
          background-color: white;
          color: #333;
          cursor: pointer;
          display: flex;
          justify-content: space-between;
          align-items: center;
          transition: all 0.3s ease;
        }

        .currency-select-trigger:hover,
        .network-select-trigger:hover {
          border-color: #106cf5;
        }

        .selected-currency {
          display: flex;
          align-items: center;
          gap: 10px;
          flex: 1;
        }

        .selected-network {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .currency-icon {
          width: 24px;
          height: 24px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          flex-shrink: 0;
        }

        .currency-icon img {
          width: 100%;
          height: 100%;
          object-fit: contain;
        }

        .currency-text,
        .network-text {
          font-size: 12px;
          font-weight: 500;
        }

        .currency-rate {
          font-size: 11px;
          color: #666;
          margin-left: auto;
          margin-right: 10px;
        }

        .currency-rate-small {
          font-size: 10px;
          color: #666;
          margin-left: auto;
        }

        .rate-loading {
          font-size: 11px;
          color: #999;
          margin-left: auto;
          margin-right: 10px;
        }

        .rate-loading-small {
          font-size: 10px;
          color: #999;
          margin-left: auto;
        }

        .network-icon {
          color: #106cf5;
          font-size: 14px;
        }

        .dropdown-arrow {
          color: #666;
          font-size: 12px;
          transition: transform 0.3s ease;
        }

        /* Dropdowns */
        .currency-dropdown,
        .network-dropdown {
          position: absolute;
          top: 100%;
          left: 0;
          right: 0;
          background: white;
          border: 1px solid #e0e0e0;
          border-radius: 8px;
          margin-top: 4px;
          max-height: 200px;
          overflow-y: auto;
          z-index: 1000;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }

        .currency-option,
        .network-option {
          padding: 12px;
          display: flex;
          align-items: center;
          gap: 10px;
          cursor: pointer;
          transition: background-color 0.2s ease;
        }

        .currency-option:hover,
        .network-option:hover {
          background-color: #f5f7fa;
        }

        .currency-option .currency-icon {
          width: 24px;
          height: 24px;
        }

        .network-icon-small {
          color: #106cf5;
          font-size: 12px;
        }

        .no-options {
          padding: 12px;
          color: #999;
          font-size: 12px;
          text-align: center;
        }

        .placeholder {
          color: #999;
        }

        /* Info Box */
        .info-box {
          background: #e8f4ff;
          border: 1px solid #b6d9ff;
          border-radius: 8px;
          padding: 12px;
          margin: 5px 0;
        }

        .info-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .info-label {
          font-size: 12px;
          color: #106cf5;
          font-weight: 500;
        }

        .info-value {
          font-size: 12px;
          font-weight: 600;
          color: #222;
        }

        /* Input Fields */
        .input-wrapper {
          position: relative;
        }

        .address-field, .amount-field {
          width: 100%;
          padding: 12px;
          border: 1px solid #e0e0e0;
          border-radius: 8px;
          font-size: 12px;
          background-color: white;
          color: #333;
          transition: all 0.3s ease;
        }

        .address-field:focus, .amount-field:focus {
          outline: none;
          border-color: #106cf5;
          box-shadow: 0 0 0 3px rgba(16, 108, 245, 0.1);
        }

        .balance-info {
          margin-top: 8px;
        }

        .balance-text {
          font-size: 14px;
          color: #666;
        }

        .balance-amount {
          font-weight: 600;
          color: #106cf5;
        }

        .usd-value {
          font-size: 12px;
          color: #666;
          margin-top: 2px;
        }

        /* Fee Section */
        .fee-section {
          background: white;
          border-radius: 8px;
          padding: 16px;
          margin: 10px 0;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
        }

        .fee-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 8px 0;
          border-bottom: 1px solid #f0f0f0;
        }

        .fee-row:last-child {
          border-bottom: none;
        }

        .fee-label {
          font-size: 14px;
          color: #666;
        }

        .fee-value {
          font-size: 15px;
          font-weight: 600;
          color: #222;
          text-align: right;
          display: flex;
          flex-direction: column;
          align-items: flex-end;
        }

        .fee-usd {
          font-size: 12px;
          color: #666;
          font-weight: normal;
          margin-top: 2px;
        }

        .receive-amount {
          color: #106cf5;
          font-size: 16px;
        }

        .receive-usd {
          font-size: 12px;
          color: #106cf5;
          font-weight: normal;
          margin-top: 2px;
        }

        /* Notice Section */
        .notice-section {
          background: white;
          border-radius: 8px;
          padding: 16px;
          margin: 10px 0;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
        }

        .notice-title {
          font-size: 14px;
          font-weight: 600;
          color: #222;
          margin-bottom: 12px;
        }

        .notice-content {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .notice-item {
          font-size: 10px;
          color: #666;
          line-height: 1.4;
        }

        /* Withdraw Button */
        .withdraw-button {
          width: 100%;
          padding: 12px;
          background: #106cf5;
          color: white;
          border: none;
          border-radius: 8px;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          margin-top: 20px;
        }

        .withdraw-button:hover:not(:disabled) {
          background: #0a4fc4;
          transform: translateY(-2px);
          box-shadow: 0 4px 15px rgba(16, 108, 245, 0.3);
        }

        .withdraw-button:disabled {
          background: #ccc;
          cursor: not-allowed;
          transform: none;
          box-shadow: none;
        }

        /* Responsive */
        @media (max-width: 380px) {
          .withdraw-container {
            padding: 0;
          }

          .header {
            padding: 16px;
            min-height: 50px;
          }

          .content-card {
            padding: 16px;
            border-radius: 30px 30px 0 0;
          }

          .currency-select-trigger,
          .network-select-trigger,
          .address-field,
          .amount-field {
            padding: 12px;
            font-size: 14px;
          }

          .input-label {
            font-size: 13px;
          }

          .balance-text {
            font-size: 13px;
          }

          .fee-section, .notice-section {
            padding: 12px;
          }

          .fee-label, .fee-value {
            font-size: 13px;
          }

          .notice-title {
            font-size: 13px;
          }

          .notice-item {
            font-size: 10px;
          }

          .withdraw-button {
            padding: 12px;
            font-size: 15px;
          }

          .currency-icon {
            width: 20px;
            height: 20px;
          }

          .currency-text, .network-text {
            font-size: 11px;
          }
        }

        @media (min-width: 768px) {
          .content-card {
            border-radius: 30px 30px 0 0;
          }

          .withdraw-content {
            max-width: 600px;
            margin: 0 auto;
          }
        }
      `}</style>
    </div>
  );
}

export default Withdraw;