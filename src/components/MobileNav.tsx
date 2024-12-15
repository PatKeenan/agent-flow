import { Link } from "@tanstack/react-router";
import { LayoutDashboard, Calendar, Users, CheckSquare } from "lucide-react";

export default function MobileNav() {
  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200">
      <div className="flex justify-around">
        {[
          { icon: LayoutDashboard, label: "Dashboard", to: "/" },
          { icon: Calendar, label: "Calendar", to: "/calendar" },
          { icon: Users, label: "Clients", to: "/clients" },
          { icon: CheckSquare, label: "Tasks", to: "/tasks" },
        ].map((item) => (
          <Link
            key={item.label}
            to={item.to}
            activeProps={{ className: "text-blue-600" }}
            inactiveProps={{ className: "text-gray-600" }}
            className="flex flex-col items-center py-3 px-4"
          >
            <item.icon size={20} />
            <span className="text-xs mt-1">{item.label}</span>
          </Link>
        ))}
      </div>
    </nav>
  );
}
