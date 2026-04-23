import Link from "next/link";
import { Search, MoreHorizontal, ShieldAlert } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Table, THead, TBody, TR, TH, TD } from "@/components/ui/table";
import { pilots } from "@/lib/data/pilots";
import { ranking } from "@/lib/data/results";
import { formatDate } from "@/lib/utils";

export const metadata = { title: "Пользователи" };

export default function AdminUsersPage() {
  // Show pilots as users (plus a synthetic admin user)
  const users = [
    {
      id: "admin",
      handle: "admin",
      displayName: "Администратор платформы",
      avatarUrl: undefined,
      city: "Москва",
      country: "Россия",
      teamName: undefined,
      joinedAt: "2024-01-01",
      role: "admin" as const,
    },
    ...pilots.map((p) => ({ ...p, role: "participant" as const })),
  ];

  return (
    <div className="space-y-6">
      <header className="flex items-end justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Пользователи</h1>
          <p className="text-fg-secondary mt-1">{users.length} аккаунтов на платформе</p>
        </div>
      </header>

      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-fg-muted" />
        <input
          placeholder="Поиск по никнейму или email..."
          className="w-full h-10 pl-9 pr-3 rounded-md border border-border-strong bg-bg-elevated text-sm focus:outline-none focus:border-accent"
        />
      </div>

      <Card className="overflow-hidden">
        <Table>
          <THead>
            <TR>
              <TH>Пользователь</TH>
              <TH>Роль</TH>
              <TH>Команда</TH>
              <TH>Сезон</TH>
              <TH>На платформе с</TH>
              <TH className="w-12 pr-5"></TH>
            </TR>
          </THead>
          <TBody>
            {users.map((u) => {
              const rank = ranking.find((r) => r.pilotId === u.id);
              return (
                <TR key={u.id}>
                  <TD>
                    <div className="flex items-center gap-3">
                      <Avatar src={u.avatarUrl} name={u.displayName} size="sm" />
                      <div>
                        <p className="text-sm font-medium">{u.displayName}</p>
                        <p className="text-xs text-fg-muted">@{u.handle}</p>
                      </div>
                    </div>
                  </TD>
                  <TD>
                    {u.role === "admin" ? (
                      <Badge variant="warning" dot>
                        <ShieldAlert className="h-3 w-3" />
                        Admin
                      </Badge>
                    ) : (
                      <Badge dot>Пилот</Badge>
                    )}
                  </TD>
                  <TD className="text-xs text-fg-secondary">{u.teamName ?? "—"}</TD>
                  <TD className="text-xs text-fg-secondary">
                    {rank ? (
                      <span>
                        #{rank.rank} · <span className="font-mono">{rank.points}</span> очков
                      </span>
                    ) : (
                      "—"
                    )}
                  </TD>
                  <TD className="text-xs text-fg-secondary">{formatDate(u.joinedAt, { month: "short", year: "numeric" })}</TD>
                  <TD className="pr-5 text-right">
                    <button className="h-8 w-8 inline-flex items-center justify-center rounded-md text-fg-muted hover:text-fg-primary hover:bg-bg-elevated">
                      <MoreHorizontal className="h-4 w-4" />
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
