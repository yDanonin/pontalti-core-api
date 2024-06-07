import { Status } from '@pontalti/types/common.types';
import * as yup from 'yup';
import { sanitizeSpecialCharacters, sanitizeBoolean } from "@pontalti/utils/sanitizer";
import { cpf, cnpj } from 'cpf-cnpj-validator';

const createVendorSchema = yup.object({
  body: yup.object({
    name: yup.string().required(),
    store_name: yup.string().required(),
    cnpj: yup.string().required().transform(sanitizeSpecialCharacters),
    status: yup.mixed<Status>().oneOf([Status.suspenso, Status.operacional]).required(),
    phone: yup.string().required().transform(sanitizeSpecialCharacters).length(10),
    cel_number: yup.string().required().transform(sanitizeSpecialCharacters).length(11),
    deliver: yup.boolean().required().transform(sanitizeBoolean),
    volume_purchases: yup.number().required().positive(),
    purchases: yup.number().required().positive(),
    invoicing: yup.number().required().positive()
  })
}).test('DocumentValidator', 'A valid CNPJ is required', function(value) {
  const b = value.body;
  if (!b.cnpj) throw this.createError({ message: 'CNPJ is required', path: 'body' });
  else if (b.cnpj && !cnpj.isValid(b.cnpj)) throw this.createError({ message: 'CNPJ is not valid'});

  return true;
})


export {
  createVendorSchema
}