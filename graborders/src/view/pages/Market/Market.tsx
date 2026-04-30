// market.tsx
import React, { useEffect, useState, useCallback, useRef } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

// ----------------------------------------------------------------------
// Inline styles (unchanged)
// ----------------------------------------------------------------------
const styles = `
  :root {
    --bg-row: #2a2a2a;
    --green: #36f936;
    --red: #ff4d4d;
    --text-primary: #ffffff;
    --text-secondary: #a0a0a0;
    --neon-green: #39FF14;
  }

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body {
    font-family: 'Inter', -apple-system, sans-serif;
    color: var(--text-primary);
  }

  .market-page {
    display: flex;
    justify-content: center;
    padding: 16px;
    min-height: 100vh;
    background-color: #0f0f0f;
    border-top: 2px solid var(--neon-green);
    max-width: 400px;
    margin: auto;
  }

  .market-container {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .market-header {
    margin-bottom: 12px;
    padding: 0 4px;
  }

  .market-title {
    font-size: 20px;
    font-weight: 700;
    color: #fff;
    margin-bottom: 2px;
  }

  .market-date {
    font-size: 12px;
    color: var(--text-secondary);
  }

  .filter-bar {
    display: flex;
    gap: 8px;
    overflow-x: auto;
    padding-bottom: 6px;
    scrollbar-width: thin;
    scrollbar-color: #333 transparent;
    margin-bottom: 4px;
  }

  .filter-bar::-webkit-scrollbar {
    height: 4px;
  }

  .filter-bar::-webkit-scrollbar-thumb {
    background: #444;
    border-radius: 4px;
  }

  .filter-tab {
    flex-shrink: 0;
    padding: 6px 14px;
    border-radius: 20px;
    background: #2a2a2a;
    color: #aaa;
    font-size: 12px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s;
    border: 1px solid transparent;
    white-space: nowrap;
  }

  .filter-tab.active {
    background: #333;
    color: #fff;
    border-color: var(--neon-green);
    font-weight: 600;
  }

  .filter-tab:hover {
    background: #383838;
    color: #ddd;
  }

  .skeleton-row {
    background: #2a2a2a;
    border-radius: 8px;
    padding: 4px 14px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    animation: shimmer 1.4s infinite linear;
    background: linear-gradient(90deg, #2a2a2a 25%, #3a3a3a 50%, #2a2a2a 75%);
    background-size: 200% 100%;
  }

  @keyframes shimmer {
    0% { background-position: -200% 0; }
    100% { background-position: 200% 0; }
  }

  .skeleton-left {
    display: flex;
    align-items: center;
    gap: 10px;
    flex: 1;
  }
  .skeleton-flags {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    background: #3a3a3a;
  }
  .skeleton-symbol {
    width: 70px;
    height: 12px;
    border-radius: 6px;
    background: #3a3a3a;
  }
  .skeleton-right {
    display: flex;
    align-items: center;
    gap: 10px;
  }
  .skeleton-price {
    width: 60px;
    height: 12px;
    border-radius: 6px;
    background: #3a3a3a;
  }
  .skeleton-change {
    width: 50px;
    height: 12px;
    border-radius: 6px;
    background: #3a3a3a;
  }

  .row-link {
    text-decoration: none;
    color: inherit;
    display: block;
  }

  .currency-row {
    background: var(--bg-row);
    border-radius: 8px;
    padding: 4px 14px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    transition: background 0.15s, transform 0.1s;
  }

  .currency-row:hover {
    background: #333;
    transform: translateY(-1px);
  }

  .left-section {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .flag-container {
    position: relative;
    width: 30px;
    height: 30px;
    flex-shrink: 0;
  }

  .flag-single {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    object-fit: cover;
    background: #1e1e1e;
    border: 1px solid rgba(255,255,255,0.15);
  }

  .flag-base {
    border-radius: 50%;
    object-fit: cover;
    background: #1e1e1e;
    border: 1px solid rgba(255,255,255,0.15);
    display: block;
  }

  .flag-quote {
    position: absolute;
    top: 22%;
    left: 15%;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    object-fit: cover;
    background: #1e1e1e;
    border: 1px solid rgba(255,255,255,0.15);
    z-index: 2;
  }

  .symbol-name {
    font-size: 14px;
    font-weight: 600;
    color: #fff;
    white-space: nowrap;
  }

  .right-section {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .price-value {
    font-size: 13px;
    font-weight: 600;
    color: #fff;
    white-space: nowrap;
    min-width: 70px;
    text-align: right;
  }

  .change-percent {
    font-size: 13px;
    font-weight: 600;
    white-space: nowrap;
    display: flex;
    align-items: center;
    gap: 3px;
  }

  .arrow {
    font-size: 11px;
    line-height: 1;
  }

  .green { color: var(--green); }
  .red { color: var(--red); }

  .error-container {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 200px;
    color: var(--text-secondary);
    font-size: 14px;
    text-align: center;
  }

  .error-box {
    background: #2a1a1a;
    padding: 20px;
    border-radius: 12px;
    border: 1px solid #ff4d4d33;
  }

  .error-title {
    color: var(--red);
    font-weight: 600;
    margin-bottom: 8px;
  }

  .error-message {
    font-size: 12px;
    color: var(--text-secondary);
    margin-bottom: 12px;
  }

  .retry-btn {
    background: #ff4d4d22;
    color: var(--red);
    border: 1px solid var(--red);
    padding: 6px 16px;
    border-radius: 6px;
    cursor: pointer;
    font-size: 12px;
  }
`;

