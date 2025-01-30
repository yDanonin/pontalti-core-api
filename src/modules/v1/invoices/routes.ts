import { Router } from 'express';
import invoiceService from './invoice-service';

const router = Router();

router.post('/', async (req, res, next) => {
  try {
    const result = await invoiceService.createInvoice(req.body);
    res.status(201).json(result);
  } catch (e) {
    next(e);
  }
});

router.get('/', async (_req, res, next) => {
  try {
    const result = await invoiceService.getAllInvoices();
    res.json(result);
  } catch (e) {
    next(e);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const result = await invoiceService.getInvoiceById(Number(req.params.id));
    res.json(result);
  } catch (e) {
    next(e);
  }
});

router.patch('/:id', async (req, res, next) => {
  try {
    const result = await invoiceService.updateInvoice(Number(req.params.id), req.body);
    res.json(result);
  } catch (e) {
    next(e);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const result = await invoiceService.deleteInvoice(Number(req.params.id));
    res.json(result);
  } catch (e) {
    next(e);
  }
});

export default router; 