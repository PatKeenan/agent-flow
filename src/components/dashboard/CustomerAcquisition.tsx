import React from 'react';
import Avatar from '../ui/Avatar';

const customers = [
  { name: 'Phil', role: 'Developer', avatar: 'https://i.pravatar.cc/150?img=6' },
  { name: 'Mark', role: 'Developer', avatar: 'https://i.pravatar.cc/150?img=7' },
];

export default function CustomerAcquisition() {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-lg font-semibold">Recent Customer Ratings</h2>
          <p className="text-sm text-gray-500">2 Client Approached</p>
        </div>
        <button className="text-gray-400 hover:text-gray-600">•••</button>
      </div>
      <div className="flex gap-4 mb-6">
        {customers.map((customer) => (
          <div key={customer.name} className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg">
            <Avatar src={customer.avatar} alt={customer.name} />
            <div>
              <p className="text-sm font-medium">{customer.name}</p>
              <p className="text-xs text-gray-500">{customer.role}</p>
            </div>
          </div>
        ))}
      </div>
      <div>
        <div className="flex justify-between mb-2">
          <h3 className="text-sm font-medium">Site Engagement</h3>
          <button className="text-blue-500 text-sm">More</button>
        </div>
        <div className="flex items-end gap-2 h-32">
          {[40, 60, 80, 70, 90, 70, 80].map((height, index) => (
            <div
              key={index}
              className="flex-1 bg-blue-500 rounded-t-lg"
              style={{ height: `${height}%` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}