import Link from "next/link";
import { notFound } from "next/navigation";
import { MapPin, Calendar, Trophy, Award, ChevronRight, ExternalLink } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { StatCard } from "@/components/ui/stat";
import { Table, THead, TBody, TR, TH, TD } from "@/components/ui/table";
import { pilots, getPilotByHandle } from "@/lib/data/pilots";
import { ranking, getResultsForPilot } from "@/lib/data/results";
import { tournaments, getTournamentById } from "@/lib/data/tournaments";
import { disciplineLabel } from "@/lib/labels";
import { formatDate, formatLapTime } from "@/lib/utils";

export function generateStaticParams() {
  return pilots.map((p) => ({ handle: p.handle }));
}

export default async function PilotPage({ params }: { params: Promise<{ handle: string }> }) {
  const { handle } = await params;
  const pilot = getPilotByHandle(handle);
  if (!pilot) notFound();

  const rank = ranking.find((r) => r.pilotId === pilot.id);
  const results = getResultsForPilot(pilot.id);

  return (
    <div>
      {/* Header */}
      <div className="border-b border-border-subtle bg-bg-surface relative overflow-hidden">
        <div className="absolute inset-0 bg-spotlight opacity-50" />
        <div className="container relative pt-8 pb-10 sm:pt-10 sm:pb-12">
          <nav className="flex items-center gap-1.5 text-xs text-fg-muted mb-6">
            <Link href="/" className="hover:text-fg-secondary">Главная</Link>
            <ChevronRight className="h-3 w-3" />
            <Link href="/pilots" className="hover:text-fg-secondary">Пилоты</Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-fg-secondary truncate">@{pilot.handle}</span>
          </nav>

          <div className="flex flex-col sm:flex-row sm:items-end gap-6">
            <Avatar src={pilot.avatarUrl} name={pilot.displayName} size="xl" className="h-24 w-24 sm:h-32 sm:w-32 text-2xl" />
            <div className="flex-1 min-w-0">
              <p className="text-xs uppercase tracking-widest text-accent font-semibold mb-1">
                Пилот · с {formatDate(pilot.joinedAt, { year: "numeric", month: "long" })}
              </p>
              <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">{pilot.displayName}</h1>
              <p className="text-fg-muted text-base mt-1">@{pilot.handle}</p>
              <div className="flex flex-wrap gap-x-4 gap-y-2 mt-3 text-sm text-fg-secondary">
                <div className="flex items-center gap-1.5">
                  <MapPin className="h-3.5 w-3.5 text-fg-muted" />
                  {pilot.city}, {pilot.country}
                </div>
                {pilot.teamName && (
                  <div className="flex items-center gap-1.5">
                    <Trophy className="h-3.5 w-3.5 text-fg-muted" />
                    {pilot.teamName}
                  </div>
                )}
              </div>
              <div className="flex flex-wrap gap-1.5 mt-3">
                {pilot.classPrefs.map((c) => (
                  <Badge key={c} variant="neutral" size="sm">
                    {disciplineLabel[c]}
                  </Badge>
                ))}
              </div>
            </div>
            {rank && (
              <div className="shrink-0">
                <Card className="p-5 text-center bg-gradient-to-br from-accent/10 to-transparent border-accent/30">
                  <p className="text-xs uppercase tracking-wider text-accent font-semibold mb-1">
                    Сезон 2026
                  </p>
                  <p className="text-5xl font-black text-fg-primary tabular leading-none">
                    #{rank.rank}
                  </p>
                  <p className="text-xs text-fg-muted mt-2">{rank.points} очков</p>
                </Card>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="container py-10 sm:py-12">
        <div className="grid lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8 space-y-8">
            {/* Bio */}
            <section>
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                О пилоте
              </h2>
              <Card className="p-5 sm:p-6">
                <p className="text-fg-secondary leading-relaxed">{pilot.bio}</p>
              </Card>
            </section>

            {/* Stats */}
            {rank && (
              <section>
                <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                  Статистика сезона
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <StatCard label="Очки" value={rank.points} icon={<Award className="h-4 w-4" />} />
                  <StatCard label="Турниров" value={rank.tournamentsPlayed} icon={<Calendar className="h-4 w-4" />} />
                  <StatCard label="Побед" value={rank.wins} icon={<Trophy className="h-4 w-4" />} />
                  <StatCard label="Подиумов" value={rank.podiums} />
                </div>
              </section>
            )}

            {/* Results history */}
            {results.length > 0 && (
              <section>
                <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                  История выступлений
                </h2>
                <Card className="overflow-hidden">
                  <Table>
                    <THead>
                      <TR>
                        <TH>Турнир</TH>
                        <TH className="text-right">Место</TH>
                        <TH className="text-right">Лучший круг</TH>
                        <TH className="text-right pr-5">Очки</TH>
                      </TR>
                    </THead>
                    <TBody>
                      {results.map((r) => {
                        const t = getTournamentById(r.tournamentId)!;
                        return (
                          <TR key={r.id}>
                            <TD>
                              <Link href={`/tournaments/${t.slug}`} className="hover:text-accent">
                                <p className="font-medium">{t.title}</p>
                                <p className="text-xs text-fg-muted">{formatDate(t.startsAt)}</p>
                              </Link>
                            </TD>
                            <TD className="text-right font-bold">#{r.placement}</TD>
                            <TD className="text-right font-mono">{formatLapTime(r.bestLapMs)}</TD>
                            <TD className="text-right pr-5 font-bold text-accent">+{r.points}</TD>
                          </TR>
                        );
                      })}
                    </TBody>
                  </Table>
                </Card>
              </section>
            )}
          </div>

          <div className="lg:col-span-4 space-y-6">
            <Card className="p-5">
              <h3 className="text-sm font-semibold mb-4">Социальные сети</h3>
              <div className="space-y-2">
                {pilot.socials.youtube && (
                  <a href="#" className="flex items-center justify-between text-sm hover:text-accent">
                    <span className="text-fg-secondary">YouTube</span>
                    <span className="font-mono text-fg-primary inline-flex items-center gap-1">
                      @{pilot.socials.youtube}
                      <ExternalLink className="h-3 w-3" />
                    </span>
                  </a>
                )}
                {pilot.socials.instagram && (
                  <a href="#" className="flex items-center justify-between text-sm hover:text-accent">
                    <span className="text-fg-secondary">Instagram</span>
                    <span className="font-mono text-fg-primary inline-flex items-center gap-1">
                      @{pilot.socials.instagram}
                      <ExternalLink className="h-3 w-3" />
                    </span>
                  </a>
                )}
                {pilot.socials.telegram && (
                  <a href="#" className="flex items-center justify-between text-sm hover:text-accent">
                    <span className="text-fg-secondary">Telegram</span>
                    <span className="font-mono text-fg-primary inline-flex items-center gap-1">
                      @{pilot.socials.telegram}
                      <ExternalLink className="h-3 w-3" />
                    </span>
                  </a>
                )}
              </div>
            </Card>

            <Card className="p-5">
              <h3 className="text-sm font-semibold mb-3">Ближайшие старты</h3>
              <div className="space-y-3">
                {tournaments
                  .filter((t) => t.status === "registration_open")
                  .slice(0, 2)
                  .map((t) => (
                    <Link
                      key={t.id}
                      href={`/tournaments/${t.slug}`}
                      className="block p-3 rounded-md border border-border-subtle hover:border-accent/40 transition-colors"
                    >
                      <p className="text-sm font-medium text-fg-primary line-clamp-1">{t.title}</p>
                      <p className="text-xs text-fg-muted mt-0.5">{formatDate(t.startsAt)}</p>
                    </Link>
                  ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
