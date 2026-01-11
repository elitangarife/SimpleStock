import { Request, Response } from 'express'
import { CreateProduct } from '../../../application/use-case/create-product'
import { ListProducts } from '../../../application/use-case/list-products'
import { IncreaseStock } from '../../../application/use-case/increase-stock'
import { DecreaseStock } from '../../../application/use-case/decrease-stock'
import { ProductRepository } from '../../../domain/repositories/ProductRepository'
import { PrismaProductRepository } from '../../../infraestructure/repositories/PrismaProductRepository'

const productRepo: ProductRepository = new PrismaProductRepository()


export class ProductController {
  static async list(_req: Request, res: Response) {
    const useCase = new ListProducts(productRepo)
    const products = await useCase.execute()
    res.json(products.map(p => p.toJSON()))
    
  }

  static async create(req: Request, res: Response) {
    const useCase = new CreateProduct(productRepo)
    try {
      const productData = {
        ...req.body,
        stock: req.body.stock ?? 0
      }
      const product = await useCase.execute(productData)
      res.status(201).json(product.toJSON())
    } catch (err: any) {
      res.status(400).json({ error: err.message })
    }
  }

  static async increaseStock(req: Request, res: Response) {
    const { id } = req.params
    const { quantity } = req.body
    const useCase = new IncreaseStock(productRepo)
    try {
      await useCase.execute(id, quantity)
      res.json({ message: 'Stock increased' })
    } catch (err: any) {
      res.status(400).json({ error: err.message })
    }
  }

  static async decreaseStock(req: Request, res: Response) {
    const { id } = req.params
    const { quantity } = req.body
    const useCase = new DecreaseStock(productRepo)
    try {
      
      await useCase.execute(id, quantity)
      res.json({ message: 'Stock decreased' })
    } catch (err: any) {
      res.status(400).json({ error: err.message })
    }
  }
}
