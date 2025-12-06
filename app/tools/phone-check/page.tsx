// app/tools/phone-check/page.tsx
"use client";

import { useState } from "react";

export default function PhoneCheckTool() {
  const [phone, setPhone] = useState("");
  const [country, setCountry] = useState("");
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const analyze = async () => {
    if (!phone.trim()) {
      alert("Please enter phone number (with or without +country code).");
      return;
    }
    setLoading(true);
    setResult(null);

    try {
      const res = await fetch("/api/phone-check", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone, country }),
      });
      const data = await res.json();
      if (data.error) {
        alert(data.error);
      } else {
        setResult(data.analysis);
        // optionally show toast: saved to history with id data.historyId
      }
    } catch (e) {
      console.error(e);
      alert("Server error");
    } finally {
      setLoading(false);
    }
  };

  const copyJSON = () => {
    if (!result) return;
    navigator.clipboard.writeText(JSON.stringify(result, null, 2));
    alert("Analysis copied to clipboard");
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">Phone Reputation Checker</h1>

      <div className="bg-white p-6 rounded-xl shadow border mb-6">
        <label className="block font-semibold">Phone number</label>
        <input
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="+91 98765 43210 or 9876543210"
          className="w-full p-3 border rounded mt-2 mb-4"
        />

        <label className="block font-semibold">Country (optional)</label>
        <input
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          placeholder="India or +91 (optional)"
          className="w-full p-3 border rounded mt-2 mb-4"
        />

        <div className="flex gap-3">
          <button
            onClick={analyze}
            disabled={loading}
            className="px-4 py-2 bg-black text-white rounded"
          >
            {loading ? "Analyzing..." : "Analyze Number"}
          </button>

          <button
            onClick={() => {
              setPhone("");
              setCountry("");
              setResult(null);
            }}
            className="px-4 py-2 border rounded"
          >
            Reset
          </button>

          <button
            onClick={() => (window.location.href = "/dashboard/history")}
            className="px-4 py-2 bg-gray-800 text-white rounded"
          >
            View History
          </button>
        </div>
      </div>

      {result && (
        <div className="bg-white p-6 rounded-xl shadow border">
          <h2 className="text-2xl font-bold mb-2">Analysis Result</h2>

          <div className="mb-2">
            <b>Phone:</b> {result.phone}
          </div>

          <div className="mb-2">
            <b>Trust Score:</b>{" "}
            <span className="text-2xl font-bold">{result.trustScore}/100</span>
          </div>

          <div className="mb-2">
            <b>Scam Probability:</b> {result.scamProbability}%
          </div>

          <div className="mb-2">
            <b>Risk Level:</b> {result.riskLevel}
          </div>

          <div className="mb-3">
            <b>Flags:</b>
            <ul className="list-disc pl-6 mt-1">
              {result.flags.map((f: string, i: number) => (
                <li key={i}>{f}</li>
              ))}
            </ul>
          </div>

          <div className="mb-3">
            <b>Recommendations:</b>
            <ul className="list-disc pl-6 mt-1">
              {result.recommendations.map((r: string, i: number) => (
                <li key={i}>{r}</li>
              ))}
            </ul>
          </div>

          <div className="flex gap-3 mt-4">
            <button
              onClick={copyJSON}
              className="px-4 py-2 border rounded"
            >
              Copy JSON
            </button>

            <button
              onClick={() => {
                // quick download of JSON file
                const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(result, null, 2));
                const a = document.createElement("a");
                a.href = dataStr;
                a.download = "phone_analysis.json";
                a.click();
              }}
              className="px-4 py-2 bg-gray-800 text-white rounded"
            >
              Download JSON
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
