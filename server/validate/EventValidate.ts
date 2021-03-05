import {body, check} from 'express-validator';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import _ from "lodash";

dayjs.extend(customParseFormat)

function isDateFormat(key :string , value: any) {
  if(!dayjs(value, 'DD-MM-YYYY').isValid()) {
    const message = `${_.capitalize(_.upperCase(key))} must be Date`
    throw new Error(message);
  }
}

export const createEventValidator = () => {
  return [
    check('eventName', 'Event name must not empty.').trim().not().isEmpty(),
    check('eventName', 'Event name must be string').isString(),
    check('startDate', 'Start date must not empty.').trim().not().isEmpty(),
    check('dueDate', 'Due Date must not empty').trim().not().isEmpty(),
    body('startDate')
        .custom((input, {req}) => {
          if (req.body.startDate && req.body.dueDate) {
            isDateFormat('startDate', req.body.startDate)
            const startDate = dayjs(req.body.startDate, 'DD-MM-YYYY');
            const dueDate = dayjs(req.body.dueDate, 'DD-MM-YYYY');

            if (startDate.isAfter(dueDate)) {
              throw new Error('start date must be before Due Date');
            }
          }
          return true;
        }),
    body('dueDate')
        .custom((input, {req}) => {
          if (req.body.startDate && req.body.dueDate) {
            isDateFormat('dueDate', req.body.dueDate)
            const startDate = dayjs(req.body.startDate, 'DD-MM-YYYY');
            const dueDate = dayjs(req.body.dueDate, 'DD-MM-YYYY');

            if (dueDate.isBefore(startDate)) {
              throw new Error('Due date must be after Start Date');
            }
          }
          return true;
        }),
    check('description', 'Description must be string').trim().isString()
  ]
}

export const editEventValidator = () => {
  return [
    check('_id', 'Id must visible').trim().not().isEmpty(),
    body('startDate')
        .custom((input, {req}) => {
          if (req.body.startDate && req.body.dueDate) {
            isDateFormat('startDate', req.body.startDate)
            const startDate = dayjs(req.body.startDate, 'DD-MM-YYYY');
            const dueDate = dayjs(req.body.dueDate, 'DD-MM-YYYY');

            if (startDate.isAfter(dueDate)) {
              throw new Error('start date must be before Due Date');
            }
          }
          return true;
        }),
    body('dueDate')
        .custom((input, {req}) => {
          if (req.body.startDate && req.body.dueDate) {
            isDateFormat('dueDate', req.body.dueDate)
            const startDate = dayjs(req.body.startDate, 'DD-MM-YYYY');
            const dueDate = dayjs(req.body.dueDate, 'DD-MM-YYYY');

            if (dueDate.isBefore(startDate)) {
              throw new Error('Due date must be after Start Date');
            }
          }
          return true;
        }),
  ]
}
