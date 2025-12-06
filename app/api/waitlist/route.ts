// app/api/waitlist/route.ts
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { email } = await req.json();
    if (!email || typeof email !== "string" || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }

    // TODO: Save to DB (MongoDB) or send to Google Sheets / Mailchimp.
    // For now just log on server and return success.
    console.log("Waitlist signup:", email, "time:", new Date().toISOString());

    return NextResponse.json({ ok: true, message: "Added to waitlist" });
  } catch (err) {
    console.error("waitlist error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
