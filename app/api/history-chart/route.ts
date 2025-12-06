import { NextResponse } from "next/server";
import connectDB from "@/app/lib/mongodb";
import History from "@/app/models/History";
import jwt from "jsonwebtoken";

export async function GET(req: Request) {
  try {
    await connectDB();

    // Read user token
    const token = req.headers.get("cookie")?.split("token=")[1]?.split(";")[0];
    const decoded: any = jwt.decode(token);

    if (!decoded?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Fetch last 20 scores
    const items = await History.find({ userId: decoded.id })
      .sort({ createdAt: -1 })
      .limit(20);

    // Prepare chart data
    const labels = items.map((i) =>
      new Date(i.createdAt).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      })
    );

    const scores = items.map((i) => i.score);

    return NextResponse.json({ labels, scores });
  } catch (e) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
