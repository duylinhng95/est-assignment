import Event from "@Model/Event";
import {getPaginationObject} from "@Helper/pagination";
import {ReturnService} from "@Type/BaseService";
import {IUser} from "@Model/User";

const listEvents = async (pageNumber: number, pageLimit: number, sortBy: string, direction: string): Promise<ReturnService> => {
  const pagination = getPaginationObject(pageLimit, pageNumber, sortBy, direction);
  const events = await Event.find({}, null, pagination);

  if(!events) return {status: false, message: "No Events is found", data: []};

  return {status: true, data: events, message: ""};
}

const createEvent = async (params: object, who: IUser): Promise<ReturnService> => {
  const payload = {
    ...params,
    createdBy: who._id
  };
  try {
    const event = await Event.create(payload);

    return {status: true, data: event, message: ''};
  } catch (error) {
    console.error(error);

    return {status: false, message: '', data: []};
  }
}

export default {
  listEvents,
  createEvent
}
