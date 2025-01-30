import { Order } from './order.types';

export type Invoice = {
  id: number;
  order_id: number;
  order?: Order;
  number: string;
  status: string;
  type: string;
  issue_date: Date;
  recipient?: string;
  note?: string;
  created_at: Date;
  updated_at: Date;
};

export type CreateInvoice = Omit<Invoice, 'id' | 'created_at' | 'updated_at' | 'order'>;
export type UpdateInvoice = Partial<CreateInvoice>; 