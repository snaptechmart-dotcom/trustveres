// app/tools/page.tsx
"use client";

import Link from "next/link";

export default function ToolsPage() {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Trustverse AI Tools</h1>

      {/* GRID OF TOOLS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

        {/* Trust Score Tool */}
        <Link href="/tools/trust-score">
          <div className="p-6 bg-white border rounded-xl shadow hover:shadow-lg transition cursor-pointer">
            <h2 className="text-xl font-bold mb-2">Trust Score Checker</h2>
            <p className="text-gray-600 text-sm">
              Generate AI-based trust score with analysis.
            </p>
          </div>
        </Link>

        {/* Advanced AI Analysis */}
        <Link href="/tools/trust-score#advanced">
          <div className="p-6 bg-white border rounded-xl shadow hover:shadow-lg transition cursor-pointer">
            <h2 className="text-xl font-bold mb-2">Advanced AI Analysis</h2>
            <p className="text-gray-600 text-sm">
              Deep AI reasoning: red flags, insights, scam probability.
            </p>
          </div>
        </Link>

        {/* Social Media Analyzer */}
        <Link href="/tools/social-analyzer">
          <div className="p-6 bg-white border rounded-xl shadow hover:shadow-lg transition cursor-pointer">
            <h2 className="text-xl font-bold mb-2">Social Media Analyzer</h2>
            <p className="text-gray-600 text-sm">
              Check if Instagram/FB/Twitter users look suspicious or trusted.
            </p>
          </div>
        </Link>

        {/* Phone Number Checker */}
        <Link href="/tools/phone-check">
          <div className="p-6 bg-white border rounded-xl shadow hover:shadow-lg transition cursor-pointer">
            <h2 className="text-xl font-bold mb-2">Phone Number Checker</h2>
            <p className="text-gray-600 text-sm">
              Analyze phone number patterns and detect fraud probability.
            </p>
          </div>
        </Link>

        {/* Report History */}
        <Link href="/dashboard/history">
          <div className="p-6 bg-white border rounded-xl shadow hover:shadow-lg transition cursor-pointer">
            <h2 className="text-xl font-bold mb-2">Report History</h2>
            <p className="text-gray-600 text-sm">
              View all trust checks and download PDF reports.
            </p>
          </div>
        </Link>

      </div>
    </div>
  );
}
