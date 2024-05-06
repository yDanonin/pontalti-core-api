import { Router } from "express";
import createHttpError from "http-errors";
import userService from "@pontalti/modules/v1/users/user-service"; 

const router = Router();

router.get('/email', (req, res, next) => {
  userService.getUserByEmail(req.body.email)
    .then(result => {
      res.json(result);
    })
    .catch(e => {
      const httpError = createHttpError(e);
      next(httpError);
    })
})

router.get('/', (req, res, next) => {
  userService.getAllUsers()
    .then(result => {
      res.json(result);
    })
    .catch(e => {
      const httpError = createHttpError(e);
      next(httpError);
    })
})



export default router