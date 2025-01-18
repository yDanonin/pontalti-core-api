// model Orders {
//     id          Int      @id @default(autoincrement())
//     date        DateTime
//     price       Float
//     amount      Int
//     created_at  DateTime @default(now())
//     updated_at  DateTime @updatedAt
//     customer_id Int
//     product_id  Int
  
//     products  Products  @relation(fields: [product_id], references: [id])
//     customers Customers @relation(fields: [customer_id], references: [id])
  
//     payments       Payments[]
//     productReturns ProductReturns[]
//   }

import { Customer } from "./customer.types";
import { Product } from "./product.types";

export type Order = {
  id: number;
  date: Date;
  price: number;
  amount: number;
  created_at: Date;
  updated_at: Date;
  customers: Customer;
  products: Product;
};

export type OrderRegister = Omit<Order, "id" | "created_at" | "updated_at" | "customer" | "product"> & {
  customer_id: number;
  product_id: number;
};

export type UpdatePartialOrder = Partial<Order>;
