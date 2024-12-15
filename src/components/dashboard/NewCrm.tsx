import React from 'react';
import { Users } from 'lucide-react';
import Avatar from '../ui/Avatar';

const teamMembers = [
  { name: 'Maria', role: 'Senior Team', avatar: 'https://i.pravatar.cc/150?img=8' },
  { name: 'David', role: 'Dev2 Team/Member', avatar: 'https://i.pravatar.cc/150?img=9' },
  { name: 'Lucas', role: 'Senior Team/Member', avatar: 'https://i.pravatar.cc/150?img=10' },
];

export default function NewCrm() {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold">1.4K</h2>
          <p className="text-sm text-gray-500">Active users, project statistics</p>
        </div>
        <div className="p-3 bg-blue-100 rounded-lg">
          <Users className="text-blue-600" size={24} />
        </div>
      </div>
      <div className="space-y-4">
        {teamMembers.map((member) => (
          <div key={member.name} className="flex items-center gap-3">
            <Avatar src={member.avatar} alt={member.name} />
            <div className="flex-1">
              <p className="text-sm font-medium">{member.name}</p>
              <p className="text-xs text-gray-500">{member.role}</p>
            </div>
          </div>
        ))}
      </div>
      <button className="w-full mt-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
        Create New
      </button>
    </div>
  );
}