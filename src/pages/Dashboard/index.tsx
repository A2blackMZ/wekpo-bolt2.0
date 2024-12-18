import React from 'react';
import { DashboardStats } from './DashboardStats';
import { CriticalStock } from './CriticalStock';
import { RecentSales } from './RecentSales';

export default function Dashboard() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
      <DashboardStats />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        <CriticalStock />
        <RecentSales />
      </div>
    </div>
  );
}