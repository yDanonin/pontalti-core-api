import { NextFunction, Request, Response, Router } from "express";
import createHttpError from "http-errors";
import machineService from "@pontalti/modules/v1/machines/machine-service";
import { createMachineSchema } from "@pontalti/modules/v1/machines/machine-schema"
import { validate } from "@pontalti/utils/validator";

const routes = Router();

routes.post('/', validate(createMachineSchema), (req, res, next) => {
  machineService.createMachine(req.body)
    .then(result => {
      res.json(result)
    })
    .catch(e => {
      const httpError = createHttpError(e)
      next(httpError)
    })
})

routes.get('/', (req, res, next) => {
  machineService.getAllMachines(req.params)
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
  machineService.getMachineById(Number(id))
    .then(result => {
      res.json(result)
    })
    .catch(e => {
      const httpError = createHttpError(e)
      next(httpError)
    })
})

routes.patch('/:id', (req, res, next) => {
  machineService.updatePartialMachine(Number(req.params.id), req.body)
    .then(result => {
      res.json(result)
    })
    .catch(e => {
      const httpError = createHttpError(e)
      next(httpError)
    })
})

routes.delete('/:id', (req, res, next) => {
  machineService.deleteMachine(Number(req.params.id))
    .then(result => {
      res.json(result)
    })
    .catch(e => {
      const httpError = createHttpError(e)
      next(httpError)
    })
})

export default routes
