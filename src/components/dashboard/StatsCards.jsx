import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DollarSign, TrendingUp, Users, ShoppingBag } from 'lucide-react';

const StatsCards = ({ dashboardStats, salesData }) => {
  const statsCards = [
    {
      title: "Today's Sales",
      value: `₱${dashboardStats.dailySales.toFixed(2)}`,
      change: "+15% from yesterday",
      icon: DollarSign
    },
    {
      title: "Monthly Sales",
      value: `₱${dashboardStats.monthlySales.toFixed(2)}`,
      change: "+8% from last month",
      icon: TrendingUp
    },
    {
      title: "Customers Today",
      value: dashboardStats.customerCount,
      change: "+5% from yesterday",
      icon: Users
    },
    {
      title: "Orders Today",
      value: salesData.length,
      change: "+12% from yesterday",
      icon: ShoppingBag
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
      {statsCards.map((stat, index) => (
        <Card key={index}>
          <CardHeader className="flex flex-row items-center justify-between pb-1 py-2">
            <CardTitle className="text-xs font-medium">{stat.title}</CardTitle>
            <stat.icon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent className="pt-0">
            <div className="text-xl font-bold">{stat.value}</div>
            <p className="text-[11px] text-muted-foreground">{stat.change}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default StatsCards;