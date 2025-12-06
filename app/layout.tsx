import "./globals.css";
import Navbar from "./components/Navbar";
import Link from "next/link";

export const metadata = {
  title: "Trustverse AI",
  description: "AI Scoring SaaS Platform",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* ⭐ Razorpay Checkout Script */}
        <script src="https://checkout.razorpay.com/v1/checkout.js"></script>
      </head>

      <body className="bg-gray-900 text-white">

        {/* ⭐ NAVBAR ALWAYS ON TOP */}
        <Navbar />

        {/* ⭐ MAIN CONTENT AREA */}
        <main className="min-h-screen">{children}</main>

        {/* ⭐ FOOTER LINKS */}
        <footer className="bg-gray-900 text-gray-400 py-6 text-center border-t border-gray-700 mt-10">
          <div className="space-x-6">
            <Link href="/privacy" className="hover:text-white">
              Privacy Policy
            </Link>

            <Link href="/terms" className="hover:text-white">
              Terms of Service
            </Link>

            <Link href="/data-safety" className="hover:text-white">
              Data Safety
            </Link>
          </div>

          <p className="mt-4 text-sm text-gray-500">
            © {new Date().getFullYear()} Trustverse AI — All Rights Reserved.
          </p>
        </footer>
      </body>
    </html>
  );
}
