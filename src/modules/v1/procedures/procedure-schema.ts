import { Status } from '@pontalti/types/common.types';
import * as yup from 'yup';

const createProcedureSchema = yup.object({
  body: yup.object({
    process_name: yup.string().required(),
    status: yup.mixed<Status>().oneOf([Status.Suspenso, Status.Operacional]).required(),
    workers: yup.number().required().positive().integer(),
  })
})

export {
  createProcedureSchema
}