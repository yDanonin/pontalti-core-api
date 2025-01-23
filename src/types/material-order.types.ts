import { Product } from "./product.types";
import { Vendor } from "./vendor.types";

export type MaterialOrders = {
  id: number;
  amount: number;
  unit: string;
  storage_location: string;
  received_by: string;
  date: Date;
  created_at: Date;
  updated_at: Date;
  product: Product;
  vendor: Vendor;
};

export type MaterialOrdersRegister = Omit<MaterialOrders, "id" | "created_at" | "updated_at" | "product" | "vendor"> & {
  product_id: number;
  vendor_id: number;
};

export type UpdatePartialMaterialOrders = Partial<MaterialOrders>;
