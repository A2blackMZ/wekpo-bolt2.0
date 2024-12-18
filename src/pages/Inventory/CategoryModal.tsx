import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Modal } from '../../components/ui/Modal';
import { Input } from '../../components/ui/Input';
import { Select } from '../../components/ui/Select';
import { Button } from '../../components/ui/Button';
import { useCategoryStore } from '../../store/categories';

const categorySchema = z.object({
  name: z.string().min(1, 'Name is required'),
  type: z.enum(['food', 'miscellaneous', 'school']),
});

type CategoryForm = z.infer<typeof categorySchema>;

interface CategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  category?: CategoryForm;
}

export function CategoryModal({ isOpen, onClose, category }: CategoryModalProps) {
  const addCategory = useCategoryStore((state) => state.addCategory);
  const updateCategory = useCategoryStore((state) => state.updateCategory);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<CategoryForm>({
    resolver: zodResolver(categorySchema),
    defaultValues: category,
  });

  const onSubmit = async (data: CategoryForm) => {
    if (category) {
      updateCategory(category.id, data);
    } else {
      addCategory({ ...data, id: crypto.randomUUID() });
    }
    reset();
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={category ? 'Edit Category' : 'Add Category'}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input
          label="Name"
          {...register('name')}
          error={errors.name?.message}
        />
        <Select
          label="Type"
          {...register('type')}
          error={errors.type?.message}
          options={[
            { value: 'food', label: 'Food' },
            { value: 'miscellaneous', label: 'Miscellaneous' },
            { value: 'school', label: 'School' },
          ]}
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
            {category ? 'Update' : 'Add'}
          </Button>
        </div>
      </form>
    </Modal>
  );
}