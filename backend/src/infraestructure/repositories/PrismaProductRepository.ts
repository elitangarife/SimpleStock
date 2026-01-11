import { ProductRepository } from '../../domain/repositories/ProductRepository'
import { Product } from '../../domain/entities/Product'
import prisma from '../../prisma.config'

export class PrismaProductRepository implements ProductRepository {
  async findAll(): Promise<Product[]> {
    const dbProducts = await prisma.product.findMany()
    return dbProducts.map((p: any) => new Product(p))
  }

  async findById(id: string): Promise<Product | null> {
    const p = await prisma.product.findUnique({ where: { id } })
    return p ? new Product(p as any) : null
  }

  async save(product: Product): Promise<void> {
    await prisma.product.upsert({
      where: { id: product.id },
      update: {
        name: product.name,
        description: product.description,
        price: product.price,
        stock: product.stock,
      },
      create: {
        id: product.id,
        name: product.name,
        description: product.description,
        price: product.price,
        stock: product.stock,
      },
    })
  }

  async delete(id: string): Promise<void> {
    await prisma.product.delete({ where: { id } })
  }
}
