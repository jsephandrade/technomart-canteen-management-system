
import React from 'react';
import { Sidebar } from '@/components/Sidebar';
import { useIsMobile } from '@/hooks/use-mobile';
import { Button } from '@/components/ui/button';
import { Menu } from 'lucide-react';
import { cn } from '@/lib/utils';

interface MainLayoutProps {
  children: React.ReactNode;
  title?: string;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children, title }) => {
  const isMobile = useIsMobile();
  const [sidebarOpen, setSidebarOpen] = React.useState(!isMobile);

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <div 
        className={cn(
          "fixed left-0 top-0 z-40 h-full transition-all duration-300",
          sidebarOpen ? "w-64" : "w-0 -translate-x-full"
        )}
      >
        <Sidebar onClose={() => setSidebarOpen(false)} />
      </div>

      {/* Main content */}
      <div className={cn(
        "flex flex-col flex-1 transition-all duration-300",
        sidebarOpen ? "ml-64" : "ml-0"
      )}>
        {/* Header */}
        <header className="flex justify-between items-center bg-white border-b px-4 py-2 h-16 shadow-sm">
          <div className="flex items-center">
            {!sidebarOpen && (
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => setSidebarOpen(true)}
                className="mr-2"
              >
                <Menu className="h-5 w-5" />
              </Button>
            )}
            <h1 className="text-xl font-semibold">{title || 'Canteen Management System'}</h1>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="outline">Help</Button>
            <Button variant="outline">Settings</Button>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
