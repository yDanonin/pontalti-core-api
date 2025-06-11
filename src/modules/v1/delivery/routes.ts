import { Router } from "express";
import { validateRequest } from "@pontalti/middlewares/validate-request";
import { createDeliverySchema, updateDeliverySchema } from "./delivery-schema";
import service from "./delivery-service";

const router = Router();

router.post(
  "/",
  validateRequest(createDeliverySchema),
  async (req, res) => {
    const delivery = await service.createDelivery(req.body);
    res.status(201).json(delivery);
  }
);

router.get("/", async (req, res) => {
  const deliveries = await service.getAllDeliveries(req.query);
  res.json(deliveries);
});

router.get("/:id", async (req, res) => {
  const delivery = await service.getDeliveryById(Number(req.params.id));
  if (!delivery) {
    return res.status(404).json({ message: "Delivery not found" });
  }
  res.json(delivery);
});

router.put(
  "/:id",
  validateRequest(updateDeliverySchema),
  async (req, res) => {
    const delivery = await service.updateDelivery(Number(req.params.id), req.body);
    if (!delivery) {
      return res.status(404).json({ message: "Delivery not found" });
    }
    res.json(delivery);
  }
);

router.delete("/:id", async (req, res) => {
  const delivery = await service.deleteDelivery(Number(req.params.id));
  if (!delivery) {
    return res.status(404).json({ message: "Delivery not found" });
  }
  res.status(204).send();
});

export default router; 