export default function CTA() {
  return (
    <section className="py-24 bg-gradient-to-br from-[#001E3C] to-[#000B18] text-white">
      <div className="max-w-4xl mx-auto text-center px-4">

        <h2 className="text-4xl md:text-5xl font-extrabold mb-6">
          Ready to Build Trust with <span className="text-blue-400">Trustverse AI?</span>
        </h2>

        <p className="text-gray-300 text-lg mb-10">
          Start your journey today with advanced trust analytics, verification tools, 
          and smart fraud detection — all fully automated.
        </p>

        <div className="flex justify-center gap-6">
          <a
            href="#"
            className="bg-blue-600 hover:bg-blue-700 px-8 py-4 rounded-xl font-semibold text-lg shadow-lg transition-all"
          >
            Start Free Trial
          </a>

          <a
            href="#"
            className="border border-blue-500 hover:bg-blue-500 hover:text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all"
          >
            View Pricing
          </a>
        </div>

      </div>
    </section>
  );
}
