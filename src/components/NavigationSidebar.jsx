import React from 'react';
import NavigationGroup from '@/components/navigation/NavigationGroup';
import {
  LayoutDashboard,
  Menu,
  TrendingUp,
  Users,
  CalendarClock,
  MessageSquare,
  ShoppingCart,
  Utensils,
  Bell,
  Package,
  CreditCard,
  FileText,
} from 'lucide-react';
export const NavigationSidebar = () => {
  const navigationItems = [
    {
      name: 'Dashboard',
      href: '/',
      icon: LayoutDashboard,
    },
    {
      name: 'Menu Management',
      href: '/menu',
      icon: Menu,
    },
    {
      name: 'Point of Sale',
      href: '/pos',
      icon: ShoppingCart,
    },
    {
      name: 'Catering',
      href: '/catering',
      icon: Utensils,
    },
    {
      name: 'Inventory',
      href: '/inventory',
      icon: Package,
    },
    {
      name: 'Sales Analytics',
      href: '/sales',
      icon: TrendingUp,
    },
    {
      name: 'Employee Management',
      href: '/employees',
      icon: CalendarClock,
    },
    {
      name: 'Payments',
      href: '/payments',
      icon: CreditCard,
    },
    {
      name: 'Users',
      href: '/users',
      icon: Users,
    },
    {
      name: 'Activity Logs',
      href: '/logs',
      icon: FileText,
    },
    {
      name: 'Notifications',
      href: '/notifications',
      icon: Bell,
    },
    {
      name: 'Customer Feedback',
      href: '/feedback',
      icon: MessageSquare,
    },
  ];

  return (
    <div className="px-2 py-2">
      <NavigationGroup items={navigationItems} />
    </div>
};
};
