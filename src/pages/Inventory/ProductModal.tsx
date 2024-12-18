import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Modal } from '../../components/ui/Modal';
import { Input } from '../../components/ui/Input';
import { Select } from '../../components/ui/Select';
import { Button } from '../../components/ui/Button';
import { useProductStore } from '../../store/products';
import { useCategoryStore } from '../../store/categories';
import { useSupplierStore } from '../../store/suppliers';

const productSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  category: z.string().min(1, 'Category is required'),
  price: z.number().min(0, 'Price must be positive'),
  wholesalePrice: z.number().min(0, 'Wholesale price must be positive'),
  stock: z.number().min(0, 'Stock must be positive'),
  minStock: z.number().min(0, 'Minimum stock must be positive'),
  unit: z.string().min(1, 'Unit is required'),
  supplierId: z.string().min(1, 'Supplier is required'),
});

type ProductForm = z.infer<typeof productSchema>;

interface ProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  product?: ProductForm;
}

export function ProductModal({ isOpen, onClose, product }: ProductModalProps) {
  const addProduct = useProductStore((state) => state.addProduct);
  const updateProduct = useProductStore((state) => state.updateProduct);
  const categories = useCategoryStore((state) => state.categories);
  const suppliers = useSupplierStore((state) => state.suppliers);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ProductForm>({
    resolver: zodResolver(productSchema),
    defaultValues: product,
  });

  const onSubmit = async (data: ProductForm) => {
    if (product) {
      updateProduct(product.id, data);
    } else {
      addProduct({ ...data, id: crypto.randomUUID() });
    }
    reset();
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={product ? 'Edit Product' : 'Add Product'}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input
          label="Name"
          {...register('name')}
          error={errors.name?.message}
        />
        <Select
          label="Category"
          {...register('category')}
          error={errors.category?.message}
          options={categories.map((c) => ({
            value: c.id,
            label: c.name,
          }))}
        />
        <Input
          label="Price"
          type="number"
          {...register('price', { valueAsNumber: true })}
          error={errors.price?.message}
        />
        <Input
          label="Wholesale Price"
          type="number"
          {...register('wholesalePrice', { valueAsNumber: true })}
          error={errors.wholesalePrice?.message}
        />
        <Input
          label="Stock"
          type="number"
          {...register('stock', { valueAsNumber: true })}
          error={errors.stock?.message}
        />
        <Input
          label="Minimum Stock"
          type="number"
          {...register('minStock', { valueAsNumber: true })}
          error={errors.minStock?.message}
        />
        <Input
          label="Unit"
          {...register('unit')}
          error={errors.unit?.message}
        />
        <Select
          label="Supplier"
          {...register('supplierId')}
          error={errors.supplierId?.message}
          options={suppliers.map((s) => ({
            value: s.id,
            label: s.name,
          }))}
        />
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
            {product ? 'Update' : 'Add'}
          </Button>
        </div>
      </form>
    </Modal>
  );
}