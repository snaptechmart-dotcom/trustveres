import mongoose from "mongoose";

const HistorySchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    name: String,
    info: String,
    score: Number,
    analysis: String,
  },
  { timestamps: true }
);

export default mongoose.models.History ||
  mongoose.model("History", HistorySchema);
