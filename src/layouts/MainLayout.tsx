
import React from 'react';
import {
  SidebarProvider,
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarFooter,
  SidebarTrigger,
  SidebarInset
} from '@/components/ui/sidebar';
import { NavigationSidebar } from '@/components/NavigationSidebar';
import { useIsMobile } from '@/hooks/use-mobile';
import { Button } from '@/components/ui/button';
import { Menu } from 'lucide-react';

interface MainLayoutProps {
  children: React.ReactNode;
  title?: string;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children, title }) => {
  const isMobile = useIsMobile();

  return (
    <SidebarProvider defaultOpen={!isMobile}>
      <div className="flex h-screen w-full bg-background">
        {/* Sidebar */}
        <Sidebar variant="sidebar">
          <SidebarHeader>
            <div className="flex items-center justify-between p-4">
              <div className="flex items-center space-x-2">
                <span className="text-xl font-bold">Canteen MS</span>
              </div>
            </div>
          </SidebarHeader>
          
          <SidebarContent>
            <NavigationSidebar />
          </SidebarContent>
          
          <SidebarFooter>
            <div className="p-4 border-t border-sidebar-border">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-sidebar-accent flex items-center justify-center">
                  <span className="font-semibold text-sidebar-accent-foreground">A</span>
                </div>
                <div>
                  <p className="font-semibold">Admin User</p>
                  <p className="text-sm text-sidebar-foreground/70">admin@canteen.com</p>
                </div>
              </div>
            </div>
          </SidebarFooter>
        </Sidebar>

        {/* Main content */}
        <SidebarInset className="flex flex-col">
          {/* Header */}
          <header className="flex justify-between items-center bg-white border-b px-4 py-2 h-16 shadow-sm">
            <div className="flex items-center">
              <SidebarTrigger className="mr-2" />
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
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default MainLayout;
