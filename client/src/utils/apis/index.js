import apiClient from './apiClient';
import { API_ENDPOINTS } from './endpoints';

export const ConsumptionApi = {
  // consumption
  addConsumption: (data) => apiClient.post(API_ENDPOINTS.CONSUMPTION, data),
  getConsumptions: () => apiClient.get(API_ENDPOINTS.CONSUMPTION),
  updateConsumptions: (id, data) => apiClient.put(`${API_ENDPOINTS.CONSUMPTION}/${id}`, data),
  deleteConsumption: (id) => apiClient.delete(`${API_ENDPOINTS.CONSUMPTION}/${id}`),

  // income
  addIncome: (data) => apiClient.post(API_ENDPOINTS.INCOME, data),
  getIncome: () => apiClient.get(API_ENDPOINTS.INCOME),
  updateIncome: (id, data) => apiClient.put(`${API_ENDPOINTS.INCOME}/${id}`, data),
  deleteIncome: (id) => apiClient.delete(`${API_ENDPOINTS.INCOME}/${id}`),
  
  // 
  getStats: (year, month) => apiClient.get(`${API_ENDPOINTS.STATS}/${year}/${month}`)
};