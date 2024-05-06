import { NextFunction, Request, Response, Router } from "express";
import createHttpError from "http-errors";
import venrdorService from "@pontalti/modules/v1/vendors/vendor-service";
import { createVendorSchema } from "@pontalti/modules/v1/vendors/vendor-schema"
import { validate } from "@pontalti/utils/validator";

const routes = Router();

routes.post('/', validate(createVendorSchema), (req, res, next) => {
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
