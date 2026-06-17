import MongooseRepository from "./mongooseRepository";
import MongooseQueryUtils from "../utils/mongooseQueryUtils";
import AuditLogRepository from "./auditLogRepository";
import Error404 from "../../errors/Error404";
import { IRepositoryOptions } from "./IRepositoryOptions";
import FileRepository from "./fileRepository";
import Futures from "../models/futures";
import Wallet from "../models/wallet";
import { sendNotification, emitToUser } from "../../services/notificationServices";
import Error400 from "../../errors/Error400";
import Transaction from '../models/transaction';

class FuturesRepository {
  static async create(data, options: IRepositoryOptions) {
    const currentTenant = MongooseRepository.getCurrentTenant(options);
    const currentUser = MongooseRepository.getCurrentUser(options);

    if (!data.futuresAmount || data.futuresAmount < 200) {
      throw new Error400(options.language, "errors.amountConditions");
    }

    // ✅ A client may only have one active (not yet finalized) trade at a time.
    // This prevents opening a new position while a previous one is still
    // running.
    const activeTrade = await Futures(options.database).findOne({
      createdBy: currentUser.id,
      tenant: currentTenant.id,
      finalized: false,
    });

    if (activeTrade) {
      throw new Error400(options.language, "errors.activeTradeExists");
    }

    const walletModel = Wallet(options.database);
    const transactionModel = Transaction(options.database);

    const usdtWallet = await walletModel.findOne({
      user: currentUser.id,
      symbol: "USDT",
      accountType: 'exchange'
    });

    if (!usdtWallet) {
      throw new Error400(options.database, 'errors.usdtWalletNotFound');
    }

    if (usdtWallet.amount < data.futuresAmount) {
      throw new Error400(options.database,'errors.insufficientusdtWallet');
    }

    if (usdtWallet.status !== 'active') {
      throw new Error400(options.database, 'errors.usdtWalletorfrozen');
    }

    try {
      const updatedWallet = await walletModel.findOneAndUpdate(
        {
          _id: usdtWallet._id,
          tenant: currentTenant.id,
          amount: { $gte: data.futuresAmount },
          accountType: 'exchange'
        },
        {
          $inc: { amount: -data.futuresAmount },
          $set: { updatedBy: currentUser.id, updatedAt: new Date() },
        },
        { new: true }
      );

      if (!updatedWallet) {
        throw new Error400(options.database,'errors.insufficientusdtWallet');
      }

      const openPositionTime = data.openPositionTime
        ? new Date(data.openPositionTime)
        : new Date();

      const durationMs = await this.parseDurationToMs(data.contractDuration);

      // No (or invalid) duration => OPEN-ENDED trade: no expiry, so the
      // auto-finalize loop never closes it. It only closes when the client
      // clicks "Close Trade".
      const expiryTime =
        durationMs > 0
          ? new Date(openPositionTime.getTime() + durationMs)
          : null;

      const payload = {
        ...data,
        openPositionTime,
        expiryTime,
        finalized: false,
        finalizedAt: null,
        tenant: currentTenant.id,
        createdBy: currentUser.id,
        updatedBy: currentUser.id,
        accountType: currentUser.accountType || "real",
      };

        const [record] = await Futures(options.database).create([payload], options);

        await transactionModel.create({
          type: "futures_reserved",
          referenceId: record._id,
          wallet: usdtWallet._id,
          asset: "USDT",
          amount: data.futuresAmount,
          status: "completed",
          direction: "out",
          user: currentUser.id,
          tenant: currentTenant.id,
          createdBy: currentUser.id,
          updatedBy: currentUser.id,
          dateTransaction: new Date(),
          description: `Futures trade reserved: ${data.futuresAmount} USDT for ${data.futuresStatus} position`
        });

      await sendNotification({
        userId: currentUser.id,
        message: `Futures trade created: ${data.futuresAmount} USDT`,
        type: "futures",
        forAdmin: true,
        options,
      });

      await this._createAuditLog(
        AuditLogRepository.CREATE,
        record.id,
        payload,
        options
      );

      return this.findById(record.id, options);
    } catch (error) {
      console.error('Futures creation failed:', error);
      throw error;
    }
  }

