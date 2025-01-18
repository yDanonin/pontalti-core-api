import { Status } from '@pontalti/types/common.types';
import * as yup from 'yup';

const createMachineSchema = yup.object({
  body: yup.object({
    model: yup.string().required(),
    machine_number: yup.number().required(),
    status: yup.mixed<Status>().oneOf([Status.Suspenso, Status.Operacional]).required(),
    location: yup.string().required(),
    location_status: yup.mixed<Status>().oneOf([Status.Suspenso, Status.Operacional]).required(),
  })
})

export {
  createMachineSchema
}