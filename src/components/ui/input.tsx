import * as React from "react";
import { cn } from "@/lib/utils";

export const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, type, ...props }, ref) => (
    <input
      ref={ref}
      type={type}
      className={cn(
        "flex h-10 w-full rounded-md border border-border-strong bg-bg-elevated px-3 py-2 text-sm",
        "text-fg-primary placeholder:text-fg-muted",
        "transition-colors",
        "focus:border-accent focus:outline-none",
        "disabled:opacity-50 disabled:cursor-not-allowed",
        "file:border-0 file:bg-transparent file:text-sm file:font-medium",
        className,
      )}
      {...props}
    />
  ),
);
Input.displayName = "Input";

export const Textarea = React.forwardRef<HTMLTextAreaElement, React.TextareaHTMLAttributes<HTMLTextAreaElement>>(
  ({ className, ...props }, ref) => (
    <textarea
      ref={ref}
      className={cn(
        "flex min-h-24 w-full rounded-md border border-border-strong bg-bg-elevated px-3 py-2 text-sm",
        "text-fg-primary placeholder:text-fg-muted",
        "transition-colors resize-y",
        "focus:border-accent focus:outline-none",
        "disabled:opacity-50 disabled:cursor-not-allowed",
        className,
      )}
      {...props}
    />
  ),
);
Textarea.displayName = "Textarea";

export const Select = React.forwardRef<HTMLSelectElement, React.SelectHTMLAttributes<HTMLSelectElement>>(
  ({ className, children, ...props }, ref) => (
    <select
      ref={ref}
      className={cn(
        "flex h-10 w-full rounded-md border border-border-strong bg-bg-elevated px-3 py-2 text-sm",
        "text-fg-primary",
        "transition-colors",
        "focus:border-accent focus:outline-none",
        "disabled:opacity-50 disabled:cursor-not-allowed",
        "appearance-none bg-no-repeat bg-right pr-9",
        className,
      )}
      style={{
        backgroundImage:
          "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20' stroke='%2394a3b8'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M6 8l4 4 4-4'/%3E%3C/svg%3E\")",
        backgroundPosition: "right 0.5rem center",
        backgroundSize: "1.25rem",
      }}
      {...props}
    >
      {children}
    </select>
  ),
);
Select.displayName = "Select";

export function Label({ className, ...props }: React.LabelHTMLAttributes<HTMLLabelElement>) {
  return (
    <label
      className={cn("text-sm font-medium text-fg-primary leading-none", className)}
      {...props}
    />
  );
}

export function Field({
  label,
  hint,
  error,
  required,
  children,
  className,
  labelExtra,
}: {
  label?: string;
  hint?: React.ReactNode;
  error?: string;
  required?: boolean;
  children: React.ReactNode;
  className?: string;
  labelExtra?: React.ReactNode;
}) {
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      {label && (
        <div className="flex items-center justify-between">
          <Label>
            {label}
            {required && <span className="text-danger ml-1">*</span>}
          </Label>
          {labelExtra && <div className="text-xs">{labelExtra}</div>}
        </div>
      )}
      {children}
      {(hint || error) && (
        <div className={cn("text-xs", error ? "text-danger" : "text-fg-muted")}>
          {error || hint}
        </div>
      )}
    </div>
  );
}
