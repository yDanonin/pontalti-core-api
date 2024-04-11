import { NextFunction, Request, Response } from 'express';
import * as yup from "yup"
import { HttpError } from "http-errors";

const ErrorHandler = (err: HttpError, req: Request, res: Response, next: NextFunction) => {
  console.log("Middleware Error Hadnling");
  if (err instanceof yup.ValidationError) {
    return res.status(400).json({ error: err.message });
  }

  console.log("---------------------------- AQUI ----------------------------")
  console.log(err)
  console.log("---------------------------- AQUI ----------------------------")
  const errStatus = err.statusCode || 500;
  const errMsg = err.message || 'Something went wrong';
  res.status(errStatus).json({
    status: errStatus,
    message: errMsg,
  })
}
export default ErrorHandler;
