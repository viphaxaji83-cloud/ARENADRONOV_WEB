import Link from "next/link";
import {
  Trophy,
  ClipboardCheck,
  Users,
  Plus,
  AlertCircle,
  ArrowRight,
  TrendingUp,
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar } from "@/components/ui/avatar";
import { StatCard } from "@/components/ui/stat";
import { TournamentStatusBadge, RegistrationStatusBadge } from "@/components/ui/status-badge";
import { tournaments } from "@/lib/data/tournaments";
import { registrations } from "@/lib/data/results";
import { pilots, getPilotById } from "@/lib/data/pilots";
import { getTournamentById } from "@/lib/data/tournaments";
import { formatDate, formatRelative } from "@/lib/utils";

export default function AdminDashboardPage() {
  const active = tournaments.filter((t) =>
    ["registration_open", "registration_closed", "ongoing", "published"].includes(t.status),
  ).length;
  const pending = registrations.filter((r) => r.status === "pending").length;

  const recentRegs = [...registrations]
    .sort((a, b) => new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime())
    .slice(0, 5);

  const needsAttention = tournaments.filter(
    (t) =>
      t.status === "ongoing" ||
      (t.status === "registration_open" &&
        new Date(t.registrationClosesAt).getTime() - Date.now() < 1000 * 60 * 60 * 24 * 14),
  );

  return (
    <div className="space-y-8">
      <header className="flex items-end justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Сводка</h1>
          <p className="text-fg-secondary mt-1">Состояние платформы и быстрые действия</p>
        </div>
        <Link href="/admin/tournaments/new">
          <Button size="sm">
            <Plus className="h-3.5 w-3.5" />
            Новый турнир
          </Button>
        </Link>
      </header>

      {/* KPIs */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
        <StatCard
          label="Активные турниры"
          value={active}
          hint={`из ${tournaments.length} всего`}
          icon={<Trophy className="h-4 w-4" />}
        />
        <StatCard
          label="Ждут модерации"
          value={pending}
          hint="заявок"
          icon={<ClipboardCheck className="h-4 w-4" />}
        />
        <StatCard
          label="Пилоты"
          value={pilots.length}
          hint="в активном составе"
          icon={<Users className="h-4 w-4" />}
        />
      </section>

      {/* Needs attention + recent registrations */}
      <div className="grid lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader className="flex-row items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2 text-lg">
                <AlertCircle className="h-4 w-4 text-warning" />
                Требует внимания
              </CardTitle>
            </div>
            <Link
              href="/admin/tournaments"
              className="text-xs text-fg-secondary hover:text-accent flex items-center gap-1"
            >
              Все турниры <ArrowRight className="h-3 w-3" />
            </Link>
          </CardHeader>
          <CardContent className="pt-0">
            <ul className="divide-y divide-border-subtle -mx-5 sm:-mx-6">
              {needsAttention.map((t) => (
                <li key={t.id}>
                  <Link
                    href={`/admin/tournaments/${t.id}`}
                    className="flex items-center gap-4 px-5 sm:px-6 py-3 hover:bg-bg-elevated/40"
                  >
                    <div className="h-10 w-10 rounded-md bg-bg-elevated overflow-hidden shrink-0">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={t.coverUrl} alt="" className="h-full w-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-fg-primary truncate">{t.title}</p>
                      <p className="text-xs text-fg-muted">
                        Регистрация до {formatDate(t.registrationClosesAt)} · {t.seatsTaken}/{t.maxParticipants}
                      </p>
                    </div>
                    <TournamentStatusBadge status={t.status} />
                  </Link>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <TrendingUp className="h-4 w-4 text-accent" />
              Активность
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0 space-y-4">
            <div>
              <div className="flex items-baseline justify-between">
                <p className="text-xs text-fg-muted">Заявки за неделю</p>
                <Badge variant="success" size="sm" dot>+12%</Badge>
              </div>
              <p className="text-3xl font-bold tabular mt-1">{registrations.length}</p>
            </div>
            <div className="h-px bg-border-subtle" />
            <div>
              <p className="text-xs text-fg-muted">Новых пользователей</p>
              <p className="text-3xl font-bold tabular mt-1">+4</p>
              <p className="text-xs text-fg-muted mt-0.5">за последние 7 дней</p>
            </div>
            <div className="h-px bg-border-subtle" />
            <div>
              <p className="text-xs text-fg-muted">Заполненность</p>
              <p className="text-3xl font-bold tabular mt-1">68%</p>
              <p className="text-xs text-fg-muted mt-0.5">средняя по активным турнирам</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent registrations */}
      <Card>
        <CardHeader className="flex-row items-center justify-between">
          <CardTitle className="text-lg">Последние заявки</CardTitle>
          <Link
            href="/admin/registrations"
            className="text-xs text-fg-secondary hover:text-accent flex items-center gap-1"
          >
            Все заявки <ArrowRight className="h-3 w-3" />
          </Link>
        </CardHeader>
        <CardContent className="pt-0">
          <ul className="divide-y divide-border-subtle -mx-5 sm:-mx-6">
            {recentRegs.map((reg) => {
              const pilot = getPilotById(reg.pilotId)!;
              const t = getTournamentById(reg.tournamentId)!;
              return (
                <li
                  key={reg.id}
                  className="flex items-center gap-3 px-5 sm:px-6 py-3"
                >
                  <Avatar src={pilot.avatarUrl} name={pilot.displayName} size="sm" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-fg-primary truncate">
                      {pilot.displayName}
                    </p>
                    <p className="text-xs text-fg-muted truncate">{t.title}</p>
                  </div>
                  <span className="text-xs text-fg-muted whitespace-nowrap hidden sm:inline">
                    {formatRelative(reg.submittedAt)}
                  </span>
                  <RegistrationStatusBadge status={reg.status} />
                </li>
              );
            })}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
