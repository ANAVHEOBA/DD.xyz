import { Chain } from '../../config/environment';

export interface ThreatAssessmentQueryParams {
    chain?: Chain;
    show_low_risk?: boolean;
}

export interface FundFlow {
    to: string;
    from: string;
    type: string;
    token: string;
    amount: number;
    txhash: string;
    risk_score: number;
}

export interface AccountInfo {
    type: string;
    label: string;
    address: string;
    risk_score: number;
    additional_labels: {
        ofac: boolean;
        hacker: boolean;
        mixers: boolean;
        drainer: boolean;
        fbi_ic3: boolean;
        tornado: boolean;
    };
}

export interface Details {
    fund_flows: {
        risk: {
            ofac: boolean;
            hacker: boolean;
            mixers: boolean;
            drainer: boolean;
            fbi_ic3: boolean;
            tornado: boolean;
        };
        flows: FundFlow[];
        label: string;
        accounts: { [key: string]: AccountInfo };
        fund_flow_risk: {
            ofac: boolean;
            hacker: boolean;
            mixers: boolean;
            drainer: boolean;
            fbi_ic3: boolean;
            tornado: boolean;
        };
    };
    address_info: {
        balance: number;
        expiresAt: number;
        time_1st_tx: string;
        time_verified: number;
        has_no_balance: boolean;
        automated_trading: boolean;
        transaction_count: number;
        has_no_transactions: boolean;
    };
    token_risk: Record<string, any>;
    token_metadata_risk: Record<string, any>;
    marketData: Record<string, any>;
    buy_sell_taxes: {
        has_buy_tax: boolean;
        has_sell_tax: boolean;
    };
    dev_launched_tokens_in_24_hours: any;
}

export interface WebacyResponse {
    count: number;
    medium: number;
    high: number;
    overallRisk: number;
    issues: Array<{
        score: number;
        tags: Array<{
            name: string;
            description: string;
            type: string;
            severity: number;
            key: string;
        }>;
        categories: {
            [key: string]: {
                key: string;
                name: string;
                gradedDescription?: {
                    high: string;
                    medium: string;
                    low: string;
                };
                description?: string;
                tags: Record<string, boolean>;
            };
        };
        riskScore: string;
    }>;
    details: Details;
    isContract: boolean;
}

export interface TokenMetadata {
    name: string;
    symbol: string;
    logo: string;
    decimals: number;
    assetAddress: string;
}

export interface TxData {
    blockNum: string;
    uniqueId: string;
    hash: string;
    from: string;
    to: string;
    value: number;
    erc721TokenId: string;
    erc1155Metadata: any;
    tokenId: string;
    asset: string;
    assetAddress: string;
    category: string;
    rawContract: {
        address: string;
        value: string;
    };
    metadata: {
        blockTimestamp: string;
    };
    blockNumDec: number;
    timestamp: number;
    datetime: string;
    direction: string;
    isContract: boolean;
    tokenType: string;
    functionName: string;
    chain: string;
    counterparty: string;
    isApproval: boolean;
}

export interface RiskTag {
    name: string;
    description: string;
    type: string;
    severity: number;
    key: string;
}

export interface RiskCategory {
    key: string;
    name: string;
    description?: string;
    gradedDescription?: {
        high: string;
        medium: string;
        low: string;
    };
    tags: Record<string, boolean>;
}

export interface ApprovalRisk {
    score: number;
    tags: RiskTag[];
    categories: Record<string, RiskCategory>;
    riskScore: string;
}

export interface ApprovalResult {
    txData: TxData;
    isApprovedForAll: boolean;
    remainingAllowance: number;
    tokenMetadata: TokenMetadata;
    risk: ApprovalRisk;
}

export interface ApprovalsResponse {
    totalPages: number;
    page: number;
    limit: number;
    total: number;
    results: ApprovalResult[];
}

export interface AddressInfo {
    balance: number;
    expiresAt: number;
    time_1st_tx: string;
    time_verified: number;
    has_no_balance: boolean;
    automated_trading: boolean;
    transaction_count: number;
    has_no_transactions: boolean;
}

export interface SanctionsCheckResponse {
    address: string;
    is_sanctioned: boolean;
}

export interface ContractRiskTag {
    key: string;
    name: string;
    type: string;
    severity: number;
    description: string;
}

export interface ContractRiskCategory {
    key: string;
    name: string;
    tags: Record<string, boolean>;
    gradedDescription: {
        low: string;
        high: string;
        medium: string;
    };
}

export interface ContractRiskResponse {
    tags: ContractRiskTag[];
    score: number;
    analysis: any[];
    deployer: Record<string, any>;
    expiresAt: number;
    riskScore: string;
    categories: Record<string, ContractRiskCategory>;
    analysis_type: string;
    analysis_status: string;
    isExpired: boolean;
}

export interface ContractRiskQueryParams {
    chain?: Chain;
    fromBytecode?: boolean;
    refreshCache?: boolean;
    callback?: string;
}

export interface UrlRiskRequest {
    url: string;
}

export interface UrlRiskResponse {
    riskLevel: 'high' | 'medium' | 'low' | 'unknown';
    description: string;
    message: string;
}

export interface QuickProfileResponse {
    high: number;
    count: number;
    issues: Array<{
        tags: Array<{
            key: string;
            name: string;
            type: string;
            severity: number;
            description: string;
        }>;
        score: number;
        riskScore: string;
        categories: {
            [key: string]: {
                key: string;
                name: string;
                tags: Record<string, boolean>;
                description?: string;
                gradedDescription?: {
                    low: string;
                    high: string;
                    medium: string;
                };
            };
        };
        transaction?: {
            datetime: string;
            token_id: string;
            direction: string;
            timestamp: number;
            token_name: string;
            token_risk: any;
            token_type: string;
            is_contract: boolean;
            block_number: number;
            from_to_address: string;
            token_risk_data: any;
            contract_address: string;
            transaction_hash: string;
            address_info_risk: any;
            address_risk_data: any;
            contract_risk_data: any;
            function_name?: string;
        };
    }>;
}

export interface ThreatAssessmentResponse {
    success: boolean;
    data?: WebacyResponse | SanctionsCheckResponse | ApprovalsResponse | ContractRiskResponse | UrlRiskResponse | QuickProfileResponse;
    error?: string;
} 