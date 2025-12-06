"use client";

import { useEffect, useState } from "react";

export default function HistoryPage() {
  const [items, setItems] = useState([]);

  // FETCH HISTORY FROM API
  useEffect(() => {
    fetch("/api/history")
      .then((res) => res.json())
      .then((data) => setItems(data.history));
  }, []);

  // DOWNLOAD REPORT FUNCTION
  const downloadReport = async (id: string) => {
    const res = await fetch("/api/generate-report", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ scoreId: id }),
    });

    const blob = await res.blob();
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "trust_report.pdf";
    a.click();

    window.URL.revokeObjectURL(url);
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Trust Score History</h1>

      <table className="w-full bg-white border rounded-xl shadow">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-3 border">Name</th>
            <th className="p-3 border">Score</th>
            <th className="p-3 border">Analysis</th>
            <th className="p-3 border">Date</th>
            <th className="p-3 border">Report</th>
          </tr>
        </thead>

        <tbody>
          {items.map((item: any, index) => (
            <tr key={index} className="text-center">
              <td className="p-3 border">{item.name}</td>
              <td className="p-3 border font-bold">{item.score}</td>
              <td className="p-3 border">{item.analysis}</td>
              <td className="p-3 border">
                {new Date(item.createdAt).toLocaleString()}
              </td>

              <td className="p-3 border">
                <button
                  onClick={() => downloadReport(item._id)}
                  className="px-3 py-1 bg-black text-white rounded"
                >
                  Download PDF
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
