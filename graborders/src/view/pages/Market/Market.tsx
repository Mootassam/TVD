import React, { useState, useEffect, useMemo, useCallback, useRef } from "react";
import { Link } from "react-router-dom";

/* ------------------------------------------------------------------ */
/*  Types & Config                                                    */
/* ------------------------------------------------------------------ */

interface MarketItem {
  symbol: string;
  name: string;
  fullName: string;
  price: string;
  change: string;
  changePercent: string;
  isPositive: boolean;
  volume: string;
}

type MarketCategory = "Forex" | "Metal" | "Oil" | "CFD" | "Crypto";

const categoryConfig: Record<MarketCategory, { title: string; symbols: string[] }> = {
  Forex: {
    title: "Forex",
    symbols: [
      "EURUSD", "GBPUSD", "USDJPY", "AUDUSD", "USDCAD", "USDCHF", "NZDUSD",
      "EURGBP", "EURJPY", "GBPJPY", "AUDJPY", "EURAUD", "GBPAUD", "USDMXN",
      "USDTRY", "USDZAR", "USDSGD", "USDHKD", "USDKRW", "USDINR",
    ],
  },
  Metal: {
    title: "Metals",
    symbols: ["XAUUSD", "XAGUSD", "XPTUSD", "XPDUSD"],
  },
  Oil: {
    title: "Oil & Gas",
    symbols: ["USOIL", "UKOIL", "NGAS"],
  },
  CFD: {
    title: "Indices",
    symbols: ["US30", "US500", "NAS100", "US2000", "GER40", "UK100", "FRA40", "EU50", "JP225"],
  },
  Crypto: {
    title: "Crypto",
    symbols: [
      "BTCUSD", "ETHUSD", "XRPUSD", "SOLUSD", "ADAUSD", "DOGEUSD", "DOTUSD",
      "AVAXUSD", "LINKUSD",  "UNIUSD", "ATOMUSD", "LTCUSD",
      "BCHUSD", "NEARUSD", "ALGOUSD", "VETUSD", "FILUSD", "THETAUSD",
      "AXSUSD", "SANDUSD", "MANAUSD", "ENJUSD", "CHZUSD", "APEUSD",
    ],
  },
};

// Mapping your symbols to Yahoo Finance tickers
const yahooSymbolMap: Record<string, string> = {
  EURUSD: "EURUSD=X", GBPUSD: "GBPUSD=X", USDJPY: "USDJPY=X",
  AUDUSD: "AUDUSD=X", USDCAD: "USDCAD=X", USDCHF: "USDCHF=X",
  NZDUSD: "NZDUSD=X", EURGBP: "EURGBP=X", EURJPY: "EURJPY=X",
  GBPJPY: "GBPJPY=X", AUDJPY: "AUDJPY=X", EURAUD: "EURAUD=X",
  GBPAUD: "GBPAUD=X", USDMXN: "USDMXN=X", USDTRY: "USDTRY=X",
  USDZAR: "USDZAR=X", USDSGD: "USDSGD=X", USDHKD: "USDHKD=X",
  USDKRW: "USDKRW=X", USDINR: "USDINR=X",
  XAUUSD: "GC=F", XAGUSD: "SI=F", XPTUSD: "PL=F", XPDUSD: "PA=F",
  USOIL: "CL=F", UKOIL: "BZ=F", NGAS: "NG=F",
  US30: "YM=F", US500: "ES=F", NAS100: "NQ=F", US2000: "RTY=F",
  GER40: "DAX", UK100: "FTSE", FRA40: "FCHI", EU50: "STOXX50E", JP225: "N225",
};

/* ------------------------------------------------------------------ */
/*  Utility functions                                                 */
/* ------------------------------------------------------------------ */

