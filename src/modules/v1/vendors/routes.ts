import { NextFunction, Request, Response, Router } from "express";
import createHttpError from "http-errors";
import venrdorService from "@pontalti/modules/v1/vendors/vendor-service";
const routes = Router();

routes.post('/', (req: Request, res: Response, next: NextFunction) => {
  venrdorService.createVendor(req.body)
    .then(result => {
      res.json(result)
    })
    .catch(e => {
      const httpError = createHttpError
      next(httpError)
    })
})

routes.get('/', (req: Request, res: Response, next: NextFunction) => {
  venrdorService.getAllVendors(req.params)
})

routes.get('/:id', (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.id;
  venrdorService.getVendorById(Number(id))
    .then(result => {
      res.json(result)
    })
    .catch(e => {
      const httpError = createHttpError
      next(httpError)
    })
})

routes.put('/:id', (req: Request, res: Response, next: NextFunction) => {
  venrdorService.updatePartialVendor(Number(req.params.id), req.body)
    .then(result => {
      res.json(result)
    })
    .catch(e => {
      const httpError = createHttpError
      next(httpError)
    })
})

routes.delete('/:id', (req: Request, res: Response, next: NextFunction) => {
  venrdorService.deleteVendor(Number(req.params.id))
    .then(result => {
      res.json(result)
    })
    .catch(e => {
      const httpError = createHttpError
      next(httpError)
    })
})

export default routes
