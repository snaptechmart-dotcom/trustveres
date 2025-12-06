"use client";
import { useEffect, useState } from "react";

export default function AdminHistoryPage() {
  const [items, setItems] = useState([]);

  // Load history
  const loadHistory = async () => {
    const res = await fetch("/api/admin/history");
    const data = await res.json();
    setItems(data.items || []);
  };

  // Delete history record
  const deleteHistory = async (id) => {
    if (!confirm("Delete this history record?")) return;

    await fetch("/api/admin/delete-history", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });

    loadHistory();
  };

  useEffect(() => {
    loadHistory();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Admin – History</h1>

      {items.length === 0 && <p className="mt-4">No history yet.</p>}

      {items.map((item) => (
        <div
          key={item._id}
          className="border p-3 mt-4 rounded shadow-sm bg-white"
        >
          <p><strong>User ID:</strong> {item.userId}</p>
          <p><strong>Score:</strong> {item.score}</p>
          <p><strong>Analysis:</strong> {item.analysis}</p>

          <button
            onClick={() => deleteHistory(item._id)}
            className="mt-2 px-3 py-1 bg-red-600 text-white rounded"
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}