  static async update(id, data, options: IRepositoryOptions) {
    const currentTenant = MongooseRepository.getCurrentTenant(options);
    const currentUser = MongooseRepository.getCurrentUser(options);

    const FuturesModel = Futures(options.database);

    let record = await FuturesModel.findById(id);

    if (!record || String(record.tenant) !== String(currentTenant.id)) {
      throw new Error404();
    }

    if (record.finalized) {
      throw new Error400(options.language, "futures.alreadyFinalized");
    }

    // ✅ Client-initiated early close. The client may only close their OWN
    // trade, and it is finalized immediately using the SAME engine as normal
    // expiry: the admin's pending decision if one was set, otherwise the
    // deterministic outcome (i.e. exactly what the client would have gotten on
    // its own). The result is not altered by the early close.
    if (data.closeNow === true) {
      if (String(record.createdBy) !== String(currentUser.id)) {
        throw new Error404();
      }

      const result = await FuturesRepository.finalizeRecord(record, options);

      if (result) {
        emitToUser(String(record.createdBy), "futures:closed", {
          id: result.id,
          control: result.control,
          result: result.control === "profit" ? "win" : "loss",
          profitAndLossAmount: result.profitAndLossAmount,
          netAmount: result.netAmount,
          futuresAmount: result.futuresAmount,
          closePositionPrice: result.closePositionPrice,
          closePositionTime: result.closePositionTime,
        });
      }

      return this.findById(id, options);
    }

    // A control update is an ADMIN manual decision: it carries a control
    // ("profit"/"loss") AND an explicit amount. We require the amount so the
    // full edit form (which always sends `control` but not
    // `profitAndLossAmount`) does not accidentally set a pending decision.
    const isControlUpdate =
      (data.control === "loss" || data.control === "profit") &&
      data.profitAndLossAmount !== undefined &&
      data.profitAndLossAmount !== null;

    try {
       if (isControlUpdate) {
         // ✅ Admin sets the outcome AHEAD of expiry. We DO NOT finalize the
         // trade or move any money now — the decision is stored as "pending"
         // and applied only when the contract duration ends (see
         // autoFinalizeExpired). This preserves the natural flow: the client
         // keeps counting down and only sees the result when the timer hits 0.
         const control: "profit" | "loss" = data.control;
         let pendingAmount: number;

         if (control === "profit") {
           // Inline admin action sends profitAndLossAmount = stake + net profit.
           const netProfit =
             Number(data.profitAndLossAmount) - record.futuresAmount;
           if (!(netProfit > 0)) {
             throw new Error400(options.language, "errors.profitAmountInvalid");
           }
           pendingAmount = netProfit;
         } else {
           const lossAmount = Math.abs(Number(data.profitAndLossAmount));
           if (!(lossAmount > 0)) {
             throw new Error400(options.language, "errors.lossAmountInvalid");
           }
           // Cannot lose more than the staked amount.
           pendingAmount = Math.min(lossAmount, record.futuresAmount);
         }

         await FuturesModel.updateOne(
           { _id: id, tenant: currentTenant.id, finalized: { $ne: true } },
           {
             $set: {
               manualOverride: true,
               pendingControl: control,
               pendingAmount,
               updatedBy: currentUser.id,
             },
           }
         );

      } else {
        const updateData = { ...data, updatedBy: currentUser.id };

        if (data.closePositionPrice && data.closePositionPrice > 100) {
          throw new Error400(options.language, "errors.closingPriceExceedLimit");
        }

        await FuturesModel.updateOne(
          { _id: id, tenant: currentTenant.id },
          updateData
        );
      }

      await this._createAuditLog(AuditLogRepository.UPDATE, id, data, options);

      record = await this.findById(id, options);
      return record;

    } catch (err) {
      throw err;
    }
  }

  static async destroy(id, options: IRepositoryOptions) {
    const currentTenant = MongooseRepository.getCurrentTenant(options);

    let record = await MongooseRepository.wrapWithSessionIfExists(
      Futures(options.database).findById(id),
      options
    );

    if (!record || String(record.tenant) !== String(currentTenant.id)) {
      throw new Error404();
    }

    await Futures(options.database).deleteOne({ _id: id }, options);

    await this._createAuditLog(AuditLogRepository.DELETE, id, record, options);
  }

  static async count(filter, options: IRepositoryOptions) {
    const currentTenant = MongooseRepository.getCurrentTenant(options);

    return MongooseRepository.wrapWithSessionIfExists(
      Futures(options.database).countDocuments({
        ...filter,
        tenant: currentTenant.id,
      }),
      options
    );
  }

