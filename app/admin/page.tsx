"use client";

import { useEffect, useState } from "react";

export default function AdminDashboard() {
  const [stats, setStats] = useState<any>(null);

  useEffect(() => {
    fetch("/api/admin/stats")
      .then(res => res.json())
      .then(data => setStats(data));
  }, []);

  if (!stats) return <p>Loading...</p>;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Admin Overview</h2>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="p-6 bg-white rounded-xl shadow border">
          <h3 className="text-xl font-bold">Total Users</h3>
          <p className="text-3xl font-bold">{stats.totalUsers}</p>
        </div>

        <div className="p-6 bg-white rounded-xl shadow border">
          <h3 className="text-xl font-bold">Total Scans</h3>
          <p className="text-3xl font-bold">{stats.totalHistory}</p>
        </div>

        <div className="p-6 bg-white rounded-xl shadow border">
          <h3 className="text-xl font-bold">Recent Activity</h3>
          <p className="text-gray-600">{stats.recent} scans today</p>
        </div>
      </div>
    </div>
  );
}
