import Event, {IEvent} from "@Model/Event";
import {getPaginationObject} from "@Helper/pagination";
import {ReturnService} from "@Type/BaseService";
import {IUser} from "@Model/User";
import dayjs from "dayjs";

const listEvents = async (pageNumber: number, pageLimit: number, sortBy: string, direction: string): Promise<ReturnService> => {
  const pagination = getPaginationObject(pageLimit, pageNumber, sortBy, direction);
  const events = await Event.find({}, null, pagination);

  if(!events) return {status: false, message: "No Events is found", data: []};

  return {status: true, data: events, message: ""};
}

const createEvent = async (params: IEvent, who: IUser): Promise<ReturnService> => {
  const payload = {
    ...params,
    startDate: dayjs(params.startDate, 'DD-MM-YYYY').toDate(),
    dueDate: dayjs(params.dueDate, 'DD-MM-YYYY'),
    createdBy: who._id
  };

  try {
    const event = await Event.create(payload);

    return {status: true, data: event, message: '', code: 200};
  } catch (error) {
    console.error(error);

    return {status: false, message: '', data: [], code: 500};
  }
}

const editEvent = async(params: IEvent, who: IUser, eventId: string): Promise<ReturnService> => {
  const payload = {
    ...params,
    startDate: dayjs(params.startDate, 'DD-MM-YYYY').toDate(),
    dueDate: dayjs(params.dueDate, 'DD-MM-YYYY'),
    updatedBy: who._id
  };

  try {
    const event = await Event.findOneAndUpdate({_id: eventId}, payload);

    return {status: true, data: event, message: '', code: 200};
  } catch (error) {
    console.error(error);

    return {status: false, message: '', data: [], code: 500};
  }
}

export default {
  listEvents,
  createEvent,
  editEvent
}
