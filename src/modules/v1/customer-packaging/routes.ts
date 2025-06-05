import { Router } from "express";
import { validate } from "@pontalti/utils/validator";
import { createCustomerPackagingSchema, updateCustomerPackagingSchema, getCustomerPackagingByCustomerSchema, getCustomerPackagingByPackagingSchema, getCustomerPackagingByPontaltiBrandSchema } from "./customer-packaging-schema";
import customerPackagingService from "./customer-packaging-service";

const router = Router();

router.post("/", validate(createCustomerPackagingSchema), async (req, res) => {
  const result = await customerPackagingService.createCustomerPackaging(req.body);
  res.status(201).json(result);
});

router.get("/", async (req, res) => {
  const result = await customerPackagingService.getAllCustomerPackagings();
  res.json(result);
});

router.get("/:id", async (req, res) => {
  const result = await customerPackagingService.getCustomerPackaging(Number(req.params.id));
  if (!result) {
    return res.status(404).json({ message: "Customer Packaging not found" });
  }
  res.json(result);
});

router.put("/:id", validate(updateCustomerPackagingSchema), async (req, res) => {
  const result = await customerPackagingService.updateCustomerPackaging(Number(req.params.id), req.body);
  res.json(result);
});

router.delete("/:id", async (req, res) => {
  const result = await customerPackagingService.deleteCustomerPackaging(Number(req.params.id));
  res.json(result);
});

router.get("/customer/:customer_id", validate(getCustomerPackagingByCustomerSchema), async (req, res) => {
  const result = await customerPackagingService.getCustomerPackagingByCustomer(Number(req.query.customer_id));
  res.json(result);
});

router.get("/packaging/:packaging_id", validate(getCustomerPackagingByPackagingSchema), async (req, res) => {
  const result = await customerPackagingService.getCustomerPackagingByPackaging(Number(req.query.packaging_id));
  res.json(result);
});

router.get("/brand/:pontalti_brand", validate(getCustomerPackagingByPontaltiBrandSchema), async (req, res) => {
  const result = await customerPackagingService.getCustomerPackagingByPontaltiBrand(req.query.pontalti_brand === 'true');
  res.json(result);
});

export default router; 