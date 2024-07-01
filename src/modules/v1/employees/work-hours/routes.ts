import { NextFunction, Request, Response, Router } from "express";
import createHttpError from "http-errors";
import workHourService from "./work-hour-service";
import { filtersSchema } from "./work-hour-schema";
import { validate } from "@pontalti/utils/validator";

const routes = Router();

routes.post('/', (req, res, next) => {
  console.log("aqui")
  res.json({ok: true})
})

routes.get('/', (req: Request, res: Response, next: NextFunction) => {
  console.log(req.query)
  const { employee_id, startDate, endDate } = req.query;
  
  if (!employee_id || !startDate || !endDate) {
    const httpError = createHttpError(400, 'Missing required query parameters');
    return next(httpError);
  }

  const filters = {
    employee_id: Number(employee_id),
    startDate: new Date(startDate.toString()),
    endDate: new Date(endDate.toString())
  } 

  workHourService.getWorkHours(filters)
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


export default routes