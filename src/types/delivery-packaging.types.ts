export interface DeliveryPackaging {
  id: number;
  delivery_id: number;
  packaging_id: number;
  quantity: number;
  created_at: Date;
  updated_at: Date;
}

export interface DeliveryPackagingWithRelations extends DeliveryPackaging {
  delivery: {
    id: number;
    order_id: number;
    status: number;
    delivery_date: Date;
    created_at: Date;
    updated_at: Date;
  };
  packaging: {
    id: number;
    name: string;
    quantity: number;
    storage_location: string;
    created_at: Date;
    updated_at: Date;
  };
}

export interface CreateDeliveryPackagingDTO {
  delivery_id: number;
  packaging_id: number;
  quantity: number;
}

export interface UpdateDeliveryPackagingDTO {
  quantity?: number;
} 