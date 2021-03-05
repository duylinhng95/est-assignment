import {error} from "@Helper/response";
import {messages} from "@Type/AuthTypes";
import environment from "@Environment";
import jwt from 'jsonwebtoken';
import {NextFunction, Request, Response} from "express";

export const authenticate = async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if(!authHeader) return error(res, 401, messages.mustLogin);

  const token = authHeader.split(' ')[1];
  try {
    (req as any).auth = await jwt.verify(token, environment.JWT_TOKEN);
    next();
  } catch (err) {
    console.error(err);

    return error(res, 403, messages.unauthorized);
  }
}