const getDisplayName = (symbol: string): { short: string; full: string } => {
  const map: Record<string, { short: string; full: string }> = {
    EURUSD: { short: "EUR/USD", full: "Euro / US Dollar" },
    GBPUSD: { short: "GBP/USD", full: "British Pound / US Dollar" },
    USDJPY: { short: "USD/JPY", full: "US Dollar / Japanese Yen" },
    AUDUSD: { short: "AUD/USD", full: "Australian Dollar / US Dollar" },
    USDCAD: { short: "USD/CAD", full: "US Dollar / Canadian Dollar" },
    USDCHF: { short: "USD/CHF", full: "US Dollar / Swiss Franc" },
    NZDUSD: { short: "NZD/USD", full: "New Zealand Dollar / US Dollar" },
    EURGBP: { short: "EUR/GBP", full: "Euro / British Pound" },
    EURJPY: { short: "EUR/JPY", full: "Euro / Japanese Yen" },
    GBPJPY: { short: "GBP/JPY", full: "British Pound / Japanese Yen" },
    AUDJPY: { short: "AUD/JPY", full: "Australian Dollar / Japanese Yen" },
    EURAUD: { short: "EUR/AUD", full: "Euro / Australian Dollar" },
    GBPAUD: { short: "GBP/AUD", full: "British Pound / Australian Dollar" },
    USDMXN: { short: "USD/MXN", full: "US Dollar / Mexican Peso" },
    USDTRY: { short: "USD/TRY", full: "US Dollar / Turkish Lira" },
    USDZAR: { short: "USD/ZAR", full: "US Dollar / South African Rand" },
    USDSGD: { short: "USD/SGD", full: "US Dollar / Singapore Dollar" },
    USDHKD: { short: "USD/HKD", full: "US Dollar / Hong Kong Dollar" },
    USDKRW: { short: "USD/KRW", full: "US Dollar / South Korean Won" },
    USDINR: { short: "USD/INR", full: "US Dollar / Indian Rupee" },
    XAUUSD: { short: "Gold", full: "Gold Spot" },
    XAGUSD: { short: "Silver", full: "Silver Spot" },
    XPTUSD: { short: "Platinum", full: "Platinum Spot" },
    XPDUSD: { short: "Palladium", full: "Palladium Spot" },
    USOIL: { short: "Crude Oil", full: "WTI Crude Oil" },
    UKOIL: { short: "Brent Oil", full: "Brent Crude Oil" },
    NGAS: { short: "Nat Gas", full: "Natural Gas" },
    US30: { short: "US 30", full: "Dow Jones 30" },
    US500: { short: "US 500", full: "S&P 500" },
    NAS100: { short: "NAS 100", full: "Nasdaq 100" },
    US2000: { short: "Russell 2000", full: "Russell 2000" },
    GER40: { short: "DAX", full: "DAX 40" },
    UK100: { short: "FTSE 100", full: "FTSE 100" },
    FRA40: { short: "CAC 40", full: "CAC 40" },
    EU50: { short: "Euro Stoxx 50", full: "Euro Stoxx 50" },
    JP225: { short: "Nikkei 225", full: "Nikkei 225" },
    BTCUSD: { short: "BTC/USD", full: "Bitcoin" },
    ETHUSD: { short: "ETH/USD", full: "Ethereum" },
    XRPUSD: { short: "XRP/USD", full: "Ripple" },
    SOLUSD: { short: "SOL/USD", full: "Solana" },
    ADAUSD: { short: "ADA/USD", full: "Cardano" },
    DOGEUSD: { short: "DOGE/USD", full: "Dogecoin" },
    DOTUSD: { short: "DOT/USD", full: "Polkadot" },
    AVAXUSD: { short: "AVAX/USD", full: "Avalanche" },
    LINKUSD: { short: "LINK/USD", full: "Chainlink" },
    MATICUSD: { short: "MATIC/USD", full: "Polygon" },
    UNIUSD: { short: "UNI/USD", full: "Uniswap" },
    ATOMUSD: { short: "ATOM/USD", full: "Cosmos" },
    LTCUSD: { short: "LTC/USD", full: "Litecoin" },
    BCHUSD: { short: "BCH/USD", full: "Bitcoin Cash" },
    NEARUSD: { short: "NEAR/USD", full: "Near Protocol" },
    ALGOUSD: { short: "ALGO/USD", full: "Algorand" },
    VETUSD: { short: "VET/USD", full: "VeChain" },
    FILUSD: { short: "FIL/USD", full: "Filecoin" },
    THETAUSD: { short: "THETA/USD", full: "Theta Network" },
    AXSUSD: { short: "AXS/USD", full: "Axie Infinity" },
    SANDUSD: { short: "SAND/USD", full: "The Sandbox" },
    MANAUSD: { short: "MANA/USD", full: "Decentraland" },
    ENJUSD: { short: "ENJ/USD", full: "Enjin Coin" },
    CHZUSD: { short: "CHZ/USD", full: "Chiliz" },
    APEUSD: { short: "APE/USD", full: "ApeCoin" },
  };
  return map[symbol] ?? { short: symbol, full: symbol };
};

