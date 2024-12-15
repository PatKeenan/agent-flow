import React from 'react';
import TopPerformers from './TopPerformers';
import RecentActivities from './RecentActivities';
import CustomerAcquisition from './CustomerAcquisition';
import NewCrm from './NewCrm';
import PerformanceStats from './PerformanceStats';

export default function Dashboard() {
  return (
    <div className="flex-1 overflow-auto bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <TopPerformers />
          <CustomerAcquisition />
        </div>
        <div className="space-y-6">
          <RecentActivities />
          <NewCrm />
          <PerformanceStats />
        </div>
      </div>
    </div>
  );
}