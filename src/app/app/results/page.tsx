import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Table, THead, TBody, TR, TH, TD } from "@/components/ui/table";
import { results } from "@/lib/data/results";
import { getTournamentById } from "@/lib/data/tournaments";
import { formatDate, formatLapTime } from "@/lib/utils";

export const metadata = { title: "Мои результаты" };

export default function AppResultsPage() {
  const meId = "p7";
  const myResults = results.filter((r) => r.pilotId === meId);

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Мои результаты</h1>
        <p className="text-fg-secondary mt-1">История выступлений и набранные очки</p>
      </header>

      <Card className="overflow-hidden">
        <Table>
          <THead>
            <TR>
              <TH>Турнир</TH>
              <TH>Дата</TH>
              <TH className="text-right">Место</TH>
              <TH className="text-right">Лучший круг</TH>
              <TH className="text-right">Общее время</TH>
              <TH className="text-right pr-5">Очки</TH>
            </TR>
          </THead>
          <TBody>
            {myResults.map((r) => {
              const t = getTournamentById(r.tournamentId)!;
              return (
                <TR key={r.id}>
                  <TD>
                    <Link href={`/tournaments/${t.slug}`} className="hover:text-accent">
                      <p className="font-medium">{t.title}</p>
                    </Link>
                  </TD>
                  <TD className="text-fg-secondary text-xs">{formatDate(t.startsAt)}</TD>
                  <TD className="text-right font-bold">#{r.placement}</TD>
                  <TD className="text-right font-mono">{formatLapTime(r.bestLapMs)}</TD>
                  <TD className="text-right font-mono text-fg-secondary">
                    {formatLapTime(r.totalTimeMs)}
                  </TD>
                  <TD className="text-right pr-5 font-bold text-accent">+{r.points}</TD>
                </TR>
              );
            })}
          </TBody>
        </Table>
      </Card>
    </div>
  );
}
