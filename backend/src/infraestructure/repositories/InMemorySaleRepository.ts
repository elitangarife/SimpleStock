import { SaleRepository } from '../../domain/repositories/SaleRepository';
import { Sale } from '../../domain/entities/Sale';

export class InMemorySaleRepository implements SaleRepository {
  private sales: Sale[] = [];

  async create(sale: Sale): Promise<void> {
    this.sales.push(sale);
  }

  async list(): Promise<Sale[]> {
    return this.sales;
  }

  async findById(id: string): Promise<Sale | null> {
    const sale = this.sales.find(s => s.id === id);
    return sale ?? null;
  }
}
