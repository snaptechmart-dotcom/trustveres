import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { name, info } = await req.json();

    if (!name || !info) {
      return NextResponse.json(
        { error: "Name and information are required" },
        { status: 400 }
      );
    }

    // 🔥 ADVANCED AI LOGIC (Offline pseudo-GPT reasoning)

    const positiveWords = ["verified", "genuine", "authentic", "trusted", "secure"];
    const negativeWords = ["fraud", "scam", "fake", "spam", "suspicious", "risky"];
    
    let positivity = 0;
    let negativity = 0;

    positiveWords.forEach(w => {
      if (info.toLowerCase().includes(w)) positivity += 1;
    });

    negativeWords.forEach(w => {
      if (info.toLowerCase().includes(w)) negativity += 1;
    });

    const scamProbability = Math.min(95, negativity * 20);
    const trustScore = Math.max(5, 90 - scamProbability + positivity * 5);

    const insights = [];

    if (negativity > 0) insights.push("⚠ Some negative keywords detected in the profile.");
    if (positivity > 0) insights.push("✔ Positive reputation markers found.");
    if (info.length > 200) insights.push("✔ Detailed information increases trust signal.");
    if (info.length < 50) insights.push("⚠ Very short description reduces trust confidence.");

    const verdict =
      trustScore > 80
        ? "Highly Trustworthy"
        : trustScore > 60
        ? "Moderately Trustworthy"
        : "Low Trust – Needs Deep Verification";

    return NextResponse.json({
      name,
      trustScore,
      scamProbability,
      insights,
      verdict,
    });

  } catch (e) {
    return NextResponse.json({ error: "Server Error" }, { status: 500 });
  }
}
