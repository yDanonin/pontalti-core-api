import { NextFunction, Request, Response, Router } from "express";
import createHttpError from "http-errors";
import employeeService from "./employee-service";
const routes = Router();

routes.post('/', (req: Request, res: Response, next: NextFunction) => {
  employeeService.createEmployee(req.body)
    .then(result => {
      res.json(result)
    })
    .catch(e => {
      const httpError = createHttpError
      next(httpError)
    })
})

routes.get('/', (req: Request, res: Response, next: NextFunction) => {
  employeeService.getAllEmployees(req.params)
})

routes.get('/:id', (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.id;
  employeeService.getEmployeeById(Number(id))
    .then(result => {
      res.json(result)
    })
    .catch(e => {
      const httpError = createHttpError
      next(httpError)
    })
})

routes.put('/:id', (req: Request, res: Response, next: NextFunction) => {
  employeeService.updatePartialEmployee(Number(req.params.id), req.body)
    .then(result => {
      res.json(result)
    })
    .catch(e => {
      const httpError = createHttpError
      next(httpError)
    })
})

routes.delete('/:id', (req: Request, res: Response, next: NextFunction) => {
  employeeService.deleteEmployee(Number(req.params.id))
    .then(result => {
      res.json(result)
    })
    .catch(e => {
      const httpError = createHttpError
      next(httpError)
    })
})

export default routes
