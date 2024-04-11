import { Router } from "express";

import customers from './customers/routes'

const routes = Router();

routes.get('/test', (req, res) => {
  res.status(200).json(req.headers);
});

routes.use('/customers', customers);

export default routes;
