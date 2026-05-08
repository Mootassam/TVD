import React, { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { useHistory, useParams } from "react-router-dom";
import TradingViewChart from "./TradingViewChart";
import { i18n } from "../../../i18n";
import CoinSelectorSidebar from "src/view/shared/modals/CoinSelectorSidebar";
import { Link } from "react-router-dom";

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

interface MarketData {
  symbol: string;
  ask: number;
  bid: number;
}

interface Coin {
  symbol: string;
  name: string;
  baseCurrency: string;
  quoteCurrency: string;
}

// ----------------------------------------------------------------------
// Main Component
// ----------------------------------------------------------------------
function MarketDetail() {
  const history = useHistory();
  const { id } = useParams<{ id: string }>();

  // ----- WebSocket real market data -----
  const wsRef = useRef<WebSocket | null>(null);
  const sessionRef = useRef<string | null>(null);
  const subscribedSymbolRef = useRef<string | null>(null); // Track current subscription
  const reconnectTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const selectedCoinRef = useRef(id || "EURUSD");
  const [markets, setMarkets] = useState<MarketData[]>([]);

  // ----- Derived price & change (real data) -----
  const [currentPrice, setCurrentPrice] = useState<number | null>(null);
  const [priceChangePercent, setPriceChangePercent] = useState<number | null>(null);
  const initialPriceRef = useRef<{ [symbol: string]: number }>({});

  // ----- UI state -----
  const [selectedCoin, setSelectedCoin] = useState(id || "EURUSD");
  const [orderBook, setOrderBook] = useState<ForexOrderBook | null>(null);
  const [recentTrades, setRecentTrades] = useState<ForexTrade[]>([]);
  const [activeTab, setActiveTab] = useState<'orderBook' | 'transactions'>('orderBook');
  const [showCoinSelector, setShowCoinSelector] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Keep selectedCoinRef in sync with state
  useEffect(() => {
    selectedCoinRef.current = selectedCoin;
  }, [selectedCoin]);

  // ----- Helper: encode TradingView messages -----
  const encode = useCallback((msg: string) => `~m~${msg.length}~m~${msg}`, []);

  const parseMessages = useCallback((data: string): string[] => {
    const result: string[] = [];
    let buffer = data;
    while (buffer.length > 0) {
      if (!buffer.startsWith("~m~")) break;
      const second = buffer.indexOf("~m~", 3);
      const length = parseInt(buffer.substring(3, second));
      const message = buffer.substr(second + 3, length);
      result.push(message);
      buffer = buffer.substr(second + 3 + length);
    }
    return result;
  }, []);

  const extractSymbol = useCallback((raw: string): string => {
    try {
      const cleaned = raw.replace(/^=\{/, "{");
      const obj = JSON.parse(cleaned);
      return obj.symbol || "UNKNOWN";
    } catch {
      return raw;
    }
  }, []);

  // ----- Core subscription logic (fixed) -----
  const subscribeToSymbol = useCallback((symbol: string) => {
    const ws = wsRef.current;
    const session = sessionRef.current;
    if (!ws || ws.readyState !== WebSocket.OPEN || !session) return;

    // If already subscribed to the same symbol, do nothing
    if (subscribedSymbolRef.current === symbol) return;

    // Unsubscribe from old symbol if any
    if (subscribedSymbolRef.current) {
      ws.send(encode(JSON.stringify({ m: "quote_remove_symbols", p: [session, subscribedSymbolRef.current] })));
    }

    // Subscribe to new symbol
    ws.send(encode(JSON.stringify({ m: "quote_add_symbols", p: [session, symbol] })));
    subscribedSymbolRef.current = symbol;

    // Reset all derived data for the new symbol
    setMarkets([]);
    setCurrentPrice(null);
    setPriceChangePercent(null);
    setIsLoading(true);
    delete initialPriceRef.current[symbol];
  }, [encode]);

  // WebSocket connection with auto‑reconnect
  const connectWebSocket = useCallback(() => {
    if (wsRef.current) {
      wsRef.current.close();
      wsRef.current = null;
    }

const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
const ws = new WebSocket(`${protocol}//${window.location.host}/ws/socket.io/websocket`);
    wsRef.current = ws;

    ws.onopen = () => {
      const session = "qs_" + Math.random().toString(36).substring(2, 12);
      sessionRef.current = session;

      ws.send(encode(JSON.stringify({ m: "quote_create_session", p: [session] })));
      ws.send(encode(JSON.stringify({ m: "quote_set_fields", p: [session, "ask", "bid", "ask_size", "bid_size"] })));

      // Subscribe to the current symbol (using ref for latest value)
      subscribeToSymbol(selectedCoinRef.current);
    };

    ws.onmessage = (event) => {
      const raw = event.data;
      if (raw.startsWith("~h~")) {
        ws.send(raw);
        return;
      }

      const messages = parseMessages(raw);
      messages.forEach((msg) => {
        try {
          const json = JSON.parse(msg);
          if (json.m === "qsd") {
            const payload = json.p[1];
            const symbol = extractSymbol(payload.n);
            const values = payload.v;
            if (!values) return;

            const market: MarketData = {
              symbol,
              ask: values.ask ?? 0,
              bid: values.bid ?? 0,
            };

            setMarkets((prev) => {
              const filtered = prev.filter((m) => m.symbol !== symbol);
              return [...filtered, market];
            });
          }
        } catch (err) {
          // ignore non-json frames
        }
      });
    };

    ws.onclose = (event) => {
      subscribedSymbolRef.current = null; // Reset on disconnect
      if (!event.wasClean) {
        reconnectTimeoutRef.current = setTimeout(() => {
          connectWebSocket();
        }, 3000);
      }
    };

    ws.onerror = (err) => {
      console.error("WebSocket error:", err);
    };
  }, [encode, parseMessages, extractSymbol, subscribeToSymbol]);

  useEffect(() => {
    connectWebSocket();

    return () => {
      if (reconnectTimeoutRef.current) clearTimeout(reconnectTimeoutRef.current);
      if (wsRef.current) {
        wsRef.current.close();
        wsRef.current = null;
      }
    };
  }, [connectWebSocket]);

  // Subscribe to new symbol when selectedCoin changes
  useEffect(() => {
    subscribeToSymbol(selectedCoin);
  }, [selectedCoin, subscribeToSymbol]);

  // ----- Derive price & change from real market data -----
  useEffect(() => {
    const market = markets.find((m) => m.symbol === selectedCoin);
    if (!market || !market.ask || !market.bid) return;

    const midPrice = (market.ask + market.bid) / 2;
    setCurrentPrice(midPrice);
    setIsLoading(false);

    if (initialPriceRef.current[selectedCoin] === undefined) {
      initialPriceRef.current[selectedCoin] = midPrice;
      setPriceChangePercent(0);
    } else {
      const initial = initialPriceRef.current[selectedCoin];
      const change = ((midPrice - initial) / initial) * 100;
      setPriceChangePercent(change);
    }
  }, [markets, selectedCoin]);

  // ----- Mock order book & trades (keep UI lively) -----
  const getDecimalPlaces = useCallback((symbol: string): number => {
    if (["XAUUSD", "XAUEUR", "XAUGBP"].includes(symbol)) return 2;
    if (["XAGUSD", "XAGEUR", "XAGGBP"].includes(symbol)) return 2;
    if (["XPTUSD", "XPTEUR"].includes(symbol)) return 2;
    if (["XPDUSD"].includes(symbol)) return 2;
    if (["USOIL", "UKOIL", "BRENT", "WTI", "CRUDE"].includes(symbol)) return 2;
    if (["NGAS", "HEAT", "GAS"].includes(symbol)) return 3;
    if (["BTCUSD", "ETHUSD"].includes(symbol)) return 2;
    if (["XRPUSD", "ADAUSD", "DOGEUSD", "MATICUSD", "UNIUSD", "THETAUSD", "CHZUSD", "APEUSD"].includes(symbol)) return 4;
    if (["LTCUSD", "BCHUSD", "FILUSD", "AXSUSD", "SANDUSD", "MANAUSD", "ENJUSD"].includes(symbol)) return 2;
    if (["DOTUSD", "AVAXUSD", "LINKUSD", "ATOMUSD", "NEARUSD"].includes(symbol)) return 2;
    if (["ALGOUSD", "VETUSD"].includes(symbol)) return 4;
    if (["US30", "US500", "NAS100", "US2000", "GER40", "UK100", "FRA40", "EU50", "JP225", "HK50", "AUS200", "TWII", "KR100", "IN50", "TECH100"].includes(symbol)) return 0;
    if (symbol.endsWith("JPY")) return 3;
    if (symbol.includes("USD") && !symbol.startsWith("USD")) return 5;
    return 2;
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

  const generateOrderBook = useCallback((price: number, symbol: string): ForexOrderBook => {
    const decimals = getDecimalPlaces(symbol);
    const spread = price * 0.0002;
    const bids: [number, number][] = [];
    const asks: [number, number][] = [];
    for (let i = 1; i <= 10; i++) {
      const bidPrice = price - spread * i * (0.5 + Math.random() * 0.5);
      const askPrice = price + spread * i * (0.5 + Math.random() * 0.5);
      const quantity = Math.random() * 1000000 + 500000;
      bids.push([Number(bidPrice.toFixed(decimals)), Number(quantity.toFixed(2))]);
      asks.push([Number(askPrice.toFixed(decimals)), Number(quantity.toFixed(2))]);
    }
    bids.sort((a, b) => b[0] - a[0]);
    asks.sort((a, b) => a[0] - b[0]);
    return { lastUpdateId: Date.now(), bids, asks };
  }, [getDecimalPlaces]);

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

  // Update mock order book & trades every 2 seconds using the real current price
  useEffect(() => {
    if (currentPrice === null) return;
    const interval = setInterval(() => {
      setOrderBook(generateOrderBook(currentPrice, selectedCoin));
      setRecentTrades(generateTrades(currentPrice, selectedCoin, 10));
    }, 2000);
    return () => clearInterval(interval);
  }, [currentPrice, selectedCoin, generateOrderBook, generateTrades]);

  // Initial order book/trades on price change
  useEffect(() => {
    if (currentPrice !== null) {
      setOrderBook(generateOrderBook(currentPrice, selectedCoin));
      setRecentTrades(generateTrades(currentPrice, selectedCoin, 10));
    }
  }, [currentPrice, selectedCoin, generateOrderBook, generateTrades]);

  // ----- Available pairs -----
  const availableCoins: Coin[] = [
    // Forex
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
    { symbol: "USDTRY", name: "USD / TRY", baseCurrency: "USD", quoteCurrency: "TRY" },
    { symbol: "USDZAR", name: "USD / ZAR", baseCurrency: "USD", quoteCurrency: "ZAR" },
    { symbol: "USDSGD", name: "USD / SGD", baseCurrency: "USD", quoteCurrency: "SGD" },
    { symbol: "USDHKD", name: "USD / HKD", baseCurrency: "USD", quoteCurrency: "HKD" },
    { symbol: "USDKRW", name: "USD / KRW", baseCurrency: "USD", quoteCurrency: "KRW" },
    { symbol: "USDINR", name: "USD / INR", baseCurrency: "USD", quoteCurrency: "INR" },
    { symbol: "EURCHF", name: "EUR / CHF", baseCurrency: "EUR", quoteCurrency: "CHF" },
    { symbol: "EURNZD", name: "EUR / NZD", baseCurrency: "EUR", quoteCurrency: "NZD" },
    { symbol: "GBPEUR", name: "GBP / EUR", baseCurrency: "GBP", quoteCurrency: "EUR" },
    { symbol: "AUDNZD", name: "AUD / NZD", baseCurrency: "AUD", quoteCurrency: "NZD" },
    { symbol: "CADJPY", name: "CAD / JPY", baseCurrency: "CAD", quoteCurrency: "JPY" },
    { symbol: "CHFJPY", name: "CHF / JPY", baseCurrency: "CHF", quoteCurrency: "JPY" },
    { symbol: "NZDJPY", name: "NZD / JPY", baseCurrency: "NZD", quoteCurrency: "JPY" },
    { symbol: "SGDJPY", name: "SGD / JPY", baseCurrency: "SGD", quoteCurrency: "JPY" },
    { symbol: "HKDJPY", name: "HKD / JPY", baseCurrency: "HKD", quoteCurrency: "JPY" },
    { symbol: "ZARJPY", name: "ZAR / JPY", baseCurrency: "ZAR", quoteCurrency: "JPY" },
    // Metals
    { symbol: "XAUUSD", name: "Gold", baseCurrency: "XAU", quoteCurrency: "USD" },
    { symbol: "XAGUSD", name: "Silver", baseCurrency: "XAG", quoteCurrency: "USD" },
    { symbol: "XPTUSD", name: "Platinum", baseCurrency: "XPT", quoteCurrency: "USD" },
    { symbol: "XPDUSD", name: "Palladium", baseCurrency: "XPD", quoteCurrency: "USD" },
    { symbol: "XAUEUR", name: "Gold / EUR", baseCurrency: "XAU", quoteCurrency: "EUR" },
    { symbol: "XAGEUR", name: "Silver / EUR", baseCurrency: "XAG", quoteCurrency: "EUR" },
    { symbol: "XPTEUR", name: "Platinum / EUR", baseCurrency: "XPT", quoteCurrency: "EUR" },
    { symbol: "XAUGBP", name: "Gold / GBP", baseCurrency: "XAU", quoteCurrency: "GBP" },
    { symbol: "XAGGBP", name: "Silver / GBP", baseCurrency: "XAG", quoteCurrency: "GBP" },
    // Oil
    { symbol: "USOIL", name: "US Oil", baseCurrency: "USOIL", quoteCurrency: "USD" },
    { symbol: "UKOIL", name: "UK Oil", baseCurrency: "UKOIL", quoteCurrency: "USD" },
    { symbol: "BRENT", name: "Brent", baseCurrency: "BRENT", quoteCurrency: "USD" },
    { symbol: "WTI", name: "WTI", baseCurrency: "WTI", quoteCurrency: "USD" },
    { symbol: "CRUDE", name: "Crude", baseCurrency: "CRUDE", quoteCurrency: "USD" },
    { symbol: "NGAS", name: "Natural Gas", baseCurrency: "NGAS", quoteCurrency: "USD" },
    { symbol: "HEAT", name: "Heating Oil", baseCurrency: "HEAT", quoteCurrency: "USD" },
    { symbol: "GAS", name: "Gasoline", baseCurrency: "GAS", quoteCurrency: "USD" },
    // CFD
    { symbol: "US30", name: "Dow 30", baseCurrency: "US30", quoteCurrency: "USD" },
    { symbol: "US500", name: "S&P 500", baseCurrency: "US500", quoteCurrency: "USD" },
    { symbol: "NAS100", name: "Nasdaq 100", baseCurrency: "NAS100", quoteCurrency: "USD" },
    { symbol: "US2000", name: "Russell 2000", baseCurrency: "US2000", quoteCurrency: "USD" },
    { symbol: "GER40", name: "DAX", baseCurrency: "GER40", quoteCurrency: "EUR" },
    { symbol: "UK100", name: "FTSE 100", baseCurrency: "UK100", quoteCurrency: "GBP" },
    { symbol: "FRA40", name: "CAC 40", baseCurrency: "FRA40", quoteCurrency: "EUR" },
    { symbol: "EU50", name: "Euro Stoxx 50", baseCurrency: "EU50", quoteCurrency: "EUR" },
    { symbol: "JP225", name: "Nikkei 225", baseCurrency: "JP225", quoteCurrency: "JPY" },
    { symbol: "HK50", name: "Hang Seng", baseCurrency: "HK50", quoteCurrency: "HKD" },
    { symbol: "AUS200", name: "ASX 200", baseCurrency: "AUS200", quoteCurrency: "AUD" },
    { symbol: "TWII", name: "Taiwan", baseCurrency: "TWII", quoteCurrency: "TWD" },
    { symbol: "KR100", name: "KOSPI", baseCurrency: "KR100", quoteCurrency: "KRW" },
    { symbol: "IN50", name: "Nifty 50", baseCurrency: "IN50", quoteCurrency: "INR" },
    { symbol: "TECH100", name: "Tech 100", baseCurrency: "TECH100", quoteCurrency: "USD" },
    // Crypto
    { symbol: "BTCUSD", name: "Bitcoin", baseCurrency: "BTC", quoteCurrency: "USD" },
    { symbol: "ETHUSD", name: "Ethereum", baseCurrency: "ETH", quoteCurrency: "USD" },
    { symbol: "XRPUSD", name: "Ripple", baseCurrency: "XRP", quoteCurrency: "USD" },
    { symbol: "SOLUSD", name: "Solana", baseCurrency: "SOL", quoteCurrency: "USD" },
    { symbol: "ADAUSD", name: "Cardano", baseCurrency: "ADA", quoteCurrency: "USD" },
    { symbol: "DOGEUSD", name: "Dogecoin", baseCurrency: "DOGE", quoteCurrency: "USD" },
    { symbol: "DOTUSD", name: "Polkadot", baseCurrency: "DOT", quoteCurrency: "USD" },
    { symbol: "AVAXUSD", name: "Avalanche", baseCurrency: "AVAX", quoteCurrency: "USD" },
    { symbol: "LINKUSD", name: "Chainlink", baseCurrency: "LINK", quoteCurrency: "USD" },
    { symbol: "MATICUSD", name: "Polygon", baseCurrency: "MATIC", quoteCurrency: "USD" },
    { symbol: "UNIUSD", name: "Uniswap", baseCurrency: "UNI", quoteCurrency: "USD" },
    { symbol: "ATOMUSD", name: "Cosmos", baseCurrency: "ATOM", quoteCurrency: "USD" },
    { symbol: "LTCUSD", name: "Litecoin", baseCurrency: "LTC", quoteCurrency: "USD" },
    { symbol: "BCHUSD", name: "Bitcoin Cash", baseCurrency: "BCH", quoteCurrency: "USD" },
    { symbol: "NEARUSD", name: "Near", baseCurrency: "NEAR", quoteCurrency: "USD" },
    { symbol: "ALGOUSD", name: "Algorand", baseCurrency: "ALGO", quoteCurrency: "USD" },
    { symbol: "VETUSD", name: "VeChain", baseCurrency: "VET", quoteCurrency: "USD" },
    { symbol: "FILUSD", name: "Filecoin", baseCurrency: "FIL", quoteCurrency: "USD" },
    { symbol: "THETAUSD", name: "Theta", baseCurrency: "THETA", quoteCurrency: "USD" },
    { symbol: "AXSUSD", name: "Axie Infinity", baseCurrency: "AXS", quoteCurrency: "USD" },
    { symbol: "SANDUSD", name: "The Sandbox", baseCurrency: "SAND", quoteCurrency: "USD" },
    { symbol: "MANAUSD", name: "Decentraland", baseCurrency: "MANA", quoteCurrency: "USD" },
    { symbol: "ENJUSD", name: "Enjin Coin", baseCurrency: "ENJ", quoteCurrency: "USD" },
    { symbol: "CHZUSD", name: "Chiliz", baseCurrency: "CHZ", quoteCurrency: "USD" },
    { symbol: "APEUSD", name: "ApeCoin", baseCurrency: "APE", quoteCurrency: "USD" },
  ];

  // ----- Navigation & coin selection -----
  const goBack = useCallback(() => history.goBack(), [history]);
  const handleCoinSelect = (coinSymbol: string) => {
    if (coinSymbol === selectedCoin) {
      setShowCoinSelector(false);
      return;
    }
    setSelectedCoin(coinSymbol);
    history.push(`/market/detail/${coinSymbol}`);
  };
  const toggleCoinSelector = () => setShowCoinSelector(prev => !prev);

  const currentCoin = useMemo(() => {
    return availableCoins.find(c => c.symbol === selectedCoin) || {
      symbol: selectedCoin,
      name: selectedCoin.replace(/(.{3})(.{3})/, "$1 / $2"),
      baseCurrency: selectedCoin.slice(0, 3),
      quoteCurrency: selectedCoin.slice(3),
    };
  }, [selectedCoin]);

  // ----- Loading placeholder -----
  const LoadingPlaceholder = ({ width = "100%", height = "1em" }) => (
    <div className="loading-placeholder" style={{ width, height }} />
  );

  // ----- Order book display data (heatmap) -----
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

  // ----------------------------------------------------------------------
  // Render
  // ----------------------------------------------------------------------
  return (
    <div className="market-detail-container">
      {/* Header */}
      <div className="header">
        <div className="nav-bar">
          <Link className="back-arrow" to="/market" >
            <i className="fas fa-arrow-left"></i>
          </Link>
          <div className="trading-pair" onClick={toggleCoinSelector}>
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

      {/* Price Section – now driven by live WebSocket data */}
      <div className="price-section">
        <div className="price-main-row">
          <div className="price-left-section">
            <div className="current-price">
              {currentPrice !== null ? (
                <span style={{ color: priceChangePercent !== null && priceChangePercent < 0 ? '#f56c6c' : '#37b66a' }}>
                  {formatNumber(currentPrice, selectedCoin)}
                </span>
              ) : (
                <LoadingPlaceholder width="120px" height="28px" />
              )}
            </div>
            <div className="price-info-row">
              <div className="usd-price">
                {currentPrice !== null ? `$${currentPrice.toFixed(2)}` : '$0.00'}
              </div>
              <div className="price-change" style={{
                color: priceChangePercent !== null && priceChangePercent < 0 ? '#f56c6c' : '#37b66a'
              }}>
                {priceChangePercent !== null ? (
                  `${priceChangePercent < 0 ? '−' : '+'}${Math.abs(priceChangePercent).toFixed(2)}%`
                ) : (
                  <LoadingPlaceholder width="60px" height="16px" />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Chart Section */}
      <div className="chart-section">
        <TradingViewChart key={selectedCoin} symbol={selectedCoin} height={400} />
      </div>

      {/* Tabs (Order Book / Transactions) */}
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

      {/* Styles – kept exactly as original */}
      <style>{`
        .market-detail-container {
          max-width: 400px;
          margin: 0 auto;
          min-height: 100vh;
          background-color: #0f0f0f;
          border-top: 2px solid #39FF14;
          display: flex;
          flex-direction: column;
          box-sizing: border-box;
          color: #ffffff;
        }
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
        .price-section {
          padding: 16px 20px;
          background-color: #0f0f0f;
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
        .chart-section {
          margin: 0 20px 20px;
          background-color: #1c1c1c;
          overflow: hidden;
        }
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