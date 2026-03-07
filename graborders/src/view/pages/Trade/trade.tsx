import React, { useState, useEffect, useRef, useCallback, useMemo } from "react";
import CoinListModal from "src/shared/modal/CoinListModal";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import spotListSelectors from "src/modules/spot/list/spotListSelectors";
import spotListActions from "src/modules/spot/list/spotListActions";
import spotFormActions from "src/modules/spot/form/spotFormActions";
import assetsActions from "src/modules/assets/list/assetsListActions";
import assetsListSelectors from "src/modules/assets/list/assetsListSelectors";
import transactionListSelectors from "src/modules/transaction/list/transactionListSelectors";
import transactionListActions from "src/modules/transaction/list/transactionListActions";
import futuresListSelectors from "src/modules/futures/list/futuresListSelectors";
import futuresListAction from "src/modules/futures/list/futuresListActions";
import { i18n } from "../../../i18n";
import CoinSelectorSidebar from "src/view/shared/modals/CoinSelectorSidebar";
import futuresFormAction from "src/modules/futures/form/futuresFormActions";
import futuresViewActions from "src/modules/futures/view/futuresViewActions";

// Utility: safe parseFloat that returns NaN if invalid
const safeParse = (v) => {
  if (v === null || v === undefined || v === "") return NaN;
  const n = Number(v);
  return Number.isFinite(n) ? n : NaN;
};

// Constants
const TRADING_PERIOD_OPTIONS = [
  { value: 30, label: "30s - 20%" },
  { value: 60, label: "60s - 30%" },
  { value: 120, label: "120s - 50%" },
  { value: 86400, label: "24h - 60%" },
  { value: 172800, label: "48h - 70%" },
  { value: 259200, label: "72h - 80%" },
  { value: 604800, label: "7d - 90%" },
  { value: 1296000, label: "15d - 100%" }
];

const LEVERAGE_OPTIONS = ["1", "2", "3", "5", "10", "20", "50", "100"];

// Custom hook for WebSocket management
const useWebSocket = (url, onMessage, isEnabled = true) => {
  const wsRef = useRef(null);
  const onMessageRef = useRef(onMessage);

  useEffect(() => {
    onMessageRef.current = onMessage;
  }, [onMessage]);

  useEffect(() => {
    if (!isEnabled || !url) {
      if (wsRef.current) {
        wsRef.current.close();
        wsRef.current = null;
      }
      return;
    }

    try {
      const ws = new WebSocket(url);
      wsRef.current = ws;

      ws.onopen = () => {
        console.log(i18n("pages.trade.websocketConnected"), url);
      };

      ws.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          onMessageRef.current(data);
        } catch (err) {
          console.error(i18n("pages.trade.websocketParseError"), err);
        }
      };

      ws.onerror = (error) => {
        console.error(i18n("pages.trade.websocketError"), error);
      };

      ws.onclose = () => {
        console.log(i18n("pages.trade.websocketClosed"));
      };

      return () => {
        if (ws.readyState === WebSocket.OPEN) {
          ws.close();
        }
      };
    } catch (err) {
      console.error(i18n("pages.trade.websocketCreateError"), err);
    }
  }, [url, isEnabled]);

  return wsRef;
};

