import * as yup from 'yup';

const getCalendarSchema = yup.object({
  query: yup.object({
    month: yup.number().min(1).max(12).required(),
    year: yup.number().min(2024).required(),
    date: yup.date().optional()
  })
});

export {
  getCalendarSchema
}; 