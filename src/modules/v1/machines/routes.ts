import { NextFunction, Request, Response, Router } from "express";
import createHttpError from "http-errors";
import machineService from "@pontalti/modules/v1/machines/machine-service";
const routes = Router();

routes.post('/', (req: Request, res: Response, next: NextFunction) => {
  machineService.createMachine(req.body)
    .then(result => {
      res.json(result)
    })
    .catch(e => {
      const httpError = createHttpError
      next(httpError)
    })
})

routes.get('/', (req: Request, res: Response, next: NextFunction) => {
  machineService.getAllMachines(req.params)
})

routes.get('/:id', (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.id;
  machineService.getMachineById(Number(id))
    .then(result => {
      res.json(result)
    })
    .catch(e => {
      const httpError = createHttpError
      next(httpError)
    })
})

routes.patch('/:id', (req: Request, res: Response, next: NextFunction) => {
  machineService.updatePartialMachine(Number(req.params.id), req.body)
    .then(result => {
      res.json(result)
    })
    .catch(e => {
      const httpError = createHttpError
      next(httpError)
    })
})

routes.delete('/:id', (req: Request, res: Response, next: NextFunction) => {
  machineService.deleteMachine(Number(req.params.id))
    .then(result => {
      res.json(result)
    })
    .catch(e => {
      const httpError = createHttpError
      next(httpError)
    })
})

export default routes
