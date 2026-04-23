import Link from "next/link";
import { Check, X, Clock, Filter } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";
import { Table, THead, TBody, TR, TH, TD } from "@/components/ui/table";
import { RegistrationStatusBadge } from "@/components/ui/status-badge";
import { registrations } from "@/lib/data/results";
import { pilots, getPilotById } from "@/lib/data/pilots";
import { getTournamentById, tournaments } from "@/lib/data/tournaments";
import { formatDate, formatRelative } from "@/lib/utils";

export const metadata = { title: "Заявки" };

export default function AdminRegistrationsPage() {
  // Build a richer cross-tournament list by adding mock pending registrations
  const real = registrations;
  const synthetic = pilots.slice(0, 5).flatMap((p, i) =>
    tournaments
      .filter((t) => t.status === "registration_open")
      .slice(0, 2)
      .map((t, j) => ({
        id: `sy-${p.id}-${t.id}`,
        tournamentId: t.id,
        pilotId: p.id,
        status: ((i + j) % 4 === 0
          ? "pending"
          : (i + j) % 4 === 1
            ? "approved"
            : (i + j) % 4 === 2
              ? "waitlist"
              : "rejected") as "pending" | "approved" | "waitlist" | "rejected",
        submittedAt: new Date(Date.now() - (i * 2 + j) * 86400000).toISOString(),
      })),
  );

  const all = [...real, ...synthetic];
  const pending = all.filter((r) => r.status === "pending");

  return (
    <div className="space-y-6">
      <header className="flex items-end justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Заявки</h1>
          <p className="text-fg-secondary mt-1">
            Очередь модерации: {pending.length} ждут решения из {all.length} всего
          </p>
        </div>
        <Button variant="secondary" size="sm">
          <Filter className="h-3.5 w-3.5" />
          Фильтр
        </Button>
      </header>

      {/* Status pills */}
      <div className="flex gap-2 flex-wrap">
        {[
          { label: "Все", count: all.length, active: true },
          { label: "Ждут", count: pending.length, active: false },
          { label: "Подтверждены", count: all.filter((r) => r.status === "approved").length, active: false },
          { label: "Лист ожидания", count: all.filter((r) => r.status === "waitlist").length, active: false },
          { label: "Отклонены", count: all.filter((r) => r.status === "rejected").length, active: false },
        ].map((tab) => (
          <button
            key={tab.label}
            className={`h-9 px-3 inline-flex items-center gap-1.5 rounded-md border text-sm font-medium transition-colors ${
              tab.active
                ? "bg-bg-elevated border-border-strong text-fg-primary"
                : "border-border-subtle text-fg-secondary hover:text-fg-primary"
            }`}
          >
            {tab.label}
            <span className={`text-xs tabular ${tab.active ? "text-fg-muted" : "text-fg-muted"}`}>
              {tab.count}
            </span>
          </button>
        ))}
      </div>

      <Card className="overflow-hidden">
        <Table>
          <THead>
            <TR>
              <TH>Пилот</TH>
              <TH>Турнир</TH>
              <TH>Подана</TH>
              <TH>Статус</TH>
              <TH className="text-right pr-5">Действия</TH>
            </TR>
          </THead>
          <TBody>
            {all.map((reg) => {
              const pilot = getPilotById(reg.pilotId)!;
              const t = getTournamentById(reg.tournamentId)!;
              return (
                <TR key={reg.id}>
                  <TD>
                    <Link href={`/pilots/${pilot.handle}`} className="flex items-center gap-3 hover:text-accent">
                      <Avatar src={pilot.avatarUrl} name={pilot.displayName} size="sm" />
                      <div>
                        <p className="text-sm font-medium">{pilot.displayName}</p>
                        <p className="text-xs text-fg-muted">@{pilot.handle}</p>
                      </div>
                    </Link>
                  </TD>
                  <TD>
                    <Link href={`/admin/tournaments/${t.id}`} className="hover:text-accent">
                      <p className="text-sm font-medium line-clamp-1">{t.title}</p>
                      <p className="text-xs text-fg-muted">{formatDate(t.startsAt, { day: "2-digit", month: "short" })}</p>
                    </Link>
                  </TD>
                  <TD className="text-xs text-fg-secondary">{formatRelative(reg.submittedAt)}</TD>
                  <TD><RegistrationStatusBadge status={reg.status} /></TD>
                  <TD className="text-right pr-5">
                    {reg.status === "pending" ? (
                      <div className="inline-flex gap-1">
                        <Button variant="ghost" size="sm" className="text-success hover:bg-success-muted">
                          <Check className="h-3.5 w-3.5" />
                        </Button>
                        <Button variant="ghost" size="sm" className="text-info hover:bg-info-muted">
                          <Clock className="h-3.5 w-3.5" />
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
      </Card>
    </div>
  );
}
