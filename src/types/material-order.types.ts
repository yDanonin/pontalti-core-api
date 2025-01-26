import { Product } from "./product.types";
import { Vendor } from "./vendor.types";

export type MaterialOrder = {
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

export type MaterialOrderRegister = Omit<MaterialOrder, "id" | "created_at" | "updated_at" | "product" | "vendor"> & {
  product_id: number;
  vendor_id: number;
};

export type UpdatePartialMaterialOrder = Partial<MaterialOrder>;
