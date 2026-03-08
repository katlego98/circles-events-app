import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useNavigate } from "react-router-dom";
import { api } from "../lib/api";
import { useAuthStore } from "../lib/store";
import { GlassCard } from "../components/ui/GlassCard";
import { GlassInput } from "../components/ui/GlassInput";
import { GlassButton } from "../components/ui/GlassButton";

const schema = z.object({
  email: z.string().trim().email().max(255),
  password: z.string().min(1).max(100),
});

type LoginForm = z.infer<typeof schema>;

export const LoginPage = () => {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<LoginForm>({
    resolver: zodResolver(schema),
  });
  const { setToken, setUser } = useAuthStore();
  const navigate = useNavigate();

  const onSubmit = async (data: LoginForm) => {
    try {
      const res = await api.api.login(data);
      if (res && res.data && res.data.access_token) {
        setToken(res.data.access_token);
        res.data.user!.role = "ORGANIZER"; // Temporarily force ORGANIZER role for testing
        // Use the user data returned from the login endpoint
        if (res.data.user) {
          setUser(res.data.user);
        } else {
          // Fallback if user data is missing (should not happen with correct backend)
          setUser({
             id: "temp-id",
             name: "User",
           email: data.email,
           role: "ORGANIZER" // Temporarily force ORGANIZER role for testing
        });
        }
        
        navigate("/dashboard");
      } else {
        throw new Error("No access token received");
      }
    } catch (error) {
      console.error(error);
      alert("Login failed. Please check credentials.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-[60vh]">
      <GlassCard className="w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6 text-white">Welcome Back</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <GlassInput 
            label="Email" 
            type="email"
            autoComplete="email"
            {...register("email")} 
            error={errors.email?.message}
            data-testid="login-email-input"
          />
          <GlassInput 
            label="Password" 
            type="password"
            autoComplete="current-password"
            {...register("password")} 
            error={errors.password?.message}
            data-testid="login-password-input"
          />
          <GlassButton 
            type="submit" 
            className="w-full mt-4" 
            variant="primary"
            disabled={isSubmitting}
            data-testid="login-submit-button"
          >
            {isSubmitting ? "Logging in..." : "Login"}
          </GlassButton>
        </form>
      </GlassCard>
    </div>
  );
};
