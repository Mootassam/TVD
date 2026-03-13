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
                        {/* Forex Animation */}
                        <div className="forex-animation">
                            <div className="dollar">
                                <i className="fas fa-dollar-sign" />
                            </div>
                            <div className="euro">
                                <i className="fas fa-euro-sign" />
                            </div>
                            <div className="pound">
                                <i className="fas fa-pound-sign" />
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
                    /* Error Container – matches profile container */
                    .error-container {
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
                        margin-bottom: 20px;
                    }
                    .page-title {
                        font-size: 18px;
                        font-weight: 500;
                        color: #ffffff;
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

                    /* Error Content */
                    .error-content {
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        justify-content: center;
                        min-height: 60vh;
                        text-align: center;
                    }

                    /* Forex Animation */
                    .forex-animation {
                        position: relative;
                        width: 200px;
                        height: 100px;
                        margin: 20px auto 30px;
                    }
                    .dollar, .euro, .pound {
                        position: absolute;
                        font-size: 48px;
                        color: #39FF14;
                        opacity: 0.8;
                        animation: float 3s ease-in-out infinite;
                    }
                    .dollar {
                        left: 0;
                        top: 0;
                        animation-delay: 0s;
                    }
                    .euro {
                        left: 70px;
                        top: 20px;
                        animation-delay: 0.5s;
                    }
                    .pound {
                        left: 140px;
                        top: 0;
                        animation-delay: 1s;
                    }
                    @keyframes float {
                        0% { transform: translateY(0px); }
                        50% { transform: translateY(-15px); }
                        100% { transform: translateY(0px); }
                    }

                    /* Error Code */
                    .error-code {
                        font-size: 72px;
                        font-weight: bold;
                        color: #39FF14;
                        margin: 10px 0;
                        line-height: 1;
                    }

                    /* Error Title */
                    .error-title {
                        font-size: 24px;
                        font-weight: 600;
                        color: #ffffff;
                        margin-bottom: 12px;
                    }

                    /* Error Message */
                    .error-message {
                        font-size: 16px;
                        color: #aaaaaa;
                        max-width: 300px;
                        margin-bottom: 30px;
                        line-height: 1.5;
                    }

                    /* Home Button – similar to signout button */
                    .home-button {
                        background: none;
                        border: 1px solid #39FF14;
                        color: #39FF14;
                        padding: 12px 24px;
                        border-radius: 6px;
                        font-size: 16px;
                        font-weight: bold;
                        cursor: pointer;
                        display: inline-flex;
                        align-items: center;
                        justify-content: center;
                        gap: 10px;
                        transition: all 0.2s;
                        text-decoration: none;
                    }
                    .home-button:hover {
                        background-color: #39FF14;
                        color: #000000;
                    }
                    .home-icon {
                        font-size: 18px;
                    }

                    /* Link wrapper – remove default underline */
                    a {
                        text-decoration: none;
                    }
                `}</style>
            </div>
        )
    }
}

export default Error500Page