// Progress Bar Component
const PercentageProgressBar = ({ onPercentageSelect, currentPercentage = 0 }) => {
  const percentages = [0, 25, 50, 75, 100];
  
  const handleClick = (percentage) => {
    onPercentageSelect(percentage / 100);
  };

  return (
    <div className="percentage-progress-bar">
      <div className="progress-bar-labels">
        {percentages.map((percentage) => (
          <span key={percentage} className="progress-label">
            {percentage}%
          </span>
        ))}
      </div>
      
      <div className="progress-bar-track">
        <div 
          className="progress-bar-fill" 
          style={{ width: `${currentPercentage}%` }}
        />
        
        <div className="progress-bar-markers">
          {percentages.map((percentage) => (
            <div
              key={percentage}
              className={`progress-marker ${percentage <= currentPercentage ? 'active' : ''}`}
              onClick={() => handleClick(percentage)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

function Trade() {
  const dispatch = useDispatch();

  // Redux data selectors
  const listspot = useSelector(spotListSelectors.selectRows) || [];
  const listAssets = useSelector(assetsListSelectors.selectRows) || [];
  const transactions = useSelector(transactionListSelectors.selectRows) || [];
  const listFutures = useSelector(futuresListSelectors.selectRows) || [];
  const pendingRows = useSelector(futuresListSelectors.pendingRows);
  
  // Loading states
  const spotLoading = useSelector(spotListSelectors.selectLoading);
  const futureLoading = useSelector(futuresListSelectors.selectLoading);
  const transactionLoading = useSelector(transactionListSelectors.selectLoading);
  const assetsLoading = useSelector(assetsListSelectors.selectLoading);

  // Local UI state
  const [selectedCoin, setSelectedCoin] = useState("BTCUSDT");
  const [marketPrice, setMarketPrice] = useState("0");
  const [priceChangePercent, setPriceChangePercent] = useState("0");
  const [isCoinModalOpen, setIsCoinModalOpen] = useState(false);
  const [orderType, setOrderType] = useState("LIMIT");
  const [price, setPrice] = useState("0");
  const [quantity, setQuantity] = useState("");
  const [amountInUSDT, setAmountInUSDT] = useState("");
  const [activeTab, setActiveTab] = useState("buy");
  const [orderBook, setOrderBook] = useState({ asks: [], bids: [] });
  const [placing, setPlacing] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [activeOrdersTab, setActiveOrdersTab] = useState("Positions");
  const [type, setType] = useState("trade");

  // Trade mode specific state
  const [selectedLeverage, setSelectedLeverage] = useState("10");
  const [selectedDuration, setSelectedDuration] = useState("30");

  // Future Details Modal state
  const [selectedFuture, setSelectedFuture] = useState(null);
  const [isFutureModalOpen, setIsFutureModalOpen] = useState(false);

  // Refs for performance optimization
  const dataFetchController = useRef(null);
  const isComponentMounted = useRef(true);
  const prevCoinRef = useRef(selectedCoin);

  // Define formatting functions FIRST before any useMemo that uses them
  const formatNumber = useCallback((num, decimals = 2) => {
    const n = Number(num);
    if (!Number.isFinite(n)) return (0).toFixed(decimals);
    return n.toLocaleString(undefined, {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    });
  }, []);

  const formatCurrency = useCallback((num) => {
    const n = Number(num);
    if (!Number.isFinite(n)) return i18n("common.currencyFormat", "0.00");
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(n);
  }, []);

  const formatDate = useCallback((dateString) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      });
    } catch (e) {
      return i18n("common.invalidDate");
    }
  }, []);

  const formatTime = useCallback((dateString) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      });
    } catch (e) {
      return i18n("common.invalidTime");
    }
  }, []);

  const formatDuration = useCallback((seconds) => {
    if (!seconds) return "N/A";

    if (seconds < 60) return `${seconds}s`;
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}h`;
    if (seconds < 604800) return `${Math.floor(seconds / 86400)}d`;
    return `${Math.floor(seconds / 86400)}d`;
  }, []);

  // Derived values
  const baseSymbol = useMemo(() => {
    return selectedCoin.replace("USDT", "");
  }, [selectedCoin]);

  // Memoized balances mapping
  const balances = useMemo(() => {
    if (!Array.isArray(listAssets)) return {};
    const result = {};
    for (const item of listAssets) {
      if (item.symbol && item.amount) {
        result[item.symbol] = Number(item.amount) || 0;
      }
    }
    return result;
  }, [listAssets]);

  // Current balance - UPDATED FOR TRADE MODE
  const currentBalance = useMemo(() => {
    if (type === "trade") {
      // In trade mode, always show USDT balance for both buy and sell
      return balances.USDT || 0;
    } else {
      // In perpetual mode, show USDT for buy, base symbol for sell
      if (activeTab === "buy") {
        return balances.USDT || 0;
      } else {
        return balances[baseSymbol] || 0;
      }
    }
  }, [type, activeTab, baseSymbol, balances]);

  // Calculate current percentage for progress bar - FIXED LOGIC
  const currentPercentage = useMemo(() => {
    if (type === "trade") {
      // For trade mode, calculate based on amountInUSDT
      const usdtAmount = safeParse(amountInUSDT);
      if (!Number.isFinite(usdtAmount) || usdtAmount <= 0 || currentBalance <= 0) {
        return 0;
      }
      const percentage = (usdtAmount / currentBalance) * 100;
      return Math.min(100, Math.max(0, percentage));
    } else {
      // For perpetual mode
      if (activeTab === "buy") {
        const usdtAmount = safeParse(amountInUSDT);
        if (!Number.isFinite(usdtAmount) || usdtAmount <= 0 || currentBalance <= 0) {
          return 0;
        }
        const percentage = (usdtAmount / currentBalance) * 100;
        return Math.min(100, Math.max(0, percentage));
      } else {
        // For sell tab in perpetual mode, we need to convert amountInUSDT to quantity
        const usdtAmount = safeParse(amountInUSDT);
        const currentPriceNum = safeParse(marketPrice);
        
        if (!Number.isFinite(usdtAmount) || usdtAmount <= 0 || 
            !Number.isFinite(currentPriceNum) || currentPriceNum <= 0 || 
            currentBalance <= 0) {
          return 0;
        }
        
        const quantityAmount = usdtAmount / currentPriceNum;
        const percentage = (quantityAmount / currentBalance) * 100;
        return Math.min(100, Math.max(0, percentage));
      }
    }
  }, [type, activeTab, amountInUSDT, currentBalance, marketPrice]);

  // Balance display text - UPDATED
  const balanceDisplay = useMemo(() => {
    if (type === "trade") {
      return `${i18n("pages.trade.available")}: ${formatNumber(currentBalance, 2)} USDT`;
    } else {
      if (activeTab === "buy") {
        return `${i18n("pages.trade.available")}: ${formatNumber(currentBalance, 2)} USDT`;
      } else {
        return `${i18n("pages.trade.available")}: ${formatNumber(currentBalance, 6)} ${baseSymbol}`;
      }
    }
  }, [type, activeTab, currentBalance, baseSymbol, formatNumber]);

  // Button text - UPDATED FOR TRADE MODE
  const buttonText = useMemo(() => {
    if (placing) return i18n("pages.trade.placing");
    
    if (type === "trade") {
      // In trade mode, both are in USDT
      return `${activeTab === "buy" ? i18n("pages.trade.long") : i18n("pages.trade.short")} (USDT)`;
    } else {
      return `${activeTab === "buy" ? i18n("pages.trade.buy") : i18n("pages.trade.sell")} ${baseSymbol}`;
    }
  }, [placing, type, activeTab, baseSymbol]);

  // WebSocket URLs
  const tickerUrl = useMemo(() => 
    selectedCoin ? `wss://stream.binance.com:9443/ws/${selectedCoin.toLowerCase()}@ticker` : null,
    [selectedCoin]
  );

  const depthUrl = useMemo(() => 
    selectedCoin ? `wss://stream.binance.com:9443/ws/${selectedCoin.toLowerCase()}@depth20@100ms` : null,
    [selectedCoin]
  );

  // WebSocket handlers
  const handleTickerMessage = useCallback((data) => {
    if (data.c !== undefined) setMarketPrice(data.c);
    if (data.P !== undefined) setPriceChangePercent(data.P);
  }, []);

  const handleDepthMessage = useCallback((data) => {
    const asks = (data.asks || []).slice(0, 5).map((a) => ({ 
      price: a[0], 
      amount: a[1] 
    }));
    const bids = (data.bids || []).slice(0, 5).map((b) => ({ 
      price: b[0], 
      amount: b[1] 
    }));
    setOrderBook({ asks, bids });
  }, []);

  // Use custom WebSocket hooks
  useWebSocket(tickerUrl, handleTickerMessage, isComponentMounted.current);
  useWebSocket(depthUrl, handleDepthMessage, isComponentMounted.current);

  // Sync quantity FROM USDT amount (but only for internal calculations)
  const syncQuantityFromUSDT = useCallback((usdtValue) => {
    const usdtNum = safeParse(usdtValue);
    const priceNum = type === "perpetual" && orderType === "LIMIT" ? safeParse(price) : safeParse(marketPrice);

    if (Number.isFinite(usdtNum) && Number.isFinite(priceNum) && priceNum > 0) {
      const calculatedQuantity = usdtNum / priceNum;
      setQuantity(calculatedQuantity.toFixed(8));
    } else {
      setQuantity("");
    }
  }, [type, orderType, price, marketPrice]);

  // Initialize component
  useEffect(() => {
    isComponentMounted.current = true;
    dispatch(assetsActions.doFetch(type));

    return () => {
      isComponentMounted.current = false;
      if (dataFetchController.current) {
        dataFetchController.current.abort();
      }
    };
  }, [dispatch, type]);

  // Conditional data fetching
  useEffect(() => {
    if (!isComponentMounted.current) return;

    const fetchData = () => {
      if (activeOrdersTab === "Transaction history") {
        dispatch(transactionListActions.doFetch());
        return;
      }

      if (type === "perpetual") {
        if (activeOrdersTab === "Positions") {
          dispatch(spotListActions.doFetchPending());
        } else if (activeOrdersTab === "History orders") {
          dispatch(spotListActions.doFetch());
        }
      } else if (type === "trade") {
        if (activeOrdersTab === "Positions") {
          dispatch(futuresListAction.doFetchPending());
        } else if (activeOrdersTab === "History orders") {
          dispatch(futuresListAction.doFetch());
        }
      }
    };

    const timeoutId = setTimeout(fetchData, 100);
    return () => clearTimeout(timeoutId);
  }, [dispatch, type, activeOrdersTab]);

  // Update price when market price changes
  useEffect(() => {
    if (marketPrice && marketPrice !== "0") {
      setPrice(marketPrice);
      
      // Sync quantity when price changes
      if (amountInUSDT && !isNaN(Number(amountInUSDT))) {
        syncQuantityFromUSDT(amountInUSDT);
      }
    }
  }, [marketPrice, amountInUSDT, syncQuantityFromUSDT]);

  // Reset form when coin changes
  useEffect(() => {
    if (prevCoinRef.current !== selectedCoin) {
      setQuantity("");
      setAmountInUSDT("");
      prevCoinRef.current = selectedCoin;
    }
  }, [selectedCoin]);

  // Handlers - SIMPLIFIED
  const handleAmountInUSDTChange = useCallback((e) => {
    const value = e.target.value;
    
    // Allow any input (including empty string and decimal points)
    // Remove any non-numeric characters except decimal point
    const cleanedValue = value.replace(/[^\d.]/g, '');
    
    // Ensure only one decimal point
    const parts = cleanedValue.split('.');
    if (parts.length > 2) {
      // If more than one decimal point, keep only the first part and first decimal
      const formattedValue = parts[0] + '.' + parts.slice(1).join('');
      setAmountInUSDT(formattedValue);
    } else {
      setAmountInUSDT(cleanedValue);
    }
    
    // Sync quantity for internal calculations
    if (cleanedValue !== "") {
      syncQuantityFromUSDT(cleanedValue);
    } else {
      setQuantity("");
    }
  }, [syncQuantityFromUSDT]);

  const handlePriceChange = useCallback((e) => {
    const newPrice = e.target.value;
    setPrice(newPrice);
    
    // Sync quantity when price changes
    if (amountInUSDT && !isNaN(Number(amountInUSDT))) {
      syncQuantityFromUSDT(amountInUSDT);
    }
  }, [amountInUSDT, syncQuantityFromUSDT]);

  // Percentage quick select handlers - UPDATED WITH PRECISION FIX
  const handlePercentageSelect = useCallback((percentage) => {
    if (type === "trade") {
      // In trade mode, always use USDT balance for both buy and sell
      const availableUSDT = currentBalance;
      const amountToUse = availableUSDT * percentage;
      
      // Cap the amount at the actual balance (prevent floating point overflow)
      const cappedAmount = Math.min(amountToUse, availableUSDT);
      
      // Round to 8 decimal places to avoid floating point issues
      const roundedAmount = parseFloat(cappedAmount.toFixed(8));
      
      setAmountInUSDT(roundedAmount.toString());
    } else {
      // Original logic for perpetual mode
      if (activeTab === "buy") {
        const availableUSDT = currentBalance;
        const maxSpend = availableUSDT * percentage;
        const cappedAmount = Math.min(maxSpend, availableUSDT);
        const roundedAmount = parseFloat(cappedAmount.toFixed(8));
        setAmountInUSDT(roundedAmount.toString());
      } else {
        // For sell tab, we need to convert base coin balance to USDT
        const availableCoin = currentBalance;
        const coinAmountToUse = availableCoin * percentage;
        const currentPriceNum = safeParse(marketPrice) || safeParse(price) || 1;
        const usdtAmount = coinAmountToUse * currentPriceNum;
        
        // Cap at maximum possible USDT value
        const maxUsdtValue = availableCoin * currentPriceNum;
        const cappedUsdtAmount = Math.min(usdtAmount, maxUsdtValue);
        const roundedAmount = parseFloat(cappedUsdtAmount.toFixed(8));
        
        setAmountInUSDT(roundedAmount.toString());
      }
    }
  }, [type, activeTab, currentBalance, marketPrice, price]);

  // Function to create trade (for Trade mode) - UPDATED WITH PRECISION FIX
  const createTrade = useCallback(async (adjustedAmount) => {
    const currentPrice = parseFloat(marketPrice || "0") || 0;
    const direction = activeTab;

    const payload = {
      futuresStatus: direction === "buy" ? "long" : "short",
      profitAndLossAmount: '',
      leverage: parseInt(selectedLeverage, 10),
      control: "loss",
      operate: "low",
      futureCoin: selectedCoin.replace("USDT", "/USDT"),
      closePositionTime: '',
      closePositionPrice: '',
      openPositionTime: new Date().toISOString(),
      openPositionPrice: currentPrice,
      contractDuration: selectedDuration,
      futuresAmount: adjustedAmount.toFixed(8), // Use adjusted amount with precision
    };

    try {
      const createdRecord = await dispatch(futuresFormAction.doCreate(payload));
      const record = createdRecord?.id ? createdRecord : createdRecord?.payload;

      if (record?.id) {
        setQuantity("");
        setAmountInUSDT("");
        if (activeOrdersTab === "Positions") {
          dispatch(futuresListAction.doFetchPending());
        }
        return record;
      }
      return null;
    } catch (err) {
      console.error(i18n("pages.trade.errors.createError"), err);
      throw err;
    }
  }, [marketPrice, activeTab, selectedLeverage, selectedCoin, selectedDuration, dispatch, activeOrdersTab]);

  // Modal handlers
  const handleOpenCoinModal = useCallback(() => setIsCoinModalOpen(true), []);
  const handleCloseCoinModal = useCallback(() => setIsCoinModalOpen(false), []);

  const handleSelectCoin = useCallback((coin) => {
    if (!coin || coin === selectedCoin) {
      setIsCoinModalOpen(false);
      return;
    }

    setSelectedCoin(coin);
    setIsCoinModalOpen(false);
  }, [selectedCoin]);

  // Future Details Modal handlers - FIXED: No conditional early return
  const handleOpenFutureModal = useCallback((future) => {
    setSelectedFuture(future);
    setIsFutureModalOpen(true);
  }, []);

  const handleCloseFutureModal = useCallback(() => {
    setIsFutureModalOpen(false);
    // Don't set selectedFuture to null immediately - let the modal handle the fade out
    setTimeout(() => {
      setSelectedFuture(null);
    }, 300); // Match the CSS transition duration
  }, []);

  // Generate unique order number
  const generateOrderNumber = useCallback(() => {
    const t = Date.now().toString(36);
    const r = Math.floor(Math.random() * 1e6).toString(36);
    return i18n("pages.trade.orderNumberFormat", t, r);
  }, []);

  // Helper function to compare floating numbers with tolerance
  const compareWithTolerance = useCallback((a, b, tolerance = 0.000001) => {
    return Math.abs(a - b) <= tolerance;
  }, []);

  // Place order handler - UPDATED WITH PRECISION FIX
  const handlePlaceOrder = useCallback(async () => {
    setErrorMessage("");
    if (placing) return;

    if (type === "trade") {
      // Trade mode validation - UPDATED
      const usdtAmount = safeParse(amountInUSDT);
      
      if (!Number.isFinite(usdtAmount) || usdtAmount <= 0) {
        setErrorMessage(i18n("pages.trade.errors.invalidAmount"));
        return;
      }

      // Balance validation for Trade mode - always check USDT balance
      // Use tolerance for floating point comparison
      if (usdtAmount > currentBalance + 0.000001) {
        setErrorMessage(i18n("pages.trade.errors.insufficientUSDT", formatNumber(currentBalance, 2)));
        return;
      }

      // If amount is exactly the balance (within tolerance), use the exact balance
      const amountToUse = compareWithTolerance(usdtAmount, currentBalance) ? currentBalance : usdtAmount;
      
      setPlacing(true);
      try {
        await createTrade(amountToUse);
      } catch (err) {
        console.error(i18n("pages.trade.errors.createError"), err);
        setErrorMessage(i18n("pages.trade.errors.failedOrder"));
      } finally {
        setPlacing(false);
      }
    } else {
      // Original perpetual mode logic - updated to use quantity from amountInUSDT
      const p = orderType === "MARKET" ? safeParse(marketPrice) : safeParse(price);
      const q = safeParse(quantity); // This is calculated from amountInUSDT

      // Validation
      if (!Number.isFinite(q) || q <= 0) {
        setErrorMessage(i18n("pages.trade.errors.invalidQuantity"));
        return;
      }

      if (!Number.isFinite(p) || p <= 0) {
        setErrorMessage(i18n("pages.trade.errors.invalidPrice"));
        return;
      }

      // Balance validation with tolerance
      if (activeTab === "buy") {
        const totalCost = p * q;
        if (totalCost > currentBalance + 0.000001) {
          setErrorMessage(i18n("pages.trade.errors.insufficientUSDT", formatNumber(currentBalance, 2)));
          return;
        }
      } else {
        if (q > currentBalance + 0.000001) {
          setErrorMessage(i18n("pages.trade.errors.insufficientCoin", formatNumber(currentBalance, 6), baseSymbol));
          return;
        }
      }

      setPlacing(true);
      try {
        const orderPrice = p;
        const orderQty = q;
        const totalValue = orderPrice * orderQty;
        const estimatedFee = totalValue * 0.001;

        // Adjust quantities if they're exactly the balance (within tolerance)
        const adjustedOrderQty = compareWithTolerance(q, currentBalance) ? currentBalance : q;
        const adjustedTotalValue = orderPrice * adjustedOrderQty;

        const orderData = {
          orderNo: generateOrderNumber(),
          orderType: orderType.toLowerCase(),
          tradingPair: selectedCoin.replace("USDT", "/USDT"),
          status: orderType === "MARKET" ? "completed" : "pending",
          direction: activeTab.toUpperCase(),
          delegateType: orderType,
          delegateState: orderType === "MARKET" ? "Filled" : "Pending",
          orderQuantity: adjustedOrderQty,
          commissionPrice: orderPrice,
          entrustedValue: adjustedTotalValue,
          transactionQuantity: orderType === "MARKET" ? adjustedOrderQty : 0,
          transactionValue: orderType === "MARKET" ? adjustedTotalValue : 0,
          closingPrice: orderType === "MARKET" ? orderPrice : 0,
          handlingFee: orderType === "MARKET" ? estimatedFee : 0,
          commissionTime: new Date().toISOString(),
          closingTime: orderType === "MARKET" ? new Date().toISOString() : null,
        };

        await dispatch(spotFormActions.doCreate(orderData));

        setQuantity("");
        setAmountInUSDT("");

        if (activeOrdersTab === "Positions") {
          dispatch(spotListActions.doFetchPending());
        }

      } catch (err) {
        console.error(i18n("pages.trade.errors.placeOrderError"), err);
        setErrorMessage(i18n("pages.trade.errors.failedOrder"));
      } finally {
        setPlacing(false);
      }
    }
  }, [
    placing, quantity, orderType, marketPrice, price, selectedCoin,
    activeTab, dispatch, generateOrderNumber, currentBalance, baseSymbol,
    formatNumber, type, amountInUSDT, activeOrdersTab, createTrade,
    compareWithTolerance
  ]);

  const updateStatus = useCallback(async (id, data) => {
    data.status = "canceled";
    dispatch(spotFormActions.doUpdate(id, data));
  }, [dispatch]);

  // Calculate max amount for depth visualization
  const maxAmount = useMemo(() => {
    const all = [
      ...orderBook.asks.map((it) => safeParse(it.amount)),
      ...orderBook.bids.map((it) => safeParse(it.amount)),
    ].filter((n) => Number.isFinite(n));
    return Math.max(...all, 1);
  }, [orderBook]);

  // Get transaction configuration
  const getTransactionConfig = useCallback((type, direction, relatedAsset) => {
    const config = {
      icon: 'fa-exchange-alt',
      typeText: i18n("pages.history.transactionTypes.transaction"),
      iconClass: 'swap',
      color: '#627EEA',
      amountColor: direction === 'in' ? '#2ff378' : '#FF6838'
    };

    switch (type) {
      case 'deposit':
        config.icon = 'fa-arrow-down';
        config.typeText = i18n("pages.history.transactionTypes.deposit");
        config.iconClass = 'deposit';
        config.color = '#F3BA2F';
        config.amountColor = '#2ff378';
        break;

      case 'withdraw':
        config.icon = 'fa-arrow-up';
        config.typeText = i18n("pages.history.transactionTypes.withdrawal");
        config.iconClass = 'withdraw';
        config.color = '#FF6838';
        config.amountColor = '#FF6838';
        break;

      case 'futures_profit':
        config.icon = 'fa-chart-line';
        config.typeText = i18n("pages.history.transactionTypes.futuresProfit");
        config.iconClass = 'futures-profit';
        config.color = '#00C076';
        config.amountColor = '#00C076';
        break;

      case 'futures_loss':
        config.icon = 'fa-chart-line';
        config.typeText = i18n("pages.history.transactionTypes.futuresLoss");
        config.iconClass = 'futures-loss';
        config.color = '#FF6838';
        config.amountColor = '#FF6838';
        break;

      case 'futures_reserved':
        config.icon = 'fa-clock';
        config.typeText = i18n("pages.history.transactionTypes.futuresReserved");
        config.iconClass = 'futures-reserved';
        config.color = '#FF9800';
        config.amountColor = '#FF6838';
        break;

      case 'order_reserved':
        config.icon = 'fa-clock';
        config.typeText = i18n("pages.history.transactionTypes.orderReserved");
        config.iconClass = 'order-reserved';
        config.color = '#FF9800';
        config.amountColor = '#FF6838';
        break;

      default:
        config.icon = 'fa-exchange-alt';
        config.typeText = i18n("pages.history.transactionTypes.transaction");
        config.iconClass = 'default';
        config.color = '#627EEA';
        config.amountColor = '#627EEA';
    }
    return config;
  }, []);

  // Get futures status color and text
  const getFuturesStatusConfig = useCallback((status) => {
    const config = {
      color: '#6c757d',
      bgColor: '#e9ecef',
      text: status || i18n("common.unknown")
    };

    switch (status?.toLowerCase()) {
      case 'long':
        config.color = '#37b66a';
        config.bgColor = 'rgba(55, 182, 106, 0.1)';
        config.text = i18n("pages.trade.futuresStatus.long");
        break;
      case 'short':
        config.color = '#f56c6c';
        config.bgColor = 'rgba(245, 108, 108, 0.1)';
        config.text = i18n("pages.trade.futuresStatus.short");
        break;
      case 'closed':
        config.color = '#106cf5';
        config.bgColor = 'rgba(16, 108, 245, 0.1)';
        config.text = i18n("pages.trade.futuresStatus.closed");
        break;
      case 'liquidated':
        config.color = '#dc3545';
        config.bgColor = 'rgba(220, 53, 69, 0.1)';
        config.text = i18n("pages.trade.futuresStatus.liquidated");
        break;
    }
    return config;
  }, []);

  // Get loading state based on current context
  const getCurrentLoading = useMemo(() => {
    if (activeOrdersTab === "Transaction history") return transactionLoading;
    if (type === "perpetual") return spotLoading;
    if (type === "trade") return futureLoading;
    return false;
  }, [activeOrdersTab, type, spotLoading, futureLoading, transactionLoading]);

  // Get data based on current context
  const getCurrentData = useMemo(() => {
    if (activeOrdersTab === "Transaction history") return transactions;
    if (type === "perpetual" && activeOrdersTab === "Positions") 
      return listspot.filter(order => order.status === "pending");
    if (type === "perpetual" && activeOrdersTab === "History orders") 
      return listspot.filter(order => order.status !== "pending");
    if (type === "trade" && activeOrdersTab === "Positions") 
      return pendingRows;
    if (type === "trade" && activeOrdersTab === "History orders") 
      return listFutures.filter(future => future.closePositionTime);
    return [];
  }, [activeOrdersTab, type, listspot, listFutures, transactions, pendingRows]);

  // Determine if current tab has no data
  const hasNoData = useMemo(() => {
    if (getCurrentLoading) return false;
    return getCurrentData.length === 0;
  }, [getCurrentLoading, getCurrentData]);

  // Calculate estimated P&L based on current price
  const calculateEstimatedPNL = useCallback((future) => {
    if (!future || !future.futuresAmount || !future.openPositionPrice || !marketPrice) return 0;
    
    const amount = parseFloat(future.futuresAmount);
    const entryPrice = parseFloat(future.openPositionPrice);
    const currentPriceNum = safeParse(marketPrice);
    const leverage = parseInt(future.leverage || "1", 10);
    
    if (!amount || !entryPrice || !currentPriceNum) return 0;
    
    if (future.futuresStatus?.toLowerCase() === "long") {
      return ((currentPriceNum - entryPrice) / entryPrice) * amount * leverage;
    } else {
      return ((entryPrice - currentPriceNum) / entryPrice) * amount * leverage;
    }
  }, [marketPrice]);

  return (
    <div className="container">
      {/* Header */}
      <div className="trade-header">
        <div className="nav-bar">
          <div className="back-arrow">
            <div className="trading-pair" onClick={handleOpenCoinModal}>
              <i className="fas fa-chevron-down dropdown-arrow"></i>
              {selectedCoin.replace("USDT", "")} / USDT
            </div>
            <div>
              <p style={{ fontSize: 10 }}>
                {type === "trade" ? i18n("pages.trade.tradingMode.trade") : i18n("pages.trade.tradingMode.perpetual")}
              </p>
            </div>
          </div>

          <div className="header-right">
            <select className="trade-type-select" value={type} onChange={(e) => setType(e.target.value)}>
              <option value="trade">{i18n("pages.trade.tradingMode.trade")}</option>
              <option value="perpetual">{i18n("pages.trade.tradingMode.perpetual")}</option>
            </select>
            <Link to={`market/detail/${selectedCoin}`} className="chart-icon">
              <i className="fas fa-chart-line"></i>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="main-content">
        <div className="trading-layout">
          {/* Trade Form - Now 50% width */}
          <div className="trade-form">
            <div className="buy-sell-tabs" role="tablist">
              <div
                role="tab"
                aria-selected={activeTab === "buy"}
                tabIndex={0}
                className={`buy-tab ${activeTab === "buy" ? "active" : ""}`}
                onClick={() => setActiveTab("buy")}
                onKeyDown={(e) => e.key === "Enter" && setActiveTab("buy")}
              >
                {i18n("pages.trade.long")}
              </div>
              <div
                role="tab"
                aria-selected={activeTab === "sell"}
                tabIndex={0}
                className={`sell-tab ${activeTab === "sell" ? "active" : ""}`}
                onClick={() => setActiveTab("sell")}
                onKeyDown={(e) => e.key === "Enter" && setActiveTab("sell")}
              >
                {i18n("pages.trade.short")}
              </div>
            </div>

            {/* Trade mode specific fields */}
            {type === "trade" && (
              <>
                {/* Trading Period Select */}
                <div className="input-group">
                  <div className="input-label">{i18n("pages.trade.tradingPeriod")}</div>
                  <select
                    className="order-type-select"
                    value={selectedDuration}
                    onChange={(e) => setSelectedDuration(e.target.value)}
                  >
                    {TRADING_PERIOD_OPTIONS.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Leverage Select */}
                <div className="input-group">
                  <div className="input-label">{i18n("pages.trade.leverage")}</div>
                  <select
                    className="order-type-select"
                    value={selectedLeverage}
                    onChange={(e) => setSelectedLeverage(e.target.value)}
                  >
                    {LEVERAGE_OPTIONS.map((option) => (
                      <option key={option} value={option}>
                        {option}x
                      </option>
                    ))}
                  </select>
                </div>

                {/* Amount in USDT (Trade mode only) */}
                <div className="input-group">
                  <div className="input-label">{i18n("pages.trade.amount")} (USDT)</div>
                  <div className="input-with-buttons">
                    <input
                      className="value-input"
                      value={amountInUSDT}
                      onChange={handleAmountInUSDTChange}
                      placeholder="0.0"
                      inputMode="decimal"
                      aria-label={i18n("pages.trade.amount")}
                    />
                  </div>
                  {/* New Progress Bar for Trade Mode */}
                  <PercentageProgressBar 
                    onPercentageSelect={handlePercentageSelect}
                    currentPercentage={currentPercentage}
                  />
                </div>
              </>
            )}

            {/* Perpetual mode fields */}
            {type === "perpetual" && (
              <>
                <div className="order-type">
                  <div className="order-type-label">{i18n("pages.trade.orderType")}</div>
                  <select
                    className="order-type-select"
                    value={orderType}
                    onChange={(e) => setOrderType(e.target.value)}
                  >
                    <option value="LIMIT">{i18n("pages.trade.limit")}</option>
                    <option value="MARKET">{i18n("pages.trade.market")}</option>
                  </select>
                </div>

                {/* Price input (limit only) */}
                {orderType === "LIMIT" && (
                  <div className="input-group">
                    <div className="input-label">{i18n("pages.trade.price")}</div>
                    <div className="input-with-buttons">
                      <input
                        className="value-input"
                        value={price}
                        onChange={handlePriceChange}
                        inputMode="decimal"
                        aria-label={i18n("pages.trade.price")}
                      />
                    </div>
                  </div>
                )}

                {/* Amount in USDT (Perpetual only) */}
                <div className="input-group">
                  <div className="input-label">{i18n("pages.trade.amount")} (USDT)</div>
                  <div className="input-with-buttons">
                    <input
                      className="value-input"
                      value={amountInUSDT}
                      onChange={handleAmountInUSDTChange}
                      placeholder="0.0"
                      inputMode="decimal"
                      aria-label={i18n("pages.trade.amount")}
                    />
                  </div>
                  {/* Progress Bar for Perpetual Mode */}
                  <PercentageProgressBar 
                    onPercentageSelect={handlePercentageSelect}
                    currentPercentage={currentPercentage}
                  />
                </div>
              </>
            )}

            {/* Balance Display */}
            <div className="balance-info">
              {balanceDisplay}
            </div>

            {/* Error */}
            {errorMessage && <div className="error-message" role="alert">{errorMessage}</div>}

            {/* Action Button */}
            <button
              className={`action-button ${activeTab === "buy" ? "buy-button" : "sell-button"}`}
              onClick={handlePlaceOrder}
              disabled={placing || assetsLoading}
              aria-busy={placing}
            >
              {buttonText}
            </button>
          </div>

          {/* Order Book */}
          <div className="order-book" role="region" aria-label="order book">
            <div className="order-book-header">
              <span>{i18n("pages.trade.orderBook.price")}</span>
              <span>{i18n("pages.trade.orderBook.amount")} ({baseSymbol})</span>
            </div>

            {orderBook.asks.map((ask, idx) => {
              const amount = safeParse(ask.amount) || 0;
              const widthPercentage = Math.min(100, (amount / maxAmount) * 100);
              return (
                <div key={`ask-${idx}`} className="order-book-row ask-row">
                  <div className="depth-bar ask-depth" style={{ width: `${widthPercentage}%` }} />
                  <div className="order-price">{formatNumber(ask.price, 4)}</div>
                  <div className="order-amount">{formatNumber(ask.amount, 4)}</div>
                </div>
              );
            })}

            <div className="order-book-row current-price-row">
              <div className="current-price">${formatNumber(marketPrice, 2)}</div>
            </div>

            {orderBook.bids.map((bid, idx) => {
              const amount = safeParse(bid.amount) || 0;
              const widthPercentage = Math.min(100, (amount / maxAmount) * 100);
              return (
                <div key={`bid-${idx}`} className="order-book-row bid-row">
                  <div className="depth-bar bid-depth" style={{ width: `${widthPercentage}%` }} />
                  <div className="order-price">{formatNumber(bid.price, 4)}</div>
                  <div className="order-amount">{formatNumber(bid.amount, 4)}</div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Orders Tabs */}
        <div className="orders-tabs">
          <div className="orders-tabs-header">
            {[i18n("pages.trade.tabs.positions"), i18n("pages.trade.tabs.historyOrders"), i18n("pages.trade.tabs.transactionHistory")].map(tab => (
              <div
                key={tab}
                className={`orders-tab ${activeOrdersTab === tab ? 'active' : ''}`}
                onClick={() => setActiveOrdersTab(tab)}
              >
                {tab}
              </div>
            ))}
          </div>

          <div className="orders-tab-content">
            {getCurrentLoading ? (
              <div className="loading-skeleton">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="skeleton-item" />
                ))}
              </div>
            ) : hasNoData ? (
              <div className="empty-orders">
                <div className="empty-icon">
                  <i className="fas fa-inbox" />
                </div>
                <div className="empty-text">
                  {i18n("pages.trade.noData", activeOrdersTab.toLowerCase())}
                </div>
                <div className="empty-subtext">
                  {activeOrdersTab === i18n("pages.trade.tabs.transactionHistory")
                    ? i18n("pages.trade.noTransactionsText")
                    : i18n("pages.trade.noOrdersText", activeOrdersTab.toLowerCase())}
                </div>
              </div>
            ) : activeOrdersTab === i18n("pages.trade.tabs.transactionHistory") ? (
              <div className="transactions-list">
                {getCurrentData.map((transaction) => {
                  const config = getTransactionConfig(transaction.type, transaction.direction, transaction.relatedAsset);
                  const amountSign = transaction.direction === 'in' ? '+' : '-';

                  return (
                    <div key={transaction.id ?? transaction._id} className="transaction-item">
                      <div className="transaction-icon" style={{ backgroundColor: config.color }}>
                        <i className={`fas ${config.icon}`} />
                      </div>

                      <div className="transaction-details">
                        <div className="transaction-main">
                          <div className="transaction-type">{config.typeText}</div>
                          <div className="transaction-amount" style={{ color: config.amountColor }}>
                            {amountSign}{formatNumber(transaction.amount, 2)} {transaction.asset}
                          </div>
                        </div>

                        <div className="transaction-secondary">
                          <div className="transaction-status">
                            <span className={`status-badge status-${transaction.status}`}>
                              {transaction.status}
                            </span>
                          </div>
                          <div className="transaction-date">
                            {formatDate(transaction.createdAt)} {formatTime(transaction.createdAt)}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : type === "perpetual" ? (
              <div className="orders-list">
                {getCurrentData.map((order) => (
                  <div key={order.id ?? order.orderNo} className="order-item">
                    <div className="order-main-info">
                      <div className="order-pair-action">
                        <span className="order-pair">{order.tradingPair}</span>
                        <span className={`order-action ${String(order?.direction || "").toLowerCase()}`}>
                          {order.direction}
                        </span>
                        <span className="order-type-badge">{order.orderType}</span>
                      </div>
                      <div className="order-date">
                        {order.commissionTime ? new Date(order.commissionTime).toLocaleDateString() : ""}
                        <span className="order-time">
                          {order.commissionTime ? new Date(order.commissionTime).toLocaleTimeString() : ""}
                        </span>
                      </div>
                    </div>

                    <div className="order-details">
                      <div className="order-detail">
                        <span className="detail-label">{i18n("pages.trade.orderDetails.status")}</span>
                        <span className={`order-status ${String(order.status).toLowerCase()}`}>{order.status}</span>
                      </div>

                      <div className="order-detail">
                        <span className="detail-label">{i18n("pages.trade.orderDetails.price")}</span>
                        <span className="order-price-value">{formatNumber(order.commissionPrice, 4)} USDT</span>
                      </div>

                      <div className="order-detail">
                        <span className="detail-label">{i18n("pages.trade.orderDetails.amount")}</span>
                        <span className="order-amount-value">{order.orderQuantity} {order?.tradingPair?.split("/")[0]}</span>
                      </div>

                      <div className="order-detail">
                        <span className="detail-label">{i18n("pages.trade.orderDetails.total")}</span>
                        <span className="order-total">{formatNumber(order.entrustedValue)} USDT</span>
                      </div>
                    </div>

                    <div className="order-actions">
                      {String(order.status).toLowerCase() === "pending" ||
                        String(order.status).toLowerCase() === "partially filled" ? (
                        <button className="cancel-order-btn" onClick={() => updateStatus(order.id, order)}>
                          {i18n("pages.trade.cancel")}
                        </button>
                      ) : (
                        <div className="completed-indicator">
                          <i className="fas fa-check-circle" />
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              // Trade mode futures display
              <div className="futures-list">
                {getCurrentData.map((future) => {
                  const statusConfig = getFuturesStatusConfig(future.futuresStatus);
                  const profitLoss = future.profitAndLossAmount ? safeParse(future.profitAndLossAmount) : 0;
                  const isProfit = profitLoss >= 0;

                  return (
                    <div 
                      key={future.id ?? future._id} 
                      className="future-item"
                      onClick={() => handleOpenFutureModal(future)}
                    >
                      <div className="future-header">
                        <div className="future-pair-status">
                          <span className="future-pair">{future.futureCoin || i18n("common.unknown")}</span>
                          <span
                            className="future-status"
                            style={{
                              color: statusConfig.color,
                              backgroundColor: statusConfig.bgColor
                            }}
                          >
                            {statusConfig.text}
                          </span>
                        </div>
                        <div className="future-leverage">
                          {future.leverage}x
                        </div>
                      </div>

                      <div className="future-details">
                        <div className="future-detail-row">
                          <span className="detail-label">{i18n("pages.trade.futuresDetails.amount")}</span>
                          <span className="detail-value">{formatCurrency(future.futuresAmount)}</span>
                        </div>

                        <div className="future-detail-row">
                          <span className="detail-label">{i18n("pages.trade.futuresDetails.duration")}</span>
                          <span className="detail-value">{formatDuration(future.contractDuration)}</span>
                        </div>

                        <div className="future-detail-row">
                          <span className="detail-label">{i18n("pages.trade.futuresDetails.entryPrice")}</span>
                          <span className="detail-value">{formatCurrency(future.openPositionPrice)}</span>
                        </div>

                        {future.closePositionPrice && (
                          <div className="future-detail-row">
                            <span className="detail-label">{i18n("pages.trade.futuresDetails.exitPrice")}</span>
                            <span className="detail-value">{formatCurrency(future.closePositionPrice)}</span>
                          </div>
                        )}

                        {(profitLoss !== 0 || future.profitAndLossAmount) && (
                          <div className="future-detail-row">
                            <span className="detail-label">{i18n("pages.trade.futuresDetails.pnl")}</span>
                            <span className={`detail-value ${isProfit ? 'profit' : 'loss'}`}>
                              {isProfit ? '+' : ''}{formatCurrency(profitLoss)}
                            </span>
                          </div>
                        )}
                      </div>

                      <div className="future-footer">
                        <div className="future-timestamp">
                          <div className="timestamp-label">{i18n("pages.trade.futuresDetails.opened")}</div>
                          <div className="timestamp-value">
                            {future.openPositionTime ? formatTime(future.openPositionTime) : i18n("common.na")}
                          </div>
                        </div>

                        {future.closePositionTime && (
                          <div className="future-timestamp">
                            <div className="timestamp-label">{i18n("pages.trade.futuresDetails.closed")}</div>
                            <div className="timestamp-value">
                              {formatTime(future.closePositionTime)}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Coin Selection Modal */}
      <CoinSelectorSidebar
        isOpen={isCoinModalOpen}
        onClose={() => setIsCoinModalOpen(false)}
        selectedCoin={selectedCoin}
        onCoinSelect={handleSelectCoin}
        title={i18n("pages.trade.coinSelector.title")}
      />

      {/* Future Details Modal - ALWAYS RENDERED, controlled by CSS */}
      <div className={`modal-overlay ${isFutureModalOpen && selectedFuture ? 'active' : ''}`} onClick={handleCloseFutureModal}>
        <div className="future-details-modal" onClick={(e) => e.stopPropagation()}>
          {selectedFuture && (
            <>
              <div className="modal-header">
                <h3 className="modal-title">
                  {selectedFuture.futureCoin || i18n("common.unknown")}
                  <span className="modal-leverage">{selectedFuture.leverage}x</span>
                </h3>
                <button className="modal-close-btn" onClick={handleCloseFutureModal}>
                  <i className="fas fa-times"></i>
                </button>
              </div>

              <div className="modal-body">
                {/* Status & P&L Summary */}
                <div className="modal-summary">
                  <div className="status-badge-large" style={{ 
                    backgroundColor: getFuturesStatusConfig(selectedFuture.futuresStatus).bgColor,
                    color: getFuturesStatusConfig(selectedFuture.futuresStatus).color
                  }}>
                    {getFuturesStatusConfig(selectedFuture.futuresStatus).text}
                  </div>
                  
                  <div className="pnl-summary">
                    <div className="pnl-title">{i18n("pages.trade.futuresDetails.pnl")}</div>
                    <div className={`pnl-amount ${(selectedFuture.profitAndLossAmount ? safeParse(selectedFuture.profitAndLossAmount) : 0) >= 0 ? 'profit' : 'loss'}`}>
                      {(selectedFuture.profitAndLossAmount ? safeParse(selectedFuture.profitAndLossAmount) : 0) >= 0 ? '+' : ''}
                      {formatCurrency(selectedFuture.profitAndLossAmount ? safeParse(selectedFuture.profitAndLossAmount) : 0)}
                    </div>
            
                  </div>
                </div>


                {/* Details Grid */}
                <div className="details-grid">
                  <div className="detail-item">
                    <div className="detail-label">{i18n("pages.trade.futuresDetails.amount")}</div>
                    <div className="detail-value">{formatCurrency(selectedFuture.futuresAmount)}</div>
                  </div>
                  
                  <div className="detail-item">
                    <div className="detail-label">{i18n("pages.trade.futuresDetails.duration")}</div>
                    <div className="detail-value">{formatDuration(selectedFuture.contractDuration)}</div>
                  </div>
                  
                  <div className="detail-item">
                    <div className="detail-label">{i18n("pages.trade.futuresDetails.entryPrice")}</div>
                    <div className="detail-value">{formatCurrency(selectedFuture.openPositionPrice)}</div>
                  </div>
                  
            
                  
                  {selectedFuture.closePositionPrice && (
                    <div className="detail-item">
                      <div className="detail-label">{i18n("pages.trade.futuresDetails.exitPrice")}</div>
                      <div className="detail-value">{formatCurrency(selectedFuture.closePositionPrice)}</div>
                    </div>
                  )}
              
                
                  
                
                </div>

                {/* Timestamps */}
                <div className="timestamps-section">
                  <div className="timestamp-item">
                    <div className="timestamp-label">{i18n("pages.trade.futuresDetails.opened")}</div>
                    <div className="timestamp-value">
                      {selectedFuture.openPositionTime ? (
                        <>
                          {formatDate(selectedFuture.openPositionTime)}
                          <span className="timestamp-time">{formatTime(selectedFuture.openPositionTime)}</span>
                        </>
                      ) : i18n("common.na")}
                    </div>
                  </div>
                  
                  {selectedFuture.closePositionTime && (
                    <div className="timestamp-item">
                      <div className="timestamp-label">{i18n("pages.trade.futuresDetails.closed")}</div>
                      <div className="timestamp-value">
                        {formatDate(selectedFuture.closePositionTime)}
                        <span className="timestamp-time">{formatTime(selectedFuture.closePositionTime)}</span>
                      </div>
                    </div>
                  )}
                  
                  {selectedFuture.contractDuration && !selectedFuture.closePositionTime && (
                    <div className="timestamp-item">
                      <div className="timestamp-label">{i18n("pages.trade.futuresDetails.closed")}</div>
                      <div className="timestamp-value">
                        {(() => {
                          const openTime = new Date(selectedFuture.openPositionTime);
                          const expireTime = new Date(openTime.getTime() + (parseInt(selectedFuture.contractDuration) * 1000));
                          return (
                            <>
                              {formatDate(expireTime.toISOString())}
                              <span className="timestamp-time">{formatTime(expireTime.toISOString())}</span>
                            </>
                          );
                        })()}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      <style>{`
        /* Container */
        .container {
          background-color: rgb(16, 108, 245);
          color: #FFFFFF;
          min-height: 100vh;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif;
          max-width: 400px;
          margin: 0 auto;
          overflow-x: hidden;
        }
        
        /* Trade Header */
        .trade-header {
          padding: 15px 20px;
          color: #fff;
          top: 0;
          z-index: 100;
        }

        .nav-bar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 10px;
        }

        .back-arrow {
          font-size: 18px;
          font-weight: 300;
          cursor: pointer;
          display: flex;
          align-items: center;
          display: flex;
          flex-direction: column;
        }

        .trading-pair {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 16px;
          cursor: pointer;
          transition: all 0.2s ease;
          font-weight: 600;
        }

        .trading-pair:hover {
          opacity: 0.8;
        }

        select option {
          color: #000;
        }

        .dropdown-arrow {
          font-size: 12px;
          transition: transform 0.3s ease;
          color: #fff;
        }

        .header-right {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .trade-type-select {
          font-size: 10px;
          padding: 5px;
          background: rgba(255, 255, 255, 0.2);
          color: #fff;
          border: 1px solid rgba(255,255,255,0.3);
          border-radius: 4px;
        }

        .chart-icon {
          color: #fff;
          font-size: 16px;
          text-decoration: none;
          transition: opacity 0.2s ease;
        }

        .chart-icon:hover {
          opacity: 0.8;
        }

        /* Main Content */
        .main-content {
          background: white;
          border-radius: 40px 40px 0 0;
          padding: 20px 16px 100px;
          min-height: calc(100vh - 120px);
        }

        /* Trading Layout */
        .trading-layout {
          display: flex;
          gap: 12px;
          margin-bottom: 20px;
          align-items: stretch;
        }

        /* Trade Form - 50% width */
        .trade-form {
          display: flex;
          width: 50%;
          flex-direction: column;
        }

        /* Order Book */
        .order-book {
          flex: 1;
          display: flex;
          flex-direction: column;
          position: relative;
        }

        /* Percentage Progress Bar - Modern Design */
        .percentage-progress-bar {
          margin-top: 12px;
          width: 100%;
        }

        .progress-bar-labels {
          display: flex;
          justify-content: space-between;
          margin-bottom: 6px;
          font-size: 10px;
          color: #6c757d;
          font-weight: 500;
        }

        .progress-label {
          position: relative;
          text-align: center;
          width: 20%;
          cursor: pointer;
          transition: color 0.2s ease;
        }

        .progress-label:hover {
          color: #106cf5;
        }

        .progress-bar-track {
          position: relative;
          width: 100%;
          height: 4px;
          background-color: #e9ecef;
          border-radius: 2px;
          box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.05);
        }

        .progress-bar-fill {
          position: absolute;
          height: 100%;
          background-color: #106cf5;
          border-radius: 2px;
          transition: width 0.3s ease;
          box-shadow: 0 1px 2px rgba(16, 108, 245, 0.2);
        }

        .progress-bar-markers {
          position: absolute;
          top: -4px;
          left: 0;
          right: 0;
          display: flex;
          justify-content: space-between;
          pointer-events: none;
        }

        .progress-marker {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background-color: #ffffff;
          border: 2px solid #e9ecef;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
          pointer-events: auto;
        }

        .progress-marker:hover {
          transform: scale(1.2);
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.15);
        }

        .progress-marker.active {
          background-color: #106cf5;
          border-color: #106cf5;
          box-shadow: 0 0 0 3px rgba(16, 108, 245, 0.2);
        }

        /* Orders Tabs */
        .orders-tabs {
          margin-top: 20px;
        }

        .orders-tabs-header {
          display: flex;
          gap: 16px;
          margin-bottom: 16px;
          border-bottom: 1px solid #eef2f6;
          padding-bottom: 8px;
        }

        .orders-tab {
          font-size: 12px;
          cursor: pointer;
          color: #888f99;
          transition: color 0.2s ease;
          padding: 4px 0;
        }

        .orders-tab.active {
          color: #000;
          font-weight: 500;
        }

        .orders-tab-content {
          min-height: 200px;
        }

        .loading-skeleton {
          padding: 10px 0;
        }

        .skeleton-item {
          height: 60px;
          background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
          background-size: 200% 100%;
          animation: loading 1.5s infinite;
          border-radius: 8px;
          margin-bottom: 10px;
        }

        @keyframes loading {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }

        /* Buy/Sell Tabs */
        .buy-sell-tabs {
          display: flex;
          margin-bottom: 16px;
          background-color: #f8f9fa;
          border-radius: 4px;
          overflow: hidden;
        }

        .buy-tab,
        .sell-tab {
          flex: 1;
          text-align: center;
          padding: 8px;
          cursor: pointer;
          font-size: 12px;
          transition: all 0.2s ease;
        }

        .buy-tab {
          background-color: #f8f9fa;
          color: #6c757d;
        }

        .buy-tab.active {
          background-color: #37b66a;
          color: #ffffff;
        }

        .sell-tab {
          background-color: #f8f9fa;
          color: #6c757d;
        }

        .sell-tab.active {
          background-color: #f56c6c;
          color: #ffffff;
        }

        /* Order Type */
        .order-type {
          margin-bottom: 16px;
        }

        .order-type-label {
          font-size: 12px;
          color: #6c757d;
          margin-bottom: 6px;
          font-weight: 500;
        }

        .order-type-select {
          width: 100%;
          background-color: #ffffff;
          color: #333333;
          border: 1px solid #e2e8f0;
          border-radius: 8px;
          padding: 8px;
          font-size: 12px;
        }

        /* Input Fields */
        .input-group {
          margin-bottom: 16px;
        }

        .input-label {
          display: block;
          font-size: 12px;
          color: #6c757d;
          margin-bottom: 6px;
          font-weight: 500;
        }

        .input-with-buttons {
          display: flex;
          align-items: center;
          background-color: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 8px;
          padding: 4px;
        }

        .value-input {
          flex: 1;
          background: transparent;
          border: none;
          color: #333333;
          font-size: 12px;
          padding: 8px;
          outline: none;
        }

        .balance-info {
          font-size: 13px;
          color: #6c757d;
          margin-bottom: 16px;
          text-align: center;
          padding: 8px;
          background-color: #f8fbff;
          border-radius: 6px;
        }

        /* Action Button */
        .action-button {
          width: 100%;
          padding: 8px;
          border: none;
          border-radius: 8px;
          font-size: 12px;
          font-weight: 500;
          cursor: pointer;
          margin-top: auto;
        }

        .buy-button {
          background-color: #37b66a;
          color: white;
        }

        .sell-button {
          background-color: #f56c6c;
          color: white;
        }

        .action-button:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        /* Order Book */
        .order-book-header {
          display: flex;
          justify-content: space-between;
          margin-bottom: 10px;
          font-size: 12px;
          color: #6c757d;
          padding: 0 8px;
          font-weight: 500;
        }

        .order-book-row {
          display: flex;
          justify-content: space-between;
          padding: 6px 8px;
          font-size: 12px;
          cursor: pointer;
          transition: background-color 0.2s;
          position: relative;
          z-index: 1;
          border-radius: 4px;
        }

        .depth-bar {
          position: absolute;
          top: 0;
          height: 100%;
          opacity: 0.1;
          z-index: -1;
          transition: width 0.3s ease;
        }

        .ask-depth {
          right: 0;
          background-color: #f56c6c;
        }

        .bid-depth {
          left: 0;
          background-color: #37b66a;
        }

        .order-book-row:hover {
          background-color: #f8fbff;
        }

        .order-price {
          flex: 1;
          font-weight: 500;
        }

        .order-amount {
          flex: 1;
          text-align: right;
          color: #6c757d;
        }

        .ask-row .order-price {
          color: #f56c6c;
        }

        .bid-row .order-price {
          color: #37b66a;
        }

        .current-price-row {
          display: flex;
          justify-content: center;
          margin: 8px 0;
          padding: 8px 0;
          border-top: 1px solid #eef2f6;
          border-bottom: 1px solid #eef2f6;
        }

        .current-price {
          font-weight: 600;
          color: #106cf5;
          font-size: 12px;
        }

        /* Future Item Styles (clickable) */
        .future-item {
          background-color: #f8fbff;
          border-radius: 8px;
          padding: 12px;
          margin-bottom: 10px;
          cursor: pointer;
          transition: all 0.2s ease;
          border: 1px solid transparent;
        }

        .future-item:hover {
          background-color: #eef7ff;
          border-color: #106cf5;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(16, 108, 245, 0.1);
        }

        /* Transaction Item Styles */
        .transactions-list {
          padding: 0 4px;
        }

        .transaction-item {
          display: flex;
          align-items: center;
          padding: 12px 0;
          border-bottom: 1px solid #f0f0f0;
        }

        .transaction-item:last-child {
          border-bottom: none;
        }

        .transaction-icon {
          width: 36px;
          height: 36px;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-right: 12px;
          flex-shrink: 0;
        }

        .transaction-icon i {
          color: white;
          font-size: 14px;
        }

        .transaction-details {
          flex: 1;
          min-width: 0;
        }

        .transaction-main {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 4px;
        }

        .transaction-type {
          font-size: 12px;
          font-weight: 500;
          color: #1a1a1a;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          margin-right: 8px;
        }

        .transaction-amount {
          font-size: 12px;
          font-weight: 600;
          white-space: nowrap;
        }

        .transaction-secondary {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .transaction-status {
          font-size: 10px;
        }

        .status-badge {
          padding: 2px 6px;
          border-radius: 10px;
          font-weight: 500;
          text-transform: capitalize;
        }

        .status-completed,
        .status-success {
          background-color: rgba(55, 182, 106, 0.1);
          color: #37b66a;
        }

        .status-pending {
          background-color: rgba(16, 108, 245, 0.1);
          color: #106cf5;
        }

        .status-failed,
        .status-cancelled {
          background-color: rgba(245, 108, 108, 0.1);
          color: #f56c6c;
        }

        .transaction-date {
          font-size: 10px;
          color: #8c98a4;
        }

        /* Order Item Styles */
        .orders-list {
          padding: 0 4px;
          color:#000;
        }

        .order-item {
          background-color: #f8fbff;
          border-radius: 8px;
          padding: 12px;
          margin-bottom: 10px;
        }

        .order-main-info {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 10px;
        }

        .order-pair-action {
          display: flex;
          align-items: center;
          gap: 8px;
          color:#000
        }

        .order-pair {
          font-weight: 600;
          font-size: 12px;
        }

        .order-action {
          font-size: 11px;
          padding: 3px 6px;
          border-radius: 3px;
          font-weight: 600;
        }

        .order-action.buy {
          background-color: rgba(55, 182, 106, 0.1);
          color: #37b66a;
        }

        .order-action.sell {
          background-color: rgba(245, 108, 108, 0.1);
          color: #f56c6c;
        }

        .order-type-badge {
          font-size: 10px;
          color: #6c757d;
          background-color: #e9ecef;
          padding: 2px 5px;
          border-radius: 3px;
        }

        .order-date {
          font-size: 11px;
          color: #6c757d;
        }

        .order-time {
          color: #8c98a4;
        }

        .order-details {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 8px;
          margin-bottom: 12px;
        }

        .order-detail {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .detail-label {
          font-size: 11px;
          color: #6c757d;
        }

        .order-status {
          font-size: 11px;
          font-weight: 600;
        }

        .order-status.completed {
          color: #37b66a;
        }

        .order-status.cancelled {
          color: #f56c6c;
        }

        .order-status.pending {
          color: #106cf5;
        }

        .order-price-value, .order-amount-value, .order-total {
          font-size: 11px;
          font-weight: 600;
        }

        .order-actions {
          display: flex;
          justify-content: flex-end;
        }

        .cancel-order-btn {
          background-color: #f56c6c;
          color: white;
          border: none;
          padding: 6px 12px;
          border-radius: 4px;
          font-size: 11px;
          cursor: pointer;
        }

        .completed-indicator {
          color: #37b66a;
          font-size: 12px;
        }

        /* Future Item Styles */
        .futures-list {
          padding: 0 4px;
        }

        .future-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 12px;
        }

        .future-pair-status {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .future-pair {
          font-weight: 600;
          font-size: 12px;
          color:#000;
        }

        .future-status {
          font-size: 11px;
          padding: 3px 8px;
          border-radius: 12px;
          font-weight: 600;
        }

        .future-leverage {
          font-size: 11px;
          font-weight: 600;
          color: #106cf5;
          background-color: rgba(16, 108, 245, 0.1);
          padding: 3px 8px;
          border-radius: 12px;
        }

        .future-details {
          margin-bottom: 12px;
        }

        .future-detail-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 6px;
        }

        .detail-label {
          font-size: 11px;
          color: #6c757d;
        }

        .detail-value {
          font-size: 11px;
          font-weight: 600;
          color: #1a1a1a;
        }

        .detail-value.profit {
          color: #37b66a;
        }

        .detail-value.loss {
          color: #f56c6c;
        }

        .future-footer {
          display: flex;
          justify-content: space-between;
          padding-top: 8px;
          border-top: 1px solid #eef2f6;
        }

        .future-timestamp {
          text-align: center;
        }

        .timestamp-label {
          font-size: 10px;
          color: #6c98a4;
          margin-bottom: 2px;
        }

        .timestamp-value {
          font-size: 10px;
          font-weight: 600;
          color: #1a1a1a;
        }

        /* Empty State */
        .empty-orders {
          text-align: center;
          padding: 30px 0;
        }

        .empty-icon {
          font-size: 32px;
          color: #e9ecef;
          margin-bottom: 10px;
        }

        .empty-text {
          color: #6c757d;
          font-size: 12px;
          margin-bottom: 5px;
        }

        .empty-subtext {
          color: #8c98a4;
          font-size: 12px;
        }

        /* Error Message */
        .error-message {
          background-color: #fef2f2;
          color: #dc2626;
          padding: 10px;
          border-radius: 6px;
          margin-bottom: 12px;
          font-size: 13px;
          border: 1px solid #fecaca;
        }

        /* Future Details Modal Styles - FIXED FOR NO FLICKERING */
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: rgba(0, 0, 0, 0);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: -1;
          padding: 20px;
          opacity: 0;
          visibility: hidden;
          transition: all 0.3s ease;
          pointer-events: none;
        }

        .modal-overlay.active {
          opacity: 1;
          visibility: visible;
          z-index: 1000;
          background-color: rgba(0, 0, 0, 0.5);
          pointer-events: auto;
        }

        .future-details-modal {
          background-color: white;
          border-radius: 16px;
          width: 100%;
          max-width: 380px;
          max-height: 85vh;
          overflow-y: auto;
          transform: translateY(20px);
          opacity: 0;
          transition: all 0.3s ease;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0);
        }

        .modal-overlay.active .future-details-modal {
          transform: translateY(0);
          opacity: 1;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
        }

        .modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 20px;
          border-bottom: 1px solid #eef2f6;
          position: sticky;
          top: 0;
          background-color: white;
          border-radius: 16px 16px 0 0;
          z-index: 10;
        }

        .modal-title {
          font-size: 18px;
          font-weight: 600;
          color: #1a1a1a;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .modal-leverage {
          font-size: 14px;
          color: #106cf5;
          background-color: rgba(16, 108, 245, 0.1);
          padding: 2px 8px;
          border-radius: 12px;
          font-weight: 600;
        }

        .modal-close-btn {
          background: none;
          border: none;
          font-size: 18px;
          color: #6c757d;
          cursor: pointer;
          width: 32px;
          height: 32px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          transition: all 0.2s ease;
        }

        .modal-close-btn:hover {
          background-color: #f8f9fa;
          color: #1a1a1a;
        }

        .modal-body {
          padding: 20px;
        }

        .modal-summary {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 24px;
          padding-bottom: 20px;
          border-bottom: 1px solid #eef2f6;
        }

        .status-badge-large {
          padding: 8px 16px;
          border-radius: 20px;
          font-size: 14px;
          font-weight: 600;
          display: inline-block;
        }

        .pnl-summary {
          text-align: right;
        }

        .pnl-title {
          font-size: 12px;
          color: #6c757d;
          margin-bottom: 4px;
        }

        .pnl-amount {
          font-size: 24px;
          font-weight: 700;
          margin-bottom: 4px;
        }

        .pnl-amount.profit {
          color: #37b66a;
        }

        .pnl-amount.loss {
          color: #f56c6c;
        }

        .pnl-subtitle {
          font-size: 11px;
          color: #8c98a4;
        }

        .estimated-pnl {
          background-color: #f8fbff;
          border-radius: 12px;
          padding: 16px;
          margin-bottom: 24px;
          text-align: center;
        }

        .estimated-pnl-title {
          font-size: 12px;
          color: #6c757d;
          margin-bottom: 8px;
        }

        .estimated-pnl-amount {
          font-size: 20px;
          font-weight: 700;
          margin-bottom: 8px;
        }

        .estimated-pnl-amount.profit {
          color: #37b66a;
        }

        .estimated-pnl-amount.loss {
          color: #f56c6c;
        }

        .price-difference {
          font-size: 14px;
          font-weight: 600;
          color: #1a1a1a;
        }

        .details-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 16px;
          margin-bottom: 24px;
        }

        .detail-item {
          display: flex;
          flex-direction: column;
        }

        .detail-label {
          font-size: 11px;
          color: #6c757d;
          margin-bottom: 4px;
        }

        .detail-value {
          font-size: 14px;
          font-weight: 600;
          color: #1a1a1a;
        }

        .direction-badge {
          font-size: 12px;
          padding: 4px 8px;
          border-radius: 6px;
          font-weight: 600;
        }

        .direction-badge.long {
          background-color: rgba(55, 182, 106, 0.1);
          color: #37b66a;
        }

        .direction-badge.short {
          background-color: rgba(245, 108, 108, 0.1);
          color: #f56c6c;
        }

        .timestamps-section {
          background-color: #f8f9fa;
          border-radius: 12px;
          padding: 16px;
          margin-bottom: 24px;
        }

        .timestamp-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 12px;
        }

        .timestamp-item:last-child {
          margin-bottom: 0;
        }

        .timestamp-label {
          font-size: 12px;
          color: #6c757d;
        }

        .timestamp-value {
          font-size: 12px;
          font-weight: 600;
          color: #1a1a1a;
          text-align: right;
        }

        .timestamp-time {
          display: block;
          font-size: 11px;
          color: #8c98a4;
          margin-top: 2px;
        }

        /* Responsive */
        @media (max-width: 380px) {
          .container {
            padding: 0;
          }

          .trade-header,
          .main-content {
            padding-left: 16px;
            padding-right: 16px;
          }

          .trading-layout {
            gap: 10px;
          }
          
          .trade-form {
            width: 48%;
          }

          .modal-overlay {
            padding: 16px;
          }

          .future-details-modal {
            max-width: 100%;
            margin: 0;
          }

          .modal-header {
            padding: 16px;
          }

          .modal-body {
            padding: 16px;
          }

          .details-grid {
            gap: 12px;
          }
        }
      `}</style>
    </div>
  );
}

export default Trade;