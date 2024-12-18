export interface User {
  id: string;
  email: string;
  name: string;
  role: 'merchant' | 'admin';
}

export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  wholesalePrice: number;
  stock: number;
  minStock: number;
  unit: string;
  supplierId: string;
}

export interface Category {
  id: string;
  name: string;
  type: 'food' | 'miscellaneous' | 'school';
}

export interface Sale {
  id: string;
  products: {
    productId: string;
    quantity: number;
    price: number;
  }[];
  total: number;
  type: 'retail' | 'wholesale';
  date: Date;
  customerId?: string;
}

export interface Supplier {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
}