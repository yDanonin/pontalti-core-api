import * as yup from 'yup';
import { validateCpf } from "@pontalti/modules/v1/customers/customer-validator";
import { custom } from '@pontalti/utils/validator';

custom(validateCpf)

const createCustomerSchema = yup.object({
  body: yup.object({
    name: yup.string().required(),
    status: yup.number().required(),
    phone: yup.string().required(),
    cel_number: yup.string().required(),
    email: yup.string().email().required(),
    store_name: yup.string().required(),
    deliver: yup.boolean().required(),
    pontalti: yup.boolean().required(),
    secondary_line: yup.boolean().required(),
    credit_limit: yup.number().required(),
    cnpj: yup.string().optional(),
    cpf: yup.string().optional(),
    address: yup.object({
      zip_code: yup.string().required(),
      neighborhood: yup.string().required(),
      public_place: yup.string().required(),
      city: yup.string().required(),
      state: yup.string().required(),
      complement: yup.string().required(),
      address_number: yup.number().required()
    })
  })
}).test('cpfOrCnpjRequired', 'CPF or CNPJ is required', function(value) {
  const { cpf, cnpj } = value.body;
  if (!cpf && !cnpj) {
    throw this.createError({ message: 'CPF or CNPJ is required', path: 'body' });
  }
  return true;
})

export {
  createCustomerSchema
}
