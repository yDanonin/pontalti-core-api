import * as yup from 'yup';

const createPriceSchema = yup.object({
  body: yup.object({
    product_id: yup.number().required(),
    customer_id: yup.number().optional(),
    production_cost: yup.number().required().min(0),
    operational_margin: yup.number().required(),
    final_price: yup.number().required().min(0),
    second_line_price: yup.number().optional().min(0),
    frozen_until: yup.date().optional(),
    status: yup.string().required()
  })
});

const updatePriceSchema = yup.object({
  body: yup.object({
    product_id: yup.number().optional(),
    customer_id: yup.number().optional(),
    production_cost: yup.number().optional().min(0),
    operational_margin: yup.number().optional(),
    final_price: yup.number().optional().min(0),
    second_line_price: yup.number().optional().min(0),
    frozen_until: yup.date().optional(),
    status: yup.string().optional()
  })
});

export {
  createPriceSchema,
  updatePriceSchema
}; 