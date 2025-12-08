import mongoose, { Schema, model, models } from "mongoose";

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

// FIX: model ko correct type ke saath export karo
export const History = models.History || model("History", HistorySchema);
