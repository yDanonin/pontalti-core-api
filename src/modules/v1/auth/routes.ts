import { Router, Request, Response, NextFunction } from "express";
import createHttpError from 'http-errors';
import authenticationService from "@pontalti/modules/v1/auth/auth-service"
import { RegisterUser } from "@pontalti/types/user.types";

const router = Router();

router.get('/test', (req, res) => {
  res.status(200).json(req.headers);
});


router.post("/register", (req, res, next) => {
  authenticationService.register({ email: req.body.email, name: req.body.name, password: req.body.password, isAdmin: req.body.isAdmin } as RegisterUser)
    .then((result) => {
      res.json(result);
    })
    .catch((e) => {
      const httpError = createHttpError(e);
      next(httpError);
    });
});

router.post("/login", (req, res, next) => {
  authenticationService.login(req.body.email, req.body.password)
    .then((result) => {
      res.json(result);
    })
    .catch((e) => {
      const httpError = createHttpError(e);
      next(httpError);
    });
});

router.post("/change-password", (req, res, next) => {
  console.log(req.headers.authorization)
  authenticationService.changePassword(req.body.newPassword, req.headers.authorization.split(' ')[1])
    .then((result) => {
      res.json(result);
    })
    .catch((e) => {
      const httpError = createHttpError(e);
      next(httpError);
    });
});

export default router;
