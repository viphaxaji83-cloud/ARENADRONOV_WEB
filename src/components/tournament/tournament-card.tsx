import Link from "next/link";
import { Calendar, MapPin, Users } from "lucide-react";
import type { Tournament } from "@/lib/types";
import { Card } from "@/components/ui/card";
import { TournamentStatusBadge } from "@/components/ui/status-badge";
import { Progress } from "@/components/ui/progress";
import { disciplineLabel, formatLabel } from "@/lib/labels";
import { formatDate } from "@/lib/utils";
import { cn } from "@/lib/utils";

export function TournamentCard({
  tournament,
  variant = "default",
  className,
}: {
  tournament: Tournament;
  variant?: "default" | "compact";
  className?: string;
}) {
  const seatsPct = (tournament.seatsTaken / tournament.maxParticipants) * 100;
  const seatsVariant = seatsPct >= 90 ? "danger" : seatsPct >= 70 ? "warning" : "accent";

  return (
    <Link
      href={`/tournaments/${tournament.slug}`}
      className={cn("group block", className)}
    >
      <Card className="overflow-hidden hover:border-accent/60 transition-all duration-200 group-hover:shadow-glow h-full flex flex-col">
        <div
          className={cn(
            "relative w-full overflow-hidden bg-bg-elevated",
            variant === "compact" ? "aspect-[16/9]" : "aspect-[16/9]",
          )}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={tournament.coverUrl}
            alt={tournament.title}
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-bg-base via-bg-base/30 to-transparent" />
          <div className="absolute top-3 left-3 flex gap-2">
            <TournamentStatusBadge status={tournament.status} />
          </div>
          <div className="absolute top-3 right-3 flex gap-1">
            <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-1 rounded bg-bg-base/80 text-fg-secondary backdrop-blur">
              {disciplineLabel[tournament.discipline]}
            </span>
          </div>
          <div className="absolute bottom-3 left-3 right-3">
            <p className="text-[10px] font-mono uppercase tracking-widest text-fg-secondary mb-1">
              {formatLabel[tournament.format]}
            </p>
            <h3 className="font-display text-lg sm:text-xl font-semibold text-fg-primary tracking-tight leading-tight line-clamp-2 group-hover:text-accent transition-colors">
              {tournament.title}
            </h3>
          </div>
        </div>

        <div className="p-4 flex-1 flex flex-col gap-3">
          {variant === "default" && (
            <p className="text-sm text-fg-secondary line-clamp-2">{tournament.subtitle}</p>
          )}

          <div className="grid grid-cols-1 gap-2 text-xs text-fg-secondary">
            <div className="flex items-center gap-1.5">
              <Calendar className="h-3.5 w-3.5 shrink-0 text-fg-muted" />
              <span className="truncate">{formatDate(tournament.startsAt)}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <MapPin className="h-3.5 w-3.5 shrink-0 text-fg-muted" />
              <span className="truncate">{tournament.location}</span>
            </div>
          </div>

          <div className="mt-auto pt-2">
            <div className="flex items-center justify-between mb-1.5">
              <div className="flex items-center gap-1.5 text-xs text-fg-muted">
                <Users className="h-3.5 w-3.5" />
                <span>Участники</span>
              </div>
              <span className="text-xs font-medium text-fg-primary tabular">
                {tournament.seatsTaken} / {tournament.maxParticipants}
              </span>
            </div>
            <Progress
              value={tournament.seatsTaken}
              max={tournament.maxParticipants}
              variant={seatsVariant}
            />
          </div>
        </div>
      </Card>
    </Link>
  );
}
