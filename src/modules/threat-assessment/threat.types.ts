import { Chain } from '../../config/environment';

export interface ThreatAssessmentQueryParams {
    chain?: Chain;
    show_low_risk?: boolean;
}

export interface RiskCounts {
    high: number;
    medium: number;
    low: number;
}

export interface ThreatAssessmentResponse {
    success: boolean;
    data?: {
        address: string;
        chain: Chain;
        count: number;
        risk_counts: RiskCounts;
        risk_issues?: Array<{
            name: string;
            risk_level: 'high' | 'medium' | 'low';
            description: string;
            category: string;
        }>;
    };
    error?: string;
} 