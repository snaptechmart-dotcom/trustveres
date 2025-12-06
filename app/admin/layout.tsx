export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Trustverse Admin Panel</h1>

      <div className="flex gap-4 mb-6">
        <a href="/admin" className="px-4 py-2 bg-black text-white rounded">Dashboard</a>
        <a href="/admin/users" className="px-4 py-2 bg-gray-200 rounded">Users</a>
        <a href="/admin/history" className="px-4 py-2 bg-gray-200 rounded">History</a>
      </div>

      {children}
    </div>
  );
}
