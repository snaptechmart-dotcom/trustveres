import { NextResponse } from "next/server";
import connectDB from "@/app/lib/mongodb";
import User from "@/app/models/User";
import History from "@/app/models/History";

export async function GET() {
  try {
    await connectDB();

    const totalUsers = await User.countDocuments();
    const totalHistory = await History.countDocuments();

    // Today’s date for recent scans
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const recent = await History.countDocuments({
      createdAt: { $gte: today },
    });

    return NextResponse.json({
      totalUsers,
      totalHistory,
      recent,
    });
  } catch (err) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
