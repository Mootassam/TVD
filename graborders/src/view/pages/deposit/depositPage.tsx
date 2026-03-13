import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import method from 'src/modules/depositMethod/list/depositMethodListActions';
import selectors from 'src/modules/depositMethod/list/depositMethodSelectors';
import { useDispatch, useSelector } from "react-redux";

function DepositPage() {
    const dispatch = useDispatch();
    const listMethod = useSelector(selectors.selectRows);
    const loading = useSelector(selectors.selectLoading);

    useEffect(() => {
        dispatch(method.doFetch());
    }, [dispatch]);

    return (
        <div className="deposit-container">
            {/* Header Section - Matching Profile/Wallet */}
            <div className="header">
                <div className="nav-bar">
                    <Link to="/wallets" className="back-arrow">
                        <i className="fas fa-arrow-left" />
                    </Link>
                    <div className="page-title">Deposit</div>
                    <Link className="header-icon" to="/history" style={{ color: 'white' }}>
                        <i className="fas fa-receipt" />
                    </Link>
                </div>
            </div>

            {/* Content Card - Matching Profile/Wallet */}
            <div className="content-card">
                <div className="deposit-content">
                    {/* Section Title */}
                    <div className="section-title">Select the currency you want to recharge</div>

                    {/* Cryptocurrency Grid */}
                    <div className="crypto-grid">
                        {listMethod?.map((crypto) => (
                            <Link
                                key={crypto.symbol}
                                to={`/deposit/wallet/${crypto.symbol}`}
                                className="crypto-item"
                            >
                                <div className="crypto-icon">
                                    <img
                                        src={`https://images.weserv.nl/?url=https://bin.bnbstatic.com/static/assets/logos/${crypto.symbol}.png`}
                                        alt={crypto.symbol}
                                        onError={(e) => {
                                            const img = e.currentTarget;
                                            img.onerror = null;
                                            img.style.display = 'none';
                                            if (img.parentElement) img.parentElement.innerHTML = crypto.symbol;
                                        }}
                                    />
                                </div>
                                <div className="crypto-name">{crypto.symbol}</div>
                            </Link>
                        ))}
                    </div>

                    {/* OTC Section */}
                    <div className="otc-section">
                        <div className="section-title">To recharge using a bank account, please contact customer support.</div>
                        <Link to="/online-service" className="otc-item">
                            <div className="otc-icon">
                                <i className="fas fa-headset" />
                            </div>
                            <div className="otc-name">Online Customer Support</div>
                            <i className="fas fa-chevron-right otc-arrow" />
                        </Link>
                    </div>
                </div>
            </div>

            <style>{`
                /* Deposit Container – matches profile container */
                .deposit-container {
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
                    gap: 16px;
                }
                .back-arrow {
                    color: #ffffff;
                    font-size: 20px;
                    text-decoration: none;
                }
                .back-arrow:hover {
                    color: #39FF14;
                }
                .page-title {
                    font-size: 18px;
                    font-weight: 500;
                    color: #ffffff;
                    flex: 1;
                }
                .header-icon {
                    font-size: 20px;
                    text-decoration: none;
                    transition: color 0.2s;
                }
                .header-icon:hover {
                    color: #39FF14 !important;
                }

                /* Content Card */
                .content-card {
                    flex: 1;
                    background-color: #1c1c1c;
                    border-top-left-radius: 24px;
                    border-top-right-radius: 24px;
                    padding: 24px 20px;
                    border-top: 2px solid #39FF14;
                }

                /* Deposit Content */
                .deposit-content {
                    display: flex;
                    flex-direction: column;
                    gap: 24px;
                }

                /* Section Title */
                .section-title {
                    font-size: 16px;
                    font-weight: 500;
                    color: #ffffff;
                    margin-bottom: 12px;
                }

                /* Crypto Grid */
                .crypto-grid {
                    display: grid;
                    grid-template-columns: repeat(3, 1fr);
                    gap: 12px;
                }
                .crypto-item {
                    background-color: #2a2a2a;
                    border-radius: 8px;
                    padding: 12px 8px;
                    text-decoration: none;
                    color: #ffffff;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 8px;
                    transition: all 0.2s;
                    border: 1px solid #3a3a3a;
                }
                .crypto-item:hover {
                    background-color: #39FF14;
                    color: #000000;
                    border-color: #39FF14;
                }
                .crypto-icon {
                    width: 40px;
                    height: 40px;
                    border-radius: 50%;
                    background-color: #1c1c1c;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 14px;
                    font-weight: bold;
                    color: #39FF14;
                    overflow: hidden;
                }
                .crypto-icon img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                }
                .crypto-name {
                    font-size: 14px;
                    font-weight: 500;
                    text-align: center;
                }

                /* OTC Section */
                .otc-section {
                    margin-top: 8px;
                }
                .otc-item {
                    background-color: #2a2a2a;
                    border-radius: 8px;
                    padding: 12px 16px;
                    text-decoration: none;
                    color: #ffffff;
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    border: 1px solid #3a3a3a;
                    transition: all 0.2s;
                }
                .otc-item:hover {
                    background-color: #39FF14;
                    color: #000000;
                    border-color: #39FF14;
                }
                .otc-icon {
                    width: 40px;
                    height: 40px;
                    border-radius: 50%;
                    background-color: #1c1c1c;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 20px;
                    color: #39FF14;
                }
                .otc-item:hover .otc-icon {
                    color: #000000;
                }
                .otc-name {
                    flex: 1;
                    font-size: 16px;
                    font-weight: 500;
                }
                .otc-arrow {
                    color: #39FF14;
                    font-size: 14px;
                }
                .otc-item:hover .otc-arrow {
                    color: #000000;
                }

                /* Loading / placeholder (optional) – not used but could be added */
                @media (max-width: 360px) {
                    .crypto-grid {
                        gap: 8px;
                    }
                    .crypto-item {
                        padding: 8px 4px;
                    }
                    .crypto-name {
                        font-size: 12px;
                    }
                }

                /* Remove blue highlight on tap for mobile */
                .back-arrow, .header-icon, .crypto-item, .otc-item {
                    -webkit-tap-highlight-color: transparent;
                }
            `}</style>
        </div>
    );
}

export default DepositPage;