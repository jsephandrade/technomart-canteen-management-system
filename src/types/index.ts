
// User types
export interface User {
  id: string;
  name: string;
  role: 'admin' | 'manager' | 'staff' | 'cashier';
  email: string;
  avatar?: string;
}

// Menu types
export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image?: string;
  available: boolean;
  popular: boolean;
}

// Sales types
export interface Sale {
  id: string;
  items: OrderItem[];
  total: number;
  date: string;
  paymentMethod: 'cash' | 'card' | 'mobile';
  customerId?: string;
  employeeId: string;
}

export interface OrderItem {
  menuItemId: string;
  menuItemName: string;
  quantity: number;
  price: number;
}

// Employee types
export interface Employee {
  id: string;
  name: string;
  position: string;
  hourlyRate: number;
  contact: string;
  avatar?: string;
}

export interface ScheduleEntry {
  id: string;
  employeeId: string;
  employeeName: string;
  day: string;
  startTime: string;
  endTime: string;
}

// Feedback types
export interface Feedback {
  id: string;
  customerId?: string;
  customerName: string;
  rating: number;
  comment: string;
  date: string;
  resolved: boolean;
}

// Dashboard types
export interface DashboardStats {
  dailySales: number;
  monthlySales: number;
  customerCount: number;
  popularItems: { name: string; count: number }[];
  recentSales: Sale[];
  salesByCategory: { category: string; amount: number }[];
  salesByTime: { time: string; amount: number }[];
}
