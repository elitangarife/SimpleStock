import React from 'react';
import { Sale } from '../../types';

interface Props {
  sales: Sale[];
}

export const SalesTable: React.FC<Props> = ({ sales }) => {
  const sortedSales = [...sales].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <div className="mt-6 w-full overflow-x-auto">
      <h3 className="text-2xl font-bold mb-4 mt-8 text-gray-800">Ventas Recientes</h3>

      <div className="inline-block min-w-full shadow-md rounded-lg overflow-hidden">
        <table className="min-w-full bg-white divide-y divide-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700 uppercase">Fecha</th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700 uppercase">ID Venta</th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700 uppercase">Producto</th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700 uppercase">Cantidad</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            {sortedSales.map((s) => (
              <tr
                key={s.id}
                className="hover:bg-gray-50 transition-colors"
              >
                <td className="px-4 py-2 text-sm text-gray-700 whitespace-nowrap">
                  {new Date(s.date).toLocaleString()}
                </td>
                <td className="px-4 py-2 text-sm text-gray-700 whitespace-nowrap">{s.id}</td>
                <td className="px-4 py-2 text-sm text-gray-700 whitespace-nowrap">{s.productId}</td>
                <td className="px-4 py-2 text-sm text-gray-700 whitespace-nowrap">{s.quantity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
