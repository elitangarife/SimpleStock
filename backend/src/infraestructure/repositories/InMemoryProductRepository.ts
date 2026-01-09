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

  async save(product: Product): Promise<void> {
    this.products.push(product)
  }
}
