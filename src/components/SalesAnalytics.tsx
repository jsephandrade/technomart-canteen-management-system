import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { salesData, menuItems } from '@/utils/mockData';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Sale } from '@/types';
import { Button } from '@/components/ui/button';
import { BarChart as BarChartIcon } from 'lucide-react';

// Helper function to group sales by date
const groupSalesByDate = (data: Sale[]) => {
  const grouped = data.reduce((acc: Record<string, number>, sale) => {
    const date = new Date(sale.date).toLocaleDateString();
    acc[date] = (acc[date] || 0) + sale.total;
    return acc;
  }, {});
  
  return Object.entries(grouped).map(([date, total]) => ({
    date,
    total
  }));
};

// Helper function to get sales by payment method
const getSalesByPaymentMethod = (data: Sale[]) => {
  const grouped = data.reduce((acc: Record<string, number>, sale) => {
    acc[sale.paymentMethod] = (acc[sale.paymentMethod] || 0) + sale.total;
    return acc;
  }, {});
  
  return Object.entries(grouped).map(([name, value]) => ({
    name: name.charAt(0).toUpperCase() + name.slice(1),
    value
  }));
};

// Helper function to get sales by item
const getSalesByItem = (data: Sale[]) => {
  const itemSales: Record<string, number> = {};
  
  data.forEach(sale => {
    sale.items.forEach(item => {
      const itemName = item.menuItemName;
      itemSales[itemName] = (itemSales[itemName] || 0) + (item.price * item.quantity);
    });
  });
  
  return Object.entries(itemSales)
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 5);
};

const dailySalesData = groupSalesByDate(salesData);
const paymentMethodData = getSalesByPaymentMethod(salesData);
const topSellingItemsData = getSalesByItem(salesData);

// Colors for pie chart
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

// Historical analytics data
const peakHoursData = [
  { hour: '8:00', sales: 45, orders: 8 },
  { hour: '9:00', sales: 78, orders: 12 },
  { hour: '10:00', sales: 120, orders: 18 },
  { hour: '11:00', sales: 185, orders: 25 },
  { hour: '12:00', sales: 280, orders: 35 },
  { hour: '13:00', sales: 320, orders: 42 },
  { hour: '14:00', sales: 195, orders: 28 },
  { hour: '15:00', sales: 165, orders: 22 },
  { hour: '16:00', sales: 140, orders: 19 },
  { hour: '17:00', sales: 110, orders: 15 }
];

const monthlyComparison = [
  { month: 'Jan', sales: 12500, orders: 450 },
  { month: 'Feb', sales: 13200, orders: 480 },
  { month: 'Mar', sales: 14800, orders: 520 },
  { month: 'Apr', sales: 16200, orders: 580 },
  { month: 'May', sales: 15900, orders: 565 },
  { month: 'Jun', sales: 17300, orders: 620 }
];

// Mock payments data
interface Payment {
  id: string;
  orderId: string;
  amount: number;
  date: string;
  method: 'cash' | 'card' | 'mobile';
  status: 'completed' | 'pending' | 'failed' | 'refunded';
  customer?: string;
}

const mockPayments: Payment[] = [
  {
    id: '1',
    orderId: 'ORD-2581',
    amount: 45.75,
    date: '2025-04-17 10:32:15',
    method: 'card',
    status: 'completed',
    customer: 'John Doe'
  },
  {
    id: '2',
    orderId: 'ORD-2582',
    amount: 22.50,
    date: '2025-04-17 11:15:22',
    method: 'cash',
    status: 'completed'
  },
  {
    id: '3',
    orderId: 'ORD-2583',
    amount: 38.90,
    date: '2025-04-17 12:25:40',
    method: 'mobile',
    status: 'completed',
    customer: 'Sarah Johnson'
  },
  {
    id: '4',
    orderId: 'ORD-2584',
    amount: 29.95,
    date: '2025-04-17 13:10:05',
    method: 'card',
    status: 'failed',
    customer: 'Alex Chen'
  },
  {
    id: '5',
    orderId: 'ORD-2585',
    amount: 52.35,
    date: '2025-04-17 14:27:51',
    method: 'mobile',
    status: 'completed',
    customer: 'Maria Lopez'
  },
  {
    id: '6',
    orderId: 'ORD-2586',
    amount: 18.25,
    date: '2025-04-17 15:45:12',
    method: 'cash',
    status: 'completed'
  },
  {
    id: '7',
    orderId: 'ORD-2587',
    amount: 65.80,
    date: '2025-04-17 16:30:45',
    method: 'card',
    status: 'refunded',
    customer: 'David Brown'
  }
];

