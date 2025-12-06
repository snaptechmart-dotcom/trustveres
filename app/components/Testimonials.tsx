"use client";

import Image from "next/image";

export default function Testimonials() {
  return (
    <section className="py-24 bg-gradient-to-b from-[#071a34] to-[#051224]">
      <h2 className="text-center text-4xl font-extrabold text-white">
        What Users Say
      </h2>
      <p className="text-center text-gray-400 mt-2">
        Real feedback from people using Trustverse AI.
      </p>

      <div className="max-w-7xl mx-auto mt-14 grid grid-cols-1 md:grid-cols-3 gap-10 px-6">

        {/* CARD 1 */}
        <div className="bg-[#0A2342] border border-blue-800/40 p-8 rounded-2xl shadow-xl hover:shadow-blue-600/30 hover:scale-[1.03] transition">
          <div className="flex justify-center mb-5">
            <Image src="/user1.png" width={80} height={80} className="rounded-full" alt="User 1" />
          </div>

          <p className="text-gray-300 text-center italic mb-4">
            "Trustverse AI ne hamari company ki verification accuracy 10x improve kar di!"
          </p>

          <h3 className="text-center text-white font-semibold text-lg">
            Rahul Sharma
          </h3>
          <p className="text-center text-gray-400 text-sm">Tech Founder</p>
        </div>

        {/* CARD 2 */}
        <div className="bg-[#0A2342] border border-blue-800/40 p-8 rounded-2xl shadow-xl hover:shadow-blue-600/30 hover:scale-[1.03] transition">
          <div className="flex justify-center mb-5">
            <Image src="/user2.png" width={80} height={80} className="rounded-full" alt="User 2" />
          </div>

          <p className="text-gray-300 text-center italic mb-4">
            "Fraud detection itna fast aur accurate kabhi nahi dekha. Highly recommended!"
          </p>

          <h3 className="text-center text-white font-semibold text-lg">
            Priya Verma
          </h3>
          <p className="text-center text-gray-400 text-sm">Marketing Lead</p>
        </div>

        {/* CARD 3 */}
        <div className="bg-[#0A2342] border border-blue-800/40 p-8 rounded-2xl shadow-xl hover:shadow-blue-600/30 hover:scale-[1.03] transition">
          <div className="flex justify-center mb-5">
            <Image src="/user3.png" width={80} height={80} className="rounded-full" alt="User 3" />
          </div>

          <p className="text-gray-300 text-center italic mb-4">
            "Customer trust score system ne hamare conversions 40% badha diye!"
          </p>

          <h3 className="text-center text-white font-semibold text-lg">
            Arjun Mehta
          </h3>
          <p className="text-center text-gray-400 text-sm">Startup Owner</p>
        </div>

      </div>
    </section>
  );
}
