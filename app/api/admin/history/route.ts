import { NextResponse } from "next/server";
import { connectDB } from "@/app/lib/mongodb";
import History from "@/app/models/History";

export async function GET() {
  try {
    await connectDB();

    const allHistory = await History.find({}).lean();

    return NextResponse.json(allHistory);
  } catch (error) {
    console.error("ADMIN HISTORY ERROR:", error);
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}
