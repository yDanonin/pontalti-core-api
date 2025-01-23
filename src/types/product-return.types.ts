import { Customer } from "./customer.types";
import { Order } from "./order.types";
import { ReturnedLabel } from "./returned_label.types";

export type ProductReturn = {
  id: number;
  amount: number;
  return_reason: string;
  replacement_necessary: boolean;
  resold: boolean
  date: Date;
  created_at: Date;
  updated_at: Date;
  customer: Customer;
  order: Order;
  ReturnedLabel: ReturnedLabel;
};

export type ProductReturnRegister = Omit<ProductReturn, "id" | "created_at" | "updated_at" | "customer" | "order" | "ReturnedLabel"> & {
  customer_id: number;
  order_id: number;
  returned_label_id: number;
};

export type UpdatePartialProductReturn = Partial<ProductReturn>;
