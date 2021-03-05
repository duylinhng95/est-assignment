import {Document, Schema, model, Model} from 'mongoose';

export interface IEvent extends Document {
  eventName: string;
  startDate: Date;
  dueDate: Date;
  description: string;
  createdAt: Date;
  updatedAt: Date;
  createdBy: string;
  updatedBy: string;
}

const EventSchema: Schema = new Schema({
  eventName: {
    type: String,
    unique: true,
    required: true
  },
  startDate: {
    type: Date,
    required: true
  },
  dueDate: {
    type: Date,
    required: true
  },
  description: {
    type: String
  },
  createdAt: {
    type: Date,
    required: true
  },
  updatedAt: {
    type: Date
  },
  createdBy: {
    type: String,
    default: 'system'
  },
  updatedBy: {
    type: String
  }
});

const Event: Model<Document<IEvent>> = model('events', EventSchema);

export default Event;
