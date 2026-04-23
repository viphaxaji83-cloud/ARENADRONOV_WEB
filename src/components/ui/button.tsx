import * as React from "react";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary" | "ghost" | "outline" | "danger";
type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  asChild?: boolean;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-accent text-accent-fg hover:bg-accent-hover shadow-sm hover:shadow-glow",
  secondary:
    "bg-bg-elevated text-fg-primary hover:bg-bg-overlay border border-border-subtle",
  ghost: "text-fg-secondary hover:text-fg-primary hover:bg-bg-elevated",
  outline:
    "border border-border-strong text-fg-primary hover:bg-bg-elevated hover:border-accent",
  danger: "bg-danger text-white hover:bg-danger/90",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "h-8 px-3 text-xs gap-1.5",
  md: "h-10 px-4 text-sm gap-2",
  lg: "h-12 px-6 text-base gap-2.5",
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center rounded-md font-medium",
          "transition-colors duration-150",
          "disabled:opacity-50 disabled:pointer-events-none",
          "whitespace-nowrap",
          variantClasses[variant],
          sizeClasses[size],
          className,
        )}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export const IconButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "ghost", size = "md", ...props }, ref) => {
    const sizeMap = { sm: "h-8 w-8", md: "h-10 w-10", lg: "h-12 w-12" };
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center rounded-md transition-colors duration-150",
          "disabled:opacity-50 disabled:pointer-events-none",
          variantClasses[variant],
          sizeMap[size],
          className,
        )}
        {...props}
      />
    );
  },
);
IconButton.displayName = "IconButton";
