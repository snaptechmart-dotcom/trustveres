import { NextResponse } from "next/server";
import { connectDB } from "@/app/lib/mongodb";
import { History } from "@/app/models/History"; // ✔ Correct import

export async function GET() {
  try {
    await connectDB();

    // ✔ History.find() हमेशा काम करेगा (model सही export हो तो)
    const allHistory = await History.find().lean();

    return NextResponse.json(allHistory);
  } catch (error) {
    console.error("History Fetch Error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
