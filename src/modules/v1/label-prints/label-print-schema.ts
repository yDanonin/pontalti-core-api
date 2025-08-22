import * as yup from "yup";

export const labelPrintCreateSchema = yup.object({
  body: yup.object({
    order_id: yup.number().required(),
  })
});

export const labelPrintUpdateSchema = yup.object({
  body: yup.object({
  })
});

export const labelPrintQuerySchema = yup.object({
  query: yup.object({
    page: yup.number().optional(),
    perPage: yup.number().optional(),
  })
});


