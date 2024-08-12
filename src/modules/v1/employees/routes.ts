import { Request, Response, Router } from "express";
import createHttpError from "http-errors";
import employeeService from "./employee-service";
import { createEmployeeSchema } from "@pontalti/modules/v1/employees/employee-schema"
import { validate } from "@pontalti/utils/validator";
import schedules from "@pontalti/modules/v1/employees/schedules/routes";
import work_hours from '@pontalti/modules/v1/employees/work-hours/routes'
import vacations from '@pontalti/modules/v1/employees/vacations/routes'

const routes = Router();

routes.use('/schedules', schedules)
routes.use('/work-hours', work_hours)
routes.use('/vacations', vacations)

routes.post('/', validate(createEmployeeSchema), (req, res, next) => {
  employeeService.createEmployee(req.body)
    .then(result => {
      res.json(result)
    })
    .catch(e => {
      const httpError = createHttpError(e)
      next(httpError)
    })
})

routes.get('/', (req, res, next) => {
  employeeService.getAllEmployees(req.params)
    .then(result => {
      res.json(result)
    })
    .catch(e => {
      const httpError = createHttpError(e)
      next(httpError)
    })
})

routes.get('/:id', (req, res, next) => {
  const id = req.params.id;
  employeeService.getEmployeeById(Number(id))
    .then(result => {
      res.json(result)
    })
    .catch(e => {
      const httpError = createHttpError(e)
      next(httpError)
    })
})

routes.patch('/:id', (req, res, next) => {
  employeeService.updatePartialEmployee(Number(req.params.id), req.body)
    .then(result => {
      res.json(result)
    })
    .catch(e => {
      const httpError = createHttpError(e)
      next(httpError)
    })
})

routes.delete('/:id', (req, res, next) => {
  employeeService.deleteEmployee(Number(req.params.id))
    .then(result => {
      res.json(result)
    })
    .catch(e => {
      const httpError = createHttpError(e)
      next(httpError)
    })
})

export default routes
