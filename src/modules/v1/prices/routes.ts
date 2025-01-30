import { Router } from "express";
import createHttpError from "http-errors";
import priceService from "@pontalti/modules/v1/prices/price-service";
import { createPriceSchema, updatePriceSchema } from "@pontalti/modules/v1/prices/price-schema";
import { validate } from "@pontalti/utils/validator";

const router = Router();

// Criar novo preço
router.post('/', validate(createPriceSchema), (req, res, next) => {
  priceService.createPrice(req.body)
    .then(result => {
      res.json(result);
    })
    .catch(e => {
      const httpError = createHttpError(e);
      next(httpError);
    });
});

// Buscar preço por ID
router.get('/:id', (req, res, next) => {
  priceService.getPriceById(Number(req.params.id))
    .then(result => {
      res.json(result);
    })
    .catch(e => {
      const httpError = createHttpError(e);
      next(httpError);
    });
});

// Buscar preço por produto e cliente
router.get('/product/:productId/customer/:customerId?', (req, res, next) => {
  const productId = Number(req.params.productId);
  const customerId = req.params.customerId ? Number(req.params.customerId) : undefined;
  
  priceService.getPriceByProductAndCustomer(productId, customerId)
    .then(result => {
      res.json(result);
    })
    .catch(e => {
      const httpError = createHttpError(e);
      next(httpError);
    });
});

// Listar todos os preços
router.get('/', (req, res, next) => {
  priceService.getAllPrices()
    .then(result => {
      res.json(result);
    })
    .catch(e => {
      const httpError = createHttpError(e);
      next(httpError);
    });
});

// Atualizar preço
router.patch('/:id', validate(updatePriceSchema), (req, res, next) => {
  priceService.updatePrice(Number(req.params.id), req.body)
    .then(result => {
      res.json(result);
    })
    .catch(e => {
      const httpError = createHttpError(e);
      next(httpError);
    });
});

// Deletar preço
router.delete('/:id', (req, res, next) => {
  priceService.deletePrice(Number(req.params.id))
    .then(result => {
      res.json(result);
    })
    .catch(e => {
      const httpError = createHttpError(e);
      next(httpError);
    });
});

export default router; 