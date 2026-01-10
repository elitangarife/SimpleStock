import { ProductRepository } from '../../domain/repositories/ProductRepository'
import { Product } from '../../domain/entities/Product'

export class InMemoryProductRepository implements ProductRepository {
  private products: Product[] = [
    new Product({
      id: '1',
      name: 'Producto A',
      price: 100,
      stock: 10,
      createdAt: new Date(),
    }),
    new Product({
      id: '2',
      name: 'Producto B',
      description: 'Descripción del producto B',
      price: 200,
      stock: 5,
      createdAt: new Date(),
    }),
  ]

  async findAll(): Promise<Product[]> {
    return this.products
  }

  async findById(id: string): Promise<Product | null> {
    const product = this.products.find(p => p.id === id)
    return product || null
  }

  async save(product: Product): Promise<void> {
    const index = this.products.findIndex(p => p.id === product.id)
    if (index >= 0) {
      // Actualiza si ya existe
      this.products[index] = product
    } else {
      // Agrega nuevo producto
      this.products.push(product)
    }
  }

  async delete(id: string): Promise<void> {
    this.products = this.products.filter(p => p.id !== id)
  }
}
