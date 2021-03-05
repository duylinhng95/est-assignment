import {Request, Response} from 'express-serve-static-core';
import * as AuthService from '@Service/AuthService';
import {error, success} from "@Helper/response";

const register = async (req: Request, res: Response) => {
  const params = req.body;

  const {status, data, message} = await AuthService.registerUser(params.username, params.password);

  if(!status) {
    return error(res, message, 401);
  }

  return success(res, data);
}

const login = async (req: Request, res: Response) => {
  const params = req.body;

  const {status, data, message} = await AuthService.loginUser(params.username, params.password);
  if (!status) {
    return error(res, message, 401);
  }

  return success(res, data);
}

export default {
  register,
  login
}
