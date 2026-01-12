'use client'

import { useState } from 'react'
import { Product, Sale } from '@/types'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import toast from 'react-hot-toast'
import { createSale } from '@/services/api/sales'

const createSaleSchema = z.object({
  productId: z.string().min(1, 'Selecciona un producto'),
  quantity: z.number().min(1, 'Cantidad mínima 1'),
})

type FormInput = z.infer<typeof createSaleSchema>

interface Props {
  products: Product[]          // stock siempre actualizado desde el padre
  onSaleCreated: (sale: Sale) => void
}

export default function CreateSaleForm({ products, onSaleCreated }: Props) {
  const [loading, setLoading] = useState(false)
  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormInput>({
    resolver: zodResolver(createSaleSchema),
    defaultValues: { quantity: 1, productId: '' },
  })

  const onSubmit = async (data: FormInput) => {
    setLoading(true)
    try {
      const newSale = await createSale(data)
      onSaleCreated(newSale)
      toast.success(`Venta registrada: ${newSale.quantity} x ${products.find(p => p.id === newSale.productId)?.name}`)
      reset()
    } catch (err: any) {
      console.error(err)

      // Si el error viene del backend y menciona stock
      if (err.message?.toLowerCase().includes('stock')) {
        toast.error('No hay suficiente stock para realizar la venta')
      } else {
        toast.error('Error al registrar venta')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
      {/* Selector de producto */}
      <div className="flex flex-col">
        <label className="text-gray-700 font-medium text-sm">Producto</label>
        <select
          className="border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
          {...register('productId')}
        >
          <option value="">Selecciona un producto</option>
          {products.map(p => (
            <option key={p.id} value={p.id}>
              {p.name} (Stock: {p.stock})
            </option>
          ))}
        </select>
        {errors.productId && <p className="text-red-500 text-xs mt-1">{errors.productId.message}</p>}
      </div>

      {/* Cantidad */}
      <div className="flex flex-col">
        <label className="text-gray-700 font-medium text-sm">Cantidad</label>
        <input
          type="number"
          min={1}
          className="border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
          {...register('quantity', { valueAsNumber: true })}
        />
        {errors.quantity && <p className="text-red-500 text-xs mt-1">{errors.quantity.message}</p>}
      </div>

      {/* Botón de enviar */}
      <button
        type="submit"
        disabled={loading}
        className="bg-green-500 text-white py-2 rounded hover:bg-green-600 transition"
      >
        {loading ? 'Registrando...' : 'Registrar Venta'}
      </button>
    </form>
  )
}
