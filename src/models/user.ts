import mongoose, { Schema } from 'mongoose';

export interface IUser extends mongoose.Document {
  username: string;
  email: string;
  password: string;
  refreshToken: string;
  accessToken: string;
}

const UserSchema = new Schema<IUser>(
  {
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    refreshToken: { type: String, required: false },
  },
  { timestamps: true }
);

export interface IUserModel extends mongoose.Model<IUser> {} // https://stackoverflow.com/a/37970346

export const UserModel: IUserModel = <IUserModel>(
  mongoose.model<IUser>('User', UserSchema)
);
