import React, { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { useHistory, useParams } from "react-router-dom";
import FuturesChart from "../Futures/FuturesChart";
import { i18n } from "../../../i18n";
import CoinSelectorSidebar from "src/view/shared/modals/CoinSelectorSidebar";

// ----------------------------------------------------------------------
// Types
// ----------------------------------------------------------------------
interface ForexTrade {
  id: string;
  price: number;
  quantity: number;
  time: number;
  side: 'buy' | 'sell';
}

interface ForexOrderBook {
  bids: [number, number][];
  asks: [number, number][];
  lastUpdateId: number;
}

interface Coin {
  symbol: string;
  name: string;
  baseCurrency: string;
  quoteCurrency: string;
}

// Grouped market stats for atomic updates (reduces renders)
interface MarketStats {
  price: number | null;
  changePercent: number | null;
  high: number | null;
  low: number | null;
  volume: number | null;
  quoteVolume: number | null;
}

// ----------------------------------------------------------------------
// Helper: map currency to country code for flag (ISO 3166-1 alpha-2)
// ----------------------------------------------------------------------
const currencyToCountry: Record<string, string> = {
  EUR: 'eu', USD: 'us', GBP: 'gb', JPY: 'jp', AUD: 'au', CAD: 'ca',
  CHF: 'ch', NZD: 'nz', MXN: 'mx', TRY: 'tr', ZAR: 'za', SGD: 'sg',
  HKD: 'hk', KRW: 'kr', INR: 'in',
};

// ----------------------------------------------------------------------
// Main Component
// ----------------------------------------------------------------------
function MarketDetail() {
  const history = useHistory();
  const { id } = useParams<{ id: string }>();

  // Grouped stats – single object to batch updates
  const [marketStats, setMarketStats] = useState<MarketStats>({
    price: null,
    changePercent: null,
    high: null,
    low: null,
    volume: null,
    quoteVolume: null,
  });

  const [recentTrades, setRecentTrades] = useState<ForexTrade[]>([]);
  const [orderBook, setOrderBook] = useState<ForexOrderBook | null>(null);
  const [selectedCoin, setSelectedCoin] = useState(id || "EURUSD");
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'orderBook' | 'transactions'>('orderBook');
  const [showCoinSelector, setShowCoinSelector] = useState(false);

  // Refs for intervals and current coin
  const updateInterval = useRef<NodeJS.Timeout | null>(null);
  const currentCoinRef = useRef<string>(selectedCoin);
  const isComponentMounted = useRef(true);

  // ----------------------------------------------------------------------
  // Available forex pairs (same as before)
  // ----------------------------------------------------------------------
  const availableCoins: Coin[] = [
    { symbol: "EURUSD", name: "EUR / USD", baseCurrency: "EUR", quoteCurrency: "USD" },
    { symbol: "GBPUSD", name: "GBP / USD", baseCurrency: "GBP", quoteCurrency: "USD" },
    { symbol: "USDJPY", name: "USD / JPY", baseCurrency: "USD", quoteCurrency: "JPY" },
    { symbol: "AUDUSD", name: "AUD / USD", baseCurrency: "AUD", quoteCurrency: "USD" },
    { symbol: "USDCAD", name: "USD / CAD", baseCurrency: "USD", quoteCurrency: "CAD" },
    { symbol: "USDCHF", name: "USD / CHF", baseCurrency: "USD", quoteCurrency: "CHF" },
    { symbol: "NZDUSD", name: "NZD / USD", baseCurrency: "NZD", quoteCurrency: "USD" },
    { symbol: "EURGBP", name: "EUR / GBP", baseCurrency: "EUR", quoteCurrency: "GBP" },
    { symbol: "EURJPY", name: "EUR / JPY", baseCurrency: "EUR", quoteCurrency: "JPY" },
    { symbol: "GBPJPY", name: "GBP / JPY", baseCurrency: "GBP", quoteCurrency: "JPY" },
    { symbol: "AUDJPY", name: "AUD / JPY", baseCurrency: "AUD", quoteCurrency: "JPY" },
    { symbol: "EURAUD", name: "EUR / AUD", baseCurrency: "EUR", quoteCurrency: "AUD" },
    { symbol: "GBPAUD", name: "GBP / AUD", baseCurrency: "GBP", quoteCurrency: "AUD" },
    { symbol: "USDMXN", name: "USD / MXN", baseCurrency: "USD", quoteCurrency: "MXN" },
    { symbol: "USDRY", name: "USD / TRY", baseCurrency: "USD", quoteCurrency: "TRY" },
    { symbol: "USDZAR", name: "USD / ZAR", baseCurrency: "USD", quoteCurrency: "ZAR" },
    { symbol: "USDSGD", name: "USD / SGD", baseCurrency: "USD", quoteCurrency: "SGD" },
    { symbol: "USDHKD", name: "USD / HKD", baseCurrency: "USD", quoteCurrency: "HKD" },
    { symbol: "USDKRW", name: "USD / KRW", baseCurrency: "USD", quoteCurrency: "KRW" },
    { symbol: "USDINR", name: "USD / INR", baseCurrency: "USD", quoteCurrency: "INR" },
  ];

  // ----------------------------------------------------------------------
  // Base prices (same as FuturesChart)
  // ----------------------------------------------------------------------
  const getBasePrice = useCallback((symbol: string): number => {
    const basePrices: Record<string, number> = {
      EURUSD: 1.0850, GBPUSD: 1.2650, USDJPY: 148.50, AUDUSD: 0.6550,
      USDCAD: 1.3550, USDCHF: 0.8750, NZDUSD: 0.6050, EURGBP: 0.8570,
      EURJPY: 161.20, GBPJPY: 188.30, AUDJPY: 97.20, EURAUD: 1.6550,
      GBPAUD: 1.9300, USDMXN: 17.20, USDRY: 30.50, USDZAR: 18.90,
      USDSGD: 1.3450, USDHKD: 7.8200, USDKRW: 1330.00, USDINR: 83.20,
    };
    return basePrices[symbol] || 1.0;
  }, []);

  // ----------------------------------------------------------------------
  // Decimal places (forex convention)
  // ----------------------------------------------------------------------
  const getDecimalPlaces = useCallback((symbol: string): number => {
    if (symbol.includes("JPY") && !symbol.startsWith("JPY")) return 3;
    return 5;
  }, []);

  const formatNumber = useCallback((num: number, symbol?: string): string => {
    if (num === null || isNaN(num)) return "0.00000";
    const decimals = symbol ? getDecimalPlaces(symbol) : 5;
    return num.toFixed(decimals);
  }, [getDecimalPlaces]);

  const formatVolume = useCallback((vol: number): string => {
    if (vol === null || isNaN(vol)) return "0.00";
    if (vol >= 1000000) return (vol / 1000000).toFixed(2) + "M";
    if (vol >= 1000) return (vol / 1000).toFixed(2) + "K";
    return vol.toFixed(2);
  }, []);

  // ----------------------------------------------------------------------
  // Random walk – use same volatility as chart's 1m (0.01% per tick)
  // ----------------------------------------------------------------------
  const randomWalk = useCallback((current: number): number => {
    const volatility = 0.0001; // 0.01% – matches FuturesChart 1m
    const change = (Math.random() * 2 - 1) * volatility;
    return current * (1 + change);
  }, []);

  // ----------------------------------------------------------------------
  // Generate order book mock data
  // ----------------------------------------------------------------------
  const generateOrderBook = useCallback((price: number, symbol: string): ForexOrderBook => {
    const decimals = getDecimalPlaces(symbol);
    const spread = price * 0.0002; // 0.02% spread
    const bids: [number, number][] = [];
    const asks: [number, number][] = [];

    for (let i = 0; i < 10; i++) {
      const bidPrice = price - spread * (i + 1) * (0.5 + Math.random() * 0.5);
      const askPrice = price + spread * (i + 1) * (0.5 + Math.random() * 0.5);
      const quantity = Math.random() * 1000000 + 500000;
      bids.push([Number(bidPrice.toFixed(decimals)), Number(quantity.toFixed(2))]);
      asks.push([Number(askPrice.toFixed(decimals)), Number(quantity.toFixed(2))]);
    }
    bids.sort((a, b) => b[0] - a[0]);
    asks.sort((a, b) => a[0] - b[0]);

    return { lastUpdateId: Date.now(), bids, asks };
  }, [getDecimalPlaces]);

  // ----------------------------------------------------------------------
  // Generate recent trades
  // ----------------------------------------------------------------------
  const generateTrades = useCallback((price: number, symbol: string, count: number = 10): ForexTrade[] => {
    const trades: ForexTrade[] = [];
    const decimals = getDecimalPlaces(symbol);
    const now = Date.now();
    for (let i = 0; i < count; i++) {
      const side = Math.random() > 0.5 ? 'buy' : 'sell';
      const variation = (Math.random() * 2 - 1) * 0.0001 * price;
      const tradePrice = price + variation;
      const quantity = Math.random() * 100000 + 50000;
      trades.push({
        id: `${now - i * 1000}-${i}`,
        price: Number(tradePrice.toFixed(decimals)),
        quantity: Number(quantity.toFixed(2)),
        time: now - i * 1000,
        side,
      });
    }
    return trades.sort((a, b) => b.time - a.time);
  }, [getDecimalPlaces]);

  // ----------------------------------------------------------------------
  // Update all market data in a single batch
  // ----------------------------------------------------------------------
  const updateMarketData = useCallback((symbol: string) => {
    setMarketStats(prev => {
      const basePrice = prev.price ?? getBasePrice(symbol);
      const newPrice = randomWalk(basePrice);
      const changePercent = ((newPrice - basePrice) / basePrice) * 100;

      // Approximate 24h high/low using a simple multiplier
      const high = Math.max(newPrice * 1.002, basePrice * 1.002);
      const low = Math.min(newPrice * 0.998, basePrice * 0.998);
      const volume = 1000000 + Math.random() * 500000;
      const quoteVolume = newPrice * volume;

      // Update order book and trades (separate state, but that's fine)
      setOrderBook(generateOrderBook(newPrice, symbol));
      setRecentTrades(generateTrades(newPrice, symbol, 10));

      return {
        price: newPrice,
        changePercent,
        high,
        low,
        volume,
        quoteVolume,
      };
    });
  }, [randomWalk, generateOrderBook, generateTrades, getBasePrice]);

  // ----------------------------------------------------------------------
  // Initialize data for a symbol
  // ----------------------------------------------------------------------
  const initializeData = useCallback((symbol: string) => {
    const basePrice = getBasePrice(symbol);
    setMarketStats({
      price: basePrice,
      changePercent: 0,
      high: basePrice * 1.002,
      low: basePrice * 0.998,
      volume: 1000000,
      quoteVolume: basePrice * 1000000,
    });
    setOrderBook(generateOrderBook(basePrice, symbol));
    setRecentTrades(generateTrades(basePrice, symbol, 10));
    setIsLoading(false);
  }, [getBasePrice, generateOrderBook, generateTrades]);

  // ----------------------------------------------------------------------
  // Handle coin change from URL
  // ----------------------------------------------------------------------
  useEffect(() => {
    if (id && id !== selectedCoin) {
      setSelectedCoin(id);
      currentCoinRef.current = id;
      setIsLoading(true);
      initializeData(id);
    }
  }, [id, selectedCoin, initializeData]);

  // ----------------------------------------------------------------------
  // Main effect: set up data and interval updates (now every 1 second)
  // ----------------------------------------------------------------------
  useEffect(() => {
    const coin = selectedCoin;
    if (!coin) return;

    isComponentMounted.current = true;
    currentCoinRef.current = coin;

    initializeData(coin);

    if (updateInterval.current) clearInterval(updateInterval.current);
    updateInterval.current = setInterval(() => {
      if (isComponentMounted.current && currentCoinRef.current === coin) {
        updateMarketData(coin);
      }
    }, 1000); // ⬅️ now 1 second to match chart ticks

    return () => {
      isComponentMounted.current = false;
      if (updateInterval.current) {
        clearInterval(updateInterval.current);
        updateInterval.current = null;
      }
    };
  }, [selectedCoin, initializeData, updateMarketData]);

  // ----------------------------------------------------------------------
  // Handlers
  // ----------------------------------------------------------------------
  const goBack = useCallback(() => history.goBack(), [history]);

  const handleCoinSelect = (coinSymbol: string) => {
    if (coinSymbol === selectedCoin) {
      setShowCoinSelector(false);
      return;
    }
    history.push(`/market/detail/${coinSymbol}`);
  };

  const toggleCoinSelector = () => setShowCoinSelector(prev => !prev);

  // Derive current coin object
  const currentCoin = useMemo(() => {
    return availableCoins.find(c => c.symbol === selectedCoin) || {
      symbol: selectedCoin,
      name: selectedCoin.replace(/(.{3})(.{3})/, "$1 / $2"),
      baseCurrency: selectedCoin.slice(0, 3),
      quoteCurrency: selectedCoin.slice(3),
    };
  }, [selectedCoin]);

  // ----------------------------------------------------------------------
  // Loading placeholder component
  // ----------------------------------------------------------------------
  const LoadingPlaceholder = useCallback(({ width = "100%", height = "1em" }: { width?: string; height?: string }) => (
    <div className="loading-placeholder" style={{ width, height }} />
  ), []);

  // ----------------------------------------------------------------------
  // Memoized order book data with heat map intensities
  // ----------------------------------------------------------------------
  const orderBookData = useMemo(() => {
    if (!orderBook || !orderBook.bids.length || !orderBook.asks.length) {
      return { buySide: [], sellSide: [] };
    }

    const calculateIntensity = (orders: [number, number][]) => {
      if (!orders.length) return [];
      const quantities = orders.map(o => o[1]);
      const maxQty = Math.max(...quantities);
      const minQty = Math.min(...quantities);

      return orders.slice(0, 10).map(order => {
        const qty = order[1];
        let intensity = maxQty > minQty ? ((qty - minQty) / (maxQty - minQty)) * 100 : 0;
        intensity = Math.max(intensity, 10);
        return {
          amount: formatVolume(qty),
          price: formatNumber(order[0], selectedCoin),
          intensity: Math.min(intensity, 95),
        };
      });
    };

    const buySide = calculateIntensity(orderBook.bids);
    const sellSide = calculateIntensity(orderBook.asks);

    while (buySide.length < 10) buySide.push({ amount: "0.00", price: "0.00000", intensity: 10 });
    while (sellSide.length < 10) sellSide.push({ amount: "0.00", price: "0.00000", intensity: 10 });

    return { buySide, sellSide };
  }, [orderBook, selectedCoin, formatNumber, formatVolume]);

  // Destructure marketStats for easier use in JSX
  const { price, changePercent, high, low, volume, quoteVolume } = marketStats;

  // ----------------------------------------------------------------------
  // Render (identical JSX, only reading from grouped stats)
  // ----------------------------------------------------------------------
  return (
    <div className="market-detail-container">
      {/* Header Section */}
      <div className="header">
        <div className="nav-bar">
          <div className="back-arrow" onClick={goBack}>
            <i className="fas fa-arrow-left"></i>
          </div>
          <div className="trading-pair" onClick={toggleCoinSelector}>
            <div className="pair-flag">
              <img
                src={`https://flagcdn.com/w40/${currencyToCountry[currentCoin.baseCurrency] || currentCoin.baseCurrency.toLowerCase()}.png`}
                alt={currentCoin.baseCurrency}
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  const parent = target.parentElement;
                  if (parent) parent.innerText = currentCoin.baseCurrency;
                }}
              />
            </div>
            {currentCoin.name}
            <i className={`fas fa-chevron-down dropdown-arrow ${showCoinSelector ? 'rotate' : ''}`}></i>
          </div>
          <div className="header-icon" onClick={toggleCoinSelector}>
            <i className="fas fa-bars"></i>
          </div>
        </div>
      </div>

      {/* Coin Selector Sidebar */}
      <CoinSelectorSidebar
        isOpen={showCoinSelector}
        onClose={() => setShowCoinSelector(false)}
        selectedCoin={selectedCoin}
        onCoinSelect={handleCoinSelect}
        availableCoins={availableCoins.map(c => ({ symbol: c.symbol, name: c.name }))}
        title={i18n("pages.marketDetail.coinSelector.title")}
      />

      {/* Price Section */}
      <div className="price-section">
        <div className="price-main-row">
          <div className="price-left-section">
            <div className="current-price">
              {price !== null ? (
                <span style={{ color: changePercent !== null && changePercent < 0 ? '#f56c6c' : '#37b66a' }}>
                  {formatNumber(price, selectedCoin)}
                </span>
              ) : (
                <LoadingPlaceholder width="120px" height="28px" />
              )}
            </div>
            <div className="price-info-row">
              <div className="usd-price">
                {price !== null ? `$${price.toFixed(2)}` : '$0.00'}
              </div>
              <div className="price-change" style={{
                color: changePercent !== null && changePercent < 0 ? '#f56c6c' : '#37b66a'
              }}>
                {changePercent !== null ? (
                  `${changePercent < 0 ? '−' : '+'}${Math.abs(changePercent).toFixed(2)}%`
                ) : (
                  <LoadingPlaceholder width="60px" height="16px" />
                )}
              </div>
            </div>
          </div>

          <div className="stats-grid">
            <div className="stat-row">
              <div className="stat-item">
                <div className="stat-label">{i18n("pages.marketDetail.stats.high")}</div>
                <div className="stat-value">
                  {high !== null ? formatNumber(high, selectedCoin) : <LoadingPlaceholder width="60px" height="12px" />}
                </div>
              </div>
              <div className="stat-item">
                <div className="stat-label">
                  {i18n("pages.marketDetail.stats.volume")}({currentCoin.baseCurrency})
                </div>
                <div className="stat-value">
                  {volume !== null ? formatVolume(volume) : <LoadingPlaceholder width="60px" height="12px" />}
                </div>
              </div>
            </div>
            <div className="stat-row">
              <div className="stat-item">
                <div className="stat-label">{i18n("pages.marketDetail.stats.low")}</div>
                <div className="stat-value">
                  {low !== null ? formatNumber(low, selectedCoin) : <LoadingPlaceholder width="60px" height="12px" />}
                </div>
              </div>
              <div className="stat-item">
                <div className="stat-label">
                  {i18n("pages.marketDetail.stats.volume")}({currentCoin.quoteCurrency})
                </div>
                <div className="stat-value">
                  {quoteVolume !== null ? formatVolume(quoteVolume) : <LoadingPlaceholder width="60px" height="12px" />}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Chart Section */}
      <div className="chart-section">
        <FuturesChart key={selectedCoin} symbol={selectedCoin} />
      </div>

      {/* Tabs Section (unchanged) */}
      <div className="tabs-section">
        <div className="tabs-header">
          <div
            className={`tab ${activeTab === 'orderBook' ? 'active' : ''}`}
            onClick={() => setActiveTab('orderBook')}
          >
            {i18n("pages.marketDetail.tabs.orderBook")}
          </div>
          <div
            className={`tab ${activeTab === 'transactions' ? 'active' : ''}`}
            onClick={() => setActiveTab('transactions')}
          >
            {i18n("pages.marketDetail.tabs.transactions")}
          </div>
        </div>

        <div className="tab-content">
          {/* Order Book Content */}
          {activeTab === 'orderBook' && (
            <div className="modern-order-book">
              <div className="order-book-table">
                <div className="table-header">
                  <div className="buy-section">
                    <div className="column-header">{i18n("pages.marketDetail.orderBook.buy")}</div>
                    <div className="column-header">{i18n("pages.marketDetail.orderBook.quantity")}</div>
                    <div className="column-header">{i18n("pages.marketDetail.orderBook.price")}</div>
                  </div>
                  <div className="sell-section">
                    <div className="column-header">{i18n("pages.marketDetail.orderBook.price")}</div>
                    <div className="column-header">{i18n("pages.marketDetail.orderBook.quantity")}</div>
                    <div className="column-header" style={{ textAlign: 'right' }}>
                      {i18n("pages.marketDetail.orderBook.sell")}
                    </div>
                  </div>
                </div>

                <div className="table-body">
                  {orderBookData.buySide.map((buyOrder, index) => {
                    const sellOrder = orderBookData.sellSide[index] || { amount: '0.00', price: '0.00000', intensity: 10 };
                    return (
                      <div key={index} className="table-row">
                        <div className="buy-section">
                          <div className="cell buy-cell">{index + 1}</div>
                          <div className="cell quantity">{buyOrder.amount}</div>
                          <div className="cell price-cell">
                            <div className="heatmap-bar buy-heatmap" style={{ width: `${buyOrder.intensity}%` }}></div>
                            <span className="price-value buy-price">{buyOrder.price}</span>
                          </div>
                        </div>
                        <div className="sell-section">
                          <div className="cell price-cell">
                            <div className="heatmap-bar sell-heatmap" style={{ width: `${sellOrder.intensity}%` }}></div>
                            <span className="price-value sell-price">{sellOrder.price}</span>
                          </div>
                          <div className="cell quantity">{sellOrder.amount}</div>
                          <div className="cell sell-cell">{index + 1}</div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* Latest Transactions Content */}
          {activeTab === 'transactions' && (
            <div className="transactions-container">
              <div className="transactions-header">
                <div className="header-item">{i18n("pages.marketDetail.recentTrades.time")}</div>
                <div className="header-item">{i18n("pages.marketDetail.recentTrades.price")}</div>
                <div className="header-item">{i18n("pages.marketDetail.recentTrades.amount")}</div>
              </div>
              <div className="transactions-list">
                {recentTrades.length > 0 ? (
                  recentTrades.slice(0, 10).map((trade) => (
                    <div key={trade.id} className="transaction-item">
                      <div className="transaction-time">
                        {new Date(trade.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                      </div>
                      <div className={`transaction-price ${trade.side === 'buy' ? 'buy' : 'sell'}`}>
                        {formatNumber(trade.price, selectedCoin)}
                      </div>
                      <div className="transaction-amount">{formatVolume(trade.quantity)}</div>
                    </div>
                  ))
                ) : (
                  Array.from({ length: 5 }).map((_, index) => (
                    <div key={index} className="transaction-item">
                      <div className="transaction-time"><LoadingPlaceholder width="50px" height="14px" /></div>
                      <div className="transaction-price"><LoadingPlaceholder width="60px" height="14px" /></div>
                      <div className="transaction-amount"><LoadingPlaceholder width="50px" height="14px" /></div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>
      </div>


      <style>{`
        /* Market Detail Container – matches login/profile containers */
        .market-detail-container {
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
          justify-content: space-between;
        }
        .back-arrow {
          color: #ffffff;
          font-size: 20px;
          cursor: pointer;
        }
        .back-arrow:hover {
          color: #39FF14;
        }
        .trading-pair {
          font-size: 18px;
          font-weight: 500;
          color: #ffffff;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .trading-pair:hover {
          color: #39FF14;
        }
        .pair-flag {
          width: 24px;
          height: 24px;
          border-radius: 50%;
          overflow: hidden;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          background-color: #2a2a2a;
        }
        .pair-flag img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .dropdown-arrow {
          font-size: 14px;
          transition: transform 0.2s;
        }
        .dropdown-arrow.rotate {
          transform: rotate(180deg);
        }
        .header-icon {
          color: #ffffff;
          font-size: 20px;
          cursor: pointer;
        }
        .header-icon:hover {
          color: #39FF14;
        }

        /* Price Section */
        .price-section {
          padding: 16px 20px;
          background-color: #000000;
        }
        .price-main-row {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .price-left-section {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        .current-price {
          font-size: 28px;
          font-weight: 600;
        }
        .price-info-row {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .usd-price {
          font-size: 14px;
          color: #aaaaaa;
        }
        .price-change {
          font-size: 14px;
          font-weight: 500;
        }

        /* Stats Grid */
        .stats-grid {
          display: flex;
          flex-direction: column;
          gap: 12px;
          background-color: #1c1c1c;
          border-radius: 12px;
          padding: 16px;
          border: 1px solid #2a2a2a;
        }
        .stat-row {
          display: flex;
          justify-content: space-between;
        }
        .stat-item {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        .stat-label {
          font-size: 12px;
          color: #777777;
        }
        .stat-value {
          font-size: 14px;
          font-weight: 500;
          color: #ffffff;
        }

        /* Chart Section */
        .chart-section {
          margin: 0 20px 20px;
          background-color: #1c1c1c;
          border-radius: 12px;
          border: 1px solid #2a2a2a;
          overflow: hidden;
        }

        /* Tabs Section */
        .tabs-section {
          margin: 0 20px 20px;
          background-color: #1c1c1c;
          border-radius: 12px;
          border: 1px solid #2a2a2a;
          overflow: hidden;
        }
        .tabs-header {
          display: flex;
          border-bottom: 1px solid #2a2a2a;
        }
        .tab {
          flex: 1;
          padding: 14px;
          text-align: center;
          font-size: 14px;
          font-weight: 500;
          color: #777777;
          cursor: pointer;
          transition: all 0.2s;
        }
        .tab.active {
          color: #39FF14;
          border-bottom: 2px solid #39FF14;
        }
        .tab:hover:not(.active) {
          color: #ffffff;
        }
        .tab-content {
          padding: 16px;
        }

        /* Order Book Table */
        .modern-order-book {
          width: 100%;
        }
        .order-book-table {
          display: flex;
          flex-direction: column;
        }
        .table-header {
          display: flex;
          margin-bottom: 12px;
          font-size: 12px;
          color: #777777;
        }
        .buy-section {
          flex: 1;
          display: flex;
          gap: 8px;
        }
        .sell-section {
          flex: 1;
          display: flex;
          gap: 8px;
        }
        .column-header {
          flex: 1;
          text-align: left;
        }
        .table-body {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        .table-row {
          display: flex;
          align-items: center;
          font-size: 13px;
        }
        .cell {
          flex: 1;
          text-align: left;
          padding: 4px 0;
        }
        .price-cell {
          position: relative;
          display: flex;
          align-items: center;
        }
        .heatmap-bar {
          position: absolute;
          left: 0;
          height: 100%;
          opacity: 0.2;
          z-index: 0;
          border-radius: 2px;
        }
        .buy-heatmap {
          background-color: #39FF14;
        }
        .sell-heatmap {
          background-color: #ff4d4d;
        }
        .price-value {
          position: relative;
          z-index: 1;
        }
        .buy-price {
          color: #39FF14;
        }
        .sell-price {
          color: #ff4d4d;
        }
        .buy-cell, .sell-cell {
          color: #777777;
          font-size: 11px;
        }

        /* Transactions */
        .transactions-container {
          width: 100%;
        }
        .transactions-header {
          display: flex;
          justify-content: space-between;
          padding: 8px 0;
          font-size: 12px;
          color: #777777;
          border-bottom: 1px solid #2a2a2a;
          margin-bottom: 8px;
        }
        .header-item {
          flex: 1;
          text-align: left;
        }
        .transactions-list {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .transaction-item {
          display: flex;
          justify-content: space-between;
          padding: 8px 0;
          font-size: 13px;
          border-bottom: 1px solid #2a2a2a;
        }
        .transaction-time {
          flex: 1;
          color: #aaaaaa;
        }
        .transaction-price {
          flex: 1;
          font-weight: 500;
        }
        .transaction-price.buy {
          color: #39FF14;
        }
        .transaction-price.sell {
          color: #ff4d4d;
        }
        .transaction-amount {
          flex: 1;
          text-align: right;
          color: #ffffff;
        }

        /* Loading Placeholder */
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
      `}</style>
    </div>
  );
}

export default React.memo(MarketDetail);