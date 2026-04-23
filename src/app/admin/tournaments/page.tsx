import Link from "next/link";
import { Plus, MoreHorizontal, Filter } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, THead, TBody, TR, TH, TD } from "@/components/ui/table";
import { TournamentStatusBadge } from "@/components/ui/status-badge";
import { Progress } from "@/components/ui/progress";
import { tournaments } from "@/lib/data/tournaments";
import { disciplineLabel, formatLabel } from "@/lib/labels";
import { formatDate } from "@/lib/utils";

export const metadata = { title: "Турниры" };

export default function AdminTournamentsPage() {
  return (
    <div className="space-y-6">
      <header className="flex items-end justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Турниры</h1>
          <p className="text-fg-secondary mt-1">CRUD, жизненный цикл и модерация заявок</p>
        </div>
        <Link href="/admin/tournaments/new">
          <Button>
            <Plus className="h-4 w-4" />
            Создать турнир
          </Button>
        </Link>
      </header>

      <div className="flex items-center gap-2 flex-wrap">
        <Button variant="secondary" size="sm">
          <Filter className="h-3.5 w-3.5" />
          Фильтр
        </Button>
        {["Все", "Черновики", "Активные", "Завершённые"].map((label, i) => (
          <button
            key={label}
            className={`h-8 px-3 rounded-md border text-xs font-medium transition-colors ${
              i === 0
                ? "bg-bg-elevated border-border-strong text-fg-primary"
                : "border-border-subtle text-fg-secondary hover:text-fg-primary"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      <Card className="overflow-hidden">
        <Table>
          <THead>
            <TR>
              <TH>Турнир</TH>
              <TH>Дата</TH>
              <TH>Формат</TH>
              <TH>Места</TH>
              <TH>Статус</TH>
              <TH className="w-12 pr-5"></TH>
            </TR>
          </THead>
          <TBody>
            {tournaments.map((t) => (
              <TR key={t.id}>
                <TD>
                  <Link href={`/admin/tournaments/${t.id}`} className="flex items-center gap-3 hover:text-accent">
                    <div className="h-10 w-14 rounded-md bg-bg-elevated overflow-hidden shrink-0">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={t.coverUrl} alt="" className="h-full w-full object-cover" />
                    </div>
                    <div>
                      <p className="font-medium">{t.title}</p>
                      <p className="text-xs text-fg-muted">{t.location.split(",")[0]} · {disciplineLabel[t.discipline]}</p>
                    </div>
                  </Link>
                </TD>
                <TD className="text-fg-secondary text-xs">{formatDate(t.startsAt)}</TD>
                <TD className="text-xs text-fg-secondary">{formatLabel[t.format]}</TD>
                <TD className="min-w-[140px]">
                  <div className="flex items-center gap-2">
                    <Progress
                      value={t.seatsTaken}
                      max={t.maxParticipants}
                      className="w-16"
                    />
                    <span className="text-xs tabular text-fg-secondary">
                      {t.seatsTaken}/{t.maxParticipants}
                    </span>
                  </div>
                </TD>
                <TD><TournamentStatusBadge status={t.status} /></TD>
                <TD className="pr-5 text-right">
                  <button className="h-8 w-8 inline-flex items-center justify-center rounded-md text-fg-muted hover:text-fg-primary hover:bg-bg-elevated">
                    <MoreHorizontal className="h-4 w-4" />
                  </button>
                </TD>
              </TR>
            ))}
          </TBody>
        </Table>
      </Card>
    </div>
  );
}
