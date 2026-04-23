import Link from "next/link";
import { ArrowRight, Award, Calendar, Trophy, ClipboardList, Bell, ChevronRight, MapPin } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { StatCard } from "@/components/ui/stat";
import { RegistrationStatusBadge } from "@/components/ui/status-badge";
import { TournamentCard } from "@/components/tournament/tournament-card";
import { getPilotById } from "@/lib/data/pilots";
import { ranking, registrations, results, notifications } from "@/lib/data/results";
import { tournaments, getTournamentById } from "@/lib/data/tournaments";
import { formatDate, formatRelative, formatLapTime } from "@/lib/utils";

export default function AppDashboardPage() {
  const me = getPilotById("p7")!;
  const myRank = ranking.find((r) => r.pilotId === me.id);
  const myRegistrations = registrations.filter((r) => r.pilotId === me.id);
  const myResults = results.filter((r) => r.pilotId === me.id);
  const myUnreadNotifs = notifications.filter((n) => n.userId === me.id && !n.readAt);

  const upcomingMine = myRegistrations
    .filter((r) => r.status === "approved")
    .map((r) => getTournamentById(r.tournamentId)!)
    .filter((t) => new Date(t.startsAt) > new Date())
    .sort((a, b) => new Date(a.startsAt).getTime() - new Date(b.startsAt).getTime());

  const nextTournament = upcomingMine[0];
  const recommended = tournaments
    .filter(
      (t) =>
        t.status === "registration_open" && !myRegistrations.some((r) => r.tournamentId === t.id),
    )
    .slice(0, 3);

  return (
    <div className="space-y-8">
      {/* Greeting */}
      <header className="flex items-center justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
            Привет, <span className="text-accent">@{me.handle}</span>
          </h1>
          <p className="text-fg-secondary mt-1">
            Сводка по сезону и ваши предстоящие старты
          </p>
        </div>
        <Link href="/tournaments">
          <Button variant="secondary" size="sm">
            Найти турнир
            <ArrowRight className="h-3.5 w-3.5" />
          </Button>
        </Link>
      </header>

      {/* Next tournament card OR empty */}
      {nextTournament ? (
        <Link href={`/tournaments/${nextTournament.slug}`} className="block group">
          <Card className="overflow-hidden border-accent/30 shadow-glow hover:border-accent transition-all">
            <div className="grid md:grid-cols-2">
              <div className="relative aspect-[16/10] md:aspect-auto md:min-h-[220px] overflow-hidden bg-bg-elevated">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={nextTournament.coverUrl}
                  alt={nextTournament.title}
                  className="absolute inset-0 h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-bg-base/40 to-transparent" />
              </div>
              <div className="p-6 sm:p-7 flex flex-col justify-center gap-3">
                <Badge variant="accent" dot className="self-start">
                  Ближайший старт
                </Badge>
                <h2 className="text-xl sm:text-2xl font-bold tracking-tight">
                  {nextTournament.title}
                </h2>
                <div className="flex items-center gap-2 text-sm text-fg-secondary">
                  <Calendar className="h-3.5 w-3.5" />
                  <span>{formatDate(nextTournament.startsAt)}</span>
                  <span>·</span>
                  <MapPin className="h-3.5 w-3.5" />
                  <span>{nextTournament.location.split(",")[0]}</span>
                </div>
                <p className="text-sm text-fg-secondary mt-1">
                  Заявка <span className="text-success font-medium">подтверждена</span> ·{" "}
                  старт {formatRelative(nextTournament.startsAt)}
                </p>
              </div>
            </div>
          </Card>
        </Link>
      ) : (
        <Card className="p-6 border-dashed border-border-strong text-center">
          <p className="text-fg-secondary">У вас нет подтверждённых стартов</p>
          <Link href="/tournaments">
            <Button className="mt-4" size="sm">Найти турнир</Button>
          </Link>
        </Card>
      )}

      {/* Stats */}
      <section>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          <StatCard
            label="Позиция"
            value={myRank ? `#${myRank.rank}` : "—"}
            icon={<Award className="h-4 w-4" />}
            trend={myRank ? myRank.trend : undefined}
          />
          <StatCard
            label="Очки сезона"
            value={myRank?.points ?? 0}
            icon={<Trophy className="h-4 w-4" />}
          />
          <StatCard
            label="Турниров"
            value={myRank?.tournamentsPlayed ?? 0}
            icon={<Calendar className="h-4 w-4" />}
          />
          <StatCard
            label="Подиумов"
            value={myRank?.podiums ?? 0}
            icon={<Award className="h-4 w-4" />}
          />
        </div>
      </section>

      {/* My registrations + recent results */}
      <div className="grid lg:grid-cols-2 gap-6">
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold tracking-tight flex items-center gap-2">
              <ClipboardList className="h-4 w-4 text-accent" />
              Мои заявки
            </h2>
            <Link href="/app/registrations" className="text-xs text-fg-secondary hover:text-accent flex items-center gap-1">
              Все
              <ChevronRight className="h-3 w-3" />
            </Link>
          </div>
          <Card className="overflow-hidden">
            <ul className="divide-y divide-border-subtle">
              {myRegistrations.slice(0, 4).map((reg) => {
                const t = getTournamentById(reg.tournamentId)!;
                return (
                  <li key={reg.id}>
                    <Link
                      href={`/tournaments/${t.slug}`}
                      className="flex items-center gap-3 p-4 hover:bg-bg-elevated/40 transition-colors"
                    >
                      <div className="h-10 w-10 rounded-md bg-bg-elevated overflow-hidden shrink-0">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={t.coverUrl} alt="" className="h-full w-full object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-fg-primary truncate">{t.title}</p>
                        <p className="text-xs text-fg-muted">{formatDate(t.startsAt)}</p>
                      </div>
                      <RegistrationStatusBadge status={reg.status} />
                    </Link>
                  </li>
                );
              })}
            </ul>
          </Card>
        </section>

        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold tracking-tight flex items-center gap-2">
              <Award className="h-4 w-4 text-accent" />
              Последние результаты
            </h2>
            <Link href="/app/results" className="text-xs text-fg-secondary hover:text-accent flex items-center gap-1">
              Все
              <ChevronRight className="h-3 w-3" />
            </Link>
          </div>
          {myResults.length > 0 ? (
            <Card className="overflow-hidden">
              <ul className="divide-y divide-border-subtle">
                {myResults.map((r) => {
                  const t = getTournamentById(r.tournamentId)!;
                  return (
                    <li key={r.id} className="p-4 flex items-center gap-3">
                      <div className="h-10 w-10 rounded-md bg-bg-elevated border border-border-subtle flex items-center justify-center font-bold tabular shrink-0">
                        #{r.placement}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-fg-primary truncate">{t.title}</p>
                        <p className="text-xs text-fg-muted">
                          Лучший: <span className="font-mono">{formatLapTime(r.bestLapMs)}</span>
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-bold text-accent">+{r.points}</p>
                        <p className="text-[10px] uppercase text-fg-muted">очков</p>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </Card>
          ) : (
            <Card className="p-6 text-sm text-fg-secondary text-center">
              Пока нет завершённых турниров
            </Card>
          )}
        </section>
      </div>

      {/* Notifications */}
      {myUnreadNotifs.length > 0 && (
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold tracking-tight flex items-center gap-2">
              <Bell className="h-4 w-4 text-accent" />
              Новые уведомления
              <Badge variant="accent" size="sm">{myUnreadNotifs.length}</Badge>
            </h2>
            <Link href="/app/notifications" className="text-xs text-fg-secondary hover:text-accent flex items-center gap-1">
              Все
              <ChevronRight className="h-3 w-3" />
            </Link>
          </div>
          <Card className="overflow-hidden">
            <ul className="divide-y divide-border-subtle">
              {myUnreadNotifs.slice(0, 3).map((n) => (
                <li key={n.id} className="p-4 flex items-start gap-3">
                  <div className="h-2 w-2 rounded-full bg-accent mt-2 shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-fg-primary">{n.title}</p>
                    <p className="text-xs text-fg-secondary mt-0.5">{n.body}</p>
                  </div>
                  <p className="text-xs text-fg-muted whitespace-nowrap">
                    {formatRelative(n.createdAt)}
                  </p>
                </li>
              ))}
            </ul>
          </Card>
        </section>
      )}

      {/* Recommended */}
      {recommended.length > 0 && (
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold tracking-tight">Возможно интересно</h2>
            <Link href="/tournaments" className="text-xs text-fg-secondary hover:text-accent flex items-center gap-1">
              Все турниры
              <ChevronRight className="h-3 w-3" />
            </Link>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {recommended.map((t) => (
              <TournamentCard key={t.id} tournament={t} variant="compact" />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
