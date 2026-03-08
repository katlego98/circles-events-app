import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { api } from "../lib/api";
import { GlassCard } from "../components/ui/GlassCard";
import { GlassButton } from "../components/ui/GlassButton";
import { GlassInput } from "../components/ui/GlassInput";
import { useState } from "react";
import { format } from "date-fns";
import { MapPin, Calendar, Tag } from "lucide-react";

import { useAuthStore } from "../lib/store";
import { Plus } from "lucide-react";

export const DashboardPage = () => {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const { user } = useAuthStore();

  const { data: events, isLoading } = useQuery({
    queryKey: ["events", search, category],
    queryFn: async () => {
      const res = await api.api.list({
        location: search || undefined,
        category: category || undefined,
      });
      return res.data;
    },
  });

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row gap-4 justify-between items-start">
        <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
          <GlassInput 
            placeholder="Search by location..." 
            value={search} 
            onChange={(e) => setSearch(e.target.value)}
            className="md:max-w-xs"
            data-testid="search-location-input"
          />
          <GlassInput 
            placeholder="Category..." 
            value={category} 
            onChange={(e) => setCategory(e.target.value)}
            className="md:max-w-xs"
            data-testid="search-category-input"
          />
        </div>
        {user?.role === 'ORGANIZER' && (
          <Link to="/events/create" data-testid="create-event-link">
            <GlassButton variant="primary" className="flex items-center gap-2">
              <Plus size={18} /> Create Event
            </GlassButton>
          </Link>
        )}
      </div>

      {isLoading ? (
        <div className="text-center py-20 text-white/50">Loading events...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events?.data?.map((event) => (
            <GlassCard key={event.id} className="flex flex-col h-full hover:bg-white/15 transition-colors group relative overflow-hidden" data-testid={`event-card-${event.id}`}>
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-500 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
              
              <div className="flex justify-between items-start mb-4">
                <span className="bg-blue-500/20 text-blue-200 text-xs px-2 py-1 rounded-full border border-blue-500/30">
                  {event.category}
                </span>
                <span className="text-lg font-bold text-green-400">
                  ${event.price}
                </span>
              </div>
              
              <h3 className="text-xl font-bold mb-2 group-hover:text-blue-300 transition-colors">{event.title}</h3>
              <p className="text-white/60 text-sm mb-4 line-clamp-2 flex-grow">{event.description}</p>
              
              <div className="space-y-2 text-sm text-white/50 mb-6">
                <div className="flex items-center gap-2">
                  <MapPin size={16} />
                  <span>{event.locationCity}, {event.locationCountry}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar size={16} />
                  <span>{event.startDatetime ? format(new Date(event.startDatetime), "PPP p") : 'TBA'}</span>
                </div>
              </div>

              <Link to={`/events/${event.id}`} className="mt-auto" data-testid={`event-view-details-link-${event.id}`}>
                <GlassButton className="w-full">View Details</GlassButton>
              </Link>
            </GlassCard>
          ))}
        </div>
      )}
    </div>
  );
};
