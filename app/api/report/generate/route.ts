import { NextResponse } from "next/server";
import dbConnect from "@/app/lib/dbConnect";
import User from "@/app/models/User";
import jwt from "jsonwebtoken";

export async function POST(req: Request) {
  try {
    await dbConnect();

    const body = await req.json();
    const { name, info } = body;

    // 1) Read token
    const cookieHeader = req.headers.get("cookie");
    if (!cookieHeader) {
      return NextResponse.json({ error: "No token received" }, { status: 401 });
    }

    const token = cookieHeader.split("token=")[1];
    if (!token) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }

    // 2) Decode user
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);
    const userId = decoded.userId;

    // 3) Find user
    const user = await User.findById(userId);
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // 4) BASIC AI REPORT (DEMO)
    // Later you can replace with actual PDF builder
    const reportData = {
      name,
      info,
      trustScore: Math.floor(Math.random() * 40) + 60,
      scamChance: Math.floor(Math.random() * 30),
      insights: [
        "User behaviour looks normal",
        "No major scam patterns detected",
        "Recommended to verify social profile",
      ],
    };

    // 5) Fake PDF URL (later real PDF upload)
    const pdfUrl = `https://trustverse.ai/reports/${Date.now()}-${userId}.pdf`;
    const filename = `report-${Date.now()}.pdf`;

    // ⭐⭐⭐ STEP 6 — PART C (IMPORTANT)
    // Report usage +1
    await fetch("http://localhost:3000/api/usage/update", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type: "report" }),
    });

    // 6) Return final response
    return NextResponse.json({
      success: true,
      message: "PDF generated successfully",
      report: reportData,
      pdfUrl,
      filename,
    });
  } catch (err) {
    console.error("REPORT ERROR", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
