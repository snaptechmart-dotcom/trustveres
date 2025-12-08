import { NextResponse } from "next/server";
import { connectDB } from "@/app/lib/mongodb";
import { History } from "@/app/models/History";

export async function GET() {
  try {
    await connectDB();

    const allHistory = await History.find().lean();

    return NextResponse.json(allHistory);
  } catch (error) {
    console.error("History Fetch Error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
