import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { SidebarMenuButton } from '@/components/ui/sidebar';

const NavigationItem = ({ item }) => {
  const location = useLocation();
  
  return (
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
  );
};

export default NavigationItem;