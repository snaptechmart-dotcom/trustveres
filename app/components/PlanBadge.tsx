import React from "react";

export default function PlanBadge({ plan }: { plan?: string }) {
  const p = (plan || "free").toLowerCase();
  const bg =
    p === "prelaunch"
      ? "bg-yellow-400 text-black"
      : p === "pro"
      ? "bg-cyan-500"
      : p === "essential"
      ? "bg-green-500"
      : p === "enterprise"
      ? "bg-indigo-600"
      : "bg-gray-600";

  return (
    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${bg}`}>
      {p === "prelaunch" ? "Pre-Launch" : p.charAt(0).toUpperCase() + p.slice(1)}
    </span>
  );
}
