import {check} from 'express-validator';

export const registerValidationRules = () => {
  return [
      check('username').trim().not().isEmpty().isString(),
      check('password').trim().not().isEmpty().isString()
  ]
}
