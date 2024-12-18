import React, { useState } from 'react';
import { Plus, Pencil, Trash2, Mail, Phone, MapPin } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { SupplierModal } from './SupplierModal';
import { useSupplierStore } from '../../store/suppliers';

export default function Suppliers() {
  const [isSupplierModalOpen, setIsSupplierModalOpen] = useState(false);
  const [selectedSupplier, setSelectedSupplier] = useState<string | null>(null);

  const suppliers = useSupplierStore((state) => state.suppliers);
  const deleteSupplier = useSupplierStore((state) => state.deleteSupplier);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Suppliers</h1>
        <Button onClick={() => setIsSupplierModalOpen(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Add Supplier
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {suppliers.map((supplier) => (
          <div key={supplier.id} className="bg-white rounded-lg shadow p-6">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-lg font-semibold">{supplier.name}</h3>
              <div className="space-x-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => {
                    setSelectedSupplier(supplier.id);
                    setIsSupplierModalOpen(true);
                  }}
                >
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => deleteSupplier(supplier.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center text-gray-600">
                <Mail className="h-4 w-4 mr-2" />
                <span className="text-sm">{supplier.email}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <Phone className="h-4 w-4 mr-2" />
                <span className="text-sm">{supplier.phone}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <MapPin className="h-4 w-4 mr-2" />
                <span className="text-sm">{supplier.address}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <SupplierModal
        isOpen={isSupplierModalOpen}
        onClose={() => {
          setIsSupplierModalOpen(false);
          setSelectedSupplier(null);
        }}
        supplier={selectedSupplier ? suppliers.find(s => s.id === selectedSupplier) : undefined}
      />
    </div>
  );
}