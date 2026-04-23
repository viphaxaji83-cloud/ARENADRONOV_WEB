import Link from "next/link";
import { notFound } from "next/navigation";
import {
  Calendar,
  MapPin,
  Users,
  Trophy,
  Clock,
  Wallet,
  ChevronRight,
  Share2,
  Bookmark,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { TournamentStatusBadge } from "@/components/ui/status-badge";
import { Table, THead, TBody, TR, TH, TD } from "@/components/ui/table";
import { EmptyState } from "@/components/ui/empty";
import {
  getTournamentBySlug,
  tournaments,
  getHeatsForTournament,
} from "@/lib/data/tournaments";
import { getResultsForTournament } from "@/lib/data/results";
import { getPilotById } from "@/lib/data/pilots";
import { disciplineLabel, formatLabel, heatStatusLabel } from "@/lib/labels";
import { formatDate, formatDateTime, formatLapTime } from "@/lib/utils";

export function generateStaticParams() {
  return tournaments.map((t) => ({ slug: t.slug }));
}

export default async function TournamentPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const tournament = getTournamentBySlug(slug);
  if (!tournament) notFound();

  const heats = getHeatsForTournament(tournament.id);
  const results = getResultsForTournament(tournament.id);
  const isFinished = tournament.status === "finished";
  const canRegister = tournament.status === "registration_open";
  const seatsLeft = tournament.maxParticipants - tournament.seatsTaken;

  // Demo participants (just take pilots assigned to heats, dedupe)
  const participantIds = Array.from(new Set(heats.flatMap((h) => h.pilotIds)));
  const participants = participantIds
    .map((id) => getPilotById(id))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));

  return (
    <div>
      {/* Header */}
      <div className="relative border-b border-border-subtle">
        <div className="absolute inset-0 overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={tournament.coverUrl}
            alt=""
            className="absolute inset-0 h-full w-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-bg-base/70 via-bg-base/85 to-bg-base" />
        </div>

        <div className="container relative pt-8 pb-12 sm:pt-10 sm:pb-16">
          <nav className="flex items-center gap-1.5 text-xs text-fg-muted mb-6">
            <Link href="/" className="hover:text-fg-secondary">Главная</Link>
            <ChevronRight className="h-3 w-3" />
            <Link href="/tournaments" className="hover:text-fg-secondary">Турниры</Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-fg-secondary truncate">{tournament.title}</span>
          </nav>

          <div className="grid lg:grid-cols-12 gap-8">
            <div className="lg:col-span-8 flex flex-col gap-4">
              <div className="flex flex-wrap gap-2">
                <TournamentStatusBadge status={tournament.status} />
                <Badge>{disciplineLabel[tournament.discipline]}</Badge>
                <Badge variant="info">{formatLabel[tournament.format]}</Badge>
              </div>

              <h1 className="text-3xl sm:text-5xl font-bold tracking-tight leading-tight">
                {tournament.title}
              </h1>

              <p className="text-lg text-fg-secondary">{tournament.subtitle}</p>

              <div className="flex flex-wrap gap-x-6 gap-y-3 mt-2 text-sm">
                <div className="flex items-center gap-2 text-fg-secondary">
                  <Calendar className="h-4 w-4 text-fg-muted" />
                  <span>{formatDate(tournament.startsAt)}</span>
                </div>
                <div className="flex items-center gap-2 text-fg-secondary">
                  <MapPin className="h-4 w-4 text-fg-muted" />
                  <span>{tournament.location}</span>
                </div>
                <div className="flex items-center gap-2 text-fg-secondary">
                  <Trophy className="h-4 w-4 text-fg-muted" />
                  <span>{tournament.organizerName}</span>
                </div>
              </div>
            </div>

            {/* Side panel */}
            <div className="lg:col-span-4">
              <Card className="p-5 lg:sticky lg:top-20">
                <div className="space-y-4">
                  <div>
                    <p className="text-xs uppercase tracking-wider text-fg-muted mb-1">
                      Регистрация до
                    </p>
                    <p className="text-base font-semibold text-fg-primary">
                      {formatDate(tournament.registrationClosesAt)}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-3 pt-3 border-t border-border-subtle">
                    <div>
                      <p className="text-xs text-fg-muted mb-1">Призовой фонд</p>
                      <p className="text-sm font-semibold text-fg-primary">
                        {tournament.prizePool ?? "—"}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-fg-muted mb-1">Взнос</p>
                      <p className="text-sm font-semibold text-fg-primary">
                        {tournament.entryFee ?? "—"}
                      </p>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-border-subtle">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs text-fg-muted">Места</span>
                      <span className="text-sm font-semibold text-fg-primary tabular">
                        {tournament.seatsTaken} / {tournament.maxParticipants}
                      </span>
                    </div>
                    <Progress
                      value={tournament.seatsTaken}
                      max={tournament.maxParticipants}
                    />
                    {canRegister && (
                      <p className="text-xs text-fg-muted mt-2">
                        Осталось {seatsLeft} мест
                      </p>
                    )}
                  </div>

                  <div className="pt-2 flex flex-col gap-2">
                    {canRegister ? (
                      <Link href={`/tournaments/${tournament.slug}/register`}>
                        <Button className="w-full" size="lg">
                          Подать заявку
                        </Button>
                      </Link>
                    ) : isFinished ? (
                      <Button variant="secondary" className="w-full" size="lg" disabled>
                        Турнир завершён
                      </Button>
                    ) : (
                      <Button variant="secondary" className="w-full" size="lg" disabled>
                        Регистрация закрыта
                      </Button>
                    )}
                    <div className="grid grid-cols-2 gap-2">
                      <Button variant="outline" size="sm">
                        <Bookmark className="h-3.5 w-3.5" />
                        В закладки
                      </Button>
                      <Button variant="outline" size="sm">
                        <Share2 className="h-3.5 w-3.5" />
                        Поделиться
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs section */}
      <div className="container py-10 sm:py-12">
        <div className="grid lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8 space-y-10">
            {/* Overview */}
            <section>
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                О турнире
              </h2>
              <Card className="p-5 sm:p-6">
                <p className="text-fg-secondary leading-relaxed">{tournament.description}</p>
              </Card>
            </section>

            {/* Schedule */}
            <section>
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                Расписание
              </h2>
              {heats.length > 0 ? (
                <Card className="overflow-hidden">
                  <ul className="divide-y divide-border-subtle">
                    {heats.map((heat) => (
                      <li
                        key={heat.id}
                        className="flex items-center gap-4 p-4 hover:bg-bg-elevated/40 transition-colors"
                      >
                        <div className="h-10 w-10 rounded-md bg-bg-elevated border border-border-subtle flex items-center justify-center font-bold text-sm tabular shrink-0">
                          R{heat.round}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-fg-primary truncate">{heat.label}</p>
                          <p className="text-xs text-fg-muted mt-0.5 flex items-center gap-1.5">
                            <Clock className="h-3 w-3" />
                            {formatDateTime(heat.scheduledAt)}
                          </p>
                        </div>
                        <div className="text-right text-xs">
                          <p className="text-fg-muted mb-0.5">Пилоты</p>
                          <p className="font-medium text-fg-primary tabular">
                            {heat.pilotIds.length || "—"}
                          </p>
                        </div>
                        <Badge variant="neutral">{heatStatusLabel[heat.status]}</Badge>
                      </li>
                    ))}
                  </ul>
                </Card>
              ) : (
                <EmptyState
                  icon={<Clock className="h-6 w-6" />}
                  title="Расписание пока не опубликовано"
                  description="Организатор опубликует заезды ближе к дате турнира."
                />
              )}
            </section>

            {/* Results */}
            {isFinished && results.length > 0 && (
              <section>
                <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                  Результаты
                </h2>
                <Card className="overflow-hidden">
                  <Table>
                    <THead>
                      <TR>
                        <TH className="w-14">#</TH>
                        <TH>Пилот</TH>
                        <TH className="text-right">Лучший круг</TH>
                        <TH className="text-right">Общее время</TH>
                        <TH className="text-right pr-5">Очки</TH>
                      </TR>
                    </THead>
                    <TBody>
                      {results.map((r) => {
                        const pilot = getPilotById(r.pilotId)!;
                        const medalColor =
                          r.placement === 1
                            ? "bg-yellow-500/15 text-yellow-400 border-yellow-500/30"
                            : r.placement === 2
                              ? "bg-zinc-300/15 text-zinc-200 border-zinc-400/30"
                              : r.placement === 3
                                ? "bg-orange-600/15 text-orange-400 border-orange-600/30"
                                : "bg-bg-elevated text-fg-secondary border-border-subtle";
                        return (
                          <TR key={r.id}>
                            <TD>
                              <div
                                className={`h-7 w-7 rounded-md border flex items-center justify-center text-xs font-bold ${medalColor}`}
                              >
                                {r.placement}
                              </div>
                            </TD>
                            <TD>
                              <Link
                                href={`/pilots/${pilot.handle}`}
                                className="flex items-center gap-3 hover:text-accent"
                              >
                                <Avatar src={pilot.avatarUrl} name={pilot.displayName} size="sm" />
                                <div>
                                  <p className="font-medium">{pilot.displayName}</p>
                                  <p className="text-xs text-fg-muted">@{pilot.handle}</p>
                                </div>
                              </Link>
                            </TD>
                            <TD className="text-right font-mono text-fg-primary">
                              {formatLapTime(r.bestLapMs)}
                            </TD>
                            <TD className="text-right font-mono text-fg-secondary">
                              {formatLapTime(r.totalTimeMs)}
                            </TD>
                            <TD className="text-right pr-5 font-bold text-accent">
                              +{r.points}
                            </TD>
                          </TR>
                        );
                      })}
                    </TBody>
                  </Table>
                </Card>
              </section>
            )}

            {/* Rules */}
            <section>
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                Правила
              </h2>
              <Card className="p-5 sm:p-6">
                <p className="text-fg-secondary leading-relaxed">{tournament.rules}</p>
              </Card>
            </section>
          </div>

          {/* Side: participants */}
          <div className="lg:col-span-4">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Users className="h-4 w-4 text-accent" />
              Участники
              <span className="text-fg-muted text-base ml-1">· {participants.length}</span>
            </h2>
            {participants.length > 0 ? (
              <Card className="p-3">
                <ul className="space-y-1">
                  {participants.map((pilot) => (
                    <li key={pilot.id}>
                      <Link
                        href={`/pilots/${pilot.handle}`}
                        className="flex items-center gap-3 p-2 rounded-md hover:bg-bg-elevated transition-colors"
                      >
                        <Avatar src={pilot.avatarUrl} name={pilot.displayName} size="sm" />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-fg-primary truncate">
                            {pilot.displayName}
                          </p>
                          <p className="text-xs text-fg-muted truncate">
                            @{pilot.handle} · {pilot.city}
                          </p>
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              </Card>
            ) : (
              <EmptyState
                icon={<Users className="h-6 w-6" />}
                title="Пока нет подтверждённых участников"
                description="Список появится после первых одобренных заявок."
              />
            )}

            <Card className="p-5 mt-6">
              <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
                <Wallet className="h-4 w-4 text-accent" />
                Организатор
              </h3>
              <p className="text-sm text-fg-primary font-medium">{tournament.organizerName}</p>
              <p className="text-xs text-fg-muted mt-1">Связаться через платформу</p>
            </Card>
          </div>
        </div>
      </div>

      {/* Sticky bottom CTA on mobile */}
      {canRegister && (
        <div className="lg:hidden fixed bottom-0 inset-x-0 z-30 border-t border-border-subtle bg-bg-base/95 backdrop-blur-lg p-4 safe-pb">
          <div className="flex items-center justify-between gap-3">
            <div className="text-xs">
              <p className="text-fg-muted">Осталось мест</p>
              <p className="font-bold text-fg-primary tabular text-lg">
                {seatsLeft} <span className="text-fg-muted text-sm font-normal">из {tournament.maxParticipants}</span>
              </p>
            </div>
            <Link href={`/tournaments/${tournament.slug}/register`} className="flex-1 max-w-xs">
              <Button className="w-full" size="lg">
                Подать заявку
              </Button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
