'use client'

import { FiPlus, FiMinus, FiPackage } from 'react-icons/fi'
import { Product } from '@/types'
import toast from 'react-hot-toast'
import React, { useState } from 'react'

interface ProductCardProps {
  product: Product
  onUpdateStock: (id: string, delta: number) => void
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onUpdateStock }) => {
  const [flash, setFlash] = useState<'increase' | 'decrease' | null>(null)

  const handleUpdate = (delta: number) => {
    if (delta < 0 && product.stock === 0) {
      toast.custom(() => (
        <div className="px-4 py-2 rounded shadow-lg text-white font-semibold bg-red-500">
          Stock de {product.name} = 0
        </div>
      ))
      return
    }

    const newStock = Math.max(product.stock + delta, 0)
    onUpdateStock(product.id, delta)
    
    toast.custom(() => (
      <div
        className={`px-4 py-2 rounded shadow-lg text-white font-semibold ${
          delta > 0 ? 'bg-green-500' : 'bg-red-500'
        }`}
      >
        {delta > 0
          ? `+${delta} Stock de ${product.name} = ${newStock}`
          : `${delta} Stock de ${product.name} = ${newStock}`}
      </div>
    ))

    setFlash(delta > 0 ? 'increase' : 'decrease')
    setTimeout(() => setFlash(null), 500)
  }

  return (
    <div className="w-72 p-6 bg-white shadow-md rounded-xl flex flex-col items-center text-center transform hover:-translate-y-1 hover:shadow-lg transition duration-300">
      <FiPackage className="text-blue-500 w-12 h-12 mb-3" />
      <h2 className="text-xl font-semibold mb-1 text-gray-800">{product.name}</h2>

      <p className="text-gray-500 mb-2 text-sm">
        {product.description
          ? product.description.length > 20
            ? product.description.slice(0, 20) + '…'
            : product.description
          : '—'}
      </p>

      <p className="text-gray-700 font-medium mb-1 text-sm">Precio: ${product.price}</p>
      
      <p
        className={`text-gray-700 font-bold mb-3 text-sm transition-colors duration-500 ${
          flash === 'increase' ? 'text-green-500 animate-pulse' : ''
        } ${flash === 'decrease' ? 'text-red-500 animate-pulse' : ''}`}
      >
        Stock: {product.stock}
      </p>

      <div className="flex gap-2">
        <button
          className="flex items-center justify-center w-10 h-10 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
          onClick={() => handleUpdate(+1)}
        >
          <FiPlus />
        </button>

        <button
          className="flex items-center justify-center w-10 h-10 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
          onClick={() => handleUpdate(-1)}
        >
          <FiMinus />
        </button>
      </div>
    </div>
  )
}
