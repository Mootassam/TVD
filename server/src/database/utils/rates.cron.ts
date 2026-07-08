import axios from "axios";
import cron from "node-cron";
import { RedisService } from "../redisConnection";
import { COINS, FIATS } from "./currencies";

// CoinGecko ids for the coins we track. CoinGecko's simple/price endpoint is
// free and needs no API key (CryptoCompare now returns 401 without a key),
// which keeps the rates working without any credentials.
const COINGECKO_IDS: Record<string, string> = {
  USDT: "tether",
  ETH: "ethereum",
  BTC: "bitcoin",
  USDC: "usd-coin",
  DAI: "dai",
  SHIB: "shiba-inu",
  XRP: "ripple",
  TRX: "tron",
  SOL: "solana",
  BNB: "binancecoin",
  DOGE: "dogecoin",
};

// Fetch crypto → USD prices from CoinGecko and store them in Redis. Isolated in
// its own try/catch so a failure here never blocks the fiat rates below.
async function updateCryptoRates() {
  const redis = RedisService.getClient();
  try {
    const ids = COINS.map((c) => COINGECKO_IDS[c]).filter(Boolean);

    const res = await axios.get(
      "https://api.coingecko.com/api/v3/simple/price",
      {
        params: { ids: ids.join(","), vs_currencies: "usd" },
        timeout: 15000,
      }
    );

    const cryptoUSD: Record<string, number> = {};
    for (const symbol of COINS) {
      const id = COINGECKO_IDS[symbol];
      // Stablecoins default to 1 if the source omits them.
      const fallback = ["USDT", "USDC", "DAI"].includes(symbol) ? 1 : 0;
      cryptoUSD[symbol] = res.data?.[id]?.usd ?? fallback;
    }

    await redis.set("CRYPTO_USD", JSON.stringify(cryptoUSD));
  } catch (err: any) {
    // Keep the previous Redis value; just log concisely so a recurring failure
    // doesn't flood the logs every minute.
    const status = err?.response?.status;
    console.error(
      `Rates cron (crypto) error${status ? ` (HTTP ${status})` : ""}:`,
      err?.message || err
    );
  }
}

// Fetch USD → FIAT rates from the free open.er-api.com endpoint (no key needed)
// and store them in Redis. Isolated so it always runs even if crypto fails.
async function updateFiatRates() {
  const redis = RedisService.getClient();
  try {
    const res = await axios.get("https://open.er-api.com/v6/latest/USD", {
      timeout: 15000,
    });

    const rates = res.data?.rates || {};
    const fiatRates: Record<string, number> = {};
    for (const fiat of FIATS) {
      // USD is always 1; others fall back to 1 if missing so we never store 0.
      fiatRates[fiat] = fiat === "USD" ? 1 : rates[fiat] ?? 1;
    }

    await redis.set("FIAT_RATES", JSON.stringify(fiatRates));
  } catch (err: any) {
    const status = err?.response?.status;
    console.error(
      `Rates cron (fiat) error${status ? ` (HTTP ${status})` : ""}:`,
      err?.message || err
    );
  }
}

async function updateRates() {
  // Run both independently so one failing never blocks the other.
  await Promise.allSettled([updateCryptoRates(), updateFiatRates()]);
}

export function startRatesCron() {
  // Populate Redis immediately on boot instead of waiting for the first tick,
  // so the profile/wallet pages have rates right away.
  updateRates();

  cron.schedule("* * * * *", () => {
    updateRates();
  });
}
