import Link from "next/link";
import { MapPin, Users } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { pilots } from "@/lib/data/pilots";
import { ranking } from "@/lib/data/results";
import { disciplineLabel } from "@/lib/labels";

export const metadata = { title: "Пилоты" };

export default function PilotsPage() {
  // Sort by ranking
  const ranked = [...pilots].sort((a, b) => {
    const ra = ranking.find((r) => r.pilotId === a.id)?.rank ?? 999;
    const rb = ranking.find((r) => r.pilotId === b.id)?.rank ?? 999;
    return ra - rb;
  });

  return (
    <div className="container py-10 sm:py-14">
      <div className="mb-10 flex flex-col gap-3">
        <p className="text-xs uppercase tracking-widest text-accent font-semibold">Сцена</p>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">Пилоты</h1>
        <p className="text-fg-secondary max-w-2xl">
          {pilots.length} пилотов в активном составе сезона. Профили, статистика, история.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {ranked.map((pilot) => {
          const rank = ranking.find((r) => r.pilotId === pilot.id);
          return (
            <Link key={pilot.id} href={`/pilots/${pilot.handle}`} className="group">
              <Card className="p-5 hover:border-accent/40 transition-colors h-full flex flex-col">
                <div className="flex items-start gap-3 mb-4">
                  <Avatar src={pilot.avatarUrl} name={pilot.displayName} size="lg" />
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-fg-primary truncate group-hover:text-accent transition-colors">
                      {pilot.displayName}
                    </p>
                    <p className="text-xs text-fg-muted truncate">@{pilot.handle}</p>
                    <p className="text-xs text-fg-secondary mt-1 flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      {pilot.city}
                    </p>
                  </div>
                  {rank && (
                    <div className="shrink-0 text-right">
                      <p className="text-xs uppercase text-fg-muted">Ранг</p>
                      <p className="text-xl font-bold text-fg-primary tabular">#{rank.rank}</p>
                    </div>
                  )}
                </div>

                <p className="text-xs text-fg-secondary line-clamp-2 mb-4">{pilot.bio}</p>

                <div className="flex flex-wrap gap-1 mb-4">
                  {pilot.classPrefs.slice(0, 2).map((c) => (
                    <Badge key={c} size="sm">
                      {disciplineLabel[c]}
                    </Badge>
                  ))}
                </div>

                {pilot.teamName && (
                  <div className="mt-auto pt-3 border-t border-border-subtle text-xs text-fg-secondary flex items-center gap-1.5">
                    <Users className="h-3 w-3 text-fg-muted" />
                    <span className="truncate">{pilot.teamName}</span>
                  </div>
                )}

                {rank && (
                  <div className="grid grid-cols-3 gap-2 mt-3 pt-3 border-t border-border-subtle text-center">
                    <div>
                      <p className="text-sm font-bold text-fg-primary tabular">{rank.points}</p>
                      <p className="text-[10px] uppercase text-fg-muted">очков</p>
                    </div>
                    <div>
                      <p className="text-sm font-bold text-fg-primary tabular">{rank.wins}</p>
                      <p className="text-[10px] uppercase text-fg-muted">поб.</p>
                    </div>
                    <div>
                      <p className="text-sm font-bold text-fg-primary tabular">{rank.podiums}</p>
                      <p className="text-[10px] uppercase text-fg-muted">под.</p>
                    </div>
                  </div>
                )}
              </Card>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
