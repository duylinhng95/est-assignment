import Event from "@Model/Event";
import {getPaginationObject} from "@Helper/pagination";
import {ReturnService} from "@Type/BaseService";

const listEvents = async (pageNumber: number, pageLimit: number, sortBy: string, direction: string): Promise<ReturnService> => {
  const pagination = getPaginationObject(pageLimit, pageNumber, sortBy, direction);
  const events = await Event.find({}, null, pagination);

  if(!events) return {status: false, message: "No Events is found", data: []};

  return {status: true, data: events, message: ""};
}

export default {
  listEvents
}
