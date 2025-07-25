import * as yup from "yup";

export const stockSchema = yup.object().shape({
  amount: yup.number().required(),
  location: yup.string().required(),
  product_id: yup.number().required()
});

export const stockUpdateSchema = yup.object().shape({
  amount: yup.number(),
  location: yup.string(),
  product_id: yup.number()
}); 