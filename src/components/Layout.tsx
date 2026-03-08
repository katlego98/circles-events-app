import { Link, useNavigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../lib/store";
import { GlassButton } from "./ui/GlassButton";
import { LogOut, Calendar, Ticket } from "lucide-react";

export const Navbar = () => {
  const { user, logout, isHydrated } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  // Prevent flicker by not rendering auth state until hydrated
  if (!isHydrated) return null;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-panel border-x-0 border-t-0 rounded-none h-16 flex items-center justify-between px-4 md:px-8">
      <Link to="/" className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400" data-testid="navbar-logo-link">
        Circles Events
      </Link>
      
      <div className="flex items-center gap-4">
        {user ? (
          <>
            <Link to="/dashboard" data-testid="navbar-events-link">
              <GlassButton variant="ghost" className="flex items-center gap-2">
                <Calendar size={18} /> <span className="hidden sm:inline">Events</span>
              </GlassButton>
            </Link>
            <Link to="/bookings" data-testid="navbar-bookings-link">
              <GlassButton variant="ghost" className="flex items-center gap-2">
                <Ticket size={18} /> <span className="hidden sm:inline">My Bookings</span>
              </GlassButton>
            </Link>
             <div className="flex items-center gap-2 ml-2 pl-4 border-l border-white/10">
                <span className="text-sm text-white/60 hidden sm:inline" data-testid="navbar-user-name">{user.name}</span>
                <GlassButton onClick={handleLogout} variant="ghost" className="p-2" data-testid="navbar-logout-button">
                  <LogOut size={18} />
                </GlassButton>
             </div>
          </>
        ) : (
          <div className="flex items-center gap-2">
            <Link to="/login" data-testid="navbar-login-link">
              <GlassButton variant="ghost">Login</GlassButton>
            </Link>
            <Link to="/register" data-testid="navbar-register-link">
              <GlassButton variant="primary">Register</GlassButton>
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export const Layout = () => {
  return (
    <div className="min-h-screen text-white bg-transparent">
      <Navbar />
      <main className="pt-24 pb-12 px-4 md:px-8 max-w-7xl mx-auto">
        <Outlet />
      </main>
    </div>
  );
};
