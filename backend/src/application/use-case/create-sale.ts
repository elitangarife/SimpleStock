import { SaleRepository } from '../../domain/repositories/SaleRepository'
import { ProductRepository } from '../../domain/repositories/ProductRepository'
import { Sale } from '../../domain/entities/Sale'

export class CreateSale {
  constructor(
    private saleRepo: SaleRepository,
    private productRepo: ProductRepository
  ) {}

  async execute(productId: string, quantity: number) {
    const product = await this.productRepo.findById(productId)
    if (!product) throw new Error('Product not found')
    if (product.stock < quantity) throw new Error('Insufficient stock')

    // Reducir stock
    product.decreaseStock(quantity)
    await this.productRepo.save(product)

    // Crear registro de venta
    const sale = new Sale(Date.now().toString(), productId, quantity)
    await this.saleRepo.create(sale)

    return sale
  }
}
