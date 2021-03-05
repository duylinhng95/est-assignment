import {Request, Response} from 'express-serve-static-core';
import {error, success, systemError} from "@Helper/response";
import EventService from "@Service/EventService";
import _ from "lodash";
import Event, {IEvent} from "@Model/Event";

const list = async (req: Request, res: Response) => {
  const params = req.query;
  const sortBy = params.sortBy ? String(params.sortBy) : 'createdAt';
  const direction = params.direction ? String(params.direction) : 'asc';
  const limit = Number(params.limit) || 5;
  const page = Number(params.page) || 1;

  const {status, message, data} = await EventService.listEvents(page, limit, sortBy, direction);

  if(!status) return error(res, message, 404);

  return success(res, data);
}

const create = async(req: Request, res: Response) => {
  const params = req.body;
  const who = (req as any).auth;

  const {status, data} = await EventService.createEvent(params, who);

  if(!status) return systemError(res);

  return success(res, data);
}

const edit = async(req: Request, res: Response) => {
  const params = _.omit(req.body, '_id') as IEvent;
  const eventId = _.pick(req.body, '_id')._id;
  const who = (req as any).auth;

  const {status, data, message, code} = await EventService.editEvent(params, who, eventId);

  if(!status) return error(res, message, code);

  return success(res, data);
}

const deleteEvent = async(req: any, res: Response) => {
  const eventId = req.params.eventId;
  const event = await Event.findByIdAndDelete(eventId);

  if(!event) return error(res, 'Event not found', 404);

  return success(res, event);
}

export default {
  list,
  create,
  edit,
  delete: deleteEvent
}
