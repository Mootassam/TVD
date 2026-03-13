import React, { useEffect, useRef, useState } from "react";
import { init, dispose, KLineData } from "klinecharts";

const INDICATORS = ["MA", "EMA", "BOLL", "MACD", "RSI", "WR", "VOL"] as const;
type IndicatorName = (typeof INDICATORS)[number];

const TIMEFRAMES = ["1m", "5m", "15m", "1h", "4h", "1d"] as const;
type TF = (typeof TIMEFRAMES)[number];

const chartTypes = ["candle", "bar", "area"] as const;
type ChartType = (typeof chartTypes)[number];

// Base prices for forex pairs (used as starting point)
const basePrices: Record<string, number> = {
  EURUSD: 1.0850,
  GBPUSD: 1.2650,
  USDJPY: 148.50,
  AUDUSD: 0.6550,
  USDCAD: 1.3550,
  USDCHF: 0.8750,
  NZDUSD: 0.6050,
  EURGBP: 0.8570,
  EURJPY: 161.20,
  GBPJPY: 188.30,
  AUDJPY: 97.20,
  EURAUD: 1.6550,
  GBPAUD: 1.9300,
  USDMXN: 17.20,
  USDRY: 30.50,
  USDZAR: 18.90,
  USDSGD: 1.3450,
  USDHKD: 7.8200,
  USDKRW: 1330.00,
  USDINR: 83.20,
};

// Get decimal places for a symbol (forex convention)
const getDecimalPlaces = (symbol: string): number => {
  if (symbol.includes("JPY") && !symbol.startsWith("JPY")) return 3;
  return 5;
};

// Random walk price change
const randomChange = (current: number, volatility: number = 0.001): number => {
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
  const volatilityMap: Record<TF, number> = {
    "1m": 0.0001,
    "5m": 0.0002,
    "15m": 0.0003,
    "1h": 0.0005,
    "4h": 0.0008,
    "1d": 0.002,
  };
  const volatility = volatilityMap[timeframe] || 0.0005;

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
    intervalRef.current = setInterval(() => {
      const chart = chartRef.current;
      if (!chart) return;

      // ✅ Correct way: use getDataList() to retrieve all candles
      const dataList = chart.getDataList?.();
      const lastCandle = dataList?.[dataList.length - 1];
      if (!lastCandle) return;

      const volatilityMap: Record<TF, number> = {
        "1m": 0.0001,
        "5m": 0.0002,
        "15m": 0.0003,
        "1h": 0.0005,
        "4h": 0.0008,
        "1d": 0.002,
      };
      const volatility = volatilityMap[activeTf] || 0.0005;

      const newClose = randomChange(lastCandle.close, volatility);
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
    }, 1000); // update every second

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
    <div style={{ width: "100%", height: "100%", background: "#000000", color: "#ffffff" }}>
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
                color: activeTf === tf ? "#000000" : "#aaaaaa",
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
              color: activeIndicators[ind] ? "#000000" : "#aaaaaa",
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