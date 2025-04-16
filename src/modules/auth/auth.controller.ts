import { Request, Response } from 'express';
import { AuthCrud } from './auth.crud';
import { generateToken } from '../../utils/jwt.helper';
import { ILoginCredentials, IRegistrationData } from './auth.types';

export class AuthController {
    async register(req: Request<{}, {}, IRegistrationData>, res: Response) {
        try {
            const { email, password, firstName, lastName } = req.body;

            // Check if user already exists
            const existingUser = await AuthCrud.findUserByEmail(email);
            if (existingUser) {
                return res.status(400).json({
                    success: false,
                    message: 'User already exists'
                });
            }

            // Create new user
            const user = await AuthCrud.createUser({
                email,
                password,
                firstName,
                lastName,
            });

            // Generate token
            const token = generateToken(user);

            // Return user data without password
            const userData = user.toJSON();
            delete userData.password;

            return res.status(201).json({
                success: true,
                message: 'User registered successfully',
                data: {
                    user: userData,
                    token,
                }
            });
        } catch (error) {
            console.error('Registration error:', error);
            return res.status(500).json({
                success: false,
                message: 'Internal server error'
            });
        }
    }

    async login(req: Request<{}, {}, ILoginCredentials>, res: Response) {
        try {
            const credentials = req.body;

            // Validate credentials and get user
            const user = await AuthCrud.validateCredentials(credentials);
            if (!user) {
                return res.status(401).json({
                    success: false,
                    message: 'Invalid credentials'
                });
            }

            // Generate token
            const token = generateToken(user);

            // Return user data without password
            const userData = user.toJSON();
            delete userData.password;

            return res.status(200).json({
                success: true,
                message: 'Login successful',
                data: {
                    user: userData,
                    token,
                }
            });
        } catch (error) {
            console.error('Login error:', error);
            return res.status(500).json({
                success: false,
                message: 'Internal server error'
            });
        }
    }
} 