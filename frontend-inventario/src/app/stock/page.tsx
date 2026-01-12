'use client';

import { useEffect, useState } from 'react';
import { FiPlusCircle } from 'react-icons/fi';
import { Product } from '@/types';
import CreateProductForm from '@/components/stock/CreateProductForm';
import { StockGrid } from '@/components/stock/StockGrid';
import { decreaseStock, fetchProducts, increaseStock } from '@/services/api/products';
import LoadingSpinner from '@/components/layout/LoadingSpinner';
import toast from 'react-hot-toast';
// import LoadingSpinner from '@/components/layout/LoadingSpinner';

export default function StockPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  const loadProducts = async () => {
    try {
      const data = await fetchProducts();
      setProducts(data);
    } catch (err) {
      console.error('Error cargando productos:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

    const handleUpdateStock = async (id: string, delta: number) => {
    try {
      const updated = delta > 0
        ? await increaseStock(id, delta)
        : await decreaseStock(id, -delta)
        
      setProducts(products.map(p => p.id === id ? updated : p))
    } catch (err: any) {
      console.error(err)
      if (err.message?.toLowerCase().includes('stock')) {
        toast.error('No hay suficiente stock para esta operación')
      } else {
        toast.error('Error al actualizar stock')
      }
    }
  }

  if (loading) return <div className="flex justify-center items-center min-h-screen">
      <LoadingSpinner size={48} color="border-blue-500" />
    </div>;

  return (
    <div className="min-h-screen bg-gray-100">
      <main className="px-4 sm:px-8 py-8 max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-4 sm:mb-0">
            Stock de Productos
          </h1>

          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600 transition text-sm"
          >
            <FiPlusCircle className="w-5 h-5" />
            Agregar Producto
          </button>
        </div>

        <StockGrid products={products} onUpdateStock={handleUpdateStock} />

        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-8 rounded-xl w-11/12 max-w-md shadow-lg relative">
              <button
                className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 text-2xl font-bold"
                onClick={() => setShowModal(false)}
              >
                &times;
              </button>

              <h2 className="text-2xl font-semibold mb-4 text-center">Crear Producto</h2>

              <CreateProductForm
                onProductCreated={(product) => {
                  setProducts([...products, product]);
                  setShowModal(false);
                }}
              />
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
