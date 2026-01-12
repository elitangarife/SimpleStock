'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { createProductSchema, CreateProductInput } from '@/types/zodSchema';
import { Product } from '@/types';
import toast from 'react-hot-toast';
import { createProduct } from '@/services/api/products';

interface CreateProductFormProps {
  onProductCreated: (product: Product) => void; 
  onClose?: () => void; 
}

export default function CreateProductForm({ onProductCreated, onClose }: CreateProductFormProps) {
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, formState: { errors }, reset } = useForm<CreateProductInput>({
    resolver: zodResolver(createProductSchema)
  });

  const onSubmit = async (data: CreateProductInput) => {
    setLoading(true);
    try {
      const newProduct = await createProduct(data);
      onProductCreated(newProduct); 
      toast.success(`Producto "${newProduct.name}" creado!`);
      reset();
      if (onClose) onClose(); // cerrar modal si existe callback
    } catch (err) {
      console.error('Error creando producto:', err);
      toast.error('Error creando producto');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white p-6 rounded-xl shadow-md max-w-md w-full flex flex-col gap-4"
    >
      {/* Nombre */}
      <div className="flex flex-col">
        <label className="mb-1 font-medium text-gray-700">Nombre</label>
        <input
          type="text"
          {...register('name')}
          className="border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
        {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
      </div>

      {/* Descripción */}
      <div className="flex flex-col">
        
        <label className="mb-1 font-medium text-gray-700">Descripción <span className='text-xs'>(Opcional)</span></label>
        <input
          type="text"
          {...register('description')}
          className="border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
        {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>}
      </div>

      {/* Precio */}
      <div className="flex flex-col">
        <label className="mb-1 font-medium text-gray-700">Precio</label>
        <input
          type="number"
          {...register('price', { valueAsNumber: true })}
          className="border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
        {errors.price && <p className="text-red-500 text-sm mt-1">{errors.price.message}</p>}
      </div>

      {/* Stock */}
      <div className="flex flex-col">
        <label className="mb-1 font-medium text-gray-700">Stock inicial <span className='text-xs'>(Mín. 0)</span></label>
        <input
          type="number"
          {...register('stock', { valueAsNumber: true })}
          className="border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
        {errors.stock && <p className="text-red-500 text-sm mt-1">{errors.stock.message}</p>}
      </div>

      <button
        type="submit"
        disabled={loading}
        className="bg-purple-500 text-white py-2 rounded hover:bg-purple-600 transition mt-2"
      >
        {loading ? 'Creando...' : 'Crear Producto'}
      </button>
    </form>
  );
}