const formatPriceValue = (symbol: string, price: number): string => {
  if (["XAUUSD", "GC=F"].includes(symbol)) return price.toFixed(2);
  if (["XAGUSD", "SI=F"].includes(symbol)) return price.toFixed(2);
  if (["XPTUSD", "PL=F", "XPDUSD", "PA=F"].includes(symbol)) return price.toFixed(2);
  if (["USOIL", "CL=F", "UKOIL", "BZ=F"].includes(symbol)) return price.toFixed(2);
  if (["NGAS", "NG=F"].includes(symbol)) return price.toFixed(3);
  if (["BTCUSD", "ETHUSD"].includes(symbol)) return price.toFixed(2);
  if (["XRPUSD", "ADAUSD", "DOGEUSD", "MATICUSD", "UNIUSD", "THETAUSD", "CHZUSD", "APEUSD"].includes(symbol)) return price.toFixed(4);
  if (["LTCUSD", "BCHUSD", "FILUSD", "AXSUSD", "SANDUSD", "MANAUSD", "ENJUSD"].includes(symbol)) return price.toFixed(2);
  if (["DOTUSD", "AVAXUSD", "LINKUSD", "ATOMUSD", "NEARUSD"].includes(symbol)) return price.toFixed(2);
  if (["ALGOUSD", "VETUSD"].includes(symbol)) return price.toFixed(4);
  if (["US30", "US500", "NAS100", "US2000", "GER40", "UK100", "FRA40", "EU50", "JP225"].includes(symbol)) return price.toFixed(0);
  if (symbol.endsWith("JPY")) return price.toFixed(3);
  if (symbol.includes("USD") && !symbol.startsWith("USD")) return price.toFixed(5);
  return price.toFixed(2);
};

const formatVolume = (vol: number): string => {
  if (vol >= 1e9) return `${(vol / 1e9).toFixed(2)}B`;
  if (vol >= 1e6) return `${(vol / 1e6).toFixed(2)}M`;
  if (vol >= 1e3) return `${(vol / 1e3).toFixed(2)}K`;
  return vol.toFixed(2);
};

/* ------------------------------------------------------------------ */
/*  Yahoo Finance REST Polling Hook (with CORS proxy)                 */
/* ------------------------------------------------------------------ */

interface YahooTickerData {
  price: number;
  change: number;
  changePercent: number;
  dayHigh: number;
  dayLow: number;
  volume: number;
}

// Public CORS proxy – if it ever fails, replace with your own (see note at end)
const CORS_PROXY = "https://corsproxy.io/?";

