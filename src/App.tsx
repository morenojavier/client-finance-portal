
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import AppLayout from "@/components/AppLayout";
import LoginPage from "@/pages/LoginPage";
import Dashboard from "@/pages/Dashboard";
import ServicesPage from "@/pages/ServicesPage";
import AccountSettings from "@/pages/AccountSettings";
import PublicServicesPage from "@/pages/PublicServicesPage";
import PaymentDetailsPage from "@/pages/PaymentDetailsPage";
import RecuperarPassword from "@/pages/RecuperarPassword";
import LandingPage from "@/pages/LandingPage";
import NotFound from "./pages/NotFound";
import ClientsPage from "@/pages/ClientsPage";
import ClientDashboard from "@/pages/ClientDashboard";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/recuperar-password" element={<RecuperarPassword />} />
          <Route path="/servicios/publico" element={<PublicServicesPage />} />
          <Route path="/cliente/:clientId" element={<ClientDashboard />} />

          {/* Protected routes */}
          <Route path="/" element={<AppLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/servicios" element={<ServicesPage />} />
            <Route path="/datos-pago" element={<PaymentDetailsPage />} />
            <Route path="/cuenta" element={<AccountSettings />} />
            <Route path="/clientes" element={<ClientsPage />} />
          </Route>

          {/* Catch-all route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
