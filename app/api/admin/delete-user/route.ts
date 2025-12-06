import { NextResponse } from "next/server";
import connectDB from "@/app/lib/mongodb";
import User from "@/app/models/User";
import History from "@/app/models/History";

export async function POST(req: Request) {
  try {
    await connectDB();

    const body = await req.json();
    const { id } = body;

    if (!id) {
      return NextResponse.json({ error: "User ID required" }, { status: 400 });
    }

    // Delete user
    await User.findByIdAndDelete(id);

    // Also delete all history entries for this user
    await History.deleteMany({ userId: id });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("delete-user error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
