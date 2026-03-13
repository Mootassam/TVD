import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { i18n } from '../../../i18n';

function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentAnnouncementIndex, setCurrentAnnouncementIndex] = useState(0);

  const slides = [
    './images/slides/1.png',
    './images/slides/2.png',
    './images/slides/3.png'
  ];

  const announcements = [
    i18n("pages.home.announcements.maintenanceNotice"),
   
  ];

  // Auto slide
  useEffect(() => {
    const slideInterval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    }, 3000);
    return () => clearInterval(slideInterval);
  }, [slides.length]);

  // Auto announcement
  useEffect(() => {
    const announcementInterval = setInterval(() => {
      setCurrentAnnouncementIndex((prev) => (prev + 1) % announcements.length);
    }, 4000);
    return () => clearInterval(announcementInterval);
  }, [announcements.length]);

  const truncateText = (text, maxLength = 80) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  // Sample market data
  const marketPairs = [
    { pair: 'EUR/USD', price: '1.0923', change: '+0.12%', up: true },
    { pair: 'GBP/USD', price: '1.2654', change: '-0.05%', up: false },
    { pair: 'USD/JPY', price: '148.32', change: '+0.23%', up: true },
    { pair: 'AUD/USD', price: '0.6587', change: '+0.08%', up: true },
    { pair: 'USD/CAD', price: '1.3521', change: '-0.03%', up: false },
    { pair: 'BTC/USD', price: '43,215', change: '+2.34%', up: true },
  ];

  const features = [
    { icon: 'fas fa-bolt', title: 'Lightning Fast', desc: 'Execute trades in milliseconds' },
    { icon: 'fas fa-shield-alt', title: 'Secure', desc: 'Bank-grade security' },
    { icon: 'fas fa-chart-line', title: 'Advanced Charts', desc: 'Professional tools' },
    { icon: 'fas fa-headset', title: '24/7 Support', desc: 'Dedicated help' },
  ];

  return (
    <div className="home-container">
      {/* Header */}
      <div className="header">
        <div className="logo">
          <img src="./images/logo.png" style={{ height: '24px' }} alt={i18n("pages.home.logoAlt")} />
        </div>
        <div className="header-icons">
          <Link to="/notification" className="icon-circle">
            <i className="far fa-envelope" />
          </Link>
          <Link to="/profile" className="icon-circle">
            <i className="far fa-user" />
          </Link>
        </div>
      </div>

      {/* Hero Section */}
      <div className="hero-section">
        <div className="crypto-illustration">
          <img 
            src="./images/header.png" 
            alt={i18n("pages.home.headerAlt")} 
            style={{ width: '100%', height: 'auto' }} 
          />
        </div>
        <div className="slogan">{i18n("pages.home.slogan")}</div>
      </div>

      {/* Slideshow */}
      <div className="slideshow-section">
        <div className="section-title">Market Updates</div>
        <div className="slideshow-container">
          {slides.map((slide, index) => (
            <div
              key={index}
              className={`slide ${index === currentSlide ? 'active' : ''}`}
            >
              <img src={slide} alt={`Slide ${index + 1}`} />
            </div>
          ))}
          <div className="slide-dots">
            {slides.map((_, index) => (
              <span
                key={index}
                className={`dot ${index === currentSlide ? 'active' : ''}`}
                onClick={() => setCurrentSlide(index)}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Announcements Ticker */}
      <div className="announcements-section">
        <div className="announcement-header">
          <i className="fas fa-bullhorn"></i>
          <span>Announcements</span>
        </div>
        <div className="announcement-ticker">
          <p className="ticker-text">{truncateText(announcements[currentAnnouncementIndex])}</p>
        </div>
      </div>

      {/* Market Overview */}
      <div className="market-section">
        <div className="section-title">Forex Market</div>
        <div className="market-grid">
          {marketPairs.map((item, idx) => (
            <div key={idx} className="market-card">
              <div className="market-pair">{item.pair}</div>
              <div className="market-price">{item.price}</div>
              <div className={`market-change ${item.up ? 'positive' : 'negative'}`}>
                {item.change}
              </div>
            </div>
          ))}
        </div>
        <Link to="/markets" className="view-all-link">View All Markets <i className="fas fa-chevron-right" /></Link>
      </div>

      {/* Features */}
      <div className="features-section">
        <div className="section-title">Why Trade With Us</div>
        <div className="features-grid">
          {features.map((feat, idx) => (
            <div key={idx} className="feature-card">
              <div className="feature-icon">
                <i className={feat.icon} />
              </div>
              <div className="feature-title">{feat.title}</div>
              <div className="feature-desc">{feat.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Call to Action */}
      <div className="cta-section">
        <div className="cta-content">
          <h3>Start Trading Today</h3>
          <p>Join thousands of traders on our platform</p>
          <Link to="/register" className="cta-button">Get Started</Link>
        </div>
      </div>

      {/* Footer */}
      <div className="footer">
        <div className="footer-links">
          <Link to="/about">About</Link>
          <Link to="/support">Support</Link>
          <Link to="/terms">Terms</Link>
          <Link to="/privacy">Privacy</Link>
        </div>
        <div className="copyright">
          &copy; 2025 Forex Platform. All rights reserved.
        </div>
      </div>

      <style>{`
        /* Home Container – matches other pages */
        .home-container {
          max-width: 430px;
          margin: 0 auto;
          min-height: 100vh;
          background-color: #000000;
          border-top: 2px solid #39FF14;
          display: flex;
          flex-direction: column;
          color: #ffffff;
          box-sizing: border-box;
        }

        /* Header */
        .header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 16px 20px;
          border-bottom: 1px solid #2a2a2a;
        }
        .logo img {
          height: 24px;
        }
        .header-icons {
          display: flex;
          gap: 12px;
        }
        .icon-circle {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background-color: #2a2a2a;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #ffffff;
          text-decoration: none;
          transition: all 0.2s;
        }
        .icon-circle:hover {
          background-color: #39FF14;
          color: #000000;
        }

        /* Hero Section */
        .hero-section {
          padding: 20px;
          text-align: center;
        }
        .crypto-illustration {
          margin-bottom: 16px;
        }
        .slogan {
          font-size: 18px;
          font-weight: 500;
          color: #39FF14;
        }

        /* Slideshow */
        .slideshow-section {
          padding: 0 20px 20px;
        }
        .section-title {
          font-size: 18px;
          font-weight: 600;
          margin-bottom: 16px;
          color: #ffffff;
          border-left: 4px solid #39FF14;
          padding-left: 12px;
        }
        .slideshow-container {
          position: relative;
          width: 100%;
          height: 160px;
          border-radius: 12px;
          overflow: hidden;
          background-color: #1c1c1c;
        }
        .slide {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          opacity: 0;
          transition: opacity 0.5s ease;
        }
        .slide.active {
          opacity: 1;
        }
        .slide img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .slide-dots {
          position: absolute;
          bottom: 12px;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          gap: 8px;
        }
        .dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background-color: #aaaaaa;
          cursor: pointer;
          transition: background-color 0.3s;
        }
        .dot.active {
          background-color: #39FF14;
        }

        /* Announcements */
        .announcements-section {
          display: flex;
          align-items: center;
          gap: 12px;
          background-color: #2a2a2a;
          margin: 0 20px 20px;
          padding: 10px 16px;
          border-radius: 30px;
          border: 1px solid #3a3a3a;
        }
        .announcement-header {
          display: flex;
          align-items: center;
          gap: 6px;
          color: #39FF14;
          font-weight: 600;
          font-size: 14px;
        }
        .announcement-ticker {
          flex: 1;
          overflow: hidden;
        }
        .ticker-text {
          font-size: 13px;
          color: #ffffff;
          white-space: nowrap;
          animation: ticker 15s linear infinite;
        }
        @keyframes ticker {
          0% { transform: translateX(100%); }
          100% { transform: translateX(-100%); }
        }

        /* Market Section */
        .market-section {
          padding: 0 20px 20px;
        }
        .market-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 12px;
          margin-bottom: 12px;
        }
        .market-card {
          background-color: #2a2a2a;
          border-radius: 8px;
          padding: 12px;
          border: 1px solid #3a3a3a;
          transition: all 0.2s;
        }
        .market-card:hover {
          border-color: #39FF14;
        }
        .market-pair {
          font-size: 14px;
          font-weight: 600;
          color: #ffffff;
          margin-bottom: 4px;
        }
        .market-price {
          font-size: 16px;
          font-weight: 700;
          color: #39FF14;
          margin-bottom: 4px;
        }
        .market-change {
          font-size: 12px;
          font-weight: 500;
        }
        .market-change.positive {
          color: #39FF14;
        }
        .market-change.negative {
          color: #ff6b6b;
        }
        .view-all-link {
          display: inline-block;
          color: #39FF14;
          text-decoration: none;
          font-size: 14px;
          font-weight: 500;
          margin-top: 8px;
        }
        .view-all-link i {
          font-size: 12px;
          margin-left: 4px;
        }

        /* Features */
        .features-section {
          padding: 0 20px 20px;
        }
        .features-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 16px;
        }
        .feature-card {
          background-color: #2a2a2a;
          border-radius: 12px;
          padding: 16px 12px;
          text-align: center;
          border: 1px solid #3a3a3a;
        }
        .feature-icon {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          background-color: #1c1c1c;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 12px;
          border: 1px solid #39FF14;
          color: #39FF14;
          font-size: 20px;
        }
        .feature-title {
          font-size: 16px;
          font-weight: 600;
          margin-bottom: 4px;
          color: #ffffff;
        }
        .feature-desc {
          font-size: 12px;
          color: #aaaaaa;
          line-height: 1.4;
        }

        /* CTA */
        .cta-section {
          margin: 0 20px 20px;
          background: linear-gradient(135deg, #1c1c1c, #2a2a2a);
          border-radius: 16px;
          padding: 24px 20px;
          text-align: center;
          border: 1px solid #39FF14;
        }
        .cta-content h3 {
          font-size: 20px;
          font-weight: 700;
          color: #39FF14;
          margin-bottom: 8px;
        }
        .cta-content p {
          font-size: 14px;
          color: #aaaaaa;
          margin-bottom: 16px;
        }
        .cta-button {
          display: inline-block;
          background-color: #39FF14;
          color: #000000;
          font-weight: 700;
          padding: 12px 32px;
          border-radius: 30px;
          text-decoration: none;
          transition: background-color 0.2s;
        }
        .cta-button:hover {
          background-color: #2ecc10;
        }

        /* Footer */
        .footer {
          background-color: #1c1c1c;
          padding: 20px;
          text-align: center;
          border-top: 1px solid #2a2a2a;
        }
        .footer-links {
          display: flex;
          justify-content: center;
          gap: 20px;
          margin-bottom: 12px;
        }
        .footer-links a {
          color: #aaaaaa;
          text-decoration: none;
          font-size: 13px;
        }
        .footer-links a:hover {
          color: #39FF14;
        }
        .copyright {
          font-size: 12px;
          color: #777777;
        }

        /* Responsive */
        @media (max-width: 360px) {
          .market-grid {
            gap: 8px;
          }
          .features-grid {
            gap: 10px;
          }
          .feature-card {
            padding: 12px 8px;
          }
        }
      `}</style>
    </div>
  );
}

export default Home;