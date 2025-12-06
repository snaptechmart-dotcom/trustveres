"use client";

import { useState } from "react";

export default function TrustScoreTool() {
  const [name, setName] = useState("");
  const [info, setInfo] = useState("");
  const [score, setScore] = useState<number | null>(null);
  const [analysis, setAnalysis] = useState("");
  const [advanced, setAdvanced] = useState<any>(null);

  // -----------------------------
  // ⭐ BASIC TRUST SCORE API + USAGE UPDATE
  // -----------------------------
  const generateScore = async () => {
    // 1️⃣ Basic trust score request
    const response = await fetch("/api/trust-score", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, info }),
    });

    const data = await response.json();
    setScore(data.score);
    setAnalysis(data.analysis);

    // 2️⃣ ⭐ Usage Update API → trust check +1
    await fetch("/api/usage/update", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type: "trust" }),
    });
  };

  // -----------------------------
  // ⭐ ADVANCED AI ANALYSIS API + USAGE UPDATE
  // -----------------------------
  const runAdvancedAI = async () => {
    // 1️⃣ Generate advanced report
    const response = await fetch("/api/advanced-analysis", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, info }),
    });

    const data = await response.json();
    setAdvanced(data);

    // 2️⃣ ⭐ Usage Update API → report usage +1
    await fetch("/api/usage/update", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type: "report" }),
    });
  };

  return (
    <div className="max-w-2xl mx-auto p-6">

      {/* TOOL TITLE */}
      <h1 className="text-3xl font-bold mb-6">Trust Score Generator</h1>

      {/* INPUTS */}
      <label className="font-semibold">Name</label>
      <input
        className="w-full p-3 border rounded mt-2 mb-4"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <label className="font-semibold">Information</label>
      <textarea
        className="w-full p-3 border rounded mt-2 mb-4 h-32"
        value={info}
        onChange={(e) => setInfo(e.target.value)}
      ></textarea>

      {/* BUTTON */}
      <button
        onClick={generateScore}
        className="w-full mb-6 px-4 py-3 bg-black text-white font-semibold rounded"
      >
        Generate Trust Score
      </button>

      {/* BASIC SCORE RESULT */}
      {score !== null && (
        <div className="p-4 border rounded bg-white shadow">
          <h2 className="text-xl font-bold">Basic Trust Score</h2>
          <p className="text-2xl font-bold mt-2">{score}/100</p>
          <p className="mt-2">{analysis}</p>
        </div>
      )}

      {/* ADVANCED AI SECTION */}
      <div className="mt-10 bg-white p-6 shadow rounded-xl border">
        <h2 className="text-xl font-bold">Advanced AI Trust Analysis</h2>

        <button
          onClick={runAdvancedAI}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
        >
          Generate Advanced Analysis
        </button>

        {advanced && (
          <div className="mt-4">
            <p>
              <b>Verdict:</b> {advanced.verdict}
            </p>

            <p>
              <b>Scam Probability:</b> {advanced.scamProbability}%
            </p>

            <p>
              <b>Advanced Trust Score:</b> {advanced.trustScore}/100
            </p>

            <h3 className="mt-3 font-semibold">AI Insights:</h3>
            <ul className="list-disc pl-6 mt-2">
              {advanced.insights.map((i: string, index: number) => (
                <li key={index}>{i}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
