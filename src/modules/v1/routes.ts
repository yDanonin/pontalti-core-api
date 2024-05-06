import { Router } from "express";

import customers from '@pontalti/modules/v1/customers/routes'
import employees from '@pontalti/modules/v1/employees/routes'
import machines from '@pontalti/modules/v1/machines/routes'
import procedures from '@pontalti/modules/v1/procedures/routes'
import products from '@pontalti/modules/v1/products/routes'
import vendors from '@pontalti/modules/v1/vendors/routes'
import auth from "@pontalti/modules/v1/auth/routes";
import users from "@pontalti/modules/v1/users/routes";

const routes = Router();

routes.get('/test', (req, res) => {
  res.status(200).json(req.headers);
});

routes.use('/customers', customers);
routes.use('/employees', employees);
routes.use('/machines', machines);
routes.use('/procedures', procedures);
routes.use('/products', products);
routes.use('/vendors', vendors);
routes.use('/auth', auth);
routes.use('/users', users);

export default routes;
