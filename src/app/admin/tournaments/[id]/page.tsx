import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight, Calendar, MapPin, Users, Trophy, Pencil, Settings as SettingsIcon, Check, X, Clock } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Table, THead, TBody, TR, TH, TD } from "@/components/ui/table";
import { TournamentStatusBadge, RegistrationStatusBadge } from "@/components/ui/status-badge";
import { Progress } from "@/components/ui/progress";
import { tournaments, getTournamentById, getHeatsForTournament } from "@/lib/data/tournaments";
import { registrations, results } from "@/lib/data/results";
import { getPilotById, pilots } from "@/lib/data/pilots";
import { disciplineLabel, formatLabel, heatStatusLabel } from "@/lib/labels";
import { formatDate, formatDateTime, formatLapTime } from "@/lib/utils";

export function generateStaticParams() {
  return tournaments.map((t) => ({ id: t.id }));
}

export default async function AdminTournamentDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const tournament = getTournamentById(id);
  if (!tournament) notFound();

  // Build admin-eye registrations: include some pending mock for demo
  const tReg = registrations.filter((r) => r.tournamentId === tournament.id);
  // Add additional fake registrations for the admin view to make it feel populated
  const extraPilotIds = pilots
    .filter((p) => !tReg.some((r) => r.pilotId === p.id))
    .slice(0, 6)
    .map((p) => p.id);

  const allRegs = [
    ...tReg,
    ...extraPilotIds.map((pid, i) => ({
      id: `mock-${pid}`,
      tournamentId: tournament.id,
      pilotId: pid,
      status: (i % 3 === 0 ? "pending" : i % 3 === 1 ? "approved" : "waitlist") as
        | "pending"
        | "approved"
        | "waitlist",
      submittedAt: new Date(Date.now() - i * 86400000).toISOString(),
    })),
  ];

  const heats = getHeatsForTournament(tournament.id);
  const tResults = results.filter((r) => r.tournamentId === tournament.id);

  return (
    <div className="space-y-6">
      <nav className="flex items-center gap-1.5 text-xs text-fg-muted">
        <Link href="/admin" className="hover:text-fg-secondary">Сводка</Link>
        <ChevronRight className="h-3 w-3" />
        <Link href="/admin/tournaments" className="hover:text-fg-secondary">Турниры</Link>
        <ChevronRight className="h-3 w-3" />
        <span className="text-fg-secondary truncate">{tournament.title}</span>
      </nav>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-start gap-5">
        <div className="aspect-[16/9] sm:aspect-auto sm:h-28 sm:w-44 rounded-lg overflow-hidden bg-bg-elevated shrink-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={tournament.coverUrl} alt="" className="h-full w-full object-cover" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap gap-2 mb-2">
            <TournamentStatusBadge status={tournament.status} />
            <Badge>{disciplineLabel[tournament.discipline]}</Badge>
            <Badge variant="info">{formatLabel[tournament.format]}</Badge>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">{tournament.title}</h1>
          <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2 text-sm text-fg-secondary">
            <span className="flex items-center gap-1.5">
              <Calendar className="h-3.5 w-3.5" />
              {formatDate(tournament.startsAt)}
            </span>
            <span className="flex items-center gap-1.5">
              <MapPin className="h-3.5 w-3.5" />
              {tournament.location}
            </span>
          </div>
        </div>
        <div className="flex gap-2 shrink-0">
          <Link href={`/tournaments/${tournament.slug}`}>
            <Button variant="secondary" size="sm">Открыть на сайте</Button>
          </Link>
          <Button size="sm">
            <Pencil className="h-3.5 w-3.5" />
            Редактировать
          </Button>
        </div>
      </div>

      {/* Tabs (visual nav, all sections render below for MVP) */}
      <div className="border-b border-border-subtle flex gap-1 -mx-4 sm:-mx-0 px-4 sm:px-0 overflow-x-auto">
        {["Обзор", "Заявки", "Расписание", "Результаты", "Правила"].map((tab, i) => (
          <button
            key={tab}
            className={`px-4 py-2.5 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
              i === 0
                ? "text-fg-primary border-accent"
                : "text-fg-secondary border-transparent hover:text-fg-primary"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Left: status controls + key data */}
        <div className="lg:col-span-2 space-y-6">
          {/* Status flow */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Жизненный цикл</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-2 text-sm">
                <span className="text-fg-secondary">Текущий статус:</span>
                <TournamentStatusBadge status={tournament.status} />
              </div>
              <div className="flex flex-wrap gap-2">
                {tournament.status === "draft" && <Button size="sm">Опубликовать</Button>}
                {tournament.status === "published" && (
                  <Button size="sm">Открыть регистрацию</Button>
                )}
                {tournament.status === "registration_open" && (
                  <>
                    <Button size="sm" variant="secondary">Закрыть регистрацию</Button>
                    <Button size="sm">Запустить турнир</Button>
                  </>
                )}
                {tournament.status === "ongoing" && <Button size="sm">Завершить</Button>}
                <Button size="sm" variant="outline">Дублировать</Button>
                {tournament.status !== "finished" && (
                  <Button size="sm" variant="ghost" className="text-danger hover:bg-danger-muted">
                    Отменить турнир
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Registrations */}
          <Card>
            <CardHeader className="flex-row items-center justify-between">
              <CardTitle className="text-base flex items-center gap-2">
                Заявки
                <span className="text-fg-muted text-sm font-normal">· {allRegs.length}</span>
              </CardTitle>
              <Button variant="secondary" size="sm">Экспорт CSV</Button>
            </CardHeader>
            <CardContent className="pt-0">
              <Table>
                <THead>
                  <TR>
                    <TH>Пилот</TH>
                    <TH>Подана</TH>
                    <TH>Статус</TH>
                    <TH className="text-right pr-5">Действия</TH>
                  </TR>
                </THead>
                <TBody>
                  {allRegs.map((reg) => {
                    const pilot = getPilotById(reg.pilotId)!;
                    return (
                      <TR key={reg.id}>
                        <TD>
                          <Link href={`/pilots/${pilot.handle}`} className="flex items-center gap-3 hover:text-accent">
                            <Avatar src={pilot.avatarUrl} name={pilot.displayName} size="sm" />
                            <div>
                              <p className="text-sm font-medium">{pilot.displayName}</p>
                              <p className="text-xs text-fg-muted">@{pilot.handle} · {pilot.city}</p>
                            </div>
                          </Link>
                        </TD>
                        <TD className="text-xs text-fg-secondary">
                          {formatDate(reg.submittedAt, { day: "2-digit", month: "short" })}
                        </TD>
                        <TD><RegistrationStatusBadge status={reg.status} /></TD>
                        <TD className="text-right pr-5">
                          {reg.status === "pending" ? (
                            <div className="inline-flex gap-1">
                              <Button variant="ghost" size="sm" className="text-success hover:bg-success-muted">
                                <Check className="h-3.5 w-3.5" />
                              </Button>
                              <Button variant="ghost" size="sm" className="text-danger hover:bg-danger-muted">
                                <X className="h-3.5 w-3.5" />
                              </Button>
                            </div>
                          ) : (
                            <Button variant="ghost" size="sm">Открыть</Button>
                          )}
                        </TD>
                      </TR>
                    );
                  })}
                </TBody>
              </Table>
            </CardContent>
          </Card>

          {/* Schedule */}
          <Card>
            <CardHeader className="flex-row items-center justify-between">
              <CardTitle className="text-base">Расписание</CardTitle>
              <Button variant="secondary" size="sm">+ Добавить заезд</Button>
            </CardHeader>
            <CardContent className="pt-0">
              <ul className="divide-y divide-border-subtle -mx-5 sm:-mx-6">
                {heats.map((heat) => (
                  <li key={heat.id} className="px-5 sm:px-6 py-3 flex items-center gap-4">
                    <div className="h-9 w-9 rounded-md bg-bg-elevated border border-border-subtle flex items-center justify-center font-bold text-xs tabular shrink-0">
                      R{heat.round}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm">{heat.label}</p>
                      <p className="text-xs text-fg-muted flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {formatDateTime(heat.scheduledAt)}
                      </p>
                    </div>
                    <Badge variant="neutral">{heatStatusLabel[heat.status]}</Badge>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Results — show for finished */}
          {tResults.length > 0 && (
            <Card>
              <CardHeader className="flex-row items-center justify-between">
                <CardTitle className="text-base">Результаты</CardTitle>
                <Button size="sm">Опубликовать обновление</Button>
              </CardHeader>
              <CardContent className="pt-0">
                <Table>
                  <THead>
                    <TR>
                      <TH>#</TH>
                      <TH>Пилот</TH>
                      <TH className="text-right">Лучший круг</TH>
                      <TH className="text-right pr-5">Очки</TH>
                    </TR>
                  </THead>
                  <TBody>
                    {tResults.map((r) => {
                      const pilot = getPilotById(r.pilotId)!;
                      return (
                        <TR key={r.id}>
                          <TD className="font-bold">{r.placement}</TD>
                          <TD>
                            <div className="flex items-center gap-2">
                              <Avatar src={pilot.avatarUrl} name={pilot.displayName} size="xs" />
                              <span className="text-sm">{pilot.displayName}</span>
                            </div>
                          </TD>
                          <TD className="text-right font-mono text-sm">{formatLapTime(r.bestLapMs)}</TD>
                          <TD className="text-right pr-5 font-bold text-accent">+{r.points}</TD>
                        </TR>
                      );
                    })}
                  </TBody>
                </Table>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Right side */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Заполненность</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-fg-secondary">Места</span>
                <span className="text-sm font-medium tabular">
                  {tournament.seatsTaken}/{tournament.maxParticipants}
                </span>
              </div>
              <Progress value={tournament.seatsTaken} max={tournament.maxParticipants} />
              <div className="grid grid-cols-3 gap-2 pt-3 border-t border-border-subtle text-center">
                <div>
                  <p className="text-lg font-bold tabular">{allRegs.filter((r) => r.status === "approved").length}</p>
                  <p className="text-[10px] uppercase text-fg-muted">Подтв.</p>
                </div>
                <div>
                  <p className="text-lg font-bold tabular text-warning">{allRegs.filter((r) => r.status === "pending").length}</p>
                  <p className="text-[10px] uppercase text-fg-muted">Ждут</p>
                </div>
                <div>
                  <p className="text-lg font-bold tabular text-info">{allRegs.filter((r) => r.status === "waitlist").length}</p>
                  <p className="text-[10px] uppercase text-fg-muted">Лист</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Финансы</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-fg-secondary">Призовой фонд</span>
                <span className="font-semibold">{tournament.prizePool ?? "—"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-fg-secondary">Взнос</span>
                <span className="font-semibold">{tournament.entryFee ?? "—"}</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <SettingsIcon className="h-4 w-4" />
                Настройки
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <button className="block w-full text-left text-fg-secondary hover:text-fg-primary py-1">
                Изменить slug
              </button>
              <button className="block w-full text-left text-fg-secondary hover:text-fg-primary py-1">
                Передать организатору
              </button>
              <button className="block w-full text-left text-danger hover:bg-danger-muted px-2 py-1 -mx-2 rounded">
                Архивировать
              </button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
