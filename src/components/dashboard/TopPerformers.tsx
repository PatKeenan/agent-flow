import React from 'react';
import { ArrowUp } from 'lucide-react';
import Avatar from '../ui/Avatar';

const performers = [
  { name: 'Michael Norton', role: 'Real Estate', growth: '+22.3%', avatar: 'https://i.pravatar.cc/150?img=1' },
  { name: 'Author', role: 'Residential Dev Agent', growth: '+8.6%', avatar: 'https://i.pravatar.cc/150?img=2' },
];

export default function TopPerformers() {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-semibold">Top Performers</h2>
      </div>
      <div className="space-y-4">
        {performers.map((performer) => (
          <div key={performer.name} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-3">
              <Avatar src={performer.avatar} alt={performer.name} />
              <div>
                <p className="text-sm font-medium">{performer.name}</p>
                <p className="text-xs text-gray-500">{performer.role}</p>
              </div>
            </div>
            <div className="flex items-center text-green-500">
              <ArrowUp size={16} />
              <span className="text-sm font-medium">{performer.growth}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}