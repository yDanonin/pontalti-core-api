import { NextFunction, Request, Response, Router } from "express";
import createHttpError from "http-errors";
import scheduleService from "./schedule-service";
import { CustomRequest } from "@pontalti/types/common.types";

const routes = Router();

routes.post('/', (req: CustomRequest, res: Response, next: NextFunction) => {
  scheduleService.createSchedule(req.body)
    .then(result => {
      res.json(result)
    })
    .catch(e => {
      const httpError = createHttpError(e)
      next(httpError)
    })
})

routes.get('/', (req: Request, res: Response, next: NextFunction) => {
  scheduleService.getAllSchedules(req.query)
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
  scheduleService.updatePartialSchedule(Number(req.params.id), req.body)
    .then(result => {
      res.json(result)
    })
    .catch(e => {
      const httpError = createHttpError(e)
      next(httpError)
    })
})

routes.delete('/:id', (req, res, next) => {
  scheduleService.deleteSchedule(Number(req.params.id))
    .then(result => {
      res.json(result)
    })
    .catch(e => {
      const httpError = createHttpError(e)
      next(httpError)
    })
})


export default routes
