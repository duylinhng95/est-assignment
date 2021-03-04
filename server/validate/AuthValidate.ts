import {check} from 'express-validator';

export const registerValidationRules = () => {
  return [
      check('username').not().isEmpty().isString(),
      check('password').not().isEmpty().isString()
  ]
}
