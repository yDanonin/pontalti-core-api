import { NextFunction, Request, Response, Router } from "express";
import createHttpError from "http-errors";
import procedureService from "@pontalti/modules/v1/procedures/procedure-service";
const routes = Router();

routes.post('/', (req, res, next) => {
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
