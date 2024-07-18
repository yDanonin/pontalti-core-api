import { NextFunction, Request, Response, Router } from "express";
import createHttpError from "http-errors";
import vacationService from "./vacation-service";
import { CustomRequest } from "@pontalti/types/common.types";

const routes = Router();

routes.post('/', (req: CustomRequest, res: Response, next: NextFunction) => {
  vacationService.createVacation(req.body)
    .then(result => {
      res.json(result)
    })
    .catch(e => {
      const httpError = createHttpError(e)
      next(httpError)
    })
})

routes.get('/', (req: Request, res: Response, next: NextFunction) => {
  vacationService.getAllVacations(req.query)
    .then(result => {
      res.json(result)
    })
    .catch(e => {
      const httpError = createHttpError(e)
      next(httpError)
    })
})

routes.patch('/:id', (req, res, next) => {
  vacationService.updatePartialVacation(Number(req.params.id), req.body)
    .then(result => {
      res.json(result)
    })
    .catch(e => {
      const httpError = createHttpError(e)
      next(httpError)
    })
})

routes.delete('/:id', (req, res, next) => {
  vacationService.deleteVacation(Number(req.params.id))
    .then(result => {
      res.json(result)
    })
    .catch(e => {
      const httpError = createHttpError(e)
      next(httpError)
    })
})


export default routes
