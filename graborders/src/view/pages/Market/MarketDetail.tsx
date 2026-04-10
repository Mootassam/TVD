import React, { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { useHistory, useParams } from "react-router-dom";
import FuturesChart from "../Futures/FuturesChart";
import { i18n } from "../../../i18n";
import CoinSelectorSidebar from "src/view/shared/modals/CoinSelectorSidebar";
import { fetchAllCryptoPrices, cryptoCoinIds, MarketProvider } from "./MarketContext";

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
  const cryptoCache = useRef<{ [key: string]: { price: number; change: number; timestamp: number } }>({});

  // Crypto coin IDs for CoinGecko API
  const cryptoCoinIds: Record<string, string> = {
    BTCUSD: "bitcoin", ETHUSD: "ethereum", XRPUSD: "ripple", SOLUSD: "solana",
    ADAUSD: "cardano", DOGEUSD: "dogecoin", DOTUSD: "polkadot", AVAXUSD: "avalanche-2",
    LINKUSD: "chainlink", MATICUSD: "matic-network", UNIUSD: "uniswap", ATOMUSD: "cosmos",
    LTCUSD: "litecoin", BCHUSD: "bitcoin-cash", NEARUSD: "near-protocol", ALGOUSD: "algorand",
    VETUSD: "vechain", FILUSD: "filecoin", THETAUSD: "theta-token", AXSUSD: "axie-infinity",
    SANDUSD: "the-sandbox", MANAUSD: "decentraland", ENJUSD: "enjincoin", CHZUSD: "chiliz", APEUSD: "apecoin",
  };

  // Use shared crypto prices from MarketContext
  const fetchCryptoPrices = useCallback(async () => {
    await fetchAllCryptoPrices();
  }, []);

  // ----------------------------------------------------------------------
  // All available pairs (Forex, Metal, Oil, CFD, Crypto)
  // ----------------------------------------------------------------------
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

  // ----------------------------------------------------------------------
  // Base prices for all pairs
  // ----------------------------------------------------------------------
  const getBasePrice = useCallback((symbol: string): number => {
    const basePrices: Record<string, number> = {
      // Forex
      EURUSD: 1.0842, GBPUSD: 1.2635, USDJPY: 148.65, AUDUSD: 0.6532, USDCAD: 1.3580, USDCHF: 0.8795, NZDUSD: 0.6025, EURGBP: 0.8590, EURJPY: 161.15, GBPJPY: 187.65, AUDJPY: 97.15, EURAUD: 1.6590, GBPAUD: 1.9340, USDMXN: 17.25, USDTRY: 32.15, USDZAR: 18.95, USDSGD: 1.3420, USDHKD: 7.8185, USDKRW: 1335.00, USDINR: 83.25, EURCHF: 0.9530, EURNZD: 1.7990, GBPEUR: 1.1645, AUDNZD: 1.0845, CADJPY: 109.50, CHFJPY: 169.05, NZDJPY: 91.25, SGDJPY: 110.75, HKDJPY: 19.02, ZARJPY: 7.85,
      // Metals
      XAUUSD: 2345.80, XAGUSD: 28.25, XPTUSD: 985.50, XPDUSD: 1045.00, XAUEUR: 2165.00, XAGEUR: 26.05, XPTEUR: 908.00, XAUGBP: 1855.00, XAGGBP: 22.35,
      // Oil
      USOIL: 84.25, UKOIL: 87.85, BRENT: 87.15, WTI: 84.35, CRUDE: 84.50, NGAS: 2.85, HEAT: 2.65, GAS: 2.75,
      // CFD
      US30: 38550, US500: 5125, NAS100: 18450, US2000: 2185, GER40: 18485, UK100: 8075, FRA40: 7525, EU50: 4895, JP225: 39750, HK50: 16750, AUS200: 7850, TWII: 20750, KR100: 2850, IN50: 22450, TECH100: 8450,
      // Crypto
      BTCUSD: 67450, ETHUSD: 3425, XRPUSD: 0.515, SOLUSD: 142.50, ADAUSD: 0.445, DOGEUSD: 0.0825, DOTUSD: 7.15, AVAXUSD: 34.85, LINKUSD: 14.25, MATICUSD: 0.585, UNIUSD: 6.85, ATOMUSD: 8.45, LTCUSD: 84.50, BCHUSD: 485.00, NEARUSD: 5.25, ALGOUSD: 0.185, VETUSD: 0.0225, FILUSD: 5.85, THETAUSD: 0.985, AXSUSD: 6.85, SANDUSD: 0.425, MANAUSD: 0.385, ENJUSD: 0.285, CHZUSD: 0.085, APEUSD: 1.25,
    };
    return basePrices[symbol] || 1.0;
  }, []);

  // ----------------------------------------------------------------------
  // Decimal places for each pair type
  // ----------------------------------------------------------------------
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
  const updateMarketData = useCallback(async (symbol: string) => {
    // Fetch crypto prices if needed
    if (cryptoCoinIds[symbol]) {
      await fetchCryptoPrices();
    }

    setMarketStats(prev => {
      let basePrice = prev.price ?? getBasePrice(symbol);
      let newPrice: number;
      let changePercent: number;

      // Use real crypto price if available
      if (cryptoCoinIds[symbol] && cryptoCache.current[symbol] && cryptoCache.current[symbol].price) {
        newPrice = cryptoCache.current[symbol].price;
        changePercent = cryptoCache.current[symbol].change;
      } else {
        newPrice = randomWalk(basePrice);
        changePercent = ((newPrice - basePrice) / basePrice) * 100;
      }

      // Approximate 24h high/low using a simple multiplier
      const volatility = cryptoCoinIds[symbol] ? 0.01 : 0.002;
      const high = newPrice * (1 + volatility);
      const low = newPrice * (1 - volatility);
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
  }, [randomWalk, generateOrderBook, generateTrades, getBasePrice, fetchCryptoPrices]);

  // ----------------------------------------------------------------------
  // Initialize data for a symbol
  // ----------------------------------------------------------------------
  const initializeData = useCallback(async (symbol: string) => {
    // Fetch crypto prices if needed
    if (cryptoCoinIds[symbol]) {
      await fetchCryptoPrices();
    }

    let basePrice = getBasePrice(symbol);
    let changePercent = 0;

    // Use cached crypto price if available
    if (cryptoCoinIds[symbol] && cryptoCache.current[symbol] && cryptoCache.current[symbol].price) {
      basePrice = cryptoCache.current[symbol].price;
      changePercent = cryptoCache.current[symbol].change;
    }

    setMarketStats({
      price: basePrice,
      changePercent,
      high: basePrice * 1.002,
      low: basePrice * 0.998,
      volume: 1000000,
      quoteVolume: basePrice * 1000000,
    });
    setOrderBook(generateOrderBook(basePrice, symbol));
    setRecentTrades(generateTrades(basePrice, symbol, 10));
    setIsLoading(false);
  }, [getBasePrice, generateOrderBook, generateTrades, fetchCryptoPrices]);

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
    updateInterval.current = setInterval(async () => {
      if (isComponentMounted.current && currentCoinRef.current === coin) {
        await updateMarketData(coin);
      }
    }, 2000);

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
          background-color: #0f0f0f;
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