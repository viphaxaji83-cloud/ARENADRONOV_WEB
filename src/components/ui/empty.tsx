import { cn } from "@/lib/utils";
import { Inbox } from "lucide-react";

export function EmptyState({
  icon,
  title,
  description,
  action,
  className,
}: {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  action?: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center text-center py-12 px-6",
        "border border-dashed border-border-subtle rounded-lg bg-bg-surface/50",
        className,
      )}
    >
      <div className="h-12 w-12 rounded-full bg-bg-elevated flex items-center justify-center text-fg-muted mb-4">
        {icon ?? <Inbox className="h-6 w-6" />}
      </div>
      <h3 className="text-base font-semibold text-fg-primary mb-1">{title}</h3>
      {description && (
        <p className="text-sm text-fg-secondary max-w-sm">{description}</p>
      )}
      {action && <div className="mt-5">{action}</div>}
    </div>
  );
}
