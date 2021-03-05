import {error} from "@Helper/response";
import {messages} from "@Type/AuthTypes";
import environment from "@Environment";
import jwt from 'jsonwebtoken';
import {NextFunction, Request, Response} from "express";
import User from "@Model/User";

export const authenticate = async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if(!authHeader) return error(res, messages.mustLogin, 401);

  const token = authHeader.split(' ')[1];
  try {
    const userAuth = await jwt.verify(token, environment.JWT_TOKEN);
    (req as any).auth = await User.findOne({username: (userAuth as any).username});
    next();
  } catch (err) {
    console.error(err);

    return error(res, messages.unauthorized, 403);
  }
}
