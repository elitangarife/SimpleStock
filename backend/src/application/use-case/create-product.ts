import { ProductRepository } from '../../domain/repositories/ProductRepository'
import { Product } from '../../domain/entities/Product'

interface CreateProductDTO {
  id: string
  name: string
  description?: string
  price: number
  stock: number
}

export class CreateProduct {
  constructor(private productRepository: ProductRepository) {}

  async execute(data: CreateProductDTO): Promise<Product> {
    const product = new Product({
      ...data,
      createdAt: new Date(),
    })

    await this.productRepository.save(product)

    return product
  }
}
