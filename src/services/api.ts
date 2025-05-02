import axios from 'axios';

const API_URL = 'http://localhost:3000';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

export interface FilterParams {
  minPrice?: number;
  maxPrice?: number;
  lines?: string[];
  categories?: string[];
}

export const productApi = {
  getFilteredProducts: async (params: FilterParams) => {
    try {
      const response = await api.get('/products', { params });
      return response.data;
    } catch (error) {
      throw error;
    }
  }
};

export default api; 