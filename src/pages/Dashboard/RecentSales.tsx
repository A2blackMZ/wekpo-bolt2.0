import React from 'react';
import { Clock } from 'lucide-react';

export function RecentSales() {
  const recentSales = [
    { id: 1, product: 'Rice (5kg)', amount: '0 FCFA', time: '2 minutes ago' },
    { id: 2, product: 'School Supplies Bundle', amount: '0 FCFA', time: '15 minutes ago' },
    { id: 3, product: 'Cooking Oil (2L)', amount: '0.0 FCFA', time: '1 hour ago' },
  ];

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center gap-2 mb-4">
        <Clock className="h-5 w-5 text-indigo-500" />
        <h2 className="text-lg font-semibold">Recent Sales</h2>
      </div>
      <div className="space-y-4">
        {recentSales.map((sale) => (
          <div key={sale.id} className="flex items-center justify-between">
            <div>
              <p className="font-medium">{sale.product}</p>
              <p className="text-sm text-gray-500">{sale.time}</p>
            </div>
            <span className="font-semibold">{sale.amount}</span>
          </div>
        ))}
      </div>
    </div>
  );
}