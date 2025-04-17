
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton
} from '@/components/ui/sidebar';
import { LayoutDashboard, Menu, TrendingUp, Users, CalendarClock, MessageSquare } from 'lucide-react';

export const NavigationSidebar: React.FC = () => {
  const location = useLocation();
  
  const navigationItems = [
    {
      name: 'Dashboard',
      href: '/',
      icon: LayoutDashboard
    },
    {
      name: 'Menu Management',
      href: '/menu',
      icon: Menu
    },
    {
      name: 'Sales Analytics',
      href: '/sales',
      icon: TrendingUp
    },
    {
      name: 'Employee Schedule',
      href: '/employees',
      icon: CalendarClock
    },
    {
      name: 'Customer Feedback',
      href: '/feedback',
      icon: MessageSquare
    }
  ];

  return (
    <div className="px-2 py-2">
      <SidebarMenu>
        {navigationItems.map((item) => (
          <SidebarMenuItem key={item.name}>
            <SidebarMenuButton 
              asChild 
              isActive={location.pathname === item.href}
              tooltip={item.name}
            >
              <Link to={item.href} className="flex items-center space-x-3">
                <item.icon className="h-5 w-5" />
                <span>{item.name}</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </div>
  );
};
