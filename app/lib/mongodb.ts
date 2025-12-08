import mongoose from "mongoose";

let isConnected = false; // Track connection state

export async function connectDB() {
  if (isConnected) {
    return;
  }

  if (!process.env.MONGODB_URI) {
    throw new Error("❌ MONGODB_URI is missing in environment variables");
  }

  try {
    const db = await mongoose.connect(process.env.MONGODB_URI, {
      dbName: "trustverse",
    });

    isConnected = db.connections[0].readyState === 1;
    console.log("✅ MongoDB Connected Successfully");
  } catch (error) {
    console.error("❌ MongoDB Connection Error:", error);
    throw new Error("Database connection failed");
  }
}
