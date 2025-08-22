import { Router } from "express";
import createHttpError from "http-errors";
import service from "@pontalti/modules/v1/label-prints/label-print-service";
import { validate } from "@pontalti/utils/validator";
import { labelPrintCreateSchema, labelPrintUpdateSchema, labelPrintQuerySchema } from "@pontalti/modules/v1/label-prints/label-print-schema";

const router = Router();

router.post("/", validate(labelPrintCreateSchema), (req, res, next) => {
  service.createLabelPrint(req.body, req as any)
    .then(result => res.status(201).json(result))
    .catch(e => next(createHttpError(e)));
});

router.get("/", validate(labelPrintQuerySchema), (req, res, next) => {
  service.getLabelPrints(req.query)
    .then(result => res.json(result))
    .catch(e => next(createHttpError(e)));
});

router.get("/:id", (req, res, next) => {
  service.getLabelPrint(Number(req.params.id))
    .then(result => res.json(result))
    .catch(e => next(createHttpError(e)));
});

router.patch("/:id", validate(labelPrintUpdateSchema), (req, res, next) => {
  service.updatePartialLabelPrint(Number(req.params.id), req.body, req as any)
    .then(result => res.json(result))
    .catch(e => next(createHttpError(e)));
});

router.delete("/:id", (req, res, next) => {
  service.deleteLabelPrint(Number(req.params.id))
    .then(result => res.json(result))
    .catch(e => next(createHttpError(e)));
});

export default router;


