import { NextFunction, Request, Response } from 'express';
import { HttpError } from "http-errors";

const ErrorHandler = (err: HttpError, req: Request, res: Response, next: NextFunction) => {
  const errStatus = err.statusCode || 500;
  const errMsg = err.message || 'Something went wrong';
  res.status(errStatus).json({
    status: errStatus,
    message: errMsg,
  })
}
export default ErrorHandler;
