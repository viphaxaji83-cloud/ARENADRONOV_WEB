import Link from "next/link";
import { CalendarClock, Trophy } from "lucide-react";
import { TournamentCard } from "@/components/tournament/tournament-card";
import { EmptyState } from "@/components/ui/empty";
import { tournaments } from "@/lib/data/tournaments";
import { cn } from "@/lib/utils";
import type { Tournament } from "@/lib/types";

export const metadata = {
  title: "Турниры",
  description: "Все турниры платформы АРЕНА ДРОНОВ",
};

type TournamentView = "all" | "registration" | "soon" | "finished";

const tabItems: { key: TournamentView; label: string }[] = [
  { key: "all", label: "Все" },
  { key: "registration", label: "Регистрация" },
  { key: "soon", label: "Скоро" },
  { key: "finished", label: "Завершённые" },
];

function isTournamentView(value: string | undefined): value is TournamentView {
  return tabItems.some((tab) => tab.key === value);
}

function byStartsAtAsc(a: Tournament, b: Tournament) {
  return new Date(a.startsAt).getTime() - new Date(b.startsAt).getTime();
}

function byRegistrationCloseAsc(a: Tournament, b: Tournament) {
  return new Date(a.registrationClosesAt).getTime() - new Date(b.registrationClosesAt).getTime();
}

function byEndsAtDesc(a: Tournament, b: Tournament) {
  return new Date(b.endsAt).getTime() - new Date(a.endsAt).getTime();
}

function hrefForView(view: TournamentView) {
  return view === "all" ? "/tournaments" : `/tournaments?view=${view}`;
}

function renderTournamentGrid(items: Tournament[]) {
  if (items.length === 0) {
    return (
      <EmptyState
        icon={<CalendarClock className="h-6 w-6" />}
        title="Под этот фильтр пока нет турниров"
        description="Попробуйте переключиться на другой статус или посмотрите весь сезон целиком."
        action={
          <Link
            href="/tournaments"
            className="inline-flex h-10 items-center justify-center rounded-md border border-border-strong bg-bg-elevated px-4 text-sm font-medium text-fg-primary transition-colors hover:border-accent/60 hover:text-accent"
          >
            Показать все турниры
          </Link>
        }
      />
    );
  }

  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((tournament) => (
        <TournamentCard key={tournament.id} tournament={tournament} />
      ))}
    </div>
  );
}

export default async function TournamentsPage({
  searchParams,
}: {
  searchParams: Promise<{ view?: string }>;
}) {
  const { view: rawView } = await searchParams;
  const view: TournamentView = isTournamentView(rawView) ? rawView : "all";

  const publicTournaments = tournaments.filter(
    (tournament) => !["draft", "cancelled"].includes(tournament.status),
  );

  const activeUpcoming = publicTournaments
    .filter((tournament) =>
      ["registration_open", "registration_closed", "ongoing", "published"].includes(
        tournament.status,
      ),
    )
    .sort(byStartsAtAsc);

  const registrationOpen = publicTournaments
    .filter((tournament) => tournament.status === "registration_open")
    .sort(byRegistrationCloseAsc);

  const soon = publicTournaments
    .filter((tournament) =>
      ["registration_closed", "ongoing", "published"].includes(tournament.status),
    )
    .sort(byStartsAtAsc);

  const finished = publicTournaments
    .filter((tournament) => tournament.status === "finished")
    .sort(byEndsAtDesc);

  return (
    <div className="container py-10 sm:py-14">
      <div className="mb-8 flex flex-col gap-3">
        <p className="text-xs font-semibold uppercase tracking-widest text-accent">Сезон 2026</p>
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Турниры</h1>
        <p className="max-w-2xl text-fg-secondary">
          Полный календарь сезона. Фильтруйте турниры по текущему этапу и быстро
          переключайтесь между регистрацией, ближайшими стартами и завершёнными заездами.
        </p>
      </div>

      <div className="mb-8 flex flex-wrap gap-2 border-b border-border-subtle pb-6">
        {tabItems.map((tab) => {
          const isActive = tab.key === view;

          return (
            <Link
              key={tab.key}
              href={hrefForView(tab.key)}
              aria-current={isActive ? "page" : undefined}
              className={cn(
                "inline-flex h-9 items-center rounded-md border px-4 text-sm font-medium transition-colors",
                isActive
                  ? "border-border-strong bg-bg-elevated text-fg-primary"
                  : "border-border-subtle text-fg-secondary hover:border-border-strong hover:text-fg-primary",
              )}
            >
              {tab.label}
            </Link>
          );
        })}
      </div>

      {view === "all" ? (
        <div className="space-y-14">
          <section>
            <h2 className="mb-5 text-sm font-semibold uppercase tracking-wider text-fg-muted">
              Активные и предстоящие · {activeUpcoming.length}
            </h2>
            {renderTournamentGrid(activeUpcoming)}
          </section>

          <section>
            <h2 className="mb-5 text-sm font-semibold uppercase tracking-wider text-fg-muted">
              Завершённые · {finished.length}
            </h2>
            {renderTournamentGrid(finished)}
          </section>
        </div>
      ) : null}

      {view === "registration" ? (
        <section>
          <h2 className="mb-5 text-sm font-semibold uppercase tracking-wider text-fg-muted">
            Открыта регистрация · {registrationOpen.length}
          </h2>
          {renderTournamentGrid(registrationOpen)}
        </section>
      ) : null}

      {view === "soon" ? (
        <section>
          <h2 className="mb-5 text-sm font-semibold uppercase tracking-wider text-fg-muted">
            Ближайшие старты · {soon.length}
          </h2>
          {renderTournamentGrid(soon)}
        </section>
      ) : null}

      {view === "finished" ? (
        <section>
          <h2 className="mb-5 text-sm font-semibold uppercase tracking-wider text-fg-muted">
            Завершённые · {finished.length}
          </h2>
          {finished.length > 0 ? (
            renderTournamentGrid(finished)
          ) : (
            <EmptyState
              icon={<Trophy className="h-6 w-6" />}
              title="Завершённых турниров пока нет"
              description="Как только этапы сезона закроются, здесь появятся карточки с итоговыми результатами."
            />
          )}
        </section>
      ) : null}
    </div>
  );
}
