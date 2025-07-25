import * as yup from "yup";
import { Router } from "express";
import productionControlService from "./production-control-service";
import { productionControlSchema, productionControlUpdateSchema } from "./production-control-schema";
import { validate } from "@pontalti/utils/validator";
import createHttpError from "http-errors";

const router = Router();

router.post("/", validate(yup.object({ body: productionControlSchema })), (req, res, next) => {
  productionControlService.createProductionControl(req.body)
    .then(productionControl => res.status(201).json(productionControl))
    .catch(e => next(createHttpError(e)));
});

router.get("/", (req, res, next) => {
  productionControlService.getProductionControls(req.query)
    .then(productionControls => res.json(productionControls))
    .catch(e => next(createHttpError(e)));
});

router.get("/:id", (req, res, next) => {
  productionControlService.getProductionControl(Number(req.params.id))
    .then(productionControl => {
      if (!productionControl) return res.status(404).json({ error: "ProductionControl not found" });
      res.json(productionControl);
    })
    .catch(e => next(createHttpError(e)));
});

router.patch("/:id", validate(yup.object({ body: productionControlUpdateSchema })), (req, res, next) => {
  productionControlService.updatePartialProductionControl(Number(req.params.id), req.body)
    .then(productionControl => res.json(productionControl))
    .catch(e => next(createHttpError(e)));
});

router.delete("/:id", (req, res, next) => {
  productionControlService.deleteProductionControl(Number(req.params.id))
    .then(productionControl => res.json(productionControl))
    .catch(e => next(createHttpError(e)));
});

export default router; 