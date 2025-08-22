import * as yup from "yup";

export const salesForecastCreateSchema = yup.object({
  body: yup.object({
    customer_id: yup.number().required(),
    product_id: yup.number().required(),
    status: yup.number().oneOf([1, 2, 3, 4]).default(1),
    reason: yup.string().optional(),
    next_estimated_date: yup.date().optional(),
    frequency_days: yup.number().optional(),
    quantity: yup.number().integer().required(),
  })
});

export const salesForecastUpdateSchema = yup.object({
  body: yup.object({
    status: yup.number().oneOf([1, 2, 3, 4]).optional(),
    reason: yup.string().optional(),
    next_estimated_date: yup.date().optional(),
    frequency_days: yup.number().optional(),
    quantity: yup.number().integer().optional(),
  })
});

export const salesForecastQuerySchema = yup.object({
  query: yup.object({
    page: yup.number().optional(),
    perPage: yup.number().optional(),
    status: yup.number().oneOf([1, 2, 3, 4]).optional(),
  })
});

export const salesForecastPredictSchema = yup.object({
  body: yup.object({
    customer_id: yup.number().required(),
    product_id: yup.number().required(),
    k_orders: yup.number().min(2).max(10).default(5),
    horizon_months: yup.number().min(6).max(36).default(18),
    gamma: yup.number().min(0.1).max(1.0).default(0.5),
    k_shrink: yup.number().min(1).max(10).default(3),
    K0: yup.number().min(1).max(50).default(12),
    U_hot_prod: yup.number().min(0).max(1).default(0.25),
    heat_calendar: yup.object().optional(),
    persist: yup.boolean().default(false),
  })
});


