import { Router } from "express";
import { validate } from "@pontalti/utils/validator";
import { createPackagingSchema, updatePackagingSchema, getPackagingByStorageLocationSchema, getPackagingByQuantitySchema } from "./packaging-schema";
import packagingService from "./packaging-service";

const router = Router();

router.post("/", validate(createPackagingSchema), async (req, res) => {
  const result = await packagingService.createPackaging(req.body);
  res.status(201).json(result);
});

router.get("/", async (req, res) => {
  const result = await packagingService.getAllPackagings();
  res.json(result);
});

router.get("/:id", async (req, res) => {
  const result = await packagingService.getPackaging(Number(req.params.id));
  if (!result) {
    return res.status(404).json({ message: "Packaging not found" });
  }
  res.json(result);
});

router.put("/:id", validate(updatePackagingSchema), async (req, res) => {
  const result = await packagingService.updatePackaging(Number(req.params.id), req.body);
  res.json(result);
});

router.delete("/:id", async (req, res) => {
  const result = await packagingService.deletePackaging(Number(req.params.id));
  res.json(result);
});

router.get("/storage/:storage_location", validate(getPackagingByStorageLocationSchema), async (req, res) => {
  const result = await packagingService.getPackagingByStorageLocation(req.query.storage_location as string);
  res.json(result);
});

router.get("/quantity/:minQuantity", validate(getPackagingByQuantitySchema), async (req, res) => {
  const result = await packagingService.getPackagingByQuantity(Number(req.query.minQuantity));
  res.json(result);
});

export default router; 