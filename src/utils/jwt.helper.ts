import jwt, { SignOptions } from 'jsonwebtoken';
import { environment } from '../config/environment';
import { IUserDocument } from '../modules/auth/auth.types';

interface JwtPayload {
    userId: string;
    email: string;
    type: 'user';
}

export const generateToken = (user: IUserDocument): string => {
    const payload: JwtPayload = {
        userId: user._id.toString(),
        email: user.email,
        type: 'user'
    };

    const options: SignOptions = {
        expiresIn: environment.jwtExpiresIn
    };

    return jwt.sign(payload, environment.jwtSecret, options);
};

export const verifyToken = (token: string): Promise<JwtPayload> => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, environment.jwtSecret, (err, decoded) => {
            if (err) return reject(err);
            resolve(decoded as JwtPayload);
        });
    });
};