const useYahooFinancePoll = (symbols: string[]): Record<string, YahooTickerData> => {
  const [data, setData] = useState<Record<string, YahooTickerData>>({});

  const fetchData = useCallback(async () => {
    const results = await Promise.allSettled(
      symbols.map(async (symbol) => {
        const yahooId = yahooSymbolMap[symbol] || symbol;
        const targetUrl = `https://query1.finance.yahoo.com/v8/finance/chart/${yahooId}?interval=1m&range=1d`;
        const url = CORS_PROXY + encodeURIComponent(targetUrl);
        try {
          const resp = await fetch(url);
          const json = await resp.json();
          const result = json?.chart?.result?.[0];
          if (!result) return null;
          const meta = result.meta;
          const previousClose = meta.previousClose || meta.chartPreviousClose || meta.regularMarketPrice;
          const price = meta.regularMarketPrice;
          if (price == null) return null;
          const change = price - previousClose;
          const changePercent = previousClose ? (change / previousClose) * 100 : 0;
          return {
            symbol,
            data: {
              price,
              change,
              changePercent,
              dayHigh: meta.regularMarketDayHigh || price,
              dayLow: meta.regularMarketDayLow || price,
              volume: meta.regularMarketVolume || 0,
            },
          };
        } catch (e) {
          console.warn(`Yahoo fetch failed for ${symbol}`, e);
          return null;
        }
      })
    );

    const newData: Record<string, YahooTickerData> = {};
    results.forEach((r) => {
      if (r.status === "fulfilled" && r.value) {
        newData[r.value.symbol] = r.value.data;
      }
    });
    setData((prev) => ({ ...prev, ...newData }));
  }, [symbols]);

  useEffect(() => {
    if (symbols.length === 0) return;
    fetchData();
    const interval = setInterval(fetchData, 5000); // update every 5s
    return () => clearInterval(interval);
  }, [symbols, fetchData]);

  return data;
};

/* ------------------------------------------------------------------ */
/*  Binance WebSocket Hook (Crypto)                                   */
/* ------------------------------------------------------------------ */

interface BinanceTickerData {
  price: number;
  change: number;
  changePercent: number;
  high: number;
  low: number;
  volume: number;
}

const useBinanceStream = (symbols: string[], enabled: boolean): Record<string, BinanceTickerData> => {
  const [data, setData] = useState<Record<string, BinanceTickerData>>({});
  const wsRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    if (!enabled || symbols.length === 0) {
      if (wsRef.current) {
        wsRef.current.close();
        wsRef.current = null;
      }
      return;
    }

    const streams = symbols.map((s) => `${s.toLowerCase()}@ticker`).join("/");
    const url = `wss://stream.binance.com:9443/stream?streams=${streams}`;

    const ws = new WebSocket(url);
    wsRef.current = ws;

    ws.onmessage = (event) => {
      const msg = JSON.parse(event.data);
      if (msg?.data) {
        const t = msg.data;
        const binanceSymbol: string = t.s;
        const ourSymbol = binanceSymbol.replace("USDT", "USD");
        const price = parseFloat(t.c);
        const change = parseFloat(t.p);
        const changePercent = parseFloat(t.P);
        const high = parseFloat(t.h);
        const low = parseFloat(t.l);
        const volume = parseFloat(t.q);

        if (!isNaN(price)) {
          setData((prev) => ({
            ...prev,
            [ourSymbol]: { price, change, changePercent, high, low, volume },
          }));
        }
      }
    };

    ws.onerror = (err) => console.error("Binance WS error", err);

    return () => {
      ws.close();
      wsRef.current = null;
    };
  }, [symbols, enabled]);

  return data;
};

/* ------------------------------------------------------------------ */
/*  Main Market Component                                             */
/* ------------------------------------------------------------------ */

