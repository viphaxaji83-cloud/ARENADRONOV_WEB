import Link from "next/link";
import { RefreshCw, Pencil, Lock } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar } from "@/components/ui/avatar";
import { Table, THead, TBody, TR, TH, TD } from "@/components/ui/table";
import { ranking } from "@/lib/data/results";
import { getPilotById } from "@/lib/data/pilots";
import { seasons } from "@/lib/data/tournaments";

export const metadata = { title: "Рейтинг" };

export default function AdminLeaderboardPage() {
  const activeSeason = seasons.find((s) => s.isActive)!;

  return (
    <div className="space-y-6">
      <header className="flex items-end justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Рейтинг</h1>
          <p className="text-fg-secondary mt-1">Управление сезонами и пересчёт очков</p>
        </div>
        <div className="flex gap-2">
          <Button variant="secondary" size="sm">
            <Lock className="h-3.5 w-3.5" />
            Закрыть сезон
          </Button>
          <Button size="sm">
            <RefreshCw className="h-3.5 w-3.5" />
            Пересчитать
          </Button>
        </div>
      </header>

      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            {activeSeason.title}
            <Badge variant="success" size="sm" dot>Активный</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="grid sm:grid-cols-3 gap-4 text-sm">
          <div>
            <p className="text-fg-muted text-xs uppercase mb-1">Старт</p>
            <p className="font-medium">{activeSeason.startsAt}</p>
          </div>
          <div>
            <p className="text-fg-muted text-xs uppercase mb-1">Окончание</p>
            <p className="font-medium">{activeSeason.endsAt}</p>
          </div>
          <div>
            <p className="text-fg-muted text-xs uppercase mb-1">Последний пересчёт</p>
            <p className="font-medium">10 февраля, 12:35</p>
          </div>
        </CardContent>
      </Card>

      <Card className="overflow-hidden">
        <Table>
          <THead>
            <TR>
              <TH className="w-12">#</TH>
              <TH>Пилот</TH>
              <TH className="text-right">Очки</TH>
              <TH className="text-right">Турн.</TH>
              <TH className="text-right">Поб.</TH>
              <TH className="text-right">Под.</TH>
              <TH className="text-right pr-5">Корр.</TH>
            </TR>
          </THead>
          <TBody>
            {ranking.map((entry) => {
              const pilot = getPilotById(entry.pilotId)!;
              return (
                <TR key={entry.pilotId}>
                  <TD className="font-bold tabular">{entry.rank}</TD>
                  <TD>
                    <div className="flex items-center gap-2">
                      <Avatar src={pilot.avatarUrl} name={pilot.displayName} size="xs" />
                      <span className="text-sm">{pilot.displayName}</span>
                    </div>
                  </TD>
                  <TD className="text-right font-bold tabular">{entry.points}</TD>
                  <TD className="text-right text-fg-secondary tabular">{entry.tournamentsPlayed}</TD>
                  <TD className="text-right text-fg-secondary tabular">{entry.wins}</TD>
                  <TD className="text-right text-fg-secondary tabular">{entry.podiums}</TD>
                  <TD className="text-right pr-5">
                    <button className="h-8 w-8 inline-flex items-center justify-center rounded-md text-fg-muted hover:text-fg-primary hover:bg-bg-elevated">
                      <Pencil className="h-3.5 w-3.5" />
                    </button>
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
