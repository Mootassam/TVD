import React, { useEffect, useRef, useState, useCallback } from "react";
import { init, dispose, KLineData } from "klinecharts";
import { fetchAllCryptoPrices, cryptoCoinIds } from "../Market/MarketContext";

const INDICATORS = ["MA", "EMA", "BOLL", "MACD", "RSI", "WR", "VOL"] as const;
type IndicatorName = (typeof INDICATORS)[number];

const TIMEFRAMES = ["1m", "5m", "15m", "1h", "4h", "1d"] as const;
type TF = (typeof TIMEFRAMES)[number];

const chartTypes = ["candle", "bar", "area"] as const;
type ChartType = (typeof chartTypes)[number];

// All base prices for all pairs
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

// Get decimal places for each symbol
const getDecimalPlaces = (symbol: string): number => {
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
};

// Fetch all crypto prices from shared context
const fetchCryptoPrices = async (): Promise<Record<string, { price: number; change: number }>> => {
  await fetchAllCryptoPrices();
  const result: Record<string, { price: number; change: number }> = {};
  Object.keys(cryptoCoinIds).forEach(symbol => {
    if (cryptoCoinIds[symbol]) {
      // This will use the shared cache
      fetchAllCryptoPrices().then(prices => {
        if (prices[symbol]) {
          result[symbol] = { price: prices[symbol].price, change: prices[symbol].change };
        }
      });
    }
  });
  return result;
};

// Legacy function - uses shared prices
const fetchCryptoPrice = async (symbol: string): Promise<{ price: number; change: number } | null> => {
  if (!cryptoCoinIds[symbol]) return null;
  const prices = await fetchCryptoPrices();
  if (prices[symbol]) {
    return { price: prices[symbol].price, change: prices[symbol].change };
  }
  return null;
};

// Get volatility based on asset type
const getVolatility = (symbol: string, timeframe: TF): number => {
  const volatilityMap: Record<TF, number> = {
    "1m": 0.0001, "5m": 0.0002, "15m": 0.0003, "1h": 0.0005, "4h": 0.0008, "1d": 0.002,
  };
  const baseVol = volatilityMap[timeframe] || 0.0005;
  
  // Higher volatility for crypto, metals, oil
  if (cryptoCoinIds[symbol]) return baseVol * 10; // Crypto is very volatile
  if (symbol.startsWith("XAU") || symbol.startsWith("XAG") || symbol.startsWith("XPT") || symbol.startsWith("XPD")) return baseVol * 2;
  if (symbol.includes("OIL") || symbol === "BRENT" || symbol === "WTI" || symbol === "NGAS" || symbol === "HEAT" || symbol === "GAS") return baseVol * 3;
  if (["US30", "US500", "NAS100", "US2000", "GER40", "UK100", "FRA40", "EU50", "JP225", "HK50", "AUS200", "TWII", "KR100", "IN50", "TECH100"].includes(symbol)) return baseVol * 1.5;
  return baseVol;
};

// Random walk price change
const randomChange = (current: number, volatility: number): number => {
  const change = (Math.random() * 2 - 1) * volatility;
  return current * (1 + change);
};

// Generate a full history of candles
const generateHistory = (
  symbol: string,
  timeframe: TF,
  count: number = 500
): KLineData[] => {
  const basePrice = basePrices[symbol] || 1.0;
  const volatility = getVolatility(symbol, timeframe);

  const data: KLineData[] = [];
  let price = basePrice;
  const now = Date.now();
  const intervalMs: Record<TF, number> = {
    "1m": 60 * 1000,
    "5m": 5 * 60 * 1000,
    "15m": 15 * 60 * 1000,
    "1h": 60 * 60 * 1000,
    "4h": 4 * 60 * 60 * 1000,
    "1d": 24 * 60 * 60 * 1000,
  };

  for (let i = count; i >= 0; i--) {
    const timestamp = now - i * intervalMs[timeframe];
    const open = price;
    const close = randomChange(open, volatility);
    const high = Math.max(open, close) * (1 + Math.random() * volatility * 0.5);
    const low = Math.min(open, close) * (1 - Math.random() * volatility * 0.5);
    const volume = 1000000 + Math.random() * 500000;
    data.push({
      timestamp,
      open,
      high,
      low,
      close,
      volume,
    });
    price = close;
  }
  return data;
};

