import { Request, Response } from 'express';
import { ThreatAssessmentService } from './threat.service';
import { ThreatAssessmentQueryParams } from './threat.types';

export class ThreatAssessmentController {
    static async assessAddress(req: Request, res: Response) {
        try {
            const { address } = req.params;
            const queryParams: ThreatAssessmentQueryParams = {
                chain: req.query.chain as any,
                show_low_risk: req.query.show_low_risk === 'true'
            };

            const result = await ThreatAssessmentService.assessAddress(address, queryParams);

            if (!result.success) {
                return res.status(400).json({
                    success: false,
                    message: result.error || 'Failed to assess address'
                });
            }

            return res.status(200).json({
                success: true,
                data: result.data
            });
        } catch (error) {
            console.error('Threat assessment error:', error);
            return res.status(500).json({
                success: false,
                message: 'Internal server error'
            });
        }
    }
} 