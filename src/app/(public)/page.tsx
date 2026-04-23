import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar } from "@/components/ui/avatar";
import { SectionHeading } from "@/components/ui/section-heading";
import { TournamentCard } from "@/components/tournament/tournament-card";
import { TournamentStatusBadge } from "@/components/ui/status-badge";
import { tournaments } from "@/lib/data/tournaments";
import { ranking } from "@/lib/data/results";
import { getPilotById } from "@/lib/data/pilots";
import { formatDate, formatLapTime } from "@/lib/utils";
import { disciplineLabel } from "@/lib/labels";

export default function HomePage() {
  const upcoming = tournaments
    .filter((t) => ["registration_open", "registration_closed", "published"].includes(t.status))
    .slice(0, 3);
  const topRanking = ranking.slice(0, 5);
  const recentTournament = tournaments.find((t) => t.status === "finished");

  return (
    <div>
      {/* Upcoming tournaments */}
      <section className="container py-16 sm:py-20">
        <SectionHeading
          eyebrow="Ближайшие этапы"
          title="Турниры сезона"
          description="Регистрация, расписание и состав участников"
          href="/tournaments"
        />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {upcoming.map((t) => (
            <TournamentCard key={t.id} tournament={t} />
          ))}
        </div>
      </section>

      {/* Leaderboard */}
      <section className="container py-16 sm:py-20 border-t border-border-subtle">
        <SectionHeading
          eyebrow="Сезон 2026"
          title="Топ пилотов"
          description="Рейтинг по сумме очков сезона"
          href="/leaderboard"
        />
        <Card className="overflow-hidden">
          <ul className="divide-y divide-border-subtle">
            {topRanking.map((entry, i) => {
              const pilot = getPilotById(entry.pilotId)!;
              const medalColor =
                i === 0
                  ? "bg-yellow-500/15 text-yellow-400 border-yellow-500/30"
                  : i === 1
                    ? "bg-zinc-300/15 text-zinc-200 border-zinc-400/30"
                    : i === 2
                      ? "bg-orange-600/15 text-orange-400 border-orange-600/30"
                      : "bg-bg-elevated text-fg-secondary border-border-subtle";
              return (
                <li key={entry.pilotId}>
                  <Link
                    href={`/pilots/${pilot.handle}`}
                    className="flex items-center gap-4 px-4 sm:px-5 py-3.5 hover:bg-bg-elevated/50 transition-colors"
                  >
                    <div
                      className={`h-9 w-9 rounded-md border flex items-center justify-center text-sm font-bold tabular ${medalColor}`}
                    >
                      {entry.rank}
                    </div>
                    <Avatar src={pilot.avatarUrl} name={pilot.displayName} size="md" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-fg-primary truncate">
                        {pilot.displayName}
                      </p>
                      <p className="text-xs text-fg-muted truncate">
                        @{pilot.handle} · {pilot.teamName ?? "Solo"}
                      </p>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-base font-bold text-fg-primary tabular">
                        {entry.points}
                      </p>
                      <p className="text-[10px] uppercase tracking-wider text-fg-muted">очков</p>
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>
        </Card>
      </section>

      {/* Recent results banner */}
      {recentTournament && (
        <section className="container pb-16 sm:pb-24">
          <Card className="overflow-hidden border-accent2/30 shadow-glow-magenta">
            <div className="grid lg:grid-cols-2">
              <div className="p-6 sm:p-8 flex flex-col justify-center gap-4">
                <Badge variant="accent" dot className="self-start">
                  Свежие результаты
                </Badge>
                <h3 className="font-display text-3xl sm:text-4xl font-bold tracking-tight uppercase">
                  {recentTournament.title}
                </h3>
                <p className="text-fg-secondary">
                  {recentTournament.subtitle}. Турнир завершён —{" "}
                  смотрите итоговую таблицу и лучшие круги.
                </p>
                <div className="flex flex-wrap gap-2 mt-2">
                  <TournamentStatusBadge status={recentTournament.status} />
                  <Badge>
                    <MapPin className="h-3 w-3 mr-0.5" />
                    {recentTournament.location.split(",")[0]}
                  </Badge>
                  <Badge>{disciplineLabel[recentTournament.discipline]}</Badge>
                </div>
                <div>
                  <Link href={`/tournaments/${recentTournament.slug}`}>
                    <Button>
                      Смотреть результаты
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="bg-bg-elevated/50 p-6 sm:p-8 grid grid-cols-3 gap-3">
                {[
                  { rank: 1, pilotId: "p4", time: 142500 },
                  { rank: 2, pilotId: "p1", time: 142680 },
                  { rank: 3, pilotId: "p3", time: 144100 },
                ].map((r) => {
                  const pilot = getPilotById(r.pilotId)!;
                  const colors = ["text-yellow-400", "text-zinc-300", "text-orange-400"];
                  return (
                    <div
                      key={r.rank}
                      className="flex flex-col items-center text-center gap-2 p-3 rounded-md bg-bg-surface border border-border-subtle"
                    >
                      <div className={`text-3xl font-bold ${colors[r.rank - 1]}`}>{r.rank}</div>
                      <Avatar src={pilot.avatarUrl} name={pilot.displayName} size="md" />
                      <p className="text-xs font-medium text-fg-primary truncate max-w-full">
                        @{pilot.handle}
                      </p>
                      <p className="text-[10px] font-mono text-fg-muted tabular">
                        {formatLapTime(r.time)}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </Card>
        </section>
      )}
    </div>
  );
}