interface FuturesChartProps {
  symbol?: string; // e.g., "EURUSD"
}

// Helper functions for indicator management (unchanged)
const tryCreateIndicator = (chart: any, name: string, isOverlay: boolean) => {
  const paneOptionsOverlay = { id: "candle_pane" };
  const paneOptionsOsc = { id: "osc_pane", height: 140 };
  const paneOptions = isOverlay ? paneOptionsOverlay : paneOptionsOsc;

  const attempts: Array<() => any> = [
    () => chart.createIndicator && chart.createIndicator(name, isOverlay, paneOptions),
    () => chart.createIndicator && chart.createIndicator({ name }, isOverlay, paneOptions),
    () => chart.createTechnicalIndicator && chart.createTechnicalIndicator(name, isOverlay, paneOptions),
    () => chart.createTechnicalIndicator && chart.createTechnicalIndicator({ name }, isOverlay, paneOptions),
    () => chart.addIndicator && chart.addIndicator(name, paneOptions),
    () => chart.addTechnicalIndicator && chart.addTechnicalIndicator(name, isOverlay, paneOptions),
    () => chart.overrideIndicator && chart.overrideIndicator(name, paneOptions),
  ];

  for (const fn of attempts) {
    try {
      const res = fn();
      if (typeof res === "string") return res;
      if (res && typeof res === "object") {
        if ("id" in res) return (res as any).id;
        if ("indicatorId" in res) return (res as any).indicatorId;
      }
      if (res === undefined) return true;
    } catch (e) {}
  }
  console.warn("[kline-compat] failed to create indicator:", name);
  return null;
};

const tryRemoveIndicator = (chart: any, nameOrId: string) => {
  const attempts: Array<() => any> = [
    () => chart.removeIndicator && chart.removeIndicator({ id: nameOrId }),
    () => chart.removeTechnicalIndicatorByName && chart.removeTechnicalIndicatorByName(nameOrId),
    () => chart.removeTechnicalIndicator && chart.removeTechnicalIndicator(nameOrId),
    () => chart.removeIndicatorById && chart.removeIndicatorById(nameOrId),
    () => chart.removeIndicatorByName && chart.removeIndicatorByName(nameOrId),
    () => chart.removeIndicator && chart.removeIndicator(nameOrId),
  ];

  for (const fn of attempts) {
    try {
      const res = fn();
      if (res !== undefined) return true;
    } catch (e) {}
  }

  try {
    if (chart.removeTechnicalIndicator) {
      chart.removeTechnicalIndicator(nameOrId);
      return true;
    }
  } catch (e) {}
  console.warn("[kline-compat] failed to remove indicator:", nameOrId);
  return false;
};

