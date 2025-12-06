import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: { type: String },

    email: { type: String, unique: true, required: true },

    password: { type: String, required: true },

    // ⭐ CURRENT ACTIVE PLAN
    plan: {
      type: String,
      enum: ["free", "prelaunch", "essential", "pro", "enterprise"],
      default: "free",
    },

    // ⭐ PLAN EXPIRY DATE (for monthly/yearly subscriptions)
    planValidTill: {
      type: Date,
      default: null,
    },

    // ⭐ USAGE LIMIT TRACKING (per billing cycle)
    trustChecksUsed: {
      type: Number,
      default: 0,
    },

    reportsUsed: {
      type: Number,
      default: 0,
    },

    // ⭐ Razorpay Subscription ID
    subscriptionId: {
      type: String,
      default: null,
    },

    // ⭐ Razorpay Payment ID (optional: last payment)
    lastPaymentId: {
      type: String,
      default: null,
    },

    // ⭐ Subscription status
    subscriptionStatus: {
      type: String,
      enum: ["active", "cancelled", "paused", "inactive"],
      default: "inactive",
    },
  },
  { timestamps: true }
);

export default mongoose.models.User || mongoose.model("User", UserSchema);
