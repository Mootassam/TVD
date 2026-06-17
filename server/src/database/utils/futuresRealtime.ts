import { databaseInit } from "../databaseConnection";
import FuturesRepository from "../repositories/futuresRepository";
import Futures from "../models/futures";
import { emitToUser } from "../../services/notificationServices";

/**
 * Real-time futures engine.
 *
 * Runs every second and is the SINGLE authority for futures timing and closing:
 *   1. Finalizes every trade whose contract duration has just ended (applying
 *      the admin's manual decision if one was set, otherwise the deterministic
 *      outcome) and pushes the result to the owner via `futures:closed`.
 *   2. Pushes the remaining time of every still-active trade to its owner via
 *      `futures:tick`, so the client never has to compute the countdown itself.
 *
 * Because finalization happens here (not on the client), a manual profit/loss
 * set by an admin only takes effect when the timer reaches zero, and the client
 * cannot influence or short-circuit the result.
 */
export function startFuturesRealtime() {
  let running = false;

  setInterval(async () => {
    if (running) return; // never overlap two ticks
    running = true;

    try {
      const database = await databaseInit();

      const options: any = {
        database,
        language: "en",
        currentUser: { id: null },
        currentTenant: { id: null },
      };

      // 1) Finalize expired trades and notify their owners of the result.
      const { results } = await FuturesRepository.autoFinalizeExpired(options);

      for (const r of results) {
        emitToUser(r.userId, "futures:closed", {
          id: r.id,
          control: r.control,
          result: r.control === "profit" ? "win" : "loss",
          profitAndLossAmount: r.profitAndLossAmount,
          netAmount: r.netAmount,
          futuresAmount: r.futuresAmount,
          closePositionPrice: r.closePositionPrice,
          closePositionTime: r.closePositionTime,
        });
      }

      // 2) Push remaining time for every still-active trade.
      const now = Date.now();
      const active = await Futures(database)
        .find({ finalized: false, expiryTime: { $gt: new Date(now) } })
        .select("_id createdBy expiryTime contractDuration")
        .limit(5000)
        .lean();

      for (const t of active) {
        const expiry = new Date(t.expiryTime).getTime();
        const remainingMs = Math.max(0, expiry - now);
        emitToUser(String(t.createdBy), "futures:tick", {
          id: String(t._id),
          remainingMs,
          remainingSeconds: Math.ceil(remainingMs / 1000),
          expiryTime: t.expiryTime,
        });
      }
    } catch (error) {
      console.error("[FuturesRealtime] Error:", error);
    } finally {
      running = false;
    }
  }, 1000);

  console.log("[FuturesRealtime] Real-time futures loop started (every 1s)");
}
