import rateLimit from 'axios-rate-limit';
import axios from 'axios';

// Metered APIs: Rate limit request once per 1.5 seconds
export const http = rateLimit(axios.create(), { maxRequests: 1, perMilliseconds: 1500 });

export const alternative_Me_API = {
    baseURL: ' https://api.alternative.me',
    responseType: 'json',
    method: 'GET'
};

export const ethGas_API = {
    baseURL: 'https://ethgasstation.info',
    responseType: 'json',
    method: 'GET'
};

export const blockchain_API = {
    baseURL: 'https://api.blockchain.info',
    responseType: 'json',
    method: 'GET'
};

export const coinGecko_API = {
    baseURL: 'https://api.coingecko.com/api/v3',
    responseType: 'json',
    method: 'GET',
    headers: {
      'X-XSS-Protection': '1; mode=block',
      'X-Frame-Options': 'DENY',
      'X-Content-Type-Options': 'nosniff',
      'Strict-Transport-Security': 'max-age=63072000; includeSubDomains; preload'
    }
}
