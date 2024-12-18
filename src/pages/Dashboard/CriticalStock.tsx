import React from 'react';
import { AlertCircle } from 'lucide-react';

export function CriticalStock() {
  const criticalItems = [
    { id: 1, name: 'Rice', stock: 5, minStock: 10 },
    { id: 2, name: 'Flour', stock: 3, minStock: 15 },
    { id: 3, name: 'Cooking Oil', stock: 2, minStock: 8 },
  ];

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center gap-2 mb-4">
        <AlertCircle className="h-5 w-5 text-red-500" />
        <h2 className="text-lg font-semibold">Critical Stock Items</h2>
      </div>
      <div className="space-y-4">
        {criticalItems.map((item) => (
          <div key={item.id} className="flex items-center justify-between">
            <div>
              <p className="font-medium">{item.name}</p>
              <p className="text-sm text-gray-500">
                Min: {item.minStock} | Current: {item.stock}
              </p>
            </div>
            <span className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm">
              Low Stock
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}