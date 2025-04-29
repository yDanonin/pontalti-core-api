import { Request, Response, NextFunction } from 'express';
import { Schema } from 'yup';

export const validateRequest = (schema: Schema<any>) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.validate({
        body: req.body,
        query: req.query,
        params: req.params,
      }, { abortEarly: false });
      return next();
    } catch (error) {
      return res.status(400).json({
        errors: error.errors
      });
    }
  };
}; 