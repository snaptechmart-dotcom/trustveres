import { NextResponse } from "next/server";
import connectDB from "@/app/lib/mongodb";
import History from "@/app/models/History";

export async function POST(req: Request) {
  try {
    await connectDB();

    const { id } = await req.json();
    if (!id) {
      return NextResponse.json(
        { success: false, message: "ID is required" },
        { status: 400 }
      );
    }

    const deleted = await History.findByIdAndDelete(id);

    if (!deleted) {
      return NextResponse.json(
        { success: false, message: "Record not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("❌ DELETE HISTORY ERROR:", error);
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}
