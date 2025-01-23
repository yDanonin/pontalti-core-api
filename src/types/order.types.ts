import { Customer } from "./customer.types";
import { Product } from "./product.types";

export type Order = {
  id: number;
  final_price: number;
  amount: number;
  date: Date;
  created_at: Date;
  updated_at: Date;
  customer: Customer;
  product: Product;
};

export type OrderRegister = Omit<Order, "id" | "created_at" | "updated_at" | "customer" | "product"> & {
  customer_id: number;
  product_id: number;
};

export type UpdatePartialOrder = Partial<Order>;
