import * as yup from 'yup';

const createCustomerPackagingSchema = yup.object({
  body: yup.object({
    customer_id: yup.number().required().positive().integer(),
    packaging_id: yup.number().required().positive().integer(),
    pontalti_brand: yup.boolean().required()
  })
});

const updateCustomerPackagingSchema = yup.object({
  body: yup.object({
    pontalti_brand: yup.boolean().optional()
  })
});

const getCustomerPackagingByCustomerSchema = yup.object({
  query: yup.object({
    customer_id: yup.number().optional().positive().integer()
  })
});

const getCustomerPackagingByPackagingSchema = yup.object({
  query: yup.object({
    packaging_id: yup.number().optional().positive().integer()
  })
});

const getCustomerPackagingByPontaltiBrandSchema = yup.object({
  query: yup.object({
    pontalti_brand: yup.boolean().optional()
  })
});

export {
  createCustomerPackagingSchema,
  updateCustomerPackagingSchema,
  getCustomerPackagingByCustomerSchema,
  getCustomerPackagingByPackagingSchema,
  getCustomerPackagingByPontaltiBrandSchema
}; 