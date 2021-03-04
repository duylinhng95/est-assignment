import {Document, Schema, model} from 'mongoose'

export interface IUser extends Document {
  username: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema: Schema = new Schema({
  username: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true,
  }
}, {timestamps: true});

export default model<IUser>('users', UserSchema);
