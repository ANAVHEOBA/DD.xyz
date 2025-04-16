import axios from 'axios';
import { environment, Chain } from '../../config/environment';
import { ThreatAssessmentQueryParams, ThreatAssessmentResponse } from './threat.types';

export class ThreatAssessmentService {
    private static readonly baseUrl = environment.webacy.baseUrl;
    private static readonly apiKey = environment.webacy.apiKey;

    static async assessAddress(
        address: string,
        params?: ThreatAssessmentQueryParams
    ): Promise<ThreatAssessmentResponse> {
        try {
            if (!this.apiKey) {
                throw new Error('Webacy API key is not configured');
            }

            const response = await axios.get<ThreatAssessmentResponse>(
                `${this.baseUrl}/addresses/${address}`,
                {
                    headers: {
                        'accept': 'application/json',
                        'x-api-key': this.apiKey
                    },
                    params: {
                        chain: params?.chain || 'eth',
                        show_low_risk: params?.show_low_risk
                    }
                }
            );

            return {
                success: true,
                data: response.data.data
            };
        } catch (error) {
            if (axios.isAxiosError(error)) {
                return {
                    success: false,
                    error: error.response?.data?.message || error.message
                };
            }
            return {
                success: false,
                error: 'An unexpected error occurred'
            };
        }
    }
} 