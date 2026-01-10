import { ProductRepository } from '../../domain/repositories/ProductRepository'

export class IncreaseStock {
  constructor(private productRepository: ProductRepository) {}

  async execute(productId: string, quantity: number): Promise<void> {
    const product = await this.productRepository.findById(productId)
    if (!product) throw new Error('Product not found')

    product.increaseStock(quantity)
    await this.productRepository.save(product)
  }
}
