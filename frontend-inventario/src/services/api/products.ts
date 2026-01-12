import { NewProductInput, Product, Sale } from '../../types'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'

export async function fetchProducts(): Promise<Product[]> {
  const res = await fetch(`${API_URL}/products`)
  if (!res.ok) throw new Error('Error fetching products')
  return res.json()
}

export async function createProduct(data: NewProductInput): Promise<Product> {
  const res = await fetch(`${API_URL}/products`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  if (!res.ok) throw new Error('Error creating product')
  return res.json()
}

export async function increaseStock(productId: string, quantity: number = 1): Promise<Product> {
  const res = await fetch(`${API_URL}/products/${productId}/increase`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ quantity }),
  })
  if (!res.ok) throw new Error('Error increasing stock')
  return res.json()
}

export async function decreaseStock(productId: string, quantity: number = 1): Promise<Product> {
  const res = await fetch(`${API_URL}/products/${productId}/decrease`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ quantity }),
  })
  if (!res.ok) throw new Error('Error decreasing stock')
  return res.json()
}
