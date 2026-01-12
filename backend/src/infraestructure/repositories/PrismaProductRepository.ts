import { ProductRepository } from '../../domain/repositories/ProductRepository'
import { Product } from '../../domain/entities/Product'
import prisma from '../../prisma.config'

export class PrismaProductRepository implements ProductRepository {
  async findAll(): Promise<Product[]> {
    const dbProducts = await prisma.product.findMany()
    return dbProducts.map((p: any) => new Product(p))
  }

  async findById(id: string): Promise<Product | null> {
    if (!id) throw new Error('Product ID is required')
    const p = await prisma.product.findUnique({ where: { id } })
    return p ? new Product(p as any) : null
  }

      async save(product: Product): Promise<void> {
      const p = product.toJSON(); // ahora p es { id, name, description, price, stock, createdAt }

      await prisma.product.upsert({
        where: { id: p.id },
        update: {
          name: p.name,
          description: p.description,
          price: p.price,
          stock: p.stock,
        },
        create: {
          ...p, // incluye id, name, description, price, stock, createdAt
        },
      });
    }

  async delete(id: string): Promise<void> {
    await prisma.product.delete({ where: { id } })
  }
}
