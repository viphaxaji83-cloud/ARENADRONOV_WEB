import { cn } from "@/lib/utils";

export function Progress({
  value,
  max = 100,
  className,
  variant = "accent",
}: {
  value: number;
  max?: number;
  className?: string;
  variant?: "accent" | "success" | "warning" | "danger";
}) {
  const pct = Math.max(0, Math.min(100, (value / max) * 100));
  const variantBg = {
    accent: "bg-accent",
    success: "bg-success",
    warning: "bg-warning",
    danger: "bg-danger",
  }[variant];
  return (
    <div
      className={cn("h-1.5 w-full overflow-hidden rounded-full bg-bg-elevated", className)}
      role="progressbar"
      aria-valuenow={value}
      aria-valuemax={max}
    >
      <div
        className={cn("h-full rounded-full transition-all duration-300", variantBg)}
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}
