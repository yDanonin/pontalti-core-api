import { Status } from '@pontalti/types/common.types';
import * as yup from 'yup';

const createMaterialOrderSchema = yup.object({
  body: yup.object({
    final_price: yup.number().required(),
    amount: yup.number().required(),
    date: yup.date().required(),
    customer_id: yup.number().required(),
    product_id: yup.number().required()
  })
})

export {
  createMaterialOrderSchema
}