import { Link } from "react-router-dom";
import { GlassCard } from "../components/ui/GlassCard";
import { GlassButton } from "../components/ui/GlassButton";
import { useAuthStore } from "../lib/store";
import { Calendar, Users, Ticket, ArrowRight } from "lucide-react";

export const LandingPage = () => {
  const { user } = useAuthStore();

  return (
    <div className="flex flex-col gap-16 pb-20">
      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center text-center py-20 px-4 min-h-[60vh]">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-500/10 via-purple-500/10 to-transparent pointer-events-none" />
        
        <h1 className="text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-300 via-white to-purple-300 mb-6 drop-shadow-lg animate-fade-in-up">
          Circles Events
        </h1>
        
        <p className="text-xl md:text-2xl text-white/80 max-w-2xl mb-10 leading-relaxed animate-fade-in-up delay-100">
          Connect, Create, and Celebrate. The modern platform for discovering and managing events that matter to you.
        </p>
        
        <div className="flex gap-4 animate-fade-in-up delay-200">
          {user ? (
            <Link to="/dashboard" data-testid="hero-dashboard-link">
              <GlassButton variant="primary" size="lg" className="group">
                Go to Dashboard
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </GlassButton>
            </Link>
          ) : (
            <>
              <Link to="/register" data-testid="hero-get-started-link">
                <GlassButton variant="primary" size="lg" className="px-8">
                  Get Started
                </GlassButton>
              </Link>
              <Link to="/login" data-testid="hero-sign-in-link">
                <GlassButton variant="secondary" size="lg" className="px-8">
                  Sign In
                </GlassButton>
              </Link>
            </>
          )}
        </div>
      </section>

      {/* Features Grid */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8 px-4 max-w-7xl mx-auto w-full">
        <GlassCard className="flex flex-col items-center text-center p-8 hover:bg-white/10 transition-colors">
          <div className="w-16 h-16 rounded-full bg-blue-500/20 flex items-center justify-center mb-6 text-blue-300">
            <Calendar size={32} />
          </div>
          <h3 className="text-2xl font-bold mb-4 text-white">Discover Events</h3>
          <p className="text-white/60">
            Find workshops, concerts, and meetups in your city. Filter by category, location, and date to find your perfect circle.
          </p>
        </GlassCard>

        <GlassCard className="flex flex-col items-center text-center p-8 hover:bg-white/10 transition-colors">
          <div className="w-16 h-16 rounded-full bg-purple-500/20 flex items-center justify-center mb-6 text-purple-300">
            <Users size={32} />
          </div>
          <h3 className="text-2xl font-bold mb-4 text-white">Build Community</h3>
          <p className="text-white/60">
            Create your own events and grow your audience. Tools for organizers to manage attendees and recurring series.
          </p>
        </GlassCard>

        <GlassCard className="flex flex-col items-center text-center p-8 hover:bg-white/10 transition-colors">
          <div className="w-16 h-16 rounded-full bg-pink-500/20 flex items-center justify-center mb-6 text-pink-300">
            <Ticket size={32} />
          </div>
          <h3 className="text-2xl font-bold mb-4 text-white">Easy Booking</h3>
          <p className="text-white/60">
            Seamless ticket booking experience. Secure payments, instant confirmation, and easy management of your bookings.
          </p>
        </GlassCard>
      </section>

      {/* CTA Section */}
      <section className="px-4 max-w-4xl mx-auto w-full text-center">
        <GlassCard className="py-16 px-8 bg-gradient-to-r from-blue-900/40 to-purple-900/40 border-white/20">
          <h2 className="text-3xl font-bold mb-6 text-white">Ready to join the circle?</h2>
          <p className="text-white/70 mb-8 max-w-xl mx-auto">
            Join thousands of users who are already creating and discovering amazing events.
          </p>
          {!user && (
            <Link to="/register" data-testid="cta-create-account-link">
              <GlassButton variant="primary" size="lg">
                Create Free Account
              </GlassButton>
            </Link>
          )}
        </GlassCard>
      </section>
    </div>
  );
};
