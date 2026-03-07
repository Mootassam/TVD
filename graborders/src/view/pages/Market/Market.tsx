import axios from "axios";
import React, { useState, useEffect, useMemo, useRef, useCallback } from "react";
import { Link } from "react-router-dom";
import { i18n } from "../../../i18n";

// Interface for Binance ticker data
interface BinanceTicker {
  s: string; // Symbol
  c: string; // Last price
  P: string; // Price change percent
  v: string; // Total traded base asset volume
  p: string; // Price change
  q: string; // Quote asset volume (USDT volume)
}

// Interface for cryptocurrency data
interface CryptoData {
  symbol: string;
  name: string;
  price: string;
  change: string;
  changePercent: string;
  volume: string;
  volumeFormatted: string;
  isPositive: boolean;
  quoteVolume: number;
}

// Main Market Component
const Market: React.FC = () => {
  const [cryptoData, setCryptoData] = useState<{ [key: string]: CryptoData }>({});
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const ws = useRef<WebSocket | null>(null);
  const dataFetchController = useRef<AbortController | null>(null);
  const isComponentMounted = useRef(true);

  // Specific list of pairs you want to display
  const targetPairs = useMemo(() => [
    "SHIBUSDT", "USDCUSDT", "DOGEUSDT", "TRXUSDT",
    "XRPUSDT", "ADAUSDT", "FILUSDT", "TONUSDT",
    "MATICUSDT", "DOTUSDT", "SOLUSDT", "TRUMPUSDT",
    "EOSUSDT", "LINKUSDT", "ZECUSDT", "DASHUSDT",
    "LTCUSDT", "ETHUSDT", "BCHUSDT", "BNBUSDT",
    "BTCUSDT", "XMRUSDT", "YFIUSDT"
  ], []);

  // Format volume helper
  const formatVolume = useCallback((volumeNum: number) => {
    if (volumeNum >= 1000000000) {
      return (volumeNum / 1000000000).toFixed(1) + "B";
    } else if (volumeNum >= 1000000) {
      return (volumeNum / 1000000).toFixed(1) + "M";
    }
    return volumeNum.toFixed(0);
  }, []);

  // Format price helper
  const formatPrice = useCallback((price: string) => {
    const priceNum = Number(price);
    if (isNaN(priceNum)) return "0.00";
    
    return priceNum.toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: priceNum < 1 ? 6 : 4,
    });
  }, []);

  // Cancel pending requests
  const cancelPendingRequests = useCallback(() => {
    if (dataFetchController.current) {
      dataFetchController.current.abort();
      dataFetchController.current = null;
    }
  }, []);

  // Close WebSocket
  const closeWebSocket = useCallback(() => {
    if (ws.current) {
      try {
        ws.current.onclose = null;
        ws.current.close();
      } catch (error) {
        console.warn("Error closing WebSocket:", error);
      }
      ws.current = null;
    }
  }, []);

  // Fetch initial market data for specific pairs
  useEffect(() => {
    const fetchSpecificPrices = async () => {
      try {
        setIsLoading(true);
        
        // Cancel any existing requests
        cancelPendingRequests();
        dataFetchController.current = new AbortController();
        const signal = dataFetchController.current.signal;

        // Set timeout for API call
        const timeoutPromise = new Promise<never>((_, reject) => {
          setTimeout(() => reject(new Error(i18n('common.timeout'))), 5000);
        });

        // Create symbols parameter for batch request
        const symbolsParam = targetPairs.map(symbol => `"${symbol}"`).join(',');
        const url = `https://api.binance.com/api/v3/ticker/24hr?symbols=[${symbolsParam}]`;

        const fetchPromise = axios.get(url, { signal });
        const response = await Promise.race([fetchPromise, timeoutPromise]);

        const formattedData: { [key: string]: CryptoData } = {};

        response.data.forEach((item: any) => {
          const symbol = item.symbol;
          const baseSymbol = symbol.replace("USDT", "");
          const isPositive = parseFloat(item.priceChangePercent) >= 0;
          const changePercent = Math.abs(Number(item.priceChangePercent)).toFixed(2);

          formattedData[symbol] = {
            symbol,
            name: `${baseSymbol}/USDT`,
            price: formatPrice(item.lastPrice),
            change: item.priceChange,
            changePercent: changePercent,
            volume: item.volume,
            volumeFormatted: formatVolume(Number(item.volume)),
            isPositive: isPositive,
            quoteVolume: parseFloat(item.quoteVolume),
          };
        });

        // Fill in any missing pairs with placeholder data
        targetPairs.forEach(symbol => {
          if (!formattedData[symbol]) {
            const baseSymbol = symbol.replace("USDT", "");
            formattedData[symbol] = {
              symbol,
              name: `${baseSymbol}/USDT`,
              price: "0.00",
              change: "0.00",
              changePercent: "0.00",
              volume: "0",
              volumeFormatted: "0",
              isPositive: true,
              quoteVolume: 0,
            };
          }
        });

        if (isComponentMounted.current) {
          setCryptoData(formattedData);
          setIsLoading(false);
        }
      } catch (error: any) {
        if (error.name === 'AbortError') {
          console.log(i18n('common.requestAborted'));
          return;
        }
        console.error(i18n('common.fetchError'), error);
        
        // Set fallback data
        const fallbackData: { [key: string]: CryptoData } = {};
        targetPairs.forEach(symbol => {
          const baseSymbol = symbol.replace("USDT", "");
          fallbackData[symbol] = {
            symbol,
            name: `${baseSymbol}/USDT`,
            price: "0.00",
            change: "0.00",
            changePercent: "0.00",
            volume: "0",
            volumeFormatted: "0",
            isPositive: true,
            quoteVolume: 0,
          };
        });

        if (isComponentMounted.current) {
          setCryptoData(fallbackData);
          setIsLoading(false);
        }
      }
    };

    fetchSpecificPrices();

    return () => {
      cancelPendingRequests();
    };
  }, [targetPairs, formatPrice, formatVolume, cancelPendingRequests]);

  // Setup optimized WebSocket for real-time updates
  useEffect(() => {
    isComponentMounted.current = true;

    const setupWebSocket = () => {
      try {
        // Create individual streams for better performance
        const streams = targetPairs.map(pair => `${pair.toLowerCase()}@ticker`).join('/');
        ws.current = new WebSocket(`wss://stream.binance.com:9443/ws/${streams}`);

        ws.current.onopen = () => {
          console.log(i18n('pages.market.websocketConnected'));
        };

        ws.current.onmessage = (event) => {
          if (!isComponentMounted.current) return;

          try {
            const data = JSON.parse(event.data);
            
            // Handle both array (for multiple streams) and single object
            const updates = Array.isArray(data) ? data : [data];

            setCryptoData((prevData) => {
              const newData = { ...prevData };

              updates.forEach((ticker: BinanceTicker) => {
                if (targetPairs.includes(ticker.s) && newData[ticker.s]) {
                  const isPositive = parseFloat(ticker.P) >= 0;
                  const changePercent = Math.abs(Number(ticker.P)).toFixed(2);

                  newData[ticker.s] = {
                    ...newData[ticker.s],
                    price: formatPrice(ticker.c),
                    change: ticker.p,
                    changePercent: changePercent,
                    volume: ticker.v,
                    volumeFormatted: formatVolume(Number(ticker.v)),
                    isPositive: isPositive,
                    quoteVolume: parseFloat(ticker.q),
                  };
                }
              });

              return newData;
            });
          } catch (error) {
            console.error(i18n('pages.market.websocketParseError'), error);
          }
        };

        ws.current.onerror = (error) => {
          console.error(i18n('pages.market.websocketError'), error);
        };

        ws.current.onclose = (event) => {
          console.log(i18n('pages.market.websocketClosed'), event.code);
          // Reconnect after delay if not normal closure
          if (event.code !== 1000 && isComponentMounted.current) {
            setTimeout(() => {
              if (isComponentMounted.current) {
                setupWebSocket();
              }
            }, 2000);
          }
        };
      } catch (error) {
        console.error(i18n('pages.market.websocketSetupError'), error);
      }
    };

    setupWebSocket();

    return () => {
      isComponentMounted.current = false;
      closeWebSocket();
    };
  }, [targetPairs, formatPrice, formatVolume, closeWebSocket]);

  // Filter cryptocurrencies based on search
  const filteredCrypto = useMemo(() => {
    const cryptoArray = Object.values(cryptoData);

    if (cryptoArray.length === 0) return [];

    let filtered = cryptoArray;

    // Apply search filter
    if (searchTerm) {
      const searchTermLower = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (crypto) =>
          crypto.name.toLowerCase().includes(searchTermLower) ||
          crypto.symbol.toLowerCase().includes(searchTermLower)
      );
    }

    // Return in the order of targetPairs
    return targetPairs
      .map(symbol => filtered.find(crypto => crypto.symbol === symbol))
      .filter(Boolean) as CryptoData[];
  }, [cryptoData, searchTerm, targetPairs]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const clearSearch = useCallback(() => {
    setSearchTerm("");
  }, []);

  // Loading placeholder row
  const LoadingRow = useCallback(({ pair }: { pair: string }) => (
    <div className="loading-row">
      <div className="loading-icon"></div>
      <div className="loading-line"></div>
      <div className="loading-line short"></div>
      <div className="loading-line"></div>
    </div>
  ), []);

  return (
    <div className="market-container">
      {/* Header with title and search */}
      <div className="market-header">
        <h1 className="market-title">{i18n('pages.market.title')}</h1>
        <div className="search-wrapper">
          <i className="fas fa-search search-icon" />
          <input
            type="text"
            className="search-input"
            placeholder={i18n('pages.market.search.placeholder')}
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

      {/* Market List */}
      <div className="market-list">
        {/* Table header (hidden on mobile if desired, but kept for clarity) */}
        <div className="list-header">
          <span>{i18n('pages.market.tableHeaders.pair')}</span>
          <span>{i18n('pages.market.tableHeaders.latestPrice')}</span>
          <span>{i18n('pages.market.tableHeaders.change24h')}</span>
        </div>

        {isLoading ? (
          <div className="loading-container">
            {targetPairs.map((pair) => (
              <LoadingRow key={pair} pair={pair} />
            ))}
          </div>
        ) : filteredCrypto.length > 0 ? (
          filteredCrypto.map((crypto) => (
            <Link
              key={crypto.symbol}
              to={`/market/detail/${crypto.symbol}`}
              className="crypto-link"
            >
              <div className="crypto-row">
                <div className="crypto-pair">
                  <div className="crypto-icon">
                    <img
                      src={`https://images.weserv.nl/?url=https://bin.bnbstatic.com/static/assets/logos/${crypto.name.split("/")[0]}.png`}
                      alt={crypto.name.split("/")[0]}
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                        // Show text fallback
                        const parent = target.parentElement;
                        if (parent) {
                          parent.innerText = crypto.name.split("/")[0].substring(0, 2);
                          parent.style.display = 'flex';
                          parent.style.alignItems = 'center';
                          parent.style.justifyContent = 'center';
                        }
                      }}
                    />
                  </div>
                  <span className="pair-name">{crypto.name}</span>
                </div>
                <div className="crypto-price">
                  <span className="price">${crypto.price}</span>
                </div>
                <div className="crypto-change">
                  <span className={crypto.isPositive ? "change-positive" : "change-negative"}>
                    {crypto.isPositive ? '+' : ''}{crypto.changePercent}%
                  </span>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <div className="no-results">
            {i18n('pages.market.noResults')}
          </div>
        )}
      </div>

      <style>{`
        .market-container {
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

        .market-header {
          margin-bottom: 24px;
        }

        .market-title {
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

        .crypto-link {
          text-decoration: none;
          display: block;
          margin-bottom: 8px;
        }

        .crypto-row {
          background-color: #1c1c1c;
          border: 1px solid #2a2a2a;
          border-radius: 8px;
          padding: 12px 16px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          transition: border-color 0.2s;
        }
        .crypto-row:hover {
          border-color: #39FF14;
        }

        .crypto-pair {
          display: flex;
          align-items: center;
          gap: 12px;
          flex: 2;
        }

        .crypto-icon {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background-color: #2a2a2a;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #39FF14;
          font-weight: bold;
          font-size: 14px;
          overflow: hidden;
        }
        .crypto-icon img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .pair-name {
          color: #ffffff;
          font-weight: 500;
          font-size: 14px;
        }

        .crypto-price {
          flex: 1;
          text-align: right;
          color: #ffffff;
          font-weight: 500;
          font-size: 14px;
        }

        .crypto-change {
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

        /* Loading states */
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

export default Market;