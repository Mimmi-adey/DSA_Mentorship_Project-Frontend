import { Outlet, Link, useNavigate } from "react-router-dom";

const MentorLayout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Top Bar */}
      <header className="bg-white shadow px-6 py-4 flex justify-between items-center">
        <h1 className="text-3xl font-bold text-green-700">Mentor Panel</h1>
        <div className="flex items-center gap-4">
          <Link to="/home" className="text-l text-gray-600 hover:text-green-700 hover:underline">
            Homepage
          </Link>
          <Link to="/profile" className="text-l text-gray-600 hover:text-green-700 hover:underline">
            Profile
          </Link>
          <button onClick={handleLogout} className="text-l text-red-600 hover:underline">
            Logout
          </button>
        </div>
      </header>

      {/* Side Navigation or Tab Navigation */}
      <nav className="p-4 bg-white shadow flex flex-wrap gap-4 border-b">
        {[
          { path: "dashboard", label: "Dashboard" },
          { path: "availability", label: "Availability" },
          { path: "requests", label: "Requests" },
          { path: "sessions", label: "Sessions" },
          { path: "profile", label: "Profile" },
        ].map((tab) => (
          <Link
            key={tab.path}
            to={`/mentor/${tab.path}`}
            className="px-4 py-1 rounded bg-emerald-100 hover:bg-emerald-200 text-emerald-800 font-medium"
          >
            {tab.label}
          </Link>
        ))}
      </nav>

      {/* Render Nested Routes */}
      <main className="p-6">
        <Outlet />
      </main>
    </div>
  );
};

export default MentorLayout;
