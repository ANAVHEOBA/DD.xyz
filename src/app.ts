import express from 'express';
import cors from 'cors';
import authRouter from './modules/auth/auth.router';
import threatRouter from './modules/threat-assessment/threat.router';
import { errorHandler } from './middleware/error.middleware';

const app = express();

// CORS Configuration
const corsOptions = {
  origin: [
    'http://localhost:3000',
    'http://localhost:3001',
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
  optionsSuccessStatus: 200
};

// Apply CORS with options
app.use(cors(corsOptions));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', authRouter);
app.use('/api/threat-assessment', threatRouter);

// Health check route
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

// Error handling middleware
app.use(errorHandler);

export default app; 