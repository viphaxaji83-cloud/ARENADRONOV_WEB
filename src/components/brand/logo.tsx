import Link from "next/link";
import { cn } from "@/lib/utils";

export function Logo({
  href = "/",
  className,
  size = "md",
}: {
  href?: string;
  className?: string;
  size?: "sm" | "md" | "lg";
}) {
  const sizes = {
    sm: { box: "h-7 w-7", text: "text-base" },
    md: { box: "h-8 w-8", text: "text-lg" },
    lg: { box: "h-10 w-10", text: "text-xl" },
  }[size];

  return (
    <Link href={href} className={cn("inline-flex items-center gap-2 group", className)}>
      <span
        className={cn(
          "relative inline-flex items-center justify-center rounded-md",
          "bg-gradient-to-br from-accent to-accent-hover text-accent-fg shadow-glow",
          sizes.box,
        )}
      >
        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.5">
          <path d="M12 2 L4 8 L12 14 L20 8 Z" />
          <path d="M12 14 L12 22" />
          <circle cx="12" cy="22" r="1.5" fill="currentColor" />
        </svg>
      </span>
      <span className={cn("font-bold tracking-tight text-fg-primary", sizes.text)}>
        Arena<span className="text-accent">Dronov</span>
      </span>
    </Link>
  );
}
