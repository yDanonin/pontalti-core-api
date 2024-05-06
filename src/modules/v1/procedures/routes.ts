import { NextFunction, Request, Response, Router } from "express";
import createHttpError from "http-errors";
import procedureService from "@pontalti/modules/v1/procedures/procedure-service";
import { createProcedureSchema } from "@pontalti/modules/v1/procedures/procedure-schema"
import { validate } from "@pontalti/utils/validator";

const routes = Router();

routes.post('/', validate(createProcedureSchema), (req, res, next) => {
  procedureService.createProcedure(req.body)
    .then(result => {
      res.json(result)
    })
    .catch(e => {
      const httpError = createHttpError(e)
      next(httpError)
    })
})

routes.get('/', (req, res, next) => {
  procedureService.getAllProcedures(req.params)
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
  procedureService.getProcedureById(Number(id))
    .then(result => {
      res.json(result)
    })
    .catch(e => {
      const httpError = createHttpError(e)
      next(httpError)
    })
})

routes.patch('/:id', (req, res, next) => {
  procedureService.updatePartialProcedure(Number(req.params.id), req.body)
    .then(result => {
      res.json(result)
    })
    .catch(e => {
      const httpError = createHttpError(e)
      next(httpError)
    })
})

routes.delete('/:id', (req, res, next) => {
  procedureService.deleteProcedure(Number(req.params.id))
    .then(result => {
      res.json(result)
    })
    .catch(e => {
      const httpError = createHttpError(e)
      next(httpError)
    })
})

export default routes
