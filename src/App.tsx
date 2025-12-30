import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AuthPage from "./pages/AuthPage";
import DashboardLayout from "./components/layout/DashboardLayout";
import TimeSheetsPage from "./pages/TimeSheetsPage";
import ProjectsPage from "./pages/ProjectsPage";
import UsersPage from "./pages/UsersPage";
import ApprovalsPage from "./pages/ApprovalsPage";
import SalaryPage from "./pages/SalaryPage";
import HolidaysPage from "./pages/HolidaysPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/auth" replace />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index element={<Navigate to="/dashboard/timesheets" replace />} />
            <Route path="timesheets" element={<TimeSheetsPage />} />
            <Route path="projects" element={<ProjectsPage />} />
            <Route path="users" element={<UsersPage />} />
            <Route path="approvals" element={<ApprovalsPage />} />
            <Route path="salary" element={<SalaryPage />} />
            <Route path="holidays" element={<HolidaysPage />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
