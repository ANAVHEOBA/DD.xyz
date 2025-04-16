import dotenv from 'dotenv';

dotenv.config();

type JwtExpiration = '7d' | '24h' | '1h' | '15m';

export type Chain = 'eth' | 'arb' | 'base' | 'bsc' | 'pol' | 'opt' | 'sol' | 'ton' | 'sei';

export const environment = {
    port: process.env.PORT || 5000,
    mongoUri: process.env.MONGODB_URI || 'mongodb://localhost:27017/ddxyz',
    jwtSecret: process.env.JWT_SECRET || 'your-secret-key',
    jwtExpiresIn: (process.env.JWT_EXPIRES_IN || '7d') as JwtExpiration,
    nodeEnv: process.env.NODE_ENV || 'development',
    webacy: {
        apiKey: process.env.WEBACY_API_KEY || '',
        baseUrl: 'https://api.webacy.com'
    }
}; 