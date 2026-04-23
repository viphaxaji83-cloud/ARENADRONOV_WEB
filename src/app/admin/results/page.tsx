import Link from "next/link";
import { Upload, FileText } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";
import { Table, THead, TBody, TR, TH, TD } from "@/components/ui/table";
import { TournamentStatusBadge } from "@/components/ui/status-badge";
import { tournaments } from "@/lib/data/tournaments";
import { results } from "@/lib/data/results";
import { getPilotById } from "@/lib/data/pilots";
import { formatDate, formatLapTime } from "@/lib/utils";

export const metadata = { title: "Результаты" };

export default function AdminResultsPage() {
  const finishedT = tournaments.filter((t) => t.status === "finished");
  const ongoingT = tournaments.filter((t) =>
    ["registration_closed", "ongoing"].includes(t.status),
  );
  const lastWithResults = finishedT[0];
  const lastResults = lastWithResults
    ? results.filter((r) => r.tournamentId === lastWithResults.id)
    : [];

  return (
    <div className="space-y-6">
      <header className="flex items-end justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Результаты</h1>
          <p className="text-fg-secondary mt-1">Ввод и публикация итогов турниров</p>
        </div>
      </header>

      {/* Pending publication */}
      {ongoingT.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Ожидают результатов</CardTitle>
            <CardDescription>Турниры, которые завершились или идут — нужны итоги</CardDescription>
          </CardHeader>
          <CardContent className="pt-0">
            <ul className="divide-y divide-border-subtle -mx-5 sm:-mx-6">
              {ongoingT.map((t) => (
                <li key={t.id} className="px-5 sm:px-6 py-3 flex items-center gap-4">
                  <div className="h-10 w-14 rounded-md bg-bg-elevated overflow-hidden shrink-0">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={t.coverUrl} alt="" className="h-full w-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm">{t.title}</p>
                    <p className="text-xs text-fg-muted">{formatDate(t.startsAt)}</p>
                  </div>
                  <TournamentStatusBadge status={t.status} />
                  <div className="flex gap-2">
                    <Button variant="secondary" size="sm">
                      <Upload className="h-3.5 w-3.5" />
                      CSV
                    </Button>
                    <Link href={`/admin/tournaments/${t.id}`}>
                      <Button size="sm">Ввести</Button>
                    </Link>
                  </div>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}

      {/* Recent published */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Последние опубликованные</CardTitle>
        </CardHeader>
        <CardContent className="pt-0 space-y-2">
          {finishedT.map((t) => (
            <Link
              key={t.id}
              href={`/admin/tournaments/${t.id}`}
              className="flex items-center gap-4 p-3 -mx-3 rounded-md hover:bg-bg-elevated/50 transition-colors"
            >
              <FileText className="h-4 w-4 text-fg-muted shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium">{t.title}</p>
                <p className="text-xs text-fg-muted">
                  Опубликовано {formatDate(t.endsAt)}
                </p>
              </div>
              <TournamentStatusBadge status={t.status} />
            </Link>
          ))}
        </CardContent>
      </Card>

      {/* Inline editor preview for last finished */}
      {lastWithResults && lastResults.length > 0 && (
        <Card>
          <CardHeader className="flex-row items-center justify-between">
            <div>
              <CardTitle className="text-base">{lastWithResults.title}</CardTitle>
              <CardDescription>Inline-редактор: правки сохраняются автоматически</CardDescription>
            </div>
            <Button size="sm">Перепубликовать</Button>
          </CardHeader>
          <CardContent className="pt-0">
            <Table>
              <THead>
                <TR>
                  <TH className="w-12">#</TH>
                  <TH>Пилот</TH>
                  <TH className="text-right">Лучший круг</TH>
                  <TH className="text-right">Общее время</TH>
                  <TH className="text-right pr-5">Очки</TH>
                </TR>
              </THead>
              <TBody>
                {lastResults.map((r) => {
                  const pilot = getPilotById(r.pilotId)!;
                  return (
                    <TR key={r.id}>
                      <TD className="font-bold tabular">{r.placement}</TD>
                      <TD>
                        <div className="flex items-center gap-2">
                          <Avatar src={pilot.avatarUrl} name={pilot.displayName} size="xs" />
                          <span className="text-sm">{pilot.displayName}</span>
                        </div>
                      </TD>
                      <TD className="text-right font-mono text-sm">{formatLapTime(r.bestLapMs)}</TD>
                      <TD className="text-right font-mono text-sm text-fg-secondary">
                        {formatLapTime(r.totalTimeMs)}
                      </TD>
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
  );
}
