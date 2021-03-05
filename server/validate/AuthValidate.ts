import {check} from 'express-validator';

export const authenticateValidationRules = () => {
  return [
      check('username').trim().not().isEmpty().isString(),
      check('password').trim().not().isEmpty().isString()
  ]
};
