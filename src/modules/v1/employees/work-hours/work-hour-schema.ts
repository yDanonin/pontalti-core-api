import * as yup from 'yup';

//TODO: Fix it
const filtersSchema = yup.object({
  params: yup.object({
    employee_id: yup.number().required(),
    startDate: yup.date().required(),
    endDate: yup.date().required()
  })
})

export {
  filtersSchema
}
