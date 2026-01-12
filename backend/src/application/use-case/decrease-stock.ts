import { ProductRepository } from '../../domain/repositories/ProductRepository'

export class DecreaseStock {
  constructor(private productRepository: ProductRepository) {}

  async execute(productId: string, quantity: number) {
    const product = await this.productRepository.findById(productId)
    if (!product) throw new Error('Product not found')

    // Disminuir stock usando la lógica interna de Product
    product.decreaseStock(quantity)

    // Guardar cambios
    await this.productRepository.save(product)

    return product.toJSON() // Devuelve un objeto plano listo para el controller
  }
}
