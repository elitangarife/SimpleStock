export class Sale {
  constructor(
    public id: string,
    public productId: string,
    public quantity: number,
    public date: Date = new Date()
  ) {}
}