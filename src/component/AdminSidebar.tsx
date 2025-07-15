import { Link, useLocation } from 'react-router-dom'
import { Home, Users, ShieldCheck, FlagTriangleLeft } from 'lucide-react'


const links = [
  { to: '/admin/dashboard', label: 'Dashboard', icon: <Home size={20} /> },
  { to: '/admin/users', label: 'Users', icon: <Users size={20} /> },
  { to: '/admin/mentors', label: 'Approvals', icon: <ShieldCheck size={20} /> },
  { to: '/admin/reports', label: 'Reports', icon: <FlagTriangleLeft size={20} /> },
]

function AdminSidebar() {
  const location = useLocation()

  return (
    <div className="w-64 min-h-screen bg-emerald-700 text-white flex flex-col p-5">
      <h2 className="text-2xl font-bold mb-10">Admin Panel</h2>
      {links.map(link => (
        <Link
          key={link.to}
          to={link.to}
          className={`flex items-center gap-3 mb-4 p-2 rounded-lg hover:bg-emerald-600 transition ${
            location.pathname === link.to ? 'bg-emerald-600' : ''
          }`}
        >
          {link.icon}
          <span>{link.label}</span>
        </Link>
      ))}
    </div>
  )
}

export default AdminSidebar