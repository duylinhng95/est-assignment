import {Document, Schema, model} from 'mongoose';

export interface IEvent extends Document {
  _id: string;
  eventName: string;
  startDate: Date;
  dueDate: Date;
  description: string;
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
  createdBy: {
    type: String,
    default: 'system'
  },
  updatedBy: {
    type: String
  }
}, {timestamps: true});

export default model('events', EventSchema);
