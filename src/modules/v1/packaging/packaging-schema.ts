import * as yup from 'yup';

const createPackagingSchema = yup.object({
  body: yup.object({
    name: yup.string().required(),
    quantity: yup.number().required().positive().integer(),
    storage_location: yup.string().required()
  })
});

const updatePackagingSchema = yup.object({
  body: yup.object({
    name: yup.string().optional(),
    quantity: yup.number().optional().positive().integer(),
    storage_location: yup.string().optional()
  })
});

const getPackagingByStorageLocationSchema = yup.object({
  query: yup.object({
    storage_location: yup.string().optional()
  })
});

const getPackagingByQuantitySchema = yup.object({
  query: yup.object({
    minQuantity: yup.number().optional().positive().integer()
  })
});

export {
  createPackagingSchema,
  updatePackagingSchema,
  getPackagingByStorageLocationSchema,
  getPackagingByQuantitySchema
}; 