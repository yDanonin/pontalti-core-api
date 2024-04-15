import { NextFunction, Request, Response, Router } from "express";
import createHttpError from "http-errors";
import productService from "@pontalti/modules/v1/products/product-service";
const routes = Router();

routes.post('/', (req: Request, res: Response, next: NextFunction) => {
  productService.createProduct(req.body)
    .then(result => {
      res.json(result)
    })
    .catch(e => {
      const httpError = createHttpError
      next(httpError)
    })
})

routes.get('/', (req: Request, res: Response, next: NextFunction) => {
  productService.getAllProducts(req.params)
})

routes.get('/:id', (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.id;
  productService.getProductById(Number(id))
    .then(result => {
      res.json(result)
    })
    .catch(e => {
      const httpError = createHttpError
      next(httpError)
    })
})

routes.patch('/:id', (req: Request, res: Response, next: NextFunction) => {
  productService.updatePartialProduct(Number(req.params.id), req.body)
    .then(result => {
      res.json(result)
    })
    .catch(e => {
      const httpError = createHttpError
      next(httpError)
    })
})

routes.delete('/:id', (req: Request, res: Response, next: NextFunction) => {
  productService.deleteProduct(Number(req.params.id))
    .then(result => {
      res.json(result)
    })
    .catch(e => {
      const httpError = createHttpError
      next(httpError)
    })
})

export default routes
