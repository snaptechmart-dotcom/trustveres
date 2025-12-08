import { NextResponse } from "next/server";
import { connectDB } from "@/app/lib/mongodb";
import History from "@/app/models/History";

export async function POST(req: Request) {
  try {
    await connectDB();

    const body = await req.json();
    const { id } = body;

    if (!id) {
      return NextResponse.json({ error: "History ID required" }, { status: 400 });
    }

    await History.findByIdAndDelete(id);

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("delete-history error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
