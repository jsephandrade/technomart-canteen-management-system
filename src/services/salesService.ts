
import { Sale, DashboardStats } from '@/types';
import { apiClient } from './api';

export const salesService = {
  async getSales(params?: {
    startDate?: string;
    endDate?: string;
    employeeId?: string;
  }): Promise<Sale[]> {
    const queryParams = new URLSearchParams();
    if (params?.startDate) queryParams.append('startDate', params.startDate);
    if (params?.endDate) queryParams.append('endDate', params.endDate);
    if (params?.employeeId) queryParams.append('employeeId', params.employeeId);
    
    const query = queryParams.toString();
    return apiClient.get<Sale[]>(`/sales${query ? `?${query}` : ''}`);
  },

  async getSale(id: string): Promise<Sale> {
    return apiClient.get<Sale>(`/sales/${id}`);
  },

  async createSale(sale: Omit<Sale, 'id'>): Promise<Sale> {
    return apiClient.post<Sale>('/sales', sale);
  },

  async getDashboardStats(): Promise<DashboardStats> {
    return apiClient.get<DashboardStats>('/dashboard/stats');
  },

  async getSalesByDateRange(startDate: string, endDate: string): Promise<Sale[]> {
    return apiClient.get<Sale[]>(`/sales?startDate=${startDate}&endDate=${endDate}`);
  },
};
