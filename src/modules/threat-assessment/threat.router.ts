import express from 'express';
import { ThreatAssessmentController } from './threat.controller';
import { authenticate } from '../../middleware/auth.middleware';

const router = express.Router();

// Protected routes - require authentication
router.use(authenticate);

// POST /api/threat-assessment/url/risk
router.post('/url/risk', ThreatAssessmentController.checkUrlRisk);

// GET /api/threat-assessment/sanctions/:address
router.get('/sanctions/:address', ThreatAssessmentController.checkSanctions);

// GET /api/threat-assessment/approvals/:address
router.get('/approvals/:address', ThreatAssessmentController.getApprovals);

// GET /api/threat-assessment/contract/:address
router.get('/contract/:address', ThreatAssessmentController.getContractRisk);

// GET /api/threat-assessment/:address
router.get('/:address', ThreatAssessmentController.assessAddress);

export default router; 