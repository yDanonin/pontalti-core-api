import { NextFunction, Request, Response, Router } from "express";
import createHttpError from "http-errors";
import { validate } from "@pontalti/utils/validator";
import { 
  createDeliveryPackagingSchema, 
  updateDeliveryPackagingSchema, 
  getDeliveryPackagingByDeliverySchema, 
  getDeliveryPackagingByPackagingSchema 
} from "./delivery-packaging-schema";
import deliveryPackagingService from "./delivery-packaging-service";

const router = Router();

router.post("/", validate(createDeliveryPackagingSchema), (req: Request, res: Response, next: NextFunction) => {
  deliveryPackagingService.createDeliveryPackaging(req.body)
    .then(result => {
      res.status(201).json(result)
    })
    .catch(e => {
      const httpError = createHttpError(e)
      next(httpError)
    })
});

router.get("/", (req: Request, res: Response, next: NextFunction) => {
  deliveryPackagingService.getAllDeliveryPackagings()
    .then(result => {
      res.json(result)
    })
    .catch(e => {
      const httpError = createHttpError(e)
      next(httpError)
    })
});

router.get("/:id", (req: Request, res: Response, next: NextFunction) => {
  deliveryPackagingService.getDeliveryPackaging(Number(req.params.id))
    .then(result => {
      if (!result) {
        res.status(404).json({ message: "Delivery Packaging not found" })
        return
      }
      res.json(result)
    })
    .catch(e => {
      const httpError = createHttpError(e)
      next(httpError)
    })
});

router.patch("/:id", validate(updateDeliveryPackagingSchema), (req: Request, res: Response, next: NextFunction) => {
  console.log("req.body")
  console.log(req.body)
  deliveryPackagingService.updateDeliveryPackaging(Number(req.params.id), req.body)
    .then(result => {
      res.json(result)
    })
    .catch(e => {
      const httpError = createHttpError(e)
      next(httpError)
    })
});

router.delete("/:id", (req: Request, res: Response, next: NextFunction) => {
  deliveryPackagingService.deleteDeliveryPackaging(Number(req.params.id))
    .then(result => {
      res.json(result)
    })
    .catch(e => {
      const httpError = createHttpError(e)
      next(httpError)
    })
});

router.get("/delivery/:delivery_id", validate(getDeliveryPackagingByDeliverySchema), (req: Request, res: Response, next: NextFunction) => {
  deliveryPackagingService.getDeliveryPackagingByDelivery(Number(req.query.delivery_id))
    .then(result => {
      res.json(result)
    })
    .catch(e => {
      const httpError = createHttpError(e)
      next(httpError)
    })
});

router.get("/packaging/:packaging_id", validate(getDeliveryPackagingByPackagingSchema), (req: Request, res: Response, next: NextFunction) => {
  deliveryPackagingService.getDeliveryPackagingByPackaging(Number(req.query.packaging_id))
    .then(result => {
      res.json(result)
    })
    .catch(e => {
      const httpError = createHttpError(e)
      next(httpError)
    })
});

export default router;
