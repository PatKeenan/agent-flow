import React from 'react';
import Avatar from '../ui/Avatar';

const activities = [
  { name: 'Claire Task', status: '24%', avatar: 'https://i.pravatar.cc/150?img=3' },
  { name: 'Not Yet Done', status: '56%', avatar: 'https://i.pravatar.cc/150?img=4' },
  { name: 'Sweet!', status: '100%', avatar: 'https://i.pravatar.cc/150?img=5' },
];

export default function RecentActivities() {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-semibold">Recent Activities</h2>
        <button className="text-gray-400 hover:text-gray-600">•••</button>
      </div>
      <div className="space-y-4">
        {activities.map((activity) => (
          <div key={activity.name} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-3">
              <Avatar src={activity.avatar} alt={activity.name} />
              <p className="text-sm font-medium">{activity.name}</p>
            </div>
            <span className={`text-sm font-medium ${
              activity.status === '100%' ? 'text-green-500' : 'text-red-500'
            }`}>{activity.status}</span>
          </div>
        ))}
      </div>
    </div>
  );
}