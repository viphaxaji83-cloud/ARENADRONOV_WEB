import Link from "next/link";
import { TrendingUp, TrendingDown, Minus, Trophy, Medal, Award } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Table, THead, TBody, TR, TH, TD } from "@/components/ui/table";
import { ranking } from "@/lib/data/results";
import { getPilotById } from "@/lib/data/pilots";
import { seasons } from "@/lib/data/tournaments";

export const metadata = { title: "Рейтинг сезона" };

export default function LeaderboardPage() {
  const podium = ranking.slice(0, 3);
  const rest = ranking.slice(3);
  const activeSeason = seasons.find((s) => s.isActive)!;

  return (
    <div className="container py-10 sm:py-14">
      <div className="mb-10 flex flex-col gap-3">
        <p className="text-xs uppercase tracking-widest text-accent font-semibold">Рейтинг</p>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">{activeSeason.title}</h1>
        <p className="text-fg-secondary max-w-2xl">
          Очки начисляются за места в каждом турнире сезона. Топ-3 по итогам года получают
          титулы лиги.
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2 mb-8">
        {seasons.map((s) => (
          <button
            key={s.id}
            className={`h-9 px-4 rounded-md border text-sm font-medium transition-colors ${
              s.isActive
                ? "bg-accent text-accent-fg border-accent"
                : "border-border-subtle text-fg-secondary hover:text-fg-primary hover:border-border-strong"
            }`}
          >
            {s.title}
          </button>
        ))}
        <div className="ml-auto flex gap-2">
          {["Все классы", "Класс 5\"", "Cinewhoop", "Tinywhoop"].map((label, i) => (
            <button
              key={label}
              className={`h-9 px-4 rounded-md border text-sm font-medium transition-colors ${
                i === 0
                  ? "bg-bg-elevated border-border-strong text-fg-primary"
                  : "border-border-subtle text-fg-secondary hover:text-fg-primary hover:border-border-strong"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Podium */}
      <div className="grid sm:grid-cols-3 gap-4 mb-10">
        {podium.map((entry, i) => {
          const pilot = getPilotById(entry.pilotId)!;
          const podiumStyles = [
            { bg: "from-yellow-500/20 to-yellow-500/5", border: "border-yellow-500/30", text: "text-yellow-400", icon: Trophy },
            { bg: "from-zinc-300/20 to-zinc-300/5", border: "border-zinc-400/30", text: "text-zinc-200", icon: Medal },
            { bg: "from-orange-600/20 to-orange-600/5", border: "border-orange-600/30", text: "text-orange-400", icon: Award },
          ][i];
          const Icon = podiumStyles.icon;
          return (
            <Link key={entry.pilotId} href={`/pilots/${pilot.handle}`} className="group block">
              <Card
                className={`relative p-6 overflow-hidden bg-gradient-to-b ${podiumStyles.bg} ${podiumStyles.border} hover:border-accent transition-all`}
              >
                <Icon className={`absolute top-4 right-4 h-7 w-7 opacity-50 ${podiumStyles.text}`} />
                <div className={`text-6xl font-black ${podiumStyles.text} mb-2`}>#{entry.rank}</div>
                <div className="flex items-center gap-3 mt-4">
                  <Avatar src={pilot.avatarUrl} name={pilot.displayName} size="lg" />
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-fg-primary truncate group-hover:text-accent transition-colors">
                      {pilot.displayName}
                    </p>
                    <p className="text-xs text-fg-muted truncate">
                      @{pilot.handle} · {pilot.city}
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-2 mt-5 pt-5 border-t border-border-subtle text-center">
                  <div>
                    <p className="text-2xl font-bold text-fg-primary tabular">{entry.points}</p>
                    <p className="text-[10px] uppercase tracking-wider text-fg-muted">очков</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-fg-primary tabular">{entry.wins}</p>
                    <p className="text-[10px] uppercase tracking-wider text-fg-muted">побед</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-fg-primary tabular">{entry.podiums}</p>
                    <p className="text-[10px] uppercase tracking-wider text-fg-muted">подиумов</p>
                  </div>
                </div>
              </Card>
            </Link>
          );
        })}
      </div>

      {/* Rest of table — desktop */}
      <Card className="overflow-hidden hidden md:block">
        <Table>
          <THead>
            <TR>
              <TH className="w-16">#</TH>
              <TH>Пилот</TH>
              <TH className="text-right">Очки</TH>
              <TH className="text-right">Турниры</TH>
              <TH className="text-right">Победы</TH>
              <TH className="text-right">Подиумы</TH>
              <TH className="text-right pr-5">Тренд</TH>
            </TR>
          </THead>
          <TBody>
            {rest.map((entry) => {
              const pilot = getPilotById(entry.pilotId)!;
              return (
                <TR key={entry.pilotId}>
                  <TD className="font-bold text-fg-secondary">{entry.rank}</TD>
                  <TD>
                    <Link href={`/pilots/${pilot.handle}`} className="flex items-center gap-3 hover:text-accent">
                      <Avatar src={pilot.avatarUrl} name={pilot.displayName} size="sm" />
                      <div>
                        <p className="font-medium">{pilot.displayName}</p>
                        <p className="text-xs text-fg-muted">@{pilot.handle} · {pilot.teamName ?? "Solo"}</p>
                      </div>
                    </Link>
                  </TD>
                  <TD className="text-right font-bold text-fg-primary">{entry.points}</TD>
                  <TD className="text-right text-fg-secondary">{entry.tournamentsPlayed}</TD>
                  <TD className="text-right text-fg-secondary">{entry.wins}</TD>
                  <TD className="text-right text-fg-secondary">{entry.podiums}</TD>
                  <TD className="text-right pr-5">
                    <TrendCell trend={entry.trend} />
                  </TD>
                </TR>
              );
            })}
          </TBody>
        </Table>
      </Card>

      {/* Card list — mobile */}
      <div className="md:hidden space-y-3">
        {rest.map((entry) => {
          const pilot = getPilotById(entry.pilotId)!;
          return (
            <Link key={entry.pilotId} href={`/pilots/${pilot.handle}`}>
              <Card className="p-4 flex items-center gap-3 hover:border-accent/40">
                <div className="text-2xl font-bold text-fg-secondary tabular w-10 text-center shrink-0">
                  {entry.rank}
                </div>
                <Avatar src={pilot.avatarUrl} name={pilot.displayName} size="md" />
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-fg-primary truncate text-sm">
                    {pilot.displayName}
                  </p>
                  <div className="flex items-center gap-3 text-xs text-fg-muted mt-1">
                    <span>{entry.tournamentsPlayed} турн.</span>
                    <span>{entry.wins} поб.</span>
                    <span>{entry.podiums} под.</span>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-base font-bold text-fg-primary tabular">{entry.points}</p>
                  <TrendCell trend={entry.trend} compact />
                </div>
              </Card>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

function TrendCell({ trend, compact }: { trend: number; compact?: boolean }) {
  if (trend > 0) {
    return (
      <div className={`inline-flex items-center gap-1 text-success ${compact ? "text-[10px]" : "text-xs"}`}>
        <TrendingUp className={compact ? "h-2.5 w-2.5" : "h-3.5 w-3.5"} />
        <span className="font-medium">+{trend}</span>
      </div>
    );
  }
  if (trend < 0) {
    return (
      <div className={`inline-flex items-center gap-1 text-danger ${compact ? "text-[10px]" : "text-xs"}`}>
        <TrendingDown className={compact ? "h-2.5 w-2.5" : "h-3.5 w-3.5"} />
        <span className="font-medium">{trend}</span>
      </div>
    );
  }
  return (
    <div className={`inline-flex items-center gap-1 text-fg-muted ${compact ? "text-[10px]" : "text-xs"}`}>
      <Minus className={compact ? "h-2.5 w-2.5" : "h-3.5 w-3.5"} />
      <span>0</span>
    </div>
  );
}
