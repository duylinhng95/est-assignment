import {NextFunction, Response, Request} from "express-serve-static-core";
import {ValidationError} from "express-validator/src/base";
import { validationResult } from 'express-validator';
import {error} from '@Helper/response';

export const validate = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }

  const extractedErrors: object[] = [];
  errors.array().map((err: ValidationError) => extractedErrors.push({ [err.param]: err.msg }));

  return error(res, 401, 'Invalid parameter', extractedErrors);
}
