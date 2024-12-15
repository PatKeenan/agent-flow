import React from 'react';
import { Search, Bell, User } from 'lucide-react';

export default function Header() {
  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center flex-1">
          <div className="lg:hidden">
            <h1 className="text-xl font-bold text-blue-600">AgentFlow</h1>
          </div>
          <div className="max-w-md w-full ml-8 hidden lg:block">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search..."
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <button className="relative p-2 hover:bg-gray-100 rounded-lg">
            <Bell size={20} className="text-gray-600" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
          <div className="flex items-center space-x-3">
            <div className="text-right hidden lg:block">
              <p className="text-sm font-medium">Sarah Johnson</p>
              <p className="text-xs text-gray-500">Premium Agent</p>
            </div>
            <button className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
              <User size={20} className="text-gray-600" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}