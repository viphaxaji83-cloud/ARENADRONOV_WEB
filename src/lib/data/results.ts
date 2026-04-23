import type { ResultEntry, RankingEntry, RegistrationEntry, NotificationItem } from "@/lib/types";

// Results from finished tournament t5 (Winter Indoor)
export const results: ResultEntry[] = [
  { id: "r1", tournamentId: "t5", pilotId: "p4", placement: 1, bestLapMs: 18420, totalTimeMs: 142500, points: 100, dnf: false, dns: false },
  { id: "r2", tournamentId: "t5", pilotId: "p1", placement: 2, bestLapMs: 18600, totalTimeMs: 142680, points: 80, dnf: false, dns: false },
  { id: "r3", tournamentId: "t5", pilotId: "p3", placement: 3, bestLapMs: 18890, totalTimeMs: 144100, points: 65, dnf: false, dns: false },
  { id: "r4", tournamentId: "t5", pilotId: "p7", placement: 4, bestLapMs: 19120, totalTimeMs: 145900, points: 50, dnf: false, dns: false },
  { id: "r5", tournamentId: "t5", pilotId: "p2", placement: 5, bestLapMs: 19300, totalTimeMs: 146200, points: 40, dnf: false, dns: false },
  { id: "r6", tournamentId: "t5", pilotId: "p8", placement: 6, bestLapMs: 19450, totalTimeMs: 147800, points: 32, dnf: false, dns: false },
  { id: "r7", tournamentId: "t5", pilotId: "p5", placement: 7, bestLapMs: 19620, totalTimeMs: 148500, points: 26, dnf: false, dns: false },
  { id: "r8", tournamentId: "t5", pilotId: "p6", placement: 8, bestLapMs: 19800, totalTimeMs: 149400, points: 21, dnf: false, dns: false },
];

// Season ranking — sorted by points
export const ranking: RankingEntry[] = [
  { pilotId: "p1", rank: 1, previousRank: 1, points: 245, tournamentsPlayed: 4, wins: 2, podiums: 4, trend: 0 },
  { pilotId: "p4", rank: 2, previousRank: 4, points: 215, tournamentsPlayed: 3, wins: 2, podiums: 3, trend: 2 },
  { pilotId: "p3", rank: 3, previousRank: 2, points: 198, tournamentsPlayed: 4, wins: 1, podiums: 3, trend: -1 },
  { pilotId: "p2", rank: 4, previousRank: 3, points: 172, tournamentsPlayed: 4, wins: 0, podiums: 2, trend: -1 },
  { pilotId: "p8", rank: 5, previousRank: 6, points: 156, tournamentsPlayed: 3, wins: 0, podiums: 2, trend: 1 },
  { pilotId: "p7", rank: 6, previousRank: 8, points: 142, tournamentsPlayed: 3, wins: 0, podiums: 2, trend: 2 },
  { pilotId: "p5", rank: 7, previousRank: 5, points: 128, tournamentsPlayed: 3, wins: 0, podiums: 1, trend: -2 },
  { pilotId: "p6", rank: 8, previousRank: 7, points: 121, tournamentsPlayed: 4, wins: 0, podiums: 1, trend: -1 },
];

// Registrations for current user (assume logged-in pilot is p7 / Blitz)
export const registrations: RegistrationEntry[] = [
  {
    id: "reg1",
    tournamentId: "t1",
    pilotId: "p7",
    status: "approved",
    submittedAt: "2026-03-16T11:24:00+03:00",
    decidedAt: "2026-03-17T09:10:00+03:00",
  },
  {
    id: "reg2",
    tournamentId: "t2",
    pilotId: "p7",
    status: "pending",
    submittedAt: "2026-04-04T18:50:00+03:00",
  },
  {
    id: "reg3",
    tournamentId: "t5",
    pilotId: "p7",
    status: "approved",
    submittedAt: "2026-01-04T12:30:00+03:00",
    decidedAt: "2026-01-05T10:00:00+03:00",
  },
];

export const notifications: NotificationItem[] = [
  {
    id: "no1",
    userId: "p7",
    type: "registration_approved",
    title: "Заявка подтверждена",
    body: "Ваша заявка на Moscow Spring Cup 2026 подтверждена организатором.",
    link: "/tournaments/moscow-spring-cup-2026",
    readAt: null,
    createdAt: "2026-03-17T09:10:00+03:00",
  },
  {
    id: "no2",
    userId: "p7",
    type: "tournament_upcoming",
    title: "Турнир скоро начнётся",
    body: "St. Petersburg Night GP стартует через 7 дней. Проверьте детали.",
    link: "/tournaments/spb-night-grand-prix",
    readAt: null,
    createdAt: "2026-04-15T08:00:00+03:00",
  },
  {
    id: "no3",
    userId: "p7",
    type: "result_published",
    title: "Опубликованы результаты",
    body: "Winter Indoor Championship: ваше место — 4. +50 очков в сезонный рейтинг.",
    link: "/tournaments/winter-indoor-2026",
    readAt: "2026-02-09T13:20:00+03:00",
    createdAt: "2026-02-09T12:05:00+03:00",
  },
  {
    id: "no4",
    userId: "p7",
    type: "news_digest",
    title: "Дайджест недели",
    body: "5 новостей за неделю: интервью с Vortex, открытие сезона и другое.",
    link: "/news",
    readAt: "2026-03-19T08:00:00+03:00",
    createdAt: "2026-03-18T20:00:00+03:00",
  },
];

export function getResultsForTournament(tournamentId: string): ResultEntry[] {
  return results.filter((r) => r.tournamentId === tournamentId).sort((a, b) => a.placement - b.placement);
}

export function getResultsForPilot(pilotId: string): ResultEntry[] {
  return results.filter((r) => r.pilotId === pilotId);
}

export function getRegistrationForUser(pilotId: string, tournamentId: string) {
  return registrations.find((r) => r.pilotId === pilotId && r.tournamentId === tournamentId);
}
