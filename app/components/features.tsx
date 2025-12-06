"use client";
import { ShieldCheck, Fingerprint, BarChart3, ScanSearch } from "lucide-react";

export default function Features() {
  const items = [
    {
      title: "AI Trust Scoring",
      desc: "Calculate real-time trust scores using advanced ML models built for accuracy and reliability.",
      icon: <ShieldCheck size={34} className="text-blue-400" />
    },
    {
      title: "Identity Verification",
      desc: "Instantly verify users with face, document, and digital identity validation using AI.",
      icon: <Fingerprint size={34} className="text-blue-400" />
    },
    {
      title: "Risk Detection",
      desc: "Detect unusual patterns, fraud risk, and suspicious behavior in milliseconds.",
      icon: <ScanSearch size={34} className="text-blue-400" />
    },
    {
      title: "Analytics Dashboard",
      desc: "Visualize reports, behavior patterns, and trust metrics with a real-time AI dashboard.",
      icon: <BarChart3 size={34} className="text-blue-400" />
    }
  ];

  return (
    <section className="w-full bg-[#081421] text-white py-24 px-6">
      <div className="max-w-7xl mx-auto text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold mb-4">
          Powerful AI Features for Trustverse
        </h2>
        <p className="text-gray-300 max-w-2xl mx-auto">
          Everything your business needs to verify users, detect risk, and build trust with AI.
        </p>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {items.map((f, i) => (
          <div
            key={i}
            className="bg-[#0d2338] p-7 rounded-2xl shadow-xl border border-white/10
                       hover:border-blue-500/40 hover:shadow-blue-500/10 transition group"
          >
            <div className="mb-4">{f.icon}</div>
            <h3 className="text-xl font-bold mb-2 group-hover:text-blue-400 transition">
              {f.title}
            </h3>
            <p className="text-gray-400 leading-relaxed">{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
