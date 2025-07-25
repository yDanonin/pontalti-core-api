import * as yup from "yup";

export const productionControlSchema = yup.object().shape({
  order_id: yup.number().required(),
  status: yup.number().required(),
  material_disponibility: yup.number().required()
});

export const productionControlUpdateSchema = yup.object().shape({
  status: yup.number(),
  material_disponibility: yup.number()
}); 