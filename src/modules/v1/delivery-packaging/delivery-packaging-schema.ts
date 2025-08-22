import * as yup from 'yup';

const createDeliveryPackagingSchema = yup.object({
  body: yup.object({
    delivery_id: yup.number().required().positive().integer(),
    packaging_id: yup.number().required().positive().integer(),
    quantity: yup.number().required().positive().integer()
  })
});

const updateDeliveryPackagingSchema = yup.object({
  body: yup.object({
    quantity: yup.number().optional().positive().integer()
  })
});

const getDeliveryPackagingByDeliverySchema = yup.object({
  query: yup.object({
    delivery_id: yup.number().optional().positive().integer()
  })
});

const getDeliveryPackagingByPackagingSchema = yup.object({
  query: yup.object({
    packaging_id: yup.number().optional().positive().integer()
  })
});

export {
  createDeliveryPackagingSchema,
  updateDeliveryPackagingSchema,
  getDeliveryPackagingByDeliverySchema,
  getDeliveryPackagingByPackagingSchema
};
