import { Status } from '@pontalti/types/common.types';
import * as yup from 'yup';

const createProductSchema = yup.object({
  body: yup.object({
    status: yup.mixed<Status>().oneOf([Status.Suspenso, Status.Operacional]).required(),
    volume_sales: yup.number().required().positive(),
    sales: yup.number().required().positive(),
    invoicing: yup.number().required().positive(),
    name: yup.string().required(),
    model: yup.string().required(),
    size: yup.string().required(),
    character: yup.string().required(),
    moldes: yup.number().required().integer().positive(),
    equivalency: yup.number().required().positive(),
  })
})

export {
  createProductSchema
}