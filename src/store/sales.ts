import { create } from 'zustand';
import { Sale } from '../types';

interface SaleState {
  sales: Sale[];
  addSale: (sale: Sale) => void;
  updateSale: (id: string, sale: Partial<Sale>) => void;
  deleteSale: (id: string) => void;
}

export const useSaleStore = create<SaleState>((set) => ({
  sales: [],
  addSale: (sale) =>
    set((state) => ({ sales: [...state.sales, sale] })),
  updateSale: (id, sale) =>
    set((state) => ({
      sales: state.sales.map((s) =>
        s.id === id ? { ...s, ...sale } : s
      ),
    })),
  deleteSale: (id) =>
    set((state) => ({
      sales: state.sales.filter((s) => s.id !== id),
    })),
}));