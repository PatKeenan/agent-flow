import { Link } from "@tanstack/react-router";
import {
  LayoutDashboard,
  Calendar,
  Users,
  CheckSquare,
  Settings,
  LogOut,
} from "lucide-react";

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", to: "/" },
  { icon: Calendar, label: "Calendar", to: "/calendar" },
  { icon: Users, label: "Clients", to: "/clients" },
  { icon: CheckSquare, label: "Tasks", to: "/tasks" },
];

export default function Sidebar() {
  return (
    <div className="hidden lg:flex flex-col h-screen w-64 bg-blue-600 text-white p-6">
      <div className="mb-10">
        <h1 className="text-2xl font-bold">AgentFlow</h1>
      </div>

      <nav className="flex-1">
        <ul className="space-y-2">
          {navItems.map((item) => (
            <li key={item.label}>
              <Link
                to={item.to}
                activeProps={{ className: "bg-white/10" }}
                inactiveProps={{ className: "hover:bg-white/5" }}
                className="flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors"
              >
                <item.icon size={20} />
                <span>{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className="border-t border-white/10 pt-6 space-y-2">
        <button className="flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-white/5 w-full">
          <Settings size={20} />
          <span>Settings</span>
        </button>
        <button className="flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-white/5 w-full">
          <LogOut size={20} />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
}
