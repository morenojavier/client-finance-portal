
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
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/servicios/publico" element={<PublicServicesPage />} />

          {/* Protected routes */}
          <Route path="/" element={<AppLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/servicios" element={<ServicesPage />} />
            <Route path="/cuenta" element={<AccountSettings />} />
          </Route>

          {/* Catch-all route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
