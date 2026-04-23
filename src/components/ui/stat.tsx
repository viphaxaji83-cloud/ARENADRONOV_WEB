import { cn } from "@/lib/utils";
import { Card } from "./card";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

export function StatCard({
  label,
  value,
  hint,
  icon,
  trend,
  className,
}: {
  label: string;
  value: React.ReactNode;
  hint?: string;
  icon?: React.ReactNode;
  trend?: number;
  className?: string;
}) {
  return (
    <Card className={cn("p-5", className)}>
      <div className="flex items-start justify-between">
        <div className="flex flex-col gap-1">
          <p className="text-xs uppercase tracking-wider text-fg-muted">{label}</p>
          <p className="text-3xl font-bold text-fg-primary tabular leading-none mt-1">{value}</p>
          {hint && <p className="text-xs text-fg-secondary mt-1.5">{hint}</p>}
        </div>
        {icon && (
          <div className="text-fg-muted h-9 w-9 rounded-md bg-bg-elevated flex items-center justify-center">
            {icon}
          </div>
        )}
      </div>
      {trend !== undefined && (
        <div className="flex items-center gap-1 mt-3 text-xs">
          {trend > 0 ? (
            <>
              <TrendingUp className="h-3.5 w-3.5 text-success" />
              <span className="text-success font-medium">+{trend}</span>
            </>
          ) : trend < 0 ? (
            <>
              <TrendingDown className="h-3.5 w-3.5 text-danger" />
              <span className="text-danger font-medium">{trend}</span>
            </>
          ) : (
            <>
              <Minus className="h-3.5 w-3.5 text-fg-muted" />
              <span className="text-fg-muted font-medium">0</span>
            </>
          )}
          <span className="text-fg-muted ml-1">за неделю</span>
        </div>
      )}
    </Card>
  );
}
