import mongoose, { Schema, models } from "mongoose";

const HistorySchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User" },
    name: String,
    info: String,
    score: Number,
    analysis: String,
  },
  { timestamps: true }
);

// This ensures model is created only once
export const History = models.History || mongoose.model("History", HistorySchema);
