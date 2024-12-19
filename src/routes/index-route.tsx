import { createRoute } from "@tanstack/react-router";
import { Users, CheckSquare, DollarSign, Home } from "lucide-react";

import { rootRoute } from "./_root-route";
import { PageHeader } from "../components/PageHeader";

export const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: Dashboard,
});

const stats = [
  { icon: Home, label: "Active Listings", value: "12", trend: "+2" },
  { icon: DollarSign, label: "Revenue", value: "$45.2k", trend: "+12.5%" },
  { icon: Users, label: "Active Clients", value: "24", trend: "+4" },
  { icon: CheckSquare, label: "Tasks Complete", value: "85%", trend: "+5%" },
];

const tasks = [
  {
    title: "Property viewing at 123 Oak Street",
    time: "2:00 PM",
    completed: false,
  },
  {
    title: "Client meeting with John Smith",
    time: "3:30 PM",
    completed: false,
  },
  {
    title: "Update listing photos for 456 Pine Ave",
    time: "4:00 PM",
    completed: true,
  },
  {
    title: "Follow up with potential buyers",
    time: "5:00 PM",
    completed: false,
  },
];

function Dashboard() {
  return (
    <div className="flex-1 overflow-auto bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <PageHeader title="Dashboard" />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat) => (
            <div key={stat.label} className="bg-white p-6 rounded-xl shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div className="p-2 bg-blue-50 rounded-lg">
                  <stat.icon className="text-blue-600" size={24} />
                </div>
                <span className="text-sm text-green-500">{stat.trend}</span>
              </div>
              <h3 className="text-gray-500 text-sm">{stat.label}</h3>
              <p className="text-2xl font-semibold mt-1">{stat.value}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold">Upcoming Tasks</h2>
              <button className="text-blue-600 text-sm hover:text-blue-700">
                View All
              </button>
            </div>
            <div className="space-y-4">
              {tasks.map((task, index) => (
                <div key={index} className="flex items-center space-x-4">
                  <input
                    type="checkbox"
                    checked={task.completed}
                    className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                  />
                  <div className="flex-1">
                    <p
                      className={`text-sm ${task.completed ? "line-through text-gray-400" : "text-gray-900"}`}
                    >
                      {task.title}
                    </p>
                    <p className="text-xs text-gray-500">{task.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold">Recent Activity</h2>
              <button className="text-blue-600 text-sm hover:text-blue-700">
                View All
              </button>
            </div>
            <div className="space-y-6">
              {[1, 2, 3].map((_, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                    <Users size={16} className="text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-900">
                      New client inquiry for 789 Maple Drive
                    </p>
                    <p className="text-xs text-gray-500">2 hours ago</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
