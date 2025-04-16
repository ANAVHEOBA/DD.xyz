import { Document, Model, Types } from 'mongoose';

// Base interface for User properties
export interface IUser {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    createdAt?: Date;
    updatedAt?: Date;
}

// Interface for User Document (instance methods)
export interface IUserDocument extends IUser, Document {
    _id: Types.ObjectId;
    comparePassword(candidatePassword: string): Promise<boolean>;
}

// Interface for User Model (static methods)
export interface IUserModel extends Model<IUserDocument> {
    // Add any static methods here if needed
}

export interface ILoginCredentials {
    email: string;
    password: string;
}

export interface IRegistrationData extends ILoginCredentials {
    firstName: string;
    lastName: string;
}

export interface IAuthResponse {
    user: Omit<IUser, 'password'>;
    token: string;
} 