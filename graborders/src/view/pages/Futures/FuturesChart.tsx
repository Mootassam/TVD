import React, { useEffect, useRef, useState } from "react";
import { init, dispose, KLineData } from "klinecharts";

const INDICATORS = ["MA", "EMA", "BOLL", "MACD", "RSI", "WR", "VOL"] as const;
type IndicatorName = (typeof INDICATORS)[number];

const TIMEFRAMES = ["1m", "5m", "15m", "1h", "4h", "1d"] as const;
type TF = (typeof TIMEFRAMES)[number];

const tfToBinance: Record<TF, string> = {
  "1m": "1m",
  "5m": "5m",
  "15m": "15m",
  "1h": "1h",
  "4h": "4h",
  "1d": "1d",
};

const chartTypes = ["candle", "bar", "area"] as const;
type ChartType = (typeof chartTypes)[number];

interface FuturesChartProps {
  symbol?: string; // optional, will fallback to BTCUSDT
}

/**
 * Helpers to keep compatibility across klinecharts versions
 */
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

const FuturesChart: React.FC<FuturesChartProps> = ({ symbol = "BTCUSDT" }) => {
  const chartRef = useRef<any>(null);
  const wsRef = useRef<WebSocket | null>(null);

  const [activeTf, setActiveTf] = useState<TF>("1m");
  const [activeIndicators, setActiveIndicators] = useState<Record<string, string | true>>({});
  const [chartType, setChartType] = useState<ChartType>("candle");

  // fetch historical data
  const loadData = async (tf: TF) => {
    try {
      const url = `https://api.binance.com/api/v3/klines?symbol=${symbol}&interval=${tfToBinance[tf]}&limit=500`;
      const res = await fetch(url);
      const raw = await res.json();
      const data: KLineData[] = raw.map((d: any) => ({
        timestamp: d[0],
        open: +d[1],
        high: +d[2],
        low: +d[3],
        close: +d[4],
        volume: +d[5],
      }));
      chartRef.current?.applyNewData?.(data);
      chartRef.current?.setData?.(data);
    } catch (e) {
      console.error("loadData error", e);
    }
  };

  // websocket live updates
  const startWS = (tf: TF) => {
    wsRef.current?.close();
    const stream = `wss://stream.binance.com:9443/ws/${symbol.toLowerCase()}@kline_${tfToBinance[tf]}`;
    try {
      const ws = new WebSocket(stream);
      wsRef.current = ws;
      ws.onmessage = (ev) => {
        const msg = JSON.parse(ev.data);
        const k = msg?.k;
        if (!k) return;
        const payload = {
          timestamp: k.t,
          open: +k.o,
          high: +k.h,
          low: +k.l,
          close: +k.c,
          volume: +k.v,
        };
        chartRef.current?.updateData?.(payload);
        chartRef.current?.appendData?.(payload);
      };
    } catch (e) {
      console.warn("WS start failed", e);
    }
  };

  // init chart
  useEffect(() => {
    const chart = init("futures-chart");
    chartRef.current = chart;

    // Light theme styles
    chart.setStyles?.({
      candle: {
        type: "candle_solid",
        bar: {
          upColor: "#37b66a", // Green for up
          downColor: "#f56c6c", // Red for down
          noChangeColor: "#999",
        },
        priceMark: {
          last: {
            line: { color: "#6c757d", style: "dashed" },
            text: { color: "#333", backgroundColor: "#f8f9fa" },
          },
        },
        tooltip: {
          text: {
            color: '#333',
            size: 12
          }
        }
      },
      grid: {
        horizontal: { color: "rgba(0,0,0,0.06)" },
        vertical: { color: "rgba(0,0,0,0.03)" },
      },
      xAxis: {
        axisLine: {
          color: '#e9ecef'
        },
        tickLine: {
          color: '#e9ecef'
        },
        tickText: {
          color: '#6c757d'
        }
      },
      yAxis: {
        axisLine: {
          color: '#e9ecef'
        },
        tickLine: {
          color: '#e9ecef'
        },
        tickText: {
          color: '#6c757d'
        }
      },
      crosshair: {
        horizontal: {
          line: {
            color: '#106cf5',
            size: 1
          },
          text: {
            color: '#333',
            backgroundColor: '#f8f9fa'
          }
        },
        vertical: {
          line: {
            color: '#106cf5',
            size: 1
          },
          text: {
            color: '#333',
            backgroundColor: '#f8f9fa'
          }
        }
      },
      technicalIndicator: {
        margin: {
          top: 0.2,
          bottom: 0.1
        }
      }
    });

    loadData(activeTf);
    startWS(activeTf);

    const onResize = () => chart.resize?.();
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
      wsRef.current?.close();
      dispose("futures-chart");
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // reload on timeframe or symbol change
  useEffect(() => {
    if (!chartRef.current) return;
    loadData(activeTf);
    startWS(activeTf);
  }, [activeTf, symbol]);

  // chart type updates
  useEffect(() => {
    if (!chartRef.current) return;
    if (chartType === "candle") {
      chartRef.current.setStyles?.({ 
        candle: { 
          type: "candle_solid",
          bar: {
            upColor: "#37b66a",
            downColor: "#f56c6c",
            noChangeColor: "#999",
          }
        } 
      });
    } else if (chartType === "bar") {
      chartRef.current.setStyles?.({ 
        candle: { 
          type: "candle_stroke",
          bar: {
            upColor: "#37b66a",
            downColor: "#f56c6c",
            noChangeColor: "#999",
          }
        } 
      });
    } else if (chartType === "area") {
      chartRef.current.setStyles?.({
        candle: {
          type: "area",
          area: {
            lineColor: "#37b66a",
            lineSize: 2,
            gradient: [
              { offset: 0, color: "rgba(55,182,106,0.35)" },
              { offset: 1, color: "rgba(55,182,106,0.04)" },
            ],
          },
        },
      });
    }
  }, [chartType]);

  // toggle indicator
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
    <div style={{ width: "100%", height: "100%", background: "#ffffff", color: "#333", }}>
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
                background: activeTf === tf ? "#106cf5" : "transparent",
                color: activeTf === tf ? "#fff" : "#6c757d",
                borderRadius: 6,
                border: activeTf === tf ? "1px solid #106cf5" : "1px solid #e9ecef",
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
              background: "#ffffff",
              color: "#333",
              border: "1px solid #e9ecef",
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
              background: activeIndicators[ind] ? "#106cf5" : "transparent",
              color: activeIndicators[ind] ? "#fff" : "#6c757d",
              border: activeIndicators[ind] ? "1px solid #106cf5" : "1px solid #e9ecef",
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