const ForexMarket: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<MarketCategory>("Forex");
  const [lastUpdate, setLastUpdate] = useState(Date.now());

  const activeSymbols = useMemo(() => {
    return categoryConfig[activeCategory].symbols;
  }, [activeCategory]);

  // Real data hooks
  const yahooData = useYahooFinancePoll(
    activeCategory !== "Crypto" ? activeSymbols : []
  );
  const cryptoBinanceSymbols = useMemo(
    () => categoryConfig.Crypto.symbols.map((s) => s.replace("USD", "USDT")),
    []
  );
  const binanceData = useBinanceStream(
    cryptoBinanceSymbols,
    activeCategory === "Crypto"
  );

  // Build display items
  const marketItems = useMemo<MarketItem[]>(() => {
    return activeSymbols.map((symbol) => {
      if (activeCategory === "Crypto") {
        const ticker = binanceData[symbol];
        if (ticker) {
          const price = ticker.price;
          const change = ticker.change;
          const changePercent = ticker.changePercent;
          const isPositive = changePercent >= 0;
          return {
            symbol,
            name: getDisplayName(symbol).short,
            fullName: getDisplayName(symbol).full,
            price: formatPriceValue(symbol, price),
            change: `${change >= 0 ? "+" : ""}${change.toFixed(2)}`,
            changePercent: `${changePercent >= 0 ? "+" : ""}${changePercent.toFixed(2)}`,
            isPositive,
            volume: formatVolume(ticker.volume),
          };
        }
        return {
          symbol,
          name: getDisplayName(symbol).short,
          fullName: getDisplayName(symbol).full,
          price: "—",
          change: "—",
          changePercent: "—",
          isPositive: true,
          volume: "—",
        };
      }

      // Non‑crypto: Yahoo
      const ticker = yahooData[symbol];
      if (ticker) {
        const price = ticker.price;
        const change = ticker.change;
        const changePercent = ticker.changePercent;
        const isPositive = changePercent >= 0;
        return {
          symbol,
          name: getDisplayName(symbol).short,
          fullName: getDisplayName(symbol).full,
          price: formatPriceValue(symbol, price),
          change: `${change >= 0 ? "+" : ""}${change.toFixed(2)}`,
          changePercent: `${changePercent >= 0 ? "+" : ""}${changePercent.toFixed(2)}`,
          isPositive,
          volume: formatVolume(ticker.volume),
        };
      }
      return {
        symbol,
        name: getDisplayName(symbol).short,
        fullName: getDisplayName(symbol).full,
        price: "—",
        change: "—",
        changePercent: "—",
        isPositive: true,
        volume: "—",
      };
    });
  }, [activeCategory, activeSymbols, binanceData, yahooData]);

  useEffect(() => {
    if (Object.keys(yahooData).length > 0 || Object.keys(binanceData).length > 0) {
      setLastUpdate(Date.now());
    }
  }, [yahooData, binanceData]);

  const formatTime = (timestamp: number) =>
    new Date(timestamp).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });

  const isLoading =
    activeCategory === "Crypto"
      ? Object.keys(binanceData).length === 0
      : Object.keys(yahooData).length === 0;

  return (
    <div className="market-app">
      {/* Category Tabs */}
      <div className="category-tabs">
        {(Object.keys(categoryConfig) as MarketCategory[]).map((cat) => (
          <button
            key={cat}
            className={`tab-btn ${activeCategory === cat ? "active" : ""}`}
            onClick={() => setActiveCategory(cat)}
          >
            {categoryConfig[cat].title}
          </button>
        ))}
      </div>

      {/* Live indicator */}
      <div className="live-indicator">
        <span className="live-dot" />
        <span className="live-text">
          {activeCategory === "Crypto" ? "Live" : "Real-time"} · Updated {formatTime(lastUpdate)}
        </span>
      </div>

      {/* Market List */}
      <div className="market-list">
        {isLoading
          ? Array.from({ length: 8 }).map((_, i) => (
              <div className="skeleton-row" key={i}>
                <div className="skeleton-box icon" />
                <div className="skeleton-box name" />
                <div className="skeleton-box price" />
                <div className="skeleton-box change" />
              </div>
            ))
          : marketItems.map((item) => (
              <Link
                to={`/market/detail/${item.symbol}`}
                key={item.symbol}
                className="market-row-link"
              >
                <div className="market-row">
                  <div className="asset-cell">
                    <div className="asset-icon">
                      {item.symbol.slice(0, 3).toUpperCase()}
                    </div>
                    <div className="asset-text">
                      <span className="symbol">{item.name}</span>
                      <span className="full-name">{item.fullName}</span>
                    </div>
                  </div>

                  <div className="price-cell">
                    <span className="last-price">${item.price}</span>
                    <span className="volume">{item.volume}</span>
                  </div>

                  <div className={`change-cell ${item.isPositive ? "positive" : "negative"}`}>
                    <span className="change-percent">{item.changePercent}%</span>
                    <span className="change-abs">{item.change}</span>
                  </div>
                </div>
              </Link>
            ))}
      </div>

      <style>{`
        .market-app {
          max-width: 480px;
          margin: 0 auto;
          background: #0a0b0d;
          min-height: 100vh;
          color: #eaeaea;
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
          padding: 20px 16px;
          box-sizing: border-box;
        }
        .category-tabs {
          display: flex;
          gap: 8px;
          overflow-x: auto;
          padding-bottom: 12px;
          scrollbar-width: none;
        }
        .category-tabs::-webkit-scrollbar { display: none; }
        .tab-btn {
          background: #1a1d21;
          border: 1px solid #2a2d31;
          border-radius: 24px;
          padding: 10px 18px;
          font-size: 14px;
          font-weight: 500;
          color: #aaa;
          white-space: nowrap;
          cursor: pointer;
          transition: all 0.2s;
        }
        .tab-btn.active {
          background: #00e676;
          color: #000;
          border-color: #00e676;
          font-weight: 600;
        }
        .tab-btn:not(.active):hover {
          border-color: #00e676;
          color: #fff;
        }
        .live-indicator {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 18px;
          font-size: 12px;
          color: #999;
        }
        .live-dot {
          width: 8px;
          height: 8px;
          background: #00e676;
          border-radius: 50%;
          animation: pulse-dot 2s infinite;
        }
        @keyframes pulse-dot {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }
        .market-list {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        .market-row-link {
          text-decoration: none;
          color: inherit;
        }
        .market-row {
          display: flex;
          align-items: center;
          background: #111318;
          border: 1px solid #1e2025;
          border-radius: 12px;
          padding: 12px 14px;
          transition: border-color 0.2s, background 0.2s;
        }
        .market-row:hover {
          border-color: #00e676;
          background: #16181d;
        }
        .asset-cell {
          display: flex;
          align-items: center;
          gap: 12px;
          flex: 1.5;
        }
        .asset-icon {
          width: 40px;
          height: 40px;
          border-radius: 10px;
          background: linear-gradient(135deg, #1e2a33, #0f1419);
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          font-size: 12px;
          color: #00e676;
          letter-spacing: 0.5px;
          border: 1px solid #2a2d31;
        }
        .asset-text {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }
        .symbol {
          font-weight: 600;
          font-size: 15px;
          color: #f0f0f0;
        }
        .full-name {
          font-size: 12px;
          color: #888;
        }
        .price-cell {
          flex: 1.2;
          text-align: right;
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 2px;
        }
        .last-price {
          font-size: 16px;
          font-weight: 600;
          color: #fff;
          font-family: 'JetBrains Mono', monospace;
        }
        .volume {
          font-size: 11px;
          color: #666;
        }
        .change-cell {
          flex: 1;
          text-align: right;
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 2px;
          font-weight: 600;
          font-size: 15px;
        }
        .change-percent {
          font-family: 'JetBrains Mono', monospace;
        }
        .change-abs {
          font-size: 12px;
          font-weight: 500;
          color: #999;
        }
        .positive .change-percent {
          color: #00e676;
        }
        .negative .change-percent {
          color: #ff4d4d;
        }
        .skeleton-row {
          display: flex;
          align-items: center;
          padding: 12px 14px;
          border-radius: 12px;
          background: #111318;
          border: 1px solid #1e2025;
          gap: 12px;
        }
        .skeleton-box {
          background: #1e2025;
          border-radius: 8px;
          animation: shimmer 1.5s infinite;
        }
        .skeleton-box.icon {
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }
        .skeleton-box.name { flex: 1; height: 16px; }
        .skeleton-box.price { width: 80px; height: 16px; }
        .skeleton-box.change { width: 60px; height: 16px; }
        @keyframes shimmer {
          0% { opacity: 0.4; }
          50% { opacity: 0.8; }
          100% { opacity: 0.4; }
        }
      `}</style>
    </div>
  );
};

export default ForexMarket;