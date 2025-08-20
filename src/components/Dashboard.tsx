
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useSales } from '@/hooks/useSales';
import { useMenuItems } from '@/hooks/useMenuItems';
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { TrendingUp, TrendingDown, Users, ShoppingBag, DollarSign } from 'lucide-react';

const Dashboard: React.FC = () => {
  const { data: salesData = [], isLoading: salesLoading } = useSales();
  const { data: menuItems = [], isLoading: menuLoading } = useMenuItems();

  // Calculate dashboard stats from real data
  const dailySales = salesData
    .filter(sale => new Date(sale.date).toDateString() === new Date().toDateString())
    .reduce((sum, sale) => sum + sale.total, 0);

  const monthlySales = salesData
    .filter(sale => {
      const saleDate = new Date(sale.date);
      const now = new Date();
      return saleDate.getMonth() === now.getMonth() && saleDate.getFullYear() === now.getFullYear();
    })
    .reduce((sum, sale) => sum + sale.total, 0);

  const customerCount = salesData
    .filter(sale => new Date(sale.date).toDateString() === new Date().toDateString())
    .length;

  // Generate chart data from sales
  const salesTimeData = Array.from({ length: 12 }, (_, i) => {
    const hour = i + 8; // 8 AM to 7 PM
    const amount = salesData
      .filter(sale => {
        const saleDate = new Date(sale.date);
        return saleDate.getHours() === hour && saleDate.toDateString() === new Date().toDateString();
      })
      .reduce((sum, sale) => sum + sale.total, 0);
    
    return {
      name: `${hour}:00`,
      amount
    };
  });

  // Generate category sales data (mock categories for now)
  const categorySalesData = [
    { name: 'Main Dishes', amount: dailySales * 0.4 },
    { name: 'Beverages', amount: dailySales * 0.3 },
    { name: 'Desserts', amount: dailySales * 0.2 },
    { name: 'Snacks', amount: dailySales * 0.1 }
  ];

  // Popular items (simplified)
  const popularItems = menuItems.slice(0, 5).map((item, index) => ({
    name: item.name,
    count: Math.floor(Math.random() * 50) + 10 // Mock count for now
  }));

  // Recent sales
  const recentSales = salesData.slice(0, 5);

  if (salesLoading || menuLoading) {
    return <div className="flex items-center justify-center h-64">Loading dashboard...</div>;
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <h2 className="text-3xl font-semibold">Dashboard</h2>
      
      {/* Stats Cards Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Today's Sales</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₱{dailySales.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">
              +15% from yesterday
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Monthly Sales</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₱{monthlySales.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">
              +8% from last month
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Customers Today</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{customerCount}</div>
            <p className="text-xs text-muted-foreground">
              +5% from yesterday
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Orders Today</CardTitle>
            <ShoppingBag className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{salesData.length}</div>
            <p className="text-xs text-muted-foreground">
              +12% from yesterday
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Sales by Time of Day</CardTitle>
            <CardDescription>
              Hourly sales distribution for today
            </CardDescription>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={salesTimeData}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0.1}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="name" />
                <YAxis />
                <CartesianGrid strokeDasharray="3 3" />
                <Tooltip />
                <Area type="monotone" dataKey="amount" stroke="hsl(var(--primary))" fillOpacity={1} fill="url(#colorUv)" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Sales by Category</CardTitle>
            <CardDescription>
              Revenue distribution across menu categories
            </CardDescription>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={categorySalesData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="amount" fill="hsl(var(--secondary))" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Popular Items & Recent Sales */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Popular Items</CardTitle>
            <CardDescription>
              Most ordered items in the past week
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {popularItems.length > 0 ? popularItems.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <span className="font-medium">{index + 1}.</span>
                    <span>{item.name}</span>
                  </div>
                  <span className="text-muted-foreground">{item.count} orders</span>
                </div>
              )) : (
                <p className="text-muted-foreground">No popular items data available</p>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Sales</CardTitle>
            <CardDescription>
              Latest orders processed in the canteen
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentSales.length > 0 ? recentSales.map((sale) => (
                <div key={sale.id} className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Order #{sale.id}</p>
                    <p className="text-sm text-muted-foreground">
                      {new Date(sale.date).toLocaleString()}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">₱{sale.total.toFixed(2)}</p>
                    <p className="text-sm text-muted-foreground capitalize">{sale.paymentMethod}</p>
                  </div>
                </div>
              )) : (
                <p className="text-muted-foreground">No recent sales data available</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
