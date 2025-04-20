import { Request, Response } from 'express';
import { ThreatAssessmentService } from './threat.service';
import { Chain } from '../../config/environment';
import { ThreatAssessmentQueryParams, ContractRiskQueryParams } from './threat.types';

export class ThreatAssessmentController {
    static async assessAddress(req: Request, res: Response) {
        try {
            const { address } = req.params;
            
            if (!address || !/^0x[a-fA-F0-9]{40}$/.test(address)) {
                return res.status(400).json({
                    success: false,
                    message: 'Invalid Ethereum address format'
                });
            }

            const queryParams: ThreatAssessmentQueryParams = {
                chain: req.query.chain as Chain,
                show_low_risk: req.query.show_low_risk === 'true'
            };

            const result = await ThreatAssessmentService.assessAddress(address, queryParams);
            return res.status(result.success ? 200 : 400).json(result);
        } catch (error: any) {
            console.error('Error in assessAddress controller:', error);
            return res.status(500).json({
                success: false,
                error: 'Internal server error'
            });
        }
    }

    static async checkSanctions(req: Request, res: Response) {
        try {
            const { address } = req.params;
            const chain = req.query.chain as Chain;

            const result = await ThreatAssessmentService.checkSanctions(address, chain);
            return res.status(result.success ? 200 : 400).json(result);
        } catch (error: any) {
            console.error('Error in checkSanctions controller:', error);
            return res.status(500).json({
                success: false,
                error: 'Internal server error'
            });
        }
    }

    static async getApprovals(req: Request, res: Response) {
        try {
            const { address } = req.params;
            
            if (!address || !/^0x[a-fA-F0-9]{40}$/.test(address)) {
                return res.status(400).json({
                    success: false,
                    message: 'Invalid Ethereum address format'
                });
            }

            const chain = req.query.chain as Chain;
            const result = await ThreatAssessmentService.getApprovals(address, chain);
            return res.status(result.success ? 200 : 400).json(result);
        } catch (error: any) {
            console.error('Error in getApprovals controller:', error);
            return res.status(500).json({
                success: false,
                error: 'Internal server error'
            });
        }
    }

    static async getContractRisk(req: Request, res: Response) {
        try {
            const { address } = req.params;
            
            if (!address || !/^0x[a-fA-F0-9]{40}$/.test(address)) {
                return res.status(400).json({
                    success: false,
                    message: 'Invalid Ethereum address format'
                });
            }

            const queryParams: ContractRiskQueryParams = {
                chain: req.query.chain as Chain,
                fromBytecode: req.query.fromBytecode === 'true',
                refreshCache: req.query.refreshCache === 'true',
                callback: req.query.callback as string
            };

            const result = await ThreatAssessmentService.getContractRisk(address, queryParams);
            return res.status(result.success ? 200 : 400).json(result);
        } catch (error: any) {
            console.error('Error in getContractRisk controller:', error);
            return res.status(500).json({
                success: false,
                error: 'Internal server error'
            });
        }
    }

    static async checkUrlRisk(req: Request, res: Response) {
        try {
            const { url } = req.body;

            if (!url || typeof url !== 'string') {
                return res.status(400).json({
                    success: false,
                    message: 'URL is required and must be a string'
                });
            }

            // Basic URL validation
            try {
                new URL(url);
            } catch (e) {
                return res.status(400).json({
                    success: false,
                    message: 'Invalid URL format'
                });
            }

            const result = await ThreatAssessmentService.checkUrlRisk(url);
            return res.status(result.success ? 200 : 400).json(result);
        } catch (error: any) {
            console.error('Error in checkUrlRisk controller:', error);
            return res.status(500).json({
                success: false,
                error: 'Internal server error'
            });
        }
    }
} 