import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useNavigate, useParams } from "react-router-dom";
import { api } from "../lib/api";
import { GlassCard } from "../components/ui/GlassCard";
import { GlassInput } from "../components/ui/GlassInput";
import { GlassButton } from "../components/ui/GlassButton";
import { useEffect } from "react";

const schema = z.object({
  title: z.string().trim().min(3, "Title too short").max(100, "Title too long"),
  description: z.string().trim().min(10, "Description too short").max(2000, "Description too long"),
  category: z.string().trim().min(2, "Category required").max(50, "Category too long"),
  location_city: z.string().trim().min(2, "City required").max(100, "City too long"),
  location_country: z.string().trim().min(2, "Country required").max(100, "Country too long"),
  price: z.coerce.number().min(0, "Price must be positive").max(1000000, "Price too high"),
  capacity: z.coerce.number().min(1, "Capacity must be at least 1").max(100000, "Capacity too high"),
  start_datetime: z.string().min(1, "Start date required"),
  end_datetime: z.string().min(1, "End date required"),
});

type CreateEventForm = z.infer<typeof schema>;

export const CreateEventPage = () => {
  const { id } = useParams<{ id: string }>();
  const isEditMode = !!id;
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<CreateEventForm>({
    resolver: zodResolver(schema),
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (isEditMode) {
      const fetchEvent = async () => {
        try {
          const res = await api.api.getById(id);
          const event = res.data;
          reset({
            ...event,
            start_datetime: event.startDatetime ? new Date(event.startDatetime).toISOString().slice(0, 16) : "",
            end_datetime: event.endDatetime ? new Date(event.endDatetime).toISOString().slice(0, 16) : "",
            location_city: event.locationCity,
            location_country: event.locationCountry,
          });
        } catch (error) {
          console.error("Failed to fetch event", error);
          alert("Failed to load event details");
          navigate("/dashboard");
        }
      };
      fetchEvent();
    }
  }, [id, isEditMode, reset, navigate]);

  const onSubmit = async (data: CreateEventForm) => {
    try {
      const payload = {
        ...data,
        start_datetime: new Date(data.start_datetime).toISOString(),
        end_datetime: new Date(data.end_datetime).toISOString(),
      };
      
      if (isEditMode) {
        await api.api.update(id, payload);
        alert("Event updated successfully!");
      } else {
        await api.api.create(payload);
        alert("Event created successfully!");
      }
      navigate("/dashboard");
    } catch (error) {
      console.error(error);
      alert(isEditMode ? "Failed to update event." : "Failed to create event.");
    }
  };

  return (
    <div className="max-w-2xl mx-auto py-8">
      <GlassCard>
        <h2 className="text-2xl font-bold mb-6 text-white">{isEditMode ? "Edit Event" : "Create New Event"}</h2>
        <form onSubmit={handleSubmit<CreateEventForm>(onSubmit)} className="space-y-4">
          <GlassInput label="Title" {...register("title")} error={errors.title?.message} data-testid="event-title-input" />
          <GlassInput label="Description" {...register("description")} error={errors.description?.message} data-testid="event-description-input" />
          
          <div className="grid grid-cols-2 gap-4">
            <GlassInput label="Category" {...register("category")} error={errors.category?.message} data-testid="event-category-input" />
            <GlassInput label="Price" type="number" step="0.01" {...register("price")} error={errors.price?.message} data-testid="event-price-input" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <GlassInput label="City" {...register("location_city")} error={errors.location_city?.message} data-testid="event-city-input" />
            <GlassInput label="Country" {...register("location_country")} error={errors.location_country?.message} data-testid="event-country-input" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <GlassInput label="Capacity" type="number" {...register("capacity")} error={errors.capacity?.message} data-testid="event-capacity-input" />
            <GlassInput label="Start Date" type="datetime-local" {...register("start_datetime")} error={errors.start_datetime?.message} data-testid="event-start-date-input" />
          </div>
          
          <GlassInput label="End Date" type="datetime-local" {...register("end_datetime")} error={errors.end_datetime?.message} data-testid="event-end-date-input" />

          <div className="flex gap-4 mt-6">
            <GlassButton 
              type="button" 
              variant="secondary" 
              className="flex-1"
              onClick={() => navigate("/dashboard")}
              data-testid="event-cancel-button"
            >
              Cancel
            </GlassButton>
            <GlassButton type="submit" variant="primary" className="flex-1" disabled={isSubmitting} data-testid="event-submit-button">
              {isSubmitting ? (isEditMode ? "Updating..." : "Creating...") : (isEditMode ? "Update Event" : "Create Event")}
            </GlassButton>
          </div>
        </form>
      </GlassCard>
    </div>
  );
};