const FuturesChart: React.FC<FuturesChartProps> = ({ symbol = "EURUSD" }) => {
  const chartRef = useRef<any>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const [activeTf, setActiveTf] = useState<TF>("1m");
  const [activeIndicators, setActiveIndicators] = useState<Record<string, string | true>>({});
  const [chartType, setChartType] = useState<ChartType>("candle");

  // Initialize chart on mount
  useEffect(() => {
    const chart = init("futures-chart");
    chartRef.current = chart;

    // Dark theme styles (matching the rest of the app)
    chart.setStyles?.({
      candle: {
        type: "candle_solid",
        bar: {
          upColor: "#39FF14",
          downColor: "#ff4d4d",
          noChangeColor: "#777777",
        },
        priceMark: {
          last: {
            line: { color: "#aaaaaa", style: "dashed" },
            text: { color: "#ffffff", backgroundColor: "#1c1c1c" },
          },
        },
        tooltip: {
          text: {
            color: '#ffffff',
            size: 12
          }
        }
      },
      grid: {
        horizontal: { color: "rgba(255,255,255,0.06)" },
        vertical: { color: "rgba(255,255,255,0.03)" },
      },
      xAxis: {
        axisLine: { color: '#2a2a2a' },
        tickLine: { color: '#2a2a2a' },
        tickText: { color: '#aaaaaa' }
      },
      yAxis: {
        axisLine: { color: '#2a2a2a' },
        tickLine: { color: '#2a2a2a' },
        tickText: { color: '#aaaaaa' }
      },
      crosshair: {
        horizontal: {
          line: { color: '#39FF14', size: 1 },
          text: { color: '#ffffff', backgroundColor: '#1c1c1c' }
        },
        vertical: {
          line: { color: '#39FF14', size: 1 },
          text: { color: '#ffffff', backgroundColor: '#1c1c1c' }
        }
      },
      technicalIndicator: {
        margin: { top: 0.2, bottom: 0.1 }
      }
    });

    // Generate initial data
    const history = generateHistory(symbol, activeTf, 300);
    chart.applyNewData?.(history);

    const onResize = () => chart.resize?.();
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
      if (intervalRef.current) clearInterval(intervalRef.current);
      dispose("futures-chart");
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // empty deps – chart init only once

  // Handle timeframe/symbol changes (reload data and restart real‑time updates)
  useEffect(() => {
    if (!chartRef.current) return;
    const history = generateHistory(symbol, activeTf, 300);
    chartRef.current.applyNewData?.(history);

    // Clear old interval and set up new one for real‑time updates
    if (intervalRef.current) clearInterval(intervalRef.current);
    
    // Fetch crypto price and use it as base if available
    let cachedCryptoPrice: number | null = null;
    if (cryptoCoinIds[symbol]) {
      fetchCryptoPrice(symbol).then(result => {
        if (result) cachedCryptoPrice = result.price;
      });
    }

    intervalRef.current = setInterval(async () => {
      const chart = chartRef.current;
      if (!chart) return;

      // Get current last candle
      const dataList = chart.getDataList?.();
      const lastCandle = dataList?.[dataList.length - 1];
      if (!lastCandle) return;

      let newClose: number;
      
      // Use real crypto price if available
      if (cryptoCoinIds[symbol]) {
        const cryptoData = await fetchCryptoPrice(symbol);
        if (cryptoData) {
          cachedCryptoPrice = cryptoData.price;
          newClose = cryptoData.price;
        } else if (cachedCryptoPrice) {
          newClose = cachedCryptoPrice;
        } else {
          newClose = lastCandle.close;
        }
      } else {
        const volatility = getVolatility(symbol, activeTf);
        newClose = randomChange(lastCandle.close, volatility);
      }
      
      const newHigh = Math.max(lastCandle.high, newClose);
      const newLow = Math.min(lastCandle.low, newClose);
      const updatedCandle = {
        ...lastCandle,
        high: newHigh,
        low: newLow,
        close: newClose,
        volume: lastCandle.volume + Math.random() * 10000,
      };

      // Update the last candle with the new tick
      chart.updateData?.(updatedCandle);
    }, 2000); // update every 2 seconds

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [symbol, activeTf]); // ✅ Dependencies correct

  // Chart type updates
  useEffect(() => {
    if (!chartRef.current) return;
    if (chartType === "candle") {
      chartRef.current.setStyles?.({ 
        candle: { 
          type: "candle_solid",
          bar: {
            upColor: "#39FF14",
            downColor: "#ff4d4d",
            noChangeColor: "#777777",
          }
        } 
      });
    } else if (chartType === "bar") {
      chartRef.current.setStyles?.({ 
        candle: { 
          type: "candle_stroke",
          bar: {
            upColor: "#39FF14",
            downColor: "#ff4d4d",
            noChangeColor: "#777777",
          }
        } 
      });
    } else if (chartType === "area") {
      chartRef.current.setStyles?.({
        candle: {
          type: "area",
          area: {
            lineColor: "#39FF14",
            lineSize: 2,
            gradient: [
              { offset: 0, color: "rgba(57,255,20,0.35)" },
              { offset: 1, color: "rgba(57,255,20,0.04)" },
            ],
          },
        },
      });
    }
  }, [chartType]);

  // Toggle indicator (unchanged)
  const toggleIndicator = (name: IndicatorName) => {
    const chart = chartRef.current;
    if (!chart) return;

    const exists = activeIndicators[name];
    if (exists) {
      const idOrName = typeof exists === "string" ? exists : name;
      tryRemoveIndicator(chart, idOrName as string);
      const copy = { ...activeIndicators };
      delete copy[name];
      setActiveIndicators(copy);
      return;
    }

    const overlayNames = ["MA", "EMA", "BOLL", "VOL", "BBI", "SMA", "SAR"];
    const isOverlay = overlayNames.includes(name);

    const res = tryCreateIndicator(chart, name, isOverlay);
    if (res) {
      setActiveIndicators((p) => ({
        ...p,
        [name]: typeof res === "string" ? (res as string) : true,
      }));
    } else {
      setActiveIndicators((p) => ({ ...p, [name]: true }));
    }
  };

  return (
    <div style={{ width: "100%", height: "100%", background: "#0f0f0f", color: "#ffffff" }}>
      {/* toolbar */}
      <div style={{ 
        display: "flex", 
        justifyContent: "space-between", 
        gap: 12, 
        marginBottom: 15, 
        alignItems: "center",
        padding: "10px 5px 0"
      }}>
        <div style={{ display: "flex", gap: 6 }}>
          {TIMEFRAMES.map((tf) => (
            <button
              key={tf}
              onClick={() => setActiveTf(tf)}
              style={{
                padding: "6px 12px",
                background: activeTf === tf ? "#39FF14" : "transparent",
                color: activeTf === tf ? "#0f0f0f" : "#aaaaaa",
                borderRadius: 6,
                border: activeTf === tf ? "1px solid #39FF14" : "1px solid #2a2a2a",
                cursor: "pointer",
                fontSize: "12px",
                fontWeight: "500",
                transition: "all 0.2s ease"
              }}
            >
              {tf}
            </button>
          ))}
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <select
            value={chartType}
            onChange={(e) => setChartType(e.target.value as ChartType)}
            style={{
              padding: "6px 12px",
              borderRadius: 6,
              background: "#1c1c1c",
              color: "#ffffff",
              border: "1px solid #2a2a2a",
              fontSize: "12px",
              cursor: "pointer"
            }}
          >
            {chartTypes.map((t) => (
              <option key={t} value={t}>
                {t.charAt(0).toUpperCase() + t.slice(1)}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* chart */}
      <div id="futures-chart" style={{ width: "100%", height: '300px', borderRadius: "8px", overflow: "hidden" }} />

      {/* indicators */}
      <div style={{ 
        display: "flex", 
        gap: 6, 
        marginTop: 15,
        padding: "0 5px",
        flexWrap: "wrap"
      }}>
        {INDICATORS.map((ind) => (
          <button
            key={ind}
            onClick={() => toggleIndicator(ind)}
            style={{
              padding: "6px 12px",
              borderRadius: 6,
              background: activeIndicators[ind] ? "#39FF14" : "transparent",
              color: activeIndicators[ind] ? "#0f0f0f" : "#aaaaaa",
              border: activeIndicators[ind] ? "1px solid #39FF14" : "1px solid #2a2a2a",
              cursor: "pointer",
              fontSize: "12px",
              fontWeight: "500",
              transition: "all 0.2s ease"
            }}
          >
            {ind}
          </button>
        ))}
      </div>
    </div>
  );
};

export default FuturesChart;