// ----------------------------------------------------------------------
// Market categories (Futures removed)
// ----------------------------------------------------------------------
interface MarketCategory {
  key: string;
  label: string;
  table_id: string;
  version: string;
  columnset_id: string;
  payload: any;
  extraParams?: Record<string, string>;
}

const MARKET_CATEGORIES: MarketCategory[] = [
  {
    key: 'forex',
    label: 'Forex',
    table_id: 'currencies_rates.americas',
    version: '54',
    columnset_id: 'overview',
    payload: { lang: 'en', range: [0, 300], scanner_product_label: 'markets-screener' },
  },
  {
    key: 'stocks',
    label: 'Stocks',
    table_id: 'stocks_market_movers.active',
    version: '54',
    columnset_id: 'performance',
    payload: {
      lang: 'en',
      range: [0, 92],
      sort: { sortBy: { id: 'TickerUniversal', params: {} }, sortOrder: 'asc', nullsFirst: false },
      scanner_product_label: 'markets-screener',
    },
    extraParams: { market: 'america' },
  },
  {
    key: 'crypto',
    label: 'Crypto',
    table_id: 'crypto_coins.all',
    version: '54',
    columnset_id: 'overview',
    payload: {
      columns: ['base_currency_desc','base_currency_logoid','type','typespecs','exchange','fundamental_currency_code','market_cap_calc'],
      ignore_unknown_fields: false,
      options: { lang: 'en' },
      range: [0, 60],
      preset: 'coin_market_cap_rank',
    },
  },
  {
    key: 'gold_etf',
    label: 'Gold ETFs',
    table_id: 'etfs_funds.gold',
    version: '54',
    columnset_id: 'performance',
    payload: {
      lang: 'en',
      range: [0, 100],
      sort: { sortBy: { id: 'AssetsUnderManagement', params: {} }, sortOrder: 'desc', nullsFirst: false },
      scanner_product_label: 'markets-screener',
    },
  },
  {
    key: 'agricultural',
    label: 'Agricultural',
    table_id: 'futures.quotes_agricultural',
    version: '54',
    columnset_id: 'overview',
    payload: {
      lang: 'en',
      range: [0, 92],
      sort: { sortBy: { id: 'TickerUniversal', params: {} }, sortOrder: 'asc', nullsFirst: false },
      scanner_product_label: 'markets-screener',
    },
  },
  {
    key: 'energy',
    label: 'Energy',
    table_id: 'futures.quotes_energy',
    version: '54',
    columnset_id: 'overview',
    payload: {
      lang: 'en',
      range: [0, 50],
      sort: { sortBy: { id: 'TickerUniversal', params: {} }, sortOrder: 'asc', nullsFirst: false },
      scanner_product_label: 'markets-screener',
    },
  },
];

