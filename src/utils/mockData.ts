import { MenuItem, Sale, Employee, Feedback, DashboardStats, ScheduleEntry } from '@/types';

export const menuItems: MenuItem[] = [
  {
    id: '1',
    name: 'Classic Burger',
    description: 'Juicy beef patty with lettuce, tomato, and our secret sauce',
    price: 449.99, // Converted to Philippine Peso
    category: 'Main Course',
    image: '/placeholder.svg',
    available: true,
    popular: true
  },
  {
    id: '2',
    name: 'Caesar Salad',
    description: 'Crisp romaine lettuce with parmesan, croutons, and Caesar dressing',
    price: 324.50, // Converted to Philippine Peso
    category: 'Salads',
    image: '/placeholder.svg',
    available: true,
    popular: false
  },
  {
    id: '3',
    name: 'Grilled Chicken Sandwich',
    description: 'Grilled chicken breast with avocado, bacon, and honey mustard',
    price: 9.99,
    category: 'Main Course',
    image: '/placeholder.svg',
    available: true,
    popular: true
  },
  {
    id: '4',
    name: 'Veggie Wrap',
    description: 'Fresh vegetables with hummus in a spinach wrap',
    price: 7.49,
    category: 'Vegetarian',
    image: '/placeholder.svg',
    available: true,
    popular: false
  },
  {
    id: '5',
    name: 'French Fries',
    description: 'Crispy golden fries with our special seasoning',
    price: 3.99,
    category: 'Sides',
    image: '/placeholder.svg',
    available: true,
    popular: true
  },
  {
    id: '6',
    name: 'Chocolate Brownie',
    description: 'Rich chocolate brownie with vanilla ice cream',
    price: 5.49,
    category: 'Desserts',
    image: '/placeholder.svg',
    available: true,
    popular: true
  }
];

export const salesData: Sale[] = [
  {
    id: '1',
    items: [
      { menuItemId: '1', menuItemName: 'Classic Burger', quantity: 2, price: 8.99 },
      { menuItemId: '5', menuItemName: 'French Fries', quantity: 1, price: 3.99 }
    ],
    total: 21.97,
    date: '2025-04-17T10:30:00',
    paymentMethod: 'card',
    employeeId: '1'
  },
  {
    id: '2',
    items: [
      { menuItemId: '3', menuItemName: 'Grilled Chicken Sandwich', quantity: 1, price: 9.99 },
      { menuItemId: '4', menuItemName: 'Veggie Wrap', quantity: 1, price: 7.49 }
    ],
    total: 17.48,
    date: '2025-04-17T12:45:00',
    paymentMethod: 'cash',
    employeeId: '2'
  },
  {
    id: '3',
    items: [
      { menuItemId: '2', menuItemName: 'Caesar Salad', quantity: 2, price: 6.49 },
      { menuItemId: '6', menuItemName: 'Chocolate Brownie', quantity: 1, price: 5.49 }
    ],
    total: 18.47,
    date: '2025-04-17T13:15:00',
    paymentMethod: 'mobile',
    employeeId: '1'
  },
  {
    id: '4',
    items: [
      { menuItemId: '1', menuItemName: 'Classic Burger', quantity: 1, price: 8.99 },
      { menuItemId: '5', menuItemName: 'French Fries', quantity: 1, price: 3.99 },
      { menuItemId: '6', menuItemName: 'Chocolate Brownie', quantity: 1, price: 5.49 }
    ],
    total: 18.47,
    date: '2025-04-16T11:30:00',
    paymentMethod: 'card',
    employeeId: '3'
  },
  {
    id: '5',
    items: [
      { menuItemId: '3', menuItemName: 'Grilled Chicken Sandwich', quantity: 2, price: 9.99 }
    ],
    total: 19.98,
    date: '2025-04-16T14:20:00',
    paymentMethod: 'cash',
    employeeId: '2'
  }
];

