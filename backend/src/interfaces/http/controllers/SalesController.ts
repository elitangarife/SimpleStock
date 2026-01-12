import { Request, Response } from 'express'
import { CreateSale } from '../../../application/use-case/create-sale'
import { ProductRepository } from '../../../domain/repositories/ProductRepository'
import { SaleRepository } from '../../../domain/repositories/SaleRepository'
import { PrismaProductRepository } from '../../../infraestructure/repositories/PrismaProductRepository'
import { PrismaSaleRepository } from '../../../infraestructure/repositories/PrismaSaleRepository'

// Repositorios
const productRepo: ProductRepository = new PrismaProductRepository()
const saleRepo: SaleRepository = new PrismaSaleRepository()

// Caso de uso
const createSaleUseCase = new CreateSale(saleRepo, productRepo)

export class SalesController {
  static async create(req: Request, res: Response) {
    try {
      const { productId, quantity } = req.body
      const sale = await createSaleUseCase.execute(productId, quantity)
      res.status(201).json(sale)
    } catch (err: any) {
      res.status(400).json({ error: err.message })
    }
  }

  static async list(_req: Request, res: Response) {
  try {
    const sales = await saleRepo.list()

    // Mapear a JSON plano
    const salesJSON = sales.map(sale => ({
      id: sale.id,
      productId: sale.productId,
      quantity: sale.quantity,
      date: sale.date
    }))

    res.json(salesJSON)
  } catch (err: any) {
    res.status(400).json({ error: err.message })
  }
}
}
