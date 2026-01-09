import { ProductRepository } from '../repositories/ProductRepository'
import { Product } from '../entities/Product'

export class ListProducts {
  constructor(private productRepository: ProductRepository) {}

  async execute(): Promise<Product[]> {
    return this.productRepository.findAll()
  }
}