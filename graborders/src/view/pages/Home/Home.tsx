import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { i18n } from '../../../i18n';
import axios from 'axios';

function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentAnnouncementIndex, setCurrentAnnouncementIndex] = useState(0);
  
  // Dynamic market data state
  const [marketData, setMarketData] = useState([]);
  const [loadingMarket, setLoadingMarket] = useState(true);
  const [marketError, setMarketError] = useState(null);
  
  // News state
  const [newsArticles, setNewsArticles] = useState([]);
  const [loadingNews, setLoadingNews] = useState(true);
  const [newsError, setNewsError] = useState(null);
  
  // Last update time for market data
  const [lastUpdate, setLastUpdate] = useState(null);

  const slides = [
    'https://www.icmarkets.com/blog/wp-content/uploads/2017/12/Metal-trading.jpg',
    'https://www.icmarkets.com/blog/wp-content/uploads/2025/09/Earning-report_1-1200x740.png',
    'https://www.icmarkets.com/blog/wp-content/uploads/2018/03/pics-new19-01.png', 
    'https://fxnewsgroup.com/wp-content/uploads/2022/09/ic_markets_ad-1024x503-978x400.jpg'
  ];

  const announcements = [
    i18n("pages.home.maintenanceNotice"),
    i18n("pages.home.newSpreads"),
    i18n("pages.home.weekendSupport")
  ];

  // Helper: Get yesterday's date in YYYY-MM-DD format
  const getYesterdayDate = () => {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    return yesterday.toISOString().split('T')[0];
  };

  // Fetch live forex rates with multiple API fallbacks
  const fetchForexRates = async () => {
    try {
      const currencies = ['EUR', 'GBP', 'JPY', 'AUD', 'CAD', 'CHF', 'CNY'];
      const currencyQuery = currencies.join(',');
      
      // Try primary API: ExchangeRate-API (free tier)
      let currentRates = null;
      let yesterdayRates = null;
      
      try {
        const currentRes = await axios.get(
          `https://open.er-api.com/v6/latest/USD`,
          { timeout: 100000 }
        );
        if (currentRes.data?.rates) {
          const rates = currentRes.data.rates;
          currentRates = {
            EUR: rates.EUR,
            GBP: rates.GBP,
            JPY: rates.JPY,
            AUD: rates.AUD,
            CAD: rates.CAD,
            CHF: rates.CHF,
            CNY: rates.CNY
          };
        }
      } catch (primaryError) {
        console.warn('Primary forex API failed, trying fallback:', primaryError.message);
      }
      
      // Fallback: Frankfurter API
      if (!currentRates) {
        try {
          const currentRes = await axios.get(
            'https://api.frankfurter.app/latest?from=USD&to=EUR,GBP,JPY,AUD,CAD,CHF',
            { timeout: 5000 }
          );
          currentRates = { ...currentRes.data.rates, CNY: 0 };
        } catch (fallbackError) {
          console.warn('Fallback API also failed:', fallbackError.message);
        }
      }
      
      // Last resort: use static rates if APIs fail
      if (!currentRates) {
        currentRates = {
          EUR: 0.92,
          GBP: 0.79,
          JPY: 149.50,
          AUD: 1.53,
          CAD: 1.36,
          CHF: 0.88,
          CNY: 7.24
        };
      }
      
      // Fetch yesterday's rates for change calculation
      const yesterday = getYesterdayDate();
      try {
        const yesterdayRes = await axios.get(
          `https://open.er-api.com/v6/latest/USD?date=${yesterday}`,
          { timeout: 5000 }
        );
        if (yesterdayRes.data?.rates) {
          const rates = yesterdayRes.data.rates;
          yesterdayRates = {
            EUR: rates.EUR,
            GBP: rates.GBP,
            JPY: rates.JPY,
            AUD: rates.AUD,
            CAD: rates.CAD,
            CHF: rates.CHF,
            CNY: rates.CNY
          };
        }
      } catch {
        // If yesterday's data unavailable, use current as baseline
        yesterdayRates = currentRates;
      }
      
      // Calculate derived prices and changes
      const eurRate = currentRates.EUR;
      const gbpRate = currentRates.GBP;
      const jpyRate = currentRates.JPY;
      const audRate = currentRates.AUD;
      const cadRate = currentRates.CAD;
      
      const eurUsdPrice = 1 / eurRate;
      const gbpUsdPrice = 1 / gbpRate;
      const usdJpyPrice = jpyRate;
      const audUsdPrice = 1 / audRate;
      const usdCadPrice = cadRate;
      
      // Yesterday prices
      const eurRateYest = yesterdayRates?.EUR || eurRate;
      const gbpRateYest = yesterdayRates?.GBP || gbpRate;
      const jpyRateYest = yesterdayRates?.JPY || jpyRate;
      const audRateYest = yesterdayRates?.AUD || audRate;
      const cadRateYest = yesterdayRates?.CAD || cadRate;
      
      const eurUsdPriceYest = 1 / eurRateYest;
      const gbpUsdPriceYest = 1 / gbpRateYest;
      const usdJpyPriceYest = jpyRateYest;
      const audUsdPriceYest = 1 / audRateYest;
      const usdCadPriceYest = cadRateYest;
      
      // Calculate percentage changes
      const calcChange = (current, previous) => {
        if (!previous || previous === 0) return '+0.00%';
        const change = ((current - previous) / previous) * 100;
        return `${change >= 0 ? '+' : ''}${change.toFixed(2)}%`;
      };
      
      // Build forex pairs dynamically
      const buildPair = (base, quote, rate, rateYest, decimals, spread) => {
        const price = base === 'USD' ? rate : 1 / rate;
        const priceYest = base === 'USD' ? rateYest : 1 / rateYest;
        const pairName = `${base}/${quote}`;
        return {
          pair: pairName,
          price: price.toFixed(decimals),
          change: calcChange(price, priceYest),
          up: price >= priceYest,
          spread: spread
        };
      };
      
      const forexPairs = [
        buildPair('USD', 'EUR', currentRates.EUR, yesterdayRates?.EUR || currentRates.EUR, 5, '0.1'),
        buildPair('USD', 'GBP', currentRates.GBP, yesterdayRates?.GBP || currentRates.GBP, 5, '0.2'),
        buildPair('USD', 'JPY', currentRates.JPY, yesterdayRates?.JPY || currentRates.JPY, 3, '0.3'),
        buildPair('USD', 'AUD', currentRates.AUD, yesterdayRates?.AUD || currentRates.AUD, 5, '0.4'),
        buildPair('USD', 'CAD', currentRates.CAD, yesterdayRates?.CAD || currentRates.CAD, 5, '0.3'),
        buildPair('USD', 'CHF', currentRates.CHF, yesterdayRates?.CHF || currentRates.CHF, 5, '0.3'),
        buildPair('USD', 'CNY', currentRates.CNY, yesterdayRates?.CNY || currentRates.CNY, 4, '0.5'),
      ];
      
      return forexPairs;
    } catch (error) {
      console.error('Forex API error:', error);
      throw new Error('Failed to fetch forex rates');
    }
  };
  
  // Fetch BTC price with multiple API fallbacks
  const fetchBTCPrice = async () => {
    try {
      // Try CoinGecko first
      let price = 0;
      let change24h = 0;
      
      try {
        const response = await axios.get(
          'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd&include_24hr_change=true',
          { timeout: 5000 }
        );
        price = response.data.bitcoin?.usd || 0;
        change24h = response.data.bitcoin?.usd_24h_change || 0;
      } catch (primaryError) {
        console.warn('CoinGecko API failed, trying fallback:', primaryError.message);
      }
      
      // Fallback: Binance API for BTC price
      if (!price) {
        try {
          const btcRes = await axios.get(
            'https://api.binance.com/api/v3/ticker/24hr?symbol=BTCUSDT',
            { timeout: 5000 }
          );
          price = parseFloat(btcRes.data.lastPrice);
          change24h = parseFloat(btcRes.data.priceChangePercent);
        } catch (fallbackError) {
          console.warn('Binance fallback also failed:', fallbackError.message);
          // Last resort static price
          price = 67000;
          change24h = 2.5;
        }
      }
      
      return {
        pair: 'BTC/USD',
        price: price.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 }),
        change: `${change24h >= 0 ? '+' : ''}${change24h.toFixed(2)}%`,
        up: change24h >= 0,
        spread: '15.0'
      };
    } catch (error) {
      console.error('BTC API error:', error);
      throw new Error('Failed to fetch BTC price');
    }
  };
  
  // Fetch all market data
  const fetchAllMarketData = useCallback(async () => {
    setLoadingMarket(true);
    setMarketError(null);
    try {
      const [forexPairs, btcData] = await Promise.all([
        fetchForexRates(),
        fetchBTCPrice()
      ]);
      setMarketData([...forexPairs, btcData]);
      setLastUpdate(new Date());
    } catch (error) {
      console.error('Market data error:', error);
      setMarketError('Unable to load live market data. Please refresh.');
      // Fallback to show some structure but with error indicator
      setMarketData([]);
    } finally {
      setLoadingMarket(false);
    }
  }, []);
  
  // Fetch news from Bloomberg RSS via rss2json (free, no key)
  const fetchNews = async () => {
    setLoadingNews(true);
    setNewsError(null);
    try {
      // Using rss2json to convert Bloomberg Markets RSS to JSON
      const rssUrl = 'https://feeds.bloomberg.com/markets/news.rss';
      const response = await axios.get(`https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(rssUrl)}`);
      
      if (response.data && response.data.items) {
        // Parse items to extract title, image, link, and description
        const articles = response.data.items.slice(0, 8).map(item => {
          // Extract image from thumbnail or enclosure or from description
          let imageUrl = null;
          if (item.thumbnail) {
            imageUrl = item.thumbnail;
          } else if (item.enclosure && item.enclosure.link) {
            imageUrl = item.enclosure.link;
          } else if (item.description) {
            // Try to extract first image from description
            const imgMatch = item.description.match(/<img[^>]+src="([^">]+)"/);
            if (imgMatch && imgMatch[1]) {
              imageUrl = imgMatch[1];
            }
          }
          // Fallback placeholder image
          if (!imageUrl) {
            imageUrl = 'https://via.placeholder.com/300x160/1c1c1c/39FF14?text=Market+News';
          }
          
          return {
            title: item.title || 'Market Update',
            link: item.link || '#',
            imageUrl: imageUrl,
            description: item.description ? item.description.replace(/<[^>]*>/g, '').substring(0, 100) : '',
            pubDate: item.pubDate
          };
        });
        setNewsArticles(articles);
      } else {
        throw new Error('Invalid news response');
      }
    } catch (error) {
      console.error('News API error:', error);
      setNewsError('Unable to load news. Please try again later.');
      setNewsArticles([]);
    } finally {
      setLoadingNews(false);
    }
  };
  
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
  
  // Initial data fetch and refresh interval
  useEffect(() => {
    fetchAllMarketData();
    fetchNews();
    
    // Refresh market data every 30 seconds for real-time updates
    const marketInterval = setInterval(() => {
      fetchAllMarketData();
    }, 30000);
    
    // Refresh news every 5 minutes
    const newsInterval = setInterval(() => {
      fetchNews();
    }, 300000);
    
    return () => {
      clearInterval(marketInterval);
      clearInterval(newsInterval);
    };
  }, [fetchAllMarketData]);
  
  const truncateText = (text, maxLength = 80) => {
    if (!text) return '';
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };
  
  const features = [
    { icon: 'fas fa-bolt', title: i18n("pages.home.execution"), desc: i18n("pages.home.executionDesc") },
    { icon: 'fas fa-shield-alt', title: i18n("pages.home.secure"), desc: i18n("pages.home.secureDesc") },
    { icon: 'fas fa-chart-line', title: i18n("pages.home.spreads"), desc: i18n("pages.home.spreadsDesc") },
    { icon: 'fas fa-headset', title: i18n("pages.home.support"), desc: i18n("pages.home.supportDesc") },
  ];
  
  return (
    <div className="home-container">
      {/* Header */}
      <div className="header">
        <div className="logo">
          <img src="./images/logo.png" style={{ height: '20px' }} alt={i18n("pages.home.logoAlt")} />
        </div>
        <div className="header-icons">
          <Link to="/notification" className="icon-circle">
            <i className="far fa-envelope" />
          </Link>
        </div>
      </div>
      
      {/* Hero Section */}
      <div className="hero-section">
        {/* Hero content can be added here if needed */}
      </div>
      
      {/* Slideshow */}
      <div className="slideshow-section">
        <div className="section-title">{i18n("pages.home.promoTitle")}</div>
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
          <span>{i18n("pages.home.title")}</span>
        </div>
        <div className="announcement-ticker">
          <p className="ticker-text">{truncateText(announcements[currentAnnouncementIndex])}</p>
        </div>
      </div>
      
      {/* Market Overview - DYNAMIC REAL DATA */}
      <div className="market-section">
        <div className="section-header">
          <div className="section-title">{i18n("pages.home.marketTitle")}</div>
          <Link to="/market" className="view-all-link">
            {i18n("pages.home.viewAll")} <i className="fas fa-chevron-right" />
          </Link>
        </div>
        {lastUpdate && (
          <div className="last-update">
            <i className="fas fa-sync-alt"></i> Updated: {lastUpdate.toLocaleTimeString()}
          </div>
        )}
        {loadingMarket ? (
          <div className="loading-skeleton">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="market-card skeleton">
                <div className="skeleton-line"></div>
                <div className="skeleton-line"></div>
                <div className="skeleton-line short"></div>
              </div>
            ))}
          </div>
        ) : marketError ? (
          <div className="error-message">
            <i className="fas fa-exclamation-triangle"></i> {marketError}
            <button onClick={fetchAllMarketData} className="retry-btn">Retry</button>
          </div>
        ) : (
          <div className="market-grid">
            {marketData.map((item, idx) => (
              <div key={idx} className="market-card">
                <div className="market-pair">{item.pair}</div>
                <div className="market-price">{item.price}</div>
                <div className="market-details">
                  <span className={`market-change ${item.up ? 'positive' : 'negative'}`}>
                    {item.change}
                  </span>
                  <span className="market-spread">{i18n("pages.home.spread")}: {item.spread}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      
      {/* NEWS SECTION - DYNAMIC FROM API */}
      <div className="news-section">
        <div className="section-header">
          <div className="section-title">
            <i className="fas fa-newspaper"></i> Market News
          </div>
          <a href="https://www.bloomberg.com/markets" target="_blank" rel="noopener noreferrer" className="view-all-link">
            Bloomberg <i className="fas fa-external-link-alt" />
          </a>
        </div>
        {loadingNews ? (
          <div className="news-horizontal">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="news-card skeleton-news">
                <div className="skeleton-image"></div>
                <div className="skeleton-title"></div>
                <div className="skeleton-text"></div>
              </div>
            ))}
          </div>
        ) : newsError ? (
          <div className="error-message">
            <i className="fas fa-exclamation-triangle"></i> {newsError}
            <button onClick={fetchNews} className="retry-btn">Retry</button>
          </div>
        ) : newsArticles.length > 0 ? (
          <div className="news-horizontal">
            {newsArticles.map((article, idx) => (
              <a 
                key={idx} 
                href={article.link} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="news-card"
              >
                <div className="news-image">
                  <img src={article.imageUrl} alt={article.title} />
                </div>
                <div className="news-content">
                  <h4 className="news-title">{truncateText(article.title, 60)}</h4>
                  <p className="news-desc">{truncateText(article.description, 80)}</p>
                  <span className="news-source">Bloomberg Markets</span>
                </div>
              </a>
            ))}
          </div>
        ) : (
          <div className="no-data-message">No news available at the moment.</div>
        )}
      </div>
      
      {/* Features */}
      <div className="features-section">
        <div className="section-title">{i18n("pages.home.featuresTitle")}</div>
        <div className="features-grid">
          {features.map((feat, idx) => (
            <div key={idx} className="feature-card">
              <div className="feature-icon">
                <i className={feat.icon}></i>
              </div>
              <div className="feature-title">{feat.title}</div>
              <div className="feature-desc">{feat.desc}</div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Floating CTA */}
    
      <div className="stats-section">
        <div className="section-title">
          <i className="fas fa-chart-bar"></i> Platform Statistics
        </div>
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-value">10M+</div>
            <div className="stat-label">Trades Executed</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">180+</div>
            <div className="stat-label">Countries Supported</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">0.01s</div>
            <div className="stat-label">Avg Execution</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">24/7</div>
            <div className="stat-label">Customer Support</div>
          </div>
        </div>
      </div>



      {/* Why Choose Us */}
      <div className="why-choose-section">
        <div className="section-title">
          <i className="fas fa-check-circle"></i> Why Choose Us
        </div>
        <div className="benefits-list">
          <div className="benefit-item">
            <i className="fas fa-shield-alt"></i>
            <div>
              <strong>Regulated & Secure</strong>
              <p>Fully regulated with segregated client funds</p>
            </div>
          </div>
          <div className="benefit-item">
            <i className="fas fa-tachometer-alt"></i>
            <div>
              <strong>Lightning Fast</strong>
              <p>Ultra-low latency execution under 10ms</p>
            </div>
          </div>
          <div className="benefit-item">
            <i className="fas fa-percentage"></i>
            <div>
              <strong>Raw Spreads</strong>
              <p>Starting from 0.0 pips with no markup</p>
            </div>
          </div>
          <div className="benefit-item">
            <i className="fas fa-mobile-alt"></i>
            <div>
              <strong>Trade Anywhere</strong>
              <p>Mobile, tablet & desktop platforms</p>
            </div>
          </div>
        </div>
      </div>
      
      <style>{`
        .home-container {
          max-width: 430px;
          margin: 0 auto;
          min-height: 100vh;
          background-color: #0f0f0f;
          border-top: 2px solid #39FF14;
          display: flex;
          flex-direction: column;
          color: #ffffff;
          box-sizing: border-box;
          font-family: 'Inter', sans-serif;
        }
        
        /* Header */
        .header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 16px 20px;
          border-bottom: 1px solid #2a2a2a;
        }
        .logo img { height: 24px; }
        .header-icons { display: flex; gap: 12px; }
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
        .icon-circle:hover { background-color: #39FF14; color: #0f0f0f; }
        
        /* Hero */
        .hero-section {
          padding: 10px 20px 16px;
          text-align: center;
        }
        
        /* Slideshow */
        .slideshow-section { padding: 0 20px 20px; }
        .section-title {
          font-size: 18px;
          font-weight: 600;
          margin-bottom: 16px;
          color: #ffffff;
          border-left: 4px solid #39FF14;
          padding-left: 12px;
          display: flex;
          align-items: center;
          gap: 8px;
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
        .slide.active { opacity: 1; }
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
        .dot.active { background-color: #39FF14; }
        
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
        .announcement-ticker { flex: 1; overflow: hidden; }
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
        .market-section { padding: 0 20px 20px; }
        .section-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 16px;
        }
        .last-update {
          font-size: 11px;
          color: #888;
          text-align: right;
          margin-bottom: 12px;
          display: flex;
          justify-content: flex-end;
          align-items: center;
          gap: 6px;
        }
        .market-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 12px;
        }
        .market-card {
          background-color: #2a2a2a;
          border-radius: 8px;
          padding: 12px;
          border: 1px solid #3a3a3a;
          transition: all 0.2s;
        }
        .market-card:hover { border-color: #39FF14; }
        .market-pair {
          font-size: 14px;
          font-weight: 600;
          color: #ffffff;
          margin-bottom: 4px;
        }
        .market-price {
          font-size: 18px;
          font-weight: 700;
          color: #39FF14;
          margin-bottom: 4px;
        }
        .market-details {
          display: flex;
          justify-content: space-between;
          font-size: 12px;
        }
        .market-change.positive { color: #39FF14; }
        .market-change.negative { color: #ff6b6b; }
        .market-spread { color: #aaaaaa; }
        .view-all-link {
          color: #39FF14;
          text-decoration: none;
          font-size: 14px;
          font-weight: 500;
          display: flex;
          align-items: center;
          gap: 4px;
        }
        .view-all-link i { font-size: 12px; }
        
        /* News Section */
        .news-section {
          padding: 0 20px 24px;
        }
        .news-horizontal {
          display: flex;
          gap: 16px;
          overflow-x: auto;
          padding-bottom: 8px;
        }
        .news-horizontal::-webkit-scrollbar {
          height: 4px;
        }
        .news-horizontal::-webkit-scrollbar-track {
          background: #2a2a2a;
          border-radius: 4px;
        }
        .news-horizontal::-webkit-scrollbar-thumb {
          background: #39FF14;
          border-radius: 4px;
        }
        .news-card {
          flex: 0 0 280px;
          background-color: #1c1c1c;
          border-radius: 12px;
          overflow: hidden;
          border: 1px solid #3a3a3a;
          transition: all 0.2s;
          text-decoration: none;
          color: #ffffff;
          display: flex;
          flex-direction: column;
        }
        .news-card:hover {
          border-color: #39FF14;
          transform: translateY(-2px);
        }
        .news-image {
          width: 100%;
          height: 140px;
          overflow: hidden;
          background-color: #2a2a2a;
        }
        .news-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.3s;
        }
        .news-card:hover .news-image img {
          transform: scale(1.05);
        }
        .news-content {
          padding: 12px;
          flex: 1;
          display: flex;
          flex-direction: column;
        }
        .news-title {
          font-size: 14px;
          font-weight: 600;
          margin: 0 0 6px 0;
          line-height: 1.4;
          color: #ffffff;
        }
        .news-desc {
          font-size: 12px;
          color: #aaaaaa;
          line-height: 1.4;
          margin: 0 0 8px 0;
          flex: 1;
        }
        .news-source {
          font-size: 10px;
          color: #39FF14;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        
        /* Loading Skeletons */
        .loading-skeleton {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 12px;
        }
        .skeleton, .skeleton-news {
          background-color: #2a2a2a;
          border-radius: 8px;
          padding: 12px;
        }
        .skeleton-line {
          height: 14px;
          background: linear-gradient(90deg, #2a2a2a 25%, #3a3a3a 50%, #2a2a2a 75%);
          background-size: 200% 100%;
          animation: shimmer 1.5s infinite;
          border-radius: 4px;
          margin-bottom: 8px;
        }
        .skeleton-line.short { width: 60%; }
        .skeleton-image {
          height: 140px;
          background: linear-gradient(90deg, #2a2a2a 25%, #3a3a3a 50%, #2a2a2a 75%);
          background-size: 200% 100%;
          animation: shimmer 1.5s infinite;
        }
        .skeleton-title {
          height: 16px;
          width: 80%;
          margin: 12px 0 8px;
          background: linear-gradient(90deg, #2a2a2a 25%, #3a3a3a 50%, #2a2a2a 75%);
          background-size: 200% 100%;
          animation: shimmer 1.5s infinite;
          border-radius: 4px;
        }
        .skeleton-text {
          height: 12px;
          width: 90%;
          background: linear-gradient(90deg, #2a2a2a 25%, #3a3a3a 50%, #2a2a2a 75%);
          background-size: 200% 100%;
          animation: shimmer 1.5s infinite;
          border-radius: 4px;
        }
        @keyframes shimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
        
        /* Error and Retry */
        .error-message {
          background-color: rgba(255, 107, 107, 0.1);
          border: 1px solid #ff6b6b;
          border-radius: 8px;
          padding: 16px;
          text-align: center;
          color: #ff6b6b;
          font-size: 14px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 12px;
        }
        .retry-btn {
          background-color: #39FF14;
          color: #0f0f0f;
          border: none;
          padding: 6px 16px;
          border-radius: 20px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
        }
        .retry-btn:hover {
          background-color: #2ecc10;
        }
        .no-data-message {
          text-align: center;
          padding: 32px;
          color: #888;
          background-color: #1c1c1c;
          border-radius: 12px;
        }
        
        /* Features */
        .features-section { padding: 0 20px 20px; }
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
          color: #0f0f0f;
          font-weight: 700;
          padding: 12px 32px;
          border-radius: 30px;
          text-decoration: none;
          transition: background-color 0.2s;
        }
        .cta-button:hover { background-color: #2ecc10; }
        
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
        .footer-links a:hover { color: #39FF14; }
        .copyright {
          font-size: 12px;
          color: #777777;
        }
        
        @media (max-width: 360px) {
          .market-grid { gap: 8px; }
          .features-grid { gap: 10px; }
          .feature-card { padding: 12px 8px; }
          .news-card { flex: 0 0 260px; }
        }
        
        /* Stats Section */
        .stats-section { padding: 0 20px 20px; }
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 12px;
        }
        .stat-card {
          background: linear-gradient(135deg, #1c1c1c 0%, #2a2a2a 100%);
          border-radius: 12px;
          padding: 16px;
          text-align: center;
          border: 1px solid #39FF14;
        }
        .stat-value {
          font-size: 24px;
          font-weight: 700;
          color: #39FF14;
          margin-bottom: 4px;
        }
        .stat-label {
          font-size: 11px;
          color: #aaaaaa;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        
        /* Instruments Section */
        .instruments-section { padding: 0 20px 20px; }
        .instruments-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 10px;
        }
        .instrument-card {
          background-color: #2a2a2a;
          border-radius: 10px;
          padding: 14px 10px;
          text-align: center;
          border: 1px solid #3a3a3a;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
          transition: all 0.2s;
        }
        .instrument-card:hover {
          border-color: #39FF14;
          transform: translateY(-2px);
        }
        .instrument-card i {
          font-size: 24px;
          color: #39FF14;
        }
        .instrument-card span {
          font-size: 12px;
          color: #ffffff;
          font-weight: 500;
        }
        
        /* Why Choose Us Section */
        .why-choose-section { padding: 0 20px 24px; }
        .benefits-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .benefit-item {
          background-color: #2a2a2a;
          border-radius: 12px;
          padding: 14px;
          display: flex;
          align-items: flex-start;
          gap: 14px;
          border: 1px solid #3a3a3a;
          transition: all 0.2s;
        }
        .benefit-item:hover {
          border-color: #39FF14;
        }
        .benefit-item i {
          font-size: 24px;
          color: #39FF14;
          min-width: 32px;
        }
        .benefit-item strong {
          display: block;
          color: #ffffff;
          font-size: 14px;
          margin-bottom: 4px;
        }
        .benefit-item p {
          margin: 0;
          font-size: 12px;
          color: #aaaaaa;
          line-height: 1.4;
        }
        
        /* Floating CTA */
        .floating-cta {
          position: fixed;
          bottom: 24px;
          left: 50%;
          transform: translateX(-50%);
          z-index: 100;
        }
        .floating-cta-btn {
          display: flex;
          align-items: center;
          gap: 8px;
          background: linear-gradient(135deg, #39FF14 0%, #2ecc10 100%);
          color: #0f0f0f;
          font-weight: 700;
          padding: 14px 28px;
          border-radius: 30px;
          text-decoration: none;
          box-shadow: 0 4px 20px rgba(57, 255, 20, 0.4);
          transition: all 0.2s;
          font-size: 15px;
        }
        .floating-cta-btn:hover {
          transform: scale(1.05);
          box-shadow: 0 6px 25px rgba(57, 255, 20, 0.6);
        }
      `}</style>
    </div>
  );
}

export default Home;