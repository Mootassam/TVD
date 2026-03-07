import React, { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { useHistory, useParams } from "react-router-dom";
import axios from "axios";
import FuturesChart from "../Futures/FuturesChart";

import { i18n } from "../../../i18n";
import CoinSelectorSidebar from "src/view/shared/modals/CoinSelectorSidebar";

// Interface for Binance trade data
interface BinanceTrade {
  e: string;
  E: number;
  s: string;
  t: number;
  p: string;
  q: string;
  T: number;
  m: boolean;
}

// Interface for Binance ticker data
interface BinanceTicker {
  e: string;
  E: number;
  s: string;
  c: string;
  o: string;
  h: string;
  l: string;
  v: string;
  q: string;
  P: string;
}

// Interface for Binance order book data
interface BinanceOrderBook {
  lastUpdateId: number;
  bids: [string, string][];
  asks: [string, string][];
}

// Coin list interface
interface Coin {
  symbol: string;
  name: string;
}

function MarketDetail() {
  const history = useHistory();
  const { id } = useParams<{ id: string }>();

  const [marketPrice, setMarketPrice] = useState<string | null>(null);
  const [priceChangePercent, setPriceChangePercent] = useState<string | null>(null);
  const [highPrice, setHighPrice] = useState<string | null>(null);
  const [lowPrice, setLowPrice] = useState<string | null>(null);
  const [volume, setVolume] = useState<string | null>(null);
  const [quoteVolume, setQuoteVolume] = useState<string | null>(null);
  const [recentTrades, setRecentTrades] = useState<BinanceTrade[]>([]);
  const [orderBook, setOrderBook] = useState<BinanceOrderBook | null>(null);
  const [selectedCoin, setSelectedCoin] = useState(id || "BTCUSDT");
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'orderBook' | 'transactions'>('orderBook');
  const [showCoinSelector, setShowCoinSelector] = useState(false);

  const tradeWs = useRef<WebSocket | null>(null);
  const tickerWs = useRef<WebSocket | null>(null);
  const depthWs = useRef<WebSocket | null>(null);
  const currentCoinRef = useRef<string>(selectedCoin);
  const reconnectTimeouts = useRef<{ [key: string]: NodeJS.Timeout }>({});
  const dataFetchController = useRef<AbortController | null>(null);

  // Available coins
  const availableCoins = [
    { symbol: "BTCUSDT", name: "BTC / USDT" },
    { symbol: "ETHUSDT", name: "ETH / USDT" },
    { symbol: "DOTUSDT", name: "DOT / USDT" },
    { symbol: "XRPUSDT", name: "XRP / USDT" },
    { symbol: "LINKUSDT", name: "LINK / USDT" },
    { symbol: "BCHUSDT", name: "BCH / USDT" },
    { symbol: "LTCUSDT", name: "LTC / USDT" },
    { symbol: "ADAUSDT", name: "ADA / USDT" },
    { symbol: "EOSUSDT", name: "EOS / USDT" },
    { symbol: "TRXUSDT", name: "TRX / USDT" },
    { symbol: "DASHUSDT", name: "DASH / USDT" },
    { symbol: "FILUSDT", name: "FIL / USDT" },
    { symbol: "YFIUSDT", name: "YFI / USDT" },
    { symbol: "ZECUSDT", name: "ZEC / USDT" },
    { symbol: "DOGEUSDT", name: "DOGE / USDT" }
  ];

  // Format number with commas and fixed decimals
  const formatNumber = useCallback((num: string, decimals: number = 4) => {
    const number = Number(num);
    if (isNaN(number)) return "0.0000";
    return number.toLocaleString(undefined, {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    });
  }, []);

  // Format volume in billions/millions
  const formatVolume = useCallback((vol: string) => {
    const volumeNum = Number(vol);
    if (isNaN(volumeNum)) return "0.00";
    if (volumeNum >= 1000000000) {
      return (volumeNum / 1000000000).toFixed(2) + i18n("pages.marketDetail.volume.billion");
    } else if (volumeNum >= 1000000) {
      return (volumeNum / 1000000).toFixed(2) + i18n("pages.marketDetail.volume.million");
    } else if (volumeNum >= 1000) {
      return (volumeNum / 1000).toFixed(2) + "K";
    } else {
      return volumeNum.toFixed(2);
    }
  }, []);

  // Close all WebSocket connections immediately
  const closeAllWebSockets = useCallback(() => {
    // Clear all reconnection timeouts
    Object.values(reconnectTimeouts.current).forEach(timeout => {
      if (timeout) clearTimeout(timeout);
    });
    reconnectTimeouts.current = {};

    // Close WebSockets
    [tradeWs, tickerWs, depthWs].forEach(wsRef => {
      if (wsRef.current) {
        try {
          wsRef.current.onclose = null; // Remove onclose handler to prevent reconnection
          wsRef.current.close();
        } catch (error) {
          console.warn(i18n("pages.marketDetail.websocketCloseError"), error);
        }
        wsRef.current = null;
      }
    });
  }, []);

  // Cancel ongoing API requests
  const cancelPendingRequests = useCallback(() => {
    if (dataFetchController.current) {
      dataFetchController.current.abort();
      dataFetchController.current = null;
    }
  }, []);

  // Reset all data when coin changes
  const resetData = useCallback(() => {
    setMarketPrice(null);
    setPriceChangePercent(null);
    setHighPrice(null);
    setLowPrice(null);
    setVolume(null);
    setQuoteVolume(null);
    setRecentTrades([]);
    setOrderBook(null);
  }, []);

  // Update selected coin when URL param changes
  useEffect(() => {
    if (id && id !== selectedCoin) {
      console.log("Coin changing from", selectedCoin, "to", id);
      
      // Cancel pending requests and close WebSockets first
      cancelPendingRequests();
      closeAllWebSockets();
      resetData();
      
      // Update coin reference immediately
      currentCoinRef.current = id;
      setSelectedCoin(id);
    }
  }, [id, selectedCoin, closeAllWebSockets, resetData, cancelPendingRequests]);

  // Optimized data fetching with timeout
  const fetchInitialData = useCallback(async (coin: string) => {
    if (!coin) return;
    
    // Cancel any existing requests
    cancelPendingRequests();
    
    // Create new abort controller for this request
    dataFetchController.current = new AbortController();
    const signal = dataFetchController.current.signal;

    try {
      setIsLoading(true);
      
      // Set timeout for API calls (5 seconds)
      const timeoutPromise = new Promise<never>((_, reject) => {
        setTimeout(() => reject(new Error(i18n("common.timeout"))), 5000);
      });

      const fetchPromise = Promise.all([
        axios.get(`https://api.binance.com/api/v3/ticker/24hr?symbol=${coin}`, { signal }),
        axios.get(`https://api.binance.com/api/v3/trades?symbol=${coin}&limit=10`, { signal }),
        axios.get(`https://api.binance.com/api/v3/depth?symbol=${coin}&limit=10`, { signal })
      ]);

      const [tickerResponse, tradesResponse, orderBookResponse] = await Promise.race([fetchPromise, timeoutPromise]);
      
      // Only set data if we're still on the same coin
      if (currentCoinRef.current === coin) {
        const tickerData = tickerResponse.data;
        setMarketPrice(tickerData.lastPrice || tickerData.c);
        setPriceChangePercent(tickerData.priceChangePercent || tickerData.P);
        setHighPrice(tickerData.highPrice || tickerData.h);
        setLowPrice(tickerData.lowPrice || tickerData.l);
        setVolume(tickerData.volume || tickerData.v);
        setQuoteVolume(tickerData.quoteVolume || tickerData.q);
        
        // Set initial trades
        setRecentTrades(tradesResponse.data.slice(0, 5));
        
        // Set initial order book
        setOrderBook(orderBookResponse.data);
        
        setIsLoading(false);
        console.log(i18n("pages.marketDetail.initialDataLoaded"), coin);
      }
    } catch (error: any) {
      if (error.name === 'AbortError') {
        console.log(i18n("common.requestAborted"), coin);
        return;
      }
      console.error(i18n("pages.marketDetail.fetchError"), coin, ":", error);
      if (currentCoinRef.current === coin) {
        setIsLoading(false);
        // Set fallback data to prevent empty state
        setMarketPrice("0.0000");
        setPriceChangePercent("0.00");
        setHighPrice("0.0000");
        setLowPrice("0.0000");
        setVolume("0.00");
        setQuoteVolume("0.00");
      }
    }
  }, [cancelPendingRequests]);

  // Single optimized WebSocket management effect
  useEffect(() => {
    const coin = selectedCoin;
    if (!coin) return;

    console.log(i18n("pages.marketDetail.setupWebsockets"), coin);
    currentCoinRef.current = coin;

    // Fetch initial data immediately
    fetchInitialData(coin);

    let isComponentMounted = true;

    const setupWebSocket = (url: string, onMessage: (data: any) => void, type: string) => {
      if (!isComponentMounted || currentCoinRef.current !== coin) return null;

      try {
        const ws = new WebSocket(url);
        
        ws.onopen = () => {
          console.log(i18n("pages.marketDetail.websocketConnected"), type, coin);
        };

        ws.onmessage = (event: MessageEvent) => {
          if (!isComponentMounted || currentCoinRef.current !== coin) return;
          
          try {
            const data = JSON.parse(event.data);
            onMessage(data);
          } catch (error) {
            console.error(i18n("pages.marketDetail.websocketParseError"), type, error);
          }
        };

        ws.onclose = (event) => {
          console.log(i18n("pages.marketDetail.websocketClosed"), type, coin, i18n("pages.marketDetail.code"), event.code);
          
          if (isComponentMounted && currentCoinRef.current === coin) {
            // Only reconnect if it wasn't a normal closure
            if (event.code !== 1000) {
              reconnectTimeouts.current[type] = setTimeout(() => {
                if (isComponentMounted && currentCoinRef.current === coin) {
                  console.log(i18n("pages.marketDetail.reconnecting"), type, coin);
                  const newWs = setupWebSocket(url, onMessage, type);
                  if (type === 'ticker' && newWs) tickerWs.current = newWs;
                  else if (type === 'trade' && newWs) tradeWs.current = newWs;
                  else if (type === 'depth' && newWs) depthWs.current = newWs;
                }
              }, 1000);
            }
          }
        };

        ws.onerror = (error) => {
          console.error(i18n("pages.marketDetail.websocketError"), coin, type, error);
        };

        return ws;
      } catch (error) {
        console.error(i18n("pages.marketDetail.websocketCreateError"), type, error);
        return null;
      }
    };

    // Setup ticker WebSocket
    const tickerUrl = `wss://stream.binance.com:9443/ws/${coin.toLowerCase()}@ticker`;
    tickerWs.current = setupWebSocket(tickerUrl, (tickerData: BinanceTicker) => {
      setMarketPrice(tickerData.c);
      setPriceChangePercent(tickerData.P);
      setHighPrice(tickerData.h);
      setLowPrice(tickerData.l);
      setVolume(tickerData.v);
      setQuoteVolume(tickerData.q);
    }, 'ticker');

    // Setup trade WebSocket
    const tradeUrl = `wss://stream.binance.com:9443/ws/${coin.toLowerCase()}@trade`;
    tradeWs.current = setupWebSocket(tradeUrl, (tradeData: BinanceTrade) => {
      setRecentTrades((prevTrades) => {
        const newTrades = [tradeData, ...prevTrades.slice(0, 9)];
        return newTrades;
      });
    }, 'trade');

    // Setup depth WebSocket
    const depthUrl = `wss://stream.binance.com:9443/ws/${coin.toLowerCase()}@depth`;
    depthWs.current = setupWebSocket(depthUrl, (depthData: any) => {
      setOrderBook(prev => {
        if (!prev) return prev;
        return {
          lastUpdateId: depthData.u,
          bids: depthData.b && depthData.b.length > 0 ? depthData.b : prev.bids,
          asks: depthData.a && depthData.a.length > 0 ? depthData.a : prev.asks
        };
      });
    }, 'depth');

    return () => {
      console.log(i18n("pages.marketDetail.cleaningUp"), coin);
      isComponentMounted = false;
      
      // Clear all reconnection timeouts
      Object.values(reconnectTimeouts.current).forEach(timeout => {
        if (timeout) clearTimeout(timeout);
      });
      reconnectTimeouts.current = {};
      
      // Close WebSockets
      closeAllWebSockets();
    };
  }, [selectedCoin, fetchInitialData, closeAllWebSockets]);

  const goBack = useCallback(() => {
    history.goBack();
  }, [history]);

  const handleCoinSelect = (coinSymbol: string) => {
    if (coinSymbol === selectedCoin) {
      setShowCoinSelector(false);
      return;
    }
    
    console.log(i18n("pages.marketDetail.selectingCoin"), coinSymbol);
    // Navigate to the new coin's detail page
    history.push(`/market/detail/${coinSymbol}`);
  };

  const toggleCoinSelector = () => {
    setShowCoinSelector(!showCoinSelector);
  };

  // Get current coin name for display
  const currentCoinName = useMemo(() => {
    const coin = availableCoins.find(c => c.symbol === selectedCoin);
    return coin ? coin.name : `${selectedCoin.replace("USDT", "")} / USDT`;
  }, [selectedCoin]);

  // Loading placeholder component
  const LoadingPlaceholder = useCallback(({ width = "100%", height = "1em" }: { width?: string, height?: string }) => (
    <div 
      className="loading-placeholder" 
      style={{ width, height }}
    />
  ), []);

  // Memoized order book data with heat map intensities
  const orderBookData = useMemo(() => {
    if (!orderBook || !orderBook.bids || !orderBook.asks) {
      return { buySide: [], sellSide: [] };
    }

    const calculateIntensity = (orders: [string, string][]) => {
      if (!orders || orders.length === 0) return [];
      
      const quantities = orders.map(order => Number(order[1])).filter(q => !isNaN(q));
      if (quantities.length === 0) return [];
      
      const maxQuantity = Math.max(...quantities);
      const minQuantity = Math.min(...quantities);
      
      return orders.slice(0, 10).map((order) => {
        const quantity = Number(order[1]);
        let intensity = 0;
        
        if (maxQuantity > minQuantity) {
          intensity = ((quantity - minQuantity) / (maxQuantity - minQuantity)) * 100;
        }
        
        intensity = Math.max(intensity, 10); // Minimum intensity for visibility
        
        return {
          amount: formatVolume(order[1]),
          price: formatNumber(order[0]),
          intensity: Math.min(intensity, 95)
        };
      });
    };

    const buySide = calculateIntensity(orderBook.bids);
    const sellSide = calculateIntensity(orderBook.asks);

    // Ensure we have at least some data to display
    if (buySide.length === 0) {
      // Create mock data as fallback
      const basePrice = marketPrice ? Number(marketPrice) : 1.0;
      for (let i = 0; i < 10; i++) {
        buySide.push({
          amount: "0.00",
          price: (basePrice * (1 - (i + 1) * 0.001)).toFixed(4),
          intensity: 20 + i * 5
        });
        sellSide.push({
          amount: "0.00", 
          price: (basePrice * (1 + (i + 1) * 0.001)).toFixed(4),
          intensity: 20 + i * 5
        });
      }
    }

    return { buySide, sellSide };
  }, [orderBook, marketPrice, formatNumber, formatVolume]);

  return (
    <div className="market-detail-container">
      {/* Header Section */}
      <div className="header">
        <div className="nav-bar">
          <div className="back-arrow" onClick={goBack}>
            <i className="fas fa-arrow-left"></i>
          </div>
          <div className="trading-pair" onClick={toggleCoinSelector}>
            {currentCoinName}
            <i className={`fas fa-chevron-down dropdown-arrow ${showCoinSelector ? 'rotate' : ''}`}></i>
          </div>
          <div className="header-icon" onClick={toggleCoinSelector}>
            <i className="fas fa-bars"></i>
          </div>
        </div>
      </div>

      {/* Use the reusable CoinSelectorSidebar component */}
      <CoinSelectorSidebar
        isOpen={showCoinSelector}
        onClose={() => setShowCoinSelector(false)}
        selectedCoin={selectedCoin}
        onCoinSelect={handleCoinSelect}
        availableCoins={availableCoins}
        title={i18n("pages.marketDetail.coinSelector.title")}
      />

      {/* Price Section */}
      <div className="price-section">
        <div className="price-main-row">
          <div className="price-left-section">
            <div className="current-price">
              {marketPrice !== null ? (
                <span style={{ 
                  color: priceChangePercent && parseFloat(priceChangePercent) < 0 ? '#f56c6c' : '#37b66a' 
                }}>
                  {formatNumber(marketPrice)}
                </span>
              ) : (
                <LoadingPlaceholder width="120px" height="28px" />
              )}
            </div>
            <div className="price-info-row">
              <div className="usd-price">
                {marketPrice !== null ? `$${Number(marketPrice).toFixed(2)}` : '$0.00'}
              </div>
              <div className="price-change" style={{
                color: priceChangePercent && parseFloat(priceChangePercent) < 0 ? '#f56c6c' : '#37b66a'
              }}>
                {priceChangePercent !== null ? (
                  `${parseFloat(priceChangePercent) < 0 ? '−' : '+'}${Math.abs(parseFloat(priceChangePercent)).toFixed(2)}%`
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
                  {highPrice !== null ? formatNumber(highPrice) : <LoadingPlaceholder width="60px" height="12px" />}
                </div>
              </div>
              <div className="stat-item">
                <div className="stat-label">
                  {i18n("pages.marketDetail.stats.volume")}({selectedCoin.replace("USDT", "")})
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
                  {lowPrice !== null ? formatNumber(lowPrice) : <LoadingPlaceholder width="60px" height="12px" />}
                </div>
              </div>
              <div className="stat-item">
                <div className="stat-label">
                  {i18n("pages.marketDetail.stats.volume")}(USDT)
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

      {/* Tabs Section */}
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
                    <div className="column-header" style={{textAlign:'right'}}>
                      {i18n("pages.marketDetail.orderBook.sell")}
                    </div>
                  </div>
                </div>

                <div className="table-body">
                  {orderBookData.buySide.map((buyOrder, index) => {
                    const sellOrder = orderBookData.sellSide[index] || { amount: '0.00', price: '0.0000', intensity: 20 };
                    return (
                      <div key={index} className="table-row">
                        <div className="buy-section">
                          <div className="cell buy-cell">{index + 1}</div>
                          <div className="cell quantity">{buyOrder.amount}</div>
                          <div className="cell price-cell">
                            <div 
                              className="heatmap-bar buy-heatmap"
                              style={{ width: `${buyOrder.intensity}%` }}
                            ></div>
                            <span className="price-value buy-price">{buyOrder.price}</span>
                          </div>
                        </div>
                        <div className="sell-section">
                          <div className="cell price-cell">
                            <div 
                              className="heatmap-bar sell-heatmap"
                              style={{ width: `${sellOrder.intensity}%` }}
                            ></div>
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
                  recentTrades.slice(0, 10).map((trade, index) => (
                    <div key={`${trade.t}-${trade.T}-${index}`} className="transaction-item">
                      <div className="transaction-time">
                        {new Date(trade.T).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                      </div>
                      <div className={`transaction-price ${trade.m ? 'sell' : 'buy'}`}>
                        {formatNumber(trade.p)}
                      </div>
                      <div className="transaction-amount">{Number(trade.q).toFixed(4)}</div>
                    </div>
                  ))
                ) : (
                  Array.from({ length: 5 }).map((_, index) => (
                    <div key={index} className="transaction-item">
                      <div className="transaction-time">
                        <LoadingPlaceholder width="50px" height="14px" />
                      </div>
                      <div className="transaction-price">
                        <LoadingPlaceholder width="60px" height="14px" />
                      </div>
                      <div className="transaction-amount">
                        <LoadingPlaceholder width="50px" height="14px" />
                      </div>
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