'use client';

import { useEffect, useState } from 'react';
import { Sale, Product } from '@/types';
import { FiPlusCircle } from 'react-icons/fi';
import { SalesTable } from '@/components/sales/SalesTable';
import toast from 'react-hot-toast';
import CreateSaleForm from './CreateSaleForm';
import { fetchSales } from '@/services/api/sales';
import { fetchProducts } from '@/services/api/products';

export default function SalesPage() {
  const [sales, setSales] = useState<Sale[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  const loadData = async () => {
    try {
      const [salesData, productsData] = await Promise.all([
        fetchSales(),
        fetchProducts()
      ]);
      setSales(salesData);
      setProducts(productsData);
    } catch (err) {
      console.error('Error cargando datos:', err);
      toast.error('Error cargando ventas o productos');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  if (loading) return <p className="text-center mt-12">Cargando ventas...</p>;

  // Mapear productId a nombre para la tabla
  const salesWithProductName = sales.map((s) => {
    const product = products.find(p => p.id === s.productId);
    return {
      ...s,
      productName: product?.name || 'Producto eliminado'
    };
  });

  return (
    <div className="min-h-screen bg-gray-100">

      <main className="px-4 sm:px-8 py-8 max-w-7xl mx-auto">
        {/* Título y botón */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-4 sm:mb-0">
            Ventas
          </h1>

          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition text-sm"
          >
            <FiPlusCircle className="w-5 h-5" />
            Agregar Venta
          </button>
        </div>

        {/* Tabla de ventas */}
        <SalesTable sales={salesWithProductName} />

        {/* Modal para crear venta */}
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-8 rounded-xl w-11/12 max-w-md shadow-lg relative">
              {/* Botón cerrar */}
              <button
                className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 text-2xl font-bold"
                onClick={() => setShowModal(false)}
              >
                &times;
              </button>

              <h2 className="text-2xl font-semibold mb-4 text-center">Registrar Venta</h2>

              <CreateSaleForm
                products={products}
                onSaleCreated={(sale) => {
                  setSales([...sales, sale]);
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
