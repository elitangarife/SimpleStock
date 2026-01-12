'use client';

import React from 'react';
import { Product } from '@/types';
import { ProductCard } from './ProductCard';

interface StockGridProps {
  products: Product[];
  onUpdateStock: (id: string, delta: number) => void;
}

export const StockGrid: React.FC<StockGridProps> = ({ products, onUpdateStock }) => {
  return (
    <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-items-center">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} onUpdateStock={onUpdateStock} />
      ))}
    </div>
  );
};
