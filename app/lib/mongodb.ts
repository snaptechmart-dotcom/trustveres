import mongoose from "mongoose";

let isConnected = false;

export default async function connectDB() {
  if (isConnected) {
    console.log("MongoDB already connected");
    return;
  }

  const uri = process.env.MONGODB_URI;

  if (!uri) {
    throw new Error("❌ MONGODB_URI is missing in .env.local");
  }

  try {
    const db = await mongoose.connect(uri);
    isConnected = true;
    console.log("✅ MongoDB Connected");
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error);
    throw error;
  }
}
