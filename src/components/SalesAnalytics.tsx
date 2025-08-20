
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Button } from '@/components/ui/button';
import { BarChart as BarChartIcon, Loader2 } from 'lucide-react';
import { useSales, useDashboardStats } from '@/hooks/useSales';
import { useMenuItems } from '@/hooks/useMenuItems';

// Mock payments data interface (to be replaced with API)
interface Payment {
  id: string;
  orderId: string;
  amount: number;
  date: string;
  method: 'cash' | 'card' | 'mobile';
  status: 'completed' | 'pending' | 'failed' | 'refunded';
  customer?: string;
}

// Colors for pie chart
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

const SalesAnalytics: React.FC = () => {
  const [dateRange, setDateRange] = useState('week');
  const { sales, loading: salesLoading, error: salesError } = useSales();
  const { stats, loading: statsLoading, error: statsError } = useDashboardStats();
  const { items: menuItems } = useMenuItems();
  
  // Mock payments data - to be replaced with API call
  const [payments] = useState<Payment[]>([]);

  // Helper functions for data transformation
  const groupSalesByDate = (data: typeof sales) => {
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

  const getSalesByPaymentMethod = (data: typeof sales) => {
    const grouped = data.reduce((acc: Record<string, number>, sale) => {
      acc[sale.paymentMethod] = (acc[sale.paymentMethod] || 0) + sale.total;
      return acc;
    }, {});
    
    return Object.entries(grouped).map(([name, value]) => ({
      name: name.charAt(0).toUpperCase() + name.slice(1),
      value
    }));
  };

  const getSalesByItem = (data: typeof sales) => {
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

  const getTotalAmount = (status: string = 'all') => {
    return payments
      .filter(payment => status === 'all' || payment.status === status)
      .reduce((total, payment) => {
        if (payment.status === 'refunded') return total;
        return total + payment.amount;
      }, 0)
      .toFixed(2);
  };

  const loading = salesLoading || statsLoading;
  const error = salesError || statsError;

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin" />
        <span className="ml-2">Loading sales analytics...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <p className="text-destructive mb-4">Error loading sales data: {error}</p>
          <Button onClick={() => window.location.reload()}>Retry</Button>
        </div>
      </div>
    );
  }

  const dailySalesData = groupSalesByDate(sales);
  const paymentMethodData = getSalesByPaymentMethod(sales);
  const topSellingItemsData = getSalesByItem(sales);

  return (
    <div className="space-y-6 animate-fade-in">
      <h2 className="text-3xl font-semibold">Sales Analytics</h2>
      
      <Tabs defaultValue="overview" className="w-full">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="trends">Trends</TabsTrigger>
          <TabsTrigger value="items">Top Items</TabsTrigger>
          <TabsTrigger value="payments">Payment Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-6 space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Daily Sales</CardTitle>
                <CardDescription>
                  Sales data over time
                </CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                {dailySalesData.length > 0 ? (
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
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <p className="text-muted-foreground">No sales data available</p>
                  </div>
                )}
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
                {paymentMethodData.length > 0 ? (
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
                        const formattedValue = typeof value === 'number' ? `₱${value.toFixed(2)}` : `₱${value}`;
                        return [formattedValue, 'Amount'];
                      }} />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <p className="text-muted-foreground">No payment data available</p>
                  </div>
                )}
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
                  ₱{stats?.dailySales.toFixed(2) || '0.00'}
                </p>
              </div>
              <div className="bg-muted p-4 rounded-lg">
                <h3 className="font-medium text-sm text-muted-foreground mb-1">Total Orders</h3>
                <p className="text-2xl font-bold">{sales.length}</p>
              </div>
              <div className="bg-muted p-4 rounded-lg">
                <h3 className="font-medium text-sm text-muted-foreground mb-1">Average Order Value</h3>
                <p className="text-2xl font-bold">
                  ₱{sales.length > 0 ? (sales.reduce((acc, sale) => acc + sale.total, 0) / sales.length).toFixed(2) : '0.00'}
                </p>
              </div>
              <div className="bg-muted p-4 rounded-lg">
                <h3 className="font-medium text-sm text-muted-foreground mb-1">Customer Count</h3>
                <p className="text-2xl font-bold">
                  {stats?.customerCount || 0}
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="trends" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Sales Forecast</CardTitle>
              <CardDescription>
                Predictive analytics based on historical data
              </CardDescription>
            </CardHeader>
            <CardContent className="h-96">
              <div className="flex items-center justify-center h-full">
                <p className="text-muted-foreground">Forecast data will be available when connected to API</p>
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
                {topSellingItemsData.length > 0 ? (
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
                        const formattedValue = typeof value === 'number' ? `₱${value.toFixed(2)}` : `₱${value}`;
                        return [formattedValue, 'Revenue'];
                      }} />
                      <Legend />
                      <Bar dataKey="value" name="Revenue (₱)" fill="hsl(var(--secondary))" />
                    </BarChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <p className="text-muted-foreground">No item sales data available</p>
                  </div>
                )}
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
                  {topSellingItemsData.length > 0 ? (
                    topSellingItemsData.map((item, index) => {
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
                              style={{ width: `${Math.min(profitMargin, 100)}%` }}
                            ></div>
                          </div>
                          <div className="flex justify-between text-xs text-muted-foreground">
                            <span>Profit margin</span>
                            <span>{profitMargin.toFixed(1)}%</span>
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <div className="text-center py-8">
                      <p className="text-muted-foreground">No performance data available</p>
                    </div>
                  )}
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
                    ₱{payments.length > 0 ? (parseFloat(getTotalAmount()) / payments.filter(p => p.status !== 'refunded').length).toFixed(2) : '0.00'}
                  </p>
                </div>
                <div className="border rounded-md p-3 text-center">
                  <p className="text-xs text-muted-foreground mb-1">Success Rate</p>
                  <p className="text-2xl font-bold">
                    {payments.length > 0 ? Math.round(payments.filter(p => p.status === 'completed').length / payments.length * 100) : 0}%
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
