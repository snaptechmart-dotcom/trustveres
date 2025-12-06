// app/api/phone-check/route.ts
import { NextResponse } from "next/server";
import connectDB from "@/app/lib/mongodb";
import History from "@/app/models/History";
import jwt from "jsonwebtoken";

type Body = {
  phone?: string;
  country?: string; // optional
};

function normalizeNumber(raw?: string) {
  if (!raw) return null;
  // remove spaces, parentheses, dashes
  const cleaned = raw.replace(/[\s()-]+/g, "");
  // ensure starts with + or digits only
  if (/^\+?\d{7,15}$/.test(cleaned)) return cleaned;
  // try to remove leading zeros
  const cleaned2 = cleaned.replace(/^0+/, "");
  if (/^\+?\d{7,15}$/.test(cleaned2)) return cleaned2;
  return null;
}

function calculatePhoneHeuristics(phone: string) {
  // Basic signals
  const digits = phone.replace(/\D/g, "");
  const len = digits.length;

  // repeated digits / sequences
  const repeatedDigits = (digits.match(/(.)\1{3,}/g) || []).length; // groups of 4+ same digit
  const manyZeros = (digits.match(/0/g) || []).length >= Math.floor(len / 3);
  const mostlySame = new Set(digits).size <= 2; // e.g., 11112222

  // sequential check (increasing or decreasing runs length 4+)
  let hasSeq = false;
  for (let i = 0; i + 3 < digits.length; i++) {
    const slice = digits.slice(i, i + 4);
    const asc = slice
      .split("")
      .every((c, idx, arr) => idx === 0 || +c === +arr[idx - 1] + 1);
    const desc = slice
      .split("")
      .every((c, idx, arr) => idx === 0 || +c === +arr[idx - 1] - 1);
    if (asc || desc) {
      hasSeq = true;
      break;
    }
  }

  // suspicious prefix heuristics (not claiming specifics; generic)
  const prefix = digits.slice(0, 4);
  let prefixRisk = 0;
  // heuristics examples: many marketing / short-code like patterns (length < 8 high risk),
  if (len < 8) prefixRisk += 15;
  if (prefix.startsWith("000") || prefix.startsWith("123") || prefix.startsWith("999"))
    prefixRisk += 10;

  // base score (higher = more trustworthy)
  let score = 60;

  if (len < 8) score -= 20;
  if (len >= 10 && len <= 13) score += 5;
  if (repeatedDigits) score -= repeatedDigits * 10;
  if (manyZeros) score -= 10;
  if (mostlySame) score -= 20;
  if (hasSeq) score -= 8;
  score -= prefixRisk;

  // small noise to avoid identical outputs
  score += Math.floor(Math.random() * 9) - 4;

  // clamp
  score = Math.max(3, Math.min(98, Math.round(score)));

  // scam probability
  const scamProbability = Math.max(1, 100 - score);

  // risk level
  const riskLevel =
    score > 75 ? "Low" : score > 50 ? "Medium" : score > 30 ? "High" : "Very High";

  // flags
  const flags: string[] = [];
  if (repeatedDigits) flags.push("Repeated digit sequences found (possible auto/robocall numbers).");
  if (manyZeros) flags.push("Large number of zeros present.");
  if (mostlySame) flags.push("Low digit variety — may indicate temporary/auto numbers.");
  if (hasSeq) flags.push("Sequential digits detected.");
  if (len < 8) flags.push("Unusually short number length for a normal mobile number.");
  if (prefixRisk >= 10) flags.push("Suspicious number prefix pattern.");

  if (flags.length === 0) flags.push("No clear red flags detected from handle pattern analysis.");

  const recommendations = [
    "Try calling the number once from a disposable number to check behavior.",
    "Search the full number (with country code) in web and social results.",
    "If receiving requests for money/OTP, treat as high risk and block.",
  ];

  return {
    score,
    scamProbability,
    riskLevel,
    flags,
    recommendations,
    length: len,
  };
}

export async function POST(req: Request) {
  try {
    await connectDB();

    const body: Body = await req.json();
    const rawPhone = body.phone;
    const country = body.country || "";

    const normalized = normalizeNumber(rawPhone);

    if (!normalized) {
      return NextResponse.json({ error: "Invalid phone number format" }, { status: 400 });
    }

    const heur = calculatePhoneHeuristics(normalized);

    // Compose analysis object for response
    const analysis = {
      phone: normalized,
      country,
      trustScore: heur.score,
      scamProbability: heur.scamProbability,
      riskLevel: heur.riskLevel,
      length: heur.length,
      flags: heur.flags,
      recommendations: heur.recommendations,
      generatedAt: new Date().toISOString(),
    };

    // Attempt to attach userId from token (if logged in)
    let userId = null;
    try {
      const token = req.headers.get("cookie")?.split("token=")[1]?.split(";")[0];
      if (token) {
        const decoded: any = jwt.decode(token);
        userId = decoded?.id || null;
      }
    } catch (e) {
      // ignore decoding errors
    }

    // Save to History so it appears in History & charts
    const historyRecord = await History.create({
      userId,
      name: normalized,
      info: `Phone check for ${normalized} (${country || "unknown"})`,
      score: heur.score,
      analysis: JSON.stringify({
        scamProbability: heur.scamProbability,
        riskLevel: heur.riskLevel,
        flags: heur.flags,
        recommendations: heur.recommendations,
      }),
    });

    // Return analysis + history id
    return NextResponse.json({ analysis, historyId: historyRecord._id });
  } catch (err) {
    console.error("phone-check error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
