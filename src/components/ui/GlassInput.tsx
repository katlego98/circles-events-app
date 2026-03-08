import { forwardRef } from "react";
import { cn } from "../../lib/utils";

interface GlassInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const GlassInput = forwardRef<HTMLInputElement, GlassInputProps>(
  ({ className, label, error, ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-white/80 mb-1.5 ml-1">
            {label}
          </label>
        )}
        <input
          ref={ref}
          className={cn(
            "glass-input w-full",
            error && "border-red-500/50 focus:border-red-500/80",
            className
          )}
          {...props}
        />
        {error && <p className="mt-1 text-xs text-red-400 ml-1">{error}</p>}
      </div>
    );
  }
);
GlassInput.displayName = "GlassInput";
