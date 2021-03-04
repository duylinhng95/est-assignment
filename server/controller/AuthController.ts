import {Request, Response} from 'express-serve-static-core';
import {registerUser} from '@Service/AuthService';
import {error, success} from "@Helper/response";

const register = async (req: Request, res: Response) => {
  const params = req.body;

  const {status, data, message} = await registerUser(params.username, params.password);

  if(!status) {
    return error(res, 401, message);
  }

  return success(res, data);
}

export default {
  register,
}
