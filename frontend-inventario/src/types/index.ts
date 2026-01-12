export interface Product {
  id: string
  name: string
  description?: string
  price: number
  stock: number
  createdAt: string
}

export interface Sale {
  id: string
  productId: string
  name: string
  quantity: number
  date: string
}


export interface ProductForm {
  name: string;
  description?: string;
  price: number;
  stock: number;
}

export interface DashboardCardProps {
  title: string;
  description: string;
  href: string;
  icon: React.ReactNode;
  colorClass?: string;
}

export interface NewProductInput {
  name: string
  description?: string
  price: number
  stock: number
}


export interface CreateSaleInput {
  productId: string
  quantity: number
}