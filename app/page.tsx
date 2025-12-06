export default function Home() {
  return (
    <div className="">

      {/* TOP HERO SECTION */}
      <section className="px-6 py-20 bg-black text-white text-center">
        <h1 className="text-5xl font-bold">
          Trustverse AI – Verify Anything with Confidence
        </h1>
        <p className="mt-4 text-lg text-gray-300 max-w-2xl mx-auto">
          AI-powered trust detection for profiles, phone numbers, social accounts,
          and digital identities. Make safer decisions with real-time AI scoring.
        </p>

        <div className="mt-8 flex justify-center gap-4">
          <a
            href="/signup"
            className="px-6 py-3 bg-white text-black font-semibold rounded-lg"
          >
            Get Started Free
          </a>

          <a
            href="/tools"
            className="px-6 py-3 border border-white text-white font-semibold rounded-lg"
          >
            Explore Tools
          </a>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section className="px-6 py-20 bg-gray-100">
        <h2 className="text-3xl font-bold text-center mb-10">
          Powerful AI Tools Included
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">

          {/* Feature 1 */}
          <div className="p-6 bg-white rounded-xl shadow">
            <h3 className="text-xl font-bold mb-2">AI Trust Score</h3>
            <p className="text-gray-600">
              Instantly generate trustworthiness score from user information.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="p-6 bg-white rounded-xl shadow">
            <h3 className="text-xl font-bold mb-2">Advanced AI Analysis</h3>
            <p className="text-gray-600">
              Deep AI reasoning with scam probability and red-flag insights.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="p-6 bg-white rounded-xl shadow">
            <h3 className="text-xl font-bold mb-2">Social Analyzer</h3>
            <p className="text-gray-600">
              Check authenticity of Instagram, Twitter, LinkedIn accounts.
            </p>
          </div>

          {/* Feature 4 */}
          <div className="p-6 bg-white rounded-xl shadow">
            <h3 className="text-xl font-bold mb-2">Phone Number Checker</h3>
            <p className="text-gray-600">
              Detect fraud, spam probability & caller risk level using AI.
            </p>
          </div>

        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="px-6 py-20">
        <h2 className="text-3xl font-bold text-center mb-10">How It Works</h2>

        <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-6">

          <div className="p-6 bg-white rounded-xl shadow text-center">
            <h3 className="font-bold text-xl mb-2">1. Enter Details</h3>
            <p className="text-gray-600">Add profile info, phone number, or social ID.</p>
          </div>

          <div className="p-6 bg-white rounded-xl shadow text-center">
            <h3 className="font-bold text-xl mb-2">2. AI Analyzes</h3>
            <p className="text-gray-600">Our models detect fraud indicators and trust signals.</p>
          </div>

          <div className="p-6 bg-white rounded-xl shadow text-center">
            <h3 className="font-bold text-xl mb-2">3. Get Reports</h3>
            <p className="text-gray-600">Download PDF and review insights instantly.</p>
          </div>

        </div>
      </section>

      {/* CTA SECTION */}
      <section className="px-6 py-20 bg-black text-white text-center">
        <h2 className="text-4xl font-bold">Start Using Trustverse AI Today</h2>
        <p className="mt-4 text-lg text-gray-300 max-w-2xl mx-auto">
          Make safer decisions with our powerful AI verification tools.
        </p>

        <a
          href="/signup"
          className="mt-8 inline-block px-6 py-3 bg-white text-black font-semibold rounded-lg"
        >
          Create Free Account
        </a>
      </section>

      {/* FOOTER */}
      <footer className="py-6 text-center bg-gray-100 text-gray-600">
        © 2025 Trustverse AI · All rights reserved.
      </footer>
    </div>
  );
}