// ----------------------------------------------------------------------
// Types & parsing (fixed to always include Price column)
// ----------------------------------------------------------------------
interface RawTicker {
  name: string;
  description?: string;
  'base-currency-logoid'?: string | null;
  'currency-logoid'?: string | null;
  logoid?: string | null;
  logo?: { logoid?: string };
}

// UPDATED: added routeSymbol for detail page (only the part after ":")
interface MarketItem {
  symbol: string;        // display name, e.g. "BTC", "USDMXN", "GLD"
  fullSymbol: string;    // original full code for WebSocket, e.g. "CRYPTO:BTCUSD", "FX_IDC:USDMXN"
  routeSymbol: string;   // code after ":", e.g. "BTCUSD", "USDMXN", "GLD" – used in detail page URL
  price: number | null;
  changePercent: number | null;
  baseLogoId?: string;
  currencyLogoId?: string;
}

// ----------------------------------------------------------------------
// WebSocket helpers
// ----------------------------------------------------------------------
const encode = (msg: string) => `~m~${msg.length}~m~${msg}`;

const parseMessages = (data: string): string[] => {
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
};

const extractSymbol = (raw: string): string => {
  try {
    const cleaned = raw.replace(/^=\{/, "{");
    const obj = JSON.parse(cleaned);
    return obj.symbol || "UNKNOWN";
  } catch {
    return raw;
  }
};

// ----------------------------------------------------------------------
// Parsing API response (priceColId is never null now)
// ----------------------------------------------------------------------
function getColumnById(columns: any[], id: string) {
  return columns.find((c: any) => c.id === id);
}

function extractLogo(ticker: RawTicker): { baseLogoId?: string; currencyLogoId?: string } {
  if (ticker['base-currency-logoid'] && ticker['currency-logoid']) {
    return { baseLogoId: ticker['base-currency-logoid'], currencyLogoId: ticker['currency-logoid'] };
  }
  const singleId = ticker.logoid || ticker.logo?.logoid;
  if (singleId) {
    return { baseLogoId: singleId, currencyLogoId: undefined };
  }
  return {};
}

// Helper to extract the part after the first colon
function extractRouteSymbol(fullSymbol: string): string {
  const idx = fullSymbol.indexOf(':');
  return idx !== -1 ? fullSymbol.substring(idx + 1) : fullSymbol;
}

// CHANGED: accepts full response data (with .symbols) and computes routeSymbol
function parseResponse(fullResponse: any, categoryKey: string): MarketItem[] {
  const columns = fullResponse?.data;
  if (!columns || !Array.isArray(columns)) return [];

  const symbols: string[] = fullResponse.symbols || [];   // the prefixed list

  let tickerColId = 'TickerUniversal';
  const priceColId = 'Price';
  let changeColId = 'Change';

  if (categoryKey === 'crypto') {
    tickerColId = 'TickerInstrumentUniversal';
    changeColId = 'ChangeCrypto';
  }

  const tickerCol = getColumnById(columns, tickerColId);
  const priceCol = getColumnById(columns, priceColId);
  const changeCol = getColumnById(columns, changeColId);

  if (!tickerCol) return [];

  const count = tickerCol.rawValues.length;
  const result: MarketItem[] = [];
  const seenSymbols = new Set<string>();

  for (let i = 0; i < count; i++) {
    const ticker: RawTicker = tickerCol.rawValues[i];
    if (seenSymbols.has(ticker.name)) continue;
    seenSymbols.add(ticker.name);

    const price = priceCol ? priceCol.rawValues[i] ?? null : null;
    const changePercent = changeCol ? changeCol.rawValues[i] ?? null : null;
    const logos = extractLogo(ticker);

    const rawFull = symbols[i] || ticker.name;   // fallback to ticker name if no symbols array
    const routeSymbol = extractRouteSymbol(rawFull);

    result.push({
      symbol: ticker.name,          // e.g. "BTC", "USDMXN"
      fullSymbol: rawFull,          // e.g. "CRYPTO:BTCUSD"
      routeSymbol: routeSymbol,     // e.g. "BTCUSD"
      price,
      changePercent,
      baseLogoId: logos.baseLogoId,
      currencyLogoId: logos.currencyLogoId,
    });
  }

  return result;
}

// ----------------------------------------------------------------------
// Custom hook with resilient WebSocket live prices
// ----------------------------------------------------------------------
function useMarketData(category: MarketCategory) {
  const [items, setItems] = useState<MarketItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);

  const [livePrices, setLivePrices] = useState<Record<string, number>>({});

  const wsRef = useRef<WebSocket | null>(null);
  const sessionRef = useRef<string | null>(null);
  const subscribedSymbolsRef = useRef<Set<string>>(new Set());
  const reconnectTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Subscribe / unsubscribe helper – uses fullSymbol (with prefix)
  const subscribeSymbols = useCallback((symbols: string[]) => {
    const ws = wsRef.current;
    const session = sessionRef.current;
    if (!ws || ws.readyState !== WebSocket.OPEN || !session) return;

    const currentSubs = subscribedSymbolsRef.current;
    const toRemove: string[] = [];
    currentSubs.forEach(s => {
      if (!symbols.includes(s)) toRemove.push(s);
    });
    const toAdd: string[] = [];
    symbols.forEach(s => {
      if (!currentSubs.has(s)) toAdd.push(s);
    });

    if (toRemove.length > 0) {
      ws.send(encode(JSON.stringify({ m: "quote_remove_symbols", p: [session, ...toRemove] })));
    }
    if (toAdd.length > 0) {
      ws.send(encode(JSON.stringify({ m: "quote_add_symbols", p: [session, ...toAdd] })));
    }

    subscribedSymbolsRef.current = new Set(symbols);
  }, []);

  // Connect WebSocket when component mounts
  useEffect(() => {
    if (wsRef.current) {
      wsRef.current.close();
      wsRef.current = null;
    }
    if (reconnectTimeoutRef.current) clearTimeout(reconnectTimeoutRef.current);

    subscribedSymbolsRef.current = new Set();
    setLivePrices({});

    const ws = new WebSocket("wss://widgetdata.tradingview.com/socket.io/websocket");
    wsRef.current = ws;

    ws.onopen = () => {
      const session = "qs_" + Math.random().toString(36).substring(2, 12);
      sessionRef.current = session;

      ws.send(encode(JSON.stringify({ m: "quote_create_session", p: [session] })));
      ws.send(encode(JSON.stringify({ m: "quote_set_fields", p: [session, "ask", "bid", "lp"] })));

      // Use fullSymbol for subscription
      if (items.length > 0) {
        subscribeSymbols(items.map(item => item.fullSymbol));
      }
    };

    ws.onmessage = (event) => {
      const raw = event.data;
      if (raw.startsWith("~h~")) {
        ws.send(raw);
        return;
      }
      const messages = parseMessages(raw);
      messages.forEach(msg => {
        try {
          const json = JSON.parse(msg);
          if (json.m === "qsd") {
            const payload = json.p[1];
            const symbol = extractSymbol(payload.n);  // this will be the prefixed symbol, e.g. "CRYPTO:BTCUSD"
            const values = payload.v;
            if (!values) return;

            let price: number | null = null;
            if (typeof values.lp === 'number' && values.lp > 0) {
              price = values.lp;
            } else if (typeof values.ask === 'number' && typeof values.bid === 'number' && values.ask > 0 && values.bid > 0) {
              price = (values.ask + values.bid) / 2;
            }

            if (price !== null && price > 0) {
              setLivePrices(prev => {
                if (prev[symbol] === price) return prev;
                return { ...prev, [symbol]: price };
              });
            }
          }
        } catch (e) {
          // ignore non-json frames
        }
      });
    };

    ws.onclose = (event) => {
      subscribedSymbolsRef.current = new Set();
      if (!event.wasClean) {
        reconnectTimeoutRef.current = setTimeout(() => {
          setRetryCount(c => c + 1);
        }, 3000);
      }
    };

    ws.onerror = (err) => {
      console.error("Market WebSocket error:", err);
    };

    return () => {
      if (reconnectTimeoutRef.current) clearTimeout(reconnectTimeoutRef.current);
      if (wsRef.current) {
        wsRef.current.close();
        wsRef.current = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // When items list changes, update subscriptions using fullSymbol
  useEffect(() => {
    if (items.length > 0) {
      subscribeSymbols(items.map(item => item.fullSymbol));
    }
  }, [items, subscribeSymbols]);

  // Fetch data – now passes the full response to parseResponse
  const fetchData = useCallback(async (signal: AbortSignal) => {
    try {
      const response = await axios.post(
        '/api/tv/screener-facade/api/v1/screener-table/scan',
        category.payload,
        {
          params: {
            table_id: category.table_id,
            version: category.version,
            columnset_id: category.columnset_id,
            ...(category.extraParams || {}),
          },
          headers: { 'Content-Type': 'application/json' },
        }
      );
      // Pass the whole response.data (with symbols, data, totalCount, params)
      const parsed = parseResponse(response.data, category.key);
      setItems(parsed);
      setError(null);
    } catch (err: any) {
      if (!axios.isCancel(err) && err.name !== 'AbortError' && err.code !== 'ERR_CANCELED') {
        setError(err.message);
        setItems([]);
      }
    } finally {
      setLoading(false);
    }
  }, [category]);

  useEffect(() => {
    setItems([]);
    setLoading(true);
    setError(null);
    const abortController = new AbortController();
    fetchData(abortController.signal);
    return () => abortController.abort();
  }, [fetchData, retryCount]);

  const refetch = useCallback(() => setRetryCount(c => c + 1), []);

  // Enrich items with live price; lookup by fullSymbol (prefixed)
  const enrichedItems = items.map(item => {
    const livePrice = livePrices[item.fullSymbol];
    const displayPrice = (livePrice !== undefined && livePrice !== null && livePrice > 0)
      ? livePrice
      : item.price;
    return { ...item, currentPrice: displayPrice };
  });

  return { items: enrichedItems, loading, error, refetch };
}

// ----------------------------------------------------------------------
// Formatting
// ----------------------------------------------------------------------
function formatPair(symbol: string, isForex: boolean) {
  if (isForex && symbol.length >= 6) {
    return symbol.slice(0, 3) + '/' + symbol.slice(3);
  }
  return symbol;
}

function fmtPrice(value: number | null, symbol: string): string {
  if (value == null) return '—';
  if (symbol.endsWith('JPY') || symbol.endsWith('KRW') || symbol.endsWith('HUF')) {
    return value.toFixed(2);
  }
  return value.toFixed(4);
}

function fmtChangePercent(value: number | null): string {
  if (value == null) return '—';
  const sign = value >= 0 ? '+' : '';
  return `${sign}${value.toFixed(2)}%`;
}

// ----------------------------------------------------------------------
// Skeleton Row
// ----------------------------------------------------------------------
const SkeletonRow: React.FC = () => (
  <div className="skeleton-row">
    <div className="skeleton-left">
      <div className="skeleton-flags" />
      <div className="skeleton-symbol" />
    </div>
    <div className="skeleton-right">
      <div className="skeleton-price" />
      <div className="skeleton-change" />
    </div>
  </div>
);

// ----------------------------------------------------------------------
// Logo Component
// ----------------------------------------------------------------------
const LogoCell: React.FC<{ baseId?: string; quoteId?: string }> = ({ baseId, quoteId }) => {
  const hasPair = baseId && quoteId;

  return (
    <div className="flag-container">
      {hasPair ? (
        <>
          <img
            className="flag-base"
            src={`https://s3-symbol-logo.tradingview.com/${baseId}.svg`}
            alt=""
            onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
          />
          <img
            className="flag-quote"
            src={`https://s3-symbol-logo.tradingview.com/${quoteId}.svg`}
            alt=""
            onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
          />
        </>
      ) : baseId ? (
        <img
          className="flag-single"
          src={`https://s3-symbol-logo.tradingview.com/${baseId}.svg`}
          alt=""
          onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
        />
      ) : (
        <div
          className="flag-single"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: '#333',
            fontSize: '12px',
            color: '#aaa',
          }}
        >
          ?
        </div>
      )}
    </div>
  );
};

// ----------------------------------------------------------------------
// Row component – now uses routeSymbol for the detail link
// ----------------------------------------------------------------------
const MarketRow: React.FC<{ item: MarketItem & { currentPrice?: number | null }; isForex: boolean }> = ({ item, isForex }) => {
  const positive = (item.changePercent ?? 0) >= 0;
  const changeClass = positive ? 'green' : 'red';
  const arrow = positive ? '▲' : '▼';
  const displayPrice = item.currentPrice ?? item.price;

  return (
    <Link to={`/market/detail/${item.routeSymbol}`} className="row-link">
      <div className="currency-row">
        <div className="left-section">
          <LogoCell baseId={item.baseLogoId} quoteId={item.currencyLogoId} />
          <span className="symbol-name">{formatPair(item.symbol, isForex)}</span>
        </div>
        <div className="right-section">
          <span className="price-value">{fmtPrice(displayPrice, item.symbol)}</span>
          <span className={`change-percent ${changeClass}`}>
            <span className="arrow">{arrow}</span>
            {fmtChangePercent(item.changePercent)}
          </span>
        </div>
      </div>
    </Link>
  );
};

// ----------------------------------------------------------------------
// Market List
// ----------------------------------------------------------------------
const MarketList: React.FC<{ category: MarketCategory }> = ({ category }) => {
  const { items, loading, error, refetch } = useMarketData(category);
  const isForex = category.key === 'forex';

  if (loading) {
    return <>{Array.from({ length: 15 }).map((_, i) => <SkeletonRow key={i} />)}</>;
  }

  if (error) {
    return (
      <div className="error-container">
        <div className="error-box">
          <p className="error-title">Connection Error</p>
          <p className="error-message">{error}</p>
          <button className="retry-btn" onClick={refetch}>
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      {items.map(item => (
        <MarketRow key={item.symbol} item={item} isForex={isForex} />
      ))}
    </>
  );
};

// ----------------------------------------------------------------------
// Main Page
// ----------------------------------------------------------------------
const MarketPage: React.FC = () => {
  const [activeKey, setActiveKey] = useState<string>('forex');
  const activeCategory = MARKET_CATEGORIES.find(c => c.key === activeKey) || MARKET_CATEGORIES[0];

  return (
    <>
      <style>{styles}</style>
      <div className="market-page">
        <div className="market-container">
          <header className="market-header">
            <h1 className="market-title">Forex Market</h1>
            <p className="market-date">
              {new Date().toLocaleDateString('en-US', {
                month: 'long',
                day: 'numeric',
                year: 'numeric',
              })}
            </p>
          </header>

          <div className="filter-bar">
            {MARKET_CATEGORIES.map(cat => (
              <div
                key={cat.key}
                className={`filter-tab ${activeKey === cat.key ? 'active' : ''}`}
                onClick={() => setActiveKey(cat.key)}
              >
                {cat.label}
              </div>
            ))}
          </div>

          <MarketList key={activeCategory.key} category={activeCategory} />
        </div>
      </div>
    </>
  );
};

export default MarketPage;