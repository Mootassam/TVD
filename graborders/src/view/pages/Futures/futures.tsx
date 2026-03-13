import React, { useState, useEffect, useRef, useCallback, useMemo } from "react";
import CoinSelectorSidebar from "src/view/shared/modals/CoinSelectorSidebar";
import FuturesModal from "src/shared/modal/FuturesModal";
import FuturesChart from "./FuturesChart";
import futuresListAction from "src/modules/futures/list/futuresListActions";
import futuresListSelectors from "src/modules/futures/list/futuresListSelectors";
import assetsListAction from "src/modules/assets/list/assetsListActions";
import selector from "src/modules/assets/list/assetsListSelectors";
import { useDispatch, useSelector } from "react-redux";
import FutureList from "./FutureList";
import { i18n } from '../../../i18n';

// ----------------------------------------------------------------------
// Types & Helpers
// ----------------------------------------------------------------------
interface ForexTicker {
  symbol: string;
  price: number;
  changePercent: number;
  high: number;
  low: number;
  volume: number;
  quoteVolume: number;
}

// Base prices for forex pairs
const basePrices: Record<string, number> = {
  EURUSD: 1.0850,
  GBPUSD: 1.2650,
  USDJPY: 148.50,
  AUDUSD: 0.6550,
  USDCAD: 1.3550,
  USDCHF: 0.8750,
  NZDUSD: 0.6050,
  EURGBP: 0.8570,
  EURJPY: 161.20,
  GBPJPY: 188.30,
  AUDJPY: 97.20,
  EURAUD: 1.6550,
  GBPAUD: 1.9300,
  USDMXN: 17.20,
  USDRY: 30.50,
  USDZAR: 18.90,
  USDSGD: 1.3450,
  USDHKD: 7.8200,
  USDKRW: 1330.00,
  USDINR: 83.20,
};

// Currency to country mapping for flags
const currencyToCountry: Record<string, string> = {
  EUR: 'eu', USD: 'us', GBP: 'gb', JPY: 'jp', AUD: 'au', CAD: 'ca',
  CHF: 'ch', NZD: 'nz', MXN: 'mx', TRY: 'tr', ZAR: 'za', SGD: 'sg',
  HKD: 'hk', KRW: 'kr', INR: 'in',
};

// Get decimal places for a symbol (forex convention)
const getDecimalPlaces = (symbol: string): number => {
  if (symbol.includes("JPY") && !symbol.startsWith("JPY")) return 3;
  return 5;
};

// Random walk price change
const randomChange = (current: number, volatility: number = 0.0005): number => {
  const change = (Math.random() * 2 - 1) * volatility;
  return current * (1 + change);
};

// Generate a simulated ticker update
const generateTickerUpdate = (
  symbol: string,
  currentPrice: number
): ForexTicker => {
  const volatility = 0.001; // 0.1% per update
  const newPrice = randomChange(currentPrice, volatility);
  const changePercent = ((newPrice - currentPrice) / currentPrice) * 100;
  const high = Math.max(currentPrice, newPrice) * 1.002;
  const low = Math.min(currentPrice, newPrice) * 0.998;
  const volume = 1000000 + Math.random() * 500000;
  const quoteVolume = newPrice * volume;

  return {
    symbol,
    price: newPrice,
    changePercent,
    high,
    low,
    volume,
    quoteVolume,
  };
};

// Forex pairs list (for sidebar)
const forexPairs = [
  { symbol: "EURUSD", name: "EUR / USD" },
  { symbol: "GBPUSD", name: "GBP / USD" },
  { symbol: "USDJPY", name: "USD / JPY" },
  { symbol: "AUDUSD", name: "AUD / USD" },
  { symbol: "USDCAD", name: "USD / CAD" },
  { symbol: "USDCHF", name: "USD / CHF" },
  { symbol: "NZDUSD", name: "NZD / USD" },
  { symbol: "EURGBP", name: "EUR / GBP" },
  { symbol: "EURJPY", name: "EUR / JPY" },
  { symbol: "GBPJPY", name: "GBP / JPY" },
  { symbol: "AUDJPY", name: "AUD / JPY" },
  { symbol: "EURAUD", name: "EUR / AUD" },
  { symbol: "GBPAUD", name: "GBP / AUD" },
  { symbol: "USDMXN", name: "USD / MXN" },
  { symbol: "USDRY", name: "USD / TRY" },
  { symbol: "USDZAR", name: "USD / ZAR" },
  { symbol: "USDSGD", name: "USD / SGD" },
  { symbol: "USDHKD", name: "USD / HKD" },
  { symbol: "USDKRW", name: "USD / KRW" },
  { symbol: "USDINR", name: "USD / INR" },
];