export const employees: Employee[] = [
  {
    id: '1',
    name: 'John Smith',
    position: 'Manager',
    hourlyRate: 22.50,
    contact: 'john.smith@example.com',
    avatar: '/placeholder.svg'
  },
  {
    id: '2',
    name: 'Sarah Johnson',
    position: 'Chef',
    hourlyRate: 18.75,
    contact: 'sarah.johnson@example.com',
    avatar: '/placeholder.svg'
  },
  {
    id: '3',
    name: 'Michael Brown',
    position: 'Cashier',
    hourlyRate: 15.00,
    contact: 'michael.brown@example.com',
    avatar: '/placeholder.svg'
  },
  {
    id: '4',
    name: 'Jessica Williams',
    position: 'Server',
    hourlyRate: 12.50,
    contact: 'jessica.williams@example.com',
    avatar: '/placeholder.svg'
  }
];

export const scheduleData: ScheduleEntry[] = [
  {
    id: '1',
    employeeId: '1',
    employeeName: 'John Smith',
    day: 'Monday',
    startTime: '08:00',
    endTime: '16:00'
  },
  {
    id: '2',
    employeeId: '2',
    employeeName: 'Sarah Johnson',
    day: 'Monday',
    startTime: '10:00',
    endTime: '18:00'
  },
  {
    id: '3',
    employeeId: '3',
    employeeName: 'Michael Brown',
    day: 'Monday',
    startTime: '12:00',
    endTime: '20:00'
  },
  {
    id: '4',
    employeeId: '1',
    employeeName: 'John Smith',
    day: 'Tuesday',
    startTime: '08:00',
    endTime: '16:00'
  },
  {
    id: '5',
    employeeId: '2',
    employeeName: 'Sarah Johnson',
    day: 'Tuesday',
    startTime: '10:00',
    endTime: '18:00'
  },
  {
    id: '6',
    employeeId: '4',
    employeeName: 'Jessica Williams',
    day: 'Tuesday',
    startTime: '12:00',
    endTime: '20:00'
  }
];

export const feedbackData: Feedback[] = [
  {
    id: '1',
    customerName: 'Alex Martin',
    rating: 5,
    comment: 'Great food and excellent service!',
    date: '2025-04-16T14:30:00',
    resolved: true
  },
  {
    id: '2',
    customerName: 'Taylor Wilson',
    rating: 4,
    comment: 'Food was delicious, but the wait was a bit long.',
    date: '2025-04-16T12:15:00',
    resolved: false
  },
  {
    id: '3',
    customerName: 'Jordan Lee',
    rating: 3,
    comment: 'Average experience. The salad could use more dressing.',
    date: '2025-04-15T13:45:00',
    resolved: false
  },
  {
    id: '4',
    customerName: 'Casey Thompson',
    rating: 5,
    comment: 'Best burger I\'ve had in a long time!',
    date: '2025-04-15T15:20:00',
    resolved: true
  }
];

export const dashboardStats: DashboardStats = {
  dailySales: 548.75,
  monthlySales: 15632.50,
  customerCount: 127,
  popularItems: [
    { name: 'Classic Burger', count: 42 },
    { name: 'Grilled Chicken Sandwich', count: 38 },
    { name: 'French Fries', count: 35 },
    { name: 'Chocolate Brownie', count: 28 }
  ],
  recentSales: salesData.slice(0, 3),
  salesByCategory: [
    { category: 'Main Course', amount: 8542.75 },
    { category: 'Sides', amount: 2356.80 },
    { category: 'Desserts', amount: 1845.25 },
    { category: 'Beverages', amount: 1755.30 },
    { category: 'Salads', amount: 1132.40 }
  ],
  salesByTime: [
    { time: '8am-10am', amount: 845.50 },
    { time: '10am-12pm', amount: 1756.25 },
    { time: '12pm-2pm', amount: 3254.75 },
    { time: '2pm-4pm', amount: 1932.65 },
    { time: '4pm-6pm', amount: 2845.30 },
    { time: '6pm-8pm', amount: 4998.05 }
  ]
};
