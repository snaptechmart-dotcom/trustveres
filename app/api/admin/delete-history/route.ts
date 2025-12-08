import { NextResponse } from "next/server";
import { connectDB } from "@/app/lib/mongodb";
import { History } from "@/app/models/History"; // ✔ Correct import

export async function POST(req: Request) {
  try {
    await connectDB();

    const { id } = await req.json();

    const deleted = await History.findByIdAndDelete(id); // ✔ Now works

    if (!deleted) {
      return NextResponse.json({ success: false, message: "Not found" });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("DELETE ERROR:", err);
    return NextResponse.json({ success: false });
  }
}
