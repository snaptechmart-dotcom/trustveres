"use client";

import { useSession, signOut } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [user, setUser] = useState(null);

  // If not logged in, redirect
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  // Load user info from API (DB data)
  useEffect(() => {
    const loadUser = async () => {
      if (!session?.user?.id) return;

      const res = await fetch("/api/user/me");
      const data = await res.json();
      setUser(data);
    };

    loadUser();
  }, [session]);

  if (status === "loading" || !user) {
    return <p className="text-white p-10">Loading...</p>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6 text-white">

      <h1 className="text-3xl font-bold mb-6">
        Welcome, {user.name || "User"}
      </h1>

      {/* PLAN CARD */}
      <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 mb-8">
        <h2 className="text-xl font-bold">Your Plan</h2>
        <p className="text-3xl font-extrabold mt-2 capitalize">
          {user.plan}
        </p>

        {user.planValidTill && (
          <p className="text-gray-300 mt-1">
            Valid till: <b>{new Date(user.planValidTill).toDateString()}</b>
          </p>
        )}
      </div>

      {/* USAGE CARD */}
      <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 mb-8">
        <h2 className="text-xl font-bold mb-3">Usage</h2>

        <p className="text-lg">
          <b>Trust Checks Used:</b> {user.trustChecksUsed}
        </p>

        <p className="text-lg mt-2">
          <b>Reports Used:</b> {user.reportsUsed}
        </p>
      </div>

      {/* BENEFITS CARD */}
      <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
        <h2 className="text-xl font-bold mb-3">Plan Benefits</h2>

        <ul className="list-disc pl-6 text-gray-300">
          {user.plan === "free" && (
            <>
              <li>1 Trust Check</li>
              <li>No PDF Reports</li>
            </>
          )}

          {user.plan === "essential" && (
            <>
              <li>10 Advanced Checks</li>
              <li>5 PDF Reports</li>
            </>
          )}

          {user.plan === "prelaunch" && (
            <>
              <li>Unlimited Checks</li>
              <li>10 Reports</li>
            </>
          )}

          {["pro", "enterprise"].includes(user.plan) && (
            <>
              <li>Unlimited Checks</li>
              <li>Unlimited Reports</li>
            </>
          )}
        </ul>
      </div>

      {/* LOGOUT BUTTON */}
      <button
        onClick={() => signOut({ callbackUrl: "/login" })}
        className="mt-6 w-full py-3 bg-red-600 rounded-lg hover:bg-red-700"
      >
        Logout
      </button>
    </div>
  );
}
