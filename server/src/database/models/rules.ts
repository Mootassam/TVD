import mongoose from "mongoose";
import FileSchema from "./schemas/fileSchema";
const Schema = mongoose.Schema;

export default (database) => {
  try {
    return database.model("rules");
  } catch (error) {
    // continue, because model doesnt exist
  }

  const RulesSchema = new Schema(
    {
      question: {
        type: String,
      },
      description: {
        type: String,
      },
      enabled: {
        type: Boolean,
        default: true,
      },
      // Customers (users) for whom this rule is hidden. The rule stays global
      // for everyone else; only these users won't see it on the Support page.
      disabledFor: [
        {
          type: Schema.Types.ObjectId,
          ref: "user",
        },
      ],

      // Customers (users) for whom this rule is explicitly enabled (whitelist).
      // These users see the rule even when it is globally disabled. Useful to
      // expose a rule to a few selected customers only.
      enabledFor: [
        {
          type: Schema.Types.ObjectId,
          ref: "user",
        },
      ],

      tenant: {
        type: Schema.Types.ObjectId,
        ref: "tenant",
        required: true,
      },
      createdBy: {
        type: Schema.Types.ObjectId,
        ref: "user",
      },
      updatedBy: {
        type: Schema.Types.ObjectId,
        ref: "user",
      },
      importHash: { type: String },
    },
    { timestamps: true }
  );

  RulesSchema.index(
    { importHash: 1, tenant: 1 },
    {
      unique: true,
      partialFilterExpression: {
        importHash: { $type: "string" },
      },
    }
  );

  RulesSchema.virtual("id").get(function () {
    // @ts-ignore
    return this._id.toHexString();
  });

  RulesSchema.set("toJSON", {
    getters: true,
  });

  RulesSchema.set("toObject", {
    getters: true,
  });

  return database.model("rules", RulesSchema);
};
