"use client";

import { useState } from "react";

export default function PricingSection() {
  const [isIndia, setIsIndia] = useState(true);

  const handleSubscribe = async (planId: string) => {
    const res = await fetch("/api/razorpay/subscribe", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ planId }),
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.error || "Subscription failed");
      return;
    }

    alert("Subscription API Called. Next step: Razorpay checkout.");
  };

  return (
    <section className="w-full py-20 bg-[#06152A] text-white">
      <div className="max-w-7xl mx-auto px-4 text-center">

        {/* Launch Offer */}
        <div className="mb-16 p-8 rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 shadow-xl">
          <h2 className="text-3xl font-bold mb-2">🚀 Limited-Time Launch Offer</h2>
          <p className="text-lg">Start your Trustverse AI journey with almost ZERO risk</p>

          <div className="mt-6 grid md:grid-cols-3 gap-6 text-black">
            <div className="bg-white p-6 rounded-xl font-semibold">₹49 First Month Trial</div>
            <div className="bg-white p-6 rounded-xl font-semibold">30 Free Review Credits</div>
            <div className="bg-white p-6 rounded-xl font-semibold">Free Trust Score Badge</div>
          </div>

          <button className="mt-6 px-8 py-3 text-lg font-semibold text-white bg-black rounded-xl shadow-lg hover:bg-gray-800">
            Claim Launch Offer
          </button>
        </div>

        {/* Pricing Switch */}
        <div className="flex justify-center mb-10">
          <div className="flex bg-[#0C203A] p-2 rounded-xl">
            <button
              onClick={() => setIsIndia(true)}
              className={`px-6 py-2 rounded-lg font-semibold ${
                isIndia ? "bg-blue-600" : "bg-transparent"
              }`}
            >
              🇮🇳 India Pricing
            </button>
            <button
              onClick={() => setIsIndia(false)}
              className={`px-6 py-2 rounded-lg font-semibold ${
                !isIndia ? "bg-blue-600" : "bg-transparent"
              }`}
            >
              🌍 Global Pricing
            </button>
          </div>
        </div>

        {/* Simple Pricing */}
        <h2 className="text-4xl font-bold mb-4">Simple & Transparent Pricing</h2>
        <p className="text-gray-300 mb-10">
          Choose the plan that fits your business needs.
        </p>

        <div className="grid md:grid-cols-4 gap-8">

          {/* FREE */}
          <div className="bg-[#0C203A] p-8 rounded-2xl shadow-lg border border-blue-900">
            <h3 className="text-2xl font-bold mb-2">Free</h3>
            <p className="text-3xl font-bold mb-1">{isIndia ? "₹0" : "$0"}</p>
            <p className="text-gray-400 mb-6">Perfect for testing</p>

            <button className="mt-6 w-full py-3 bg-blue-600 rounded-lg font-semibold">
              Get Started
            </button>
          </div>

          {/* BASIC */}
          <div className="bg-[#0C203A] p-8 rounded-2xl shadow-lg border border-blue-900">
            <h3 className="text-2xl font-bold mb-2">Basic</h3>
            <p className="text-3xl font-bold mb-1">{isIndia ? "₹299/mo" : "$9/mo"}</p>

            <button
              onClick={() =>
                handleSubscribe(process.env.NEXT_PUBLIC_PLAN_ESSENTIAL_MONTHLY!)
              }
              className="mt-6 w-full py-3 bg-blue-600 rounded-lg font-semibold"
            >
              Choose Plan
            </button>
          </div>

          {/* PRO */}
          <div className="bg-[#0C203A] p-8 rounded-2xl shadow-lg border-2 border-blue-500 relative">
            <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-blue-600 text-white px-4 py-1 rounded-xl text-sm font-semibold">
              Most Popular
            </span>

            <h3 className="text-2xl font-bold mb-2">Pro</h3>
            <p className="text-3xl font-bold mb-1">{isIndia ? "₹699/mo" : "$19/mo"}</p>

            <button
              onClick={() =>
                handleSubscribe(process.env.NEXT_PUBLIC_PLAN_PRO_MONTHLY!)
              }
              className="mt-6 w-full py-3 bg-blue-600 rounded-lg font-semibold"
            >
              Choose Plan
            </button>
          </div>

          {/* AGENCY */}
          <div className="bg-[#0C203A] p-8 rounded-2xl shadow-lg border border-blue-900">
            <h3 className="text-2xl font-bold mb-2">Agency</h3>
            <p className="text-3xl font-bold mb-1">{isIndia ? "₹2999/mo" : "$99/mo"}</p>

            <button
              onClick={() =>
                handleSubscribe(process.env.NEXT_PUBLIC_PLAN_ENTERPRISE_MONTHLY!)
              }
              className="mt-6 w-full py-3 bg-blue-600 rounded-lg font-semibold"
            >
              Choose Plan
            </button>
          </div>

        </div>
      </div>
    </section>
  );
}
