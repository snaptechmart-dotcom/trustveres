import React from "react";

export default function UsageCard({
  title,
  used,
  limit,
  description,
}: {
  title: string;
  used: number | string;
  limit: number | string;
  description?: string;
}) {
  const percent =
    typeof used === "number" && typeof limit === "number" && limit > 0
      ? Math.min(100, Math.round((used / limit) * 100))
      : null;

  return (
    <div className="bg-gray-800 p-6 rounded-2xl shadow border border-gray-700">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-bold">{title}</h3>
          {description && <p className="text-gray-400 text-sm mt-1">{description}</p>}
        </div>
        <div className="text-right">
          <div className="text-2xl font-extrabold">{used}/{limit}</div>
          {percent !== null && (
            <div className="text-sm text-gray-300 mt-1">{percent}% used</div>
          )}
        </div>
      </div>

      {percent !== null && (
        <div className="w-full bg-gray-700 h-2 rounded-full mt-4">
          <div
            className="h-2 rounded-full"
            style={{ width: `${percent}%`, background: "linear-gradient(90deg,#06b6d4,#0ea5e9)" }}
          />
        </div>
      )}
    </div>
  );
}
