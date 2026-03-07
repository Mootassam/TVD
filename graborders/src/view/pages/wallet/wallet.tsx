import React, {
  useState,
  useEffect,
  useMemo,
  useCallback,
  memo,
} from "react";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import assetsActions from "src/modules/assets/list/assetsListActions";
import assetsListSelectors from "src/modules/assets/list/assetsListSelectors";
import { i18n } from "../../../i18n";
import CurrencyModal from "../currency/Currency";

// Constants
const QUICK_ACTIONS = [
  { path: "/withdraw", icon: "fas fa-arrow-up", name: i18n("pages.wallet.quickActions.withdraw") },
  { path: "/deposit", icon: "fas fa-arrow-down", name: i18n("pages.wallet.quickActions.deposit") },
  { path: "/transfer", icon: "fas fa-exchange-alt", name: i18n("pages.wallet.quickActions.transfer") },
  { path: "/conversion", icon: "fas fa-sync-alt", name: i18n("pages.wallet.quickActions.swap") },
];

const ACCOUNT_TABS = [
  i18n("pages.wallet.accountTabs.exchange"),
  i18n("pages.wallet.accountTabs.trade"),
  i18n("pages.wallet.accountTabs.perpetual")
];

// Helper function to get/set currency from localStorage
const getStoredCurrency = () => {
  const stored = localStorage.getItem('selectedCurrency');
  return stored ? JSON.parse(stored) : { code: "USD", symbol: "$" };
};

const setStoredCurrency = (currency) => {
  localStorage.setItem('selectedCurrency', JSON.stringify(currency));
};

// Helper function to calculate approximate conversion
const calculateApproximateEquivalent = (amount, baseCurrency, targetCurrency) => {
  // This would typically come from an API or exchange rate service
  // For demo purposes, using fixed conversion rates
  const conversionRates = {
    USD: 1,
    EUR: 0.85,
    GBP: 0.73,
    JPY: 110,
    CNY: 6.5,
    AUD: 1.35,
    CAD: 1.25,
    CHF: 0.92,
    HKD: 7.8,
    SGD: 1.35,
    BTC: 0.000025,
    ETH: 0.0004,
    USDC: 1
  };

  // If amount is not a valid number, return 0
  const numAmount = parseFloat(amount) || 0;
  
  // If currencies are the same, return same amount
  if (baseCurrency === targetCurrency) {
    return numAmount.toFixed(2);
  }

  // Check if we have conversion rates
  if (conversionRates[baseCurrency] && conversionRates[targetCurrency]) {
    const inUSD = numAmount / conversionRates[baseCurrency];
    const converted = inUSD * conversionRates[targetCurrency];
    return converted.toFixed(2);
  }

  // Fallback: return the original amount with currency code
  return numAmount.toFixed(2);
};

// Memoized components
const QuickActionItem = memo(({ item }: { item: typeof QUICK_ACTIONS[0] }) => (
  <Link
    to={item.path}
    className="action-item remove_blue"
    role="button"
    aria-label={item.name}
  >
    <div className="action-icon">
      <i className={item.icon} aria-hidden="true" />
    </div>
    <span className="action-label">{item.name}</span>
  </Link>
));

QuickActionItem.displayName = 'QuickActionItem';

