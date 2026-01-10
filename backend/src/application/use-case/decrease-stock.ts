import { ProductRepository } from '../../domain/repositories/ProductRepository'

export class DecreaseStock {
  constructor(private productRepository: ProductRepository) {}

  async execute(productId: string, quantity: number): Promise<void> {
    const product = await this.productRepository.findById(productId)
    if (!product) throw new Error('Product not found')

    product.decreaseStock(quantity)
    await this.productRepository.save(product)
  }
}
