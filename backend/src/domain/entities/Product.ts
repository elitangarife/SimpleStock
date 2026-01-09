export class Product {
  constructor(
    public readonly id: string,
    public name: string,
    public stock: number,
    public price: number
  ) {}
}