const AssetCard = memo(({ 
  asset, 
  currencySymbol,
  hideAmounts 
}: { 
  asset: any; 
  currencySymbol: string;
  hideAmounts: boolean;
}) => {
  const getAssetIconClass = (symbol: string) => {
    switch (symbol) {
      case "ETH": return "asset-icon eth-icon";
      case "BTC": return "asset-icon btc-icon";
      case "USDC": return "asset-icon usdc-icon";
      default: return "asset-icon";
    }
  };

  const assetIconClass = getAssetIconClass(asset.symbol);

  return (
    <div className="asset-card">
      <div className="asset-header">
        <div className={assetIconClass}>
          <img
            src={`https://images.weserv.nl/?url=https://bin.bnbstatic.com/static/assets/logos/${asset.symbol}.png`}
            alt={asset.symbol}
            style={{ width: '100%' }}
            loading="lazy"
            onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
              const img = e.currentTarget;
              img.onerror = null;
              img.style.display = 'none';
              if (img.parentElement) {
                img.parentElement.textContent = asset.symbol;
              }
            }}
          />
        </div>
        <div className="asset-name">{asset.coinName}</div>
      </div>
      <div className="asset-details">
        <div className="asset-column">
          <div className="asset-label">{i18n("pages.wallet.assetLabels.availableBalance")}:</div>
          <div className="asset-value">
            {hideAmounts ? i18n("common.hidden") : asset.amount}
          </div>
        </div>
        <div className="asset-column">
          <div className="asset-label">{i18n("pages.wallet.assetLabels.frozenAmount")}:</div>
          <div className="asset-value">
            {hideAmounts ? i18n("common.hidden") : asset.amountFreezed}
          </div>
        </div>
        <div className="asset-column">
          <div className="asset-label">{i18n("pages.wallet.assetLabels.valuation")}:</div>
          <div className="asset-value">
            {hideAmounts ? i18n("common.hidden") : `${currencySymbol}${asset.balanceFiat}`}
          </div>
        </div>
      </div>
    </div>
  );
});

AssetCard.displayName = 'AssetCard';

const AccountTab = memo(({
  tab,
  activeTab,
  onTabClick
}: {
  tab: string;
  activeTab: string;
  onTabClick: (tab: string) => void;
}) => (
  <div
    className={`account-tab ${activeTab === tab ? "active" : ""}`}
    onClick={() => onTabClick(tab)}
  >
    {tab}
  </div>
));

AccountTab.displayName = 'AccountTab';

