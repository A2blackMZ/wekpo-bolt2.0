import React from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Plus, Trash2 } from 'lucide-react';
import { Modal } from '../../components/ui/Modal';
import { Input } from '../../components/ui/Input';
import { Select } from '../../components/ui/Select';
import { Button } from '../../components/ui/Button';
import { useProductStore } from '../../store/products';
import { useSaleStore } from '../../store/sales';

const saleItemSchema = z.object({
  productId: z.string().min(1, 'Product is required'),
  quantity: z.number().min(1, 'Quantity must be at least 1'),
  price: z.number().min(0, 'Price must be positive'),
});

const saleSchema = z.object({
  type: z.enum(['retail', 'wholesale']),
  items: z.array(saleItemSchema).min(1, 'At least one item is required'),
  customerId: z.string().optional(),
});

type SaleForm = z.infer<typeof saleSchema>;

interface NewSaleModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function NewSaleModal({ isOpen, onClose }: NewSaleModalProps) {
  const products = useProductStore((state) => state.products);
  const addSale = useSaleStore((state) => state.addSale);

  const {
    register,
    control,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<SaleForm>({
    resolver: zodResolver(saleSchema),
    defaultValues: {
      type: 'retail',
      items: [{ productId: '', quantity: 1, price: 0 }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'items',
  });

  const saleType = watch('type');

  const onSubmit = async (data: SaleForm) => {
    const total = data.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    
    addSale({
      id: crypto.randomUUID(),
      products: data.items,
      total,
      type: data.type,
      date: new Date(),
      customerId: data.customerId,
    });
    
    reset();
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="New Sale"
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Select
          label="Sale Type"
          {...register('type')}
          error={errors.type?.message}
          options={[
            { value: 'retail', label: 'Retail' },
            { value: 'wholesale', label: 'Wholesale' },
          ]}
        />

        <div className="space-y-4">
          {fields.map((field, index) => (
            <div key={field.id} className="flex gap-2">
              <Select
                {...register(`items.${index}.productId`)}
                error={errors.items?.[index]?.productId?.message}
                options={products.map((p) => ({
                  value: p.id,
                  label: p.name,
                }))}
              />
              <Input
                type="number"
                placeholder="Qty"
                {...register(`items.${index}.quantity`, { valueAsNumber: true })}
                error={errors.items?.[index]?.quantity?.message}
              />
              <Input
                type="number"
                placeholder="Price"
                {...register(`items.${index}.price`, { valueAsNumber: true })}
                error={errors.items?.[index]?.price?.message}
              />
              <Button
                type="button"
                variant="destructive"
                onClick={() => remove(index)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>

        <Button
          type="button"
          variant="outline"
          onClick={() => append({ productId: '', quantity: 1, price: 0 })}
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Item
        </Button>

        {saleType === 'wholesale' && (
          <Input
            label="Customer ID (Optional)"
            {...register('customerId')}
            error={errors.customerId?.message}
          />
        )}

        <div className="flex justify-end space-x-2">
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            isLoading={isSubmitting}
          >
            Complete Sale
          </Button>
        </div>
      </form>
    </Modal>
  );
}