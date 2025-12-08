import { NextResponse } from "next/server";
import { connectDB } from "@/app/lib/mongodb";
import History from "@/app/models/History";

export async function GET() {
  try {
    await connectDB();

    // Fetch all history records sorted by latest
    const items = await History.find().sort({ createdAt: -1 });

    return NextResponse.json({ items });
  } catch (error) {
    return NextResponse.json(
      { error: "Server error while loading history" },
      { status: 500 }
    );
  }
}
