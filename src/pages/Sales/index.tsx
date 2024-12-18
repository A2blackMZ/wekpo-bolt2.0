import React, { useState } from 'react';
import { Plus, Clock } from 'lucide-react';
import { format } from 'date-fns';
import { Button } from '../../components/ui/Button';
import { NewSaleModal } from './NewSaleModal';
import { useSaleStore } from '../../store/sales';
import { useProductStore } from '../../store/products';

export default function Sales() {
  const [isNewSaleModalOpen, setIsNewSaleModalOpen] = useState(false);
  const sales = useSaleStore((state) => state.sales);
  const products = useProductStore((state) => state.products);

  const getProductName = (productId: string) => {
    return products.find(p => p.id === productId)?.name || 'Unknown Product';
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Sales</h1>
        <Button onClick={() => setIsNewSaleModalOpen(true)}>
          <Plus className="h-4 w-4 mr-2" />
          New Sale
        </Button>
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="divide-y">
          {sales.map((sale) => (
            <div key={sale.id} className="p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <Clock className="h-4 w-4 text-gray-500" />
                  <span className="text-sm text-gray-500">
                    {format(sale.date, 'PPp')}
                  </span>
                </div>
                <span className={`px-2 py-1 rounded-full text-sm ${
                  sale.type === 'retail' 
                    ? 'bg-blue-100 text-blue-800'
                    : 'bg-purple-100 text-purple-800'
                }`}>
                  {sale.type.charAt(0).toUpperCase() + sale.type.slice(1)}
                </span>
              </div>
              
              <div className="space-y-2">
                {sale.products.map((item, index) => (
                  <div key={index} className="flex justify-between text-sm">
                    <span>{getProductName(item.productId)} x{item.quantity}</span>
                    <span>{item.price * item.quantity} FCFA</span>
                  </div>
                ))}
              </div>
              
              <div className="mt-4 pt-2 border-t flex justify-between items-center">
                <span className="text-gray-500">Total</span>
                <span className="text-lg font-semibold">{sale.total} FCFA</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <NewSaleModal
        isOpen={isNewSaleModalOpen}
        onClose={() => setIsNewSaleModalOpen(false)}
      />
    </div>
  );
}