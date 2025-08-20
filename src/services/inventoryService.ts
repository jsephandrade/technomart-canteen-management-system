
import { apiClient } from './api';

export interface InventoryItem {
  id: string;
  name: string;
  category: string;
  currentStock: number;
  minThreshold: number;
  unit: string;
  lastUpdated: string;
  supplier: string;
}

export interface InventoryActivity {
  id: string;
  action: string;
  item: string;
  quantity: string;
  timestamp: string;
  user: string;
}

export const inventoryService = {
  async getInventoryItems(): Promise<InventoryItem[]> {
    return apiClient.get<InventoryItem[]>('/inventory');
  },

  async getInventoryItem(id: string): Promise<InventoryItem> {
    return apiClient.get<InventoryItem>(`/inventory/${id}`);
  },

  async updateInventoryItem(id: string, item: Partial<InventoryItem>): Promise<InventoryItem> {
    return apiClient.put<InventoryItem>(`/inventory/${id}`, item);
  },

  async createInventoryItem(item: Omit<InventoryItem, 'id'>): Promise<InventoryItem> {
    return apiClient.post<InventoryItem>('/inventory', item);
  },

  async deleteInventoryItem(id: string): Promise<void> {
    return apiClient.delete<void>(`/inventory/${id}`);
  },

  async getInventoryActivities(): Promise<InventoryActivity[]> {
    return apiClient.get<InventoryActivity[]>('/inventory/activities');
  },

  async getLowStockItems(): Promise<InventoryItem[]> {
    return apiClient.get<InventoryItem[]>('/inventory/low-stock');
  },
};
