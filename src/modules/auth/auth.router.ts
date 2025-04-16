import express, { Request, Response } from 'express';
import { AuthController } from './auth.controller';
import { authenticate } from '../../middleware/auth.middleware';
import { IRegistrationData, ILoginCredentials } from './auth.types';

const router = express.Router();
const authController = new AuthController();

type AsyncRequestHandler<T> = (
    req: Request<{}, {}, T>,
    res: Response
) => Promise<void>;

// Public routes
const registerHandler: AsyncRequestHandler<IRegistrationData> = async (req, res) => {
    await authController.register(req, res);
};

const loginHandler: AsyncRequestHandler<ILoginCredentials> = async (req, res) => {
    await authController.login(req, res);
};

router.post('/register', registerHandler);
router.post('/login', loginHandler);

// Protected routes - require authentication
router.use(authenticate);
router.get('/profile', (req: express.Request, res: express.Response) => {
    res.json({ 
        success: true,
        data: { user: req.user }
    });
});

export default router; 