import { Status } from "./common.types";

export type Vendor = {
  id: number;
  name: string;
  store_name: string;
  cnpj: string;
  status: Status;
  phone: string;
  cel_number: string;
  deliver: boolean;
  volume_purchases: number;
  purchases: number;
  invoicing: number;
  created_at: Date;
  updated_at: Date;
};

export type VendorRegister = Omit<Vendor, "id" | "created_at" | "updated_at">;
