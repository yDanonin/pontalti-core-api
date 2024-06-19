import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import userService from "@pontalti/modules/v1/users/user-service"

const AuthenticationHandler = (req: Request, res: Response, next: NextFunction) => {
  if (!req.path.includes('/login') && !req.path.includes('/register') && !req.path.includes('/test')) {
    const authorization = req.header('Authorization');

    if (!authorization) {
      return res.status(401).json({ message: 'Unauthorized: Authentication token not provided. Please include a valid JWT token in the Authorization header.' });
    }

    const [_, token] = authorization.split(' ');

    jwt.verify(token, process.env.PRIVATE_KEY, (err: any, decoded: any) => {
      if (err) {
        return res.status(401).json({ message: 'Unauthorized: Invalid authentication token. Please make sure to provide a valid JWT token in the Authorization header.' });
      }

      if(decoded) {
        userService.getUserByEmail(decoded.email)
          .then(u => {
            if(!u) return res.status(401).json({ message: 'Unauthorized: Invalid authentication token. Please make sure to provide a valid JWT token in the Authorization header.' });
            next()
          })
          .catch(e => {
            console.log(e)
            return res.status(500).json({ message: e.message });
          })
      }
    });
  }
  else{
    next();
  }
}

export default AuthenticationHandler;
