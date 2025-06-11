import { DeliveryStatus } from '@pontalti/types/delivery.types';
import * as yup from 'yup';

const createDeliverySchema = yup.object({
  body: yup.object({
    order_id: yup.number().required(),
    status: yup.mixed<DeliveryStatus>().oneOf([DeliveryStatus.PLANNING, DeliveryStatus.IN_ROUTE, DeliveryStatus.DELIVERED]).required(),
    delivery_date: yup.date().required(),
    packagings: yup.array().of(
      yup.object({
        packaging_id: yup.number().required(),
        quantity: yup.number().min(1).required()
      })
    ).required()
  })
});

const updateDeliverySchema = yup.object({
  body: yup.object({
    status: yup.mixed<DeliveryStatus>().oneOf([DeliveryStatus.PLANNING, DeliveryStatus.IN_ROUTE, DeliveryStatus.DELIVERED]),
    delivery_date: yup.date(),
    packagings: yup.array().of(
      yup.object({
        packaging_id: yup.number().required(),
        quantity: yup.number().min(1).required()
      })
    )
  })
});

export {
  createDeliverySchema,
  updateDeliverySchema
}; 