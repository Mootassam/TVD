import React, { useState, useEffect, useMemo, useCallback, useRef } from "react";
import { Link } from "react-router-dom";
import { MarketProvider, fetchAllCryptoPrices, cryptoCoinIds } from "./MarketContext";

interface MarketItem {
  symbol: string;
  name: string;
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
    symbols: ["EURUSD", "GBPUSD", "USDJPY", "AUDUSD", "USDCAD", "USDCHF", "NZDUSD", "EURGBP", "EURJPY", "GBPJPY", "AUDJPY", "EURAUD", "GBPAUD", "USDMXN", "USDTRY", "USDZAR", "USDSGD", "USDHKD", "USDKRW", "USDINR", "EURCHF", "EURNZD", "GBPEUR", "AUDNZD", "CADJPY", "CHFJPY", "NZDJPY", "SGDJPY", "HKDJPY", "ZARJPY"],
  },
  Metal: {
    title: "Metals",
    symbols: ["XAUUSD", "XAGUSD", "XPTUSD", "XPDUSD", "XAUEUR", "XAGEUR", "XPTEUR", "XAUGBP", "XAGGBP"],
  },
  Oil: {
    title: "Oil",
    symbols: ["USOIL", "UKOIL", "BRENT", "WTI", "CRUDE", "NGAS", "HEAT", "GAS"],
  },
  CFD: {
    title: "CFD",
    symbols: ["US30", "US500", "NAS100", "US2000", "GER40", "UK100", "FRA40", "EU50", "JP225", "HK50", "AUS200", "TWII", "KR100", "IN50", "TECH100"],
  },
  Crypto: {
    title: "Crypto",
    symbols: ["BTCUSD", "ETHUSD", "XRPUSD", "SOLUSD", "ADAUSD", "DOGEUSD", "DOTUSD", "AVAXUSD", "LINKUSD", "MATICUSD", "UNIUSD", "ATOMUSD", "LTCUSD", "BCHUSD", "NEARUSD", "ALGOUSD", "VETUSD", "FILUSD", "THETAUSD", "AXSUSD", "SANDUSD", "MANAUSD", "ENJUSD", "CHZUSD", "APEUSD"],
  },
};

const basePrices: Record<string, number> = {
  EURUSD: 1.0842, GBPUSD: 1.2635, USDJPY: 148.65, AUDUSD: 0.6532, USDCAD: 1.3580, USDCHF: 0.8795, NZDUSD: 0.6025, EURGBP: 0.8590, EURJPY: 161.15, GBPJPY: 187.65, AUDJPY: 97.15, EURAUD: 1.6590, GBPAUD: 1.9340, USDMXN: 17.25, USDTRY: 32.15, USDZAR: 18.95, USDSGD: 1.3420, USDHKD: 7.8185, USDKRW: 1335.00, USDINR: 83.25, EURCHF: 0.9530, EURNZD: 1.7990, GBPEUR: 1.1645, AUDNZD: 1.0845, CADJPY: 109.50, CHFJPY: 169.05, NZDJPY: 91.25, SGDJPY: 110.75, HKDJPY: 19.02, ZARJPY: 7.85,
  XAUUSD: 2345.80, XAGUSD: 28.25, XPTUSD: 985.50, XPDUSD: 1045.00, XAUEUR: 2165.00, XAGEUR: 26.05, XPTEUR: 908.00, XAUGBP: 1855.00, XAGGBP: 22.35,
  USOIL: 84.25, UKOIL: 87.85, BRENT: 87.15, WTI: 84.35, CRUDE: 84.50, NGAS: 2.85, HEAT: 2.65, GAS: 2.75,
  US30: 38550, US500: 5125, NAS100: 18450, US2000: 2185, GER40: 18485, UK100: 8075, FRA40: 7525, EU50: 4895, JP225: 39750, HK50: 16750, AUS200: 7850, TWII: 20750, KR100: 2850, IN50: 22450, TECH100: 8450,
  BTCUSD: 67450, ETHUSD: 3425, XRPUSD: 0.515, SOLUSD: 142.50, ADAUSD: 0.445, DOGEUSD: 0.0825, DOTUSD: 7.15, AVAXUSD: 34.85, LINKUSD: 14.25, MATICUSD: 0.585, UNIUSD: 6.85, ATOMUSD: 8.45, LTCUSD: 84.50, BCHUSD: 485.00, NEARUSD: 5.25, ALGOUSD: 0.185, VETUSD: 0.0225, FILUSD: 5.85, THETAUSD: 0.985, AXSUSD: 6.85, SANDUSD: 0.425, MANAUSD: 0.385, ENJUSD: 0.285, CHZUSD: 0.085, APEUSD: 1.25,
};

