import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, THead, TBody, TR, TH, TD } from "@/components/ui/table";
import { RegistrationStatusBadge } from "@/components/ui/status-badge";
import { registrations } from "@/lib/data/results";
import { getTournamentById } from "@/lib/data/tournaments";
import { formatDate } from "@/lib/utils";

export const metadata = { title: "Мои заявки" };

export default function AppRegistrationsPage() {
  const meId = "p7";
  const myReg = registrations.filter((r) => r.pilotId === meId);

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Мои заявки</h1>
        <p className="text-fg-secondary mt-1">
          История и статусы поданных заявок на турниры
        </p>
      </header>

      <Card className="overflow-hidden">
        <Table>
          <THead>
            <TR>
              <TH>Турнир</TH>
              <TH>Дата турнира</TH>
              <TH>Подана</TH>
              <TH>Статус</TH>
              <TH className="text-right pr-5">Действия</TH>
            </TR>
          </THead>
          <TBody>
            {myReg.map((reg) => {
              const t = getTournamentById(reg.tournamentId)!;
              return (
                <TR key={reg.id}>
                  <TD>
                    <Link href={`/tournaments/${t.slug}`} className="hover:text-accent">
                      <p className="font-medium">{t.title}</p>
                      <p className="text-xs text-fg-muted">{t.location.split(",")[0]}</p>
                    </Link>
                  </TD>
                  <TD className="text-fg-secondary">{formatDate(t.startsAt)}</TD>
                  <TD className="text-fg-secondary text-xs">
                    {formatDate(reg.submittedAt, { day: "2-digit", month: "short", hour: "2-digit", minute: "2-digit" })}
                  </TD>
                  <TD><RegistrationStatusBadge status={reg.status} /></TD>
                  <TD className="text-right pr-5">
                    {reg.status === "pending" && (
                      <Button variant="ghost" size="sm">Отменить</Button>
                    )}
                    {reg.status === "approved" && (
                      <Link href={`/tournaments/${t.slug}`}>
                        <Button variant="secondary" size="sm">Открыть</Button>
                      </Link>
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
