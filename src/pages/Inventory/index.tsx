import React, { useState } from 'react';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { CategoryModal } from './CategoryModal';
import { ProductModal } from './ProductModal';
import { useCategoryStore } from '../../store/categories';
import { useProductStore } from '../../store/products';

export default function Inventory() {
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);

  const categories = useCategoryStore((state) => state.categories);
  const deleteCategory = useCategoryStore((state) => state.deleteCategory);
  const products = useProductStore((state) => state.products);
  const deleteProduct = useProductStore((state) => state.deleteProduct);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Inventory Management</h1>
        <div className="space-x-2">
          <Button onClick={() => setIsCategoryModalOpen(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Add Category
          </Button>
          <Button onClick={() => setIsProductModalOpen(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Add Product
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Categories */}
        <div>
          <h2 className="text-lg font-semibold mb-4">Categories</h2>
          <div className="bg-white rounded-lg shadow">
            <div className="divide-y">
              {categories.map((category) => (
                <div
                  key={category.id}
                  className="p-4 flex items-center justify-between"
                >
                  <div>
                    <p className="font-medium">{category.name}</p>
                    <p className="text-sm text-gray-500 capitalize">{category.type}</p>
                  </div>
                  <div className="space-x-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => {
                        setSelectedCategory(category.id);
                        setIsCategoryModalOpen(true);
                      }}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => deleteCategory(category.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Products */}
        <div>
          <h2 className="text-lg font-semibold mb-4">Products</h2>
          <div className="bg-white rounded-lg shadow">
            <div className="divide-y">
              {products.map((product) => (
                <div
                  key={product.id}
                  className="p-4 flex items-center justify-between"
                >
                  <div>
                    <p className="font-medium">{product.name}</p>
                    <p className="text-sm text-gray-500">
                      Stock: {product.stock} {product.unit}
                    </p>
                    <p className="text-sm text-gray-500">
                      Price: {product.price} FCFA | Wholesale: {product.wholesalePrice} FCFA
                    </p>
                  </div>
                  <div className="space-x-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => {
                        setSelectedProduct(product.id);
                        setIsProductModalOpen(true);
                      }}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => deleteProduct(product.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <CategoryModal
        isOpen={isCategoryModalOpen}
        onClose={() => {
          setIsCategoryModalOpen(false);
          setSelectedCategory(null);
        }}
        category={selectedCategory ? categories.find(c => c.id === selectedCategory) : undefined}
      />

      <ProductModal
        isOpen={isProductModalOpen}
        onClose={() => {
          setIsProductModalOpen(false);
          setSelectedProduct(null);
        }}
        product={selectedProduct ? products.find(p => p.id === selectedProduct) : undefined} product={selectedProduct ? products.find(p => p.id === selectedProduct) : undefined}
      />
    </div>
  );
}