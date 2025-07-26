import apiClient from './apiClient';
import { API_ENDPOINTS } from './endpoints';

export const ConsumptionApi = {
  addConsumption: (data) => apiClient.post(API_ENDPOINTS.CONSUMPTION, data),
  getConsumptions: () => apiClient.get(API_ENDPOINTS.CONSUMPTION),
  updateConsumptions: (id, data) => apiClient.put(`${API_ENDPOINTS.CONSUMPTION}/${id}`, data),
  deleteConsumption: (id) => apiClient.delete(`${API_ENDPOINTS.CONSUMPTION}/${id}`),
};