const formatPriceValue = (symbol: string, price: number): string => {
  if (["XAUUSD", "XAUEUR", "XAUGBP"].includes(symbol)) return price.toFixed(2);
  if (["XAGUSD", "XAGEUR", "XAGGBP"].includes(symbol)) return price.toFixed(2);
  if (["XPTUSD", "XPTEUR"].includes(symbol)) return price.toFixed(2);
  if (["XPDUSD"].includes(symbol)) return price.toFixed(2);
  if (["USOIL", "UKOIL", "BRENT", "WTI", "CRUDE"].includes(symbol)) return price.toFixed(2);
  if (["NGAS", "HEAT", "GAS"].includes(symbol)) return price.toFixed(3);
  if (["BTCUSD", "ETHUSD"].includes(symbol)) return price.toFixed(2);
  if (["XRPUSD", "ADAUSD", "DOGEUSD", "MATICUSD", "UNIUSD", "THETAUSD", "CHZUSD", "APEUSD"].includes(symbol)) return price.toFixed(4);
  if (["LTCUSD", "BCHUSD", "FILUSD", "AXSUSD", "SANDUSD", "MANAUSD", "ENJUSD"].includes(symbol)) return price.toFixed(2);
  if (["DOTUSD", "AVAXUSD", "LINKUSD", "ATOMUSD", "NEARUSD"].includes(symbol)) return price.toFixed(2);
  if (["ALGOUSD", "VETUSD"].includes(symbol)) return price.toFixed(4);
  if (["US30", "US500", "NAS100", "US2000", "GER40", "UK100", "FRA40", "EU50", "JP225", "HK50", "AUS200", "TWII", "KR100", "IN50", "TECH100"].includes(symbol)) return price.toFixed(0);
  if (symbol.endsWith("JPY")) return price.toFixed(3);
  if (symbol.includes("USD") && !symbol.startsWith("USD")) return price.toFixed(5);
  return price.toFixed(2);
};

const getDisplayName = (symbol: string): string => {
  const names: Record<string, string> = {
    XAUUSD: "Gold", XAGUSD: "Silver", XPTUSD: "Platinum", XPDUSD: "Palladium",
    XAUEUR: "Gold/EUR", XAGEUR: "Silver/EUR", XPTEUR: "Platinum/EUR", XAUGBP: "Gold/GBP", XAGGBP: "Silver/GBP",
    USOIL: "US Oil", UKOIL: "UK Oil", BRENT: "Brent", WTI: "WTI", CRUDE: "Crude",
    NGAS: "Natural Gas", HEAT: "Heating Oil", GAS: "Gasoline",
    US30: "Dow 30", US500: "S&P 500", NAS100: "Nasdaq 100", US2000: "Russell 2000",
    GER40: "DAX", UK100: "FTSE 100", FRA40: "CAC 40", EU50: "Euro Stoxx 50",
    JP225: "Nikkei 225", HK50: "Hang Seng", AUS200: "ASX 200", TWII: "Taiwan",
    KR100: "KOSPI", IN50: "Nifty 50", TECH100: "Tech 100",
    BTCUSD: "Bitcoin", ETHUSD: "Ethereum", XRPUSD: "Ripple", SOLUSD: "Solana",
    ADAUSD: "Cardano", DOGEUSD: "Dogecoin", DOTUSD: "Polkadot", AVAXUSD: "Avalanche",
    LINKUSD: "Chainlink", MATICUSD: "Polygon", UNIUSD: "Uniswap", ATOMUSD: "Cosmos",
    LTCUSD: "Litecoin", BCHUSD: "Bitcoin Cash", NEARUSD: "Near", ALGOUSD: "Algorand",
    VETUSD: "VeChain", FILUSD: "Filecoin", THETAUSD: "Theta", AXSUSD: "Axie Infinity",
    SANDUSD: "The Sandbox", MANAUSD: "Decentraland", ENJUSD: "Enjin Coin", CHZUSD: "Chiliz", APEUSD: "ApeCoin",
  };
  return names[symbol] || symbol;
};

