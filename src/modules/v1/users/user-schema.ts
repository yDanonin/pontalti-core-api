import { sanitizeBoolean } from '@pontalti/utils/sanitizer';
import * as yup from 'yup';

const createUserSchema = yup.object({
  body: yup.object({
    name: yup.string().required(),
    email: yup.string().required(),
    password: yup.string().required(),
    isAdmin: yup.boolean().optional().transform(sanitizeBoolean)
  })
})

export {
  createUserSchema
}