import { Router } from "express";

import customers from './customers/routes'
import ErrorHandler from "@pontalti/middlewares/error-handler";

const routes = Router();

routes.get('/test', (req, res) => {
  res.status(200).json(req.headers);
});

routes.use('/customers', customers);
// routes.use(ErrorHandler);

export default routes;
