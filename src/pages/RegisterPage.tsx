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
  name: z.string().trim().min(2, "Name must be at least 2 characters").max(100, "Name too long"),
  email: z.string().trim().email("Invalid email address").max(255, "Email too long"),
  password: z.string()
    .min(8, "Password must be at least 8 characters")
    .max(100, "Password too long")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[0-9]/, "Password must contain at least one number")
    .regex(/[^A-Za-z0-9]/, "Password must contain at least one special character"),
});

type RegisterForm = z.infer<typeof schema>;

export const RegisterPage = () => {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<RegisterForm>({
    resolver: zodResolver(schema),
  });
  const { setToken } = useAuthStore();
  const navigate = useNavigate();

  const onSubmit = async (data: RegisterForm) => {
    try {
      const res = await api.api.register(data);
      if (res && res.data && res.data.access_token) {
        setToken(res.data.access_token);
        navigate("/");
      }
    } catch (error: any) {
      console.error("Registration error:", error);
      let message = "Registration failed. Please try again.";
      
      if (error.status === 409) {
        message = "This email is already registered.";
      } else if (error.message) {
        message = error.message;
      }
      
      alert(message);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-[60vh]">
      <GlassCard className="w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6 text-white">Create Account</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <GlassInput 
            label="Full Name" 
            autoComplete="name"
            {...register("name")} 
            error={errors.name?.message}
            data-testid="register-name-input"
          />
          <GlassInput 
            label="Email" 
            type="email"
            autoComplete="email"
            {...register("email")} 
            error={errors.email?.message}
            data-testid="register-email-input"
          />
          <GlassInput 
            label="Password" 
            type="password"
            autoComplete="new-password"
            {...register("password")} 
            error={errors.password?.message}
            data-testid="register-password-input"
          />
          <GlassButton 
            type="submit" 
            className="w-full mt-4" 
            variant="primary"
            disabled={isSubmitting}
            data-testid="register-submit-button"
          >
            {isSubmitting ? "Creating Account..." : "Register"}
          </GlassButton>
        </form>
      </GlassCard>
    </div>
  );
};
