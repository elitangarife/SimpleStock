import { ProductRepository } from '../../domain/repositories/ProductRepository'
import { Product } from '../../domain/entities/Product'

export class ListProducts {
  constructor(private productRepository: ProductRepository) {}

  async execute(): Promise<Product[]> {
    return this.productRepository.findAll()
  }
}