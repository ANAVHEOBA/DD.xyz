import axios, { AxiosError } from 'axios';
import { environment } from '../../config/environment';
import { 
    ThreatAssessmentQueryParams, 
    ThreatAssessmentResponse, 
    WebacyResponse, 
    SanctionsCheckResponse, 
    ApprovalsResponse,
    ContractRiskResponse,
    ContractRiskQueryParams,
    UrlRiskResponse,
    UrlRiskRequest,
    QuickProfileResponse
} from './threat.types';
import { Injectable } from '@nestjs/common';

@Injectable()
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

            const response = await axios.get<WebacyResponse>(
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
                data: response.data
            };
        } catch (error: any) {
            console.error('Webacy API Error:', error.response?.data || error.message);
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

    static async checkSanctions(
        address: string,
        chain: string = 'eth'
    ): Promise<ThreatAssessmentResponse> {
        try {
            if (!this.apiKey) {
                throw new Error('Webacy API key is not configured');
            }

            const response = await axios.get<SanctionsCheckResponse>(
                `${this.baseUrl}/addresses/sanctioned/${address}`,
                {
                    headers: {
                        'accept': 'application/json',
                        'x-api-key': this.apiKey
                    },
                    params: { chain }
                }
            );

            return {
                success: true,
                data: response.data
            };
        } catch (error: any) {
            console.error('Webacy Sanctions Check Error:', error.response?.data || error.message);
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

    static async getApprovals(
        address: string,
        chain: string = 'eth'
    ): Promise<ThreatAssessmentResponse> {
        try {
            if (!this.apiKey) {
                throw new Error('Webacy API key is not configured');
            }

            const response = await axios.get<ApprovalsResponse>(
                `${this.baseUrl}/addresses/${address}/approvals`,
                {
                    headers: {
                        'accept': 'application/json',
                        'x-api-key': this.apiKey
                    },
                    params: { chain }
                }
            );

            return {
                success: true,
                data: response.data
            };
        } catch (error: any) {
            console.error('Webacy Approvals Check Error:', error.response?.data || error.message);
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

    static async getContractRisk(
        address: string,
        params?: ContractRiskQueryParams
    ): Promise<ThreatAssessmentResponse> {
        try {
            if (!this.apiKey) {
                throw new Error('Webacy API key is not configured');
            }

            const response = await axios.get<ContractRiskResponse>(
                `${this.baseUrl}/contracts/${address}`,
                {
                    headers: {
                        'accept': 'application/json',
                        'x-api-key': this.apiKey
                    },
                    params: {
                        chain: params?.chain || 'eth',
                        fromBytecode: params?.fromBytecode,
                        refreshCache: params?.refreshCache,
                        callback: params?.callback
                    }
                }
            );

            return {
                success: true,
                data: response.data
            };
        } catch (error: any) {
            console.error('Webacy Contract Risk Error:', error.response?.data || error.message);
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

    static async checkUrlRisk(url: string): Promise<ThreatAssessmentResponse> {
        try {
            if (!this.apiKey) {
                throw new Error('Webacy API key is not configured');
            }

            const requestData: UrlRiskRequest = { url };
            const response = await axios.post<UrlRiskResponse>(
                `${this.baseUrl}/url`,
                requestData,
                {
                    headers: {
                        'accept': 'application/json',
                        'content-type': 'application/json',
                        'x-api-key': this.apiKey
                    }
                }
            );

            return {
                success: true,
                data: response.data
            };
        } catch (error: any) {
            console.error('Webacy URL Risk Error:', error.response?.data || error.message);
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

    static async getQuickProfile(address: string): Promise<QuickProfileResponse> {
        try {
            const response = await axios.get<QuickProfileResponse>(
                `${environment.webacy.baseUrl}/quick-profile/${address}`,
                {
                    headers: {
                        'Accept': 'application/json',
                        'X-API-KEY': environment.webacy.apiKey,
                    },
                }
            );
            return response.data;
        } catch (error) {
            if (error instanceof AxiosError) {
                throw new Error(`Failed to fetch quick profile: ${error.message}`);
            }
            throw error;
        }
    }
} 