import Link from "next/link";
import { ArrowRight, Calendar, MapPin, Trophy, Zap, Award, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { SectionHeading } from "@/components/ui/section-heading";
import { TournamentCard } from "@/components/tournament/tournament-card";
import { TournamentStatusBadge } from "@/components/ui/status-badge";
import { tournaments } from "@/lib/data/tournaments";
import { news } from "@/lib/data/news";
import { ranking } from "@/lib/data/results";
import { getPilotById } from "@/lib/data/pilots";
import { formatDate, formatLapTime } from "@/lib/utils";
import { disciplineLabel } from "@/lib/labels";

export default function HomePage() {
  const featured = tournaments.find((t) => t.status === "registration_open")!;
  const upcoming = tournaments
    .filter((t) => ["registration_open", "registration_closed", "published"].includes(t.status))
    .slice(0, 3);
  const topRanking = ranking.slice(0, 5);
  const latestNews = news.slice(0, 3);
  const recentTournament = tournaments.find((t) => t.status === "finished");

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border-subtle">
        <div className="absolute inset-0 bg-grid opacity-60" />
        <div className="absolute inset-0 bg-spotlight-strong" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-bg-base" />

        <div className="container relative pt-16 pb-20 sm:pt-20 sm:pb-28 lg:pt-28 lg:pb-32">
          <div className="grid lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7 flex flex-col gap-6 animate-slide-up">
              <Badge variant="accent" dot className="self-start">
                <Zap className="h-3 w-3" />
                Сезон 2026 · Открытие 9 мая
              </Badge>

              <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tight leading-[0.95] uppercase">
                Турниры по{" "}
                <span className="bg-gradient-to-r from-accent via-accent2 to-accent bg-clip-text text-transparent text-glow">
                  дрон-рейсингу
                </span>
                <br />
                в одном месте
              </h1>

              <p className="text-lg sm:text-xl text-fg-secondary max-w-2xl">
                Расписание этапов, регистрация, рейтинг пилотов и новости сцены. Платформа,
                в которой удобно и пилотам, и организаторам.
              </p>

              <div className="flex flex-wrap gap-3 mt-2">
                <Link href="/tournaments">
                  <Button size="lg" className="gap-2">
                    Смотреть турниры
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/register">
                  <Button size="lg" variant="outline">
                    Стать пилотом
                  </Button>
                </Link>
              </div>

              <div className="flex flex-wrap gap-x-8 gap-y-3 mt-6 text-sm">
                <div className="flex items-center gap-2">
                  <Trophy className="h-4 w-4 text-accent" />
                  <span className="text-fg-secondary">
                    <span className="text-fg-primary font-semibold tabular">{tournaments.length}</span>{" "}
                    турниров в сезоне
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-accent" />
                  <span className="text-fg-secondary">
                    <span className="text-fg-primary font-semibold tabular">{ranking.length}</span>{" "}
                    активных пилотов
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Award className="h-4 w-4 text-accent" />
                  <span className="text-fg-secondary">
                    <span className="text-fg-primary font-semibold">1.4M ₽</span>{" "}
                    призовой фонд
                  </span>
                </div>
              </div>
            </div>

            {/* Featured tournament card */}
            <div className="lg:col-span-5">
              <Link href={`/tournaments/${featured.slug}`} className="group block">
                <Card className="overflow-hidden border-accent/30 shadow-glow-strong hover:border-accent transition-all">
                  <div className="relative aspect-[4/3] sm:aspect-[16/10] overflow-hidden bg-bg-elevated">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={featured.coverUrl}
                      alt={featured.title}
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-bg-base via-bg-base/40 to-transparent" />
                    <div className="absolute top-4 left-4">
                      <Badge variant="accent" dot>
                        Featured
                      </Badge>
                    </div>
                    <div className="absolute bottom-0 inset-x-0 p-5">
                      <p className="text-[10px] font-mono uppercase tracking-widest text-accent mb-1.5">
                        Ближайший этап
                      </p>
                      <h3 className="font-display text-2xl font-bold text-fg-primary mb-2 leading-tight uppercase">
                        {featured.title}
                      </h3>
                      <p className="text-sm text-fg-secondary line-clamp-2">{featured.subtitle}</p>
                    </div>
                  </div>
                  <div className="p-5 grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-xs text-fg-muted mb-0.5">Дата</p>
                      <p className="text-fg-primary font-medium">{formatDate(featured.startsAt)}</p>
                    </div>
                    <div>
                      <p className="text-xs text-fg-muted mb-0.5">Призовой фонд</p>
                      <p className="text-fg-primary font-medium">{featured.prizePool}</p>
                    </div>
                    <div className="col-span-2">
                      <div className="flex items-center justify-between mb-1.5">
                        <p className="text-xs text-fg-muted">Места</p>
                        <p className="text-xs text-fg-primary tabular font-medium">
                          {featured.seatsTaken} / {featured.maxParticipants}
                        </p>
                      </div>
                      <Progress
                        value={featured.seatsTaken}
                        max={featured.maxParticipants}
                        variant="accent"
                      />
                    </div>
                  </div>
                </Card>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Upcoming tournaments */}
      <section className="container py-16 sm:py-20">
        <SectionHeading
          eyebrow="Ближайшие этапы"
          title="Турниры сезона"
          description="Регистрация, расписание и состав участников"
          href="/tournaments"
        />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {upcoming.map((t) => (
            <TournamentCard key={t.id} tournament={t} />
          ))}
        </div>
      </section>

      {/* Leaderboard + news */}
      <section className="container py-16 sm:py-20 border-t border-border-subtle">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <SectionHeading
              eyebrow="Сезон 2026"
              title="Топ пилотов"
              description="Рейтинг по сумме очков сезона"
              href="/leaderboard"
            />
            <Card className="overflow-hidden">
              <ul className="divide-y divide-border-subtle">
                {topRanking.map((entry, i) => {
                  const pilot = getPilotById(entry.pilotId)!;
                  const medalColor =
                    i === 0
                      ? "bg-yellow-500/15 text-yellow-400 border-yellow-500/30"
                      : i === 1
                        ? "bg-zinc-300/15 text-zinc-200 border-zinc-400/30"
                        : i === 2
                          ? "bg-orange-600/15 text-orange-400 border-orange-600/30"
                          : "bg-bg-elevated text-fg-secondary border-border-subtle";
                  return (
                    <li key={entry.pilotId}>
                      <Link
                        href={`/pilots/${pilot.handle}`}
                        className="flex items-center gap-4 px-4 sm:px-5 py-3.5 hover:bg-bg-elevated/50 transition-colors"
                      >
                        <div
                          className={`h-9 w-9 rounded-md border flex items-center justify-center text-sm font-bold tabular ${medalColor}`}
                        >
                          {entry.rank}
                        </div>
                        <Avatar src={pilot.avatarUrl} name={pilot.displayName} size="md" />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold text-fg-primary truncate">
                            {pilot.displayName}
                          </p>
                          <p className="text-xs text-fg-muted truncate">
                            @{pilot.handle} · {pilot.teamName ?? "Solo"}
                          </p>
                        </div>
                        <div className="text-right shrink-0">
                          <p className="text-base font-bold text-fg-primary tabular">
                            {entry.points}
                          </p>
                          <p className="text-[10px] uppercase tracking-wider text-fg-muted">очков</p>
                        </div>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </Card>
          </div>

          <div className="lg:col-span-5">
            <SectionHeading
              eyebrow="Сцена"
              title="Последние новости"
              href="/news"
            />
            <div className="flex flex-col gap-4">
              {latestNews.map((post) => (
                <Link key={post.id} href={`/news/${post.slug}`} className="group block">
                  <Card className="overflow-hidden hover:border-accent/40 transition-colors">
                    <div className="grid grid-cols-3 gap-0">
                      <div className="aspect-[4/3] overflow-hidden bg-bg-elevated relative">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={post.coverUrl}
                          alt={post.title}
                          className="absolute inset-0 h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                      <div className="col-span-2 p-4 flex flex-col justify-center gap-1.5">
                        <p className="text-[10px] uppercase tracking-wider text-fg-muted">
                          {formatDate(post.publishedAt, { month: "short", day: "numeric" })}
                        </p>
                        <h4 className="text-sm font-semibold text-fg-primary line-clamp-2 group-hover:text-accent transition-colors">
                          {post.title}
                        </h4>
                        <p className="text-xs text-fg-secondary line-clamp-2">{post.excerpt}</p>
                      </div>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Recent results banner */}
      {recentTournament && (
        <section className="container pb-16 sm:pb-24">
          <Card className="overflow-hidden border-accent2/30 shadow-glow-magenta">
            <div className="grid lg:grid-cols-2">
              <div className="p-6 sm:p-8 flex flex-col justify-center gap-4">
                <Badge variant="accent" dot className="self-start">
                  Свежие результаты
                </Badge>
                <h3 className="font-display text-3xl sm:text-4xl font-bold tracking-tight uppercase">
                  {recentTournament.title}
                </h3>
                <p className="text-fg-secondary">
                  {recentTournament.subtitle}. Турнир завершён —{" "}
                  смотрите итоговую таблицу и лучшие круги.
                </p>
                <div className="flex flex-wrap gap-2 mt-2">
                  <TournamentStatusBadge status={recentTournament.status} />
                  <Badge>
                    <MapPin className="h-3 w-3 mr-0.5" />
                    {recentTournament.location.split(",")[0]}
                  </Badge>
                  <Badge>{disciplineLabel[recentTournament.discipline]}</Badge>
                </div>
                <div>
                  <Link href={`/tournaments/${recentTournament.slug}`}>
                    <Button>
                      Смотреть результаты
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="bg-bg-elevated/50 p-6 sm:p-8 grid grid-cols-3 gap-3">
                {[
                  { rank: 1, pilotId: "p4", time: 142500 },
                  { rank: 2, pilotId: "p1", time: 142680 },
                  { rank: 3, pilotId: "p3", time: 144100 },
                ].map((r) => {
                  const pilot = getPilotById(r.pilotId)!;
                  const colors = ["text-yellow-400", "text-zinc-300", "text-orange-400"];
                  return (
                    <div
                      key={r.rank}
                      className="flex flex-col items-center text-center gap-2 p-3 rounded-md bg-bg-surface border border-border-subtle"
                    >
                      <div className={`text-3xl font-bold ${colors[r.rank - 1]}`}>{r.rank}</div>
                      <Avatar src={pilot.avatarUrl} name={pilot.displayName} size="md" />
                      <p className="text-xs font-medium text-fg-primary truncate max-w-full">
                        @{pilot.handle}
                      </p>
                      <p className="text-[10px] font-mono text-fg-muted tabular">
                        {formatLapTime(r.time)}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </Card>
        </section>
      )}
    </div>
  );
}
