import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export class Error500Page extends Component {
    render() {
        return (
            <div className="error-container">
                {/* Header Section - Matching HelpCenter */}
                <div className="header">
                    <div className="nav-bar">
                        <div className="page-title">Server Error</div>
                    </div>
                </div>

                {/* Content Card - Matching HelpCenter */}
                <div className="content-card">
                    <div className="error-content">
                        {/* Crypto Animation */}
                        <div className="crypto-animation">
                            <div className="bitcoin">
                                <i className="fab fa-btc" />
                            </div>
                            <div className="eth">
                                <i className="fab fa-ethereum" />
                            </div>
                            <div className="bnb">
                                <i className="fas fa-coins" />
                            </div>
                        </div>

                        {/* Error Code */}
                        <div className="error-code">500</div>
                        
                        {/* Error Title */}
                        <div className="error-title">Internal Server Error</div>
                        
                        {/* Error Message */}
                        <div className="error-message">
                            Oops! Something went wrong on our end. Our team has been notified and is
                            working to fix the issue.
                        </div>

                        {/* Back to Home Button */}
                        <Link to="/">
                            <button className="home-button">
                                <i className="fas fa-home home-icon" />
                                Back to Home
                            </button>
                        </Link>
                    </div>
                </div>

                <style>{`
                    * {
                        margin: 0;
                        padding: 0;
                        box-sizing: border-box;
                        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
                    }

                    body {
                        background-color: #f5f7fa;
                        color: #333;
                        line-height: 1.6;
                        overflow-x: hidden;
                    }

                    .error-container {
                        max-width: 400px;
                        margin: 0 auto;
                        position: relative;
                        min-height: 100vh;
                        background: linear-gradient(135deg, #106cf5 0%, #0a4fc4 100%);
                    }

                    /* Header Section - Matching HelpCenter */
                    .header {
                        background: linear-gradient(135deg, #106cf5 0%, #0a4fc4 100%);
                        min-height: 60px;
                        position: relative;
                        padding: 20px;
                    }

                    .nav-bar {
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                    }

                    .page-title {
                        color: white;
                        font-size: 17px;
                        font-weight: 600;
                        position: absolute;
                        left: 50%;
                        transform: translateX(-50%);
                    }

                    /* Content Card - Matching HelpCenter */
                    .content-card {
                        background: white;
                        border-radius: 40px 40px 0 0;
                        padding: 40px 20px;
                        box-shadow: 0 -5px 20px rgba(0, 0, 0, 0.05);
                        min-height: calc(100vh - 60px);
                        display: flex;
                        align-items: center;
                        justify-content: center;
                    }

                    .error-content {
                        text-align: center;
                        width: 100%;
                        max-width: 320px;
                    }

                    /* Crypto Animation */
                    .crypto-animation {
                        position: relative;
                        height: 150px;
                        margin-bottom: 30px;
                    }

                    .bitcoin, .eth, .bnb {
                        position: absolute;
                        width: 60px;
                        height: 60px;
                        border-radius: 50%;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        font-size: 30px;
                        box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
                        color: white;
                    }

                    .bitcoin {
                        background: linear-gradient(135deg, #F7931A 0%, #F15A24 100%);
                        top: 20px;
                        left: 50px;
                        animation: floatBitcoin 5s ease-in-out infinite;
                        z-index: 3;
                    }

                    .eth {
                        background: linear-gradient(135deg, #627EEA 0%, #8A63D2 100%);
                        top: 50px;
                        right: 50px;
                        animation: floatEth 5s ease-in-out infinite 0.5s;
                        z-index: 2;
                    }

                    .bnb {
                        background: linear-gradient(135deg, #F0B90B 0%, #FF9900 100%);
                        bottom: 20px;
                        left: 50%;
                        transform: translateX(-50%);
                        animation: floatBnb 5s ease-in-out infinite 1s;
                        z-index: 1;
                    }

                    /* Error Code */
                    .error-code {
                        font-size: 72px;
                        font-weight: 800;
                        color: #106cf5;
                        margin-bottom: 10px;
                        text-shadow: 0 4px 10px rgba(16, 108, 245, 0.2);
                        line-height: 1;
                    }

                    /* Error Title */
                    .error-title {
                        font-size: 24px;
                        font-weight: 700;
                        color: #222;
                        margin-bottom: 16px;
                    }

                    /* Error Message */
                    .error-message {
                        font-size: 15px;
                        color: #666;
                        line-height: 1.5;
                        margin-bottom: 40px;
                        padding: 0 10px;
                    }

                    /* Home Button */
                    .home-button {
                        background: linear-gradient(135deg, #106cf5 0%, #0a4fc4 100%);
                        color: white;
                        border: none;
                        border-radius: 12px;
                        padding: 16px 32px;
                        font-size: 16px;
                        font-weight: 600;
                        cursor: pointer;
                        transition: all 0.3s ease;
                        box-shadow: 0 6px 15px rgba(16, 108, 245, 0.3);
                        display: inline-flex;
                        align-items: center;
                        justify-content: center;
                        gap: 10px;
                        min-width: 200px;
                    }

                    .home-button:hover {
                        transform: translateY(-3px);
                        box-shadow: 0 10px 25px rgba(16, 108, 245, 0.4);
                    }

                    .home-button:active {
                        transform: translateY(-1px);
                    }

                    .home-icon {
                        font-size: 18px;
                    }

                    /* Animations */
                    @keyframes floatBitcoin {
                        0% {
                            transform: translateY(0) rotate(0deg);
                        }
                        50% {
                            transform: translateY(-20px) rotate(10deg);
                        }
                        100% {
                            transform: translateY(0) rotate(0deg);
                        }
                    }

                    @keyframes floatEth {
                        0% {
                            transform: translateY(0) rotate(0deg);
                        }
                        50% {
                            transform: translateY(-15px) rotate(-10deg);
                        }
                        100% {
                            transform: translateY(0) rotate(0deg);
                        }
                    }

                    @keyframes floatBnb {
                        0% {
                            transform: translateX(-50%) translateY(0);
                        }
                        50% {
                            transform: translateX(-50%) translateY(-10px);
                        }
                        100% {
                            transform: translateX(-50%) translateY(0);
                        }
                    }

                    /* Responsive adjustments */
                    @media (max-width: 380px) {
                        .error-container {
                            padding: 0;
                        }

                        .header {
                            padding: 16px;
                            min-height: 50px;
                        }

                        .content-card {
                            padding: 30px 16px;
                            border-radius: 30px 30px 0 0;
                        }

                        .crypto-animation {
                            height: 120px;
                            margin-bottom: 25px;
                        }

                        .bitcoin, .eth, .bnb {
                            width: 50px;
                            height: 50px;
                            font-size: 24px;
                        }

                        .bitcoin {
                            left: 30px;
                        }

                        .eth {
                            right: 30px;
                        }

                        .error-code {
                            font-size: 60px;
                        }

                        .error-title {
                            font-size: 20px;
                        }

                        .error-message {
                            font-size: 14px;
                            padding: 0 5px;
                        }

                        .home-button {
                            padding: 14px 24px;
                            font-size: 15px;
                            min-width: 180px;
                        }
                    }

                    @media (min-width: 768px) {
                        .content-card {
                            border-radius: 30px 30px 0 0;
                        }

                        .error-content {
                            max-width: 400px;
                        }

                        .crypto-animation {
                            height: 180px;
                        }

                        .bitcoin, .eth, .bnb {
                            width: 70px;
                            height: 70px;
                            font-size: 36px;
                        }
                    }
                `}</style>
            </div>
        )
    }
}

export default Error500Page