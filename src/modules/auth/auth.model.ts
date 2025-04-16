import { model } from 'mongoose';
import { IUserDocument, IUserModel } from './auth.types';
import { userSchema } from './auth.schema';

export const User = model<IUserDocument, IUserModel>('User', userSchema); 