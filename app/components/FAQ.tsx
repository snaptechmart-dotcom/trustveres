"use client";

import { useState } from "react";

const faqs = [
  {
    question: "Trustverse AI kya kaam karta hai?",
    answer:
      "Trustverse AI users ke behavior, documents, identity aur activity ko analyze karke real-time trust score nikalta hai.",
  },
  {
    question: "Kya Trustverse AI small business ke liye useful hai?",
    answer:
      "Bilkul! Small businesses ke liye fraud detection, trust score, customer verification sab automated ho jata hai.",
  },
  {
    question: "Kya API integration simple hai?",
    answer:
      "Haan, aap 10 minute me API integrate kar sakte ho. Hum step-by-step documentation bhi dete hain.",
  },
  {
    question: "Free plan me kya-kya milta hai?",
    answer:
      "Aapko 50 free review requests + Trust Score badge + basic support bilkul free milta hai.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-20 bg-gradient-to-b from-[#001E3C] to-[#000B18] text-white">
      <div className="max-w-5xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-6">Frequently Asked Questions</h2>
        <p className="text-center text-gray-300 mb-10">
          Aapke sabhi common questions ke simple answers.
        </p>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-[#032047] p-5 rounded-xl cursor-pointer transition-all duration-300 hover:bg-[#042A5A]"
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
            >
              <h3 className="text-lg font-semibold flex justify-between items-center">
                {faq.question}
                <span>{openIndex === index ? "−" : "+"}</span>
              </h3>

              {openIndex === index && (
                <p className="text-gray-300 mt-3">{faq.answer}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
