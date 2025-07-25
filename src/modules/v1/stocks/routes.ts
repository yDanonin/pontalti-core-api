import * as yup from "yup";
import { Router } from "express";
import stockService from "./stock-service";
import { stockSchema, stockUpdateSchema } from "./stock-schema";
import { validate } from "@pontalti/utils/validator";
import createHttpError from "http-errors";

const router = Router();

router.post("/", validate(yup.object({ body: stockSchema })), (req, res, next) => {
  stockService.createStock(req.body)
    .then(stock => res.status(201).json(stock))
    .catch(e => next(createHttpError(e)));
});

router.get("/", (req, res, next) => {
  stockService.getStocks(req.query)
    .then(stocks => res.json(stocks))
    .catch(e => next(createHttpError(e)));
});

router.get("/:id", (req, res, next) => {
  stockService.getStock(Number(req.params.id))
    .then(stock => {
      if (!stock) return res.status(404).json({ error: "Stock not found" });
      res.json(stock);
    })
    .catch(e => next(createHttpError(e)));
});

router.patch("/:id", validate(yup.object({ body: stockUpdateSchema })), (req, res, next) => {
  stockService.updatePartialStock(Number(req.params.id), req.body)
    .then(stock => res.json(stock))
    .catch(e => next(createHttpError(e)));
});

router.delete("/:id", (req, res, next) => {
  stockService.deleteStock(Number(req.params.id))
    .then(stock => res.json(stock))
    .catch(e => next(createHttpError(e)));
});

export default router; 