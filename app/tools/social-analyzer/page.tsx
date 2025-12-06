// app/tools/social-analyzer/page.tsx
"use client";

import { useState } from "react";

export default function SocialAnalyzer() {
  const [platform, setPlatform] = useState("Instagram");
  const [handle, setHandle] = useState("");
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const analyze = async () => {
    if (!handle.trim()) {
      alert("Please enter a handle/username");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/social-analyzer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ platform, handle }),
      });
      const data = await res.json();
      if (data.error) {
        alert(data.error);
      } else {
        setResult(data.analysis);
      }
    } catch (e) {
      console.error(e);
      alert("Server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">Social Analyzer</h1>

      <div className="bg-white p-6 rounded-xl shadow border">
        <label className="block font-semibold">Platform</label>
        <select
          value={platform}
          onChange={(e) => setPlatform(e.target.value)}
          className="w-full p-3 border rounded mt-2 mb-4"
        >
          <option>Instagram</option>
          <option>Twitter/X</option>
          <option>LinkedIn</option>
          <option>Facebook</option>
          <option>YouTube</option>
          <option>Telegram</option>
          <option>Other</option>
        </select>

        <label className="block font-semibold">Handle / Username</label>
        <input
          value={handle}
          onChange={(e) => setHandle(e.target.value)}
          className="w-full p-3 border rounded mt-2 mb-4"
          placeholder="e.g. @company_official or username123"
        />

        <div className="flex gap-4">
          <button
            onClick={analyze}
            className="px-4 py-2 bg-black text-white rounded"
            disabled={loading}
          >
            {loading ? "Analyzing..." : "Analyze"}
          </button>

          <button
            onClick={() => {
              setHandle("");
              setResult(null);
            }}
            className="px-4 py-2 border rounded"
          >
            Reset
          </button>
        </div>
      </div>

      {result && (
        <div className="mt-6 bg-white p-6 rounded-xl shadow border">
          <h2 className="text-2xl font-bold mb-2">Analysis Result</h2>

          <div className="mb-3">
            <b>Platform:</b> {result.platform}
          </div>

          <div className="mb-3">
            <b>Handle:</b> {result.handle}
          </div>

          <div className="mb-3">
            <b>Trust Score:</b>{" "}
            <span className="text-2xl font-bold">{result.score}/100</span>
          </div>

          <div className="mb-3">
            <b>Scam Probability:</b> {result.scamProbability}%
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

          <div className="mt-4 flex gap-3">
            <button
              onClick={() => {
                // optionally scroll to history or show more options
                window.location.href = "/dashboard/history";
              }}
              className="px-4 py-2 bg-gray-800 text-white rounded"
            >
              View History
            </button>

            <button
              onClick={() => {
                // quick copy json
                navigator.clipboard.writeText(JSON.stringify(result, null, 2));
                alert("Analysis copied to clipboard");
              }}
              className="px-4 py-2 border rounded"
            >
              Copy JSON
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
