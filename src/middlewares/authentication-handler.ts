import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

const AuthenticationHandler = (req: Request, res: Response, next: NextFunction) => {
  if (!req.path.includes('/login') && !req.path.includes('/register')) {
    const authorization = req.header('Authorization');

    if (!authorization) {
      return res.status(401).json({ message: 'Unauthorized: Authentication token not provided. Please include a valid JWT token in the Authorization header.' });
    }


    const [_, token] = authorization.split(' ');


    jwt.verify(token, process.env.PRIVATE_KEY, (err: any, decoded: any) => {
      if (err) {
        return res.status(401).json({ message: 'Unauthorized: Invalid authentication token. Please make sure to provide a valid JWT token in the Authorization header.' });
      }
    });
  }
  next();
}

export default AuthenticationHandler;
