import { Router } from "express";

import customers from '@pontalti/modules/v1/customers/routes'
import auth from "@pontalti/modules/v1/auth/routes";

const routes = Router();

routes.get('/test', (req, res) => {
  res.status(200).json(req.headers);
});

routes.use('/customers', customers);
routes.use('/auth', auth);

export default routes;
