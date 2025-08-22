import { Router } from "express";
import createHttpError from "http-errors";
import salesForecastService from "@pontalti/modules/v1/sales-forecasts/sales-forecast-service";
import { validate } from "@pontalti/utils/validator";
import { salesForecastCreateSchema, salesForecastUpdateSchema, salesForecastQuerySchema, salesForecastPredictSchema } from "@pontalti/modules/v1/sales-forecasts/sales-forecast-schema";

const router = Router();

router.post("/", validate(salesForecastCreateSchema), (req, res, next) => {
  salesForecastService.createSalesForecast(req.body, req as any)
    .then(result => res.status(201).json(result))
    .catch(e => next(createHttpError(e)));
});

router.get("/", validate(salesForecastQuerySchema), (req, res, next) => {
  salesForecastService.getSalesForecasts(req.query)
    .then(result => res.json(result))
    .catch(e => next(createHttpError(e)));
});

router.get("/:id", (req, res, next) => {
  salesForecastService.getSalesForecast(Number(req.params.id))
    .then(result => res.json(result))
    .catch(e => next(createHttpError(e)));
});

router.patch("/:id", validate(salesForecastUpdateSchema), (req, res, next) => {
  salesForecastService.updatePartialSalesForecast(Number(req.params.id), req.body, req as any)
    .then(result => res.json(result))
    .catch(e => next(createHttpError(e)));
});

router.delete("/:id", (req, res, next) => {
  salesForecastService.deleteSalesForecast(Number(req.params.id))
    .then(result => res.json(result))
    .catch(e => next(createHttpError(e)));
});

router.post("/predict", validate(salesForecastPredictSchema), (req, res, next) => {
  salesForecastService.predict(req.body)
    .then(result => res.json(result))
    .catch(e => next(createHttpError(e)));
});

export default router;


