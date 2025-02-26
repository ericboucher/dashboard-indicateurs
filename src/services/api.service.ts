import axios from 'axios';
import { API_CONFIG, HEADERS } from '../config/api.config';

const api = axios.create({
    baseURL: API_CONFIG.BASE_URL,
    headers: HEADERS
});

export interface Measure {
    name: string;
    title: string;
    shortTitle?: string;
    type: string;
    aggType: string;
    cumulative?: boolean;
    cumulativeTotal?: boolean;
    isVisible?: boolean;
}

export interface Dimension {
    name: string;
    title: string;
    type: string;
}

export interface Indicator {
    name: string;
    title: string;
    description?: string;
    measures: Record<string, Measure>;
    dimensions: Record<string, Dimension>;
}

export const ApiService = {
    async getIndicators(): Promise<Indicator[]> {
        try {
            const response = await api.get(API_CONFIG.ENDPOINTS.META);
            console.log('API Response:', response.data); // Debug log
            return response.data.cubes || [];
        } catch (error) {
            console.error('Error fetching indicators:', error);
            throw error;
        }
    },

    async getIndicatorData(query: any): Promise<any> {
        try {
            const response = await api.post(API_CONFIG.ENDPOINTS.LOAD, query);
            return response.data;
        } catch (error) {
            console.error('Error fetching indicator data:', error);
            throw error;
        }
    }
}; 