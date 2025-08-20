
import { MenuItem } from '@/types';
import { apiClient } from './api';

export const menuService = {
  async getMenuItems(): Promise<MenuItem[]> {
    return apiClient.get<MenuItem[]>('/menu-items');
  },

  async getMenuItem(id: string): Promise<MenuItem> {
    return apiClient.get<MenuItem>(`/menu-items/${id}`);
  },

  async createMenuItem(item: Omit<MenuItem, 'id'>): Promise<MenuItem> {
    return apiClient.post<MenuItem>('/menu-items', item);
  },

  async updateMenuItem(id: string, item: Partial<MenuItem>): Promise<MenuItem> {
    return apiClient.put<MenuItem>(`/menu-items/${id}`, item);
  },

  async deleteMenuItem(id: string): Promise<void> {
    return apiClient.delete<void>(`/menu-items/${id}`);
  },

  async getMenuItemsByCategory(category: string): Promise<MenuItem[]> {
    return apiClient.get<MenuItem[]>(`/menu-items?category=${category}`);
  },
};
