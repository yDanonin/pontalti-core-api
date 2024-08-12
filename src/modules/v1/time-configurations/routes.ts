import { NextFunction, Request, Response, Router } from "express";
import createHttpError from "http-errors";
import timeConfigurationService from "./time-configuration-service";

const routes = Router();

routes.get('/', (req: Request, res: Response, next: NextFunction) => {
  timeConfigurationService.getAllTimeConfigurations(req.query)
    .then(result => {
      res.json(result)
    })
    .catch(e => {
      const httpError = createHttpError(e)
      next(httpError)
    })
})

routes.get('/test', (req, res) => {
  res.status(200).json(req.headers);
});

routes.patch('/:id', (req, res, next) => {
  timeConfigurationService.updatePartialTimeConfiguration(Number(req.params.id), req.body)
    .then(result => {
      res.json(result)
    })
    .catch(e => {
      const httpError = createHttpError(e)
      next(httpError)
    })
})

routes.delete('/:id', (req, res, next) => {
  timeConfigurationService.deleteTimeConfiguration(Number(req.params.id))
    .then(result => {
      res.json(result)
    })
    .catch(e => {
      const httpError = createHttpError(e)
      next(httpError)
    })
})


export default routes
