import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { environment } from '../config/environment';
import mongoose from 'mongoose';

interface AuthJwtPayload {
    userId: string;
    email: string;
    type: 'user';
}

declare global {
    namespace Express {
        interface Request {
            user?: {
                userId: string;
                email: string;
                type: 'user';
                _id: mongoose.Types.ObjectId;
            };
        }
    }
}

export const authenticate = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const authHeader = req.headers.authorization;
        
        if (!authHeader?.startsWith('Bearer ')) {
            res.status(401).json({ 
                success: false,
                message: 'Authorization header must start with Bearer' 
            });
            return;
        }

        const token = authHeader.split(' ')[1];

        if (!token) {
            res.status(401).json({ 
                success: false,
                message: 'No token, authorization denied' 
            });
            return;
        }

        try {
            const decoded = jwt.verify(token, environment.jwtSecret) as AuthJwtPayload;

            if (decoded.type !== 'user') {
                res.status(403).json({
                    success: false,
                    message: 'Access denied. User access required.'
                });
                return;
            }

            req.user = {
                userId: decoded.userId,
                email: decoded.email,
                type: decoded.type,
                _id: new mongoose.Types.ObjectId(decoded.userId)
            };

            next();
        } catch (error) {
            if (error instanceof jwt.TokenExpiredError) {
                res.status(401).json({ 
                    success: false,
                    message: 'Token has expired' 
                });
                return;
            }

            res.status(401).json({ 
                success: false,
                message: 'Invalid token' 
            });
        }
    } catch (error) {
        console.error('Auth Middleware Error:', error);
        res.status(500).json({ 
            success: false,
            message: 'Internal server error' 
        });
    }
}; 