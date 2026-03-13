import React, { useState, useEffect, useMemo, useCallback, useRef } from "react";
import { Link } from "react-router-dom";
import { i18n } from "../../../i18n";

interface ForexData {
  symbol: string;
  name: string;
  price: string;
  change: string;
  changePercent: string;
  isPositive: boolean;
  volume: string;
  volumeFormatted: string;
  quoteVolume: number;
}

// Mapping currency codes to country codes for flags (ISO 3166-1 alpha-2)
const currencyToCountry: Record<string, string> = {
  EUR: 'eu',       // European Union
  USD: 'us',
  GBP: 'gb',
  JPY: 'jp',
  AUD: 'au',
  CAD: 'ca',
  CHF: 'ch',
  NZD: 'nz',
  MXN: 'mx',
  TRY: 'tr',
  ZAR: 'za',
  SGD: 'sg',
  HKD: 'hk',
  KRW: 'kr',
  INR: 'in',
  // Add more as needed
};

const ForexMarket: React.FC = () => {
  const [forexData, setForexData] = useState<{ [key: string]: ForexData }>({});
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const updateInterval = useRef<NodeJS.Timeout | null>(null);
  const isComponentMounted = useRef(true);

  const targetPairs = useMemo(() => [
    "EURUSD", "GBPUSD", "USDJPY", "AUDUSD", "USDCAD", "USDCHF", "NZDUSD",
    "EURGBP", "EURJPY", "GBPJPY", "AUDJPY", "EURAUD", "GBPAUD", "USDMXN",
    "USDRY", "USDZAR", "USDSGD", "USDHKD", "USDKRW", "USDINR"
  ], []);

  const formatPrice = useCallback((priceNum: number) => {
    if (isNaN(priceNum)) return "0.0000";
    return priceNum.toFixed(5);
  }, []);

  const generateRandomChange = useCallback((basePrice: number) => {
    const changePercent = (Math.random() * 4 - 2) / 100;
    const newPrice = basePrice * (1 + changePercent);
    return { price: newPrice, changePercent: changePercent * 100 };
  }, []);

  const updateForexPrices = useCallback(() => {
    setForexData((prevData) => {
      const newData = { ...prevData };
      targetPairs.forEach((symbol) => {
        if (!newData[symbol]) {
          let basePrice = 1.0;
          if (symbol === "EURUSD") basePrice = 1.0850;
          else if (symbol === "GBPUSD") basePrice = 1.2650;
          else if (symbol === "USDJPY") basePrice = 148.50;
          else if (symbol === "AUDUSD") basePrice = 0.6550;
          else if (symbol === "USDCAD") basePrice = 1.3550;
          else if (symbol === "USDCHF") basePrice = 0.8750;
          else if (symbol === "NZDUSD") basePrice = 0.6050;
          else if (symbol === "EURGBP") basePrice = 0.8570;
          else if (symbol === "EURJPY") basePrice = 161.20;
          else if (symbol === "GBPJPY") basePrice = 188.30;
          else if (symbol === "AUDJPY") basePrice = 97.20;
          else if (symbol === "EURAUD") basePrice = 1.6550;
          else if (symbol === "GBPAUD") basePrice = 1.9300;
          else if (symbol === "USDMXN") basePrice = 17.20;
          else if (symbol === "USDRY") basePrice = 30.50;
          else if (symbol === "USDZAR") basePrice = 18.90;
          else if (symbol === "USDSGD") basePrice = 1.3450;
          else if (symbol === "USDHKD") basePrice = 7.8200;
          else if (symbol === "USDKRW") basePrice = 1330.00;
          else if (symbol === "USDINR") basePrice = 83.20;

          newData[symbol] = {
            symbol,
            name: `${symbol.slice(0,3)}/${symbol.slice(3)}`,
            price: formatPrice(basePrice),
            change: "0.00",
            changePercent: "0.00",
            volume: "0",
            volumeFormatted: "0",
            isPositive: true,
            quoteVolume: 0,
          };
        }

        const currentPrice = parseFloat(newData[symbol].price);
        const { price: newPrice, changePercent } = generateRandomChange(currentPrice);
        const isPositive = changePercent >= 0;

        newData[symbol] = {
          ...newData[symbol],
          price: formatPrice(newPrice),
          change: (newPrice - currentPrice).toFixed(5),
          changePercent: Math.abs(changePercent).toFixed(2),
          isPositive,
        };
      });
      return newData;
    });
  }, [targetPairs, formatPrice, generateRandomChange]);

  useEffect(() => {
    isComponentMounted.current = true;
    setIsLoading(true);
    updateForexPrices();
    setIsLoading(false);

    updateInterval.current = setInterval(() => {
      if (isComponentMounted.current) updateForexPrices();
    }, 3000);

    return () => {
      isComponentMounted.current = false;
      if (updateInterval.current) clearInterval(updateInterval.current);
    };
  }, [updateForexPrices]);

  const filteredForex = useMemo(() => {
    const forexArray = Object.values(forexData);
    if (forexArray.length === 0) return [];
    let filtered = forexArray;
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(p => p.name.toLowerCase().includes(term) || p.symbol.toLowerCase().includes(term));
    }
    return targetPairs.map(sym => filtered.find(p => p.symbol === sym)).filter(Boolean) as ForexData[];
  }, [forexData, searchTerm, targetPairs]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value);
  const clearSearch = () => setSearchTerm("");

  const LoadingRow = () => (
    <div className="loading-row">
      <div className="loading-icon"></div>
      <div className="loading-line"></div>
      <div className="loading-line short"></div>
      <div className="loading-line"></div>
    </div>
  );

  return (
    <div className="forex-container">
      <div className="forex-header">
        <h1 className="forex-title">Forex Market</h1>
        <div className="search-wrapper">
          <i className="fas fa-search search-icon" />
          <input
            type="text"
            className="search-input"
            placeholder="Search pair (e.g., EURUSD)"
            value={searchTerm}
            onChange={handleSearchChange}
          />
          {searchTerm && (
            <button className="clear-search" onClick={clearSearch}>
              ×
            </button>
          )}
        </div>
      </div>

      <div className="forex-list">
        <div className="list-header">
          <span>Pair</span>
          <span>Latest Price</span>
          <span>Change 24h</span>
        </div>

        {isLoading ? (
          <div className="loading-container">
            {targetPairs.map(pair => <LoadingRow key={pair} />)}
          </div>
        ) : filteredForex.length > 0 ? (
          filteredForex.map(pair => {
            // Extract base currency (first 3 letters)
            const baseCurrency = pair.symbol.slice(0, 3);
            const countryCode = currencyToCountry[baseCurrency] || baseCurrency.toLowerCase(); // fallback to lowercase code
            // FlagCDN URL: https://flagcdn.com/w40/{code}.png  (40px width)
            const flagUrl = `https://flagcdn.com/w40/${countryCode}.png`;

            return (
              <Link key={pair.symbol} to={`/market/detail/${pair.symbol}`} className="forex-link">
                <div className="forex-row">
                  <div className="forex-pair">
                    <div className="forex-icon">
                      <img
                        src={flagUrl}
                        alt={baseCurrency}
                        onError={(e) => {
                          // If flag fails, fallback to currency code text
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                          const parent = target.parentElement;
                          if (parent) {
                            parent.innerText = baseCurrency;
                            parent.style.display = 'flex';
                            parent.style.alignItems = 'center';
                            parent.style.justifyContent = 'center';
                          }
                        }}
                      />
                    </div>
                    <span className="pair-name">{pair.name}</span>
                  </div>
                  <div className="forex-price">
                    <span className="price">${pair.price}</span>
                  </div>
                  <div className="forex-change">
                    <span className={pair.isPositive ? "change-positive" : "change-negative"}>
                      {pair.isPositive ? '+' : ''}{pair.changePercent}%
                    </span>
                  </div>
                </div>
              </Link>
            );
          })
        ) : (
          <div className="no-results">No matching pairs found</div>
        )}
      </div>

      <style>{`
        .forex-container {
          max-width: 430px;
          margin: 0 auto;
          min-height: 100vh;
          background-color: #000000;
          border-top: 2px solid #39FF14;
          display: flex;
          flex-direction: column;
          padding: 20px;
          box-sizing: border-box;
        }
        .forex-header {
          margin-bottom: 24px;
        }
        .forex-title {
          color: #ffffff;
          font-size: 28px;
          font-weight: 600;
          margin: 0 0 16px 0;
          text-align: center;
        }
        .search-wrapper {
          position: relative;
          width: 100%;
        }
        .search-icon {
          position: absolute;
          left: 16px;
          top: 50%;
          transform: translateY(-50%);
          color: #777777;
          font-size: 16px;
          pointer-events: none;
        }
        .search-input {
          background-color: #1c1c1c;
          border: 1px solid #2a2a2a;
          border-radius: 30px;
          height: 48px;
          width: 100%;
          padding: 0 48px 0 48px;
          color: #ffffff;
          font-size: 16px;
          outline: none;
          box-sizing: border-box;
        }
        .search-input:focus {
          border-color: #39FF14;
        }
        .search-input::placeholder {
          color: #777777;
        }
        .clear-search {
          position: absolute;
          right: 16px;
          top: 50%;
          transform: translateY(-50%);
          background: none;
          border: none;
          color: #ffffff;
          font-size: 24px;
          cursor: pointer;
          padding: 0;
          line-height: 1;
        }
        .clear-search:hover {
          color: #39FF14;
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
        .forex-icon {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background-color: #2a2a2a;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #39FF14;
          font-weight: bold;
          font-size: 12px;
          text-transform: uppercase;
          overflow: hidden;
        }
        .forex-icon img {
          width: 100%;
          height: 100%;
          object-fit: cover;
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
        .change-positive {
          color: #39FF14;
        }
        .change-negative {
          color: #ff6b6b;
        }
        .loading-container {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
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
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background-color: #2a2a2a;
          animation: pulse 1.5s infinite;
        }
        .loading-line {
          height: 16px;
          background-color: #2a2a2a;
          border-radius: 4px;
          flex: 1;
          animation: pulse 1.5s infinite;
        }
        .loading-line.short {
          flex: 0.5;
        }
        @keyframes pulse {
          0% { opacity: 0.6; }
          50% { opacity: 1; }
          100% { opacity: 0.6; }
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

export default ForexMarket;