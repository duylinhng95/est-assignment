import {check} from 'express-validator';

export const createEventValidator = () => {
  return [
    check('eventName', 'Event name must not empty.').trim().not().isEmpty(),
    check('eventName', 'Event name must be string').isString(),
    check('startDate', 'Start date must not empty.').trim().not().isEmpty(),
    check('startDate', 'Start date must be Date')
        .isDate({format: 'DD-MM-YYYY'})
        .bail()
        .toDate()
        .if(check('dueDate').isDate({format: 'DD-MM-YYYY'})).custom((startDate, {req}) => {
        if (startDate.getTime() > (new Date(req.body.dueDate)).getTime()) {
          throw new Error('start date must be before Due Date');
        }
      }),
    check('dueDate', 'Due Date must not empty').trim().not().isEmpty(),
    check('dueDate', 'Due Date must be Date')
        .isDate({format: 'DD-MM-YYYY'})
        .bail()
        .toDate()
        .if(check('startDate').isDate({format: 'DD-MM-YYYY'})).custom((dueDate, {req}) => {
          if(dueDate.getTime() < (new Date(req.body.startDate)).getTime()) {
            throw new Error('Due date must be after start Date');
          }
        }),
    check('description', 'Description must be string').trim().isString()
  ]
}
