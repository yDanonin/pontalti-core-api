import { Status } from '@pontalti/types/common.types';
import * as yup from 'yup';

const createVendorSchema = yup.object({
  body: yup.object({
    name: yup.string().required(),
    store_name: yup.string().required(),
    cnpj: yup.string().required().length(14),
    status: yup.mixed<Status>().oneOf([Status.suspenso, Status.operacional]).required(),
    phone: yup.string().required(),
    cel_number: yup.string().required(),
    deliver: yup.boolean().required(),
    volume_purchases: yup.number().required().positive(),
    purchases: yup.number().required().positive(),
    invoicing: yup.number().required().positive()
  })
})

export {
  createVendorSchema
}