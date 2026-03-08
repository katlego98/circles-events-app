import { cn } from "../../lib/utils";

interface GlassButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'primary' | 'ghost';
  children: React.ReactNode;
}

export const GlassButton = ({ children, className, variant = 'default', ...props }: GlassButtonProps) => {
  const baseStyles = "transition-all active:scale-95 disabled:opacity-50 disabled:pointer-events-none rounded-lg px-4 py-2 font-medium flex items-center justify-center";
  const variants = {
    default: "glass-button",
    primary: "glass-button-primary",
    ghost: "hover:bg-white/10 text-white/80 hover:text-white"
  };

  return (
    <button className={cn(baseStyles, variants[variant], className)} {...props}>
      {children}
    </button>
  );
};
