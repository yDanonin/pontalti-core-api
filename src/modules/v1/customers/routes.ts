import { NextFunction, Request, Response, Router } from "express";
import createHttpError from "http-errors";
import customerService from "@pontalti/modules/v1/customers/customer-service";
import { createCustomerSchema } from "@pontalti/modules/v1/customers/customer-schema"
import { validate } from "@pontalti/utils/validator";
const routes = Router();

routes.post('/', validate(createCustomerSchema), (req: Request, res: Response, next) => {
  customerService.createCustomer(req.body)
    .then(result => {
      res.json(result)
    })
    .catch(e => {
      next(e)
      // const httpError = createHttpError(e)
      // next(httpError)
    })
})

routes.get('/', (req: Request, res: Response, next: NextFunction) => {
  customerService.getAllCustomers(req.params)
    .then(result => {
      res.json(result)
    })
    .catch(e => {
      const httpError = createHttpError(e)
      next(httpError)
    })
})

routes.get('/:id', (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.id;
  customerService.getCustomerById(Number(id))
    .then(result => {
      res.json(result)
    })
    .catch(e => {
      const httpError = createHttpError(e)
      next(httpError)
    })
})

routes.put('/:id', (req: Request, res: Response, next: NextFunction) => {
  customerService.updatePartialCustomer(Number(req.params.id), req.body)
    .then(result => {
      res.json(result)
    })
    .catch(e => {
      const httpError = createHttpError(e)
      next(httpError)
    })
})

routes.delete('/:id', (req: Request, res: Response, next: NextFunction) => {
  customerService.deleteCustomer(Number(req.params.id))
    .then(result => {
      res.json(result)
    })
    .catch(e => {
      const httpError = createHttpError(e)
      next(httpError)
    })
})

export default routes
