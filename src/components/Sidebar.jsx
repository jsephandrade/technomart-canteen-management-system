import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import {
  X,
  LayoutDashboard,
  Menu,
  TrendingUp,
  Users,
  CalendarClock,
  MessageSquare,
} from 'lucide-react';
export const Sidebar = ({ onClose }) => {
  const location = useLocation();
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
      name: 'Sales Analytics',
      href: '/sales',
      icon: TrendingUp,
    },
    {
      name: 'Employee Schedule',
      href: '/employees',
      icon: CalendarClock,
    },
    {
      name: 'Customer Feedback',
      href: '/feedback',
      icon: MessageSquare,
    },
  ];
  return (
    <aside className="h-full bg-sidebar text-sidebar-foreground flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-sidebar-border">
        <div className="flex items-center space-x-2">
          <span className="text-xl font-bold text-sidebar-foreground">
            Canteen MS
          </span>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={onClose}
          className="text-sidebar-foreground"
        >
          <X className="h-5 w-5" />
        </Button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1">
        {navigationItems.map((item) => (
          <Link
            key={item.name}
            to={item.href}
            className={cn(
              'flex items-center space-x-3 px-3 py-2.5 rounded-md transition-all',
              location.pathname === item.href
                ? 'bg-sidebar-accent text-sidebar-accent-foreground'
                : 'text-sidebar-foreground hover:bg-sidebar-accent/50'
            )}
          >
            <item.icon className="h-5 w-5" />
            <span>{item.name}</span>
          </Link>
        ))}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-sidebar-border">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full bg-sidebar-accent flex items-center justify-center">
            <Users className="h-5 w-5" />
          </div>
          <div>
            <p className="font-semibold">Admin User</p>
            <p className="text-sm text-sidebar-foreground/70">
              admin@canteen.com
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
};
