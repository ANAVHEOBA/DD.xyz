import express from 'express';
import { ThreatAssessmentController } from './threat.controller';
import { authenticate } from '../../middleware/auth.middleware';

const router = express.Router();

// Protected routes - require authentication
router.use(authenticate);

// GET /api/threat-assessment/:address
router.get('/:address', ThreatAssessmentController.assessAddress);

export default router; 