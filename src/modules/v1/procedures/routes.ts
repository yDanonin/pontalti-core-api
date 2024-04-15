import { NextFunction, Request, Response, Router } from "express";
import createHttpError from "http-errors";
import procedureService from "@pontalti/modules/v1/procedures/procedure-service";
const routes = Router();

routes.post('/', (req: Request, res: Response, next: NextFunction) => {
  procedureService.createProcedure(req.body)
    .then(result => {
      res.json(result)
    })
    .catch(e => {
      const httpError = createHttpError
      next(httpError)
    })
})

routes.get('/', (req: Request, res: Response, next: NextFunction) => {
  procedureService.getAllProcedures(req.params)
})

routes.get('/:id', (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.id;
  procedureService.getProcedureById(Number(id))
    .then(result => {
      res.json(result)
    })
    .catch(e => {
      const httpError = createHttpError
      next(httpError)
    })
})

routes.patch('/:id', (req: Request, res: Response, next: NextFunction) => {
  procedureService.updatePartialProcedure(Number(req.params.id), req.body)
    .then(result => {
      res.json(result)
    })
    .catch(e => {
      const httpError = createHttpError
      next(httpError)
    })
})

routes.delete('/:id', (req: Request, res: Response, next: NextFunction) => {
  procedureService.deleteProcedure(Number(req.params.id))
    .then(result => {
      res.json(result)
    })
    .catch(e => {
      const httpError = createHttpError
      next(httpError)
    })
})

export default routes
