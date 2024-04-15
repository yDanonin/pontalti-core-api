import { Router, Request, Response, NextFunction } from "express";
import createHttpError from 'http-errors';
import authenticationService from "@pontalti/modules/v1/auth/auth-service"
import { RegisterUser } from "@pontalti/types/user.types";

const router = Router();

router.post("/register", (req: Request, res: Response, next: NextFunction) => {
  authenticationService.register({ email: req.body.email, name: req.body.name, password: req.body.password } as RegisterUser)
    .then((result) => {
      res.json(result);
    })
    .catch((e) => {
      const httpError = createHttpError(e);
      next(httpError);
    });
});

router.post("/login", (req: Request, res: Response, next: NextFunction) => {
  authenticationService.login(req.body.email, req.body.password)
    .then((result) => {
      res.json(result);
    })
    .catch((e) => {
      const httpError = createHttpError(e);
      next(httpError);
    });
});

export default router;
