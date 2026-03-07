import React, { useState, useMemo, useRef, useEffect } from 'react';

// Coin list interface
export const defaultCoins = [
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

const CoinSelectorSidebar = ({
    isOpen,
    onClose,
    selectedCoin,
    onCoinSelect,
    availableCoins = defaultCoins,
    title = "Select Trading Pair"
}) => {
    const [searchTerm, setSearchTerm] = useState("");
    const sidebarRef = useRef<HTMLDivElement | null>(null);

    // Filter coins based on search
    const filteredCoins = useMemo(() => {
        return availableCoins.filter(coin =>
            coin.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            coin.symbol.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [searchTerm, availableCoins]);

    // Click outside handler
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target;
            if (sidebarRef.current && target instanceof Node && !sidebarRef.current.contains(target)) {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
            setSearchTerm("");
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen, onClose]);

    // Handle coin selection
    const handleCoinSelect = (coinSymbol) => {
        if (coinSymbol === selectedCoin) {
            onClose();
            return;
        }
        onCoinSelect(coinSymbol);
    };

    // Handle escape key
    useEffect(() => {
        const handleEscapeKey = (event) => {
            if (event.key === 'Escape' && isOpen) {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener('keydown', handleEscapeKey);
        }

        return () => {
            document.removeEventListener('keydown', handleEscapeKey);
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return (
        <>
            <div className="sidebar-overlay"></div>
            <div className="coin-selector-sidebar" ref={sidebarRef}>
                <div className="sidebar-header">
                    <div className="sidebar-title">{title}</div>
                    <div className="close-sidebar" onClick={onClose}>
                        <i className="fas fa-times"></i>
                    </div>
                </div>

                <div className="search-container">
                    <i className="fas fa-search search-icon"></i>
                    <input
                        type="text"
                        placeholder="Search coins..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="search-input"
                        autoFocus
                    />
                    {searchTerm && (
                        <button
                            className="clear-search"
                            onClick={() => setSearchTerm("")}
                        >
                            <i className="fas fa-times"></i>
                        </button>
                    )}
                </div>

                <div className="coins-list">
                    {filteredCoins.map((coin) => (
                        <div
                            key={coin.symbol}
                            className={`coin-item ${selectedCoin === coin.symbol ? 'selected' : ''}`}
                            onClick={() => handleCoinSelect(coin.symbol)}
                        >
                            <div className="coin-name">{coin.name}</div>
                            <div className="coin-symbol">{coin.symbol}</div>
                        </div>
                    ))}

                    {filteredCoins.length === 0 && (
                        <div className="no-results">
                            <i className="fas fa-search"></i>
                            <div>No coins found</div>
                            <div className="no-results-sub">Try different search terms</div>
                        </div>
                    )}
                </div>

                <style>{`
          .sidebar-overlay {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.5);
            z-index: 1000;
            animation: fadeIn 0.2s ease;
          }

          .coin-selector-sidebar {
            position: fixed;
            top: 0;
            left: 0;
            width: 90%;
            max-width: 250px;
            height: 100%;
            background: white;
            z-index: 1001;
            display: flex;
            flex-direction: column;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
            animation: slideFromLeft 0.2s ease;
            overflow: hidden;
          }

          .sidebar-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 20px;
            border-bottom: 1px solid #eef2f6;
            background: white;
          }

          .sidebar-title {
            font-size: 18px;
            font-weight: 600;
            color: #1a1a1a;
          }

          .close-sidebar {
            width: 32px;
            height: 32px;
            border-radius: 50%;
            background: #f8f9fa;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            transition: all 0.2s ease;
            color: #6c757d;
          }

          .close-sidebar:hover {
            background: #e9ecef;
          }

          .search-container {
            position: relative;
            padding: 16px 20px;
            border-bottom: 1px solid #eef2f6;
          }

          .search-icon {
            position: absolute;
            left: 36px;
            top: 50%;
            transform: translateY(-50%);
            color: #6c757d;
            font-size: 14px;
          }

          .search-input {
            width: 100%;
            padding: 12px 40px 12px 40px;
            border: 1px solid #e2e8f0;
            border-radius: 12px;
            font-size: 14px;
            background: #f8f9fa;
            transition: all 0.2s ease;
          }

          .search-input:focus {
            outline: none;
            border-color: #106cf5;
            background: white;
            box-shadow: 0 0 0 3px rgba(16, 108, 245, 0.1);
          }

          .clear-search {
            position: absolute;
            right: 36px;
            top: 50%;
            transform: translateY(-50%);
            background: none;
            border: none;
            color: #6c757d;
            cursor: pointer;
            padding: 4px;
            border-radius: 4px;
            transition: all 0.2s ease;
          }

          .clear-search:hover {
            background: #e9ecef;
          }

          .coins-list {
            flex: 1;
            overflow-y: auto;
            padding: 8px 0;
          }

          .coin-item {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 16px 20px;
            cursor: pointer;
            transition: all 0.2s ease;
            border-bottom: 1px solid #f8f9fa;
          }

          .coin-item:hover {
            background: #f8fbff;
          }

          .coin-item.selected {
            background: #106cf5;
            color: white;
          }

          .coin-item.selected .coin-symbol {
            color: rgba(255, 255, 255, 0.8);
          }

          .coin-name {
            font-size: 14px;
            font-weight: 500;

            color:#000
          }

          .coin-symbol {
            font-size: 12px;
            color: #6c757d;
          }

          .no-results {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            padding: 60px 20px;
            color: #6c757d;
            text-align: center;
          }

          .no-results i {
            font-size: 48px;
            margin-bottom: 16px;
            opacity: 0.5;
          }

          .no-results-sub {
            font-size: 12px;
            margin-top: 8px;
            opacity: 0.7;
          }

          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }

          @keyframes slideFromLeft {
            from {
              transform: translateX(-100%);
            }
            to {
              transform: translateX(0);
            }
          }

          @media (max-width: 380px) {
            .coin-selector-sidebar {
              width: 85%;
            }
          }
        `}</style>
            </div>
        </>
    );
};

export default CoinSelectorSidebar;