import { useQuery } from "@tanstack/react-query";
import { useParams, useNavigate } from "react-router-dom";
import { api } from "../lib/api";
import { GlassCard } from "../components/ui/GlassCard";
import { GlassButton } from "../components/ui/GlassButton";
import { format } from "date-fns";
import { MapPin, Calendar, Users, Edit } from "lucide-react";
import { useAuthStore } from "../lib/store";
import { useState } from "react";
import { GlassInput } from "../components/ui/GlassInput";

export const EventDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const [tickets, setTickets] = useState(1);
  const [bookingError, setBookingError] = useState("");

  const { data: event, isLoading } = useQuery({
    queryKey: ["event", id],
    queryFn: async () => {
      if (!id) throw new Error("No ID");
      const res = await api.api.getById(id);
      return res.data;
    },
  });

  const handleBooking = async () => {
    if (!user) {
      navigate("/login");
      return;
    }
    try {
      setBookingError("");
      await api.request({
        path: '/api/v1/bookings',
        method: 'POST',
        body: {
          event_id: id,
          tickets: Number(tickets)
        }
      });
      alert("Booking successful!");
      navigate("/bookings");
    } catch (err: any) {
      console.error(err);
      setBookingError("Booking failed. Check capacity or try again.");
    }
  };

  if (isLoading) return <div className="text-center py-20">Loading...</div>;
  if (!event) return <div className="text-center py-20">Event not found</div>;

  return (
    <div className="max-w-4xl mx-auto">
      <GlassCard className="p-8">
        <div className="flex justify-between items-start mb-6">
           <div>
             <span className="bg-purple-500/20 text-purple-200 text-sm px-3 py-1 rounded-full border border-purple-500/30 mb-4 inline-block">
                {event.category}
             </span>
             <h1 className="text-4xl font-bold mb-2">{event.title}</h1>
           </div>
           <div className="text-right flex flex-col items-end gap-2">
             <div>
               <div className="text-3xl font-bold text-green-400">${event.price}</div>
               <div className="text-sm text-white/50">per ticket</div>
             </div>
             {user?.role === 'ORGANIZER' && (
               <GlassButton 
                 variant="secondary" 
                 size="sm" 
                 className="flex items-center gap-2 mt-2"
                 onClick={() => navigate(`/events/${id}/edit`)}
                 data-testid="edit-event-button"
               >
                 <Edit size={16} /> Edit Event
               </GlassButton>
             )}
           </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div className="flex items-center gap-3 text-white/80">
            <div className="p-2 bg-white/5 rounded-lg">
              <Calendar className="text-blue-400" />
            </div>
            <div>
              <div className="text-xs text-white/40">Date & Time</div>
              <div className="font-medium">{event.startDatetime ? format(new Date(event.startDatetime), "PPP p") : 'TBA'}</div>
            </div>
          </div>
          
          <div className="flex items-center gap-3 text-white/80">
            <div className="p-2 bg-white/5 rounded-lg">
              <MapPin className="text-red-400" />
            </div>
            <div>
              <div className="text-xs text-white/40">Location</div>
              <div className="font-medium">{event.locationCity}, {event.locationCountry}</div>
            </div>
          </div>

          <div className="flex items-center gap-3 text-white/80">
            <div className="p-2 bg-white/5 rounded-lg">
              <Users className="text-green-400" />
            </div>
            <div>
              <div className="text-xs text-white/40">Capacity</div>
              <div className="font-medium">{event.bookedCount} / {event.capacity} booked</div>
            </div>
          </div>
        </div>

        <div className="prose prose-invert max-w-none mb-10">
          <h3 className="text-xl font-bold mb-4">About this event</h3>
          <p className="text-white/70 leading-relaxed whitespace-pre-line">{event.description}</p>
        </div>

        <div className="border-t border-white/10 pt-8">
          <h3 className="text-xl font-bold mb-4">Book Tickets</h3>
          <div className="flex items-end gap-4 max-w-md">
            <GlassInput 
              type="number" 
              min="1" 
              max="10" 
              label="Number of tickets" 
              value={tickets}
              onChange={(e) => setTickets(Number(e.target.value))}
              data-testid="ticket-quantity-input"
            />
            <GlassButton variant="primary" onClick={handleBooking} className="mb-0.5 h-[42px]" data-testid="confirm-booking-button">
              Confirm Booking
            </GlassButton>
          </div>
          {bookingError && <p className="text-red-400 mt-2">{bookingError}</p>}
        </div>
      </GlassCard>
    </div>
  );
};
