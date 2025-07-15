import React from "react";
import { useNavigate } from "react-router-dom";

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Top Bar */}
      <header className="bg-white shadow px-6 py-4 flex justify-between items-center">
        <h1 className="text-3xl font-bold text-emerald-700">Admin Panel</h1>

        <div className="flex items-center gap-4">
          <a
            href="/home"
            className="text-l text-gray-600 hover:text-emerald-700 hover:underline"
          >
            Homepage
          </a>

          <button
            onClick={handleLogout}
            className="text-l text-red-600 hover:underline"
          >
            Logout
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-6">{children}</main>
    </div>
  );
};

export default AdminLayout;