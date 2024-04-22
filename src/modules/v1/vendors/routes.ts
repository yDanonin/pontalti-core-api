import { NextFunction, Request, Response, Router } from "express";
import createHttpError from "http-errors";
import venrdorService from "@pontalti/modules/v1/vendors/vendor-service";
const routes = Router();

routes.post('/', (req, res, next) => {
  venrdorService.createVendor(req.body)
    .then(result => {
      res.json(result)
    })
    .catch(e => {
      const httpError = createHttpError(e)
      next(httpError)
    })
})

routes.get('/', (req, res, next) => {
  venrdorService.getAllVendors(req.params)
})

routes.get('/:id', (req, res, next) => {
  const id = req.params.id;
  venrdorService.getVendorById(Number(id))
    .then(result => {
      res.json(result)
    })
    .catch(e => {
      const httpError = createHttpError(e)
      next(httpError)
    })
})

routes.put('/:id', (req, res, next) => {
  venrdorService.updatePartialVendor(Number(req.params.id), req.body)
    .then(result => {
      res.json(result)
    })
    .catch(e => {
      const httpError = createHttpError(e)
      next(httpError)
    })
})

routes.delete('/:id', (req, res, next) => {
  venrdorService.deleteVendor(Number(req.params.id))
    .then(result => {
      res.json(result)
    })
    .catch(e => {
      const httpError = createHttpError(e)
      next(httpError)
    })
})

export default routes