  static async findById(id, options: IRepositoryOptions) {
    const currentTenant = MongooseRepository.getCurrentTenant(options);

    let record = await MongooseRepository.wrapWithSessionIfExists(
      Futures(options.database)
        .findById(id)
        .populate("user")
        .populate("createdBy"),
      options
    );

    if (!record || String(record.tenant) !== String(currentTenant.id)) {
      throw new Error404();
    }

    return this._fillFileDownloadUrls(record);
  }

  static async findAndCountAll(
    { filter, limit = 500, offset = 0, orderBy = "" },
    options: IRepositoryOptions
  ) {
    const currentTenant = MongooseRepository.getCurrentTenant(options);

    let criteriaAnd: any = [];
    criteriaAnd.push({ tenant: currentTenant.id });

    if (filter) {
      if (filter.id) {
        criteriaAnd.push({ ["_id"]: MongooseQueryUtils.uuid(filter.id) });
      }
      if (filter.user) {
        criteriaAnd.push({ createdBy: filter.user });
      }
      if (filter.idnumer) {
        criteriaAnd.push({
          idnumer: { $regex: MongooseQueryUtils.escapeRegExp(filter.idnumer), $options: "i" },
        });
      }
    }

    const sort = MongooseQueryUtils.sort(orderBy || "createdAt_DESC");
    const skip = Number(offset || 0) || undefined;
    const limitEscaped = Number(limit || 0) || undefined;
    const criteria = criteriaAnd.length ? { $and: criteriaAnd } : null;

    let rows = await Futures(options.database)
      .find(criteria)
      .skip(skip)
      .limit(limitEscaped)
      .sort(sort)
      .populate("user")
      .populate("createdBy");

    const count = await Futures(options.database).countDocuments(criteria);

    rows = await Promise.all(rows.map(this._fillFileDownloadUrls));

    return { rows, count };
  }

  static async findAndCountAllMobile(
    { filter, limit = 500, offset = 0, orderBy = "" },
    options: IRepositoryOptions
  ) {
    const currentTenant = MongooseRepository.getCurrentTenant(options);
    const currentUser = MongooseRepository.getCurrentUser(options);

    let criteriaAnd: any = [];
    criteriaAnd.push({ tenant: currentTenant.id, createdBy: currentUser.id });

    if (filter) {
      criteriaAnd.push({ finalized: filter });
      if (filter.id) {
        criteriaAnd.push({ ["_id"]: MongooseQueryUtils.uuid(filter.id) });
      }
      if (filter.idnumer) {
        criteriaAnd.push({
          idnumer: { $regex: MongooseQueryUtils.escapeRegExp(filter.idnumer), $options: "i" },
        });
      }
    }

    const sort = MongooseQueryUtils.sort(orderBy || "createdAt_DESC");
    const skip = Number(offset || 0) || undefined;
    const limitEscaped = Number(limit || 0) || undefined;
    const criteria = criteriaAnd.length ? { $and: criteriaAnd } : null;

    let rows = await Futures(options.database)
      .find(criteria)
      .skip(skip)
      .sort(sort)
      .populate("createdBy");

    const count = await Futures(options.database).countDocuments(criteria);

    rows = await Promise.all(rows.map(this._fillFileDownloadUrls));

    return { rows, count };
  }

  static async findAllAutocomplete(search, limit, options: IRepositoryOptions) {
    const currentTenant = MongooseRepository.getCurrentTenant(options);

    let criteriaAnd: Array<any> = [{ tenant: currentTenant.id }];

    if (search) {
      criteriaAnd.push({
        $or: [
          { _id: MongooseQueryUtils.uuid(search) },
          { titre: { $regex: MongooseQueryUtils.escapeRegExp(search), $options: "i" } },
        ],
      });
    }

    const sort = MongooseQueryUtils.sort("titre_ASC");
    const limitEscaped = Number(limit || 0) || undefined;
    const criteria = { $and: criteriaAnd };

    const records = await Futures(options.database)
      .find(criteria)
      .limit(limitEscaped)
      .sort(sort);

    return records.map((record) => ({
      id: record.id,
      label: record.title,
    }));
  }

  static async _createAuditLog(action, id, data, options: IRepositoryOptions) {
  }