// Interface for Order data (from Redux)
interface Order {
  id: number;
  pair: string;
  direction: string;
  status: string;
  investment: number;
  openPrice: number;
  openTime: string;
  leverage: number;
  pnl?: number;
  closePrice?: number;
  closeTime?: string;
  currentPrice?: number;
  stopLoss?: number;
  takeProfit?: number;
  orderType: string;
  margin: number;
  fee: number;
}

function Futures() {
  const dispatch = useDispatch();

  // Redux selectors
  const listAssets = useSelector(selector.selectRows);
  const loadingList = useSelector(selector.selectLoading);
  const listFutures = useSelector(futuresListSelectors.selectRows);
  const pendingList = useSelector(futuresListSelectors.pendingRows);
  const pendingCount = useSelector(futuresListSelectors.pendingcount);
  const pendingLoading = useSelector(futuresListSelectors.pendingLoading);
  const futuretLoading = useSelector(futuresListSelectors.selectLoading);
  const countFutures = useSelector(futuresListSelectors.selectCount);

  // State declarations
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tradeDirection, setTradeDirection] = useState<string | null>(null);
  const [isCoinModalOpen, setIsCoinModalOpen] = useState(false);
  const [selectedCoin, setSelectedCoin] = useState("EURUSD");
  const [ticker, setTicker] = useState<ForexTicker>({
    symbol: "EURUSD",
    price: basePrices.EURUSD,
    changePercent: 0,
    high: basePrices.EURUSD * 1.002,
    low: basePrices.EURUSD * 0.998,
    volume: 1000000,
    quoteVolume: basePrices.EURUSD * 1000000,
  });
  const [activeTab, setActiveTab] = useState<"openOrders" | "recentOrders">("openOrders");
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isOrdersLoading, setIsOrdersLoading] = useState(true);
  const [USDBalance, setUSDBalance] = useState<number>(0);
  const [openingOrders, setOpeningOrders] = useState<any[]>([]);

  // Refs
  const tickerInterval = useRef<NodeJS.Timeout | null>(null);
  const currentCoinRef = useRef(selectedCoin);

  // Memoized utility functions
  const safeToFixed = useCallback((value: any, decimals: number = 2): string => {
    if (value === null || value === undefined) return "0.00";
    const num = typeof value === "string" ? parseFloat(value) : value;
    return isNaN(num) ? "0.00" : num.toFixed(decimals);
  }, []);

  const formatNumber = useCallback((num: any, decimals?: number): string => {
    if (num === null || num === undefined) return "0.00";
    const numValue = typeof num === "string" ? parseFloat(num) : num;
    if (isNaN(numValue)) return "0.00";

    const dec = decimals ?? getDecimalPlaces(selectedCoin);
    return numValue.toLocaleString(undefined, {
      minimumFractionDigits: dec,
      maximumFractionDigits: dec,
    });
  }, [selectedCoin]);

  const formatVolume = useCallback((vol: any): string => {
    if (vol === null || vol === undefined) return "0";
    const volumeNum = typeof vol === "string" ? parseFloat(vol) : vol;
    if (isNaN(volumeNum)) return "0";

    if (volumeNum >= 1e9) {
      return (volumeNum / 1e9).toFixed(2) + i18n('pages.marketDetail.volume.billion');
    } else if (volumeNum >= 1e6) {
      return (volumeNum / 1e6).toFixed(2) + i18n('pages.marketDetail.volume.million');
    } else {
      return formatNumber(volumeNum, 0);
    }
  }, [formatNumber]);

  const formatDateTime = useCallback((dateString: string): string => {
    if (!dateString) return i18n('pages.assetsDetail.status.pending');
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return dateString;

      const now = new Date();
      const isToday = date.toDateString() === now.toDateString();

      if (isToday) {
        return i18n('pages.history.dateFormats.today', date.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }));
      } else {
        return i18n('pages.history.dateFormats.yesterday', date.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }));
      }
    } catch (error) {
      console.error("Error formatting date:", error, dateString);
      return dateString;
    }
  }, []);

  const formatDateTimeDetailed = useCallback((dateString: string): string => {
    if (!dateString) return i18n('pages.assetsDetail.status.pending');
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return dateString;

      return `${date.toLocaleDateString([], {
        year: "numeric",
        month: "short",
        day: "numeric",
      })} ${date.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      })}`;
    } catch (error) {
      console.error("Error formatting date:", error, dateString);
      return dateString;
    }
  }, []);

  // Calculate USD balance from assets
  const calculateBalances = useCallback(() => {
    if (listAssets?.length > 0) {
      const USDAsset = listAssets.find((asset: any) => asset.symbol === 'USD');
      setUSDBalance(USDAsset?.amount || 0);
    }
  }, [listAssets]);

  // Current tab data - memoized
  const currentTabData = useMemo(() => {
    if (activeTab === "openOrders") {
      return {
        count: pendingCount,
        loading: pendingLoading,
        list: Array.isArray(pendingList) ? pendingList : []
      };
    } else {
      return {
        count: countFutures,
        loading: futuretLoading,
        list: Array.isArray(listFutures) ? listFutures : []
      };
    }
  }, [activeTab, pendingCount, pendingLoading, pendingList, countFutures, futuretLoading, listFutures]);

  // Flag icon for selected coin
  const flagUrl = useMemo(() => {
    const baseCurrency = selectedCoin.slice(0, 3);
    const countryCode = currencyToCountry[baseCurrency] || baseCurrency.toLowerCase();
    return `https://flagcdn.com/w40/${countryCode}.png`;
  }, [selectedCoin]);

  // Simulate real‑time ticker updates
  useEffect(() => {
    if (!selectedCoin) return;

    let isMounted = true;
    currentCoinRef.current = selectedCoin;

    // Initialize ticker with base price
    const basePrice = basePrices[selectedCoin] || 1.0;
    setTicker({
      symbol: selectedCoin,
      price: basePrice,
      changePercent: 0,
      high: basePrice * 1.002,
      low: basePrice * 0.998,
      volume: 1000000,
      quoteVolume: basePrice * 1000000,
    });

    if (tickerInterval.current) clearInterval(tickerInterval.current);

    tickerInterval.current = setInterval(() => {
      if (!isMounted || currentCoinRef.current !== selectedCoin) return;

      setTicker(prev => generateTickerUpdate(selectedCoin, prev.price));
    }, 3000);

    return () => {
      isMounted = false;
      if (tickerInterval.current) clearInterval(tickerInterval.current);
    };
  }, [selectedCoin]);

  // Simulate loading orders data
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsOrdersLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  // Fetch data on component mount (Redux)
  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        await Promise.all([
          dispatch(futuresListAction.doFetchPending()),
          dispatch(assetsListAction.doFetch())
        ]);
      } catch (error) {
        if (isMounted) console.error("Error fetching data:", error);
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [dispatch]);

  // Calculate balances when assets data changes
  useEffect(() => {
    calculateBalances();
  }, [calculateBalances]);

  // Event handlers
  const handleOpenCoinModal = useCallback(() => {
    setIsCoinModalOpen(true);
  }, []);

  const handleCloseCoinModal = useCallback(() => {
    setIsCoinModalOpen(false);
  }, []);

  const handleSelectCoin = useCallback((coin: string) => {
    setIsLoading(true);
    const basePrice = basePrices[coin] || 1.0;
    setTicker({
      symbol: coin,
      price: basePrice,
      changePercent: 0,
      high: basePrice * 1.002,
      low: basePrice * 0.998,
      volume: 1000000,
      quoteVolume: basePrice * 1000000,
    });
    setSelectedCoin(coin);
    setIsCoinModalOpen(false);
    setIsLoading(false);
  }, []);

  const handleOpenModal = useCallback((direction: string) => {
    dispatch(assetsListAction.doFetch());
    setTradeDirection(direction);
    setIsModalOpen(true);
  }, [dispatch]);

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
    setTradeDirection(null);
  }, []);

  const handleOpenOrderModal = useCallback((order: any) => {
    setSelectedOrder(order);
    setIsOrderModalOpen(true);
  }, []);

  const handleCloseOrderModal = useCallback(() => {
    setIsOrderModalOpen(false);
    setSelectedOrder(null);
  }, []);

  const FetchTab = useCallback((tab: string) => {
    if (tab === "openOrders") {
      setActiveTab("openOrders");
      dispatch(futuresListAction.doFetchPending());
    } else {
      setActiveTab("recentOrders");
      dispatch(futuresListAction.doFetch());
    }
  }, [dispatch]);

  // Loading placeholder component
  const LoadingPlaceholder = useCallback(({
    width = "100%",
    height = "1em"
  }: {
    width?: string;
    height?: string;
  }) => (
    <div className="loading-placeholder" style={{ width, height }} />
  ), []);

  return (
    <div className="container">
      {/* Header Section */}
      <div className="header">
        <div className="header-top">
          <div className="market-info">
            <div className="market-icon">
              <img
                src={flagUrl}
                style={{ width: 30, height: 30, borderRadius: '50%', objectFit: 'cover' }}
                alt={selectedCoin}
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = 'none';
                }}
              />
            </div>
            <div className="market-name">{selectedCoin}</div>
            <div
              className="market-change"
              style={{
                color: ticker.changePercent < 0 ? "#FF6838" : "#00C076",
              }}
            >
              {ticker ? (
                `${ticker.changePercent > 0 ? '+' : ''}${ticker.changePercent.toFixed(2)}%`
              ) : (
                <LoadingPlaceholder width="50px" height="16px" />
              )}
            </div>
          </div>
          <div className="additional-actions" onClick={handleOpenCoinModal}>
            <i className="fas fa-filter" />
          </div>
        </div>
        <div className="market-price">
          {ticker ? (
            `$${formatNumber(ticker.price)}`
          ) : (
            <LoadingPlaceholder width="120px" height="28px" />
          )}
        </div>
        <div className="market-stats">
          <span>
            {i18n('pages.marketDetail.stats.high')}:{" "}
            {ticker ? (
              `$${formatNumber(ticker.high)}`
            ) : (
              <LoadingPlaceholder width="80px" height="12px" />
            )}
          </span>
          <span>
            {i18n('pages.marketDetail.stats.volume')}:{" "}
            {ticker ? (
              `${formatVolume(ticker.volume)} ${selectedCoin.slice(0,3)}`
            ) : (
              <LoadingPlaceholder width="80px" height="12px" />
            )}
          </span>
          <span>
            {i18n('pages.marketDetail.stats.low')}:{" "}
            {ticker ? (
              `$${formatNumber(ticker.low)}`
            ) : (
              <LoadingPlaceholder width="80px" height="12px" />
            )}
          </span>
        </div>
      </div>

      {/* Chart */}
      <FuturesChart symbol={selectedCoin} />

      {/* Action Buttons */}
      <div className="future-action-buttons">
        <button
          className="action-button buy-button"
          onClick={() => handleOpenModal("up")}
        >
          {i18n('pages.futures.actions.buyUp')}
        </button>
        <button
          className="action-button sell-button"
          onClick={() => handleOpenModal("down")}
        >
          {i18n('pages.futures.actions.buyDown')}
        </button>
      </div>

      {/* Tabs */}
      <div className="section-tabs">
        <div
          className={`tab ${activeTab === "openOrders" ? "active" : ""}`}
          onClick={() => FetchTab("openOrders")}
        >
          {i18n('pages.futures.tabs.openOrders')} ({pendingCount || 0})
        </div>
        <div
          className={`tab ${activeTab === "recentOrders" ? "active" : ""}`}
          onClick={() => FetchTab("recentOrders")}
        >
          {i18n('pages.futures.tabs.recentOrders')} ({countFutures || 0})
        </div>
      </div>

      {/* Orders List */}
      <FutureList
        countFutures={currentTabData.count}
        futuretLoading={currentTabData.loading}
        listFutures={currentTabData.list}
        handleOpenOrderModal={handleOpenOrderModal}
        formatNumber={formatNumber}
        formatDateTime={formatDateTime}
      />

      {/* Order Detail Modal */}
      {isOrderModalOpen && selectedOrder && (
        <OrderDetailModal
          selectedOrder={selectedOrder}
          onClose={handleCloseOrderModal}
          formatDateTimeDetailed={formatDateTimeDetailed}
          safeToFixed={safeToFixed}
        />
      )}

      {/* Futures Modal with coin icon */}
      <FuturesModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        direction={tradeDirection}
        dispatch={dispatch}
        listAssets={listAssets}
        selectedCoin={selectedCoin}
        marketPrice={ticker.price.toString()}
        availableBalance={USDBalance}
        setOpeningOrders={setOpeningOrders}
        coinIcon={flagUrl} // pass flag URL for the coin image
      />

      {/* Coin Selector Sidebar (replaces CoinListModal) */}
      <CoinSelectorSidebar
        isOpen={isCoinModalOpen}
        onClose={handleCloseCoinModal}
        selectedCoin={selectedCoin}
        onCoinSelect={handleSelectCoin}
        availableCoins={forexPairs}
        title={i18n('pages.marketDetail.coinSelector.title')}
      />

      {/* Styles */}
      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }

        .container {
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

        .header {
          background-color: #000000;
          padding: 20px 15px 15px;
          position: sticky;
          top: 0;
          z-index: 100;
          border-bottom: 1px solid #2a2a2a;
        }

        .header-top {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 15px;
        }

        .market-info {
          display: flex;
          align-items: center;
        }

        .market-icon {
          width: 30px;
          height: 30px;
          border-radius: 50%;
          background-color: #1c1c1c;
          margin-right: 10px;
          display: flex;
          justify-content: center;
          align-items: center;
          border: 1px solid #2a2a2a;
          overflow: hidden;
        }
        .market-icon img {
          border-radius: 50%;
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .market-name {
          font-weight: bold;
          font-size: 18px;
          margin-right: 10px;
          color: #ffffff;
        }

        .market-change {
          font-size: 14px;
          font-weight: bold;
        }

        .market-price {
          font-size: 24px;
          font-weight: bold;
          margin-bottom: 5px;
          color: #39FF14;
        }

        .market-stats {
          display: flex;
          justify-content: space-between;
          font-size: 12px;
          color: #aaaaaa;
          flex-wrap: wrap;
        }

        .market-stats span {
          margin-right: 10px;
          margin-bottom: 5px;
        }

        .additional-actions {
          color: #aaaaaa;
          font-size: 20px;
          cursor: pointer;
        }
        .additional-actions:hover {
          color: #39FF14;
        }

        .future-action-buttons {
          display: flex;
          gap: 15px;
          margin: 15px;
        }

        .action-button {
          flex: 1;
          padding: 13px;
          border: none;
          font-size: 13px;
          font-weight: bold;
          cursor: pointer;
          border-radius: 6px;
          transition: opacity 0.2s;
        }
        .action-button:hover {
          opacity: 0.9;
        }

        .buy-button {
          background-color: #39FF14;
          color: #000000;
        }

        .sell-button {
          background-color: #ff4d4d;
          color: #ffffff;
        }

        .section-tabs {
          display: flex;
          margin: 15px 15px 0;
          border-bottom: 1px solid #2a2a2a;
        }

        .tab {
          padding: 10px 15px;
          cursor: pointer;
          color: #777;
          font-size: 14px;
          position: relative;
          flex: 1;
          text-align: center;
        }

        .tab.active {
          color: #39FF14;
          font-weight: bold;
        }

        .tab.active::after {
          content: '';
          position: absolute;
          bottom: -1px;
          left: 0;
          right: 0;
          height: 2px;
          background-color: #39FF14;
        }

        .orders-container {
          margin: 15px;
        }

        .order-card {
          background-color: #1c1c1c;
          border: 1px solid #2a2a2a;
          border-radius: 8px;
          padding: 15px;
          margin-bottom: 15px;
          cursor: pointer;
          transition: transform 0.2s, border-color 0.2s;
        }
        .order-card.loading {
          cursor: default;
        }
        .order-card:hover:not(.loading) {
          transform: translateY(-2px);
          border-color: #39FF14;
        }

        .order-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 8px;
        }

        .order-pair {
          font-weight: bold;
          font-size: 16px;
          color: #ffffff;
        }

        .order-direction {
          font-size: 12px;
          padding: 4px 8px;
          border-radius: 4px;
          font-weight: bold;
        }
        .order-direction.buy {
          background-color: rgba(57, 255, 20, 0.2);
          color: #39FF14;
        }
        .order-direction.sell {
          background-color: rgba(255, 77, 77, 0.2);
          color: #ff4d4d;
        }

        .order-status {
          font-size: 12px;
          margin-bottom: 12px;
        }
        .order-status.open {
          color: #39FF14;
        }
        .order-status.closed {
          color: #777;
        }

        .order-details {
          border-top: 1px solid #2a2a2a;
          padding-top: 12px;
        }

        .order-row {
          display: flex;
          justify-content: space-between;
          margin-bottom: 8px;
          font-size: 13px;
        }

        .order-label {
          color: #aaaaaa;
        }

        .order-value {
          font-weight: 500;
          color: #ffffff;
        }
        .order-value.buy {
          color: #39FF14;
        }
        .order-value.sell {
          color: #ff4d4d;
        }

        .no-orders {
          text-align: center;
          padding: 30px 0;
          color: #777;
        }
        .no-orders i {
          font-size: 24px;
          margin-bottom: 10px;
          opacity: 0.5;
          color: #39FF14;
        }

        .loading-placeholder {
          animation: pulse 1.5s ease-in-out infinite;
          background-color: #2a2a2a;
          border-radius: 4px;
        }

        @keyframes pulse {
          0% { opacity: 1; }
          50% { opacity: 0.5; }
          100% { opacity: 1; }
        }

        .modal-overlays {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: rgba(0, 0, 0, 0.8);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 1000;
          padding: 20px;
        }

        .modal-content {
          background-color: #1c1c1c;
          border-radius: 12px;
          width: 100%;
          max-width: 400px;
          max-height: 80vh;
          overflow-y: auto;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
          border: 1px solid #2a2a2a;
        }

        .modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 20px;
          border-bottom: 1px solid #2a2a2a;
        }

        .modal-header h2 {
          font-size: 18px;
          font-weight: bold;
          color: #ffffff;
        }

        .modal-close {
          background: none;
          border: none;
          color: #aaaaaa;
          font-size: 20px;
          cursor: pointer;
        }
        .modal-close:hover {
          color: #39FF14;
        }

        .modal-body {
          padding: 20px;
        }

        .modal-footer {
          display: flex;
          justify-content: flex-end;
          padding: 20px;
          border-top: 1px solid #2a2a2a;
          gap: 10px;
        }

        .modal-button {
          background-color: #2a2a2a;
          color: white;
          border: none;
          border-radius: 6px;
          padding: 10px 20px;
          cursor: pointer;
          font-weight: bold;
        }
        .modal-button:hover {
          background-color: #39FF14;
          color: #000000;
        }

        .close-order-button {
          background-color: #ff4d4d;
          color: white;
          border: none;
          border-radius: 6px;
          padding: 10px 20px;
          cursor: pointer;
          font-weight: bold;
        }
        .close-order-button:hover {
          background-color: #ff3333;
        }

        .order-detail-section {
          margin-bottom: 20px;
        }

        .order-detail-section h3 {
          font-size: 14px;
          color: #aaaaaa;
          margin-bottom: 12px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .detail-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 10px;
        }

        .detail-pair {
          font-weight: bold;
          font-size: 18px;
          color: #ffffff;
        }

        .detail-direction {
          font-size: 14px;
          padding: 4px 8px;
          border-radius: 4px;
          font-weight: bold;
        }
        .detail-direction.buy {
          background-color: rgba(57, 255, 20, 0.2);
          color: #39FF14;
        }
        .detail-direction.sell {
          background-color: rgba(255, 77, 77, 0.2);
          color: #ff4d4d;
        }

        .detail-status {
          font-size: 14px;
          margin-bottom: 15px;
        }
        .detail-status.open {
          color: #39FF14;
        }
        .detail-status.closed {
          color: #777;
        }

        .detail-row {
          display: flex;
          justify-content: space-between;
          margin-bottom: 10px;
          font-size: 14px;
        }

        .detail-label {
          color: #aaaaaa;
        }

        .detail-value {
          font-weight: 500;
          color: #ffffff;
        }
        .detail-value.profit {
          color: #39FF14;
        }
        .detail-value.loss {
          color: #ff4d4d;
        }
      `}</style>
    </div>
  );
}

// Extracted Order Detail Modal Component
const OrderDetailModal = ({
  selectedOrder,
  onClose,
  formatDateTimeDetailed,
  safeToFixed
}: any) => (
  <div className="modal-overlays" onClick={onClose}>
    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
      <div className="modal-header">
        <h2>{i18n('pages.futures.orderDetails.title')}</h2>
        <button className="modal-close" onClick={onClose}>
          <i className="fas fa-times" />
        </button>
      </div>
      <div className="modal-body">
        <div className="order-detail-section">
          <div className="detail-header">
            <span className="detail-pair">
              {selectedOrder.symbol || selectedOrder.pair}
            </span>
            <span
              className={`detail-direction ${selectedOrder.futuresStatus === "long" || selectedOrder.direction === "BUY UP"
                ? "buy"
                : "sell"
                }`}
            >
              {selectedOrder.futuresStatus === "long"
                ? i18n('pages.futures.actions.buyUp')
                : selectedOrder.futuresStatus === "short"
                  ? i18n('pages.futures.actions.buyDown')
                  : selectedOrder.direction}
            </span>
          </div>
          <div
            className={`detail-status ${selectedOrder.finalized ? "closed" : "open"
              }`}
          >
            ● {selectedOrder.finalized ? i18n('pages.futures.orderDetails.closed') : i18n('pages.futures.orderDetails.open')}
          </div>
        </div>

        <div className="order-detail-section">
          <OrderDetailRow label={i18n('pages.futures.orderDetails.futuresAmount')} value={`${selectedOrder.futuresAmount || selectedOrder.investment} USD`} />

          {selectedOrder.contractDuration && (
            <OrderDetailRow label={i18n('pages.futures.orderDetails.contractDuration')} value={`${selectedOrder.contractDuration} ${i18n('pages.futures.orderDetails.seconds')}`} />
          )}

          <OrderDetailRow
            label={i18n('pages.futures.orderDetails.futuresStatus')}
            value={selectedOrder.closePositionTime ? i18n('pages.futures.orderDetails.completed') : i18n('pages.futures.orderDetails.open')}
          />
          <OrderDetailRow
            label={i18n('pages.futures.orderDetails.openPositionPrice')}
            value={selectedOrder.openPositionPrice || selectedOrder.openPrice}
          />
          <OrderDetailRow
            label={i18n('pages.futures.orderDetails.openPositionTime')}
            value={formatDateTimeDetailed(selectedOrder.openPositionTime || selectedOrder.openTime)}
          />

          {selectedOrder.closePositionPrice && (
            <OrderDetailRow label={i18n('pages.futures.orderDetails.closePositionPrice')} value={selectedOrder.closePositionPrice} />
          )}

          {selectedOrder.closePositionTime && (
            <OrderDetailRow
              label={i18n('pages.futures.orderDetails.closePositionTime')}
              value={formatDateTimeDetailed(selectedOrder.closePositionTime)}
            />
          )}

          <OrderDetailRow
            label={i18n('pages.futures.orderDetails.profitLossAmount')}
            value={
              (selectedOrder.profitAndLossAmount || selectedOrder.pnl)
                ? `${safeToFixed(selectedOrder.profitAndLossAmount || selectedOrder.pnl, 2)} USD`
                : "__"
            }
            className={selectedOrder.control === "profit" ? "profit" : "loss"}
          />

          <OrderDetailRow label={i18n('pages.futures.orderDetails.leverage')} value={`${selectedOrder.leverage}X`} />
        </div>
      </div>
      <div className="modal-footer">
        <button className="modal-button" onClick={onClose}>
          {i18n('pages.futures.orderDetails.done')}
        </button>
      </div>
    </div>
  </div>
);

const OrderDetailRow = ({ label, value, className = "" }: any) => (
  <div className="detail-row">
    <span className="detail-label">{label}</span>
    <span className={`detail-value ${className}`}>{value}</span>
  </div>
);

export default Futures;