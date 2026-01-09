import { Request, Response } from 'express'
import { ListProducts } from '../../../application/use-case/list-products'
import { CreateProduct } from '../../../application/use-case/create-product'
import { InMemoryProductRepository } from '../../../infraestructure/repositories/InMemoryProductRepository'

export class ProductController {
  static async list(_req: Request, res: Response) {
    const productRepository = new InMemoryProductRepository()
    const listProducts = new ListProducts(productRepository)
    const products = await listProducts.execute()
    res.status(200).json(products)
  }

  static async create(req: Request, res: Response) {
    const { id, name, description, price, stock } = req.body

    const productRepository = new InMemoryProductRepository()
    const createProduct = new CreateProduct(productRepository)

    try {
      const product = await createProduct.execute({ id, name, description, price, stock })
      res.status(201).json(product)
    } catch (err: unknown) {
        if (err instanceof Error) {
            res.status(400).json({ error: err.message })
        } else {
            res.status(400).json({ error: 'Unknown error' })
        }
    }
  }
}