// Main component
function Wallet() {
  const dispatch = useDispatch();
  const location = useLocation();
  
  // Selectors
  const listAssets = useSelector(assetsListSelectors.selectRows);
  const selectTotalFiat = useSelector(assetsListSelectors.selectTotalFiat);
  const loading = useSelector(assetsListSelectors.selectLoading);
  
  // State
  const [activeTab, setActiveTab] = useState(i18n("pages.wallet.accountTabs.exchange"));
  const [isCurrencyModalOpen, setIsCurrencyModalOpen] = useState(false);
  const [hideAmounts, setHideAmounts] = useState(false);
  
  // Get initial currency from localStorage
  const [selectedCurrency, setSelectedCurrency] = useState(() => {
    return getStoredCurrency();
  });

  // Currency symbols mapping
  const CURRENCY_SYMBOLS = useMemo(() => ({
    USD: '$',
    EUR: '€',
    GBP: '£',
    JPY: '¥',
    CNY: '¥',
    AUD: 'A$',
    CAD: 'C$',
    CHF: 'CHF',
    HKD: 'HK$',
    SGD: 'S$'
  }), []);

  // Memoized callbacks
  const handleTabClick = useCallback((tab: string) => {
    setActiveTab(tab);
    // Dispatch to fetch assets for the selected tab with current currency
    dispatch(assetsActions.doFetch(tab, selectedCurrency.code));
  }, [dispatch, selectedCurrency.code]);

  const handleCurrencySelect = useCallback((currency: any) => {
    // Update localStorage and state
    const newCurrency = {
      code: currency.code,
      symbol: currency.symbol || CURRENCY_SYMBOLS[currency.code] || currency.code
    };
    
    setStoredCurrency(newCurrency);
    setSelectedCurrency(newCurrency);
    
    // Fetch assets with the new currency and current tab
    dispatch(assetsActions.doFetch(activeTab, currency.code));
    setIsCurrencyModalOpen(false);
  }, [dispatch, activeTab, CURRENCY_SYMBOLS]);

  const openCurrencyModal = () => {
    setIsCurrencyModalOpen(true);
  };

  const closeCurrencyModal = () => {
    setIsCurrencyModalOpen(false);
  };

  const toggleHideAmounts = () => {
    setHideAmounts(!hideAmounts);
  };

  // Calculate approximate equivalent
  const approximateEquivalent = useMemo(() => {
    if (!selectTotalFiat || hideAmounts) return i18n("common.hidden");
    
    // For demo: Calculate equivalent in USD (base currency)
    const equivalent = calculateApproximateEquivalent(
      selectTotalFiat, 
      selectedCurrency.code, 
      "USD"
    );
    
    return i18n("pages.wallet.usdEquivalent", equivalent);
  }, [selectTotalFiat, selectedCurrency.code, hideAmounts]);

  // Initial fetch on mount
  useEffect(() => {
    let isMounted = true;

    const fetchAssets = async () => {
      if (!isMounted) return;

      try {
        await dispatch(assetsActions.doFetch(activeTab, selectedCurrency.code));
      } catch (error) {
        if (isMounted) {
          console.error(i18n("pages.wallet.errors.fetchAssets"), error);
        }
      }
    };

    fetchAssets();

    return () => {
      isMounted = false;
    };
  }, []); // Only run on mount

  // Fetch assets when activeTab changes
  useEffect(() => {
    let isMounted = true;

    const fetchAssets = async () => {
      if (!isMounted) return;

      try {
        await dispatch(assetsActions.doFetch(activeTab, selectedCurrency.code));
      } catch (error) {
        if (isMounted) {
          console.error(i18n("pages.wallet.errors.fetchAssets"), error);
        }
      }
    };

    fetchAssets();

    return () => {
      isMounted = false;
    };
  }, [dispatch, activeTab, selectedCurrency.code]);

  // Memoize rendered assets
  const renderedAssets = useMemo(() => {
    if (loading) {
      return (
        <>
          {/* Placeholder asset 1 */}
          <div className="asset-card placeholder">
            <div className="asset-header">
              <div className="asset-icon placeholder-icon"></div>
              <div className="asset-name placeholder-text" style={{width: '40%'}}></div>
            </div>
            <div className="asset-details">
              <div className="asset-column">
                <div className="asset-label placeholder-text" style={{width: '60%'}}></div>
                <div className="asset-value placeholder-text" style={{width: '40%'}}></div>
              </div>
              <div className="asset-column">
                <div className="asset-label placeholder-text" style={{width: '60%'}}></div>
                <div className="asset-value placeholder-text" style={{width: '40%'}}></div>
              </div>
              <div className="asset-column">
                <div className="asset-label placeholder-text" style={{width: '60%'}}></div>
                <div className="asset-value placeholder-text" style={{width: '40%'}}></div>
              </div>
            </div>
          </div>

          {/* Placeholder asset 2 */}
          <div className="asset-card placeholder">
            <div className="asset-header">
              <div className="asset-icon placeholder-icon"></div>
              <div className="asset-name placeholder-text" style={{width: '35%'}}></div>
            </div>
            <div className="asset-details">
              <div className="asset-column">
                <div className="asset-label placeholder-text" style={{width: '60%'}}></div>
                <div className="asset-value placeholder-text" style={{width: '40%'}}></div>
              </div>
              <div className="asset-column">
                <div className="asset-label placeholder-text" style={{width: '60%'}}></div>
                <div className="asset-value placeholder-text" style={{width: '40%'}}></div>
              </div>
              <div className="asset-column">
                <div className="asset-label placeholder-text" style={{width: '60%'}}></div>
                <div className="asset-value placeholder-text" style={{width: '40%'}}></div>
              </div>
            </div>
          </div>

          {/* Placeholder asset 3 */}
          <div className="asset-card placeholder">
            <div className="asset-header">
              <div className="asset-icon placeholder-icon"></div>
              <div className="asset-name placeholder-text" style={{width: '45%'}}></div>
            </div>
            <div className="asset-details">
              <div className="asset-column">
                <div className="asset-label placeholder-text" style={{width: '60%'}}></div>
                <div className="asset-value placeholder-text" style={{width: '40%'}}></div>
              </div>
              <div className="asset-column">
                <div className="asset-label placeholder-text" style={{width: '60%'}}></div>
                <div className="asset-value placeholder-text" style={{width: '40%'}}></div>
              </div>
              <div className="asset-column">
                <div className="asset-label placeholder-text" style={{width: '60%'}}></div>
                <div className="asset-value placeholder-text" style={{width: '40%'}}></div>
              </div>
            </div>
          </div>
        </>
      );
    }

    if (listAssets.length === 0) {
      return (
        <div className="no-assets">
          <div className="asset-card">
            <div className="asset-header">
              <div className="asset-icon"></div>
              <div className="asset-name">{i18n("pages.wallet.noAssetsFound")}</div>
            </div>
            <div className="asset-details">
              <div className="asset-column">
                <div className="asset-label">{i18n("pages.wallet.assetLabels.availableBalance")}:</div>
                <div className="asset-value">{hideAmounts ? i18n("common.hidden") : '0.00'}</div>
              </div>
              <div className="asset-column">
                <div className="asset-label">{i18n("pages.wallet.assetLabels.frozenAmount")}:</div>
                <div className="asset-value">{hideAmounts ? i18n("common.hidden") : '0.00'}</div>
              </div>
              <div className="asset-column">
                <div className="asset-label">{i18n("pages.wallet.assetLabels.valuation")}:</div>
                <div className="asset-value">{hideAmounts ? i18n("common.hidden") : `${selectedCurrency.symbol}0.00`}</div>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return listAssets.map((asset) => (
      <AssetCard
        key={asset.id}
        asset={asset}
        currencySymbol={selectedCurrency.symbol}
        hideAmounts={hideAmounts}
      />
    ));
  }, [listAssets, loading, selectedCurrency.symbol, hideAmounts]);

  return (
    <div className="container">
      {/* Header Section */}
      <div className="header">
        <div className="nav-bar">
          <div className="page-title">{i18n("pages.wallet.myAssets")}</div>
        </div>
      </div>

      {/* Content Wrapper */}
      <div className="content-wrapper">
        {/* Asset Valuation Section */}
        <div className="valuation-section">
          <div className="valuation-card">
            <div className="valuation-header">
              <div className="valuation-label">
                <i 
                  className={`fas ${hideAmounts ? 'fa-eye' : 'fa-eye-slash'}`}
                  onClick={toggleHideAmounts}
                  style={{ cursor: 'pointer' }}
                  aria-label={hideAmounts ? i18n("pages.wallet.showAmounts") : i18n("pages.wallet.hideAmounts")}
                ></i>
                {i18n("pages.wallet.assetValuation")}
              </div>
              {/* Currency Selector */}
              <div className="currency-selector-modal" onClick={openCurrencyModal}>
                <div className="currency-display">
                  <span className="currency-symbol">{selectedCurrency.symbol}</span>
                  <span className="currency-code">{selectedCurrency.code}</span>
                  <i className="fas fa-chevron-down"></i>
                </div>
              </div>
            </div>
            <div className="balance-amount">
              {loading ? (
                <div className="balance-placeholder placeholder-text"></div>
              ) : hideAmounts ? (
                i18n("common.hidden")
              ) : (
                `${selectedCurrency.symbol}${selectTotalFiat}`
              )}
            </div>
            <div className="usd-equivalent">
              {loading ? (
                <div className="equivalent-placeholder placeholder-text"></div>
              ) : hideAmounts ? (
                i18n("common.hidden")
              ) : (
                approximateEquivalent
              )}
            </div>
          </div>
        </div>

        <div className="sectionn__assets">
          {/* Action Buttons */}
          <div className="actions-section">
            <div className="actions-grid">
              {QUICK_ACTIONS.map((item) => (
                <QuickActionItem key={item.path} item={item} />
              ))}
            </div>
          </div>

          {/* My Account Section */}
          <div className="account-section">
            <div className="section-title">{i18n("pages.wallet.myAccount")}</div>
            <div className="account-tabs">
              {ACCOUNT_TABS.map((tab) => (
                <AccountTab
                  key={tab}
                  tab={tab}
                  activeTab={activeTab}
                  onTabClick={handleTabClick}
                />
              ))}
            </div>
            <div className="asset-list">{renderedAssets}</div>
          </div>
        </div>
      </div>

      {/* Currency Selection Modal */}
      {isCurrencyModalOpen && (
        <CurrencyModal
          isOpen={isCurrencyModalOpen}
          onClose={closeCurrencyModal}
          selectedCurrency={selectedCurrency}
          onSelectCurrency={handleCurrencySelect}
        />
      )}


      <style>{`
        .sectionn__assets{ 
          background-color: #fff;
          border-radius: 21px 21px 0 0;
          overflow-y: auto;
          will-change: transform;
          margin-bottom: 40px;
          height:100dvh;
          padding-bottom: 250px;
        }

        .container {
          max-width: 400px;
          margin: 0 auto;
          height: 100dvh;
          position: relative;
          background: linear-gradient(135deg, #4082e3 0%, #ffffff 100%);
          background-size: cover;
          background-repeat: no-repeat;
          contain: layout style paint;
        }

        .header {
          padding: 15px 20px;
          color: white;
          top: 0;
          z-index: 100;
        }

        .nav-bar {
          align-items: center;
        }

        .back-arrow {
          font-size: 18px;
          font-weight: 300;
        }

        .page-title {
          font-size: 18px;
          font-weight: 600;
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          text-align: center;
          width: 200px;
        }

        .valuation-section {
          padding: 20px 20px 0 20px;
          color: white;
        }

        .valuation-card {
          background: rgba(255, 255, 255, 0.15);
          backdrop-filter: blur(10px);
          border-radius: 16px 16px 0 0;
          padding: 20px;
          border: 1px solid rgba(255, 255, 255, 0.2);
          color: white;
        }

        .valuation-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
        }

        .valuation-label {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 14px;
          color: white;
        }

        .valuation-label i {
          cursor: pointer;
          transition: opacity 0.2s ease;
        }

        .valuation-label i:hover {
          opacity: 0.8;
        }

        /* Currency Selector Modal Style */
        .currency-selector-modal {
          background: rgba(255, 255, 255, 0.2);
          border: none;
          border-radius: 6px;
          padding: 6px 12px;
          color: white;
          font-size: 12px;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 6px;
          transition: all 0.2s ease;
          user-select: none;
          min-width: 70px;
          justify-content: center;
        }

        .currency-selector-modal:hover {
          background: rgba(255, 255, 255, 0.3);
          transform: translateY(-1px);
        }

        .currency-display {
          display: flex;
          align-items: center;
          gap: 6px;
          font-weight: 500;
        }

        .currency-display i {
          font-size: 10px;
          transition: transform 0.2s ease;
        }

        .currency-selector-modal:hover .currency-display i {
          transform: translateY(1px);
        }

        .balance-amount {
          font-size: 32px;
          font-weight: 700;
          margin-bottom: 8px;
          color: white;
          min-height: 42px;
          display: flex;
          align-items: center;
        }

        .usd-equivalent {
          font-size: 16px;
          min-height: 24px;
          display: flex;
          align-items: center;
        }

        /* Balance Placeholders */
        .balance-placeholder {
          width: 60%;
          height: 32px;
          border-radius: 6px;
        }

        .equivalent-placeholder {
          width: 40%;
          height: 18px;
          border-radius: 4px;
        }

        .actions-section {
          padding: 20px 20px 20px;
        }

        .actions-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 15px;
        }

        .action-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 8px 0;
          background: #f2f4f7;
          border-radius: 12px;
          cursor: pointer;
          transition: all 0.3s ease;
          text-decoration: none;
          color: inherit;
          will-change: transform;
        }

        .action-item:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }

        .action-icon {
          width: 40px;
          height: 40px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #106cf5;
          font-size: 18px;
        }

        .action-label {
          font-size: 12px;
          color: #333;
          font-weight: 500;
          margin-top: 4px;
        }

        .account-section {
          padding: 0 20px 20px;
        }

        .section-title {
          font-size: 16px;
          font-weight: 600;
          margin-bottom: 15px;
          color: #333;
        }

        .account-tabs {
          display: flex;
          background: #f8f9fa;
          border-radius: 12px;
          padding: 4px;
          margin-bottom: 20px;
        }

        .account-tab {
          flex: 1;
          padding: 10px;
          text-align: center;
          font-size: 14px;
          font-weight: 500;
          color: #666;
          cursor: pointer;
          border-radius: 8px;
          transition: all 0.3s ease;
          user-select: none;
        }

        .account-tab.active {
          background: white;
          color: #106cf5;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }

        .asset-card {
          background: #f2f4f7;
          border-radius: 12px;
          padding: 16px;
          margin-bottom: 12px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
          transition: transform 0.2s ease;
        }

        .asset-card:hover {
          transform: translateY(-1px);
        }

        .asset-header {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 12px;
        }

        .asset-icon {
          width: 21px;
          height: 21px;
          border-radius: 50%;
          background: linear-gradient(135deg, #26a17b 0%, #1e8a63 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-weight: bold;
          font-size: 12px;
          flex-shrink: 0;
          overflow: hidden;
        }

        .eth-icon {
          background: linear-gradient(135deg, #627eea 0%, #4c68c7 100%);
        }

        .btc-icon {
          background: linear-gradient(135deg, #f7931a 0%, #e07e00 100%);
        }

        .usdc-icon {
          background: linear-gradient(135deg, #2775ca 0%, #1e63b3 100%);
        }

        .asset-name {
          font-size: 14px;
          font-weight: 600;
          color: #333;
          flex: 1;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .asset-details {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          font-size: 12px;
        }

        .asset-column {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          min-width: 100px;
        }

        .asset-label {
          color: #666;
          white-space: nowrap;
          font-size: 11px;
          margin-bottom: 2px;
        }

        .asset-value {
          color: #333;
          font-weight: 500;
          white-space: nowrap;
          font-size: 13px;
        }

        .remove_blue {
          color: inherit;
          text-decoration: none;
        }

        .no-assets {
          text-align: center;
          color: #666;
          padding: 20px;
        }

        /* Placeholder skeleton loading styles */
        .placeholder {
          animation: shimmer 2s infinite linear;
          background: linear-gradient(
            to right,
            #f6f7f8 0%,
            #edeef1 20%,
            #f6f7f8 40%,
            #f6f7f8 100%
          );
          background-size: 800px 104px;
          position: relative;
          overflow: hidden;
        }

        .placeholder-icon,
        .placeholder-text {
          background-color: #e0e0e0;
          border-radius: 4px;
          background: linear-gradient(
            to right,
            #f6f7f8 0%,
            #edeef1 20%,
            #f6f7f8 40%,
            #f6f7f8 100%
          );
          background-size: 800px 104px;
          animation: shimmer 2s infinite linear;
        }

        .placeholder-text {
          height: 12px;
        }

        .placeholder-icon {
          width: 21px;
          height: 21px;
          border-radius: 50%;
        }

        @keyframes shimmer {
          0% {
            background-position: -400px 0;
          }
          100% {
            background-position: 400px 0;
          }
        }

        .placeholder .asset-card {
          background: #f8f9fa;
          border: 1px solid #e9ecef;
        }

        .placeholder .asset-header,
        .placeholder .asset-details {
          opacity: 0.7;
        }

        /* Specific placeholder styles for better visual hierarchy */
        .placeholder .asset-name.placeholder-text {
          margin-left: 8px;
        }

        .placeholder .asset-column {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .placeholder .asset-label.placeholder-text {
          margin-bottom: 2px;
        }

        @media (max-width: 400px) {
          .asset-details {
            flex-direction: column;
            gap: 12px;
          }
          
          .asset-column {
            width: 100%;
            flex-direction: row;
            justify-content: space-between;
          }
          
          .actions-grid {
            gap: 10px;
          }
          
          .action-label {
            font-size: 11px;
          }
          
          .currency-selector-modal {
            padding: 5px 10px;
            min-width: 60px;
          }
          
          .balance-placeholder {
            width: 70%;
          }
          
          .equivalent-placeholder {
            width: 50%;
          }
        }
      `}</style>
    </div>
  );
}

// Export memoized component
export default memo(Wallet);