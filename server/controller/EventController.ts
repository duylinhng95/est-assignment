import {Request, Response} from 'express-serve-static-core';
import {error, success} from "@Helper/response";
import EventService from "@Service/EventService";

const list = async (req: Request, res: Response) => {
  const params = req.query;
  const sortBy = params.sortBy ? String(params.sortBy) : 'createdAt';
  const direction = params.direction ? String(params.direction) : 'asc';
  const limit = Number(params.limit) || 5;
  const page = Number(params.page) || 1;

  const {status, message, data} = await EventService.listEvents(page, limit, sortBy, direction);

  if(!status) return error(res, 404, message);

  return success(res, data);
}

export default {
  list
}
