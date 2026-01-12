'use client';

import { FiPackage, FiShoppingCart } from 'react-icons/fi';
import { DashboardCard } from '@/components/dashboard/DashboardCard';

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-100">
      <main className="px-4 sm:px-8 py-8 max-w-7xl mx-auto flex flex-col items-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-12 text-center">
          Bienvenido al Inventario
        </h1>

        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 justify-items-center">
          <DashboardCard
            title="Revisar Stock"
            description="Visualiza y actualiza el stock de tus productos"
            href="/stock"
            icon={<FiPackage className="w-12 h-12 mb-4" />}
            colorClass="text-blue-500"
          />

          <DashboardCard
            title="Ventas"
            description="Registra y consulta las ventas realizadas"
            href="/sales"
            icon={<FiShoppingCart className="w-12 h-12 mb-4" />}
            colorClass="text-green-500"
          />
        </div>
      </main>
    </div>
  );
}