const ForexMarket: React.FC = () => {
  const [marketData, setMarketData] = useState<{ [key: string]: MarketItem }>({});
  const [activeCategory, setActiveCategory] = useState<MarketCategory>("Forex");
  const [isLoading, setIsLoading] = useState(true);
  const [lastUpdate, setLastUpdate] = useState<number>(Date.now());
  const updateInterval = useRef<ReturnType<typeof setInterval> | null>(null);
  const isComponentMounted = useRef(true);
  const cryptoCache = useRef<{ [key: string]: { price: number; change: number; timestamp: number } }>({});

  // Use shared crypto prices from MarketContext
  const updatePrices = useCallback(async () => {
    if (activeCategory === "Crypto") {
      await fetchAllCryptoPrices();
    }

    setMarketData(prevData => {
      const newData = { ...prevData };
      const symbols = categoryConfig[activeCategory].symbols;

      symbols.forEach(symbol => {
        let basePrice = basePrices[symbol] || 1.0;
        let currentPrice = basePrice;

        if (prevData[symbol]) {
          currentPrice = parseFloat(prevData[symbol].price);
        } else {
          if (activeCategory === "Crypto" && cryptoCache.current[symbol]) {
            currentPrice = cryptoCache.current[symbol].price;
          }
        }

        let changePercent = 0;
        let changeVal = "0.00";

        if (activeCategory === "Crypto" && cryptoCache.current[symbol] && cryptoCache.current[symbol].change != null && !isNaN(cryptoCache.current[symbol].change)) {
          changePercent = cryptoCache.current[symbol].change;
          changeVal = Number(changePercent).toFixed(2);
        } else {
          const range = activeCategory === "Metal" ? 0.001 : activeCategory === "Oil" ? 0.002 : activeCategory === "CFD" ? 0.001 : 0.0005;
          changePercent = (Math.random() * 2 - 1) * range;
          changeVal = (changePercent * 100).toFixed(2);
        }

        const newPrice = currentPrice * (1 + changePercent / 100);
        const priceChange = newPrice - currentPrice;
        
        const isPositive = changePercent >= 0;

        newData[symbol] = {
          symbol,
          name: getDisplayName(symbol),
          price: formatPriceValue(symbol, newPrice),
          change: priceChange >= 0 ? `+${Math.abs(priceChange).toFixed(2)}` : priceChange.toFixed(2),
          changePercent: changeVal,
          isPositive,
          volume: "0",
        };

        basePrices[symbol] = newPrice;
      });

      return newData;
    });

    setLastUpdate(Date.now());
  }, [activeCategory, fetchAllCryptoPrices]);

  useEffect(() => {
    isComponentMounted.current = true;
    setIsLoading(true);
    setMarketData({});

    const loadData = async () => {
      if (activeCategory === "Crypto") {
        await fetchAllCryptoPrices();
      }
      await updatePrices();
      setIsLoading(false);
    };

    loadData();

    updateInterval.current = setInterval(() => {
      if (isComponentMounted.current) updatePrices();
    }, 2500);

    return () => {
      isComponentMounted.current = false;
      if (updateInterval.current) clearInterval(updateInterval.current);
    };
  }, [activeCategory, updatePrices, fetchAllCryptoPrices]);

  const filteredData = useMemo(() => {
    const symbols = categoryConfig[activeCategory].symbols;
    return symbols.map(sym => marketData[sym]).filter(Boolean) as MarketItem[];
  }, [marketData, activeCategory]);

  const LoadingRow = () => (
    <div className="loading-row">
      <div className="loading-icon"></div>
      <div className="loading-line"></div>
      <div className="loading-line short"></div>
    </div>
  );

  const formatTime = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", second: "2-digit" });
  };

  return (
    <div className="forex-container">
      <div className="forex-header">
        <h1 className="forex-title">{categoryConfig[activeCategory].title}</h1>
   
      </div>

      <div className="category-tabs">
        {(Object.keys(categoryConfig) as MarketCategory[]).map(category => (
          <button
            key={category}
            className={`tab-btn ${activeCategory === category ? "active" : ""}`}
            onClick={() => setActiveCategory(category)}
          >
            {categoryConfig[category].title}
          </button>
        ))}
      </div>

      <div className="forex-list">
        <div className="list-header">
          <span>Pair</span>
          <span>Price</span>
          <span>24h %</span>
        </div>

        {isLoading ? (
          <div className="loading-container">
            {categoryConfig[activeCategory].symbols.slice(0, 6).map((_, i) => <LoadingRow key={i} />)}
          </div>
        ) : filteredData.length > 0 ? (
          filteredData.map(item => (
            <Link key={item.symbol} to={`/market/detail/${item.symbol}`} className="forex-link">
              <div className="forex-row">
                <div className="forex-pair">
           
                  <span className="pair-name">{item.name}</span>
                </div>
                  <div className="forex-price">
                    <span className="price">${item.price}</span>
                  </div>
                  <div className="forex-change">
                    <span className={item.isPositive ? "change-positive" : "change-negative"}>
                      {item.isPositive ? '+' : ''}{item.changePercent}%
                    </span>
                  </div>
                </div>
              </Link>
          ))
        ) : (
          <div className="no-results">Loading data...</div>
        )}
      </div>

      <style>{`
        .forex-container {
          max-width: 430px;
          margin: 0 auto;
          min-height: 100vh;
          background-color: #0f0f0f;
          border-top: 2px solid #39FF14;
          display: flex;
          flex-direction: column;
          padding: 20px;
          box-sizing: border-box;
        }
        .forex-header {
          margin-bottom: 16px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .forex-title {
          color: #ffffff;
          font-size: 28px;
          font-weight: 600;
          margin: 0;
        }
        .last-update {
          display: flex;
          align-items: center;
          gap: 6px;
          color: #39FF14;
          font-size: 12px;
        }
        .update-dot {
          width: 8px;
          height: 8px;
          background-color: #39FF14;
          border-radius: 50%;
          animation: blink 2s infinite;
        }
        @keyframes blink {
          0%, 50%, 100% { opacity: 1; }
          25%, 75% { opacity: 0.3; }
        }
        .category-tabs {
          display: flex;
          gap: 8px;
          margin-bottom: 20px;
          overflow-x: auto;
          padding-bottom: 8px;
          scrollbar-width: none;
        }
        .category-tabs::-webkit-scrollbar {
          display: none;
        }
        .tab-btn {
          background-color: #1c1c1c;
          border: 1px solid #2a2a2a;
          border-radius: 20px;
          padding: 10px 16px;
          color: #ffffff;
          font-size: 14px;
          font-weight: 500;
          white-space: nowrap;
          cursor: pointer;
          transition: all 0.2s;
        }
        .tab-btn.active {
          background-color: #39FF14;
          color: #000000;
          border-color: #39FF14;
        }
        .tab-btn:not(.active):hover {
          border-color: #39FF14;
        }
        .list-header {
          display: flex;
          justify-content: space-between;
          padding: 0 0 8px 0;
          margin-bottom: 8px;
          border-bottom: 1px solid #2a2a2a;
          color: #777777;
          font-size: 12px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        .list-header span:first-child { flex: 2; }
        .list-header span:nth-child(2) { flex: 1; text-align: right; }
        .list-header span:nth-child(3) { flex: 0.8; text-align: right; }
        .forex-link {
          text-decoration: none;
          display: block;
          margin-bottom: 8px;
        }
        .forex-row {
          background-color: #1c1c1c;
          border: 1px solid #2a2a2a;
          border-radius: 8px;
          padding: 12px 16px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          transition: border-color 0.2s;
        }
        .forex-row:hover {
          border-color: #39FF14;
        }
        .forex-pair {
          display: flex;
          align-items: center;
          gap: 12px;
          flex: 2;
        }

        .icon-text {
          font-size: 10px;
          color: #39FF14;
          font-weight: bold;
        }
        .pair-name {
          color: #ffffff;
          font-weight: 500;
          font-size: 14px;
        }
        .forex-price {
          flex: 1;
          text-align: right;
          color: #ffffff;
          font-weight: 500;
          font-size: 14px;
        }
        .forex-change {
          flex: 0.8;
          text-align: right;
          font-weight: 600;
          font-size: 14px;
        }
        .change-positive { color: #39FF14; }
        .change-negative { color: #ff6b6b; }
        .loading-container { display: flex; flex-direction: column; gap: 8px; }
        .loading-row {
          background-color: #1c1c1c;
          border: 1px solid #2a2a2a;
          border-radius: 8px;
          padding: 12px 16px;
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .loading-icon {
          width: 32px; height: 32px;
          border-radius: 50%; background-color: #2a2a2a;
          animation: pulse 1.5s infinite;
        }
        .loading-line {
          height: 16px; background-color: #2a2a2a;
          border-radius: 4px; flex: 1;
          animation: pulse 1.5s infinite;
        }
        .loading-line.short { flex: 0.5; }
        @keyframes pulse {
          0% { opacity: 0.6; } 50% { opacity: 1; } 100% { opacity: 0.6; }
        }
        .no-results {
          text-align: center;
          padding: 40px 20px;
          color: #777777;
          font-size: 16px;
        }
      `}</style>
    </div>
  );
};

const MarketWithProvider = () => (
  <MarketProvider>
    <ForexMarket />
  </MarketProvider>
);

export default MarketWithProvider;