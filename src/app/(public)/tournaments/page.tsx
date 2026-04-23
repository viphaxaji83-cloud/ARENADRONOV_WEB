import { TournamentCard } from "@/components/tournament/tournament-card";
import { tournaments } from "@/lib/data/tournaments";

export const metadata = {
  title: "Турниры",
  description: "Все турниры платформы АРЕНА ДРОНОВ",
};

export default function TournamentsPage() {
  const live = tournaments.filter((t) =>
    ["registration_open", "registration_closed", "ongoing", "published"].includes(t.status),
  );
  const finished = tournaments.filter((t) => t.status === "finished");

  return (
    <div className="container py-10 sm:py-14">
      <div className="mb-8 flex flex-col gap-3">
        <p className="text-xs uppercase tracking-widest text-accent font-semibold">Сезон 2026</p>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">Турниры</h1>
        <p className="text-fg-secondary max-w-2xl">
          Полный календарь сезона. Фильтруйте по статусу, формату и дисциплине.
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2 mb-8 pb-6 border-b border-border-subtle">
        {["Все", "Регистрация", "Скоро", "Завершённые"].map((label, i) => (
          <button
            key={label}
            className={`h-9 px-4 rounded-md border text-sm font-medium transition-colors ${
              i === 0
                ? "bg-bg-elevated border-border-strong text-fg-primary"
                : "border-border-subtle text-fg-secondary hover:text-fg-primary hover:border-border-strong"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      <section>
        <h2 className="text-sm uppercase tracking-wider text-fg-muted font-semibold mb-5">
          Активные и предстоящие · {live.length}
        </h2>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {live.map((t) => (
            <TournamentCard key={t.id} tournament={t} />
          ))}
        </div>
      </section>

      {finished.length > 0 && (
        <section className="mt-14">
          <h2 className="text-sm uppercase tracking-wider text-fg-muted font-semibold mb-5">
            Завершённые · {finished.length}
          </h2>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {finished.map((t) => (
              <TournamentCard key={t.id} tournament={t} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
