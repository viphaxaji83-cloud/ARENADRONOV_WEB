import * as React from "react";
import { cn } from "@/lib/utils";

type BadgeVariant = "neutral" | "accent" | "success" | "warning" | "danger" | "info";
type BadgeSize = "sm" | "md";

const variantClasses: Record<BadgeVariant, string> = {
  neutral: "bg-bg-elevated text-fg-secondary border-border-subtle",
  accent: "bg-accent-muted text-accent border-accent/30",
  success: "bg-success-muted text-success border-success/30",
  warning: "bg-warning-muted text-warning border-warning/30",
  danger: "bg-danger-muted text-danger border-danger/30",
  info: "bg-info-muted text-info border-info/30",
};

const sizeClasses: Record<BadgeSize, string> = {
  sm: "h-5 px-1.5 text-[10px]",
  md: "h-6 px-2 text-xs",
};

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  size?: BadgeSize;
  dot?: boolean;
}

export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant = "neutral", size = "md", dot, children, ...props }, ref) => (
    <span
      ref={ref}
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border font-medium uppercase tracking-wider",
        variantClasses[variant],
        sizeClasses[size],
        className,
      )}
      {...props}
    >
      {dot && (
        <span
          className={cn("h-1.5 w-1.5 rounded-full", {
            "bg-fg-secondary": variant === "neutral",
            "bg-accent": variant === "accent",
            "bg-success": variant === "success",
            "bg-warning": variant === "warning",
            "bg-danger": variant === "danger",
            "bg-info": variant === "info",
          })}
        />
      )}
      {children}
    </span>
  ),
);
Badge.displayName = "Badge";
