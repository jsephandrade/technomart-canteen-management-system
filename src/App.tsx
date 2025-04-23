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
import POS from "./components/POS";
import Catering from "./components/Catering";
import Inventory from "./components/Inventory";
import Payments from "./components/Payments";
import Users from "./components/Users";
import UserLogs from "./components/UserLogs";
import Notifications from "./components/Notifications";
import { AuthProvider, useAuth } from "./components/AuthContext";
import LandingPage from "./pages/LandingPage";

const queryClient = new QueryClient();

// Wrapper for protected routes
const ProtectedRoutes = () => {
  const { user } = useAuth();

  if (!user) {
    return <LandingPage />;
  }

  return (
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
        <Route path="/pos" element={
          <MainLayout title="Point of Sale">
            <POS />
          </MainLayout>
        } />
        <Route path="/catering" element={
          <MainLayout title="Catering Management">
            <Catering />
          </MainLayout>
        } />
        <Route path="/inventory" element={
          <MainLayout title="Inventory Management">
            <Inventory />
          </MainLayout>
        } />
        <Route path="/payments" element={
          <MainLayout title="Payment Management">
            <Payments />
          </MainLayout>
        } />
        <Route path="/users" element={
          <MainLayout title="User Management">
            <Users />
          </MainLayout>
        } />
        <Route path="/logs" element={
          <MainLayout title="User Logs">
            <UserLogs />
          </MainLayout>
        } />
        <Route path="/notifications" element={
          <MainLayout title="Notifications">
            <Notifications />
          </MainLayout>
        } />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AuthProvider>
        <ProtectedRoutes />
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
