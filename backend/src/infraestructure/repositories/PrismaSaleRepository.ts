import { SaleRepository } from '../../domain/repositories/SaleRepository'
import { Sale } from '../../domain/entities/Sale'
import prisma from '../../prisma.config'

export class PrismaSaleRepository implements SaleRepository {
  async create(sale: Sale): Promise<void> {
    await prisma.sale.create({
      data: {
        id: sale.id,
        productId: sale.productId,
        quantity: sale.quantity,
        date: sale.date
      }
    })
  }

  async list(): Promise<any[]> { 
  const sales = await prisma.sale.findMany({
    include: {
      product: true, 
    },
  })

  return sales.map(s => ({
    id: s.id,
    productId: s.productId,
    productName: s.product.name,
    quantity: s.quantity,
    date: s.date
  }))
}

  async findById(id: string): Promise<Sale | null> {
    const s = await prisma.sale.findUnique({ where: { id } })
    if (!s) return null
    return new Sale(s.id, s.productId, s.quantity, s.date)
  }
}
