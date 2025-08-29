import React from 'react';
import { SidebarMenu, SidebarMenuItem } from '@/components/ui/sidebar';
import NavigationItem from './NavigationItem';

const NavigationGroup = ({ items }) => {
  return (
    <SidebarMenu>
      {items.map((item) => (
        <SidebarMenuItem key={item.name}>
          <NavigationItem item={item} />
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  );
};

export default NavigationGroup;