const SalesAnalytics: React.FC = () => {
  const [dateRange, setDateRange] = useState('week');
  const [payments, setPayments] = useState<Payment[]>(mockPayments);
  
  const getTotalAmount = (status: string = 'all') => {
    return payments
      .filter(payment => status === 'all' || payment.status === status)
      .reduce((total, payment) => {
        if (payment.status === 'refunded') return total;
        return total + payment.amount;
      }, 0)
      .toFixed(2);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <h2 className="text-3xl font-semibold">Sales Analytics</h2>
      
      <Tabs defaultValue="overview" className="w-full">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="items">Top Items</TabsTrigger>
          <TabsTrigger value="payments">Payment Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-6 space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Daily Sales</CardTitle>
                <CardDescription>
                  Sales data for the last 7 days
                </CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={dailySalesData}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line 
                      type="monotone" 
                      dataKey="total" 
                      stroke="hsl(var(--primary))" 
                      activeDot={{ r: 8 }} 
                      name="Sales (₱)" 
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Sales by Payment Method</CardTitle>
                <CardDescription>
                  Distribution of sales by payment type
                </CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={paymentMethodData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {paymentMethodData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => {
                      // Check if value is a number before calling toFixed
                      const formattedValue = typeof value === 'number' ? `₱${value.toFixed(2)}` : `₱${value}`;
                      return [formattedValue, 'Amount'];
                    }} />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Sales Summary</CardTitle>
              <CardDescription>
                Key performance indicators for your canteen
              </CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-1 lg:grid-cols-4 gap-4">
              <div className="bg-muted p-4 rounded-lg">
                <h3 className="font-medium text-sm text-muted-foreground mb-1">Total Sales</h3>
                <p className="text-2xl font-bold">
                  ₱{salesData.reduce((acc, sale) => acc + sale.total, 0).toFixed(2)}
                </p>
              </div>
              <div className="bg-muted p-4 rounded-lg">
                <h3 className="font-medium text-sm text-muted-foreground mb-1">Total Orders</h3>
                <p className="text-2xl font-bold">{salesData.length}</p>
              </div>
              <div className="bg-muted p-4 rounded-lg">
                <h3 className="font-medium text-sm text-muted-foreground mb-1">Average Order Value</h3>
                <p className="text-2xl font-bold">
                  ₱{(salesData.reduce((acc, sale) => acc + sale.total, 0) / salesData.length).toFixed(2)}
                </p>
              </div>
              <div className="bg-muted p-4 rounded-lg">
                <h3 className="font-medium text-sm text-muted-foreground mb-1">Total Items Sold</h3>
                <p className="text-2xl font-bold">
                  {salesData.reduce((acc, sale) => {
                    return acc + sale.items.reduce((itemsAcc, item) => itemsAcc + item.quantity, 0);
                  }, 0)}
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="mt-6 space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Peak Hours Analysis</CardTitle>
                <CardDescription>
                  Sales performance throughout the day
                </CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={peakHoursData}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="hour" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="sales" name="Sales (₱)" fill="hsl(var(--primary))" />
                    <Bar dataKey="orders" name="Orders" fill="hsl(var(--secondary))" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Monthly Performance</CardTitle>
                <CardDescription>
                  6-month sales and order trends
                </CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={monthlyComparison}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line 
                      type="monotone" 
                      dataKey="sales" 
                      stroke="hsl(var(--primary))" 
                      strokeWidth={2}
                      name="Sales (₱)" 
                    />
                    <Line 
                      type="monotone" 
                      dataKey="orders" 
                      stroke="hsl(var(--secondary))" 
                      strokeWidth={2}
                      name="Total Orders" 
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Performance Insights</CardTitle>
              <CardDescription>
                Key insights from your sales data
              </CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="bg-muted p-4 rounded-lg">
                <h3 className="font-medium text-sm text-muted-foreground mb-2">Peak Hour</h3>
                <p className="text-2xl font-bold mb-1">1:00 PM</p>
                <p className="text-sm text-muted-foreground">Highest daily sales period</p>
              </div>
              <div className="bg-muted p-4 rounded-lg">
                <h3 className="font-medium text-sm text-muted-foreground mb-2">Best Month</h3>
                <p className="text-2xl font-bold mb-1">June</p>
                <p className="text-sm text-muted-foreground">₱17,300 total sales</p>
              </div>
              <div className="bg-muted p-4 rounded-lg">
                <h3 className="font-medium text-sm text-muted-foreground mb-2">Growth Rate</h3>
                <p className="text-2xl font-bold mb-1">+23%</p>
                <p className="text-sm text-muted-foreground">Compared to last quarter</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="items" className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Top Selling Items</CardTitle>
                <CardDescription>
                  Items with the highest sales revenue
                </CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={topSellingItemsData}
                    layout="vertical"
                    margin={{ top: 5, right: 30, left: 50, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" />
                    <YAxis dataKey="name" type="category" />
                    <Tooltip formatter={(value) => {
                      // Check if value is a number before calling toFixed
                      const formattedValue = typeof value === 'number' ? `₱${value.toFixed(2)}` : `₱${value}`;
                      return [formattedValue, 'Revenue'];
                    }} />
                    <Legend />
                    <Bar dataKey="value" name="Revenue (₱)" fill="hsl(var(--secondary))" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Item Performance Analysis</CardTitle>
                <CardDescription>
                  Detailed breakdown of top performing items
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {topSellingItemsData.map((item, index) => {
                    const menuItem = menuItems.find(mi => mi.name === item.name);
                    const profitMargin = menuItem ? ((item.value - (menuItem.price * 0.4)) / item.value) * 100 : 0;
                    
                    return (
                      <div key={index} className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="font-medium">{item.name}</span>
                          <span className="font-medium">₱{item.value.toFixed(2)}</span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2.5">
                          <div 
                            className="bg-secondary h-2.5 rounded-full" 
                            style={{ width: `${profitMargin}%` }}
                          ></div>
                        </div>
                        <div className="flex justify-between text-xs text-muted-foreground">
                          <span>Profit margin</span>
                          <span>{profitMargin.toFixed(1)}%</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="payments" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Payment Analytics</CardTitle>
              <CardDescription>Transaction analytics and insights</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                <div className="border rounded-md p-3 text-center">
                  <p className="text-xs text-muted-foreground mb-1">Today's Total</p>
                  <p className="text-2xl font-bold">₱{getTotalAmount()}</p>
                </div>
                <div className="border rounded-md p-3 text-center">
                  <p className="text-xs text-muted-foreground mb-1">Transactions</p>
                  <p className="text-2xl font-bold">{payments.length}</p>
                </div>
                <div className="border rounded-md p-3 text-center">
                  <p className="text-xs text-muted-foreground mb-1">Avg. Transaction</p>
                  <p className="text-2xl font-bold">
                    ₱{(parseFloat(getTotalAmount()) / payments.filter(p => p.status !== 'refunded').length).toFixed(2)}
                  </p>
                </div>
                <div className="border rounded-md p-3 text-center">
                  <p className="text-xs text-muted-foreground mb-1">Success Rate</p>
                  <p className="text-2xl font-bold">
                    {Math.round(payments.filter(p => p.status === 'completed').length / payments.length * 100)}%
                  </p>
                </div>
              </div>
              <Button className="w-full mt-4" variant="outline" size="sm">
                <BarChartIcon className="h-4 w-4 mr-1" /> Detailed Reports
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SalesAnalytics;
