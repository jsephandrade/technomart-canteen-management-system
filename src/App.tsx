
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import MainLayout from "./layouts/MainLayout";
import MenuManagement from "./components/MenuManagement";
import SalesAnalytics from "./components/SalesAnalytics";
import EmployeeSchedule from "./components/EmployeeSchedule";
import CustomerFeedback from "./components/CustomerFeedback";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          
          <Route path="/menu" element={
            <MainLayout title="Menu Management">
              <MenuManagement />
            </MainLayout>
          } />
          
          <Route path="/sales" element={
            <MainLayout title="Sales Analytics">
              <SalesAnalytics />
            </MainLayout>
          } />
          
          <Route path="/employees" element={
            <MainLayout title="Employee Schedule">
              <EmployeeSchedule />
            </MainLayout>
          } />
          
          <Route path="/feedback" element={
            <MainLayout title="Customer Feedback">
              <CustomerFeedback />
            </MainLayout>
          } />
          
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
