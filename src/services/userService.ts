
import { User } from '@/types';
import { apiClient } from './api';

export interface LogEntry {
  id: string;
  action: string;
  user: string;
  timestamp: string;
  details: string;
  type: 'login' | 'action' | 'system' | 'security';
}

export const userService = {
  async getUsers(): Promise<User[]> {
    return apiClient.get<User[]>('/users');
  },

  async getUser(id: string): Promise<User> {
    return apiClient.get<User>(`/users/${id}`);
  },

  async createUser(user: Omit<User, 'id'>): Promise<User> {
    return apiClient.post<User>('/users', user);
  },

  async updateUser(id: string, user: Partial<User>): Promise<User> {
    return apiClient.put<User>(`/users/${id}`, user);
  },

  async deleteUser(id: string): Promise<void> {
    return apiClient.delete<void>(`/users/${id}`);
  },

  async getUserLogs(params?: {
    type?: string;
    timeRange?: string;
  }): Promise<LogEntry[]> {
    const queryParams = new URLSearchParams();
    if (params?.type) queryParams.append('type', params.type);
    if (params?.timeRange) queryParams.append('timeRange', params.timeRange);
    
    const query = queryParams.toString();
    return apiClient.get<LogEntry[]>(`/users/logs${query ? `?${query}` : ''}`);
  },
};
