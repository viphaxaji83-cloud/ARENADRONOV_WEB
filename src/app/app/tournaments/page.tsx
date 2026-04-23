import { TournamentCard } from "@/components/tournament/tournament-card";
import { tournaments, getTournamentById } from "@/lib/data/tournaments";
import { registrations } from "@/lib/data/results";
import { EmptyState } from "@/components/ui/empty";
import { Trophy } from "lucide-react";

export const metadata = { title: "Мои турниры" };

export default function AppTournamentsPage() {
  const meId = "p7";
  const myReg = registrations.filter((r) => r.pilotId === meId);
  const myTournaments = myReg.map((r) => getTournamentById(r.tournamentId)!).filter(Boolean);
  const available = tournaments.filter(
    (t) => t.status === "registration_open" && !myReg.some((r) => r.tournamentId === t.id),
  );

  return (
    <div className="space-y-10">
      <header>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Турниры</h1>
        <p className="text-fg-secondary mt-1">
          Ваши участия и доступные регистрации
        </p>
      </header>

      <section>
        <h2 className="text-sm uppercase tracking-wider text-fg-muted font-semibold mb-5">
          Я участвую · {myTournaments.length}
        </h2>
        {myTournaments.length > 0 ? (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {myTournaments.map((t) => (
              <TournamentCard key={t.id} tournament={t} />
            ))}
          </div>
        ) : (
          <EmptyState
            icon={<Trophy className="h-6 w-6" />}
            title="Пока нет активных участий"
            description="Подайте заявку на доступный турнир ниже."
          />
        )}
      </section>

      <section>
        <h2 className="text-sm uppercase tracking-wider text-fg-muted font-semibold mb-5">
          Доступны для регистрации · {available.length}
        </h2>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {available.map((t) => (
            <TournamentCard key={t.id} tournament={t} />
          ))}
        </div>
      </section>
    </div>
  );
}
