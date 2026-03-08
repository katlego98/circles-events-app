import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Layout } from "./components/Layout";
import { LandingPage } from "./pages/LandingPage";
import { DashboardPage } from "./pages/DashboardPage";
import { LoginPage } from "./pages/LoginPage";
import { RegisterPage } from "./pages/RegisterPage";
import { EventDetailsPage } from "./pages/EventDetailsPage";
import { CreateEventPage } from "./pages/CreateEventPage";
import { BookingsPage } from "./pages/BookingsPage";
import { useAuthStore } from "./lib/store";
import React from "react";

const queryClient = new QueryClient();

const ProtectedRoute = ({ children, role }: { children: React.ReactElement; role?: 'ORGANIZER' }) => {
  const { user, isHydrated } = useAuthStore();
  
  if (!isHydrated) {
    return <div className="min-h-screen flex items-center justify-center text-white">Loading...</div>;
  }
  
  if (!user) return <Navigate to="/login" replace />;
  if (role && user.role !== role) return <Navigate to="/" replace />;
  return children;
};

function App() {
  const { isHydrated } = useAuthStore();
  
  // Show loading state while auth is hydrating
  if (!isHydrated) {
    return null; // Or a loading spinner
  }

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<LandingPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/events/:id" element={<EventDetailsPage />} />
            
            <Route path="/bookings" element={
              <ProtectedRoute>
                <BookingsPage />
              </ProtectedRoute>
            } />
            
            <Route path="/events/create" element={
              <ProtectedRoute role="ORGANIZER">
                <CreateEventPage />
              </ProtectedRoute>
            } />
            <Route path="/events/:id/edit" element={
              <ProtectedRoute role="ORGANIZER">
                <CreateEventPage />
              </ProtectedRoute>
            } />
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
