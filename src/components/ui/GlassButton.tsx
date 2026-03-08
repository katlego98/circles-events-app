import { cn } from "../../lib/utils";

interface GlassButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

export const GlassButton = ({ children, className, variant = 'default', size = 'md', ...props }: GlassButtonProps) => {
  const baseStyles = "transition-all active:scale-95 disabled:opacity-50 disabled:pointer-events-none rounded-lg font-medium flex items-center justify-center";
  
  const variants = {
    default: "glass-button",
    primary: "glass-button-primary",
    secondary: "bg-white/10 hover:bg-white/20 text-white border border-white/10",
    ghost: "hover:bg-white/10 text-white/80 hover:text-white"
  };

  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2",
    lg: "px-6 py-3 text-lg"
  };

  return (
    <button className={cn(baseStyles, variants[variant], sizes[size], className)} {...props}>
      {children}
    </button>
  );
};
