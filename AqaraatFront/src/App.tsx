import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { TermsCheck } from "@/components/TermsCheck";
import Index from "./pages/Index";
import Terms from "./pages/Terms";
import Dashboard from "./pages/Dashboard";
import Search from "./pages/Search";
import Areas from "./pages/Areas";
import AddProperty from "./pages/AddProperty";
import Properties from "./pages/Properties";
import PropertyDetails from "./pages/PropertyDetails";
import StudentRequests from "./pages/StudentRequests";
import AdminManagement from "./pages/AdminManagement";
import TestConnection from "./pages/TestConnection";
import AllProperties from "./pages/AllProperties";

import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <TermsCheck>
                  <Dashboard />
                </TermsCheck>
              </ProtectedRoute>
            } />
            <Route path="/search" element={
              <ProtectedRoute>
                <TermsCheck>
                  <Search />
                </TermsCheck>
              </ProtectedRoute>
            } />
            <Route path="/areas" element={
              <ProtectedRoute>
                <TermsCheck>
                  <Areas />
                </TermsCheck>
              </ProtectedRoute>
            } />
            <Route path="/add-property" element={
              <ProtectedRoute>
                <TermsCheck>
                  <AddProperty />
                </TermsCheck>
              </ProtectedRoute>
            } />
            <Route path="/properties" element={
              <ProtectedRoute>
                <TermsCheck>
                  <Properties />
                </TermsCheck>
              </ProtectedRoute>
            } />
            <Route path="/properties/:id" element={
              <ProtectedRoute>
                <TermsCheck>
                  <PropertyDetails />
                </TermsCheck>
              </ProtectedRoute>
            } />
            <Route path="/student-requests" element={
              <ProtectedRoute>
                <TermsCheck>
                  <StudentRequests />
                </TermsCheck>
              </ProtectedRoute>
            } />
            <Route path="/admin-management" element={
              <ProtectedRoute>
                <TermsCheck>
                  <AdminManagement />
                </TermsCheck>
              </ProtectedRoute>
            } />
            <Route path="/all-properties" element={
              <ProtectedRoute>
                <TermsCheck>
                  <AllProperties />
                </TermsCheck>
              </ProtectedRoute>
            } />
            <Route path="/test-connection" element={<TestConnection />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
