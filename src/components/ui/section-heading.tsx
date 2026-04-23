import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

export function SectionHeading({
  eyebrow,
  title,
  description,
  href,
  hrefLabel = "Смотреть всё",
  align = "left",
  className,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  href?: string;
  hrefLabel?: string;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between mb-6",
        align === "center" && "items-center text-center",
        className,
      )}
    >
      <div className={cn("flex flex-col gap-2", align === "center" && "items-center")}>
        {eyebrow && (
          <span className="text-xs uppercase tracking-[0.2em] text-accent font-semibold inline-flex items-center gap-2">
            <span className="h-px w-6 bg-accent" />
            {eyebrow}
          </span>
        )}
        <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-fg-primary uppercase">
          {title}
        </h2>
        {description && (
          <p className="text-sm sm:text-base text-fg-secondary max-w-2xl">{description}</p>
        )}
      </div>
      {href && (
        <Link
          href={href}
          className="inline-flex items-center gap-1.5 text-sm font-medium text-fg-secondary hover:text-accent transition-colors group"
        >
          {hrefLabel}
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </Link>
      )}
    </div>
  );
}
