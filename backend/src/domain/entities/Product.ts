export interface ProductProps {
  id: string;
  name: string;
  description?: string;
  price: number;
  stock: number;
  createdAt: Date;
}

export class Product {
  private props: ProductProps;

  constructor(props: ProductProps) {
    this.validate(props);
    this.props = props;
  }

  private validate(props: ProductProps) {
    if (!props.name || props.name.trim().length === 0) {
      throw new Error('Product name is required');
    }

    if (props.price < 0) {
      throw new Error('Product price cannot be negative');
    }

    if (props.stock < 0) {
      throw new Error('Product stock cannot be negative');
    }
  }

  get id() {
    return this.props.id;
  }

  get name() {
    return this.props.name;
  }

  get description() {
    return this.props.description;
  }

  get price() {
    return this.props.price;
  }

  get stock() {
    return this.props.stock;
  }

  increaseStock(quantity: number) {
    if (quantity <= 0) {
      throw new Error('quantity must be greater than zero');
    }
    this.props.stock += quantity;
  }

  decreaseStock(quantity: number) {
    if (quantity <= 0) {
      throw new Error('quantity must be greater than zero');
    }

    if (this.props.stock < quantity) {
      throw new Error('Insufficient stock');
    }

    this.props.stock -= quantity;
  }
}
