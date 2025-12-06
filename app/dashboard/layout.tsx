import Link from "next/link";

export default function DashboardLayout({ children }) {
  return (
    <div className="flex min-h-screen">

      {/* SIDEBAR */}
      <aside className="w-64 bg-gray-900 text-white p-6 space-y-6">
        <h2 className="text-2xl font-bold">Trustverse AI</h2>

        <nav className="flex flex-col space-y-4 mt-8">
          <Link className="hover:text-gray-300" href="/dashboard">
            📊 Dashboard
          </Link>

          <Link className="hover:text-gray-300" href="/tools">
            🛠 AI Tools
          </Link>

          <Link className="hover:text-gray-300" href="/profile">
            👤 Profile
          </Link>

          <Link className="hover:text-gray-300" href="/logout">
            🚪 Logout
          </Link>
        </nav>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 p-8 bg-gray-100">{children}</main>
    </div>
  );
}
