import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '@Model/User';
import environment from "@Environment";
import {ReturnService} from "@Type/BaseService";
import { messages } from '@Type/AuthTypes';

export const loginUser = async (username: string, password: string): Promise<ReturnService> => {
  const user = await User.findOne({username});

  if (!user) return {status: false, message: messages.invalidLogin, data: []};

  const validatePassword = bcrypt.compare(password, user.password);

  if (!validatePassword) return {status: false, message: messages.invalidLogin, data: []};

  const token = jwt.sign({username: user.username}, environment.JWT_TOKEN);

  return {status: true, data: {token}, message: messages.loginSuccess};
}

export const registerUser = async (username: string, password: string): Promise<ReturnService> => {
  const checkExistUser = await User.findOne({username});

  if(checkExistUser) return {status: false, message: messages.userExist, data: []};

  const encryptPassword = bcrypt.hashSync(password, environment.BCRYPT_HASH);
  const user = await User.create({username, password: encryptPassword});
  const token = jwt.sign({username: user.username}, environment.JWT_TOKEN);

  return {status: true, data: {token}, message: messages.registerSuccess};
}
