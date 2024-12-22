import React from 'react';
import { DollarSign, Package, ShoppingCart, TrendingUp } from 'lucide-react';

export function DashboardStats() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <StatCard
        title="Total Sales"
        value="0 FCFA"
        icon={<DollarSign className="h-6 w-6" />}
        trend="+0%"
      />
      <StatCard
        title="Total Products"
        value="245"
        icon={<Package className="h-6 w-6" />}
        trend="+0.0%"
      />
      <StatCard
        title="Today's Orders"
        value="0"
        icon={<ShoppingCart className="h-6 w-6" />}
        trend="-1%"
      />
      <StatCard
        title="Revenue"
        value="0 FCFA"
        icon={<TrendingUp className="h-6 w-6" />}
        trend="+0%"
      />
    </div>
  );
}

interface StatCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  trend: string;
}

function StatCard({ title, value, icon, trend }: StatCardProps) {
  const isPositive = trend.startsWith('+');
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="text-indigo-600">{icon}</div>
        <span className={`text-sm ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
          {trend}
        </span>
      </div>
      <h3 className="text-gray-600 text-sm">{title}</h3>
      <p className="text-2xl font-semibold mt-2">{value}</p>
    </div>
  );
}