  static async _fillFileDownloadUrls(record) {
    if (!record) {
      return null;
    }
    const output = record.toObject ? record.toObject() : record;
    output.photo = await FileRepository.fillDownloadUrl(output.photo);
    return output;
  }

  /**
   * Deterministic win/loss outcome over a rolling window of 5 finalized trades.
   * The position is derived from how many trades the user has already finalized
   * (for the same account type), so the experience follows a fixed cadence:
   *
   *   - Demo: positions 0,1,2 -> profit, 3,4 -> loss   (≈ 3 wins / 2 losses per 5)
   *   - Real: position 2 -> profit, 0,1,3,4 -> loss     (Loss, Loss, Profit, Loss, Loss)
   */
  static decideAutoOutcome(
    finalizedCount: number,
    isDemo: boolean
  ): "profit" | "loss" {
    const pos = (((finalizedCount % 5) + 5) % 5);
    if (isDemo) {
      return pos < 3 ? "profit" : "loss";
    }
    return pos === 2 ? "profit" : "loss";
  }

  /**
   * Finalize a SINGLE trade: decide the outcome (admin override if set, else the
   * deterministic sequence), move the wallet funds exactly once (atomic guard),
   * write the transaction and notify the user. Returns the result object, or
   * null if the trade was already finalized by another path.
   *
   * This is the single source of truth for closing a trade and is shared by the
   * expiry loop and the client-initiated early close.
   */
  static async finalizeRecord(record: any, options: IRepositoryOptions) {
    const now = new Date();

    const FuturesModel = Futures(options.database);
    const WalletModel = Wallet(options.database);
    const TransactionModel = Transaction(options.database);

    const isDemo = record.accountType === 'demo';

    let control: 'profit' | 'loss';
    let descriptionPrefix: string;

    // netAmount    -> the profit or loss magnitude (positive number).
    // walletCredit -> amount returned to the wallet (stake was deducted on open).
    let netAmount: number;
    let walletCredit: number;
    let signedPnl: number;

    if (record.manualOverride && record.pendingControl) {
      // ✅ Apply the decision the admin set earlier. Real accounts ignore the
      // deterministic sequence when an admin has overridden it.
      control = record.pendingControl;
      const amount = Number(record.pendingAmount) || 0;

      if (control === 'profit') {
        netAmount = amount;
        walletCredit = record.futuresAmount + netAmount; // stake + profit
        signedPnl = netAmount;
      } else {
        const cappedLoss = Math.min(Math.abs(amount), record.futuresAmount);
        netAmount = cappedLoss;
        walletCredit = record.futuresAmount - cappedLoss; // refund the rest
        signedPnl = -cappedLoss;
      }

      descriptionPrefix = control === 'profit' ? 'Manual profit' : 'Manual loss';
    } else {
      // Deterministic outcome based on how many trades this user has already
      // finalized for the same account type (see decideAutoOutcome).
      const finalizedCount = await FuturesModel.countDocuments({
        createdBy: record.createdBy,
        tenant: record.tenant,
        accountType: isDemo ? 'demo' : { $ne: 'demo' },
        finalized: true,
      });

      control = FuturesRepository.decideAutoOutcome(finalizedCount, isDemo);

      if (control === 'profit') {
        const profitPct = 0.10 + Math.random() * (0.20 - 0.10);
        netAmount = record.futuresAmount * profitPct;
        walletCredit = record.futuresAmount + netAmount; // stake + profit
        signedPnl = netAmount;
      } else {
        const lossPct = 0.10 + Math.random() * (0.30 - 0.10);
        netAmount = record.futuresAmount * lossPct;
        walletCredit = record.futuresAmount - netAmount; // refund the rest
        signedPnl = -netAmount;
      }

      descriptionPrefix = isDemo
        ? (control === 'profit' ? 'Demo profit' : 'Demo loss')
        : (control === 'profit' ? 'Auto profit' : 'Expired loss');
    }

    const closePrice = FuturesRepository.calculateClosingPrice(
      record.openPositionPrice,
      record.futuresStatus,
      control,
      record.futureCoin || 'BTC/USDT'
    );

    // Atomic guard: only the call that flips finalized false -> true performs
    // the wallet movement, so a trade can never be paid twice.
    const updateResult = await FuturesModel.updateOne(
      { _id: record._id, finalized: false },
      {
        $set: {
          control,
          finalized: true,
          finalizedAt: now,
          closePositionPrice: closePrice,
          closePositionTime: now,
          profitAndLossAmount: signedPnl,
        },
      }
    );

    if (updateResult.modifiedCount === 0) {
      return null;
    }

    const wallet = await WalletModel.findOne({
      user: record.createdBy,
      symbol: "USDT",
      accountType: 'exchange',
      tenant: record.tenant
    });

    if (wallet) {
      // Return the stake + profit (profit) or the surviving stake (loss).
      if (walletCredit > 0) {
        await WalletModel.updateOne(
          { _id: wallet._id },
          { $inc: { amount: walletCredit } }
        );
      }

      await TransactionModel.create({
        type: control === 'profit' ? 'futures_profit' : 'futures_loss',
        referenceId: record._id,
        wallet: wallet._id,
        asset: 'USDT',
        amount: netAmount,
        tradedAmount: record.futuresAmount,
        status: 'completed',
        direction: control === 'profit' ? 'in' : 'out',
        user: record.createdBy,
        tenant: record.tenant,
        dateTransaction: now,
        description: `Futures ${control}: ${netAmount} USDT (${descriptionPrefix})`
      });
    }

    await sendNotification({
      userId: record.createdBy,
      message: `Your futures trade has been closed with ${control === 'profit' ? 'a profit' : 'a loss'} of ${netAmount} USDT`,
      type: "futures",
      options: {
        ...options,
        currentUser: { id: record.createdBy },
        currentTenant: { id: record.tenant }
      }
    });

    return {
      id: String(record._id),
      userId: String(record.createdBy),
      control,
      netAmount,
      profitAndLossAmount: signedPnl,
      closePositionPrice: closePrice,
      closePositionTime: now,
      futuresAmount: record.futuresAmount,
    };
  }

