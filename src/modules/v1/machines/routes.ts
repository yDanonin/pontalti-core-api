import { NextFunction, Request, Response, Router } from "express";
import createHttpError from "http-errors";
import customerService from "./customer-service";
const routes = Router();

routes.post('/', (req: Request, res: Response, next: NextFunction) => {
  customerService.createCustomer(req.body)
    .then(result => {
      res.json(result)
    })
    .catch(e => {
      const httpError = createHttpError
      next(httpError)
    })
})

routes.get('/', (req: Request, res: Response, next: NextFunction) => {
  customerService.getAllCustomers(req.params)
})

routes.get('/:id', (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.id;
  customerService.getCustomerById(Number(id))
    .then(result => {
      res.json(result)
    })
    .catch(e => {
      const httpError = createHttpError
      next(httpError)
    })
})

routes.patch('/:id', (req: Request, res: Response, next: NextFunction) => {
  customerService.updatePartialCustomer(Number(req.params.id), req.body)
    .then(result => {
      res.json(result)
    })
    .catch(e => {
      const httpError = createHttpError
      next(httpError)
    })
})

routes.delete('/:id', (req: Request, res: Response, next: NextFunction) => {
  customerService.deleteCustomer(Number(req.params.id))
    .then(result => {
      res.json(result)
    })
    .catch(e => {
      const httpError = createHttpError
      next(httpError)
    })
})

export default routes
