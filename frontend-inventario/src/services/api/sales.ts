import { CreateSaleInput, Sale } from '@/types'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'


export async function createSale(data: { productId: string, quantity: number }): Promise<Sale> {
  const res = await fetch(`${API_URL}/sales`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })

  if (!res.ok) {
    const errorData = await res.json().catch(() => null)
    const message = errorData?.error || 'Error creando venta'
    throw new Error(message)
  }

  return res.json()
}

export async function fetchSales(): Promise<Sale[]> {
  const res = await fetch(`${API_URL}/sales`)
  if (!res.ok) throw new Error('Error fetching sales')
  return res.json()
}