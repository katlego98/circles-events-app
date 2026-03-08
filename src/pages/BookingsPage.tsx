import { useQuery } from "@tanstack/react-query";
import { api } from "../lib/api";
import { GlassCard } from "../components/ui/GlassCard";
import { format } from "date-fns";
import type { Booking } from "../lib/types";

export const BookingsPage = () => {
  const { data: bookings, isLoading } = useQuery({
    queryKey: ["bookings"],
    queryFn: async () => {
      const res = await api.request<{ data: Booking[] }>({
        path: '/api/v1/bookings/me',
        method: 'GET'
      });
      return res.data; 
    },
  });

  if (isLoading) return <div className="text-center py-20">Loading bookings...</div>;

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">My Bookings</h1>
      <div className="space-y-4">
        {bookings?.data?.length === 0 ? (
           <p className="text-white/50">No bookings found.</p>
        ) : (
          bookings?.data?.map((booking) => (
            <GlassCard key={booking.id} className="flex justify-between items-center" data-testid={`booking-card-${booking.id}`}>
              <div>
                <h3 className="font-bold text-lg mb-1">Booking #{booking.id.slice(0, 8)}</h3>
                <p className="text-sm text-white/60">Tickets: {booking.tickets}</p>
                <p className="text-sm text-white/60">Status: <span className={booking.status === 'CONFIRMED' ? 'text-green-400' : 'text-yellow-400'}>{booking.status}</span></p>
              </div>
              <div className="text-right">
                <div className="font-bold text-xl">${booking.total_price}</div>
                <div className="text-xs text-white/40">{format(new Date(booking.created_at), "PPP")}</div>
              </div>
            </GlassCard>
          ))
        )}
      </div>
    </div>
  );
};
