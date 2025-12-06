"use client";

import Image from "next/image";
import PlanBadge from "@/app/components/PlanBadge"; // ⭐ NEW IMPORT

export default function Navbar() {
  return (
    <nav className="w-full bg-[#0c1e33] text-white px-6 py-4 border-b border-white/10 flex items-center justify-between">
      
      {/* Logo */}
      <div className="flex items-center gap-3">
        <Image
          src="/trustverse-logo.png"
          alt="Trustverse Logo"
          width={38}
          height={38}
        />
        <span className="text-xl font-semibold">Trustverse AI</span>
      </div>

      {/* Menu */}
      <div className="flex items-center gap-10 text-lg font-medium">
        <a href="/">Home</a>
        <a href="/pricing">Pricing</a>
        <a href="/tools">AI Tools</a>
        <a href="/contact">Contact</a>
      </div>

      {/* Right Side → Plan Badge + Login Button */}
      <div className="flex items-center gap-4">
        {/* ⭐ STATIC badge for now – later dynamic */}
        <PlanBadge plan="prelaunch" />

        <button className="px-5 py-2 bg-blue-500 hover:bg-blue-600 rounded-lg font-semibold text-white">
          Login
        </button>
      </div>
    </nav>
  );
}
