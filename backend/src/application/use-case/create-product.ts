import { ProductRepository } from '../../domain/repositories/ProductRepository'
import { Product } from '../../domain/entities/Product'
import { v4 as uuidv4 } from 'uuid'


interface CreateProductDTO {
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
      id: uuidv4(),         
      createdAt: new Date(), 
    })

    await this.productRepository.save(product)
    return product
  }
}