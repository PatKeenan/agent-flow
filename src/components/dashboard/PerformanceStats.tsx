import React from 'react';

const stats = [
  { label: 'Discipline', value: 75 },
  { label: 'Time Spent', value: 90 },
  { label: 'Engagement', value: 65 },
];

export default function PerformanceStats() {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm">
      <div className="flex items-center gap-4 mb-6">
        <img
          src="https://i.pravatar.cc/150?img=11"
          alt="Profile"
          className="w-12 h-12 rounded-full"
        />
        <div>
          <h2 className="font-semibold">Response Time Graph</h2>
          <p className="text-sm text-gray-500">Your current response statistics</p>
        </div>
      </div>
      <div className="space-y-4">
        {stats.map((stat) => (
          <div key={stat.label}>
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium">{stat.label}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-500 h-2 rounded-full"
                style={{ width: `${stat.value}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}