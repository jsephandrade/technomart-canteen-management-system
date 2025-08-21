
export interface OrderItem {
  id: string;
  menuItemId: string;
  name: string;
  price: number;
  quantity: number;
  notes?: string;
}

export interface QueueOrder {
  id: string;
  orderNumber: string;
  type: 'walk-in' | 'online';
  items: OrderItem[];
  status: 'pending' | 'preparing' | 'ready' | 'completed';
  timeReceived: Date;
  customerName?: string;
}

export interface Category {
  id: string;
  name: string;
  items: MenuItem[];
}

export interface HistoryOrder {
  id: string;
  orderNumber: string;
  items: OrderItem[];
  total: number;
  timestamp: Date;
  paymentMethod: string;
}

export interface Discount {
  type: 'percentage' | 'fixed';
  value: number;
}

import { MenuItem } from '@/types';
