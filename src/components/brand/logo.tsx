import Link from "next/link";
import { cn } from "@/lib/utils";

export function Logo({
  href = "/",
  className,
  size = "md",
  variant = "full",
}: {
  href?: string;
  className?: string;
  size?: "sm" | "md" | "lg";
  variant?: "full" | "mark";
}) {
  const sizes = {
    sm: { box: "h-8 w-8", text: "text-[11px]", subtext: "text-[8px]" },
    md: { box: "h-10 w-10", text: "text-[13px]", subtext: "text-[9px]" },
    lg: { box: "h-12 w-12", text: "text-[15px]", subtext: "text-[10px]" },
  }[size];

  return (
    <Link href={href} className={cn("inline-flex items-center gap-2.5 group", className)}>
      <span
        className={cn(
          "relative inline-flex items-center justify-center shrink-0",
          "transition-transform group-hover:scale-105",
          sizes.box,
        )}
        aria-hidden="true"
      >
        <svg
          viewBox="0 0 40 40"
          className="absolute inset-0 h-full w-full"
          fill="none"
          stroke="currentColor"
        >
          {/* Triangular badge — neon outline */}
          <path
            d="M20 3 L36 33 L4 33 Z"
            fill="hsl(var(--color-bg-base))"
            stroke="hsl(var(--color-accent))"
            strokeWidth="1.6"
            strokeLinejoin="round"
            style={{
              filter: "drop-shadow(0 0 6px hsl(var(--color-accent) / 0.6))",
            }}
          />
          {/* Drone silhouette — 4 motors + body */}
          <g
            stroke="hsl(var(--color-accent))"
            strokeWidth="1.4"
            strokeLinecap="round"
            fill="none"
          >
            <line x1="13" y1="20" x2="27" y2="20" />
            <line x1="20" y1="16" x2="20" y2="24" />
            <circle cx="13" cy="20" r="2.2" />
            <circle cx="27" cy="20" r="2.2" />
            <circle cx="20" cy="16" r="2.2" />
            <circle cx="20" cy="24" r="2.2" />
          </g>
        </svg>
      </span>

      {variant === "full" && (
        <span className="flex flex-col leading-none">
          <span
            className={cn(
              "font-wordmark font-normal tracking-[0.12em] uppercase text-fg-primary",
              sizes.text,
            )}
          >
            Арена
          </span>
          <span
            className={cn(
              "font-wordmark font-normal tracking-[0.18em] uppercase text-accent text-glow",
              sizes.subtext,
              "mt-0.5",
            )}
          >
            Дронов
          </span>
        </span>
      )}
    </Link>
  );
}