  static async autoFinalizeExpired(options: IRepositoryOptions) {
    const now = new Date();
    const FuturesModel = Futures(options.database);

    // Only finalize trades whose contract duration has actually ended. The
    // result (and the wallet movement) is applied exactly at expiry, never
    // before — this is the single source of truth for closing a trade.
    const candidates = await FuturesModel.find({
      finalized: false,
      expiryTime: { $lte: now }
    })
    .limit(1000)
    .lean();

    if (candidates.length === 0) {
      return { processed: 0, results: [] as any[] };
    }

    let processedCount = 0;
    const results: any[] = [];

    for (const record of candidates) {
      try {
        const result = await FuturesRepository.finalizeRecord(record, options);
        if (result) {
          results.push(result);
          processedCount++;
        }
      } catch (err) {
        console.error(`Error processing future ${record._id}:`, err);
      }
    }

    return { processed: processedCount, results };
  }

  static calculateClosingPrice(
    openPrice: number,
    direction: "long" | "short",
    control: "profit" | "loss",
    assetType: string
  ): number {
    const basePrice = openPrice;
    const randomPercentage = 0.002 + Math.random() * (0.005 - 0.002);
    const change = basePrice * (randomPercentage / 100);

    if (control === "profit") {
      if (direction === "long") {
        return basePrice + change;
      } else {
        return basePrice - change;
      }
    } else {
      if (direction === "long") {
        return basePrice - change;
      } else {
        return basePrice + change;
      }
    }
  }

  static calculateProfit(
    amount: number,
    leverage: number | string,

  ): number {
    const amountNum = Number(amount) || 0;
    const leverageNum = parseFloat(leverage?.toString() || "0");
    return (amountNum * leverageNum ) / 100;
  }

  static async parseDurationToMs(duration: string | number | undefined) {
    if (duration == null) return 0;
    if (typeof duration === "number") return duration * 1000;
    if (typeof duration !== "string") return 0;

    const trimmed = duration.trim().toLowerCase();

    if (/^\d+$/.test(trimmed)) {
      return parseInt(trimmed, 10) * 1000;
    }

    const m = trimmed.match(/^(\d+)(s|m|h|d)?$/);
    if (!m) return 0;

    const v = Number(m[1]);
    const unit = m[2] || "s";

    switch (unit) {
      case "s": return v * 1000;
      case "m": return v * 60 * 1000;
      case "h": return v * 60 * 60 * 1000;
      case "d": return v * 24 * 60 * 60 * 1000;
      default: return v * 1000;
    }
  }
}

export default FuturesRepository;
